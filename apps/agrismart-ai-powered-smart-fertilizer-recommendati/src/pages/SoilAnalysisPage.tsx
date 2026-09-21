import { useState } from "react";
import { FlaskConical, Plus, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { mockSoilRecords, mockFarms } from "@/data/mockData";
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from "recharts";

function getNutrientStatus(value: number, low: number, high: number) {
  if (value < low * 0.7) return { label: "Very Low", color: "text-red-600", bg: "bg-red-100 dark:bg-red-900/30", pct: 20 };
  if (value < low) return { label: "Low", color: "text-red-500", bg: "bg-red-100 dark:bg-red-900/30", pct: 40 };
  if (value <= high) return { label: "Optimal", color: "text-farm-600", bg: "bg-farm-100 dark:bg-farm-900/30", pct: 80 };
  if (value <= high * 1.3) return { label: "High", color: "text-amber-500", bg: "bg-amber-100 dark:bg-amber-900/30", pct: 90 };
  return { label: "Very High", color: "text-red-500", bg: "bg-red-100 dark:bg-red-900/30", pct: 100 };
}

export function SoilAnalysisPage() {
  const [selectedFarm, setSelectedFarm] = useState("f1");
  const farmRecords = mockSoilRecords.filter((r) => r.farmId === selectedFarm).sort((a, b) => a.date.localeCompare(b.date));
  const latest = farmRecords[farmRecords.length - 1] || mockSoilRecords[0];

  const nutrients = [
    { label: "Nitrogen (N)", value: latest.nitrogen, unit: "kg/ha", low: 200, high: 350, max: 500, history: farmRecords.map((r) => ({ date: r.date, value: r.nitrogen })) },
    { label: "Phosphorus (P)", value: latest.phosphorus, unit: "kg/ha", low: 20, high: 40, max: 60, history: farmRecords.map((r) => ({ date: r.date, value: r.phosphorus })) },
    { label: "Potassium (K)", value: latest.potassium, unit: "kg/ha", low: 200, high: 300, max: 400, history: farmRecords.map((r) => ({ date: r.date, value: r.potassium })) },
    { label: "pH", value: latest.pH, unit: "", low: 6.0, high: 7.5, max: 10, history: farmRecords.map((r) => ({ date: r.date, value: r.pH })) },
    { label: "Organic Carbon", value: latest.organicCarbon, unit: "%", low: 0.5, high: 0.8, max: 1.2, history: farmRecords.map((r) => ({ date: r.date, value: r.organicCarbon })) },
    { label: "Moisture", value: latest.moisture, unit: "%", low: 25, high: 40, max: 60, history: farmRecords.map((r) => ({ date: r.date, value: r.moisture })) },
  ];

  const healthScore = Math.round(
    nutrients.reduce((acc, n) => {
      const s = getNutrientStatus(n.value, n.low, n.high);
      return acc + (s.label === "Optimal" ? 17 : s.label.includes("Low") ? 8 : 12);
    }, 0)
  );

  const radarData = nutrients.map((n) => ({
    nutrient: n.label.split(" ")[0],
    value: Math.min(100, (n.value / ((n.low + n.high) / 2)) * 100),
    optimal: 100,
  }));

  const trendData = farmRecords.map((r) => ({
    date: new Date(r.date).toLocaleDateString("en-IN", { month: "short" }),
    Nitrogen: r.nitrogen,
    Phosphorus: r.phosphorus,
    Potassium: r.potassium,
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
            <FlaskConical className="h-7 w-7 text-amber-500" /> Soil Analysis
          </h1>
          <p className="text-muted-foreground mt-1">Monitor soil health and nutrient levels</p>
        </div>
        <div className="flex gap-2">
          <select
            value={selectedFarm}
            onChange={(e) => setSelectedFarm(e.target.value)}
            className="rounded-lg border bg-background px-3 py-2 text-sm"
          >
            {mockFarms.map((f) => <option key={f.id} value={f.id}>{f.farmName}</option>)}
          </select>
          <Button className="bg-farm-600 hover:bg-farm-700 text-white gap-2"><Plus className="h-4 w-4" /> Add Test</Button>
        </div>
      </div>

      {/* Health Score */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="sm:col-span-2 lg:col-span-1">
          <CardContent className="p-6 text-center">
            <p className="text-sm text-muted-foreground mb-2">Soil Health Score</p>
            <div className="relative h-32 w-32 mx-auto">
              <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" fill="none" stroke="var(--border)" strokeWidth="8" />
                <circle cx="50" cy="50" r="42" fill="none" stroke="var(--chart-1)" strokeWidth="8"
                  strokeDasharray={`${healthScore * 2.64} 264`} strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold">{healthScore}</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-2">out of 100</p>
          </CardContent>
        </Card>

        {nutrients.slice(0, 3).map((n) => {
          const status = getNutrientStatus(n.value, n.low, n.high);
          const trend = n.history.length >= 2 ? n.history[n.history.length - 1].value - n.history[n.history.length - 2].value : 0;
          return (
            <Card key={n.label}>
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{n.label}</span>
                  {trend > 0 ? <TrendingUp className="h-4 w-4 text-farm-500" /> : trend < 0 ? <TrendingDown className="h-4 w-4 text-red-500" /> : <Minus className="h-4 w-4 text-muted-foreground" />}
                </div>
                <p className="text-2xl font-bold">{n.value}<span className="text-sm font-normal text-muted-foreground"> {n.unit}</span></p>
                <div className="flex items-center gap-2">
                  <Progress value={Math.min(100, (n.value / n.max) * 100)} className="h-2 flex-1" />
                  <Badge variant="outline" className={`text-[10px] ${status.color} border-0 ${status.bg}`}>{status.label}</Badge>
                </div>
                <p className="text-xs text-muted-foreground">Optimal: {n.low}-{n.high} {n.unit}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Nutrient Table */}
      <Card>
        <CardHeader><CardTitle className="text-lg">Current Soil Parameters</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 font-medium text-muted-foreground">Parameter</th>
                  <th className="text-left py-3 font-medium text-muted-foreground">Current Value</th>
                  <th className="text-left py-3 font-medium text-muted-foreground">Optimal Range</th>
                  <th className="text-left py-3 font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {nutrients.map((n) => {
                  const status = getNutrientStatus(n.value, n.low, n.high);
                  return (
                    <tr key={n.label} className="border-b last:border-0">
                      <td className="py-3 font-medium">{n.label}</td>
                      <td className="py-3">{n.value} {n.unit}</td>
                      <td className="py-3 text-muted-foreground">{n.low} - {n.high} {n.unit}</td>
                      <td className="py-3"><Badge variant="outline" className={`${status.color} ${status.bg} border-0`}>{status.label}</Badge></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Historical Trends */}
        <Card>
          <CardHeader><CardTitle className="text-lg">Historical Nutrient Trends</CardTitle></CardHeader>
          <CardContent>
            <div style={{ height: 280 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData} margin={{ top: 8, right: 8, bottom: 8, left: 8 }}>
                  <CartesianGrid vertical={false} stroke="var(--border)" />
                  <XAxis dataKey="date" tickLine={false} axisLine={false} className="text-xs" />
                  <YAxis tickLine={false} axisLine={false} width={40} className="text-xs" />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="Nitrogen" stroke="var(--chart-1)" strokeWidth={2} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="Phosphorus" stroke="var(--chart-2)" strokeWidth={2} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="Potassium" stroke="var(--chart-3)" strokeWidth={2} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Radar Chart */}
        <Card>
          <CardHeader><CardTitle className="text-lg">Nutrient Profile</CardTitle></CardHeader>
          <CardContent>
            <div style={{ height: 280 }}>
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="var(--border)" />
                  <PolarAngleAxis dataKey="nutrient" className="text-xs" />
                  <PolarRadiusAxis angle={30} domain={[0, 150]} className="text-xs" />
                  <Radar name="Current" dataKey="value" stroke="var(--chart-1)" fill="var(--chart-1)" fillOpacity={0.3} />
                  <Radar name="Optimal" dataKey="optimal" stroke="var(--chart-2)" fill="var(--chart-2)" fillOpacity={0.1} strokeDasharray="3 3" />
                  <Legend />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
