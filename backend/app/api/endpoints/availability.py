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

@router.get("/{professional_id}", response_model=List[schemas.AvailabilityResponse])
def get_professional_availability(professional_id: int, db: Session = Depends(get_db)):
    return db.query(models.Availability).filter(models.Availability.professional_id == professional_id).all()
