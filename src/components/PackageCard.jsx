import { Link } from 'react-router-dom';
import { Clock, Star, MapPin, ChevronRight } from 'lucide-react';

export default function PackageCard({ pkg }) {
  const {
    id,
    name,
    destination,
    image,
    duration,
    rating,
    originalPrice,
    discountedPrice,
    highlights,
  } = pkg;

  const discount = originalPrice
    ? Math.round(((originalPrice - discountedPrice) / originalPrice) * 100)
    : 0;

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 hover:-translate-y-1">
      <div className="relative h-52 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        {discount > 0 && (
          <div className="absolute top-3 right-3 bg-danger text-white text-xs font-bold px-2.5 py-1 rounded-lg">
            {discount}% OFF
          </div>
        )}
        <div className="absolute bottom-3 left-3 right-3">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-black/40 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-lg">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{rating}</span>
            </div>
            <div className="flex items-center gap-1 bg-black/40 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-lg">
              <Clock className="w-3 h-3" />
              <span>{duration}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center gap-1.5 text-muted text-xs mb-2">
          <MapPin className="w-3 h-3" />
          <span>{destination}</span>
        </div>
        <h3 className="text-lg font-bold text-dark mb-3 group-hover:text-blue transition-colors">
          {name}
        </h3>

        {highlights && highlights.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {highlights.slice(0, 3).map((h, i) => (
              <span
                key={i}
                className="text-xs bg-light text-muted px-2.5 py-1 rounded-full"
              >
                {h}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-end justify-between">
          <div>
            {originalPrice && originalPrice > discountedPrice && (
              <p className="text-sm text-muted line-through">
                ₹{originalPrice?.toLocaleString()}
              </p>
            )}
            <p className="text-xl font-bold text-navy">
              ₹{discountedPrice?.toLocaleString()}
            </p>
            <p className="text-xs text-muted">per person</p>
          </div>
          <Link
            to={`/packages/${id}`}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-blue text-white text-sm font-medium rounded-lg hover:bg-blue/90 transition-colors"
          >
            View Package
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
