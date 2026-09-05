import { useState } from 'react';
import { ChevronDown, ChevronUp, RotateCcw } from 'lucide-react';

export default function FilterPanel({ filters, onFilterChange, onReset }) {
  const [priceRange, setPriceRange] = useState(filters?.priceRange || [0, 50000]);
  const [expandedSections, setExpandedSections] = useState({
    price: true,
    rating: true,
    category: true,
    safety: true,
  });

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleCheckboxChange = (group, value) => {
    const current = filters?.[group] || [];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onFilterChange?.({ ...filters, [group]: updated });
  };

  const handleSelectChange = (key, value) => {
    onFilterChange?.({ ...filters, [key]: value });
  };

  const handlePriceChange = (index, value) => {
    const updated = [...priceRange];
    updated[index] = Number(value);
    setPriceRange(updated);
    onFilterChange?.({ ...filters, priceRange: updated });
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-dark">Filters</h3>
        <button
          onClick={onReset}
          className="flex items-center gap-1.5 text-xs text-muted hover:text-blue transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          Reset
        </button>
      </div>

      <div className="border-t border-gray-100 pt-4">
        <button
          onClick={() => toggleSection('price')}
          className="flex items-center justify-between w-full mb-3"
        >
          <span className="text-xs font-semibold text-dark uppercase tracking-wider">
            Price Range
          </span>
          {expandedSections.price ? (
            <ChevronUp className="w-4 h-4 text-muted" />
          ) : (
            <ChevronDown className="w-4 h-4 text-muted" />
          )}
        </button>
        {expandedSections.price && (
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <label className="text-[10px] text-muted">Min</label>
                <input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) => handlePriceChange(0, e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue/20 focus:border-blue"
                />
              </div>
              <span className="text-muted mt-4">—</span>
              <div className="flex-1">
                <label className="text-[10px] text-muted">Max</label>
                <input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) => handlePriceChange(1, e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue/20 focus:border-blue"
                />
              </div>
            </div>
            <input
              type="range"
              min="0"
              max="100000"
              value={priceRange[1]}
              onChange={(e) => handlePriceChange(1, e.target.value)}
              className="w-full accent-blue"
            />
          </div>
        )}
      </div>

      <div className="border-t border-gray-100 pt-4">
        <button
          onClick={() => toggleSection('rating')}
          className="flex items-center justify-between w-full mb-3"
        >
          <span className="text-xs font-semibold text-dark uppercase tracking-wider">
            Rating
          </span>
          {expandedSections.rating ? (
            <ChevronUp className="w-4 h-4 text-muted" />
          ) : (
            <ChevronDown className="w-4 h-4 text-muted" />
          )}
        </button>
        {expandedSections.rating && (
          <div className="space-y-2">
            {[4, 3, 2, 1].map((r) => (
              <label key={r} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={(filters?.rating || []).includes(r)}
                  onChange={() => handleCheckboxChange('rating', r)}
                  className="w-4 h-4 text-blue border-gray-300 rounded focus:ring-blue/20"
                />
                <span className="text-sm text-dark">{r}+ Stars</span>
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="border-t border-gray-100 pt-4">
        <button
          onClick={() => toggleSection('category')}
          className="flex items-center justify-between w-full mb-3"
        >
          <span className="text-xs font-semibold text-dark uppercase tracking-wider">
            Category
          </span>
          {expandedSections.category ? (
            <ChevronUp className="w-4 h-4 text-muted" />
          ) : (
            <ChevronDown className="w-4 h-4 text-muted" />
          )}
        </button>
        {expandedSections.category && (
          <div className="space-y-2">
            {['Adventure', 'Beach', 'Mountain', 'Cultural', 'Wildlife', 'Spiritual'].map(
              (cat) => (
                <label key={cat} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={(filters?.category || []).includes(cat)}
                    onChange={() => handleCheckboxChange('category', cat)}
                    className="w-4 h-4 text-blue border-gray-300 rounded focus:ring-blue/20"
                  />
                  <span className="text-sm text-dark">{cat}</span>
                </label>
              )
            )}
          </div>
        )}
      </div>

      <div className="border-t border-gray-100 pt-4">
        <button
          onClick={() => toggleSection('safety')}
          className="flex items-center justify-between w-full mb-3"
        >
          <span className="text-xs font-semibold text-dark uppercase tracking-wider">
            Safety Level
          </span>
          {expandedSections.safety ? (
            <ChevronUp className="w-4 h-4 text-muted" />
          ) : (
            <ChevronDown className="w-4 h-4 text-muted" />
          )}
        </button>
        {expandedSections.safety && (
          <div className="space-y-2">
            {[
              { value: 'high', label: 'High Safety (80+)' },
              { value: 'moderate', label: 'Moderate (50-79)' },
              { value: 'low', label: 'Low (<50)' },
            ].map(({ value, label }) => (
              <label key={value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={(filters?.safety || []).includes(value)}
                  onChange={() => handleCheckboxChange('safety', value)}
                  className="w-4 h-4 text-blue border-gray-300 rounded focus:ring-blue/20"
                />
                <span className="text-sm text-dark">{label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {filters && Object.entries(filters).map(([key, value]) => {
        if (key === 'search' || key === 'sort') {
          return (
            <div key={key} className="border-t border-gray-100 pt-4">
              <label className="text-xs font-semibold text-dark uppercase tracking-wider block mb-2">
                {key === 'sort' ? 'Sort By' : 'Search'}
              </label>
              {key === 'sort' ? (
                <select
                  value={value || ''}
                  onChange={(e) => handleSelectChange(key, e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue/20 focus:border-blue"
                >
                  <option value="">Default</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Rating</option>
                  <option value="safety">Safety Score</option>
                </select>
              ) : (
                <input
                  type="text"
                  value={value || ''}
                  onChange={(e) => handleSelectChange(key, e.target.value)}
                  placeholder="Search..."
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue/20 focus:border-blue"
                />
              )}
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}
