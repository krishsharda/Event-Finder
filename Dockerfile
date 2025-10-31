# Multi-stage build for Event Finder on Fly.io
FROM node:20-alpine AS frontend-builder

WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build

FROM node:20-alpine AS backend-builder

WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm ci
COPY backend/ ./
RUN npm run build

FROM node:20-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production

# Copy backend production dependencies
COPY backend/package*.json ./
RUN npm ci --omit=dev

# Copy compiled backend
COPY --from=backend-builder /app/backend/dist ./dist

# Copy frontend build to be served by backend
COPY --from=frontend-builder /app/frontend/dist ./frontend-dist

# Update backend to serve from frontend-dist
RUN sed -i 's|frontend/dist|frontend-dist|g' dist/server.js || true

EXPOSE 8080

CMD ["node", "dist/server.js"]
