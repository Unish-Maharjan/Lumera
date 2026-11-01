import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

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
    summary: "Ultra-fine pitch MicroLED displays for flagships & studios.",
    imageSrc: "/products/product-1.webp",
  },
  {
    id: "lumera-vortex",
    series: "02",
    name: "LUMERA VORTEX",
    category: "Stage & Rental",
    summary: "High-refresh modular LED panels for virtual production.",
    imageSrc: "/products/product-2.webp",
  },
  {
    id: "lumera-strata",
    series: "03",
    name: "LUMERA STRATA",
    category: "Outdoor Commercial",
    summary: "High-brightness architectural facade and billboard screens.",
    imageSrc: "/products/product-3.webp",
  },
  {
    id: "lumera-crystal",
    series: "04",
    name: "LUMERA CRYSTAL",
    category: "Transparent Glass",
    summary: "82% high-transparency architectural glass LED video wall.",
    imageSrc: "/products/product-4.webp",
  },
];

export function OurProductSection() {
  return (
    <section
      id="products"
      aria-labelledby="products-heading"
      className="relative bg-black pt-10 sm:pt-14 lg:pt-20 text-foreground font-sans border-t border-white/[0.08] select-none overflow-hidden"
    >
      <Container className="w-full">
        {/* Section Header: Top-Left */}
        <div className="max-w-3xl mb-12 sm:mb-16 lg:mb-20 text-left">
         
          {/* Heading */}
          <h2
            id="products-heading"
            className="font-sans text-3xl sm:text-5xl md:text-6xl font-bold text-foreground uppercase mb-4 sm:mb-5"
          >
            Displays for every space.
          </h2>
        </div>

        {/* OXI Instruments-Inspired Minimal Two-Column Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 border-t border-b border-white/[0.08]">
          {PRODUCTS.map((product, idx) => {
            const isLeftCol = idx % 2 === 0;
            // Clean border logic: no conflicting Tailwind responsive classes
            const borderBottomClass =
              idx < 2
                ? "border-b md:border-b"
                : idx === 2
                ? "border-b md:border-b-0"
                : "border-b-0";
            const borderRightClass = isLeftCol ? "md:border-r" : "";

            return (
              <article
                key={product.id}
                className={`group relative flex flex-col justify-between min-h-[580px] sm:min-h-[680px] lg:min-h-[800px] xl:min-h-[860px] p-6 sm:p-10 lg:p-12 bg-black border-white/[0.08] ${borderBottomClass} ${borderRightClass}`}
              >
                {/* Cell Header: Product Name at Top-Left (OXI Style) */}
                <div className="flex items-center justify-between w-full">
                  <span className="text-xs sm:text-sm font-sans text-white uppercase font-medium">
                    {product.name}
                  </span>
                </div>

                {/* Dominant Product Image: Centered in pure obsidian void */}
                <div className="relative w-full flex-1 flex items-center justify-center my-6 sm:my-8 min-h-[360px] sm:min-h-[460px] lg:min-h-[560px] xl:min-h-[640px]">
                  <div className="relative w-full h-full min-h-[340px] sm:min-h-[440px] lg:min-h-[540px] xl:min-h-[600px] max-w-[640px] flex items-center justify-center">
                    <Image
                      src={product.imageSrc}
                      alt={`${product.name} LED display panel`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-contain select-none pointer-events-none drop-shadow-[0_25px_60px_rgba(0,0,0,0.85)] transition-opacity duration-300 group-hover:opacity-25"
                      priority={idx < 2}
                    />

                    {/* Description Appearing in the Middle on Hover (Boxless, Inset Text) */}
                    <div className="absolute inset-6 sm:inset-10 lg:inset-14 flex items-center justify-center z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-xs sm:text-sm font-sans uppercase text-white text-center max-w-md drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
                        {product.summary}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Cell Footer: Left-aligned button */}
                <div className="flex flex-col text-left">
                  <div>
                    <Link href="/#cta" className="inline-block">
                      <Button variant="gold" size="sm">
                        Explore solution
                      </Button>
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

// Backward-compatible aliases for existing imports
export const ApplicationSection = OurProductSection;
export const ProductGrid = OurProductSection;

export default OurProductSection;
