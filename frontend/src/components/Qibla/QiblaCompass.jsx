import React, { useState, useEffect } from 'react';
import { qiblaAPI } from '../../services/api';

const QiblaCompass = () => {
  const [direction, setDirection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchQiblaDirection();
  }, []);

  const fetchQiblaDirection = async () => {
    try {
      setLoading(true);
      setError(null);
      
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            const response = await qiblaAPI.getDirection(latitude, longitude);
            setDirection(response.data.data.direction);
            setLoading(false);
          },
          (err) => {
            setError('لم نتمكن من تحديد موقعك');
            setLoading(false);
          }
        );
      } else {
        setError('المتصفح لا يدعم تحديد الموقع');
        setLoading(false);
      }
    } catch (error) {
      setError('فشل في تحديد اتجاه القبلة');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="text-center p-8">
          <div className="spinner mx-auto mb-4"></div>
          <p className="text-gray-600">جاري تحديد اتجاه القبلة...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <i className="fas fa-exclamation-circle text-6xl text-danger mb-4"></i>
            <p className="text-red-600 mb-4 text-lg">{error}</p>
            <button 
              onClick={fetchQiblaDirection}
              className="btn-primary px-6 py-3 text-white rounded-xl font-bold"
            >
              <i className="fas fa-redo ml-2"></i>
              إعادة المحاولة
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8 fade-in">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8 text-center">
          <i className="fas fa-kaaba ml-3 text-accent"></i>
          اتجاه القبلة
        </h2>
        
        <div className="relative w-72 h-72 md:w-96 md:h-96 mx-auto mb-8">
          {/* Outer circle */}
          <div className="absolute inset-0 rounded-full border-8 border-primary bg-white shadow-2xl"></div>
          
          {/* Direction markers */}
          <div className="absolute top-3 left-1/2 transform -translate-x-1/2 text-sm font-bold text-gray-600">
            <i className="fas fa-arrow-up block mb-1"></i>
            شمال
          </div>
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 text-sm font-bold text-gray-600">
            جنوب
            <i className="fas fa-arrow-down block mt-1"></i>
          </div>
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm font-bold text-gray-600">
            شرق
            <i className="fas fa-arrow-left block mt-1 mr-2"></i>
          </div>
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sm font-bold text-gray-600">
            <i className="fas fa-arrow-right block mt-1 ml-2"></i>
            غرب
          </div>
          
          {/* Center dot */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-red-500 rounded-full z-10 shadow-lg"></div>
          
          {/* Qibla arrow */}
          {direction !== null && (
            <div 
              className="compass-needle absolute top-1/2 left-1/2 w-1 h-36 bg-gradient-to-t from-red-500 to-red-600 origin-bottom transform -translate-x-1/2 -translate-y-full"
              style={{ transform: `translate(-50%, -100%) rotate(${direction}deg)` }}
            >
              <div className="absolute -top-3 -left-2 w-5 h-5 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-red-600"></div>
            </div>
          )}
        </div>

        <div className="text-center bg-white rounded-2xl shadow-xl p-6">
          <p className="text-5xl font-bold text-secondary mb-2">{direction}°</p>
          <p className="text-gray-600 text-lg mb-4">اتجاه القبلة من موقعك الحالي</p>
          <div className="flex justify-center items-center gap-2 text-sm text-gray-500">
            <i className="fas fa-location-crosshairs text-secondary"></i>
            <span>مكة المكرمة: 21.4225°N, 39.8262°E</span>
          </div>
        </div>

        <div className="mt-8 p-6 bg-blue-50 rounded-2xl border-r-4 border-secondary">
          <h3 className="font-bold text-primary mb-4 flex items-center gap-2">
            <i className="fas fa-info-circle text-accent"></i>
            كيفية الاستخدام:
          </h3>
          <ol className="list-decimal list-inside text-gray-700 space-y-2">
            <li>وجّه هاتفك أو جهازك حسب السهم الأحمر</li>
            <li>عندما يشير السهم إلى الأعلى، أنت متجه نحو القبلة</li>
            <li>الزاوية المعروضة هي اتجاه القبلة من موقعك الحالي</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default QiblaCompass;