import { useParams, Link, useNavigate } from 'react-router-dom';
import { useContent } from '../context/ContentContext';
import { useNotification } from '../context/NotificationContext';
import ReviewCard from '../components/ReviewCard';
import {
  Star, MapPin, Clock, Check, X, Shield,
  Users, ArrowRight,
} from 'lucide-react';

export default function PackageDetail() {
  const { id } = useParams();
  const { addNotification } = useNotification();
  const { getPackageById, getDestinationById } = useContent();
  const pkg = getPackageById(id);
  const destination = pkg ? getDestinationById(pkg.destination) : null;
  const navigate = useNavigate();

  if (!pkg) {
    return (
      <div className="min-h-screen bg-light flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-dark mb-2">Package not found</h2>
          <Link to="/packages" className="text-blue hover:underline">Browse Packages</Link>
        </div>
      </div>
    );
  }

  const handleBook = () => {
    localStorage.setItem('safarnow_booking', JSON.stringify({
      destinationId: pkg.destination,
      packageId: pkg.id,
      packagePrice: pkg.price,
      hotelId: pkg.hotels?.[0]?.name || null,
      hotelPrice: pkg.hotels?.[0]?.price || 0,
      nights: pkg.days - 1,
    }));
    navigate('/booking');
  };

  return (
    <div className="min-h-screen bg-light">
      <div className="relative h-[350px] sm:h-[450px]">
        <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-3">
              <span className="bg-success text-white text-xs font-bold px-3 py-1 rounded-full">
                {Math.round((1 - pkg.price / pkg.originalPrice) * 100)}% OFF
              </span>
              <span className="flex items-center gap-1 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full">
                <Star className="w-3 h-3 text-warning fill-warning" /> {pkg.rating}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">{pkg.name}</h1>
            <p className="text-white/80 flex items-center gap-4">
              <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {destination?.name}</span>
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {pkg.duration}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-dark mb-4">Highlights</h2>
              <div className="grid grid-cols-2 gap-3">
                {pkg.highlights.map((h) => (
                  <div key={h} className="flex items-center gap-2 text-sm text-dark">
                    <Check className="w-4 h-4 text-success shrink-0" /> {h}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-dark mb-4">Itinerary</h2>
              <div className="space-y-4">
                {pkg.itinerary.map((day) => (
                  <div key={day.day} className="border-l-2 border-blue/30 pl-6 relative">
                    <div className="absolute -left-3 top-0 w-5 h-5 bg-blue rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">{day.day}</span>
                    </div>
                    <h3 className="font-bold text-dark mb-2">{day.title}</h3>
                    <ul className="space-y-1">
                      {day.activities.map((a, i) => (
                        <li key={i} className="text-sm text-muted flex items-start gap-2">
                          <span className="text-blue mt-1">•</span> {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h3 className="font-bold text-dark mb-3">Inclusions</h3>
                <ul className="space-y-2">
                  {pkg.inclusions.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-dark">
                      <Check className="w-4 h-4 text-success shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h3 className="font-bold text-dark mb-3">Exclusions</h3>
                <ul className="space-y-2">
                  {pkg.exclusions.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-dark">
                      <X className="w-4 h-4 text-danger shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {pkg.reviews && pkg.reviews.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-dark mb-4">Reviews</h2>
                <div className="space-y-4">
                  {pkg.reviews.map((review, i) => (
                    <ReviewCard key={i} review={review} />
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-24">
              <div className="mb-4">
                <span className="text-sm text-muted line-through">₹{pkg.originalPrice?.toLocaleString()}</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-blue">₹{pkg.price?.toLocaleString()}</span>
                  <span className="text-sm text-muted">/person</span>
                </div>
              </div>

              <div className="space-y-3 mb-6 pb-6 border-b border-gray-100">
                <div className="flex justify-between text-sm">
                  <span className="text-muted flex items-center gap-2"><Clock className="w-4 h-4" /> Duration</span>
                  <span className="font-semibold text-dark">{pkg.duration}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted flex items-center gap-2"><Users className="w-4 h-4" /> Group Size</span>
                  <span className="font-semibold text-dark">2-8</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted flex items-center gap-2"><Shield className="w-4 h-4" /> Safety</span>
                  <span className="font-semibold text-dark">{pkg.safetyScore}/100</span>
                </div>
              </div>

              <button
                onClick={handleBook}
                className="w-full flex items-center justify-center gap-2 bg-orange text-white py-4 rounded-xl font-semibold hover:bg-orange/90 transition-all shadow-lg shadow-orange/25 mb-3"
              >
                Book Now
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => addNotification('Package saved!', 'success')}
                className="w-full border-2 border-gray-200 py-3 rounded-xl font-semibold text-dark hover:bg-gray-50 transition-all"
              >
                Save Package
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
