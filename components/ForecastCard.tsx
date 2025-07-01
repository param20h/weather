'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ForecastDay } from '@/types/weather';

interface ForecastCardProps {
  forecast: ForecastDay[];
}

export default function ForecastCard({ forecast }: ForecastCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="backdrop-blur-xl bg-slate-900/90 dark:bg-black/90 rounded-3xl p-6 border-2 border-slate-700/50 dark:border-slate-600/30 shadow-2xl relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-orange-500/10 to-transparent rounded-full -translate-y-12 translate-x-12" />
      <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-cyan-500/10 to-transparent rounded-full translate-y-10 -translate-x-10" />
      
      <div className="relative z-10">
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-white mb-2">7-Day Forecast</h3>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-slate-300 text-sm font-medium">Extended Forecast</span>
          </div>
        </div>
        
        <div className="space-y-3">
          {forecast.map((day, index) => (
            <motion.div
              key={day.date}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ scale: 1.02, x: 5 }}
              className="flex items-center justify-between py-4 px-4 rounded-2xl bg-slate-800/60 border border-slate-600/50 hover:bg-slate-700/60 transition-all duration-200"
            >
              <span className="text-white w-12 font-bold">{day.date}</span>
              
              <div className="flex items-center">
                <Image
                  src={`https://openweathermap.org/img/wn/${day.icon}.png`}
                  alt={day.condition}
                  width={40}
                  height={40}
                />
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-white text-lg">{day.high}°</span>
                  <span className="text-slate-400 font-medium">{day.low}°</span>
                </div>
                <div className="w-1 h-8 bg-gradient-to-b from-orange-400 to-blue-400 rounded-full" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}