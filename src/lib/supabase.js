const url = import.meta.env.VITE_SUPABASE_URL || '';
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseEnabled = Boolean(url && anonKey);

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

export const supabase = isSupabaseEnabled
  ? {
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
    }
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