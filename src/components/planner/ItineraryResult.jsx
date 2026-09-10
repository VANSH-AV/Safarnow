import { useState } from 'react';
import { Link } from 'react-router-dom';
import SmartContextDashboard from '../SmartContextDashboard';
import ActivityDetailModal from '../ActivityDetailModal';
import { formatMoney, budgetDelta } from '../../lib/itinerary';
import {
  Sparkles,
  MapPin,
  Calendar,
  Users,
  ChevronRight,
  Clock,
  IndianRupee,
  WifiOff,
  RefreshCw,
  Map,
  List,
  CloudSun,
  Eye,
  Share2,
  Bookmark,
  AlertTriangle,
  ShieldCheck,
  BedDouble,
  Lightbulb,
  Pencil,
} from 'lucide-react';

const mapPins = [
  { x: 18, y: 72 },
  { x: 38, y: 38 },
  { x: 58, y: 62 },
  { x: 78, y: 30 },
];

const SAFETY_LEVELS = {
  green: { label: 'Safe', cls: 'bg-success/10 text-success border-success/20' },
  yellow: { label: 'Moderate caution', cls: 'bg-warning/10 text-warning border-warning/20' },
  red: { label: 'Higher caution', cls: 'bg-danger/10 text-danger border-danger/20' },
};

export default function ItineraryResult({
  itinerary,
  preferences,
  selectedDestination,
  contextDashboard,
  isOnline,
  isAuthenticated,
  generating,
  regenError,
  onSaveTrip,
  onRegenerate,
  onModify,
  onStartOver,
  onBookNow,
  onSaveOffline,
  onShare,
}) {
  const [activeDay, setActiveDay] = useState(1);
  const [mapView, setMapView] = useState(false);
  const [activeActivity, setActiveActivity] = useState(null);

  const over = budgetDelta(itinerary, preferences);
  const currency = itinerary.currency || 'INR';
  const travellers = preferences.travellers || itinerary.tripSummary?.travellers || '';
  const day = itinerary.days.find((d) => d.day === activeDay) || itinerary.days[0];

  return (
    <div className="animate-slide-up">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-dark">Your Trip is Ready</h2>
          <p className="text-muted">AI-generated for {itinerary.destination}</p>
        </div>
        <button
          onClick={onStartOver}
          className="text-sm text-blue font-semibold hover:underline flex items-center gap-1"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Start Over
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-6 flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2 text-sm text-muted">
          <MapPin className="w-4 h-4 text-blue" /> {itinerary.destination}
          {itinerary.state && <span className="text-xs text-muted">({itinerary.state})</span>}
        </div>
        <div className="flex items-center gap-2 text-sm text-muted">
          <Calendar className="w-4 h-4 text-blue" /> {itinerary.daysCount} Days
        </div>
        {travellers !== '' && travellers !== null && (
          <div className="flex items-center gap-2 text-sm text-muted">
            <Users className="w-4 h-4 text-blue" /> {travellers} Travellers
          </div>
        )}
        <div className="flex items-center gap-2 text-sm text-muted">
          <IndianRupee className="w-4 h-4 text-blue" /> {formatMoney(itinerary.totalCost, currency)}
        </div>
        {!isOnline && (
          <div className="flex items-center gap-2 text-sm text-amber-600 ml-auto">
            <WifiOff className="w-4 h-4" /> Using cached data
          </div>
        )}
      </div>

      {over > 0 && (
        <div className="bg-warning/10 border border-warning/30 text-amber-800 rounded-2xl p-5 mb-6 flex flex-wrap items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-warning shrink-0" />
          <div className="flex-1 min-w-[220px]">
            <p className="font-semibold text-dark">
              Your itinerary is approximately {formatMoney(over, currency)} over your budget
            </p>
            <p className="text-sm text-muted">We can regenerate a more budget-conscious version without changing your budget.</p>
          </div>
          <button
            onClick={onRegenerate}
            disabled={generating}
            className="flex items-center gap-2 px-5 py-2.5 bg-orange text-white rounded-xl font-semibold hover:bg-orange/90 disabled:opacity-60 transition-all"
          >
            <RefreshCw className={`w-4 h-4 ${generating ? 'animate-spin' : ''}`} /> Adjust itinerary
          </button>
        </div>
      )}

      <div className="mb-8">
        {contextDashboard && <SmartContextDashboard data={contextDashboard} />}
      </div>

      <div className="mb-8">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {itinerary.days.map((d) => (
              <button
                key={d.day}
                onClick={() => setActiveDay(d.day)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                  activeDay === d.day
                    ? 'bg-blue text-white shadow-md shadow-blue/25'
                    : 'bg-white text-muted border border-gray-200 hover:text-blue hover:border-blue'
                }`}
              >
                Day {d.day}
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

        {mapView ? (
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
                alt={`Route map for ${itinerary.destination}`}
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-navy/20 via-transparent to-navy/40" />
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <polyline
                  points={day.activities.map((_, i) => `${mapPins[i % mapPins.length].x},${mapPins[i % mapPins.length].y}`).join(' ')}
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
                    aria-label={`${i + 1}. ${act.activity}`}
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
        ) : (
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
              {day.activities.length === 0 && (
                <p className="text-sm text-muted">No activities scheduled for this day.</p>
              )}
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
                      <p className="text-sm font-bold text-blue">{formatMoney(act.cost, currency)}</p>
                      <p className="text-[10px] text-muted flex items-center gap-0.5 justify-end">
                        <Eye className="w-3 h-3" /> details
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-dark mb-4 flex items-center gap-2">
            <IndianRupee className="w-5 h-5 text-blue" /> Budget Breakdown
          </h3>
          <div className="space-y-2.5">
            {[
              ['stay', 'Stay'],
              ['food', 'Food'],
              ['transport', 'Transport'],
              ['activities', 'Activities'],
              ['other', 'Other'],
            ].map(([key, label]) => (
              <div key={key} className="flex justify-between py-1.5 border-b border-gray-100">
                <span className="text-sm text-muted">{label}</span>
                <span className="text-sm font-semibold text-dark">{formatMoney(itinerary.budgetBreakdown[key], currency)}</span>
              </div>
            ))}
            <div className={`flex justify-between py-2 ${over > 0 ? 'text-danger' : 'text-navy'}`}>
              <span className="text-sm font-bold">Estimated Total</span>
              <span className="font-bold">{formatMoney(itinerary.totalCost, currency)}</span>
            </div>
            {preferences.budgetAmount && (
              <p className={`text-xs ${over > 0 ? 'text-danger' : 'text-success'}`}>
                {over > 0
                  ? `${formatMoney(over, currency)} over your budget`
                  : `Within your ${formatMoney(preferences.budgetAmount, currency)} budget`}
              </p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-dark mb-4 flex items-center gap-2">
            <BedDouble className="w-5 h-5 text-blue" /> Hotel Recommendations
          </h3>
          {itinerary.hotelRecommendations.length === 0 ? (
            <p className="text-sm text-muted">No hotel recommendations were returned for this destination.</p>
          ) : (
            <div className="space-y-3">
              {itinerary.hotelRecommendations.map((h, i) => (
                <div key={`${h.name}-${i}`} className="flex flex-wrap items-start gap-3 p-3 bg-light rounded-xl">
                  <div className="flex-1 min-w-[160px]">
                    <p className="text-sm font-bold text-dark">{h.name}</p>
                    <p className="text-xs text-muted mt-0.5">
                      {h.stars ? `${'★'.repeat(Math.max(1, Math.min(5, h.stars)))} · ` : ''}{h.location}
                    </p>
                    {h.reason && <p className="text-xs text-muted mt-1">{h.reason}</p>}
                  </div>
                  {h.pricePerNight > 0 && (
                    <div className="text-right shrink-0">
                      <p className="text-sm font-bold text-blue">{formatMoney(h.pricePerNight, currency)}</p>
                      <p className="text-[10px] text-muted">/ night</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-dark mb-4 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-success" /> Safety Notes
          </h3>
          {itinerary.safetyNotes.length === 0 ? (
            <p className="text-sm text-muted">No specific safety notes were returned.</p>
          ) : (
            <ul className="space-y-3">
              {itinerary.safetyNotes.map((s, i) => {
                const lvl = SAFETY_LEVELS[s.level] || SAFETY_LEVELS.green;
                return (
                  <li key={i} className={`flex items-start gap-3 border rounded-xl px-3 py-2.5 ${lvl.cls}`}>
                    <span className="text-xs font-bold mt-0.5 w-24 shrink-0">{lvl.label}</span>
                    <span className="text-sm">{s.note}</span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-dark mb-4 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-orange" /> Travel Tips
          </h3>
          {itinerary.tips.length === 0 ? (
            <p className="text-sm text-muted">No tips were returned.</p>
          ) : (
            <ul className="space-y-2">
              {itinerary.tips.map((tip, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted">
                  <span className="text-orange font-bold mt-0.5">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {regenError && (
        <div className="bg-danger/5 border border-danger/30 text-danger rounded-2xl p-4 mb-6 text-sm" role="alert">
          {regenError}
        </div>
      )}

      <div className="flex flex-wrap gap-3 mb-6">
        <button
          onClick={onSaveTrip}
          className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold bg-navy text-white hover:bg-navy/90 transition-all"
        >
          <Bookmark className="w-4 h-4" /> Save Trip
        </button>
        <button
          onClick={onRegenerate}
          disabled={generating}
          className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold bg-blue text-white hover:bg-blue/90 disabled:opacity-60 transition-all"
        >
          <RefreshCw className={`w-4 h-4 ${generating ? 'animate-spin' : ''}`} />
          {generating ? 'Generating…' : 'Regenerate'}
        </button>
        <button
          onClick={onModify}
          className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold border-2 border-blue/40 text-blue hover:bg-blue/5 transition-all"
        >
          <Pencil className="w-4 h-4" /> Modify Preferences
        </button>
        <button
          onClick={onBookNow}
          className="flex-1 min-w-[200px] flex items-center justify-center gap-2 bg-orange text-white py-3.5 rounded-xl font-semibold hover:bg-orange/90 transition-all"
        >
          Book This Trip
          <ChevronRight className="w-4 h-4" />
        </button>
        <button
          onClick={onSaveOffline}
          className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold bg-gray-100 text-dark hover:bg-gray-200 transition-all"
        >
          <WifiOff className="w-4 h-4" /> Save for Offline
        </button>
        <button
          onClick={onShare}
          className="flex items-center justify-center gap-2 px-6 py-3.5 border-2 border-blue/40 text-blue rounded-xl font-semibold hover:bg-blue/5 transition-all"
        >
          <Share2 className="w-4 h-4" /> Share
        </button>
        <Link
          to="/destinations"
          className="flex items-center justify-center gap-2 px-6 py-3.5 border-2 border-gray-200 rounded-xl font-semibold text-dark hover:bg-gray-50"
        >
          Explore More <Sparkles className="w-4 h-4 text-orange" />
        </Link>
      </div>

      {!isAuthenticated && (
        <div className="bg-blue/5 border border-blue/20 text-blue rounded-2xl p-4 mb-6 text-sm flex flex-wrap items-center gap-3">
          <span>Sign in to save this trip to My Trips.</span>
          <Link to="/login" className="font-semibold underline">Sign In</Link>
        </div>
      )}

      {activeActivity && (
        <ActivityDetailModal
          activity={activeActivity}
          day={day?.day || activeDay}
          destination={selectedDestination}
          onClose={() => setActiveActivity(null)}
        />
      )}
    </div>
  );
}