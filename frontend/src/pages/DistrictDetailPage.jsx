import { ArrowLeft, MapPin, Users, School, GraduationCap, DollarSign, BookOpen, CheckCircle2, AlertTriangle, TrendingUp, TrendingDown, Minus, Plus, Check } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import RatingBadge, { getRatingColor, getRatingLabel } from '../components/RatingBadge';
import MetricBar from '../components/MetricBar';
import { metricLabels } from '../data/districts';

function TrendIcon({ trend }) {
  if (trend === 'up') return <span className="flex items-center gap-1 text-sm text-emerald-600 font-medium"><TrendingUp size={14} /> Improving trend</span>;
  if (trend === 'down') return <span className="flex items-center gap-1 text-sm text-red-500 font-medium"><TrendingDown size={14} /> Declining trend</span>;
  return <span className="flex items-center gap-1 text-sm text-slate-400 font-medium"><Minus size={14} /> Stable trend</span>;
}

export default function DistrictDetailPage({ district, onBack, onToggleCompare, isInCompare }) {
  const colors = getRatingColor(district.overallRating);

  const radarData = Object.entries(district.metrics).map(([key, val]) => ({
    subject: metricLabels[key].replace(' & ', '\n& '),
    value: val,
    fullMark: 10,
  }));

  const statCards = [
    { icon: <GraduationCap size={18} />, label: 'Graduation Rate', value: `${district.stats.graduationRate}%`, color: 'text-blue-600 bg-blue-50' },
    { icon: <BookOpen size={18} />, label: 'Avg Test Score', value: `${district.stats.avgTestScore}/100`, color: 'text-indigo-600 bg-indigo-50' },
    { icon: <Users size={18} />, label: 'Student:Teacher', value: district.stats.studentTeacherRatio, color: 'text-violet-600 bg-violet-50' },
    { icon: <DollarSign size={18} />, label: 'Per-Pupil Spending', value: `$${district.stats.perPupilSpending.toLocaleString()}`, color: 'text-emerald-600 bg-emerald-50' },
    { icon: <GraduationCap size={18} />, label: 'College Enrollment', value: `${district.stats.collegeEnrollment}%`, color: 'text-teal-600 bg-teal-50' },
    { icon: <School size={18} />, label: 'Avg Class Size', value: `${district.stats.avgClassSize} students`, color: 'text-cyan-600 bg-cyan-50' },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className={`bg-gradient-to-r from-blue-700 to-indigo-700 text-white`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-blue-200 hover:text-white mb-6 text-sm transition-colors"
          >
            <ArrowLeft size={16} /> Back to search
          </button>

          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h1 className="text-3xl font-bold mb-2">{district.name}</h1>
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-1.5 text-blue-200">
                  <MapPin size={15} />
                  <span>{district.city}, {district.state}</span>
                </div>
                <span className="text-blue-300">·</span>
                <span className="text-blue-200">{district.grades}</span>
                <span className="text-blue-300">·</span>
                <div className="flex items-center gap-1 text-blue-200">
                  <Users size={15} />
                  <span>{district.students.toLocaleString()} students</span>
                </div>
                <span className="text-blue-300">·</span>
                <div className="flex items-center gap-1 text-blue-200">
                  <School size={15} />
                  <span>{district.schools} schools</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-center">
                <RatingBadge rating={district.overallRating} size="lg" />
                <div className="text-blue-200 text-xs mt-1">{getRatingLabel(district.overallRating)}</div>
              </div>
              <button
                onClick={onToggleCompare}
                className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors flex items-center gap-2 ${
                  isInCompare
                    ? 'bg-white text-blue-700 border-white'
                    : 'border-white/40 text-white hover:bg-white/10'
                }`}
              >
                {isInCompare ? <><Check size={15} /> Added</> : <><Plus size={15} /> Compare</>}
              </button>
            </div>
          </div>

          <div className="mt-4">
            <TrendIcon trend={district.trend} />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stat cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
          {statCards.map((s) => (
            <div key={s.label} className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 text-center">
              <div className={`${s.color} w-9 h-9 rounded-lg flex items-center justify-center mx-auto mb-2`}>
                {s.icon}
              </div>
              <div className="text-lg font-bold text-slate-800">{s.value}</div>
              <div className="text-xs text-slate-500">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Metrics breakdown */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-5">Performance Metrics</h2>
            <div className="space-y-4">
              {Object.entries(district.metrics).map(([key, val]) => (
                <MetricBar key={key} label={metricLabels[key]} value={val} />
              ))}
            </div>
          </div>

          {/* Radar chart */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">Overview Radar</h2>
            <ResponsiveContainer width="100%" height={280}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: '#94a3b8' }} />
                <PolarRadiusAxis domain={[0, 10]} tick={false} axisLine={false} />
                <Radar name="Score" dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.25} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Trend chart */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 mb-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-5">5-Year Performance Trend</h2>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={district.yearlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="year" tick={{ fontSize: 12, fill: '#94a3b8' }} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: '#94a3b8' }} />
              <Tooltip
                contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '13px' }}
              />
              <Legend />
              <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={2.5} dot={{ r: 4 }} name="Test Score" />
              <Line type="monotone" dataKey="graduation" stroke="#10b981" strokeWidth={2.5} dot={{ r: 4 }} name="Graduation %" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Highlights & Concerns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <CheckCircle2 size={18} className="text-emerald-500" />
              Highlights
            </h2>
            <ul className="space-y-2">
              {district.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                  <span className="text-sm text-slate-600">{h}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <AlertTriangle size={18} className="text-amber-500" />
              Areas of Concern
            </h2>
            <ul className="space-y-2">
              {district.concerns.map((c) => (
                <li key={c} className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
                  <span className="text-sm text-slate-600">{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
