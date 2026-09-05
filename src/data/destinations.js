export const destinations = [
  {
    id: 'goa',
    name: 'Goa',
    state: 'Goa',
    country: 'India',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80',
    description: 'A paradise of sun-kissed beaches, vibrant nightlife, and Portuguese heritage. Goa offers a perfect blend of relaxation and adventure.',
    rating: 4.6,
    safetyScore: 88,
    crowdLevel: 'Moderate',
    bestSeason: 'November - February',
    avgBudget: 12000,
    recommendedDuration: '4-5 Days',
    categories: ['Beaches', 'Nightlife', 'Culture', 'Food'],
    attractions: [
      { name: 'Baga Beach', type: 'Beach' },
      { name: 'Fort Aguada', type: 'Historical' },
      { name: 'Basilica of Bom Jesus', type: 'Heritage' },
      { name: 'Dudhsagar Falls', type: 'Nature' },
      { name: 'Anjuna Flea Market', type: 'Shopping' },
      { name: 'Chapora Fort', type: 'Historical' }
    ],
    thingsToDo: ['Beach Hopping', 'Water Sports', 'Night Markets', 'Heritage Walks', 'Spice Plantation Tours', 'Dolphin Spotting'],
    weather: { avgTemp: 28, rainfall: 1200, humidity: 72 },
    nearbyServices: [
      { type: 'hospital', name: 'Goa Medical College', distance: '3.2 km' },
      { type: 'police', name: 'Panaji Police Station', distance: '1.8 km' },
      { type: 'pharmacy', name: 'MediCare Pharmacy', distance: '0.5 km' }
    ],
    crowdData: {
      mon: { morning: 25, afternoon: 55, evening: 80 },
      tue: { morning: 20, afternoon: 50, evening: 75 },
      wed: { morning: 22, afternoon: 48, evening: 72 },
      thu: { morning: 24, afternoon: 52, evening: 78 },
      fri: { morning: 35, afternoon: 65, evening: 90 },
      sat: { morning: 50, afternoon: 80, evening: 95 },
      sun: { morning: 45, afternoon: 75, evening: 85 }
    }
  },
  {
    id: 'kashmir',
    name: 'Kashmir',
    state: 'Jammu & Kashmir',
    country: 'India',
    image: '/images/kashmir.jpg',
    description: 'Heaven on Earth. Pristine valleys, snow-capped mountains, and houseboats on Dal Lake make Kashmir an unforgettable experience.',
    rating: 4.8,
    safetyScore: 82,
    crowdLevel: 'Moderate',
    bestSeason: 'March - October',
    avgBudget: 18000,
    recommendedDuration: '6-7 Days',
    categories: ['Mountains', 'Nature', 'Adventure', 'Photography'],
    attractions: [
      { name: 'Dal Lake', type: 'Nature' },
      { name: 'Gulmarg', type: 'Adventure' },
      { name: 'Pahalgam', type: 'Nature' },
      { name: 'Sonmarg', type: 'Nature' },
      { name: 'Shankaracharya Temple', type: 'Heritage' },
      { name: 'Nigeen Lake', type: 'Nature' }
    ],
    thingsToDo: ['Houseboat Stay', 'Skiing in Gulmarg', 'Trekking', 'Shikara Ride', 'Photography', 'Local Cuisine'],
    weather: { avgTemp: 15, rainfall: 680, humidity: 55 },
    nearbyServices: [
      { type: 'hospital', name: 'SKIMS Hospital', distance: '2.5 km' },
      { type: 'police', name: 'Lal Chowk Police Station', distance: '1.2 km' },
      { type: 'pharmacy', name: 'HealthFirst Pharmacy', distance: '0.8 km' }
    ],
    crowdData: {
      mon: { morning: 30, afternoon: 50, evening: 40 },
      tue: { morning: 28, afternoon: 48, evening: 38 },
      wed: { morning: 32, afternoon: 52, evening: 42 },
      thu: { morning: 30, afternoon: 50, evening: 40 },
      fri: { morning: 40, afternoon: 60, evening: 50 },
      sat: { morning: 55, afternoon: 75, evening: 65 },
      sun: { morning: 50, afternoon: 70, evening: 60 }
    }
  },
  {
    id: 'manali',
    name: 'Manali',
    state: 'Himachal Pradesh',
    country: 'India',
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&q=80',
    description: 'A breathtaking hill station nestled in the Kullu Valley, offering snow activities, temples, and stunning mountain vistas.',
    rating: 4.5,
    safetyScore: 90,
    crowdLevel: 'Moderate',
    bestSeason: 'October - June',
    avgBudget: 14000,
    recommendedDuration: '5-6 Days',
    categories: ['Mountains', 'Adventure', 'Nature', 'Family'],
    attractions: [
      { name: 'Rohtang Pass', type: 'Adventure' },
      { name: 'Solang Valley', type: 'Adventure' },
      { name: 'Hadimba Temple', type: 'Heritage' },
      { name: 'Old Manali', type: 'Culture' },
      { name: 'Jogini Waterfall', type: 'Nature' },
      { name: 'Manu Temple', type: 'Heritage' }
    ],
    thingsToDo: ['Paragliding', 'Skiing', 'Trekking', 'River Rafting', 'Mountain Biking', 'Camping'],
    weather: { avgTemp: 12, rainfall: 950, humidity: 48 },
    nearbyServices: [
      { type: 'hospital', name: 'District Hospital', distance: '1.8 km' },
      { type: 'police', name: 'Manali Police Station', distance: '1.0 km' },
      { type: 'pharmacy', name: 'Care Pharmacy', distance: '0.6 km' }
    ],
    crowdData: {
      mon: { morning: 20, afternoon: 45, evening: 35 },
      tue: { morning: 18, afternoon: 42, evening: 32 },
      wed: { morning: 22, afternoon: 48, evening: 38 },
      thu: { morning: 20, afternoon: 45, evening: 35 },
      fri: { morning: 35, afternoon: 60, evening: 55 },
      sat: { morning: 55, afternoon: 80, evening: 70 },
      sun: { morning: 50, afternoon: 72, evening: 62 }
    }
  },
  {
    id: 'jaipur',
    name: 'Jaipur',
    state: 'Rajasthan',
    country: 'India',
    image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&q=80',
    description: 'The Pink City of India. Majestic forts, palaces, and vibrant bazaars reflect the rich royal heritage of Rajasthan.',
    rating: 4.5,
    safetyScore: 85,
    crowdLevel: 'High',
    bestSeason: 'October - March',
    avgBudget: 10000,
    recommendedDuration: '3-4 Days',
    categories: ['History', 'Culture', 'Architecture', 'Shopping'],
    attractions: [
      { name: 'Amber Fort', type: 'Historical' },
      { name: 'Hawa Mahal', type: 'Architecture' },
      { name: 'City Palace', type: 'Heritage' },
      { name: 'Jantar Mantar', type: 'Historical' },
      { name: 'Nahargarh Fort', type: 'Historical' },
      { name: 'Jal Mahal', type: 'Architecture' }
    ],
    thingsToDo: ['Fort Tours', 'Bazaar Shopping', 'Block Printing Workshop', 'Elephant Ride', 'Rajasthani Cuisine', 'Camel Ride'],
    weather: { avgTemp: 25, rainfall: 550, humidity: 45 },
    nearbyServices: [
      { type: 'hospital', name: 'Sawai Man Singh Hospital', distance: '2.0 km' },
      { type: 'police', name: 'MI Road Police Station', distance: '0.8 km' },
      { type: 'pharmacy', name: 'Apollo Pharmacy', distance: '0.4 km' }
    ],
    crowdData: {
      mon: { morning: 35, afternoon: 60, evening: 70 },
      tue: { morning: 32, afternoon: 55, evening: 65 },
      wed: { morning: 38, afternoon: 62, evening: 72 },
      thu: { morning: 35, afternoon: 60, evening: 70 },
      fri: { morning: 45, afternoon: 70, evening: 82 },
      sat: { morning: 60, afternoon: 85, evening: 92 },
      sun: { morning: 55, afternoon: 80, evening: 88 }
    }
  },
  {
    id: 'kerala',
    name: 'Kerala',
    state: 'Kerala',
    country: 'India',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&q=80',
    description: "God's Own Country. Lush backwaters, spice plantations, pristine beaches, and Ayurvedic retreats await in this tropical paradise.",
    rating: 4.7,
    safetyScore: 92,
    crowdLevel: 'Moderate',
    bestSeason: 'September - March',
    avgBudget: 15000,
    recommendedDuration: '5-7 Days',
    categories: ['Nature', 'Beaches', 'Culture', 'Family'],
    attractions: [
      { name: 'Alleppey Backwaters', type: 'Nature' },
      { name: 'Munnar Tea Gardens', type: 'Nature' },
      { name: 'Kovalam Beach', type: 'Beach' },
      { name: 'Thekkady Wildlife', type: 'Nature' },
      { name: 'Fort Kochi', type: 'Heritage' },
      { name: 'Wayanad', type: 'Nature' }
    ],
    thingsToDo: ['Houseboat Cruise', 'Tea Plantation Visit', 'Ayurvedic Spa', 'Wildlife Safari', 'Kayaking', 'Kathakali Show'],
    weather: { avgTemp: 27, rainfall: 3000, humidity: 78 },
    nearbyServices: [
      { type: 'hospital', name: 'Govt Medical College', distance: '2.8 km' },
      { type: 'police', name: 'Kochi Police HQ', distance: '1.5 km' },
      { type: 'pharmacy', name: 'MedPlus', distance: '0.7 km' }
    ],
    crowdData: {
      mon: { morning: 25, afternoon: 45, evening: 38 },
      tue: { morning: 22, afternoon: 42, evening: 35 },
      wed: { morning: 28, afternoon: 48, evening: 40 },
      thu: { morning: 25, afternoon: 45, evening: 38 },
      fri: { morning: 38, afternoon: 58, evening: 55 },
      sat: { morning: 52, afternoon: 72, evening: 68 },
      sun: { morning: 48, afternoon: 68, evening: 62 }
    }
  },
  {
    id: 'ladakh',
    name: 'Ladakh',
    state: 'Ladakh',
    country: 'India',
    image: '/images/ladakh-tour-package.jpg',
    description: 'The Land of High Passes. Dramatic landscapes, ancient monasteries, and pristine lakes at the roof of the world.',
    rating: 4.9,
    safetyScore: 80,
    crowdLevel: 'Low',
    bestSeason: 'June - September',
    avgBudget: 22000,
    recommendedDuration: '7-10 Days',
    categories: ['Mountains', 'Adventure', 'Photography', 'Nature'],
    attractions: [
      { name: 'Pangong Lake', type: 'Nature' },
      { name: 'Nubra Valley', type: 'Nature' },
      { name: 'Khardung La', type: 'Adventure' },
      { name: 'Leh Palace', type: 'Heritage' },
      { name: 'Thiksey Monastery', type: 'Heritage' },
      { name: 'Magnetic Hill', type: 'Nature' }
    ],
    thingsToDo: ['Bike Trip', 'Camel Safari', 'Monastery Visit', 'Lake Camping', 'River Rafting', 'Stargazing'],
    weather: { avgTemp: 8, rainfall: 102, humidity: 30 },
    nearbyServices: [
      { type: 'hospital', name: 'SNM Hospital Leh', distance: '3.0 km' },
      { type: 'police', name: 'Leh Police Station', distance: '1.5 km' },
      { type: 'pharmacy', name: 'Medical Store', distance: '1.0 km' }
    ],
    crowdData: {
      mon: { morning: 15, afternoon: 30, evening: 20 },
      tue: { morning: 12, afternoon: 28, evening: 18 },
      wed: { morning: 18, afternoon: 32, evening: 22 },
      thu: { morning: 15, afternoon: 30, evening: 20 },
      fri: { morning: 22, afternoon: 40, evening: 30 },
      sat: { morning: 35, afternoon: 55, evening: 45 },
      sun: { morning: 30, afternoon: 50, evening: 40 }
    }
  },
  {
    id: 'udaipur',
    name: 'Udaipur',
    state: 'Rajasthan',
    country: 'India',
    image: '/images/udaipur.jpg',
    description: 'Romantic palaces, serene lakes, and rich art make Udaipur the Venice of the East.',
    rating: 4.6,
    safetyScore: 87,
    crowdLevel: 'Moderate',
    bestSeason: 'September - March',
    avgBudget: 11000,
    recommendedDuration: '3-4 Days',
    categories: ['Culture', 'History', 'Romance', 'Photography'],
    attractions: [
      { name: 'City Palace', type: 'Heritage' },
      { name: 'Lake Pichola', type: 'Nature' },
      { name: 'Jag Mandir', type: 'Heritage' },
      { name: 'Saheliyon ki Bari', type: 'Garden' },
      { name: 'Monsoon Palace', type: 'Historical' },
      { name: 'Fateh Sagar Lake', type: 'Nature' }
    ],
    thingsToDo: ['Lake Cruise', 'Heritage Walk', 'Rooftop Dining', 'Art Gallery Visit', 'Boat Ride', 'Sound & Light Show'],
    weather: { avgTemp: 24, rainfall: 620, humidity: 42 },
    nearbyServices: [
      { type: 'hospital', name: 'MG Hospital', distance: '2.2 km' },
      { type: 'police', name: 'City Police Station', distance: '1.0 km' },
      { type: 'pharmacy', name: 'Wellness Pharmacy', distance: '0.5 km' }
    ],
    crowdData: {
      mon: { morning: 28, afternoon: 48, evening: 55 },
      tue: { morning: 25, afternoon: 45, evening: 52 },
      wed: { morning: 30, afternoon: 50, evening: 58 },
      thu: { morning: 28, afternoon: 48, evening: 55 },
      fri: { morning: 40, afternoon: 62, evening: 72 },
      sat: { morning: 55, afternoon: 78, evening: 85 },
      sun: { morning: 50, afternoon: 72, evening: 80 }
    }
  },
  {
    id: 'mumbai',
    name: 'Mumbai',
    state: 'Maharashtra',
    country: 'India',
    image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800&q=80',
    description: 'The City of Dreams. From Bollywood to colonial architecture, street food to luxury dining — Mumbai never sleeps.',
    rating: 4.4,
    safetyScore: 83,
    crowdLevel: 'High',
    bestSeason: 'November - February',
    avgBudget: 13000,
    recommendedDuration: '4-5 Days',
    categories: ['Culture', 'Food', 'Nightlife', 'Shopping'],
    attractions: [
      { name: 'Gateway of India', type: 'Historical' },
      { name: 'Marine Drive', type: 'Landmark' },
      { name: 'Elephanta Caves', type: 'Heritage' },
      { name: 'Chhatrapati Shivaji Terminus', type: 'Architecture' },
      { name: 'Juhu Beach', type: 'Beach' },
      { name: 'Siddhivinayak Temple', type: 'Heritage' }
    ],
    thingsToDo: ['Street Food Tour', 'Bollywood Studio Visit', 'Beach Walk', 'Museum Visit', 'Shopping at Colaba', 'Ferry Ride'],
    weather: { avgTemp: 27, rainfall: 2200, humidity: 72 },
    nearbyServices: [
      { type: 'hospital', name: 'Breach Candy Hospital', distance: '2.5 km' },
      { type: 'police', name: 'Colaba Police Station', distance: '1.0 km' },
      { type: 'pharmacy', name: 'Netmeds Pharmacy', distance: '0.3 km' }
    ],
    crowdData: {
      mon: { morning: 40, afternoon: 70, evening: 80 },
      tue: { morning: 38, afternoon: 68, evening: 78 },
      wed: { morning: 42, afternoon: 72, evening: 82 },
      thu: { morning: 40, afternoon: 70, evening: 80 },
      fri: { morning: 50, afternoon: 80, evening: 92 },
      sat: { morning: 65, afternoon: 90, evening: 98 },
      sun: { morning: 55, afternoon: 82, evening: 88 }
    }
  },
  {
    id: 'dubai',
    name: 'Dubai',
    state: 'Dubai',
    country: 'UAE',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80',
    description: 'A futuristic city of superlatives. From the Burj Khalifa to desert safaris, Dubai blends luxury with adventure.',
    rating: 4.7,
    safetyScore: 95,
    crowdLevel: 'High',
    bestSeason: 'November - March',
    avgBudget: 45000,
    recommendedDuration: '5-6 Days',
    categories: ['Luxury', 'Adventure', 'Shopping', 'Family'],
    attractions: [
      { name: 'Burj Khalifa', type: 'Landmark' },
      { name: 'Dubai Mall', type: 'Shopping' },
      { name: 'Desert Safari', type: 'Adventure' },
      { name: 'Palm Jumeirah', type: 'Landmark' },
      { name: 'Dubai Creek', type: 'Heritage' },
      { name: 'Gold Souk', type: 'Shopping' }
    ],
    thingsToDo: ['Burj Khalifa Visit', 'Desert Safari', 'Dhow Cruise', 'Ski Dubai', 'Aquarium Visit', 'Skydiving'],
    weather: { avgTemp: 33, rainfall: 94, humidity: 55 },
    nearbyServices: [
      { type: 'hospital', name: 'Dubai Hospital', distance: '2.0 km' },
      { type: 'police', name: 'Dubai Police HQ', distance: '1.5 km' },
      { type: 'pharmacy', name: 'Aster Pharmacy', distance: '0.4 km' }
    ],
    crowdData: {
      mon: { morning: 35, afternoon: 55, evening: 70 },
      tue: { morning: 32, afternoon: 52, evening: 68 },
      wed: { morning: 38, afternoon: 58, evening: 72 },
      thu: { morning: 40, afternoon: 60, evening: 75 },
      fri: { morning: 55, afternoon: 78, evening: 90 },
      sat: { morning: 65, afternoon: 88, evening: 95 },
      sun: { morning: 50, afternoon: 72, evening: 82 }
    }
  },
  {
    id: 'bali',
    name: 'Bali',
    state: 'Bali',
    country: 'Indonesia',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80',
    description: 'Island of the Gods. Terraced rice fields, ancient temples, stunning beaches, and vibrant culture await.',
    rating: 4.7,
    safetyScore: 88,
    crowdLevel: 'Moderate',
    bestSeason: 'April - October',
    avgBudget: 35000,
    recommendedDuration: '6-7 Days',
    categories: ['Beaches', 'Culture', 'Nature', 'Adventure'],
    attractions: [
      { name: 'Tanah Lot Temple', type: 'Heritage' },
      { name: 'Ubud Rice Terraces', type: 'Nature' },
      { name: 'Seminyak Beach', type: 'Beach' },
      { name: 'Mount Batur', type: 'Adventure' },
      { name: 'Uluwatu Temple', type: 'Heritage' },
      { name: 'Nusa Penida', type: 'Nature' }
    ],
    thingsToDo: ['Temple Hopping', 'Rice Terrace Walk', 'Surfing', 'Volcano Trek', 'Snorkeling', 'Balinese Spa'],
    weather: { avgTemp: 27, rainfall: 1700, humidity: 75 },
    nearbyServices: [
      { type: 'hospital', name: 'BIMC Hospital', distance: '2.0 km' },
      { type: 'police', name: 'Kuta Police Station', distance: '1.2 km' },
      { type: 'pharmacy', name: 'Kimia Farma', distance: '0.6 km' }
    ],
    crowdData: {
      mon: { morning: 30, afternoon: 52, evening: 48 },
      tue: { morning: 28, afternoon: 50, evening: 45 },
      wed: { morning: 32, afternoon: 55, evening: 50 },
      thu: { morning: 30, afternoon: 52, evening: 48 },
      fri: { morning: 42, afternoon: 65, evening: 62 },
      sat: { morning: 58, afternoon: 82, evening: 78 },
      sun: { morning: 52, afternoon: 75, evening: 70 }
    }
  },
  {
    id: 'singapore',
    name: 'Singapore',
    state: 'Singapore',
    country: 'Singapore',
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&q=80',
    description: 'A futuristic city-state blending cultures, cuisines, and cutting-edge architecture. Perfect for families and foodies.',
    rating: 4.8,
    safetyScore: 96,
    crowdLevel: 'Moderate',
    bestSeason: 'Year-round',
    avgBudget: 50000,
    recommendedDuration: '4-5 Days',
    categories: ['Family', 'Food', 'Shopping', 'Culture'],
    attractions: [
      { name: 'Marina Bay Sands', type: 'Landmark' },
      { name: 'Gardens by the Bay', type: 'Nature' },
      { name: 'Sentosa Island', type: 'Entertainment' },
      { name: 'Chinatown', type: 'Culture' },
      { name: 'Universal Studios', type: 'Entertainment' },
      { name: 'Little India', type: 'Culture' }
    ],
    thingsToDo: ['Hawker Food Tour', 'Garden Light Show', 'Island Adventure', 'Shopping on Orchard Road', 'Night Safari', 'River Cruise'],
    weather: { avgTemp: 30, rainfall: 2340, humidity: 84 },
    nearbyServices: [
      { type: 'hospital', name: 'Singapore General Hospital', distance: '2.5 km' },
      { type: 'police', name: 'Central Police Division', distance: '1.0 km' },
      { type: 'pharmacy', name: 'Guardian Pharmacy', distance: '0.3 km' }
    ],
    crowdData: {
      mon: { morning: 30, afternoon: 50, evening: 55 },
      tue: { morning: 28, afternoon: 48, evening: 52 },
      wed: { morning: 32, afternoon: 52, evening: 58 },
      thu: { morning: 30, afternoon: 50, evening: 55 },
      fri: { morning: 42, afternoon: 65, evening: 75 },
      sat: { morning: 58, afternoon: 82, evening: 88 },
      sun: { morning: 48, afternoon: 70, evening: 72 }
    }
  },
  {
    id: 'paris',
    name: 'Paris',
    state: 'Ile-de-France',
    country: 'France',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80',
    description: 'The City of Light. Iconic landmarks, world-class art, exquisite cuisine, and timeless romance.',
    rating: 4.7,
    safetyScore: 82,
    crowdLevel: 'High',
    bestSeason: 'April - June, September - November',
    avgBudget: 55000,
    recommendedDuration: '5-6 Days',
    categories: ['Culture', 'History', 'Romance', 'Food'],
    attractions: [
      { name: 'Eiffel Tower', type: 'Landmark' },
      { name: 'Louvre Museum', type: 'Heritage' },
      { name: 'Notre-Dame', type: 'Historical' },
      { name: 'Champs-Élysées', type: 'Shopping' },
      { name: 'Montmartre', type: 'Culture' },
      { name: 'Seine River Cruise', type: 'Entertainment' }
    ],
    thingsToDo: ['Eiffel Tower Visit', 'Museum Hopping', 'Wine Tasting', 'Seine Cruise', 'Shopping', 'Pastry Tour'],
    weather: { avgTemp: 12, rainfall: 637, humidity: 76 },
    nearbyServices: [
      { type: 'hospital', name: 'Hôpital Européen', distance: '2.8 km' },
      { type: 'police', name: 'Commissariat Paris', distance: '1.2 km' },
      { type: 'pharmacy', name: 'Pharmacie du Louvre', distance: '0.5 km' }
    ],
    crowdData: {
      mon: { morning: 40, afternoon: 65, evening: 72 },
      tue: { morning: 38, afternoon: 62, evening: 70 },
      wed: { morning: 42, afternoon: 68, evening: 75 },
      thu: { morning: 40, afternoon: 65, evening: 72 },
      fri: { morning: 52, afternoon: 78, evening: 88 },
      sat: { morning: 68, afternoon: 92, evening: 95 },
      sun: { morning: 55, afternoon: 75, evening: 80 }
    }
  }
];

export const getDestinationById = (id) => destinations.find(d => d.id === id);

export const getDestinationsByCategory = (category) =>
  destinations.filter(d => d.categories.some(c => c.toLowerCase() === category.toLowerCase()));

export const searchDestinations = (query) => {
  const q = query.toLowerCase();
  return destinations.filter(d =>
    d.name.toLowerCase().includes(q) ||
    d.state.toLowerCase().includes(q) ||
    d.country.toLowerCase().includes(q) ||
    d.categories.some(c => c.toLowerCase().includes(q))
  );
};
