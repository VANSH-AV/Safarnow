export const weatherData = {
  goa: {
    current: { temp: 28, condition: 'Partly Cloudy', humidity: 72, wind: 12, rainProbability: 20, icon: 'CloudSun' },
    forecast: [
      { day: 'Today', high: 31, low: 24, condition: 'Partly Cloudy', rain: 20 },
      { day: 'Tomorrow', high: 30, low: 23, condition: 'Sunny', rain: 5 },
      { day: 'Day 3', high: 29, low: 24, condition: 'Light Rain', rain: 65 },
      { day: 'Day 4', high: 27, low: 23, condition: 'Heavy Rain', rain: 85 },
      { day: 'Day 5', high: 28, low: 24, condition: 'Cloudy', rain: 40 }
    ],
    alerts: [
      { type: 'rain', severity: 'moderate', message: 'Heavy rain expected between 2 PM - 5 PM on Day 4.', recommendation: 'Move outdoor sightseeing to the morning. Visit indoor attractions like museums during rain hours.' }
    ]
  },
  kashmir: {
    current: { temp: 15, condition: 'Clear Sky', humidity: 55, wind: 8, rainProbability: 10, icon: 'Sun' },
    forecast: [
      { day: 'Today', high: 18, low: 8, condition: 'Clear Sky', rain: 10 },
      { day: 'Tomorrow', high: 17, low: 7, condition: 'Partly Cloudy', rain: 25 },
      { day: 'Day 3', high: 14, low: 5, condition: 'Light Snow', rain: 70 },
      { day: 'Day 4', high: 12, low: 3, condition: 'Snow', rain: 90 },
      { day: 'Day 5', high: 15, low: 6, condition: 'Cloudy', rain: 35 }
    ],
    alerts: [
      { type: 'cold', severity: 'high', message: 'Temperature expected to drop below 5°C. Snowfall predicted on Day 3-4.', recommendation: 'Carry warm clothing. Consider indoor activities on Day 3-4. Check road conditions before travel.' }
    ]
  },
  manali: {
    current: { temp: 12, condition: 'Sunny', humidity: 48, wind: 15, rainProbability: 15, icon: 'Sun' },
    forecast: [
      { day: 'Today', high: 16, low: 4, condition: 'Sunny', rain: 15 },
      { day: 'Tomorrow', high: 15, low: 3, condition: 'Partly Cloudy', rain: 30 },
      { day: 'Day 3', high: 10, low: 1, condition: 'Rain', rain: 75 },
      { day: 'Day 4', high: 13, low: 2, condition: 'Cloudy', rain: 40 },
      { day: 'Day 5', high: 14, low: 3, condition: 'Sunny', rain: 10 }
    ],
    alerts: [
      { type: 'rain', severity: 'moderate', message: 'Rain expected on Day 3. Rohtang Pass may have limited access.', recommendation: 'Plan Solang Valley activities for Day 1-2. Keep Day 3 for indoor/covered activities.' }
    ]
  },
  jaipur: {
    current: { temp: 25, condition: 'Sunny', humidity: 45, wind: 10, rainProbability: 5, icon: 'Sun' },
    forecast: [
      { day: 'Today', high: 30, low: 18, condition: 'Sunny', rain: 5 },
      { day: 'Tomorrow', high: 31, low: 19, condition: 'Clear', rain: 0 },
      { day: 'Day 3', high: 29, low: 17, condition: 'Partly Cloudy', rain: 20 },
      { day: 'Day 4', high: 28, low: 17, condition: 'Cloudy', rain: 35 },
      { day: 'Day 5', high: 30, low: 18, condition: 'Sunny', rain: 10 }
    ],
    alerts: []
  },
  kerala: {
    current: { temp: 27, condition: 'Overcast', humidity: 78, wind: 14, rainProbability: 55, icon: 'Cloud' },
    forecast: [
      { day: 'Today', high: 30, low: 23, condition: 'Overcast', rain: 55 },
      { day: 'Tomorrow', high: 28, low: 22, condition: 'Heavy Rain', rain: 80 },
      { day: 'Day 3', high: 27, low: 22, condition: 'Rain', rain: 70 },
      { day: 'Day 4', high: 29, low: 23, condition: 'Partly Cloudy', rain: 40 },
      { day: 'Day 5', high: 30, low: 24, condition: 'Sunny', rain: 15 }
    ],
    alerts: [
      { type: 'rain', severity: 'high', message: 'Heavy monsoon rains expected tomorrow. Possible flooding in low-lying areas.', recommendation: 'Plan houseboat and indoor activities for tomorrow. Avoid trekking during rain.' }
    ]
  },
  ladakh: {
    current: { temp: 8, condition: 'Clear Sky', humidity: 30, wind: 20, rainProbability: 5, icon: 'Sun' },
    forecast: [
      { day: 'Today', high: 12, low: -2, condition: 'Clear Sky', rain: 5 },
      { day: 'Tomorrow', high: 11, low: -3, condition: 'Sunny', rain: 0 },
      { day: 'Day 3', high: 8, low: -5, condition: 'Cloudy', rain: 30 },
      { day: 'Day 4', high: 6, low: -7, condition: 'Snow', rain: 60 },
      { day: 'Day 5', high: 9, low: -4, condition: 'Clear', rain: 10 }
    ],
    alerts: [
      { type: 'cold', severity: 'high', message: 'Extreme cold conditions. Night temperatures dropping below -5°C.', recommendation: 'Carry heavy winter clothing. Avoid high-altitude passes during snowfall. Stay hydrated.' }
    ]
  },
  dubai: {
    current: { temp: 33, condition: 'Clear Sky', humidity: 55, wind: 18, rainProbability: 2, icon: 'Sun' },
    forecast: [
      { day: 'Today', high: 38, low: 28, condition: 'Clear Sky', rain: 2 },
      { day: 'Tomorrow', high: 39, low: 29, condition: 'Sunny', rain: 0 },
      { day: 'Day 3', high: 40, low: 30, condition: 'Hot', rain: 0 },
      { day: 'Day 4', high: 37, low: 28, condition: 'Partly Cloudy', rain: 10 },
      { day: 'Day 5', high: 38, low: 29, condition: 'Sunny', rain: 0 }
    ],
    alerts: [
      { type: 'heat', severity: 'moderate', message: 'Extreme heat expected. Temperature may reach 40°C.', recommendation: 'Avoid outdoor activities between 11 AM - 4 PM. Stay hydrated. Use sunscreen.' }
    ]
  },
  bali: {
    current: { temp: 27, condition: 'Tropical', humidity: 75, wind: 10, rainProbability: 35, icon: 'CloudSun' },
    forecast: [
      { day: 'Today', high: 31, low: 23, condition: 'Tropical', rain: 35 },
      { day: 'Tomorrow', high: 30, low: 23, condition: 'Light Rain', rain: 55 },
      { day: 'Day 3', high: 31, low: 24, condition: 'Sunny', rain: 15 },
      { day: 'Day 4', high: 32, low: 24, condition: 'Partly Cloudy', rain: 25 },
      { day: 'Day 5', high: 30, low: 23, condition: 'Rain', rain: 60 }
    ],
    alerts: []
  },
  singapore: {
    current: { temp: 30, condition: 'Humid', humidity: 84, wind: 12, rainProbability: 45, icon: 'CloudSun' },
    forecast: [
      { day: 'Today', high: 32, low: 25, condition: 'Humid', rain: 45 },
      { day: 'Tomorrow', high: 31, low: 25, condition: 'Thundershower', rain: 70 },
      { day: 'Day 3', high: 32, low: 26, condition: 'Partly Cloudy', rain: 30 },
      { day: 'Day 4', high: 33, low: 26, condition: 'Sunny', rain: 15 },
      { day: 'Day 5', high: 31, low: 25, condition: 'Rain', rain: 55 }
    ],
    alerts: []
  },
  paris: {
    current: { temp: 18, condition: 'Cloudy', humidity: 76, wind: 14, rainProbability: 40, icon: 'Cloud' },
    forecast: [
      { day: 'Today', high: 20, low: 12, condition: 'Cloudy', rain: 40 },
      { day: 'Tomorrow', high: 19, low: 11, condition: 'Light Rain', rain: 60 },
      { day: 'Day 3', high: 22, low: 13, condition: 'Partly Cloudy', rain: 25 },
      { day: 'Day 4', high: 24, low: 14, condition: 'Sunny', rain: 10 },
      { day: 'Day 5', high: 21, low: 12, condition: 'Cloudy', rain: 35 }
    ],
    alerts: []
  },
  udaipur: {
    current: { temp: 24, condition: 'Clear', humidity: 42, wind: 8, rainProbability: 10, icon: 'Sun' },
    forecast: [
      { day: 'Today', high: 28, low: 15, condition: 'Clear', rain: 10 },
      { day: 'Tomorrow', high: 29, low: 16, condition: 'Sunny', rain: 5 },
      { day: 'Day 3', high: 27, low: 15, condition: 'Partly Cloudy', rain: 20 },
      { day: 'Day 4', high: 28, low: 16, condition: 'Clear', rain: 5 },
      { day: 'Day 5', high: 30, low: 17, condition: 'Sunny', rain: 0 }
    ],
    alerts: []
  },
  mumbai: {
    current: { temp: 27, condition: 'Humid', humidity: 72, wind: 16, rainProbability: 30, icon: 'CloudSun' },
    forecast: [
      { day: 'Today', high: 31, low: 24, condition: 'Humid', rain: 30 },
      { day: 'Tomorrow', high: 30, low: 24, condition: 'Light Rain', rain: 55 },
      { day: 'Day 3', high: 29, low: 24, condition: 'Rain', rain: 70 },
      { day: 'Day 4', high: 30, low: 24, condition: 'Cloudy', rain: 40 },
      { day: 'Day 5', high: 31, low: 25, condition: 'Partly Cloudy', rain: 25 }
    ],
    alerts: [
      { type: 'rain', severity: 'moderate', message: 'Moderate rain expected on Day 3. Waterlogging possible in low areas.', recommendation: 'Plan indoor activities for Day 3. Avoid low-lying areas during heavy rain.' }
    ]
  }
};

export const getWeatherByDestination = (destId) => weatherData[destId] || weatherData.goa;
