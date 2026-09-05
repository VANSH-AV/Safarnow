import { useParams, Link } from 'react-router-dom';
import { useContent } from '../context/ContentContext';
import { useNotification } from '../context/NotificationContext';
import SafetyScore from '../components/SafetyScore';
import ReviewCard from '../components/ReviewCard';
import {
  Star, MapPin, Check, Shield,
  Clock, Bed, Users,
} from 'lucide-react';

export default function HotelDetail() {
  const { id } = useParams();
  const { addNotification } = useNotification();
  const { getHotelById } = useContent();
  const hotel = getHotelById(id);

  if (!hotel) {
    return (
      <div className="min-h-screen bg-light flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-dark mb-2">Hotel not found</h2>
          <Link to="/hotels" className="text-blue hover:underline">Browse Hotels</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light">
      <div className="relative h-[350px] sm:h-[450px]">
        <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-3">
              {Array.from({ length: hotel.stars }).map((_, i) => (
                <Star key={i} className="w-4 h-4 text-warning fill-warning" />
              ))}
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">{hotel.name}</h1>
            <p className="text-white/80 flex items-center gap-2">
              <MapPin className="w-4 h-4" /> {hotel.location}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-dark mb-4">Amenities</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {hotel.amenities.map((a) => (
                  <div key={a} className="flex items-center gap-2 text-sm text-dark p-2 bg-light rounded-lg">
                    <Check className="w-4 h-4 text-success shrink-0" /> {a}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-dark mb-4">Room Types</h2>
              <div className="space-y-4">
                {hotel.rooms.map((room) => (
                  <div key={room.type} className="flex items-center justify-between p-4 bg-light rounded-xl">
                    <div>
                      <h3 className="font-semibold text-dark">{room.type}</h3>
                      <p className="text-xs text-muted flex items-center gap-2 mt-1">
                        <Users className="w-3.5 h-3.5" /> Up to {room.capacity} guests
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-blue">₹{room.price?.toLocaleString()}</p>
                      <p className="text-xs text-muted">per night</p>
                    </div>
                    <button
                      onClick={() => {
                        if (!room.available) {
                          addNotification('This room type is currently unavailable', 'warning');
                          return;
                        }
                        localStorage.setItem('safarnow_booking', JSON.stringify({
                          destinationId: hotel.destination,
                          hotelId: hotel.id,
                          hotelPrice: room.price,
                          nights: 3,
                        }));
                        window.location.href = '/booking';
                      }}
                      className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                        room.available
                          ? 'bg-blue text-white hover:bg-blue/90'
                          : 'bg-gray-200 text-muted cursor-not-allowed'
                      }`}
                    >
                      {room.available ? 'Book' : 'Sold Out'}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-dark mb-4">Policies</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-3 bg-light rounded-xl">
                  <p className="text-xs text-muted mb-1">Check-in</p>
                  <p className="text-sm font-semibold text-dark flex items-center gap-1">
                    <Clock className="w-4 h-4 text-blue" /> {hotel.policies.checkIn}
                  </p>
                </div>
                <div className="p-3 bg-light rounded-xl">
                  <p className="text-xs text-muted mb-1">Check-out</p>
                  <p className="text-sm font-semibold text-dark flex items-center gap-1">
                    <Clock className="w-4 h-4 text-orange" /> {hotel.policies.checkOut}
                  </p>
                </div>
                <div className="p-3 bg-light rounded-xl">
                  <p className="text-xs text-muted mb-1">Cancellation</p>
                  <p className="text-sm font-semibold text-dark">{hotel.policies.cancellation}</p>
                </div>
              </div>
            </div>

            {hotel.reviews && hotel.reviews.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-dark mb-4">Guest Reviews</h2>
                <div className="space-y-4">
                  {hotel.reviews.map((review, i) => (
                    <ReviewCard key={i} review={review} />
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-24">
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-3xl font-bold text-blue">₹{hotel.pricePerNight?.toLocaleString()}</span>
                <span className="text-sm text-muted">/night</span>
              </div>

              <div className="space-y-3 mb-6 pb-6 border-b border-gray-100">
                <div className="flex justify-between text-sm">
                  <span className="text-muted flex items-center gap-2"><Star className="w-4 h-4 text-warning" /> Rating</span>
                  <span className="font-semibold text-dark">{hotel.rating}/5</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted flex items-center gap-2"><Shield className="w-4 h-4 text-success" /> Safety</span>
                  <span className="font-semibold text-dark">{hotel.safetyScore}/100</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted flex items-center gap-2"><Bed className="w-4 h-4 text-blue" /> Rooms</span>
                  <span className="font-semibold text-dark">{hotel.rooms.length} types</span>
                </div>
              </div>

              <SafetyScore score={hotel.safetyScore} size="md" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
