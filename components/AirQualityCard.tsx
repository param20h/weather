'use client';

import { motion } from 'framer-motion';

interface AirQualityData {
  aqi: number;
  co: number;
  no2: number;
  o3: number;
  pm2_5: number;
  pm10: number;
}

interface AirQualityCardProps {
  data: AirQualityData;
}

const getAQILevel = (aqi: number) => {
  if (aqi <= 50) return { level: 'Good', color: 'bg-green-500', textColor: 'text-green-500', icon: '😊' };
  if (aqi <= 100) return { level: 'Moderate', color: 'bg-yellow-500', textColor: 'text-yellow-500', icon: '😐' };
  if (aqi <= 150) return { level: 'Unhealthy for Sensitive', color: 'bg-orange-500', textColor: 'text-orange-500', icon: '😷' };
  if (aqi <= 200) return { level: 'Unhealthy', color: 'bg-red-500', textColor: 'text-red-500', icon: '😨' };
  return { level: 'Hazardous', color: 'bg-purple-500', textColor: 'text-purple-500', icon: '☠️' };
};

const getPollutantLevel = (value: number, type: string) => {
  const thresholds = {
    pm2_5: [12, 35, 55, 150],
    pm10: [54, 154, 254, 354],
    o3: [54, 70, 85, 105],
    no2: [53, 100, 360, 649]
  };
  
  const limits = thresholds[type as keyof typeof thresholds] || [50, 100, 150, 200];
  
  if (value <= limits[0]) return { level: 'Good', color: 'bg-green-500', textColor: 'text-green-500' };
  if (value <= limits[1]) return { level: 'Moderate', color: 'bg-yellow-500', textColor: 'text-yellow-500' };
  if (value <= limits[2]) return { level: 'Unhealthy', color: 'bg-orange-500', textColor: 'text-orange-500' };
  if (value <= limits[3]) return { level: 'Very Unhealthy', color: 'bg-red-500', textColor: 'text-red-500' };
  return { level: 'Hazardous', color: 'bg-purple-500', textColor: 'text-purple-500' };
};

export default function AirQualityCard({ data }: AirQualityCardProps) {
  const aqiInfo = getAQILevel(data.aqi);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 20 }}
      whileHover={{ scale: 1.02, y: -8 }}
      className="backdrop-blur-2xl bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 dark:from-white/95 dark:via-white/90 dark:to-white/95 rounded-3xl p-6 border border-slate-700/50 dark:border-slate-300/50 shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] hover:shadow-[0_8px_48px_0_rgba(34,197,94,0.3)] dark:hover:shadow-[0_8px_48px_0_rgba(34,197,94,0.2)] relative overflow-hidden transition-all duration-500 group"
    >
      <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-green-500/20 via-emerald-500/10 to-transparent dark:from-green-400/30 dark:via-emerald-400/15 dark:to-transparent rounded-full -translate-y-18 translate-x-18 group-hover:scale-150 transition-transform duration-700" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-teal-500/20 via-cyan-500/10 to-transparent dark:from-teal-400/30 dark:via-cyan-400/15 dark:to-transparent rounded-full translate-y-16 -translate-x-16 group-hover:scale-150 transition-transform duration-700" />
      
      <div className="relative z-10">
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-white dark:text-slate-900 mb-2">Air Quality Index</h3>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-green-400 dark:bg-green-500 animate-pulse" />
            <span className="text-slate-300 dark:text-slate-600 text-sm font-semibold">Live Data</span>
          </div>
        </div>

        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-6">
            <motion.div 
              className={`w-24 h-24 rounded-2xl ${aqiInfo.color}/20 border-2 ${aqiInfo.color} flex items-center justify-center shadow-lg`}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-4xl">{aqiInfo.icon}</span>
            </motion.div>
            <div>
              <div className="text-7xl font-black bg-gradient-to-br from-white via-green-100 to-emerald-200 dark:from-slate-900 dark:via-green-900 dark:to-emerald-900 bg-clip-text text-transparent">
                {data.aqi}
              </div>
              <div className="text-sm font-bold text-slate-300 dark:text-slate-600 uppercase tracking-widest mt-1">AQI Score</div>
            </div>
          </div>
          <motion.div 
            className={`px-6 py-3 rounded-2xl ${aqiInfo.color}/20 border-2 ${aqiInfo.color} shadow-lg`}
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-sm font-bold text-white">{aqiInfo.level}</span>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 gap-4">
        {[
          { value: data.pm2_5, label: 'PM2.5', unit: 'μg/m³', type: 'pm2_5', icon: '🔴', desc: 'Fine particles' },
          { value: data.pm10, label: 'PM10', unit: 'μg/m³', type: 'pm10', icon: '🟤', desc: 'Coarse particles' },
          { value: data.o3, label: 'O₃', unit: 'μg/m³', type: 'o3', icon: '🔵', desc: 'Ground ozone' },
          { value: data.no2, label: 'NO₂', unit: 'μg/m³', type: 'no2', icon: '🟡', desc: 'Nitrogen dioxide' }
        ].map((pollutant, index) => {
          const level = getPollutantLevel(pollutant.value, pollutant.type);
          return (
            <motion.div 
              key={pollutant.type} 
              className="p-5 rounded-2xl bg-gradient-to-br from-slate-800/70 to-slate-900/70 dark:from-slate-100/80 dark:to-slate-200/80 border border-slate-600/50 dark:border-slate-300/50 hover:border-green-400/50 dark:hover:border-green-500/50 hover:bg-slate-800/80 dark:hover:bg-slate-200/90 transition-all duration-300 group"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
              whileHover={{ scale: 1.05, y: -4 }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl group-hover:scale-110 transition-transform duration-300">{pollutant.icon}</span>
                  <span className="text-lg font-bold text-white dark:text-slate-800 group-hover:text-green-300 dark:group-hover:text-green-700 transition-colors">{pollutant.label}</span>
                </div>
              </div>
              
              <div className="mb-3">
                <motion.span 
                  className={`inline-block text-xs px-3 py-1.5 rounded-full ${level.color}/30 border ${level.color} text-white font-bold shadow-lg`}
                  whileHover={{ scale: 1.1 }}
                >
                  {level.level}
                </motion.span>
              </div>
              
              <div className="flex items-baseline space-x-2 mb-2">
                <span className="text-3xl font-black bg-gradient-to-r from-white to-emerald-100 dark:from-slate-900 dark:to-emerald-900 bg-clip-text text-transparent">
                  {pollutant.value.toFixed(1)}
                </span>
                <span className="text-sm text-slate-300 dark:text-slate-600 font-bold">{pollutant.unit}</span>
              </div>
              
              <div className="text-sm text-slate-300 dark:text-slate-600 font-medium mb-4">{pollutant.desc}</div>
              
              <div className="h-2 bg-slate-700 rounded-full overflow-hidden shadow-inner">
                <motion.div 
                  className={`h-full ${level.color} rounded-full shadow-lg`}
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min((pollutant.value / 100) * 100, 100)}%` }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 1 }}
                />
              </div>
            </motion.div>
          );
        })}
        </div>
      </div>
    </motion.div>
  );
}