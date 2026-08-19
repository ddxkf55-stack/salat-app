import React from 'react';

const WeatherCard = ({ weather, forecast }) => {
  const getWeatherIcon = (condition) => {
    const icons = {
      'Clear': 'fa-sun text-yellow-500',
      'Clouds': 'fa-cloud text-gray-500',
      'Rain': 'fa-cloud-rain text-blue-500',
      'Drizzle': 'fa-cloud-showers-light text-blue-400',
      'Thunderstorm': 'fa-bolt text-purple-500',
      'Snow': 'fa-snowflake text-cyan-400',
      'Mist': 'fa-smog text-gray-400',
      'Smoke': 'fa-smog text-gray-600',
      'Haze': 'fa-smog text-yellow-600',
      'Dust': 'fa-wind text-yellow-700',
      'Fog': 'fa-smog text-gray-500',
      'Sand': 'fa-wind text-yellow-600',
      'Ash': 'fa-volcano text-gray-700',
      'Squall': 'fa-wind text-blue-600',
      'Tornado': 'fa-wind text-gray-800'
    };
    return icons[condition] || 'fa-temperature-high text-orange-500';
  };

  return (
    <div className="bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 text-white rounded-3xl shadow-2xl p-8 md:p-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-6 flex items-center justify-center gap-3">
          <i className="fas fa-cloud-sun text-accent"></i>
          الطقس الحالي
        </h2>
        
        <div className="flex flex-col items-center">
          <i className={`fas ${getWeatherIcon(weather?.condition)} text-8xl md:text-9xl mb-6 weather-icon`}></i>
          <div className="text-7xl md:text-8xl font-bold my-4">{weather?.temp || '--'}°م</div>
          <p className="text-2xl md:text-3xl capitalize mb-3 font-semibold">{weather?.description || '--'}</p>
          <p className="text-gray-200 text-lg">
            <i className="fas fa-thermometer-half ml-2"></i>
            الإحساس: {weather?.feels_like || '--'}°م
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white bg-opacity-20 rounded-2xl p-4 text-center backdrop-blur-sm">
          <i className="fas fa-tint text-2xl mb-2 text-cyan-300"></i>
          <p className="text-sm mb-1 opacity-90">الرطوبة</p>
          <p className="text-2xl font-bold">{weather?.humidity || '--'}%</p>
        </div>
        
        <div className="bg-white bg-opacity-20 rounded-2xl p-4 text-center backdrop-blur-sm">
          <i className="fas fa-wind text-2xl mb-2 text-gray-300"></i>
          <p className="text-sm mb-1 opacity-90">الرياح</p>
          <p className="text-2xl font-bold">{weather?.wind_speed || '--'} م/ث</p>
        </div>
        
        <div className="bg-white bg-opacity-20 rounded-2xl p-4 text-center backdrop-blur-sm">
          <i className="fas fa-gauge-high text-2xl mb-2 text-green-300"></i>
          <p className="text-sm mb-1 opacity-90">الضغط</p>
          <p className="text-2xl font-bold">{weather?.pressure || '--'} hPa</p>
        </div>
        
        <div className="bg-white bg-opacity-20 rounded-2xl p-4 text-center backdrop-blur-sm">
          <i className="fas fa-eye text-2xl mb-2 text-purple-300"></i>
          <p className="text-sm mb-1 opacity-90">الرؤية</p>
          <p className="text-2xl font-bold">{weather?.visibility ? (weather.visibility / 1000).toFixed(1) : '--'} كم</p>
        </div>
      </div>

      {forecast && forecast.length > 0 && (
        <div>
          <h3 className="text-2xl font-bold mb-6 text-center flex items-center justify-center gap-2">
            <i className="fas fa-clock-rotate-left text-accent"></i>
            التوقعات القادمة
          </h3>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
            {forecast.slice(0, 8).map((item, index) => (
              <div key={index} className="bg-white bg-opacity-20 rounded-2xl p-3 text-center hover:bg-opacity-30 transition-all backdrop-blur-sm">
                <p className="text-xs mb-2 opacity-90">{new Date(item.time).getHours()}:00</p>
                <i className={`fas ${getWeatherIcon(item.condition)} text-2xl mb-2`}></i>
                <p className="text-lg font-bold">{item.temp}°</p>
                <p className="text-xs opacity-75">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherCard;