"use client";

import React from "react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import { ProductDetailData } from "@/data/product-details";

interface ProductHeroProps {
  product: ProductDetailData;
}

export function ProductHero({ product }: ProductHeroProps) {
  return (
    <section
      id="overview"
      className="relative flex min-h-[80vh] sm:min-h-[85vh] lg:min-h-[90vh] w-full select-none items-center justify-center overflow-hidden bg-black text-foreground"
    >
      {/* Cosmic Horizon Background Image */}
      <div className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-hidden select-none">
        <Image
          src="/images/productdetails/hero-cosmic-bg.jpg"
          alt="Cosmic horizon cinematic landscape"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Gradients to seamlessly blend into deep black at top & bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/60 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-32 sm:h-44 bg-gradient-to-b from-transparent to-black pointer-events-none" />
      </div>

      {/* Centered Product Module Render (Smaller sized image) */}
      <div className="relative z-10 flex w-full items-center justify-center py-12 sm:py-16">
        <Container size="xl">
          <div className="flex items-center justify-center">
            <div className="relative flex aspect-[810/554] w-full max-w-[380px] sm:max-w-[460px] md:max-w-[540px] lg:max-w-[620px] items-center justify-center">
              {/* Backlight Glow matching cosmic blue horizon tones */}
              <div
                className="pointer-events-none absolute -inset-6 sm:-inset-8 rounded-full bg-gradient-to-tr from-blue-600/30 via-[#398BFF]/20 to-cyan-300/20 opacity-75 blur-[70px] sm:blur-[90px]"
                aria-hidden="true"
              />

              <Image
                src="/images/productdetails/hero-panel.webp"
                alt={`${product.name} 3D architectural LED module render`}
                fill
                priority
                sizes="(max-width: 640px) 380px, (max-width: 768px) 460px, (max-width: 1024px) 540px, 620px"
                className="object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}

export default ProductHero;
