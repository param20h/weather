import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');

  if (!lat || !lon) {
    return NextResponse.json({ error: 'Missing coordinates' }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`
    );
    
    const data = await response.json();
    
    const airQuality = {
      aqi: data.list[0].main.aqi * 50,
      co: data.list[0].components.co,
      no2: data.list[0].components.no2,
      o3: data.list[0].components.o3,
      pm2_5: data.list[0].components.pm2_5,
      pm10: data.list[0].components.pm10,
    };

    return NextResponse.json(airQuality);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch air quality data' }, { status: 500 });
  }
}