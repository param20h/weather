'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { WeatherData } from '@/types/weather';
import { format } from 'date-fns';

interface WeatherCardProps {
  weather: WeatherData;
}

export default function WeatherCard({ weather }: WeatherCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="backdrop-blur-xl bg-slate-900/90 dark:bg-black/90 rounded-3xl p-8 border-2 border-slate-700/50 dark:border-slate-600/30 shadow-2xl relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-500/10 to-transparent rounded-full -translate-y-16 translate-x-16" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-500/10 to-transparent rounded-full translate-y-12 -translate-x-12" />
      
      <div className="relative z-10">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">{weather.location}</h2>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
            <span className="text-slate-300 text-sm font-medium">Current Weather</span>
          </div>
        </div>
        
        <div className="flex items-center justify-center mb-6">
          <Image
            src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
            alt={weather.description}
            width={80}
            height={80}
          />
          <span className="text-6xl font-black text-white ml-4">
            {weather.temperature}°
          </span>
        </div>
        
        <p className="text-white text-lg capitalize mb-6 font-medium text-center">{weather.description}</p>
        
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: 'Humidity', value: `${weather.humidity}%`, icon: '💧' },
            { label: 'Wind', value: `${weather.windSpeed} km/h`, icon: '💨' },
            { label: 'Sunrise', value: format(new Date(weather.sunrise * 1000), 'HH:mm'), icon: '🌅' },
            { label: 'Sunset', value: format(new Date(weather.sunset * 1000), 'HH:mm'), icon: '🌇' }
          ].map((item, index) => (
            <motion.div 
              key={item.label}
              className="text-center p-4 rounded-2xl bg-slate-800/60 border border-slate-600/50"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -2 }}
            >
              <div className="text-2xl mb-2">{item.icon}</div>
              <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">{item.label}</p>
              <p className="text-lg font-bold text-white">{item.value}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}