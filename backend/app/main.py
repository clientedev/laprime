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
base_dir = os.getcwd()
frontend_path = os.path.join(base_dir, "dist")

print(f"DEBUG: Current Working Directory: {base_dir}")
try:
    print(f"DEBUG: Root Directory Contents: {os.listdir(base_dir)}")
except Exception as e:
    print(f"DEBUG: Could not list root directory: {e}")

# Aggressive search for dist
import glob
print("DEBUG: Iniciando busca recursiva por pasta 'dist'...")
found_dists = glob.glob("**/dist", recursive=True)
print(f"DEBUG: Pastas 'dist' encontradas: {found_dists}")

if os.path.exists(frontend_path):
    print("Sucesso: Pasta 'dist' encontrada em /app/dist. Montando frontend...")
    app.mount("/", StaticFiles(directory=frontend_path, html=True), name="frontend")
elif found_dists:
    best_dist = found_dists[0]
    print(f"Sucesso: Pasta 'dist' encontrada via glob em: {best_dist}. Montando frontend...")
    app.mount("/", StaticFiles(directory=best_dist, html=True), name="frontend")
else:
    # Alternative strategy: check relative to this file
    try:
        root_from_file = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
        alt_frontend_path = os.path.join(root_from_file, "dist")
        print(f"DEBUG: Root from file: {root_from_file}")
        
        if os.path.exists(alt_frontend_path):
            print(f"Sucesso: Pasta 'dist' encontrada em caminho alternativo: {alt_frontend_path}")
            app.mount("/", StaticFiles(directory=alt_frontend_path, html=True), name="frontend")
        else:
            print(f"ERRO CRÍTICO: Frontend 'dist' NÃO encontrado em lugar nenhum.")
            print(f"Tentado: {frontend_path}")
            print(f"Tentado (alt): {alt_frontend_path}")
    except Exception as e:
        print(f"Erro durante diagnóstico de caminhos: {e}")

# Debug endpoint to list files on server
@app.get("/api/debug/files")
def debug_files():
    try:
        files_in_root = os.listdir(".")
        dist_exists = os.path.exists("dist")
        dist_files = os.listdir("dist") if dist_exists else []
        return {
            "cwd": os.getcwd(),
            "root_files": files_in_root,
            "dist_exists": dist_exists,
            "dist_files": dist_files,
            "backend_exists": os.path.exists("backend")
        }
    except Exception as e:
        return {"error": str(e)}

# Root health check (optional since static files mount to /)
@app.get("/api/health")
def health_check():
    return {
        "status": "online",
        "message": "Sistema de Gestão Clínica LA PRIME",
        "version": "1.0.0"
    }
