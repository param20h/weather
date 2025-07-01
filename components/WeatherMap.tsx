'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface WeatherMapProps {
  lat: number;
  lon: number;
  onLocationSelect?: (lat: number, lon: number) => void;
}

function MapClickHandler({ onLocationSelect }: { onLocationSelect?: (lat: number, lon: number) => void }) {
  useMapEvents({
    click: (e) => {
      if (onLocationSelect) {
        onLocationSelect(e.latlng.lat, e.latlng.lng);
      }
    },
  });
  return null;
}

export default function WeatherMap({ lat, lon, onLocationSelect }: WeatherMapProps) {
  return (
    <div className="backdrop-blur-xl bg-gradient-to-br from-slate-900/90 to-slate-800/90 dark:from-slate-900/95 dark:to-black/90 rounded-3xl overflow-hidden border-2 border-slate-700/50 dark:border-slate-600/30 shadow-2xl">
      <div className="p-6 border-b border-slate-700/50 dark:border-slate-600/30 bg-gradient-to-r from-slate-800/80 to-slate-700/80 dark:from-slate-900/80 dark:to-black/80">
        <h3 className="text-xl font-bold text-white">Interactive Weather Map</h3>
        <p className="text-slate-300 text-sm mt-1">Click anywhere to get weather data</p>
      </div>
      <div className="h-80 w-full relative">
        <MapContainer
          center={[lat, lon]}
          zoom={10}
          style={{ height: '100%', width: '100%' }}
          className="z-0"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; OpenStreetMap'
          />
          
          <TileLayer
            url={`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`}
            opacity={0.6}
          />
          
          <TileLayer
            url={`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`}
            opacity={0.4}
          />
          
          <Marker position={[lat, lon]}>
            <Popup>
              <div className="text-center">
                <p className="font-semibold">Current Location</p>
                <p className="text-sm text-gray-600">Lat: {lat.toFixed(4)}</p>
                <p className="text-sm text-gray-600">Lon: {lon.toFixed(4)}</p>
              </div>
            </Popup>
          </Marker>
          
          <MapClickHandler onLocationSelect={onLocationSelect} />
        </MapContainer>
      </div>
    </div>
  );
}