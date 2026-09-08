export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  // Only ever expose PUBLIC (non-secret) values. Never return private keys
  // (GEMINI_API_KEY, CLERK_SECRET_KEY, service-role keys, etc.) from here.
  res.status(200).json({
    clerkPublishableKey: process.env.VITE_CLERK_PUBLISHABLE_KEY || process.env.CLERK_PUBLISHABLE_KEY || '',
    supabaseUrl: process.env.VITE_SUPABASE_URL || '',
    supabaseAnonKey: process.env.VITE_SUPABASE_ANON_KEY || '',
  });
}