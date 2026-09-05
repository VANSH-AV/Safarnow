import { ShieldCheck, ShieldAlert, ShieldX } from 'lucide-react';

export default function SafetyBadge({ score }) {
  let color, bg, border, icon;

  if (score >= 80) {
    color = 'text-emerald-700';
    bg = 'bg-emerald-50';
    border = 'border-emerald-200';
    icon = <ShieldCheck className="w-3 h-3" />;
  } else if (score >= 50) {
    color = 'text-amber-700';
    bg = 'bg-amber-50';
    border = 'border-amber-200';
    icon = <ShieldAlert className="w-3 h-3" />;
  } else {
    color = 'text-red-700';
    bg = 'bg-red-50';
    border = 'border-red-200';
    icon = <ShieldX className="w-3 h-3" />;
  }

  return (
    <div
      className={`inline-flex items-center gap-1 ${bg} ${color} border ${border} text-xs font-semibold px-2 py-1 rounded-lg backdrop-blur-sm`}
    >
      {icon}
      {score}
    </div>
  );
}
