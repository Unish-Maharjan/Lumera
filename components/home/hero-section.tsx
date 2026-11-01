"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function HeroSection() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative min-h-[100dvh] w-full overflow-hidden bg-transparent text-foreground flex flex-col justify-end items-center">
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
          <source src="/video/hero-section (3).mp4" type="video/mp4" />
          <source src="/hero-section.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Ambient bottom-weighted gradient scrim */}
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/50 to-transparent"
          aria-hidden="true"
        />
      </div>

      {/* Content Container - Anchored at the Bottom Middle & Disappears on Scroll */}
      <Container className="relative z-10 w-full flex flex-col items-center justify-end text-center pt-24 pb-12 sm:pb-16 lg:pb-20 mt-auto">
        <div
          className={`max-w-4xl w-full flex flex-col items-center justify-center text-center gap-4 sm:gap-5 transition-all duration-300 ease-out ${
            isScrolled
              ? "opacity-0 -translate-y-4 pointer-events-none"
              : "opacity-100 translate-y-0 pointer-events-auto"
          }`}
        >
          {/* Main Hero Headline */}
          <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground uppercase leading-[1.08] max-w-3xl">
            Illuminating spaces<br />
            with <span className="text-accent">precision.</span>
          </h1>

          {/* Small CTA Action Button */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-1">
            <Link href="#products">
              <Button variant="gold" size="sm">
                Explore Collection
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default HeroSection;
