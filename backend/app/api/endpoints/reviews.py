from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from ...db.session import get_db
from ...models import models
from ...schemas import schemas

router = APIRouter(prefix="/reviews", tags=["reviews"])

@router.post("/", response_model=schemas.ReviewResponse)
def create_review(review: schemas.ReviewCreate, db: Session = Depends(get_db)):
    db_review = models.Review(**review.dict(), is_approved=False)
    db.add(db_review)
    db.commit()
    db.refresh(db_review)
    return db_review

@router.get("/", response_model=List[schemas.ReviewResponse])
def get_reviews(approved_only: bool = True, db: Session = Depends(get_db)):
    query = db.query(models.Review)
    if approved_only:
        query = query.filter(models.Review.is_approved == True)
    return query.order_by(models.Review.created_at.desc()).all()

@router.patch("/{review_id}/approve", response_model=schemas.ReviewResponse)
def approve_review(review_id: int, db: Session = Depends(get_db)):
    review = db.query(models.Review).filter(models.Review.id == review_id).first()
    if not review:
        raise HTTPException(status_code=404, detail="Avaliação não encontrada")
    review.is_approved = True
    db.commit()
    db.refresh(review)
    return review

@router.delete("/{review_id}")
def delete_review(review_id: int, db: Session = Depends(get_db)):
    review = db.query(models.Review).filter(models.Review.id == review_id).first()
    if not review:
        raise HTTPException(status_code=404, detail="Avaliação não encontrada")
    db.delete(review)
    db.commit()
    return {"message": "Avaliação deletada com sucesso"}
