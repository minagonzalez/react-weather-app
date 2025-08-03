import './App.css'
import WeatherDisplay from './WeatherDisplay.jsx'
import { useState } from 'react'

function App() {
  const [weatherCondition, setWeatherCondition] = useState('default')
  
  // Function to get background classes based on weather
  const getBackgroundClass = (condition) => {
    switch(condition) {
      case 'clear':
      case 'sunny':
        return 'animate-sunny'
      case 'rain':
      case 'drizzle':
        return 'bg-gradient-to-br from-gray-600 via-blue-700 to-gray-800 animate-rain'
      case 'clouds':
        return 'bg-gradient-to-br from-gray-400 via-gray-500 to-gray-600 animate-clouds'
      case 'snow':
        return 'bg-gradient-to-br from-blue-100 via-white to-blue-200 animate-snow'
      case 'thunderstorm':
        return 'bg-gradient-to-br from-gray-900 via-purple-900 to-black animate-thunder'
      default:
        return 'bg-gradient-to-br from-blue-400 to-purple-500'
    }
  }

  return (
    <div className={`min-h-screen py-8 transition-all duration-1000 ${getBackgroundClass(weatherCondition)}`}>
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-white text-center mb-2">Weather App</h1>
        <p className="text-white text-center mb-8 opacity-90">Search for any city to see live weather and animated backgrounds!</p>
        
        {/* Our weather component with callback */}
        <WeatherDisplay onWeatherChange={setWeatherCondition} />
      </div>
    </div>
  )
}

export default App
