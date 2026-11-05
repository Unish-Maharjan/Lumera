import { LedPitchVariant, ControllerSpec, CalculationResult } from "../types";

/**
 * Calculates greatest common divisor for aspect ratio simplification
 */
export function gcd(a: number, b: number): number {
  let x = Math.round(Math.abs(a));
  let y = Math.round(Math.abs(b));
  while (y) {
    const t = y;
    y = x % y;
    x = t;
  }
  return x || 1;
}

/**
 * Recognizes common video aspect ratios (16:9, 16:10, 4:3, 21:9, 1:1, 32:9)
 */
export function detectStandardAspectRatio(
  width: number,
  height: number
): { closest: string; variancePercent: number } {
  if (height <= 0 || width <= 0) {
    return { closest: "N/A", variancePercent: 0 };
  }

  const ratio = width / height;

  const standards = [
    { name: "16:9 (Widescreen)", target: 16 / 9 },
    { name: "16:10 (Commercial)", target: 16 / 10 },
    { name: "4:3 (Traditional)", target: 4 / 3 },
    { name: "21:9 (Ultrawide)", target: 21 / 9 },
    { name: "32:9 (Superwide)", target: 32 / 9 },
    { name: "1:1 (Square)", target: 1.0 },
    { name: "9:16 (Portrait)", target: 9 / 16 },
  ];

  let bestMatch = standards[0];
  let minDiff = Math.abs(ratio - bestMatch.target);

  for (const std of standards) {
    const diff = Math.abs(ratio - std.target);
    if (diff < minDiff) {
      minDiff = diff;
      bestMatch = std;
    }
  }

  const variancePercent = Math.round((minDiff / bestMatch.target) * 1000) / 10;
  return {
    closest: bestMatch.name,
    variancePercent,
  };
}

/**
 * Master LED Video Wall Calculation Engine
 */
export function calculateLedWall(
  cols: number,
  rows: number,
  variant: LedPitchVariant,
  controller: ControllerSpec
): CalculationResult {
  // Normalize grid
  const safeCols = Math.max(1, Math.round(cols));
  const safeRows = Math.max(1, Math.round(rows));
  const totalCabinets = safeCols * safeRows;

  // 1. Dimensions (Physical)
  const widthMm = safeCols * variant.cabWidthMm;
  const heightMm = safeRows * variant.cabHeightMm;

  const widthM = Math.round((widthMm / 1000) * 1000) / 1000;
  const heightM = Math.round((heightMm / 1000) * 1000) / 1000;

  const widthFt = Math.round(widthM * 3.28084 * 100) / 100;
  const heightFt = Math.round(heightM * 3.28084 * 100) / 100;

  const diagonalM = Math.round(Math.hypot(widthM, heightM) * 1000) / 1000;
  const diagonalFt = Math.round(diagonalM * 3.28084 * 100) / 100;
  const diagonalInches = Math.round((diagonalM * 1000) / 25.4);

  const areaSqm = Math.round(widthM * heightM * 100) / 100;
  const areaSqft = Math.round(areaSqm * 10.7639 * 10) / 10;

  // Aspect Ratio
  const divisor = gcd(Math.round(widthMm), Math.round(heightMm));
  const simpW = Math.round(widthMm / divisor);
  const simpH = Math.round(heightMm / divisor);
  const aspectRatioExact = `${simpW}:${simpH}`;
  const aspectRatioNumeric = heightM > 0 ? Math.round((widthM / heightM) * 100) / 100 : 1;

  const { closest: closestStandardAspect, variancePercent: aspectVariancePercent } =
    detectStandardAspectRatio(widthMm, heightMm);

  // 2. Resolution & Optical
  const resWidth = safeCols * variant.resWidth;
  const resHeight = safeRows * variant.resHeight;
  const totalPixels = resWidth * resHeight;
  const megaPixels = Math.round((totalPixels / 1000000) * 100) / 100;

  // Pixel Density = 1,000,000 / (pitch * pitch)
  const pixelDensitySqm = Math.round(1000000 / (variant.pitch * variant.pitch));

  // Viewing distances (Human visual acuity model):
  // Min = pitch * 1.0m (pixels start to resolve)
  // Optimal = pitch * 2.0m to 2.5m (comfortable smooth viewing)
  // Retina = pitch * 3.44m (20/20 human eye cannot discern individual pixel grid)
  const minViewingDistM = Math.round(variant.pitch * 1.0 * 10) / 10;
  const minViewingDistFt = Math.round(minViewingDistM * 3.28084 * 10) / 10;

  const optimalViewingDistM = Math.round(variant.pitch * 2.2 * 10) / 10;
  const optimalViewingDistFt = Math.round(optimalViewingDistM * 3.28084 * 10) / 10;

  const retinaViewingDistM = Math.round(variant.pitch * 3.44 * 10) / 10;
  const retinaViewingDistFt = Math.round(retinaViewingDistM * 3.28084 * 10) / 10;

  // 3. Electrical & Power
  const maxPowerWatts = totalCabinets * variant.maxPowerW;
  const maxPowerKw = Math.round((maxPowerWatts / 1000) * 100) / 100;

  const avgPowerWatts = totalCabinets * variant.avgPowerW;
  const avgPowerKw = Math.round((avgPowerWatts / 1000) * 100) / 100;

  // Thermal dissipation: 1 kW = 3412.142 BTU/hr
  const heatBtuHr = Math.round(maxPowerKw * 3412.142);

  // AC Currents
  const current110VAmps = Math.round((maxPowerWatts / 110) * 10) / 10;
  const current230VAmps = Math.round((maxPowerWatts / 230) * 10) / 10;
  // 3-Phase 400V (sqrt(3) * 400V * 0.95 PF)
  const current3PhaseAmps = Math.round((maxPowerWatts / (Math.sqrt(3) * 400 * 0.95)) * 10) / 10;

  // Continuous safety load factor of 80% (16A * 0.8 = 12.8A safe load per breaker)
  const recommended16ACircuits = Math.max(1, Math.ceil(current230VAmps / 12.8));
  const recommended20ACircuits = Math.max(1, Math.ceil(current110VAmps / 16.0));

  // 4. Weight & Rigging
  const singleCabinetWeightKg = variant.weightKg;
  const singleCabinetWeightLbs = Math.round(singleCabinetWeightKg * 2.20462 * 10) / 10;

  const totalWeightKg = Math.round(totalCabinets * singleCabinetWeightKg * 10) / 10;
  const totalWeightLbs = Math.round(totalWeightKg * 2.20462 * 10) / 10;

  const weightDensityKgSqm = areaSqm > 0 ? Math.round((totalWeightKg / areaSqm) * 10) / 10 : 0;
  const weightDensityLbsSqft = areaSqft > 0 ? Math.round((totalWeightLbs / areaSqft) * 10) / 10 : 0;

  // Standard hanging bars: 1 bar covers 1 or 2 columns
  const colsPerBar = variant.cabWidthMm <= 500 ? 2 : 1;
  const recommendedHangingBars = Math.ceil(safeCols / colsPerBar);

  // 5. Controller & Data Routing
  const cabPixels = variant.resWidth * variant.resHeight;
  const portCap = controller.maxPortPixels || 650000;

  // Max cabinets connected in serial daisy chain per port without exceeding capacity
  const maxCabinetsPerPort = Math.max(1, Math.floor(portCap / cabPixels));

  // Minimum ethernet ports required for the entire screen
  const minEthernetPorts = Math.max(1, Math.ceil(totalPixels / portCap));

  // Controllers required
  const requiredControllers = Math.max(1, Math.ceil(minEthernetPorts / controller.ports));

  // Port capacity utilization
  const totalPortCapacity = minEthernetPorts * portCap;
  const portUtilizationPercent =
    totalPortCapacity > 0 ? Math.round((totalPixels / totalPortCapacity) * 100) : 0;

  return {
    cols: safeCols,
    rows: safeRows,
    totalCabinets,
    widthM,
    heightM,
    widthFt,
    heightFt,
    diagonalM,
    diagonalFt,
    diagonalInches,
    areaSqm,
    areaSqft,
    aspectRatioExact,
    aspectRatioNumeric,
    closestStandardAspect,
    aspectVariancePercent,
    resWidth,
    resHeight,
    totalPixels,
    megaPixels,
    pixelDensitySqm,
    minViewingDistM,
    minViewingDistFt,
    optimalViewingDistM,
    optimalViewingDistFt,
    retinaViewingDistM,
    retinaViewingDistFt,
    maxPowerWatts,
    maxPowerKw,
    avgPowerWatts,
    avgPowerKw,
    heatBtuHr,
    current110VAmps,
    current230VAmps,
    current3PhaseAmps,
    recommended16ACircuits,
    recommended20ACircuits,
    singleCabinetWeightKg,
    singleCabinetWeightLbs,
    totalWeightKg,
    totalWeightLbs,
    weightDensityKgSqm,
    weightDensityLbsSqft,
    recommendedHangingBars,
    minEthernetPorts,
    maxCabinetsPerPort,
    requiredControllers,
    portUtilizationPercent,
  };
}

/**
 * Converts target physical dimensions into nearest whole cabinet counts
 */
export function snapDimensionsToCabinets(
  targetWidthM: number,
  targetHeightM: number,
  variant: LedPitchVariant
): { cols: number; rows: number } {
  const cabWidthM = variant.cabWidthMm / 1000;
  const cabHeightM = variant.cabHeightMm / 1000;

  const cols = Math.max(1, Math.round(targetWidthM / cabWidthM));
  const rows = Math.max(1, Math.round(targetHeightM / cabHeightM));

  return { cols, rows };
}

/**
 * Calculates cabinet count needed to meet or exceed target resolution
 */
export function snapResolutionToCabinets(
  targetResW: number,
  targetResH: number,
  variant: LedPitchVariant
): { cols: number; rows: number } {
  const cols = Math.max(1, Math.ceil(targetResW / variant.resWidth));
  const rows = Math.max(1, Math.ceil(targetResH / variant.resHeight));

  return { cols, rows };
}

