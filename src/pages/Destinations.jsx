import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useContent } from '../context/ContentContext';
import {
  MapPin,
  Star,
  Shield,
  Search,
  SlidersHorizontal,
  ChevronDown,
  ArrowDownWideNarrow,
} from 'lucide-react';

const categories = ['All', 'Beaches', 'Mountains', 'Culture', 'Adventure', 'Nature', 'History', 'Family', 'Luxury'];
const budgetRanges = ['All', 'Under ₹15K', '₹15K - ₹30K', 'Above ₹30K'];
const crowdLevels = ['All', 'Low', 'Moderate', 'High'];
const sortOptions = ['Featured', 'Rating: High to Low', 'Price: Low to High', 'Price: High to Low', 'Safety: High to Low'];

export default function Destinations() {
  const { destinations } = useContent();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [budget, setBudget] = useState('All');
  const [crowd, setCrowd] = useState('All');
  const [sortBy, setSortBy] = useState('Featured');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = destinations.filter((d) => {
      const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.state.toLowerCase().includes(search.toLowerCase()) ||
        d.country.toLowerCase().includes(search.toLowerCase()) ||
        d.categories.some((c) => c.toLowerCase().includes(search.toLowerCase()));
      const matchCategory = activeCategory === 'All' ||
        d.categories.some((c) => c.toLowerCase() === activeCategory.toLowerCase());
      let matchBudget = budget === 'All';
      if (budget === 'Under ₹15K') matchBudget = d.avgBudget < 15000;
      if (budget === '₹15K - ₹30K') matchBudget = d.avgBudget >= 15000 && d.avgBudget <= 30000;
      if (budget === 'Above ₹30K') matchBudget = d.avgBudget > 30000;
      const matchCrowd = crowd === 'All' || d.crowdLevel === crowd;
      return matchSearch && matchCategory && matchBudget && matchCrowd;
    });

    switch (sortBy) {
      case 'Rating: High to Low':
        result = [...result].sort((a, b) => b.rating - a.rating);
        break;
      case 'Price: Low to High':
        result = [...result].sort((a, b) => a.avgBudget - b.avgBudget);
        break;
      case 'Price: High to Low':
        result = [...result].sort((a, b) => b.avgBudget - a.avgBudget);
        break;
      case 'Safety: High to Low':
        result = [...result].sort((a, b) => b.safetyScore - a.safetyScore);
        break;
      default:
        break;
    }
    return result;
  }, [search, activeCategory, budget, crowd, sortBy]);

  return (
    <div className="min-h-screen bg-light">
      <div className="bg-gradient-to-br from-navy via-navy to-blue py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">Explore the World</h1>
          <p className="text-white/70 text-lg mb-8">Discover amazing places with real-time safety and crowd data</p>
          <div className="relative max-w-xl">
            <Search className="absolute left-4 inset-y-0 my-auto w-5 h-5 text-muted" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search destinations, states, countries..."
              className="w-full pl-12 pr-4 py-4 bg-white rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue/30 shadow-lg"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap gap-2 overflow-x-auto pb-4 mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-blue text-white'
                  : 'bg-white text-dark border border-gray-200 hover:border-blue hover:text-blue'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-dark hover:border-blue transition-all"
          >
            <SlidersHorizontal className="w-4 h-4" /> Filters
            <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>

          <div className="flex items-center gap-2">
            <ArrowDownWideNarrow className="w-4 h-4 text-muted" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue/30"
            >
              {sortOptions.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>
        </div>

        {showFilters && (
          <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-slide-down">
            <div>
              <label className="text-xs font-semibold text-muted mb-1.5 block">Budget</label>
              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full px-3 py-2.5 bg-light border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue/30"
              >
                {budgetRanges.map((b) => <option key={b}>{b}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-muted mb-1.5 block">Crowd Level</label>
              <select
                value={crowd}
                onChange={(e) => setCrowd(e.target.value)}
                className="w-full px-3 py-2.5 bg-light border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue/30"
              >
                {crowdLevels.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((dest) => (
            <Link
              key={dest.id}
              to={`/destinations/${dest.id}`}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all group"
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent" />
                <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full">
                  <Star className="w-3.5 h-3.5 text-warning fill-warning" />
                  <span className="text-xs font-bold text-dark">{dest.rating}</span>
                </div>
                <div className="absolute bottom-3 left-4">
                  <h3 className="text-white font-bold text-xl">{dest.name}</h3>
                  <p className="text-white/80 text-sm flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {dest.state}, {dest.country}
                  </p>
                </div>
              </div>
              <div className="p-5">
                <p className="text-sm text-muted line-clamp-2 mb-4">{dest.description}</p>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-1">
                    <Shield className="w-4 h-4 text-success" />
                    <span className="text-xs font-semibold text-success">Safety: {dest.safetyScore}/100</span>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full" style={{
                    backgroundColor: dest.crowdLevel === 'High' ? '#FEF2F2' : dest.crowdLevel === 'Moderate' ? '#FEF9C3' : '#DCFCE7',
                    color: dest.crowdLevel === 'High' ? '#DC2626' : dest.crowdLevel === 'Moderate' ? '#A16207' : '#16A34A',
                  }}>
                    {dest.crowdLevel} crowd
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-between pt-3 border-t border-gray-100">
                  <span className="text-sm font-bold text-blue">₹{dest.avgBudget?.toLocaleString()} avg</span>
                  <div className="flex gap-2">
                    <span className="text-xs font-semibold text-blue border border-blue/30 px-2 py-1 rounded-lg">Explore</span>
                    <span className="text-xs font-semibold bg-blue text-white px-2 py-1 rounded-lg">Plan Trip</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <SlidersHorizontal className="w-12 h-12 text-muted/30 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-dark mb-2">No destinations found</h3>
            <p className="text-muted">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
