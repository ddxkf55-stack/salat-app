const qiblaService = require('../services/qiblaService');

exports.getQiblaDirection = (req, res) => {
  try {
    const { lat, lng } = req.query;
    
    console.log(`Calculating Qibla direction for: ${lat}, ${lng}`);
    
    const direction = qiblaService.calculateQibla(parseFloat(lat), parseFloat(lng));
    
    res.json({
      success: true,
      data: {
        direction,
        unit: 'degrees',
        location: {
          lat: parseFloat(lat),
          lng: parseFloat(lng)
        },
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Error in getQiblaDirection:', error);
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
};