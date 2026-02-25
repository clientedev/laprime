import requests
import json
import time

BASE_URL = "http://localhost:8000"

def test_api():
    try:
        # Check if server is up
        print(f"Checking if server is up at {BASE_URL}...")
        for i in range(5):
            try:
                requests.get(BASE_URL, timeout=5)
                print("Server is up.")
                break
            except Exception as e:
                print(f"Server not ready yet (attempt {i+1}): {e}")
                time.sleep(2)
        else:
            print("Server is not accessible after 5 attempts.")
            return

        # 1. Login
        print("Logging in...")
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

        # 3. Create Blog Post
        print("Creating blog post...")
        blog_data = {
            "titulo": "Post de Teste Automatizado",
            "conteudo": "Conteúdo do post de teste para verificar a API.",
            "imagem_url": "https://images.unsplash.com/photo-1512431119113-f338a1c0358a",
            "author_id": 1
        }
        create_blog_res = requests.post(f"{BASE_URL}/blog/", json=blog_data, headers=headers)
        if create_blog_res.status_code != 200:
            print(f"Failed to create blog post: {create_blog_res.status_code} - {create_blog_res.text}")
            return
            
        blog_post = create_blog_res.json()
        print(f"Blog post created: ID {blog_post['id']}")

        # 4. Create Gallery Image
        print("Creating gallery image...")
        gallery_data = {
            "url": "https://images.unsplash.com/photo-1512431119113-f338a1c0358a",
            "titulo": "Imagem de Teste",
            "descricao": "Descrição da imagem de teste"
        }
        create_gallery_res = requests.post(f"{BASE_URL}/gallery/", json=gallery_data, headers=headers)
        if create_gallery_res.status_code != 200:
            print(f"Failed to create gallery image: {create_gallery_res.status_code} - {create_gallery_res.text}")
            return
            
        gallery_image = create_gallery_res.json()
        print(f"Gallery image created: ID {gallery_image['id']}")

        # 5. List items to confirm
        print("Listing items...")
        list_blog_res = requests.get(f"{BASE_URL}/blog/")
        print(f"Found {len(list_blog_res.json())} blog posts.")

        list_gallery_res = requests.get(f"{BASE_URL}/gallery/")
        print(f"Found {len(list_gallery_res.json())} gallery images.")

        # 6. Delete items
        print("Deleting items...")
        del_blog_res = requests.delete(f"{BASE_URL}/blog/{blog_post['id']}", headers=headers)
        if del_blog_res.status_code != 200:
            print(f"Failed to delete blog post: {del_blog_res.status_code}")
        else:
            print("Blog post deleted.")

        del_gallery_res = requests.delete(f"{BASE_URL}/gallery/{gallery_image['id']}", headers=headers)
        if del_gallery_res.status_code != 200:
            print(f"Failed to delete gallery image: {del_gallery_res.status_code}")
        else:
            print("Gallery image deleted.")

        print("\nAll API tests passed successfully!")

    except Exception as e:
        print(f"\nTest failed: {e}")

if __name__ == "__main__":
    test_api()
