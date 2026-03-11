# Maru Website

Student initiative landing page — closing the gap between design and business.

## Stack
- **Vite** (migrated from Next.js — Three.js + Next.js App Router had SSR conflicts)
- React 18 + `@react-three/fiber` v8 + `@react-three/drei` v9 + Three.js
- **Tailwind CSS v4** + `@tailwindcss/vite` plugin (upgraded from v3 to match shadcn v4)
- **shadcn/ui v4** for components (Button, etc.)
- Dark theme always on — `class="dark"` on `<html>`
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
- Vercel auto-detects Vite — no config needed (vercel.json deleted)

## Structure
```
src/
  main.jsx        — app entry point, mounts React into index.html
  App.jsx         — compose and reorder page sections here
  index.css       — Tailwind imports + CSS variable theme + body styles
components/
  Hero.jsx        — Three.js canvas hero + Button component
  About.jsx       — mission text
  Features.jsx    — feature cards (edit the `features` array)
  CTA.jsx         — call to action button stub
  ui/
    button.jsx    — shadcn Button component (generated via `npx shadcn add button`)
backend/
  main.py         — FastAPI app (GET /, POST /apply)
  requirements.txt
index.html        — HTML shell, has class="dark" on <html>
vite.config.js    — Vite config with @tailwindcss/vite and @/ alias
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
- **Tailwind v4**: shadcn v4 is designed for Tailwind v4. Using v3 caused CSS variable double-wrapping issues (`oklch(oklch(...))`) making colors invalid. Upgraded to v4 to fix.
- **No tailwind.config.js**: Tailwind v4 doesn't use a config file. Content scanning and theme config happens in CSS via `@theme`.
- **No `@apply` for body styles**: In Tailwind v4, `bg-background` isn't auto-generated from CSS variables unless registered in `@theme`. Use plain `var(--background)` in CSS instead.
- **Dark mode via class**: `class="dark"` on `<html>` in index.html. CSS variables in `.dark {}` block override `:root {}` defaults.
- **`@/` alias**: Configured in vite.config.js pointing to project root. Required for shadcn component imports like `@/components/ui/button`.
- **FastAPI backend**: Simple scaffold with `GET /` health check and `POST /apply` for the CTA form. No database yet — TODO comments mark where to add persistence.
