"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EventCaseStudy } from "@/data/event-case-study";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface EventHeroProps {
  event?: EventCaseStudy;
}

const HERO_IMAGES = [
  {
    src: "/images/events/concert-hero.jpg",
    alt: "Nepal Concert Stage Front LED Display Installation",
  },
  {
    src: "/images/events/concert-hero-2.jpg",
    alt: "Nepal Concert Stadium Elevated View LED Screen Showcase",
  },
  {
    src: "/images/events/concert-hero-3.jpg",
    alt: "Nepal Concert Daylight Stage Performance and Crowd Atmosphere",
  },
];

export function EventHero({ event }: EventHeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const imgWrapperRef = useRef<HTMLDivElement>(null);
  const [currentIdx, setCurrentIdx] = useState(0);

  // Auto-advance images every 5 seconds with smooth crossfade
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      if (imgWrapperRef.current && heroRef.current) {
        gsap.to(imgWrapperRef.current, {
          yPercent: 12,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    },
    { scope: heroRef }
  );

  return (
    <section
      ref={heroRef}
      id="hero"
      aria-label="Concert Hero Visual"
      className="relative w-full h-[90vh] overflow-hidden bg-black select-none"
    >
      {/* Concert Photographs with Automatic Crossfade */}
      <div ref={imgWrapperRef} className="absolute inset-0 will-change-transform">
        {HERO_IMAGES.map((img, idx) => (
          <div
            key={img.src}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentIdx
                ? "opacity-100 z-10"
                : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            <Image
              src={img.src}
              alt={event?.title ?? img.alt}
              fill
              priority={idx === 0}
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
        ))}
      </div>

      {/* Subtle Bottom Vignette for seamless transition to Overview */}
      <div
        className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none z-20"
        aria-hidden="true"
      />

      {/* Centered White Pagination Indicators */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2.5 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
        {HERO_IMAGES.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setCurrentIdx(i)}
            aria-label={`Show slide ${i + 1}`}
            className={`h-2 rounded-full transition-all duration-500 cursor-pointer ${
              i === currentIdx
                ? "w-7 bg-white shadow-sm"
                : "w-2 bg-white/40 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

export default EventHero;
