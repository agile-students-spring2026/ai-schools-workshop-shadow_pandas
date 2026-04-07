import { useState } from 'react';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import DistrictDetailPage from './pages/DistrictDetailPage';
import ComparePage from './pages/ComparePage';

export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [compareList, setCompareList] = useState([]);

  const handleSelectDistrict = (district) => {
    setSelectedDistrict(district);
    setCurrentView('detail');
  };

  const handleToggleCompare = (district) => {
    setCompareList((prev) => {
      const exists = prev.some((d) => d.id === district.id);
      if (exists) return prev.filter((d) => d.id !== district.id);
      if (prev.length >= 4) return prev; // max 4
      return [...prev, district];
    });
  };

  const handleBack = () => {
    setCurrentView('home');
    setSelectedDistrict(null);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        compareList={compareList}
      />

      {currentView === 'home' && (
        <HomePage
          onSelectDistrict={handleSelectDistrict}
          compareList={compareList}
          onToggleCompare={handleToggleCompare}
        />
      )}

      {currentView === 'detail' && selectedDistrict && (
        <DistrictDetailPage
          district={selectedDistrict}
          onBack={handleBack}
          onToggleCompare={() => handleToggleCompare(selectedDistrict)}
          isInCompare={compareList.some((d) => d.id === selectedDistrict.id)}
        />
      )}

      {currentView === 'compare' && (
        <ComparePage
          compareList={compareList}
          onRemove={handleToggleCompare}
          onGoHome={() => setCurrentView('home')}
          onSelectDistrict={handleSelectDistrict}
        />
      )}
    </div>
  );
}
