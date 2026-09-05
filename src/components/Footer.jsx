import { Link } from 'react-router-dom';
import { Globe, MessageCircle, Camera, Play, Mail, Phone, MapPin } from 'lucide-react';

const quickLinks = [
  { to: '/destinations', label: 'Destinations' },
  { to: '/packages', label: 'Travel Packages' },
  { to: '/hotels', label: 'Hotels' },
  { to: '/ai-planner', label: 'AI Trip Planner' },
  { to: '/safety', label: 'Safety Hub' },
];

const supportLinks = [
  { to: '/contact', label: 'Contact Us' },
  { to: '/contact', label: 'FAQs' },
  { to: '/trips', label: 'My Trips' },
  { to: '/safety', label: 'Safety Hub' },
  { to: '/analytics', label: 'Tourism Analytics' },
];

const socials = [
  { icon: Globe, href: '#', label: 'Facebook' },
  { icon: MessageCircle, href: '#', label: 'Twitter' },
  { icon: Camera, href: '#', label: 'Instagram' },
  { icon: Play, href: '#', label: 'YouTube' },
];

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 w-fit">
              <img
                src="/safarnow-logo.png"
                alt="Safarnow"
                className="h-9 w-auto rounded-md bg-white/90 p-1"
              />
            </Link>
            <p className="text-sky/70 text-sm leading-relaxed">
              Explore. Discover. Experience.
            </p>
            <p className="text-sky/50 text-sm leading-relaxed">
              Your intelligent travel companion for planning safer, smarter, and more memorable journeys across India.
            </p>
            <div className="flex items-center gap-3 pt-2">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-sky/30 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/90 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-sky/60 hover:text-sky transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/90 mb-4">
              Support
            </h3>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-sky/60 hover:text-sky transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/90 mb-4">
              Contact Info
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-sky/60">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-sky/40" />
                123 Travel Avenue, New Delhi, India
              </li>
              <li className="flex items-center gap-3 text-sm text-sky/60">
                <Phone className="w-4 h-4 shrink-0 text-sky/40" />
                +91 11 2345 6789
              </li>
              <li className="flex items-center gap-3 text-sm text-sky/60">
                <Mail className="w-4 h-4 shrink-0 text-sky/40" />
                hello@safarnow.com
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-sky/40">
            © 2026 Safarnow. All rights reserved.
          </p>
          <p className="text-xs text-sky/30">
            Made with care for travelers who value safety and discovery.
          </p>
        </div>
      </div>
    </footer>
  );
}
