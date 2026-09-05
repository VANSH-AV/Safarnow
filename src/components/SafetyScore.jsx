import { Shield, AlertTriangle, CheckCircle } from 'lucide-react';

export default function SafetyScore({ score, breakdown }) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  let color, trackColor;
  if (score >= 80) {
    color = '#16A34A';
    trackColor = '#dcfce7';
  } else if (score >= 50) {
    color = '#F59E0B';
    trackColor = '#fef3c7';
  } else {
    color = '#DC2626';
    trackColor = '#fee2e2';
  }

  const icon =
    score >= 80 ? (
      <CheckCircle className="w-5 h-5" style={{ color }} />
    ) : score >= 50 ? (
      <AlertTriangle className="w-5 h-5" style={{ color }} />
    ) : (
      <Shield className="w-5 h-5" style={{ color }} />
    );

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <div className="flex items-center gap-2 mb-6">
        {icon}
        <h4 className="text-sm font-semibold text-dark">Safety Score</h4>
      </div>

      <div className="flex items-center justify-center mb-6">
        <div className="relative">
          <svg width="130" height="130" className="-rotate-90">
            <circle
              cx="65"
              cy="65"
              r={radius}
              fill="none"
              stroke={trackColor}
              strokeWidth="10"
            />
            <circle
              cx="65"
              cy="65"
              r={radius}
              fill="none"
              stroke={color}
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold" style={{ color }}>
              {score}
            </span>
            <span className="text-xs text-muted">out of 100</span>
          </div>
        </div>
      </div>

      {breakdown && breakdown.length > 0 && (
        <div className="space-y-3">
          {breakdown.map((item, i) => (
            <div key={i}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-muted">{item.label}</span>
                <span className="text-xs font-semibold text-dark">
                  {item.value}/100
                </span>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${item.value}%`,
                    backgroundColor:
                      item.value >= 80 ? '#16A34A' : item.value >= 50 ? '#F59E0B' : '#DC2626',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
