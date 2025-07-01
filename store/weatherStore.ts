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

export const useWeatherStore = create<WeatherStore>((set) => ({
  currentWeather: null,
  forecast: [],
  hourlyForecast: [],
  airQuality: null,
  alerts: [],
  favorites: [],
  selectedLocation: null,
  isLoading: false,
  error: null,
  
  setCurrentWeather: (weather) => set({ currentWeather: weather }),
  setForecast: (forecast) => set({ forecast }),
  setHourlyForecast: (hourlyForecast) => set({ hourlyForecast }),
  setAirQuality: (airQuality) => set({ airQuality }),
  setAlerts: (alerts) => set({ alerts }),
  addFavorite: (location) => set((state) => ({ 
    favorites: [...state.favorites, location] 
  })),
  removeFavorite: (id) => set((state) => ({ 
    favorites: state.favorites.filter(fav => fav.id !== id) 
  })),
  setSelectedLocation: (location) => set({ selectedLocation: location }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
}));