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
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05, y: -4 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="backdrop-blur-2xl bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 dark:from-white/95 dark:via-white/90 dark:to-white/95 rounded-3xl p-6 border border-slate-700/50 dark:border-slate-300/50 shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] hover:shadow-[0_8px_48px_0_rgba(59,130,246,0.3)] dark:hover:shadow-[0_8px_48px_0_rgba(59,130,246,0.2)] aspect-square flex flex-col justify-center transition-all duration-500 group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-cyan-500/5 to-transparent dark:from-blue-400/10 dark:via-cyan-400/10 dark:to-transparent opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-500" />
      
      <h3 className="text-xl font-bold bg-gradient-to-r from-white to-blue-100 dark:from-slate-900 dark:to-blue-900 bg-clip-text text-transparent mb-6 text-center relative z-10">Wind</h3>
      
      <div className="flex items-center justify-center mb-6 relative z-10">
        <div className="relative w-32 h-32">
          {/* Compass Circle */}
          <div className="absolute inset-0 rounded-full border-4 border-slate-600/60 bg-gradient-to-br from-slate-800/50 to-slate-900/50 shadow-inner backdrop-blur-sm">
            {/* Direction markers */}
            {['N', 'E', 'S', 'W'].map((dir, index) => (
              <div
                key={dir}
                className="absolute text-white font-bold text-base drop-shadow-lg"
                style={{
                  top: index === 0 ? '8px' : index === 2 ? 'calc(100% - 24px)' : '50%',
                  left: index === 1 ? 'calc(100% - 18px)' : index === 3 ? '8px' : '50%',
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
            transition={{ type: "spring", stiffness: 150, damping: 15 }}
          >
            <div className="w-1.5 h-14 bg-gradient-to-t from-blue-500 via-cyan-400 to-cyan-300 rounded-full relative shadow-[0_0_15px_rgba(34,211,238,0.6)]">
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-b-[8px] border-transparent border-b-cyan-300 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
            </div>
          </motion.div>
        </div>
      </div>
      
      <div className="text-center mt-4 relative z-10">
        <div className="text-3xl font-black bg-gradient-to-r from-white via-blue-100 to-cyan-200 dark:from-slate-900 dark:via-blue-900 dark:to-cyan-900 bg-clip-text text-transparent mb-1">{windSpeed} km/h</div>
        <div className="text-slate-300 dark:text-slate-600 text-base font-semibold">{getWindDirection(windDirection)}</div>
      </div>
    </motion.div>
  );
}