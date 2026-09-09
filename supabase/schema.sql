-- Safarnow Supabase schema
-- Run in the Supabase Dashboard > SQL Editor.
--
-- Authorization model:
--   * User data (bookings, saved_trips) is keyed by Clerk user id (text).
--     The client NEVER reads/writes these tables directly. The Vercel
--     function /api/data verifies the Clerk session token and queries with
--     the service_role key, which bypasses RLS. These tables therefore have
--     RLS enabled with NO policies so only the service role can touch them.
--   * shared_itineraries are publicly readable (via share token) but only
--     inserted by the proxy.
--   * Catalog tables (destinations/packages/hotels) are publicly readable;
--     writes happen only through the proxy (admin membership required).

-- ---------------------------------------------------------------------------
-- Admin users (Clerk user ids allowed to edit the catalog)
-- After signing in, your Clerk user id is shown on the /admin page. Then run:
--   insert into admin_users (user_id) values ('<clerk-user-id>');
-- ---------------------------------------------------------------------------
create table if not exists admin_users (
  user_id text primary key,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Catalog content (added via the /admin page; public to read)
-- ---------------------------------------------------------------------------
create table if not exists public.destinations (
  id text primary key,
  data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.packages (
  id text primary key,
  data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.hotels (
  id text primary key,
  data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.destinations enable row level security;
alter table public.packages enable row level security;
alter table public.hotels enable row level security;

create policy "public read destinations" on public.destinations for select using (true);
create policy "public read packages" on public.packages for select using (true);
create policy "public read hotels" on public.hotels for select using (true);

-- ---------------------------------------------------------------------------
-- Bookings (proxy-only; synced to the signed-in Clerk user)
-- ---------------------------------------------------------------------------
create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  user_id text not null,
  booking_id text not null,
  data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  unique (user_id, booking_id)
);

alter table public.bookings enable row level security;
-- intentional: no policies => only the service_role proxy may access

-- ---------------------------------------------------------------------------
-- Saved trips (bookmarked destinations; proxy-only)
-- ---------------------------------------------------------------------------
create table if not exists public.saved_trips (
  user_id text not null,
  destination_id text not null,
  data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  primary key (user_id, destination_id)
);

alter table public.saved_trips enable row level security;
-- intentional: no policies => only the service_role proxy may access

-- ---------------------------------------------------------------------------
-- Shared itineraries (readable by anyone with the share token)
-- ---------------------------------------------------------------------------
create table if not exists public.shared_itineraries (
  id uuid primary key default gen_random_uuid(),
  token text unique not null default md5(random()::text || clock_timestamp()::text),
  user_id text not null,
  destination_id text,
  date_label text,
  data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.shared_itineraries enable row level security;

create policy "public read shared itineraries" on public.shared_itineraries for select using (true);