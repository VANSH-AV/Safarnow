import { getRuntimeConfig, subscribeRuntimeConfig } from './config';

let url = import.meta.env.VITE_SUPABASE_URL || '';
let anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export let isSupabaseEnabled = Boolean(url && anonKey);

function applyConfig() {
  const rc = getRuntimeConfig();
  if (rc) {
    if (rc.supabaseUrl) url = rc.supabaseUrl;
    if (rc.supabaseAnonKey) anonKey = rc.supabaseAnonKey;
  }
  isSupabaseEnabled = Boolean(url && anonKey);
}

subscribeRuntimeConfig(applyConfig);
applyConfig();

let clientPromise = null;

function client() {
  if (!clientPromise) {
    clientPromise = import('@supabase/supabase-js').then(({ createClient }) =>
      createClient(url, anonKey, {
        auth: { persistSession: true, autoRefreshToken: true, flowType: 'pkce' },
      })
    );
  }
  return clientPromise;
}

function fromChain(getBuilder) {
  const chain = {};
  ['select', 'insert', 'upsert', 'delete', 'order', 'limit', 'eq'].forEach((method) => {
    chain[method] = (...args) => fromChain(() => getBuilder().then((b) => b[method](...args)));
  });
  chain.single = () => getBuilder().then((b) => b.single());
  chain.maybeSingle = () => getBuilder().then((b) => b.maybeSingle());
  chain.then = (resolve, reject) => getBuilder().then(resolve, reject);
  return chain;
}

export const supabase = {
  auth: {
    getSession: () => client().then((c) => c.auth.getSession()),
    signInWithPassword: (credentials) => client().then((c) => c.auth.signInWithPassword(credentials)),
    signUp: (payload) => client().then((c) => c.auth.signUp(payload)),
    signOut: () => client().then((c) => c.auth.signOut()),
    signInWithOAuth: (payload) => client().then((c) => c.auth.signInWithOAuth(payload)),
    exchangeCodeForSession: (code) => client().then((c) => c.auth.exchangeCodeForSession(code)),
    onAuthStateChange: (callback) => client().then((c) => c.auth.onAuthStateChange(callback)),
  },
  from: (table) => fromChain(() => client().then((c) => c.from(table))),
};

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