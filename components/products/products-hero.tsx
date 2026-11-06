import React from "react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import { Heading } from "../ui";

export function ProductsHero() {
  return (
    <section className="relative flex min-h-dvh sm:min-h-dvh lg:min-h-dvh w-full 
    items-center justify-center overflow-hidden bg-black text-foreground pt-28 pb-20 sm:pt-36 sm:pb-28">
      {/* Background Architectural LED Visual */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/images/products-hero.png"
          alt="Lumera architectural curved LED display integration"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center brightness-[0.85]"
        />

        {/* Bottom Vignette for Smooth Transition to the Next Section */}
        <div
          className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black via-black/80
           to-transparent"
          aria-hidden="true"
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full">
        <Container size="xl">
          <div className="relative max-w-4xl mx-auto text-center translate-y-45 flex
           flex-col items-center">
            {/* Main Headline matching the editorial design */}
              <Heading
                as="h1"
                size="2xl"
                align="center"
                className="w-full text-center">
                  High Performance <br />
                  <span className="block text-center">Hardware</span>
                </Heading>
                         

            {/* Supporting Subtitle */}
            <p className="font-sans text-sm sm:text-base md:text-lg text-zinc-100 font-light 
             max-w-2xl mx-auto mt-6 sm:mt-8">
              From ultra-fine pitch MicroLED surfaces to monumental outdoor media
              facades, thermal endurance, and optical purity.
            </p>
          </div>
        </Container>
      </div>
    </section>
  );
}

export default ProductsHero;

