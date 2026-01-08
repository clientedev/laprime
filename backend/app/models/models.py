from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, DateTime, Float
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from ..db.session import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String)
    email = Column(String, unique=True, index=True)
    senha = Column(String)
    role = Column(String) # ADMIN, PROFISSIONAL, CLIENTE
    ativo = Column(Boolean, default=True)

    professional = relationship("Professional", back_populates="user", uselist=False)
    appointments = relationship("Appointment", back_populates="client")

class Professional(Base):
    __tablename__ = "professionals"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    especialidade = Column(String)
    bio = Column(String)
    ativo = Column(Boolean, default=True)

    user = relationship("User", back_populates="professional")
    services = relationship("Service", back_populates="professional")
    availabilities = relationship("Availability", back_populates="professional")
    appointments = relationship("Appointment", back_populates="professional")

class Service(Base):
    __tablename__ = "services"
    id = Column(Integer, primary_key=True, index=True)
    professional_id = Column(Integer, ForeignKey("professionals.id"))
    nome = Column(String)
    duracao = Column(Integer) # em minutos
    preco = Column(Float)
    especialidade = Column(String)

    professional = relationship("Professional", back_populates="services")
    appointments = relationship("Appointment", back_populates="service")

class Availability(Base):
    __tablename__ = "availabilities"
    id = Column(Integer, primary_key=True, index=True)
    professional_id = Column(Integer, ForeignKey("professionals.id"))
    data = Column(DateTime)
    hora_inicio = Column(String)
    hora_fim = Column(String)

    professional = relationship("Professional", back_populates="availabilities")

class Appointment(Base):
    __tablename__ = "appointments"
    id = Column(Integer, primary_key=True, index=True)
    cliente_id = Column(Integer, ForeignKey("users.id"))
    professional_id = Column(Integer, ForeignKey("professionals.id"))
    service_id = Column(Integer, ForeignKey("services.id"))
    data = Column(DateTime)
    hora = Column(String)
    status = Column(String, default="PENDENTE") # PENDENTE, APROVADO, RECUSADO
    created_at = Column(DateTime, server_default=func.now())

    client = relationship("User", back_populates="appointments")
    professional = relationship("Professional", back_populates="appointments")
    service = relationship("Service", back_populates="appointments")
