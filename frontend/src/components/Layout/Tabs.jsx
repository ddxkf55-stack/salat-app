import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Tabs = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { 
      path: '/', 
      label: 'الرئيسية', 
      icon: 'fa-house',
      color: 'blue'
    },
    { 
      path: '/prayer', 
      label: 'مواقيت الصلاة', 
      icon: 'fa-mosque',
      color: 'green'
    },
    { 
      path: '/weather', 
      label: 'الطقس', 
      icon: 'fa-cloud-sun',
      color: 'yellow'
    },
    { 
      path: '/qibla', 
      label: 'القبلة', 
      icon: 'fa-compass',
      color: 'red'
    },
    { 
      path: '/mosques', 
      label: 'المساجد', 
      icon: 'fa-map-location-dot',
      color: 'purple'
    }
  ];

  const getColorClasses = (color, isActive) => {
    const colors = {
      blue: isActive ? 'text-blue-600 bg-blue-50 border-blue-600' : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50',
      green: isActive ? 'text-green-600 bg-green-50 border-green-600' : 'text-gray-600 hover:text-green-600 hover:bg-green-50',
      yellow: isActive ? 'text-yellow-600 bg-yellow-50 border-yellow-600' : 'text-gray-600 hover:text-yellow-600 hover:bg-yellow-50',
      red: isActive ? 'text-red-600 bg-red-50 border-red-600' : 'text-gray-600 hover:text-red-600 hover:bg-red-50',
      purple: isActive ? 'text-purple-600 bg-purple-50 border-purple-600' : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
    };
    return colors[color] || colors.blue;
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-2 md:px-4">
        <div className="flex justify-between items-stretch overflow-x-auto">
          {tabs.map((tab) => {
            const isActive = location.pathname === tab.path;
            const colorClasses = getColorClasses(tab.color, isActive);
            
            return (
              <button
                key={tab.path}
                onClick={() => navigate(tab.path)}
                className={`flex-1 min-w-fit py-3 md:py-4 px-2 md:px-4 text-xs md:text-sm font-semibold transition-all duration-300 border-b-4 flex flex-col items-center justify-center gap-1 md:gap-2 ${colorClasses}`}
              >
                <i className={`fas ${tab.icon} text-lg md:text-xl`}></i>
                <span className="whitespace-nowrap">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Tabs;