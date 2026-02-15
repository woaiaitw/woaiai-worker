# WOAIAI Worker

Backend Cloudflare Worker for the WOAIAI website (`woaiai-web`).

## Purpose

1. **Authentication** — Better Auth with Google/GitHub OAuth, backed by Cloudflare D1
2. **Agora Token Distribution** — Generates and distributes tokens for Agora video streams (placeholder)

## Stack

- **Runtime:** Cloudflare Workers
- **Framework:** Hono
- **Auth:** Better Auth (Kysely + D1)
- **Database:** Cloudflare D1 (SQLite)
- **Language:** TypeScript
- **Package manager:** pnpm
- **Related repo:** `woaiai-web` (Astro frontend, also deployed on Cloudflare)

## Commands

- `pnpm dev` — Start local dev server (requires Node >= 20)
- `pnpm deploy` — Deploy to Cloudflare
- `pnpm db:migrate` — Run D1 migrations against local dev server

## Project Structure

```
src/
  index.ts              — Hono app entry point, composes routes
  env.ts                — Env/Bindings type definition
  lib/
    auth.ts             — Better Auth factory (cached per binding identity)
  routes/
    auth.ts             — Better Auth handler + migration endpoint
    health.ts           — GET /health
    agora.ts            — POST /api/agora/token (placeholder, requires session)
  middleware/
    cors.ts             — CORS config (localhost:4321 + production origins)
    session.ts          — Injects user/session into Hono context
```

## Key Endpoints

- `GET /health` — Health check
- `GET|POST /api/auth/**` — Better Auth routes (login, callback, session, etc.)
- `POST /api/auth/migrate` — Create/update D1 tables from Better Auth schema
- `POST /api/agora/token` — Agora token (requires authenticated session, returns 501)

## Conventions

- Keep handlers small and focused — one route, one responsibility
- Store secrets (Agora credentials, auth keys) in Cloudflare Worker secrets, never in code
- Use Wrangler for local development and deployment
- Auth instance is created via factory (`createAuth`) because D1 bindings are only available at request time
- Session middleware is applied per-route, not globally
