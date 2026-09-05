import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useOffline } from '../context/OfflineContext';
import SearchModal from './SearchModal';
import {
  Search,
  Menu,
  X,
  User,
  LogOut,
  MapPin,
  ChevronDown,
  Wifi,
  WifiOff,
} from 'lucide-react';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/ai-planner', label: 'AI Trip Planner', badge: 'AI' },
  { to: '/destinations', label: 'Destinations' },
  { to: '/packages', label: 'Packages' },
  { to: '/hotels', label: 'Hotels' },
  { to: '/safety', label: 'Safety' },
  { to: '/trips', label: 'My Trips' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  const { user, logout, isAuthenticated } = useAuth();
  const { isOnline } = useOffline();

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100">
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center shrink-0">
            <img src="/safarnow-logo.png" alt="Safarnow" className="h-8 w-auto" />
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  location.pathname === link.to
                    ? 'text-blue bg-blue/10'
                    : 'text-dark hover:text-blue hover:bg-blue/5'
                }`}
              >
                {link.label}
                {link.badge && (
                  <span className="absolute -top-1 -right-1 bg-orange text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-2 text-sm text-muted border border-gray-200 rounded-lg hover:border-blue hover:text-blue transition-colors"
              aria-label="Search destinations, packages, hotels, activities"
            >
              <Search className="w-4 h-4" />
              <span className="hidden xl:inline">Search...</span>
            </button>

            <div className={`flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-semibold ${
              isOnline ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-amber-50 text-amber-600 border border-amber-200'
            }`}>
              {isOnline ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
              {isOnline ? 'Online' : 'Offline Mode'}
            </div>

            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-dark hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="w-8 h-8 bg-blue/10 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-blue" />
                  </div>
                  <span className="max-w-[100px] truncate">{user?.name || 'Profile'}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-muted transition-transform ${profileOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {profileOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setProfileOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-semibold text-dark truncate">
                          {user?.name}
                        </p>
                        <p className="text-xs text-muted truncate">
                          {user?.email}
                        </p>
                      </div>
                      <Link
                        to="/trips"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-dark hover:bg-gray-50 transition-colors"
                      >
                        <MapPin className="w-4 h-4 text-muted" />
                        My Trips
                      </Link>
                      <button
                        onClick={() => {
                          setProfileOpen(false);
                          logout();
                        }}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-danger hover:bg-red-50 w-full text-left transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 px-4 py-2 bg-blue text-white text-sm font-medium rounded-lg hover:bg-blue/90 transition-colors"
              >
                <User className="w-4 h-4" />
                Login
              </Link>
            )}
          </div>

          <div className="lg:hidden flex items-center gap-1">
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 text-dark hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-dark hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white shadow-lg">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  location.pathname === link.to
                    ? 'text-blue bg-blue/10'
                    : 'text-dark hover:bg-gray-50'
                }`}
              >
                {link.label}
                {link.badge && (
                  <span className="bg-orange text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}

            <div className="border-t border-gray-100 pt-3 mt-3">
              {isAuthenticated ? (
                <>
                  <div className="px-4 py-2">
                    <p className="text-sm font-semibold text-dark">{user?.name}</p>
                    <p className="text-xs text-muted">{user?.email}</p>
                  </div>
                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      logout();
                    }}
                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-danger hover:bg-red-50 w-full rounded-lg transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-blue text-white text-sm font-medium rounded-lg w-full"
                >
                  <User className="w-4 h-4" />
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
