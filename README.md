# Jason Campbell Portfolio Starter

A readable full-stack starter for a portfolio site with:

- `frontend`: React + Vite + React Router + Tailwind
- `backend`: Express API with optional Mongo connection
- `shared`: portfolio project data used by both apps

## Scripts

- `npm install`
- `npm run dev`
- `npm run dev:frontend`
- `npm run dev:backend`
- `npm run test`

## Notes

- Mongo is optional. Add `MONGODB_URI` in `backend/.env` to enable it.
- The frontend expects the backend on `http://localhost:4000`.
- Files are intentionally split to keep them readable and under 200 lines.
