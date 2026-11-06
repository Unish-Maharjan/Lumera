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
  "This is Lumera.",
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

      gsap.fromTo(
        ".about-word",
        {
          opacity: 0.18,
        },
        {
          opacity: 1,
          duration: 0.04,
          stagger: 0.04,
          ease: "none",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 75%",
            end: "bottom 50%",
            scrub: 0.4,
            invalidateOnRefresh: true,
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
      className="relative z-20 w-full bg-black text-[#F7F7F5] overflow-x-clip"
    >
      {/* Top Transition Gradient: ultra-smooth eased scrim feathering extending above the section boundary */}
      <div
        className="pointer-events-none absolute -top-48 sm:-top-64 lg:-top-96 inset-x-0 h-48 sm:h-64 lg:h-96 bg-gradient-to-t 
        from-black via-black/80 to-transparent z-10"
        aria-hidden="true"
      />

      {/* Top Interior Gradient */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-32 sm:h-48 lg:h-64 bg-gradient-to-b from-black 
        via-black/80 to-transparent z-10"
        aria-hidden="true"
      />

      <Container size="xl" className="relative z-20 w-full">
        <div className="max-w-6xl xl:max-w-7xl mx-auto px-2 sm:px-4">
          <p
            ref={textRef}
            className="font-sans text-xl sm:text-2xl md:text-3xl z-20 mt-10 lg:text-[2.25rem] xl:text-[2.65rem] font-normal 
            text-white leading-[1.22] sm:leading-[1.18] tracking-[-0.015em] select-none text-left"
          >
            {/* Editorial Flowing Manifesto Words */}
            {allWords.map((word, i) => {
              // Highlight the concluding signature "This is Lumera." in champagne gold
              const isAccent = i >= allWords.length - 3;
              return (
                <span
                  key={i}
                  className={`about-word opacity-20 inline-block mr-[0.24em] will-change-[opacity] ${
                    isAccent ? "text-[#D7B875] font-semibold" : ""
                  }`}
                >
                  {word}
                </span>
              );
            })}
          </p>
        </div>
      </Container>
    </section>
  );
}

export default AboutSection;
