const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export async function getCurrentWeather(lat: number, lon: number) {
  const response = await fetch(
    `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  );
  return response.json();
}

export async function getForecast(lat: number, lon: number) {
  const response = await fetch(
    `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  );
  return response.json();
}

export function getWeatherBackground(condition: string): string {
  const backgrounds = {
    clear: 'from-blue-400 via-blue-500 to-blue-600',
    clouds: 'from-gray-400 via-gray-500 to-gray-600',
    rain: 'from-gray-600 via-gray-700 to-gray-800',
    snow: 'from-blue-200 via-blue-300 to-blue-400',
    thunderstorm: 'from-gray-800 via-gray-900 to-black',
    default: 'from-blue-400 via-blue-500 to-blue-600'
  };
  
  return backgrounds[condition.toLowerCase() as keyof typeof backgrounds] || backgrounds.default;
}