import { Link } from 'react-router-dom';
import { Home, MapPin, Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-light flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="relative w-48 h-48 mx-auto mb-8">
          <div className="absolute inset-0 bg-blue/5 rounded-full" />
          <div className="absolute inset-4 bg-blue/10 rounded-full" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <span className="text-6xl font-bold text-blue/20">404</span>
            </div>
          </div>
          <div className="absolute -top-2 -right-2">
            <div className="w-12 h-12 bg-orange/10 rounded-xl flex items-center justify-center rotate-12">
              <MapPin className="w-6 h-6 text-orange" />
            </div>
          </div>
          <div className="absolute -bottom-1 left-4">
            <div className="w-10 h-10 bg-sky/10 rounded-lg flex items-center justify-center -rotate-6">
              <Compass className="w-5 h-5 text-sky" />
            </div>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-dark mb-3">Page Not Found</h1>
        <p className="text-muted mb-8 leading-relaxed">
          Looks like this destination doesn&apos;t exist on our map. Let&apos;s get you back on track.
        </p>

        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 bg-blue text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-blue/90 transition-all shadow-lg shadow-blue/25"
        >
          <Home className="w-5 h-5" />
          Go Home
        </Link>
      </div>
    </div>
  );
}
