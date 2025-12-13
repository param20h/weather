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
      whileHover={{ scale: 1.02, y: -8 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="backdrop-blur-2xl bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 dark:from-white/95 dark:via-white/90 dark:to-white/95 rounded-3xl p-8 border border-slate-700/50 dark:border-slate-300/50 shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] hover:shadow-[0_8px_48px_0_rgba(59,130,246,0.3)] dark:hover:shadow-[0_8px_48px_0_rgba(59,130,246,0.2)] relative overflow-hidden transition-all duration-500 group"
    >
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-blue-500/20 via-cyan-500/10 to-transparent dark:from-blue-400/30 dark:via-cyan-400/15 dark:to-transparent rounded-full -translate-y-20 translate-x-20 group-hover:scale-150 transition-transform duration-700" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-purple-500/20 via-pink-500/10 to-transparent dark:from-purple-400/30 dark:via-pink-400/15 dark:to-transparent rounded-full translate-y-16 -translate-x-16 group-hover:scale-150 transition-transform duration-700" />
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-500/5 to-transparent dark:via-blue-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white dark:text-slate-900 mb-2">{weather.location}</h2>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-green-400 dark:bg-green-500 animate-pulse" />
            <span className="text-slate-300 dark:text-slate-600 text-sm font-medium">Current Weather</span>
          </div>
        </div>
        
        <div className="flex items-center justify-center mb-6">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
              alt={weather.description}
              width={100}
              height={100}
              className="drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]"
            />
          </motion.div>
          <div className="ml-4">
            <span className="text-7xl font-black bg-gradient-to-br from-white via-blue-100 to-cyan-200 dark:from-slate-900 dark:via-blue-900 dark:to-cyan-900 bg-clip-text text-transparent drop-shadow-lg">
              {weather.temperature}°
            </span>
          </div>
        </div>
        
        <p className="text-white dark:text-slate-800 text-xl capitalize mb-8 font-semibold text-center tracking-wide">{weather.description}</p>
        
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: 'Humidity', value: `${weather.humidity}%`, icon: '💧' },
            { label: 'Wind', value: `${weather.windSpeed} km/h`, icon: '💨' },
            { label: 'Sunrise', value: format(new Date(weather.sunrise * 1000), 'HH:mm'), icon: '🌅' },
            { label: 'Sunset', value: format(new Date(weather.sunset * 1000), 'HH:mm'), icon: '🌇' }
          ].map((item, index) => (
            <motion.div 
              key={item.label}
              className="text-center p-5 rounded-2xl bg-gradient-to-br from-slate-800/70 to-slate-900/70 dark:from-slate-100/80 dark:to-slate-200/80 border border-slate-600/50 dark:border-slate-300/50 hover:border-blue-400/50 dark:hover:border-blue-500/50 hover:bg-slate-800/80 dark:hover:bg-slate-200/90 transition-all duration-300 group"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
              whileHover={{ scale: 1.08, y: -4 }}
            >
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
              <p className="text-xs text-slate-400 dark:text-slate-600 font-semibold uppercase tracking-widest mb-1.5">{item.label}</p>
              <p className="text-xl font-bold bg-gradient-to-r from-white to-blue-100 dark:from-slate-900 dark:to-blue-900 bg-clip-text text-transparent">{item.value}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}