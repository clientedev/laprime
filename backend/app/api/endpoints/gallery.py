from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from ...db.session import get_db
from ...models import models
from ...schemas import schemas

router = APIRouter(prefix="/gallery", tags=["gallery"])

@router.post("/", response_model=schemas.GalleryImageResponse)
def add_gallery_image(image: schemas.GalleryImageCreate, db: Session = Depends(get_db)):
    db_image = models.GalleryImage(**image.dict())
    db.add(db_image)
    db.commit()
    db.refresh(db_image)
    return db_image

@router.get("/", response_model=List[schemas.GalleryImageResponse])
def get_gallery_images(db: Session = Depends(get_db)):
    return db.query(models.GalleryImage).order_by(models.GalleryImage.uploaded_at.desc()).all()

@router.delete("/{image_id}")
def delete_gallery_image(image_id: int, db: Session = Depends(get_db)):
    image = db.query(models.GalleryImage).filter(models.GalleryImage.id == image_id).first()
    if not image:
        raise HTTPException(status_code=404, detail="Imagem não encontrada")
    db.delete(image)
    db.commit()
    return {"message": "Imagem deletada com sucesso"}
