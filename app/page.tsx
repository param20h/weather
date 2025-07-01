'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Toaster, toast } from 'react-hot-toast';
import WeatherCard from '@/components/WeatherCard';
import ForecastCard from '@/components/ForecastCard';
import ThemeToggle from '@/components/ThemeToggle';
import WeatherMap from '@/components/WeatherMap';
import GoogleMapsWeather from '@/components/GoogleMapsWeather';
import AirQualityCard from '@/components/AirQualityCard';
import HourlyForecast from '@/components/HourlyForecast';
import WeatherAlerts from '@/components/WeatherAlerts';
import FavoritesManager from '@/components/FavoritesManager';
import SimpleParticles from '@/components/SimpleParticles';
import SearchBar from '@/components/SearchBar';
import Footer from '@/components/Footer';
import NotificationManager from '@/components/NotificationManager';
import WindCompass from '@/components/WindCompass';
import CityComparison from '@/components/CityComparison';
import AnimatedBackground from '@/components/AnimatedBackground';
import LoadingScreen from '@/components/LoadingScreen';
import { WeatherResponse } from '@/types/weather';
import { getWeatherBackground } from '@/lib/weather';
import { useWeatherStore } from '@/store/weatherStore';

export default function Home() {
  const {
    currentWeather,
    forecast,
    hourlyForecast,
    airQuality,
    alerts,
    selectedLocation,
    isLoading,
    error,
    setCurrentWeather,
    setForecast,
    setHourlyForecast,
    setAirQuality,
    setAlerts,
    setLoading,
    setError,
  } = useWeatherStore();
  
  const [coords, setCoords] = useState<{lat: number, lon: number} | null>(null);

  const fetchWeatherData = async (lat: number, lon: number) => {
    setLoading(true);
    try {
      const [weatherRes, airQualityRes] = await Promise.all([
        fetch(`/api/weather?lat=${lat}&lon=${lon}`),
        fetch(`/api/air-quality?lat=${lat}&lon=${lon}`)
      ]);
      
      const [weatherData, airQualityData] = await Promise.all([
        weatherRes.json(),
        airQualityRes.json()
      ]);
      
      if (weatherRes.ok) {
        setCurrentWeather(weatherData.current);
        setForecast(weatherData.forecast);
        setHourlyForecast(weatherData.hourly || []);
        setCoords({ lat, lon });
        
        // Mock alerts for demo
        setAlerts([
          {
            id: '1',
            title: 'Heat Advisory',
            description: 'Excessive heat warning in effect. Stay hydrated and avoid prolonged sun exposure.',
            severity: 'moderate',
            start: Date.now() / 1000,
            end: (Date.now() + 86400000) / 1000
          }
        ]);
      }
      
      if (airQualityRes.ok) {
        setAirQuality(airQualityData);
      }
      
      toast.success('Weather data updated!');
    } catch (err) {
      setError('Failed to fetch weather data');
      toast.error('Failed to load weather data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedLocation) {
      fetchWeatherData(selectedLocation.lat, selectedLocation.lon);
    } else if (typeof window !== 'undefined' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherData(latitude, longitude);
        },
        () => {
          setError('Location access denied');
          setLoading(false);
        }
      );
    } else {
      setError('Geolocation not supported');
      setLoading(false);
    }
  }, [selectedLocation]);

  const backgroundGradient = currentWeather 
    ? getWeatherBackground(currentWeather.condition)
    : 'from-blue-400 via-blue-500 to-blue-600';

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error) {
    return (
      <div className={`min-h-screen bg-gradient-to-br ${backgroundGradient} flex items-center justify-center`}>
        <div className="text-white text-center">
          <h2 className="text-2xl font-light mb-2">Weather Unavailable</h2>
          <p className="text-white/80">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-black dark:via-slate-900 dark:to-black transition-all duration-1000 relative overflow-hidden">
      {/* Animated background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}} />
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}} />
      </div>
      {currentWeather && <AnimatedBackground condition={currentWeather.condition} />}
      <SearchBar onLocationSelect={(lat, lon) => fetchWeatherData(lat, lon)} />
      <NotificationManager />
      <ThemeToggle />
      <FavoritesManager />
      <CityComparison />
      <Toaster position="top-right" />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-7xl mx-auto"
        >
          {alerts.length > 0 && (
            <div className="mb-8 mt-20">
              <WeatherAlerts alerts={alerts} />
            </div>
          )}
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {currentWeather && (
              <>
                <WeatherCard weather={currentWeather} />
                {airQuality && <AirQualityCard data={airQuality} />}
                <ForecastCard forecast={forecast} />
              </>
            )}
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
            {hourlyForecast.length > 0 && (
              <div className="lg:col-span-3">
                <HourlyForecast data={hourlyForecast} />
              </div>
            )}
            {currentWeather && (
              <WindCompass windSpeed={currentWeather.windSpeed} windDirection={270} />
            )}
          </div>
          

          
          {coords && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <WeatherMap 
                lat={coords.lat} 
                lon={coords.lon} 
                onLocationSelect={(lat, lon) => fetchWeatherData(lat, lon)}
              />
              <GoogleMapsWeather 
                lat={coords.lat} 
                lon={coords.lon} 
                onLocationSelect={(lat, lon) => fetchWeatherData(lat, lon)}
              />
            </div>
          )}
        </motion.div>
      </div>
      <Footer />
    </main>
  );
}