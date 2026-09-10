import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { buildSmartContext } from '../utils/helpers';
import { getWeatherByDestination } from '../data/weather';
import { useNotification } from '../context/NotificationContext';
import { useOffline } from '../context/OfflineContext';
import { useContent } from '../context/ContentContext';
import { useAuth } from '../context/AuthContext';
import { createShareLink } from '../lib/backend';
import {
  generateItineraryPlan,
  PlannerError,
  buildSafarnowContext,
  buildSaveTrip,
  computeDurationFromDates,
  formatMoney,
  DURATION_OPTIONS,
  TRAVEL_STYLES,
  BUDGET_TIERS,
  INTERESTS,
  CURRENCIES,
} from '../lib/itinerary';
import PlannerStepper from '../components/planner/PlannerStepper';
import ItineraryResult from '../components/planner/ItineraryResult';
import {
  Sparkles,
  MapPin,
  Calendar,
  Users,
  CheckCircle,
  Circle,
  X,
} from 'lucide-react';

const INITIAL_PREFERENCES = {
  destination: '',
  destinationId: '',
  state: '',
  travellers: '2',
  duration: '4',
  travelStyle: 'balanced',
  interests: [],
  budgetTier: 'moderate',
  budgetAmount: '',
  currency: 'INR',
  startDate: '',
  endDate: '',
};

const GEN_PHASES = [
  { id: 'context', label: 'Gathering SafarNow destination data' },
  { id: 'sending', label: 'Sending your preferences to SafarNow AI' },
  { id: 'parsing', label: 'Structuring your personalized itinerary' },
  { id: 'done', label: 'Finalizing budget and recommendations' },
];

const TIER_SUGGESTIONS = { budget: '10000', moderate: '15000', premium: '30000', luxury: '50000' };
const CUSTOM_DURATIONS = [6, 8, 9, 10, 12, 14];

export default function AIPlanner() {
  const navigate = useNavigate();
  const { addNotification } = useNotification();
  const { isOnline, saveForOffline } = useOffline();
  const { destinations, getHotelsByDestination, getPackagesByDestination } = useContent();
  const { user, isAuthenticated } = useAuth();

  const [step, setStep] = useState(0);
  const [preferences, setPreferences] = useState(INITIAL_PREFERENCES);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [itinerary, setItinerary] = useState(null);
  const [contextDashboard, setContextDashboard] = useState(null);
  const [generating, setGenerating] = useState(false);
  const [genPhase, setGenPhase] = useState('context');
  const [error, setError] = useState(null);
  const [regenError, setRegenError] = useState(null);
  const [customDuration, setCustomDuration] = useState('');

  const steps = ['Destination', 'Travel Details', 'Preferences', 'Budget', 'Review'];
  const currencySymbol = formatMoney(0, preferences.currency).replace(/0/g, '');

  const updatePreferences = (patch) => setPreferences((prev) => ({ ...prev, ...patch }));

  const resolveDestination = () => {
    return (
      selectedDestination ||
      destinations.find((d) => d.id === preferences.destinationId) ||
      destinations.find((d) => d.name.toLowerCase() === (preferences.destination || '').toLowerCase())
    );
  };

  const toggleInterest = (interest) => {
    setPreferences((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const handleSelectDestination = (dest) => {
    setSelectedDestination(dest);
    updatePreferences({ destination: dest.name, destinationId: dest.id, state: dest.state });
  };

  const handleDates = (startDate, endDate) => {
    const computed = computeDurationFromDates(startDate, endDate);
    updatePreferences({
      startDate,
      endDate,
      duration: computed ? String(computed) : preferences.duration,
    });
  };

  const validate = (targetStep) => {
    if (targetStep >= 1 && !preferences.destination) {
      addNotification('Please select a destination', 'error');
      return false;
    }
    const travellers = Number(preferences.travellers);
    const duration = Number(preferences.duration);
    if (targetStep >= 2 && (!travellers || travellers < 1 || travellers > 6)) {
      addNotification('Please choose 1-6 travellers', 'error');
      return false;
    }
    if (targetStep >= 3 && (!duration || duration < 2 || duration > 15)) {
      addNotification('Please choose a trip duration between 2 and 15 days', 'error');
      return false;
    }
    if (targetStep >= 4) {
      const amount = Number(preferences.budgetAmount);
      if (preferences.budgetAmount && (!Number.isFinite(amount) || amount <= 0)) {
        addNotification('Please enter a valid budget amount', 'error');
        return false;
      }
    }
    return true;
  };

  const goTo = (next) => {
    if (next > step && !validate(next)) return;
    setError(null);
    setStep(next);
  };

  const handleGenerate = async ({ budgetTight = false } = {}) => {
    const dest = resolveDestination();
    if (!dest) {
      addNotification('Please select a destination', 'error');
      gotoDestination();
      return;
    }
    setError(null);
    setRegenError(null);
    setGenerating(true);
    setGenPhase('context');

    try {
      const weather = getWeatherByDestination(dest.id);
      const context = buildSafarnowContext({
        destination: dest,
        hotels: getHotelsByDestination(dest.id),
        packages: getPackagesByDestination(dest.id),
      });
      const plan = await generateItineraryPlan(preferences, context, {
        onPhase: setGenPhase,
        budgetTight,
      });
      setSelectedDestination(dest);
      setItinerary(plan);
      setContextDashboard(dest ? buildSmartContext(dest, weather, preferences, isOnline) : null);
      setAdjustingBudget(false);
      setStep(5);
      addNotification(budgetTight ? 'Budget-adjusted itinerary ready!' : 'Your personalized itinerary is ready!', 'success');
    } catch (err) {
      const message =
        err instanceof PlannerError && err.code === 'cancelled'
          ? 'Generation cancelled.'
          : (err?.message || "Sorry, we couldn't generate your itinerary right now. Please try again.");
      if (step === 4) {
        setError(message);
      } else {
        setRegenError(message);
      }
      addNotification(message, 'error');
    } finally {
      setGenerating(false);
      setGenPhase('context');
    }
  };

  const gotoDestination = () => {
    setStep(0);
  };

  const handleModify = () => {
    setError(null);
    setRegenError(null);
    setStep(1);
  };

  const handleStartOver = () => {
    setStep(0);
    setPreferences(INITIAL_PREFERENCES);
    setSelectedDestination(null);
    setItinerary(null);
    setContextDashboard(null);
    setError(null);
    setRegenError(null);
    setAdjustingBudget(false);
    setCustomDuration('');
  };

  const handleSaveTrip = () => {
    if (!itinerary) return;
    if (!user) {
      addNotification('Sign in to save this trip', 'error');
      return;
    }
    try {
      const doc = buildSaveTrip(itinerary, preferences, user);
      const key = 'safarnow_plans';
      const all = JSON.parse(localStorage.getItem(key) || '{}');
      all[user.id] = Array.isArray(all[user.id]) ? all[user.id] : [];
      all[user.id].push(doc);
      localStorage.setItem(key, JSON.stringify(all));
      addNotification('Trip saved to My Trips!', 'success');
    } catch {
      addNotification('Could not save the trip right now.', 'error');
    }
  };

  const handleSaveOffline = () => {
    if (!itinerary) return;
    const dest = resolveDestination();
    const weather = dest ? getWeatherByDestination(dest.id) : null;
    saveForOffline({
      itinerary,
      destinationId: dest?.id,
      safetyContacts: [],
      savedLocations: dest?.attractions?.slice(0, 4) || [],
      weatherSummary: weather?.current,
    });
    addNotification('Itinerary saved for offline! Check your My Trips.', 'success');
  };

  const handleBookNow = () => {
    const dest = resolveDestination();
    if (!dest) {
      addNotification('Please select a valid destination', 'error');
      return;
    }
    localStorage.setItem(
      'safarnow_booking',
      JSON.stringify({
        destinationId: dest.id,
        travelers: preferences.travellers,
        days: preferences.duration,
        packageName: `AI ${preferences.destination} Trip`,
        nights: Math.max(1, (parseInt(preferences.duration, 10) || 4) - 1),
      })
    );
    navigate('/booking');
  };

  const handleShare = async () => {
    if (!itinerary) return;
    const token = await createShareLink({
      ...itinerary,
      destinationId: selectedDestination?.id || preferences.destinationId || null,
      dateLabel: preferences.startDate || null,
    });
    if (!token) {
      addNotification('Sign in to share your itinerary', 'error');
      return;
    }
    const url = `${window.location.origin}/share/${token}`;
    navigator.clipboard?.writeText(url).catch(() => {});
    addNotification('Share link copied to clipboard!', 'success');
  };

  const effectiveDuration = preferences.duration || '4';
  const durationMode = DURATION_OPTIONS.includes(Number(effectiveDuration)) ? String(effectiveDuration) : 'custom';
  const hasDates = Boolean(preferences.startDate && preferences.endDate);

  return (
    <div className="min-h-screen bg-light">
      <div className="bg-gradient-to-br from-navy via-navy to-blue py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-3">
            <Sparkles className="w-8 h-8 text-orange" />
            <h1 className="text-3xl sm:text-4xl font-bold text-white">AI Trip Planner</h1>
          </div>
          <p className="text-white/70 text-lg">Let SafarNow AI craft your perfect itinerary in seconds</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {!generating && step < 5 && <PlannerStepper steps={steps} current={step} />}

        {generating && (
          <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center animate-scale-in">
            <div className="w-16 h-16 mx-auto mb-6 relative">
              <div className="absolute inset-0 border-4 border-blue/20 border-t-blue rounded-full animate-spin" />
              <Sparkles className="w-6 h-6 text-blue absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
            <h3 className="text-xl font-bold text-dark mb-6 animate-pulse-soft">
              Creating your personalized itinerary...
            </h3>
            <ul className="max-w-sm mx-auto space-y-3 text-left">
              {GEN_PHASES.map((p) => {
                const reached = GEN_PHASES.findIndex((x) => x.id === genPhase) >= GEN_PHASES.findIndex((x) => x.id === p.id);
                return (
                  <li key={p.id} className={`flex items-center gap-3 text-sm ${reached ? 'text-dark' : 'text-muted'}`}>
                    {reached ? (
                      <CheckCircle className="w-4 h-4 text-success shrink-0" />
                    ) : (
                      <Circle className="w-4 h-4 text-gray-200 shrink-0" />
                    )}
                    {p.label}
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {!generating && step === 0 && (
          <div className="animate-slide-up">
            <h2 className="text-2xl font-bold text-dark mb-2">Where do you want to go?</h2>
            <p className="text-muted mb-6">Pick your dream destination</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
              {destinations.slice(0, 9).map((dest) => (
                <button
                  key={dest.id}
                  onClick={() => handleSelectDestination(dest)}
                  aria-pressed={preferences.destination === dest.name}
                  className={`relative rounded-2xl overflow-hidden text-left group transition-all ${
                    preferences.destination === dest.name ? 'ring-3 ring-blue shadow-lg' : 'hover:shadow-md'
                  }`}
                >
                  <img src={dest.image} alt={dest.name} loading="lazy" className="w-full h-36 object-cover group-focus-visible:opacity-90" />
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
              onClick={() => goTo(1)}
              className="bg-blue text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue/90 transition-all"
            >
              Continue
            </button>
          </div>
        )}

        {!generating && step === 1 && (
          <div className="animate-slide-up space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-dark mb-2">Travel Details</h2>
              <p className="text-muted mb-4">Who's coming and for how long?</p>

              <div className="mb-6">
                <h3 className="text-lg font-bold text-dark mb-3">Travellers</h3>
                <div className="flex flex-wrap gap-2">
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <button
                      key={n}
                      onClick={() => updatePreferences({ travellers: String(n) })}
                      aria-pressed={preferences.travellers === String(n)}
                      className={`w-14 h-14 rounded-xl border-2 text-lg font-bold transition-all ${
                        preferences.travellers === String(n)
                          ? 'border-blue bg-blue/5 text-blue'
                          : 'border-gray-200 hover:border-blue/50 text-dark'
                      }`}
                    >
                      <Users className="w-4 h-4 mx-auto mb-0.5" />
                      {n}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-bold text-dark mb-3">Trip Duration</h3>
                <div className="flex flex-wrap gap-2 mb-3">
                  {[...DURATION_OPTIONS, 'custom'].map((option) => {
                    const isCustom = option === 'custom';
                    const active = !isCustom ? durationMode === String(option) : durationMode === 'custom';
                    return (
                      <button
                        key={option}
                        onClick={() => {
                          updatePreferences({ duration: isCustom ? String(CUSTOM_DURATIONS[0]) : String(option) });
                          setCustomDuration(isCustom ? '6' : '');
                        }}
                        aria-pressed={active}
                        className={`px-4 py-2 rounded-xl text-sm font-semibold border-2 transition-all ${
                          active ? 'border-blue bg-blue/5 text-blue' : 'border-gray-200 hover:border-blue/50 text-dark'
                        }`}
                      >
                        {isCustom ? 'Custom' : `${option} Days`}
                      </button>
                    );
                  })}
                </div>
                {durationMode === 'custom' && (
                  <select
                    value={customDuration || preferences.duration}
                    onChange={(e) => updatePreferences({ duration: e.target.value })}
                    aria-label="Custom trip duration"
                    className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue/30"
                  >
                    {CUSTOM_DURATIONS.map((d) => (
                      <option key={d} value={d}>{d} Days</option>
                    ))}
                  </select>
                )}
                {hasDates && (
                  <p className="text-xs text-blue mt-2 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> Duration calculated from your dates ({effectiveDuration} days)
                  </p>
                )}
              </div>

              <div>
                <h3 className="text-lg font-bold text-dark mb-3">Travel Dates <span className="text-xs font-normal text-muted">(optional)</span></h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md">
                  <label className="text-sm font-medium text-dark block">
                    Departure
                    <input
                      type="date"
                      value={preferences.startDate}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => handleDates(e.target.value, preferences.endDate)}
                      className="mt-1 w-full px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue/30"
                    />
                  </label>
                  <label className="text-sm font-medium text-dark block">
                    Return
                    <input
                      type="date"
                      value={preferences.endDate}
                      min={preferences.startDate || new Date().toISOString().split('T')[0]}
                      onChange={(e) => handleDates(preferences.startDate, e.target.value)}
                      className="mt-1 w-full px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue/30"
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep(0)} className="px-6 py-3 border-2 border-gray-200 rounded-xl font-semibold text-dark hover:bg-gray-50">Back</button>
              <button onClick={() => goTo(2)} className="px-8 py-3 bg-blue text-white rounded-xl font-semibold hover:bg-blue/90">Continue</button>
            </div>
          </div>
        )}

        {!generating && step === 2 && (
          <div className="animate-slide-up space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-dark mb-2">Your Style</h2>
              <p className="text-muted mb-4">How do you like to travel?</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {TRAVEL_STYLES.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => updatePreferences({ travelStyle: s.id })}
                    aria-pressed={preferences.travelStyle === s.id}
                    className={`p-4 rounded-xl border-2 text-center transition-all ${
                      preferences.travelStyle === s.id
                        ? 'border-blue bg-blue/5 text-blue'
                        : 'border-gray-200 hover:border-blue/50 text-dark'
                    }`}
                  >
                    <p className="font-bold text-sm">{s.label}</p>
                    <p className="text-xs text-muted mt-1">{s.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-dark mb-3">Interests <span className="text-xs font-normal text-muted">(pick any)</span></h3>
              <div className="flex flex-wrap gap-2">
                {INTERESTS.map((interest) => (
                  <button
                    key={interest}
                    onClick={() => toggleInterest(interest)}
                    aria-pressed={preferences.interests.includes(interest)}
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
              <button onClick={() => setStep(1)} className="px-6 py-3 border-2 border-gray-200 rounded-xl font-semibold text-dark hover:bg-gray-50">Back</button>
              <button onClick={() => goTo(3)} className="px-8 py-3 bg-blue text-white rounded-xl font-semibold hover:bg-blue/90">Continue</button>
            </div>
          </div>
        )}

        {!generating && step === 3 && (
          <div className="animate-slide-up space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-dark mb-2">Your Budget</h2>
              <p className="text-muted mb-6">This helps us pick the right options</p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                {BUDGET_TIERS.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => updatePreferences({ budgetTier: b.id })}
                    aria-pressed={preferences.budgetTier === b.id}
                    className={`p-6 rounded-2xl border-2 text-left transition-all ${
                      preferences.budgetTier === b.id
                        ? 'border-blue bg-blue/5 shadow-md'
                        : 'border-gray-200 hover:border-blue/50'
                    }`}
                  >
                    <p className="font-bold text-dark">{b.label}</p>
                    <p className="text-sm text-muted">{b.desc}</p>
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md">
                <label className="text-sm font-medium text-dark block">
                  Maximum budget (optional)
                  <div className="mt-1 relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-dark font-semibold">{currencySymbol}</span>
                    <input
                      type="number"
                      min="0"
                      placeholder={TIER_SUGGESTIONS[preferences.budgetTier]}
                      value={preferences.budgetAmount}
                      onChange={(e) => updatePreferences({ budgetAmount: e.target.value })}
                      className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue/30"
                    />
                  </div>
                  <span className="text-xs text-muted mt-1 block">
                    Leave empty to follow the {preferences.budgetTier} tier.
                  </span>
                </label>
                <label className="text-sm font-medium text-dark block">
                  Currency
                  <select
                    value={preferences.currency}
                    onChange={(e) => updatePreferences({ currency: e.target.value })}
                    className="mt-1 w-full px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue/30"
                  >
                    {CURRENCIES.map((c) => (
                      <option key={c} value={c}>{c} ({formatMoney(0, c).replace(/0/g, '')})</option>
                    ))}
                  </select>
                </label>
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep(2)} className="px-6 py-3 border-2 border-gray-200 rounded-xl font-semibold text-dark hover:bg-gray-50">Back</button>
              <button onClick={() => goTo(4)} className="px-8 py-3 bg-blue text-white rounded-xl font-semibold hover:bg-blue/90">Continue</button>
            </div>
          </div>
        )}

        {!generating && step === 4 && (
          <div className="animate-slide-up">
            <h2 className="text-2xl font-bold text-dark mb-2">Review Your Trip</h2>
            <p className="text-muted mb-6">Check your preferences before generating</p>
            <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-8 space-y-4">
              {[
                ['Destination', preferences.destination ? `${preferences.destination}${preferences.state ? ` (${preferences.state})` : ''}` : 'Not selected'],
                ['Travellers', `${preferences.travellers} Travellers`],
                ['Duration', `${effectiveDuration} Days${hasDates ? ` · ${preferences.startDate} → ${preferences.endDate}` : ''}`],
                ['Travel style', TRAVEL_STYLES.find((s) => s.id === preferences.travelStyle)?.label || preferences.travelStyle],
                ['Budget', preferences.budgetAmount ? `${formatMoney(preferences.budgetAmount, preferences.currency)} (${preferences.budgetTier})` : `${preferences.budgetTier} tier`],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-muted text-sm">{label}</span>
                  <span className="font-semibold text-dark capitalize">{value}</span>
                </div>
              ))}
              <div className="py-2">
                <span className="text-muted text-sm block mb-2">Interests</span>
                <div className="flex flex-wrap gap-2">
                  {preferences.interests.length > 0 ? (
                    preferences.interests.map((i) => (
                      <span key={i} className="bg-blue/10 text-blue px-3 py-1 rounded-full text-xs font-semibold">{i}</span>
                    ))
                  ) : (
                    <span className="text-sm text-muted">Balanced mix suggested by AI</span>
                  )}
                </div>
              </div>
            </div>

            {error && (
              <div className="bg-danger/5 border border-danger/30 text-danger rounded-2xl p-4 mb-6 text-sm flex flex-wrap items-center gap-3" role="alert">
                <span className="flex-1">{error}</span>
                <button onClick={() => handleGenerate()} className="px-4 py-2 bg-danger text-white rounded-xl text-sm font-semibold">
                  Try Again
                </button>
              </div>
            )}

            <div className="flex gap-3">
              <button onClick={() => setStep(3)} className="px-6 py-3 border-2 border-gray-200 rounded-xl font-semibold text-dark hover:bg-gray-50">Back</button>
              <button
                onClick={() => handleGenerate()}
                className="flex items-center gap-2 px-8 py-3 bg-orange text-white rounded-xl font-semibold hover:bg-orange/90 transition-all"
              >
                <Sparkles className="w-5 h-5" />
                Generate Itinerary
              </button>
            </div>
          </div>
        )}

        {step === 5 && itinerary && !generating && (
          <ItineraryResult
            itinerary={itinerary}
            preferences={preferences}
            selectedDestination={selectedDestination}
            contextDashboard={contextDashboard}
            isOnline={isOnline}
            isAuthenticated={isAuthenticated}
            generating={false}
            regenError={regenError}
            onSaveTrip={handleSaveTrip}
            onRegenerate={() => handleGenerate()}
            onAdjust={() => handleGenerate({ budgetTight: true })}
            onModify={handleModify}
            onStartOver={handleStartOver}
            onBookNow={handleBookNow}
            onSaveOffline={handleSaveOffline}
            onShare={handleShare}
          />
        )}

        {step === 5 && itinerary && generating && (
          <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center animate-scale-in">
            <div className="w-16 h-16 mx-auto mb-6 relative">
              <div className="absolute inset-0 border-4 border-blue/20 border-t-blue rounded-full animate-spin" />
              <Sparkles className="w-6 h-6 text-blue absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
            <h3 className="text-xl font-bold text-dark mb-6 animate-pulse-soft">
              Regenerating your itinerary...
            </h3>
            <ul className="max-w-sm mx-auto space-y-3 text-left">
              {GEN_PHASES.map((p) => {
                const reached = GEN_PHASES.findIndex((x) => x.id === genPhase) >= GEN_PHASES.findIndex((x) => x.id === p.id);
                return (
                  <li key={p.id} className={`flex items-center gap-3 text-sm ${reached ? 'text-dark' : 'text-muted'}`}>
                    {reached ? <CheckCircle className="w-4 h-4 text-success shrink-0" /> : <Circle className="w-4 h-4 text-gray-200 shrink-0" />}
                    {p.label}
                  </li>
                );
              })}
            </ul>
            <button
              onClick={() => setStep(5)}
              className="mt-6 inline-flex items-center gap-1.5 text-sm text-blue font-semibold hover:underline"
            >
              <X className="w-4 h-4" /> Keep current itinerary
            </button>
          </div>
        )}
      </div>
    </div>
  );
}