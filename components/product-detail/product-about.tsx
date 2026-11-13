"use client";

import React from "react";
import Container from "@/components/ui/Container";
import { ProductDetailData } from "@/data/product-details";

interface ProductAboutProps {
  product: ProductDetailData;
  title?: string;
  headline?: string;
  tagline?: string;
  highlights?: string;
  specsLine?: string;
}

export function ProductAbout({
  product,
  title,
  tagline,
  highlights,
  specsLine,
}: ProductAboutProps) {
  const displayTitle = title || product.name || "Upanel5";
  const displayTagline =
    tagline || product.subheadline || "See the Difference, Save the Difference";
  const displayHighlights =
    highlights ||
    "Ultimate visuals | Superior Efficiency | Unrivaled Safety | Versatile, User-Friendly";
  const displaySpecsLine =
    specsLine ||
    `${displayTitle} : ${product.pitchRange || "P0.6/0.7/0.9/1.2/1.5"}`;

  return (
    <section
      id="product-about"
      aria-label={`About ${displayTitle}`}
      className="relative w-full bg-black text-white py-14 sm:py-18 lg:py-24 select-none overflow-hidden"
    >
      <Container size="xl">
        {/* Title name centered at the middle with other details below it */}
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          {/* Centered Product Title */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-white font-sans mb-3 sm:mb-4">
            {displayTitle}
          </h2>

          {/* Headline */}
          {/* <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-3 tracking-tight">
            {displayHeadline}
          </h3> */}

          {/* Tagline */}
          <p className="text-xs sm:text-sm text-zinc-400 font-mono tracking-wide mb-1.5">
            {displayTagline}
          </p>

          {/* Bullet Highlights */}
          <p className="text-xs sm:text-sm text-zinc-400 font-mono tracking-wide mb-1.5">
            {displayHighlights}
          </p>

          {/* Specs / Pitch Range */}
          <p className="text-xs sm:text-sm text-zinc-400 font-mono tracking-wide">
            {displaySpecsLine}
          </p>
        </div>
      </Container>
    </section>
  );
}

export default ProductAbout;
