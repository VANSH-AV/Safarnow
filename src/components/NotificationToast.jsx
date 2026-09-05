import { useNotification } from '../context/NotificationContext';
import { X, CheckCircle, AlertTriangle, AlertCircle, Info } from 'lucide-react';

const iconMap = {
  success: CheckCircle,
  warning: AlertTriangle,
  error: AlertCircle,
  info: Info,
};

const colorMap = {
  success: 'bg-emerald-50 border-emerald-200 text-emerald-800',
  warning: 'bg-amber-50 border-amber-200 text-amber-800',
  error: 'bg-red-50 border-red-200 text-red-800',
  info: 'bg-blue/5 border-blue/20 text-navy',
};

const iconColorMap = {
  success: 'text-emerald-500',
  warning: 'text-amber-500',
  error: 'text-red-500',
  info: 'text-blue',
};

export default function NotificationToast() {
  const { notifications, removeNotification } = useNotification();

  return (
    <div className="fixed top-20 right-4 z-[90] space-y-3 max-w-sm w-full pointer-events-none">
      {notifications.map((n) => {
        const Icon = iconMap[n.type] || Info;
        return (
          <div
            key={n.id}
            className={`pointer-events-auto flex items-start gap-3 px-4 py-3 rounded-xl border shadow-lg backdrop-blur-sm ${colorMap[n.type] || colorMap.info}`}
          >
            <Icon
              className={`w-5 h-5 shrink-0 mt-0.5 ${iconColorMap[n.type] || iconColorMap.info}`}
            />
            <div className="flex-1 min-w-0">
              {n.title && (
                <p className="text-sm font-semibold">{n.title}</p>
              )}
              <p className="text-sm">{n.message}</p>
            </div>
            <button
              onClick={() => removeNotification(n.id)}
              className="shrink-0 p-1 hover:bg-black/5 rounded transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
