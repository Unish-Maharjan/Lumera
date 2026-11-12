import React from "react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import { Heading } from "@/components/ui";
import { ProductDetailData } from "@/data/product-details";

interface ProductHeroProps {
  product: ProductDetailData;
}

export function ProductHero({ product }: ProductHeroProps) {
  // Split product name into two balanced lines matching the editorial hero typography
  const nameParts = product.name ? product.name.trim().split(/\s+/) : ["LUMERA", "MATRIX"];
  const firstName = nameParts[0];
  const secondName = nameParts.slice(1).join(" ");

  return (
    <section
      id="overview"
      className="relative flex min-h-dvh w-full items-center justify-center overflow-hidden bg-black text-foreground select-none pt-28 pb-20 sm:pt-36 sm:pb-28"
    >
      {/* Background Architectural LED Visual */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <Image
          src="/images/product-detail-hero.jpg"
          alt={`${product.name} architectural LED display integration`}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center brightness-[0.85]"
        />

        {/* Bottom Vignette for Smooth Transition to the Next Section */}
        <div
          className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black via-black/70 to-transparent"
          aria-hidden="true"
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full">
        <Container size="xl">
          <div className="relative max-w-4xl mx-auto text-center translate-y-45 flex flex-col items-center">
            {/* Main Headline matching the editorial design */}
            <Heading
              as="h1"
              size="2xl"
              align="center"
              className="w-full text-center"
            >
              {firstName} <br />
              {secondName && <span className="block text-center">{secondName}</span>}
            </Heading>

            {/* Supporting Subtitle */}
            <p className="font-sans text-sm sm:text-base md:text-lg text-zinc-100 font-light leading-relaxed max-w-2xl mx-auto mt-6 sm:mt-8">
              {product.subheadline ||
                product.headline ||
                "Lumera engineers bespoke LED lighting systems and monumental digital canvases that transform physical spaces into enduring visual landmarks."}
            </p>
          </div>
        </Container>
      </div>
    </section>
  );
}

export default ProductHero;
