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
  }
];

export const getHotelById = (id) => hotels.find(h => h.id === id);

export const getHotelsByDestination = (destId) => hotels.filter(h => h.destination === destId);
