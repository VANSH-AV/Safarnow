import { Clock, IndianRupee, CloudSun, ShieldCheck, ShieldAlert } from 'lucide-react';
import CrowdBadge from './CrowdBadge';

export default function ActivityCard({ activity }) {
  const {
    time,
    name,
    cost,
    crowdLevel,
    weatherSuitability,
    safetyStatus,
  } = activity;

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue/10 rounded-lg flex items-center justify-center">
            <Clock className="w-5 h-5 text-blue" />
          </div>
          <div>
            <p className="text-xs text-muted font-medium">{time}</p>
            <h4 className="text-sm font-semibold text-dark">{name}</h4>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <div className="inline-flex items-center gap-1.5 bg-light text-dark text-xs font-medium px-2.5 py-1.5 rounded-lg">
          <IndianRupee className="w-3 h-3 text-muted" />
          {cost === 0 ? 'Free' : `₹${cost}`}
        </div>

        <div className="inline-flex items-center gap-1.5">
          <CrowdBadge level={crowdLevel} />
        </div>

        <div
          className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-lg ${
            weatherSuitability === 'Good' || weatherSuitability === 'Excellent'
              ? 'bg-emerald-50 text-emerald-700'
              : weatherSuitability === 'Moderate'
                ? 'bg-amber-50 text-amber-700'
                : 'bg-red-50 text-red-700'
          }`}
        >
          <CloudSun className="w-3 h-3" />
          {weatherSuitability}
        </div>

        <div
          className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-lg ${
            safetyStatus === 'Safe'
              ? 'bg-emerald-50 text-emerald-700'
              : safetyStatus === 'Caution'
                ? 'bg-amber-50 text-amber-700'
                : 'bg-red-50 text-red-700'
          }`}
        >
          {safetyStatus === 'Safe' ? (
            <ShieldCheck className="w-3 h-3" />
          ) : (
            <ShieldAlert className="w-3 h-3" />
          )}
          {safetyStatus}
        </div>
      </div>
    </div>
  );
}
