export const packages = [
  {
    id: 'goa-beach-escape',
    name: 'Goa Beach Escape',
    destination: 'goa',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80',
    duration: '4 Days / 3 Nights',
    days: 4,
    rating: 4.6,
    originalPrice: 18999,
    price: 12999,
    highlights: ['Beach Resort Stay', 'Water Sports', 'North Goa Tour', 'Spice Plantation', 'Sunset Cruise'],
    inclusions: ['Hotel Stay', 'Breakfast', 'Airport Transfer', 'Sightseeing', 'Water Sports'],
    exclusions: ['Flights', 'Lunch & Dinner', 'Personal Expenses', 'Travel Insurance'],
    travelType: ['Beaches', 'Adventure', 'Family'],
    budget: 'Moderate',
    safetyScore: 88,
    crowdLevel: 'Moderate',
    hotels: [
      { name: 'Goa Beach Resort', stars: 4, price: 4500 },
      { name: 'Coastal Haven Hotel', stars: 3, price: 2800 }
    ],
    itinerary: [
      { day: 1, title: 'Arrival & Beach Fun', activities: ['Airport pickup', 'Hotel check-in', 'Baga Beach visit', 'Evening at Tito\'s Lane'] },
      { day: 2, title: 'North Goa Exploration', activities: ['Aguada Fort', 'Vagator Beach', 'Anjuna Flea Market', 'Chapora Fort sunset'] },
      { day: 3, title: 'Adventure & Culture', activities: ['Water sports', 'Spice plantation tour', 'Old Goa churches', 'Sunset cruise'] },
      { day: 4, title: 'Departure', activities: ['Breakfast', 'Shopping at Panaji', 'Airport drop'] }
    ],
    reviews: [
      { user: 'Priya S.', rating: 5, comment: 'Amazing beach experience! The water sports were thrilling.' },
      { user: 'Rahul M.', rating: 4, comment: 'Great package value. Hotel could be slightly better.' }
    ]
  },
  {
    id: 'kashmir-paradise',
    name: 'Kashmir Paradise',
    destination: 'kashmir',
    image: '/images/kashmir.jpg',
    duration: '6 Days / 5 Nights',
    days: 6,
    rating: 4.8,
    originalPrice: 35999,
    price: 24999,
    highlights: ['Houseboat Stay', 'Gulmarg Gondola', 'Pahalgam Valley', 'Dal Lake Shikara', 'Mughal Gardens'],
    inclusions: ['Hotel/Houseboat Stay', 'All Meals', 'Transport', 'Shikara Ride', 'Gondola Ride'],
    exclusions: ['Flights', 'Personal Expenses', 'Travel Insurance', 'Optional Activities'],
    travelType: ['Mountains', 'Nature', 'Adventure', 'Photography'],
    budget: 'Premium',
    safetyScore: 82,
    crowdLevel: 'Moderate',
    hotels: [
      { name: 'Dal Lake Houseboat', stars: 4, price: 6500 },
      { name: 'Kashmir Heritage Hotel', stars: 4, price: 5500 }
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Srinagar', activities: ['Airport pickup', 'Dal Lake Shikara', 'Mughal Gardens', 'Houseboat check-in'] },
      { day: 2, title: 'Gulmarg Excursion', activities: ['Drive to Gulmarg', 'Gondola ride', 'Meadow walk', 'Return to Srinagar'] },
      { day: 3, title: 'Pahalgam Day Trip', activities: ['Scenic drive', 'Betaab Valley', 'Lidder River', 'Local market'] },
      { day: 4, title: 'Sonmarg Exploration', activities: ['Drive to Sonmarg', 'Thajiwas Glacier', 'Meadow trek', 'Return'] },
      { day: 5, title: 'Srinagar Local', activities: ['Shankaracharya Temple', 'Floating Market', 'Handicraft Shopping', 'Farewell dinner'] },
      { day: 6, title: 'Departure', activities: ['Breakfast', 'Airport drop'] }
    ],
    reviews: [
      { user: 'Anjali K.', rating: 5, comment: 'Heaven on Earth! The houseboat experience was magical.' },
      { user: 'Vikram R.', rating: 5, comment: 'Best trip ever. Gulmarg Gondola was breathtaking.' }
    ]
  },
  {
    id: 'manali-adventure',
    name: 'Manali Adventure',
    destination: 'manali',
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&q=80',
    duration: '5 Days / 4 Nights',
    days: 5,
    rating: 4.5,
    originalPrice: 24999,
    price: 17499,
    highlights: ['Solang Valley', 'Paragliding', 'Rohtang Pass', 'River Rafting', 'Old Manali'],
    inclusions: ['Hotel Stay', 'Breakfast & Dinner', 'Transport', 'Activities', 'Permits'],
    exclusions: ['Flights/Train', 'Lunch', 'Personal Expenses', 'Insurance'],
    travelType: ['Mountains', 'Adventure', 'Nature'],
    budget: 'Moderate',
    safetyScore: 90,
    crowdLevel: 'Moderate',
    hotels: [
      { name: 'Mountain View Resort', stars: 4, price: 4000 },
      { name: 'Snow Peak Inn', stars: 3, price: 2500 }
    ],
    itinerary: [
      { day: 1, title: 'Arrival & Local Tour', activities: ['Pickup from airport/station', 'Hotel check-in', 'Old Manali walk', 'Mall Road'] },
      { day: 2, title: 'Solang Valley', activities: ['Drive to Solang', 'Paragliding', 'Zorbing', 'Return via Kullu'] },
      { day: 3, title: 'Rohtang Pass', activities: ['Early morning drive', 'Rohtang Pass', 'Snow activities', 'Return'] },
      { day: 4, title: 'Adventure Day', activities: ['River rafting', 'Beas Kund Trek', 'Manu Temple', 'Hadimba Temple'] },
      { day: 5, title: 'Departure', activities: ['Breakfast', 'Souvenir shopping', 'Airport/station drop'] }
    ],
    reviews: [
      { user: 'Arjun P.', rating: 5, comment: 'Best adventure trip! Paragliding was an amazing experience.' },
      { user: 'Meera D.', rating: 4, comment: 'Beautiful location. Rohtang was worth the early wake-up.' }
    ]
  },
  {
    id: 'dubai-explorer',
    name: 'Dubai Explorer',
    destination: 'dubai',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80',
    duration: '6 Days / 5 Nights',
    days: 6,
    rating: 4.7,
    originalPrice: 85999,
    price: 58999,
    highlights: ['Burj Khalifa', 'Desert Safari', 'Palm Jumeirah', 'Dubai Mall', 'Dhow Cruise'],
    inclusions: ['5 Star Hotel', 'Breakfast', 'Airport Transfers', 'Tours', 'Visa'],
    exclusions: ['Flights', 'Lunch & Dinner', 'Personal Expenses', 'Optional Tours'],
    travelType: ['Luxury', 'Adventure', 'Family', 'Shopping'],
    budget: 'Premium',
    safetyScore: 95,
    crowdLevel: 'High',
    hotels: [
      { name: 'Atlantis The Palm', stars: 5, price: 15000 },
      { name: 'Marriott Downtown', stars: 5, price: 10000 }
    ],
    itinerary: [
      { day: 1, title: 'Welcome to Dubai', activities: ['Airport pickup', 'Hotel check-in', 'Dubai Mall visit', 'Burj Khalifa sunset'] },
      { day: 2, title: 'City Tour', activities: ['Dubai Frame', 'Gold Souk', 'Spice Souk', 'Dhow Cruise dinner'] },
      { day: 3, title: 'Desert Adventure', activities: ['Desert Safari', 'Dune bashing', 'Camel ride', 'BBQ dinner'] },
      { day: 4, title: 'Island Life', activities: ['Palm Jumeirah', 'Aquaventure Waterpark', 'Atlantis visit', 'Beach time'] },
      { day: 5, title: 'Culture & Luxury', activities: ['Dubai Museum', 'Jumeirah Mosque', 'Marina Walk', 'Global Village'] },
      { day: 6, title: 'Departure', activities: ['Last minute shopping', 'Airport drop'] }
    ],
    reviews: [
      { user: 'Sanjay T.', rating: 5, comment: 'Luxury experience at its finest! Desert safari was unforgettable.' },
      { user: 'Kavita N.', rating: 5, comment: 'Perfect family trip. Kids loved the waterpark.' }
    ]
  },
  {
    id: 'bali-escape',
    name: 'Bali Escape',
    destination: 'bali',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80',
    duration: '7 Days / 6 Nights',
    days: 7,
    rating: 4.7,
    originalPrice: 95999,
    price: 68999,
    highlights: ['Ubud Rice Terraces', 'Tanah Lot Temple', 'Nusa Penida', 'Seminyak Beach', 'Mount Sunrise Trek'],
    inclusions: ['Resort Stay', 'Breakfast', 'Airport Transfer', 'Tours', 'Spa Session'],
    exclusions: ['Flights', 'Lunch & Dinner', 'Visa', 'Personal Expenses'],
    travelType: ['Beaches', 'Culture', 'Nature', 'Adventure'],
    budget: 'Premium',
    safetyScore: 88,
    crowdLevel: 'Moderate',
    hotels: [
      { name: 'Ubud Rice Terrace Resort', stars: 4, price: 6000 },
      { name: 'Seminyak Beach Villas', stars: 4, price: 7500 }
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Bali', activities: ['Airport pickup', 'Hotel check-in', 'Seminyak Beach sunset', 'Welcome dinner'] },
      { day: 2, title: 'Ubud Exploration', activities: ['Rice Terraces', 'Monkey Forest', 'Ubud Market', 'Balinese cooking class'] },
      { day: 3, title: 'Temple Tour', activities: ['Tanah Lot Temple', 'Uluwatu Temple', 'Kecak Dance', 'Seafood dinner'] },
      { day: 4, title: 'Nusa Penida', activities: ['Speed boat to island', 'Kelingking Beach', 'Angel Billabong', 'Snorkeling'] },
      { day: 5, title: 'Adventure Day', activities: ['Mount Batur sunrise trek', 'Hot springs', 'Coffee plantation', 'Free afternoon'] },
      { day: 6, title: 'Leisure Day', activities: ['Spa morning', 'Water sports', 'Beach afternoon', 'Farewell dinner'] },
      { day: 7, title: 'Departure', activities: ['Breakfast', 'Souvenir shopping', 'Airport drop'] }
    ],
    reviews: [
      { user: 'Neha G.', rating: 5, comment: 'Bali is truly magical! The sunrise trek was worth every step.' },
      { user: 'Amit J.', rating: 5, comment: 'Perfect mix of adventure and relaxation.' }
    ]
  },
  {
    id: 'kerala-backwaters',
    name: 'Kerala Backwaters',
    destination: 'kerala',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&q=80',
    duration: '5 Days / 4 Nights',
    days: 5,
    rating: 4.7,
    originalPrice: 27999,
    price: 19999,
    highlights: ['Houseboat Stay', 'Munnar Tea Gardens', 'Kovalam Beach', 'Kathakali Show', 'Ayurvedic Spa'],
    inclusions: ['Hotel/Houseboat Stay', 'All Meals', 'Transport', 'Activities', 'Spa'],
    exclusions: ['Flights', 'Personal Expenses', 'Travel Insurance'],
    travelType: ['Nature', 'Beaches', 'Culture', 'Family'],
    budget: 'Moderate',
    safetyScore: 92,
    crowdLevel: 'Moderate',
    hotels: [
      { name: 'Backwater Houseboat', stars: 4, price: 5500 },
      { name: 'Kovalam Beach Resort', stars: 4, price: 4500 }
    ],
    itinerary: [
      { day: 1, title: 'Arrival & Munnar', activities: ['Airport pickup', 'Drive to Munnar', 'Tea plantation visit', 'Hotel check-in'] },
      { day: 2, title: 'Munnar Sightseeing', activities: ['Eravikulam Park', 'Tea Museum', 'Waterfall trek', 'Photo point'] },
      { day: 3, title: 'Houseboat Experience', activities: ['Drive to Alleppey', 'Board houseboat', 'Backwater cruise', 'Night on houseboat'] },
      { day: 4, title: 'Beach & Culture', activities: ['Morning backwater ride', 'Drive to Kovalam', 'Beach time', 'Kathakali show'] },
      { day: 5, title: 'Departure', activities: ['Ayurvedic spa session', 'Airport drop'] }
    ],
    reviews: [
      { user: 'Deepa R.', rating: 5, comment: 'God\'s Own Country lives up to its name! Houseboat was incredible.' },
      { user: 'Rohan K.', rating: 4, comment: 'Great experience. Munnar tea gardens are stunning.' }
    ]
  },
  {
    id: 'jaipur-heritage',
    name: 'Jaipur Heritage Walk',
    destination: 'jaipur',
    image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&q=80',
    duration: '3 Days / 2 Nights',
    days: 3,
    rating: 4.5,
    originalPrice: 12999,
    price: 8999,
    highlights: ['Amber Fort', 'Hawa Mahal', 'City Palace', 'Block Printing', 'Rajasthani Cuisine'],
    inclusions: ['Heritage Hotel', 'Breakfast & Dinner', 'Transport', 'Guided Tours', 'Cooking Class'],
    exclusions: ['Flights/Train', 'Lunch', 'Personal Expenses'],
    travelType: ['History', 'Culture', 'Food', 'Photography'],
    budget: 'Budget',
    safetyScore: 85,
    crowdLevel: 'High',
    hotels: [
      { name: 'Samode Haveli', stars: 5, price: 8000 },
      { name: 'Hotel Pearl Palace', stars: 3, price: 2200 }
    ],
    itinerary: [
      { day: 1, title: 'Pink City Tour', activities: ['Airport/station pickup', 'City Palace', 'Jantar Mantar', 'Hawa Mahal', 'Bazaar walk'] },
      { day: 2, title: 'Fort Day', activities: ['Amber Fort', 'Elephant ride', 'Nahargarh Fort', 'Block printing workshop', 'Farewell dinner'] },
      { day: 3, title: 'Departure', activities: ['Jal Mahal visit', 'Souvenir shopping', 'Drop off'] }
    ],
    reviews: [
      { user: 'Shruti V.', rating: 5, comment: 'Rich cultural experience! The heritage hotel was stunning.' },
      { user: 'Karan B.', rating: 4, comment: 'Great for a short getaway. Amber Fort is magnificent.' }
    ]
  },
  {
    id: 'ladakh-expedition',
    name: 'Ladakh Expedition',
    destination: 'ladakh',
    image: '/images/ladakh-tour-package.jpg',
    duration: '8 Days / 7 Nights',
    days: 8,
    rating: 4.9,
    originalPrice: 45999,
    price: 34999,
    highlights: ['Pangong Lake', 'Nubra Valley', 'Khardung La', 'Monasteries', 'River Rafting'],
    inclusions: ['Hotel Stay', 'All Meals', '4x4 Transport', 'Permits', 'Camping'],
    exclusions: ['Flights', 'Personal Expenses', 'Insurance', 'Optional Activities'],
    travelType: ['Mountains', 'Adventure', 'Photography'],
    budget: 'Premium',
    safetyScore: 80,
    crowdLevel: 'Low',
    hotels: [
      { name: 'Pangong Camp Resort', stars: 3, price: 3500 },
      { name: 'Leh Grand Hotel', stars: 3, price: 3000 }
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Leh', activities: ['Airport pickup', 'Acclimatization', 'Leh Palace', 'Shanti Stupa'] },
      { day: 2, title: 'Leh Local', activities: ['Thiksey Monastery', 'Shey Palace', 'Hemis Monastery', 'Market'] },
      { day: 3, title: 'Khardung La & Nubra', activities: ['Khardung La Pass', 'Desert safari', 'Monastery', 'Camp stay'] },
      { day: 4, title: 'Nubra to Pangong', activities: ['Morning at Nubra', 'Drive to Pangong', 'Lake visit', 'Camping'] },
      { day: 5, title: 'Pangong Lake', activities: ['Sunrise at lake', 'Lake exploration', 'Photography', 'Camp activities'] },
      { day: 6, title: 'Return to Leh', activities: ['Morning departure', 'Chang La Pass', 'Hemis visit', 'Leh hotel'] },
      { day: 7, title: 'Rafting & Shopping', activities: ['River rafting', 'Market shopping', 'Farewell dinner', 'Packing'] },
      { day: 8, title: 'Departure', activities: ['Airport drop'] }
    ],
    reviews: [
      { user: 'Mohan L.', rating: 5, comment: 'Life-changing experience! Pangong Lake is beyond words.' },
      { user: 'Pooja S.', rating: 5, comment: 'Challenging but absolutely worth it. Best trip of my life.' }
    ]
  },
  {
    id: 'singapore-family',
    name: 'Singapore Family Fun',
    destination: 'singapore',
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&q=80',
    duration: '5 Days / 4 Nights',
    days: 5,
    rating: 4.8,
    originalPrice: 75999,
    price: 54999,
    highlights: ['Universal Studios', 'Gardens by the Bay', 'Sentosa Island', 'Night Safari', 'Marina Bay'],
    inclusions: ['4 Star Hotel', 'Breakfast', 'Airport Transfer', 'Attraction Passes', 'City Tour'],
    exclusions: ['Flights', 'Visa', 'Lunch & Dinner', 'Personal Expenses'],
    travelType: ['Family', 'Entertainment', 'Culture', 'Food'],
    budget: 'Premium',
    safetyScore: 96,
    crowdLevel: 'Moderate',
    hotels: [
      { name: 'Marina Bay Sands', stars: 5, price: 18000 },
      { name: 'Orchard Hotel', stars: 4, price: 8000 }
    ],
    itinerary: [
      { day: 1, title: 'Welcome to Singapore', activities: ['Airport pickup', 'Marina Bay Sands', 'Gardens by the Bay', 'Light show'] },
      { day: 2, title: 'Universal Studios', activities: ['Full day at USS', 'Theme park rides', 'Shows', 'City Walk dining'] },
      { day: 3, title: 'Sentosa Island', activities: ['Cable car ride', 'S.E.A. Aquarium', 'Adventure Cove', 'Beach time'] },
      { day: 4, title: 'Culture & Safari', activities: ['Chinatown', 'Little India', 'Night Safari', 'River cruise'] },
      { day: 5, title: 'Departure', activities: ['Breakfast', 'Orchard Road shopping', 'Airport drop'] }
    ],
    reviews: [
      { user: 'Family Sharma', rating: 5, comment: 'Kids had the time of their lives! Universal Studios was amazing.' },
      { user: 'Divya M.', rating: 5, comment: 'Perfect family destination. So much to do for everyone.' }
    ]
  },
  {
    id: 'paris-romance',
    name: 'Paris Romance',
    destination: 'paris',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80',
    duration: '5 Days / 4 Nights',
    days: 5,
    rating: 4.7,
    originalPrice: 95999,
    price: 72999,
    highlights: ['Eiffel Tower', 'Louvre Museum', 'Seine Cruise', 'Montmartre', 'Versailles Day Trip'],
    inclusions: ['Boutique Hotel', 'Breakfast', 'Airport Transfer', 'Museum Passes', 'Cruise'],
    exclusions: ['Flights', 'Visa', 'Lunch & Dinner', 'Personal Expenses'],
    travelType: ['Culture', 'History', 'Romance', 'Food'],
    budget: 'Luxury',
    safetyScore: 82,
    crowdLevel: 'High',
    hotels: [
      { name: 'Hôtel Le Marais', stars: 4, price: 12000 },
      { name: 'Boutique Montmartre', stars: 3, price: 7000 }
    ],
    itinerary: [
      { day: 1, title: 'Bonjour Paris', activities: ['Airport pickup', 'Hotel check-in', 'Seine Cruise', 'Eiffel Tower night view'] },
      { day: 2, title: 'Art & History', activities: ['Louvre Museum', 'Tuileries Garden', 'Palais Royal', 'Latin Quarter walk'] },
      { day: 3, title: 'Montmartre & Culture', activities: ['Sacré-Cœur', 'Montmartre walk', 'Artists square', 'Wine tasting dinner'] },
      { day: 4, title: 'Versailles Day Trip', activities: ['Palace of Versailles', 'Gardens', 'Fountain show', 'Return to Paris'] },
      { day: 5, title: 'Departure', activities: ['Champs-Élysées walk', 'Souvenir shopping', 'Airport drop'] }
    ],
    reviews: [
      { user: 'Aisha K.', rating: 5, comment: 'Romantic beyond words! Eiffel Tower at night was magical.' },
      { user: 'Rohan P.', rating: 4, comment: 'Beautiful city. The museum pass saved so much time.' }
    ]
  }
];

export const getPackageById = (id) => packages.find(p => p.id === id);

export const getPackagesByDestination = (destId) => packages.filter(p => p.destination === destId);
