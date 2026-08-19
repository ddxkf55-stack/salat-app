import React, { useState, useEffect } from 'react';
import { weatherAPI } from '../services/api';
import WeatherCard from '../components/Weather/WeatherCard';
import WeatherAlerts from '../components/Weather/WeatherAlerts';

const WeatherPage = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWeather();
  }, []);

  const fetchWeather = async () => {
    try {
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
        });
      }
    } catch (error) {
      console.error('Error fetching weather:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center p-8">جاري تحميل بيانات الطقس...</div>;
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto px-4">
        {weather && <WeatherCard weather={weather} forecast={forecast} />}
        <WeatherAlerts alerts={alerts} />
      </div>
    </div>
  );
};

export default WeatherPage;