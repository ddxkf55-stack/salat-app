class WeatherAlerts {
  static generateAlerts(weather, prayerTimes) {
    const alerts = [];
    
    // Fajr alerts
    if (prayerTimes.Fajr) {
      if (weather.temp < 10) {
        alerts.push({
          prayer: 'Fajr',
          message: 'الفجر بارد جداً، ارتدِ ملابس دافئة',
          type: 'temperature'
        });
      }
    }
    
    // Jumu'ah alerts
    if (weather.temp > 35) {
      alerts.push({
        prayer: 'Jumuah',
        message: 'الطقس حار جداً اليوم، تذكر أخذ مظلة لصلاة الجمعة',
        type: 'temperature'
      });
    }
    
    // Isha alerts
    if (prayerTimes.Isha && weather.temp < 15) {
      alerts.push({
        prayer: 'Isha',
        message: 'درجة الحرارة ستنخفض مع صلاة العشاء، ارتدِ ملابس دافئة',
        type: 'temperature'
      });
    }
    
    return alerts;
  }
}

module.exports = WeatherAlerts;