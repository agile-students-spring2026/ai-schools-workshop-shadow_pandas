import { GraduationCap, BookOpen } from 'lucide-react';

export default function Navbar({ currentView, setCurrentView, compareList }) {
  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button
            onClick={() => setCurrentView('home')}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="bg-blue-600 p-2 rounded-lg">
              <GraduationCap size={20} className="text-white" />
            </div>
            <div>
              <span className="text-lg font-bold text-slate-800">SchoolScope</span>
              <span className="hidden sm:block text-xs text-slate-500 leading-none">District Evaluation Tool</span>
            </div>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentView('home')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentView === 'home'
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Explore
            </button>
            <button
              onClick={() => setCurrentView('compare')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                currentView === 'compare'
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <BookOpen size={15} />
              Compare
              {compareList.length > 0 && (
                <span className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {compareList.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
