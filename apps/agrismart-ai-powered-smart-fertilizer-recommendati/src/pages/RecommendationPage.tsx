import { useState } from "react";
import {
  Sprout, FlaskConical, Leaf, CloudSun, Brain, ArrowLeft, ArrowRight,
  CheckCircle2, AlertTriangle, Download, Printer, Save, DownloadCloud
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { cropOptions, growthStages, soilTypes, mockWeather } from "@/data/mockData";
import { generateRecommendation } from "@/lib/recommendationEngine";
import type { RecommendationFormData, RecommendationResult } from "@/types";
import { toast } from "sonner";
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell
} from "recharts";

const steps = [
  { id: 1, title: "Farm Info", icon: Sprout },
  { id: 2, title: "Soil Data", icon: FlaskConical },
  { id: 3, title: "Crop Info", icon: Leaf },
  { id: 4, title: "Weather", icon: CloudSun },
  { id: 5, title: "Generate", icon: Brain },
];

export function RecommendationPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [result, setResult] = useState<RecommendationResult | null>(null);
  const [form, setForm] = useState<RecommendationFormData>({
    farmName: "", location: "", farmSize: 0, soilType: "Alluvial",
    nitrogen: 280, phosphorus: 18, potassium: 220, pH: 6.8, organicCarbon: 0.72, moisture: 34,
    cropType: "Rice", cropVariety: "", growthStage: "Tillering", plantingDate: "", expectedHarvest: "",
    temperature: mockWeather.temperature, humidity: mockWeather.humidity, rainfall: mockWeather.rainfall, rainProbability: mockWeather.rainProbability,
  });

  const update = (field: keyof RecommendationFormData, value: string | number) => setForm((p) => ({ ...p, [field]: value }));

  const loadingMessages = [
    "Analyzing soil conditions...",
    "Checking crop nutrient requirements...",
    "Analyzing weather patterns...",
    "Evaluating growth stage needs...",
    "Generating fertilizer recommendation...",
  ];

  const handleGenerate = () => {
    setLoading(true);
    let msgIdx = 0;
    setLoadingText(loadingMessages[0]);
    const interval = setInterval(() => {
      msgIdx++;
      if (msgIdx < loadingMessages.length) {
        setLoadingText(loadingMessages[msgIdx]);
      }
    }, 600);

    setTimeout(() => {
      clearInterval(interval);
      const rec = generateRecommendation(form);
      setResult(rec);
      setLoading(false);
      setCurrentStep(6);
      toast.success("Recommendation generated!");
    }, 3000);
  };

  const nextStep = () => setCurrentStep((s) => Math.min(s + 1, 5));
  const prevStep = () => setCurrentStep((s) => Math.max(s - 1, 1));

  const statusColor = (s: string) => {
    if (s.includes("Low") || s.includes("Very Low")) return "text-red-500";
    if (s.includes("Optimal")) return "text-farm-600";
    return "text-amber-500";
  };

  const barColor = (s: string) => {
    if (s.includes("Low") || s.includes("Very Low")) return "var(--chart-5)";
    if (s.includes("Optimal")) return "var(--chart-1)";
    return "var(--chart-3)";
  };

  if (result && currentStep === 6) {
    return (
      <div className="space-y-6 max-w-4xl mx-auto">
        {/* Result Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full bg-farm-100 dark:bg-farm-900/40 px-4 py-1.5 text-sm font-medium text-farm-700 dark:text-farm-400">
            <Brain className="h-4 w-4" /> AI Fertilizer Recommendation
          </div>
          <h1 className="text-2xl md:text-3xl font-bold">Your Personalized Recommendation</h1>
        </div>

        {/* Main Recommendation Card */}
        <Card className="border-farm-200 dark:border-farm-800 bg-gradient-to-br from-farm-50 to-white dark:from-farm-950/30 dark:to-card">
          <CardContent className="p-6 md:p-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Badge className="bg-farm-600 text-white">Recommended</Badge>
                  <Badge variant="outline">{result.crop}</Badge>
                  <Badge variant="outline">{result.growthStage}</Badge>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-farm-700 dark:text-farm-400">{result.fertilizer}</h2>
                  <p className="text-lg text-muted-foreground">NPK Ratio: {result.npkRatio}</p>
                </div>
                <div className="p-4 rounded-xl bg-white dark:bg-card border shadow-sm">
                  <p className="text-sm text-muted-foreground">Recommended Quantity</p>
                  <p className="text-4xl font-bold mt-1">{result.quantity} <span className="text-lg font-normal text-muted-foreground">{result.unit}</span></p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">Application Schedule</p>
                  {result.schedule.map((s, i) => (
                    <div key={i} className="flex items-start gap-2 mb-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-farm-100 dark:bg-farm-900/30 text-farm-600 text-xs font-bold flex-shrink-0 mt-0.5">{i + 1}</span>
                      <p className="text-sm">{s.timing}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-2">Soil Condition</p>
                  <div className="space-y-1.5">
                    {result.soilCondition.map((c, i) => (
                      <div key={i} className={`text-sm flex items-center gap-2 ${statusColor(c)}`}>
                        <span className="h-2 w-2 rounded-full bg-current" /> {c}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
                  <p className="text-sm font-medium text-blue-700 dark:text-blue-400 mb-1">Timing Guidance</p>
                  <p className="text-xs text-blue-600 dark:text-blue-300">{result.timing}</p>
                </div>
                <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
                  <p className="text-sm font-medium text-amber-700 dark:text-amber-400 mb-1 flex items-center gap-1">
                    <AlertTriangle className="h-3.5 w-3.5" /> Precautions
                  </p>
                  {result.precautions.map((p, i) => (
                    <p key={i} className="text-xs text-amber-600 dark:text-amber-300 mt-1">• {p}</p>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Why This Was Recommended */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Why This Was Recommended</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 gap-3">
              {result.reasoning.map((r, i) => (
                <div key={i} className="flex items-start gap-2 p-3 rounded-lg bg-muted/50">
                  <CheckCircle2 className="h-4 w-4 text-farm-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{r}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Nutrient Comparison Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Nutrient Comparison</CardTitle>
            <CardDescription>Current soil values vs optimal ranges</CardDescription>
          </CardHeader>
          <CardContent>
            <div style={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={result.nutrientComparison} margin={{ top: 8, right: 8, bottom: 8, left: 8 }}>
                  <CartesianGrid vertical={false} stroke="var(--border)" />
                  <XAxis dataKey="nutrient" tickLine={false} axisLine={false} className="text-xs" />
                  <YAxis tickLine={false} axisLine={false} width={50} className="text-xs" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="current" name="Current Value" radius={[4, 4, 0, 0]}>
                    {result.nutrientComparison.map((entry, i) => (
                      <Cell key={i} fill={barColor(entry.status)} />
                    ))}
                  </Bar>
                  <Bar dataKey="optimal" name="Optimal Min" fill="var(--chart-2)" radius={[4, 4, 0, 0]} opacity={0.5} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 font-medium text-muted-foreground">Nutrient</th>
                    <th className="text-left py-2 font-medium text-muted-foreground">Current</th>
                    <th className="text-left py-2 font-medium text-muted-foreground">Optimal</th>
                    <th className="text-left py-2 font-medium text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {result.nutrientComparison.map((n) => (
                    <tr key={n.nutrient} className="border-b last:border-0">
                      <td className="py-2">{n.nutrient}</td>
                      <td className="py-2 font-medium">{n.current}</td>
                      <td className="py-2 text-muted-foreground">≥ {n.optimal}</td>
                      <td className="py-2"><span className={`font-medium ${statusColor(n.status)}`}>{n.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Disclaimer */}
        <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 text-center">
          <AlertTriangle className="h-5 w-5 text-amber-600 mx-auto mb-2" />
          <p className="text-sm text-amber-700 dark:text-amber-400 font-medium">Important Disclaimer</p>
          <p className="text-xs text-amber-600 dark:text-amber-300 mt-1">
            This AI-generated recommendation is decision-support information. Please verify with local agricultural experts
            or official agronomy guidance before applying fertilizer.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 justify-center">
          <Button variant="outline" className="gap-2" onClick={() => toast.success("Recommendation saved!")}>
            <Save className="h-4 w-4" /> Save
          </Button>
          <Button variant="outline" className="gap-2" onClick={() => toast.success("Downloading PDF...")}>
            <Download className="h-4 w-4" /> Download
          </Button>
          <Button variant="outline" className="gap-2" onClick={() => window.print()}>
            <Printer className="h-4 w-4" /> Print
          </Button>
          <Button className="bg-farm-600 hover:bg-farm-700 text-white gap-2" onClick={() => { setResult(null); setCurrentStep(1); }}>
            New Recommendation
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Fertilizer Recommendation</h1>
        <p className="text-muted-foreground mt-1">Fill in the details below to get an AI-powered recommendation</p>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center gap-1">
        {steps.map((s, i) => (
          <div key={s.id} className="flex items-center flex-1">
            <div className={`flex items-center gap-2 flex-1 rounded-lg px-3 py-2 text-sm transition-colors ${
              currentStep === s.id ? "bg-farm-100 dark:bg-farm-900/30 text-farm-700 dark:text-farm-400 font-medium" :
              currentStep > s.id ? "bg-farm-50 dark:bg-farm-950/20 text-farm-600" : "text-muted-foreground"
            }`}>
              {currentStep > s.id ? (
                <CheckCircle2 className="h-4 w-4" />
              ) : (
                <s.icon className="h-4 w-4" />
              )}
              <span className="hidden sm:inline">{s.title}</span>
            </div>
            {i < steps.length - 1 && <ArrowRight className="h-4 w-4 text-muted-foreground mx-1 flex-shrink-0" />}
          </div>
        ))}
      </div>

      <Progress value={(currentStep / 5) * 100} className="h-2" />

      {/* Loading State */}
      {loading ? (
        <Card className="border-farm-200 dark:border-farm-800">
          <CardContent className="p-12 text-center space-y-6">
            <div className="relative">
              <div className="h-20 w-20 mx-auto rounded-full border-4 border-farm-200 dark:border-farm-800 border-t-farm-600 animate-spin" />
              <Brain className="h-8 w-8 text-farm-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
            <div>
              <p className="text-lg font-medium">{loadingText}</p>
              <p className="text-sm text-muted-foreground mt-1">This usually takes a few seconds</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-6">
            {/* Step 1: Farm Info */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold flex items-center gap-2"><Sprout className="h-5 w-5 text-farm-600" /> Farm Information</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Farm Name</Label>
                    <Input value={form.farmName} onChange={(e) => update("farmName", e.target.value)} placeholder="Green Valley Farm" />
                  </div>
                  <div className="space-y-2">
                    <Label>Location</Label>
                    <Input value={form.location} onChange={(e) => update("location", e.target.value)} placeholder="Ludhiana, Punjab" />
                  </div>
                  <div className="space-y-2">
                    <Label>Farm Size (hectares)</Label>
                    <Input type="number" value={form.farmSize} onChange={(e) => update("farmSize", Number(e.target.value))} placeholder="5" />
                  </div>
                  <div className="space-y-2">
                    <Label>Soil Type</Label>
                    <Select value={form.soilType} onValueChange={(v) => update("soilType", v)}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {soilTypes.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Soil Data */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold flex items-center gap-2"><FlaskConical className="h-5 w-5 text-amber-500" /> Soil Information</h2>
                <p className="text-sm text-muted-foreground">Enter your latest soil test results. These values directly affect the recommendation.</p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Nitrogen (N) kg/ha</Label>
                    <Input type="number" value={form.nitrogen} onChange={(e) => update("nitrogen", Number(e.target.value))} />
                    <p className="text-xs text-muted-foreground">Optimal: 200-350</p>
                  </div>
                  <div className="space-y-2">
                    <Label>Phosphorus (P) kg/ha</Label>
                    <Input type="number" value={form.phosphorus} onChange={(e) => update("phosphorus", Number(e.target.value))} />
                    <p className="text-xs text-muted-foreground">Optimal: 20-40</p>
                  </div>
                  <div className="space-y-2">
                    <Label>Potassium (K) kg/ha</Label>
                    <Input type="number" value={form.potassium} onChange={(e) => update("potassium", Number(e.target.value))} />
                    <p className="text-xs text-muted-foreground">Optimal: 200-300</p>
                  </div>
                  <div className="space-y-2">
                    <Label>Soil pH</Label>
                    <Input type="number" step="0.1" value={form.pH} onChange={(e) => update("pH", Number(e.target.value))} />
                    <p className="text-xs text-muted-foreground">Optimal: 6.0-7.5</p>
                  </div>
                  <div className="space-y-2">
                    <Label>Organic Carbon %</Label>
                    <Input type="number" step="0.01" value={form.organicCarbon} onChange={(e) => update("organicCarbon", Number(e.target.value))} />
                    <p className="text-xs text-muted-foreground">Optimal: 0.5-0.8%</p>
                  </div>
                  <div className="space-y-2">
                    <Label>Soil Moisture %</Label>
                    <Input type="number" value={form.moisture} onChange={(e) => update("moisture", Number(e.target.value))} />
                    <p className="text-xs text-muted-foreground">Optimal: 25-40%</p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Crop Info */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold flex items-center gap-2"><Leaf className="h-5 w-5 text-farm-600" /> Crop Information</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Crop Type</Label>
                    <Select value={form.cropType} onValueChange={(v) => { update("cropType", v); update("growthStage", growthStages[v]?.[0] || ""); }}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {cropOptions.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Crop Variety</Label>
                    <Input value={form.cropVariety} onChange={(e) => update("cropVariety", e.target.value)} placeholder="e.g., Pusa Basmati 1121" />
                  </div>
                  <div className="space-y-2">
                    <Label>Growth Stage</Label>
                    <Select value={form.growthStage} onValueChange={(v) => update("growthStage", v)}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {(growthStages[form.cropType] || []).map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Planting Date</Label>
                    <Input type="date" value={form.plantingDate} onChange={(e) => update("plantingDate", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Expected Harvest Date</Label>
                    <Input type="date" value={form.expectedHarvest} onChange={(e) => update("expectedHarvest", e.target.value)} />
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Weather */}
            {currentStep === 4 && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold flex items-center gap-2"><CloudSun className="h-5 w-5 text-blue-500" /> Weather Information</h2>
                <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 text-sm text-blue-700 dark:text-blue-300">
                  Current weather data is pre-filled from the nearest weather station. Adjust values if needed.
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label>Temperature (°C)</Label>
                    <Input type="number" value={form.temperature} onChange={(e) => update("temperature", Number(e.target.value))} />
                  </div>
                  <div className="space-y-2">
                    <Label>Humidity (%)</Label>
                    <Input type="number" value={form.humidity} onChange={(e) => update("humidity", Number(e.target.value))} />
                  </div>
                  <div className="space-y-2">
                    <Label>Rainfall (mm)</Label>
                    <Input type="number" step="0.1" value={form.rainfall} onChange={(e) => update("rainfall", Number(e.target.value))} />
                  </div>
                  <div className="space-y-2">
                    <Label>Rain Probability (%)</Label>
                    <Input type="number" value={form.rainProbability} onChange={(e) => update("rainProbability", Number(e.target.value))} />
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Generate */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold flex items-center gap-2"><Brain className="h-5 w-5 text-purple-600" /> Review & Generate</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg border space-y-2">
                    <h3 className="font-medium text-sm text-muted-foreground">Farm</h3>
                    <p className="font-semibold">{form.farmName || "Not specified"}</p>
                    <p className="text-sm text-muted-foreground">{form.location || "Not specified"} • {form.farmSize} ha • {form.soilType}</p>
                  </div>
                  <div className="p-4 rounded-lg border space-y-2">
                    <h3 className="font-medium text-sm text-muted-foreground">Soil</h3>
                    <p className="text-sm">N: {form.nitrogen} | P: {form.phosphorus} | K: {form.potassium}</p>
                    <p className="text-sm text-muted-foreground">pH: {form.pH} | OC: {form.organicCarbon}% | Moisture: {form.moisture}%</p>
                  </div>
                  <div className="p-4 rounded-lg border space-y-2">
                    <h3 className="font-medium text-sm text-muted-foreground">Crop</h3>
                    <p className="font-semibold">{form.cropType} {form.cropVariety && `(${form.cropVariety})`}</p>
                    <p className="text-sm text-muted-foreground">Stage: {form.growthStage}</p>
                  </div>
                  <div className="p-4 rounded-lg border space-y-2">
                    <h3 className="font-medium text-sm text-muted-foreground">Weather</h3>
                    <p className="text-sm">{form.temperature}°C | {form.humidity}% humidity</p>
                    <p className="text-sm text-muted-foreground">Rain: {form.rainfall}mm ({form.rainProbability}% probability)</p>
                  </div>
                </div>
                <Button className="w-full bg-farm-600 hover:bg-farm-700 text-white gap-2 text-lg py-6" onClick={handleGenerate}>
                  <Brain className="h-5 w-5" /> Analyze & Generate Recommendation
                </Button>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-6 pt-4 border-t">
              <Button variant="outline" onClick={prevStep} disabled={currentStep === 1} className="gap-2">
                <ArrowLeft className="h-4 w-4" /> Previous
              </Button>
              {currentStep < 5 ? (
                <Button onClick={nextStep} className="bg-farm-600 hover:bg-farm-700 text-white gap-2">
                  Next <ArrowRight className="h-4 w-4" />
                </Button>
              ) : null}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
