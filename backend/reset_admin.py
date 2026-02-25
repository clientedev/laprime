"""
Script standalone para criar/resetar o admin e migrar o banco.
"""
import sqlite3
import os
from passlib.context import CryptContext

DB_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "sql_app.db")
print(f"Banco de dados: {DB_PATH}")

pwd_context = CryptContext(schemes=["pbkdf2_sha256"], deprecated="auto")
hashed = pwd_context.hash("admin123")

conn = sqlite3.connect(DB_PATH)
cursor = conn.cursor()

# Verificar se a tabela existe
cursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='users'")
if not cursor.fetchone():
    print("ERRO: Tabela 'users' nao encontrada. Iniciando o backend primeiro para criar as tabelas.")
    conn.close()
    exit(1)

# Verificar colunas existentes
cursor.execute("PRAGMA table_info(users)")
cols = [row[1] for row in cursor.fetchall()]
print(f"Colunas atuais: {cols}")

# Adicionar coluna telefone se nao existir
if "telefone" not in cols:
    cursor.execute("ALTER TABLE users ADD COLUMN telefone TEXT")
    print("Coluna 'telefone' adicionada.")
    conn.commit()

# Remover admin existente
cursor.execute("DELETE FROM users WHERE email = 'admin@laprime.com'")
deleted = cursor.rowcount
if deleted:
    print(f"Admin antigo removido.")

# Criar novo admin
cursor.execute("""
    INSERT INTO users (nome, email, telefone, senha, role, ativo)
    VALUES (?, ?, ?, ?, ?, ?)
""", ("Administrador", "admin@laprime.com", "11999999999", hashed, "ADMIN", 1))

conn.commit()
conn.close()

print("=" * 40)
print("Admin criado com sucesso!")
print("  Email: admin@laprime.com")
print("  Senha: admin123")
print("=" * 40)
