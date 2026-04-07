export function getRatingColor(rating) {
  if (rating >= 9) return { bg: 'bg-emerald-500', text: 'text-white', light: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
  if (rating >= 8) return { bg: 'bg-green-500', text: 'text-white', light: 'bg-green-50 text-green-700 border-green-200' };
  if (rating >= 7) return { bg: 'bg-lime-500', text: 'text-white', light: 'bg-lime-50 text-lime-700 border-lime-200' };
  if (rating >= 6) return { bg: 'bg-yellow-400', text: 'text-slate-800', light: 'bg-yellow-50 text-yellow-700 border-yellow-200' };
  if (rating >= 5) return { bg: 'bg-orange-400', text: 'text-white', light: 'bg-orange-50 text-orange-700 border-orange-200' };
  return { bg: 'bg-red-500', text: 'text-white', light: 'bg-red-50 text-red-700 border-red-200' };
}

export function getRatingLabel(rating) {
  if (rating >= 9) return 'Exceptional';
  if (rating >= 8) return 'Excellent';
  if (rating >= 7) return 'Good';
  if (rating >= 6) return 'Average';
  if (rating >= 5) return 'Below Avg';
  return 'Needs Improvement';
}

export default function RatingBadge({ rating, size = 'md' }) {
  const colors = getRatingColor(rating);
  const sizeClasses = {
    sm: 'w-9 h-9 text-sm',
    md: 'w-12 h-12 text-lg',
    lg: 'w-16 h-16 text-2xl',
  };

  return (
    <div className={`${colors.bg} ${colors.text} ${sizeClasses[size]} rounded-xl flex items-center justify-center font-bold shadow-sm`}>
      {rating.toFixed(1)}
    </div>
  );
}
