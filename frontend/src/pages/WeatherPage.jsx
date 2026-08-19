import React, { useState, useEffect } from 'react';
import { weatherAPI } from '../services/api';
import WeatherCard from '../components/Weather/WeatherCard';
import WeatherAlerts from '../components/Weather/WeatherAlerts';

const WeatherPage = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWeather();
  }, []);

  const fetchWeather = async () => {
    try {
      setLoading(true);
      setError(null);
      
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;
          
          const [weatherRes, forecastRes] = await Promise.all([
            weatherAPI.getCurrent(latitude, longitude),
            weatherAPI.getForecast(latitude, longitude)
          ]);

          setWeather(weatherRes.data.data);
          setForecast(forecastRes.data.data);
          setLoading(false);
        }, (err) => {
          console.error('Geolocation error:', err);
          setError('لم نتمكن من تحديد موقعك');
          setLoading(false);
        });
      } else {
        setError('المتصفح لا يدعم تحديد الموقع');
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching weather:', error);
      setError('فشل في جلب بيانات الطقس');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="max-w-4xl mx-auto px-4 text-center p-8">
          <div className="spinner mx-auto mb-4"></div>
          <p className="text-gray-600">جاري تحميل بيانات الطقس...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <button onClick={fetchWeather} className="btn-primary px-6 py-2 bg-primary text-white rounded-lg">
              إعادة المحاولة
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto px-4">
        {weather && <WeatherCard weather={weather} forecast={forecast} />}
      </div>
    </div>
  );
};

export default WeatherPage;
