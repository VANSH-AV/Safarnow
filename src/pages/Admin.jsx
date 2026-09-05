import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { useContent } from '../context/ContentContext';
import { addContent, removeContent, listAdminContent, importContent, isAdminUser, getAdminGuidance } from '../lib/backend';
import { isSupabaseEnabled } from '../lib/supabase';
import {
  ShieldCheck,
  Plus,
  Trash2,
  Edit3,
  MapPin,
  Package,
  Hotel,
  ArrowLeft,
  Save,
  Download,
  Image as ImageIcon,
} from 'lucide-react';

const EMPTY_DEST = {
  id: '',
  name: '',
  state: '',
  country: 'India',
  image: '',
  description: '',
  rating: 4.5,
  safetyScore: 85,
  crowdLevel: 'Moderate',
  bestSeason: 'October - March',
  avgBudget: 15000,
  recommendedDuration: '4-5 Days',
  categories: [],
  attractions: [{ name: '', type: 'Nature' }],
  thingsToDo: [],
};

const EMPTY_PKG = {
  id: '',
  name: '',
  destination: '',
  image: '',
  duration: '4 Days / 3 Nights',
  days: 4,
  rating: 4.5,
  originalPrice: 15000,
  price: 11000,
  highlights: [],
  inclusions: [],
  travelType: [],
  budget: 'Moderate',
  safetyScore: 85,
  crowdLevel: 'Moderate',
  hotels: [],
};

const EMPTY_HOTEL = {
  id: '',
  name: '',
  destination: '',
  image: '',
  location: '',
  rating: 4.5,
  stars: 4,
  pricePerNight: 4000,
  amenities: [],
  safetyScore: 88,
};

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function withDefaults(dest) {
  const crowdLevel = dest.crowdLevel || 'Moderate';
  const base = crowdLevel === 'High' ? 65 : crowdLevel === 'Low' ? 25 : 40;
  const crowdData = {};
  ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'].forEach((d) => {
    const boost = d === 'fri' || d === 'sat' ? 18 : d === 'sun' ? 12 : 0;
    crowdData[d] = {
      morning: base - 15,
      afternoon: base + boost,
      evening: base - 5 + boost,
    };
  });
  return { ...dest, id: dest.id || slugify(dest.name || 'item'), crowdData };
}

export default function Admin() {
  const { user, isAuthenticated } = useAuth();
  const { addNotification } = useNotification();
  const { destinations, packages, hotels } = useContent();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [guidance, setGuidance] = useState(null);
  const [tab, setTab] = useState('destinations');
  const [editing, setEditing] = useState(null);
  const [list, setList] = useState([]);

  useEffect(() => {
    let alive = true;
    (async () => {
      const uid = await getAdminGuidance();
      if (!alive) return;
      setGuidance(uid);
      const admin = await isAdminUser(uid);
      if (alive) {
        setIsAdmin(admin);
        setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [isAuthenticated, user?.id]);

  useEffect(() => {
    if (!isAdmin) return;
    let alive = true;
    listAdminContent(tab).then((rows) => {
      if (!alive) return;
      setList(rows);
    });
    return () => {
      alive = false;
    };
  }, [isAdmin, tab]);

  const schema = {
    destinations: { table: 'destinations', empty: EMPTY_DEST, label: 'Destination' },
    packages: { table: 'packages', empty: EMPTY_PKG, label: 'Package' },
    hotels: { table: 'hotels', empty: EMPTY_HOTEL, label: 'Hotel' },
  }[tab];

  const handleValue = (key, value) => {
    setEditing((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    if (!editing?.name) {
      addNotification('Name is required', 'error');
      return;
    }
    const item = tab === 'destinations' ? withDefaults(editing) : { ...editing, id: editing.id || slugify(editing.name) };
    if (!item.id) {
      addNotification('Name must produce a valid id', 'error');
      return;
    }
    const res = await addContent(schema.table, item, guidance);
    if (res.error) {
      addNotification(res.error, 'error');
    } else {
      addNotification(`${schema.label} saved!`, 'success');
      setEditing(null);
      setList(await listAdminContent(tab));
    }
  };

  const handleDelete = async (id) => {
    const item = list.find((r) => r.id === id) || {};
    if (!window.confirm(`Delete ${item.name || id}?`)) return;
    const res = await removeContent(schema.table, id, guidance);
    if (res.error) {
      addNotification(res.error, 'error');
    } else {
      addNotification('Deleted!', 'success');
      setList(await listAdminContent(tab));
    }
  };

  const handleImport = async () => {
    const items = { destinations, packages, hotels }[tab] || [];
    if (!window.confirm(`Import all ${items.length} bundled ${schema.table} into Supabase?`)) return;
    const res = await importContent(schema.table, items, guidance);
    if (res.error) {
      addNotification(res.error, 'error');
      return;
    }
    addNotification(
      res.errors.length
        ? `Imported ${res.inserted}, skipped ${res.skipped}, ${res.errors.length} failed`
        : `Imported ${res.inserted} ${schema.table} (${res.skipped} already present)`,
      res.errors.length ? 'error' : 'success'
    );
    setList(await listAdminContent(tab));
  };

  const renderHeader = () => (
    <div className="flex flex-wrap items-center gap-3 mb-6">
      {[['destinations', MapPin, 'Destinations'], ['packages', Package, 'Packages'], ['hotels', Hotel, 'Hotels']].map(([key, Icon, label]) => (
        <button
          key={key}
          onClick={() => { setTab(key); setEditing(null); }}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all ${
            tab === key ? 'bg-navy text-white shadow-md' : 'bg-white text-muted border border-gray-200 hover:bg-gray-50'
          }`}
        >
          <Icon className="w-4 h-4" /> {label}
        </button>
      ))}
      <button
        onClick={handleImport}
        className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold bg-white text-dark border border-gray-200 hover:bg-gray-50 transition-all"
        title={`Import all ${({ destinations, packages, hotels }[tab] || []).length} bundled ${schema.table} into Supabase`}
      >
        <Download className="w-4 h-4" /> Import {schema.table}
      </button>
      <button
        onClick={() => { setEditing(null); beforeEdit(); }}
        className="ml-auto flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold bg-orange text-white hover:bg-orange/90 transition-all"
      >
        <Plus className="w-4 h-4" /> New {schema.label}
      </button>
    </div>
  );

  const beforeEdit = () => {
    setEditing({ ...schema.empty });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-light flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue/30 border-t-blue rounded-full animate-spin" />
      </div>
    );
  }

  const sortedExisting = {
    destinations,
    packages,
    hotels,
  }[tab];

  return (
    <div className="min-h-screen bg-light">
      <div className="bg-gradient-to-br from-navy via-navy to-blue py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/" className="inline-flex items-center gap-2 text-white/70 text-sm mb-6 hover:text-white">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <div className="flex items-center gap-3 mb-3">
            <ShieldCheck className="w-8 h-8 text-sky" />
            <h1 className="text-3xl sm:text-4xl font-bold text-white">Admin Studio</h1>
          </div>
          <p className="text-white/70 text-lg">Manage catalog content for the Safarnow app</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!isSupabaseEnabled && (
          <div className="bg-warning/10 border border-warning/30 text-warning px-4 py-3 rounded-xl mb-6 text-sm">
            Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to enable content management.
          </div>
        )}

        {!isAuthenticated && (
          <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center">
            <ShieldCheck className="w-12 h-12 text-muted mx-auto mb-4" />
            <h2 className="text-xl font-bold text-dark mb-2">Admin access required</h2>
            <p className="text-muted mb-6">Sign in with an admin account to manage content.</p>
            <Link to="/login" className="inline-flex items-center gap-2 bg-blue text-white px-6 py-3 rounded-xl font-semibold">
              Sign In
            </Link>
          </div>
        )}

        {isAuthenticated && !isAdmin && (
          <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center">
            <ShieldCheck className="w-12 h-12 text-warning mx-auto mb-4" />
            <h2 className="text-xl font-bold text-dark mb-2">Not an admin yet</h2>
            <p className="text-muted mb-4">Your account isn't in the admin_users table.</p>
            <p className="text-sm bg-light border border-gray-200 rounded-xl px-4 py-3 mb-2 font-mono text-dark inline-block">
              INSERT INTO admin_users (user_id) VALUES ('{guidance || 'your-user-id'}');
            </p>
            <p className="text-xs text-muted mt-2">
              Run this in Supabase → SQL Editor after creating your account.
            </p>
          </div>
        )}

        {isAuthenticated && isAdmin && (
          <div>
            {renderHeader()}

            {editing ? (
              <form
                onSubmit={(e) => { e.preventDefault(); handleSave(); }}
                className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5"
              >
                {tab === 'destinations' && (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Field label="Name" value={editing.name} onChange={(v) => handleValue('name', v)} />
                      <Field label="ID (auto from name)" value={editing.id} onChange={(v) => handleValue('id', v)} />
                      <Field label="State" value={editing.state} onChange={(v) => handleValue('state', v)} />
                      <Field label="Country" value={editing.country} onChange={(v) => handleValue('country', v)} />
                      <Field label="Image URL" value={editing.image} onChange={(v) => handleValue('image', v)} icon={<ImageIcon className="w-4 h-4 text-muted" />} />
                      <Field label="Rating" type="number" step="0.1" value={editing.rating} onChange={(v) => handleValue('rating', Number(v))} />
                      <Field label="Safety Score (0-100)" type="number" value={editing.safetyScore} onChange={(v) => handleValue('safetyScore', Number(v))} />
                      <Field label="Crowd Level" value={editing.crowdLevel} onChange={(v) => handleValue('crowdLevel', v)} />
                      <Field label="Best Season" value={editing.bestSeason} onChange={(v) => handleValue('bestSeason', v)} />
                      <Field label="Avg Budget (₹)" type="number" value={editing.avgBudget} onChange={(v) => handleValue('avgBudget', Number(v))} />
                      <Field label="Recommended Duration" value={editing.recommendedDuration} onChange={(v) => handleValue('recommendedDuration', v)} />
                      <Field label="Categories (comma separated)" value={Array.isArray(editing.categories) ? editing.categories.join(', ') : editing.categories} onChange={(v) => handleValue('categories', v.split(',').map((s) => s.trim()).filter(Boolean))} />
                      <Field label="Things to do (comma separated)" value={Array.isArray(editing.thingsToDo) ? editing.thingsToDo.join(', ') : editing.thingsToDo} onChange={(v) => handleValue('thingsToDo', v.split(',').map((s) => s.trim()).filter(Boolean))} />
                    </div>
                    <Field label="Description" textarea value={editing.description} onChange={(v) => handleValue('description', v)} />
                  </>
                )}

                {tab === 'packages' && (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Field label="Name" value={editing.name} onChange={(v) => handleValue('name', v)} />
                      <Field label="Destination ID" value={editing.destination} onChange={(v) => handleValue('destination', v)} />
                      <Field label="Image URL" value={editing.image} onChange={(v) => handleValue('image', v)} icon={<ImageIcon className="w-4 h-4 text-muted" />} />
                      <Field label="Duration" value={editing.duration} onChange={(v) => handleValue('duration', v)} />
                      <Field label="Days" type="number" value={editing.days} onChange={(v) => handleValue('days', Number(v))} />
                      <Field label="Rating" type="number" step="0.1" value={editing.rating} onChange={(v) => handleValue('rating', Number(v))} />
                      <Field label="Original Price (₹)" type="number" value={editing.originalPrice} onChange={(v) => handleValue('originalPrice', Number(v))} />
                      <Field label="Offer Price (₹)" type="number" value={editing.price} onChange={(v) => handleValue('price', Number(v))} />
                      <Field label="Budget" value={editing.budget} onChange={(v) => handleValue('budget', v)} />
                      <Field label="Safety Score" type="number" value={editing.safetyScore} onChange={(v) => handleValue('safetyScore', Number(v))} />
                      <Field label="Crowd Level" value={editing.crowdLevel} onChange={(v) => handleValue('crowdLevel', v)} />
                      <Field label="Highlights (comma separated)" value={Array.isArray(editing.highlights) ? editing.highlights.join(', ') : editing.highlights} onChange={(v) => handleValue('highlights', v.split(',').map((s) => s.trim()).filter(Boolean))} />
                      <Field label="Inclusions (comma separated)" value={Array.isArray(editing.inclusions) ? editing.inclusions.join(', ') : editing.inclusions} onChange={(v) => handleValue('inclusions', v.split(',').map((s) => s.trim()).filter(Boolean))} />
                    </div>
                  </>
                )}

                {tab === 'hotels' && (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Field label="Name" value={editing.name} onChange={(v) => handleValue('name', v)} />
                      <Field label="Destination ID" value={editing.destination} onChange={(v) => handleValue('destination', v)} />
                      <Field label="Location" value={editing.location} onChange={(v) => handleValue('location', v)} />
                      <Field label="Image URL" value={editing.image} onChange={(v) => handleValue('image', v)} icon={<ImageIcon className="w-4 h-4 text-muted" />} />
                      <Field label="Stars" type="number" value={editing.stars} onChange={(v) => handleValue('stars', Number(v))} />
                      <Field label="Rating" type="number" step="0.1" value={editing.rating} onChange={(v) => handleValue('rating', Number(v))} />
                      <Field label="Price / Night (₹)" type="number" value={editing.pricePerNight} onChange={(v) => handleValue('pricePerNight', Number(v))} />
                      <Field label="Safety Score" type="number" value={editing.safetyScore} onChange={(v) => handleValue('safetyScore', Number(v))} />
                      <Field label="Amenities (comma separated)" value={Array.isArray(editing.amenities) ? editing.amenities.join(', ') : editing.amenities} onChange={(v) => handleValue('amenities', v.split(',').map((s) => s.trim()).filter(Boolean))} />
                    </div>
                  </>
                )}

                <div className="flex gap-3 pt-2">
                  <button type="submit" className="flex items-center gap-2 bg-blue text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue/90 transition-all">
                    <Save className="w-4 h-4" /> Save {schema.label}
                  </button>
                  <button type="button" onClick={() => setEditing(null)} className="flex items-center gap-2 px-6 py-3 border-2 border-gray-200 rounded-xl font-semibold text-dark hover:bg-gray-50">
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-light text-muted">
                      <tr>
                        <th className="text-left px-5 py-3 font-semibold">Name</th>
                        <th className="text-left px-5 py-3 font-semibold">Source</th>
                        <th className="text-left px-5 py-3 font-semibold">Status</th>
                        <th className="text-right px-5 py-3 font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {list.map((item) => (
                        <tr key={item.id} className="border-t border-gray-100">
                          <td className="px-5 py-3 font-semibold text-dark">{item.name}</td>
                          <td className="px-5 py-3">
                            <span className="text-xs bg-blue/10 text-blue px-2 py-1 rounded-full">Supabase</span>
                          </td>
                          <td className="px-5 py-3">
                            <span className="text-xs bg-success/10 text-success px-2 py-1 rounded-full">Live</span>
                          </td>
                          <td className="px-5 py-3 text-right">
                            <button onClick={() => { setEditing({ ...schema.empty, ...item }); }} className="inline-flex items-center gap-1 text-blue hover:underline mr-4">
                              <Edit3 className="w-3.5 h-3.5" /> Edit
                            </button>
                            <button onClick={() => handleDelete(item.id)} className="inline-flex items-center gap-1 text-danger hover:underline">
                              <Trash2 className="w-3.5 h-3.5" /> Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                      {list.length === 0 && (
                        <tr>
                          <td colSpan={4} className="px-5 py-10 text-center text-muted">
                            No Supabase-managed {schema.table} yet. Add your first one!
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="p-5 bg-light/50">
                  <p className="text-xs text-muted">
                    <span className="font-semibold text-dark">{sortedExisting.length}</span> total {schema.table} (bundled + Supabase) currently displayed in the app.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ label, value, onChange, type = 'text', textarea = false, step, icon }) {
  return (
    <div>
      <label className="block text-sm font-medium text-dark mb-1.5">{label}</label>
      <div className="relative">
        {icon && <span className="absolute left-3.5 inset-y-0 my-auto">{icon}</span>}
        {textarea ? (
          <textarea
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            rows={3}
            className="w-full pl-4 pr-4 py-3 bg-light border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue/30 focus:border-blue transition-all resize-none"
          />
        ) : (
          <input
            type={type}
            step={step}
            value={value ?? ''}
            onChange={(e) => onChange(type === 'number' ? Number(e.target.value) : e.target.value)}
            className={`w-full py-3 bg-light border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue/30 focus:border-blue transition-all ${icon ? 'pl-10' : 'pl-4'} pr-4`}
          />
        )}
      </div>
    </div>
  );
}