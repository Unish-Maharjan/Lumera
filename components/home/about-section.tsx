"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Container } from "@/components/ui/Container";

const HEADING_LINE_1 = ["Crafted", "for", "spaces."];
const HEADING_LINE_2 = ["Built", "for", "people."];

const PARAGRAPH_WORDS = [
  "From", "the", "first", "site", "assessment", "to", "the", "final", "pixel,",
  "we", "bring", "clarity,", "care,", "and", "technical", "precision", "to",
  "every", "installation.", "Our", "work", "is", "about", "more", "than", "screens",
  "it’s", "about", "creating", "moments", "people", "remember."
];

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const block2Ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current || !block2Ref.current) return;

      // Respect prefers-reduced-motion
      if (
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        gsap.set([".heading-word", ".paragraph-word"], { opacity: 1 });
        return;
      }

      gsap.registerPlugin(ScrollTrigger);

      // 1. Headline words illuminate (opacity only, no translation) as user scrolls into view
      gsap.fromTo(
        ".heading-word",
        {
          opacity: 0.15,
        },
        {
          opacity: 1,
          stagger: 0.1,
          ease: "none",
          scrollTrigger: {
            trigger: block2Ref.current,
            start: "top 80%",
            end: "top 45%",
            scrub: 1,
          },
        }
      );

      // 2. Paragraph words progressively increase in opacity as user continues scrolling
      gsap.fromTo(
        ".paragraph-word",
        {
          opacity: 0.15,
        },
        {
          opacity: 1,
          stagger: 0.05,
          ease: "none",
          scrollTrigger: {
            trigger: block2Ref.current,
            start: "top 55%",
            end: "bottom 85%",
            scrub: 1,
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
      aria-labelledby="about-heading"
      className="relative z-20 w-full bg-black text-foreground overflow-x-clip select-none"
    >
      {/* Above Gradient: extends above the section boundary to seamlessly hide and fade out the top border edge */}
      <div
        className="pointer-events-none absolute -top-32 sm:-top-48 lg:-top-64 inset-x-0 h-32 sm:h-48 lg:h-64 bg-gradient-to-t from-black via-black/85 to-transparent z-30"
        aria-hidden="true"
      />

      {/* Top Black Gradient Scrim for seamless blend from Billboard */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-28 sm:h-40 bg-gradient-to-b from-black via-black/80 to-transparent z-10"
        aria-hidden="true"
      />

      <Container className="w-full">
        {/* Block: Centered Title & Paragraph with Word-by-Word Scroll Reveal */}
        <div
          ref={block2Ref}
          className="relative pt-28 sm:pt-36 lg:pt-48 min-h-[70vh] max-w-3xl lg:max-w-4xl mx-auto flex flex-col items-center justify-center text-center"
        >
          {/* Centered Heading with Staggered Word Reveal */}
          <h2
            id="about-heading"
            className="font-heading text-3xl sm:text-5xl md:text-6xl font-bold text-foreground uppercase leading-[1.08] mb-8 sm:mb-12 select-none"
          >
            <span className="block mb-2 sm:mb-3">
              {HEADING_LINE_1.map((word, i) => (
                <span
                  key={`h1-${i}`}
                  className="heading-word inline-block mr-[0.28em] will-change-[opacity]"
                >
                  {word}
                </span>
              ))}
            </span>
            <span className="block text-accent">
              {HEADING_LINE_2.map((word, i) => (
                <span
                  key={`h2-${i}`}
                  className="heading-word inline-block mr-[0.28em] will-change-[opacity]"
                >
                  {word}
                </span>
              ))}
            </span>
          </h2>

          {/* Centered Narrative Paragraph with Word-by-Word Stagger Scrub */}
          <p className="font-sans text-base sm:text-lg lg:text-md font-light text-zinc-100 max-w-2xl mx-auto select-none">
            {PARAGRAPH_WORDS.map((word, i) => (
              <span
                key={`p-${i}`}
                className="paragraph-word inline-block mr-[0.26em] will-change-[opacity]"
              >
                {word}
              </span>
            ))}
          </p>
        </div>
      </Container>
    </section>
  );
}

export default AboutSection;
