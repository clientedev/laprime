from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv

load_dotenv()
from fastapi.staticfiles import StaticFiles
from .db.session import engine, Base
from .models import models
from .api.endpoints import auth, services, appointments, availability, admin, professionals, users, blog, gallery, reviews, settings, uploads

# Initialize Database
try:
    print("Iniciando criação de tabelas no banco de dados...")
    Base.metadata.create_all(bind=engine)
    print("Tabelas criadas com sucesso!")
except Exception as e:
    print(f"Erro ao criar tabelas: {e}")

# Create uploads directory if it doesn't exist
os.makedirs("uploads", exist_ok=True)

app = FastAPI(title="Clínica Estética API")

# Serve static files for uploads
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

# Include API routers
app.include_router(auth.router, prefix="/api")
app.include_router(users.router, prefix="/api")
app.include_router(services.router, prefix="/api")
app.include_router(appointments.router, prefix="/api")
app.include_router(availability.router, prefix="/api")
app.include_router(admin.router, prefix="/api")
app.include_router(professionals.router, prefix="/api")
app.include_router(blog.router, prefix="/api")
app.include_router(gallery.router, prefix="/api")
app.include_router(reviews.router, prefix="/api")
app.include_router(settings.router, prefix="/api")
app.include_router(uploads.router, prefix="/api")

# Serve frontend static files
# No Dockerfile, o dist fica em /app/dist
frontend_path = os.path.join(os.getcwd(), "dist")
print(f"Procurando frontend em: {frontend_path}")

if os.path.exists(frontend_path):
    print(f"✅ Frontend encontrado! Montando em /")
    app.mount("/", StaticFiles(directory=frontend_path, html=True), name="frontend")
else:
    print(f"⚠️ Frontend não encontrado em {frontend_path}")
    print(f"Arquivos na raiz: {os.listdir(os.getcwd())}")

@app.get("/api/health")
def health_check():
    return {
        "status": "online",
        "message": "Sistema La Prime",
        "version": "1.0.0",
        "dist_exists": os.path.exists(frontend_path),
        "cwd": os.getcwd()
    }
