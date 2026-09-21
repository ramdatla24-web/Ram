import { useState } from "react";
import { BookOpen, Search, Filter, Leaf } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockFertilizers, cropOptions } from "@/data/mockData";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export function FertilizersPage() {
  const [search, setSearch] = useState("");
  const [cropFilter, setCropFilter] = useState("all");
  const [nutrientFilter, setNutrientFilter] = useState("all");
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = mockFertilizers.filter((f) => {
    const matchSearch = f.name.toLowerCase().includes(search.toLowerCase()) || f.npkRatio.includes(search);
    const matchCrop = cropFilter === "all" || f.suitableCrops.includes(cropFilter);
    const matchNutrient = nutrientFilter === "all" ||
      (nutrientFilter === "N" && f.nutrientContent.n > 0) ||
      (nutrientFilter === "P" && f.nutrientContent.p > 0) ||
      (nutrientFilter === "K" && f.nutrientContent.k > 0);
    return matchSearch && matchCrop && matchNutrient;
  });

  const detail = selected ? mockFertilizers.find((f) => f.id === selected) : null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
          <BookOpen className="h-7 w-7 text-farm-600" /> Fertilizer Guide
        </h1>
        <p className="text-muted-foreground mt-1">Browse and search the fertilizer database</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search fertilizers..." className="pl-10" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <Select value={cropFilter} onValueChange={setCropFilter}>
          <SelectTrigger className="w-full sm:w-48"><Filter className="h-4 w-4 mr-2" /><SelectValue placeholder="Filter by crop" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Crops</SelectItem>
            {cropOptions.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={nutrientFilter} onValueChange={setNutrientFilter}>
          <SelectTrigger className="w-full sm:w-48"><SelectValue placeholder="Filter by nutrient" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Nutrients</SelectItem>
            <SelectItem value="N">Nitrogen (N)</SelectItem>
            <SelectItem value="P">Phosphorus (P)</SelectItem>
            <SelectItem value="K">Potassium (K)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Fertilizer Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((fert) => (
          <Card key={fert.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setSelected(fert.id)}>
            <CardContent className="p-5 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-farm-100 dark:bg-farm-900/30">
                    <Leaf className="h-5 w-5 text-farm-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{fert.name}</h3>
                    <Badge variant="outline" className="text-xs mt-1">{fert.npkRatio}</Badge>
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">{fert.description}</p>
              <div className="flex flex-wrap gap-1">
                {fert.suitableCrops.slice(0, 4).map((c) => (
                  <Badge key={c} variant="secondary" className="text-[10px]">{c}</Badge>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-2 pt-2 border-t">
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">N</p>
                  <p className="font-semibold text-sm">{fert.nutrientContent.n}%</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">P</p>
                  <p className="font-semibold text-sm">{fert.nutrientContent.p}%</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">K</p>
                  <p className="font-semibold text-sm">{fert.nutrientContent.k}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <BookOpen className="h-12 w-12 mx-auto mb-3 opacity-50" />
          <p>No fertilizers match your filters</p>
        </div>
      )}

      {/* Detail Dialog */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>{detail?.name}</DialogTitle></DialogHeader>
          {detail && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge className="bg-farm-600 text-white">{detail.npkRatio}</Badge>
                {detail.suitableCrops.map((c) => <Badge key={c} variant="secondary">{c}</Badge>)}
              </div>
              <p className="text-sm text-muted-foreground">{detail.description}</p>
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 rounded-lg bg-muted text-center">
                  <p className="text-xs text-muted-foreground">Nitrogen</p>
                  <p className="text-xl font-bold">{detail.nutrientContent.n}%</p>
                </div>
                <div className="p-3 rounded-lg bg-muted text-center">
                  <p className="text-xs text-muted-foreground">Phosphorus</p>
                  <p className="text-xl font-bold">{detail.nutrientContent.p}%</p>
                </div>
                <div className="p-3 rounded-lg bg-muted text-center">
                  <p className="text-xs text-muted-foreground">Potassium</p>
                  <p className="text-xl font-bold">{detail.nutrientContent.k}%</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium mb-1">Application Method</p>
                <p className="text-sm text-muted-foreground">{detail.applicationMethod}</p>
              </div>
              <div>
                <p className="text-sm font-medium mb-1">Recommended Usage</p>
                <p className="text-sm text-muted-foreground">{detail.recommendedUsage}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
