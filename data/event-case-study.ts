export interface EventMilestone {
  step: string;
  phase: string;
  title: string;
  duration: string;
  description: string;
  details: string[];
  image: string;
  tag: string;
}

export interface TechnicalHighlight {
  value: string;
  unit: string;
  label: string;
  description: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category: "all" | "concert" | "installation" | "engineering";
  src: string;
  alt: string;
  aspect: "landscape" | "portrait" | "wide";
  caption: string;
  metadata?: string;
}

export interface StageComponent {
  id: string;
  title: string;
  subtitle: string;
  dimensions: string;
  resolution: string;
  description: string;
  image: string;
  highlights: string[];
}

export interface EventCaseStudy {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  headline: string;
  category: string;
  client: string;
  location: string;
  venue: string;
  date: string;
  attendance: string;
  totalDisplayArea: string;
  heroVideo?: string;
  heroImage: string;
  closingImage: string;
  overview: {
    kicker: string;
    title: string;
    story: string[];
    metrics: { label: string; value: string }[];
    featuredImage: string;
  };
  stageComponents: StageComponent[];
  timeline: EventMilestone[];
  specs: TechnicalHighlight[];
  aboutVenue?: {
    name?: string;
    location?: string;
    image?: string;
    description?: string;
  };
  inAction: {
    title: string;
    quote: string;
    quoteAuthor: string;
    quoteRole: string;
    mainImage: string;
    secondaryImages: { src: string; caption: string }[];
  };
  gallery: GalleryPhoto[];
  projectInfo: {
    label: string;
    value: string;
  }[];
}

export const CONCERT_EVENT_DATA: EventCaseStudy = {
  id: "nepal-music-festival",
  slug: "nepal-music-festival",
  title: "NEPAL MUSIC FESTIVAL",
  subtitle: "MONUMENTAL STAGE LED ARCHITECTURE",
  headline: "540 square meters of high-refresh LED architecture transforming Nepal's largest stadium into a living light monument.",
  category: "STADIUM CONCERT · TURNKEY LED INSTALLATION",
  client: "Prime Live Entertainment & National Arts Council",
  location: "Kathmandu, Nepal",
  venue: "Dasarath Rangashala National Stadium",
  date: "December 12–14, 2024",
  attendance: "45,000+",
  totalDisplayArea: "540 m²",
  heroImage: "/images/events/concert-hero.jpg",
  closingImage: "/images/buildspace/events.avif",
  aboutVenue: {
    name: "Dasarath Rangashala National Stadium",
    location: "Kathmandu, Nepal",
    image: "/images/events/arial-view.jpg",
    description:
      "Dasarath Rangashala National Stadium, located in Kathmandu, Nepal, served as the monumental venue for this premier concert event. Accommodating over 45,000 spectators across its grand tiered stands, the historic open-air stadium demanded high-output, wide-angle LED visual architecture to ensure crystal-clear visibility and an electrifying concert experience from the front-stage pit to the highest perimeter bleachers.",
  },
  overview: {
    kicker: "01 / EXECUTIVE OVERVIEW",
    title: "When 45,000 voices unite under the Himalayan night, the canvas must feel limitless.",
    story: [
      "Nepal's largest outdoor stadium concert demanded a visual infrastructure that could cut through heavy concert fog, withstand unpredictable open-air Himalayan weather, and deliver broadcast-grade optical clarity to every spectator from the front pit to the top bleachers.",
      "Lumera was commissioned as the turnkey LED technology partner—responsible for structural engineering analysis, ground-supported rigging, precision modular screen assembly, redundant 10Gb fiber-optic routing, and live real-time color calibration across three monumental display surfaces.",
    ],
    metrics: [
      { label: "Stadium Attendance", value: "45,000+" },
      { label: "Turnaround Time", value: "72 Hours" },
      { label: "Broadcast Uptime", value: "100.0%" },
      { label: "Total Display Area", value: "540 m²" },
    ],
    featuredImage: "/images/productdetails/wideview.jpg",
  },
  stageComponents: [
    {
      id: "upstage-wall",
      title: "The Monumental Upstage Wall",
      subtitle: "Primary Narrative Canvas",
      dimensions: "28.0m × 10.0m (280 m²)",
      resolution: "7,168 × 2,560 Pixels (Native 24K Matrix)",
      description: "Positioned directly behind the performers, the upstage wall formed the emotional spine of the production. Engineered with true void-black maskings and high-contrast Flip-Chip LEDs, it delivered pitch-black backdrops that made stage pyrotechnics and laser beams radiate with hyper-realistic intensity.",
      image: "/images/event-screen.png",
      highlights: [
        "Curved 5° radius for panoramic audience immersion",
        "Calibrated HDR10+ with 16-bit grayscale depth",
        "Whisper-silent convection cooling behind artist microphones",
      ],
    },
    {
      id: "imag-towers",
      title: "Dual Curved Stadium IMAG Displays",
      subtitle: "Broadcast-Grade Live Relay",
      dimensions: "2 × (8.0m × 12.0m) (192 m²)",
      resolution: "2,048 × 3,072 Pixels Each",
      description: "Flanking stage left and stage right, the dual IMAG towers brought intimate performance nuances to the furthest reaches of the stadium. With ultra-low 0.3ms latency processing, camera close-ups maintained absolute zero perceptible lip-sync delay with the 120,000-watt stadium line array.",
      image: "/images/productdetails/hero.jpg",
      highlights: [
        "Angled 15° toward stadium bowl for optimal viewing geometry",
        "4,500 nits high-brightness output piercing sunset glare",
        "Broadcast 7,680 Hz cinema scan rates for flicker-free camera capture",
      ],
    },
    {
      id: "riser-kinetic",
      title: "Band Risers & Kinetic Header Strips",
      subtitle: "Integrated Stage Geometry",
      dimensions: "4 × (12.0m × 1.2m) + Header Arcs (68 m²)",
      resolution: "Custom DMX / Pixel-Mapped Mesh",
      description: "Custom low-profile stage deck risers and curved overhead kinetic strips seamlessly integrated with stage lighting trusses. Real-time Notch generative visuals flowed from the upper trusses through the main wall down to the artist riser faces in a unified visual continuum.",
      image: "/images/installation/3gold.png",
      highlights: [
        "Anti-slip reinforced surface capable of supporting drum kits & backline",
        "Direct Art-Net / sACN lighting console integration",
        "Instant modular clip-locking mechanism for rapid changeovers",
      ],
    },
  ],
  timeline: [
    {
      step: "01",
      phase: "Phase 1: Site Survey & Ground Load Analysis",
      title: "Ground Stabilization & Structural Rigging",
      duration: "Day 1 · 06:00 – 18:00",
      description: "The Dasarath Rangashala natural turf required strict weight distribution engineering. Our team laid heavy-duty ground protection mats and erected heavy-duty aluminum ground-supported trussing with concrete ballast counterweights calculated for 120 km/h wind gusts.",
      details: [
        "Soil compression testing & load redistribution plate placement",
        "Laser-level alignment across 40 meters of ground trussing",
        "Structural wind rating sign-off by structural engineers",
      ],
      image: "/images/installation/1.png",
      tag: "Structural Engineering",
    },
    {
      step: "02",
      phase: "Phase 2: Hardware Unboxing & Pre-Addressing",
      title: "Flight Case Staging & Quality Audit",
      duration: "Day 1 · 19:00 – Day 2 · 04:00",
      description: "Over 1,080 die-cast magnesium cabinets were unloaded from air-ride transport flight cases. Every module underwent electrical continuity, receiving card firmware matching, and panel pixel validation before physical hoisting.",
      details: [
        "1,080 cabinets bar-code scanned into visual mapping grid",
        "Receiving card firmware synchronization across 4 redundant lines",
        "Spare module pre-calibration to match batch chromaticity",
      ],
      image: "/images/installation/1_1.png",
      tag: "Hardware Logistics",
    },
    {
      step: "03",
      phase: "Phase 3: Screen Assembly & Module Interlocking",
      title: "Precision Mechanical Construction",
      duration: "Day 2 · 06:00 – 20:00",
      description: "Our certified rigging team erected the 28-meter main wall and dual 12-meter IMAG towers using fast-action quick-lock pins. Sub-millimeter tolerances ensured zero visible seam gaps across the entire 540 m² surface under high-powered stage illumination.",
      details: [
        "Dual-pin auto-locking CNC magnesium cabinets",
        "Integrated vertical safety wire ropes on every second column",
        "Rear maintenance catwalk access paths established",
      ],
      image: "/images/installation/2.png",
      tag: "Screen Construction",
    },
    {
      step: "04",
      phase: "Phase 4: Fiber Backbone & Power Distribution",
      title: "Zero-Latency Signal Infrastructure",
      duration: "Day 2 · 21:00 – Day 3 · 06:00",
      description: "Dual redundant 10Gb multi-strand tactical fiber cables were routed from front-of-house video control to stage side distribution racks. Power distribution units were phased across three synchronized silent generators with automatic instantaneous transfer switches.",
      details: [
        "Optical fiber primary and secondary ring topology",
        "Isolated 3-phase clean power distribution with surge suppressors",
        "Hardware-level failover: if primary feed breaks, secondary takes over in 0 frames",
      ],
      image: "/images/behind_led.jfif",
      tag: "Signal & Power",
    },
    {
      step: "05",
      phase: "Phase 5: Photometric Calibration & 24H Soak",
      title: "Color Science & Extreme Load Burn-In",
      duration: "Day 3 · 07:00 – 16:00",
      description: "Using specialized spectroradiometers, our engineers calibrated color temperature, uniform white-point balance, and gamma curves to match live 4K cinema broadcast cameras. The entire rig was run at 100% white-level power to confirm thermal stability.",
      details: [
        "Spectroradiometer camera color matching (Rec.709 & DCI-P3)",
        "Zero dropped frames verified on 7,680 Hz cinema scan drivers",
        "Full load thermal soak test under outdoor conditions",
      ],
      image: "/images/installation/image-2.jfif",
      tag: "Calibration & QC",
    },
    {
      step: "06",
      phase: "Phase 6: Rehearsal & Live Showtime",
      title: "Flawless Live Stadium Execution",
      duration: "Day 3 · 17:00 – Midnight",
      description: "During live soundchecks and the headline performance, Lumera's on-site video engineering crew monitored live power telemetry, temperature sensors, and video signal integrity in real time, delivering an unblemished 100% uptime show.",
      details: [
        "Real-time sensor monitoring of cabinet core temperatures",
        "Live Notch media server generative visual integration",
        "Flawless 6-hour non-stop stadium performance",
      ],
      image: "/images/productdetails/hero.jpg",
      tag: "Show Execution",
    },
  ],
  specs: [
    {
      value: "540",
      unit: "m²",
      label: "Total Display Area",
      description: "Monumental outdoor arena scale combining upstage, IMAG, and risers",
    },
    {
      value: "3.9",
      unit: "mm",
      label: "Pixel Pitch",
      description: "Ultra-fine outdoor touring pitch with tight viewing distances",
    },
    {
      value: "7,680",
      unit: "Hz",
      label: "Refresh Rate",
      description: "Broadcast-grade cinema scan driver eliminating all camera scan lines",
    },
    {
      value: "4,500",
      unit: "nits",
      label: "Peak Brightness",
      description: "Punchy contrast from late afternoon direct sunlight into midnight show",
    },
    {
      value: "0.3",
      unit: "ms",
      label: "Ultra-Low Latency",
      description: "Sub-frame processing ensuring zero lip-sync delay on stadium IMAGs",
    },
    {
      value: "IP65",
      unit: "Rating",
      label: "Weatherproof Seal",
      description: "Fully sealed front and rear against Himalayan rain, dust, and humidity",
    },
    {
      value: "16:9",
      unit: "Geometry",
      label: "Native Broadcast Format",
      description: "1:1 pixel mapping for multi-camera 4K UHD video switcher inputs",
    },
    {
      value: "100%",
      unit: "Redundant",
      label: "Power & Fiber Ring",
      description: "Seamless dual-path fiber ring with zero single points of failure",
    },
  ],
  inAction: {
    title: "LIGHT IN MONUMENTAL MOTION",
    quote: "Lumera's LED installation transformed our stage from a concert platform into an architectural cathedral of light. The sharpness on broadcast cameras and the sheer optical punch in the stadium were unprecedented in Nepal.",
    quoteAuthor: "Production Director",
    quoteRole: "Nepal Music Festival 2024",
    mainImage: "/images/buildspace/events.avif",
    secondaryImages: [
      { src: "/images/productdetails/wideview.jpg", caption: "Wide stadium atmosphere across 45,000 cheering fans." },
      { src: "/images/event-screen.png", caption: "Upstage wall radiating vivid 24K visual art behind the main artist." },
      { src: "/images/productdetails/closeup.jpg", caption: "Precision die-cast magnesium cabinets with zero seam tolerances." },
      { src: "/images/productdetails/hero.jpg", caption: "Curved IMAG towers delivering crystal-clear artist closeups." },
    ],
  },
  gallery: [
    {
      id: "gal-1",
      title: "Stadium Grand View",
      category: "concert",
      src: "/images/buildspace/events.avif",
      alt: "Stadium grand view during live concert",
      aspect: "wide",
      caption: "Panoramic view of the 540 m² LED stage canvas illuminating 45,000 concertgoers under the night sky.",
      metadata: "Concert Live · 24K Upstage Wall",
    },
    {
      id: "gal-2",
      title: "Main Stage Visual Surge",
      category: "concert",
      src: "/images/event-screen.png",
      alt: "Main stage LED wall displaying neon geometric visuals",
      aspect: "landscape",
      caption: "High-contrast Flip-Chip MicroLED diodes reproducing void blacks and vibrant neon spectrums.",
      metadata: "Visual Art · 4,500 Nits HDR",
    },
    {
      id: "gal-3",
      title: "Ground Truss Assembly",
      category: "installation",
      src: "/images/installation/1.png",
      alt: "Engineers assembling ground truss structure",
      aspect: "landscape",
      caption: "Precision alignment of the heavy-duty aluminum ground support trussing across stadium turf.",
      metadata: "Phase 1 · Site Logistics",
    },
    {
      id: "gal-4",
      title: "Flight Case Staging",
      category: "installation",
      src: "/images/installation/1_1.png",
      alt: "Modular LED flight case staging",
      aspect: "landscape",
      caption: "Over 1,000 pre-addressed magnesium cabinets undergoing pre-hoist optical verification.",
      metadata: "Phase 2 · Hardware Staging",
    },
    {
      id: "gal-5",
      title: "Full Stage Integration",
      category: "concert",
      src: "/images/productdetails/wideview.jpg",
      alt: "Full stage integration during dusk rehearsal",
      aspect: "wide",
      caption: "Golden hour rehearsal: screen brightness automatically balancing against ambient Himalayan sunset.",
      metadata: "Rehearsal · Optical Balance",
    },
    {
      id: "gal-6",
      title: "Rear Chassis & Fiber Backbone",
      category: "engineering",
      src: "/images/behind_led.jfif",
      alt: "Rear chassis and fiber optic cabling",
      aspect: "landscape",
      caption: "Clean, rainproof tactical fiber-optic cabling and isolated power distribution lines.",
      metadata: "Phase 4 · Fiber Ring",
    },
    {
      id: "gal-7",
      title: "Precision Cabinet Close-up",
      category: "engineering",
      src: "/images/productdetails/closeup.jpg",
      alt: "Close-up of interlocking LED cabinet",
      aspect: "portrait",
      caption: "Sub-millimeter CNC magnesium chassis edges ensuring imperceptible seam lines under stadium cameras.",
      metadata: "Hardware · Die-Cast Magnesium",
    },
    {
      id: "gal-8",
      title: "Dual IMAG Tower Elevation",
      category: "concert",
      src: "/images/productdetails/hero.jpg",
      alt: "IMAG tower elevated during live performance",
      aspect: "landscape",
      caption: "12-meter tall IMAG tower transmitting low-latency live broadcast feed to the stadium perimeter.",
      metadata: "Live Show · 0.3ms Latency",
    },
  ],
  projectInfo: [
    { label: "Event Name", value: "Nepal Music Festival 2024" },
    { label: "Location & Country", value: "Kathmandu, Nepal (South Asia)" },
    { label: "Venue", value: "Dasarath Rangashala National Stadium" },
    { label: "Event Date", value: "December 12–14, 2024" },
    { label: "Project Category", value: "Monumental Concert & Live Event LED Architecture" },
    { label: "Client & Production", value: "Prime Live Entertainment & National Arts Council" },
    { label: "Services Provided", value: "Turnkey LED Display Supply, Structural Rigging, Fiber Routing, Photometric Calibration & Live Show Ops" },
    { label: "LED Display Technology", value: "Lumera TourMatrix P3.9 IP65 Outdoor Touring Series" },
    { label: "Total Display Surface", value: "540 m² (280 m² Upstage Wall, 192 m² Dual IMAG, 68 m² Risers)" },
    { label: "Total Resolution", value: "Over 35.3 Million Physical Pixels" },
    { label: "Show Uptime", value: "100.0% Over 3 Continuous Show Days" },
  ],
};

