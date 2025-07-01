'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { format } from 'date-fns';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';

interface HourlyData {
  time: number;
  temp: number;
  icon: string;
  description: string;
  humidity: number;
  windSpeed: number;
}

interface HourlyForecastProps {
  data: HourlyData[];
}

export default function HourlyForecast({ data }: HourlyForecastProps) {
  const chartData = data.map(item => ({
    time: format(new Date(item.time * 1000), 'HH:mm'),
    temp: item.temp,
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="backdrop-blur-xl bg-slate-900/90 dark:bg-black/90 rounded-3xl p-6 border-2 border-slate-700/50 dark:border-slate-600/30 shadow-2xl relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl from-green-500/10 to-transparent rounded-full -translate-y-14 translate-x-14" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-pink-500/10 to-transparent rounded-full translate-y-12 -translate-x-12" />
      
      <div className="relative z-10">
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-white mb-2">24-Hour Forecast</h3>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-purple-400 animate-pulse" />
            <span className="text-slate-300 text-sm font-medium">Hourly Breakdown</span>
          </div>
        </div>
        
        <div className="h-32 mb-6 p-4 rounded-2xl bg-slate-800/60 border border-slate-600/50">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis 
                dataKey="time" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#94a3b8', fontSize: 12 }}
              />
              <YAxis hide />
              <Line 
                type="monotone" 
                dataKey="temp" 
                stroke="#60A5FA" 
                strokeWidth={3}
                dot={{ fill: '#60A5FA', strokeWidth: 2, r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="flex overflow-x-auto space-x-4 pb-2">
          {data.slice(0, 12).map((hour, index) => (
            <motion.div
              key={hour.time}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
              className="flex-shrink-0 text-center p-4 rounded-2xl bg-slate-800/60 border border-slate-600/50 min-w-[90px] hover:bg-slate-700/60 transition-colors"
            >
              <div className="text-slate-300 text-sm mb-2 font-medium">
                {format(new Date(hour.time * 1000), 'HH:mm')}
              </div>
              <Image
                src={`https://openweathermap.org/img/wn/${hour.icon}.png`}
                alt={hour.description}
                width={32}
                height={32}
                className="mx-auto mb-2"
              />
              <div className="text-white font-bold text-lg">{Math.round(hour.temp)}°</div>
              <div className="text-slate-400 text-xs mt-1">{hour.humidity}%</div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}