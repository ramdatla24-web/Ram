# AgriSmart — AI-Powered Smart Fertilizer Recommendation System

A modern, responsive full-stack web application for intelligent fertilizer recommendations.

## Features

- 🌱 **AI Fertilizer Recommendations** — Multi-step form with intelligent analysis
- 📊 **Soil Analysis** — Health scores, nutrient tracking, historical trends
- 🌾 **Crop Management** — Track crops, growth stages, and farming activities
- 🌤️ **Weather Integration** — 7-day forecasts with fertilizer advisories
- 📈 **Analytics Dashboard** — Interactive charts for usage, trends, and productivity
- 🎨 **Modern UI** — Clean, responsive design with dark mode support
- 🔐 **Authentication** — Login/register with demo mode

## Tech Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS
- Recharts
- Lucide Icons
- React Router
- Sonner (Toast notifications)

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Demo Credentials

**Farmer Account:**
- Email: `rajesh@demo.com`
- Password: `demo123`

**Admin Account:**
- Email: `admin@agrismart.com`
- Password: `admin123`

## Project Structure

```
src/
├── components/
│   ├── layouts/          # Landing and Dashboard layouts
│   └── ui/               # Reusable UI components (shadcn/ui)
├── contexts/             # Auth context
├── data/                 # Mock data
├── lib/                  # Utilities and recommendation engine
├── pages/                # All page components
└── types/                # TypeScript type definitions
```

## Pages

- `/` — Landing page
- `/login` — Login
- `/register` — Register
- `/dashboard` — Farmer dashboard
- `/farms` — Farm management
- `/soil-analysis` — Soil health analysis
- `/crops` — Crop management
- `/recommendation` — AI fertilizer recommendation
- `/weather` — Weather and advisories
- `/fertilizers` — Fertilizer database
- `/history` — Recommendation history
- `/analytics` — Analytics dashboard
- `/admin/dashboard` — Admin dashboard
- `/settings` — User settings

## AI Recommendation Engine

The recommendation engine analyzes:
- Soil nutrients (N, P, K, pH, organic carbon, moisture)
- Crop type and growth stage
- Weather conditions
- Farm characteristics

It provides:
- Recommended fertilizer type
- Application quantity
- Application schedule
- Detailed reasoning
- Precautions and timing guidance

## License

MIT
