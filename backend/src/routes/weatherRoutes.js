const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weatherController');

const validateLocation = (req, res, next) => {
  const { lat, lng } = req.query;
  
  if (!lat || !lng) {
    return res.status(400).json({ 
      error: 'Latitude and longitude are required' 
    });
  }
  
  next();
};

router.get('/current', validateLocation, weatherController.getCurrentWeather);
router.get('/forecast', validateLocation, weatherController.getForecast);

module.exports = router;