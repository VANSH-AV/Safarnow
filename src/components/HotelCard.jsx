import { Star, MapPin, Wifi, Car, Utensils, Dumbbell, Waves, Coffee } from 'lucide-react';

const amenityIcons = {
  wifi: Wifi,
  parking: Car,
  restaurant: Utensils,
  gym: Dumbbell,
  pool: Waves,
  cafe: Coffee,
};

export default function HotelCard({ hotel }) {
  const {
    id,
    name,
    location: loc,
    image,
    stars,
    rating,
    amenities,
    pricePerNight,
  } = hotel;

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 hover:-translate-y-1">
      <div className="relative h-52 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <div className="absolute top-3 left-3 flex items-center gap-1 bg-black/40 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-lg">
          {Array.from({ length: stars }).map((_, i) => (
            <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          ))}
        </div>
        <div className="absolute bottom-3 left-3">
          <div className="flex items-center gap-1 bg-black/40 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-lg">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{rating}</span>
          </div>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center gap-1.5 text-muted text-sm mb-2">
          <MapPin className="w-3.5 h-3.5" />
          <span>{loc}</span>
        </div>
        <h3 className="text-lg font-bold text-dark mb-3 group-hover:text-blue transition-colors">
          {name}
        </h3>

        {amenities && amenities.length > 0 && (
          <div className="flex items-center gap-3 mb-4">
            {amenities.slice(0, 5).map((a) => {
              const Icon = amenityIcons[a] || Coffee;
              return (
                <div
                  key={a}
                  className="w-8 h-8 bg-light rounded-lg flex items-center justify-center"
                  title={a}
                >
                  <Icon className="w-4 h-4 text-muted" />
                </div>
              );
            })}
            {amenities.length > 5 && (
              <span className="text-xs text-muted">
                +{amenities.length - 5} more
              </span>
            )}
          </div>
        )}

        <div className="flex items-end justify-between">
          <div>
            <p className="text-xl font-bold text-navy">
              ₹{pricePerNight?.toLocaleString()}
            </p>
            <p className="text-xs text-muted">per night</p>
          </div>
          <div className="flex gap-2">
            <a
              href={`/hotels/${id}`}
              className="px-4 py-2 text-sm font-medium text-blue border border-blue/20 rounded-lg hover:bg-blue/5 transition-colors"
            >
              View Hotel
            </a>
            <a
              href={`/hotels/${id}/book`}
              className="px-4 py-2 text-sm font-medium text-white bg-blue rounded-lg hover:bg-blue/90 transition-colors"
            >
              Book Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
