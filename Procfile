web: uvicorn app.main:app --app-dir backend --host 0.0.0.0 --port ${PORT:-8080}
release: python backend/populate_content.py
