const express = require('express');
const router = express.Router();
const qiblaController = require('../controllers/qiblaController');

const validateLocation = (req, res, next) => {
  const { lat, lng } = req.query;
  
  if (!lat || !lng) {
    return res.status(400).json({ 
      error: 'Latitude and longitude are required' 
    });
  }
  
  next();
};

router.get('/direction', validateLocation, qiblaController.getQiblaDirection);

module.exports = router;