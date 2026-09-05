import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../context/NotificationContext';
import { generateBookingId } from '../utils/helpers';
import { saveBooking } from '../lib/backend';
import { useContent } from '../context/ContentContext';
import BookingSummary from '../components/BookingSummary';
import {
  User,
  Mail,
  Phone,
  Users,
  Calendar,
  MessageSquare,
  CreditCard,
  Shield,
  Tag,
  CheckCircle,
  ArrowRight,
} from 'lucide-react';

export default function Booking() {
  const navigate = useNavigate();
  const { addNotification } = useNotification();
  const { getDestinationById, getPackageById, getHotelById } = useContent();
  const [bookingData, setBookingData] = useState(null);
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    travelers: '2',
    checkIn: '',
    checkOut: '',
    specialRequests: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('safarnow_booking');
    if (stored) {
      try {
        setBookingData(JSON.parse(stored));
      } catch {
        navigate('/');
      }
    } else {
      navigate('/');
    }
  }, [navigate]);

  if (!bookingData) return null;

  const destination = getDestinationById(bookingData.destinationId);
  const pkg = bookingData.packageId ? getPackageById(bookingData.packageId) : null;
  const hotel = bookingData.hotelId ? getHotelById(bookingData.hotelId) : null;

  const packagePrice = pkg?.price || bookingData.packagePrice || 0;
  const hotelPrice = hotel?.pricePerNight || bookingData.hotelPrice || 0;
  const nights = bookingData.nights || 3;
  const travelerCount = parseInt(form.travelers) || 2;
  const subtotal = packagePrice + hotelPrice * nights;
  const taxes = Math.round(subtotal * 0.12);
  const discount = Math.round(subtotal * 0.05);
  const total = subtotal + taxes - discount;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.fullName || !form.email || !form.phone || !form.checkIn) {
      addNotification('Please fill in all required fields', 'error');
      return;
    }
    setLoading(true);
    try {
      const booking = {
        id: generateBookingId(),
        destinationId: bookingData.destinationId,
        destinationName: destination?.name || 'Unknown',
        packageId: bookingData.packageId || null,
        packageName: pkg?.name || 'Custom Trip',
        hotelId: bookingData.hotelId || null,
        hotelName: hotel?.name || 'N/A',
        travelerName: form.fullName,
        email: form.email,
        phone: form.phone,
        travelers: travelerCount,
        checkIn: form.checkIn,
        checkOut: form.checkOut,
        specialRequests: form.specialRequests,
        packagePrice,
        hotelPrice: hotelPrice * nights,
        taxes,
        discount,
        total,
        status: 'confirmed',
        bookedAt: new Date().toISOString(),
        image: destination?.image,
      };

      await saveBooking(booking);
      localStorage.setItem('safarnow_last_booking', JSON.stringify(booking));
      localStorage.removeItem('safarnow_booking');

      addNotification('Booking confirmed successfully!', 'success');
      navigate('/booking/success');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-dark">Complete Your Booking</h1>
          <p className="text-muted mt-2">Review your trip and fill in your details</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-dark mb-6 flex items-center gap-2">
                <User className="w-5 h-5 text-blue" />
                Traveler Details
              </h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-dark mb-1.5">Full Name *</label>
                    <div className="relative">
                      <User className="absolute left-3.5 inset-y-0 my-auto w-4 h-4 text-muted" />
                      <input
                        type="text"
                        name="fullName"
                        value={form.fullName}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full pl-10 pr-4 py-3 bg-light border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue/30 focus:border-blue transition-all"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark mb-1.5">Email *</label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 inset-y-0 my-auto w-4 h-4 text-muted" />
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="john@email.com"
                        className="w-full pl-10 pr-4 py-3 bg-light border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue/30 focus:border-blue transition-all"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark mb-1.5">Phone *</label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 inset-y-0 my-auto w-4 h-4 text-muted" />
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        className="w-full pl-10 pr-4 py-3 bg-light border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue/30 focus:border-blue transition-all"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark mb-1.5">Travelers</label>
                    <div className="relative">
                      <Users className="absolute left-3.5 inset-y-0 my-auto w-4 h-4 text-muted" />
                      <select
                        name="travelers"
                        value={form.travelers}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 bg-light border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue/30 focus:border-blue transition-all appearance-none"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                          <option key={n} value={n}>{n} {n === 1 ? 'Traveler' : 'Travelers'}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark mb-1.5">Check-in Date *</label>
                    <div className="relative">
                      <Calendar className="absolute left-3.5 inset-y-0 my-auto w-4 h-4 text-muted" />
                      <input
                        type="date"
                        name="checkIn"
                        value={form.checkIn}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 bg-light border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue/30 focus:border-blue transition-all"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark mb-1.5">Check-out Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-3.5 inset-y-0 my-auto w-4 h-4 text-muted" />
                      <input
                        type="date"
                        name="checkOut"
                        value={form.checkOut}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 bg-light border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue/30 focus:border-blue transition-all"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark mb-1.5">Special Requests</label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-muted" />
                    <textarea
                      name="specialRequests"
                      value={form.specialRequests}
                      onChange={handleChange}
                      placeholder="Dietary requirements, accessibility needs, celebrations..."
                      rows={3}
                      className="w-full pl-10 pr-4 py-3 bg-light border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue/30 focus:border-blue transition-all resize-none"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div className="space-y-6">
            <BookingSummary booking={bookingData} />

            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-dark mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-blue" />
                Price Breakdown
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Package ({pkg?.name || 'Trip'})</span>
                  <span className="font-medium text-dark">₹{packagePrice.toLocaleString()}</span>
                </div>
                {hotelPrice > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted">Hotel ({nights} nights)</span>
                    <span className="font-medium text-dark">₹{(hotelPrice * nights).toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Taxes & Fees (12%)</span>
                  <span className="font-medium text-dark">₹{taxes.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-success flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5" />
                    Early Bird Discount
                  </span>
                  <span className="font-medium text-success">-₹{discount.toLocaleString()}</span>
                </div>
                <div className="border-t border-gray-100 pt-3 mt-3">
                  <div className="flex justify-between">
                    <span className="text-base font-bold text-dark">Total</span>
                    <span className="text-xl font-bold text-blue">₹{total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-success/5 border border-success/20 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-success mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-dark">Secure Booking</p>
                  <p className="text-xs text-muted mt-1">Free cancellation up to 48 hours before check-in. Your payment is protected.</p>
                </div>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-orange text-white py-4 rounded-xl text-base font-semibold hover:bg-orange/90 transition-all shadow-lg shadow-orange/25 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <CheckCircle className="w-5 h-5" />
                  Confirm Booking
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
