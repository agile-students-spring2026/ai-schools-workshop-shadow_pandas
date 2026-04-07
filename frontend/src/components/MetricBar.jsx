import { getRatingColor } from './RatingBadge';

export default function MetricBar({ label, value }) {
  const colors = getRatingColor(value);
  return (
    <div>
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm text-slate-600">{label}</span>
        <span className="text-sm font-semibold text-slate-800">{value}/10</span>
      </div>
      <div className="bg-slate-100 rounded-full h-2.5">
        <div
          className={`${colors.bg} h-2.5 rounded-full transition-all duration-500`}
          style={{ width: `${value * 10}%` }}
        />
      </div>
    </div>
  );
}
