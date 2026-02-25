from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from ...db.session import get_db
from ...models import models
from ...schemas import schemas
from ...core.auth import check_role

router = APIRouter(prefix="/availability", tags=["availability"])

@router.post("/", response_model=schemas.AvailabilityResponse)
def create_availability(
    availability: schemas.AvailabilityCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(check_role(["ADMIN", "PROFISSIONAL"]))
):
    new_avail = models.Availability(**availability.dict())
    db.add(new_avail)
    db.commit()
    db.refresh(new_avail)
    return new_avail

@router.post("/bulk", response_model=List[schemas.AvailabilityResponse])
def create_availability_bulk(
    availabilities: List[schemas.AvailabilityCreate],
    db: Session = Depends(get_db),
    current_user: models.User = Depends(check_role(["ADMIN", "PROFISSIONAL"]))
):
    new_items = []
    for item in availabilities:
        new_avail = models.Availability(**item.dict())
        db.add(new_avail)
        new_items.append(new_avail)
    db.commit()
    for item in new_items:
        db.refresh(item)
    return new_items

@router.get("/", response_model=List[schemas.AvailabilityResponse])
def get_all_availabilities(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(check_role(["ADMIN", "PROFISSIONAL"]))
):
    results = db.query(models.Availability, models.User.nome).join(models.Professional, models.Availability.professional_id == models.Professional.id).join(models.User, models.Professional.user_id == models.User.id).all()
    return [
        {
            "id": a.id,
            "professional_id": a.professional_id,
            "data": a.data,
            "hora_inicio": a.hora_inicio,
            "hora_fim": a.hora_fim,
            "professional_nome": nome
        } for a, nome in results
    ]

@router.get("/{professional_id}", response_model=List[schemas.AvailabilityResponse])
def get_professional_availability(professional_id: int, db: Session = Depends(get_db)):
    results = db.query(models.Availability, models.User.nome).join(models.Professional, models.Availability.professional_id == models.Professional.id).join(models.User, models.Professional.user_id == models.User.id).filter(models.Availability.professional_id == professional_id).all()
    return [
        {
            "id": a.id,
            "professional_id": a.professional_id,
            "data": a.data,
            "hora_inicio": a.hora_inicio,
            "hora_fim": a.hora_fim,
            "professional_nome": nome
        } for a, nome in results
    ]
