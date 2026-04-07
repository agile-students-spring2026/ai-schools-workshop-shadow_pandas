import { X, Plus } from 'lucide-react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Legend } from 'recharts';
import RatingBadge, { getRatingColor } from '../components/RatingBadge';
import { metricLabels } from '../data/districts';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

export default function ComparePage({ compareList, onRemove, onGoHome, onSelectDistrict }) {
  if (compareList.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <div className="text-6xl mb-4">📊</div>
        <h2 className="text-2xl font-bold text-slate-700 mb-2">No Districts to Compare</h2>
        <p className="text-slate-500 mb-6">Add districts from the Explore page to compare them side-by-side.</p>
        <button
          onClick={onGoHome}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Plus size={16} /> Add Districts
        </button>
      </div>
    );
  }

  // Build radar data
  const radarData = Object.keys(metricLabels).map((key) => {
    const entry = { subject: metricLabels[key] };
    compareList.forEach((d) => {
      entry[d.name.split(' ')[0]] = d.metrics[key];
    });
    return entry;
  });

  const metricKeys = Object.keys(metricLabels);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold mb-1">District Comparison</h1>
          <p className="text-blue-200">Comparing {compareList.length} district{compareList.length > 1 ? 's' : ''} side by side</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* District headers */}
        <div className="grid gap-4 mb-6" style={{ gridTemplateColumns: `repeat(${compareList.length}, 1fr)` }}>
          {compareList.map((d, i) => {
            const colors = getRatingColor(d.overallRating);
            return (
              <div key={d.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 relative">
                <button
                  onClick={() => onRemove(d)}
                  className="absolute top-3 right-3 text-slate-400 hover:text-slate-600 p-1"
                >
                  <X size={16} />
                </button>
                <div className={`w-2 h-full absolute left-0 top-0 rounded-l-2xl`} style={{ backgroundColor: COLORS[i] }} />
                <div className="pl-2">
                  <div className="flex items-start gap-3 mb-3">
                    <RatingBadge rating={d.overallRating} size="md" />
                    <div>
                      <button
                        onClick={() => onSelectDistrict(d)}
                        className="font-semibold text-slate-800 text-sm hover:text-blue-600 transition-colors text-left line-clamp-2"
                      >
                        {d.name}
                      </button>
                      <div className="text-xs text-slate-500">{d.city}, {d.state}</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-center">
                    <div className="bg-slate-50 rounded-lg p-2">
                      <div className="text-sm font-bold text-slate-700">{d.stats.graduationRate}%</div>
                      <div className="text-xs text-slate-400">Grad Rate</div>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-2">
                      <div className="text-sm font-bold text-slate-700">{d.stats.collegeEnrollment}%</div>
                      <div className="text-xs text-slate-400">College</div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Radar chart */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 mb-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Radar Comparison</h2>
          <ResponsiveContainer width="100%" height={350}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#e2e8f0" />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: '#94a3b8' }} />
              <PolarRadiusAxis domain={[0, 10]} tick={false} axisLine={false} />
              {compareList.map((d, i) => (
                <Radar
                  key={d.id}
                  name={d.name.split(' ')[0]}
                  dataKey={d.name.split(' ')[0]}
                  stroke={COLORS[i]}
                  fill={COLORS[i]}
                  fillOpacity={0.15}
                />
              ))}
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Metric-by-metric comparison */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-5 border-b border-slate-100">
            <h2 className="text-lg font-semibold text-slate-800">Metrics Breakdown</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50">
                  <th className="text-left text-sm font-medium text-slate-500 px-5 py-3 w-44">Metric</th>
                  {compareList.map((d, i) => (
                    <th key={d.id} className="text-center text-sm font-medium px-4 py-3" style={{ color: COLORS[i] }}>
                      {d.name.split(' ').slice(0, 2).join(' ')}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {metricKeys.map((key, idx) => {
                  const values = compareList.map((d) => d.metrics[key]);
                  const maxVal = Math.max(...values);
                  return (
                    <tr key={key} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                      <td className="text-sm text-slate-600 px-5 py-3.5 font-medium">{metricLabels[key]}</td>
                      {compareList.map((d, i) => {
                        const val = d.metrics[key];
                        const isMax = val === maxVal;
                        const colors = getRatingColor(val);
                        return (
                          <td key={d.id} className="px-4 py-3.5 text-center">
                            <div className="flex flex-col items-center gap-1">
                              <span className={`text-sm font-bold px-2.5 py-0.5 rounded-full ${isMax ? colors.bg + ' ' + colors.text : 'text-slate-600'}`}>
                                {val}
                              </span>
                              <div className="w-full bg-slate-200 rounded-full h-1.5 max-w-20">
                                <div
                                  className="h-1.5 rounded-full"
                                  style={{ width: `${val * 10}%`, backgroundColor: COLORS[i] }}
                                />
                              </div>
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
                {/* Overall */}
                <tr className="bg-blue-50 border-t-2 border-blue-100">
                  <td className="text-sm font-bold text-slate-800 px-5 py-4">Overall Rating</td>
                  {compareList.map((d) => {
                    const colors = getRatingColor(d.overallRating);
                    return (
                      <td key={d.id} className="px-4 py-4 text-center">
                        <span className={`text-base font-bold px-3 py-1 rounded-xl ${colors.bg} ${colors.text}`}>
                          {d.overallRating}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={onGoHome}
            className="text-blue-600 hover:underline text-sm flex items-center gap-1.5 mx-auto"
          >
            <Plus size={14} /> Add more districts
          </button>
        </div>
      </div>
    </div>
  );
}
