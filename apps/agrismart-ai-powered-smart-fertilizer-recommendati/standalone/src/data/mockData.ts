import type { User, Farm, SoilRecord, Crop, Fertilizer, Recommendation, WeatherRecord, WeatherForecast } from "@/types";

export const mockUsers: User[] = [
  { id: "u1", name: "Rajesh Kumar", email: "rajesh@demo.com", phone: "+91 98765 43210", password: "demo123", role: "farmer", location: "Punjab, India", farmSize: 12 },
  { id: "u2", name: "Priya Sharma", email: "priya@demo.com", phone: "+91 98765 43211", password: "demo123", role: "farmer", location: "Maharashtra, India", farmSize: 8 },
  { id: "u3", name: "Arjun Patel", email: "arjun@demo.com", phone: "+91 98765 43212", password: "demo123", role: "farmer", location: "Gujarat, India", farmSize: 15 },
  { id: "u4", name: "Lakshmi Devi", email: "lakshmi@demo.com", phone: "+91 98765 43213", password: "demo123", role: "farmer", location: "Karnataka, India", farmSize: 6 },
  { id: "u5", name: "Suresh Singh", email: "suresh@demo.com", phone: "+91 98765 43214", password: "demo123", role: "farmer", location: "Haryana, India", farmSize: 20 },
  { id: "admin1", name: "Admin User", email: "admin@agrismart.com", phone: "+91 90000 00000", password: "admin123", role: "admin", location: "New Delhi, India" },
];

export const mockFarms: Farm[] = [
  { id: "f1", userId: "u1", farmName: "Green Valley Farm", location: "Ludhiana, Punjab", area: 5, soilType: "Alluvial" },
  { id: "f2", userId: "u1", farmName: "River Side Plot", location: "Amritsar, Punjab", area: 7, soilType: "Loamy" },
  { id: "f3", userId: "u2", farmName: "Sunrise Fields", location: "Nashik, Maharashtra", area: 8, soilType: "Black Cotton" },
  { id: "f4", userId: "u3", farmName: "Patel Agro Farm", location: "Surat, Gujarat", area: 10, soilType: "Sandy Loam" },
  { id: "f5", userId: "u4", farmName: "Devi Organic Farm", location: "Mysore, Karnataka", area: 6, soilType: "Red Laterite" },
];

export const mockSoilRecords: SoilRecord[] = [
  { id: "s1", farmId: "f1", nitrogen: 280, phosphorus: 18, potassium: 220, pH: 6.8, organicCarbon: 0.72, moisture: 34, date: "2026-09-01" },
  { id: "s2", farmId: "f1", nitrogen: 260, phosphorus: 22, potassium: 210, pH: 6.7, organicCarbon: 0.68, moisture: 31, date: "2026-07-15" },
  { id: "s3", farmId: "f2", nitrogen: 310, phosphorus: 15, potassium: 190, pH: 7.1, organicCarbon: 0.55, moisture: 28, date: "2026-09-05" },
  { id: "s4", farmId: "f3", nitrogen: 190, phosphorus: 28, potassium: 250, pH: 7.5, organicCarbon: 0.82, moisture: 40, date: "2026-08-20" },
  { id: "s5", farmId: "f4", nitrogen: 350, phosphorus: 12, potassium: 180, pH: 6.3, organicCarbon: 0.45, moisture: 22, date: "2026-09-10" },
  { id: "s6", farmId: "f5", nitrogen: 220, phosphorus: 30, potassium: 200, pH: 6.0, organicCarbon: 0.90, moisture: 45, date: "2026-08-28" },
  { id: "s7", farmId: "f1", nitrogen: 240, phosphorus: 20, potassium: 230, pH: 6.9, organicCarbon: 0.70, moisture: 36, date: "2026-05-10" },
  { id: "s8", farmId: "f2", nitrogen: 290, phosphorus: 17, potassium: 200, pH: 7.0, organicCarbon: 0.58, moisture: 30, date: "2026-05-15" },
  { id: "s9", farmId: "f3", nitrogen: 210, phosphorus: 25, potassium: 240, pH: 7.4, organicCarbon: 0.80, moisture: 38, date: "2026-06-01" },
  { id: "s10", farmId: "f4", nitrogen: 330, phosphorus: 14, potassium: 170, pH: 6.4, organicCarbon: 0.48, moisture: 24, date: "2026-06-20" },
];

export const mockCrops: Crop[] = [
  { id: "c1", farmId: "f1", cropName: "Rice", variety: "Pusa Basmati 1121", plantingDate: "2026-06-15", growthStage: "Tillering", expectedHarvest: "2026-11-15", area: 3, healthStatus: "good" },
  { id: "c2", farmId: "f1", cropName: "Wheat", variety: "HD 3086", plantingDate: "2026-01-10", growthStage: "Heading", expectedHarvest: "2026-04-20", area: 2, healthStatus: "excellent" },
  { id: "c3", farmId: "f2", cropName: "Maize", variety: "DHM 117", plantingDate: "2026-07-01", growthStage: "Vegetative", expectedHarvest: "2026-10-15", area: 4, healthStatus: "good" },
  { id: "c4", farmId: "f3", cropName: "Cotton", variety: "Bt Cotton BGII", plantingDate: "2026-05-20", growthStage: "Flowering", expectedHarvest: "2026-11-30", area: 5, healthStatus: "fair" },
  { id: "c5", farmId: "f4", cropName: "Tomato", variety: "Arka Rakshak", plantingDate: "2026-08-01", growthStage: "Fruiting", expectedHarvest: "2026-11-01", area: 2, healthStatus: "good" },
  { id: "c6", farmId: "f5", cropName: "Sugarcane", variety: "Co 86032", plantingDate: "2026-02-15", growthStage: "Grand Growth", expectedHarvest: "2027-01-15", area: 4, healthStatus: "excellent" },
  { id: "c7", farmId: "f3", cropName: "Soybean", variety: "JS 335", plantingDate: "2026-06-20", growthStage: "Pod Filling", expectedHarvest: "2026-10-10", area: 3, healthStatus: "good" },
  { id: "c8", farmId: "f5", cropName: "Groundnut", variety: "TG 37A", plantingDate: "2026-07-10", growthStage: "Pegging", expectedHarvest: "2026-10-30", area: 2, healthStatus: "fair" },
];

export const mockFertilizers: Fertilizer[] = [
  { id: "fert1", name: "Urea", npkRatio: "46-0-0", description: "High nitrogen fertilizer ideal for vegetative growth stages. Quick-release formula for rapid green-up.", suitableCrops: ["Rice", "Wheat", "Maize", "Sugarcane"], nutrientContent: { n: 46, p: 0, k: 0 }, applicationMethod: "Broadcast or side-dress application, incorporate into soil", recommendedUsage: "50-200 kg/hectare depending on crop and soil test" },
  { id: "fert2", name: "DAP", npkRatio: "18-46-0", description: "Di-Ammonium Phosphate — excellent phosphorus source for root development and flowering.", suitableCrops: ["Wheat", "Rice", "Maize", "Cotton", "Soybean"], nutrientContent: { n: 18, p: 46, k: 0 }, applicationMethod: "Band placement below and to the side of seed at planting", recommendedUsage: "100-250 kg/hectare as basal application" },
  { id: "fert3", name: "MOP (Muriate of Potash)", npkRatio: "0-0-60", description: "Potassium chloride for fruit quality, disease resistance, and water regulation.", suitableCrops: ["Rice", "Potato", "Sugarcane", "Tomato", "Groundnut"], nutrientContent: { n: 0, p: 0, k: 60 }, applicationMethod: "Broadcast before planting or side-dress during growth", recommendedUsage: "50-150 kg/hectare depending on crop needs" },
  { id: "fert4", name: "NPK 10-26-26", npkRatio: "10-26-26", description: "Balanced complex fertilizer with emphasis on phosphorus and potassium. Ideal for transplanting and early growth.", suitableCrops: ["Rice", "Tomato", "Potato", "Sugarcane"], nutrientContent: { n: 10, p: 26, k: 26 }, applicationMethod: "Broadcast and incorporate, or band placement", recommendedUsage: "100-200 kg/hectare as basal or top-dress" },
  { id: "fert5", name: "NPK 20-20-20", npkRatio: "20-20-20", description: "Balanced water-soluble fertilizer suitable for all growth stages. Excellent for fertigation.", suitableCrops: ["Tomato", "Potato", "Maize", "Cotton", "Soybean"], nutrientContent: { n: 20, p: 20, k: 20 }, applicationMethod: "Dissolve in water for fertigation or foliar spray", recommendedUsage: "2-5 kg per 1000L water for fertigation" },
  { id: "fert6", name: "SSP (Single Super Phosphate)", npkRatio: "0-16-0", description: "Phosphorus fertilizer with calcium and sulfur. Good for soils deficient in secondary nutrients.", suitableCrops: ["Wheat", "Rice", "Groundnut", "Soybean"], nutrientContent: { n: 0, p: 16, k: 0 }, applicationMethod: "Broadcast before planting and incorporate", recommendedUsage: "200-400 kg/hectare as basal application" },
  { id: "fert7", name: "NPK 12-32-16", npkRatio: "12-32-16", description: "High phosphorus complex for root establishment and early growth promotion.", suitableCrops: ["Rice", "Wheat", "Maize", "Cotton"], nutrientContent: { n: 12, p: 32, k: 16 }, applicationMethod: "Band placement at planting time", recommendedUsage: "100-200 kg/hectare as basal dose" },
  { id: "fert8", name: "Calcium Nitrate", npkRatio: "15.5-0-0", description: "Quick-acting nitrogen source with calcium. Prevents blossom-end rot in fruits.", suitableCrops: ["Tomato", "Potato", "Sugarcane", "Maize"], nutrientContent: { n: 15.5, p: 0, k: 0 }, applicationMethod: "Top-dress application or fertigation", recommendedUsage: "100-200 kg/hectare in split doses" },
  { id: "fert9", name: "Zinc Sulphate", npkRatio: "0-0-0+Zn", description: "Micronutrient fertilizer for zinc-deficient soils. Essential for enzyme activation.", suitableCrops: ["Rice", "Maize", "Wheat", "Cotton"], nutrientContent: { n: 0, p: 0, k: 0 }, applicationMethod: "Soil application or foliar spray (0.5%)", recommendedUsage: "10-25 kg/hectare soil application" },
  { id: "fert10", name: "NPK 13-40-13", npkRatio: "13-40-13", description: "Starter fertilizer with very high phosphorus for transplant shock recovery and root growth.", suitableCrops: ["Tomato", "Rice", "Cotton", "Maize"], nutrientContent: { n: 13, p: 40, k: 13 }, applicationMethod: "Dissolve in water for drip application or band placement", recommendedUsage: "50-100 kg/hectare at transplanting" },
];

export const mockWeatherForecast: WeatherForecast[] = [
  { date: "2026-09-21", day: "Today", tempHigh: 33, tempLow: 24, condition: "Partly Cloudy", rainProbability: 15, humidity: 68, windSpeed: 12 },
  { date: "2026-09-22", day: "Tuesday", tempHigh: 31, tempLow: 23, condition: "Cloudy", rainProbability: 45, humidity: 72, windSpeed: 15 },
  { date: "2026-09-23", day: "Wednesday", tempHigh: 29, tempLow: 22, condition: "Light Rain", rainProbability: 70, humidity: 80, windSpeed: 18 },
  { date: "2026-09-24", day: "Thursday", tempHigh: 28, tempLow: 21, condition: "Rain", rainProbability: 85, humidity: 85, windSpeed: 20 },
  { date: "2026-09-25", day: "Friday", tempHigh: 30, tempLow: 22, condition: "Partly Cloudy", rainProbability: 30, humidity: 70, windSpeed: 14 },
  { date: "2026-09-26", day: "Saturday", tempHigh: 32, tempLow: 23, condition: "Sunny", rainProbability: 10, humidity: 62, windSpeed: 10 },
  { date: "2026-09-27", day: "Sunday", tempHigh: 34, tempLow: 24, condition: "Sunny", rainProbability: 5, humidity: 58, windSpeed: 8 },
];

export const mockWeather: WeatherRecord = {
  id: "w1",
  location: "Ludhiana, Punjab",
  temperature: 31,
  humidity: 68,
  rainfall: 2.5,
  rainProbability: 15,
  windSpeed: 12,
  condition: "Partly Cloudy",
  date: "2026-09-21",
  forecast: mockWeatherForecast,
};

export const mockRecommendations: Recommendation[] = [
  { id: "r1", farmId: "f1", cropId: "c1", fertilizerId: "fert4", quantity: 125, unit: "kg/hectare", applicationSchedule: ["60 kg/hectare at transplanting", "65 kg/hectare at active tillering"], reasoning: ["Soil phosphorus is below optimal range", "Crop requires increased phosphorus during tillering", "Current potassium level is sufficient", "Weather conditions are suitable for application"], soilCondition: ["Moderate Nitrogen", "Low Phosphorus", "Optimal Potassium"], createdAt: "2026-09-15", status: "active", growthStage: "Tillering", cropName: "Rice", farmName: "Green Valley Farm", fertilizerName: "NPK 10-26-26" },
  { id: "r2", farmId: "f2", cropId: "c3", fertilizerId: "fert5", quantity: 150, unit: "kg/hectare", applicationSchedule: ["75 kg/hectare at knee-high stage", "75 kg/hectare at pre-tasseling"], reasoning: ["Balanced nutrition needed for vegetative growth", "Soil nitrogen is adequate", "Potassium slightly low for maize demands"], soilCondition: ["Good Nitrogen", "Moderate Phosphorus", "Low Potassium"], createdAt: "2026-09-10", status: "active", growthStage: "Vegetative", cropName: "Maize", farmName: "River Side Plot", fertilizerName: "NPK 20-20-20" },
  { id: "r3", farmId: "f3", cropId: "c4", fertilizerId: "fert2", quantity: 200, unit: "kg/hectare", applicationSchedule: ["100 kg/hectare at flowering start", "100 kg/hectare at peak flowering"], reasoning: ["Phosphorus critical during cotton flowering", "Soil pH is slightly high — DAP helps adjust", "Boron may be needed as supplement"], soilCondition: ["Low Nitrogen", "Moderate Phosphorus", "Good Potassium"], createdAt: "2026-09-05", status: "active", growthStage: "Flowering", cropName: "Cotton", farmName: "Sunrise Fields", fertilizerName: "DAP" },
  { id: "r4", farmId: "f4", cropId: "c5", fertilizerId: "fert5", quantity: 100, unit: "kg/hectare", applicationSchedule: ["50 kg/hectare via fertigation weekly"], reasoning: ["Tomato in fruiting stage needs balanced nutrition", "Calcium supplement recommended", "Fertigation ideal for sandy loam soil"], soilCondition: ["High Nitrogen", "Low Phosphorus", "Low Potassium"], createdAt: "2026-09-01", status: "active", growthStage: "Fruiting", cropName: "Tomato", farmName: "Patel Agro Farm", fertilizerName: "NPK 20-20-20" },
  { id: "r5", farmId: "f5", cropId: "c6", fertilizerId: "fert1", quantity: 180, unit: "kg/hectare", applicationSchedule: ["60 kg/hectare every 45 days"], reasoning: ["Sugarcane in grand growth needs heavy nitrogen", "Soil organic carbon is excellent", "Split application prevents leaching"], soilCondition: ["Moderate Nitrogen", "Good Phosphorus", "Moderate Potassium"], createdAt: "2026-08-25", status: "active", growthStage: "Grand Growth", cropName: "Sugarcane", farmName: "Devi Organic Farm", fertilizerName: "Urea" },
  { id: "r6", farmId: "f1", cropId: "c2", fertilizerId: "fert1", quantity: 100, unit: "kg/hectare", applicationSchedule: ["50 kg/hectare at crown root initiation", "50 kg/hectare at boot stage"], reasoning: ["Wheat heading stage requires nitrogen boost", "Soil moisture is adequate"], soilCondition: ["Moderate Nitrogen", "Good Phosphorus", "Good Potassium"], createdAt: "2026-03-10", status: "completed", growthStage: "Heading", cropName: "Wheat", farmName: "Green Valley Farm", fertilizerName: "Urea" },
  { id: "r7", farmId: "f3", cropId: "c7", fertilizerId: "fert3", quantity: 80, unit: "kg/hectare", applicationSchedule: ["40 kg/hectare at pegging", "40 kg/hectare at pod development"], reasoning: ["Potassium essential for pod filling", "Soil potassium adequate but soybean demand is high"], soilCondition: ["Good Nitrogen", "Good Phosphorus", "Moderate Potassium"], createdAt: "2026-08-15", status: "completed", growthStage: "Pod Filling", cropName: "Soybean", farmName: "Sunrise Fields", fertilizerName: "MOP (Muriate of Potash)" },
  { id: "r8", farmId: "f2", cropId: "c3", fertilizerId: "fert7", quantity: 175, unit: "kg/hectare", applicationSchedule: ["175 kg/hectare at planting as basal"], reasoning: ["Maize needs strong root establishment", "High phosphorus formula supports early growth"], soilCondition: ["Good Nitrogen", "Moderate Phosphorus", "Low Potassium"], createdAt: "2026-07-01", status: "completed", growthStage: "Planting", cropName: "Maize", farmName: "River Side Plot", fertilizerName: "NPK 12-32-16" },
  { id: "r9", farmId: "f5", cropId: "c8", fertilizerId: "fert6", quantity: 250, unit: "kg/hectare", applicationSchedule: ["250 kg/hectare before sowing"], reasoning: ["Groundnut needs phosphorus and calcium", "SSP provides both P and Ca for pod development"], soilCondition: ["Moderate Nitrogen", "Good Phosphorus", "Moderate Potassium"], createdAt: "2026-07-10", status: "completed", growthStage: "Planting", cropName: "Groundnut", farmName: "Devi Organic Farm", fertilizerName: "SSP (Single Super Phosphate)" },
  { id: "r10", farmId: "f4", cropId: "c5", fertilizerId: "fert10", quantity: 75, unit: "kg/hectare", applicationSchedule: ["75 kg/hectare at transplanting"], reasoning: ["High phosphorus starter for transplant shock recovery", "Tomato seedlings need quick root establishment"], soilCondition: ["High Nitrogen", "Low Phosphorus", "Low Potassium"], createdAt: "2026-08-01", status: "completed", growthStage: "Transplanting", cropName: "Tomato", farmName: "Patel Agro Farm", fertilizerName: "NPK 13-40-13" },
];

export const cropGrowthData = [
  { week: "Week 1", height: 5, health: 70 },
  { week: "Week 2", height: 12, health: 75 },
  { week: "Week 3", height: 22, health: 78 },
  { week: "Week 4", height: 35, health: 82 },
  { week: "Week 5", height: 48, health: 80 },
  { week: "Week 6", height: 58, health: 85 },
  { week: "Week 7", height: 68, health: 88 },
  { week: "Week 8", height: 75, health: 90 },
  { week: "Week 9", height: 82, health: 87 },
  { week: "Week 10", height: 88, health: 92 },
  { week: "Week 11", height: 92, health: 90 },
  { week: "Week 12", height: 95, health: 93 },
];

export const analyticsData = {
  fertilizerUsage: [
    { month: "Apr", urea: 450, dap: 200, npk: 300, mop: 100 },
    { month: "May", urea: 380, dap: 250, npk: 350, mop: 120 },
    { month: "Jun", urea: 500, dap: 180, npk: 280, mop: 90 },
    { month: "Jul", urea: 420, dap: 300, npk: 400, mop: 150 },
    { month: "Aug", urea: 550, dap: 220, npk: 320, mop: 110 },
    { month: "Sep", urea: 480, dap: 260, npk: 380, mop: 130 },
  ],
  soilTrends: [
    { month: "Apr", nitrogen: 250, phosphorus: 20, potassium: 210, pH: 6.7 },
    { month: "May", nitrogen: 265, phosphorus: 19, potassium: 215, pH: 6.8 },
    { month: "Jun", nitrogen: 240, phosphorus: 22, potassium: 205, pH: 6.6 },
    { month: "Jul", nitrogen: 280, phosphorus: 18, potassium: 220, pH: 6.9 },
    { month: "Aug", nitrogen: 270, phosphorus: 21, potassium: 218, pH: 6.8 },
    { month: "Sep", nitrogen: 290, phosphorus: 17, potassium: 225, pH: 6.7 },
  ],
  cropDistribution: [
    { name: "Rice", value: 30, fill: "var(--chart-1)" },
    { name: "Wheat", value: 22, fill: "var(--chart-2)" },
    { name: "Maize", value: 18, fill: "var(--chart-3)" },
    { name: "Cotton", value: 12, fill: "var(--chart-4)" },
    { name: "Sugarcane", value: 10, fill: "var(--chart-5)" },
    { name: "Others", value: 8, fill: "var(--chart-1)" },
  ],
  monthlyProductivity: [
    { month: "Apr", yield: 3.2, target: 3.5 },
    { month: "May", yield: 3.4, target: 3.5 },
    { month: "Jun", yield: 3.1, target: 3.6 },
    { month: "Jul", yield: 3.6, target: 3.6 },
    { month: "Aug", yield: 3.8, target: 3.7 },
    { month: "Sep", yield: 3.9, target: 3.8 },
  ],
};

export const cropOptions = ["Rice", "Wheat", "Maize", "Cotton", "Tomato", "Groundnut", "Soybean", "Sugarcane"];

export const growthStages: Record<string, string[]> = {
  Rice: ["Seedling", "Tillering", "Panicle Initiation", "Flowering", "Grain Filling", "Maturity"],
  Wheat: ["Germination", "Tillering", "Jointing", "Heading", "Grain Filling", "Maturity"],
  Maize: ["Germination", "Vegetative", "Knee-High", "Tasseling", "Grain Filling", "Maturity"],
  Cotton: ["Germination", "Seedling", "Vegetative", "Flowering", "Boll Development", "Maturity"],
  Tomato: ["Seedling", "Vegetative", "Flowering", "Fruiting", "Ripening", "Harvest"],
  Groundnut: ["Germination", "Seedling", "Flowering", "Pegging", "Pod Development", "Maturity"],
  Soybean: ["Germination", "Vegetative", "Flowering", "Pod Filling", "Seed Development", "Maturity"],
  Sugarcane: ["Germination", "Tillering", "Grand Growth", "Maturity", "Ripening", "Harvest"],
};

export const soilTypes = ["Alluvial", "Black Cotton", "Red Soil", "Laterite", "Sandy", "Loamy", "Clayey", "Sandy Loam"];
