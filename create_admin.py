import sys
import os

# Instalar dependencias necessarias se nao tiver
try:
    from passlib.context import CryptContext
    import psycopg2
except ImportError:
    os.system(f"{sys.executable} -m pip install passlib psycopg2-binary --quiet")
    from passlib.context import CryptContext
    import psycopg2

DATABASE_URL = "postgresql://postgres:USWVMOOGZXpocoBbNvRRKzxnjzumBNCw@shortline.proxy.rlwy.net:44238/railway"

EMAIL = "admin@sistema.com"
SENHA = "admin123"
NOME = "Administrador"

pwd_context = CryptContext(schemes=["pbkdf2_sha256"], deprecated="auto")
hashed = pwd_context.hash(SENHA)

conn = psycopg2.connect(DATABASE_URL)
cur = conn.cursor()

# Verificar se usuario ja existe
cur.execute("SELECT id, email, role FROM users WHERE email = %s", (EMAIL,))
existing = cur.fetchone()

if existing:
    # Atualizar para ADMIN se ja existe
    cur.execute("UPDATE users SET role = 'ADMIN', senha = %s WHERE email = %s", (hashed, EMAIL))
    conn.commit()
    print(f"✅ Usuario existente atualizado para ADMIN: {EMAIL}")
else:
    # Criar novo usuario admin
    cur.execute(
        "INSERT INTO users (nome, email, senha, role, ativo) VALUES (%s, %s, %s, %s, %s) RETURNING id",
        (NOME, EMAIL, hashed, "ADMIN", True)
    )
    user_id = cur.fetchone()[0]
    conn.commit()
    print(f"✅ Usuario administrador criado com sucesso!")
    print(f"   ID: {user_id}")
    print(f"   Email: {EMAIL}")
    print(f"   Senha: {SENHA}")
    print(f"   Role: ADMIN")

cur.close()
conn.close()
print("\n🎉 Pronto! Faça login com as credenciais acima.")
