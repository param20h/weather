import { create } from 'zustand';
import { WeatherData, ForecastDay } from '@/types/weather';

interface Location {
  id: string;
  name: string;
  lat: number;
  lon: number;
}

interface WeatherStore {
  currentWeather: WeatherData | null;
  forecast: ForecastDay[];
  hourlyForecast: any[];
  airQuality: any | null;
  alerts: any[];
  favorites: Location[];
  selectedLocation: Location | null;
  isLoading: boolean;
  error: string | null;
  
  setCurrentWeather: (weather: WeatherData) => void;
  setForecast: (forecast: ForecastDay[]) => void;
  setHourlyForecast: (hourly: any[]) => void;
  setAirQuality: (airQuality: any) => void;
  setAlerts: (alerts: any[]) => void;
  addFavorite: (location: Location) => void;
  removeFavorite: (id: string) => void;
  setSelectedLocation: (location: Location) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

const loadFavorites = (): Location[] => {
  if (typeof window === 'undefined') return [];
  try {
    const saved = localStorage.getItem('weather-favorites');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const saveFavorites = (favorites: Location[]) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem('weather-favorites', JSON.stringify(favorites));
  } catch {}
};

export const useWeatherStore = create<WeatherStore>((set, get) => ({
  currentWeather: null,
  forecast: [],
  hourlyForecast: [],
  airQuality: null,
  alerts: [],
  favorites: loadFavorites(),
  selectedLocation: null,
  isLoading: false,
  error: null,
  
  setCurrentWeather: (weather) => set({ currentWeather: weather }),
  setForecast: (forecast) => set({ forecast }),
  setHourlyForecast: (hourlyForecast) => set({ hourlyForecast }),
  setAirQuality: (airQuality) => set({ airQuality }),
  setAlerts: (alerts) => set({ alerts }),
  addFavorite: (location) => set((state) => {
    const newFavorites = [...state.favorites, location];
    saveFavorites(newFavorites);
    return { favorites: newFavorites };
  }),
  removeFavorite: (id) => set((state) => {
    const newFavorites = state.favorites.filter(fav => fav.id !== id);
    saveFavorites(newFavorites);
    return { favorites: newFavorites };
  }),
  setSelectedLocation: (location) => set({ selectedLocation: location }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
}));