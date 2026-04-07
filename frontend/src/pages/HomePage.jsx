import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, X, GraduationCap, TrendingUp, Users, Award } from 'lucide-react';
import { districts, states } from '../data/districts';
import DistrictCard from '../components/DistrictCard';

const sortOptions = [
  { value: 'rating-desc', label: 'Highest Rated' },
  { value: 'rating-asc', label: 'Lowest Rated' },
  { value: 'name-asc', label: 'Name A–Z' },
  { value: 'students-desc', label: 'Largest District' },
  { value: 'students-asc', label: 'Smallest District' },
];

export default function HomePage({ onSelectDistrict, compareList, onToggleCompare }) {
  const [search, setSearch] = useState('');
  const [selectedState, setSelectedState] = useState('All States');
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('rating-desc');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = districts.filter((d) => {
      const matchSearch =
        d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.city.toLowerCase().includes(search.toLowerCase()) ||
        d.state.toLowerCase().includes(search.toLowerCase());
      const matchState = selectedState === 'All States' || d.state === selectedState;
      const matchRating = d.overallRating >= minRating;
      return matchSearch && matchState && matchRating;
    });

    result.sort((a, b) => {
      if (sortBy === 'rating-desc') return b.overallRating - a.overallRating;
      if (sortBy === 'rating-asc') return a.overallRating - b.overallRating;
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
      if (sortBy === 'students-desc') return b.students - a.students;
      if (sortBy === 'students-asc') return a.students - b.students;
      return 0;
    });

    return result;
  }, [search, selectedState, minRating, sortBy]);

  const totalStudents = districts.reduce((s, d) => s + d.students, 0);
  const avgRating = (districts.reduce((s, d) => s + d.overallRating, 0) / districts.length).toFixed(1);

  const clearFilters = () => {
    setSearch('');
    setSelectedState('All States');
    setMinRating(0);
    setSortBy('rating-desc');
  };

  const hasFilters = search || selectedState !== 'All States' || minRating > 0;

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-white/20 backdrop-blur px-3 py-1 rounded-full text-sm font-medium">
                Free & Open Data
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 leading-tight">
              Find the Right School District for Your Family
            </h1>
            <p className="text-blue-100 text-lg mb-8">
              Compare school districts across the country using real data on academics, safety, teacher quality, funding, and more.
            </p>

            {/* Search bar */}
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by district name, city, or state..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl text-slate-800 text-base focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-lg"
                />
                {search && (
                  <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                    <X size={16} />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12">
            {[
              { icon: <Award size={18} />, value: districts.length, label: 'Districts Rated' },
              { icon: <Users size={18} />, value: `${(totalStudents / 1000000).toFixed(1)}M+`, label: 'Students Covered' },
              { icon: <TrendingUp size={18} />, value: avgRating, label: 'Avg. District Score' },
              { icon: <GraduationCap size={18} />, value: '8', label: 'Metrics Tracked' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/10 backdrop-blur rounded-xl p-4">
                <div className="flex items-center gap-2 text-blue-200 mb-1">{stat.icon}</div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-blue-200 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filter bar */}
      <div className="bg-white border-b border-slate-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium border transition-colors ${
                showFilters ? 'bg-blue-50 border-blue-200 text-blue-700' : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <SlidersHorizontal size={15} />
              Filters
              {hasFilters && <span className="bg-blue-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">!</span>}
            </button>

            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white"
            >
              {states.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white"
            >
              {sortOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>

            <div className="text-sm text-slate-500 ml-auto">
              {filtered.length} district{filtered.length !== 1 ? 's' : ''} found
            </div>

            {hasFilters && (
              <button onClick={clearFilters} className="text-sm text-blue-600 hover:underline flex items-center gap-1">
                <X size={13} /> Clear
              </button>
            )}
          </div>

          {showFilters && (
            <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-6">
              <div className="flex items-center gap-3">
                <label className="text-sm text-slate-600 font-medium whitespace-nowrap">Min Rating:</label>
                <input
                  type="range"
                  min="0"
                  max="9"
                  step="1"
                  value={minRating}
                  onChange={(e) => setMinRating(Number(e.target.value))}
                  className="w-32 accent-blue-600"
                />
                <span className="text-sm font-semibold text-slate-700 w-6">{minRating}+</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {[0, 5, 7, 8, 9].map((r) => (
                  <button
                    key={r}
                    onClick={() => setMinRating(r)}
                    className={`text-xs px-3 py-1 rounded-full border transition-colors ${
                      minRating === r ? 'bg-blue-600 text-white border-blue-600' : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {r === 0 ? 'Any' : `${r}+`}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Results grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-slate-700 mb-2">No districts found</h3>
            <p className="text-slate-500">Try adjusting your filters or search terms.</p>
            <button onClick={clearFilters} className="mt-4 text-blue-600 hover:underline text-sm">Clear all filters</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((d) => (
              <DistrictCard
                key={d.id}
                district={d}
                onSelect={onSelectDistrict}
                onToggleCompare={onToggleCompare}
                isInCompare={compareList.some((c) => c.id === d.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
