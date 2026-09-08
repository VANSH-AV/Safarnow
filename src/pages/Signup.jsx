import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SignUp } from '@clerk/clerk-react';
import { useAuth, useAuthMode } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Check,
} from 'lucide-react';

const travelPreferences = [
  { id: 'Adventure', label: 'Adventure' },
  { id: 'Nature', label: 'Nature' },
  { id: 'Beach', label: 'Beach' },
  { id: 'Culture', label: 'Culture' },
  { id: 'Food', label: 'Food' },
  { id: 'History', label: 'History' },
];

const clerkAppearance = {
  variables: {
    colorPrimary: '#1688D4',
    colorText: '#0B2D4D',
    borderRadius: '0.75rem',
  },
  elements: {
    header: { display: 'none' },
    footer: { display: 'none' },
    card: { boxShadow: 'none', border: 'none', width: '100%' },
    socialButtonsBlockButton: { borderRadius: '0.75rem' },
    formButtonPrimary: { borderRadius: '0.75rem', textTransform: 'none' },
    divider: { margin: '1.5rem 0' },
  },
};

function ClerkSignup() {
  return (
    <div>
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white text-muted">create your Safarnow account</span>
        </div>
      </div>
      <SignUp
        appearance={clerkAppearance}
        afterSignUpUrl="/"
        signInUrl="/login"
      />
    </div>
  );
}

function LocalSignup() {
  const { signup } = useAuth();
  const { addNotification } = useNotification();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    preferences: [],
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const togglePreference = (pref) => {
    setForm((prev) => ({
      ...prev,
      preferences: prev.preferences.includes(pref)
        ? prev.preferences.filter((p) => p !== pref)
        : [...prev.preferences, pref],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.fullName || !form.email || !form.password) {
      setError('Please fill in all required fields');
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    setLoading(true);
    try {
      const result = await signup(form.fullName, form.email, form.password, form.preferences);
      if (result.success) {
        addNotification(result.message || 'Account created successfully! Welcome to Safarnow.', 'success');
        navigate('/');
      } else {
        setError(result.error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {error && (
        <div className="bg-danger/10 border border-danger/20 text-danger text-sm px-4 py-3 rounded-xl mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-dark mb-1.5">Full Name *</label>
          <div className="relative">
            <User className="absolute left-3.5 inset-y-0 my-auto w-4 h-4 text-muted pointer-events-none" />
            <input
              type="text"
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              placeholder="John Doe"
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue/30 focus:border-blue transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-dark mb-1.5">Email Address *</label>
          <div className="relative">
            <Mail className="absolute left-3.5 inset-y-0 my-auto w-4 h-4 text-muted pointer-events-none" />
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="you@example.com"
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue/30 focus:border-blue transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-dark mb-1.5">Password *</label>
            <div className="relative">
              <Lock className="absolute left-3.5 inset-y-0 my-auto w-4 h-4 text-muted" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="Min 6 chars"
                className="w-full pl-10 pr-10 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue/30 focus:border-blue transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 inset-y-0 my-auto text-muted hover:text-dark"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-dark mb-1.5">Confirm *</label>
            <div className="relative">
              <Lock className="absolute left-3.5 inset-y-0 my-auto w-4 h-4 text-muted" />
              <input
                type={showConfirm ? 'text' : 'password'}
                value={form.confirmPassword}
                onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                placeholder="Repeat"
                className="w-full pl-10 pr-10 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue/30 focus:border-blue transition-all"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3.5 inset-y-0 my-auto text-muted hover:text-dark"
              >
                {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-dark mb-2">Travel Preferences</label>
          <div className="flex flex-wrap gap-2">
            {travelPreferences.map((pref) => {
              const active = form.preferences.includes(pref.id);
              return (
                <button
                  key={pref.id}
                  type="button"
                  onClick={() => togglePreference(pref.id)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all border ${
                    active
                      ? 'bg-blue text-white border-blue'
                      : 'bg-white text-dark border-gray-200 hover:border-blue hover:text-blue'
                  }`}
                >
                  {active && <Check className="w-3.5 h-3.5 inline mr-1" />}
                  {pref.label}
                </button>
              );
            })}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-blue text-white py-3.5 rounded-xl font-semibold hover:bg-blue/90 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              Create Account
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>
    </>
  );
}

export default function Signup() {
  const mode = useAuthMode();

  return (
    <div className="min-h-screen flex bg-light">
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-navy via-navy to-blue overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&q=80"
            alt="Adventure"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-navy/90 via-navy/80 to-blue/70" />
        </div>
        <div className="relative z-10 flex flex-col justify-center px-16">
          <Link to="/" className="flex items-center gap-2 mb-12 w-fit">
            <img
              src="/safarnow-logo.png"
              alt="Safarnow"
              className="h-10 w-auto rounded-md bg-white/90 p-1"
            />
          </Link>
          <h2 className="text-4xl font-bold text-white leading-tight mb-6">
            Start your journey with us today.
          </h2>
          <p className="text-lg text-white/70 leading-relaxed max-w-md">
            Create your account and let our AI find the perfect trips tailored just for you.
          </p>
          <div className="mt-10 space-y-4">
            {['AI-powered trip planning', 'Real-time safety alerts', 'Smart crowd predictions'].map((feature) => (
              <div key={feature} className="flex items-center gap-3">
                <div className="w-6 h-6 bg-sky/20 rounded-full flex items-center justify-center">
                  <Check className="w-3.5 h-3.5 text-sky" />
                </div>
                <span className="text-white/80 text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center mb-8">
            <img src="/safarnow-logo.png" alt="Safarnow" className="h-8 w-auto" />
          </div>

          <h1 className="text-3xl font-bold text-dark mb-2">Create Account</h1>
          <p className="text-muted mb-8">Join Safarnow for smarter travel planning</p>

          {mode === 'clerk' ? (
            <ClerkSignup />
          ) : (
            <LocalSignup />
          )}

          <p className="text-center text-sm text-muted mt-8">
            Already have an account?{' '}
            <Link to="/login" className="text-blue font-semibold hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}