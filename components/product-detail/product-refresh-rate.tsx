"use client";

import React from "react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import { ProductDetailData } from "@/data/product-details";

export interface ProductRefreshRateProps {
  product?: ProductDetailData;
  title?: string;
  description?: string;
  imageSrc?: string;
  imageAlt?: string;
}

export function ProductRefreshRate({
  title = "120Hz High Frame Rate",
  description = "Leading 120Hz Motion Capture Technology delivers ultra-smooth, jitter-free visuals with no motion blur even in fast-moving scenes. It perfectly captures every dynamic moment, enabling seamless playback of high-speed footage for auto launches and offering an incredibly fluid, immersive viewing experience.",
  imageSrc = "/refresh-rate.jpg",
  imageAlt = "120Hz high frame rate motion capture automotive display",
}: ProductRefreshRateProps) {
  return (
    <section
      id="refresh-rate"
      aria-labelledby="refresh-rate-heading"
      className="relative w-full bg-black text-white py-16 sm:py-20 lg:py-28 select-none overflow-hidden border-t border-zinc-900"
    >
      <Container size="xl">
        {/* Centered Header: Title and Description */}
        <div className="max-w-4xl mx-auto text-center mb-10 sm:mb-14">
          <h2
            id="refresh-rate-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white font-sans mb-3 sm:mb-4"
          >
            {title}
          </h2>

          <p className="font-inter font-[family-name:var(--font-inter)] text-xs sm:text-sm md:text-base text-zinc-300 font-light leading-relaxed max-w-3xl mx-auto">
            {description}
          </p>
        </div>

        {/* Centerpiece 120Hz High Frame Rate Visual */}
        <div className="relative w-full max-w-6xl mx-auto aspect-[16/10] sm:aspect-[16/9] overflow-hidden rounded-xl sm:rounded-2xl border border-zinc-800/80 bg-zinc-900 shadow-2xl">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 1200px"
            className="object-cover object-center transition-transform duration-700 ease-out hover:scale-105"
            priority
          />
        </div>
      </Container>
    </section>
  );
}

export default ProductRefreshRate;
