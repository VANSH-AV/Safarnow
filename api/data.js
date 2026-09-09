import { verifyToken } from '@clerk/backend';
import { createClient } from '@supabase/supabase-js';

const CONTENT_TABLES = new Set(['destinations', 'packages', 'hotels']);

function serverStatus() {
  const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const clerkSecret = process.env.CLERK_SECRET_KEY;
  if (!supabaseUrl) return 'Supabase is not configured.';
  if (!serviceKey) return 'Supabase service role is not configured.';
  if (!clerkSecret) return 'Clerk is not configured.';
  return null;
}

function fail(res, error, status = 500) {
  res.status(status).json({ error: error?.message || error || 'Request failed.' });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  let body;
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
  } catch {
    res.status(400).json({ error: 'Invalid JSON payload' });
    return;
  }

  const configured = serverStatus();
  if (configured) {
    res.status(503).json({ error: configured, code: 'not_configured' });
    return;
  }

  const { action } = body;
  const payload = body.payload || {};

  const authz = req.headers?.authorization || '';
  const token = authz.startsWith('Bearer ') ? authz.slice(7) : '';
  if (!token) {
    res.status(401).json({ error: 'Missing session token' });
    return;
  }

  let userId;
  try {
    const claims = await verifyToken(token, { secretKey: process.env.CLERK_SECRET_KEY });
    userId = claims?.sub || null;
  } catch {
    res.status(401).json({ error: 'Invalid or expired session token' });
    return;
  }
  if (!userId) {
    res.status(401).json({ error: 'Invalid or expired session token' });
    return;
  }

  const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const db = createClient(supabaseUrl, process.env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false },
  });

  const memberOfAdmin = async () => {
    const { data } = await db
      .from('admin_users')
      .select('user_id')
      .eq('user_id', userId)
      .maybeSingle();
    return Boolean(data);
  };

  switch (action) {
    case 'listBookings': {
      const { data, error } = await db.from('bookings').select('data').eq('user_id', userId);
      if (error) return fail(res, error);
      res.status(200).json({ bookings: (data || []).map((r) => r.data) });
      return;
    }

    case 'saveBooking': {
      const booking = payload.booking;
      if (!booking || !booking.id) return fail(res, '`booking` with an `.id` is required', 400);
      const { error } = await db
        .from('bookings')
        .upsert(
          { user_id: userId, booking_id: booking.id, data: booking },
          { onConflict: 'user_id,booking_id' }
        );
      if (error) return fail(res, error);
      res.status(200).json({ ok: true });
      return;
    }

    case 'listSavedTrips': {
      const { data, error } = await db
        .from('saved_trips')
        .select('destination_id, data')
        .eq('user_id', userId);
      if (error) return fail(res, error);
      const trips = (data || []).map((r) => ({
        destinationId: r.destination_id,
        ...(r.data || {}),
      }));
      res.status(200).json({ trips });
      return;
    }

    case 'saveTrip': {
      const destId = payload.destinationId;
      if (!destId) return fail(res, '`destinationId` is required', 400);
      const { error } = await db.from('saved_trips').upsert(
        { user_id: userId, destination_id: destId, data: payload.tripData || {} },
        { onConflict: 'user_id,destination_id' }
      );
      if (error) return fail(res, error);
      res.status(200).json({ ok: true });
      return;
    }

    case 'createShare': {
      const itinerary = payload.itinerary;
      if (!itinerary) return fail(res, '`itinerary` is required', 400);
      const { data, error } = await db
        .from('shared_itineraries')
        .insert({
          user_id: userId,
          destination_id: itinerary.destinationId || null,
          date_label: itinerary.dateLabel || itinerary.startDate || null,
          data: itinerary,
        })
        .select('token')
        .single();
      if (error) return fail(res, error);
      res.status(200).json({ token: data?.token || null });
      return;
    }

    case 'isAdmin': {
      res.status(200).json({ admin: await memberOfAdmin() });
      return;
    }

    case 'addContent': {
      const table = payload.table;
      const item = payload.item;
      if (!CONTENT_TABLES.has(table)) return fail(res, 'Unknown table.', 400);
      if (!item || !item.id) return fail(res, '`item` with an `.id` is required', 400);
      if (!(await memberOfAdmin())) return fail(res, 'Not authorized.', 403);
      const { error } = await db.from(table).upsert({ id: item.id, data: item }, { onConflict: 'id' });
      if (error) return fail(res, error);
      res.status(200).json({ ok: true });
      return;
    }

    case 'removeContent': {
      const table = payload.table;
      const id = payload.id;
      if (!CONTENT_TABLES.has(table)) return fail(res, 'Unknown table.', 400);
      if (!id) return fail(res, '`id` is required', 400);
      if (!(await memberOfAdmin())) return fail(res, 'Not authorized.', 403);
      const { error } = await db.from(table).delete().eq('id', id);
      if (error) return fail(res, error);
      res.status(200).json({ ok: true });
      return;
    }

    case 'importContent': {
      const table = payload.table;
      const items = payload.items || [];
      if (!CONTENT_TABLES.has(table)) return fail(res, 'Unknown table.', 400);
      if (!(await memberOfAdmin())) return fail(res, 'Not authorized.', 403);
      const { data: existing, error: listError } = await db.from(table).select('id');
      if (listError) return fail(res, listError);
      const existingIds = new Set((existing || []).map((r) => r.id));
      const toInsert = (items || []).filter((item) => item && item.id && !existingIds.has(item.id));
      const errors = [];
      for (const item of toInsert) {
        const { error } = await db.from(table).upsert({ id: item.id, data: item }, { onConflict: 'id' });
        if (error) errors.push(`${item.id}: ${error.message}`);
      }
      res.status(200).json({
        inserted: toInsert.length - errors.length,
        skipped: (items || []).length - toInsert.length,
        errors,
      });
      return;
    }

    default:
      res.status(400).json({ error: `Unknown action: ${action}` });
  }
}