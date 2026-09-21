import { useState } from "react";
import { Sprout, Plus, MapPin, Ruler, Layers } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockFarms, mockCrops, mockSoilRecords, soilTypes } from "@/data/mockData";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export function FarmsPage() {
  const { user } = useAuth();
  const [dialogOpen, setDialogOpen] = useState(false);
  const farms = mockFarms.filter((f) => f.userId === user?.id || user?.role === "admin");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
            <Sprout className="h-7 w-7 text-farm-600" /> My Farms
          </h1>
          <p className="text-muted-foreground mt-1">Manage your farm properties</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-farm-600 hover:bg-farm-700 text-white gap-2"><Plus className="h-4 w-4" /> Add Farm</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader><DialogTitle>Add New Farm</DialogTitle></DialogHeader>
            <div className="grid gap-4 py-2">
              <div className="space-y-1">
                <Label>Farm Name</Label>
                <Input placeholder="e.g., Green Valley Farm" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label>Location</Label>
                  <Input placeholder="City, State" />
                </div>
                <div className="space-y-1">
                  <Label>Area (hectares)</Label>
                  <Input type="number" placeholder="5" />
                </div>
              </div>
              <div className="space-y-1">
                <Label>Soil Type</Label>
                <Select defaultValue="Alluvial">
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{soilTypes.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <Button className="bg-farm-600 hover:bg-farm-700 text-white" onClick={() => { setDialogOpen(false); toast.success("Farm added!"); }}>Add Farm</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {farms.map((farm) => {
          const farmCrops = mockCrops.filter((c) => c.farmId === farm.id);
          const latestSoil = mockSoilRecords.find((s) => s.farmId === farm.id);
          return (
            <Card key={farm.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-5 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-farm-100 dark:bg-farm-900/30">
                      <Sprout className="h-6 w-6 text-farm-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{farm.farmName}</h3>
                      <p className="text-xs text-muted-foreground flex items-center gap-1"><MapPin className="h-3 w-3" />{farm.location}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="p-2 rounded-lg bg-muted/50 text-center">
                    <Ruler className="h-4 w-4 mx-auto text-muted-foreground mb-1" />
                    <p className="text-sm font-semibold">{farm.area} ha</p>
                    <p className="text-[10px] text-muted-foreground">Area</p>
                  </div>
                  <div className="p-2 rounded-lg bg-muted/50 text-center">
                    <Layers className="h-4 w-4 mx-auto text-muted-foreground mb-1" />
                    <p className="text-sm font-semibold">{farmCrops.length}</p>
                    <p className="text-[10px] text-muted-foreground">Crops</p>
                  </div>
                  <div className="p-2 rounded-lg bg-muted/50 text-center">
                    <Badge variant="outline" className="text-[10px]">{farm.soilType}</Badge>
                    <p className="text-[10px] text-muted-foreground mt-1">Soil Type</p>
                  </div>
                </div>

                {latestSoil && (
                  <div className="pt-2 border-t">
                    <p className="text-xs text-muted-foreground mb-1">Latest Soil Test</p>
                    <p className="text-xs">N: {latestSoil.nitrogen} | P: {latestSoil.phosphorus} | K: {latestSoil.potassium} | pH: {latestSoil.pH}</p>
                  </div>
                )}

                {farmCrops.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-2">
                    {farmCrops.map((c) => (
                      <Badge key={c.id} variant="secondary" className="text-[10px]">{c.cropName}</Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
