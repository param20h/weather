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
      transition={{ delay: 0.3 }}
      className="backdrop-blur-xl bg-slate-900/90 dark:bg-black/90 rounded-3xl p-6 border-2 border-slate-700/50 dark:border-slate-600/30 shadow-2xl"
    >
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">Air Quality Index</h3>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
          <span className="text-slate-300 text-sm font-medium">Live Data</span>
        </div>
      </div>

      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-6">
          <div className={`w-20 h-20 rounded-2xl ${aqiInfo.color}/20 border-2 ${aqiInfo.color} flex items-center justify-center`}>
            <span className="text-3xl">{aqiInfo.icon}</span>
          </div>
          <div>
            <div className="text-6xl font-black text-white">
              {data.aqi}
            </div>
            <div className="text-sm font-bold text-slate-300 uppercase tracking-wider">AQI Score</div>
          </div>
        </div>
        <div className={`px-6 py-3 rounded-2xl ${aqiInfo.color}/20 border-2 ${aqiInfo.color}`}>
          <span className="text-sm font-bold text-white">{aqiInfo.level}</span>
        </div>
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
              className="p-4 rounded-2xl bg-slate-800/60 border border-slate-600/50"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{pollutant.icon}</span>
                  <span className="text-lg font-bold text-white">{pollutant.label}</span>
                </div>
              </div>
              
              <div className="mb-3">
                <span className={`inline-block text-xs px-3 py-1.5 rounded-full ${level.color}/30 border ${level.color} text-white font-bold shadow-lg`}>
                  {level.level}
                </span>
              </div>
              
              <div className="flex items-baseline space-x-2 mb-2">
                <span className="text-3xl font-black text-white">
                  {pollutant.value.toFixed(1)}
                </span>
                <span className="text-sm text-slate-300 font-bold">{pollutant.unit}</span>
              </div>
              
              <div className="text-sm text-slate-300 font-medium mb-4">{pollutant.desc}</div>
              
              <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                <motion.div 
                  className={`h-full ${level.color} rounded-full`}
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min((pollutant.value / 100) * 100, 100)}%` }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 1 }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}