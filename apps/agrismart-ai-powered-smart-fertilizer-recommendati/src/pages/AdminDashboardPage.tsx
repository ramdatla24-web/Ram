import { useState } from "react";
import { Shield, Users, Sprout, Leaf, FlaskConical, Search, BarChart3, Edit, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockUsers, mockFarms, mockCrops, mockFertilizers, mockRecommendations, mockSoilRecords } from "@/data/mockData";
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell
} from "recharts";
import { toast } from "sonner";

export function AdminDashboardPage() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("users");

  const topFertilizers = mockRecommendations.reduce((acc, r) => {
    acc[r.fertilizerName] = (acc[r.fertilizerName] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const fertChartData = Object.entries(topFertilizers).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count);

  const stats = [
    { label: "Total Farmers", value: mockUsers.filter((u) => u.role === "farmer").length, icon: Users, color: "bg-blue-100 dark:bg-blue-900/30 text-blue-600" },
    { label: "Total Farms", value: mockFarms.length, icon: Sprout, color: "bg-farm-100 dark:bg-farm-900/30 text-farm-600" },
    { label: "Total Recommendations", value: mockRecommendations.length, icon: Leaf, color: "bg-purple-100 dark:bg-purple-900/30 text-purple-600" },
    { label: "Active Crops", value: mockCrops.length, icon: BarChart3, color: "bg-amber-100 dark:bg-amber-900/30 text-amber-600" },
  ];

  const filteredUsers = mockUsers.filter((u) => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
          <Shield className="h-7 w-7 text-farm-600" /> Admin Dashboard
        </h1>
        <p className="text-muted-foreground mt-1">System overview and management</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardContent className="p-4 flex items-center gap-3">
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${s.color}`}>
                <s.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-bold">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Most Recommended Fertilizers */}
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle className="text-lg">Most Recommended Fertilizers</CardTitle></CardHeader>
          <CardContent>
            <div style={{ height: 250 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={fertChartData} margin={{ top: 8, right: 8, bottom: 8, left: 8 }}>
                  <CartesianGrid vertical={false} stroke="var(--border)" />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} className="text-xs" />
                  <YAxis tickLine={false} axisLine={false} width={30} className="text-xs" />
                  <Tooltip />
                  <Bar dataKey="count" name="Recommendations" fill="var(--chart-1)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardHeader><CardTitle className="text-lg">System Overview</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <span className="text-sm">Soil Records</span>
              <Badge>{mockSoilRecords.length}</Badge>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <span className="text-sm">Fertilizers in DB</span>
              <Badge>{mockFertilizers.length}</Badge>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <span className="text-sm">Active Recommendations</span>
              <Badge className="bg-farm-600">{mockRecommendations.filter((r) => r.status === "active").length}</Badge>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <span className="text-sm">Completed Recommendations</span>
              <Badge variant="secondary">{mockRecommendations.filter((r) => r.status === "completed").length}</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Management Tabs */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Manage Entities</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search..." className="pl-10 w-64" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="farms">Farms</TabsTrigger>
              <TabsTrigger value="crops">Crops</TabsTrigger>
              <TabsTrigger value="fertilizers">Fertilizers</TabsTrigger>
            </TabsList>

            <TabsContent value="users">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((u) => (
                    <TableRow key={u.id}>
                      <TableCell className="font-medium">{u.name}</TableCell>
                      <TableCell className="text-sm">{u.email}</TableCell>
                      <TableCell><Badge variant={u.role === "admin" ? "destructive" : "secondary"}>{u.role}</Badge></TableCell>
                      <TableCell className="text-sm text-muted-foreground">{u.location}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => toast.info("Edit user")}><Edit className="h-4 w-4" /></Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => toast.info("Delete user")}><Trash2 className="h-4 w-4" /></Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="farms">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Farm Name</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Area (ha)</TableHead>
                    <TableHead>Soil Type</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockFarms.filter((f) => f.farmName.toLowerCase().includes(search.toLowerCase())).map((f) => (
                    <TableRow key={f.id}>
                      <TableCell className="font-medium">{f.farmName}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{f.location}</TableCell>
                      <TableCell>{f.area}</TableCell>
                      <TableCell><Badge variant="outline">{f.soilType}</Badge></TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8"><Edit className="h-4 w-4" /></Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive"><Trash2 className="h-4 w-4" /></Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="crops">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Crop</TableHead>
                    <TableHead>Variety</TableHead>
                    <TableHead>Stage</TableHead>
                    <TableHead>Health</TableHead>
                    <TableHead>Planted</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockCrops.filter((c) => c.cropName.toLowerCase().includes(search.toLowerCase())).map((c) => (
                    <TableRow key={c.id}>
                      <TableCell className="font-medium">{c.cropName}</TableCell>
                      <TableCell className="text-sm">{c.variety}</TableCell>
                      <TableCell className="text-sm">{c.growthStage}</TableCell>
                      <TableCell><Badge variant="outline" className={c.healthStatus === "excellent" ? "text-farm-600" : c.healthStatus === "good" ? "text-blue-600" : "text-amber-600"}>{c.healthStatus}</Badge></TableCell>
                      <TableCell className="text-sm text-muted-foreground">{new Date(c.plantingDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8"><Edit className="h-4 w-4" /></Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive"><Trash2 className="h-4 w-4" /></Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="fertilizers">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>NPK Ratio</TableHead>
                    <TableHead>Suitable Crops</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockFertilizers.filter((f) => f.name.toLowerCase().includes(search.toLowerCase())).map((f) => (
                    <TableRow key={f.id}>
                      <TableCell className="font-medium">{f.name}</TableCell>
                      <TableCell><Badge variant="outline">{f.npkRatio}</Badge></TableCell>
                      <TableCell className="text-sm text-muted-foreground">{f.suitableCrops.slice(0, 3).join(", ")}</TableCell>
                      <TableCell className="text-sm text-muted-foreground max-w-[200px] truncate">{f.applicationMethod}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8"><Edit className="h-4 w-4" /></Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive"><Trash2 className="h-4 w-4" /></Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
