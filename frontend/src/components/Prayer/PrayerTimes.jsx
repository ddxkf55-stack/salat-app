import React, { useState, useEffect } from 'react';
import { prayerAPI } from '../../services/api';
import PrayerCard from './PrayerCard';

const PrayerTimes = () => {
  const [prayerData, setPrayerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    fetchPrayerTimes();
  }, []);

  const fetchPrayerTimes = async () => {
    try {
      setLoading(true);
      setError(null);
      
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ lat: latitude, lng: longitude });
            
            const response = await prayerAPI.getTimes(latitude, longitude);
            setPrayerData(response.data.data);
            setLoading(false);
          },
          (err) => {
            console.error('Geolocation error:', err);
            setError('لم نتمكن من تحديد موقعك. يرجى تفعيل خدمة الموقع.');
            setLoading(false);
          }
        );
      } else {
        setError('المتصفح لا يدعم تحديد الموقع');
        setLoading(false);
      }
    } catch (err) {
      console.error('Error fetching prayer times:', err);
      setError('فشل في جلب مواقيت الصلاة. تأكد من اتصالك بالإنترنت.');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-secondary mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">جاري تحميل مواقيت الصلاة...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8 bg-red-50 rounded-lg border border-red-200">
        <p className="text-red-600 mb-4 text-lg">{error}</p>
        <button 
          onClick={fetchPrayerTimes}
          className="px-6 py-3 bg-secondary text-white rounded-lg hover:bg-primary transition-colors"
        >
          إعادة المحاولة
        </button>
      </div>
    );
  }

  if (!prayerData) return null;

  const prayers = [
    { key: 'Fajr', name: 'الفجر', nameEn: 'Fajr' },
    { key: 'Sunrise', name: 'الشروق', nameEn: 'Sunrise' },
    { key: 'Dhuhr', name: 'الظهر', nameEn: 'Dhuhr' },
    { key: 'Asr', name: 'العصر', nameEn: 'Asr' },
    { key: 'Maghrib', name: 'المغرب', nameEn: 'Maghrib' },
    { key: 'Isha', name: 'العشاء', nameEn: 'Isha' }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 fade-in">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-primary mb-2">مواقيت الصلاة اليوم</h2>
        <p className="text-gray-600">
          {location ? `خط العرض: ${location.lat.toFixed(4)} | خط الطول: ${location.lng.toFixed(4)}` : ''}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {prayers.map(prayer => (
          <PrayerCard
            key={prayer.key}
            name={prayer.name}
            nameEn={prayer.nameEn}
            time={prayerData.prayerTimes[prayer.key]}
            weather={prayerData.currentWeather}
            alerts={prayerData.alerts.filter(a => a.prayer === prayer.key)}
          />
        ))}
      </div>

      {prayerData.recommendations && prayerData.recommendations.length > 0 && (
        <div className="mt-8 bg-accent bg-opacity-10 border-r-4 border-accent p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-primary mb-4">توصيات اليوم</h3>
          {prayerData.recommendations.map((rec, index) => (
            <div key={index} className="mb-3 p-3 bg-white rounded-lg shadow-sm">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-2 ${
                rec.priority === 'critical' ? 'bg-red-500 text-white' :
                rec.priority === 'high' ? 'bg-orange-500 text-white' :
                'bg-yellow-500 text-white'
              }`}>
                {rec.priority === 'critical' ? 'عاجل' : rec.priority === 'high' ? 'مهم' : 'تنبيه'}
              </span>
              <p className="text-gray-700">{rec.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PrayerTimes;