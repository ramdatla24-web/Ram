import type { RecommendationFormData, RecommendationResult } from "@/types";
import { mockFertilizers } from "@/data/mockData";

const optimalRanges = {
  nitrogen: { low: 200, high: 350, unit: "kg/ha" },
  phosphorus: { low: 20, high: 40, unit: "kg/ha" },
  potassium: { low: 200, high: 300, unit: "kg/ha" },
  pH: { low: 6.0, high: 7.5, unit: "" },
  organicCarbon: { low: 0.5, high: 0.8, unit: "%" },
  moisture: { low: 25, high: 40, unit: "%" },
};

function getStatus(value: number, low: number, high: number): string {
  if (value < low * 0.7) return "Very Low";
  if (value < low) return "Low";
  if (value <= high) return "Optimal";
  if (value <= high * 1.3) return "High";
  return "Very High";
}

export function generateRecommendation(data: RecommendationFormData): RecommendationResult {
  const nStatus = getStatus(data.nitrogen, optimalRanges.nitrogen.low, optimalRanges.nitrogen.high);
  const pStatus = getStatus(data.phosphorus, optimalRanges.phosphorus.low, optimalRanges.phosphorus.high);
  const kStatus = getStatus(data.potassium, optimalRanges.potassium.low, optimalRanges.potassium.high);
  const phStatus = getStatus(data.pH, optimalRanges.pH.low, optimalRanges.pH.high);

  const soilCondition: string[] = [];
  soilCondition.push(`${nStatus} Nitrogen`);
  soilCondition.push(`${pStatus} Phosphorus`);
  soilCondition.push(`${kStatus} Potassium`);
  if (phStatus !== "Optimal") soilCondition.push(`${phStatus} pH (${data.pH})`);

  const reasoning: string[] = [];
  const precautions: string[] = [];

  // Determine nutrient needs based on crop and growth stage
  let nNeed = 0, pNeed = 0, kNeed = 0;

  // Crop-specific base requirements
  const cropNeeds: Record<string, { n: number; p: number; k: number }> = {
    Rice: { n: 120, p: 60, k: 60 },
    Wheat: { n: 100, p: 50, k: 40 },
    Maize: { n: 140, p: 60, k: 60 },
    Cotton: { n: 120, p: 60, k: 50 },
    Tomato: { n: 150, p: 80, k: 100 },
    Groundnut: { n: 40, p: 60, k: 60 },
    Soybean: { n: 30, p: 50, k: 50 },
    Sugarcane: { n: 200, p: 80, k: 100 },
  };

  const base = cropNeeds[data.cropType] || { n: 100, p: 60, k: 60 };

  // Growth stage multiplier
  const stageMultiplier: Record<string, { n: number; p: number; k: number }> = {
    Seedling: { n: 0.3, p: 0.5, k: 0.3 },
    Germination: { n: 0.2, p: 0.4, k: 0.2 },
    Tillering: { n: 0.7, p: 0.8, k: 0.6 },
    Vegetative: { n: 0.8, p: 0.6, k: 0.7 },
    "Knee-High": { n: 0.7, p: 0.6, k: 0.7 },
    Jointing: { n: 0.7, p: 0.6, k: 0.6 },
    "Panicle Initiation": { n: 0.8, p: 0.7, k: 0.8 },
    Flowering: { n: 0.6, p: 0.9, k: 0.8 },
    Fruiting: { n: 0.5, p: 0.7, k: 1.0 },
    "Boll Development": { n: 0.4, p: 0.6, k: 0.9 },
    "Pod Filling": { n: 0.4, p: 0.6, k: 0.9 },
    Pegging: { n: 0.5, p: 0.8, k: 0.7 },
    "Pod Development": { n: 0.4, p: 0.7, k: 0.8 },
    "Grain Filling": { n: 0.5, p: 0.5, k: 0.8 },
    "Grand Growth": { n: 0.9, p: 0.7, k: 0.8 },
    "Seed Development": { n: 0.4, p: 0.5, k: 0.7 },
    Ripening: { n: 0.2, p: 0.3, k: 0.4 },
    Maturity: { n: 0.1, p: 0.2, k: 0.3 },
    Harvest: { n: 0.0, p: 0.1, k: 0.1 },
    Transplanting: { n: 0.4, p: 0.9, k: 0.4 },
    Planting: { n: 0.3, p: 0.8, k: 0.3 },
  };

  const mult = stageMultiplier[data.growthStage] || { n: 0.6, p: 0.6, k: 0.6 };
  nNeed = Math.round(base.n * mult.n);
  pNeed = Math.round(base.p * mult.p);
  kNeed = Math.round(base.k * mult.k);

  // Adjust based on soil status
  if (nStatus === "Low" || nStatus === "Very Low") {
    nNeed = Math.round(nNeed * 1.3);
    reasoning.push(`Soil nitrogen is ${nStatus.toLowerCase()} — increasing nitrogen supply`);
  } else if (nStatus === "Optimal") {
    reasoning.push("Soil nitrogen is at optimal level");
  } else {
    nNeed = Math.round(nNeed * 0.8);
    reasoning.push("Soil nitrogen is above optimal — reducing nitrogen application");
  }

  if (pStatus === "Low" || pStatus === "Very Low") {
    pNeed = Math.round(pNeed * 1.4);
    reasoning.push(`Soil phosphorus is ${pStatus.toLowerCase()} — crop requires increased phosphorus during this growth stage`);
  } else if (pStatus === "Optimal") {
    reasoning.push("Current phosphorus level is sufficient");
  } else {
    pNeed = Math.round(pNeed * 0.7);
  }

  if (kStatus === "Low" || kStatus === "Very Low") {
    kNeed = Math.round(kNeed * 1.3);
    reasoning.push(`Soil potassium is ${kStatus.toLowerCase()} — supplementing potassium`);
  } else if (kStatus === "Optimal") {
    reasoning.push("Current potassium level is sufficient");
  }

  // Weather considerations
  if (data.rainProbability > 70) {
    precautions.push("Heavy rainfall expected — delay application or apply just before moderate rain");
    reasoning.push("Weather: significant rainfall expected, timing application accordingly");
  } else if (data.rainProbability > 40) {
    reasoning.push("Moderate rainfall probability — good timing for fertilizer application");
    precautions.push("Apply before expected rainfall or irrigate after application for best absorption");
  } else {
    precautions.push("Low rainfall probability — ensure irrigation is available after application");
  }

  if (data.temperature > 35) {
    precautions.push("High temperature — apply fertilizer during cooler hours (early morning or evening)");
  }

  if (data.moisture < 20) {
    precautions.push("Low soil moisture — irrigate before or immediately after fertilizer application");
    reasoning.push("Soil moisture is low — irrigation needed for nutrient uptake");
  }

  // Select best fertilizer
  let selectedFertilizer = mockFertilizers[0];
  let bestScore = -1;

  for (const fert of mockFertilizers) {
    let score = 0;
    if (nNeed > 0 && fert.nutrientContent.n > 0) score += Math.min(fert.nutrientContent.n / Math.max(nNeed, 1), 1.5) * 30;
    if (pNeed > 0 && fert.nutrientContent.p > 0) score += Math.min(fert.nutrientContent.p / Math.max(pNeed, 1), 1.5) * 40;
    if (kNeed > 0 && fert.nutrientContent.k > 0) score += Math.min(fert.nutrientContent.k / Math.max(kNeed, 1), 1.5) * 30;

    if (fert.suitableCrops.includes(data.cropType)) score += 20;

    if (score > bestScore) {
      bestScore = score;
      selectedFertilizer = fert;
    }
  }

  // Calculate quantity
  const totalNutrientNeed = nNeed + pNeed + kNeed;
  const fertTotalContent = selectedFertilizer.nutrientContent.n + selectedFertilizer.nutrientContent.p + selectedFertilizer.nutrientContent.k;
  let quantity = fertTotalContent > 0 ? Math.round((totalNutrientNeed / fertTotalContent) * 100) / 100 * 100 : 150;
  quantity = Math.max(50, Math.min(300, quantity));

  // Build schedule
  const schedule: { dose: number; timing: string }[] = [];
  if (quantity <= 100) {
    schedule.push({ dose: quantity, timing: `Apply ${quantity} kg/hectare as single application during ${data.growthStage} stage` });
  } else {
    const dose1 = Math.round(quantity * 0.5);
    const dose2 = quantity - dose1;
    schedule.push({ dose: dose1, timing: `First application: ${dose1} kg/hectare at current ${data.growthStage} stage` });
    schedule.push({ dose: dose2, timing: `Second application: ${dose2} kg/hectare at next growth stage` });
  }

  const timing = data.rainProbability > 40
    ? "Apply before expected rainfall for natural incorporation, or irrigate immediately after application."
    : "Apply during early morning hours and irrigate immediately after application for best nutrient uptake.";

  const nutrientComparison = [
    { nutrient: "Nitrogen (N)", current: data.nitrogen, optimal: optimalRanges.nitrogen.low, status: nStatus },
    { nutrient: "Phosphorus (P)", current: data.phosphorus, optimal: optimalRanges.phosphorus.low, status: pStatus },
    { nutrient: "Potassium (K)", current: data.potassium, optimal: optimalRanges.potassium.low, status: kStatus },
    { nutrient: "pH", current: data.pH, optimal: optimalRanges.pH.low, status: phStatus },
    { nutrient: "Organic Carbon", current: data.organicCarbon, optimal: optimalRanges.organicCarbon.low, status: getStatus(data.organicCarbon, optimalRanges.organicCarbon.low, optimalRanges.organicCarbon.high) },
    { nutrient: "Moisture", current: data.moisture, optimal: optimalRanges.moisture.low, status: getStatus(data.moisture, optimalRanges.moisture.low, optimalRanges.moisture.high) },
  ];

  return {
    crop: data.cropType,
    growthStage: data.growthStage,
    soilCondition,
    fertilizer: selectedFertilizer.name,
    npkRatio: selectedFertilizer.npkRatio,
    quantity,
    unit: "kg/hectare",
    schedule,
    timing,
    reasoning,
    precautions,
    nutrientComparison,
  };
}
