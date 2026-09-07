import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase, isSupabaseEnabled } from '../lib/supabase';

export default function AuthCallback() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isSupabaseEnabled) {
      navigate('/', { replace: true });
      return undefined;
    }
    let active = true;
    const finish = async () => {
      try {
        const code = params.get('code');
        if (code) {
          await supabase.auth.exchangeCodeForSession(code);
        }
        const { data, error: sessionError } = await supabase.auth.getSession();
        if (data?.session) {
          window.history.replaceState({}, document.title, window.location.pathname);
          navigate('/', { replace: true });
        } else {
          if (active) setError(sessionError?.message || 'Sign-in did not complete. Please try again.');
        }
      } catch (e) {
        if (active) setError(e?.message || 'Sign-in failed. Please try again.');
      }
    };
    finish();
    return () => {
      active = false;
    };
  }, [params, navigate]);

  return (
    <div className="min-h-screen bg-light flex flex-col items-center justify-center p-8">
      {error ? (
        <div className="text-center">
          <h1 className="text-2xl font-bold text-dark mb-3">Sign-in failed</h1>
          <p className="text-sm text-muted mb-6">{error}</p>
          <a href="/login" className="inline-block bg-blue text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue/90 transition-all">
            Back to Sign In
          </a>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-blue/30 border-t-blue rounded-full animate-spin" />
          <p className="text-sm text-muted">Completing your sign-in…</p>
        </div>
      )}
    </div>
  );
}