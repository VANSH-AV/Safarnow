-- Safarnow: align user-data tables with Clerk identity.
--
-- The app now authenticates with Clerk (Google OAuth). Supabase Auth is no
-- longer used, so user rows are keyed by the Clerk user id (text) instead of
-- the Supabase Auth UUID, and access goes through the /api/data proxy which
-- verifies the Clerk session token and queries with the service_role key.
--
-- Run ONCE in the Supabase Dashboard > SQL Editor on the EXISTING database.

-- admin_users: prepend up from uuid -> text (Clerk user id)
alter table public.admin_users drop constraint if exists admin_users_user_id_fkey;
alter table public.admin_users alter column user_id type text;

-- bookings: text user id; RLS enabled with NO policies (service role only)
alter table public.bookings drop constraint if exists bookings_user_id_fkey;
alter table public.bookings alter column user_id type text;
drop policy if exists "own bookings all" on public.bookings;

-- saved_trips: text user id; RLS enabled with NO policies (service role only)
alter table public.saved_trips drop constraint if exists saved_trips_user_id_fkey;
alter table public.saved_trips alter column user_id type text;
drop policy if exists "own saved trips all" on public.saved_trips;

-- shared_itineraries: keep public read so share links work; only the proxy writes
alter table public.shared_itineraries drop constraint if exists shared_itineraries_user_id_fkey;
alter table public.shared_itineraries alter column user_id type text;
drop policy if exists "owner write shared itineraries" on public.shared_itineraries;

create index if not exists bookings_user_id_idx on public.bookings (user_id);
create index if not exists saved_trips_user_id_idx on public.saved_trips (user_id);
create index if not exists shared_itineraries_user_id_idx on public.shared_itineraries (user_id);

-- Make the current user an admin (replace <clerk-user-id> with the id shown
-- on the app's /admin page after signing in):
-- insert into public.admin_users (user_id) values ('<clerk-user-id>');