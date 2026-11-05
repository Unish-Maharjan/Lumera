export type UnitSystem = "metric" | "imperial";

export type CalculationMode = "grid" | "dimension" | "resolution";

export type AspectRatioLock = "free" | "16:9" | "16:10" | "4:3" | "21:9" | "1:1";

export type ProductCategory =
  | "All"
  | "MicroLED"
  | "Stage & Rental"
  | "Outdoor Commercial"
  | "DOOH Display"
  | "Transparent Glass"
  | "Absen Compatible";

export interface LedPitchVariant {
  pitch: number; // e.g. 1.25, 2.6, 3.91 (mm)
  name: string; // e.g. "P1.25"
  cabWidthMm: number; // e.g. 600 or 500
  cabHeightMm: number; // e.g. 337.5 or 500 or 1000
  cabDepthMm: number; // e.g. 45
  resWidth: number; // e.g. 480
  resHeight: number; // e.g. 270
  weightKg: number; // e.g. 6.8
  maxPowerW: number; // e.g. 180
  avgPowerW: number; // e.g. 60
  brightnessNits: number; // e.g. 800, 1500, 6000, 10000
  refreshRateHz: number; // e.g. 3840, 7680
  ipRating: string; // e.g. "IP30", "IP65/IP54"
  maintenanceAccess: "Front" | "Rear" | "Front & Rear";
}

export interface LedProduct {
  id: string;
  name: string;
  brand: "Lumera" | "Absen Compatible";
  series: string;
  category: ProductCategory;
  description: string;
  badge: string;
  imageSrc: string;
  variants: LedPitchVariant[];
}

export interface ControllerSpec {
  id: string;
  name: string;
  brand: string;
  ports: number;
  maxPixels: number;
  maxPortPixels: number;
  maxInputResolution: string;
  inputs: string;
  description: string;
  recommendedFor: string;
}

export interface CalculationResult {
  // Quantities
  cols: number;
  rows: number;
  totalCabinets: number;
  
  // Physical Dimensions
  widthM: number;
  heightM: number;
  widthFt: number;
  heightFt: number;
  diagonalM: number;
  diagonalFt: number;
  diagonalInches: number;
  areaSqm: number;
  areaSqft: number;
  aspectRatioExact: string;
  aspectRatioNumeric: number;
  closestStandardAspect: string;
  aspectVariancePercent: number;

  // Resolution & Optical
  resWidth: number;
  resHeight: number;
  totalPixels: number;
  megaPixels: number;
  pixelDensitySqm: number;
  minViewingDistM: number;
  minViewingDistFt: number;
  optimalViewingDistM: number;
  optimalViewingDistFt: number;
  retinaViewingDistM: number;
  retinaViewingDistFt: number;

  // Power & Thermal
  maxPowerWatts: number;
  maxPowerKw: number;
  avgPowerWatts: number;
  avgPowerKw: number;
  heatBtuHr: number;
  current110VAmps: number;
  current230VAmps: number;
  current3PhaseAmps: number;
  recommended16ACircuits: number;
  recommended20ACircuits: number;

  // Weight & Rigging
  singleCabinetWeightKg: number;
  singleCabinetWeightLbs: number;
  totalWeightKg: number;
  totalWeightLbs: number;
  weightDensityKgSqm: number;
  weightDensityLbsSqft: number;
  recommendedHangingBars: number;

  // Controller & Data
  minEthernetPorts: number;
  maxCabinetsPerPort: number;
  requiredControllers: number;
  portUtilizationPercent: number;
}

