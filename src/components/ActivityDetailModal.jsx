import {
  X,
  Clock,
  IndianRupee,
  CloudSun,
  Users,
  ShieldCheck,
  MapPin,
  Sparkles,
} from 'lucide-react';

export default function ActivityDetailModal({ activity, day, destination, onClose }) {
  if (!activity) return null;

  const weatherSuitable = activity.weatherSuitable ?? true;

  const safetyColor = activity.safetyScore >= 80 ? 'text-success' : activity.safetyScore >= 50 ? 'text-warning' : 'text-danger';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-navy/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto animate-scale-in">
        <div className="relative h-36 bg-gradient-to-br from-blue to-navy">
          {destination && (
            <img
              src={destination.image}
              alt={destination.name}
              className="w-full h-full object-cover opacity-40"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="absolute bottom-3 left-4 right-4">
            <p className="text-xs text-white/70 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" /> Day {day} · {activity.time}
            </p>
            <h2 className="text-xl font-bold text-white">{activity.activity}</h2>
            <p className="text-sm text-white/80">{destination?.name || 'Destination'} · {activity.category}</p>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-3 gap-3 mb-5">
            <div className="bg-light rounded-xl p-3 text-center">
              <Clock className="w-4 h-4 text-blue mx-auto mb-1" />
              <p className="text-xs text-muted">Duration</p>
              <p className="text-sm font-bold text-dark">{activity.duration}</p>
            </div>
            <div className="bg-light rounded-xl p-3 text-center">
              <Users className="w-4 h-4 text-blue mx-auto mb-1" />
              <p className="text-xs text-muted">Crowd</p>
              <p className="text-sm font-bold text-dark">{activity.crowdLevel || activity.crowdStatus || 'Moderate'}</p>
            </div>
            <div className="bg-light rounded-xl p-3 text-center">
              <IndianRupee className="w-4 h-4 text-blue mx-auto mb-1" />
              <p className="text-xs text-muted">Cost</p>
              <p className="text-sm font-bold text-dark">₹{activity.cost?.toLocaleString()}</p>
            </div>
          </div>

          <div className="space-y-3 mb-5">
            <div className={`flex items-center gap-3 p-3 rounded-xl border ${weatherSuitable ? 'bg-success/5 border-success/20' : 'bg-warning/5 border-warning/20'}`}>
              <CloudSun className={`w-5 h-5 shrink-0 ${weatherSuitable ? 'text-success' : 'text-warning'}`} />
              <div>
                <p className="text-sm font-semibold text-dark">
                  {weatherSuitable ? 'Great weather for this activity' : `Rain chance ${activity.rainProbability || 30}% — plan a backup`}
                </p>
                <p className="text-xs text-muted">
                  {activity.category} is best enjoyed when conditions are clear.
                </p>
              </div>
            </div>

            <div className={`flex items-center gap-3 p-3 rounded-xl border ${activity.crowdLevel >= 70 ? 'border-danger/20 bg-danger/5' : activity.crowdLevel >= 40 ? 'border-warning/20 bg-warning/5' : 'border-success/20 bg-success/5'}`}>
              <div className={`w-5 h-5 rounded-full ${activity.crowdLevel >= 70 ? 'bg-danger/20' : activity.crowdLevel >= 40 ? 'bg-warning/20' : 'bg-success/20'} flex items-center justify-center shrink-0`}>
                <span className={`text-[10px] font-bold ${activity.crowdLevel >= 70 ? 'text-danger' : activity.crowdLevel >= 40 ? 'text-warning' : 'text-success'}`}>{activity.crowdLevel}</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-dark">Crowd at this time: {activity.crowdStatus || 'Moderate'}</p>
                <p className="text-xs text-muted">{activity.crowdLevel >= 70 ? 'Expect queues — go early or off-peak.' : activity.crowdLevel >= 40 ? 'Some crowd — reasonable wait times.' : 'Quiet — enjoy it at your own pace.'}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl border border-blue/20 bg-blue/5">
              <ShieldCheck className={`w-5 h-5 shrink-0 ${safetyColor}`} />
              <div>
                <p className="text-sm font-semibold text-dark">Safety Score: {activity.safetyScore}/100</p>
                <p className="text-xs text-muted">{activity.safetyScore >= 80 ? 'Safe — standard precautions apply.' : 'Exercise extra caution.'}</p>
              </div>
            </div>
          </div>

          {activity.recommended && (
            <div className="flex items-center gap-2 px-4 py-3 bg-orange/10 rounded-xl">
              <Sparkles className="w-4 h-4 text-orange shrink-0" />
              <p className="text-sm font-semibold text-orange">Recommended pick for your itinerary</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}