// Our first weather component!
// This component will display weather information

import { useState } from 'react'

function WeatherDisplay({ onWeatherChange }) {
  // State for weather data
  const [temperature, setTemperature] = useState(null)
  const [location, setLocation] = useState("")
  const [condition, setCondition] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  
  // NEW: State for city search
  const [cityInput, setCityInput] = useState("")

  // Helper function to convert Fahrenheit to Celsius
  const fahrenheitToCelsius = (fahrenheit) => {
    return Math.round((fahrenheit - 32) * 5/9)
  }

  // Helper function to get weather icon based on condition
  const getWeatherIcon = (condition) => {
    const conditionLower = condition.toLowerCase()
    
    switch(conditionLower) {
      case 'clear':
        return '☀️'
      case 'sunny':
        return '🌞'
      case 'clouds':
        return '☁️'
      case 'partly cloudy':
        return '⛅'
      case 'rain':
        return '🌧️'
      case 'drizzle':
        return '🌦️'
      case 'thunderstorm':
        return '⛈️'
      case 'snow':
        return '❄️'
      case 'mist':
      case 'fog':
        return '🌫️'
      case 'haze':
        return '🌤️'
      case 'wind':
        return '💨'
      default:
        return '🌤️' // Default partially cloudy
    }
  }

  // Function to fetch real weather data (now takes a city parameter)
  const fetchWeatherData = async (cityToSearch = "San Francisco") => {
    setLoading(true)
    setError("")
    
    try {
      // Now we use the city parameter instead of hardcoded "San Francisco"
      const city = cityToSearch
      
      // Using your API key from the email (will activate within a couple hours)
      const apiKey = "26b86b4753a292649c4401412e936a79"
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`
      
      const response = await fetch(url)
      console.log("API Response status:", response.status)
      
      if (!response.ok) {
        const errorData = await response.json()
        console.log("API Error data:", errorData)
        throw new Error(errorData.message || 'Weather data not found')
      }
      
      const data = await response.json()
      
      // Update our state with real data
      setTemperature(Math.round(data.main.temp))
      setLocation(`${data.name}, ${data.sys.country}`)
      setCondition(data.weather[0].main)
      
      // Notify parent component about weather change for background animation
      if (onWeatherChange) {
        onWeatherChange(data.weather[0].main.toLowerCase())
      }
      
    } catch (err) {
      console.log("API Error:", err)
      setError(`Failed to fetch weather data: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  // NEW: Function to handle city search
  const handleCitySearch = (e) => {
    e.preventDefault() // Prevent page refresh
    
    if (cityInput.trim()) {
      fetchWeatherData(cityInput.trim())
      setCityInput("") // Clear the input after search
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-white/30 relative z-50 overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Current Weather</h2>
        
        {/* NEW: City search form */}
        <form onSubmit={handleCitySearch} className="mb-4">
          <div className="flex space-x-2">
            <input
              type="text"
              value={cityInput}
              onChange={(e) => setCityInput(e.target.value)}
              placeholder="Enter city name..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              type="submit"
              disabled={loading || !cityInput.trim()}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                loading || !cityInput.trim()
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-green-500 hover:bg-green-600 text-white'
              }`}
            >
              Search
            </button>
          </div>
        </form>
        
        {/* Show different content based on state */}
        {!temperature && !loading && !error && (
          <p className="text-gray-600 mb-4">Click the button to fetch real weather data!</p>
        )}
        
        {loading && (
          <p className="text-blue-600 mb-4">Loading weather data...</p>
        )}
        
        {error && (
          <p className="text-red-600 mb-4">{error}</p>
        )}
        
        {temperature && !loading && (
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">📍</span>
              <span className="text-lg text-gray-700">{location}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🌡️</span>
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-blue-600">{temperature}°F - {fahrenheitToCelsius(temperature)}°C</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl">{getWeatherIcon(condition)}</span>
              <span className="text-lg text-gray-700">{condition}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default WeatherDisplay
