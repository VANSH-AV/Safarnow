// Runtime config loader: fetches PUBLIC app config (Clerk publishable key,
// Supabase URL/anon key) from the serverless /api/config endpoint so the
// deployed app doesn't need secrets baked in at build time.

let runtime = null;
let loaded = false;
const subscribers = new Set();

export function getRuntimeConfig() {
  return runtime;
}

export function subscribeRuntimeConfig(fn) {
  subscribers.add(fn);
  return () => subscribers.delete(fn);
}

function apply(cfg) {
  if (!cfg) return;
  runtime = cfg;
  subscribers.forEach((fn) => fn(cfg));
}

export async function loadRuntimeConfig() {
  if (loaded) return runtime;
  loaded = true;
  try {
    const res = await fetch('/api/config', { cache: 'no-store' });
    if (res.ok) {
      const cfg = await res.json();
      apply(cfg);
    }
  } catch {
    // Network error — stay on build-time config only.
  }
  return runtime;
}