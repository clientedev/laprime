from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv

load_dotenv()
from fastapi.staticfiles import StaticFiles
from .db.session import engine, Base
from .models import models
from .api.endpoints import auth, services, appointments, availability, admin, professionals, users, blog, gallery, reviews, settings, uploads

Base.metadata.create_all(bind=engine)

# Create uploads directory if it doesn't exist
os.makedirs("uploads", exist_ok=True)

app = FastAPI(title="Clínica Estética API")

# Serve static files
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

app.include_router(auth.router)
app.include_router(users.router)
app.include_router(services.router)
app.include_router(appointments.router)
app.include_router(availability.router)
app.include_router(admin.router)
app.include_router(professionals.router)
app.include_router(blog.router)
app.include_router(gallery.router)
app.include_router(reviews.router)
app.include_router(settings.router)
app.include_router(uploads.router)

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
