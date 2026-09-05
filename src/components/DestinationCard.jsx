import { Link } from 'react-router-dom';
import { MapPin, Star, ArrowRight } from 'lucide-react';
import SafetyBadge from './SafetyBadge';
import CrowdBadge from './CrowdBadge';

export default function DestinationCard({ destination }) {
  const {
    id,
    name,
    location: loc,
    image,
    rating,
    price,
    safetyScore,
    crowdLevel,
  } = destination;

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 hover:-translate-y-1">
      <div className="relative h-52 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <div className="absolute top-3 left-3 flex gap-2">
          <SafetyBadge score={safetyScore} />
        </div>
        <div className="absolute top-3 right-3">
          <CrowdBadge level={crowdLevel} />
        </div>
        <div className="absolute bottom-3 left-3">
          <div className="flex items-center gap-1 bg-black/40 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-lg">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{rating}</span>
          </div>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-bold text-dark group-hover:text-blue transition-colors">
            {name}
          </h3>
        </div>
        <div className="flex items-center gap-1.5 text-muted text-sm mb-4">
          <MapPin className="w-3.5 h-3.5" />
          <span>{loc}</span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted">Starting from</p>
            <p className="text-xl font-bold text-navy">
              ₹{price?.toLocaleString()}
            </p>
          </div>
          <div className="flex gap-2">
            <Link
              to={`/destinations/${id}`}
              className="px-4 py-2 text-sm font-medium text-blue border border-blue/20 rounded-lg hover:bg-blue/5 transition-colors"
            >
              Explore
            </Link>
            <Link
              to={`/ai-planner?destination=${id}`}
              className="px-4 py-2 text-sm font-medium text-white bg-blue rounded-lg hover:bg-blue/90 transition-colors flex items-center gap-1.5"
            >
              Plan Trip
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
