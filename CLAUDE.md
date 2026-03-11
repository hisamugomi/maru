# Maru Website

Student initiative landing page — closing the gap between design and business.

## Stack
- **Vite** (migrated from Next.js — Three.js + Next.js App Router had SSR conflicts)
- React 18 + `@react-three/fiber` v8 + `@react-three/drei` v9 + Three.js
- Tailwind CSS
- Dark theme by default
- FastAPI backend (in `backend/`)

## Dev
```bash
npm install
npm run dev       # http://localhost:5173

# Backend (separate terminal)
cd backend
pip install -r requirements.txt
uvicorn main:app --reload   # http://localhost:8000
# API docs: http://localhost:8000/docs
```

## Deploy
- Frontend: Vercel (`npx vercel --prod` from project root)
- Vercel auto-detects Vite — no config needed
- `vercel.json` sets framework to "nextjs" — can be removed now we're on Vite

## Structure
```
src/
  main.jsx        — app entry point, mounts React into index.html
  App.jsx         — compose and reorder page sections here
  index.css       — Tailwind base + dark background (#0a0a0a)
components/
  Hero.jsx        — Three.js canvas hero (swap geometry/material here)
  About.jsx       — mission text
  Features.jsx    — feature cards (edit the `features` array)
  CTA.jsx         — call to action button stub
backend/
  main.py         — FastAPI app (GET /, POST /apply)
  requirements.txt
index.html        — HTML shell for Vite
vite.config.js    — Vite config (includes JSX transform for .js files)
```

## Conventions
- Each section is its own component in `components/`
- No `'use client'` needed — Vite is browser-only, no SSR
- No images — visual interest comes from the Three.js scene and typography
- TODO comments mark where developers should fill in real content
- `@react-three/fiber` v8 requires React 18 — do not upgrade React to 19

## Key decisions
- **Vite over Next.js**: Next.js App Router caused repeated SSR/React version conflicts with Three.js. Vite is browser-only, so Three.js works without workarounds.
- **React 18**: `@react-three/fiber` v8 supports `react >=18 <19`. Upgrading to React 19 breaks fiber.
- **FastAPI backend**: Simple scaffold with `GET /` health check and `POST /apply` for the CTA form. No database yet — TODO comments mark where to add persistence.
