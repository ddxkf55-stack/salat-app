import React, { useState, useEffect } from 'react';
import { mosqueAPI } from '../../services/api';

const MosqueMap = () => {
  const [mosques, setMosques] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [radius, setRadius] = useState(5000);

    useEffect(() => {
    fetchNearbyMosques();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchNearbyMosques = async () => {
    try {
      setLoading(true);
      setError(null);
      
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            const userLoc = { lat: latitude, lng: longitude };
            setUserLocation(userLoc);
            
            console.log('Fetching mosques for:', userLoc);
            
            // Try to fetch mosques
            try {
              const response = await mosqueAPI.getNearby(latitude, longitude, radius);
              console.log('Mosques response:', response.data);
              
              if (response.data && response.data.data && response.data.data.mosques) {
                setMosques(response.data.data.mosques);
              } else if (response.data && response.data.data) {
                // Handle different response structure
                setMosques(Array.isArray(response.data.data) ? response.data.data : []);
              } else {
                setMosques([]);
              }
            } catch (apiError) {
              console.error('API Error:', apiError);
              // If API fails, show empty state with message
              setMosques([]);
            }
            
            setLoading(false);
          },
          (err) => {
            console.error('Geolocation error:', err);
            setError('لم نتمكن من تحديد موقعك. يرجى تفعيل خدمة الموقع في المتصفح.');
            setLoading(false);
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
          }
        );
      } else {
        setError('المتصفح لا يدعم تحديد الموقع الجغرافي');
        setLoading(false);
      }
    } catch (error) {
      console.error('Error in fetchNearbyMosques:', error);
      setError('حدث خطأ غير متوقع. يرجى إعادة المحاولة.');
      setLoading(false);
    }
  };

  const getGoogleMapsLink = (lat, lng) => {
    return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
  };

  const formatDistance = (meters) => {
    if (meters < 1000) {
      return `${Math.round(meters)} متر`;
    }
    return `${(meters / 1000).toFixed(2)} كم`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center p-12">
            <div className="spinner mx-auto mb-6"></div>
            <p className="text-gray-600 text-lg animate-pulse">جاري تحميل المساجد القريبة...</p>
            <p className="text-gray-500 text-sm mt-2">يرجى التأكد من تفعيل خدمة الموقع</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center border-r-4 border-danger">
            <i className="fas fa-exclamation-circle text-6xl text-danger mb-4"></i>
            <h3 className="text-2xl font-bold text-primary mb-3">عذراً!</h3>
            <p className="text-gray-600 mb-6 text-lg">{error}</p>
            <button 
              onClick={fetchNearbyMosques}
              className="btn-primary px-8 py-3 text-white rounded-xl font-bold inline-flex items-center gap-2"
            >
              <i className="fas fa-redo"></i>
              إعادة المحاولة
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8 fade-in">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">
            <i className="fas fa-mosque ml-3 text-accent"></i>
            المساجد القريبة
          </h2>
          <p className="text-gray-600">
            <i className="fas fa-location-crosshairs ml-2 text-secondary"></i>
            اعثر على المساجد القريبة منك
          </p>
        </div>

        {/* Location Info */}
        {userLocation && (
          <div className="bg-white rounded-xl shadow-lg p-4 mb-6 text-center">
            <p className="text-sm text-gray-600">
              <i className="fas fa-map-pin ml-2 text-danger"></i>
              موقعك الحالي: {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}
            </p>
            <div className="mt-3 flex justify-center gap-2 flex-wrap">
              <button
                onClick={() => { setRadius(1000); fetchNearbyMosques(); }}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  radius === 1000 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                1 كم
              </button>
              <button
                onClick={() => { setRadius(5000); fetchNearbyMosques(); }}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  radius === 5000 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                5 كم
              </button>
              <button
                onClick={() => { setRadius(10000); fetchNearbyMosques(); }}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  radius === 10000 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                10 كم
              </button>
            </div>
          </div>
        )}
        
        {mosques.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <i className="fas fa-mosque text-8xl text-gray-300 mb-6"></i>
            <h3 className="text-2xl font-bold text-gray-600 mb-3">لا توجد مساجد قريبة</h3>
            <p className="text-gray-500 mb-6">
              لم نتمكن من العثور على مساجد ضمن النطاق المحدد
            </p>
            <button 
              onClick={fetchNearbyMosques}
              className="btn-primary px-6 py-3 text-white rounded-xl font-bold inline-flex items-center gap-2"
            >
              <i className="fas fa-redo"></i>
              تحديث البحث
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mosques.map((mosque, index) => (
              <div 
                key={mosque.id || index} 
                className="bg-white rounded-2xl shadow-xl p-6 card-hover border-t-4 border-secondary"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-primary mb-2">{mosque.name || 'مسجد'}</h3>
                    <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                      <i className="fas fa-check-circle ml-1"></i>
                      نشط
                    </span>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-full">
                    <i className="fas fa-mosque text-2xl text-primary"></i>
                  </div>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center text-sm p-2 bg-gray-50 rounded-lg">
                    <span className="text-gray-600 flex items-center gap-2">
                      <i className="fas fa-ruler text-secondary"></i>
                      المسافة:
                    </span>
                    <span className="font-bold text-primary">
                      {formatDistance(mosque.distance)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm p-2 bg-gray-50 rounded-lg">
                    <span className="text-gray-600 flex items-center gap-2">
                      <i className="fas fa-map-marker-alt text-danger"></i>
                      الإحداثيات:
                    </span>
                    <span className="font-mono text-xs text-gray-500">
                      {parseFloat(mosque.lat).toFixed(4)}, {parseFloat(mosque.lng).toFixed(4)}
                    </span>
                  </div>
                </div>

                <a
                  href={getGoogleMapsLink(mosque.lat, mosque.lng)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-3 bg-gradient-to-l from-secondary to-primary text-white text-center rounded-xl hover:from-primary hover:to-secondary transition-all duration-300 font-bold shadow-lg hover:shadow-xl"
                >
                  <i className="fas fa-location-arrow ml-2"></i>
                  الاتجاه إلى المسجد
                </a>
              </div>
            ))}
          </div>
        )}

        {/* Stats */}
        {mosques.length > 0 && (
          <div className="mt-8 bg-gradient-to-l from-primary to-secondary rounded-2xl shadow-xl p-6 text-white text-center">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <i className="fas fa-mosque text-3xl mb-2"></i>
                <p className="text-2xl font-bold">{mosques.length}</p>
                <p className="text-sm opacity-90">مسجد</p>
              </div>
              <div>
                <i className="fas fa-users text-3xl mb-2"></i>
                <p className="text-2xl font-bold">+1000</p>
                <p className="text-sm opacity-90">مصلٍ</p>
              </div>
              <div>
                <i className="fas fa-clock text-3xl mb-2"></i>
                <p className="text-2xl font-bold">5</p>
                <p className="text-sm opacity-90">صلوات</p>
              </div>
              <div>
                <i className="fas fa-location-crosshairs text-3xl mb-2"></i>
                <p className="text-2xl font-bold">{formatDistance(radius)}</p>
                <p className="text-sm opacity-90">نطاق البحث</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MosqueMap;
