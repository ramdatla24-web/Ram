import { BarChart3, TrendingUp, Leaf, FlaskConical } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { analyticsData, mockRecommendations } from "@/data/mockData";
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area
} from "recharts";

export function AnalyticsPage() {
  const { fertilizerUsage, soilTrends, cropDistribution, monthlyProductivity } = analyticsData;
  const totalRecs = mockRecommendations.length;
  const totalFert = fertilizerUsage.reduce((a, m) => a + m.urea + m.dap + m.npk + m.mop, 0);
  const avgHealth = 78;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
          <BarChart3 className="h-7 w-7 text-farm-600" /> Analytics
        </h1>
        <p className="text-muted-foreground mt-1">Track your farm performance and fertilizer usage</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100 dark:bg-purple-900/30">
              <TrendingUp className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{totalRecs}</p>
              <p className="text-xs text-muted-foreground">Total Recommendations</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-farm-100 dark:bg-farm-900/30">
              <Leaf className="h-5 w-5 text-farm-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{(totalFert / 1000).toFixed(1)}t</p>
              <p className="text-xs text-muted-foreground">Total Fertilizer Used</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-900/30">
              <BarChart3 className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">8</p>
              <p className="text-xs text-muted-foreground">Active Crops</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 dark:bg-amber-900/30">
              <FlaskConical className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{avgHealth}</p>
              <p className="text-xs text-muted-foreground">Avg Soil Health</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Fertilizer Usage Over Time */}
        <Card>
          <CardHeader><CardTitle className="text-lg">Fertilizer Usage Over Time</CardTitle></CardHeader>
          <CardContent>
            <div style={{ height: 280 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={fertilizerUsage} margin={{ top: 8, right: 8, bottom: 8, left: 8 }}>
                  <CartesianGrid vertical={false} stroke="var(--border)" />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} className="text-xs" />
                  <YAxis tickLine={false} axisLine={false} width={40} className="text-xs" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="urea" name="Urea" stackId="a" fill="var(--chart-1)" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="dap" name="DAP" stackId="a" fill="var(--chart-2)" />
                  <Bar dataKey="npk" name="NPK" stackId="a" fill="var(--chart-3)" />
                  <Bar dataKey="mop" name="MOP" stackId="a" fill="var(--chart-4)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Soil Nutrient Trends */}
        <Card>
          <CardHeader><CardTitle className="text-lg">Soil Nutrient Trends</CardTitle></CardHeader>
          <CardContent>
            <div style={{ height: 280 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={soilTrends} margin={{ top: 8, right: 8, bottom: 8, left: 8 }}>
                  <CartesianGrid vertical={false} stroke="var(--border)" />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} className="text-xs" />
                  <YAxis tickLine={false} axisLine={false} width={40} className="text-xs" />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="nitrogen" name="Nitrogen" stroke="var(--chart-1)" strokeWidth={2} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="phosphorus" name="Phosphorus" stroke="var(--chart-2)" strokeWidth={2} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="potassium" name="Potassium" stroke="var(--chart-3)" strokeWidth={2} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Crop Distribution */}
        <Card>
          <CardHeader><CardTitle className="text-lg">Crop Distribution</CardTitle></CardHeader>
          <CardContent>
            <div style={{ height: 280 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={cropDistribution} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={3} dataKey="value" label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}>
                    {cropDistribution.map((entry, i) => (
                      <Cell key={i} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Monthly Productivity */}
        <Card>
          <CardHeader><CardTitle className="text-lg">Farm Productivity</CardTitle></CardHeader>
          <CardContent>
            <div style={{ height: 280 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyProductivity} margin={{ top: 8, right: 8, bottom: 8, left: 8 }}>
                  <defs>
                    <linearGradient id="yieldGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} stroke="var(--border)" />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} className="text-xs" />
                  <YAxis tickLine={false} axisLine={false} width={40} className="text-xs" />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="yield" name="Yield (t/ha)" stroke="var(--chart-1)" fill="url(#yieldGrad)" strokeWidth={2} />
                  <Line type="monotone" dataKey="target" name="Target" stroke="var(--chart-5)" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
