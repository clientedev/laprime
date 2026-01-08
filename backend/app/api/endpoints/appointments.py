from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from ...db.session import get_db
from ...models import models
from ...schemas import schemas
from ...core.auth import get_current_user, check_role

router = APIRouter(prefix="/appointments", tags=["appointments"])

@router.post("/", response_model=schemas.AppointmentResponse)
def create_appointment(
    appointment: schemas.AppointmentCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    # Check for conflicts
    conflict = db.query(models.Appointment).filter(
        models.Appointment.professional_id == appointment.professional_id,
        models.Appointment.data == appointment.data,
        models.Appointment.hora == appointment.hora,
        models.Appointment.status == "APROVADO"
    ).first()
    if conflict:
        raise HTTPException(status_code=400, detail="Horário já reservado")
    
    new_appointment = models.Appointment(
        **appointment.dict(),
        cliente_id=current_user.id,
        status="PENDENTE"
    )
    db.add(new_appointment)
    db.commit()
    db.refresh(new_appointment)
    return new_appointment

@router.get("/my", response_model=List[schemas.AppointmentResponse])
def get_my_appointments(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    if current_user.role == "CLIENTE":
        return db.query(models.Appointment).filter(models.Appointment.cliente_id == current_user.id).all()
    elif current_user.role == "PROFISSIONAL":
        prof = db.query(models.Professional).filter(models.Professional.user_id == current_user.id).first()
        return db.query(models.Appointment).filter(models.Appointment.professional_id == prof.id).all()
    return db.query(models.Appointment).all()

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
    appointment.status = status
    db.commit()
    db.refresh(appointment)
    return appointment
