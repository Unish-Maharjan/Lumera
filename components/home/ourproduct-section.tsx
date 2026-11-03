"use client";

import React from "react";
import Image from "next/image";
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
      className="relative bg-black pt-10 sm:pt-14 lg:pt-20 text-foreground select-none overflow-hidden"
    >
      <Container className="w-full">
        {/* Section Header: Top-Left */}
        <div className="max-w-5xl mx-auto mb-12 sm:mb-16 lg:mb-20 text-center">
          <h2
            id="products-heading"
            className="font-heading text-3xl sm:text-5xl md:text-6xl font-bold 
            text-foreground uppercase mb-4 sm:mb-5"
          >
            Displays for <span className="text-accent">every</span> space.
          </h2>
        </div>
      </Container>

      {/* Minimal Two-Column Product Grid - Spanning Full Viewport Width (100vw) */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 border-t border-b border-white/20">
          {PRODUCTS.map((product, idx) => {
            const isLeftCol = idx % 2 === 0;
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
                className={`group relative flex flex-col justify-between min-h-[580px] sm:min-h-[680px] lg:min-h-[780px] xl:min-h-[850px] p-6 sm:p-10 lg:p-12 xl:p-14
                   bg-black border-white/20 ${borderBottomClass} ${borderRightClass} transition-colors duration-300 hover:bg-zinc-950/60 overflow-hidden`}
              >
                {/* Cell Header: Clean Product Name at Top (Fades Out on Hover) */}
                <div className="flex items-center justify-center w-full  z-10 transition-opacity duration-300 group-hover:opacity-0">
                  <span className="text-xs sm:text-sm font-inter text-white text-center uppercase font-medium">
                    {product.name}
                  </span>
                </div>

                {/* Dominant Product Image with Hover-Revealed Text & Action Buttons */}
                <div className="relative w-full flex-1 flex items-center justify-center my-4 sm:my-6 min-h-[420px] sm:min-h-[520px] lg:min-h-[620px] xl:min-h-[680px]">
                  <div className="relative w-full h-full min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] xl:min-h-[660px] max-w-[850px] xl:max-w-[960px] flex items-center justify-center">
                    {/* Background Product Image */}
                    <Image
                      src={product.imageSrc}
                      alt={`${product.name} LED display panel`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-contain select-none pointer-events-none drop-shadow-[0_25px_60px_rgba(0,0,0,0.85)] scale-105 sm:scale-110 lg:scale-115 transition-all duration-500 group-hover:scale-[1.18] group-hover:opacity-50"
                      priority={idx < 2}
                    />

                    {/* Content Revealed on Hover: Title, Narrative Text & Pill Buttons */}
                    <div className="absolute inset-4 sm:inset-8 lg:inset-5 flex flex-col items-center 
                    justify-start text-center z-20 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-300 ease-out pointer-events-none group-hover:pointer-events-auto">
                      {/* Product Headline */}
                      <h3 className="font-sans text-2xl sm:text-3xl lg:text-4xl font-bold text-white uppercase mb-2 sm:mb-3 drop-shadow-[0_4px_20px_rgba(0,0,0,0.95)]">
                        {product.name}
                      </h3>

                      {/* Summary Copy */}
                      <p className="font-sans text-xs sm:text-sm md:text-base text-zinc-300 font-light max-w-md mb-6 sm:mb-8 leading-relaxed drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
                        {product.summary}
                      </p>

                      {/* Action Buttons using Lumera Button component */}
                      <div className="flex items-center justify-center gap-3 sm:gap-4">
                        <Button
                          variant="white"
                          size="sm"
                          onClick={handleScrollToCta}
                        >
                          Learn more
                        </Button>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleScrollToCta}
                        >
                          Inquire
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
    </section>
  );
}

// Backward-compatible aliases for existing imports
export const ApplicationSection = OurProductSection;
export const ProductGrid = OurProductSection;

export default OurProductSection;
