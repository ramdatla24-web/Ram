import { useState } from "react";
import { Leaf, Plus, Calendar, MapPin, Clock, AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockCrops, mockFarms, cropOptions, growthStages } from "@/data/mockData";
import { toast } from "sonner";

const healthColors: Record<string, string> = {
  excellent: "bg-farm-100 text-farm-700 dark:bg-farm-900/30 dark:text-farm-400",
  good: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  fair: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  poor: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

const cropEmojis: Record<string, string> = {
  Rice: "🌾", Wheat: "🌾", Maize: "🌽", Cotton: "☁️",
  Tomato: "🍅", Groundnut: "🥜", Soybean: "🫘", Sugarcane: "🎋",
};

export function CropsPage() {
  const [crops, setCrops] = useState(mockCrops);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? crops : crops.filter((c) => c.healthStatus === filter);

  const daysSince = (date: string) => Math.floor((Date.now() - new Date(date).getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
            <Leaf className="h-7 w-7 text-farm-600" /> My Crops
          </h1>
          <p className="text-muted-foreground mt-1">Manage and track your crop activities</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-farm-600 hover:bg-farm-700 text-white gap-2"><Plus className="h-4 w-4" /> Add Crop</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader><DialogTitle>Add New Crop</DialogTitle></DialogHeader>
            <div className="grid gap-4 py-2">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label>Crop Name</Label>
                  <Select defaultValue="Rice">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>{cropOptions.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label>Variety</Label>
                  <Input placeholder="e.g., Pusa Basmati" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label>Farm</Label>
                  <Select defaultValue="f1">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>{mockFarms.map((f) => <SelectItem key={f.id} value={f.id}>{f.farmName}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label>Growth Stage</Label>
                  <Select defaultValue="Seedling">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>{["Seedling", "Vegetative", "Flowering", "Fruiting", "Maturity"].map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label>Planting Date</Label>
                  <Input type="date" />
                </div>
                <div className="space-y-1">
                  <Label>Area (hectares)</Label>
                  <Input type="number" placeholder="2" />
                </div>
              </div>
              <Button className="bg-farm-600 hover:bg-farm-700 text-white" onClick={() => { setDialogOpen(false); toast.success("Crop added successfully!"); }}>
                Add Crop
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {["all", "excellent", "good", "fair", "poor"].map((f) => (
          <Button key={f} variant={filter === f ? "default" : "outline"} size="sm"
            className={filter === f ? "bg-farm-600 hover:bg-farm-700 text-white" : ""}
            onClick={() => setFilter(f)}>
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </Button>
        ))}
      </div>

      {/* Crop Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((crop) => {
          const farm = mockFarms.find((f) => f.id === crop.farmId);
          const days = daysSince(crop.plantingDate);
          return (
            <Card key={crop.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-5 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{cropEmojis[crop.cropName] || "🌱"}</span>
                    <div>
                      <h3 className="font-semibold">{crop.cropName}</h3>
                      <p className="text-xs text-muted-foreground">{crop.variety}</p>
                    </div>
                  </div>
                  <Badge className={healthColors[crop.healthStatus]}>{crop.healthStatus}</Badge>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" /> {farm?.farmName} • {crop.area} ha
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" /> Planted {new Date(crop.plantingDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" /> {days} days since planting
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t">
                  <div>
                    <p className="text-xs text-muted-foreground">Growth Stage</p>
                    <p className="text-sm font-medium">{crop.growthStage}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Harvest</p>
                    <p className="text-sm font-medium">{new Date(crop.expectedHarvest).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400">
                  <AlertCircle className="h-3.5 w-3.5" />
                  Next action: Apply fertilizer at {crop.growthStage} stage
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
