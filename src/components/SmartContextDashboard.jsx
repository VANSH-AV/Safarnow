import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  CloudSun,
  Users,
  ShieldCheck,
  Wifi,
  Sparkles,
  Thermometer,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
} from 'lucide-react';

const temperatureData = [
  { time: '6AM', temp: 22 },
  { time: '9AM', temp: 26 },
  { time: '12PM', temp: 31 },
  { time: '3PM', temp: 33 },
  { time: '6PM', temp: 28 },
  { time: '9PM', temp: 24 },
];

const crowdData = [
  { time: '6AM', level: 10 },
  { time: '9AM', level: 35 },
  { time: '12PM', level: 65 },
  { time: '3PM', level: 80 },
  { time: '6PM', level: 55 },
  { time: '9PM', level: 20 },
];

const safetyBreakdownData = [
  { name: 'Safe', value: 82, color: '#16A34A' },
  { name: 'Caution', value: 12, color: '#F59E0B' },
  { name: 'Risky', value: 6, color: '#DC2626' },
];

export default function SmartContextDashboard({ data }) {
  const {
    weather,
    crowd,
    safety,
    connectivity,
    recommendation,
    temperatureData: tempOverride,
    crowdHourData: crowdOverride,
  } = data || {};

  const safetyScore = safety?.score || 85;
  const weatherTemp = weather?.temperature || 28;
  const crowdLevel = crowd?.current || 'Moderate';
  const isOnline = connectivity?.isOnline ?? true;
  const aiSuggestion = recommendation?.text || 'Perfect time to visit! The weather is pleasant and crowds are manageable.';
  const tempChart = tempOverride || temperatureData;
  const crowdChart = crowdOverride || crowdData;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-blue to-sky rounded-xl flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-dark">Smart Trip Dashboard</h2>
          <p className="text-xs text-muted">Real-time context for your journey</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-sky/10 to-blue/5 rounded-2xl border border-sky/20 p-5">
          <div className="flex items-center gap-2 mb-3">
            <CloudSun className="w-5 h-5 text-blue" />
            <span className="text-xs font-semibold text-muted uppercase tracking-wider">
              Weather
            </span>
          </div>
          <div className="flex items-end gap-2 mb-1">
            <span className="text-3xl font-bold text-dark">{weatherTemp}°C</span>
            <span className="text-sm text-muted mb-1">{weather?.condition || 'Sunny'}</span>
          </div>
          <p className="text-xs text-muted">
            Humidity: {weather?.humidity || 65}% · Wind: {weather?.wind || 12} km/h
          </p>
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-200 p-5">
          <div className="flex items-center gap-2 mb-3">
            <Users className="w-5 h-5 text-amber-600" />
            <span className="text-xs font-semibold text-muted uppercase tracking-wider">
              Crowd Level
            </span>
          </div>
          <div className="flex items-end gap-2 mb-1">
            <span className="text-3xl font-bold text-dark">{crowd?.currentScore || 45}</span>
            <span className="text-sm font-medium text-muted mb-1">/ 100</span>
          </div>
          <p className="text-xs text-muted">{crowdLevel}</p>
        </div>

        <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl border border-emerald-200 p-5">
          <div className="flex items-center gap-2 mb-3">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <span className="text-xs font-semibold text-muted uppercase tracking-wider">
              Safety
            </span>
          </div>
          <div className="flex items-end gap-2 mb-1">
            <span className="text-3xl font-bold text-dark">{safetyScore}</span>
            <span className="text-sm font-medium text-muted mb-1">/ 100</span>
          </div>
          <p className="text-xs text-emerald-600 font-medium">
            {safetyScore >= 80 ? 'Safe to visit' : safetyScore >= 50 ? 'Exercise caution' : 'High risk'}
          </p>
        </div>

        <div className="bg-gradient-to-br from-blue/5 to-navy/5 rounded-2xl border border-blue/20 p-5">
          <div className="flex items-center gap-2 mb-3">
            <Wifi className="w-5 h-5 text-blue" />
            <span className="text-xs font-semibold text-muted uppercase tracking-wider">
              Connectivity
            </span>
          </div>
          <div className="flex items-center gap-2 mb-1">
            <div
              className={`w-3 h-3 rounded-full ${isOnline ? 'bg-emerald-500' : 'bg-red-500'}`}
            />
            <span className="text-3xl font-bold text-dark">
              {isOnline ? 'Online' : 'Offline'}
            </span>
          </div>
          <p className="text-xs text-muted">
            {connectivity?.signal || 'Strong 4G'} · {connectivity?.coverage || '98% coverage'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <div className="flex items-center gap-2 mb-4">
            <Thermometer className="w-4 h-4 text-orange" />
            <h4 className="text-sm font-semibold text-dark">Temperature Trend</h4>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={tempChart}>
              <defs>
                <linearGradient id="tempGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF8A25" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#FF8A25" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="time"
                tick={{ fontSize: 11, fill: '#64748B' }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: '12px',
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)',
                  fontSize: '12px',
                }}
              />
              <Area
                type="monotone"
                dataKey="high"
                stroke="#FF8A25"
                strokeWidth={2}
                fill="url(#tempGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-4 h-4 text-amber-500" />
            <h4 className="text-sm font-semibold text-dark">Crowd Forecast</h4>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={crowdChart}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="time"
                tick={{ fontSize: 11, fill: '#64748B' }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: '12px',
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)',
                  fontSize: '12px',
                }}
              />
              <Bar dataKey="level" radius={[4, 4, 0, 0]}>
                {crowdChart.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={
                      entry.level > 70
                        ? '#DC2626'
                        : entry.level > 40
                          ? '#F59E0B'
                          : '#16A34A'
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <div className="flex items-center gap-2 mb-4">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <h4 className="text-sm font-semibold text-dark">Safety Breakdown</h4>
          </div>
          <div className="flex items-center justify-center mb-4">
            <ResponsiveContainer width={160} height={160}>
              <PieChart>
                <Pie
                  data={safetyBreakdownData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={70}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {safetyBreakdownData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: '12px',
                    border: '1px solid #e5e7eb',
                    fontSize: '12px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2">
            {safetyBreakdownData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-xs text-muted">{item.name}</span>
                </div>
                <span className="text-xs font-semibold text-dark">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 bg-gradient-to-br from-navy to-blue rounded-2xl p-6 text-white">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-orange" />
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/90">
              AI Recommendation
            </h4>
          </div>

          <p className="text-base leading-relaxed text-white/90 mb-6">
            {aiSuggestion}
          </p>

          {recommendation?.tips && (
            <div className="space-y-3">
              {recommendation.tips.map((tip, i) => {
                const TipIcon =
                  tip.type === 'warning'
                    ? AlertTriangle
                    : tip.type === 'success'
                      ? CheckCircle
                      : Clock;
                const tipColor =
                  tip.type === 'warning'
                    ? 'text-amber-400'
                    : tip.type === 'success'
                      ? 'text-emerald-400'
                      : 'text-sky';
                return (
                  <div
                    key={i}
                    className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-3"
                  >
                    <TipIcon className={`w-4 h-4 mt-0.5 shrink-0 ${tipColor}`} />
                    <p className="text-sm text-white/80">{tip.text}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
