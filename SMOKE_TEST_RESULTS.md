# ScholarSync Local Smoke Test Results

**Date:** 2026-02-16
**Environment:** Next.js 16.1.6 (Turbopack), PostgreSQL 16 + pgvector (Docker), DEV_USER_ID bypass (no Clerk)

## Setup

- PostgreSQL: `pgvector/pgvector:pg16` Docker container on port 5433 (5432 occupied by local postgres)
- Auth: DEV_USER_ID=dev_user_001 bypass (Clerk keys set to placeholders)
- Schema: Pushed via `drizzle-kit push`
- Seed: POST /api/seed — seeded 1 user, 6 projects, 8 papers, 5 searches, 1 document, 1 conversation, 1 slide deck

## Page Results

| Page | URL | Status | Result |
|------|-----|--------|--------|
| Landing | http://localhost:3001/ | 200 | Working |
| Dashboard | http://localhost:3001/dashboard | 200 | Working |
| Projects | http://localhost:3001/projects | 200 | Working |
| Library | http://localhost:3001/library | 200 | Working |
| Research | http://localhost:3001/research | 200 | Working |
| Studio | http://localhost:3001/studio | 200 | Working |
| Notebook | http://localhost:3001/notebook | 200 | Working |
| Analysis | http://localhost:3001/analysis | 200 | Working |
| Compliance | http://localhost:3001/compliance | 200 | Working |
| Presentation | http://localhost:3001/presentation | 200 | Working |
| Settings | http://localhost:3001/settings | 200 | Working |

## Summary

All 11 pages return HTTP 200 with no server-side errors. The dev auth bypass (`DEV_USER_ID`) and Clerk placeholder key detection work correctly — no authentication errors during local development.

## Notes

- Port 3000 was in use; dev server auto-selected port 3001
- Next.js shows a deprecation warning: `middleware` file convention deprecated in favor of `proxy`
- AI features (chat, embeddings, research) require valid API keys to function; pages load but AI calls will fail with placeholder keys
