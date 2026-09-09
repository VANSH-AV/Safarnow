import { supabase, isSupabaseEnabled } from './supabase';
import { getAuthToken } from './session';

const BOOKINGS_KEY = 'safarnow_bookings';
const SAVED_KEY = 'safarnow_saved_trips';
const USER_KEY = 'safarnow_user';

function readLocal(key) {
  try {
    return JSON.parse(localStorage.getItem(key) || '[]');
  } catch {
    return [];
  }
}

function writeLocal(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

async function currentUserId() {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY) || 'null')?.id || null;
  } catch {
    return null;
  }
}

async function dataAction(action, payload) {
  const token = await getAuthToken();
  if (!token) return { ok: false, status: 401, error: 'No session token' };
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers.Authorization = `Bearer ${token}`;
  let res;
  try {
    res = await fetch('/api/data', {
      method: 'POST',
      headers,
      body: JSON.stringify({ action, payload: payload || {} }),
    });
  } catch {
    return { ok: false, status: 0, error: 'Network error' };
  }
  let json;
  try {
    json = await res.json();
  } catch {
    return { ok: false, status: res.status, error: 'Bad response' };
  }
  return { ok: res.ok, status: res.status, ...json };
}

function isLoggedOutLocal() {
  return !localStorage.getItem(USER_KEY);
}

// ---------------------------------------------------------------------------
// Bookings
// ---------------------------------------------------------------------------
export async function getBookings() {
  const local = readLocal(BOOKINGS_KEY);
  const uid = await currentUserId();
  if (!isSupabaseEnabled || !uid) return local;

  const res = await dataAction('listBookings');
  if (!res.ok || !Array.isArray(res.bookings)) return local;

  const byId = new Map(res.bookings.filter(Boolean).map((b) => [b.id, b]));
  local.forEach((b) => {
    if (b && !byId.has(b.id)) byId.set(b.id, b);
  });
  return Array.from(byId.values());
}

export async function saveBooking(booking) {
  const local = readLocal(BOOKINGS_KEY);
  if (!local.some((b) => b.id === booking.id)) {
    local.push(booking);
    writeLocal(BOOKINGS_KEY, local);
  }

  const uid = await currentUserId();
  if (!isSupabaseEnabled || !uid) return;
  await dataAction('saveBooking', { booking });
}

// ---------------------------------------------------------------------------
// Saved trips
// ---------------------------------------------------------------------------
export async function getSavedTrips() {
  const local = readLocal(SAVED_KEY);
  const uid = await currentUserId();
  if (!isSupabaseEnabled || !uid) return local;

  const res = await dataAction('listSavedTrips');
  if (!res.ok || !Array.isArray(res.trips)) return local;

  const byId = new Map(local.map((t) => [t.destinationId, t]));
  res.trips.forEach((t) => {
    if (t && t.destinationId) byId.set(t.destinationId, t);
  });
  return Array.from(byId.values());
}

export async function saveTrip(destId, tripData) {
  const local = readLocal(SAVED_KEY);
  if (!local.some((t) => t.destinationId === destId)) {
    local.push(tripData);
    writeLocal(SAVED_KEY, local);
  }

  const uid = await currentUserId();
  if (!isSupabaseEnabled || !uid) return;
  await dataAction('saveTrip', { destinationId: destId, tripData });
}

// ---------------------------------------------------------------------------
// Shared itineraries
// ---------------------------------------------------------------------------
export async function createShareLink(itinerary) {
  const uid = await currentUserId();
  if (!isSupabaseEnabled || !uid) return null;

  const res = await dataAction('createShare', { itinerary });
  if (!res.ok || !res.token) return null;
  return res.token;
}

export async function getSharedItinerary(token) {
  if (!isSupabaseEnabled) return null;
  const { data, error } = await supabase
    .from('shared_itineraries')
    .select('data, destination_id, date_label, created_at')
    .eq('token', token)
    .maybeSingle();
  if (error || !data) return null;
  return { ...data.data, sharedAt: data.created_at };
}

// ---------------------------------------------------------------------------
// Catalog content (reads are public; writes go through the verified admin API)
// ---------------------------------------------------------------------------
export async function fetchContentTables() {
  if (!isSupabaseEnabled) return { destinations: [], packages: [], hotels: [] };
  const [d, p, h] = await Promise.all([
    supabase.from('destinations').select('id, data'),
    supabase.from('packages').select('id, data'),
    supabase.from('hotels').select('id, data'),
  ]);
  return {
    destinations: d.data ? d.data.map((r) => r.data) : [],
    packages: p.data ? p.data.map((r) => r.data) : [],
    hotels: h.data ? h.data.map((r) => r.data) : [],
  };
}

export async function listAdminContent(tableName) {
  if (!isSupabaseEnabled) return [];
  const { data, error } = await supabase.from(tableName).select('id, data');
  if (error) return [];
  return (data || []).map((r) => ({ id: r.id, ...r.data }));
}

export async function addContent(tableName, item, userId) {
  if (!isSupabaseEnabled || !userId) return { error: 'Supabase not configured or not signed in.' };
  const res = await dataAction('addContent', { table: tableName, item });
  if (!res.ok) return { error: res.error || 'Could not save the content.' };
  return { success: true };
}

export async function removeContent(tableName, id, userId) {
  if (!isSupabaseEnabled || !userId) return { error: 'Supabase not configured or not signed in.' };
  const res = await dataAction('removeContent', { table: tableName, id });
  if (!res.ok) return { error: res.error || 'Could not delete the content.' };
  return { success: true };
}

export async function importContent(tableName, items, userId) {
  if (!isSupabaseEnabled || !userId) return { error: 'Supabase not configured or not signed in.' };
  const res = await dataAction('importContent', { table: tableName, items });
  if (!res.ok) return { error: res.error || 'Could not import the content.' };
  return { inserted: res.inserted ?? 0, skipped: res.skipped ?? 0, errors: res.errors || [] };
}

// ---------------------------------------------------------------------------
// Admin checks
// ---------------------------------------------------------------------------
export async function isAdminUser(userId) {
  if (!isSupabaseEnabled || !userId) return false;
  const res = await dataAction('isAdmin');
  return res.ok ? Boolean(res.admin) : false;
}

export async function getAdminGuidance() {
  return currentUserId();
}

export { isLoggedOutLocal };