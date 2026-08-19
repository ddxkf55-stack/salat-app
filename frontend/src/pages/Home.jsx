import React from 'react';
import SearchEngine from '../components/StartPage/SearchEngine';
import QuickLinks from '../components/StartPage/QuickLinks';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-white to-blue-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12 fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">مرحباً بك في مُصلّى والطقس</h1>
          <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto">
            ابدأ يومك بذكاء - اجمع بين الصلاة والطقس في مكان واحد
          </p>
          <p className="text-gray-500 mt-2">
            مواقيت الصلاة الدقيقة مع تنبؤات الطقس الذكية
          </p>
        </div>

        <div className="fade-in" style={{ animationDelay: '0.2s' }}>
          <SearchEngine />
        </div>

        <div className="fade-in" style={{ animationDelay: '0.4s' }}>
          <QuickLinks />
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center card-hover">
            <div className="text-5xl mb-4">🕌</div>
            <h3 className="text-xl font-bold text-primary mb-2">مواقيت الصلاة</h3>
            <p className="text-gray-600">مواقيت دقيقة مع تنبؤات الطقس لكل صلاة</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 text-center card-hover">
            <div className="text-5xl mb-4">🌤️</div>
            <h3 className="text-xl font-bold text-primary mb-2">حالة الطقس</h3>
            <p className="text-gray-600">توقعات جوية دقيقة مع تنبيهات ذكية</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 text-center card-hover">
            <div className="text-5xl mb-4">🧭</div>
            <h3 className="text-xl font-bold text-primary mb-2">اتجاه القبلة</h3>
            <p className="text-gray-600">بوصلة دقيقة لتحديد اتجاه القبلة</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;