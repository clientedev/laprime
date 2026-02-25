import sqlite3
conn = sqlite3.connect('sql_app.db')
cursor = conn.cursor()
cursor.execute("UPDATE users SET role='ADMIN' WHERE email='admin@laprime.com'")
conn.commit()
print(f"Rows updated: {cursor.rowcount}")
conn.close()
