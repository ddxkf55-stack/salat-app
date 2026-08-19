const mosqueService = require('../services/mosqueService');

exports.getNearbyMosques = async (req, res) => {
  try {
    const { lat, lng, radius } = req.query;
    
    console.log(`Finding mosques near: ${lat}, ${lng} (radius: ${radius || 5000}m)`);
    
    const mosques = await mosqueService.findNearbyMosques(
      parseFloat(lat), 
      parseFloat(lng), 
      parseInt(radius) || 5000
    );
    
    res.json({
      success: true,
      data: {
        mosques,
        count: mosques.length,
        location: {
          lat: parseFloat(lat),
          lng: parseFloat(lng)
        },
        radius: parseInt(radius) || 5000,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Error in getNearbyMosques:', error);
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
};