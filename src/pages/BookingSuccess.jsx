import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNotification } from '../context/NotificationContext';
import { useOffline } from '../context/OfflineContext';
import { getDestinationById } from '../data/destinations';
import { downloadETicket } from '../utils/eticket';
import {
  CheckCircle,
  Download,
  MapPin,
  Calendar,
  Users,
  CreditCard,
  Plane,
  Sparkles,
  WifiOff,
} from 'lucide-react';

export default function BookingSuccess() {
  const [booking, setBooking] = useState(null);
  const { addNotification } = useNotification();
  const { saveForOffline } = useOffline();

  useEffect(() => {
    const stored = localStorage.getItem('safarnow_last_booking');
    if (stored) {
      try {
        setBooking(JSON.parse(stored));
      } catch {
        // ignore
      }
    }
  }, []);

  if (!booking) {
    return (
      <div className="min-h-screen bg-light flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted">No booking found.</p>
          <Link to="/" className="text-blue hover:underline mt-2 inline-block">Go Home</Link>
        </div>
      </div>
    );
  }

  const destination = getDestinationById(booking.destinationId);

  const handleDownload = () => {
    downloadETicket(booking, destination);
    addNotification('E-ticket downloaded — check your downloads.', 'success');
  };

  const handleSaveOffline = () => {
    saveForOffline({
      destinationId: booking.destinationId,
      itinerary: null,
      booking,
      savedLocations: destination?.attractions?.slice(0, 4) || [],
      weatherSummary: undefined,
    });
    addNotification('Booking saved for offline access!', 'success');
  };

  return (
    <div className="min-h-screen bg-light">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10 animate-slide-up">
          <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-success" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-dark mb-3">Booking Confirmed!</h1>
          <p className="text-muted text-lg">Your adventure to {booking.destinationName} awaits</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden animate-slide-up stagger-1">
          <div className="relative h-40">
            <img
              src={booking.image || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80'}
              alt={booking.destinationName}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent" />
            <div className="absolute bottom-4 left-4 flex items-center gap-2">
              <Plane className="w-5 h-5 text-white" />
              <span className="text-white font-bold text-lg">{booking.destinationName}</span>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              <div>
                <p className="text-xs text-muted uppercase tracking-wider mb-1">Booking ID</p>
                <p className="text-sm font-bold text-blue">{booking.id}</p>
              </div>
              <div>
                <p className="text-xs text-muted uppercase tracking-wider mb-1">Package</p>
                <p className="text-sm font-semibold text-dark">{booking.packageName}</p>
              </div>
              <div>
                <p className="text-xs text-muted uppercase tracking-wider mb-1">Hotel</p>
                <p className="text-sm font-semibold text-dark">{booking.hotelName}</p>
              </div>
              <div className="flex items-start gap-2">
                <Calendar className="w-4 h-4 text-muted mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-muted uppercase tracking-wider mb-1">Check-in</p>
                  <p className="text-sm font-semibold text-dark">{booking.checkIn || 'TBD'}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Users className="w-4 h-4 text-muted mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-muted uppercase tracking-wider mb-1">Travelers</p>
                  <p className="text-sm font-semibold text-dark">{booking.travelers}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CreditCard className="w-4 h-4 text-muted mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-muted uppercase tracking-wider mb-1">Total Paid</p>
                  <p className="text-sm font-bold text-blue">₹{booking.total?.toLocaleString()}</p>
                </div>
              </div>
            </div>

            {booking.specialRequests && (
              <div className="mt-6 p-4 bg-light rounded-xl">
                <p className="text-xs text-muted uppercase tracking-wider mb-1">Special Requests</p>
                <p className="text-sm text-dark">{booking.specialRequests}</p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 animate-slide-up stagger-2">
          <Link
            to="/trips"
            className="flex items-center justify-center gap-2 bg-blue text-white py-3.5 rounded-xl font-semibold hover:bg-blue/90 transition-all"
          >
            <MapPin className="w-4 h-4" />
            View My Trips
          </Link>
          <Link
            to="/"
            className="flex items-center justify-center gap-2 border-2 border-gray-200 text-dark py-3.5 rounded-xl font-semibold hover:bg-gray-50 transition-all"
          >
            <Sparkles className="w-4 h-4" />
            Back to Home
          </Link>
        </div>

        <div className="mt-8 space-y-3 animate-slide-up stagger-3">
          <button
            onClick={handleDownload}
            className="w-full flex items-center justify-center gap-2 bg-orange text-white py-4 rounded-xl text-base font-semibold hover:bg-orange/90 transition-all shadow-lg shadow-orange/25"
          >
            <Download className="w-5 h-5" />
            Download E-Ticket
          </button>
          <button
            onClick={handleSaveOffline}
            className="w-full flex items-center justify-center gap-2 border-2 border-blue text-blue py-3.5 rounded-xl font-semibold hover:bg-blue/5 transition-all"
          >
            <WifiOff className="w-4 h-4" />
            Save for Offline Access
          </button>
        </div>
      </div>
    </div>
  );
}
