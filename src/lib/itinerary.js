// Server-driven AI Trip Planner service layer.
// All Gemini calls go through the secure /api/ai/chat endpoint; the API key is
// never present in client code.

export const DURATION_OPTIONS = [2, 3, 4, 5, 7];

export const TRAVEL_STYLES = [
  { id: 'relaxed', label: 'Relaxed', desc: '2 activities/day, plenty of downtime' },
  { id: 'balanced', label: 'Balanced', desc: '3 activities/day, mix of sightseeing' },
  { id: 'adventure', label: 'Adventure', desc: 'Thrilling activities, eventful days' },
  { id: 'luxury', label: 'Luxury', desc: 'Premium stays, fine dining' },
  { id: 'budget', label: 'Budget', desc: 'Wallet-friendly, best value picks' },
];

export const BUDGET_TIERS = [
  { id: 'budget', label: 'Budget', desc: 'Under \u20B910K' },
  { id: 'moderate', label: 'Moderate', desc: '\u20B910K - \u20B925K' },
  { id: 'premium', label: 'Premium', desc: '\u20B925K - \u20B950K' },
  { id: 'luxury', label: 'Luxury', desc: '\u20B950K+' },
];

export const INTERESTS = [
  'Beaches', 'Mountains', 'Nature', 'History', 'Culture', 'Food',
  'Shopping', 'Adventure', 'Nightlife', 'Photography',
];

export const CURRENCIES = ['INR', 'USD', 'EUR'];

const CURRENCY_SYMBOLS = { INR: '\u20B9', USD: '$', EUR: '\u20AC' };

export function currencySymbol(code) {
  return CURRENCY_SYMBOLS[code] || CURRENCY_SYMBOLS.INR;
}

export function formatMoney(value, code) {
  const n = Number(value) || 0;
  return `${currencySymbol(code)}${n.toLocaleString('en-IN')}`;
}

// ---------------------------------------------------------------------------
// Compose the structured request that gets sent to Gemini (via /api/ai/chat)
// ---------------------------------------------------------------------------
export function buildItineraryRequest(preferences, destination, context = {}, options = {}) {
  return {
    destination: destination?.name || preferences.destination || '',
    destinationId: destination?.id || preferences.destinationId || null,
    state: destination?.state || preferences.state || '',
    travellers: Number(preferences.travellers) || 2,
    duration: Number(preferences.duration) || 4,
    travelStyle: preferences.travelStyle || 'balanced',
    interests: Array.isArray(preferences.interests) ? preferences.interests : [],
    budget: Number(preferences.budgetAmount) || null,
    budgetTier: preferences.budgetTier || 'moderate',
    currency: preferences.currency || 'INR',
    startDate: preferences.startDate || '',
    endDate: preferences.endDate || '',
    budgetTight: Boolean(options.budgetTight),
    context,
  };
}

// Only the records relevant to the current destination are sent to the AI.
export function buildSafarnowContext({ destination, hotels = [], packages = [] }) {
  return {
    destination: destination ? compactDestination(destination) : {},
    hotels: hotels.slice(0, 8).map(compactHotel),
    packages: packages.slice(0, 6).map(compactPackage),
  };
}

function compactDestination(d) {
  return {
    id: d.id,
    name: d.name,
    state: d.state,
    country: d.country,
    description: d.description ? d.description.slice(0, 300) : '',
    categories: Array.isArray(d.categories) ? d.categories : [],
    bestSeason: d.bestSeason,
    avgBudget: d.avgBudget,
    recommendedDuration: d.recommendedDuration,
    rating: d.rating,
    safetyScore: d.safetyScore,
    crowdLevel: d.crowdLevel,
    attractions: Array.isArray(d.attractions) ? d.attractions.slice(0, 12) : [],
    thingsToDo: Array.isArray(d.thingsToDo) ? d.thingsToDo.slice(0, 8) : [],
    nearbyServices: Array.isArray(d.nearbyServices) ? d.nearbyServices.slice(0, 6) : [],
  };
}

function compactHotel(h) {
  return {
    id: h.id,
    name: h.name,
    destination: h.destination,
    location: h.location,
    stars: h.stars,
    rating: h.rating,
    pricePerNight: h.pricePerNight,
    safetyScore: h.safetyScore,
    amenities: Array.isArray(h.amenities) ? h.amenities.slice(0, 8) : [],
  };
}

function compactPackage(p) {
  return {
    id: p.id,
    name: p.name,
    destination: p.destination,
    duration: p.duration,
    days: p.days,
    price: p.price,
    rating: p.rating,
    highlights: Array.isArray(p.highlights) ? p.highlights.slice(0, 6) : [],
  };
}

// ---------------------------------------------------------------------------
// Call the (shared, secure) Gemini endpoint and normalize the response
// ---------------------------------------------------------------------------
export class PlannerError extends Error {
  constructor(message, code, retryable = true) {
    super(message);
    this.name = 'PlannerError';
    this.code = code;
    this.retryable = retryable;
  }
}

export async function generateItineraryPlan(preferences, context, { onPhase, budgetTight, signal } = {}) {
  const request = buildItineraryRequest(preferences, context.destination, context, { budgetTight });

  onPhase?.('sending');
  let res;
  try {
    res = await fetch('/api/ai/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mode: 'itinerary', itineraryRequest: request, dataContext: context }),
      signal,
    });
  } catch (err) {
    if (err?.name === 'AbortError') throw new PlannerError('Generation cancelled.', 'cancelled', false);
    throw new PlannerError('Connection problem. Please check your internet connection and try again.', 'network');
  }

  onPhase?.('parsing');
  let data;
  try {
    data = await res.json();
  } catch {
    throw new PlannerError('We received an unreadable response. Please regenerate.', 'parse');
  }

  if (!res.ok) {
    if (res.status === 400) {
      throw new PlannerError(data?.error || 'Please complete all required fields.', 'invalid', false);
    }
    throw new PlannerError(
      data?.error || "Sorry, we couldn't generate your itinerary right now. Please try again.",
      'server'
    );
  }

  const raw = data?.itinerary;
  if (!raw || !Array.isArray(raw.days) || raw.days.length === 0) {
    throw new PlannerError('We received an incomplete itinerary. Please regenerate.', 'parse');
  }

  onPhase?.('done');
  return normalizeItinerary(raw, preferences, context.destination);
}

// ---------------------------------------------------------------------------
// Normalize the Gemini JSON into the shape the planner UI renders
// ---------------------------------------------------------------------------
export function normalizeItinerary(raw, preferences, destination) {
  const defaultRain = destination ? null : 20;
  const days = raw.days.map((d, idx) => {
    const day = Number(d.day) || idx + 1;
    const activities = (Array.isArray(d.activities) ? d.activities : []).map((a, i) => ({
      id: a.id || `d${day}a${i + 1}`,
      time: a.time || '10:00 AM',
      activity: a.title || a.activity || `Activity ${i + 1}`,
      category: a.category || 'Explore',
      description: a.description || '',
      cost: Number(a.estimated_cost || a.cost) || 0,
      duration: a.duration || '1-2 hours',
      crowdLevel: Number(a.crowdLevel) || 50,
      crowdStatus: a.crowdStatus || 'Moderate',
      weatherSuitable: a.weatherSuitable !== false,
      rainProbability: Number(a.rainProbability) || (defaultRain ?? 20),
      safetyScore: Number(a.safetyScore) || destination?.safetyScore || 85,
      recommended: a.recommended !== false,
    }));
    return {
      day,
      title: d.title || `Day ${day}`,
      weather: d.weather || (destination ? 'Pleasant' : 'Pleasant'),
      rainProbability: Number(d.rain_probability) || (defaultRain ?? 20),
      activities,
    };
  });

  const breakdown = raw.budget_breakdown || {};
  const computedActivitiesCost = days.reduce((sum, d) => sum + d.activities.reduce((s, a) => s + a.cost, 0), 0);
  const breakdownTotal = ['stay', 'food', 'transport', 'activities', 'other'].reduce((sum, k) => sum + (Number(breakdown[k]) || 0), 0);
  const estimatedTotal =
    Number(raw.trip_summary?.estimated_total) ||
    breakdownTotal ||
    computedActivitiesCost;

  return {
    id: `trip_${Date.now()}`,
    destination: raw.trip_summary?.destination || preferences.destination || '',
    state: raw.trip_summary?.state || preferences.state || '',
    daysCount: days.length,
    totalCost: estimatedTotal,
    days,
    budgetBreakdown: {
      stay: Number(breakdown.stay) || 0,
      food: Number(breakdown.food) || 0,
      transport: Number(breakdown.transport) || 0,
      activities: Number(breakdown.activities) || 0,
      other: Number(breakdown.other) || 0,
    },
    hotelRecommendations: (Array.isArray(raw.hotel_recommendations) ? raw.hotel_recommendations : [])
      .filter(Boolean)
      .map((h) => ({
        name: h.name || '',
        location: h.location || '',
        stars: Number(h.stars) || 0,
        pricePerNight: Number(h.price_per_night) || 0,
        reason: h.reason || '',
      })),
    safetyNotes: (Array.isArray(raw.safety_notes) ? raw.safety_notes : [])
      .filter(Boolean)
      .map((s) => ({ level: s.level || 'green', note: s.note || '' })),
    tips: Array.isArray(raw.tips) ? raw.tips.filter((t) => typeof t === 'string' && t.trim()) : [],
    tripSummary: raw.trip_summary || {},
    currency: preferences.currency || 'INR',
    generatedAt: new Date().toISOString(),
  };
}

// ---------------------------------------------------------------------------
// Budget helpers + save-trip document (Phase 2 will persist this to Supabase)
// ---------------------------------------------------------------------------
export function budgetDelta(itinerary, preferences) {
  const budget = Number(preferences.budgetAmount);
  if (!budget || budget <= 0) return null;
  return itinerary.totalCost - budget;
}

export function buildSaveTrip(itinerary, preferences, user) {
  return {
    user_id: user?.id || null,
    destination_id: preferences.destinationId || null,
    title: `${itinerary.daysCount} Day ${itinerary.destination} ${itinerary.tripSummary?.state || ''}`.trim(),
    duration: itinerary.daysCount,
    travellers: Number(preferences.travellers) || 2,
    budget: Number(preferences.budgetAmount) || null,
    currency: itinerary.currency || preferences.currency || 'INR',
    estimated_cost: itinerary.totalCost,
    preferences: {
      destination: preferences.destination,
      destinationId: preferences.destinationId,
      travellers: Number(preferences.travellers) || 2,
      duration: Number(preferences.duration) || 4,
      travelStyle: preferences.travelStyle || 'balanced',
      interests: Array.isArray(preferences.interests) ? preferences.interests : [],
      startDate: preferences.startDate || '',
      endDate: preferences.endDate || '',
      currency: preferences.currency || 'INR',
    },
    itinerary,
    savedAt: new Date().toISOString(),
  };
}

export function computeDurationFromDates(startDate, endDate) {
  if (!startDate || !endDate) return null;
  const ms = new Date(endDate) - new Date(startDate);
  if (Number.isNaN(ms) || ms < 0) return null;
  return Math.max(1, Math.round(ms / 86400000) + 1);
}