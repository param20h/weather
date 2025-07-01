export interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  uvIndex: number;
  sunrise: number;
  sunset: number;
}

export interface ForecastDay {
  date: string;
  high: number;
  low: number;
  condition: string;
  icon: string;
  humidity: number;
}

export interface WeatherResponse {
  current: WeatherData;
  forecast: ForecastDay[];
}