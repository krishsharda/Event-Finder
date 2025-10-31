# Deploying to Railway

This repository is a monorepo with separate frontend and backend folders. To fix “Error creating build plan with Railpack,” either point the service to the backend folder or use the Dockerfile we’ve added.

## Option A: Point service to backend (no Docker)
- Root Directory (Monorepo path): `backend`
- Install Command: `npm ci`
- Build Command: `npm run build`
- Start Command: `npm run start`

Railway will set `PORT` for you; the server reads `process.env.PORT`.

## Option B: Use Dockerfile (recommended when autodetection fails)
The backend has a multi-stage Dockerfile. In Railway, set the service Root Directory to `backend` and Railway will auto-detect and build using Docker.

### What the Dockerfile does
- Builder stage installs dev deps and compiles TypeScript to `dist/`
- Runtime stage installs only production deps and runs `node dist/server.js`

## Environment variables
- `CORS_ORIGIN` – set this to your frontend’s URL in production
- `NODE_ENV` – Railway sets this to `production` during deploy

## Frontend deployment
Deploy the frontend separately (Vercel/Netlify recommended). Ensure `VITE_API_BASE_URL` points to your Railway backend URL.

