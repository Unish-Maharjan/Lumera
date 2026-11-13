"use client";

import React from "react";
import Image from "next/image";
import Container from "@/components/ui/Container";

interface ProductVisualsProps {
  title?: string;
  subtitle?: string;
  imageSrc?: string;
  imageAlt?: string;
}

export function ProductVisuals({
  title = "Ultimate visuals",
  subtitle = "High White Screen Uniformity | EDL+ (Enhance Drive Level+) Driving Tech | Ensuring high consistency at low gray and high refresh while achieving low power consumption and low temperature rise",
  imageSrc = "/images/productdetails/ultimate-visuals-mall.jpg",
  imageAlt = "Ultimate visuals display installation",
}: ProductVisualsProps) {
  return (
    <section
      id="ultimate-visuals"
      aria-labelledby="ultimate-visuals-title"
      className="relative w-full bg-white text-zinc-950 py-16 sm:py-20 lg:py-28 select-none overflow-hidden"
    >
      <Container size="xl">
        {/* Header: Title and Subtitle */}
        <div className="max-w-4xl mx-auto text-center mb-10 sm:mb-14">
          <h2
            id="ultimate-visuals-title"
            className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-zinc-950 font-sans mb-3 sm:mb-4"
          >
            {title}
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-zinc-600 font-sans leading-relaxed max-w-3xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Big Centered Visual Image */}
        <div className="relative w-full max-w-6xl mx-auto aspect-[16/10] sm:aspect-[16/9] overflow-hidden rounded-xl sm:rounded-2xl shadow-sm border border-zinc-200/80 bg-zinc-100">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 1200px"
            className="object-cover object-center"
            priority
          />
        </div>
      </Container>
    </section>
  );
}

export default ProductVisuals;

