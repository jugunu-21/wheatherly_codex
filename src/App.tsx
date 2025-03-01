import './App.css'
import WeatherCard from './components/WeatherCard'
import SearchHistory from './components/SearchHistory'
import LocationDetector from './components/LocationDetector'
import { WeatherProvider, useWeather } from './context/WeatherContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { fetchWeatherData } from './utils/weatherData'
import ToggleButton from './components/ToggleButton'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 30000,
    }
  }
})

function WeatherApp() {
  
  const { city, setCity,toggleTemperatureUnit, setSubmittedCity,isCelsius, updateRecentSearches, setError, error } = useWeather();
  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
    if (error) setError(null); // Clear error when user starts typing
  }
  const handleKeyPress = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (!city.trim()) {
        setError('Please enter a city name');
        return;
      }
      const result = await fetchWeatherData(city);
      if (result.success) {
        const fullCityName = result.data.location.name;
        setCity(fullCityName);
        setSubmittedCity(fullCityName);
        updateRecentSearches(fullCityName);
        setError(null);
      } else {
        setError(result.error || 'City not found. Please check the spelling and try again.');
      }
    }
  };
  return (
    <div className='  h-full w-full flex flex-col md:flex-row p-4 mt-6'>
      <div className='flex-1 order-2 md:order-1 flex justify-center'>
        <SearchHistory />
      </div>
    
      <div className=' flex-2 order-1 md:order-2 flex flex-col items-end gap-6 px-6 py-2 max-w-screen-2xl mx-auto min-w-0'>
        <div className=" px-2 flex gap-2 items-center justify-between w-full ">
        <ToggleButton
            isActive={isCelsius}
            onToggle={toggleTemperatureUnit}
            leftLabel="°C"
            rightLabel="°F"
          />
          <div className='flex gap-2 '>
          <LocationDetector />
          <input
            type='text'
            value={city}
            onChange={handleCityChange}
            onKeyPress={handleKeyPress}
            placeholder='Enter city name'
            className='w-40 sm:w-60 px-4 py-2 rounded-lg bg-white/10 backdrop-blur-md text-white placeholder-white/50 border border-white/20 focus:outline-none focus:border-white/40'
          />
        </div></div>
        <WeatherCard />
      </div>
    </div>
  )
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WeatherProvider>
        <div className="min-h-screen min-w-full bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 overflow-auto mt-6">
          <WeatherApp />
        </div>
      </WeatherProvider>
    </QueryClientProvider>
  );
}

export default App



