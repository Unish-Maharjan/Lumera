"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Container from "@/components/ui/Container";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface ProtectionFeature {
  id: string;
  title: string;
  image: string;
}

const PROTECTION_FEATURES: ProtectionFeature[] = [
  {
    id: "fire-prevention",
    title: "Fire Prevention",
    image: "/images/productdetails/protection-1.jpg",
  },
  {
    id: "circuit-protection",
    title: "Circuit Protection",
    image: "/images/productdetails/protecttion-2.jpg",
  },
  {
    id: "impact-resistance",
    title: "Impact-resistant",
    image: "/images/productdetails/protection-3.jpg",
  },
];

export function ProductProtection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // 1. Heading Reveal
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // 2. Cards Stagger Reveal
      const cards = gsap.utils.toArray<HTMLElement>("[data-protection-card]");
      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          { y: 45, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.1,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // 3. Subtle Image Parallax inside frames
      cards.forEach((card) => {
        const img = card.querySelector<HTMLElement>("[data-parallax-image]");
        if (!img) return;

        gsap.fromTo(
          img,
          { yPercent: -7 },
          {
            yPercent: 7,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
              invalidateOnRefresh: true,
            },
          }
        );
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="protection"
      aria-labelledby="protection-heading"
      className="w-full bg-white text-zinc-950 py-12 sm:py-16 lg:py-24 select-none"
    >
      <Container size="xl">
        {/* Section Header */}
        <div ref={headingRef} className="max-w-4xl mx-auto text-center mb-12
         sm:mb-16 lg:mb-20 will-change-transform">
          <h2
            id="performance-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-zinc-950 font-sans mb-3 sm:mb-4"
          >
            Multi-layer Protection.
          </h2>
        </div>

        {/* 3-Card Grid Matching Page Style */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
          {PROTECTION_FEATURES.map((item) => (
            <article
              key={item.id}
              data-protection-card
              className="group flex flex-col items-center will-change-transform"
            >
              {/* Large Image Frame with subtle parallax */}
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-zinc-100 border border-zinc-200/90 shadow-sm transition-all duration-500 hover:shadow-lg hover:border-zinc-300">
                <div data-parallax-image className="relative w-full h-[115%] -top-[7.5%] will-change-transform">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
              </div>

              {/* Title */}
              <h3 className="font-inter text-lg sm:text-xl font-semibold uppercase tracking-tight 
              text-zinc-950 mt-4 sm:mt-5 text-center">
                {item.title}
              </h3>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default ProductProtection;
