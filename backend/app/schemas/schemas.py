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

class ServiceBase(BaseModel):
    nome: str
    duracao: int
    preco: float
    especialidade: str
    professional_id: int

class ServiceCreate(ServiceBase):
    pass

class ServiceResponse(ServiceBase):
    id: int
    class Config:
        from_attributes = True

class AppointmentBase(BaseModel):
    professional_id: int
    service_id: int
    data: datetime
    hora: str

class AppointmentCreate(AppointmentBase):
    pass

class AppointmentResponse(AppointmentBase):
    id: int
    cliente_id: int
    status: str
    created_at: datetime
    class Config:
        from_attributes = True

class AvailabilityBase(BaseModel):
    professional_id: int
    data: datetime
    hora_inicio: str
    hora_fim: str

class AvailabilityCreate(AvailabilityBase):
    pass

class AvailabilityResponse(AvailabilityBase):
    id: int
    class Config:
        from_attributes = True

class ProfessionalBase(BaseModel):
    user_id: int
    especialidade: str
    bio: str

class ProfessionalCreate(ProfessionalBase):
    pass

class ProfessionalResponse(ProfessionalBase):
    id: int
    ativo: bool
    class Config:
        from_attributes = True
