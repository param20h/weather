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
      transition={{ delay: 0.4, type: "spring", stiffness: 200, damping: 20 }}
      whileHover={{ scale: 1.01, y: -4 }}
      className="backdrop-blur-2xl bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 dark:from-white/95 dark:via-white/90 dark:to-white/95 rounded-3xl p-6 border border-slate-700/50 dark:border-slate-300/50 shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] hover:shadow-[0_8px_48px_0_rgba(168,85,247,0.3)] dark:hover:shadow-[0_8px_48px_0_rgba(168,85,247,0.2)] relative overflow-hidden transition-all duration-500 group"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-purple-500/20 via-pink-500/10 to-transparent dark:from-purple-400/30 dark:via-pink-400/15 dark:to-transparent rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700" />
      <div className="absolute bottom-0 left-0 w-28 h-28 bg-gradient-to-tr from-fuchsia-500/20 via-violet-500/10 to-transparent dark:from-fuchsia-400/30 dark:via-violet-400/15 dark:to-transparent rounded-full translate-y-14 -translate-x-14 group-hover:scale-150 transition-transform duration-700" />
      
      <div className="relative z-10">
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-white dark:text-slate-900 mb-2">24-Hour Forecast</h3>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-purple-400 dark:bg-purple-500 animate-pulse" />
            <span className="text-slate-300 dark:text-slate-600 text-sm font-semibold">Hourly Breakdown</span>
          </div>
        </div>
        
        <div className="h-36 mb-6 p-5 rounded-2xl bg-gradient-to-br from-slate-800/70 to-slate-900/70 dark:from-slate-100/80 dark:to-slate-200/80 border border-slate-600/50 dark:border-slate-300/50 shadow-inner">
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

        <div className="flex overflow-x-auto space-x-4 pb-2 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
          {data.slice(0, 12).map((hour, index) => (
            <motion.div
              key={hour.time}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index, type: "spring" }}
              whileHover={{ scale: 1.08, y: -4 }}
              className="flex-shrink-0 text-center p-5 rounded-2xl bg-gradient-to-br from-slate-800/70 to-slate-900/70 dark:from-slate-100/80 dark:to-slate-200/80 border border-slate-600/50 dark:border-slate-300/50 hover:border-purple-400/50 dark:hover:border-purple-500/50 min-w-[100px] hover:bg-slate-800/80 dark:hover:bg-slate-200/90 transition-all duration-300 cursor-pointer group"
            >
              <div className="text-slate-300 dark:text-slate-600 text-sm mb-3 font-semibold group-hover:text-purple-300 dark:group-hover:text-purple-700 transition-colors">
                {format(new Date(hour.time * 1000), 'HH:mm')}
              </div>
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Image
                  src={`https://openweathermap.org/img/wn/${hour.icon}.png`}
                  alt={hour.description}
                  width={40}
                  height={40}
                  className="mx-auto mb-3 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]"
                />
              </motion.div>
              <div className="text-white dark:text-slate-800 font-bold text-xl mb-1 bg-gradient-to-r from-white to-blue-100 dark:from-slate-900 dark:to-blue-900 bg-clip-text text-transparent">{Math.round(hour.temp)}°</div>
              <div className="text-slate-400 dark:text-slate-600 text-xs font-semibold">💧 {hour.humidity}%</div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}