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
  },
  {
    id: 'varanasi-spiritual',
    name: 'Varanasi Spiritual Retreat',
    destination: 'varanasi',
    image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800&q=80',
    duration: '3 Days / 2 Nights',
    days: 3,
    rating: 4.7,
    originalPrice: 12499,
    price: 8999,
    highlights: ['Ganga Aarti', 'Sunrise Boat Ride', 'Kashi Vishwanath', 'Sarnath Visit', 'Silk & Banarasi Weave'],
    inclusions: ['Hotel Stay', 'Breakfast', 'Boat Rides', 'Guided Ghat Walk', 'Temple Tour'],
    exclusions: ['Flights/Train', 'Lunch & Dinner', 'Personal Expenses'],
    travelType: ['Spiritual', 'Culture', 'History'],
    budget: 'Budget',
    safetyScore: 76,
    crowdLevel: 'High',
    hotels: [
      { name: 'BrijRama Palace', stars: 4, price: 7500 },
      { name: 'Hotel Surya', stars: 3, price: 2500 }
    ],
    itinerary: [
      { day: 1, title: 'Arrival & Aarti', activities: ['Station/airport pickup', 'Hotel check-in', 'Ghat walk', 'Ganga Aarti'] },
      { day: 2, title: 'Temples & Sarnath', activities: ['Sunrise boat ride', 'Kashi Vishwanath', 'Sarnath tour', 'Weaver workshop'] },
      { day: 3, title: 'Departure', activities: ['Breakfast', 'Silk shopping', 'Drop off'] }
    ],
    reviews: [
      { user: 'Meera I.', rating: 5, comment: 'The Ganga Aarti was unforgettable. Truly spiritual.' },
      { user: 'Kunal D.', rating: 4, comment: 'Great experience. Boat ride at sunrise is a must.' }
    ]
  },
  {
    id: 'rishikesh-adventure',
    name: 'Rishikesh Adventure & Yoga',
    destination: 'rishikesh',
    image: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=800&q=80',
    duration: '4 Days / 3 Nights',
    days: 4,
    rating: 4.6,
    originalPrice: 18999,
    price: 13499,
    highlights: ['River Rafting', 'Bungee Jump', 'Yoga Retreat', 'Beach Camping', 'Beatles Ashram'],
    inclusions: ['Camp Stay', 'All Meals', 'Activities', 'Transport', 'Instructor'],
    exclusions: ['Flights/Train', 'Lunch & Dinner', 'Personal Expenses', 'Insurance'],
    travelType: ['Adventure', 'Wellness', 'Nature'],
    budget: 'Moderate',
    safetyScore: 88,
    crowdLevel: 'Moderate',
    hotels: [
      { name: 'Taj Rishikesh Resort', stars: 5, price: 10000 },
      { name: 'Green Hotel Tapovan', stars: 3, price: 2800 }
    ],
    itinerary: [
      { day: 1, title: 'Arrival & Ganges', activities: ['Pickup', 'Check-in', 'Lakshman Jhula', 'Triveni Ghat aarti'] },
      { day: 2, title: 'Adventure Day', activities: ['River rafting', 'Cliff jumping', 'Beach side lunch', 'Campfire'] },
      { day: 3, title: 'Thrills & Peace', activities: ['Bungee jump', 'Yoga session', 'Beatles Ashram', 'Evening meditation'] },
      { day: 4, title: 'Departure', activities: ['Breakfast', 'Neelkanth visit', 'Drop'] }
    ],
    reviews: [
      { user: 'Rahul V.', rating: 5, comment: 'Rafting was thrilling and the yoga was calming. Perfect mix.' },
      { user: 'Sneha K.', rating: 4, comment: 'Great adventure trip. Campfire by the river was magical.' }
    ]
  },
  {
    id: 'darjeeling-tea-trails',
    name: 'Darjeeling Tea Trails',
    destination: 'darjeeling',
    image: 'https://images.unsplash.com/photo-1507124484497-b7f446e65519?w=800&q=80',
    duration: '4 Days / 3 Nights',
    days: 4,
    rating: 4.6,
    originalPrice: 20999,
    price: 15499,
    highlights: ['Tiger Hill Sunrise', 'Toy Train', 'Tea Estate Tour', 'Batasia Loop', 'Kanchenjunga View'],
    inclusions: ['Heritage Hotel', 'Breakfast', 'Toy Train Ticket', 'Tea Tasting', 'Sightseeing'],
    exclusions: ['Flights', 'Lunch & Dinner', 'Personal Expenses'],
    travelType: ['Mountains', 'Nature', 'Tea', 'Heritage'],
    budget: 'Moderate',
    safetyScore: 91,
    crowdLevel: 'Low',
    hotels: [
      { name: 'Glenburn Tea Estate', stars: 4, price: 9500 },
      { name: 'Mayfair Darjeeling', stars: 4, price: 7000 }
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Hills', activities: ['Pickup from NJP/Bagdogra', 'Scenic drive', 'Check-in', 'Mall Road stroll'] },
      { day: 2, title: 'Sunrise & Tea', activities: ['Tiger Hill sunrise', 'Batasia Loop', 'Tea estate tour', 'Tea tasting'] },
      { day: 3, title: 'Toy Train & Culture', activities: ['Toy train ride', 'Peace Pagoda', 'Zoo', 'Local market'] },
      { day: 4, title: 'Departure', activities: ['Breakfast', 'Souvenir shopping', 'Drop'] }
    ],
    reviews: [
      { user: 'Ananya G.', rating: 5, comment: 'Toy train ride was a dream! Tea tasting at the estate was lovely.' },
      { user: 'Vikram S.', rating: 4, comment: 'Stunning views of Kanchenjunga. Very peaceful.' }
    ]
  },
  {
    id: 'agra-iconic',
    name: 'Agra & the Taj',
    destination: 'agra',
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&q=80',
    duration: '2 Days / 1 Night',
    days: 2,
    rating: 4.5,
    originalPrice: 9999,
    price: 6999,
    highlights: ['Taj Mahal Sunrise', 'Agra Fort', 'Mehtab Bagh', 'Marble Inlay', 'Mughlai Dinner'],
    inclusions: ['Hotel Stay', 'Breakfast', 'Guided Tours', 'Transfers', 'Entry Tickets'],
    exclusions: ['Flights/Train', 'Lunch & Dinner', 'Personal Expenses'],
    travelType: ['History', 'Architecture', 'Romance', 'Photography'],
    budget: 'Budget',
    safetyScore: 74,
    crowdLevel: 'High',
    hotels: [
      { name: 'ITC Mughal, Agra', stars: 5, price: 12000 },
      { name: 'Tajview Hotel', stars: 3, price: 3200 }
    ],
    itinerary: [
      { day: 1, title: 'Forts & Markets', activities: ['Pickup', 'Agra Fort', 'Mehtab Bagh sunset', 'Kinari Bazaar'] },
      { day: 2, title: 'Taj Sunrise', activities: ['Taj Mahal sunrise visit', 'Marble inlay demo', 'Breakfast', 'Drop'] }
    ],
    reviews: [
      { user: 'Nisha T.', rating: 5, comment: 'Seeing the Taj at sunrise was worth everything. Magical!' },
      { user: 'Arvind K.', rating: 4, comment: 'Well organized. Mughlai dinner was delicious.' }
    ]
  },
  {
    id: 'amritsar-spiritual',
    name: 'Amritsar Golden Temple',
    destination: 'amritsar',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80',
    duration: '2 Days / 1 Night',
    days: 2,
    rating: 4.8,
    originalPrice: 9999,
    price: 6999,
    highlights: ['Golden Temple', 'Langar Experience', 'Wagah Border Ceremony', 'Partition Museum', 'Punjabi Food'],
    inclusions: ['Hotel Stay', 'Breakfast & Dinner', 'Transfers', 'Guided Temple Tour', 'Wagah Transfer'],
    exclusions: ['Flights', 'Lunch', 'Personal Expenses'],
    travelType: ['Spiritual', 'History', 'Food'],
    budget: 'Budget',
    safetyScore: 89,
    crowdLevel: 'High',
    hotels: [
      { name: 'Hyatt Regency Amritsar', stars: 5, price: 9000 },
      { name: 'Hotel Grand Imperial', stars: 4, price: 5500 }
    ],
    itinerary: [
      { day: 1, title: 'Darbar Sahib', activities: ['Pickup from airport/station', 'Golden Temple visit', 'Langar experience', 'Evening Palki'] },
      { day: 2, title: 'Border & Museum', activities: ['Wagah Border ceremony', 'Partition Museum', 'Amritsari lunch', 'Drop'] }
    ],
    reviews: [
      { user: 'Jaspreet B.', rating: 5, comment: 'The Golden Temple is breathtaking. The langar was humbling.' },
      { user: 'Rohan T.', rating: 5, comment: 'Wagah border ceremony gave me goosebumps. Highly recommend.' }
    ]
  },
  {
    id: 'coorg-serene',
    name: 'Coorg Serene Highlands',
    destination: 'coorg',
    image: 'https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?w=800&q=80',
    duration: '3 Days / 2 Nights',
    days: 3,
    rating: 4.7,
    originalPrice: 17999,
    price: 12499,
    highlights: ['Coffee Estate Stay', 'Abbey Falls', 'Elephant Camp', 'River Rafting', 'Homestay Bonfire'],
    inclusions: ['Estate Stay', 'All Meals', 'Safari', 'Activities', 'Transport'],
    exclusions: ['Flights/Train', 'Personal Expenses', 'Insurance'],
    travelType: ['Nature', 'Family', 'Adventure', 'Coffee'],
    budget: 'Moderate',
    safetyScore: 94,
    crowdLevel: 'Low',
    hotels: [
      { name: 'Evolve Back, Coorg', stars: 5, price: 14000 },
      { name: 'Coorg Coffee Farm House', stars: 3, price: 3500 }
    ],
    itinerary: [
      { day: 1, title: 'Estate Arrival', activities: ['Pickup from Mysore/Coorg', 'Coffee plantation walk', 'Estate check-in', 'Bonfire'] },
      { day: 2, title: 'Falls & Elephants', activities: ['Abbey Falls', 'Dubare elephants', 'River rafting', 'Raja\'s Seat'] },
      { day: 3, title: 'Departure', activities: ['Mandalpatti sunrise', 'Breakfast', 'Drop'] }
    ],
    reviews: [
      { user: 'Priyanka N.', rating: 5, comment: 'Waking up to coffee plantation mist was dreamlike.' },
      { user: 'Aditya R.', rating: 4, comment: 'Great family trip. Elephant bathing was the highlight.' }
    ]
  },
  {
    id: 'andaman-island',
    name: 'Andaman Island Escape',
    destination: 'andaman',
    image: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800&q=80',
    duration: '5 Days / 4 Nights',
    days: 5,
    rating: 4.8,
    originalPrice: 45999,
    price: 32999,
    highlights: ['Radhanagar Beach', 'Scuba Diving', 'Cellular Jail', 'Ross Island', 'Island Hopping'],
    inclusions: ['Resort Stay', 'Breakfast', 'Ferry Tickets', 'Diving Session', 'Transfers'],
    exclusions: ['Flights', 'Lunch & Dinner', 'Personal Expenses', 'Insurance'],
    travelType: ['Beaches', 'Adventure', 'Nature', 'Family'],
    budget: 'Premium',
    safetyScore: 86,
    crowdLevel: 'Low',
    hotels: [
      { name: 'Radisson Blu Resort', stars: 5, price: 11000 },
      { name: 'Sinclairs Bayview', stars: 4, price: 7000 }
    ],
    itinerary: [
      { day: 1, title: 'Arrival & Jail', activities: ['Airport pickup', 'Cellular Jail', 'Light & sound show', 'Check-in'] },
      { day: 2, title: 'Havelock', activities: ['Ferry to Havelock', 'Radhanagar Beach', 'Sunset'] },
      { day: 3, title: 'Underwater Day', activities: ['Scuba diving', 'Kalapathar Beach', 'Snorkeling'] },
      { day: 4, title: 'Ross & Back', activities: ['Ross Island', 'Return to Port Blair', 'Local market'] },
      { day: 5, title: 'Departure', activities: ['Breakfast', 'Chidiya Tapu', 'Airport drop'] }
    ],
    reviews: [
      { user: 'Sanya M.', rating: 5, comment: 'Scuba diving changed my life! Radhanagar is paradise.' },
      { user: 'Kunal G.', rating: 5, comment: 'Perfect island getaway. Crystal clear water everywhere.' }
    ]
  },
  {
    id: 'jaisalmer-desert',
    name: 'Jaisalmer Desert Nights',
    destination: 'jaisalmer',
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&q=80',
    duration: '3 Days / 2 Nights',
    days: 3,
    rating: 4.6,
    originalPrice: 15999,
    price: 11499,
    highlights: ['Camel Safari', 'Sam Sand Dunes', 'Fort Stay', 'Desert Camping', 'Folk Night'],
    inclusions: ['Fort Stay', 'Camel Safari', 'Dune Camping', 'All Meals', 'Folk Performance'],
    exclusions: ['Flights', 'Personal Expenses', 'Insurance', 'Balloon Ride'],
    travelType: ['Desert', 'Adventure', 'Culture', 'Photography'],
    budget: 'Moderate',
    safetyScore: 84,
    crowdLevel: 'Moderate',
    hotels: [
      { name: 'Suryagarh Jaisalmer', stars: 5, price: 12000 },
      { name: 'Desert Heritage Haveli', stars: 3, price: 3000 }
    ],
    itinerary: [
      { day: 1, title: 'Golden City', activities: ['Pickup', 'Jaisalmer Fort tour', 'Patwon Ki Haveli', 'Gadisar Lake'] },
      { day: 2, title: 'Dune Day', activities: ['Sam Sand Dunes', 'Camel safari', 'Desert camping', 'Folk music night'] },
      { day: 3, title: 'Departure', activities: ['Dune sunrise', 'Breakfast', 'Drop'] }
    ],
    reviews: [
      { user: 'Devika S.', rating: 5, comment: 'Sleeping under the stars in the desert is unreal.' },
      { user: 'Ankit P.', rating: 4, comment: 'Great value. The folk night was a lovely touch.' }
    ]
  },
  {
    id: 'bangkok-city',
    name: 'Bangkok City Break',
    destination: 'bangkok',
    image: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800&q=80',
    duration: '4 Days / 3 Nights',
    days: 4,
    rating: 4.7,
    originalPrice: 58999,
    price: 42999,
    highlights: ['Grand Palace', 'Wat Arun', 'Street Food Tour', 'Floating Market', 'Rooftop Bar'],
    inclusions: ['4 Star Hotel', 'Breakfast', 'City Tours', 'Airport Transfers', 'Boat Ride'],
    exclusions: ['Flights', 'Visa', 'Lunch & Dinner', 'Personal Expenses'],
    travelType: ['Food', 'Culture', 'Shopping', 'Family'],
    budget: 'Premium',
    safetyScore: 91,
    crowdLevel: 'High',
    hotels: [
      { name: 'Lebua State Tower', stars: 5, price: 14000 },
      { name: 'Bangkok City Hotel', stars: 4, price: 6500 }
    ],
    itinerary: [
      { day: 1, title: 'Welcome to Bangkok', activities: ['Airport pickup', 'Grand Palace', 'Wat Pho', 'Rooftop sunset'] },
      { day: 2, title: 'Temples & River', activities: ['Wat Arun', 'Boat ride on Chao Phraya', 'Jim Thompson House', 'Night market'] },
      { day: 3, title: 'Markets & Food', activities: ['Floating market', 'Chatuchak market', 'Street food tour', 'Thai massage'] },
      { day: 4, title: 'Departure', activities: ['Breakfast', 'Shopping', 'Airport drop'] }
    ],
    reviews: [
      { user: 'Harsh V.', rating: 5, comment: 'Street food tour was incredible. Bangkok is a food lover\'s dream.' },
      { user: 'Sakshi J.', rating: 4, comment: 'Great trip. Grand Palace is a must-see.' }
    ]
  },
  {
    id: 'istanbul-cultural',
    name: 'Istanbul Cultural Odyssey',
    destination: 'istanbul',
    image: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=800&q=80',
    duration: '5 Days / 4 Nights',
    days: 5,
    rating: 4.8,
    originalPrice: 75999,
    price: 55999,
    highlights: ['Hagia Sophia', 'Blue Mosque', 'Bosphorus Cruise', 'Grand Bazaar', 'Hammam'],
    inclusions: ['Boutique Hotel', 'Breakfast', 'Museum Passes', 'Bosphorus Cruise', 'Airport Transfers'],
    exclusions: ['Flights', 'Visa', 'Lunch & Dinner', 'Personal Expenses'],
    travelType: ['History', 'Culture', 'Food', 'Architecture'],
    budget: 'Premium',
    safetyScore: 88,
    crowdLevel: 'High',
    hotels: [
      { name: 'Hagia Sofia Mansions', stars: 5, price: 16000 },
      { name: 'Ottoman Hotel Imperial', stars: 4, price: 9000 }
    ],
    itinerary: [
      { day: 1, title: 'Two Continents', activities: ['Airport pickup', 'Hagia Sophia', 'Blue Mosque', 'Sultanahmet walk'] },
      { day: 2, title: 'Palaces & Cisterns', activities: ['Topkapi Palace', 'Basilica Cistern', 'Suleymaniye Mosque', 'Turkish tea'] },
      { day: 3, title: 'Bosphorus Day', activities: ['Bosphorus cruise', 'Dolmabahce Palace', 'Ortakoy bazaar', 'Seafood dinner'] },
      { day: 4, title: 'Bazaars & Hammam', activities: ['Grand Bazaar', 'Spice Bazaar', 'Hammam experience', 'Galata tower rooftop'] },
      { day: 5, title: 'Departure', activities: ['Breakfast', 'Mosaic museum', 'Airport drop'] }
    ],
    reviews: [
      { user: 'Kabir M.', rating: 5, comment: 'History at every corner. The Bosphorus cruise was stunning.' },
      { user: 'Anita L.', rating: 5, comment: 'Hammam experience was the perfect ending. Loved Istanbul!' }
    ]
  }
];

export const getPackageById = (id) => packages.find(p => p.id === id);

export const getPackagesByDestination = (destId) => packages.filter(p => p.destination === destId);
