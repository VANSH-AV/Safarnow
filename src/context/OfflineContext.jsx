import { createContext, useContext, useState, useEffect } from 'react';

const OfflineContext = createContext(null);

export function OfflineProvider({ children }) {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [offlineData, setOfflineData] = useState(() => {
    const saved = localStorage.getItem('safarnow_offline');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const saveForOffline = (tripData) => {
    const data = {
      ...tripData,
      savedAt: new Date().toISOString()
    };
    setOfflineData(data);
    localStorage.setItem('safarnow_offline', JSON.stringify(data));
    return true;
  };

  const getOfflineData = () => {
    return offlineData;
  };

  const clearOfflineData = () => {
    setOfflineData(null);
    localStorage.removeItem('safarnow_offline');
  };

  return (
    <OfflineContext.Provider value={{ isOnline, saveForOffline, getOfflineData, clearOfflineData, hasOfflineData: !!offlineData }}>
      {children}
    </OfflineContext.Provider>
  );
}

export const useOffline = () => useContext(OfflineContext);
