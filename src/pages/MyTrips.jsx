import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getDestinationById } from '../data/destinations';
import { getWeatherByDestination } from '../data/weather';
import { useOffline } from '../context/OfflineContext';
import { useNotification } from '../context/NotificationContext';
import { downloadETicket } from '../utils/eticket';
import SafetyScore from '../components/SafetyScore';
import {
  MapPin,
  Calendar,
  Users,
  Package,
  CloudSun,
  Bookmark,
  Clock,
  ChevronRight,
  Sparkles,
  CheckCircle,
  Plane,
  AlertCircle,
  Download,
  WifiOff,
} from 'lucide-react';

export default function MyTrips() {
  const [bookings, setBookings] = useState([]);
  const [savedTrips, setSavedTrips] = useState([]);
  const [activeTab, setActiveTab] = useState('upcoming');
  const { saveForOffline } = useOffline();
  const { addNotification } = useNotification();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('safarnow_bookings') || '[]');
    setBookings(stored);
    const saved = JSON.parse(localStorage.getItem('safarnow_saved_trips') || '[]');
    setSavedTrips(saved);
  }, []);

  const handleDownload = (trip) => {
    const dest = getDestinationById(trip.destinationId);
    downloadETicket(trip, dest);
    addNotification('E-ticket downloaded!', 'success');
  };

  const handleSaveOffline = (trip) => {
    saveForOffline({
      destinationId: trip.destinationId,
      itinerary: null,
      booking: trip,
      savedLocations: getDestinationById(trip.destinationId)?.attractions?.slice(0, 4) || [],
      weatherSummary: undefined,
    });
    addNotification('Booking saved for offline access!', 'success');
  };

  const now = new Date();
  const upcoming = bookings.filter((b) => new Date(b.checkIn) >= now);
  const past = bookings.filter((b) => new Date(b.checkIn) < now);

  const tabs = [
    { id: 'upcoming', label: 'Upcoming', count: upcoming.length },
    { id: 'past', label: 'Past', count: past.length },
    { id: 'saved', label: 'Saved', count: savedTrips.length },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-success/10 text-success';
      case 'pending': return 'bg-warning/10 text-warning';
      case 'cancelled': return 'bg-danger/10 text-danger';
      default: return 'bg-blue/10 text-blue';
    }
  };

  const renderTripCard = (trip) => {
    const destination = getDestinationById(trip.destinationId);
    const weather = getWeatherByDestination(trip.destinationId);

    return (
      <div key={trip.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all group">
        <div className="relative h-44">
          <img
            src={trip.image || destination?.image || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80'}
            alt={trip.destinationName}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 right-3">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(trip.status)}`}>
              {trip.status?.charAt(0).toUpperCase() + trip.status?.slice(1)}
            </span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-navy/70 to-transparent" />
          <div className="absolute bottom-3 left-4">
            <h3 className="text-white font-bold text-lg">{trip.destinationName}</h3>
            <p className="text-white/80 text-sm flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {trip.packageName}
            </p>
          </div>
        </div>

        <div className="p-5">
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="flex items-center gap-2 text-sm text-muted">
              <Calendar className="w-4 h-4" />
              <span>{trip.checkIn || 'TBD'}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted">
              <Users className="w-4 h-4" />
              <span>{trip.travelers} Travelers</span>
            </div>
            {destination && (
              <div className="flex items-center gap-2 text-sm text-muted">
                <CloudSun className="w-4 h-4" />
                <span>{weather?.current?.temp || '--'}°C</span>
              </div>
            )}
            <div className="flex items-center gap-2 text-sm text-muted">
              <Package className="w-4 h-4" />
              <span>₹{trip.total?.toLocaleString()}</span>
            </div>
          </div>

          {destination && (
            <div className="mb-4">
              <SafetyScore score={destination.safetyScore} size="sm" />
            </div>
          )}

          <div className="flex gap-2">
            <Link
              to={`/destinations/${trip.destinationId}`}
              className="flex-1 flex items-center justify-center gap-1.5 bg-blue/10 text-blue py-2.5 rounded-xl text-sm font-semibold hover:bg-blue/20 transition-colors"
            >
              View Trip
              <ChevronRight className="w-4 h-4" />
            </Link>
            <Link
              to="/ai-planner"
              className="flex-1 flex items-center justify-center gap-1.5 border border-gray-200 text-dark py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              Itinerary
            </Link>
          </div>

          <div className="flex gap-2 mt-2">
            <button
              onClick={() => handleDownload(trip)}
              className="flex-1 flex items-center justify-center gap-1.5 bg-navy text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-navy/90 transition-colors"
            >
              <Download className="w-4 h-4" />
              E-Ticket
            </button>
            <button
              onClick={() => handleSaveOffline(trip)}
              className="flex-1 flex items-center justify-center gap-1.5 border border-gray-200 text-dark py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors"
            >
              <WifiOff className="w-4 h-4" />
              Offline
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-light">
      <div className="bg-gradient-to-br from-navy via-navy to-blue py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <Plane className="w-8 h-8 text-sky" />
            <h1 className="text-3xl sm:text-4xl font-bold text-white">My Trips</h1>
          </div>
          <p className="text-white/70 text-lg">Manage and track all your adventures</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-white text-blue shadow-md'
                  : 'bg-white/60 text-muted hover:bg-white hover:text-dark'
              }`}
            >
              {tab.label}
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                activeTab === tab.id ? 'bg-blue/10 text-blue' : 'bg-gray-100 text-muted'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'upcoming' && (
          <div>
            {upcoming.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcoming.map((trip) => renderTripCard(trip))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="w-16 h-16 bg-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Plane className="w-8 h-8 text-blue" />
                </div>
                <h3 className="text-xl font-bold text-dark mb-2">No upcoming trips</h3>
                <p className="text-muted mb-6">Start planning your next adventure!</p>
                <Link
                  to="/destinations"
                  className="inline-flex items-center gap-2 bg-blue text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue/90 transition-all"
                >
                  Explore Destinations
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>
        )}

        {activeTab === 'past' && (
          <div>
            {past.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {past.map((trip) => renderTripCard(trip))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="w-16 h-16 bg-muted/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-muted" />
                </div>
                <h3 className="text-xl font-bold text-dark mb-2">No past trips</h3>
                <p className="text-muted">Your completed trips will appear here</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'saved' && (
          <div>
            {savedTrips.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedTrips.map((trip, i) => {
                  const dest = getDestinationById(trip.destinationId);
                  return (
                    <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                      {dest && (
                        <div className="relative h-40">
                          <img src={dest.image} alt={dest.name} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-t from-navy/70 to-transparent" />
                          <div className="absolute bottom-3 left-4">
                            <h3 className="text-white font-bold">{dest.name}</h3>
                          </div>
                        </div>
                      )}
                      <div className="p-4">
                        <Link
                          to={`/destinations/${trip.destinationId}`}
                          className="flex items-center justify-center gap-2 bg-blue/10 text-blue py-2.5 rounded-xl text-sm font-semibold hover:bg-blue/20 transition-colors w-full"
                        >
                          View Destination
                          <ChevronRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="w-16 h-16 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bookmark className="w-8 h-8 text-warning" />
                </div>
                <h3 className="text-xl font-bold text-dark mb-2">No saved trips</h3>
                <p className="text-muted">Save destinations to plan later!</p>
              </div>
            )}
          </div>
        )}

        <div className="mt-12 bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-dark mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-orange" />
            Smart Travel Status
          </h2>
          {upcoming.length > 0 ? (
            (() => {
              const dest = getDestinationById(upcoming[0].destinationId);
              const weather = getWeatherByDestination(upcoming[0].destinationId);
              return (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-sky/5 border border-sky/20 rounded-xl p-5 text-center">
                    <CloudSun className="w-7 h-7 text-blue mx-auto mb-2" />
                    <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-1">Weather</p>
                    <p className="text-sm font-bold text-dark">
                      {weather?.forecast?.[0]?.condition || 'Good'} · {weather?.current?.temp || '--'}°C
                    </p>
                    <p className={`text-xs mt-1 font-semibold ${
                      (weather?.forecast?.[0]?.rain || 0) > 60 ? 'text-danger' : (weather?.forecast?.[0]?.rain || 0) > 30 ? 'text-warning' : 'text-success'
                    }`}>
                      {weather?.forecast?.[0]?.rain > 60 ? 'Plan indoor activities' : weather?.forecast?.[0]?.rain > 30 ? 'Carry an umbrella' : 'Good conditions'}
                    </p>
                  </div>
                  <div className="bg-warning/5 border border-warning/20 rounded-xl p-5 text-center">
                    <AlertCircle className="w-7 h-7 text-warning mx-auto mb-2" />
                    <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-1">Crowd</p>
                    <p className="text-sm font-bold text-dark">{dest?.crowdLevel || 'Moderate'}</p>
                    <p className="text-xs mt-1 font-semibold text-warning">Best time: 8 AM - 11 AM</p>
                  </div>
                  <div className="bg-success/5 border border-success/20 rounded-xl p-5 text-center">
                    <CheckCircle className="w-7 h-7 text-success mx-auto mb-2" />
                    <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-1">Safety</p>
                    <p className="text-sm font-bold text-dark">{dest?.safetyScore || 85}/100</p>
                    <p className="text-xs mt-1 font-semibold text-success">
                      {dest && dest.safetyScore >= 80 ? 'Safe to explore' : dest && dest.safetyScore >= 50 ? 'Exercise caution' : 'Use caution'}
                    </p>
                  </div>
                </div>
              );
            })()
          ) : (
            <div className="text-center py-6">
              <p className="text-muted text-sm">Plan a trip to see personalized smart travel status</p>
              <Link to="/ai-planner" className="inline-flex items-center gap-1.5 text-blue font-semibold text-sm mt-2 hover:underline">
                <Sparkles className="w-4 h-4" /> Plan with AI
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
