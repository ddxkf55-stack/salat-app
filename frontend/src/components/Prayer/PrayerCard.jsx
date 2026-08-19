import React from 'react';

const PrayerCard = ({ name, nameEn, time, weather, alerts }) => {
  const getNextPrayer = () => {
    const now = new Date();
    const prayerTime = new Date();
    const [hours, minutes] = time.split(':');
    prayerTime.setHours(parseInt(hours), parseInt(minutes), 0);
    
    if (prayerTime < now) {
      return { text: 'انتهى', color: 'text-gray-500', icon: 'fa-check-circle' };
    }
    
    const diff = prayerTime - now;
    const hoursLeft = Math.floor(diff / (1000 * 60 * 60));
    const minutesLeft = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return { 
      text: `متبقي ${hoursLeft} ساعة و ${minutesLeft} دقيقة`, 
      color: 'text-green-600',
      icon: 'fa-clock'
    };
  };

  const status = getNextPrayer();

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 card-hover border-t-4 border-secondary">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-2xl font-bold text-primary">{name}</h3>
          <p className="text-sm text-gray-500">{nameEn}</p>
        </div>
        <div className="text-3xl font-bold text-secondary bg-blue-50 px-4 py-2 rounded-xl">
          {time}
        </div>
      </div>
      
      <div className="border-t border-gray-200 pt-4 mt-4">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
            <span className="text-gray-600 flex items-center gap-2">
              <i className="fas fa-temperature-high text-orange-500"></i>
              الحرارة:
            </span>
            <span className="font-bold text-primary">{weather?.temp || '--'}°م</span>
          </div>
          
          <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
            <span className="text-gray-600 flex items-center gap-2">
              <i className="fas fa-cloud text-blue-500"></i>
              الحالة:
            </span>
            <span className="font-bold text-primary">{weather?.description || '--'}</span>
          </div>
          
          <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
            <span className="text-gray-600 flex items-center gap-2">
              <i className="fas fa-tint text-cyan-500"></i>
              الرطوبة:
            </span>
            <span className="font-bold text-primary">{weather?.humidity || '--'}%</span>
          </div>
          
          <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
            <span className="text-gray-600 flex items-center gap-2">
              <i className="fas fa-wind text-gray-500"></i>
              الرياح:
            </span>
            <span className="font-bold text-primary">{weather?.wind_speed || '--'} م/ث</span>
          </div>
        </div>
      </div>

      <div className="mt-4 p-3 bg-green-50 rounded-xl flex items-center gap-2">
        <i className={`fas ${status.icon} ${status.color}`}></i>
        <p className={`text-sm font-semibold ${status.color}`}>{status.text}</p>
      </div>

      {alerts && alerts.length > 0 && (
        <div className="mt-4 space-y-2">
          {alerts.map((alert, index) => (
            <div key={index} className="p-3 bg-yellow-50 border-r-4 border-yellow-500 rounded-xl">
              <div className="flex items-start gap-2">
                <i className="fas fa-exclamation-triangle text-yellow-600 mt-1"></i>
                <p className="text-sm text-yellow-800">{alert.message}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PrayerCard;