import sqlite3
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["pbkdf2_sha256"], deprecated="auto")

def get_password_hash(password):
    return pwd_context.hash(password)

new_password_hash = get_password_hash("admin123")

conn = sqlite3.connect('sql_app.db')
cursor = conn.cursor()
cursor.execute("UPDATE users SET senha=? WHERE email='admin@laprime.com'", (new_password_hash,))
conn.commit()
print(f"Rows updated: {cursor.rowcount}")
conn.close()
