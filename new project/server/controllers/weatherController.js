const axios = require('axios');

// Fetch current weather by coordinates
exports.getWeatherByCoordinates = async (req, res) => {
  try {
    const { lat, lon } = req.query;
    
    if (!lat || !lon) {
      return res.status(400).json({ message: 'Latitude and longitude are required' });
    }

    const apiKey = process.env.OPENWEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    
    const response = await axios.get(url);
    
    // Extract only the data we need
    const weatherData = {
      location: {
        name: response.data.name,
        country: response.data.sys.country,
        coordinates: {
          lat: response.data.coord.lat,
          lon: response.data.coord.lon
        }
      },
      temperature: {
        current: response.data.main.temp,
        feelsLike: response.data.main.feels_like,
        min: response.data.main.temp_min,
        max: response.data.main.temp_max
      },
      humidity: response.data.main.humidity,
      wind: {
        speed: response.data.wind.speed,
        direction: response.data.wind.deg
      },
      weather: {
        main: response.data.weather[0].main,
        description: response.data.weather[0].description,
        icon: response.data.weather[0].icon
      },
      timestamp: new Date(response.data.dt * 1000)
    };
    
    res.json(weatherData);
  } catch (error) {
    console.error('Weather API error:', error.response?.data || error.message);
    res.status(500).json({ 
      message: 'Error fetching weather data',
      error: error.response?.data || error.message
    });
  }
};

// Fetch current weather by city name
exports.getWeatherByCity = async (req, res) => {
  try {
    const { city } = req.query;
    
    if (!city) {
      return res.status(400).json({ message: 'City name is required' });
    }

    const apiKey = process.env.OPENWEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`;
    
    const response = await axios.get(url);
    
    // Extract only the data we need
    const weatherData = {
      location: {
        name: response.data.name,
        country: response.data.sys.country,
        coordinates: {
          lat: response.data.coord.lat,
          lon: response.data.coord.lon
        }
      },
      temperature: {
        current: response.data.main.temp,
        feelsLike: response.data.main.feels_like,
        min: response.data.main.temp_min,
        max: response.data.main.temp_max
      },
      humidity: response.data.main.humidity,
      wind: {
        speed: response.data.wind.speed,
        direction: response.data.wind.deg
      },
      weather: {
        main: response.data.weather[0].main,
        description: response.data.weather[0].description,
        icon: response.data.weather[0].icon
      },
      timestamp: new Date(response.data.dt * 1000)
    };
    
    res.json(weatherData);
  } catch (error) {
    console.error('Weather API error:', error.response?.data || error.message);
    
    // Check if it's a "city not found" error
    if (error.response?.status === 404) {
      return res.status(404).json({ message: 'City not found' });
    }
    
    res.status(500).json({ 
      message: 'Error fetching weather data',
      error: error.response?.data || error.message
    });
  }
}; 