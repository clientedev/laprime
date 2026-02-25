import requests
import json

BASE_URL = "http://localhost:8000"

def test_admin_create_user():
    # 1. Login as Admin
    print("Logging in as Admin...")
    login_res = requests.post(f"{BASE_URL}/auth/login", data={
        "username": "admin@laprime.com",
        "password": "admin123"
    })
    if login_res.status_code != 200:
        print(f"Login failed: {login_res.status_code} - {login_res.text}")
        return
    
    token = login_res.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}
    print("Login successful.")

    # 2. Create User
    data = {
        "nome": "New User Admin Created",
        "email": "newadminuser@example.com",
        "telefone": "987654321",
        "senha": "password123",
        "role": "CLIENTE"
    }
    print(f"Attempting to create user via /api/admin/users...")
    res = requests.post(f"{BASE_URL}/admin/users", json=data, headers=headers)
    print(f"Status Code: {res.status_code}")
    print(f"Response Body: {res.text}")

if __name__ == "__main__":
    test_admin_create_user()
