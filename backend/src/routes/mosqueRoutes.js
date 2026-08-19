const express = require('express');
const router = express.Router();
const mosqueController = require('../controllers/mosqueController');

const validateLocation = (req, res, next) => {
  const { lat, lng } = req.query;
  
  if (!lat || !lng) {
    return res.status(400).json({ 
      error: 'Latitude and longitude are required' 
    });
  }
  
  next();
};

router.get('/nearby', validateLocation, mosqueController.getNearbyMosques);

module.exports = router;