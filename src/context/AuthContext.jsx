import { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseEnabled, toAppUser } from '../lib/supabase';

const AuthContext = createContext(null);

const USER_KEY = 'safarnow_user';
const USERS_KEY = 'safarnow_users';

function readLocalUser() {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY) || 'null');
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => readLocalUser());
  const [initializing, setInitializing] = useState(isSupabaseEnabled);

  useEffect(() => {
    if (!isSupabaseEnabled) return undefined;

    let active = true;
    let subscription = null;

    supabase.auth.getSession().then(({ data }) => {
      if (!active) return;
      if (data?.session) setUser(toAppUser(data.session.user));
      setInitializing(false);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      if (!active) return;
      setUser(session?.user ? toAppUser(session.user) : null);
      setInitializing(false);
    }).then(({ data }) => {
      if (active) subscription = data?.subscription || null;
    });

    return () => {
      active = false;
      subscription?.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(USER_KEY);
      if (isSupabaseEnabled) {
        localStorage.removeItem(USERS_KEY);
      }
    }
  }, [user]);

  const login = async (email, password) => {
    if (isSupabaseEnabled) {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error || !data.session) {
        return { success: false, error: error?.message || 'Invalid email or password' };
      }
      setUser(toAppUser(data.session.user));
      return { success: true };
    }

    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    const found = users.find((u) => u.email === email && u.password === password);
    if (found) {
      const { password: _, ...userData } = found;
      setUser(userData);
      return { success: true };
    }
    if (email === 'demo@safarnow.com' && password === 'demo123') {
      const demoUser = { id: 'demo', name: 'Demo Traveler', email: 'demo@safarnow.com', preferences: ['Adventure', 'Nature'] };
      setUser(demoUser);
      return { success: true };
    }
    return { success: false, error: 'Invalid email or password' };
  };

  const signup = async (name, email, password, preferences) => {
    if (isSupabaseEnabled) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { name, preferences } },
      });
      if (error) return { success: false, error: error.message };
      if (!data.user) return { success: false, error: 'Sign up failed. Please try again.' };
      const needsConfirmation = !data.session;
      setUser(toAppUser(data.user));
      return {
        success: true,
        needsConfirmation,
        message: needsConfirmation
          ? 'Account created! Check your email to confirm before logging in.'
          : 'Account created!',
      };
    }

    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    if (users.find((u) => u.email === email)) {
      return { success: false, error: 'Email already exists' };
    }
    const newUser = { id: Date.now().toString(), name, email, password, preferences };
    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    const { password: _, ...userData } = newUser;
    setUser(userData);
    return { success: true };
  };

  const signInWithGoogle = async () => {
  console.log("Supabase enabled:", isSupabaseEnabled);

  if (isSupabaseEnabled) {
      const callbackUrl = `${window.location.origin}/auth/callback`;
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: callbackUrl },
      });
      if (error) return { success: false, error: error.message };
      return { success: true };
    }
    return { success: false, error: 'Google sign-in needs Supabase setup. Use email/password instead.' };
  };

  const logout = async () => {
    if (isSupabaseEnabled) {
      await supabase.auth.signOut();
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, signInWithGoogle, logout, isAuthenticated: !!user, initializing }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);