'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface GoogleMapsWeatherProps {
  lat: number;
  lon: number;
  onLocationSelect?: (lat: number, lon: number) => void;
}

export default function GoogleMapsWeather({ lat, lon, onLocationSelect }: GoogleMapsWeatherProps) {
  const [activeLayer, setActiveLayer] = useState('precipitation');

  const layers = [
    { id: 'precipitation', name: 'Rain', icon: '🌧️', color: 'from-blue-500 to-cyan-500' },
    { id: 'temperature', name: 'Temp', icon: '🌡️', color: 'from-red-500 to-orange-500' },
    { id: 'wind', name: 'Wind', icon: '💨', color: 'from-green-500 to-teal-500' },
    { id: 'clouds', name: 'Clouds', icon: '☁️', color: 'from-gray-500 to-slate-500' },
  ];

  return (
    <div className="backdrop-blur-xl bg-gradient-to-br from-slate-900/90 to-slate-800/90 dark:from-slate-900/95 dark:to-black/90 rounded-3xl overflow-hidden border-2 border-slate-700/50 dark:border-slate-600/30 shadow-2xl">
      <div className="p-6 border-b border-slate-700/50 dark:border-slate-600/30 bg-gradient-to-r from-slate-800/80 to-slate-700/80 dark:from-slate-900/80 dark:to-black/80">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-white">Weather Radar</h3>
            <p className="text-slate-300 text-sm mt-1">Real-time weather visualization</p>
          </div>
          <div className="flex space-x-2">
            {layers.map((layer) => (
              <motion.button
                key={layer.id}
                onClick={() => setActiveLayer(layer.id)}
                className={`px-4 py-2 rounded-2xl text-sm font-bold transition-all duration-300 backdrop-blur-sm border-2 ${
                  activeLayer === layer.id
                    ? `bg-gradient-to-r ${layer.color} text-white border-white/30 shadow-lg scale-105`
                    : 'bg-slate-800/60 text-slate-300 border-slate-600/50 hover:bg-slate-700/60 hover:scale-105 hover:text-white'
                }`}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-lg mr-2">{layer.icon}</span>
                <span className="hidden sm:inline">{layer.name}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="h-80 w-full relative bg-slate-900">
        <iframe
          src={`https://embed.windy.com/embed2.html?lat=${lat}&lon=${lon}&detailLat=${lat}&detailLon=${lon}&width=650&height=450&zoom=8&level=surface&overlay=${activeLayer}&product=ecmwf&menu=&message=&marker=&calendar=now&pressure=&type=map&location=coordinates&detail=&metricWind=default&metricTemp=default&radarRange=-1`}
          className="w-full h-full border-0 rounded-b-3xl"
          frameBorder="0"
        />
        
        <div 
          className="absolute inset-0 cursor-crosshair bg-transparent hover:bg-blue-500/5 transition-colors duration-200"
          onClick={(e) => {
            if (onLocationSelect) {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              const newLat = lat + (y - rect.height/2) * 0.001;
              const newLon = lon + (x - rect.width/2) * 0.001;
              onLocationSelect(newLat, newLon);
            }
          }}
        />
        
        <div className="absolute bottom-4 left-4 bg-slate-900/90 backdrop-blur-sm rounded-xl px-3 py-2 border border-slate-600/50">
          <p className="text-white text-sm font-semibold">Click to select location</p>
        </div>
      </div>
    </div>
  );
}