import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { generateItinerary, buildSmartContext } from '../utils/helpers';
import { getWeatherByDestination } from '../data/weather';
import { useNotification } from '../context/NotificationContext';
import { useOffline } from '../context/OfflineContext';
import { useContent } from '../context/ContentContext';
import { createShareLink } from '../lib/backend';
import SmartContextDashboard from '../components/SmartContextDashboard';
import ActivityDetailModal from '../components/ActivityDetailModal';
import {
  Sparkles,
  MapPin,
  Calendar,
  Users,
  ChevronRight,
  Clock,
  IndianRupee,
  CheckCircle,
  WifiOff,
  RefreshCw,
  Map,
  List,
  CloudSun,
  Eye,
  Share2,
} from 'lucide-react';

const mapPins = [
  { x: 18, y: 72 },
  { x: 38, y: 38 },
  { x: 58, y: 62 },
  { x: 78, y: 30 },
];

const interestOptions = ['Adventure', 'Nature', 'Beaches', 'Culture', 'Food', 'History', 'Shopping', 'Photography', 'Family'];
const budgetOptions = [
  { id: 'budget', label: 'Budget', desc: 'Under ₹10K', icon: '💰' },
  { id: 'moderate', label: 'Moderate', desc: '₹10K - ₹25K', icon: '💎' },
  { id: 'premium', label: 'Premium', desc: '₹25K - ₹50K', icon: '🌟' },
  { id: 'luxury', label: 'Luxury', desc: '₹50K+', icon: '👑' },
];
const paceOptions = [
  { id: 'relaxed', label: 'Relaxed', desc: '2 activities/day' },
  { id: 'balanced', label: 'Balanced', desc: '3 activities/day' },
  { id: 'packed', label: 'Packed', desc: '4 activities/day' },
];

export default function AIPlanner() {
  const navigate = useNavigate();
  const { addNotification } = useNotification();
  const { isOnline, saveForOffline } = useOffline();
  const { destinations } = useContent();
  const [step, setStep] = useState(0);
  const [preferences, setPreferences] = useState({
    destination: '',
    duration: '4',
    budget: 'moderate',
    travelPace: 'balanced',
    travelers: '2',
    interests: [],
  });
  const [itinerary, setItinerary] = useState(null);
  const [contextDashboard, setContextDashboard] = useState(null);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [activeDay, setActiveDay] = useState(1);
  const [mapView, setMapView] = useState(false);
  const [activeActivity, setActiveActivity] = useState(null);
  const [generating, setGenerating] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);

  const loadingMessages = [
    'Analyzing your preferences...',
    'Checking weather...',
    'Analyzing crowd patterns...',
    'Finding safe routes...',
    'Optimizing your itinerary...',
  ];

  const toggleInterest = (interest) => {
    setPreferences((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const handleGenerate = () => {
    if (!preferences.destination) {
      addNotification('Please select a destination', 'error');
      return;
    }
    setGenerating(true);
    setLoadingStep(0);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      if (i < loadingMessages.length) {
        setLoadingStep(i);
      } else {
        clearInterval(interval);
        const dest = destinations.find((d) => d.name.toLowerCase() === preferences.destination.toLowerCase());
        const weather = dest ? getWeatherByDestination(dest.id) : null;
        const result = generateItinerary(preferences, dest, weather);
        setSelectedDestination(dest || null);
        setContextDashboard(dest ? buildSmartContext(dest, weather, preferences, isOnline) : null);
        setItinerary(result);
        setActiveDay(1);
        setMapView(false);
        setGenerating(false);
        setStep(4);
        addNotification('Your smart itinerary is ready!', 'success');
      }
    }, 700);
  };

  const handleSaveOffline = () => {
    if (!itinerary) return;
    const dest = selectedDestination || destinations.find(d => d.name.toLowerCase() === (itinerary.destination || '').toLowerCase());
    const weather = dest ? getWeatherByDestination(dest.id) : null;
    saveForOffline({
      itinerary,
      destinationId: dest?.id,
      safetyContacts: [],
      savedLocations: dest?.attractions?.slice(0, 4) || [],
      weatherSummary: weather?.current
    });
    addNotification('Itinerary saved for offline! Check your My Trips.', 'success');
  };

  const handleBookNow = () => {
    const dest = selectedDestination || destinations.find((d) => d.name.toLowerCase() === preferences.destination.toLowerCase());
    if (dest) {
      localStorage.setItem('safarnow_booking', JSON.stringify({
        destinationId: dest.id,
        travelers: preferences.travelers,
        days: preferences.duration,
        packageName: `AI ${preferences.destination} Trip`,
        nights: Math.max(1, (parseInt(preferences.duration) || 4) - 1),
      }));
      navigate('/booking');
    } else {
      addNotification('Please select a valid destination', 'error');
    }
  };

  const handleShare = async () => {
    if (!itinerary) return;
    const token = await createShareLink({
      ...itinerary,
      destinationId: selectedDestination?.id || null,
      dateLabel: preferences.startDate || null,
    });
    if (!token) {
      addNotification('Sign in with Supabase to share your itinerary', 'error');
      return;
    }
    const url = `${window.location.origin}/share/${token}`;
    navigator.clipboard?.writeText(url).catch(() => {});
    addNotification('Share link copied to clipboard!', 'success');
  };

  const steps = ['Destination', 'Preferences', 'Budget', 'Review'];

  return (
    <div className="min-h-screen bg-light">
      <div className="bg-gradient-to-br from-navy via-navy to-blue py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-3">
            <Sparkles className="w-8 h-8 text-orange" />
            <h1 className="text-3xl sm:text-4xl font-bold text-white">AI Trip Planner</h1>
          </div>
          <p className="text-white/70 text-lg">Let AI craft your perfect itinerary in seconds</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {!generating && step < 4 && (
          <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-2">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                  i <= step ? 'bg-blue text-white' : 'bg-gray-200 text-muted'
                }`}>
                  {i < step ? <CheckCircle className="w-4 h-4" /> : i + 1}
                </div>
                <span className={`text-sm font-medium whitespace-nowrap ${i <= step ? 'text-dark' : 'text-muted'}`}>{s}</span>
                {i < steps.length - 1 && <div className="w-8 h-px bg-gray-200" />}
              </div>
            ))}
          </div>
        )}

        {generating && (
          <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center animate-scale-in">
            <div className="w-16 h-16 mx-auto mb-6 relative">
              <div className="absolute inset-0 border-4 border-blue/20 border-t-blue rounded-full animate-spin" />
              <Sparkles className="w-6 h-6 text-blue absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
            <h3 className="text-xl font-bold text-dark mb-4 animate-pulse-soft">
              {loadingMessages[loadingStep]}
            </h3>
            <div className="max-w-xs mx-auto flex items-center gap-2">
              {loadingMessages.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 flex-1 rounded-full transition-all ${
                    i <= loadingStep ? 'bg-blue' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {step === 0 && (
          <div className="animate-slide-up">
            <h2 className="text-2xl font-bold text-dark mb-2">Where do you want to go?</h2>
            <p className="text-muted mb-6">Pick your dream destination</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
              {destinations.slice(0, 9).map((dest) => (
                <button
                  key={dest.id}
                  onClick={() => setPreferences({ ...preferences, destination: dest.name })}
                  className={`relative rounded-2xl overflow-hidden text-left group transition-all ${
                    preferences.destination === dest.name ? 'ring-3 ring-blue shadow-lg' : 'hover:shadow-md'
                  }`}
                >
                  <img src={dest.image} alt={dest.name} className="w-full h-36 object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <p className="text-white font-bold">{dest.name}</p>
                    <p className="text-white/70 text-xs flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {dest.state}
                    </p>
                  </div>
                  {preferences.destination === dest.name && (
                    <div className="absolute top-2 right-2">
                      <div className="w-6 h-6 bg-blue rounded-full flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  )}
                </button>
              ))}
            </div>
            <button
              onClick={() => preferences.destination ? setStep(1) : addNotification('Select a destination', 'error')}
              className="bg-blue text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue/90 transition-all"
            >
              Continue
            </button>
          </div>
        )}

        {step === 1 && (
          <div className="animate-slide-up space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-dark mb-2">Travel Style</h2>
              <p className="text-muted mb-4">How many days and what pace?</p>
              <div className="grid grid-cols-3 gap-3 mb-4">
                {paceOptions.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setPreferences({ ...preferences, travelPace: p.id })}
                    className={`p-4 rounded-xl border-2 text-center transition-all ${
                      preferences.travelPace === p.id
                        ? 'border-blue bg-blue/5 text-blue'
                        : 'border-gray-200 hover:border-blue/50 text-dark'
                    }`}
                  >
                    <p className="font-bold text-sm">{p.label}</p>
                    <p className="text-xs text-muted mt-1">{p.desc}</p>
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium text-dark flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted" /> Duration:
                </label>
                <select
                  value={preferences.duration}
                  onChange={(e) => setPreferences({ ...preferences, duration: e.target.value })}
                  className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue/30"
                >
                  {[2, 3, 4, 5, 6, 7, 8, 9, 10].map((d) => (
                    <option key={d} value={d}>{d} Days</option>
                  ))}
                </select>
                <label className="text-sm font-medium text-dark flex items-center gap-2">
                  <Users className="w-4 h-4 text-muted" /> Travelers:
                </label>
                <select
                  value={preferences.travelers}
                  onChange={(e) => setPreferences({ ...preferences, travelers: e.target.value })}
                  className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue/30"
                >
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-dark mb-3">Interests</h3>
              <div className="flex flex-wrap gap-2">
                {interestOptions.map((interest) => (
                  <button
                    key={interest}
                    onClick={() => toggleInterest(interest)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
                      preferences.interests.includes(interest)
                        ? 'bg-blue text-white border-blue'
                        : 'bg-white text-dark border-gray-200 hover:border-blue'
                    }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep(0)} className="px-6 py-3 border-2 border-gray-200 rounded-xl font-semibold text-dark hover:bg-gray-50">Back</button>
              <button onClick={() => setStep(2)} className="px-8 py-3 bg-blue text-white rounded-xl font-semibold hover:bg-blue/90">Continue</button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-slide-up">
            <h2 className="text-2xl font-bold text-dark mb-2">Your Budget</h2>
            <p className="text-muted mb-6">This helps us suggest the right options</p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {budgetOptions.map((b) => (
                <button
                  key={b.id}
                  onClick={() => setPreferences({ ...preferences, budget: b.id })}
                  className={`p-6 rounded-2xl border-2 text-left transition-all ${
                    preferences.budget === b.id
                      ? 'border-blue bg-blue/5 shadow-md'
                      : 'border-gray-200 hover:border-blue/50'
                  }`}
                >
                  <span className="text-2xl">{b.icon}</span>
                  <p className="font-bold text-dark mt-2">{b.label}</p>
                  <p className="text-sm text-muted">{b.desc}</p>
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="px-6 py-3 border-2 border-gray-200 rounded-xl font-semibold text-dark hover:bg-gray-50">Back</button>
              <button onClick={() => setStep(3)} className="px-8 py-3 bg-blue text-white rounded-xl font-semibold hover:bg-blue/90">Continue</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="animate-slide-up">
            <h2 className="text-2xl font-bold text-dark mb-2">Review Your Trip</h2>
            <p className="text-muted mb-6">Check your preferences before generating</p>
            <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-8 space-y-4">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-muted text-sm">Destination</span>
                <span className="font-semibold text-dark">{preferences.destination || 'Not selected'}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-muted text-sm">Duration</span>
                <span className="font-semibold text-dark">{preferences.duration} Days</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-muted text-sm">Travelers</span>
                <span className="font-semibold text-dark">{preferences.travelers}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-muted text-sm">Budget</span>
                <span className="font-semibold text-dark capitalize">{preferences.budget}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-muted text-sm">Pace</span>
                <span className="font-semibold text-dark capitalize">{preferences.travelPace}</span>
              </div>
              <div className="py-2">
                <span className="text-muted text-sm block mb-2">Interests</span>
                <div className="flex flex-wrap gap-2">
                  {preferences.interests.length > 0 ? preferences.interests.map((i) => (
                    <span key={i} className="bg-blue/10 text-blue px-3 py-1 rounded-full text-xs font-semibold">{i}</span>
                  )) : <span className="text-sm text-muted">None selected</span>}
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep(2)} className="px-6 py-3 border-2 border-gray-200 rounded-xl font-semibold text-dark hover:bg-gray-50">Back</button>
              <button
                onClick={handleGenerate}
                disabled={generating}
                className="flex items-center gap-2 px-8 py-3 bg-orange text-white rounded-xl font-semibold hover:bg-orange/90 transition-all disabled:opacity-60"
              >
                {generating ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Generate Itinerary
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {step === 4 && itinerary && (
          <div className="animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-dark">Your Smart Itinerary is Ready</h2>
                <p className="text-muted">AI-generated for {preferences.destination}</p>
              </div>
              <button
                onClick={() => { setItinerary(null); setContextDashboard(null); setSelectedDestination(null); setActiveActivity(null); setStep(0); }}
                className="text-sm text-blue font-semibold hover:underline flex items-center gap-1"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Start Over
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-6 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-muted">
                <MapPin className="w-4 h-4 text-blue" /> {itinerary.destination}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted">
                <Calendar className="w-4 h-4 text-blue" /> {itinerary.daysCount} Days
              </div>
              <div className="flex items-center gap-2 text-sm text-muted">
                <Users className="w-4 h-4 text-blue" /> {preferences.travelers} Travelers
              </div>
              <div className="flex items-center gap-2 text-sm text-muted">
                <IndianRupee className="w-4 h-4 text-blue" /> ₹{itinerary.totalCost?.toLocaleString()}
              </div>

              {!isOnline && (
                <div className="flex items-center gap-2 text-sm text-amber-600 ml-auto">
                  <WifiOff className="w-4 h-4" /> Using cached data
                </div>
              )}
            </div>

            <div className="mb-8">
              {contextDashboard ? (
                <SmartContextDashboard data={contextDashboard} />
              ) : (
                <SmartContextDashboard
                  data={{
                    weather: { temperature: 28, condition: 'Sunny', humidity: 65, wind: 12 },
                    crowd: { current: 'Moderate', currentScore: 45 },
                    safety: { score: 90 },
                    connectivity: { isOnline, signal: isOnline ? 'Strong 4G' : 'Cached', coverage: isOnline ? '98% coverage' : 'Offline available' },
                    recommendation: {
                      text: `Visit the top attractions early in the morning (before 11 AM) because historical crowd levels are lower and weather conditions are most favorable.`,
                      tips: [
                        { type: 'warning', text: 'Carry water and sunscreen — temperatures peak in the afternoon.' },
                        { type: 'success', text: 'Internet coverage is good for most of your journey.' },
                        { type: 'info', text: 'Nearby hospitals and police stations are within 2.5 km.' },
                      ],
                    },
                  }}
                />
              )}
            </div>

            <div className="mb-8">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {itinerary.days.map((day) => (
                    <button
                      key={day.day}
                      onClick={() => setActiveDay(day.day)}
                      className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                        activeDay === day.day
                          ? 'bg-blue text-white shadow-md shadow-blue/25'
                          : 'bg-white text-muted border border-gray-200 hover:text-blue hover:border-blue'
                      }`}
                    >
                      Day {day.day}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setMapView(false)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                      !mapView ? 'bg-navy text-white' : 'bg-white text-muted border border-gray-200 hover:text-navy'
                    }`}
                  >
                    <List className="w-4 h-4" /> List
                  </button>
                  <button
                    onClick={() => setMapView(true)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                      mapView ? 'bg-navy text-white' : 'bg-white text-muted border border-gray-200 hover:text-navy'
                    }`}
                  >
                    <Map className="w-4 h-4" /> Route Map
                  </button>
                </div>
              </div>

              {(() => {
                const day = itinerary.days.find((d) => d.day === activeDay) || itinerary.days[0];

                if (mapView) {
                  const points = day.activities
                    .map((_, i) => {
                      const pin = mapPins[i % mapPins.length];
                      return `${pin.x},${pin.y}`;
                    })
                    .join(' ');
                  return (
                    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                      <div className="p-4 border-b border-gray-100 bg-light flex items-center justify-between">
                        <div>
                          <h3 className="text-sm font-bold text-dark">{day.title}</h3>
                          <p className="text-xs text-muted flex items-center gap-2 mt-0.5">
                            <CloudSun className="w-3.5 h-3.5 text-orange" />
                            {day.weather} · {day.rainProbability}% rain
                          </p>
                        </div>
                        <span className="text-xs px-3 py-1 rounded-full bg-blue/10 text-blue font-semibold">
                          Route · Day {day.day}
                        </span>
                      </div>
                      <div className="relative h-72">
                        <img
                          src={selectedDestination?.image || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80'}
                          alt="Route map"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-navy/20 via-transparent to-navy/40" />
                        <svg
                          className="absolute inset-0 w-full h-full"
                          viewBox="0 0 100 100"
                          preserveAspectRatio="none"
                        >
                          <polyline
                            points={points}
                            fill="none"
                            stroke="#38BDF8"
                            strokeWidth="0.4"
                            strokeDasharray="1.5 1"
                            strokeLinejoin="round"
                          />
                        </svg>
                        {day.activities.map((act, i) => {
                          const pin = mapPins[i % mapPins.length];
                          return (
                            <button
                              key={act.id}
                              onClick={() => setActiveActivity(act)}
                              style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                              className="absolute -translate-x-1/2 -translate-y-full group"
                            >
                              <div className="bg-white rounded-lg shadow-lg px-2 py-1 text-xs font-semibold text-navy border border-gray-200 group-hover:border-blue whitespace-nowrap">
                                {i + 1}. {act.activity}
                              </div>
                              <div className="mx-auto w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-blue" />
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                }

                return (
                  <div className="bg-white rounded-2xl border border-gray-100 p-6">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-5">
                      <h3 className="text-lg font-bold text-dark flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue/10 rounded-lg flex items-center justify-center text-blue font-bold text-sm">
                          {day.day}
                        </div>
                        {day.title}
                      </h3>
                      <span className="flex items-center gap-1.5 text-xs px-3 py-1 rounded-full bg-orange/10 text-orange font-semibold">
                        <CloudSun className="w-3.5 h-3.5" /> {day.weather} · {day.rainProbability}% rain
                      </span>
                    </div>
                    <div className="space-y-3">
                      {day.activities.map((act) => (
                        <button
                          key={act.id}
                          onClick={() => setActiveActivity(act)}
                          className="w-full flex flex-wrap items-center gap-4 p-3 bg-light rounded-xl hover:bg-blue/5 border border-transparent hover:border-blue/20 transition-all text-left cursor-pointer"
                        >
                          <div className="w-14 text-center shrink-0">
                            <Clock className="w-3.5 h-3.5 text-muted mx-auto mb-0.5" />
                            <span className="text-xs font-semibold text-dark">{act.time}</span>
                          </div>
                          <div className="flex-1 min-w-[160px]">
                            <p className="text-sm font-semibold text-dark">{act.activity}</p>
                            <p className="text-xs text-muted">{act.category} · {act.duration}</p>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              act.crowdLevel >= 70
                                ? 'bg-danger/10 text-danger'
                                : act.crowdLevel >= 40
                                  ? 'bg-warning/10 text-warning'
                                  : 'bg-success/10 text-success'
                            }`}>
                              {act.crowdStatus || 'Moderate'} crowd
                            </span>
                            <div className="text-right w-20">
                              <p className="text-sm font-bold text-blue">₹{act.cost?.toLocaleString()}</p>
                              <p className="text-[10px] text-muted flex items-center gap-0.5 justify-end">
                                <Eye className="w-3 h-3" /> details
                              </p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })()}
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleBookNow}
                className="flex-1 min-w-[200px] flex items-center justify-center gap-2 bg-orange text-white py-3.5 rounded-xl font-semibold hover:bg-orange/90 transition-all"
              >
                Book This Trip
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={handleSaveOffline}
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold bg-blue text-white hover:bg-blue/90 transition-all"
              >
                <WifiOff className="w-4 h-4" /> Save for Offline
              </button>
              <button
                onClick={handleShare}
                className="flex items-center justify-center gap-2 px-6 py-3.5 border-2 border-blue/40 text-blue rounded-xl font-semibold hover:bg-blue/5 transition-all"
              >
                <Share2 className="w-4 h-4" /> Share
              </button>
              <Link
                to="/destinations"
                className="flex items-center justify-center gap-2 px-6 py-3.5 border-2 border-gray-200 rounded-xl font-semibold text-dark hover:bg-gray-50"
              >
                Explore More
              </Link>
            </div>

            {activeActivity && (
              <ActivityDetailModal
                activity={activeActivity}
                day={itinerary.days.find((d) => d.day === activeDay)?.day || activeDay}
                destination={selectedDestination}
                onClose={() => setActiveActivity(null)}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
