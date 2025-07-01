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
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            className={`backdrop-blur-md rounded-2xl p-4 border ${getSeverityColor(alert.severity)}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <ExclamationTriangleIcon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium mb-1">{alert.title}</h4>
                  <p className="text-sm opacity-80 leading-relaxed">{alert.description}</p>
                  <div className="text-xs opacity-60 mt-2">
                    {new Date(alert.start * 1000).toLocaleDateString()} - {new Date(alert.end * 1000).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <button
                onClick={() => dismissAlert(alert.id)}
                className="p-1 hover:bg-white/10 rounded-full transition-colors"
              >
                <XMarkIcon className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}