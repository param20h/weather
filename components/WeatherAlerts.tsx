'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ExclamationTriangleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

interface WeatherAlert {
  id: string;
  title: string;
  description: string;
  severity: 'minor' | 'moderate' | 'severe' | 'extreme';
  start: number;
  end: number;
}

interface WeatherAlertsProps {
  alerts: WeatherAlert[];
}

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'minor': return 'border-yellow-400 bg-yellow-400/10 text-yellow-400';
    case 'moderate': return 'border-orange-400 bg-orange-400/10 text-orange-400';
    case 'severe': return 'border-red-400 bg-red-400/10 text-red-400';
    case 'extreme': return 'border-purple-400 bg-purple-400/10 text-purple-400';
    default: return 'border-blue-400 bg-blue-400/10 text-blue-400';
  }
};

export default function WeatherAlerts({ alerts }: WeatherAlertsProps) {
  const [dismissedAlerts, setDismissedAlerts] = useState<string[]>([]);

  const visibleAlerts = alerts.filter(alert => !dismissedAlerts.includes(alert.id));

  const dismissAlert = (id: string) => {
    setDismissedAlerts(prev => [...prev, id]);
  };

  if (visibleAlerts.length === 0) return null;

  return (
    <div className="space-y-3">
      <AnimatePresence>
        {visibleAlerts.map((alert) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, height: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, height: 'auto', y: 0, scale: 1 }}
            exit={{ opacity: 0, height: 0, y: -20, scale: 0.95 }}
            whileHover={{ scale: 1.01, y: -2 }}
            transition={{ type: "spring", stiffness: 200 }}
            className={`backdrop-blur-2xl rounded-2xl p-5 border-2 ${getSeverityColor(alert.severity)} shadow-[0_4px_24px_0_rgba(0,0,0,0.3)] hover:shadow-[0_4px_32px_0_rgba(0,0,0,0.4)] transition-all duration-300`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <ExclamationTriangleIcon className="w-6 h-6 mt-0.5 flex-shrink-0 drop-shadow-lg" />
                </motion.div>
                <div>
                  <h4 className="font-bold text-lg mb-2">{alert.title}</h4>
                  <p className="text-sm opacity-90 leading-relaxed font-medium">{alert.description}</p>
                  <div className="text-xs opacity-70 mt-3 font-semibold">
                    {new Date(alert.start * 1000).toLocaleDateString()} - {new Date(alert.end * 1000).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <motion.button
                onClick={() => dismissAlert(alert.id)}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="p-1.5 hover:bg-white/20 rounded-full transition-colors"
              >
                <XMarkIcon className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}