import {
  Users,
  MapPin,
  Calendar,
  TrendingUp,
  BarChart3,
  PieChart as PieChartIcon,
  Activity,
  CloudSun,
} from 'lucide-react';
import { BarGroupChart, LineChartView, DonutChart } from '../components/SvgCharts';

const monthlyData = [
  { month: 'Jan', tourists: 45200, label: '45.2K' },
  { month: 'Feb', tourists: 52800, label: '52.8K' },
  { month: 'Mar', tourists: 68500, label: '68.5K' },
  { month: 'Apr', tourists: 72100, label: '72.1K' },
  { month: 'May', tourists: 58900, label: '58.9K' },
  { month: 'Jun', tourists: 42300, label: '42.3K' },
  { month: 'Jul', tourists: 38700, label: '38.7K' },
  { month: 'Aug', tourists: 41200, label: '41.2K' },
  { month: 'Sep', tourists: 55600, label: '55.6K' },
  { month: 'Oct', tourists: 78900, label: '78.9K' },
  { month: 'Nov', tourists: 85400, label: '85.4K' },
  { month: 'Dec', tourists: 91200, label: '91.2K' },
];

const destinationData = [
  { name: 'Goa', value: 28, color: '#1688D4' },
  { name: 'Kashmir', value: 18, color: '#38BDF8' },
  { name: 'Kerala', value: 15, color: '#FF8A25' },
  { name: 'Jaipur', value: 14, color: '#0B2D4D' },
  { name: 'Manali', value: 12, color: '#16A34A' },
  { name: 'Others', value: 13, color: '#64748B' },
];

const crowdData = [
  { day: 'Mon', morning: 25, afternoon: 55, evening: 70 },
  { day: 'Tue', morning: 22, afternoon: 50, evening: 65 },
  { day: 'Wed', morning: 28, afternoon: 52, evening: 68 },
  { day: 'Thu', morning: 30, afternoon: 58, evening: 72 },
  { day: 'Fri', morning: 45, afternoon: 72, evening: 88 },
  { day: 'Sat', morning: 62, afternoon: 88, evening: 95 },
  { day: 'Sun', morning: 55, afternoon: 80, evening: 85 },
];

const weatherImpact = [
  { weather: 'Sunny', bookings: 8200, satisfaction: 92 },
  { weather: 'Cloudy', bookings: 6800, satisfaction: 85 },
  { weather: 'Rainy', bookings: 3200, satisfaction: 68 },
  { weather: 'Snowy', bookings: 4500, satisfaction: 88 },
  { weather: 'Windy', bookings: 5100, satisfaction: 76 },
  { weather: 'Hot', bookings: 4800, satisfaction: 72 },
];

const stats = [
  { label: 'Total Tourists', value: '8.2L', change: '+12.5%', icon: Users, color: 'bg-blue/10 text-blue' },
  { label: 'Popular Destinations', value: '120+', change: '+8.3%', icon: MapPin, color: 'bg-orange/10 text-orange' },
  { label: 'Peak Periods', value: 'Oct-Dec', change: 'Q4 2025', icon: Calendar, color: 'bg-success/10 text-success' },
  { label: 'Avg Crowd Level', value: '62%', change: '-3.2%', icon: TrendingUp, color: 'bg-sky/10 text-sky' },
];

export default function Analytics() {
  return (
    <div className="min-h-screen bg-light">
      <div className="bg-gradient-to-br from-navy via-navy to-blue py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <BarChart3 className="w-8 h-8 text-sky" />
            <h1 className="text-3xl sm:text-4xl font-bold text-white">Tourism Analytics Dashboard</h1>
          </div>
          <p className="text-white/70 text-lg">Real-time insights and trends for smarter travel planning</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl border border-gray-100 p-5">
              <div className={`w-10 h-10 ${stat.color} rounded-xl flex items-center justify-center mb-3`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <p className="text-2xl font-bold text-dark">{stat.value}</p>
              <p className="text-sm text-muted">{stat.label}</p>
              <p className="text-xs text-success font-semibold mt-1">{stat.change}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-dark mb-1 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue" />
              Tourist Footfall by Month
            </h3>
            <p className="text-sm text-muted mb-6">Monthly visitor trends (in thousands)</p>
            <BarGroupChart
              data={monthlyData}
              xKey="month"
              height={300}
              series={[{ key: 'tourists', name: 'Visitors', color: '#1688D4' }]}
              tooltipFormatter={(v) => `${fmtRel(v)} tourists`}
            />
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-dark mb-1 flex items-center gap-2">
              <PieChartIcon className="w-5 h-5 text-orange" />
              Destination Popularity
            </h3>
            <p className="text-sm text-muted mb-6">Share of tourist visits by destination</p>
            <div className="flex items-center gap-6">
              <div className="flex justify-center flex-1">
                <DonutChart data={destinationData} size={240} centerLabel="Destinations" centerValue="6" />
              </div>
              <div className="space-y-3">
                {destinationData.map((d) => (
                  <div key={d.name} className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color }} />
                    <span className="text-sm text-dark">{d.name}</span>
                    <span className="text-sm font-semibold text-muted">{d.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-dark mb-1 flex items-center gap-2">
              <Activity className="w-5 h-5 text-success" />
              Crowd Trends Over Week
            </h3>
            <p className="text-sm text-muted mb-6">Average crowd levels by time of day</p>
            <LineChartView
              data={crowdData}
              xKey="day"
              height={300}
              series={[
                { key: 'morning', name: 'Morning', color: '#38BDF8' },
                { key: 'afternoon', name: 'Afternoon', color: '#FF8A25' },
                { key: 'evening', name: 'Evening', color: '#DC2626' },
              ]}
              tooltipFormatter={(v) => `${v}%`}
            />
            <div className="flex items-center justify-center gap-6 mt-2">
              <div className="flex items-center gap-2 text-sm"><div className="w-3 h-3 rounded-full bg-sky" /> Morning</div>
              <div className="flex items-center gap-2 text-sm"><div className="w-3 h-3 rounded-full bg-orange" /> Afternoon</div>
              <div className="flex items-center gap-2 text-sm"><div className="w-3 h-3 rounded-full bg-danger" /> Evening</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-dark mb-1 flex items-center gap-2">
              <CloudSun className="w-5 h-5 text-warning" />
              Weather Impact on Tourism
            </h3>
            <p className="text-sm text-muted mb-6">How weather conditions affect bookings</p>
            <BarGroupChart
              data={weatherImpact}
              xKey="weather"
              height={300}
              series={[
                { key: 'bookings', name: 'Bookings', color: '#FF8A25' },
                { key: 'satisfaction', name: 'Satisfaction %', color: '#38BDF8' },
              ]}
              tooltipFormatter={(v, name) => (name === 'Bookings' ? `${fmtRel(v)} bookings` : `${v}%`)}
            />
            <div className="flex items-center justify-center gap-6 mt-2">
              <div className="flex items-center gap-2 text-sm"><div className="w-3 h-3 rounded-full bg-orange" /> Bookings</div>
              <div className="flex items-center gap-2 text-sm"><div className="w-3 h-3 rounded-full bg-sky" /> Satisfaction %</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const fmtRel = (v) => Number(v).toLocaleString('en-IN');
