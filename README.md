# Git & GitHub Academy

A full Node.js + React app: a login page, a "what do you want to learn?"
topic picker, and complete step-by-step lessons on Git, GitHub, and
deploying to Vercel, Netlify, GitHub Pages, Render, and Railway
(static sites, backend web services, and databases for each).

## Structure

```
gitgithub-academy/
  backend/     Express API (login + serves lesson content)
  frontend/    React app (Vite) — login, dashboard, lesson viewer
```

## Run it locally

Open two terminals.

**Terminal 1 — backend**
```bash
cd backend
npm install
npm start
# API running at http://localhost:4000
```

**Terminal 2 — frontend**
```bash
cd frontend
npm install
npm run dev
# App running at http://localhost:5173
```

Open `http://localhost:5173` in your browser.

## Demo login

```
username: admin
password: admin123
```

## Notes

- The backend uses one hardcoded demo account and a lightweight signed
  token for demonstration. Swap in a real database + bcrypt password
  hashing + JWT before deploying this anywhere real users can reach it.
- All lesson content lives in `backend/data/content.js` as structured
  "blocks" (heading, paragraph, code, steps, table, callout, compare).
  Add a new topic by adding an entry to `TOPICS` and a matching key in
  `CONTENT` — the frontend renders it automatically, no UI code needed.
- The Vite dev server proxies `/api/*` to `http://localhost:4000`, so
  the frontend and backend talk to each other with no CORS setup needed
  in development (the backend also has `cors()` enabled for production).
