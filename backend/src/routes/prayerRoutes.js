const express = require('express');
const router = express.Router();
const prayerController = require('../controllers/prayerController');

// Validation middleware
const validateLocation = (req, res, next) => {
  const { lat, lng } = req.query;
  
  if (!lat || !lng) {
    return res.status(400).json({ 
      error: 'Latitude and longitude are required',
      example: '?lat=21.4225&lng=39.8262'
    });
  }
  
  const latNum = parseFloat(lat);
  const lngNum = parseFloat(lng);
  
  if (isNaN(latNum) || isNaN(lngNum)) {
    return res.status(400).json({ 
      error: 'Invalid coordinates',
      message: 'Latitude and longitude must be numbers'
    });
  }
  
  if (latNum < -90 || latNum > 90 || lngNum < -180 || lngNum > 180) {
    return res.status(400).json({ 
      error: 'Coordinates out of range',
      message: 'Latitude must be between -90 and 90, longitude between -180 and 180'
    });
  }
  
  next();
};

router.get('/times', validateLocation, prayerController.getPrayerTimesWithWeather);

module.exports = router;