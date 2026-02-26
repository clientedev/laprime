"""
Script standalone para criar/resetar o admin e migrar o banco usando SQLAlchemy.
Este script é compatível com qualquer banco de dados definido na variável de ambiente DATABASE_URL.
"""
import os
import sys
from dotenv import load_dotenv
from passlib.context import CryptContext

# Adicionar o diretório atual ao sys.path para importar o app
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.db.session import engine, Base, SessionLocal
from app.models.models import User

# Carregar variáveis de ambiente
load_dotenv()

def reset_admin():
    print(f"Banco de dados: {os.getenv('DATABASE_URL')}")
    
    pwd_context = CryptContext(schemes=["pbkdf2_sha256"], deprecated="auto")
    hashed_password = pwd_context.hash("admin123")

    # Criar tabelas se não existirem
    print("Criando tabelas...")
    Base.metadata.create_all(bind=engine)
    print("Tabelas verificadas/criadas.")

    db = SessionLocal()
    try:
        # Remover admin existente
        admin_email = "admin@laprime.com"
        db.query(User).filter(User.email == admin_email).delete()
        db.commit()
        print(f"Admin antigo removido (se existia).")

        # Criar novo admin
        new_admin = User(
            nome="Administrador",
            email=admin_email,
            telefone="11999999999",
            senha=hashed_password,
            role="ADMIN",
            ativo=True
        )
        db.add(new_admin)
        db.commit()

        print("=" * 40)
        print("Admin criado com sucesso!")
        print(f"  Email: {admin_email}")
        print("  Senha: admin123")
        print("=" * 40)
    except Exception as e:
        print(f"Erro ao resetar admin: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    reset_admin()
