from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from typing import List
import shutil
import os
import json
import uuid
from ...db.session import get_db
from ...models import models
from ...schemas import schemas

router = APIRouter(prefix="/settings", tags=["settings"])

@router.post("/upload-hero")
async def upload_hero_image(
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    # Ensure uploads directory exists
    os.makedirs("uploads", exist_ok=True)
    
    # Generate unique filename
    ext = os.path.splitext(file.filename)[1]
    filename = f"hero_{uuid.uuid4()}{ext}"
    file_path = os.path.join("uploads", filename)
    
    # Save file
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    # Update hero_images setting
    current_images_setting = db.query(models.Setting).filter(models.Setting.key == "hero_images").first()
    if current_images_setting:
        images = json.loads(current_images_setting.value)
    else:
        images = []
        current_images_setting = models.Setting(key="hero_images", value="[]")
        db.add(current_images_setting)
    
    # Add new image URL (path)
    # Using relative path for frontend to prepend /uploads/ or base URL
    images.append(f"/uploads/{filename}")
    current_images_setting.value = json.dumps(images)
    
    db.commit()
    return {"url": f"/uploads/{filename}", "all_images": images}

@router.get("/{key}", response_model=schemas.SettingResponse)
def get_setting(key: str, db: Session = Depends(get_db)):
    setting = db.query(models.Setting).filter(models.Setting.key == key).first()
    if not setting:
        raise HTTPException(status_code=404, detail="Configuração não encontrada")
    return setting

@router.put("/{key}", response_model=schemas.SettingResponse)
def update_setting(key: str, setting_update: schemas.SettingUpdate, db: Session = Depends(get_db)):
    db_setting = db.query(models.Setting).filter(models.Setting.key == key).first()
    if db_setting:
        db_setting.value = setting_update.value
    else:
        db_setting = models.Setting(key=key, value=setting_update.value)
        db.add(db_setting)
    
    db.commit()
    db.refresh(db_setting)
    return db_setting
