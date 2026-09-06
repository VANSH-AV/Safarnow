import { getBookings, getSavedTrips } from './backend';

export async function askAI({ messages, dataContext }) {
  const res = await fetch('/api/ai/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages, dataContext }),
  });

  let data = {};
  try {
    data = await res.json();
  } catch {
    /* leave empty */
  }

  if (!res.ok) {
    throw new Error(data?.error || 'The AI assistant is unavailable right now. Please try again.');
  }
  if (typeof data?.reply !== 'string' || !data.reply.trim()) {
    throw new Error('The AI assistant returned an empty response. Please try again.');
  }
  return data.reply;
}

export async function buildAIContext({ destinations, packages, hotels }) {
  const [bookings, savedTrips] = await Promise.all([getBookings(), getSavedTrips()]);
  return {
    destinations: compactDestinations(destinations),
    packages: compactPackages(packages),
    hotels: compactHotels(hotels),
    bookings: compactBookings(bookings),
    savedTrips: compactSavedTrips(savedTrips),
  };
}

function compactDestinations(destinations = []) {
  return destinations.map((d) => ({
    id: d.id,
    name: d.name,
    state: d.state,
    country: d.country,
    categories: Array.isArray(d.categories) ? d.categories : [],
    bestSeason: d.bestSeason,
    avgBudget: d.avgBudget,
    rating: d.rating,
    safetyScore: d.safetyScore,
    crowdLevel: d.crowdLevel,
    recommendedDuration: d.recommendedDuration,
    description: d.description ? d.description.slice(0, 220) : '',
  }));
}

function compactPackages(packages = []) {
  return packages.map((p) => ({
    id: p.id,
    name: p.name,
    destination: p.destination,
    duration: p.duration,
    days: p.days,
    price: p.price,
    originalPrice: p.originalPrice,
    rating: p.rating,
    budget: p.budget,
    safetyScore: p.safetyScore,
    crowdLevel: p.crowdLevel,
    highlights: Array.isArray(p.highlights) ? p.highlights.slice(0, 6) : [],
    travelType: Array.isArray(p.travelType) ? p.travelType : [],
  }));
}

function compactHotels(hotels = []) {
  return hotels.map((h) => ({
    id: h.id,
    name: h.name,
    destination: h.destination,
    location: h.location,
    stars: h.stars,
    rating: h.rating,
    pricePerNight: h.pricePerNight,
    safetyScore: h.safetyScore,
    amenities: Array.isArray(h.amenities) ? h.amenities.slice(0, 8) : [],
  }));
}

function compactBookings(bookings = []) {
  return bookings.map((b) => ({
    id: b.id,
    packageName: b.packageName,
    hotelName: b.hotelName,
    destinationName: b.destinationName,
    travelers: b.travelers,
    travelDate: b.travelDate,
    totalCost: b.totalCost,
    status: b.status,
  }));
}

function compactSavedTrips(savedTrips = []) {
  return savedTrips.map((t) => ({
    destinationId: t.destinationId,
    destinationName: t.destinationName || t.destination,
    planName: t.name || t.planName,
    dateLabel: t.dateLabel || t.startDate,
    daysCount: t.daysCount,
    totalCost: t.totalCost,
  }));
}