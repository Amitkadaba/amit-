// API utilities for making requests to the backend
const api = {
  // Get the auth token from local storage
  getToken() {
    return localStorage.getItem('token');
  },
  
  // Set auth token in local storage
  setToken(token) {
    localStorage.setItem('token', token);
  },
  
  // Remove auth token from local storage
  removeToken() {
    localStorage.removeItem('token');
  },
  
  // Create headers for API requests
  headers(includeAuth = true) {
    const headers = {
      'Content-Type': 'application/json'
    };
    
    if (includeAuth) {
      const token = this.getToken();
      if (token) {
        headers['x-auth-token'] = token;
      }
    }
    
    return headers;
  },
  
  // Perform GET request
  async get(endpoint, params = {}, includeAuth = true) {
    try {
      // Add query params if provided
      const url = new URL(`${config.apiBaseUrl}${endpoint}`);
      Object.keys(params).forEach(key => {
        if (params[key] !== undefined && params[key] !== null) {
          url.searchParams.append(key, params[key]);
        }
      });
      
      const response = await fetch(url, {
        method: 'GET',
        headers: this.headers(includeAuth)
      });
      
      // Handle non-successful responses
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'API request failed');
      }
      
      return await response.json();
    } catch (error) {
      console.error(`GET request to ${endpoint} failed:`, error);
      throw error;
    }
  },
  
  // Perform POST request
  async post(endpoint, data = {}, includeAuth = true) {
    try {
      const response = await fetch(`${config.apiBaseUrl}${endpoint}`, {
        method: 'POST',
        headers: this.headers(includeAuth),
        body: JSON.stringify(data)
      });
      
      // Handle non-successful responses
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'API request failed');
      }
      
      return await response.json();
    } catch (error) {
      console.error(`POST request to ${endpoint} failed:`, error);
      throw error;
    }
  },
  
  // Perform PUT request
  async put(endpoint, data = {}, includeAuth = true) {
    try {
      const response = await fetch(`${config.apiBaseUrl}${endpoint}`, {
        method: 'PUT',
        headers: this.headers(includeAuth),
        body: JSON.stringify(data)
      });
      
      // Handle non-successful responses
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'API request failed');
      }
      
      return await response.json();
    } catch (error) {
      console.error(`PUT request to ${endpoint} failed:`, error);
      throw error;
    }
  },
  
  // Perform DELETE request
  async delete(endpoint, includeAuth = true) {
    try {
      const response = await fetch(`${config.apiBaseUrl}${endpoint}`, {
        method: 'DELETE',
        headers: this.headers(includeAuth)
      });
      
      // Handle non-successful responses
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'API request failed');
      }
      
      return await response.json();
    } catch (error) {
      console.error(`DELETE request to ${endpoint} failed:`, error);
      throw error;
    }
  },
  
  // Auth API methods
  auth: {
    async register(userData) {
      return api.post(config.endpoints.auth.register, userData, false);
    },
    
    async login(credentials) {
      return api.post(config.endpoints.auth.login, credentials, false);
    },
    
    async getProfile() {
      return api.get(config.endpoints.auth.profile);
    }
  },
  
  // Sustainable actions API methods
  actions: {
    async create(actionData) {
      return api.post(config.endpoints.actions.create, actionData);
    },
    
    async getAll() {
      return api.get(config.endpoints.actions.getAll);
    },
    
    async getByDateRange(startDate, endDate) {
      return api.get(config.endpoints.actions.getDateRange, { startDate, endDate });
    },
    
    async getStats(period) {
      return api.get(config.endpoints.actions.getStats, { period });
    },
    
    async update(id, actionData) {
      return api.put(`${config.endpoints.actions.update}${id}`, actionData);
    },
    
    async delete(id) {
      return api.delete(`${config.endpoints.actions.delete}${id}`);
    }
  },
  
  // Weather API methods
  weather: {
    async getByCoordinates(lat, lon) {
      return api.get(config.endpoints.weather.byCoordinates, { lat, lon });
    },
    
    async getByCity(city) {
      return api.get(config.endpoints.weather.byCity, { city });
    }
  }
}; 