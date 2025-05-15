// Configuration settings for the app
const config = {
  // API base URL
  apiBaseUrl: 'http://localhost:5000/api',
  
  // API endpoints
  endpoints: {
    auth: {
      register: '/auth/register',
      login: '/auth/login',
      profile: '/auth/me'
    },
    actions: {
      create: '/actions',
      getAll: '/actions',
      getDateRange: '/actions/date-range',
      getStats: '/actions/stats',
      update: '/actions/', // requires ID appended
      delete: '/actions/' // requires ID appended
    },
    weather: {
      byCoordinates: '/weather/coordinates',
      byCity: '/weather/city'
    }
  },
  
  // OpenWeatherMap base icon URL
  weatherIconBaseUrl: 'https://openweathermap.org/img/wn/',
  
  // Default map settings
  map: {
    defaultCenter: [20, 0], // Latitude and longitude
    defaultZoom: 2, // Zoom level
    tileUrl: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  },
  
  // Chart.js settings
  charts: {
    backgroundColor: [
      'rgba(76, 175, 80, 0.6)', // Green
      'rgba(33, 150, 243, 0.6)', // Blue
      'rgba(255, 152, 0, 0.6)', // Orange
      'rgba(156, 39, 176, 0.6)', // Purple
      'rgba(244, 67, 54, 0.6)' // Red
    ],
    borderColor: [
      'rgba(76, 175, 80, 1)',
      'rgba(33, 150, 243, 1)',
      'rgba(255, 152, 0, 1)',
      'rgba(156, 39, 176, 1)',
      'rgba(244, 67, 54, 1)'
    ]
  }
};

// Prevent modification of the config object
Object.freeze(config); 