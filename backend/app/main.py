from fastapi import FastAPI
from fastapi.responses import FileResponse
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

# -------------------------------------------------------
# Endpoints de API definidos ANTES do mount do frontend
# -------------------------------------------------------

@app.get("/api/health")
def health_check():
    frontend_path = os.path.join(os.getcwd(), "dist")
    return {
        "status": "online",
        "message": "Sistema La Prime",
        "version": "1.0.0",
        "dist_exists": os.path.exists(frontend_path),
        "cwd": os.getcwd()
    }

# ENDPOINT TEMPORARIO - remover apos criar o admin
@app.get("/api/setup-admin")
def setup_admin():
    from .db.session import SessionLocal
    from .models.models import User
    from .core.auth import get_password_hash

    EMAIL = "admin@sistema.com"
    SENHA = "admin123"
    NOME = "Administrador"

    db = SessionLocal()
    try:
        existing = db.query(User).filter(User.email == EMAIL).first()
        if existing:
            existing.role = "ADMIN"
            existing.senha = get_password_hash(SENHA)
            existing.ativo = True
            db.commit()
            return {"status": "ok", "message": f"Usuario {EMAIL} atualizado para ADMIN", "email": EMAIL, "senha": SENHA}
        else:
            new_admin = User(
                nome=NOME,
                email=EMAIL,
                senha=get_password_hash(SENHA),
                role="ADMIN",
                ativo=True
            )
            db.add(new_admin)
            db.commit()
            db.refresh(new_admin)
            return {
                "status": "ok",
                "message": "Admin criado!",
                "email": EMAIL,
                "senha": SENHA,
                "id": new_admin.id
            }
    except Exception as e:
        db.rollback()
        return {"status": "error", "detail": str(e)}
    finally:
        db.close()

# -------------------------------------------------------
# Mount do frontend DEVE ser o ULTIMO
# -------------------------------------------------------
frontend_path = os.path.join(os.getcwd(), "dist")
print(f"Procurando frontend em: {frontend_path}")

if os.path.exists(frontend_path):
    print("✅ Frontend encontrado! Configurando SPA Fallback em /")

    @app.get("/{full_path:path}")
    async def serve_spa(full_path: str):
        # Serve static files if they exist in dist
        path = os.path.join(frontend_path, full_path)
        if os.path.isfile(path) and not full_path.startswith("api/"):
            return FileResponse(path)
        
        # Fallback to index.html for SPA routes
        return FileResponse(os.path.join(frontend_path, "index.html"))
else:
    print(f"⚠️ Frontend não encontrado em {frontend_path}")
    print(f"Arquivos na raiz: {os.listdir(os.getcwd())}")
