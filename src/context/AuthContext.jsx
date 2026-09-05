import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('safarnow_user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('safarnow_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('safarnow_user');
    }
  }, [user]);

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('safarnow_users') || '[]');
    const found = users.find(u => u.email === email && u.password === password);
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

  const signup = (name, email, password, preferences) => {
    const users = JSON.parse(localStorage.getItem('safarnow_users') || '[]');
    if (users.find(u => u.email === email)) {
      return { success: false, error: 'Email already exists' };
    }
    const newUser = { id: Date.now().toString(), name, email, password, preferences };
    users.push(newUser);
    localStorage.setItem('safarnow_users', JSON.stringify(users));
    const { password: _, ...userData } = newUser;
    setUser(userData);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
