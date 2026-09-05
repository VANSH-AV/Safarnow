import { Thermometer, Droplets, Wind, CloudSun, Sun, Cloud, CloudRain, CloudSnow } from 'lucide-react';

const conditionIcons = {
  'Sunny': Sun,
  'Partly Cloudy': CloudSun,
  'Cloudy': Cloud,
  'Rainy': CloudRain,
  'Snowy': CloudSnow,
};

export default function WeatherCard({ weather }) {
  const {
    temperature,
    condition,
    humidity,
    windSpeed,
    forecast,
  } = weather;

  const Icon = conditionIcons[condition] || CloudSun;

  return (
    <div className="bg-gradient-to-br from-sky/10 to-blue/5 rounded-2xl border border-sky/20 p-6">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-semibold text-dark">Weather</h4>
        <Icon className="w-5 h-5 text-blue" />
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Thermometer className="w-8 h-8 text-orange" />
          <span className="text-3xl font-bold text-dark">{temperature}°C</span>
        </div>
        <p className="text-sm text-muted">{condition}</p>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="flex items-center gap-2 bg-white/60 rounded-lg px-3 py-2">
          <Droplets className="w-4 h-4 text-blue" />
          <div>
            <p className="text-xs text-muted">Humidity</p>
            <p className="text-sm font-semibold text-dark">{humidity}%</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-white/60 rounded-lg px-3 py-2">
          <Wind className="w-4 h-4 text-sky" />
          <div>
            <p className="text-xs text-muted">Wind</p>
            <p className="text-sm font-semibold text-dark">{windSpeed} km/h</p>
          </div>
        </div>
      </div>

      {forecast && forecast.length > 0 && (
        <div>
          <p className="text-xs font-medium text-muted mb-3 uppercase tracking-wider">
            Forecast
          </p>
          <div className="flex gap-2">
            {forecast.map((day, i) => {
              const DayIcon = conditionIcons[day.condition] || CloudSun;
              return (
                <div
                  key={i}
                  className="flex-1 bg-white/60 rounded-lg p-2 text-center"
                >
                  <p className="text-[10px] text-muted font-medium">{day.day}</p>
                  <DayIcon className="w-4 h-4 text-blue mx-auto my-1" />
                  <p className="text-xs font-semibold text-dark">{day.high}°</p>
                  <p className="text-[10px] text-muted">{day.low}°</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
