# Safarnow — AI-Powered Smart Tourism

A React (Vite) single-page app for AI-powered trip planning across India and
beyond: destinations/packages/hotels catalog, live safety & crowd intelligence,
weather-aware day-by-day AI itineraries, Clerk auth, booking & trip management,
an admin content studio, PWA offline support, and a Gemini travel assistant.

## Tech stack

- **Frontend**: React 19 + Vite 8 + Tailwind CSS v4, React Router, Lucide icons
- **Auth**: Clerk (Google OAuth + email/password), with a local demo fallback
- **Database**: Supabase (Postgres) — catalog + user-data tables
- **AI**: Google Gemini via secure serverless proxy (`/api/ai/chat`)
- **Deployment**: Vercel (static SPA + Node serverless functions)

## Getting started

```bash
npm install
npm run dev        # start Vite dev server
npm run build      # production build to dist/
npm run preview    # serve the built app locally
npm run lint       # oxlint
```

Copy `.env.example` to `.env` and fill in your keys (see "Environment" below).

## Environment variables

| Variable | Where | Purpose |
|---|---|---|
| `VITE_SUPABASE_URL` | client + server | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | client + server | Public/anon key |
| `VITE_CLERK_PUBLISHABLE_KEY` | client + server | Clerk publishable key |
| `GEMINI_API_KEY` | **server only** | Gemini API key (never in the browser) |
| `GEMINI_MODEL` | server (optional) | Primary Gemini model (default `gemini-3.6-flash`) |
| `GEMINI_FALLBACK_MODEL` | server (optional) | Comma-separated fallback models |
| `CLERK_SECRET_KEY` | **server only** (Vercel) | Clerk secret for JWT verification in `/api/data` |
| `SUPABASE_SERVICE_ROLE_KEY` | **server only** (Vercel) | Service role key for the user-data proxy |
| `SUPABASE_URL` | server (Vercel) | Alias of `VITE_SUPABASE_URL` used by the API |

On Vercel, the client reads the public values at **runtime** from `/api/config`
(`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_CLERK_PUBLISHABLE_KEY`),
so the frontend build does not need secrets baked in. Secret keys
(`GEMINI_API_KEY`, `CLERK_SECRET_KEY`, `SUPABASE_SERVICE_ROLE_KEY`) are read
server-side only.

## Serverless endpoints

- `GET /api/config` — returns public runtime config (Clerk + Supabase).
- `POST /api/ai/chat` — Gemini proxy. `mode: 'chat'` for the assistant,
  `mode: 'itinerary'` for structured itinerary JSON. Retries transient
  failures (429/5xx) with backoff and walks a model pool automatically.
- `POST /api/data` — user-data proxy. Verifies the Clerk session token, then
  uses the service role to read/write bookings, saved trips, shared
  itineraries, and admin-only catalog changes.

### AI model resilience

The AI proxy prefers `GEMINI_MODEL` and falls back through
`GEMINI_FALLBACK_MODEL` (comma-separated) or a built-in pool. Each model is
retried up to 2× on transient errors with backoff, calls time out after 20s,
and the whole function has a 60s `maxDuration` (`vercel.json`). Responses
include which model served the request (`model`).

## Supabase setup

1. Run `supabase/schema.sql` in the Supabase SQL Editor.
2. **Existing databases**: run `supabase/migration-2026-09-clerk-user-ids.sql`
   once to switch user keys from UUID to Clerk user ids (`text`).
3. **Admin access**: sign in on the app, open `/admin` — it shows your Clerk
   user id and the exact `INSERT INTO admin_users (user_id) VALUES ('…');`
   statement to run. Admin Studio manages the catalog (destinations/packages/
   hotels), which the app merges over the static seed data.

RLS is enabled everywhere; user tables (bookings, saved_trips) have **no**
public policies (service role proxy only). Catalog and shared itineraries are
publicly readable.

## Project structure

```
api/               Vercel serverless functions (config, data proxy, AI chat)
src/
  components/      UI components incl. chat widget + planner result views
  context/         Auth / Content / Notification / Offline providers
  data/            Static seed catalog (destinations, packages, hotels, weather)
  lib/             Backend client, AI client, itinerary planner, session, config
  pages/           Route pages (Home, Destinations, AI Planner, Admin, …)
  utils/           Helpers (smart context, e-ticket)
supabase/          Schema + Clerk migration SQL
public/            PWA assets + service worker
```