from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from ...db.session import get_db
from ...models import models
from ...core.auth import check_role

router = APIRouter(prefix="/admin", tags=["admin"])

@router.get("/dashboard")
def get_dashboard_stats(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(check_role(["ADMIN"]))
):
    total_appointments = db.query(models.Appointment).count()
    approved_appointments = db.query(models.Appointment).filter(models.Appointment.status == "APROVADO").count()
    
    # Simple BI data
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
