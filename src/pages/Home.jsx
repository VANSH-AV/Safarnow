import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import { useContent } from '../context/ContentContext';
import { useNotification } from '../context/NotificationContext';
import {
  MapPin,
  Calendar,
  Users,
  IndianRupee,
  Sparkles,
  ArrowRight,
  Plane,
  Hotel,
  Sun,
  ShieldCheck,
  Users as UsersIcon,
} from 'lucide-react';

const bookingTabs = [
  { id: 'package', label: 'Flights & Packages', icon: Plane },
  { id: 'hotel', label: 'Hotels', icon: Hotel },
  { id: 'activity', label: 'Smart Itinerary', icon: Sparkles },
];

const smartLayers = [
  {
    title: 'AI Trip Planner',
    desc: 'Personalized day-wise itineraries from your budget, duration & interests.',
    icon: Sparkles,
    color: '#FF8A25',
    bg: 'from-orange/10 to-orange/5',
    link: '/ai-planner',
  },
  {
    title: 'Tourist Safety',
    desc: 'Nearby police, hospitals & emergency services at your current location.',
    icon: ShieldCheck,
    color: '#16A34A',
    bg: 'from-emerald-500/10 to-emerald-500/5',
    link: '/safety',
  },
  {
    title: 'Offline Itinerary',
    desc: 'Your saved trip stays available even with no internet.',
    icon: Sun,
    color: '#38BDF8',
    bg: 'from-sky/10 to-sky/5',
    link: '/trips',
  },
  {
    title: 'Weather-Aware',
    desc: 'Itinerary adapts to changing weather in real time.',
    icon: Sun,
    color: '#1688D4',
    bg: 'from-blue/10 to-blue/5',
    link: '/ai-planner',
  },
  {
    title: 'Crowd Intelligence',
    desc: 'Know busy hours and find the best time to visit.',
    icon: UsersIcon,
    color: '#8B5CF6',
    bg: 'from-purple-500/10 to-purple-500/5',
    link: '/destinations',
  },
];

const categoryTabs = [
  { label: 'Beaches', icon: '🏖️' },
  { label: 'Mountains', icon: '🏔️' },
  { label: 'Heritage', icon: '🏛️' },
  { label: 'Adventure', icon: '🧗' },
  { label: 'Nature', icon: '🌿' },
  { label: 'Family', icon: '👨‍👩‍👧' },
];

export default function Home() {
  const navigate = useNavigate();
  const { addNotification } = useNotification();
  const { destinations, packages } = useContent();
  const [activeTab, setActiveTab] = useState('smart-itinerary');
  const [searchDest, setSearchDest] = useState('');
  const [dates, setDates] = useState('');
  const [travelers, setTravelers] = useState('2');
  const [budget, setBudget] = useState('moderate');

  const featuredDestinations = destinations.slice(0, 6);
  const featuredPackages = packages.slice(0, 4);

  const handleSearch = () => {
    if (!searchDest) {
      addNotification('Please enter a destination', 'error');
      return;
    }
    navigate('/ai-planner');
  };

  return (
    <div>
      <Hero />

      {/* Floating booking search bar — over the hero */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 sm:-mt-28 relative z-10">
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
          <div className="flex border-b border-gray-100">
            {bookingTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 px-3 py-4 text-sm font-semibold transition-colors ${
                  activeTab === tab.id
                    ? 'text-blue border-b-2 border-blue bg-blue/5'
                    : 'text-muted hover:text-dark'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="p-4 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="flex items-center gap-3 bg-light rounded-xl px-4 py-3 border border-transparent focus-within:border-blue/50 transition-colors">
                <MapPin className="w-5 h-5 text-blue shrink-0" />
                <div className="flex-1 min-w-0">
                  <label className="block text-[11px] font-semibold text-muted">Destination</label>
                  <input
                    value={searchDest}
                    onChange={(e) => setSearchDest(e.target.value)}
                    placeholder="Where are you going?"
                    className="w-full bg-transparent text-sm font-medium text-dark placeholder:text-muted/60 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 bg-light rounded-xl px-4 py-3 border border-transparent focus-within:border-blue/50 transition-colors">
                <Calendar className="w-5 h-5 text-blue shrink-0" />
                <div className="flex-1 min-w-0">
                  <label className="block text-[11px] font-semibold text-muted">Departure Date</label>
                  <input
                    type="month"
                    value={dates}
                    onChange={(e) => setDates(e.target.value)}
                    className="w-full bg-transparent text-sm font-medium text-dark focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 bg-light rounded-xl px-4 py-3 border border-transparent focus-within:border-blue/50 transition-colors">
                <Users className="w-5 h-5 text-blue shrink-0" />
                <div className="flex-1 min-w-0">
                  <label className="block text-[11px] font-semibold text-muted">Travellers</label>
                  <input
                    type="number"
                    min="1"
                    value={travelers}
                    onChange={(e) => setTravelers(e.target.value)}
                    className="w-full bg-transparent text-sm font-medium text-dark focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 bg-light rounded-xl px-4 py-3 border border-transparent focus-within:border-blue/50 transition-colors">
                <IndianRupee className="w-5 h-5 text-blue shrink-0" />
                <div className="flex-1 min-w-0">
                  <label className="block text-[11px] font-semibold text-muted">Budget</label>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full bg-transparent text-sm font-medium text-dark focus:outline-none appearance-none"
                  >
                    <option value="budget">Budget</option>
                    <option value="moderate">Moderate</option>
                    <option value="premium">Premium</option>
                    <option value="luxury">Luxury</option>
                  </select>
                </div>
              </div>
            </div>

            <button
              onClick={handleSearch}
              className="mt-4 w-full flex items-center justify-center gap-2 bg-orange text-white py-3.5 rounded-xl font-semibold hover:bg-orange/90 transition-all shadow-lg shadow-orange/25"
            >
              <Sparkles className="w-5 h-5" />
              Generate Smart Itinerary
            </button>
          </div>
        </div>
      </div>

      {/* Smart layers strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-dark">
              Everything for a <span className="text-blue">Smarter Journey</span>
            </h2>
            <p className="text-muted mt-2">Five intelligent layers that work together — not separate features</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {smartLayers.map((layer) => (
            <Link
              key={layer.title}
              to={layer.link}
              className={`group rounded-2xl p-5 bg-gradient-to-br ${layer.bg} border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all`}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform"
                style={{ backgroundColor: layer.color + '1A' }}
              >
                <layer.icon className="w-5 h-5" style={{ color: layer.color }} />
              </div>
              <h3 className="text-sm font-bold text-dark mb-1">{layer.title}</h3>
              <p className="text-xs text-muted leading-relaxed">{layer.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending destinations with category tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-dark">Trending Destinations</h2>
            <p className="text-muted mt-2">Explore the world's most-loved places</p>
          </div>
          <Link to="/destinations" className="hidden sm:flex items-center gap-1 text-blue font-semibold hover:gap-2 transition-all">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 mb-8">
          {categoryTabs.map((cat) => (
            <Link
              key={cat.label}
              to="/destinations"
              className="flex flex-col items-center gap-2 py-3 rounded-2xl hover:bg-white hover:shadow-md border border-transparent hover:border-gray-100 transition-all group"
            >
              <span className="text-2xl group-hover:scale-110 transition-transform">{cat.icon}</span>
              <span className="text-xs font-medium text-muted group-hover:text-dark">{cat.label}</span>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredDestinations.map((dest) => (
            <Link
              key={dest.id}
              to={`/destinations/${dest.id}`}
              className="group relative h-72 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all"
            >
              <img
                src={dest.image}
                alt={dest.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-white font-bold text-lg drop-shadow">{dest.name}</h3>
                  <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-lg">
                    ⭐ {dest.rating}
                  </span>
                </div>
                <p className="text-white/80 text-sm flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" /> {dest.state}
                </p>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-white text-sm">
                    <span className="font-bold text-lg text-orange">₹{dest.avgBudget?.toLocaleString()}</span> avg/night
                  </span>
                  <span className="text-white/70 text-xs flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" /> Safety {dest.safetyScore}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured deals */}
      <section className="bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-dark">Featured Travel Deals</h2>
              <p className="text-muted mt-2">Handpicked packages with the best value</p>
            </div>
            <Link to="/packages" className="hidden sm:flex items-center gap-1 text-orange font-semibold hover:gap-2 transition-all">
              View All Deals <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredPackages.map((pkg) => (
              <Link
                key={pkg.id}
                to={`/packages/${pkg.id}`}
                className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                <div className="relative h-44 overflow-hidden">
                  <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <span className="absolute top-3 right-3 bg-danger text-white text-xs font-bold px-2.5 py-1 rounded-full">
                    {Math.round((1 - pkg.price / pkg.originalPrice) * 100)}% OFF
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-dark truncate">{pkg.name}</h3>
                  <p className="text-xs text-muted mt-1">{pkg.duration}</p>
                  <div className="flex items-end justify-between mt-3">
                    <div>
                      <span className="text-xs text-muted line-through">₹{pkg.originalPrice?.toLocaleString()}</span>
                      <p className="text-lg font-bold text-blue leading-none">₹{pkg.price?.toLocaleString()}</p>
                    </div>
                    <span className="text-xs bg-blue/10 text-blue font-semibold px-2 py-1 rounded-lg">View →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Safarnow — clean 3-col */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-dark">Why Choose Safarnow?</h2>
          <p className="text-muted mt-2 max-w-xl mx-auto">
            We go beyond search-and-book to deliver safer, smarter, more personalized travel.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: 'Personalized Planning', desc: 'AI generates day-wise itineraries tuned to your budget, pace, and interests — not generic templates.', color: 'text-blue', icon: Sparkles },
            { title: 'Safe by Design', desc: 'Real-time safety scores, nearby emergency services, crowd intelligence, and weather alerts built into every trip.', color: 'text-emerald-600', icon: ShieldCheck },
            { title: 'Works Everywhere', desc: 'Offline itinerary support means your plan is always with you, even in remote areas with no connectivity.', color: 'text-orange', icon: Sun },
          ].map((item) => (
            <div key={item.title} className="bg-light rounded-2xl border border-gray-100 p-8 text-center hover:shadow-lg hover:-translate-y-1 transition-all">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-white shadow-sm border border-gray-100 flex items-center justify-center mb-5">
                <item.icon className={`w-7 h-7 ${item.color}`} />
              </div>
              <h3 className="text-lg font-bold text-dark mb-3">{item.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
