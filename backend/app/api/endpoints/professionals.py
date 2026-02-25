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
    results = db.query(models.Professional, models.User.nome).join(models.User, models.Professional.user_id == models.User.id).filter(models.Professional.ativo == True).all()
    return [
        {
            "id": p.id,
            "user_id": p.user_id,
            "especialidade": p.especialidade,
            "bio": p.bio,
            "ativo": p.ativo,
            "nome": nome,
            "services": p.services
        } for p, nome in results
    ]

@router.post("/", response_model=schemas.ProfessionalResponse)
def create_professional(
    professional: schemas.ProfessionalCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(check_role(["ADMIN"]))
):
    prof_data = professional.dict(exclude={"services"})
    new_prof = models.Professional(**prof_data)
    db.add(new_prof)
    db.commit()
    db.refresh(new_prof)
    
    # Create services if provided
    if professional.services:
        for svc_data in professional.services:
            new_svc = models.Service(
                **svc_data.dict(exclude={"professional_id"}),
                professional_id=new_prof.id
            )
            db.add(new_svc)
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
