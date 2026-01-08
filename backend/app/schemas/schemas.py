from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime

class UserBase(BaseModel):
    nome: str
    email: EmailStr
    role: str

class UserCreate(UserBase):
    senha: str

class UserResponse(UserBase):
    id: int
    ativo: bool

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class LoginRequest(BaseModel):
    email: EmailStr
    senha: str
