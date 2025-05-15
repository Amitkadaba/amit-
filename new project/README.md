# Living Sustainable Tracker

A full-stack web application that helps users track their sustainable lifestyle habits and provides real-time weather data based on location.

## Features

- **User Authentication**: Register, login, and profile management with JWT
- **Sustainability Tracking**: Log daily sustainable activities including:
  - Energy and water saving
  - Recycling (plastic, paper, metal)
  - Sustainable transportation usage
- **Data Visualization**: Charts showing progress and impact over time
- **Live Weather Data**: Interactive map to view temperature and humidity for any location
- **Personalized Tips**: Smart suggestions based on user activity patterns

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript (Vanilla)
- **Backend**: Node.js, Express
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT, bcrypt
- **APIs**: OpenWeatherMap for weather data
- **Map**: Leaflet.js with OpenStreetMap
- **Charts**: Chart.js for data visualization

## Setup and Installation

### Prerequisites

- Node.js (v14 or newer)
- MongoDB (local or Atlas)
- OpenWeatherMap API key

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/living-sustainable-tracker.git
   cd living-sustainable-tracker
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file based on the `env.example` template:
   ```
   cp env.example .env
   ```

4. Update the `.env` file with your actual credentials:
   - Add your MongoDB connection string
   - Create a secure JWT secret
   - Add your OpenWeatherMap API key

5. Start the development server:
   ```
   npm run dev
   ```

6. Open your browser and navigate to `http://localhost:5000`

## Project Structure

```
/client
  /css          - Stylesheets
  /js           - Frontend JavaScript
  /public       - Static assets
  index.html    - Main HTML file
/server
  /controllers  - API logic 
  /models       - Database models
  /routes       - API routes
  /utils        - Helper functions
  server.js     - Main server file
.env            - Environment variables
package.json    - Project dependencies
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user
- `GET /api/auth/me` - Get current user profile

### Sustainable Actions
- `POST /api/actions` - Create a new sustainable action log
- `GET /api/actions` - Get all user actions
- `GET /api/actions/date-range` - Get actions by date range
- `GET /api/actions/stats` - Get user statistics
- `PUT /api/actions/:id` - Update an action
- `DELETE /api/actions/:id` - Delete an action

### Weather
- `GET /api/weather/coordinates` - Get weather by coordinates
- `GET /api/weather/city` - Get weather by city name

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- OpenWeatherMap API for weather data
- OpenStreetMap for map tiles
- Chart.js for data visualization
- LeafletJS for interactive maps 