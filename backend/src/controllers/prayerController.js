const aladhanService = require('../services/aladhanService');
const weatherService = require('../services/weatherService');
const PrayerRecommendations = require('../utils/prayerRecommendations');
const WeatherAlerts = require('../utils/weatherAlerts');

exports.getPrayerTimesWithWeather = async (req, res) => {
  try {
    const { lat, lng } = req.query;
    
    console.log(`Fetching prayer times for: ${lat}, ${lng}`);
    
    const [prayerTimes, currentWeather, forecast] = await Promise.all([
      aladhanService.getPrayerTimes(parseFloat(lat), parseFloat(lng)),
      weatherService.getCurrentWeather(parseFloat(lat), parseFloat(lng)),
      weatherService.getHourlyForecast(parseFloat(lat), parseFloat(lng))
    ]);

    const recommendations = PrayerRecommendations.getRecommendation(currentWeather, prayerTimes);
    const alerts = WeatherAlerts.generateAlerts(currentWeather, prayerTimes);

    res.json({
      success: true,
      data: {
        prayerTimes,
        currentWeather,
        forecast,
        recommendations,
        alerts,
        location: {
          lat: parseFloat(lat),
          lng: parseFloat(lng)
        },
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Error in getPrayerTimesWithWeather:', error);
    res.status(500).json({ 
      success: false,
      error: error.message,
      message: 'Failed to fetch prayer times and weather'
    });
  }
};