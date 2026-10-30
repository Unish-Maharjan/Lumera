"use client";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function HeroSection() {
  return (
    <section className="relative min-h-[100dvh] w-full overflow-hidden bg-transparent text-foreground flex flex-col justify-between">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="h-full w-full object-cover select-none pointer-events-none"
        >
          <source src="/video/hero.mp4" type="video/mp4" />
          <source src="/hero-section.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Soft, reduced scrim to keep the video clear while preserving text readability */}
        <div
          className="pointer-events-none absolute inset-0 bg-linear-to-r from-background/40 via-background/15 to-transparent"
          aria-hidden="true"
        />
      </div>

      {/* Content Container using reusable Container */}
      <Container className="relative z-10 flex-1 flex flex-col justify-between pt-24 sm:pt-28 lg:pt-32 pb-8 sm:pb-12">
        {/* Top/Center Typography & Action Row */}
        <div className="max-w-3xl flex flex-col items-start gap-6 my-auto">
          {/* Main Hero Headline using Foreground (White) */}
          <h1 className="font-sans text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight text-foreground leading-[1.05] drop-shadow-sm">
            Illuminating spaces with{" "}
            <span className="text-accent">precision</span>
          </h1>

          {/* CTAs using reusable Button component */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Button variant="gold" size="lg" className="group">
              <span>Explore Collection</span>
            </Button>
            <Button variant="secondary" size="lg">
              View Specifications
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default HeroSection;
