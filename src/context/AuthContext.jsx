import { createContext, useContext, useState, useEffect } from 'react';
import {
  ClerkProvider as ClerkWrapper,
  useAuth as useClerkAuth,
  useClerk,
  useUser,
} from '@clerk/clerk-react';
import { getRuntimeConfig } from '../lib/config';
import { registerAuthTokenGetter } from '../lib/session';

const AuthContext = createContext(null);
const AuthModeContext = createContext('local');

const USER_KEY = 'safarnow_user';
const USERS_KEY = 'safarnow_users';

function readLocalUser() {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY) || 'null');
  } catch {
    return null;
  }
}

export const useAuth = () => useContext(AuthContext);
export const useAuthMode = () => useContext(AuthModeContext);

function clerkToAppUser(clerkUser) {
  if (!clerkUser) return null;
  return {
    id: clerkUser.id,
    email: clerkUser.primaryEmailAddress?.emailAddress || '',
    name: clerkUser.fullName || clerkUser.firstName || clerkUser.primaryEmailAddress?.emailAddress?.split('@')[0] || 'Traveler',
    preferences: clerkUser.unsafeMetadata?.preferences || [],
    avatarUrl: clerkUser.imageUrl || '',
  };
}

function ClerkAuthProvider({ children }) {
  const { isLoaded, isSignedIn } = useClerkAuth();
  const { user: clerkUser } = useUser();
  const clerk = useClerk();

  const user = isSignedIn ? clerkToAppUser(clerkUser) : null;

  useEffect(() => {
    if (user) {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(USER_KEY);
      localStorage.removeItem(USERS_KEY);
    }
  }, [user]);

  useEffect(() => {
    registerAuthTokenGetter(() => clerk.session?.getToken() ?? null);
    return () => registerAuthTokenGetter(null);
  }, [clerk]);

  const login = async () => ({ success: false, error: 'Use the sign-in form.' });
  const signup = async () => ({ success: false, error: 'Use the sign-up form.' });
  const signInWithGoogle = async () => ({ success: true });
  const logout = async () => {
    await clerk.signOut();
  };

  return (
    <AuthModeContext.Provider value="clerk">
      <AuthContext.Provider
        value={{ user, login, signup, signInWithGoogle, logout, isAuthenticated: isSignedIn, initializing: !isLoaded }}
      >
        {children}
      </AuthContext.Provider>
    </AuthModeContext.Provider>
  );
}

function LocalAuthProvider({ children }) {
  const [user, setUser] = useState(() => readLocalUser());
  const [initializing, setInitializing] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(USER_KEY);
      localStorage.removeItem(USERS_KEY);
    }
  }, [user]);

  const login = async (email, password) => {
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

  const signInWithGoogle = async () => ({ success: false, error: 'Google sign-in is available after connecting the app to Clerk.' });

  const logout = async () => {
    setUser(null);
  };

  return (
    <AuthModeContext.Provider value="local">
      <AuthContext.Provider
        value={{ user, login, signup, signInWithGoogle, logout, isAuthenticated: !!user, initializing }}
      >
        {children}
      </AuthContext.Provider>
    </AuthModeContext.Provider>
  );
}

function getClerkKey() {
  return (
    import.meta.env.VITE_CLERK_PUBLISHABLE_KEY ||
    import.meta.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ||
    getRuntimeConfig()?.clerkPublishableKey ||
    ''
  );
}

export function AuthProvider({ children }) {
  if (getClerkKey()) {
    return (
      <ClerkWrapper publishableKey={getClerkKey()} afterSignOutUrl="/">
        <ClerkAuthProvider>{children}</ClerkAuthProvider>
      </ClerkWrapper>
    );
  }
  return <LocalAuthProvider>{children}</LocalAuthProvider>;
}