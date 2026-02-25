from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime

class UserBase(BaseModel):
    nome: str
    email: EmailStr
    telefone: Optional[str] = None
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
    cliente_id: Optional[int] = None
    status: Optional[str] = "PENDENTE"
    guest_nome: Optional[str] = None
    guest_email: Optional[EmailStr] = None
    guest_telefone: Optional[str] = None

class AppointmentResponse(AppointmentBase):
    id: int
    cliente_id: int
    status: str
    created_at: datetime
    cliente_nome: Optional[str] = None
    cliente_telefone: Optional[str] = None
    professional_nome: Optional[str] = None
    service_nome: Optional[str] = None
    
    class Config:
        from_attributes = True

class AppointmentUpdate(BaseModel):
    data: Optional[datetime] = None
    hora: Optional[str] = None
    professional_id: Optional[int] = None
    cliente_id: Optional[int] = None
    status: Optional[str] = None


class AvailabilityBase(BaseModel):
    professional_id: int
    data: datetime
    hora_inicio: str
    hora_fim: str

class AvailabilityCreate(AvailabilityBase):
    pass

class AvailabilityResponse(AvailabilityBase):
    id: int
    professional_nome: Optional[str] = None
    class Config:
        from_attributes = True

class ProfessionalBase(BaseModel):
    user_id: int
    especialidade: str
    bio: str

class ProfessionalCreate(ProfessionalBase):
    services: Optional[List[ServiceCreate]] = []

class ProfessionalResponse(ProfessionalBase):
    id: int
    ativo: bool
    nome: Optional[str] = None
    services: List[ServiceResponse] = []
    
    class Config:
        from_attributes = True

class BlogPostBase(BaseModel):
    titulo: str
    conteudo: str
    imagem_url: Optional[str] = None

class BlogPostCreate(BlogPostBase):
    author_id: int

class BlogPostResponse(BlogPostBase):
    id: int
    author_id: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    class Config:
        from_attributes = True

class GalleryImageBase(BaseModel):
    url: str
    titulo: Optional[str] = None
    descricao: Optional[str] = None

class GalleryImageCreate(GalleryImageBase):
    pass

class GalleryImageResponse(GalleryImageBase):
    id: int
    uploaded_at: datetime
    class Config:
        from_attributes = True

class ReviewBase(BaseModel):
    nome_cliente: str
    rating: int
    comentario: str

class ReviewCreate(ReviewBase):
    pass

class ReviewResponse(ReviewBase):
    id: int
    is_approved: bool
    created_at: datetime
    class Config:
        from_attributes = True
class SettingBase(BaseModel):
    key: str
    value: str

class SettingUpdate(BaseModel):
    value: str

class SettingResponse(SettingBase):
    id: int
    class Config:
        from_attributes = True
