import { useOffline } from '../context/OfflineContext';
import { Wifi, WifiOff } from 'lucide-react';

export default function OfflineIndicator() {
  const { isOnline } = useOffline();

  return (
    <div
      className={`fixed bottom-4 left-4 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium shadow-lg transition-all duration-300 ${
        isOnline
          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
          : 'bg-amber-50 text-amber-700 border border-amber-200'
      }`}
    >
      {isOnline ? (
        <Wifi className="w-4 h-4" />
      ) : (
        <WifiOff className="w-4 h-4" />
      )}
      {isOnline ? 'Online' : 'Offline'}
    </div>
  );
}
