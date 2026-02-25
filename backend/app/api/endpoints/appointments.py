from fastapi import APIRouter, Depends, HTTPException, status, Header
from sqlalchemy import func
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime, timedelta
from ...db.session import get_db
from ...models import models
from ...schemas import schemas
from ...core.auth import get_current_user, check_role, get_password_hash, pwd_context

router = APIRouter(prefix="/appointments", tags=["appointments"])

def _get_optional_user(
    authorization: Optional[str] = Header(default=None),
    db: Session = Depends(get_db)
) -> Optional[models.User]:
    """Returns the current user if authenticated, otherwise None."""
    if not authorization or not authorization.startswith("Bearer "):
        return None
    try:
        from ...core.auth import SECRET_KEY, ALGORITHM
        from jose import jwt, JWTError
        token = authorization.split(" ")[1]
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload.get("sub")
        if not email:
            return None
        return db.query(models.User).filter(models.User.email == email).first()
    except Exception:
        return None

@router.post("/", response_model=schemas.AppointmentResponse)
def create_appointment(
    appointment: schemas.AppointmentCreate,
    db: Session = Depends(get_db),
    current_user: Optional[models.User] = Depends(_get_optional_user)
):
    # If not authenticated, require guest data
    if not current_user:
        if appointment.cliente_id:
            # Maybe an admin session expired but sent a cliente_id? 
            # Or simplified flow. Let's strictly check if we can find the user.
            target_user = db.query(models.User).filter(models.User.id == appointment.cliente_id).first()
            if target_user:
                current_user = target_user
        
        if not current_user:
            if not appointment.guest_nome or not appointment.guest_email or not appointment.guest_telefone:
                raise HTTPException(
                    status_code=401,
                    detail="Faça login ou forneça nome, email e telefone para agendar como convidado."
                )
            # Find or create guest user
            existing = db.query(models.User).filter(models.User.email == appointment.guest_email).first()
            if existing:
                current_user = existing
                # Update phone if missing
                if not existing.telefone and appointment.guest_telefone:
                    existing.telefone = appointment.guest_telefone
                    db.commit()
            else:
                import secrets
                guest_password = secrets.token_hex(16)
                current_user = models.User(
                    nome=appointment.guest_nome,
                    email=appointment.guest_email,
                    telefone=appointment.guest_telefone,
                    senha=pwd_context.hash(guest_password),
                    role="CLIENTE",
                    ativo=True
                )
                db.add(current_user)
                db.commit()
                db.refresh(current_user)
    
    is_admin = getattr(current_user, "role", "") == "ADMIN"
    
    # Special case: ADMIN can specify a different client_id
    if is_admin and appointment.cliente_id:
        target_user = db.query(models.User).filter(models.User.id == appointment.cliente_id).first()
        if target_user:
            current_user = target_user

    # Get service duration
    service = db.query(models.Service).filter(models.Service.id == appointment.service_id).first()
    if not service:
        raise HTTPException(status_code=400, detail="Serviço não encontrado")
    
    # Calculate start and end times
    try:
        start_time = datetime.strptime(appointment.hora, "%H:%M")
        end_time = start_time + timedelta(minutes=service.duracao)
        start_str = start_time.strftime("%H:%M")
        end_str = end_time.strftime("%H:%M")
    except ValueError:
        raise HTTPException(status_code=400, detail="Formato de hora inválido. Use HH:MM")

    # Verify professional availability window
    availability = db.query(models.Availability).filter(
        models.Availability.professional_id == appointment.professional_id,
        func.date(models.Availability.data) == appointment.data.date().isoformat()
    ).all()
    
    is_available = False
    # BYPASS availability check for ADMIN or if it's a BLOCK
    if is_admin or appointment.status == "BLOQUEADO":
        is_available = True
    else:
        for avail in availability:
            # Check if the entire appointment fits within this availability window
            if avail.hora_inicio <= start_str and end_str <= avail.hora_fim:
                is_available = True
                break
    
    if not is_available:
        raise HTTPException(status_code=400, detail="O profissional não está disponível em todo esse intervalo")

    # Check for conflicts (any active appointment or block that overlaps)
    # An overlap occurs if: (new_start < existing_end) AND (new_end > existing_start)
    existing_appts = db.query(models.Appointment).filter(
        models.Appointment.professional_id == appointment.professional_id,
        func.date(models.Appointment.data) == appointment.data.date().isoformat(),
        models.Appointment.status.in_(["APROVADO", "PENDENTE", "BLOQUEADO"])
    ).all()

    for appt in existing_appts:
        # Get duration for existing appt (could be different)
        # If it's a BLOCK, we might assume a default duration or use service_id 1 duration
        e_service = db.query(models.Service).filter(models.Service.id == appt.service_id).first()
        e_duration = e_service.duracao if e_service else 30 # Default 30min for blocks if service not found
        
        e_start_dt = datetime.strptime(appt.hora, "%H:%M")
        e_end_dt = e_start_dt + timedelta(minutes=e_duration)
        
        # Overlap logic
        if (start_time < e_end_dt) and (end_time > e_start_dt):
            raise HTTPException(status_code=400, detail=f"Conflito de horário: já existe um agendamento das {appt.hora} às {e_end_dt.strftime('%H:%M')}")

    appt_data = appointment.dict(exclude={"guest_nome", "guest_email", "guest_telefone", "cliente_id", "status"})
    new_appointment = models.Appointment(
        **appt_data,
        cliente_id=current_user.id,
        status=appointment.status or "PENDENTE"
    )
    db.add(new_appointment)
    db.commit()
    db.refresh(new_appointment)

    # Return enriched response
    return schemas.AppointmentResponse(
        id=new_appointment.id,
        professional_id=new_appointment.professional_id,
        service_id=new_appointment.service_id,
        cliente_id=new_appointment.cliente_id,
        data=new_appointment.data,
        hora=new_appointment.hora,
        status=new_appointment.status,
        created_at=new_appointment.created_at,
        cliente_nome=current_user.nome,
        cliente_telefone=current_user.telefone,
    )

@router.get("/my", response_model=List[schemas.AppointmentResponse])
def get_my_appointments(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    from sqlalchemy.orm import aliased
    Client = aliased(models.User)
    ProfUser = aliased(models.User)
    
    query = db.query(
        models.Appointment,
        Client.nome.label("cliente_nome"),
        Client.telefone.label("cliente_telefone"),
        ProfUser.nome.label("professional_nome"),
        models.Service.nome.label("service_nome")
    ).join(Client, models.Appointment.cliente_id == Client.id)\
     .outerjoin(models.Professional, models.Appointment.professional_id == models.Professional.id)\
     .outerjoin(ProfUser, models.Professional.user_id == ProfUser.id)\
     .outerjoin(models.Service, models.Appointment.service_id == models.Service.id)

    if current_user.role == "CLIENTE":
        results = query.filter(models.Appointment.cliente_id == current_user.id).all()
    elif current_user.role == "PROFISSIONAL":
        prof = db.query(models.Professional).filter(models.Professional.user_id == current_user.id).first()
        if not prof:
            return []
        results = query.filter(models.Appointment.professional_id == prof.id).all()
    else:
        results = query.all()

    return [
        {
            "id": appt.id,
            "professional_id": appt.professional_id,
            "service_id": appt.service_id,
            "cliente_id": appt.cliente_id,
            "data": appt.data,
            "hora": appt.hora,
            "status": appt.status,
            "created_at": appt.created_at,
            "cliente_nome": c_nome,
            "cliente_telefone": c_tel,
            "professional_nome": p_nome,
            "service_nome": s_nome
        } for appt, c_nome, c_tel, p_nome, s_nome in results
    ]

@router.get("/busy-slots", response_model=List[str])
def get_busy_slots(
    professional_id: int,
    data: str,
    db: Session = Depends(get_db)
):
    """Public endpoint to get busy slots for a professional on a specific date."""
    # Convert string to date/datetime for filtering
    try:
        query_date = datetime.fromisoformat(data.split('T')[0])
    except ValueError:
        raise HTTPException(status_code=400, detail="Formato de data inválido. Use AAAA-MM-DD")

    busy_appts = db.query(models.Appointment).filter(
        models.Appointment.professional_id == professional_id,
        func.date(models.Appointment.data) == query_date.date().isoformat(),
        models.Appointment.status.in_(["APROVADO", "PENDENTE", "BLOQUEADO"])
    ).all()
    return [appt.hora for appt in busy_appts]

@router.patch("/{appointment_id}/status")
def update_status(
    appointment_id: int,
    status: str,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(check_role(["ADMIN"]))
):
    appointment = db.query(models.Appointment).filter(models.Appointment.id == appointment_id).first()
    if not appointment:
        raise HTTPException(status_code=404, detail="Appointment not found")
    
    # Check if the transition is valid (business logic)
    if status == "APROVADO":
        # Additional checks for conflicts could be added here
        pass
        
    setattr(appointment, "status", status)
    db.commit()
    db.refresh(appointment)
    return appointment

@router.get("/all", response_model=List[schemas.AppointmentResponse])
def get_all_appointments(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(check_role(["ADMIN"]))
):
    """Admin endpoint to list ALL appointments with enriched names."""
    from sqlalchemy.orm import aliased
    Client = aliased(models.User)
    ProfUser = aliased(models.User)
    
    results = db.query(
        models.Appointment,
        Client.nome.label("cliente_nome"),
        Client.telefone.label("cliente_telefone"),
        ProfUser.nome.label("professional_nome"),
        models.Service.nome.label("service_nome")
    ).join(Client, models.Appointment.cliente_id == Client.id)\
     .outerjoin(models.Professional, models.Appointment.professional_id == models.Professional.id)\
     .outerjoin(ProfUser, models.Professional.user_id == ProfUser.id)\
     .outerjoin(models.Service, models.Appointment.service_id == models.Service.id)\
     .all()

    return [
        {
            "id": appt.id,
            "professional_id": appt.professional_id,
            "service_id": appt.service_id,
            "cliente_id": appt.cliente_id,
            "data": appt.data,
            "hora": appt.hora,
            "status": appt.status,
            "created_at": appt.created_at,
            "cliente_nome": c_nome,
            "cliente_telefone": c_tel,
            "professional_nome": p_nome,
            "service_nome": s_nome
        } for appt, c_nome, c_tel, p_nome, s_nome in results
    ]

@router.put("/{appointment_id}")
def update_appointment(
    appointment_id: int,
    update: schemas.AppointmentUpdate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(check_role(["ADMIN"]))
):
    """Update appointment date/time (used for drag-and-drop rescheduling)."""
    appointment = db.query(models.Appointment).filter(models.Appointment.id == appointment_id).first()
    if not appointment:
        raise HTTPException(status_code=404, detail="Agendamento não encontrado")
    
    new_data = update.data if update.data is not None else appointment.data
    new_hora = update.hora if update.hora is not None else appointment.hora
    new_prof_id = update.professional_id if update.professional_id is not None else appointment.professional_id
    
    if update.data is not None or update.hora is not None or update.professional_id is not None:
        # Duration check logic
        service = db.query(models.Service).filter(models.Service.id == appointment.service_id).first()
        duration = service.duracao if service else 30
        
        try:
            start_time = datetime.strptime(new_hora, "%H:%M")
            end_time = start_time + timedelta(minutes=duration)
            start_str = start_time.strftime("%H:%M")
            end_str = end_time.strftime("%H:%M")
        except ValueError:
            raise HTTPException(status_code=400, detail="Formato de hora inválido")

        # Availability check
        availability = db.query(models.Availability).filter(
            models.Availability.professional_id == new_prof_id,
            func.date(models.Availability.data) == new_data.date().isoformat()
        ).all()
        
        is_available = False
        if current_user.role == "ADMIN" or update.status == "BLOQUEADO":
            is_available = True
        else:
            for avail in availability:
                if avail.hora_inicio <= start_str and end_str <= avail.hora_fim:
                    is_available = True
                    break
        
        if not is_available:
            raise HTTPException(status_code=400, detail="O profissional não está disponível neste intervalo")

        # Conflict check
        existing_appts = db.query(models.Appointment).filter(
            models.Appointment.professional_id == new_prof_id,
            func.date(models.Appointment.data) == new_data.date().isoformat(),
            models.Appointment.status.in_(["APROVADO", "PENDENTE", "BLOQUEADO"]),
            models.Appointment.id != appointment_id
        ).all()

        for appt in existing_appts:
            e_service = db.query(models.Service).filter(models.Service.id == appt.service_id).first()
            e_duration = e_service.duracao if e_service else 30
            e_start_dt = datetime.strptime(appt.hora, "%H:%M")
            e_end_dt = e_start_dt + timedelta(minutes=e_duration)
            
            if (start_time < e_end_dt) and (end_time > e_start_dt):
                raise HTTPException(status_code=400, detail=f"Conflito: já existe um agendamento das {appt.hora} às {e_end_dt.strftime('%H:%M')}")

        appointment.data = new_data
        appointment.hora = new_hora
        appointment.professional_id = new_prof_id
        if update.cliente_id is not None:
            appointment.cliente_id = update.cliente_id

    if update.status is not None:
        appointment.status = update.status
    
    db.commit()
    db.refresh(appointment)
    return appointment

@router.delete("/{appointment_id}")
def delete_appointment(
    appointment_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(check_role(["ADMIN"]))
):
    """Delete an appointment or block."""
    appointment = db.query(models.Appointment).filter(models.Appointment.id == appointment_id).first()
    if not appointment:
        raise HTTPException(status_code=404, detail="Agendamento não encontrado")
    db.delete(appointment)
    db.commit()
    return {"message": "Agendamento excluído com sucesso"}

