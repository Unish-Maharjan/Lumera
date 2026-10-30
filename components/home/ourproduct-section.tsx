import Image from "next/image";
import { Container } from "@/components/ui/Container";

interface ProductItem {
  id: string;
  series: string;
  name: string;
  category: string;
  summary: string;
  imageSrc: string;
}

const PRODUCTS: ProductItem[] = [
  {
    id: "lumera-matrix",
    series: "01",
    name: "LUMERA MATRIX",
    category: "Fine Pitch",
    summary: "Ultra-fine pitch MicroLED architecture for luxury flagships & corporate studios.",
    imageSrc: "/products/product-1.webp",
  },
  {
    id: "lumera-vortex",
    series: "02",
    name: "LUMERA VORTEX",
    category: "Stage & Rental",
    summary: "High-refresh virtual production & modular stage video panels.",
    imageSrc: "/products/product-2.webp",
  },
  {
    id: "lumera-strata",
    series: "03",
    name: "LUMERA STRATA",
    category: "Outdoor Commercial",
    summary: "High-brightness architectural facade and digital billboard display.",
    imageSrc: "/products/product-3.webp",
  },
  {
    id: "lumera-crystal",
    series: "04",
    name: "LUMERA CRYSTAL",
    category: "Transparent Glass",
    summary: "82% high-transparency architectural glass LED wall.",
    imageSrc: "/products/product-4.webp",
  },
  {
    id: "lumera-curve",
    series: "05",
    name: "LUMERA CURVE",
    category: "3D & Creative",
    summary: "Flexible concave and convex modules for 90° seamless anamorphic corners.",
    imageSrc: "/products/product-5.webp",
  },
  {
    id: "lumera-titan",
    series: "06",
    name: "LUMERA TITAN",
    category: "DOOH Display",
    summary: "Heavy-duty dual-service access commercial DOOH billboard screens.",
    imageSrc: "/products/product-6.webp",
  },
];

export function OurProductSection() {
  return (
    <section
      id="products"
      aria-labelledby="products-heading"
      className="relative bg-transparent py-20 sm:py-28 lg:py-32 text-foreground overflow-hidden border-t border-border/40"
    >
      <Container>
        {/* Section Header: 3-Line Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12 sm:mb-16">
          <h2
            id="products-heading"
            className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.75rem] font-bold tracking-tight text-foreground uppercase leading-[0.92] select-none"
          >
            PRECISION HARDWARE.<br />
            BUILT FOR<br />
            <span className="text-accent">PERFORMANCE.</span>
          </h2>
        </div>

        {/* Clean, Simple 3-Column Grid (6 Cards, Human-Designed) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {PRODUCTS.map((product) => (
            <article
              key={product.id}
              className="relative w-full aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] overflow-hidden bg-card border border-border/70 flex flex-col justify-between p-6 sm:p-7"
            >
              {/* Full-bleed Product Image */}
              <Image
                src={product.imageSrc}
                alt={product.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover select-none pointer-events-none"
              />

              {/* Top Row: Series & Category */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="text-xs font-mono font-medium tracking-widest text-accent uppercase">
                  {product.series}
                </span>
                <span className="text-[10px] font-mono tracking-wider text-muted-foreground uppercase px-2.5 py-1 rounded bg-black/60 border border-white/10 backdrop-blur-sm">
                  {product.category}
                </span>
              </div>

              {/* Bottom Gradient & Text: Clean, Simple, Uncluttered */}
              <div className="relative z-10 p-6 sm:p-7 bg-gradient-to-t from-black/90 via-black/50 to-transparent -mx-6 sm:-mx-7 -mb-6 sm:-mb-7">
                <h3 className="text-lg sm:text-xl font-bold tracking-tight uppercase text-white mb-1.5">
                  {product.name}
                </h3>
                <p className="text-xs text-white/70 font-light leading-relaxed">
                  {product.summary}
                </p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

// Backward-compatible alias for existing imports
export const ApplicationSection = OurProductSection;

export default OurProductSection;
