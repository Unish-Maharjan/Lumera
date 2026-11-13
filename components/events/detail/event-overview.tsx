"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { EventCaseStudy } from "@/data/event-case-study";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface EventOverviewProps {
  event: EventCaseStudy;
}

export function EventOverview({ event }: EventOverviewProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current.querySelectorAll("[data-reveal]"),
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: contentRef.current,
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
      id="overview"
      aria-labelledby="overview-heading"
      className="relative w-full bg-white text-zinc-950 py-20 sm:py-28 lg:py-36 select-none overflow-hidden"
    >
      <Container size="xl">
        <div ref={contentRef}>
          {/* Centered Main Section Title */}
          <div data-reveal className="max-w-3xl mx-auto text-center mb-12 sm:mb-16 lg:mb-20">
            <Heading
              as="h2"
              id="overview-heading"
              size="xl"
              align="center"
              variant="dark"
              className="text-zinc-950 uppercase"
            >
              EVENT OVERVIEW
            </Heading>
          </div>

          {/* Editorial Split Narrative */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            {/* Left Column: Monumental Headline */}
            <div data-reveal className="lg:col-span-5">
              <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-zinc-950 leading-[1.08] uppercase">
                {event.overview.title}
              </h3>
            </div>

            {/* Right Column: Narrative Story Paragraphs */}
            <div
              data-reveal
              className="lg:col-span-7 space-y-6 font-sans text-base sm:text-lg lg:text-xl text-zinc-600 font-light leading-relaxed"
            >
              {event.overview.story.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>

          {/* Quick Metrics Bar with Clean Hairline Border */}
          <div
            data-reveal
            className="mt-14 sm:mt-20 pt-10 sm:pt-14 border-t border-zinc-200 grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12"
          >
            {event.overview.metrics.map((metric) => (
              <div key={metric.label} className="flex flex-col">
                <span className="block font-mono text-xs uppercase tracking-wider text-zinc-400 mb-2 font-medium">
                  {metric.label}
                </span>
                <span className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-950 tracking-tight tabular-nums">
                  {metric.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

export default EventOverview;
