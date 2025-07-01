'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

interface CityWeather {
  name: string;
  temp: number;
  condition: string;
  icon: string;
  humidity: number;
  windSpeed: number;
}

export default function CityComparison() {
  const [cities, setCities] = useState<CityWeather[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addCity = async (cityName: string) => {
    try {
      const geoResponse = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`
      );
      const geoData = await geoResponse.json();
      
      if (geoData.length > 0) {
        const { lat, lon } = geoData[0];
        const weatherResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}&units=metric`
        );
        const weatherData = await weatherResponse.json();
        
        const newCity: CityWeather = {
          name: weatherData.name,
          temp: Math.round(weatherData.main.temp),
          condition: weatherData.weather[0].main,
          icon: weatherData.weather[0].icon,
          humidity: weatherData.main.humidity,
          windSpeed: Math.round(weatherData.wind.speed * 3.6)
        };
        
        setCities(prev => [...prev, newCity]);
      }
    } catch (error) {
      console.error('Failed to add city:', error);
    }
  };

  const removeCity = (index: number) => {
    setCities(prev => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    // Add some default cities
    if (cities.length === 0) {
      addCity('New York');
      addCity('London');
      addCity('Tokyo');
    }
  }, []);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 right-4 p-3 backdrop-blur-xl bg-slate-900/80 rounded-full border border-slate-700/50 shadow-lg hover:scale-105 transition-all"
      >
        <PlusIcon className="w-6 h-6 text-white" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="backdrop-blur-xl bg-slate-900/90 rounded-3xl p-6 border-2 border-slate-700/50 w-full max-w-4xl max-h-[80vh] overflow-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">City Comparison</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-slate-800/60 rounded-full transition-colors"
              >
                <XMarkIcon className="w-6 h-6 text-white" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {cities.map((city, index) => (
                <motion.div
                  key={city.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 rounded-2xl bg-slate-800/60 border border-slate-600/50 relative"
                >
                  <button
                    onClick={() => removeCity(index)}
                    className="absolute top-2 right-2 p-1 hover:bg-slate-700/60 rounded-full transition-colors"
                  >
                    <XMarkIcon className="w-4 h-4 text-slate-400" />
                  </button>
                  
                  <div className="text-center">
                    <h3 className="text-lg font-bold text-white mb-2">{city.name}</h3>
                    <div className="flex items-center justify-center mb-2">
                      <Image
                        src={`https://openweathermap.org/img/wn/${city.icon}.png`}
                        alt={city.condition}
                        width={50}
                        height={50}
                      />
                      <span className="text-3xl font-bold text-white ml-2">{city.temp}°</span>
                    </div>
                    <p className="text-slate-300 text-sm mb-3">{city.condition}</p>
                    
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="text-center">
                        <div className="text-slate-400">Humidity</div>
                        <div className="text-white font-bold">{city.humidity}%</div>
                      </div>
                      <div className="text-center">
                        <div className="text-slate-400">Wind</div>
                        <div className="text-white font-bold">{city.windSpeed} km/h</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}