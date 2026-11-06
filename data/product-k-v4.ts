export interface PitchVariantSpec {
  id: string;
  name: string;
  pixelPitchMm: number;
  pixelDensityDotsM2: number;
  ledType: string;
  brightnessNits: number;
  refreshRateHz: number;
  grayscaleBit: number;
  contrastRatio: string;
  viewingAngle: string;
  maxPowerW: number;
  avgPowerW: number;
  ipRating: string;
  weightKgPanel: number;
  serviceType: string;
}

export interface CabinetSizeOption {
  widthMm: number;
  heightMm: number;
  depthMm: number;
  weightKg: number;
  aspectRatio: string;
  description: string;
}

export interface ApplicationScenario {
  id: string;
  title: string;
  category: string;
  description: string;
  recommendedPitch: string;
  image: string;
  highlights: string[];
}

export interface DownloadItem {
  title: string;
  fileType: string;
  fileSize: string;
  description: string;
  url: string;
}

export const K_V4_PRODUCT_DATA = {
  id: 'k-v4-series',
  name: 'LUMERA K V4 SERIES',
  subtitle: 'Fast-Install Commercial Indoor LED Display System',
  tagline: 'Ultra-slim 39.5 mm profile. 7,680 Hz cinema refresh. UL94V-0 certified flame retardancy.',
  overview:
    'Engineered for high-impact commercial spaces, corporate canvases, luxury retail flagships, and transit terminals. The LUMERA K V4 Series merges architectural elegance with ultra-slim 39.5 mm engineering, camera-friendly 7,680 Hz refresh rates, and modular multi-size cabinet splicing for limitless creative configurations.',

  keyMetrics: [
    { label: 'Cabinet Depth', value: '39.5 mm', subtext: 'Ultra-thin profile' },
    { label: 'Refresh Rate', value: '7,680 Hz', subtext: 'Flicker-free visual capture' },
    { label: 'Grayscale Depth', value: '16-Bit', subtext: '281 trillion color layers' },
    { label: 'Fire Safety', value: 'UL94V-0', subtext: 'Highest grade flame retardant' },
    { label: 'Pixel Pitch', value: '1.56 – 3.9 mm', subtext: 'High-density micro-pitch' },
    { label: 'Cabinet Options', value: '3 Sizes', subtext: 'Flexible modular splicing' },
  ],

  cabinetSizes: [
    {
      widthMm: 500,
      heightMm: 1000,
      depthMm: 39.5,
      weightKg: 8.5,
      aspectRatio: '1:2',
      description: 'Standard primary vertical building block for rapid large-format video wall assembly.',
    },
    {
      widthMm: 250,
      heightMm: 750,
      depthMm: 39.5,
      weightKg: 4.8,
      aspectRatio: '1:3',
      description: 'Architectural intermediate sizing for custom column wraps, header bands, and height trimming.',
    },
    {
      widthMm: 250,
      heightMm: 500,
      depthMm: 39.5,
      weightKg: 3.4,
      aspectRatio: '1:2',
      description: 'Compact precision block for 90° corner transitions, curved facets, and bespoke geometries.',
    },
  ] as CabinetSizeOption[],

  variants: [
    {
      id: 'k1-5',
      name: 'K1.5 V4',
      pixelPitchMm: 1.56,
      pixelDensityDotsM2: 409600,
      ledType: 'SMD 3-in-1 Black Matrix',
      brightnessNits: 800,
      refreshRateHz: 7680,
      grayscaleBit: 16,
      contrastRatio: '5,000:1',
      viewingAngle: '160° (H) / 140° (V)',
      maxPowerW: 580,
      avgPowerW: 195,
      ipRating: 'IP40 Front / IP30 Rear',
      weightKgPanel: 8.5,
      serviceType: 'Full Front & Rear Magnetic Access',
    },
    {
      id: 'k1-8',
      name: 'K1.8 V4',
      pixelPitchMm: 1.89,
      pixelDensityDotsM2: 279841,
      ledType: 'SMD 3-in-1 Black Matrix',
      brightnessNits: 1000,
      refreshRateHz: 7680,
      grayscaleBit: 16,
      contrastRatio: '5,000:1',
      viewingAngle: '160° (H) / 140° (V)',
      maxPowerW: 600,
      avgPowerW: 200,
      ipRating: 'IP40 Front / IP30 Rear',
      weightKgPanel: 8.5,
      serviceType: 'Full Front & Rear Magnetic Access',
    },
    {
      id: 'k2-5',
      name: 'K2.5 V4',
      pixelPitchMm: 2.50,
      pixelDensityDotsM2: 160000,
      ledType: 'SMD 3-in-1 Black Matrix',
      brightnessNits: 1200,
      refreshRateHz: 7680,
      grayscaleBit: 16,
      contrastRatio: '4,500:1',
      viewingAngle: '160° (H) / 140° (V)',
      maxPowerW: 620,
      avgPowerW: 210,
      ipRating: 'IP40 Front / IP30 Rear',
      weightKgPanel: 8.3,
      serviceType: 'Full Front & Rear Magnetic Access',
    },
    {
      id: 'k3-9',
      name: 'K3.9 V4',
      pixelPitchMm: 3.91,
      pixelDensityDotsM2: 65536,
      ledType: 'SMD 3-in-1 High-Efficiency',
      brightnessNits: 1500,
      refreshRateHz: 7680,
      grayscaleBit: 16,
      contrastRatio: '4,000:1',
      viewingAngle: '160° (H) / 140° (V)',
      maxPowerW: 640,
      avgPowerW: 215,
      ipRating: 'IP40 Front / IP30 Rear',
      weightKgPanel: 8.2,
      serviceType: 'Full Front & Rear Magnetic Access',
    },
  ] as PitchVariantSpec[],

  applications: [
    {
      id: 'retail',
      title: 'Luxury Retail & Flagship Boutiques',
      category: 'Commercial Retail',
      description:
        'Sunlight-resilient micro-pitch displays that attract foot traffic, elevate brand prestige, and showcase jewelry, fashion, and haute couture with microscopic clarity.',
      recommendedPitch: 'K1.5 V4 (1.56mm) / K1.8 V4 (1.89mm)',
      image: '/images/retail-space.png',
      highlights: [
        'Flicker-free on customer smartphones',
        'Ultra-thin flush wall mount preserves retail floor space',
        'Color-matched high CRI diode reproduction',
      ],
    },
    {
      id: 'corporate',
      title: 'Corporate Atriums & Executive Boardrooms',
      category: 'Corporate Environments',
      description:
        'Monumental visual canvases for multinational headquarters, investor presentation centers, and interactive experiential lobbies that convey vision and scale.',
      recommendedPitch: 'K1.5 V4 (1.56mm) / K1.8 V4 (1.89mm)',
      image: '/images/about-hero.jpg',
      highlights: [
        'Whisper-quiet fanless cooling',
        '16-bit depth for corporate keynote slides & financial charts',
        'Dual power & signal redundancy',
      ],
    },
    {
      id: 'transit',
      title: 'Airports & Transportation Terminals',
      category: 'Transit Hubs',
      description:
        'High-reliability 24/7 passenger information, digital arrival hubs, and dynamic out-of-home advertising walls engineered for demanding transport environments.',
      recommendedPitch: 'K2.5 V4 (2.50mm) / K3.9 V4 (3.91mm)',
      image: '/images/mall-screen.png',
      highlights: [
        'Certified UL94V-0 fire retardancy compliance',
        'High contrast under bright terminal daylight',
        'Front & rear quick maintenance',
      ],
    },
    {
      id: 'studio',
      title: 'Broadcast Lobbies & Experiential Venues',
      category: 'Virtual & Media Stages',
      description:
        'Zero-latency background canvases designed for broadcast live remotes, television interview backdrops, and immersive VIP experiential suites.',
      recommendedPitch: 'K1.5 V4 (1.56mm) / K1.8 V4 (1.89mm)',
      image: '/images/event-screen.png',
      highlights: [
        '7,680 Hz cinema refresh rate',
        'Zero moiré scan lines under professional cameras',
        'Seamless 90° corner wrapping',
      ],
    },
  ] as ApplicationScenario[],

  downloads: [
    {
      title: 'LUMERA K V4 Series - Technical Specification Sheet',
      fileType: 'PDF',
      fileSize: '3.8 MB',
      description: 'Full optical, mechanical, and electrical parameters across K1.5, K1.8, K2.5, and K3.9 variants.',
      url: '#download-spec',
    },
    {
      title: 'CAD & BIM Architectural Drawings (2D / 3D)',
      fileType: 'DWG / RVT',
      fileSize: '14.2 MB',
      description: 'Architectural framing, load calculations, power drop requirements, and mounting bracket details.',
      url: '#download-cad',
    },
    {
      title: 'Installation, Rigging & Maintenance Manual',
      fileType: 'PDF',
      fileSize: '7.1 MB',
      description: 'Step-by-step assembly instructions, magnetic front service guide, and calibration workflow.',
      url: '#download-manual',
    },
    {
      title: 'UL94V-0 Fire Safety & Compliance Certificates',
      fileType: 'PDF',
      fileSize: '1.9 MB',
      description: 'Official laboratory compliance documents for UL94V-0, CE, FCC, ETL, and RoHS standards.',
      url: '#download-cert',
    },
  ] as DownloadItem[],
};
