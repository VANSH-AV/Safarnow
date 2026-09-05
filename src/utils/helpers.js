export function generateItinerary(preferences, destination = null, weather = null) {
  const { destination: destName, budget, duration, travelPace, interests } = preferences;
  const daysCount = parseInt(duration) || 4;
  const pace = travelPace === 'packed' ? 4 : travelPace === 'balanced' ? 3 : 2;

  const activitiesPool = {
    'Adventure': ['Bungee Jumping', 'Paragliding', 'Zip-lining', 'Trekking', 'River Rafting', 'Rock Climbing'],
    'Nature': ['Nature Walk', 'Sunrise Viewpoint', 'Botanical Garden', 'Waterfall Trek', 'Bird Watching', 'Photography Tour'],
    'Beaches': ['Beach Hopping', 'Snorkeling', 'Jet Ski', 'Beach Volleyball', 'Sunset Beach Walk', 'Beach Cafe'],
    'Culture': ['Museum Visit', 'Art Gallery', 'Heritage Walk', 'Cultural Show', 'Local Market Tour', 'Traditional Workshop'],
    'History': ['Fort Tour', 'Historical Monuments', 'Archaeological Site', 'Heritage Walk', 'Museum Tour', 'Historical District'],
    'Food': ['Street Food Tour', 'Cooking Class', 'Food Market Visit', 'Local Cuisine Experience', 'Spice Market', 'Cafe Hopping'],
    'Shopping': ['Local Bazaar', 'Shopping Mall', 'Handicraft Market', 'Souvenir Shopping', 'Flea Market', 'Brand Outlets'],
    'Photography': ['Golden Hour Shoot', 'Street Photography', 'Landscape Viewpoint', 'Cultural Photography', 'Sunset Point', 'Night Photography'],
    'Family': ['Theme Park', 'Zoo Visit', 'Boat Ride', 'Children Museum', 'Picnic Spot', 'Interactive Experience']
  };

  const timeSlots = ['8:00 AM', '9:00 AM', '10:00 AM', '11:30 AM', '1:00 PM', '2:30 PM', '4:00 PM', '5:30 PM', '7:00 PM'];

  const budgetMultipliers = { budget: 0.6, moderate: 1.0, premium: 1.5, luxury: 2.5 };
  const mult = budgetMultipliers[budget] || 1.0;

  const realAttractions = destination?.attractions?.map((a) => ({ name: a.name, type: a.type })) || [];
  const selectedInterests = interests.length > 0 ? interests : ['Culture', 'Nature'];

  const weatherByDay = weather?.forecast || [];

  const days = [];
  for (let i = 1; i <= daysCount; i++) {
    const dayActivities = [];
    const dayWeather = weatherByDay[Math.min(i - 1, weatherByDay.length - 1)] || {};
    const rainProb = dayWeather.rain ?? 20;
    const crowdDay = destination?.crowdData?.[dayKey(i)] || { morning: 45, afternoon: 65, evening: 55 };

    for (let j = 0; j < pace; j++) {
      const interestPool = selectedInterests[j % selectedInterests.length];
      const pool = activitiesPool[interestPool] || activitiesPool['Culture'];

      let activityName;
      let category = interestPool;
      if (realAttractions.length > 0) {
        const real = realAttractions[(i - 1) * pace + j] || realAttractions[(i * 7 + j) % realAttractions.length];
        activityName = real.name;
        category = real.type || interestPool;
      } else {
        activityName = pool[Math.floor(Math.random() * pool.length)];
      }

      const crowdByTime = [crowdDay.morning, crowdDay.afternoon, crowdDay.evening];
      const crowdLevel = crowdByTime[j % crowdByTime.length];
      const safetyScore = destination?.safetyScore != null
        ? Math.max(40, Math.min(98, destination.safetyScore + (Math.random() * 10 - 5)))
        : [82, 85, 88, 90, 92, 95][Math.floor(Math.random() * 6)];

      dayActivities.push({
        id: `d${i}a${j}`,
        time: timeSlots[j * 2] || timeSlots[j],
        activity: activityName,
        category,
        cost: Math.round((500 + Math.random() * 2000) * mult),
        duration: `${1 + Math.floor(Math.random() * 3)} hours`,
        crowdLevel,
        crowdStatus: getCrowdStatus(crowdLevel).label,
        weatherSuitable: rainProb < 60,
        rainProbability: rainProb,
        safetyScore: Math.round(safetyScore),
        recommended: Math.random() > 0.3
      });
    }

    days.push({
      day: i,
      title: `Day ${i} - ${getDayTitle(i, interests[0] || 'Culture')}`,
      weather: dayWeather.condition || 'Pleasant',
      rainProbability: rainProb,
      activities: dayActivities
    });
  }

  return {
    id: `trip_${Date.now()}`,
    destination: destName,
    daysCount,
    totalCost: days.reduce((acc, d) => acc + d.activities.reduce((a2, act) => a2 + act.cost, 0), 0),
    days,
    generatedAt: new Date().toISOString()
  };
}

function dayKey(index) {
  const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  return days[new Date().getDay() + index - 1];
}

export function getDestinationCrowdNow(destination) {
  if (!destination?.crowdData) return { level: 45, status: getCrowdStatus(45) };
  const day = new Date().toLocaleDateString('en-US', { weekday: 'short' }).toLowerCase();
  const d = destination.crowdData[day] || destination.crowdData.mon;
  const level = Math.round((d.morning + d.afternoon + d.evening) / 3);
  return { level, status: getCrowdStatus(level) };
}

export function buildSmartContext(destination, weather, preferences, isOnline) {
  const weatherAlert = weather?.alerts?.[0] || null;
  const forecast = weather?.forecast || [];
  const crowd = getDestinationCrowdNow(destination);
  const safetyScore = destination?.safetyScore || 85;

  const tips = [];
  if (weatherAlert?.severity === 'high') {
    tips.push({ type: 'warning', text: weatherAlert.message });
  } else if (weather?.forecast?.[0]?.rain > 40) {
    tips.push({ type: 'warning', text: 'Light rain likely today — keep an umbrella and plan indoor backups.' });
  } else {
    tips.push({ type: 'success', text: `Pleasant weather expected in ${preferences.destination}.` });
  }
  if (crowd.status.label !== 'Low') {
    tips.push({ type: 'info', text: `Crowds are ${crowd.status.label.toLowerCase()} now — mornings (8–11 AM) are the quietest window.` });
  } else {
    tips.push({ type: 'success', text: 'Crowd levels are low — a great time to explore freely.' });
  }
  tips.push({ type: 'info', text: `Safety score ${safetyScore}/100 for ${preferences.destination}. Local help is reachable nearby.` });

  const temperatureData = (forecast.length ? forecast : [
    { day: 'Today', high: 28, low: 22 }, { day: 'Tmrw', high: 27, low: 21 }, { day: 'Day 3', high: 26, low: 20 },
  ]).map((f, i) => ({
    time: i === 0 ? 'Today' : `D${i + 1}`,
    high: f.high,
    low: f.low,
  }));

  const crowdHourData = ['8AM', '10AM', '12PM', '2PM', '4PM', '6PM'].map((t, i) => {
    const base = [25, 40, 62, 74, 55, 38][i];
    return { time: t, level: Math.min(100, base + (destination?.crowdLevel === 'High' ? 12 : destination?.crowdLevel === 'Moderate' ? 4 : -8)) };
  });

  return {
    weather: {
      temperature: weather?.current?.temp ?? 28,
      condition: weather?.current?.condition ?? 'Pleasant',
      humidity: weather?.current?.humidity ?? 60,
      wind: weather?.current?.wind ?? 10,
    },
    weatherAlert,
    crowd: { current: crowd.status.label, currentScore: crowd.level },
    safety: { score: safetyScore },
    connectivity: {
      isOnline,
      signal: isOnline ? 'Strong 4G' : 'Cached offline',
      coverage: isOnline ? '98% network coverage' : 'Available in offline mode',
    },
    recommendation: {
      text: weatherAlert?.message
        ? `${weatherAlert.message} ${crowd.status.label === 'Low' ? 'Crowds are currently low, so it is a great time to explore the top spots.' : `Crowds run ${crowd.status.label.toLowerCase()} right now — visit popular attractions early.`}`
        : `${preferences.destination} looks great for your trip. Visit the top attractions in the morning before 11 AM when crowds are lighter and conditions are most comfortable.`,
      tips,
    },
    temperatureData,
    crowdHourData,
    forecast,
  };
}

function getDayTitle(day, interest) {
  const titles = {
    1: 'Arrival & Exploration',
    2: 'Adventure & Discovery',
    3: 'Culture & Heritage',
    4: 'Nature & Relaxation',
    5: 'Local Immersion',
    6: 'Hidden Gems',
    7: 'Farewell & Shopping'
  };
  return titles[day] || `${interest} Day`;
}

export function applyWeatherRecommendation(itinerary, weatherAlert, dayIndex) {
  if (!itinerary || !weatherAlert) return itinerary;

  const updated = { ...itinerary };
  updated.days = itinerary.days.map((day, idx) => {
    if (idx === dayIndex) {
      return {
        ...day,
        activities: day.activities.map(act => ({
          ...act,
          weatherSuitable: weatherAlert.severity !== 'high',
          recommendation: weatherAlert.severity === 'high' ? 'Consider indoor alternative' : act.recommendation
        }))
      };
    }
    return day;
  });
  return updated;
}

export function calculateSafetyScore(destination) {
  const base = destination.safetyScore || 85;
  return {
    overall: base,
    infrastructure: Math.min(100, base + Math.floor(Math.random() * 10 - 5)),
    emergencyAccess: Math.min(100, base + Math.floor(Math.random() * 10 - 3)),
    touristDensity: Math.min(100, base + Math.floor(Math.random() * 15 - 7)),
    weatherRisk: Math.min(100, base + Math.floor(Math.random() * 10 - 5)),
    color: base >= 80 ? 'green' : base >= 50 ? 'yellow' : 'red'
  };
}

export function generateBookingId() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = 'SFW-';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function getCrowdStatus(level) {
  if (level >= 80) return { label: 'Very High', color: 'red' };
  if (level >= 60) return { label: 'High', color: 'orange' };
  if (level >= 40) return { label: 'Moderate', color: 'yellow' };
  return { label: 'Low', color: 'green' };
}
