import { Users } from 'lucide-react';

const levels = {
  Low: {
    color: 'text-emerald-700',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
  },
  Moderate: {
    color: 'text-amber-700',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
  },
  High: {
    color: 'text-orange-700',
    bg: 'bg-orange-50',
    border: 'border-orange-200',
  },
  'Very High': {
    color: 'text-red-700',
    bg: 'bg-red-50',
    border: 'border-red-200',
  },
};

export default function CrowdBadge({ level }) {
  const style = levels[level] || levels['Moderate'];

  return (
    <div
      className={`inline-flex items-center gap-1 ${style.bg} ${style.color} border ${style.border} text-xs font-semibold px-2 py-1 rounded-lg`}
    >
      <Users className="w-3 h-3" />
      {level}
    </div>
  );
}
