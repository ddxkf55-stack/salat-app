class PrayerRecommendations {
  static getRecommendation(weather, prayerTime) {
    const recommendations = [];
    
    // Heavy rain recommendation
    if (weather.condition === 'Rain' && weather.description.includes('heavy')) {
      recommendations.push({
        type: 'jamaa',
        message: 'ننصح بالجمع بين الظهر والعصر في المنزل بسبب شدة المطر',
        priority: 'high'
      });
    }
    
    // Storm recommendation
    if (weather.condition === 'Thunderstorm' || weather.condition === 'Tornado') {
      recommendations.push({
        type: 'home',
        message: 'يُستحب الصلاة في المنزل بسبب العواصف الشديدة',
        priority: 'critical'
      });
    }
    
    // Extreme heat
    if (weather.temp > 40) {
      recommendations.push({
        type: 'precaution',
        message: 'درجة الحرارة مرتفعة جداً، يُنصح بأخذ مظلة والحرص على الترطيب',
        priority: 'medium'
      });
    }
    
    // Extreme cold
    if (weather.temp < 5) {
      recommendations.push({
        type: 'precaution',
        message: 'الطقس بارد جداً، ارتدِ ملابس دافئة',
        priority: 'medium'
      });
    }
    
    // Strong wind
    if (weather.wind_speed > 15) {
      recommendations.push({
        type: 'precaution',
        message: 'رياح قوية متوقعة، احذر أثناء التنقل إلى المسجد',
        priority: 'medium'
      });
    }
    
    return recommendations;
  }
}

module.exports = PrayerRecommendations;