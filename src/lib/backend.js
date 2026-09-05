import { supabase, isSupabaseEnabled } from './supabase';

const BOOKINGS_KEY = 'safarnow_bookings';
const SAVED_KEY = 'safarnow_saved_trips';

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
  if (!isSupabaseEnabled) return null;
  const { data } = await supabase.auth.getSession();
  return data?.session?.user?.id || null;
}

function isLoggedOutLocal() {
  return !localStorage.getItem('safarnow_user');
}

// ---------------------------------------------------------------------------
// Bookings
// ---------------------------------------------------------------------------
export async function getBookings() {
  const local = readLocal(BOOKINGS_KEY);
  const uid = await currentUserId();
  if (!isSupabaseEnabled || !uid) return local;

  const { data, error } = await supabase
    .from('bookings')
    .select('data')
    .eq('user_id', uid);
  if (error || !data) return local;

  const remote = data.map((r) => r.data);
  const byId = new Map(remote.map((b) => [b.id, b]));
  local.forEach((b) => {
    if (!byId.has(b.id)) byId.set(b.id, b);
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

  await supabase.from('bookings').upsert(
    { user_id: uid, booking_id: booking.id, data: booking },
    { onConflict: 'user_id,booking_id' }
  );
}

// ---------------------------------------------------------------------------
// Saved trips
// ---------------------------------------------------------------------------
export async function getSavedTrips() {
  const local = readLocal(SAVED_KEY);
  const uid = await currentUserId();
  if (!isSupabaseEnabled || !uid) return local;

  const { data, error } = await supabase
    .from('saved_trips')
    .select('destination_id, data')
    .eq('user_id', uid);
  if (error || !data) return local;

  const byId = new Map(local.map((t) => [t.destinationId, t]));
  data.forEach((r) => {
    const stored = r.data || { destinationId: r.destination_id };
    byId.set(r.destination_id, stored);
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
  await supabase.from('saved_trips').upsert(
    { user_id: uid, destination_id: destId, data: tripData },
    { onConflict: 'user_id,destination_id' }
  );
}

// ---------------------------------------------------------------------------
// Shared itineraries
// ---------------------------------------------------------------------------
export async function createShareLink(itinerary) {
  if (!isSupabaseEnabled) return null;
  const uid = await currentUserId();
  if (!uid) return null;

  const { data, error } = await supabase
    .from('shared_itineraries')
    .insert({
      user_id: uid,
      destination_id: itinerary.destinationId || null,
      date_label: itinerary.dateLabel || itinerary.startDate || null,
      data: itinerary,
    })
    .select('token')
    .single();
  if (error || !data) return null;
  return data.token;
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
// Catalog content (added via /admin)
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

export async function addContent(tableName, item, userId) {
  if (!isSupabaseEnabled || !userId) return { error: 'Supabase not configured or not signed in.' };
  const { error } = await supabase.from(tableName).upsert(
    { id: item.id, data: item },
    { onConflict: 'id' }
  );
  return error ? { error: error.message } : { success: true };
}

export async function removeContent(tableName, id, userId) {
  if (!isSupabaseEnabled || !userId) return { error: 'Supabase not configured or not signed in.' };
  const { error } = await supabase.from(tableName).delete().eq('id', id);
  return error ? { error: error.message } : { success: true };
}

export async function listAdminContent(tableName) {
  if (!isSupabaseEnabled) return [];
  const { data, error } = await supabase.from(tableName).select('id, data');
  if (error) return [];
  return (data || []).map((r) => ({ id: r.id, ...r.data }));
}

export async function importContent(tableName, items, userId) {
  if (!isSupabaseEnabled || !userId) return { error: 'Supabase not configured or not signed in.' };
  const existing = await listAdminContent(tableName);
  const existingIds = new Set(existing.map((r) => r.id));
  const toInsert = (items || []).filter((item) => item && !existingIds.has(item.id));
  const errors = [];
  for (const item of toInsert) {
    const res = await addContent(tableName, item, userId);
    if (res.error) errors.push(`${item.id}: ${res.error}`);
  }
  return {
    inserted: toInsert.length - errors.length,
    skipped: (items || []).length - toInsert.length,
    errors,
  };
}

// ---------------------------------------------------------------------------
// Admin checks
// ---------------------------------------------------------------------------
export async function isAdminUser(userId) {
  if (!isSupabaseEnabled || !userId) return false;
  const { data, error } = await supabase.from('admin_users').select('user_id').eq('user_id', userId).maybeSingle();
  return !error && Boolean(data);
}

export async function getAdminGuidance() {
  if (!isSupabaseEnabled) return null;
  const uid = await currentUserId();
  return uid;
}

export { isLoggedOutLocal };