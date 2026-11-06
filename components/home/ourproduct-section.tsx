"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
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
      className="relative bg-[#F7F7F5] pt-16 sm:pt-24 lg:pt-32 select-none overflow-hidden"
    >
      <Container size="xl">
        {/* Section Header */}
        <div className="max-w-5xl mx-auto mb-12 sm:mb-16 lg:mb-20 text-center">
          <h2
            id="products-heading"
            className="font-heading text-3xl sm:text-5xl md:text-6xl font-bold text-zinc-950 uppercase mb-4 sm:mb-5 tracking-tight"
          >
            Displays for <span className="text-[#D7B875]">every</span> space.
          </h2>
        </div>

        {/* Two-Column Product Grid with Clean Gaps & Proportional Sizing */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-8">
          {PRODUCTS.map((product, idx) => (
            <article
              key={product.id}
              className="group relative flex flex-col justify-between min-h-[420px] sm:min-h-[480px] lg:min-h-[540px] p-6 sm:p-8 
                 rounded-2xl bg-white border border-[#E5E5E0] shadow-sm hover:shadow-md 
                 transition-all duration-300 overflow-hidden"
            >
              {/* Cell Header: Clean Product Name at Top (Fades Out on Hover) */}
              <div className="flex items-center justify-center w-full z-10 transition-opacity duration-300 group-hover:opacity-0">
                <span className="text-xs sm:text-sm font-sans text-zinc-700 text-center uppercase tracking-widest font-semibold">
                  {product.name}
                </span>
              </div>

              {/* Dominant Product Image with Hover-Revealed Text & Action Buttons */}
              <div className="relative w-full flex-1 flex items-center justify-center my-2 sm:my-3 min-h-[320px] sm:min-h-[380px] lg:min-h-[420px]">
                <div className="relative w-full h-full max-w-[640px] flex items-center justify-center">
                  {/* Background Product Image (Remains fully visible on hover) */}
                  <Image
                    src={product.imageSrc}
                    alt={`${product.name} LED display panel`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-contain select-none pointer-events-none drop-shadow-[0_20px_45px_rgba(0,0,0,0.12)] scale-110 sm:scale-115 
                    transition-all duration-500 group-hover:scale-[1.18] group-hover:translate-y-2 sm:group-hover:translate-y-4"
                    priority={idx < 2}
                  />

                  {/* Content Revealed on Hover: Shifted to Top so it doesn't block the product image */}
                  <div className="absolute top-0 inset-x-0 flex flex-col items-center justify-start text-center z-20 opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 transition-all duration-300 ease-out pointer-events-none group-hover:pointer-events-auto px-4 pt-1">
                    {/* Product Headline */}
                    <h3 className="font-heading text-lg sm:text-xl lg:text-2xl font-bold text-zinc-950 uppercase mb-1.5">
                      {product.name}
                    </h3>

                    {/* Summary Copy */}
                    <p className="font-sans text-xs sm:text-sm text-zinc-700 font-normal max-w-md mb-3 sm:mb-4 leading-relaxed">
                      {product.summary}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-center gap-3 sm:gap-4">
                      <Link href="/products">
                        <button
                          type="button"
                          className="h-8 sm:h-9 px-5 sm:px-6 text-xs uppercase font-semibold rounded-full bg-black text-[#F7F7F5] hover:bg-zinc-800 transition-all cursor-pointer shadow-sm active:scale-95"
                        >
                          Learn more
                        </button>
                      </Link>

                      <button
                        type="button"
                        onClick={handleScrollToCta}
                        className="h-8 sm:h-9 px-5 sm:px-6 text-xs uppercase font-semibold rounded-full border border-black/30 text-black hover:bg-black hover:text-[#F7F7F5] transition-all cursor-pointer active:scale-95"
                      >
                        Inquire
                      </button>
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
