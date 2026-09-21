import { Link } from "react-router-dom";
import {
  Sprout, FlaskConical, CloudSun, Leaf, TrendingUp,
  ArrowRight, Droplets, Thermometer, Wind, MapPin
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/contexts/AuthContext";
import { mockFarms, mockCrops, mockSoilRecords, mockWeather, mockRecommendations, cropGrowthData } from "@/data/mockData";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

function getNutrientStatus(value: number, low: number, high: number) {
  if (value < low) return { label: "Low", color: "text-red-500", bg: "bg-red-100 dark:bg-red-900/30" };
  if (value <= high) return { label: "Optimal", color: "text-farm-600", bg: "bg-farm-100 dark:bg-farm-900/30" };
  return { label: "High", color: "text-amber-500", bg: "bg-amber-100 dark:bg-amber-900/30" };
}

export function DashboardPage() {
  const { user } = useAuth();
  const userFarms = mockFarms.filter((f) => f.userId === user?.id || user?.role === "admin");
  const userCrops = mockCrops.filter((c) => userFarms.some((f) => f.id === c.farmId));
  const latestSoil = mockSoilRecords[0];
  const latestRec = mockRecommendations[0];
  const weather = mockWeather;

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  const soilHealthScore = Math.round(
    ((latestSoil.nitrogen >= 200 && latestSoil.nitrogen <= 350 ? 25 : 15) +
      (latestSoil.phosphorus >= 20 && latestSoil.phosphorus <= 40 ? 25 : 15) +
      (latestSoil.potassium >= 200 && latestSoil.potassium <= 300 ? 25 : 15) +
      (latestSoil.pH >= 6.0 && latestSoil.pH <= 7.5 ? 25 : 15))
  );

  const nutrients = [
    { label: "Nitrogen (N)", value: latestSoil.nitrogen, unit: "kg/ha", low: 200, high: 350, max: 500 },
    { label: "Phosphorus (P)", value: latestSoil.phosphorus, unit: "kg/ha", low: 20, high: 40, max: 60 },
    { label: "Potassium (K)", value: latestSoil.potassium, unit: "kg/ha", low: 200, high: 300, max: 400 },
    { label: "pH", value: latestSoil.pH, unit: "", low: 6.0, high: 7.5, max: 10 },
    { label: "Organic Carbon", value: latestSoil.organicCarbon, unit: "%", low: 0.5, high: 0.8, max: 1.2 },
    { label: "Moisture", value: latestSoil.moisture, unit: "%", low: 25, high: 40, max: 60 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">{greeting}, {user?.name?.split(" ")[0]} 👋</h1>
        <p className="text-muted-foreground mt-1">Here's an overview of your farm operations</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-farm-100 dark:bg-farm-900/30">
              <Sprout className="h-6 w-6 text-farm-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{userFarms.length}</p>
              <p className="text-xs text-muted-foreground">Total Farms</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-900/30">
              <Leaf className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{userCrops.length}</p>
              <p className="text-xs text-muted-foreground">Active Crops</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 dark:bg-amber-900/30">
              <FlaskConical className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{soilHealthScore}<span className="text-sm font-normal text-muted-foreground">/100</span></p>
              <p className="text-xs text-muted-foreground">Soil Health</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 dark:bg-purple-900/30">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{latestRec?.fertilizerName?.split(" ")[0] || "NPK"}</p>
              <p className="text-xs text-muted-foreground">Latest Rec.</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Farm Overview */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg">Farm Overview</CardTitle>
            <Link to="/farms"><Button variant="ghost" size="sm" className="gap-1">View All <ArrowRight className="h-3.5 w-3.5" /></Button></Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {userFarms.slice(0, 3).map((farm) => {
                const farmCrop = userCrops.find((c) => c.farmId === farm.id);
                return (
                  <div key={farm.id} className="flex items-center gap-4 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-farm-100 dark:bg-farm-900/30">
                      <Sprout className="h-5 w-5 text-farm-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{farm.farmName}</p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{farm.location}</span>
                        <span>{farm.area} ha</span>
                        <span>{farm.soilType}</span>
                      </div>
                    </div>
                    {farmCrop && (
                      <div className="text-right hidden sm:block">
                        <Badge variant="secondary" className="mb-1">{farmCrop.cropName}</Badge>
                        <p className="text-xs text-muted-foreground">{farmCrop.growthStage}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Weather Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <CloudSun className="h-5 w-5 text-blue-500" /> Weather
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center py-2">
              <p className="text-4xl font-bold">{weather.temperature}°C</p>
              <p className="text-sm text-muted-foreground mt-1">{weather.condition}</p>
              <p className="text-xs text-muted-foreground">{weather.location}</p>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="text-center p-2 rounded-lg bg-muted/50">
                <Droplets className="h-4 w-4 mx-auto text-blue-500 mb-1" />
                <p className="text-sm font-semibold">{weather.humidity}%</p>
                <p className="text-[10px] text-muted-foreground">Humidity</p>
              </div>
              <div className="text-center p-2 rounded-lg bg-muted/50">
                <Thermometer className="h-4 w-4 mx-auto text-red-500 mb-1" />
                <p className="text-sm font-semibold">{weather.rainfall}mm</p>
                <p className="text-[10px] text-muted-foreground">Rainfall</p>
              </div>
              <div className="text-center p-2 rounded-lg bg-muted/50">
                <Wind className="h-4 w-4 mx-auto text-sky-500 mb-1" />
                <p className="text-sm font-semibold">{weather.windSpeed}</p>
                <p className="text-[10px] text-muted-foreground">km/h</p>
              </div>
            </div>
            <Link to="/weather">
              <Button variant="outline" size="sm" className="w-full gap-1">View Forecast <ArrowRight className="h-3.5 w-3.5" /></Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Soil Health Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <FlaskConical className="h-5 w-5 text-amber-500" /> Soil Health
            </CardTitle>
            <Link to="/soil-analysis"><Button variant="ghost" size="sm">Details</Button></Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {nutrients.map((n) => {
              const status = getNutrientStatus(n.value, n.low, n.high);
              const pct = Math.min(100, (n.value / n.max) * 100);
              return (
                <div key={n.label} className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{n.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{n.value}{n.unit ? ` ${n.unit}` : ""}</span>
                      <Badge variant="outline" className={`text-[10px] ${status.color} ${status.bg} border-0`}>{status.label}</Badge>
                    </div>
                  </div>
                  <Progress value={pct} className="h-2" />
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Latest Recommendation */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Leaf className="h-5 w-5 text-farm-600" /> Latest Recommendation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-xl bg-farm-50 dark:bg-farm-950/30 border border-farm-200 dark:border-farm-800">
              <div className="flex items-center justify-between mb-3">
                <Badge className="bg-farm-600 text-white">Recommended</Badge>
                <span className="text-xs text-muted-foreground">{latestRec?.createdAt}</span>
              </div>
              <h3 className="text-xl font-bold text-farm-700 dark:text-farm-400">{latestRec?.fertilizerName}</h3>
              <p className="text-sm text-muted-foreground mt-1">{latestRec?.quantity} {latestRec?.unit}</p>
              <div className="mt-3 space-y-1">
                {latestRec?.applicationSchedule?.map((s, i) => (
                  <p key={i} className="text-xs text-muted-foreground flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-farm-500" /> {s}
                  </p>
                ))}
              </div>
            </div>
            <Link to="/recommendation">
              <Button variant="outline" className="w-full gap-1">View Full Recommendation <ArrowRight className="h-3.5 w-3.5" /></Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Crop Growth Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Crop Growth Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div style={{ height: 280 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={cropGrowthData} margin={{ top: 8, right: 8, bottom: 8, left: 8 }}>
                <defs>
                  <linearGradient id="healthGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="var(--border)" />
                <XAxis dataKey="week" tickLine={false} axisLine={false} className="text-xs" />
                <YAxis tickLine={false} axisLine={false} width={40} className="text-xs" />
                <Tooltip />
                <Area type="monotone" dataKey="health" stroke="var(--chart-1)" fill="url(#healthGrad)" strokeWidth={2} name="Health Score" />
                <Area type="monotone" dataKey="height" stroke="var(--chart-2)" fill="transparent" strokeWidth={2} strokeDasharray="5 5" name="Growth (cm)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
