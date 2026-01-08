from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from ...db.session import get_db
from ...models import models
from ...schemas import schemas
from ...core.auth import check_role

router = APIRouter(prefix="/professionals", tags=["professionals"])

@router.get("/", response_model=List[schemas.ProfessionalResponse])
def get_professionals(db: Session = Depends(get_db)):
    return db.query(models.Professional).filter(models.Professional.ativo == True).all()

@router.post("/", response_model=schemas.ProfessionalResponse)
def create_professional(
    professional: schemas.ProfessionalCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(check_role(["ADMIN"]))
):
    new_prof = models.Professional(**professional.dict())
    db.add(new_prof)
    db.commit()
    db.refresh(new_prof)
    return new_prof

@router.patch("/{professional_id}/deactivate")
def deactivate_professional(
    professional_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(check_role(["ADMIN"]))
):
    prof = db.query(models.Professional).filter(models.Professional.id == professional_id).first()
    if not prof:
        raise HTTPException(status_code=404, detail="Professional not found")
    prof.ativo = False
    db.commit()
    return {"message": "Professional deactivated"}
