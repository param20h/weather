'use client';

import { motion } from 'framer-motion';

interface WindCompassProps {
  windSpeed: number;
  windDirection: number;
}

export default function WindCompass({ windSpeed, windDirection }: WindCompassProps) {
  const getWindDirection = (degrees: number) => {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    return directions[Math.round(degrees / 22.5) % 16];
  };

  return (
    <div className="backdrop-blur-xl bg-slate-900/90 rounded-3xl p-6 border-2 border-slate-700/50 shadow-2xl aspect-square flex flex-col justify-center">
      <h3 className="text-lg font-bold text-white mb-4 text-center">Wind</h3>
      
      <div className="flex items-center justify-center mb-4">
        <div className="relative w-28 h-28">
          {/* Compass Circle */}
          <div className="absolute inset-0 rounded-full border-4 border-slate-600/50 bg-slate-800/30">
            {/* Direction markers */}
            {['N', 'E', 'S', 'W'].map((dir, index) => (
              <div
                key={dir}
                className="absolute text-white font-bold text-sm"
                style={{
                  top: index === 0 ? '5px' : index === 2 ? 'calc(100% - 20px)' : '50%',
                  left: index === 1 ? 'calc(100% - 15px)' : index === 3 ? '5px' : '50%',
                  transform: index % 2 === 0 ? 'translateX(-50%)' : 'translateY(-50%)'
                }}
              >
                {dir}
              </div>
            ))}
          </div>
          
          {/* Wind Arrow */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{ rotate: windDirection }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <div className="w-1 h-12 bg-gradient-to-t from-blue-500 to-cyan-400 rounded-full relative">
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-b-4 border-transparent border-b-cyan-400" />
            </div>
          </motion.div>
        </div>
      </div>
      
      <div className="text-center mt-4">
        <div className="text-2xl font-bold text-white">{windSpeed} km/h</div>
        <div className="text-slate-300 text-sm">{getWindDirection(windDirection)}</div>
      </div>
    </div>
  );
}