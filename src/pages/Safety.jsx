import { useState } from 'react';
import { useNotification } from '../context/NotificationContext';
import SafetyScore from '../components/SafetyScore';
import Modal from '../components/Modal';
import {
  Shield,
  MapPin,
  Navigation,
  Info,
  HeartPulse,
  Pill,
  Building2,
  AlertTriangle,
  Cross,
  Headphones,
  Siren,
} from 'lucide-react';

const services = [
  { type: 'police', name: 'Police Station', icon: Shield, color: 'text-blue', bg: 'bg-blue/10', distance: '1.2 km', status: 'Open 24/7' },
  { type: 'hospital', name: 'City Hospital', icon: HeartPulse, color: 'text-danger', bg: 'bg-danger/10', distance: '2.5 km', status: 'Open 24/7' },
  { type: 'pharmacy', name: 'MedPlus Pharmacy', icon: Pill, color: 'text-success', bg: 'bg-success/10', distance: '0.5 km', status: 'Open till 10 PM' },
  { type: 'tourist', name: 'Tourist Center', icon: Building2, color: 'text-orange', bg: 'bg-orange/10', distance: '1.8 km', status: '9 AM - 6 PM' },
];

const emergencyContacts = [
  { label: 'Police', number: '100', icon: Shield, color: 'bg-blue', textColor: 'text-white' },
  { label: 'Ambulance', number: '108', icon: Cross, color: 'bg-danger', textColor: 'text-white' },
  { label: 'Hospital', number: '1066', icon: HeartPulse, color: 'bg-success', textColor: 'text-white' },
  { label: 'Tourist Helpline', number: '1363', icon: Headphones, color: 'bg-orange', textColor: 'text-white' },
];

export default function Safety() {
  const { addNotification } = useNotification();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', message: '' });

  const handleGetDirections = (service) => {
    addNotification(`Getting directions to ${service.name}...`, 'info');
  };

  const handleViewDetails = (service) => {
    addNotification(`Viewing details for ${service.name}`, 'info');
  };

  const handleEmergency = (contact) => {
    setModalContent({
      title: `Emergency: ${contact.label}`,
      message: `Simulating a call to ${contact.label} at ${contact.number}. In a real scenario, this would initiate an emergency call. Stay calm and follow the operator's instructions.`,
    });
    setModalOpen(true);
    addNotification(`Emergency ${contact.label} request triggered`, 'warning');
  };

  return (
    <div className="min-h-screen bg-light">
      <div className="bg-gradient-to-br from-navy via-navy to-blue py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-8 h-8 text-sky" />
            <h1 className="text-3xl sm:text-4xl font-bold text-white">Travel Safer with Safarnow</h1>
          </div>
          <p className="text-white/70 text-lg max-w-2xl">
            Real-time safety data, nearby emergency services, and instant alerts — all at your fingertips.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-dark mb-6">Safety Map</h2>
          <div className="relative bg-gradient-to-br from-blue/5 to-sky/10 border-2 border-dashed border-blue/20 rounded-2xl h-[300px] sm:h-[400px] overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-[20%] left-[15%] w-3 h-3 bg-blue rounded-full animate-pulse-soft" />
              <div className="absolute top-[35%] left-[60%] w-3 h-3 bg-danger rounded-full animate-pulse-soft" style={{ animationDelay: '0.5s' }} />
              <div className="absolute top-[65%] left-[30%] w-3 h-3 bg-success rounded-full animate-pulse-soft" style={{ animationDelay: '1s' }} />
              <div className="absolute top-[45%] left-[80%] w-3 h-3 bg-orange rounded-full animate-pulse-soft" style={{ animationDelay: '1.5s' }} />
              <div className="absolute top-[55%] left-[45%] w-4 h-4 bg-navy rounded-full border-2 border-white shadow-lg z-10" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-blue/40 mx-auto mb-3" />
                <p className="text-dark/50 font-medium">Interactive Map View</p>
                <p className="text-sm text-muted/50 mt-1">Real-time safety services near you</p>
              </div>
            </div>
            {services.map((s, i) => {
              const positions = [
                { top: '18%', left: '12%' },
                { top: '32%', left: '58%' },
                { top: '62%', left: '28%' },
                { top: '42%', left: '78%' },
              ];
              return (
                <div
                  key={s.type}
                  className="absolute group cursor-pointer"
                  style={positions[i]}
                >
                  <div className={`w-8 h-8 ${s.bg} rounded-full flex items-center justify-center shadow-md border-2 border-white`}>
                    <s.icon className={`w-4 h-4 ${s.color}`} />
                  </div>
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-dark text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg">
                    {s.name} · {s.distance}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold text-dark mb-6">Nearby Safety Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((service) => (
              <div key={service.type} className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-lg transition-all">
                <div className={`w-12 h-12 ${service.bg} rounded-xl flex items-center justify-center mb-4`}>
                  <service.icon className={`w-6 h-6 ${service.color}`} />
                </div>
                <h3 className="text-base font-bold text-dark mb-1">{service.name}</h3>
                <p className="text-sm text-muted mb-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {service.distance}
                </p>
                <p className="text-xs text-success font-medium mb-4">{service.status}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleGetDirections(service)}
                    className="flex-1 flex items-center justify-center gap-1 bg-blue/10 text-blue py-2 rounded-lg text-xs font-semibold hover:bg-blue/20 transition-colors"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    Directions
                  </button>
                  <button
                    onClick={() => handleViewDetails(service)}
                    className="flex-1 flex items-center justify-center gap-1 border border-gray-200 text-dark py-2 rounded-lg text-xs font-semibold hover:bg-gray-50 transition-colors"
                  >
                    <Info className="w-3.5 h-3.5" />
                    Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold text-dark mb-2 flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-danger" />
            Emergency Assistance
          </h2>
          <p className="text-muted mb-6">Quick access to emergency services. Stay safe wherever you are.</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {emergencyContacts.map((contact) => (
              <button
                key={contact.label}
                onClick={() => handleEmergency(contact)}
                className={`${contact.color} ${contact.textColor} rounded-2xl p-6 text-center hover:opacity-90 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg`}
              >
                <contact.icon className="w-8 h-8 mx-auto mb-3" />
                <p className="text-lg font-bold mb-1">{contact.label}</p>
                <p className="text-sm opacity-90">{contact.number}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-dark mb-6 flex items-center gap-2">
            <Shield className="w-6 h-6 text-success" />
            Safety Score Overview
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <SafetyScore score={88} size="lg" showLabel={false} />
              <p className="text-sm font-semibold text-dark mt-3">Overall Safety</p>
              <p className="text-xs text-muted">Based on real-time data</p>
            </div>
            <div className="text-center">
              <SafetyScore score={92} size="lg" showLabel={false} />
              <p className="text-sm font-semibold text-dark mt-3">Infrastructure</p>
              <p className="text-xs text-muted">Roads & facilities</p>
            </div>
            <div className="text-center">
              <SafetyScore score={85} size="lg" showLabel={false} />
              <p className="text-sm font-semibold text-dark mt-3">Emergency Access</p>
              <p className="text-xs text-muted">Response time rating</p>
            </div>
            <div className="text-center">
              <SafetyScore score={78} size="lg" showLabel={false} />
              <p className="text-sm font-semibold text-dark mt-3">Weather Risk</p>
              <p className="text-xs text-muted">Current conditions</p>
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={modalContent.title}>
        <div className="text-center">
          <div className="w-16 h-16 bg-danger/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Siren className="w-8 h-8 text-danger" />
          </div>
          <p className="text-sm text-muted leading-relaxed">{modalContent.message}</p>
          <button
            onClick={() => setModalOpen(false)}
            className="mt-6 w-full bg-navy text-white py-3 rounded-xl font-semibold hover:bg-navy/90 transition-colors"
          >
            Understood
          </button>
        </div>
      </Modal>
    </div>
  );
}
