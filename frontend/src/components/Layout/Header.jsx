import React from 'react';

const Header = () => {
  return (
    <header className="bg-gradient-to-l from-primary via-secondary to-primary text-white shadow-2xl relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 grid-pattern"></div>
      
      <div className="max-w-7xl mx-auto px-4 py-8 relative z-10">
        <div className="text-center">
          <div className="mb-3">
            <i className="fas fa-mosque text-5xl md:text-6xl mb-4 inline-block text-accent"></i>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-3 tracking-wide">
            مُصلّى والطقس
          </h1>
          <p className="text-gray-200 text-sm md:text-lg font-light">
            Salah & Sky - اجمع بين الصلاة والطقس في مكان واحد
          </p>
          <div className="mt-4 flex justify-center items-center space-x-4 space-x-reverse text-sm text-gray-300">
            <span><i className="fas fa-clock ml-2"></i>مواقيت دقيقة</span>
            <span className="hidden md:inline">•</span>
            <span><i className="fas fa-cloud-sun ml-2"></i>توقعات جوية</span>
            <span className="hidden md:inline">•</span>
            <span><i className="fas fa-location-crosshairs ml-2"></i>اتجاه القبلة</span>
          </div>
        </div>
      </div>
      
      {/* Decorative Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full">
          <path fill="#f5f7fa" fillOpacity="1" d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
        </svg>
      </div>
    </header>
  );
};

export default Header;