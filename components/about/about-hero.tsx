import React from "react";
import Image from "next/image";
import Container from "@/components/ui/Container";

export function AboutHero() {
  return (
    <section className="relative flex min-h-[85vh] sm:min-h-[90vh] lg:min-h-screen w-full items-end overflow-hidden bg-black text-foreground select-none">
      {/* Background Architectural LED Visual with Balanced Editorial Scrims */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <Image
          src="/images/outdoor-screen.png"
          alt="Lumera architectural curved LED display installation"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center brightness-[0.88] contrast-[1.05] opacity-80 sm:opacity-85"
        />

        {/* Top Vignette for Clean Navbar Transition */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/80 via-black/40 to-transparent" />

        {/* Left-to-Right Scrim: Shields Text Legibility while Revealing the LED Display on the Right */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent" />

        {/* Bottom-to-Top Scrim: Provides Clean Contrast for Bottom-Aligned Narrative */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-transparent" />

        {/* Bottom Transition Line */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black to-transparent" />
      </div>

      {/* Content Container (Carefully Balanced Against Background) */}
      <div className="relative z-10 w-full pt-36 sm:pt-44 lg:pt-48 pb-16 sm:pb-24 lg:pb-28">
        <Container size="xl">
          <div className="max-w-4xl">
            {/* Eyebrow Label */}
            <span className="font-mono text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-accent mb-4 sm:mb-6 block drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
              ABOUT LUMERA
            </span>

            {/* Editorial Headline */}
            <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[5.5rem] font-bold uppercase leading-[0.95] tracking-tight text-white mb-6 sm:mb-8 drop-shadow-[0_3px_14px_rgba(0,0,0,0.95)]">
              Light at the scale of <span className="text-accent">architecture.</span>
            </h1>

            {/* Crisp Supporting Copy */}
            <p className="font-sans text-base sm:text-lg md:text-xl text-zinc-200 font-light leading-relaxed max-w-2xl drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
              Lumera engineers bespoke LED lighting systems and monumental digital canvases that transform physical spaces into enduring visual landmarks.
            </p>
          </div>
        </Container>
      </div>

      {/* Baseline Section Divider Line */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-white/10" aria-hidden="true" />
    </section>
  );
}

export default AboutHero;
