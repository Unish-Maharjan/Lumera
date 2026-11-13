"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { EventCaseStudy } from "@/data/event-case-study";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface EventConcertActionProps {
  inAction: EventCaseStudy["inAction"];
}

export function EventConcertAction({ inAction }: EventConcertActionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const heroFrameRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      // Parallax on full-width panoramic concert image
      if (heroFrameRef.current) {
        const img = heroFrameRef.current.querySelector("img");
        if (img) {
          gsap.fromTo(
            img,
            { yPercent: -10, scale: 1.08 },
            {
              yPercent: 10,
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: heroFrameRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.4,
              },
            }
          );
        }
      }

      // Quote reveal
      if (quoteRef.current) {
        gsap.fromTo(
          quoteRef.current,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: quoteRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
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
      id="concert-in-action"
      aria-labelledby="concert-in-action-heading"
      className="relative w-full bg-black text-white py-24 sm:py-32 lg:py-40 select-none overflow-hidden border-t border-zinc-900"
    >
      <Container size="xl">
        {/* Chapter Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs uppercase tracking-widest text-[#D7B875]">
              05 / THE CONCERT IN ACTION
            </span>
            <div className="h-px flex-1 max-w-[80px] bg-[#D7B875]/40" />
          </div>

          <Heading
            as="h2"
            id="concert-in-action-heading"
            size="xl"
            variant="white"
            align="left"
            className="tracking-tight mb-4"
          >
            NIGHTFALL AT DASARATH. <br />
            <span className="text-[#D7B875]">THE STAGE ILLUMINATES.</span>
          </Heading>

          <p className="font-sans text-base sm:text-lg text-zinc-300 font-light leading-relaxed max-w-2xl">
            When the stadium lights dimmed, the 540 m² LED installation came alive in perfect harmony with 120,000 watts of audio and synchronized pyro.
          </p>
        </div>

        {/* Monumental Full-Width Panoramic Visual */}
        <div
          ref={heroFrameRef}
          className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800 shadow-2xl mb-12 sm:mb-16"
        >
          <Image
            src={inAction.mainImage}
            alt="Concert stage illuminated at night in Nepal"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center will-change-transform brightness-[0.9] contrast-[1.05]"
          />

          {/* Live Concert Atmosphere Scrim */}
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"
            aria-hidden="true"
          />

          {/* Live Telemetry Badge */}
          <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs font-mono text-zinc-300 z-10 pointer-events-none">
            <span className="bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10">
              LIVE PERSPECTIVE · 45,000+ AUDIENCE
            </span>
            <span className="bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 hidden sm:inline-block text-[#D7B875]">
              100% UNBROKEN BROADCAST FEED
            </span>
          </div>
        </div>

        {/* 2x2 High-Impact Supporting Perspectives */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 mb-16 sm:mb-24">
          {inAction.secondaryImages.map((imgItem, idx) => (
            <div
              key={idx}
              className="group flex flex-col justify-start"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800/80 shadow-xl">
                <Image
                  src={imgItem.src}
                  alt={imgItem.caption}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-104"
                />
              </div>
              <p className="mt-3.5 font-mono text-xs text-zinc-400">
                {imgItem.caption}
              </p>
            </div>
          ))}
        </div>

        {/* Editorial Production Quote */}
        <div
          ref={quoteRef}
          className="relative max-w-4xl mx-auto rounded-2xl bg-zinc-900/40 border border-zinc-800/80 p-8 sm:p-12 lg:p-16 text-center"
        >
          <svg
            className="w-10 h-10 text-[#D7B875]/30 mx-auto mb-6"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>

          <blockquote className="font-heading text-xl sm:text-2xl lg:text-3xl text-zinc-100 font-medium leading-snug tracking-tight mb-8">
            &ldquo;{inAction.quote}&rdquo;
          </blockquote>

          <div className="font-mono text-xs sm:text-sm">
            <span className="font-bold text-[#D7B875] block uppercase tracking-wider">
              {inAction.quoteAuthor}
            </span>
            <span className="text-zinc-500 uppercase tracking-widest text-[11px]">
              {inAction.quoteRole}
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default EventConcertAction;

