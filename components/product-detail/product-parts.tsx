import React from "react";
import Image from "next/image";
import Container from "@/components/ui/Container";

export interface GridItem {
  id: string;
  title: string;
  description?: string;
  image: string;
}

const DEFAULT_ITEMS: GridItem[] = [
  { id: "side", title: "Side Profile", image: "/images/productdetails/closeup.jpg" },
  { id: "connections", title: "Interface & Ports", image: "/images/productdetails/back.jpg" },
  { id: "front", title: "Full Front View", image: "/images/productdetails/wideview.jpg" },
  { id: "build", title: "Chassis Build", image: "/images/productdetails/hero.jpg" },
];

interface ProductGridProps {
  items?: GridItem[];
  title?: string;
}

export function ProductGrid({
  items = DEFAULT_ITEMS,
  title,
}: ProductGridProps) {
  return (
    <section
      id="parts"
      aria-label="Product Gallery Grid"
      className="w-full bg-black text-white py-10 sm:py-14 select-none overflow-hidden"
    >
      <Container size="xl">
        {title && (
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-white font-sans text-center mb-8">
            {title}
          </h2>
        )}

        {/* Compact Grid of 4 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {items.map((item) => (
            <figure key={item.id} className="group flex flex-col">
              {/* Image Frame */}
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl sm:rounded-2xl bg-zinc-900 shadow-md">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>

              {/* Minimal caption */}
              <figcaption className="mt-2.5 sm:mt-3 text-center sm:text-left">
                <span className="font-sans text-xs sm:text-sm font-medium text-zinc-300 group-hover:text-white transition-colors">
                  {item.title}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}

export const ProductParts = ProductGrid;
export default ProductGrid;
