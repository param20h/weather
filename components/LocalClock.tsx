'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ClockIcon } from '@heroicons/react/24/outline';

interface LocalClockProps {
  lat: number;
  lon: number;
  locationName: string;
}

export default function LocalClock({ lat, lon, locationName }: LocalClockProps) {
  const [time, setTime] = useState<string>('');
  const [timezone, setTimezone] = useState<string>('');

  useEffect(() => {
    const getTimezone = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`
        );
        const data = await response.json();
        const timezoneOffset = data.timezone; // seconds from UTC
        
        const updateTime = () => {
          const now = new Date();
          const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
          const localTime = new Date(utc + (timezoneOffset * 1000));
          
          setTime(localTime.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
          }));
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
      } catch (error) {
        console.error('Failed to get timezone:', error);
      }
    };

    getTimezone();
  }, [lat, lon]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05, y: -4 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="backdrop-blur-2xl bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 dark:from-white/95 dark:via-white/90 dark:to-white/95 rounded-2xl p-5 border border-slate-700/50 dark:border-slate-300/50 shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] hover:shadow-[0_8px_48px_0_rgba(99,102,241,0.3)] dark:hover:shadow-[0_8px_48px_0_rgba(99,102,241,0.2)] group transition-all duration-500"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-transparent dark:from-indigo-400/10 dark:via-purple-400/10 dark:to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500" />
      <div className="flex items-center gap-4 relative z-10">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        >
          <ClockIcon className="w-7 h-7 text-blue-400 dark:text-blue-600 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
        </motion.div>
        <div>
          <div className="text-white dark:text-slate-800 font-mono text-xl font-bold tracking-wide mb-1 bg-gradient-to-r from-white to-blue-100 dark:from-slate-900 dark:to-blue-900 bg-clip-text text-transparent">{time}</div>
          <div className="text-slate-400 dark:text-slate-600 text-sm font-semibold">{locationName}</div>
        </div>
      </div>
    </motion.div>
  );
}