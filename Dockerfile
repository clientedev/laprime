# =====================================================
# STAGE 1: Build do frontend (Node.js)
# =====================================================
FROM node:20-slim AS frontend-builder

WORKDIR /app

# Copiar arquivos de dependências
COPY package.json package-lock.json ./

# Instalar dependências
RUN npm ci

# Copiar código fonte do frontend
COPY index.html vite.config.ts tsconfig.json vite-env.d.ts ./
COPY src ./src
COPY attached_assets ./attached_assets

# Build do frontend
RUN npm run build

# =====================================================
# STAGE 2: Imagem final (Python 3.11 com pip nativo)
# =====================================================
FROM python:3.11-slim

WORKDIR /app

# Copiar requirements e instalar dependências Python
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copiar backend
COPY backend ./backend

# Copiar o dist do frontend gerado no stage 1
COPY --from=frontend-builder /app/dist ./dist

# Criar diretório de uploads
RUN mkdir -p uploads

# Expor a porta
EXPOSE 8080

# Comando de inicialização
CMD ["python", "-m", "uvicorn", "app.main:app", "--app-dir", "backend", "--host", "0.0.0.0", "--port", "8080"]
