from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .db.session import engine, Base
from .models import models
from .api.endpoints import auth, services, appointments, availability, admin, professionals, users

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Clínica Estética API")

app.include_router(auth.router)
app.include_router(users.router)
app.include_router(services.router)
app.include_router(appointments.router)
app.include_router(availability.router)
app.include_router(admin.router)
app.include_router(professionals.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"]
)

# Root endpoint for health check
@app.get("/")
def read_root():
    return {
        "status": "online",
        "message": "Sistema de Gestão Clínica LA PRIME",
        "version": "1.0.0"
    }
