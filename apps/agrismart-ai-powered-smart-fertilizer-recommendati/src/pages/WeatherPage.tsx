import { CloudSun, Droplets, Thermometer, Wind, CloudRain, Sun, Cloud, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockWeather } from "@/data/mockData";
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line
} from "recharts";

const conditionIcons: Record<string, typeof Sun> = {
  Sunny: Sun, "Partly Cloudy": CloudSun, Cloudy: Cloud, "Light Rain": CloudRain, Rain: CloudRain,
};

export function WeatherPage() {
  const weather = mockWeather;
  const forecast = weather.forecast || [];

  const rainfallData = forecast.map((d) => ({
    day: d.day,
    rain: d.rainProbability,
    humidity: d.humidity,
  }));

  const tempData = forecast.map((d) => ({
    day: d.day,
    high: d.tempHigh,
    low: d.tempLow,
  }));

  const advisories = forecast.flatMap((d) => {
    const msgs: string[] = [];
    if (d.rainProbability >= 70) msgs.push(`${d.day}: Heavy rain expected (${d.rainProbability}%) — avoid fertilizer application before rainfall.`);
    else if (d.rainProbability >= 40) msgs.push(`${d.day}: Moderate rain likely (${d.rainProbability}%) — good timing for fertilizer if applied before rain.`);
    if (d.tempHigh > 35) msgs.push(`${d.day}: High temperature (${d.tempHigh}°C) — apply fertilizer during cooler hours.`);
    return msgs;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
          <CloudSun className="h-7 w-7 text-blue-500" /> Weather
        </h1>
        <p className="text-muted-foreground mt-1">{weather.location} — {new Date(weather.date).toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" })}</p>
      </div>

      {/* Current Weather */}
      <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
        <CardContent className="p-6 md:p-8">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div>
              <p className="text-blue-100 text-sm">Current Conditions</p>
              <p className="text-5xl md:text-6xl font-bold mt-2">{weather.temperature}°C</p>
              <p className="text-lg text-blue-100 mt-1">{weather.condition}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur">
                <Droplets className="h-5 w-5 mb-2 text-blue-200" />
                <p className="text-2xl font-bold">{weather.humidity}%</p>
                <p className="text-xs text-blue-200">Humidity</p>
              </div>
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur">
                <CloudRain className="h-5 w-5 mb-2 text-blue-200" />
                <p className="text-2xl font-bold">{weather.rainfall}mm</p>
                <p className="text-xs text-blue-200">Rainfall</p>
              </div>
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur">
                <Wind className="h-5 w-5 mb-2 text-blue-200" />
                <p className="text-2xl font-bold">{weather.windSpeed}</p>
                <p className="text-xs text-blue-200">km/h wind</p>
              </div>
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur">
                <Thermometer className="h-5 w-5 mb-2 text-blue-200" />
                <p className="text-2xl font-bold">{weather.rainProbability}%</p>
                <p className="text-xs text-blue-200">Rain chance</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 7-Day Forecast */}
      <Card>
        <CardHeader><CardTitle className="text-lg">7-Day Forecast</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2">
            {forecast.map((d) => {
              const Icon = conditionIcons[d.condition] || CloudSun;
              return (
                <div key={d.date} className="text-center p-3 rounded-xl hover:bg-muted/50 transition-colors">
                  <p className="text-xs font-medium text-muted-foreground mb-2">{d.day}</p>
                  <Icon className="h-6 w-6 mx-auto mb-2 text-amber-500" />
                  <p className="text-sm font-bold">{d.tempHigh}°</p>
                  <p className="text-xs text-muted-foreground">{d.tempLow}°</p>
                  <div className="mt-2 flex items-center justify-center gap-1">
                    <Droplets className="h-3 w-3 text-blue-400" />
                    <span className="text-[10px] text-muted-foreground">{d.rainProbability}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Rainfall Chart */}
        <Card>
          <CardHeader><CardTitle className="text-lg">Rain Probability & Humidity</CardTitle></CardHeader>
          <CardContent>
            <div style={{ height: 250 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={rainfallData} margin={{ top: 8, right: 8, bottom: 8, left: 8 }}>
                  <CartesianGrid vertical={false} stroke="var(--border)" />
                  <XAxis dataKey="day" tickLine={false} axisLine={false} className="text-xs" />
                  <YAxis tickLine={false} axisLine={false} width={35} className="text-xs" />
                  <Tooltip />
                  <Bar dataKey="rain" name="Rain %" fill="var(--chart-1)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="humidity" name="Humidity %" fill="var(--chart-3)" radius={[4, 4, 0, 0]} opacity={0.5} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Temperature Chart */}
        <Card>
          <CardHeader><CardTitle className="text-lg">Temperature Forecast</CardTitle></CardHeader>
          <CardContent>
            <div style={{ height: 250 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={tempData} margin={{ top: 8, right: 8, bottom: 8, left: 8 }}>
                  <CartesianGrid vertical={false} stroke="var(--border)" />
                  <XAxis dataKey="day" tickLine={false} axisLine={false} className="text-xs" />
                  <YAxis tickLine={false} axisLine={false} width={35} className="text-xs" />
                  <Tooltip />
                  <Line type="monotone" dataKey="high" name="High °C" stroke="var(--chart-5)" strokeWidth={2} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="low" name="Low °C" stroke="var(--chart-1)" strokeWidth={2} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weather Advisory */}
      <Card className="border-amber-200 dark:border-amber-800">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" /> Fertilizer Application Weather Advisory
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {advisories.length > 0 ? advisories.map((a, i) => (
            <div key={i} className="flex items-start gap-2 p-3 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800">
              <span className="h-2 w-2 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
              <span className="text-sm text-amber-700 dark:text-amber-300">{a}</span>
            </div>
          )) : (
            <div className="p-3 rounded-lg bg-farm-50 dark:bg-farm-950/20 border border-farm-200 dark:border-farm-800">
              <p className="text-sm text-farm-700 dark:text-farm-400">✓ Weather conditions are favorable for fertilizer application this week.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
