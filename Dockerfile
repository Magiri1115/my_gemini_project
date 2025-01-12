# バックエンドのDockerfile
FROM node:18-alpine AS backend-builder
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm install
COPY backend/. .
# 開発用ファイルなどを削除してイメージサイズを削減
RUN npm prune --production
# フロントエンドのDockerfile
FROM node:18-alpine AS frontend-builder
# frontendディレクトリを作成
RUN mkdir -p /app/frontend
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/. .
RUN npm run build
#開発用ファイルなどを削除してイメージサイズを削減
RUN npm prune --production
# 最終的なイメージ
FROM nginx:alpine
COPY --from=backend-builder /app/backend /app/backend
COPY --from=frontend-builder /app/frontend/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# ベースイメージの指定(Pythonバージョンの指定)
FROM python:3.9-slim-buster
# 作業ディレクトリの作成と移動
WORKDIR /app
# 日本語フォントのインストール (必要に応じて)
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        fonts-ipafont-gothic \
        && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

ENV PYTHONUNBUFFERED=1

CMD ["python", "your_script.py"]

