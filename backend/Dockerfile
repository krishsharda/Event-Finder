# syntax=docker/dockerfile:1

# ---- Build stage: compile TypeScript ----
FROM node:20-alpine AS builder
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci --no-audit --no-fund

# Copy sources and tsconfig, then build
COPY tsconfig.json ./
COPY src ./src
RUN npm run build

# ---- Runtime stage: run compiled app ----
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Install only production deps
COPY package*.json ./
RUN npm ci --omit=dev --no-audit --no-fund

# Copy compiled output from builder
COPY --from=builder /app/dist ./dist

# Railway sets PORT env var; server reads process.env.PORT
EXPOSE 8080

CMD ["node", "dist/server.js"]
