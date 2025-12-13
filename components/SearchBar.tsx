'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MagnifyingGlassIcon, MapPinIcon } from '@heroicons/react/24/outline';

interface Location {
  id: string;
  name: string;
  lat: number;
  lon: number;
}

interface SearchBarProps {
  onLocationSelect: (lat: number, lon: number) => void;
}

export default function SearchBar({ onLocationSelect }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Location[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const searchLocations = async (searchQuery: string) => {
    if (searchQuery.length < 3) {
      setResults([]);
      return;
    }

    try {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${searchQuery}&limit=5&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`
      );
      const data = await response.json();
      
      const locations = data.map((item: any) => ({
        id: `${item.lat}-${item.lon}`,
        name: `${item.name}, ${item.country}`,
        lat: item.lat,
        lon: item.lon,
      }));
      
      setResults(locations);
    } catch (error) {
      console.error('Search failed:', error);
    }
  };

  const handleSelect = (location: Location) => {
    onLocationSelect(location.lat, location.lon);
    setQuery(location.name);
    setResults([]);
    setIsOpen(false);
  };

  return (
    <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4">
      <div className="relative">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.02 }}
          className="backdrop-blur-2xl bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 dark:from-white/95 dark:via-white/90 dark:to-white/95 rounded-2xl border border-slate-700/50 dark:border-slate-300/50 shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] hover:shadow-[0_8px_48px_0_rgba(59,130,246,0.2)] dark:hover:shadow-[0_8px_48px_0_rgba(59,130,246,0.15)] transition-all duration-300"
        >
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-5 top-1/2 transform -translate-y-1/2 w-6 h-6 text-blue-400 dark:text-blue-600" />
            <input
              type="text"
              placeholder="Search locations..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                searchLocations(e.target.value);
                setIsOpen(true);
              }}
              onFocus={() => setIsOpen(true)}
              className="w-full pl-14 pr-5 py-5 bg-transparent text-white dark:text-slate-900 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none font-semibold text-lg tracking-wide"
            />
          </div>
        </motion.div>

        <AnimatePresence>
          {isOpen && results.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="absolute top-full mt-3 w-full backdrop-blur-2xl bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 dark:from-white/95 dark:via-white/90 dark:to-white/95 rounded-2xl border border-slate-700/50 dark:border-slate-300/50 shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] overflow-hidden"
            >
              {results.map((location, index) => (
                <motion.button
                  key={location.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, type: "spring" }}
                  whileHover={{ scale: 1.02, x: 4 }}
                  onClick={() => handleSelect(location)}
                  className="w-full flex items-center space-x-4 px-5 py-4 text-left hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-cyan-500/20 dark:hover:from-blue-400/20 dark:hover:to-cyan-400/20 transition-all duration-300 border-b border-slate-700/30 dark:border-slate-300/30 last:border-b-0 group"
                >
                  <MapPinIcon className="w-5 h-5 text-blue-400 dark:text-blue-600 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-white dark:text-slate-900 font-semibold tracking-wide group-hover:text-blue-300 dark:group-hover:text-blue-700 transition-colors">{location.name}</span>
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Click outside to close */}
      {isOpen && (
        <div
          className="fixed inset-0 -z-10"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}