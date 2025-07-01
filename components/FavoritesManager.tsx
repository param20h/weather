'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeartIcon, MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { useWeatherStore } from '@/store/weatherStore';

interface Location {
  id: string;
  name: string;
  lat: number;
  lon: number;
  temp?: number;
  condition?: string;
}

export default function FavoritesManager() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Location[]>([]);
  const { favorites, addFavorite, removeFavorite, setSelectedLocation } = useWeatherStore();

  const searchLocations = async (query: string) => {
    if (query.length < 3) {
      setSearchResults([]);
      return;
    }

    try {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`
      );
      const data = await response.json();
      
      const locations = data.map((item: any) => ({
        id: `${item.lat}-${item.lon}`,
        name: `${item.name}, ${item.country}`,
        lat: item.lat,
        lon: item.lon,
      }));
      
      setSearchResults(locations);
    } catch (error) {
      console.error('Search failed:', error);
    }
  };

  const handleAddFavorite = (location: Location) => {
    addFavorite(location);
    setSearchQuery('');
    setSearchResults([]);
  };

  const handleSelectLocation = (location: Location) => {
    setSelectedLocation(location);
    setIsOpen(false);
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed top-6 left-6 p-3 backdrop-blur-md bg-white/20 dark:bg-black/20 rounded-full border border-white/30 shadow-lg"
      >
        <HeartIcon className="w-6 h-6 text-white" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="backdrop-blur-md bg-white/20 dark:bg-black/20 rounded-3xl p-6 border border-white/30 w-full max-w-md max-h-[80vh] overflow-hidden"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-light text-white">Favorite Locations</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <XMarkIcon className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Search */}
              <div className="relative mb-6">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                <input
                  type="text"
                  placeholder="Search locations..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    searchLocations(e.target.value);
                  }}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                />
              </div>

              {/* Search Results */}
              {searchResults.length > 0 && (
                <div className="mb-6 space-y-2 max-h-40 overflow-y-auto">
                  {searchResults.map((location) => (
                    <div
                      key={location.id}
                      className="flex items-center justify-between p-3 bg-white/5 rounded-xl"
                    >
                      <span className="text-white text-sm">{location.name}</span>
                      <button
                        onClick={() => handleAddFavorite(location)}
                        className="p-1 hover:bg-white/10 rounded-full transition-colors"
                      >
                        <HeartIcon className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Favorites List */}
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {favorites.map((location) => (
                  <motion.div
                    key={location.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center justify-between p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
                    onClick={() => handleSelectLocation(location)}
                  >
                    <span className="text-white">{location.name}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFavorite(location.id);
                      }}
                      className="p-1 hover:bg-white/10 rounded-full transition-colors"
                    >
                      <HeartSolidIcon className="w-4 h-4 text-red-400" />
                    </button>
                  </motion.div>
                ))}
              </div>

              {favorites.length === 0 && (
                <div className="text-center text-white/50 py-8">
                  <HeartIcon className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p>No favorite locations yet</p>
                  <p className="text-sm">Search and add locations above</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}