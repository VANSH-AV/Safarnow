import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL || '';
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseEnabled = Boolean(url && anonKey);

export const supabase = isSupabaseEnabled
  ? createClient(url, anonKey, {
      auth: { persistSession: true, autoRefreshToken: true },
    })
  : null;

export function toAppUser(sbUser) {
  if (!sbUser) return null;
  const meta = sbUser.user_metadata || {};
  return {
    id: sbUser.id,
    email: sbUser.email,
    name: meta.name || (sbUser.email ? sbUser.email.split('@')[0] : 'Traveler'),
    preferences: meta.preferences || [],
  };
}