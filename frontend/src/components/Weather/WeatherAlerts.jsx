import React from 'react';

const WeatherAlerts = ({ alerts }) => {
  if (!alerts || alerts.length === 0) return null;

  const getAlertIcon = (type) => {
    switch(type) {
      case 'temperature': return '🌡️';
      case 'rain': return '🌧️';
      case 'wind': return '💨';
      case 'storm': return '⛈️';
      default: return '⚠️';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
      <h3 className="text-2xl font-bold text-primary mb-6 flex items-center">
        <span className="ml-2 text-3xl">️</span>
        تنبيهات الطقس
      </h3>
      <div className="space-y-4">
        {alerts.map((alert, index) => (
          <div 
            key={index} 
            className="flex items-start p-4 bg-gradient-to-l from-yellow-50 to-orange-50 border-r-4 border-yellow-500 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <span className="text-3xl ml-4">{getAlertIcon(alert.type)}</span>
            <div className="flex-1">
              <p className="font-bold text-yellow-800 text-lg mb-1">
                {alert.prayer === 'Jumuah' ? 'صلاة الجمعة' : 
                 alert.prayer === 'Fajr' ? 'صلاة الفجر' :
                 alert.prayer === 'Isha' ? 'صلاة العشاء' : alert.prayer}
              </p>
              <p className="text-yellow-700">{alert.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherAlerts;