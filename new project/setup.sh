#!/bin/bash

# Living Sustainable Tracker Setup Script

echo "Setting up Living Sustainable Tracker project..."

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "Error: npm is not installed. Please install Node.js and npm first."
    exit 1
fi

# Install dependencies
echo "Installing dependencies..."
npm install

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "Creating .env file from template..."
    cp env.example .env
    echo "Please update the .env file with your actual credentials."
fi

# Check if MongoDB is running
echo "Checking MongoDB connection..."
if ! command -v mongod &> /dev/null; then
    echo "Warning: MongoDB does not appear to be installed."
    echo "Please install and start MongoDB before running the application."
else
    # Try to connect to MongoDB
    echo "MongoDB is installed. Make sure the service is running."
fi

echo ""
echo "Setup complete!"
echo "To start the development server, run: npm run dev"
echo "To start the production server, run: npm start"
echo ""
echo "Don't forget to update your .env file with actual credentials before starting!"
echo "" 