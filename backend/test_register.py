import requests
import json

BASE_URL = "http://localhost:8000"

def test_register():
    data = {
        "nome": "Test User",
        "email": "test@example.com",
        "telefone": "123456789",
        "senha": "password123",
        "role": "CLIENTE"
    }
    try:
        print(f"Sending registration request to {BASE_URL}/auth/register...")
        response = requests.post(f"{BASE_URL}/auth/register", json=data)
        print(f"Status Code: {response.status_code}")
        print(f"Response Body: {response.text}")
    except Exception as e:
        print(f"Request failed: {e}")

if __name__ == "__main__":
    test_register()
