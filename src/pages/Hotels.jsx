import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useContent } from '../context/ContentContext';
import { Search, Star, MapPin, ChevronRight, SlidersHorizontal, Shield } from 'lucide-react';

const starFilters = ['All', '5 Star', '4 Star', '3 Star'];

export default function Hotels() {
  const { hotels } = useContent();
  const [search, setSearch] = useState('');
  const [stars, setStars] = useState('All');

  const filtered = hotels.filter((h) => {
    const matchSearch = h.name.toLowerCase().includes(search.toLowerCase()) ||
      h.location.toLowerCase().includes(search.toLowerCase());
    const matchStars = stars === 'All' || `${h.stars} Star` === stars;
    return matchSearch && matchStars;
  });

  return (
    <div className="min-h-screen bg-light">
      <div className="bg-gradient-to-br from-navy via-navy to-blue py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">Find Hotels</h1>
          <p className="text-white/70 text-lg mb-8">Best stays at every destination</p>
          <div className="relative max-w-xl">
            <Search className="absolute left-4 inset-y-0 my-auto w-5 h-5 text-muted" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search hotels by name or location..."
              className="w-full pl-12 pr-4 py-4 bg-white rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue/30 shadow-lg"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-2 overflow-x-auto pb-4 mb-8">
          {starFilters.map((s) => (
            <button
              key={s}
              onClick={() => setStars(s)}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                stars === s
                  ? 'bg-blue text-white'
                  : 'bg-white text-dark border border-gray-200 hover:border-blue hover:text-blue'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((hotel) => {
            return (
              <Link
                key={hotel.id}
                to={`/hotels/${hotel.id}`}
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all group"
              >
                <div className="relative h-52 overflow-hidden">
                  <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-3 right-3 bg-navy/80 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm">
                    {hotel.stars} Star
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-4">
                    <h3 className="text-white font-bold text-lg">{hotel.name}</h3>
                    <p className="text-white/80 text-sm flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {hotel.location}
                    </p>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="flex items-center gap-1 text-sm">
                      <Star className="w-4 h-4 text-warning fill-warning" /> {hotel.rating}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-success">
                      <Shield className="w-3.5 h-3.5" /> Safety: {hotel.safetyScore}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {hotel.amenities.slice(0, 4).map((a) => (
                      <span key={a} className="bg-light text-muted text-xs px-2.5 py-1 rounded-full">{a}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div>
                      <span className="text-xl font-bold text-blue">₹{hotel.pricePerNight?.toLocaleString()}</span>
                      <span className="text-xs text-muted">/night</span>
                    </div>
                    <span className="flex items-center gap-1 text-blue text-sm font-semibold group-hover:gap-2 transition-all">
                      View <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <SlidersHorizontal className="w-12 h-12 text-muted/30 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-dark mb-2">No hotels found</h3>
            <p className="text-muted">Try different filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
