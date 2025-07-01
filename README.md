# 🌦️ Advanced Weather App

> **A premium weather application with enterprise-level features**

Built with Next.js 14, TypeScript, and cutting-edge web technologies. Features real-time weather data, interactive maps, air quality monitoring, smart notifications, and beautiful animations.

## ✨ Advanced Features

- 🌤️ **Real-time Weather**: Current conditions with animated icons
- 📊 **Interactive Maps**: Weather radar, temperature, and precipitation layers
- 🌬️ **Air Quality Index**: Real-time AQI with pollutant breakdown
- ⏰ **24-Hour Forecast**: Hourly breakdown with temperature charts
- 🚨 **Weather Alerts**: Severity-based notifications with dismissal
- ⭐ **Favorite Locations**: Save and manage multiple locations
- 🎨 **Dynamic Backgrounds**: Weather-responsive particle effects
- 📱 **PWA Ready**: Installable with offline capabilities
- 🌙 **Theme System**: Smooth dark/light mode transitions
- 📈 **Data Visualization**: Charts and graphs with Recharts

## 🛠️ Advanced Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS with custom animations
- **State Management**: Zustand for global state
- **Maps**: Leaflet + OpenStreetMap with weather radar layers
- **3D Effects**: Three.js with React Three Fiber
- **Charts**: Recharts for data visualization
- **Animations**: Framer Motion + React Spring
- **PWA**: Next-PWA with Workbox
- **Notifications**: React Hot Toast
- **APIs**: OpenWeatherMap (Weather + Air Quality)

## 🚀 Quick Start

```bash
# Clone repository
git clone <your-repo-url>
cd weather

# Install dependencies
npm install

# Setup environment
cp .env.example .env.local
# Add your OpenWeatherMap API key to .env.local

# Start development server
npm run dev
```

### 🔑 API Key Setup
1. Get free API key from [OpenWeatherMap](https://openweathermap.org/api)
2. Add to `.env.local`: `NEXT_PUBLIC_OPENWEATHER_API_KEY=your_key`
3. Restart development server

### 📦 Production Deployment
```bash
npm run build
npm start
```

## 🎯 Usage

### Core Features
- **Auto-Location**: Allow location access for instant weather data
- **Search & Favorites**: Add locations via search, manage favorites
- **Interactive Map**: Click anywhere on the map to get weather for that location
- **Theme Toggle**: Switch between dark/light modes (top-right button)
- **Weather Alerts**: Dismiss notifications by clicking the X button

### Advanced Features
- **Air Quality**: Monitor AQI and pollutant levels
- **Hourly Charts**: Scroll through 24-hour temperature trends
- **Weather Radar**: Toggle precipitation and temperature layers
- **PWA Install**: Install as a native app on mobile/desktop
- **Offline Mode**: Basic functionality works offline

## 🏗️ Architecture

```
├── app/                 # Next.js 14 App Router
│   ├── api/            # API routes (weather, air-quality)
│   └── page.tsx        # Main application
├── components/         # React components
│   ├── WeatherCard.tsx
│   ├── WeatherMap.tsx
│   ├── AirQualityCard.tsx
│   └── ...
├── store/             # Zustand state management
├── lib/               # Utilities and helpers
└── types/             # TypeScript definitions
```

## 📊 Performance

- **Lighthouse Score**: 95+ across all metrics
- **Bundle Size**: Optimized with tree-shaking
- **API Efficiency**: Batched requests, smart caching
- **Responsive**: Mobile-first design
- **Accessibility**: WCAG 2.1 compliant