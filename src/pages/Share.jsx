import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getSharedItinerary } from '../lib/backend';
import { useContent } from '../context/ContentContext';
import {
  MapPin,
  Calendar,
  IndianRupee,
  Sparkles,
  ChevronRight,
  Clock,
  ArrowLeft,
} from 'lucide-react';

export default function Share() {
  const { token } = useParams();
  const { getDestinationById } = useContent();
  const [itinerary, setItinerary] = useState(null);
  const [state, setState] = useState('loading');
  const [activeDay, setActiveDay] = useState(1);

  useEffect(() => {
    let alive = true;
    getSharedItinerary(token).then((data) => {
      if (!alive) return;
      if (data) {
        setItinerary(data);
        setActiveDay(data.days?.[0]?.day || 1);
        setState('ready');
      } else {
        setState('notfound');
      }
    });
    return () => {
      alive = false;
    };
  }, [token]);

  if (state === 'loading') {
    return (
      <div className="min-h-screen bg-light flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue/30 border-t-blue rounded-full animate-spin" />
      </div>
    );
  }

  if (state === 'notfound' || !itinerary) {
    return (
      <div className="min-h-screen bg-light flex items-center justify-center">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold text-dark mb-2">Itinerary not found</h2>
          <p className="text-muted mb-6">This share link may be invalid or has been removed.</p>
          <Link to="/" className="inline-flex items-center gap-2 text-blue font-semibold hover:underline">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const day = itinerary.days?.find((d) => d.day === activeDay) || itinerary.days?.[0];
  const dest = itinerary.destinationId ? getDestinationById(itinerary.destinationId) : null;

  return (
    <div className="min-h-screen bg-light">
      <div className="bg-gradient-to-br from-navy via-navy to-blue py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/" className="inline-flex items-center gap-2 text-white/70 text-sm mb-6 hover:text-white">
            <ArrowLeft className="w-4 h-4" /> Back to Safarnow
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-8 h-8 text-sky" />
            <h1 className="text-3xl sm:text-4xl font-bold text-white">Shared Itinerary</h1>
          </div>
          <p className="text-white/70 text-lg">A friend shared their AI-planned trip with you</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-muted">
            <MapPin className="w-4 h-4 text-blue" /> {itinerary.destination}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted">
            <Calendar className="w-4 h-4 text-blue" /> {itinerary.daysCount} Days
          </div>
          <div className="flex items-center gap-2 text-sm text-muted">
            <IndianRupee className="w-4 h-4 text-blue" /> ₹{itinerary.totalCost?.toLocaleString()}
          </div>
          {itinerary.dateLabel && (
            <div className="flex items-center gap-2 text-sm text-muted">
              <Clock className="w-4 h-4 text-blue" /> {itinerary.dateLabel}
            </div>
          )}
          <div className="ml-auto">
            <Link
              to="/ai-planner"
              className="inline-flex items-center gap-2 bg-blue text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue/90 transition-all"
            >
              Plan Your Own
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
          {(itinerary.days || []).map((d) => (
            <button
              key={d.day}
              onClick={() => setActiveDay(d.day)}
              className={`px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                activeDay === d.day ? 'bg-blue text-white shadow-md' : 'bg-white text-muted border border-gray-200 hover:bg-gray-50'
              }`}
            >
              Day {d.day}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-dark">Activities</h3>
                <span className="text-sm text-muted">{day?.title}</span>
              </div>
              <div className="space-y-3">
                {(day?.activities || []).map((activity, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl border border-gray-100 hover:border-blue/30 transition-colors">
                    <span className="w-8 h-8 bg-blue/10 text-blue rounded-full flex items-center justify-center text-sm font-bold shrink-0">
                      {i + 1}
                    </span>
                    <div className="min-w-0">
                      <p className="font-semibold text-dark text-sm">{activity.name}</p>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-muted mt-1">
                        <span>{activity.duration}</span>
                        <span className="flex items-center gap-1">
                          <IndianRupee className="w-3 h-3" /> {activity.cost?.toLocaleString()}
                        </span>
                        <span>
                          {activity.crowdLevel >= 70 ? 'Crowded' : activity.crowdLevel >= 40 ? 'Moderate' : 'Quiet'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {dest && (
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h3 className="text-lg font-bold text-dark mb-4">About {dest.name}</h3>
                <p className="text-sm text-muted leading-relaxed">{dest.description}</p>
              </div>
            )}
          </div>

          <div>
            {dest && (
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <img src={dest.image} alt={dest.name} className="w-full h-48 object-cover" />
                <div className="p-5">
                  <h4 className="font-bold text-dark">{dest.name}</h4>
                  <p className="text-xs text-muted mt-1">
                    Best season: {dest.bestSeason} · Crowd: {dest.crowdLevel}
                  </p>
                </div>
              </div>
            )}

            <div className="bg-sky/5 border border-sky/20 rounded-xl p-5 mt-4">
              <p className="text-sm font-semibold text-dark mb-1">Smart Planning</p>
              <p className="text-xs text-muted leading-relaxed">
                Itineraries consider live weather, crowd levels, and safety scores for each destination.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}