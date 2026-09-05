import { useParams, Link } from 'react-router-dom';
import { getWeatherByDestination } from '../data/weather';
import { getActivitiesByDestination } from '../data/activities';
import { useContent } from '../context/ContentContext';
import { saveTrip } from '../lib/backend';
import SafetyScore from '../components/SafetyScore';
import {
  MapPin, Star, Clock, CloudSun, ArrowRight, Bookmark, Share2, Thermometer, Droplets, Wind, ChevronRight,
  TrendingUp, Hospital, ShieldAlert, Phone,
} from 'lucide-react';
import { useNotification } from '../context/NotificationContext';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';

export default function DestinationDetail() {
  const { id } = useParams();
  const { addNotification } = useNotification();
  const { getDestinationById, getPackagesByDestination } = useContent();
  const destination = getDestinationById(id);
  const weather = getWeatherByDestination(id);
  const packages = getPackagesByDestination(id);
  const activities = getActivitiesByDestination(id);

  if (!destination) {
    return (
      <div className="min-h-screen bg-light flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-dark mb-2">Destination not found</h2>
          <Link to="/destinations" className="text-blue hover:underline">Browse Destinations</Link>
        </div>
      </div>
    );
  }

  const handleSave = async () => {
    await saveTrip(id, { destinationId: id, savedAt: new Date().toISOString() });
    addNotification(`${destination.name} saved to your trips!`, 'success');
  };

  return (
    <div className="min-h-screen bg-light">
      <div className="relative h-[400px] sm:h-[500px]">
        <img src={destination.image} alt={destination.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full">
                {destination.categories[0]}
              </span>
              <span className="flex items-center gap-1 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full">
                <Star className="w-3 h-3 text-warning fill-warning" /> {destination.rating}
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2">{destination.name}</h1>
            <p className="text-white/80 text-lg flex items-center gap-2">
              <MapPin className="w-5 h-5" /> {destination.state}, {destination.country}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-wrap gap-3 mb-8">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 bg-white border border-gray-200 px-5 py-2.5 rounded-xl text-sm font-semibold text-dark hover:bg-gray-50 transition-all"
          >
            <Bookmark className="w-4 h-4" /> Save Trip
          </button>
          <button
            onClick={() => addNotification('Share link copied!', 'success')}
            className="flex items-center gap-2 bg-white border border-gray-200 px-5 py-2.5 rounded-xl text-sm font-semibold text-dark hover:bg-gray-50 transition-all"
          >
            <Share2 className="w-4 h-4" /> Share
          </button>
          <Link
            to="/ai-planner"
            className="flex items-center gap-2 bg-blue text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue/90 transition-all ml-auto"
          >
            Plan Trip <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-dark mb-4">About {destination.name}</h2>
              <p className="text-muted leading-relaxed">{destination.description}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {destination.categories.map((cat) => (
                  <span key={cat} className="bg-blue/10 text-blue px-3 py-1 rounded-full text-xs font-semibold">{cat}</span>
                ))}
              </div>
            </div>

            {activities.length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h2 className="text-xl font-bold text-dark mb-4">Things to Do</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activities.map((act) => (
                    <div key={act.id} className="flex items-center gap-3 p-3 bg-light rounded-xl">
                      <div className="w-10 h-10 bg-blue/10 rounded-lg flex items-center justify-center shrink-0">
                        <Clock className="w-4 h-4 text-blue" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-dark truncate">{act.name}</p>
                        <p className="text-xs text-muted">{act.category} · ₹{act.cost}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {destination.attractions && (
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h2 className="text-xl font-bold text-dark mb-4">Top Attractions</h2>
                <div className="space-y-3">
                  {destination.attractions.map((a, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-light rounded-xl">
                      <div className="w-8 h-8 bg-orange/10 rounded-lg flex items-center justify-center text-xs font-bold text-orange shrink-0">
                        {i + 1}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-dark">{a.name}</p>
                        <p className="text-xs text-muted">{a.type}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {destination.crowdData && (
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-5 h-5 text-purple-500" />
                  <h2 className="text-xl font-bold text-dark">Crowd Intelligence</h2>
                </div>
                <p className="text-sm text-muted mb-6">Know Before You Go — historical crowd levels by day and time</p>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={[
                    { day: 'Mon', morning: destination.crowdData.mon.morning, afternoon: destination.crowdData.mon.afternoon, evening: destination.crowdData.mon.evening },
                    { day: 'Tue', morning: destination.crowdData.tue.morning, afternoon: destination.crowdData.tue.afternoon, evening: destination.crowdData.tue.evening },
                    { day: 'Wed', morning: destination.crowdData.wed.morning, afternoon: destination.crowdData.wed.afternoon, evening: destination.crowdData.wed.evening },
                    { day: 'Thu', morning: destination.crowdData.thu.morning, afternoon: destination.crowdData.thu.afternoon, evening: destination.crowdData.thu.evening },
                    { day: 'Fri', morning: destination.crowdData.fri.morning, afternoon: destination.crowdData.fri.afternoon, evening: destination.crowdData.fri.evening },
                    { day: 'Sat', morning: destination.crowdData.sat.morning, afternoon: destination.crowdData.sat.afternoon, evening: destination.crowdData.sat.evening },
                    { day: 'Sun', morning: destination.crowdData.sun.morning, afternoon: destination.crowdData.sun.afternoon, evening: destination.crowdData.sun.evening },
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb', fontSize: '12px' }} />
                    <Legend wrapperStyle={{ fontSize: '12px' }} />
                    <Bar dataKey="morning" fill="#16A34A" radius={[3, 3, 0, 0]} />
                    <Bar dataKey="afternoon" fill="#F59E0B" radius={[3, 3, 0, 0]} />
                    <Bar dataKey="evening" fill="#DC2626" radius={[3, 3, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
                  <div className="p-3 bg-success/5 border border-success/20 rounded-xl text-center">
                    <p className="text-xs font-semibold text-success mb-1">Best Time to Visit</p>
                    <p className="text-sm font-bold text-dark">Tuesday · 8 AM - 11 AM</p>
                  </div>
                  <div className="p-3 bg-warning/5 border border-warning/20 rounded-xl text-center">
                    <p className="text-xs font-semibold text-warning mb-1">Peak Hours</p>
                    <p className="text-sm font-bold text-dark">Weekends · Evening</p>
                  </div>
                  <div className="p-3 bg-blue/5 border border-blue/20 rounded-xl text-center">
                    <p className="text-xs font-semibold text-blue mb-1">Recommended Window</p>
                    <p className="text-sm font-bold text-dark">Early Morning</p>
                  </div>
                </div>
              </div>
            )}

            {packages.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-dark mb-4">Travel Packages</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {packages.map((pkg) => (
                    <Link
                      key={pkg.id}
                      to={`/packages/${pkg.id}`}
                      className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all group"
                    >
                      <div className="relative h-36 overflow-hidden">
                        <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                        <div className="absolute top-3 right-3 bg-success text-white text-xs font-bold px-2.5 py-1 rounded-full">
                          {Math.round((1 - pkg.price / pkg.originalPrice) * 100)}% OFF
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-dark">{pkg.name}</h3>
                        <p className="text-xs text-muted mt-1">{pkg.duration}</p>
                        <div className="flex items-center justify-between mt-3">
                          <div>
                            <span className="text-xs text-muted line-through">₹{pkg.originalPrice?.toLocaleString()}</span>
                            <span className="text-lg font-bold text-blue ml-2">₹{pkg.price?.toLocaleString()}</span>
                          </div>
                          <ChevronRight className="w-5 h-5 text-blue" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            {weather?.current && (
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h3 className="font-bold text-dark mb-4 flex items-center gap-2">
                  <CloudSun className="w-5 h-5 text-orange" /> Current Weather
                </h3>
                <div className="text-center mb-4">
                  <p className="text-4xl font-bold text-dark">{weather.current.temp}°C</p>
                  <p className="text-sm text-muted">{weather.current.condition}</p>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center p-2 bg-light rounded-lg">
                    <Thermometer className="w-4 h-4 text-danger mx-auto mb-1" />
                    <p className="text-xs text-muted">Feels Like</p>
                    <p className="text-sm font-bold">{weather.current.temp + 2}°C</p>
                  </div>
                  <div className="text-center p-2 bg-light rounded-lg">
                    <Droplets className="w-4 h-4 text-blue mx-auto mb-1" />
                    <p className="text-xs text-muted">Humidity</p>
                    <p className="text-sm font-bold">{weather.current.humidity}%</p>
                  </div>
                  <div className="text-center p-2 bg-light rounded-lg">
                    <Wind className="w-4 h-4 text-muted mx-auto mb-1" />
                    <p className="text-xs text-muted">Wind</p>
                    <p className="text-sm font-bold">{weather.current.wind} km/h</p>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h3 className="font-bold text-dark mb-4">Quick Info</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Best Season</span>
                  <span className="font-semibold text-dark">{destination.bestSeason}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Duration</span>
                  <span className="font-semibold text-dark">{destination.recommendedDuration}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Avg Budget</span>
                  <span className="font-semibold text-dark">₹{destination.avgBudget?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Crowd Level</span>
                  <span className="font-semibold text-dark">{destination.crowdLevel}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h3 className="font-bold text-dark mb-3">Safety Overview</h3>
              <SafetyScore score={destination.safetyScore} size="lg" />
            </div>

            {destination.nearbyServices && (
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <ShieldAlert className="w-5 h-5 text-success" />
                  <h3 className="font-bold text-dark">Nearby Emergency Services</h3>
                </div>
                <div className="space-y-3">
                  {destination.nearbyServices.map((service) => (
                    <div key={service.name} className="flex items-center gap-3 p-3 bg-light rounded-xl">
                      <div className="w-9 h-9 bg-success/10 rounded-lg flex items-center justify-center">
                        {service.type === 'hospital' ? <Hospital className="w-4 h-4 text-success" /> :
                          service.type === 'police' ? <ShieldAlert className="w-4 h-4 text-success" /> :
                          <Phone className="w-4 h-4 text-success" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-dark">{service.name}</p>
                        <p className="text-xs text-muted capitalize">{service.type} · {service.distance}</p>
                      </div>
                      <span className="text-xs px-2 py-1 rounded-full bg-success/10 text-success font-semibold">
                        {service.type === 'hospital' ? 'Emergency' : 'Available'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
