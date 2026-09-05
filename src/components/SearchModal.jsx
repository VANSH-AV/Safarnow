import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Package, Hotel, X, ArrowRight, ScrollText } from 'lucide-react';
import Modal from './Modal';
import { useContent } from '../context/ContentContext';
import { activities } from '../data/activities';

export default function SearchModal({ isOpen, onClose }) {
  const { destinations, packages, hotels } = useContent();
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (!isOpen) setQuery('');
  }, [isOpen]);

  const q = query.trim().toLowerCase();

  const resultData = {
    destinations: q
      ? destinations.filter((d) =>
          d.name.toLowerCase().includes(q) ||
          d.state.toLowerCase().includes(q) ||
          d.country.toLowerCase().includes(q)
        )
      : [],
    packages: q
      ? packages.filter((p) => p.name.toLowerCase().includes(q))
      : [],
    hotels: q
      ? hotels.filter((h) =>
          h.name.toLowerCase().includes(q) ||
          h.location.toLowerCase().includes(q)
        )
      : [],
    activities: q
      ? activities.filter((a) =>
          a.name.toLowerCase().includes(q) ||
          a.category.toLowerCase().includes(q)
        )
      : [],
  };

  const totalResults =
    resultData.destinations.length +
    resultData.packages.length +
    resultData.hotels.length +
    resultData.activities.length;

  const iconMap = {
    destination: MapPin,
    package: Package,
    hotel: Hotel,
    activity: ScrollText,
  };
  const linkMap = {
    destination: (id) => `/destinations/${id}`,
    package: (id) => `/packages/${id}`,
    hotel: (id) => `/hotels/${id}`,
    activity: () => `/ai-planner`,
  };
  const subText = {
    destination: (item) => `${item.state}, ${item.country}`,
    package: (item) => item.duration,
    hotel: (item) => item.location,
    activity: (item) => item.category,
  };

  const resultCategories = [
    { key: 'destinations', label: 'Destinations' },
    { key: 'packages', label: 'Packages' },
    { key: 'hotels', label: 'Hotels' },
    { key: 'activities', label: 'Activities' },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3.5 inset-y-0 my-auto w-5 h-5 text-muted" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search destinations, packages, hotels, activities..."
            autoFocus
            className="w-full pl-11 pr-10 py-3 text-sm bg-light border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue/20 focus:border-blue"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3.5 inset-y-0 my-auto p-1 text-muted hover:text-dark rounded transition-colors"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {totalResults > 0 && (
          <div className="max-h-96 overflow-y-auto space-y-4 pr-1">
            {resultCategories.map((cat) => {
              const items = resultData[cat.key];
              if (items.length === 0) return null;
              const TypeIcon = iconMap[cat.key];
              return (
                <div key={cat.key}>
                  <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <TypeIcon className="w-3.5 h-3.5" /> {cat.label} ({items.length})
                  </p>
                  <div className="space-y-1">
                    {items.map((item) => (
                      <Link
                        key={`${cat.key}-${item.id}`}
                        to={linkMap[cat.key](item.id)}
                        onClick={onClose}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-light transition-colors group"
                      >
                        <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0">
                          {item.image ? (
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full bg-blue/10 flex items-center justify-center">
                              <TypeIcon className="w-5 h-5 text-blue" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-dark group-hover:text-blue transition-colors truncate">
                            {item.name}
                          </p>
                          <p className="text-xs text-muted truncate">{subText[cat.key](item)}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-muted opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {q && totalResults === 0 && (
          <div className="py-10 text-center">
            <Search className="w-10 h-10 text-gray-200 mx-auto mb-3" />
            <p className="text-sm text-muted">No results found for "{query}"</p>
          </div>
        )}

        {!q && (
          <div className="py-6 text-center">
            <p className="text-sm text-muted mb-4">
              Try searching for "Goa", "Beach", "Resort", or any destination
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {['Goa', 'Kashmir', 'Dubai', 'Bali', 'Resort', 'Safari'].map((s) => (
                <button
                  key={s}
                  onClick={() => setQuery(s)}
                  className="px-3 py-1.5 bg-light text-sm text-muted rounded-full hover:bg-blue/10 hover:text-blue transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
