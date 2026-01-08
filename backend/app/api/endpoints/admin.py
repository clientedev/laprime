from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from ...db.session import get_db
from ...models import models
from ...schemas import schemas
from ...core.auth import check_role

router = APIRouter(prefix="/admin", tags=["admin"])

@router.get("/users", response_model=List[schemas.UserResponse])
def get_all_users(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(check_role(["ADMIN"]))
):
    return db.query(models.User).all()

@router.patch("/users/{user_id}/toggle-active")
def toggle_user_active(
    user_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(check_role(["ADMIN"]))
):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    user.ativo = not user.ativo
    db.commit()
    return {"message": f"User {'activated' if user.ativo else 'deactivated'}"}

@router.get("/dashboard")
def get_dashboard_stats(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(check_role(["ADMIN"]))
):
    from sqlalchemy import func
    total_appointments = db.query(models.Appointment).count()
    approved_appointments = db.query(models.Appointment).filter(models.Appointment.status == "APROVADO").count()
    
    services_usage = db.query(
        models.Service.nome,
        func.count(models.Appointment.id).label("total")
    ).join(models.Appointment).group_by(models.Service.nome).all()
    
    return {
        "total_appointments": total_appointments,
        "approval_rate": (approved_appointments / total_appointments * 100) if total_appointments > 0 else 0,
        "services_usage": [{"name": s[0], "count": s[1]} for s in services_usage],
        "active_clients": db.query(models.User).filter(models.User.role == "CLIENTE", models.User.ativo == True).count()
    }
