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
  },
  {
    id: 'varanasi',
    name: 'Varanasi',
    state: 'Uttar Pradesh',
    country: 'India',
    image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800&q=80',
    description: 'The spiritual heart of India. Ancient ghats, sunrise boat rides on the Ganges, and mesmerizing Ganga Aarti make Varanasi an unmissable pilgrimage.',
    rating: 4.7,
    safetyScore: 76,
    crowdLevel: 'High',
    bestSeason: 'October - March',
    avgBudget: 9000,
    recommendedDuration: '3-4 Days',
    categories: ['Spiritual', 'Culture', 'History', 'Photography'],
    attractions: [
      { name: 'Dashashwamedh Ghat', type: 'Spiritual' },
      { name: 'Kashi Vishwanath Temple', type: 'Heritage' },
      { name: 'Ganges Boat Ride', type: 'Nature' },
      { name: 'Sarnath', type: 'Historical' },
      { name: 'Manikarnika Ghat', type: 'Spiritual' },
      { name: 'Banaras Hindu University', type: 'Culture' }
    ],
    thingsToDo: ['Sunrise Boat Ride', 'Ganga Aarti', 'Weave Workshop', 'Temple Hopping', 'Street Food Trail', 'Silk Shopping'],
    weather: { avgTemp: 26, rainfall: 980, humidity: 60 },
    nearbyServices: [
      { type: 'hospital', name: 'BHU Medical Hospital', distance: '3.0 km' },
      { type: 'police', name: 'Kotwali Police Station', distance: '1.2 km' },
      { type: 'pharmacy', name: 'Ganga Pharmacy', distance: '0.5 km' }
    ],
    crowdData: {
      mon: { morning: 55, afternoon: 75, evening: 90 },
      tue: { morning: 50, afternoon: 70, evening: 85 },
      wed: { morning: 55, afternoon: 72, evening: 88 },
      thu: { morning: 60, afternoon: 78, evening: 92 },
      fri: { morning: 70, afternoon: 85, evening: 96 },
      sat: { morning: 80, afternoon: 92, evening: 98 },
      sun: { morning: 75, afternoon: 88, evening: 95 }
    }
  },
  {
    id: 'rishikesh',
    name: 'Rishikesh',
    state: 'Uttarakhand',
    country: 'India',
    image: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=800&q=80',
    description: 'The Yoga Capital of the World. River rafting on the Ganges, cliff jumping, ashrams and the iconic Lakshman Jhula draw adventure seekers worldwide.',
    rating: 4.6,
    safetyScore: 88,
    crowdLevel: 'Moderate',
    bestSeason: 'September - June',
    avgBudget: 10000,
    recommendedDuration: '4-5 Days',
    categories: ['Adventure', 'Nature', 'Spiritual', 'Wellness'],
    attractions: [
      { name: 'Lakshman Jhula', type: 'Landmark' },
      { name: 'Triveni Ghat', type: 'Spiritual' },
      { name: 'Neelkanth Mahadev', type: 'Heritage' },
      { name: 'Marine Drive Rafting', type: 'Adventure' },
      { name: 'Beatles Ashram', type: 'Culture' },
      { name: 'Kunjapuri Temple', type: 'Adventure' }
    ],
    thingsToDo: ['River Rafting', 'Bungee Jumping', 'Yoga Retreat', 'Beach Camping', 'Cliff Jumping', 'Ganga Snan'],
    weather: { avgTemp: 17, rainfall: 1400, humidity: 52 },
    nearbyServices: [
      { type: 'hospital', name: 'Uttarakhand Medical', distance: '2.5 km' },
      { type: 'police', name: 'Rishikesh Police Station', distance: '1.0 km' },
      { type: 'pharmacy', name: 'Himalaya Pharmacy', distance: '0.4 km' }
    ],
    crowdData: {
      mon: { morning: 20, afternoon: 45, evening: 55 },
      tue: { morning: 18, afternoon: 40, evening: 50 },
      wed: { morning: 20, afternoon: 42, evening: 52 },
      thu: { morning: 22, afternoon: 45, evening: 55 },
      fri: { morning: 40, afternoon: 65, evening: 72 },
      sat: { morning: 60, afternoon: 82, evening: 88 },
      sun: { morning: 55, afternoon: 75, evening: 80 }
    }
  },
  {
    id: 'darjeeling',
    name: 'Darjeeling',
    state: 'West Bengal',
    country: 'India',
    image: 'https://images.unsplash.com/photo-1507124484497-b7f446e65519?w=800&q=80',
    description: 'Queen of the Hills. Rolling tea estates, the iconic toy train, and a clear view of Kanchenjunga from Tiger Hill.',
    rating: 4.6,
    safetyScore: 91,
    crowdLevel: 'Low',
    bestSeason: 'October - May',
    avgBudget: 12000,
    recommendedDuration: '4-5 Days',
    categories: ['Mountains', 'Nature', 'Tea', 'Heritage'],
    attractions: [
      { name: 'Tiger Hill', type: 'Nature' },
      { name: 'Batasia Loop', type: 'Heritage' },
      { name: 'Darjeeling Himalayan Railway', type: 'Heritage' },
      { name: 'Padmaja Naidu Zoo', type: 'Family' },
      { name: 'Peace Pagoda', type: 'Spiritual' },
      { name: 'Happy Valley Tea Estate', type: 'Nature' }
    ],
    thingsToDo: ['Sunrise at Tiger Hill', 'Toy Train Ride', 'Tea Tasting', 'Himalayan Trek', 'Monastery Visit', 'Mall Road Stroll'],
    weather: { avgTemp: 10, rainfall: 2800, humidity: 82 },
    nearbyServices: [
      { type: 'hospital', name: 'District Hospital Darjeeling', distance: '2.0 km' },
      { type: 'police', name: 'Darjeeling Police Station', distance: '1.0 km' },
      { type: 'pharmacy', name: 'Mount Medicine', distance: '0.6 km' }
    ],
    crowdData: {
      mon: { morning: 15, afternoon: 30, evening: 25 },
      tue: { morning: 12, afternoon: 28, evening: 22 },
      wed: { morning: 15, afternoon: 32, evening: 25 },
      thu: { morning: 18, afternoon: 35, evening: 28 },
      fri: { morning: 30, afternoon: 50, evening: 45 },
      sat: { morning: 50, afternoon: 70, evening: 65 },
      sun: { morning: 45, afternoon: 62, evening: 55 }
    }
  },
  {
    id: 'agra',
    name: 'Agra',
    state: 'Uttar Pradesh',
    country: 'India',
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&q=80',
    description: 'Home of the Taj Mahal. Mughal architecture, marble inlay crafts and the legacy of emperor Shah Jahan in one golden city.',
    rating: 4.5,
    safetyScore: 74,
    crowdLevel: 'High',
    bestSeason: 'October - March',
    avgBudget: 10000,
    recommendedDuration: '2-3 Days',
    categories: ['History', 'Architecture', 'Culture', 'Photography'],
    attractions: [
      { name: 'Taj Mahal', type: 'Heritage' },
      { name: 'Agra Fort', type: 'Historical' },
      { name: 'Fatehpur Sikri', type: 'Historical' },
      { name: 'Mehtab Bagh', type: 'Garden' },
      { name: 'Itmad-ud-Daulah', type: 'Architecture' },
      { name: 'Kinari Bazaar', type: 'Shopping' }
    ],
    thingsToDo: ['Taj Sunrise Visit', 'Fort Exploration', 'Marble Inlay Workshop', 'Mughlai Food Trail', 'Sikri Day Trip', 'Rikshaw Ride'],
    weather: { avgTemp: 25, rainfall: 700, humidity: 50 },
    nearbyServices: [
      { type: 'hospital', name: 'SN Medical College', distance: '2.8 km' },
      { type: 'police', name: 'Tajganj Police Station', distance: '1.4 km' },
      { type: 'pharmacy', name: 'Medplus Pharmacy', distance: '0.5 km' }
    ],
    crowdData: {
      mon: { morning: 40, afternoon: 70, evening: 60 },
      tue: { morning: 38, afternoon: 65, evening: 58 },
      wed: { morning: 42, afternoon: 68, evening: 62 },
      thu: { morning: 40, afternoon: 70, evening: 60 },
      fri: { morning: 55, afternoon: 85, evening: 75 },
      sat: { morning: 70, afternoon: 95, evening: 85 },
      sun: { morning: 65, afternoon: 90, evening: 80 }
    }
  },
  {
    id: 'amritsar',
    name: 'Amritsar',
    state: 'Punjab',
    country: 'India',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80',
    description: 'City of the Golden Temple. Punjab\'s spiritual and culinary capital, famous for the sacred Harmandir Sahib and its warm hospitality.',
    rating: 4.8,
    safetyScore: 89,
    crowdLevel: 'High',
    bestSeason: 'November - March',
    avgBudget: 8000,
    recommendedDuration: '2-3 Days',
    categories: ['Spiritual', 'History', 'Food', 'Culture'],
    attractions: [
      { name: 'Golden Temple', type: 'Spiritual' },
      { name: 'Jallianwala Bagh', type: 'Historical' },
      { name: 'Wagah Border', type: 'Landmark' },
      { name: 'Partition Museum', type: 'Heritage' },
      { name: 'Gobindgarh Fort', type: 'Historical' },
      { name: 'Hall Bazaar', type: 'Shopping' }
    ],
    thingsToDo: ['Golden Temple Langar', 'Wagah Border Ceremony', 'Partition Museum Visit', 'Amritsari Kulcha Trail', 'Heritage Walk', 'Punjabi Cultural Show'],
    weather: { avgTemp: 23, rainfall: 720, humidity: 45 },
    nearbyServices: [
      { type: 'hospital', name: 'Civil Hospital', distance: '2.2 km' },
      { type: 'police', name: 'Hall Gate Police Station', distance: '1.0 km' },
      { type: 'pharmacy', name: 'Manav Pharmacy', distance: '0.4 km' }
    ],
    crowdData: {
      mon: { morning: 45, afternoon: 70, evening: 80 },
      tue: { morning: 42, afternoon: 68, evening: 78 },
      wed: { morning: 45, afternoon: 72, evening: 82 },
      thu: { morning: 48, afternoon: 75, evening: 85 },
      fri: { morning: 60, afternoon: 85, evening: 92 },
      sat: { morning: 75, afternoon: 95, evening: 98 },
      sun: { morning: 70, afternoon: 90, evening: 95 }
    }
  },
  {
    id: 'coorg',
    name: 'Coorg',
    state: 'Karnataka',
    country: 'India',
    image: 'https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?w=800&q=80',
    description: 'The Scotland of India. Misty coffee plantations, dense rainforests and waterfalls make Coorg a serene hill escape in the Western Ghats.',
    rating: 4.7,
    safetyScore: 94,
    crowdLevel: 'Low',
    bestSeason: 'October - May',
    avgBudget: 11000,
    recommendedDuration: '3-4 Days',
    categories: ['Nature', 'Family', 'Adventure', 'Coffee'],
    attractions: [
      { name: 'Abbey Falls', type: 'Nature' },
      { name: 'Raja\'s Seat', type: 'Nature' },
      { name: 'Mandalpatti Peak', type: 'Adventure' },
      { name: 'Dubare Elephant Camp', type: 'Wildlife' },
      { name: 'Talakaveri', type: 'Spiritual' },
      { name: 'Coffee Plantation Walk', type: 'Nature' }
    ],
    thingsToDo: ['Coffee Estate Tour', 'River Rafting', 'Elephant Bathing', 'Honey Bee Farm', 'Peak Trek', 'Homestay Bonfire'],
    weather: { avgTemp: 21, rainfall: 2600, humidity: 75 },
    nearbyServices: [
      { type: 'hospital', name: 'District Hospital Madikeri', distance: '3.0 km' },
      { type: 'police', name: 'Madikeri Police Station', distance: '1.5 km' },
      { type: 'pharmacy', name: 'Green Valley Pharmacy', distance: '0.6 km' }
    ],
    crowdData: {
      mon: { morning: 12, afternoon: 25, evening: 18 },
      tue: { morning: 10, afternoon: 22, evening: 15 },
      wed: { morning: 12, afternoon: 25, evening: 18 },
      thu: { morning: 15, afternoon: 28, evening: 20 },
      fri: { morning: 28, afternoon: 48, evening: 42 },
      sat: { morning: 50, afternoon: 75, evening: 68 },
      sun: { morning: 45, afternoon: 68, evening: 60 }
    }
  },
  {
    id: 'andaman',
    name: 'Andaman Islands',
    state: 'Andaman & Nicobar',
    country: 'India',
    image: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800&q=80',
    description: 'Crystal-clear turquoise waters, coral reefs and pristine white-sand beaches ringed by dense tropical forest. India\'s island paradise.',
    rating: 4.8,
    safetyScore: 86,
    crowdLevel: 'Low',
    bestSeason: 'October - May',
    avgBudget: 30000,
    recommendedDuration: '5-6 Days',
    categories: ['Beaches', 'Adventure', 'Nature', 'Family'],
    attractions: [
      { name: 'Radhanagar Beach', type: 'Beach' },
      { name: 'Cellular Jail', type: 'Historical' },
      { name: 'Ross Island', type: 'Heritage' },
      { name: 'Barren Island Volcano', type: 'Nature' },
      { name: 'Scuba Diving Havelock', type: 'Adventure' },
      { name: 'Elephanta Beach', type: 'Beach' }
    ],
    thingsToDo: ['Scuba Diving', 'Glass Bottom Boat', 'Sea Walking', 'Island Hopping', 'Snorkeling', 'Coral Watching'],
    weather: { avgTemp: 28, rainfall: 3100, humidity: 80 },
    nearbyServices: [
      { type: 'hospital', name: 'GB Pant Hospital', distance: '2.0 km' },
      { type: 'police', name: 'Port Blair Police Station', distance: '1.0 km' },
      { type: 'pharmacy', name: 'Andaman Pharmacy', distance: '0.5 km' }
    ],
    crowdData: {
      mon: { morning: 10, afternoon: 25, evening: 15 },
      tue: { morning: 8, afternoon: 22, evening: 12 },
      wed: { morning: 10, afternoon: 25, evening: 15 },
      thu: { morning: 12, afternoon: 28, evening: 18 },
      fri: { morning: 22, afternoon: 45, evening: 38 },
      sat: { morning: 40, afternoon: 65, evening: 55 },
      sun: { morning: 35, afternoon: 58, evening: 48 }
    }
  },
  {
    id: 'jaisalmer',
    name: 'Jaisalmer',
    state: 'Rajasthan',
    country: 'India',
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&q=80',
    description: 'The Golden City. A living fort, havelis carved from sandstone, and endless dunes that come alive with camel safaris at sunset.',
    rating: 4.6,
    safetyScore: 84,
    crowdLevel: 'Moderate',
    bestSeason: 'October - March',
    avgBudget: 12000,
    recommendedDuration: '3-4 Days',
    categories: ['Desert', 'Adventure', 'Culture', 'Photography'],
    attractions: [
      { name: 'Jaisalmer Fort', type: 'Heritage' },
      { name: 'Patwon Ki Haveli', type: 'Architecture' },
      { name: 'Sam Sand Dunes', type: 'Nature' },
      { name: 'Gadisar Lake', type: 'Nature' },
      { name: 'Bada Bagh', type: 'Historical' },
      { name: 'Desert National Park', type: 'Wildlife' }
    ],
    thingsToDo: ['Camel Safari', 'Dune Camping', 'Desert Sunset', 'Fort Staying', 'Folk Music Night', 'Balloon Ride'],
    weather: { avgTemp: 27, rainfall: 200, humidity: 32 },
    nearbyServices: [
      { type: 'hospital', name: 'District Hospital Jaisalmer', distance: '1.8 km' },
      { type: 'police', name: 'Fort Police Station', distance: '0.8 km' },
      { type: 'pharmacy', name: 'Rajasthan Pharmacy', distance: '0.5 km' }
    ],
    crowdData: {
      mon: { morning: 15, afternoon: 35, evening: 40 },
      tue: { morning: 12, afternoon: 32, evening: 38 },
      wed: { morning: 15, afternoon: 35, evening: 42 },
      thu: { morning: 18, afternoon: 38, evening: 45 },
      fri: { morning: 30, afternoon: 55, evening: 65 },
      sat: { morning: 50, afternoon: 78, evening: 85 },
      sun: { morning: 45, afternoon: 70, evening: 78 }
    }
  },
  {
    id: 'pondicherry',
    name: 'Pondicherry',
    state: 'Puducherry',
    country: 'India',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80',
    description: 'A slice of French Indochine on the Coromandel coast. Pastel boulevards, seaside promenades and an Auroville utopia.',
    rating: 4.5,
    safetyScore: 90,
    crowdLevel: 'Moderate',
    bestSeason: 'October - March',
    avgBudget: 11000,
    recommendedDuration: '3-4 Days',
    categories: ['Culture', 'Beaches', 'Food', 'History'],
    attractions: [
      { name: 'Promenade Beach', type: 'Beach' },
      { name: 'Auroville', type: 'Spiritual' },
      { name: 'French Quarter', type: 'Culture' },
      { name: 'Sri Aurobindo Ashram', type: 'Spiritual' },
      { name: 'Paradise Beach', type: 'Beach' },
      { name: 'Arikamedu', type: 'Historical' }
    ],
    thingsToDo: ['French Quarter Walk', 'Auroville Visit', 'Beach Yoga', 'Creole Food Trail', 'Boutique Shopping', 'Sunset at Promenade'],
    weather: { avgTemp: 29, rainfall: 1250, humidity: 74 },
    nearbyServices: [
      { type: 'hospital', name: 'JIPMER Hospital', distance: '2.4 km' },
      { type: 'police', name: 'Puducherry Police Station', distance: '1.0 km' },
      { type: 'pharmacy', name: 'French Pharmacy', distance: '0.3 km' }
    ],
    crowdData: {
      mon: { morning: 18, afternoon: 40, evening: 50 },
      tue: { morning: 15, afternoon: 38, evening: 48 },
      wed: { morning: 18, afternoon: 42, evening: 52 },
      thu: { morning: 20, afternoon: 45, evening: 55 },
      fri: { morning: 35, afternoon: 60, evening: 70 },
      sat: { morning: 55, afternoon: 82, evening: 88 },
      sun: { morning: 50, afternoon: 75, evening: 82 }
    }
  },
  {
    id: 'bangkok',
    name: 'Bangkok',
    state: 'Bangkok',
    country: 'Thailand',
    image: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800&q=80',
    description: 'The Land of Smiles. Golden temples, floating markets, rooftop bars and fiery street food in a city that never sleeps.',
    rating: 4.7,
    safetyScore: 91,
    crowdLevel: 'High',
    bestSeason: 'November - February',
    avgBudget: 40000,
    recommendedDuration: '4-5 Days',
    categories: ['Food', 'Culture', 'Shopping', 'Nightlife'],
    attractions: [
      { name: 'Grand Palace', type: 'Heritage' },
      { name: 'Wat Arun', type: 'Spiritual' },
      { name: 'Floating Market', type: 'Culture' },
      { name: 'Chatuchak Market', type: 'Shopping' },
      { name: 'Jim Thompson House', type: 'Heritage' },
      { name: 'Chao Phraya River', type: 'Nature' }
    ],
    thingsToDo: ['Temple Hopping', 'Street Food Tour', 'Rooftop Sunset', 'Thai Massage', 'Boat Ride', 'Night Market'],
    weather: { avgTemp: 30, rainfall: 1500, humidity: 78 },
    nearbyServices: [
      { type: 'hospital', name: 'Bumrungrad Hospital', distance: '2.5 km' },
      { type: 'police', name: 'Tourist Police', distance: '1.2 km' },
      { type: 'pharmacy', name: 'Boots Pharmacy', distance: '0.3 km' }
    ],
    crowdData: {
      mon: { morning: 35, afternoon: 60, evening: 75 },
      tue: { morning: 32, afternoon: 58, evening: 72 },
      wed: { morning: 38, afternoon: 62, evening: 78 },
      thu: { morning: 35, afternoon: 60, evening: 75 },
      fri: { morning: 48, afternoon: 75, evening: 90 },
      sat: { morning: 65, afternoon: 90, evening: 96 },
      sun: { morning: 55, afternoon: 80, evening: 88 }
    }
  },
  {
    id: 'istanbul',
    name: 'Istanbul',
    state: 'Istanbul',
    country: 'Turkey',
    image: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=800&q=80',
    description: 'Where East meets West. Minarets and mosques, the Bosphorus strait, grand bazaars and history spanning two continents.',
    rating: 4.8,
    safetyScore: 88,
    crowdLevel: 'High',
    bestSeason: 'April - June, September - November',
    avgBudget: 52000,
    recommendedDuration: '5-6 Days',
    categories: ['History', 'Culture', 'Food', 'Architecture'],
    attractions: [
      { name: 'Hagia Sophia', type: 'Heritage' },
      { name: 'Blue Mosque', type: 'Spiritual' },
      { name: 'Topkapi Palace', type: 'Historical' },
      { name: 'Bosphorus Cruise', type: 'Nature' },
      { name: 'Grand Bazaar', type: 'Shopping' },
      { name: 'Basilica Cistern', type: 'Historical' }
    ],
    thingsToDo: ['Mosque Hopping', 'Bosphorus Cruise', 'Grand Bazaar Bargain', 'Turkish Tea Break', 'Hammam Experience', 'Kebab Trail'],
    weather: { avgTemp: 15, rainfall: 810, humidity: 72 },
    nearbyServices: [
      { type: 'hospital', name: 'Istanbul University Hospital', distance: '3.0 km' },
      { type: 'police', name: 'Sultanahmet Police', distance: '1.0 km' },
      { type: 'pharmacy', name: 'Merkez Pharmacy', distance: '0.4 km' }
    ],
    crowdData: {
      mon: { morning: 40, afternoon: 70, evening: 65 },
      tue: { morning: 38, afternoon: 65, evening: 60 },
      wed: { morning: 42, afternoon: 68, evening: 62 },
      thu: { morning: 40, afternoon: 70, evening: 65 },
      fri: { morning: 52, afternoon: 80, evening: 78 },
      sat: { morning: 70, afternoon: 95, evening: 90 },
      sun: { morning: 65, afternoon: 90, evening: 85 }
    }
  },
  {
    id: 'shillong',
    name: 'Shillong',
    state: 'Meghalaya',
    country: 'India',
    image: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800&q=80',
    description: 'Scotland of the East. Rolling pine hills, living root bridges, waterfalls and the wettest places on earth await in Meghalaya.',
    rating: 4.7,
    safetyScore: 92,
    crowdLevel: 'Low',
    bestSeason: 'September - May',
    avgBudget: 17000,
    recommendedDuration: '5-6 Days',
    categories: ['Nature', 'Adventure', 'Culture', 'Photography'],
    attractions: [
      { name: 'Umiam Lake', type: 'Nature' },
      { name: 'Double Decker Root Bridge', type: 'Nature' },
      { name: 'Elephant Falls', type: 'Nature' },
      { name: 'Mawsmai Caves', type: 'Adventure' },
      { name: 'Laitlum Canyon', type: 'Nature' },
      { name: 'Shillong Peak', type: 'Nature' }
    ],
    thingsToDo: ['Root Bridge Trek', 'Cave Exploration', 'Waterfall Hop', 'Local Food Trail', 'Living Root Ride', 'Sunrise at Peak'],
    weather: { avgTemp: 18, rainfall: 5000, humidity: 88 },
    nearbyServices: [
      { type: 'hospital', name: 'NEIGRIHMS Hospital', distance: '2.5 km' },
      { type: 'police', name: 'Shillong Police Station', distance: '1.0 km' },
      { type: 'pharmacy', name: 'Meghalaya Pharmacy', distance: '0.5 km' }
    ],
    crowdData: {
      mon: { morning: 12, afternoon: 28, evening: 20 },
      tue: { morning: 10, afternoon: 25, evening: 18 },
      wed: { morning: 12, afternoon: 28, evening: 20 },
      thu: { morning: 15, afternoon: 30, evening: 22 },
      fri: { morning: 25, afternoon: 45, evening: 40 },
      sat: { morning: 45, afternoon: 68, evening: 60 },
      sun: { morning: 40, afternoon: 60, evening: 52 }
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
