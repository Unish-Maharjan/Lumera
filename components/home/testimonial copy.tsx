"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Container } from "@/components/ui/Container";

interface Testimonial {
  name: string;
  initial: string;
  color: string;
  quote: string;
}

const ROW_1: Testimonial[] = [
  {
    name: "Ava Sinclair",
    initial: "A",
    color: "#2e5a44",
    quote:
      "The team was efficient in getting back to us and the service and knowledge was outstanding. Completely trusted their advice from start to finish.",
  },
  {
    name: "Marcus Lee",
    initial: "M",
    color: "#8a4868",
    quote:
      "A professional business, it's a pleasure working with them. Great communication and high levels of customer service. Can highly recommend.",
  },
  {
    name: "Priya Nandan",
    initial: "P",
    color: "#4e458a",
    quote:
      "They coordinated and resourced the whole project and the whole procedure went without a single incident. Highly recommend the full support team.",
  },
  {
    name: "Tomas Reyes",
    initial: "T",
    color: "#285885",
    quote:
      "A fantastic service from start to finish. They dealt with every aspect of a complicated project and made it feel effortless.",
  },
];

const ROW_2: Testimonial[] = [
  {
    name: "Elena Kovacs",
    initial: "E",
    color: "#7a4420",
    quote:
      "The showroom is a stunning showcase of what the team can achieve, and the level of care and attention that goes into each project shows.",
  },
  {
    name: "Jonas Weber",
    initial: "J",
    color: "#2e5a44",
    quote:
      "Extremely pleased with the whole team. Everything was handled very professionally to create a beautiful end result.",
  },
  {
    name: "Sofia Marchetti",
    initial: "S",
    color: "#6e3237",
    quote:
      "Very happy to recommend them for structural work. Nothing seemed too much trouble and communication was excellent throughout.",
  },
  {
    name: "Owen Delacroix",
    initial: "O",
    color: "#4e458a",
    quote:
      "An absolute pleasure to work with at both a professional and personal level. The customer service is second to none.",
  },
];

function Stars() {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="13" height="13" viewBox="0 0 20 20" fill="#D7B875">
          <path d="M10 1l2.6 6.2 6.7.6-5.1 4.4 1.6 6.6L10 15.6 4.2 18.8l1.6-6.6-5.1-4.4 6.7-.6L10 1z" />
        </svg>
      ))}
    </div>
  );
}

function Card({ t }: { t: Testimonial }) {
  return (
    <div className="testimonial-card w-[320px] sm:w-[360px] shrink-0 p-6 sm:p-7 bg-[#0a0a0b] border border-white/[0.08] hover:border-white/20 transition-all duration-300 rounded-none flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-3.5 mb-4">
          <div
            className="w-10 h-10 rounded-full shrink-0 flex items-center justify-center text-white text-sm font-semibold border border-white/10"
            style={{ backgroundColor: t.color }}
          >
            {t.initial}
          </div>
          <div>
            <p className="text-sm font-semibold text-white leading-tight mb-1 font-sans">
              {t.name}
            </p>
            <Stars />
          </div>
        </div>
        <blockquote className="text-[13px] sm:text-sm text-zinc-400 font-light leading-relaxed min-h-[88px] font-sans">
          &ldquo;{t.quote}&rdquo;
        </blockquote>
      </div>

      <div className="flex items-center justify-between pt-4 mt-4 border-t border-white/[0.06]">
        <span className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-zinc-500 hover:text-[#D7B875] transition-colors font-sans cursor-pointer">
          <svg width="12" height="10" viewBox="0 0 14 11" fill="none">
            <path d="M0.6 0V6H13.1" stroke="currentColor" strokeWidth="1.2" />
            <rect x="9.2" y="1" width="4" height="4" fill="currentColor" />
          </svg>
          read more
        </span>
        <svg width="16" height="16" viewBox="0 0 20 20">
          <path
            fill="#4285F4"
            d="M19.6 10.2c0-.7-.06-1.4-.18-2H10v3.8h5.4a4.6 4.6 0 0 1-2 3v2.5h3.2c1.9-1.7 3-4.3 3-7.3z"
          />
          <path
            fill="#34A853"
            d="M10 20c2.7 0 5-.9 6.6-2.5l-3.2-2.5c-.9.6-2 1-3.4 1-2.6 0-4.8-1.8-5.6-4.1H1.1v2.6A10 10 0 0 0 10 20z"
          />
          <path
            fill="#FBBC05"
            d="M4.4 11.9a6 6 0 0 1 0-3.8V5.5H1.1a10 10 0 0 0 0 9l3.3-2.6z"
          />
          <path
            fill="#EA4335"
            d="M10 4a5.4 5.4 0 0 1 3.8 1.5l2.9-2.8A9.6 9.6 0 0 0 10 0 10 10 0 0 0 1.1 5.5l3.3 2.6C5.2 5.8 7.4 4 10 4z"
          />
        </svg>
      </div>
    </div>
  );
}

export function TestimonialSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;
      gsap.registerPlugin(ScrollTrigger);

      // Smooth entrance
      gsap.fromTo(
        ".testimonial-card",
        { y: 25, opacity: 0.3 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power2.out",
          stagger: 0.05,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );

      // Opposite direction scrubbing marquee
      if (row1Ref.current) {
        gsap.to(row1Ref.current, {
          xPercent: -20,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      }

      if (row2Ref.current) {
        gsap.fromTo(
          row2Ref.current,
          { xPercent: -20 },
          {
            xPercent: 0,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          }
        );
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative z-10 py-20 sm:py-28 lg:py-32 bg-black text-foreground overflow-hidden font-sans border-t border-white/[0.08] select-none"
    >
      <Container className="w-full mb-12 sm:mb-16">
        <div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-4 sm:mb-5 max-w-2xl uppercase leading-[1.05] font-sans">
            What our clients say about us.
          </h2>
          <div className="flex items-center gap-2 text-sm font-sans pt-1">
            <Stars />
            <span className="font-semibold text-white ml-1">5.0</span>
            <span className="text-zinc-500">/ 58 reviews</span>
          </div>
        </div>
      </Container>

      <div className="flex flex-col gap-5 sm:gap-6">
        <div className="overflow-hidden w-full">
          <div ref={row1Ref} className="flex gap-5 sm:gap-6 w-max will-change-transform">
            {[...ROW_1, ...ROW_1, ...ROW_1].map((t, i) => (
              <Card key={`r1-${i}`} t={t} />
            ))}
          </div>
        </div>
        <div className="overflow-hidden w-full">
          <div ref={row2Ref} className="flex gap-5 sm:gap-6 w-max will-change-transform">
            {[...ROW_2, ...ROW_2, ...ROW_2].map((t, i) => (
              <Card key={`r2-${i}`} t={t} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default TestimonialSection;
