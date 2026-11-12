export interface KeyMetric {
  label: string;
  value: string;
  unit?: string;
  description?: string;
}

export interface AnatomyLayer {
  id: number;
  name: string;
  subtitle: string;
  description: string;
  spec: string;
}

export interface ProductFeature {
  id: string;
  kicker: string;
  title: string;
  description: string;
  stat?: string;
  statLabel?: string;
  image?: string;
  diagramType?: "contrast" | "geometry" | "refresh" | "profile";
}

export interface ApplicationItem {
  id: string;
  title: string;
  industry: string;
  description: string;
  image: string;
  highlights: string[];
}

export interface InstallationStep {
  step: string;
  title: string;
  description: string;
  notes: string;
  image: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  pitch: number;
  resW: number;
  resH: number;
  brightness: number;
  contrast: string;
  weightKg: number;
  weightLbs: number;
  maxPowerW: number;
  avgPowerW: number;
  refreshHz: number;
  viewingAngle: string;
  dimensionsMm: string;
  dimensionsIn: string;
}

export interface SpecItem {
  label: string;
  value: string;
  note?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  caption: string;
  image: string;
  tag: string;
}

export interface DownloadItem {
  id: string;
  title: string;
  category: string;
  format: string;
  size: string;
  version: string;
  href: string;
}

export interface ProductDetailData {
  id: string;
  name: string;
  series: string;
  badge: string;
  headline: string;
  subheadline: string;
  description: string;
  heroImage: string;
  heroVideo?: string;
  category: string;
  pitchRange: string;
  keyMetrics: KeyMetric[];
  introduction: {
    title: string;
    subtitle: string;
    paragraphs: string[];
    problemsSolved: Array<{ title: string; desc: string }>;
  };
  features: ProductFeature[];
  anatomy: {
    title: string;
    subtitle: string;
    videoUrl?: string;
    layers: AnatomyLayer[];
  };
  applications: ApplicationItem[];
  installation: {
    preparation: string[];
    steps: InstallationStep[];
  };
  variants: ProductVariant[];
  specs: {
    optical: SpecItem[];
    mechanical: SpecItem[];
    electrical: SpecItem[];
    processing: SpecItem[];
    environmental: SpecItem[];
  };
  gallery: GalleryItem[];
  downloads: DownloadItem[];
}

export const PRODUCT_DETAILS: Record<string, ProductDetailData> = {
  "lumera-matrix": {
    id: "lumera-matrix",
    name: "LUMERA MATRIX",
    series: "Matrix Architectural Series",
    badge: "Flagship MicroLED · 0.93mm – 1.87mm",
    headline: "Pure Void Black. Infinitesimal Precision.",
    subheadline: "The pinnacle of architectural digital canvases, engineered with Flip-Chip COB MicroLEDs, native 16:9 cabinets, and 7,680 Hz cinema scan rates.",
    description: "Engineered specifically for executive corporate boardrooms, mission-critical operations centers, and luxury architectural landmarks. Lumera Matrix merges imperceptibly into monumental spaces with zero visible seams, true 1,000,000:1 contrast, and whisper-silent convection cooling.",
    heroImage: "/products/product-1.webp",
    heroVideo: "/video/led-separation.mp4",
    category: "MicroLED Architectural Display",
    pitchRange: "0.93mm – 1.87mm",
    keyMetrics: [
      { label: "Pixel Pitch", value: "0.93", unit: "mm", description: "Ultra-fine Flip-Chip MicroLED" },
      { label: "Contrast Ratio", value: "1,000,000", unit: ": 1", description: "Nanoscale true void black matrix" },
      { label: "Refresh Rate", value: "7,680", unit: "Hz", description: "Broadcast cinema scan driver" },
      { label: "Cabinet Geometry", value: "16 : 9", unit: "Native", description: "600 × 337.5 mm CNC chassis" },
    ],
    introduction: {
      title: "Where architecture meets absolute zero black.",
      subtitle: "A digital canvas designed not merely to display imagery, but to become an architectural material.",
      paragraphs: [
        "Traditional surface-mount LED displays struggle with ambient room reflections, fragile solder joints, and bulky thermal fans. Lumera Matrix radically departs from conventional display design by integrating Flip-Chip Chip-on-Board (COB) technology encapsulated in an optical-grade matte black resin.",
        "The result is an impenetrable void black surface that absorbs 99.7% of ambient office and atrium lighting, producing cinematic HDR contrast even in sun-drenched architectural spaces.",
        "With native 16:9 cabinet dimensions (600 × 337.5 mm), four cabinets form a 1080p display, sixteen form a true 4K UHD video wall, and sixty-four form an 8K super-canvas—without video processor scaling, letterboxing, or aspect ratio distortion.",
      ],
      problemsSolved: [
        {
          title: "Zero Scaling Distortion",
          desc: "Native 16:9 aspect ratio cabinet preserves exact pixel-to-pixel mapping for standard 1080p, 4K UHD, and 8K broadcast signals.",
        },
        {
          title: "Eliminates Moiré In Camera Feeds",
          desc: "Nanoscale surface diffusion filter scatters optical reflections, preventing moiré interference during executive videoconferencing and broadcast filming.",
        },
        {
          title: "Whisper-Silent Convection",
          desc: "Passive die-cast aluminum-magnesium heatsink eliminates fans completely, generating zero decibels for executive acoustic boardrooms.",
        },
        {
          title: "Sub-5-Second Magnetic Maintenance",
          desc: "Vacuum-assisted front service allows individual module extraction and replacement within seconds without disturbing adjacent panels.",
        },
      ],
    },
    features: [
      {
        id: "feat-cob",
        kicker: "01 / DIODE ARCHITECTURE",
        title: "Flip-Chip COB MicroLED with 1,000,000:1 Contrast",
        description: "By inverting the micro-diodes and directly bonding them to the substrate without wire bonds, Lumera Matrix achieves 35% higher luminous efficiency and 170-degree ultra-wide viewing angles without color cast. Encapsulated in military-grade nano-resin, the surface is dustproof, moisture-proof, and impact-resistant.",
        stat: "1,000,000 : 1",
        statLabel: "Dynamic True Black Contrast",
        diagramType: "contrast",
      },
      {
        id: "feat-geometry",
        kicker: "02 / ARCHITECTURAL MODULARITY",
        title: "Native 16:9 Geometry: Perfect 4K & 8K Pixel-to-Pixel Mapping",
        description: "Standard 600 × 337.5 mm cabinets mirror the golden 16:9 ratio. A 4×4 grid forms a seamless 138-inch 4K screen; an 8×8 grid forms a monumental 275-inch 8K video wall. Integrators avoid costly video processors or odd custom resolution compromises.",
        stat: "3840 × 2160",
        statLabel: "Native 4K on a 4×4 Cabinet Grid",
        diagramType: "geometry",
      },
      {
        id: "feat-refresh",
        kicker: "03 / BROADCAST PROCESSING",
        title: "7,680 Hz High-Frequency Driver for Ghost-Free Capture",
        description: "Equipped with high-performance pulse-width modulation driver ICs running at 7,680 Hz. Eliminates scan lines, flickering, and banding under high-speed camera shutters, making Lumera Matrix the preferred choice for broadcast television and virtual production stages.",
        stat: "7,680 Hz",
        statLabel: "Cinema-Grade Scan Refresh Rate",
        diagramType: "refresh",
      },
      {
        id: "feat-profile",
        kicker: "04 / STRUCTURAL INTEGRATION",
        title: "38mm Ultra-Shallow Depth & Featherweight CNC Chassis",
        description: "Machined from high-tensile die-cast magnesium-aluminum alloy to ±0.01mm tolerances. At just 38 mm thickness and 6.2 kg per cabinet, Lumera Matrix mounts flush against standard drywall and architectural millwork without protruding bulky brackets.",
        stat: "38 mm",
        statLabel: "Total Installed Profile Depth",
        diagramType: "profile",
      },
    ],
    anatomy: {
      title: "Exploded Engineering Anatomy",
      subtitle: "Six precision-milled layers working in seamless unison to create an enduring architectural landmark.",
      videoUrl: "/video/led-separation.mp4",
      layers: [
        {
          id: 1,
          name: "Nano-Optical Black Resin Shield",
          subtitle: "Layer 01 · Optical Matrix",
          description: "Anti-reflective nano-coating absorbs 99.7% of ambient incident light. Provides IP30 front barrier protection against dust, fingerprints, and accidental surface contact.",
          spec: "99.7% Ambient Light Absorption",
        },
        {
          id: 2,
          name: "Flip-Chip Common-Cathode MicroLED Array",
          subtitle: "Layer 02 · Light Generation",
          description: "Microscopic red, green, and blue diodes directly surface-bonded without wire interconnects. Common-cathode drive architecture reduces operating heat by up to 35%.",
          spec: "0.93 mm Diode Center-to-Center",
        },
        {
          id: 3,
          name: "16-Layer High-Frequency Thermal Substrate PCB",
          subtitle: "Layer 03 · Signal Distribution",
          description: "Multi-layer high-TG fiberglass PCB with immersion gold plating ensures ultra-low impedance, uniform heat spreading, and jitter-free signal transmission at multi-gigabit speeds.",
          spec: "16-Layer FR4 with Thermal Vias",
        },
        {
          id: 4,
          name: "Die-Cast Magnesium-Aluminum CNC Frame",
          subtitle: "Layer 04 · Structural Core",
          description: "Aircraft-grade alloy chassis precision CNC-milled to ±0.01mm mechanical tolerance. Features integrated cooling fins that passively conduct heat away from the electronics.",
          spec: "±0.01 mm Seam Tolerance",
        },
        {
          id: 5,
          name: "Dual-Redundant Receiving Card & Hub",
          subtitle: "Layer 05 · Intelligence & Redundancy",
          description: "Integrated Novastar / Brompton dual-loop receiving card with instantaneous signal and power failover. If one data loop is severed, backup takes over in zero frames.",
          spec: "Zero-Frame Instantaneous Failover",
        },
        {
          id: 6,
          name: "Magnetic Quick-Release Front Latching",
          subtitle: "Layer 06 · Serviceability",
          description: "Six neodymium magnetic docking points per module with mechanical z-axis leveling pins. Enables fast front extraction via pneumatic vacuum wand in under 5 seconds.",
          spec: "< 5 Second Module Replacement",
        },
      ],
    },
    applications: [
      {
        id: "app-boardroom",
        title: "Executive Boardrooms & Enterprise War Rooms",
        industry: "Corporate & Enterprise",
        description: "Flawless fine-pitch typography and spreadsheet clarity for C-suite decision making. Zero ambient fan noise preserves acoustic speech intelligibility for telepresence systems.",
        image: "/images/retail-space.png",
        highlights: [
          "Native 4K / 8K presentation without aspect distortion",
          "Zero fan noise for pristine board acoustics",
          "Ultra-wide 170° viewing angle without color shift",
        ],
      },
      {
        id: "app-broadcast",
        title: "Broadcast Television & XR Virtual Production",
        industry: "Media & Entertainment",
        description: "7,680 Hz refresh rate and wide DCI-P3 color reproduction guarantee flicker-free camera capture and smooth camera tracking without optical moiré artifacts.",
        image: "/images/event-screen.png",
        highlights: [
          "Sub-frame genlock synchronization",
          "Anti-moiré matte resin surface",
          "16-bit grayscale depth for deep shadow detail",
        ],
      },
      {
        id: "app-flagship",
        title: "Luxury Flagship Retail & Architectural Lobbies",
        industry: "Architecture & Luxury Retail",
        description: "Monumental digital canvases that integrate flush into travertine, marble, and custom architectural millwork. High 1,000-nit luminance cuts through bright daylight atriums.",
        image: "/images/mall-screen.png",
        highlights: [
          "Ultra-shallow 38mm recess depth",
          "100,000-hour operational lifespan",
          "Intelligent auto-dimming ambient optical sensors",
        ],
      },
      {
        id: "app-residential",
        title: "Private Bespoke Cinema & Luxury Residences",
        industry: "High-End Residential",
        description: "True void black letterboxing delivers cinema-grade immersion beyond traditional projectors. Fully HDR10/HLG compliant with rich 1,000,000:1 contrast.",
        image: "/images/building-facade.jpg",
        highlights: [
          "True black bars with zero projector light leak",
          "Passive fanless cooling behind acoustic walls",
          "MicroLED longevity with zero burn-in risk",
        ],
      },
    ],
    installation: {
      preparation: [
        "Inspect wall flatness with laser level (tolerance: ±1.5 mm across total display width)",
        "Provide dedicated 20A AC 100-240V circuits with isolated ground",
        "Route Cat6A STP or single-mode OM3 fiber optic data cables to rack location",
        "Verify HVAC ambient airflow maintaining room temperature between 15°C and 30°C",
      ],
      steps: [
        {
          step: "01",
          title: "Subframe Mounting & Laser Alignment",
          description: "Install Lumera extruded aluminum horizontal mounting rails to the structural wall studs. Align and true the frame using dual-axis optical laser levels to ensure a perfectly flat datum plane.",
          notes: "Precision at this stage guarantees zero seam gaps across monumental spans.",
          image: "/images/installation/1.png",
        },
        {
          step: "02",
          title: "Cabinet Interlocking & Seam Zeroing",
          description: "Mount the CNC die-cast cabinets onto the subframe starting from bottom-center. Engage the side rotary fast-locks and adjust the four corner micro-bolts to achieve seamless ±0.01mm jointing.",
          notes: "Integrated positioning dowel pins eliminate manual alignment guesswork.",
          image: "/images/installation/2.png",
        },
        {
          step: "03",
          title: "Dual-Loop Power & Signal Cabling",
          description: "Connect the internal daisy-chain power bridges and redundant Cat6A data lines in a closed-loop topology. Connect primary input to Port A and redundant return loop to Port B on the master processor.",
          notes: "Dual-loop topology ensures zero signal loss even if any single cable is disconnected.",
          image: "/images/installation/3.png",
        },
        {
          step: "04",
          title: "Front Module Magnetic Seating & Chroma Tuning",
          description: "Snap the Flip-Chip COB LED modules into position using the magnetic guide locators. Run the Lumera automated optical calibration suite to equalize diode uniformity and color balance.",
          notes: "Pneumatic vacuum service tool allows single-module extraction in less than 5 seconds.",
          image: "/images/installation/3gold.png",
        },
      ],
    },
    variants: [
      {
        id: "p093",
        name: "Matrix P0.93 MicroLED",
        pitch: 0.93,
        resW: 640,
        resH: 360,
        brightness: 800,
        contrast: "1,000,000 : 1",
        weightKg: 6.2,
        weightLbs: 13.6,
        maxPowerW: 150,
        avgPowerW: 50,
        refreshHz: 7680,
        viewingAngle: "170° H / 170° V",
        dimensionsMm: "600 × 337.5 × 38 mm",
        dimensionsIn: "23.6 × 13.3 × 1.5 in",
      },
      {
        id: "p125",
        name: "Matrix P1.25 MicroLED",
        pitch: 1.25,
        resW: 480,
        resH: 270,
        brightness: 1000,
        contrast: "1,000,000 : 1",
        weightKg: 6.5,
        weightLbs: 14.3,
        maxPowerW: 160,
        avgPowerW: 55,
        refreshHz: 7680,
        viewingAngle: "170° H / 170° V",
        dimensionsMm: "600 × 337.5 × 38 mm",
        dimensionsIn: "23.6 × 13.3 × 1.5 in",
      },
      {
        id: "p156",
        name: "Matrix P1.56 Fine-Pitch",
        pitch: 1.56,
        resW: 384,
        resH: 216,
        brightness: 1000,
        contrast: "800,000 : 1",
        weightKg: 6.8,
        weightLbs: 15.0,
        maxPowerW: 170,
        avgPowerW: 60,
        refreshHz: 3840,
        viewingAngle: "165° H / 165° V",
        dimensionsMm: "600 × 337.5 × 38 mm",
        dimensionsIn: "23.6 × 13.3 × 1.5 in",
      },
      {
        id: "p187",
        name: "Matrix P1.87 Fine-Pitch",
        pitch: 1.87,
        resW: 320,
        resH: 180,
        brightness: 1200,
        contrast: "800,000 : 1",
        weightKg: 6.8,
        weightLbs: 15.0,
        maxPowerW: 175,
        avgPowerW: 60,
        refreshHz: 3840,
        viewingAngle: "165° H / 165° V",
        dimensionsMm: "600 × 337.5 × 38 mm",
        dimensionsIn: "23.6 × 13.3 × 1.5 in",
      },
    ],
    specs: {
      optical: [
        { label: "Pixel Pitch Range", value: "0.93 mm / 1.25 mm / 1.56 mm / 1.87 mm" },
        { label: "Diode Architecture", value: "Flip-Chip Chip-On-Board (COB) MicroLED" },
        { label: "Surface Resin Treatment", value: "Nano-Optical Matte Black (99.7% Absorption)" },
        { label: "Native Cabinet Resolution", value: "640 × 360 px (P0.93) / 480 × 270 px (P1.25)" },
        { label: "Peak Calibrated Brightness", value: "800 – 1,200 nits (Adjustable)" },
        { label: "Dynamic Contrast Ratio", value: "1,000,000 : 1 (True Void Black)" },
        { label: "Color Gamut Coverage", value: "98.5% DCI-P3 / 85% Rec. 2020" },
        { label: "Color Processing Depth", value: "16-Bit Grayscale (281 Trillion Colors)" },
        { label: "Refresh Scan Frequency", value: "7,680 Hz High-Speed Cinema Driver" },
        { label: "Viewing Angle", value: "170° Horizontal / 170° Vertical" },
      ],
      mechanical: [
        { label: "Cabinet Dimensions (W×H×D)", value: "600 × 337.5 × 38 mm (23.6 × 13.3 × 1.5 in)" },
        { label: "Cabinet Aspect Ratio", value: "Native 16 : 9 Golden Ratio" },
        { label: "Cabinet Weight", value: "6.2 kg (13.6 lbs) / Cabinet" },
        { label: "Area Weight", value: "30.6 kg / m² (6.27 lbs / sq ft)" },
        { label: "Chassis Material", value: "Precision CNC Die-Cast Magnesium-Aluminum Alloy" },
        { label: "Surface Seam Flatness", value: "±0.01 mm High-Precision Interlock" },
        { label: "Maintenance Access", value: "100% Full Front Magnetic Vacuum Service" },
        { label: "Module Extraction Time", value: "< 5 Seconds per Module" },
      ],
      electrical: [
        { label: "Input Operating Voltage", value: "AC 100 – 240V, 50 / 60 Hz Universal" },
        { label: "Max Power Consumption", value: "150 W / Cabinet (740 W / m²)" },
        { label: "Typical Power Consumption", value: "50 W / Cabinet (246 W / m²)" },
        { label: "Cooling Architecture", value: "Passive Natural Convection (Zero Fan Noise, 0 dB)" },
        { label: "Power Redundancy", value: "Dual Power Supply Hot-Backup Supported" },
        { label: "Power Connection", value: "Neutrik PowerCON TRUE1 TOP Loop-Through" },
      ],
      processing: [
        { label: "Supported Video Processors", value: "Novastar MX40 Pro / Brompton SX40 / Megapixel Helios" },
        { label: "Input Signal Standards", value: "HDMI 2.1 / DisplayPort 1.4 / 12G-SDI / SMPTE ST 2110" },
        { label: "Latency", value: "< 1 Frame Ultra-Low Latency Mode" },
        { label: "HDR Standards", value: "HDR10 / HLG / Dolby Vision Compatible" },
        { label: "Signal Redundancy", value: "Dual-Port Loop-Through Automatic Failover" },
      ],
      environmental: [
        { label: "Operational Temperature", value: "-10°C to +40°C (14°F to 104°F)" },
        { label: "Operational Humidity", value: "10% to 90% RH Non-Condensing" },
        { label: "Ingress Protection Rating", value: "IP30 Front / IP30 Rear Conformal Coated" },
        { label: "LED Lifespan (Half-Life)", value: "100,000 Hours to 50% Original Brightness" },
        { label: "Certifications", value: "CE, FCC Class B, UL/cUL 62368-1, CB, RoHS, WEEE" },
      ],
    },
    gallery: [
      {
        id: "gal-1",
        title: "Monumental Boardroom Installation",
        caption: "A 220-inch 4K Lumera Matrix installed flush in architectural acoustic timber paneling.",
        image: "/images/retail-space.png",
        tag: "Corporate",
      },
      {
        id: "gal-2",
        title: "Broadcast Studio Video Wall",
        caption: "Seamless camera backdrop with 7,680 Hz refresh rate and zero scan line moiré.",
        image: "/images/event-screen.png",
        tag: "Broadcast",
      },
      {
        id: "gal-3",
        title: "Architectural Atrium Landmark",
        caption: "Ultra-shallow 38mm profile integrated into a luxury commercial headquarters lobby.",
        image: "/images/mall-screen.png",
        tag: "Commercial",
      },
      {
        id: "gal-4",
        title: "Micro-Precision CNC Rear Chassis",
        caption: "Die-cast magnesium alloy chassis with passive thermal fins and quick-latch rotary pins.",
        image: "/images/kv4-rear.png",
        tag: "Engineering",
      },
      {
        id: "gal-5",
        title: "Front Magnetic Module Service",
        caption: "Pneumatic front extraction tool releasing a Flip-Chip COB module in seconds.",
        image: "/images/installation/3gold.png",
        tag: "Service",
      },
      {
        id: "gal-6",
        title: "Monumental Architectural Canvas",
        caption: "Curved and flat configurations engineered for monumental digital art spaces.",
        image: "/images/building-facade.jpg",
        tag: "Landmark",
      },
    ],
    downloads: [
      {
        id: "dl-catalog",
        title: "Lumera Matrix Master Architectural Catalogue",
        category: "Product Brochure",
        format: "PDF",
        size: "14.8 MB",
        version: "v4.2 (2026)",
        href: "#download-catalog",
      },
      {
        id: "dl-datasheet",
        title: "Matrix Series Full Engineering Datasheet",
        category: "Technical Datasheet",
        format: "PDF",
        size: "6.2 MB",
        version: "v3.8 (2026)",
        href: "#download-datasheet",
      },
      {
        id: "dl-bim",
        title: "Architectural BIM, Revit & 3D CAD Pack",
        category: "CAD / BIM Drawings",
        format: "ZIP / DWG",
        size: "24.5 MB",
        version: "RVT / IFC / DWG",
        href: "#download-cad",
      },
      {
        id: "dl-manual",
        title: "Subframe Rigging & Mechanical Installation Manual",
        category: "Installation Guide",
        format: "PDF",
        size: "8.1 MB",
        version: "Rev 2.4",
        href: "#download-manual",
      },
      {
        id: "dl-warranty",
        title: "Lumera Pro 5-Year Global Comprehensive Warranty",
        category: "Warranty & SLA",
        format: "PDF",
        size: "1.4 MB",
        version: "2026 Master SLA",
        href: "#download-warranty",
      },
      {
        id: "dl-certs",
        title: "Global Compliance Certificate Pack (CE, FCC, UL, CB)",
        category: "Certifications",
        format: "ZIP / PDF",
        size: "4.8 MB",
        version: "Current",
        href: "#download-certs",
      },
    ],
  },
  "lumera-vortex": {
    id: "lumera-vortex",
    name: "LUMERA VORTEX",
    series: "Vortex Stage & Touring Series",
    badge: "7,680 Hz Touring · 1.95mm – 3.91mm",
    headline: "Unforgiving Road Rigidity. Unbounded XR Precision.",
    subheadline: "Engineered for high-intensity live touring, virtual broadcast production, and rapid concert stage deployment.",
    description: "Built with die-cast magnesium flight-rated frames, curved latching locks (-10° to +10°), and sub-frame ultra-low latency Brompton / Megapixel processing.",
    heroImage: "/products/product-2.webp",
    category: "Stage & Rental LED",
    pitchRange: "1.95mm – 3.91mm",
    keyMetrics: [
      { label: "Refresh Rate", value: "7,680", unit: "Hz", description: "Broadcast cinema scan driver" },
      { label: "Cabinet Weight", value: "6.8", unit: "kg", description: "Ultralight die-cast magnesium" },
      { label: "Curving Latch", value: "± 10", unit: "Deg", description: "Tool-free fast curvature lock" },
      { label: "Service Access", value: "Dual", unit: "Front/Rear", description: "Independent magnetic modules" },
    ],
    introduction: {
      title: "Built for the demands of the world's largest stages.",
      subtitle: "Tour-grade reliability meets camera-ready virtual production precision.",
      paragraphs: [
        "Live concert touring and virtual broadcast production demand extreme speed, unyielding structural rigidity, and uncompromising camera fidelity. Lumera Vortex was created to exceed these benchmarks with an ultra-lightweight magnesium alloy chassis and one-man fast-locking rigging system.",
        "With sub-frame latency and ultra-high 7,680 Hz refresh rates, camera sensors capture flawless, flicker-free XR visual environments with zero tearing or moiré artifacts.",
      ],
      problemsSolved: [
        { title: "Rapid 1-Man Rigging", desc: "Patented top-latch auto-guide system reduces arena build time by 60%." },
        { title: "Broadcast Virtual Production", desc: "Camera-calibrated diodes with sub-frame genlock synchronization." },
        { title: "Extreme Weather Durability", desc: "IP65 outdoor-rated rental variants withstand torrential rain and wind loads." },
        { title: "Seamless Curvature", desc: "Curved latching angle locks from -10° concave to +10° convex without seam lines." },
      ],
    },
    features: [
      {
        id: "feat-touring",
        kicker: "01 / TOURING FRAMEWORK",
        title: "Aircraft Magnesium Frame with Fast-Lock Rigging",
        description: "Only 6.8 kg per 500×500mm panel. Integrated ergonomic handles, top safety catch pins, and side rapid cams allow a two-person crew to fly 50 square meters in under an hour.",
        stat: "6.8 kg",
        statLabel: "Ultra-Lightweight Panel Weight",
      },
      {
        id: "feat-xr",
        kicker: "02 / XR VIRTUAL PRODUCTION",
        title: "Cinema-Grade Brompton & Megapixel Processing",
        description: "Custom-configured with high-bitrate receiver cards capable of 12-bit color rendering, ShutterSync camera tracking, and ultra-low frame latency for live broadcast XR studios.",
        stat: "< 1 Frame",
        statLabel: "Genlocked Scan Latency",
      },
    ],
    anatomy: {
      title: "Tour-Hardened Modular Construction",
      subtitle: "Engineered for thousands of rapid assembly and tear-down cycles.",
      layers: [
        { id: 1, name: "Impact-Resistant Mask", subtitle: "Layer 01", description: "High-contrast matte black polycarbonate louver mask with anti-reflection louvers.", spec: "High Impact PC" },
        { id: 2, name: "Touring LED Matrix", subtitle: "Layer 02", description: "High-yield SMD LEDs with corner-protecting flip feet to prevent diode damage during transit.", spec: "1.95mm / 2.6mm" },
        { id: 3, name: "Tool-Less Power & Data Core", subtitle: "Layer 03", description: "Detachable centralized power and signal box that swaps out in under 10 seconds.", spec: "Hot-Swappable Core" },
        { id: 4, name: "Die-Cast Magnesium Outer Frame", subtitle: "Layer 04", description: "Curvature-locking chassis with precision alignment dowel pins.", spec: "-10° to +10° Angle" },
      ],
    },
    applications: [
      {
        id: "app-concert",
        title: "Arena & Stadium Concert Touring",
        industry: "Live Touring",
        description: "Flown video walls and modular ground-supported stages with extreme wind rating and rapid load-in.",
        image: "/images/event-screen.png",
        highlights: ["Rapid vertical hanging up to 20 panels tall", "IP65 weather resistant for outdoor stadiums"],
      },
      {
        id: "app-xr-stage",
        title: "Virtual Film Production & In-Camera VFX",
        industry: "Film & VFX",
        description: "High-resolution LED volumes delivering realistic real-time lighting and reflections directly onto live actors.",
        image: "/images/behind_led.png",
        highlights: ["ShutterSync frame rate matching", "DCI-P3 99% color gamut for film cameras"],
      },
    ],
    installation: {
      preparation: [
        "Inspect truss load-bearing capacity and motor hoist certifications",
        "Lay out flight cases in sequential numbering matching CAD rigging plot",
        "Test primary 3-phase 32A power distribution and fiber optic line runs",
      ],
      steps: [
        { step: "01", title: "Fly Bumper Beam Rigging", description: "Suspend certified Lumera aluminum fly-bars from stage motor hoists with laser-level confirmation.", notes: "Rated for 20:1 safety factor.", image: "/images/installation/1.png" },
        { step: "02", title: "Top-Latch Auto-Engagement", description: "Lift panels up to engage the top safety guide latches; close the fast-lock lever to securely bond rows.", notes: "Audible click confirms positive lock.", image: "/images/installation/2.png" },
        { step: "03", title: "Curvature Pin Setting", description: "Set the graduated dial lock to the desired curve angle (-10° to +10°) for panoramic viewing.", notes: "Precision degree markers eliminate measuring tape.", image: "/images/installation/3.png" },
        { step: "04", title: "Power & Signal Jumpers", description: "Connect heavy-duty IP65 Neutrik PowerCON and etherCON jumpers along vertical cable paths.", notes: "Daisy chain up to 10 panels per power run.", image: "/images/installation/3gold.png" },
      ],
    },
    variants: [
      {
        id: "vortex-195",
        name: "Vortex P1.95 XR",
        pitch: 1.95,
        resW: 256,
        resH: 256,
        brightness: 1800,
        contrast: "8,000 : 1",
        weightKg: 6.8,
        weightLbs: 15.0,
        maxPowerW: 210,
        avgPowerW: 70,
        refreshHz: 7680,
        viewingAngle: "160° H / 160° V",
        dimensionsMm: "500 × 500 × 68 mm",
        dimensionsIn: "19.7 × 19.7 × 2.7 in",
      },
      {
        id: "vortex-260",
        name: "Vortex P2.60 Touring",
        pitch: 2.6,
        resW: 192,
        resH: 192,
        brightness: 1500,
        contrast: "7,000 : 1",
        weightKg: 7.2,
        weightLbs: 15.8,
        maxPowerW: 200,
        avgPowerW: 68,
        refreshHz: 3840,
        viewingAngle: "160° H / 160° V",
        dimensionsMm: "500 × 500 × 68 mm",
        dimensionsIn: "19.7 × 19.7 × 2.7 in",
      },
    ],
    specs: {
      optical: [
        { label: "Pixel Pitch", value: "1.95 mm / 2.60 mm" },
        { label: "Refresh Rate", value: "7,680 Hz Cinema Driver" },
        { label: "Brightness", value: "1,500 – 1,800 nits" },
        { label: "Viewing Angle", value: "160° H / 160° V" },
      ],
      mechanical: [
        { label: "Dimensions", value: "500 × 500 × 68 mm" },
        { label: "Weight", value: "6.8 kg (15.0 lbs)" },
        { label: "Curvature Range", value: "-10° Concave to +10° Convex" },
        { label: "Material", value: "Die-Cast Magnesium Alloy" },
      ],
      electrical: [
        { label: "Operating Voltage", value: "AC 100-240V, 50/60Hz" },
        { label: "Max Power", value: "210 W / panel" },
        { label: "Average Power", value: "70 W / panel" },
      ],
      processing: [
        { label: "Compatible Processors", value: "Brompton SX40 / S8 / Novastar MX40 Pro" },
        { label: "Latency", value: "< 1 Frame" },
      ],
      environmental: [
        { label: "IP Rating", value: "IP40 Indoor / IP65 Touring" },
        { label: "Operating Temp", value: "-20°C to +50°C" },
      ],
    },
    gallery: [
      { id: "vort-gal-1", title: "Stadium Tour Stage Wall", caption: "Massive curved stage video wall running live visuals.", image: "/images/event-screen.png", tag: "Concert" },
      { id: "vort-gal-2", title: "XR Virtual Production Studio", caption: "High frame rate tracking volume with ShutterSync.", image: "/images/behind_led.png", tag: "Broadcast" },
    ],
    downloads: [
      { id: "dl-vort-cat", title: "Lumera Vortex Touring Catalogue", category: "Brochure", format: "PDF", size: "12.4 MB", version: "v3.1", href: "#dl" },
      { id: "dl-vort-cad", title: "Vortex Rigging & Truss CAD DWG", category: "CAD", format: "ZIP", size: "18.2 MB", version: "DWG", href: "#dl" },
    ],
  },
  "lumera-strata": {
    id: "lumera-strata",
    name: "LUMERA STRATA",
    series: "Strata Outdoor Commercial Series",
    badge: "10,000 Nits Outdoor · 3.9mm – 10.0mm",
    headline: "Unmatched Sunlight Dominance. Weatherproof Armor.",
    subheadline: "Engineered to deliver 10,000 nits of piercing daylight brightness through direct desert sun and sub-zero blizzards.",
    description: "Architectural commercial billboard and facade video wall system with IP68 hermetically sealed modules and dual front-and-rear maintenance.",
    heroImage: "/products/product-3.webp",
    category: "Outdoor Commercial DOOH",
    pitchRange: "3.9mm – 10.0mm",
    keyMetrics: [
      { label: "Max Brightness", value: "10,000", unit: "Nits", description: "Direct sunlight readable" },
      { label: "Ingress Rating", value: "IP68", unit: "Sealed", description: "Total dust & water submersion" },
      { label: "Energy Efficiency", value: "40%", unit: "Savings", description: "Common-cathode power design" },
      { label: "Service Access", value: "Dual", unit: "Front/Rear", description: "Full maintenance flexibility" },
    ],
    introduction: {
      title: "Commercial architecture built to command attention in daylight.",
      subtitle: "Uncompromising 10,000 nit luminance engineered for extreme weather duty.",
      paragraphs: [
        "Highway billboards and commercial high-rise building facades face brutal environmental conditions: scorching ultraviolet radiation, heavy downpours, hurricane winds, and extreme thermal cycling. Lumera Strata is engineered with aircraft-grade aluminum alloy and hermetic IP68 module seals.",
        "Operating up to 10,000 nits, content remains vivid and high-contrast even under direct midday sun, while automated optical sensors smoothly ramp power down at night to prevent glare and maximize energy savings.",
      ],
      problemsSolved: [
        { title: "Daylight Sunlight Piercing", desc: "Up to 10,000 nits peak luminance ensures complete clarity in direct desert sunlight." },
        { title: "IP68 Hermetic Enclosure", desc: "Modules are completely sealed against dust, sandstorms, and driving rain without external glass." },
        { title: "40% Lower Power Draw", desc: "Common-cathode architecture sends exact voltage to Red, Green, and Blue diodes independently." },
        { title: "Dual Front & Rear Service", desc: "Modules can be serviced from catwalk behind the screen or directly from the front facade." },
      ],
    },
    features: [
      {
        id: "feat-strata-nits",
        kicker: "01 / SOLAR BRIGHTNESS",
        title: "10,000 Nits Ultra-Luminance with Auto-Dimming",
        description: "Custom-binned high-output diodes paired with deep black silicone louvers ensure superior daytime contrast. An intelligent light sensor dynamically modulates brightness every millisecond.",
        stat: "10,000 Nits",
        statLabel: "Daylight Dominating Luminance",
      },
    ],
    anatomy: {
      title: "Weatherproof Commercial Architecture",
      subtitle: "IP68 sealed modules with aluminum thermal backplate.",
      layers: [
        { id: 1, name: "UV-Resistant Polycarbonate Mask", subtitle: "Layer 01", description: "Anti-glare louvers resist yellowing and brittle cracking over 10 years of intense solar exposure.", spec: "UV-Stabilized" },
        { id: 2, name: "Hermetically Sealed LED Diode Module", subtitle: "Layer 02", description: "Fully potted silicone back-fill isolates electronics from humidity and salt fog.", spec: "IP68 Submersible" },
        { id: 3, name: "Extruded Aluminum Structural Housing", subtitle: "Layer 03", description: "Lightweight weatherized alloy cabinet with corrosion-resistant electrostatic powder coat.", spec: "High-Tensile Al" },
      ],
    },
    applications: [
      {
        id: "app-billboard",
        title: "Highway & Urban Digital Billboards (DOOH)",
        industry: "Commercial Advertising",
        description: "24/7 revenue-generating digital advertising screens engineered for decade-long continuous uptime.",
        image: "/images/outdoor-screen.png",
        highlights: ["Remote cloud diagnostics", "Dual power supply failover"],
      },
    ],
    installation: {
      preparation: ["Verify billboard pole and catwalk structural load ratings", "Pull 480V 3-phase industrial power feed to distribution panel"],
      steps: [
        { step: "01", title: "Heavy Steel Substructure Erection", description: "Bolt vertical unistrut columns to the billboard pipe truss using grade-8 hardware.", notes: "Torque to engineering spec.", image: "/images/installation/1.png" },
        { step: "02", title: "Cabinet Facade Mounting", description: "Crane lift 960×960mm aluminum cabinets into position; bolt together using anti-vibration lock nuts.", notes: "Waterproof silicone gaskets between joints.", image: "/images/installation/2.png" },
      ],
    },
    variants: [
      {
        id: "strata-39",
        name: "Strata P3.9 Outdoor",
        pitch: 3.9,
        resW: 128,
        resH: 256,
        brightness: 7500,
        contrast: "6,000 : 1",
        weightKg: 13.5,
        weightLbs: 29.7,
        maxPowerW: 460,
        avgPowerW: 160,
        refreshHz: 3840,
        viewingAngle: "140° H / 120° V",
        dimensionsMm: "500 × 1000 × 80 mm",
        dimensionsIn: "19.7 × 39.4 × 3.1 in",
      },
      {
        id: "strata-80",
        name: "Strata P8.0 Billboard",
        pitch: 8.0,
        resW: 120,
        resH: 120,
        brightness: 9000,
        contrast: "5,000 : 1",
        weightKg: 24.5,
        weightLbs: 54.0,
        maxPowerW: 650,
        avgPowerW: 230,
        refreshHz: 3840,
        viewingAngle: "140° H / 120° V",
        dimensionsMm: "960 × 960 × 110 mm",
        dimensionsIn: "37.8 × 37.8 × 4.3 in",
      },
    ],
    specs: {
      optical: [{ label: "Brightness", value: "7,500 – 10,000 nits" }, { label: "Pixel Pitch", value: "3.9mm – 10.0mm" }],
      mechanical: [{ label: "Ingress", value: "IP68 Front / IP65 Rear" }, { label: "Material", value: "Corrosion-Proof Aluminum" }],
      electrical: [{ label: "Operating Voltage", value: "AC 100-277V, 50/60Hz" }],
      processing: [{ label: "Monitoring", value: "Cloud Remote Health & Auto-Alarm" }],
      environmental: [{ label: "Operating Temp", value: "-40°C to +60°C" }],
    },
    gallery: [{ id: "strata-gal-1", title: "Commercial DOOH Screen", caption: "High-brightness roadside billboard in direct sunlight.", image: "/images/outdoor-screen.png", tag: "DOOH" }],
    downloads: [{ id: "dl-strata-cat", title: "Lumera Strata Outdoor Datasheet", category: "Datasheet", format: "PDF", size: "8.9 MB", version: "v2.6", href: "#dl" }],
  },
  "lumera-crystal": {
    id: "lumera-crystal",
    name: "LUMERA CRYSTAL",
    series: "Crystal Transparent Glass Series",
    badge: "82% Optical Clarity · 3.9mm / 7.8mm",
    headline: "Invisible By Day. Radiant By Night.",
    subheadline: "Transforms storefront glass and architectural atriums into dynamic video canvases without sacrificing interior daylight.",
    description: "Lightweight transparent LED display featuring 82% optical transparency, 5,500 nits high daylight brightness, and direct glazing attachment.",
    heroImage: "/products/product-4.webp",
    category: "Transparent Glass LED",
    pitchRange: "3.9mm – 7.8mm",
    keyMetrics: [
      { label: "Transparency", value: "82", unit: "%", description: "Unobstructed natural light" },
      { label: "Brightness", value: "5,500", unit: "Nits", description: "Storefront daylight visible" },
      { label: "System Weight", value: "12", unit: "kg/m²", description: "Direct hanging on glazing" },
      { label: "Profile Width", value: "10", unit: "mm", description: "Ultra-thin PCB light strip" },
    ],
    introduction: {
      title: "Activate architectural glass into living digital canvases.",
      subtitle: "Transparency and high-resolution video unified without structural compromises.",
      paragraphs: [
        "Retail flagship windows and multi-story atrium facades often face a difficult trade-off: traditional solid LED walls block natural sunlight and blind building occupants to the street. Lumera Crystal resolves this with 82% open aperture transparency.",
        "From outside, viewers see crisp, full-color dynamic brand motion. From inside, light pours through and exterior sightlines remain completely unobstructed.",
      ],
      problemsSolved: [
        { title: "Preserves Interior Daylight", desc: "82% light transmission ensures compliance with municipal architectural daylight regulations." },
        { title: "Ultra-Lightweight Rigging", desc: "At only 12 kg/m², panels can hang directly from ceiling wire ropes or glass mullions." },
      ],
    },
    features: [
      {
        id: "feat-crystal-trans",
        kicker: "01 / OPTICAL TRANSPARENCY",
        title: "82% Open Optical Aperture",
        description: "Micro-machined PCB louvers measure just 2mm in thickness, rendering the physical structure practically invisible from a distance of two meters.",
        stat: "82 %",
        statLabel: "Visible Light Transmission",
      },
    ],
    anatomy: {
      title: "Micro-Louvered Transparent Framework",
      subtitle: "Ultra-slim lateral light bars mounted on vertical structural cables.",
      layers: [
        { id: 1, name: "Side-Emitting High-Output Diode Strips", subtitle: "Layer 01", description: "Side-emitting SMD LEDs focus light through exterior window glass with zero interior glare.", spec: "5,500 Nits" },
        { id: 2, name: "Aviation-Grade Clear Acrylic Stiffeners", subtitle: "Layer 02", description: "Structural ribs maintain vertical planar flatness without casting shadows.", spec: "High Transparency" },
      ],
    },
    applications: [
      { id: "app-glass", title: "Luxury Retail Storefronts", industry: "Retail Glass", description: "Transforms street-facing display windows into transparent video walls.", image: "/images/mall-screen.png", highlights: ["No window obstruction"] },
    ],
    installation: {
      preparation: ["Inspect glass curtain wall mullion anchoring points"],
      steps: [{ step: "01", title: "Header Cable Suspension", description: "Install horizontal ceiling track and drop high-tensile stainless steel suspension cables.", notes: "Level accurately.", image: "/images/installation/1.png" }],
    },
    variants: [
      {
        id: "cryst-39",
        name: "Crystal P3.9/7.8",
        pitch: 3.9,
        resW: 256,
        resH: 128,
        brightness: 5500,
        contrast: "3,000 : 1",
        weightKg: 6.0,
        weightLbs: 13.2,
        maxPowerW: 300,
        avgPowerW: 100,
        refreshHz: 3840,
        viewingAngle: "160° H / 160° V",
        dimensionsMm: "1000 × 500 × 45 mm",
        dimensionsIn: "39.4 × 19.7 × 1.8 in",
      },
    ],
    specs: {
      optical: [{ label: "Transparency", value: "82% Optical Clarity" }, { label: "Brightness", value: "5,500 nits" }],
      mechanical: [{ label: "Weight", value: "12 kg / m²" }],
      electrical: [{ label: "Power", value: "300 W / m² Max" }],
      processing: [{ label: "Controller", value: "Novastar / Colorlight Synchronous" }],
      environmental: [{ label: "Environment", value: "Indoor Facing Glass" }],
    },
    gallery: [{ id: "cryst-gal-1", title: "Shopping Mall Glass Facade", caption: "Transparent display glowing inside glass atrium.", image: "/images/mall-screen.png", tag: "Atrium" }],
    downloads: [{ id: "dl-cryst-cat", title: "Lumera Crystal Transparent Brochure", category: "Brochure", format: "PDF", size: "7.4 MB", version: "v2.0", href: "#dl" }],
  },
  "lumera-curve": {
    id: "lumera-curve",
    name: "LUMERA CURVE",
    series: "Curve 3D & Creative Series",
    badge: "3D Anamorphic · 90° Seamless Chamfer",
    headline: "Defy Straight Lines. Seamless Naked-Eye 3D.",
    subheadline: "Engineered with 45-degree chamfered cabinet corners and flexible curvature for breathtaking 90-degree wrap-around building corners.",
    description: "The premier solution for naked-eye 3D anamorphic displays, curved concaves, and continuous cylindrical video columns.",
    heroImage: "/products/product-5.webp",
    category: "3D & Creative LED",
    pitchRange: "1.8mm – 2.5mm",
    keyMetrics: [
      { label: "Corner Angle", value: "90", unit: "Deg", description: "True seamless 90° chamfer" },
      { label: "Corner Gap", value: "< 0.5", unit: "mm", description: "Zero corner bezel seam" },
      { label: "Refresh Rate", value: "7,680", unit: "Hz", description: "Artifact-free 3D motion" },
      { label: "Module Type", value: "Flex", unit: "Porous", description: "Concave & convex curving" },
    ],
    introduction: {
      title: "Transform building corners into monumental 3D spectacles.",
      subtitle: "Seamless 90-degree corner engineering unlocks true naked-eye anamorphic depth.",
      paragraphs: [
        "Traditional building corner displays join flat screens with thick black vertical bezels, ruining the illusion of continuous space required for anamorphic 3D. Lumera Curve features precision 45-degree mitered edges that mate together seamlessly with under 0.5mm joint tolerance.",
        "From realistic optical illusion sculptures to giant 3D creatures bursting out of architectural facades, Lumera Curve creates viral public landmarks.",
      ],
      problemsSolved: [
        { title: "Zero Corner Seams", desc: "45-degree mitered cabinet edges eliminate the black vertical dividing line of traditional corners." },
        { title: "Continuous 3D Perspective", desc: "Allows graphic rendering engines to map continuous anamorphic perspective across orthogonal faces." },
      ],
    },
    features: [
      {
        id: "feat-curve-corner",
        kicker: "01 / MITERED CORNER",
        title: "Precision 45° CNC Mitered Chamfer",
        description: "Cabinets feature precision bevel-cut edges and custom edge-diode modules that bring pixel pitch right up to the apex of the 90-degree corner.",
        stat: "90 °",
        statLabel: "Seamless True Right Angle",
      },
    ],
    anatomy: {
      title: "Articulated Chamfered Chassis",
      subtitle: "Custom-milled corner profiles with magnetic module retention.",
      layers: [
        { id: 1, name: "Right-Angle Edge Module", subtitle: "Layer 01", description: "Specially shaped PCB with diodes aligned along the extreme apex border.", spec: "< 0.5mm Seam" },
        { id: 2, name: "Beveled CNC Chassis", subtitle: "Layer 02", description: "45-degree angled aluminum structural frame with dual-axis alignment pins.", spec: "45° Chamfer" },
      ],
    },
    applications: [
      { id: "app-3d", title: "Times Square-Style 3D Anamorphic Corners", industry: "Monumental DOOH", description: "Iconic corner installations featuring hyper-realistic 3D visual illusions.", image: "/images/outdoor-screen.png", highlights: ["True 90° corner", "Zero seam gap"] },
    ],
    installation: {
      preparation: ["Verify building corner true 90-degree plumb line"],
      steps: [{ step: "01", title: "Corner Datum Installation", description: "Mount the primary corner anchor bracket to lock the exact 90-degree geometry.", notes: "Crucial for corner alignment.", image: "/images/installation/1.png" }],
    },
    variants: [
      {
        id: "curve-18",
        name: "Curve P1.8 Anamorphic",
        pitch: 1.8,
        resW: 277,
        resH: 277,
        brightness: 1200,
        contrast: "8,000 : 1",
        weightKg: 7.0,
        weightLbs: 15.4,
        maxPowerW: 190,
        avgPowerW: 65,
        refreshHz: 7680,
        viewingAngle: "160° H / 160° V",
        dimensionsMm: "500 × 500 × 60 mm",
        dimensionsIn: "19.7 × 19.7 × 2.4 in",
      },
    ],
    specs: {
      optical: [{ label: "Pitch", value: "1.8mm – 2.5mm" }, { label: "Corner Gap", value: "< 0.5 mm" }],
      mechanical: [{ label: "Angle", value: "90° Seamless" }],
      electrical: [{ label: "Power", value: "190 W / panel" }],
      processing: [{ label: "3D Mapping", value: "Unreal Engine & disguise media server ready" }],
      environmental: [{ label: "Rating", value: "IP30 Indoor / IP65 Outdoor" }],
    },
    gallery: [{ id: "curve-gal-1", title: "90-Degree Anamorphic Landmark", caption: "Hyper-realistic naked eye 3D content playing across building corner.", image: "/images/outdoor-screen.png", tag: "3D DOOH" }],
    downloads: [{ id: "dl-curve-cat", title: "Lumera Curve 3D Engineering Guide", category: "Brochure", format: "PDF", size: "11.2 MB", version: "v1.9", href: "#dl" }],
  },
  "lumera-titan": {
    id: "lumera-titan",
    name: "LUMERA TITAN",
    series: "Titan Heavy Duty DOOH Series",
    badge: "24/7 Continuous Duty · 4.0mm – 10.0mm",
    headline: "Monumental Scale. Industrial Endurance.",
    subheadline: "Heavy-duty dual-service commercial DOOH billboard displays engineered for unyielding 24/7 reliability.",
    description: "Built with redundant signal and power backups, automated thermal dissipation, and industrial-grade corrosion resistance for high-revenue advertising networks.",
    heroImage: "/products/product-6.webp",
    category: "DOOH Commercial Billboard",
    pitchRange: "4.0mm – 10.0mm",
    keyMetrics: [
      { label: "Duty Rating", value: "24 / 7", unit: "Continuous", description: "Mission-critical reliability" },
      { label: "Peak Brightness", value: "8,500", unit: "Nits", description: "Direct sunlight readable" },
      { label: "MTBF", value: "100,000", unit: "Hours", description: "Over 11 years continuous life" },
      { label: "Failover", value: "Zero", unit: "Frames", description: "Instantaneous loop redundancy" },
    ],
    introduction: {
      title: "Engineered for 24/7 mission-critical commercial uptime.",
      subtitle: "The gold standard for commercial media operators and high-traffic municipal centers.",
      paragraphs: [
        "In commercial DOOH advertising networks, downtime directly equals lost revenue. Lumera Titan is built from the ground up with redundant power supplies, dual receiving cards, and automated cloud health telemetries.",
        "Equipped with self-diagnostic optical sensors that detect failed diodes or overheated circuits and automatically notify engineers before an outage occurs.",
      ],
      problemsSolved: [
        { title: "Zero Display Downtime", desc: "Dual hot-swappable power supplies and redundant signal loops ensure uninterrupted 24/7 broadcasting." },
        { title: "Automated Remote Cloud Telemetry", desc: "Real-time monitoring of cabinet temperatures, voltages, and diode health from centralized NOC." },
      ],
    },
    features: [
      {
        id: "feat-titan-redundancy",
        kicker: "01 / MISSION-CRITICAL",
        title: "Dual-Power & Dual-Data Redundancy Architecture",
        description: "Every cabinet integrates two independent power supplies and two receiving cards. If one path fails, the backup takes over instantly without dropping a single frame.",
        stat: "100 %",
        statLabel: "Continuous Broadcast Uptime",
      },
    ],
    anatomy: {
      title: "Industrial Grade Redundant Chassis",
      subtitle: "Built to survive hurricane-force winds and thermal extremes.",
      layers: [
        { id: 1, name: "Reinforced Polycarbonate Louver", subtitle: "Layer 01", description: "Impact and UV-resistant front mask protecting high-output LEDs.", spec: "IK08 Impact" },
        { id: 2, name: "Dual Redundant PSU Core", subtitle: "Layer 02", description: "Twin hot-swappable industrial switching power supplies with automatic load sharing.", spec: "Dual Hot-Swap" },
      ],
    },
    applications: [
      { id: "app-titan", title: "Municipal Transportation Hubs & Highways", industry: "Infrastructure DOOH", description: "High-visibility DOOH advertising displays running 24/7 advertising cycles.", image: "/images/outdoor-screen.png", highlights: ["24/7 operation", "Dual power supplies"] },
    ],
    installation: {
      preparation: ["Inspect pylon foundation and structural engineering approvals"],
      steps: [{ step: "01", title: "Heavy Pylon Steelwork Attachment", description: "Anchor main framework to cylindrical pylon support structure.", notes: "Inspect weld points.", image: "/images/installation/1.png" }],
    },
    variants: [
      {
        id: "titan-50",
        name: "Titan P5.0 DOOH",
        pitch: 5.0,
        resW: 192,
        resH: 192,
        brightness: 8500,
        contrast: "6,000 : 1",
        weightKg: 26.0,
        weightLbs: 57.3,
        maxPowerW: 550,
        avgPowerW: 190,
        refreshHz: 3840,
        viewingAngle: "140° H / 120° V",
        dimensionsMm: "960 × 960 × 120 mm",
        dimensionsIn: "37.8 × 37.8 × 4.7 in",
      },
    ],
    specs: {
      optical: [{ label: "Brightness", value: "8,500 nits" }, { label: "Pitch", value: "5.0mm – 10.0mm" }],
      mechanical: [{ label: "Enclosure", value: "Heavy-Duty IP66 Steel/Aluminum" }],
      electrical: [{ label: "Power Redundancy", value: "Dual Hot-Swap 1+1 Redundant" }],
      processing: [{ label: "Monitoring", value: "Cloud-Based 24/7 Automated Telemetry" }],
      environmental: [{ label: "Lifespan", value: "100,000 Hours MTBF" }],
    },
    gallery: [{ id: "titan-gal-1", title: "Highway Digital Billboard", caption: "Heavy-duty Titan billboard visible from half a mile away.", image: "/images/outdoor-screen.png", tag: "DOOH" }],
    downloads: [{ id: "dl-titan-cat", title: "Lumera Titan Commercial Guide", category: "Brochure", format: "PDF", size: "9.5 MB", version: "v3.0", href: "#dl" }],
  },
};

export function getProductDetail(id: string): ProductDetailData {
  return PRODUCT_DETAILS[id] || PRODUCT_DETAILS["lumera-matrix"];
}

export function getAllProductSlugs(): string[] {
  return Object.keys(PRODUCT_DETAILS);
}

