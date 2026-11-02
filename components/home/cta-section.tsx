import React from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function CtaSection() {
  return (
    <section
      id="contact-cta"
      aria-labelledby="cta-heading"
      className="relative w-full min-h-[420px] sm:min-h-[480px] lg:min-h-[520px] bg-transparent overflow-hidden flex items-center justify-center py-16 sm:py-24 lg:py-28 select-none border-t border-border/40"
    >
      {/* Background Architectural Photography */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/cta-bg.jpg"
          alt="Architectural city LED billboard illuminated at night"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center pointer-events-none select-none grayscale contrast-[1.1] brightness-[0.75]"
        />

        {/* Lighter contrast scrim so the background city billboards and light trails are much more vivid */}
        <div
          className="absolute inset-0 bg-black/40 pointer-events-none"
          aria-hidden="true"
        />

        {/* Minimal Edge Blending */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-background/80 to-transparent"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background/80 to-transparent"
          aria-hidden="true"
        />
      </div>

      {/* Centered Content Layout matching Figma */}
      <Container className="relative z-10 w-full flex flex-col items-center justify-center text-center">
        {/* Monumental Headline with high readability drop shadow */}
        <h2
          id="cta-heading"
          className="font-heading text-2xl sm:text-4xl md:text-5xl lg:text-5xl font-bold text-white uppercase select-none mb-4 sm:mb-5 drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)] max-w-2xl"
        >
          LET&apos;S CREATE<br />
          SOMETHING <span className="text-accent">BRIGHTER.</span>
        </h2>

        {/* Subtitle */}
        <p className="font-inter text-xs sm:text-sm md:text-base text-white/80 font-normal max-w-md mb-6 sm:mb-8">
          Have a space in mind? Let&apos;s explore what&apos;s possible.
        </p>

        {/* Primary CTA Button */}
        <Button variant="gold" size="md">
          Start Your Project
        </Button>
      </Container>
    </section>
  );
}

export default CtaSection;
