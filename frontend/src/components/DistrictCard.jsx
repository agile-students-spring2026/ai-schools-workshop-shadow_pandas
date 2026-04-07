import { MapPin, Users, School, TrendingUp, TrendingDown, Minus, Plus, Check } from 'lucide-react';
import RatingBadge, { getRatingColor, getRatingLabel } from './RatingBadge';

function TrendIcon({ trend }) {
  if (trend === 'up') return <span className="flex items-center gap-1 text-xs text-emerald-600 font-medium"><TrendingUp size={12} /> Improving</span>;
  if (trend === 'down') return <span className="flex items-center gap-1 text-xs text-red-500 font-medium"><TrendingDown size={12} /> Declining</span>;
  return <span className="flex items-center gap-1 text-xs text-slate-400 font-medium"><Minus size={12} /> Stable</span>;
}

export default function DistrictCard({ district, onSelect, onToggleCompare, isInCompare }) {
  const colors = getRatingColor(district.overallRating);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 overflow-hidden">
      {/* Top accent bar */}
      <div className={`h-1.5 ${colors.bg}`} />

      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-slate-800 text-base leading-tight mb-1 line-clamp-2">
              {district.name}
            </h3>
            <div className="flex items-center gap-1 text-slate-500 text-sm">
              <MapPin size={13} />
              <span>{district.city}, {district.state}</span>
            </div>
          </div>
          <RatingBadge rating={district.overallRating} size="md" />
        </div>

        <div className="flex items-center justify-between mb-4">
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${colors.light}`}>
            {getRatingLabel(district.overallRating)}
          </span>
          <TrendIcon trend={district.trend} />
        </div>

        {/* Key stats */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="bg-slate-50 rounded-lg p-2 text-center">
            <div className="flex items-center justify-center gap-1 text-slate-500 mb-1">
              <Users size={11} />
            </div>
            <div className="text-xs font-semibold text-slate-700">{district.students.toLocaleString()}</div>
            <div className="text-xs text-slate-400">Students</div>
          </div>
          <div className="bg-slate-50 rounded-lg p-2 text-center">
            <div className="flex items-center justify-center gap-1 text-slate-500 mb-1">
              <School size={11} />
            </div>
            <div className="text-xs font-semibold text-slate-700">{district.schools}</div>
            <div className="text-xs text-slate-400">Schools</div>
          </div>
          <div className="bg-slate-50 rounded-lg p-2 text-center">
            <div className="text-xs font-semibold text-slate-700">{district.stats.graduationRate}%</div>
            <div className="text-xs text-slate-400">Grad Rate</div>
          </div>
        </div>

        {/* Mini metric bars */}
        <div className="space-y-1.5 mb-4">
          {['academicPerformance', 'teacherQuality', 'safetyClimate'].map((key) => {
            const val = district.metrics[key];
            const barColors = getRatingColor(val);
            const labels = { academicPerformance: 'Academics', teacherQuality: 'Teachers', safetyClimate: 'Safety' };
            return (
              <div key={key} className="flex items-center gap-2">
                <span className="text-xs text-slate-500 w-16 shrink-0">{labels[key]}</span>
                <div className="flex-1 bg-slate-100 rounded-full h-1.5">
                  <div className={`${barColors.bg} h-1.5 rounded-full`} style={{ width: `${val * 10}%` }} />
                </div>
                <span className="text-xs font-medium text-slate-600 w-6 text-right">{val}</span>
              </div>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={() => onSelect(district)}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-3 rounded-lg transition-colors"
          >
            View Details
          </button>
          <button
            onClick={() => onToggleCompare(district)}
            className={`px-3 py-2 rounded-lg border text-sm transition-colors ${
              isInCompare
                ? 'bg-blue-50 border-blue-300 text-blue-700'
                : 'border-slate-200 text-slate-500 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            {isInCompare ? <Check size={15} /> : <Plus size={15} />}
          </button>
        </div>
      </div>
    </div>
  );
}
