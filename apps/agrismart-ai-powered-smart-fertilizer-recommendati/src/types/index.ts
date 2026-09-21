export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  role: "farmer" | "admin";
  location: string;
  farmSize?: number;
  avatar?: string;
}

export interface Farm {
  id: string;
  userId: string;
  farmName: string;
  location: string;
  area: number;
  soilType: string;
}

export interface SoilRecord {
  id: string;
  farmId: string;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  pH: number;
  organicCarbon: number;
  moisture: number;
  date: string;
}

export interface Crop {
  id: string;
  farmId: string;
  cropName: string;
  variety: string;
  plantingDate: string;
  growthStage: string;
  expectedHarvest: string;
  area: number;
  healthStatus: "excellent" | "good" | "fair" | "poor";
}

export interface Fertilizer {
  id: string;
  name: string;
  npkRatio: string;
  description: string;
  suitableCrops: string[];
  nutrientContent: { n: number; p: number; k: number };
  applicationMethod: string;
  recommendedUsage: string;
}

export interface Recommendation {
  id: string;
  farmId: string;
  cropId: string;
  fertilizerId: string;
  quantity: number;
  unit: string;
  applicationSchedule: string[];
  reasoning: string[];
  soilCondition: string[];
  createdAt: string;
  status: "active" | "completed" | "cancelled";
  growthStage: string;
  cropName: string;
  farmName: string;
  fertilizerName: string;
}

export interface WeatherRecord {
  id: string;
  location: string;
  temperature: number;
  humidity: number;
  rainfall: number;
  rainProbability: number;
  windSpeed: number;
  condition: string;
  date: string;
  forecast?: WeatherForecast[];
}

export interface WeatherForecast {
  date: string;
  day: string;
  tempHigh: number;
  tempLow: number;
  condition: string;
  rainProbability: number;
  humidity: number;
  windSpeed: number;
}

export interface RecommendationFormData {
  farmName: string;
  location: string;
  farmSize: number;
  soilType: string;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  pH: number;
  organicCarbon: number;
  moisture: number;
  cropType: string;
  cropVariety: string;
  growthStage: string;
  plantingDate: string;
  expectedHarvest: string;
  temperature: number;
  humidity: number;
  rainfall: number;
  rainProbability: number;
}

export interface RecommendationResult {
  crop: string;
  growthStage: string;
  soilCondition: string[];
  fertilizer: string;
  npkRatio: string;
  quantity: number;
  unit: string;
  schedule: { dose: number; timing: string }[];
  timing: string;
  reasoning: string[];
  precautions: string[];
  nutrientComparison: { nutrient: string; current: number; optimal: number; status: string }[];
}
