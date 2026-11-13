import React from "react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import { Heading } from "@/components/ui";

export function ServiceHero() {
  return (
    <section className="relative flex min-h-dvh w-full items-center justify-center overflow-hidden bg-black text-foreground select-none pt-28 pb-20 sm:pt-36 sm:pb-28">
      {/* Background Architectural LED Visual */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <Image
          src="/images/ourservices/hero.jpg"
          alt="Monumental Lumera architectural LED screen facade illuminated at night"
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
              size="xl"
              align="center"
              className="w-full text-center"
            >
              More Than <br />
              <span className="block text-center">Just Screens</span>
            </Heading>

            {/* Supporting Subtitle */}
            <p className="font-sans text-sm sm:text-base md:text-lg text-zinc-100 font-light leading-relaxed max-w-2xl mx-auto mt-6 sm:mt-8">
              From concept to completion, we deliver end-to-end LED solutions tailored to your space, vision, and audience.
            </p>
          </div>
        </Container>
      </div>
    </section>
  );
}

export default ServiceHero;
