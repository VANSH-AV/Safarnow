-- Safarnow Supabase schema
-- Run this in the Supabase Dashboard > SQL Editor.
-- Enable the Email provider under Authentication > Providers first.

-- ---------------------------------------------------------------------------
-- Admin users (who may add catalog content)
-- After creating your account in the app, run:
--   insert into admin_users (user_id) values ('<your auth user uuid>');
-- The UUID is visible in Authentication > Users > UUID, or from the app's
-- /admin page which shows it once you are signed in.
-- ---------------------------------------------------------------------------
create table if not exists admin_users (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

-- Security definer helper: true when the current caller is an admin
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (select 1 from public.admin_users where user_id = auth.uid());
$$;

grant execute on function public.is_admin() to authenticated, anon;

-- ---------------------------------------------------------------------------
-- Catalog content (added via the /admin page)
-- Each row stores the full object shape used by the frontend.
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
create policy "admin write destinations" on public.destinations for all using (public.is_admin()) with check (public.is_admin());
create policy "public read packages" on public.packages for select using (true);
create policy "admin write packages" on public.packages for all using (public.is_admin()) with check (public.is_admin());
create policy "public read hotels" on public.hotels for select using (true);
create policy "admin write hotels" on public.hotels for all using (public.is_admin()) with check (public.is_admin());

-- ---------------------------------------------------------------------------
-- Bookings (synced across devices for a signed-in user)
-- ---------------------------------------------------------------------------
create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  booking_id text not null,
  data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  unique (user_id, booking_id)
);

alter table public.bookings enable row level security;

create policy "own bookings all" on public.bookings
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());

-- ---------------------------------------------------------------------------
-- Saved trips (bookmarked destinations, synced)
-- ---------------------------------------------------------------------------
create table if not exists public.saved_trips (
  user_id uuid not null references auth.users (id) on delete cascade,
  destination_id text not null,
  data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  primary key (user_id, destination_id)
);

alter table public.saved_trips enable row level security;

create policy "own saved trips all" on public.saved_trips
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());

-- ---------------------------------------------------------------------------
-- Shared itineraries (readable by anyone with the share token)
-- ---------------------------------------------------------------------------
create table if not exists public.shared_itineraries (
  id uuid primary key default gen_random_uuid(),
  token text unique not null default md5(random()::text || clock_timestamp()::text),
  user_id uuid not null references auth.users (id) on delete cascade,
  destination_id text,
  date_label text,
  data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.shared_itineraries enable row level security;

create policy "public read shared itineraries" on public.shared_itineraries for select using (true);
create policy "owner write shared itineraries" on public.shared_itineraries
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());