from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
import shutil
import os
import uuid
from ...models import models
from ...core.auth import get_current_user

router = APIRouter(prefix="/uploads", tags=["uploads"])

@router.post("/image")
async def upload_image(
    file: UploadFile = File(...),
    current_user: models.User = Depends(get_current_user)
):
    # Ensure uploads directory exists
    os.makedirs("uploads", exist_ok=True)
    
    # Validate file type
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Arquivo deve ser uma imagem")
    
    # Generate unique filename
    ext = os.path.splitext(file.filename)[1]
    if not ext:
        ext = ".jpg" # Default extension if none found
        
    filename = f"{uuid.uuid4()}{ext}"
    file_path = os.path.join("uploads", filename)
    
    # Save file
    try:
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao salvar arquivo: {str(e)}")
    
    return {"url": f"/uploads/{filename}"}
