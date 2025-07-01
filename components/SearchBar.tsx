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
          className="backdrop-blur-xl bg-slate-900/90 rounded-2xl border-2 border-slate-700/50 shadow-2xl"
        >
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
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
              className="w-full pl-12 pr-4 py-4 bg-transparent text-white placeholder-slate-400 focus:outline-none font-medium"
            />
          </div>
        </motion.div>

        <AnimatePresence>
          {isOpen && results.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full mt-2 w-full backdrop-blur-xl bg-slate-900/90 rounded-2xl border-2 border-slate-700/50 shadow-2xl overflow-hidden"
            >
              {results.map((location, index) => (
                <motion.button
                  key={location.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleSelect(location)}
                  className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-slate-800/60 transition-colors border-b border-slate-700/30 last:border-b-0"
                >
                  <MapPinIcon className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  <span className="text-white font-medium">{location.name}</span>
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