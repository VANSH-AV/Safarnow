import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import NotificationToast from './components/NotificationToast';
import OfflineIndicator from './components/OfflineIndicator';
import { useOffline } from './context/OfflineContext';
import Home from './pages/Home';

const AIPlanner = lazy(() => import('./pages/AIPlanner'));
const Destinations = lazy(() => import('./pages/Destinations'));
const DestinationDetail = lazy(() => import('./pages/DestinationDetail'));
const Packages = lazy(() => import('./pages/Packages'));
const PackageDetail = lazy(() => import('./pages/PackageDetail'));
const Hotels = lazy(() => import('./pages/Hotels'));
const HotelDetail = lazy(() => import('./pages/HotelDetail'));
const Booking = lazy(() => import('./pages/Booking'));
const BookingSuccess = lazy(() => import('./pages/BookingSuccess'));
const MyTrips = lazy(() => import('./pages/MyTrips'));
const Safety = lazy(() => import('./pages/Safety'));
const Analytics = lazy(() => import('./pages/Analytics'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const Contact = lazy(() => import('./pages/Contact'));
const Share = lazy(() => import('./pages/Share'));
const Admin = lazy(() => import('./pages/Admin'));
const NotFound = lazy(() => import('./pages/NotFound'));

const authPages = ['/login', '/signup'];

const pageMeta = [
  { match: '/destinations/', title: (id) => `${idToTitle(id)} | Safarnow`, desc: 'Explore destination details, weather, crowd and safety.' },
  { match: '/destinations', title: 'Destinations | Safarnow', desc: 'Browse the best travel destinations with safety scores and crowd intelligence.' },
  { match: '/packages/', title: (id) => `${idToTitle(id)} Package | Safarnow`, desc: 'View package itinerary, inclusions and pricing.' },
  { match: '/packages', title: 'Travel Packages | Safarnow', desc: 'Handpicked travel packages with the best value.' },
  { match: '/hotels/', title: (id) => `${idToTitle(id)} | Safarnow Hotels`, desc: 'View hotel details, amenities and pricing.' },
  { match: '/hotels', title: 'Hotels | Safarnow', desc: 'Find the best stays at every destination.' },
  { match: '/booking', title: 'Complete Your Booking | Safarnow', desc: 'Review your trip and enter traveler details.' },
  { match: '/trips', title: 'My Trips | Safarnow', desc: 'Manage and track all your adventures.' },
  { match: '/safety', title: 'Safety Hub | Safarnow', desc: 'Travel safer with real-time safety tools and emergency services.' },
  { match: '/analytics', title: 'Tourism Analytics | Safarnow', desc: 'Destination insights and smart travel analytics.' },
  { match: '/ai-planner', title: 'AI Trip Planner | Safarnow', desc: 'Let AI craft your perfect itinerary in seconds.' },
  { match: '/login', title: 'Sign In | Safarnow', desc: 'Sign in to continue your journey.' },
  { match: '/signup', title: 'Create Account | Safarnow', desc: 'Join Safarnow for smarter travel planning.' },
  { match: '/contact', title: 'Contact & Support | Safarnow', desc: 'Get in touch with the Safarnow team.' },
  { match: '/share/', title: 'Shared Itinerary | Safarnow', desc: 'A friend shared their AI-planned itinerary with you.' },
  { match: '/admin', title: 'Admin Studio | Safarnow', desc: 'Manage destinations, packages and hotels.' },
  { match: '/share/', title: 'Shared Itinerary | Safarnow', desc: 'A friend shared their AI-planned trip with you.' },
];

function idToTitle(id) {
  if (!id) return '';
  return id
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

function usePageMeta() {
  const location = useLocation();
  useEffect(() => {
    const path = location.pathname;
    const entry =
      pageMeta.find((m) => path.startsWith(m.match)) ||
      { title: 'Safarnow - AI Powered Smart Tourism', desc: 'Plan safer, smarter trips with AI-powered smart tourism.' };
    document.title = typeof entry.title === 'function' ? entry.title(path.split('/').pop()) : entry.title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', entry.desc);
  }, [location.pathname]);
}

function PageLoading() {
  return (
    <div className="flex items-center justify-center py-32">
      <div className="w-8 h-8 border-2 border-blue/30 border-t-blue rounded-full animate-spin" />
    </div>
  );
}

export default function App() {
  const location = useLocation();
  usePageMeta();
  const { isOnline, hasOfflineData } = useOffline();
  const hideLayout = authPages.includes(location.pathname);

  return (
    <div className="min-h-screen bg-light flex flex-col">
      <NotificationToast />
      {!hideLayout && <Navbar />}
      {!hideLayout && !isOnline && hasOfflineData && (
        <div className="bg-amber-500 text-white text-center text-sm py-2 px-4">
          Internet connection unavailable. Your saved itinerary is still available offline.
        </div>
      )}
      <main className="flex-1">
        <Suspense fallback={<PageLoading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ai-planner" element={<AIPlanner />} />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/destinations/:id" element={<DestinationDetail />} />
            <Route path="/packages" element={<Packages />} />
            <Route path="/packages/:id" element={<PackageDetail />} />
            <Route path="/hotels" element={<Hotels />} />
            <Route path="/hotels/:id" element={<HotelDetail />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/booking/success" element={<BookingSuccess />} />
            <Route path="/trips" element={<MyTrips />} />
            <Route path="/safety" element={<Safety />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/share/:token" element={<Share />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      {!hideLayout && <Footer />}
      {!hideLayout && <OfflineIndicator />}
    </div>
  );
}