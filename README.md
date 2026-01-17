# Portfolio Profile App (MongoDB + Node.js + Express)

A minimal full-stack playground to store a personal profile in MongoDB, expose it via a REST API, and provide a basic frontend (HTML5 UP Massively) to query and view the data.

## Architecture
- **Backend**: Node.js, Express, Mongoose; CRUD for profile, query endpoints, health check.
- **Database**: MongoDB (`profiles` collection) with indexes for search and queries.
- **Frontend**: Static HTML/JS (Massively template) with minimal UI to call the API.

## Endpoints
- `GET /health` – liveness check
- `GET /api/profile` – read profile
- `POST /api/profile` – create profile (single doc)
- `PUT /api/profile` – upsert/update profile
- `PATCH /api/profile` – partial update (same as upsert)
- `GET /api/projects?skill=python` – filter projects by skill
- `GET /api/skills/top` – aggregate top skills
- `GET /api/search?q=...` – text search across profile fields

## Database Schema
See [backend/schema.md](backend/schema.md). Single `profiles` collection with nested arrays for `projects`, `education`, and `work`. Text and single-field indexes.

## Setup (Local)
1. Install MongoDB locally or use MongoDB Atlas.
2. Create backend environment file:
   - Copy `backend/.env.example` to `backend/.env` and set values.
3. Install backend dependencies and seed:

```bash
cd backend
npm install
npm run seed
npm run dev
```

4. Serve the frontend (any static server, e.g. VS Code Live Server or `npx serve`):
   - Ensure `window.API_BASE` in `frontend/index.html` points to your backend URL.

## Production & Hosting
- **Backend**: Render/Railway/Fly.io with `MONGODB_URI` and `FRONTEND_ORIGIN` env vars.
- **Frontend**: Netlify/Vercel/Static hosting (GitHub Pages). Update `window.API_BASE` to the deployed backend URL.
- **CORS**: Backend uses `FRONTEND_ORIGIN`; set this to your frontend origin (e.g., `https://your-site.netlify.app`).

### Render (example)
1. Create a new Render Web Service from `backend/`.
2. Build command: `npm install`
3. Start command: `npm start`
4. Env vars: `MONGODB_URI`, `FRONTEND_ORIGIN`, `PORT` (optional)
5. Seed by running one-off job: `npm run seed`

### Netlify (frontend)
- Deploy the `frontend/` folder as a static site.
- Update `window.API_BASE` in `index.html` to your backend URL.

## Sample cURL
```bash
# Health
curl -s https://your-backend.example.com/health

# Read profile
curl -s https://your-backend.example.com/api/profile

# Upsert profile
curl -s -X PUT -H "Content-Type: application/json" \
  -d @backend/seed/profile.json \
  https://your-backend.example.com/api/profile

# Projects by skill
curl -s "https://your-backend.example.com/api/projects?skill=python"

# Top skills
curl -s https://your-backend.example.com/api/skills/top

# Search
curl -s "https://your-backend.example.com/api/search?q=data"
```

## Known Limitations
- Single-profile assumption; routes operate on the first/only document.
- Minimal validation; for production, add schema validation and auth.
- Text search relies on default MongoDB analyzers.

## Resume
Add your resume link here: https://your-resume-link.example.com

## Repo Links
- Backend: `backend/`
- Frontend: `frontend/`
