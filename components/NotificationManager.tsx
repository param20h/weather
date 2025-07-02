'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { BellIcon } from '@heroicons/react/24/outline';

export default function NotificationManager() {
  const [permission, setPermission] = useState<NotificationPermission>('default');

  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      setPermission(Notification.permission);
    }
  }, []);

  const requestPermission = async () => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      const result = await Notification.requestPermission();
      setPermission(result);
      if (result === 'granted') {
        toast.success('Notifications enabled!');
        scheduleWeatherAlerts();
      }
    }
  };

  const scheduleWeatherAlerts = () => {
    if (typeof window === 'undefined') return;
    
    // Check for rain in 30 minutes
    setTimeout(() => {
      new Notification('Weather Alert', {
        body: 'Rain expected in 30 minutes. Take an umbrella!',
        icon: '/icon-192x192.png',
        badge: '/icon-192x192.png'
      });
    }, 1800000); // 30 minutes

    // UV warning at noon
    const now = new Date();
    const noon = new Date(now);
    noon.setHours(12, 0, 0, 0);
    
    if (noon > now) {
      setTimeout(() => {
        new Notification('UV Warning', {
          body: 'High UV levels detected. Apply sunscreen!',
          icon: '/icon-192x192.png'
        });
      }, noon.getTime() - now.getTime());
    }
  };

  if (permission === 'granted') return null;

  return (
    <div className="fixed top-6 right-20 group z-50">
      <button
        onClick={requestPermission}
        className="p-3 backdrop-blur-xl bg-slate-900/80 rounded-full border border-slate-700/50 shadow-lg hover:scale-105 hover:bg-slate-800/90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-200 relative cursor-pointer"
        title="Enable weather notifications"
        aria-label="Enable weather notifications"
        tabIndex={0}
      >
        <BellIcon className="w-6 h-6 text-white group-hover:text-blue-400 group-focus:text-blue-400 transition-colors" />
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
      </button>
      <div className="absolute top-full mt-2 right-0 bg-slate-800/95 backdrop-blur-sm text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        Enable notifications
      </div>
    </div>
  );
}