export const hotels = [
  {
    id: 'goa-beach-resort',
    name: 'Goa Beach Resort',
    destination: 'goa',
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80',
    location: 'Baga Beach, Goa',
    rating: 4.6,
    stars: 4,
    pricePerNight: 4500,
    amenities: ['Wi-Fi', 'Pool', 'Restaurant', 'Spa', 'Beach Access', 'Room Service'],
    rooms: [
      { type: 'Deluxe Room', price: 4500, capacity: 2, available: true },
      { type: 'Suite', price: 7500, capacity: 3, available: true },
      { type: 'Beach Villa', price: 12000, capacity: 4, available: false }
    ],
    policies: { checkIn: '2:00 PM', checkOut: '11:00 AM', cancellation: 'Free cancellation up to 48 hours before check-in' },
    reviews: [
      { user: 'Priya S.', rating: 5, comment: 'Stunning beachfront property. Staff was very attentive.' },
      { user: 'Rahul M.', rating: 4, comment: 'Great location, good food. Pool area could be cleaner.' }
    ],
    safetyScore: 90
  },
  {
    id: 'mountain-view-resort',
    name: 'Mountain View Resort',
    destination: 'manali',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80',
    location: 'Old Manali, Himachal Pradesh',
    rating: 4.5,
    stars: 4,
    pricePerNight: 4000,
    amenities: ['Wi-Fi', 'Restaurant', 'Mountain View', 'Fireplace', 'Parking', 'Garden'],
    rooms: [
      { type: 'Valley View Room', price: 4000, capacity: 2, available: true },
      { type: 'Family Suite', price: 6500, capacity: 4, available: true },
      { type: 'Premium Cottage', price: 9000, capacity: 2, available: true }
    ],
    policies: { checkIn: '1:00 PM', checkOut: '11:00 AM', cancellation: 'Free cancellation up to 24 hours before check-in' },
    reviews: [
      { user: 'Arjun P.', rating: 5, comment: 'Breathtaking views! The fireplace in the room was so cozy.' },
      { user: 'Sneha R.', rating: 4, comment: 'Perfect location in Old Manali. Food was excellent.' }
    ],
    safetyScore: 92
  },
  {
    id: 'kashmir-heritage-hotel',
    name: 'Kashmir Heritage Hotel',
    destination: 'kashmir',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
    location: 'Dal Lake, Srinagar',
    rating: 4.7,
    stars: 4,
    pricePerNight: 5500,
    amenities: ['Wi-Fi', 'Restaurant', 'Lake View', 'Room Service', 'Garden', 'Cultural Programs'],
    rooms: [
      { type: 'Lake View Room', price: 5500, capacity: 2, available: true },
      { type: 'Heritage Suite', price: 8500, capacity: 2, available: true },
      { type: 'Royal Suite', price: 14000, capacity: 3, available: true }
    ],
    policies: { checkIn: '2:00 PM', checkOut: '12:00 PM', cancellation: 'Free cancellation up to 48 hours before check-in' },
    reviews: [
      { user: 'Anjali K.', rating: 5, comment: 'Waking up to Dal Lake view was incredible. Beautiful property.' },
      { user: 'Dev M.', rating: 5, comment: 'True heritage experience. The cultural program was wonderful.' }
    ],
    safetyScore: 85
  },
  {
    id: 'dubai-palm-resort',
    name: 'Atlantis The Palm',
    destination: 'dubai',
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80',
    location: 'Palm Jumeirah, Dubai',
    rating: 4.9,
    stars: 5,
    pricePerNight: 15000,
    amenities: ['Wi-Fi', 'Pool', 'Spa', 'Waterpark', 'Beach Access', 'Restaurant', 'Gym', 'Room Service'],
    rooms: [
      { type: 'Ocean Room', price: 15000, capacity: 2, available: true },
      { type: 'Club Suite', price: 25000, capacity: 2, available: true },
      { type: 'Royal Bridge Suite', price: 85000, capacity: 4, available: true }
    ],
    policies: { checkIn: '3:00 PM', checkOut: '12:00 PM', cancellation: 'Free cancellation up to 72 hours before check-in' },
    reviews: [
      { user: 'Sanjay T.', rating: 5, comment: 'Absolutely world-class. The waterpark access is a huge bonus.' },
      { user: 'Pooja N.', rating: 5, comment: 'Luxury at its finest. Worth every penny for the experience.' }
    ],
    safetyScore: 98
  },
  {
    id: 'ubud-rice-resort',
    name: 'Ubud Rice Terrace Resort',
    destination: 'bali',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80',
    location: 'Ubud, Bali',
    rating: 4.6,
    stars: 4,
    pricePerNight: 6000,
    amenities: ['Wi-Fi', 'Pool', 'Spa', 'Restaurant', 'Yoga', 'Garden', 'Rice Terrace View'],
    rooms: [
      { type: 'Garden Suite', price: 6000, capacity: 2, available: true },
      { type: 'Rice Terrace Villa', price: 9500, capacity: 2, available: true },
      { type: 'Infinity Pool Villa', price: 14000, capacity: 3, available: false }
    ],
    policies: { checkIn: '2:00 PM', checkOut: '11:00 AM', cancellation: 'Free cancellation up to 48 hours before check-in' },
    reviews: [
      { user: 'Neha G.', rating: 5, comment: 'Paradise! Waking up to rice terrace views was magical.' },
      { user: 'Karan S.', rating: 4, comment: 'Beautiful property. The yoga sessions were a highlight.' }
    ],
    safetyScore: 90
  },
  {
    id: 'agra-taj-hotel',
    name: 'The Oberoi Amarvilas',
    destination: 'jaipur',
    image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80',
    location: 'Near Taj Mahal, Agra',
    rating: 4.8,
    stars: 5,
    pricePerNight: 18000,
    amenities: ['Wi-Fi', 'Pool', 'Spa', 'Restaurant', 'Taj View', 'Gym', 'Room Service', 'Bar'],
    rooms: [
      { type: 'Luxury Room', price: 18000, capacity: 2, available: true },
      { type: 'Kohinoor Suite', price: 35000, capacity: 2, available: true },
      { type: 'Grand Suite', price: 55000, capacity: 3, available: true }
    ],
    policies: { checkIn: '2:00 PM', checkOut: '12:00 PM', cancellation: 'Free cancellation up to 72 hours before check-in' },
    reviews: [
      { user: 'Amit J.', rating: 5, comment: 'Watching the Taj from our room was surreal. Impeccable service.' },
      { user: 'Ritu P.', rating: 5, comment: 'Worth the splurge. The Taj view from the pool is unmatched.' }
    ],
    safetyScore: 95
  },
  {
    id: 'jaipur-heritage-haveli',
    name: 'Samode Haveli',
    destination: 'jaipur',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80',
    location: 'Jaipur, Rajasthan',
    rating: 4.7,
    stars: 5,
    pricePerNight: 8000,
    amenities: ['Wi-Fi', 'Pool', 'Restaurant', 'Heritage Property', 'Spa', 'Cultural Programs', 'Garden'],
    rooms: [
      { type: 'Heritage Room', price: 8000, capacity: 2, available: true },
      { type: 'Royal Suite', price: 15000, capacity: 2, available: true },
      { type: 'Maharaja Suite', price: 25000, capacity: 3, available: true }
    ],
    policies: { checkIn: '2:00 PM', checkOut: '12:00 PM', cancellation: 'Free cancellation up to 48 hours before check-in' },
    reviews: [
      { user: 'Shruti V.', rating: 5, comment: 'Stepped back in time. The architecture is stunning.' },
      { user: 'Vikram R.', rating: 5, comment: 'True royal experience. Every corner is Instagram-worthy.' }
    ],
    safetyScore: 93
  },
  {
    id: 'kerala-backwater-houseboat',
    name: 'Kerala Backwater Houseboat',
    destination: 'kerala',
    image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80',
    location: 'Alleppey, Kerala',
    rating: 4.5,
    stars: 4,
    pricePerNight: 5500,
    amenities: ['Wi-Fi', 'Restaurant', 'Backwater View', 'Air Conditioning', 'Butler Service', 'Fishing Gear'],
    rooms: [
      { type: 'Deluxe Bedroom', price: 5500, capacity: 2, available: true },
      { type: 'Luxury Houseboat', price: 8500, capacity: 4, available: true },
      { type: 'Premium Cruiser', price: 12000, capacity: 6, available: false }
    ],
    policies: { checkIn: '12:00 PM', checkOut: '9:00 AM', cancellation: 'Free cancellation up to 72 hours before check-in' },
    reviews: [
      { user: 'Deepa R.', rating: 5, comment: 'Most unique stay ever! Waking up on the backwaters was magical.' },
      { user: 'Rajesh K.', rating: 4, comment: 'Great experience. Food on the houseboat was delicious.' }
    ],
    safetyScore: 88
  },
  {
    id: 'singapore-marina',
    name: 'Marina Bay Sands',
    destination: 'singapore',
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&q=80',
    location: 'Marina Bay, Singapore',
    rating: 4.9,
    stars: 5,
    pricePerNight: 18000,
    amenities: ['Wi-Fi', 'Infinity Pool', 'Spa', 'Casino', 'Restaurant', 'Shopping Mall', 'Gym', 'Room Service'],
    rooms: [
      { type: 'Deluxe Room', price: 18000, capacity: 2, available: true },
      { type: 'Sands Suite', price: 32000, capacity: 3, available: true },
      { type: 'Club Suite', price: 48000, capacity: 2, available: true }
    ],
    policies: { checkIn: '3:00 PM', checkOut: '11:00 AM', cancellation: 'Free cancellation up to 48 hours before check-in' },
    reviews: [
      { user: 'Family Sharma', rating: 5, comment: 'The infinity pool view is unreal. Kids loved the whole experience.' },
      { user: 'Divya M.', rating: 5, comment: 'Iconic hotel that lives up to the hype. Absolutely stunning.' }
    ],
    safetyScore: 97
  },
  {
    id: 'paris-boutique-hotel',
    name: 'Hôtel Le Marais',
    destination: 'paris',
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80',
    location: 'Le Marais, Paris',
    rating: 4.5,
    stars: 4,
    pricePerNight: 12000,
    amenities: ['Wi-Fi', 'Restaurant', 'Bar', 'Room Service', 'Concierge', 'Garden'],
    rooms: [
      { type: 'Classic Room', price: 12000, capacity: 2, available: true },
      { type: 'Superior Room', price: 16000, capacity: 2, available: true },
      { type: 'Junior Suite', price: 24000, capacity: 3, available: false }
    ],
    policies: { checkIn: '3:00 PM', checkOut: '11:00 AM', cancellation: 'Free cancellation up to 48 hours before check-in' },
    reviews: [
      { user: 'Aisha K.', rating: 5, comment: 'Charming boutique hotel in the heart of Le Marais. Loved it.' },
      { user: 'Marco L.', rating: 4, comment: 'Beautiful hotel, great location. Breakfast was excellent.' }
    ],
    safetyScore: 85
  },
  {
    id: 'ladakh-leh-hotel',
    name: 'Leh Grand Hotel',
    destination: 'ladakh',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80',
    location: 'Leh, Ladakh',
    rating: 4.2,
    stars: 3,
    pricePerNight: 3000,
    amenities: ['Wi-Fi', 'Restaurant', 'Mountain View', 'Room Service', 'Parking', 'Travel Desk'],
    rooms: [
      { type: 'Standard Room', price: 3000, capacity: 2, available: true },
      { type: 'Deluxe Room', price: 4500, capacity: 2, available: true },
      { type: 'Family Room', price: 6000, capacity: 4, available: true }
    ],
    policies: { checkIn: '12:00 PM', checkOut: '10:00 AM', cancellation: 'Free cancellation up to 24 hours before check-in' },
    reviews: [
      { user: 'Mohan L.', rating: 4, comment: 'Good base in Leh. Clean rooms and helpful staff.' },
      { user: 'Pooja S.', rating: 4, comment: 'Decent hotel. The mountain views are spectacular.' }
    ],
    safetyScore: 82
  },
  {
    id: 'mumbai-taj-mahal-palace',
    name: 'Taj Mahal Palace',
    destination: 'mumbai',
    image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80',
    location: 'Colaba, Mumbai',
    rating: 4.8,
    stars: 5,
    pricePerNight: 14000,
    amenities: ['Wi-Fi', 'Pool', 'Spa', 'Restaurant', 'Gym', 'Room Service', 'Harbour View', 'Bar'],
    rooms: [
      { type: 'Luxury Room', price: 14000, capacity: 2, available: true },
      { type: 'Harbour Suite', price: 28000, capacity: 2, available: true },
      { type: 'Presidential Suite', price: 65000, capacity: 3, available: true }
    ],
    policies: { checkIn: '2:00 PM', checkOut: '12:00 PM', cancellation: 'Free cancellation up to 48 hours before check-in' },
    reviews: [
      { user: 'Anand V.', rating: 5, comment: 'Iconic property with incredible history and service.' },
      { user: 'Sunita P.', rating: 5, comment: 'The harbour view from the room was breathtaking.' }
    ],
    safetyScore: 95
  },
  {
    id: 'brijrama-palace',
    name: 'BrijRama Palace',
    destination: 'varanasi',
    image: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=800&q=80',
    location: 'Dashashwamedh Ghat, Varanasi',
    rating: 4.8,
    stars: 4,
    pricePerNight: 7500,
    amenities: ['Wi-Fi', 'Ganges View', 'Restaurant', 'Heritage Property', 'Room Service', 'Spa'],
    rooms: [
      { type: 'Heritage Room', price: 7500, capacity: 2, available: true },
      { type: 'Ganges View Suite', price: 13000, capacity: 3, available: true },
      { type: 'Royal Pavilion', price: 24000, capacity: 4, available: false }
    ],
    policies: { checkIn: '2:00 PM', checkOut: '11:00 AM', cancellation: 'Free cancellation up to 48 hours before check-in' },
    reviews: [
      { user: 'Meera I.', rating: 5, comment: 'Watching the aarti from the palace was surreal. Heritage at its best.' },
      { user: 'Kunal D.', rating: 4, comment: 'Beautiful old palace. The Ganges view from the room is unmatched.' }
    ],
    safetyScore: 85
  },
  {
    id: 'taj-rishikesh-resort',
    name: 'Taj Rishikesh Resort',
    destination: 'rishikesh',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80',
    location: 'Tapovan, Rishikesh',
    rating: 4.9,
    stars: 5,
    pricePerNight: 10000,
    amenities: ['Wi-Fi', 'Pool', 'Spa', 'Ganges View', 'Yoga', 'Restaurant', 'Gym', 'Room Service'],
    rooms: [
      { type: 'Deluxe Room', price: 10000, capacity: 2, available: true },
      { type: 'River View Suite', price: 18000, capacity: 2, available: true },
      { type: 'Taj Villa', price: 30000, capacity: 4, available: true }
    ],
    policies: { checkIn: '2:00 PM', checkOut: '12:00 PM', cancellation: 'Free cancellation up to 72 hours before check-in' },
    reviews: [
      { user: 'Rahul V.', rating: 5, comment: 'Perfection by the Ganges. The infinity pool is stunning.' },
      { user: 'Sneha K.', rating: 5, comment: 'World-class spa and yoga sessions. Heavenly escape.' }
    ],
    safetyScore: 97
  },
  {
    id: 'glenburn-tea-estate',
    name: 'Glenburn Tea Estate',
    destination: 'darjeeling',
    image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=800&q=80',
    location: 'Peshok Road, Darjeeling',
    rating: 4.7,
    stars: 4,
    pricePerNight: 9500,
    amenities: ['Wi-Fi', 'Tea Estate', 'Mountain View', 'Restaurant', 'Guided Walks', 'Bonfire'],
    rooms: [
      { type: 'Estate Room', price: 9500, capacity: 2, available: true },
      { type: 'Butler Suite', price: 14000, capacity: 2, available: true },
      { type: 'Glenburn House', price: 26000, capacity: 6, available: false }
    ],
    policies: { checkIn: '1:00 PM', checkOut: '11:00 AM', cancellation: 'Free cancellation up to 48 hours before check-in' },
    reviews: [
      { user: 'Ananya G.', rating: 5, comment: 'Staying on a tea estate is magical. The walks are serene.' },
      { user: 'Vikram S.', rating: 4, comment: 'Beautiful colonial property with Kanchenjunga views.' }
    ],
    safetyScore: 93
  },
  {
    id: 'itc-mughal-agra',
    name: 'ITC Mughal, Agra',
    destination: 'agra',
    image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&q=80',
    location: 'Taj Ganj, Agra',
    rating: 4.7,
    stars: 5,
    pricePerNight: 12000,
    amenities: ['Wi-Fi', 'Pool', 'Spa', 'Restaurant', 'Garden', 'Gym', 'Room Service', 'Bar'],
    rooms: [
      { type: 'Mughal Room', price: 12000, capacity: 2, available: true },
      { type: 'Grand Suite', price: 22000, capacity: 3, available: true },
      { type: 'Royal Mughal Suite', price: 42000, capacity: 4, available: true }
    ],
    policies: { checkIn: '2:00 PM', checkOut: '12:00 PM', cancellation: 'Free cancellation up to 72 hours before check-in' },
    reviews: [
      { user: 'Nisha T.', rating: 5, comment: 'Mughal architecture everywhere. The gardens are beautiful.' },
      { user: 'Arvind K.', rating: 5, comment: 'Luxury near the Taj. Service was impeccable.' }
    ],
    safetyScore: 95
  },
  {
    id: 'hyatt-regency-amritsar',
    name: 'Hyatt Regency Amritsar',
    destination: 'amritsar',
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80',
    location: 'Ranjit Avenue, Amritsar',
    rating: 4.6,
    stars: 5,
    pricePerNight: 9000,
    amenities: ['Wi-Fi', 'Pool', 'Restaurant', 'Gym', 'Room Service', 'Bar', 'Spa'],
    rooms: [
      { type: 'King Room', price: 9000, capacity: 2, available: true },
      { type: 'Club Room', price: 13000, capacity: 2, available: true },
      { type: 'Presidential Suite', price: 26000, capacity: 4, available: true }
    ],
    policies: { checkIn: '2:00 PM', checkOut: '12:00 PM', cancellation: 'Free cancellation up to 48 hours before check-in' },
    reviews: [
      { user: 'Jaspreet B.', rating: 5, comment: 'Modern luxury close to the Golden Temple. Great pools.' },
      { user: 'Rohan T.', rating: 4, comment: 'Comfortable stay. Loved the Punjabi restaurant.' }
    ],
    safetyScore: 92
  },
  {
    id: 'evolve-back-coorg',
    name: 'Evolve Back, Coorg',
    destination: 'coorg',
    image: 'https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?w=800&q=80',
    location: 'Nalvath Estate, Coorg',
    rating: 4.8,
    stars: 5,
    pricePerNight: 14000,
    amenities: ['Wi-Fi', 'Pool', 'Spa', 'Coffee Estate', 'Restaurant', 'Nature Walk', 'Bonfire', 'Gym'],
    rooms: [
      { type: 'Estate Villa', price: 14000, capacity: 2, available: true },
      { type: 'Pool Villa', price: 22000, capacity: 3, available: true },
      { type: 'Royal Heritage Villa', price: 36000, capacity: 5, available: false }
    ],
    policies: { checkIn: '2:00 PM', checkOut: '11:00 AM', cancellation: 'Free cancellation up to 72 hours before check-in' },
    reviews: [
      { user: 'Priyanka N.', rating: 5, comment: 'Next-level luxury in the coffee estates. Best plunge shower.' },
      { user: 'Aditya R.', rating: 5, comment: 'Incredible villas. The nature walk felt like a dream.' }
    ],
    safetyScore: 98
  },
  {
    id: 'radisson-blu-andaman',
    name: 'Radisson Blu Resort',
    destination: 'andaman',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80',
    location: 'Corbyn\'s Cove, Port Blair',
    rating: 4.5,
    stars: 5,
    pricePerNight: 11000,
    amenities: ['Wi-Fi', 'Pool', 'Beach Access', 'Spa', 'Restaurant', 'Bar', 'Gym', 'Water Sports'],
    rooms: [
      { type: 'Deluxe Sea View', price: 11000, capacity: 2, available: true },
      { type: 'Junior Suite', price: 17000, capacity: 3, available: true },
      { type: 'Presidential Suite', price: 32000, capacity: 4, available: true }
    ],
    policies: { checkIn: '2:00 PM', checkOut: '11:00 AM', cancellation: 'Free cancellation up to 72 hours before check-in' },
    reviews: [
      { user: 'Sanya M.', rating: 5, comment: 'Pool with sea views. Perfect base for island hopping.' },
      { user: 'Kunal G.', rating: 4, comment: 'Great resort. The beach is a short walk away.' }
    ],
    safetyScore: 94
  },
  {
    id: 'lebua-bangkok',
    name: 'Lebua State Tower',
    destination: 'bangkok',
    image: 'https://images.unsplash.com/photo-1615460549969-36fa19521a4f?w=800&q=80',
    location: 'Silom, Bangkok',
    rating: 4.8,
    stars: 5,
    pricePerNight: 14000,
    amenities: ['Wi-Fi', 'Infinity Pool', 'Sky Bar', 'Spa', 'Restaurant', 'Gym', 'Room Service'],
    rooms: [
      { type: 'Tower Room', price: 14000, capacity: 2, available: true },
      { type: 'Suite', price: 24000, capacity: 2, available: true },
      { type: 'Jim Thompson Suite', price: 55000, capacity: 4, available: true }
    ],
    policies: { checkIn: '2:00 PM', checkOut: '12:00 PM', cancellation: 'Free cancellation up to 72 hours before check-in' },
    reviews: [
      { user: 'Harsh V.', rating: 5, comment: 'The sky bar view is unforgettable. Rooms are massive.' },
      { user: 'Sakshi J.', rating: 5, comment: 'Starwood luxury with a sky-high pool. Loved it.' }
    ],
    safetyScore: 96
  },
  {
    id: 'hagia-sofia-mansions',
    name: 'Hagia Sophia Mansions',
    destination: 'istanbul',
    image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80',
    location: 'Sultanahmet, Istanbul',
    rating: 4.8,
    stars: 5,
    pricePerNight: 16000,
    amenities: ['Wi-Fi', 'Ottoman Architecture', 'Restaurant', 'Spa', 'Bar', 'Room Service', 'Concierge'],
    rooms: [
      { type: 'Mansion Room', price: 16000, capacity: 2, available: true },
      { type: 'Sultan Suite', price: 28000, capacity: 3, available: true },
      { type: 'Imperial Suite', price: 52000, capacity: 4, available: true }
    ],
    policies: { checkIn: '2:00 PM', checkOut: '12:00 PM', cancellation: 'Free cancellation up to 48 hours before check-in' },
    reviews: [
      { user: 'Kabir M.', rating: 5, comment: 'Staying steps from Hagia Sophia is priceless.' },
      { user: 'Anita L.', rating: 5, comment: 'The Ottoman interiors took my breath away.' }
    ],
    safetyScore: 96
  },
  {
    id: 'suryagarh-jaisalmer',
    name: 'Suryagarh Jaisalmer',
    destination: 'jaisalmer',
    image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800&q=80',
    location: 'Sam Road, Jaisalmer',
    rating: 4.7,
    stars: 5,
    pricePerNight: 12000,
    amenities: ['Wi-Fi', 'Pool', 'Restaurant', 'Desert Camp', 'Room Service', 'Camel Safaris', 'Heritage Architecture'],
    rooms: [
      { type: 'Heritage Room', price: 12000, capacity: 2, available: true },
      { type: 'Sultan Suite', price: 20000, capacity: 3, available: true },
      { type: 'Palace Suite', price: 34000, capacity: 4, available: false }
    ],
    policies: { checkIn: '2:00 PM', checkOut: '11:00 AM', cancellation: 'Free cancellation up to 72 hours before check-in' },
    reviews: [
      { user: 'Devika S.', rating: 5, comment: 'A palace in the desert. The evening folk shows are lovely.' },
      { user: 'Ankit P.', rating: 4, comment: 'Stunning property. The fort view at sunset is magical.' }
    ],
    safetyScore: 95
  },
  {
    id: 'palais-de-mahe',
    name: 'Palais de Mahe',
    destination: 'pondicherry',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
    location: 'White Town, Pondicherry',
    rating: 4.4,
    stars: 4,
    pricePerNight: 8500,
    amenities: ['Wi-Fi', 'French Colonial', 'Restaurant', 'Courtyard', 'Room Service', 'Garden'],
    rooms: [
      { type: 'Classic Room', price: 8500, capacity: 2, available: true },
      { type: 'Colonial Suite', price: 13000, capacity: 2, available: true },
      { type: 'Garden Villa', price: 20000, capacity: 3, available: true }
    ],
    policies: { checkIn: '2:00 PM', checkOut: '12:00 PM', cancellation: 'Free cancellation up to 48 hours before check-in' },
    reviews: [
      { user: 'Rachel K.', rating: 4, comment: 'Beautiful colonial hotel in the heart of White Town.' },
      { user: 'Manoj S.', rating: 4, comment: 'The courtyard breakfast is a lovely touch.' }
    ],
    safetyScore: 92
  },
  {
    id: 'courtyard-shillong',
    name: 'Courtyard by Marriott Shillong',
    destination: 'shillong',
    image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&q=80',
    location: 'Police Bazaar, Shillong',
    rating: 4.5,
    stars: 4,
    pricePerNight: 8000,
    amenities: ['Wi-Fi', 'Restaurant', 'Gym', 'Room Service', 'Bar', 'Conference', 'Parking'],
    rooms: [
      { type: 'Deluxe Room', price: 8000, capacity: 2, available: true },
      { type: 'Suite', price: 13000, capacity: 3, available: true },
      { type: 'Family Room', price: 10000, capacity: 4, available: true }
    ],
    policies: { checkIn: '2:00 PM', checkOut: '12:00 PM', cancellation: 'Free cancellation up to 48 hours before check-in' },
    reviews: [
      { user: 'David L.', rating: 5, comment: 'Great hotel in the hills. Very comfortable stay.' },
      { user: 'Priya A.', rating: 4, comment: 'Nice base for exploring Meghalaya. Good food.' }
    ],
    safetyScore: 94
  }
];

export const getHotelById = (id) => hotels.find(h => h.id === id);

export const getHotelsByDestination = (destId) => hotels.filter(h => h.destination === destId);
