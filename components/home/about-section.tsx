"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Container } from "@/components/ui/Container";

const PARAGRAPH_PARTS = [
  "Crafted for spaces, built for people.",
  "Lumera transforms architectural surfaces into enduring visual landmarks.",
  "In the disciplines of monumental facades, corporate canvases, virtual production stages, and bespoke microLED displays.",
  "Between structural permanence and living light.",
  "Precise. Resilient. Visionary.",
];

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  // Flatten text into individual words for silky smooth scroll-driven illumination
  const allWords = PARAGRAPH_PARTS.join(" ").split(/\s+/);

  useGSAP(
    () => {
      if (!sectionRef.current || !textRef.current) return;

      // Respect prefers-reduced-motion accessibility
      if (
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        gsap.set(".about-word", { opacity: 1 });
        return;
      }

      gsap.registerPlugin(ScrollTrigger);

      // Progressive editorial word illumination on scroll
      gsap.fromTo(
        ".about-word",
        {
          opacity: 0.2,
        },
        {
          opacity: 1,
          stagger: 0.02,
          ease: "none",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 80%",
            end: "bottom 60%",
            scrub: 0.8,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="about"
      aria-label="About Lumera"
      className="relative z-20 w-full bg-black text-[#F7F7F5] overflow-x-clip select-none py-24 sm:py-32 md:py-40 lg:py-48 shadow-[0_-20px_50px_rgba(0,0,0,0.4)]"
    >
      {/* Top Transition Gradient: ultra-smooth eased scrim feathering extending above the section boundary */}
      <div
        className="pointer-events-none absolute -top-20 sm:-top-28 lg:-top-36 inset-x-0 h-20 sm:h-28 lg:h-36 z-30"
        style={{
          background:
            "linear-gradient(to top, #000000 0%, rgba(0,0,0,0.985) 12%, rgba(0,0,0,0.93) 24%, rgba(0,0,0,0.83) 36%, rgba(0,0,0,0.68) 48%, rgba(0,0,0,0.50) 60%, rgba(0,0,0,0.32) 71%, rgba(0,0,0,0.18) 81%, rgba(0,0,0,0.08) 89%, rgba(0,0,0,0.02) 95%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      {/* Bottom Black Gradient Scrim */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-16 sm:h-24 bg-gradient-to-t from-black via-black/80 to-transparent z-10"
        aria-hidden="true"
      />

      <Container size="xl" className="w-full">
        <div className="max-w-6xl xl:max-w-7xl mx-auto px-2 sm:px-4">
          <p
            ref={textRef}
            className="font-sans text-2xl sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-[3.65rem] font-normal text-white leading-[1.22] sm:leading-[1.18] tracking-[-0.015em] select-none text-left"
          >
            {/* Top-Left Hanging/Inline Meta Label matching reference image */}
            {/* <span className="inline-block text-xs sm:text-sm md:text-base font-sans text-zinc-400 font-normal mr-8 sm:mr-16 lg:mr-24 align-baseline select-none">
              About Lumera
            </span> */}

            {/* Editorial Flowing Manifesto Words */}
            {allWords.map((word, i) => {
              const isLast = i === allWords.length - 1;
              return (
                <span
                  key={i}
                  className={`about-word inline-block mr-[0.24em] will-change-[opacity] ${
                    isLast ? "text-accent font-medium" : ""
                  }`}
                >
                  {word}
                </span>
              );
            })}
            <span className="about-word inline-block text-white font-medium will-change-[opacity]">
              This is Lumera.
            </span>
          </p>
        </div>
      </Container>
    </section>
  );
}

export default AboutSection;
