from app.db.session import SessionLocal
from app.models import models

def cleanup():
    db = SessionLocal()
    try:
        print("Cleaning up database...")
        
        # Order matters due to foreign keys if they were strictly enforced (SQLite usually isn't but good practice)
        db.query(models.Appointment).delete()
        db.query(models.Availability).delete()
        db.query(models.Service).delete()
        db.query(models.Professional).delete()
        
        # Keep ADMIN users, remove others if needed, but the user only asked for professionals
        # Let's just remove professionals for now as requested
        
        db.commit()
        print("Cleanup successful!")
    except Exception as e:
        db.rollback()
        print(f"Error during cleanup: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    cleanup()
