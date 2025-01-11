# バックエンドのDockerfile
FROM node:18-alpine AS backend-builder

WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm install
COPY backend/. .
#開発用ファイルなどを削除してイメージサイズを削減
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

