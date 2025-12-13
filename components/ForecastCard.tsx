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
      transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 20 }}
      whileHover={{ scale: 1.02, y: -8 }}
      className="backdrop-blur-2xl bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 dark:from-white/95 dark:via-white/90 dark:to-white/95 rounded-3xl p-6 border border-slate-700/50 dark:border-slate-300/50 shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] hover:shadow-[0_8px_48px_0_rgba(251,146,60,0.3)] dark:hover:shadow-[0_8px_48px_0_rgba(251,146,60,0.2)] relative overflow-hidden transition-all duration-500 group"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-orange-500/20 via-amber-500/10 to-transparent dark:from-orange-400/30 dark:via-amber-400/15 dark:to-transparent rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700" />
      <div className="absolute bottom-0 left-0 w-28 h-28 bg-gradient-to-tr from-cyan-500/20 via-sky-500/10 to-transparent dark:from-cyan-400/30 dark:via-sky-400/15 dark:to-transparent rounded-full translate-y-14 -translate-x-14 group-hover:scale-150 transition-transform duration-700" />
      
      <div className="relative z-10">
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-white dark:text-slate-900 mb-2">7-Day Forecast</h3>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-blue-400 dark:bg-blue-500 animate-pulse" />
            <span className="text-slate-300 dark:text-slate-600 text-sm font-medium">Extended Forecast</span>
          </div>
        </div>
        
        <div className="space-y-3">
          {forecast.map((day, index) => (
            <motion.div
              key={day.date}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index, type: "spring" }}
              whileHover={{ scale: 1.03, x: 8 }}
              className="flex items-center justify-between py-4 px-5 rounded-2xl bg-gradient-to-r from-slate-800/70 to-slate-800/50 dark:from-slate-100/80 dark:to-slate-200/80 border border-slate-600/50 dark:border-slate-300/50 hover:border-blue-400/50 dark:hover:border-blue-500/50 hover:from-slate-800/90 hover:to-slate-800/70 dark:hover:from-slate-200/90 dark:hover:to-slate-300/90 transition-all duration-300 cursor-pointer group"
            >
              <span className="text-white dark:text-slate-800 w-16 font-bold text-sm group-hover:text-blue-300 dark:group-hover:text-blue-700 transition-colors">{day.date}</span>
              
              <div className="flex items-center">
                <Image
                  src={`https://openweathermap.org/img/wn/${day.icon}.png`}
                  alt={day.condition}
                  width={40}
                  height={40}
                />
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3">
                  <span className="font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent text-xl">{day.high}°</span>
                  <span className="text-slate-400 font-semibold text-base">{day.low}°</span>
                </div>
                <div className="w-1.5 h-10 bg-gradient-to-b from-orange-400 via-yellow-300 to-blue-400 rounded-full shadow-lg group-hover:h-12 transition-all duration-300" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}