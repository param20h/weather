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
    <button
      onClick={requestPermission}
      className="fixed top-6 right-20 p-3 backdrop-blur-xl bg-slate-900/80 rounded-full border border-slate-700/50 shadow-lg hover:scale-105 transition-all"
    >
      <BellIcon className="w-6 h-6 text-white" />
    </button>
  );
}