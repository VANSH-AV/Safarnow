import { useState } from 'react';
import { useNotification } from '../context/NotificationContext';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageSquare,
  ChevronDown,
  HelpCircle,
} from 'lucide-react';

const contactInfo = [
  { icon: Mail, title: 'Email Us', detail: 'hello@safarnow.com', sub: 'We reply within 24 hours', color: 'bg-blue/10 text-blue' },
  { icon: Phone, title: 'Call Us', detail: '+91 11 2345 6789', sub: 'Mon - Sat, 9 AM - 7 PM', color: 'bg-success/10 text-success' },
  { icon: MapPin, title: 'Visit Us', detail: '123 Travel Avenue, New Delhi', sub: 'India - 110001', color: 'bg-orange/10 text-orange' },
];

const faqs = [
  { q: 'How does the AI trip planner work?', a: 'Our AI analyzes your preferences, budget, and travel dates to generate personalized itineraries. It considers real-time safety data, weather conditions, and crowd levels to suggest the best activities and timings.' },
  { q: 'Is my booking secure?', a: 'Absolutely. We use industry-standard encryption for all transactions. Your payment details are never stored on our servers. You also get free cancellation up to 48 hours before check-in.' },
  { q: 'How accurate is the crowd prediction?', a: 'Our crowd prediction engine uses historical data, real-time signals, and machine learning models. It is approximately 90% accurate and helps you plan visits during optimal times.' },
  { q: 'Can I modify my booking after confirmation?', a: 'Yes, you can modify dates, room type, or traveler details up to 48 hours before check-in from your My Trips dashboard. Changes may affect pricing.' },
  { q: 'What safety features does Safarnow offer?', a: 'We provide real-time safety scores for destinations, nearby emergency services with directions, weather alerts, crowd density warnings, and an SOS feature for emergencies.' },
];

export default function Contact() {
  const { addNotification } = useNotification();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [openFaq, setOpenFaq] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      addNotification('Please fill in all required fields', 'error');
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      addNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
      setForm({ name: '', email: '', subject: '', message: '' });
      setSubmitting(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-light">
      <div className="bg-gradient-to-br from-navy via-navy to-blue py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <MessageSquare className="w-10 h-10 text-sky mx-auto mb-4" />
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">We&apos;re Here to Help</h1>
          <p className="text-white/70 text-lg max-w-xl mx-auto">
            Have questions, feedback, or need assistance? Reach out to our team.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-12">
          {contactInfo.map((c) => (
            <div key={c.title} className="bg-white rounded-2xl border border-gray-100 p-6 text-center hover:shadow-lg transition-all">
              <div className={`w-14 h-14 ${c.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                <c.icon className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-dark mb-1">{c.title}</h3>
              <p className="text-sm font-medium text-dark">{c.detail}</p>
              <p className="text-xs text-muted mt-1">{c.sub}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8">
            <h2 className="text-xl font-bold text-dark mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-dark mb-1.5">Name *</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name"
                    className="w-full px-4 py-3 bg-light border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue/30 focus:border-blue transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark mb-1.5">Email *</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@email.com"
                    className="w-full px-4 py-3 bg-light border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue/30 focus:border-blue transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-dark mb-1.5">Subject</label>
                <input
                  type="text"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  placeholder="How can we help?"
                  className="w-full px-4 py-3 bg-light border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue/30 focus:border-blue transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark mb-1.5">Message *</label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell us more about your inquiry..."
                  rows={5}
                  className="w-full px-4 py-3 bg-light border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue/30 focus:border-blue transition-all resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="flex items-center justify-center gap-2 bg-blue text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-blue/90 transition-all disabled:opacity-60 w-full sm:w-auto"
              >
                {submitting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          <div>
            <h2 className="text-xl font-bold text-dark mb-6 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-blue" />
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left"
                  >
                    <span className="text-sm font-semibold text-dark pr-4">{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-muted shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-5 -mt-2">
                      <p className="text-sm text-muted leading-relaxed">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
