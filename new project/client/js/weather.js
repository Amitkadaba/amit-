// Weather and map functionality
const weather = {
  // Map instance
  map: null,
  
  // Current marker
  currentMarker: null,
  
  // Initialize weather and map
  init() {
    // Initialize map
    this.initMap();
    
    // Weather info elements
    this.elements = {
      weatherDetails: document.getElementById('weather-details'),
      temperature: document.getElementById('temperature'),
      humidity: document.getElementById('humidity'),
      weatherLocation: document.getElementById('weather-location'),
      weatherDescription: document.getElementById('weather-description')
    };
  },
  
  // Initialize Leaflet map
  initMap() {
    // Create map instance
    this.map = L.map('map-container').setView(config.map.defaultCenter, config.map.defaultZoom);
    
    // Add map tiles
    L.tileLayer(config.map.tileUrl, {
      attribution: config.map.attribution,
      maxZoom: 18
    }).addTo(this.map);
    
    // Add click event to map
    this.map.on('click', (e) => {
      this.getWeatherForLocation(e.latlng.lat, e.latlng.lng);
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
      this.map.invalidateSize();
    });
  },
  
  // Get weather for a location by coordinates
  async getWeatherForLocation(lat, lon) {
    try {
      // Show loading state
      this.elements.weatherDetails.style.display = 'block';
      this.elements.weatherLocation.textContent = 'Loading weather data...';
      this.elements.temperature.textContent = '';
      this.elements.humidity.textContent = '';
      this.elements.weatherDescription.textContent = '';
      
      // Fetch weather data
      const weatherData = await api.weather.getByCoordinates(lat, lon);
      
      // Update map marker
      this.updateMapMarker(lat, lon, weatherData);
      
      // Display weather info
      this.displayWeatherInfo(weatherData);
      
    } catch (error) {
      notifications.show('Failed to get weather data: ' + error.message, 'error');
      this.elements.weatherLocation.textContent = 'Weather data not available';
    }
  },
  
  // Update the map marker for the selected location
  updateMapMarker(lat, lon, weatherData) {
    // Remove previous marker if exists
    if (this.currentMarker) {
      this.map.removeLayer(this.currentMarker);
    }
    
    // Create a custom icon with weather icon
    const weatherIcon = weatherData.weather.icon;
    const iconUrl = `${config.weatherIconBaseUrl}${weatherIcon}@2x.png`;
    
    const customIcon = L.divIcon({
      className: 'weather-map-icon',
      html: `<div class="weather-icon-container">
               <img src="${iconUrl}" alt="${weatherData.weather.description}">
               <span class="weather-temp-badge">${Math.round(weatherData.temperature.current)}°C</span>
             </div>`,
      iconSize: [60, 60],
      iconAnchor: [30, 30]
    });
    
    // Add new marker
    this.currentMarker = L.marker([lat, lon], { icon: customIcon }).addTo(this.map);
    
    // Center map on the marker
    this.map.setView([lat, lon], 10);
  },
  
  // Display weather information
  displayWeatherInfo(weatherData) {
    this.elements.weatherLocation.textContent = `${weatherData.location.name}, ${weatherData.location.country}`;
    this.elements.temperature.textContent = `${Math.round(weatherData.temperature.current)}°C`;
    this.elements.humidity.textContent = `${weatherData.humidity}%`;
    
    const weatherDesc = weatherData.weather.description;
    this.elements.weatherDescription.textContent = weatherDesc.charAt(0).toUpperCase() + weatherDesc.slice(1);
    
    // Add weather info styles based on conditions
    this.applyWeatherStyles(weatherData);
  },
  
  // Apply different styles based on weather conditions
  applyWeatherStyles(weatherData) {
    const weatherMain = weatherData.weather.main.toLowerCase();
    const temp = weatherData.temperature.current;
    
    // Remove any existing classes
    this.elements.weatherDetails.className = '';
    this.elements.weatherDetails.classList.add('weather-details');
    
    // Add class based on weather condition
    if (weatherMain.includes('rain') || weatherMain.includes('drizzle')) {
      this.elements.weatherDetails.classList.add('weather-rainy');
    } else if (weatherMain.includes('cloud')) {
      this.elements.weatherDetails.classList.add('weather-cloudy');
    } else if (weatherMain.includes('clear')) {
      this.elements.weatherDetails.classList.add('weather-sunny');
    } else if (weatherMain.includes('snow')) {
      this.elements.weatherDetails.classList.add('weather-snowy');
    } else if (weatherMain.includes('thunder')) {
      this.elements.weatherDetails.classList.add('weather-stormy');
    }
    
    // Add class based on temperature
    if (temp < 5) {
      this.elements.weatherDetails.classList.add('weather-cold');
    } else if (temp > 30) {
      this.elements.weatherDetails.classList.add('weather-hot');
    }
  }
}; 