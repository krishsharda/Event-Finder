# Mini Event Finder (Full-Stack)

This repository contains a lightweight Event Finder app: a Node.js + Express backend and a React frontend (Vite).

Quick start

1. Start backend

   - Open a terminal in `./backend`
   - Install deps: `npm install`
   - Start: `npm start`

2. Start frontend

   - Open a terminal in `./frontend`
   - Install deps: `npm install`
   - Start dev server: `npm run dev`

By default the backend listens on port 4000. You can change it via `.env`.

API

- POST /api/events - Create an event. Body: { title, description, location, date (ISO string), maxParticipants }
- GET /api/events - List events. Optional query: `?location=...`
- GET /api/events/:id - Get single event

Environment

- Copy `.env.example` to `.env` in `backend` to set PORT if needed.

Notes

- Uses in-memory storage (no DB). Restarting backend clears events.
- Built quickly for the coding challenge — feel free to extend (search, distance calc, auth, DB).
