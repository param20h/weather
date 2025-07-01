import { NextRequest, NextResponse } from 'next/server';
import { getCurrentWeather, getForecast } from '@/lib/weather';
import { format } from 'date-fns';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');

  if (!lat || !lon) {
    return NextResponse.json({ error: 'Missing coordinates' }, { status: 400 });
  }

  try {
    const [currentData, forecastData] = await Promise.all([
      getCurrentWeather(Number(lat), Number(lon)),
      getForecast(Number(lat), Number(lon))
    ]);

    const current = {
      location: currentData.name,
      temperature: Math.round(currentData.main.temp),
      condition: currentData.weather[0].main,
      description: currentData.weather[0].description,
      icon: currentData.weather[0].icon,
      humidity: currentData.main.humidity,
      windSpeed: Math.round(currentData.wind.speed * 3.6),
      uvIndex: 0,
      sunrise: currentData.sys.sunrise,
      sunset: currentData.sys.sunset,
    };

    // Group forecast by day and get daily min/max
    const dailyData = forecastData.list.reduce((acc: any, item: any) => {
      const date = format(new Date(item.dt * 1000), 'yyyy-MM-dd');
      if (!acc[date]) {
        acc[date] = {
          date: format(new Date(item.dt * 1000), 'EEE'),
          temps: [],
          condition: item.weather[0].main,
          icon: item.weather[0].icon,
          humidity: item.main.humidity
        };
      }
      acc[date].temps.push(item.main.temp);
      return acc;
    }, {});

    const forecast = Object.values(dailyData)
      .slice(0, 7)
      .map((day: any) => ({
        date: day.date,
        high: Math.round(Math.max(...day.temps)),
        low: Math.round(Math.min(...day.temps)),
        condition: day.condition,
        icon: day.icon,
        humidity: day.humidity,
      }));

    const hourly = forecastData.list
      .slice(0, 24)
      .map((item: any) => ({
        time: item.dt,
        temp: Math.round(item.main.temp),
        icon: item.weather[0].icon,
        description: item.weather[0].description,
        humidity: item.main.humidity,
        windSpeed: Math.round(item.wind.speed * 3.6),
      }));

    return NextResponse.json({ current, forecast, hourly });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch weather data' }, { status: 500 });
  }
}