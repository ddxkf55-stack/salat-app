const weatherService = require('../services/weatherService');

exports.getCurrentWeather = async (req, res) => {
  try {
    const { lat, lng } = req.query;
    
    console.log(`Fetching current weather for: ${lat}, ${lng}`);
    
    const weather = await weatherService.getCurrentWeather(parseFloat(lat), parseFloat(lng));
    
    res.json({
      success: true,
      data: {
        ...weather,
        location: {
          lat: parseFloat(lat),
          lng: parseFloat(lng)
        },
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Error in getCurrentWeather:', error);
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
};

exports.getForecast = async (req, res) => {
  try {
    const { lat, lng } = req.query;
    
    console.log(`Fetching forecast for: ${lat}, ${lng}`);
    
    const forecast = await weatherService.getHourlyForecast(parseFloat(lat), parseFloat(lng));
    
    res.json({
      success: true,
      data: {
        forecast,
        location: {
          lat: parseFloat(lat),
          lng: parseFloat(lng)
        },
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Error in getForecast:', error);
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
};