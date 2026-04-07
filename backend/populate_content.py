import os
import sys
from sqlalchemy.orm import Session
from datetime import datetime

# Garantir que o CWD seja o diretório 'backend'
if os.path.basename(os.getcwd()) != "backend":
    if os.path.exists("backend"):
        os.chdir("backend")
    else:
        print("Erro: Diretório 'backend' não encontrado.")
        sys.path.append(os.getcwd())
else:
    sys.path.append(os.getcwd())

from app.db.session import SessionLocal, engine, Base
from app.models.models import BlogPost, GalleryImage, User

def populate():
    # Garantir que as tabelas existem
    print("Criando tabelas...")
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    try:
        # Pega o primeiro admin como autor
        admin = db.query(User).filter(User.role == "ADMIN").first()
        if not admin:
            # Se não tiver admin, tenta usar o setup_admin do main.py ou cria um temporario
            from app.core.auth import get_password_hash
            admin = User(
                nome="Administrador",
                email="admin@sistema.com",
                senha=get_password_hash("admin123"),
                role="ADMIN",
                ativo=True
            )
            db.add(admin)
            db.commit()
            db.refresh(admin)
            print("Admin temporário criado: admin@sistema.com / admin123")

        print(f"Usando admin ID {admin.id} ({admin.nome}) como autor.")

        # Blog Posts
        posts = [
            {
                "titulo": "Tendências de Skincare para 2024",
                "conteudo": "A jornada para uma pele radiante em 2024 foca em minimalismo e ingredientes potentes. Na La Prime, acreditamos que a saúde da pele começa com o entendimento profundo de suas necessidades únicas. Desde a 'skin streaming' até o uso de retinóides de nova geração, descubra como simplificar sua rotina e maximizar os resultados.",
                "imagem_url": "/uploads/skincare_trends.png",
                "author_id": admin.id
            },
            {
                "titulo": "O Segredo do Sorriso Perfeito",
                "conteudo": "A odontologia estética avançou para proporcionar resultados naturais e harmoniosos. Lentes de contato dental, clareamento supervisionado e harmonização orofacial são apenas algumas das ferramentas que usamos para transformar sorrisos. Um sorriso bonito não é apenas estética, é confiança renovada.",
                "imagem_url": "/uploads/aesthetic_dentistry.png",
                "author_id": admin.id
            },
            {
                "titulo": "Luxury Nails: Muito Além da Cor",
                "conteudo": "Nossas unhas dizem muito sobre nós. O cuidado profissional garante não apenas a beleza, mas a saúde das garras. Conheça as técnicas de alongamento em gel e fibra de vidro que são tendência nas passarelas e como mantê-las impecáveis por semanas.",
                "imagem_url": "/uploads/nail_art_luxury.png",
                "author_id": admin.id
            },
            {
                "titulo": "Transformação Capilar e Saúde dos Fios",
                "conteudo": "Mudar o visual exige técnica e produtos de alta qualidade. Seja uma coloração vibrante ou um corte moderno, a integridade do fio é nossa prioridade. Aprenda como preparar seu cabelo para transformações químicas e os cuidados essenciais pós-procedimento.",
                "imagem_url": "/uploads/hair_transformation.png",
                "author_id": admin.id
            }
        ]

        for p in posts:
            existing = db.query(BlogPost).filter(BlogPost.titulo == p["titulo"]).first()
            if not existing:
                db_post = BlogPost(**p)
                db.add(db_post)
                print(f"Post '{p['titulo']}' adicionado.")
            else:
                existing.imagem_url = p["imagem_url"]
                print(f"Post '{p['titulo']}' atualizado.")

        # Gallery
        images = [
            {"url": "/uploads/skincare_trends.png", "titulo": "Cuidado Facial Premium", "descricao": "Tratamentos estéticos avançados"},
            {"url": "/uploads/aesthetic_dentistry.png", "titulo": "Odontologia Estética", "descricao": "Transformando sorrisos com tecnologia"},
            {"url": "/uploads/nail_art_luxury.png", "titulo": "Unhas de Luxo", "descricao": "Acabamento impecável e duradouro"},
            {"url": "/uploads/hair_transformation.png", "titulo": "Estúdio de Cabelo", "descricao": "Especialistas em cores e cortes"}
        ]

        for img in images:
            existing = db.query(GalleryImage).filter(GalleryImage.url == img["url"]).first()
            if not existing:
                db_img = GalleryImage(**img)
                db.add(db_img)
                print(f"Imagem '{img['titulo']}' adicionada à galeria.")
            else:
                existing.titulo = img["titulo"]
                existing.descricao = img["descricao"]
                print(f"Imagem '{img['titulo']}' atualizada.")

        db.commit()
        print("População concluída com sucesso!")
    except Exception as e:
        db.rollback()
        print(f"Erro ao popular banco de dados: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    populate()
