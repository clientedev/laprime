from app.db.session import engine, Base
from app.models import models
import os

print("Testing database connection...")
try:
    Base.metadata.create_all(bind=engine)
    print("Database tables created successfully!")
except Exception as e:
    print(f"Error creating database tables: {e}")
