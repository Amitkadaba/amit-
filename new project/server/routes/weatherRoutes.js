const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weatherController');

// Get weather by coordinates
router.get('/coordinates', weatherController.getWeatherByCoordinates);

// Get weather by city name
router.get('/city', weatherController.getWeatherByCity);

module.exports = router; 