"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Button } from "../ui";

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
    imageSrc: "/products/product-5.webp",
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
  const handleScrollToCta = () => {
    const target =
      document.getElementById("contact-cta") ||
      document.getElementById("cta");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.hash = "#contact-cta";
    }
  };

  return (
    <section
      id="products"
      aria-labelledby="products-heading"
      className="relative bg-[#F7F7F5] pt-16 sm:pt-24 lg:pt-32 pb-20 select-none overflow-hidden"
    >
      <Container size="xl">
        {/* Section Header */}
        <div className="max-w-5xl mx-auto mb-12 sm:mb-16 lg:mb-20 text-center">
          <Heading
            as="h2"
            id="products-heading"
            size="xl"
            align="center"
            variant="dark"
          >
            Displays for every space.
          </Heading>
        </div>

        {/* Two-Column Product Grid with Clean Gaps & Proportional Sizing */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-8">
          {PRODUCTS.map((product, idx) => (
            <article
              key={product.id}
              className="group relative flex flex-col justify-between min-h-[420px] sm:min-h-[480px] lg:min-h-[540px] p-6 sm:p-8 
                 rounded-2xl bg-zinc-200/50 border border-[#E5E5E0] 
                 transition-all duration-300 overflow-hidden"
            >
              {/* Dominant Product Image with Active Text & Action Buttons */}
              <div className="relative w-full flex-1 flex items-center justify-center my-2 sm:my-3 min-h-[320px] sm:min-h-[380px] lg:min-h-[420px]">
                <div className="relative w-full h-full max-w-[640px] flex items-center justify-center">
                  {/* Background Product Image */}
                  <Image
                    src={product.imageSrc}
                    alt={`${product.name} LED display panel`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-contain select-none pointer-events-none scale-110 sm:scale-115 
                    transition-all duration-500 group-hover:scale-[1.18] group-hover:translate-y-2 sm:group-hover:translate-y-4"
                    priority={idx < 2}
                  />

                  {/* Active Content: Headline, Summary & Action Buttons */}
                  <div className="absolute top-0 inset-x-0 flex flex-col items-center justify-start text-center z-20 px-4 pt-1">
                    {/* Product Headline */}
                    <Heading as="h3" size="lg" variant="dark" align="center" className="mb-1.5">
                      {product.name}
                    </Heading>

                    {/* Summary Copy */}
                    <p className="font-sans text-xs sm:text-sm text-zinc-700 font-normal max-w-md mb-3 sm:mb-4 leading-relaxed">
                      {product.summary}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-center gap-3 sm:gap-4">
                      <Button size="sm" variant="gold">
                        Learn more
                      </Button>
                      <Button size="sm" variant="white" className="border-2 border-black">
                        Inquire
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

// Backward-compatible aliases for existing imports
export const ApplicationSection = OurProductSection;
export const ProductGrid = OurProductSection;

export default OurProductSection;
