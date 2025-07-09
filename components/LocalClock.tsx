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
      className="backdrop-blur-xl bg-slate-900/80 rounded-2xl p-4 border border-slate-700/50 shadow-lg"
    >
      <div className="flex items-center gap-3">
        <ClockIcon className="w-5 h-5 text-blue-400" />
        <div>
          <div className="text-white font-mono text-lg font-bold">{time}</div>
          <div className="text-slate-400 text-sm">{locationName}</div>
        </div>
      </div>
    </motion.div>
  );
}