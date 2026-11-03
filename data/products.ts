export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductItem {
  id: string;
  series: string;
  name: string;
  category: string;
  tagline: string;
  summary: string;
  imageSrc: string;
  specs: ProductSpec[];
}

export const PRODUCTS: ProductItem[] = [
  {
    id: "lumera-matrix",
    series: "01",
    name: "LUMERA MATRIX",
    category: "Fine Pitch MicroLED",
    tagline: "Ultra-fine pitch MicroLED architecture for luxury flagships & corporate studios.",
    summary:
      "Engineered with microscopic diode pitch and deep black encapsulation, LUMERA MATRIX delivers true-to-life contrast, flawless color calibration, and zero moiré interference for close-up viewing environments.",
    imageSrc: "/products/product-1.webp",
    specs: [
      { label: "Pixel Pitch", value: "0.9mm – 1.5mm" },
      { label: "Refresh Rate", value: "7,680 Hz" },
      { label: "Brightness", value: "1,200 nits" },
      { label: "Contrast Ratio", value: "10,000:1" },
    ],
  },
  {
    id: "lumera-vortex",
    series: "02",
    name: "LUMERA VORTEX",
    category: "Stage & Rental",
    tagline: "High-refresh virtual production & modular stage video panels.",
    summary:
      "Crafted with die-cast magnesium chassis and ultra-low scan latency, LUMERA VORTEX meets the rigorous demands of broadcast XR stages, live concert touring, and immersive experiential venues.",
    imageSrc: "/products/product-2.webp",
    specs: [
      { label: "Pixel Pitch", value: "1.9mm – 2.6mm" },
      { label: "Refresh Rate", value: "7,680 Hz" },
      { label: "Panel Weight", value: "6.8 kg / panel" },
      { label: "Latency", value: "< 1 Frame" },
    ],
  },
  {
    id: "lumera-strata",
    series: "03",
    name: "LUMERA STRATA",
    category: "Outdoor Commercial",
    tagline: "High-brightness architectural facade and digital billboard display.",
    summary:
      "Built to withstand extreme climate variations while outputting up to 10,000 nits of sunlight-piercing luminance. Engineered with dual front-and-rear maintenance and sealed IP68 module architecture.",
    imageSrc: "/products/product-3.webp",
    specs: [
      { label: "Brightness", value: "7,500 – 10,000 nits" },
      { label: "Protection", value: "IP68 Weatherproof" },
      { label: "Pixel Pitch", value: "3.9mm – 10mm" },
      { label: "Service", value: "Dual Front & Rear" },
    ],
  },
  {
    id: "lumera-crystal",
    series: "04",
    name: "LUMERA CRYSTAL",
    category: "Transparent Glass",
    tagline: "82% high-transparency architectural glass LED wall.",
    summary:
      "Transforms storefront glazing and atrium curtain walls into vibrant video canvases without blocking natural light or interior sightlines. Lightweight structural profile with high lumen output.",
    imageSrc: "/products/product-4.webp",
    specs: [
      { label: "Transparency", value: "82% Optical Clarity" },
      { label: "Brightness", value: "5,500 nits" },
      { label: "Panel Weight", value: "12 kg / m²" },
      { label: "Mounting", value: "Direct Glazing / Hanging" },
    ],
  },
  {
    id: "lumera-curve",
    series: "05",
    name: "LUMERA CURVE",
    category: "3D & Creative",
    tagline: "Flexible concave and convex modules for 90° seamless anamorphic corners.",
    summary:
      "Enables continuous wrap-around building corners with true 90-degree chamfered edges, eliminating visible panel seams and creating breathtaking 3D naked-eye anamorphic visual experiences.",
    imageSrc: "/products/product-5.webp",
    specs: [
      { label: "Angle Precision", value: "90° Seamless Chamfer" },
      { label: "Curvature", value: "Smooth Concave / Convex" },
      { label: "Pixel Pitch", value: "1.8mm – 2.5mm" },
      { label: "Access", value: "Magnetic Front Service" },
    ],
  },
  {
    id: "lumera-titan",
    series: "06",
    name: "LUMERA TITAN",
    category: "DOOH Display",
    tagline: "Heavy-duty dual-service access commercial DOOH billboard screens.",
    summary:
      "Designed for 24/7 mission-critical commercial advertising networks. Features automated thermal dissipation, redundant signal-power failovers, and intelligent ambient light sensor integration.",
    imageSrc: "/products/product-6.webp",
    specs: [
      { label: "Duty Cycle", value: "24/7 Continuous Rated" },
      { label: "Brightness", value: "8,500 nits" },
      { label: "Ingress", value: "IP66 / IP68" },
      { label: "Sensors", value: "Auto-Dimming Optical" },
    ],
  },
];

