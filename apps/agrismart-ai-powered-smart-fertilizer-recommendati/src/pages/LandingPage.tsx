import { Link } from "react-router-dom";
import {
  Sprout, FlaskConical, Brain, Leaf, CloudSun, Calculator,
  BarChart3, ArrowRight, CheckCircle2, Droplets, Thermometer,
  Wind, Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  { icon: FlaskConical, title: "Soil Analysis", desc: "Analyze N, P, K, pH and other soil parameters for comprehensive health assessment." },
  { icon: Brain, title: "AI Fertilizer Recommendation", desc: "Generate personalized fertilizer recommendations based on crop and soil conditions." },
  { icon: Leaf, title: "Crop Management", desc: "Track crops, growth stages and farming activities across all your farms." },
  { icon: CloudSun, title: "Weather Integration", desc: "Use weather information to improve fertilizer timing and application efficiency." },
  { icon: Calculator, title: "Fertilizer Calculator", desc: "Calculate recommended fertilizer quantity based on precise nutrient requirements." },
  { icon: BarChart3, title: "Farm Analytics", desc: "Track soil health trends, crop performance and fertilizer usage over time." },
];

const steps = [
  { num: "01", title: "Enter Farm & Soil Data", desc: "Input your farm details, soil test results including N, P, K, pH and organic carbon levels." },
  { num: "02", title: "Select Crop & Growth Stage", desc: "Choose your crop type, variety and current growth stage for targeted recommendations." },
  { num: "03", title: "AI Analyzes Conditions", desc: "Our engine analyzes soil nutrients, crop requirements and weather conditions together." },
  { num: "04", title: "Receive Recommendation", desc: "Get detailed fertilizer recommendation with quantity, schedule and application guidance." },
];

const benefits = [
  "Better fertilizer utilization and cost savings",
  "Data-driven farming decisions",
  "Reduced unnecessary fertilizer application",
  "Improved crop health and yield",
  "Weather-aware application timing",
  "Easy-to-understand recommendations",
];

export function LandingPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-farm-50 via-white to-farm-50/50 dark:from-farm-950 dark:via-background dark:to-farm-950/30">
        <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-farm-100 dark:bg-farm-900/40 px-4 py-1.5 text-sm font-medium text-farm-700 dark:text-farm-400">
                <Sparkles className="h-4 w-4" />
                AI-Powered Agriculture
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-tight">
                Smart Fertilizer Recommendations for{" "}
                <span className="text-farm-600 dark:text-farm-400">Better Farming</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
                Analyze your soil, crop and weather conditions with AI and get personalized fertilizer
                recommendations for healthier crops and efficient resource usage.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/recommendation">
                  <Button size="lg" className="bg-farm-600 hover:bg-farm-700 text-white gap-2 text-base px-8">
                    <Leaf className="h-5 w-5" /> Get Fertilizer Recommendation
                  </Button>
                </Link>
                <a href="#features">
                  <Button size="lg" variant="outline" className="gap-2 text-base px-8">
                    Explore Features <ArrowRight className="h-4 w-4" />
                  </Button>
                </a>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="hidden lg:block relative">
              <div className="relative w-full aspect-square max-w-lg mx-auto">
                {/* Central circle */}
                <div className="absolute inset-[15%] rounded-full bg-gradient-to-br from-farm-100 to-farm-200 dark:from-farm-900/40 dark:to-farm-800/40 flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <Sprout className="h-16 w-16 text-farm-600 mx-auto" />
                    <p className="text-sm font-semibold text-farm-700 dark:text-farm-400">AI Analysis</p>
                  </div>
                </div>

                {/* Floating cards */}
                <Card className="absolute top-[5%] left-[5%] w-44 shadow-lg animate-pulse">
                  <CardContent className="p-3 flex items-center gap-2">
                    <div className="flex h-9 w-9 rounded-lg bg-amber-100 dark:bg-amber-900/30 items-center justify-center">
                      <FlaskConical className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-xs font-medium">Soil Analysis</p>
                      <p className="text-[10px] text-muted-foreground">N: 280 | P: 18 | K: 220</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="absolute top-[5%] right-[5%] w-44 shadow-lg">
                  <CardContent className="p-3 flex items-center gap-2">
                    <div className="flex h-9 w-9 rounded-lg bg-blue-100 dark:bg-blue-900/30 items-center justify-center">
                      <CloudSun className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs font-medium">Weather</p>
                      <p className="text-[10px] text-muted-foreground">31°C | Rain: 15%</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="absolute bottom-[10%] left-[0%] w-48 shadow-lg">
                  <CardContent className="p-3 flex items-center gap-2">
                    <div className="flex h-9 w-9 rounded-lg bg-farm-100 dark:bg-farm-900/30 items-center justify-center">
                      <Leaf className="h-5 w-5 text-farm-600" />
                    </div>
                    <div>
                      <p className="text-xs font-medium">Recommendation</p>
                      <p className="text-[10px] text-muted-foreground">NPK 10-26-26 | 125 kg/ha</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="absolute bottom-[5%] right-[0%] w-44 shadow-lg">
                  <CardContent className="p-3 flex items-center gap-2">
                    <div className="flex h-9 w-9 rounded-lg bg-green-100 dark:bg-green-900/30 items-center justify-center">
                      <Droplets className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-xs font-medium">Crop Health</p>
                      <p className="text-[10px] text-muted-foreground">Rice — Tillering</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 md:py-24 bg-white dark:bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features for Modern Farming</h2>
            <p className="text-muted-foreground text-lg">Everything you need to make data-driven fertilizer decisions and improve crop productivity.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <Card key={f.title} className="hover:shadow-lg transition-shadow border-border/50">
                <CardContent className="p-6 space-y-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-farm-100 dark:bg-farm-900/30">
                    <f.icon className="h-6 w-6 text-farm-600" />
                  </div>
                  <h3 className="text-lg font-semibold">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 md:py-24 bg-farm-50/50 dark:bg-farm-950/20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground text-lg">Get your personalized fertilizer recommendation in 4 simple steps.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <div key={s.num} className="relative">
                <Card className="h-full border-border/50">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-farm-600 text-white text-xl font-bold">
                      {s.num}
                    </div>
                    <h3 className="text-lg font-semibold">{s.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                  </CardContent>
                </Card>
                {i < steps.length - 1 && (
                  <ArrowRight className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 h-6 w-6 text-farm-300 z-10" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section id="about" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Choose AgriSmart?</h2>
              <p className="text-muted-foreground text-lg mb-8">
                Our AI-powered platform helps farmers make smarter decisions about fertilizer application,
                reducing waste and improving crop yields.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {benefits.map((b) => (
                  <div key={b} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-farm-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{b}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Link to="/register">
                  <Button size="lg" className="bg-farm-600 hover:bg-farm-700 text-white gap-2">
                    Get Started Free <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-farm-600 text-white border-0">
                <CardContent className="p-6 text-center">
                  <Thermometer className="h-8 w-8 mx-auto mb-2 opacity-80" />
                  <p className="text-3xl font-bold">31°C</p>
                  <p className="text-sm opacity-80">Temperature</p>
                </CardContent>
              </Card>
              <Card className="border-border/50">
                <CardContent className="p-6 text-center">
                  <Droplets className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                  <p className="text-3xl font-bold">68%</p>
                  <p className="text-sm text-muted-foreground">Humidity</p>
                </CardContent>
              </Card>
              <Card className="border-border/50">
                <CardContent className="p-6 text-center">
                  <Wind className="h-8 w-8 mx-auto mb-2 text-sky-500" />
                  <p className="text-3xl font-bold">12 km/h</p>
                  <p className="text-sm text-muted-foreground">Wind Speed</p>
                </CardContent>
              </Card>
              <Card className="bg-farm-700 text-white border-0">
                <CardContent className="p-6 text-center">
                  <Leaf className="h-8 w-8 mx-auto mb-2 opacity-80" />
                  <p className="text-3xl font-bold">78</p>
                  <p className="text-sm opacity-80">Soil Health Score</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-farm-600 dark:bg-farm-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Optimize Your Farm?</h2>
          <p className="text-farm-100 text-lg mb-8 max-w-xl mx-auto">
            Join thousands of farmers using AI to make better fertilizer decisions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/recommendation">
              <Button size="lg" variant="secondary" className="gap-2 text-base px-8">
                <Leaf className="h-5 w-5" /> Get Recommendation Now
              </Button>
            </Link>
            <Link to="/register">
              <Button size="lg" variant="outline" className="gap-2 text-base px-8 border-white/30 text-white hover:bg-white/10">
                Create Free Account
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
