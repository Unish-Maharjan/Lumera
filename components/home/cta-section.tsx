import React from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function CtaSection() {
  return (
    <section
      id="contact-cta"
      aria-labelledby="cta-heading"
      className="relative w-full min-h-[520px] sm:min-h-[580px] lg:min-h-[640px] bg-transparent overflow-hidden flex items-center justify-center py-24 sm:py-32 lg:py-40 select-none border-t border-border/40"
    >
      {/* Background Architectural Photography */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/cta-bg.jpg"
          alt="Architectural city LED billboard illuminated at night"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center pointer-events-none select-none"
        />

        {/* Lighter contrast scrim so the background city billboards and light trails are much more vivid */}
        <div
          className="absolute inset-0 bg-black/35 pointer-events-none"
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
          className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[5.75rem] font-bold tracking-tight text-white uppercase leading-[0.95] select-none mb-5 sm:mb-6 drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]"
        >
          LET&apos;S CREATE<br />
          SOMETHING <span className="text-accent drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">BRIGHTER.</span>
        </h2>

        {/* Subtitle */}
        <p className="text-sm sm:text-base md:text-lg text-white font-normal leading-relaxed max-w-xl mb-8 sm:mb-10 drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
          Have a space in mind? Let&apos;s explore what&apos;s possible.
        </p>

        {/* Primary CTA Button */}
        <Button
          variant="gold"
          size="lg"
          className="group text-xs sm:text-sm font-semibold tracking-wider uppercase px-8 sm:px-10 py-3.5 sm:py-4 shadow-lg shadow-[#d7b875]/25 hover:shadow-[#d7b875]/40"
        >
          <span>START YOUR PROJECT</span>
          <span
            className="text-sm transition-transform duration-300 group-hover:translate-x-1 inline-block"
            aria-hidden="true"
          >
            &rarr;
          </span>
        </Button>
      </Container>
    </section>
  );
}

export default CtaSection;
