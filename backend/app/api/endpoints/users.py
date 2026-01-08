from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from ...db.session import get_db
from ...models import models
from ...schemas import schemas
from ...core.auth import get_current_user, check_role

router = APIRouter(prefix="/users", tags=["users"])

@router.get("/me", response_model=schemas.UserResponse)
def get_me(current_user: models.User = Depends(get_current_user)):
    return current_user

@router.patch("/me", response_model=schemas.UserResponse)
def update_me(
    user_update: schemas.UserBase,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    for key, value in user_update.dict().items():
        setattr(current_user, key, value)
    db.commit()
    db.refresh(current_user)
    return current_user
