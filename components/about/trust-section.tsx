"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

interface MetricCard {
  number: string;
  suffix: string;
  description: string;
}

const METRIC_CARDS: MetricCard[] = [
  {
    number: "40",
    suffix: "+ Projects",
    description: "Monumental Facades & Commercial Installations",
  },
  {
    number: "10",
    suffix: "+ Years",
    description: "Pioneering Architectural LED Engineering",
  },
  {
    number: "45",
    suffix: "Awards",
    description: "Recognized for Technical & Visual Excellence",
  },
  {
    number: "123",
    suffix: "+ Clients",
    description: "Trusted by Global Brands & Architects",
  },
];

export function TrustSection() {
  return (
    <section
      id="trust"
      aria-labelledby="trust-heading"
      className="relative w-full bg-transparent text-foreground py-16 sm:py-20 lg:py-24 border-t border-border/40 select-none overflow-hidden"
    >
      <Container className="w-full">
        {/* Top Half: 2-Column Split (Editorial Narrative on Left + Architectural Visual on Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-18 items-center">
          {/* Left Column: Eyebrow, Monumental Headline, Narrative & Gold Button */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center text-left">
            {/* Eyebrow Label */}
            <div className="mb-3 sm:mb-4">
              <span className="text-xs sm:text-[13px] font-mono font-medium tracking-[0.25em] text-accent uppercase">
                WHY LUMERA
              </span>
            </div>

            {/* Monumental Headline */}
            <h2
              id="trust-heading"
              className="font-sans text-3xl sm:text-5xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-foreground uppercase leading-[1.08] mb-5 sm:mb-7"
            >
              BUILT TO BECOME A<br />
              <span className="text-accent">LEGACY.</span>
            </h2>

            {/* Paragraph 1 */}
            <p className="font-sans text-sm sm:text-base lg:text-lg font-light text-muted-foreground leading-relaxed sm:leading-loose max-w-xl mb-4 sm:mb-5">
              We believe great display engineering is more than assembling panels
              together. It is about creating spaces with purpose, precision, and
              character—experiences designed to stand the test of time.
            </p>

            {/* Paragraph 2 */}
            <p className="font-sans text-sm sm:text-base lg:text-lg font-light text-muted-foreground leading-relaxed sm:leading-loose max-w-xl mb-6 sm:mb-8">
              From thoughtful planning and structural excellence to refined
              craftsmanship and meticulous execution, we bring every detail
              together to create displays that feel as monumental as they look.
              Every project is approached with care, driven by quality, and built
              with a lasting vision.
            </p>

            {/* Gold CTA Button */}
            <div>
              <Link href="/about" className="inline-block">
                <Button variant="gold" size="md">
                  About Us
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column: Architectural Photography Showcase */}
          <div className="lg:col-span-6 xl:col-span-6 flex items-center justify-center">
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3] xl:aspect-[16/11] overflow-hidden rounded-2xl bg-card border border-border/70 shadow-2xl">
              <Image
                src="/images/mall-screen.png"
                alt="Lumera architectural curved panoramic LED display installation"
                fill
                sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 50vw, 640px"
                className="object-cover object-center select-none pointer-events-none"
                priority
              />
              {/* Subtle ambient edge gradient */}
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 z-10"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>

        {/* Bottom Half: 4 Metric Cards in a Single Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 mt-12 sm:mt-16 lg:mt-20">
          {METRIC_CARDS.map((card, idx) => (
            <div
              key={idx}
              className="bg-card/70 backdrop-blur-xs border border-border/70 hover:border-accent/40 transition-colors duration-200 p-6 sm:p-7 lg:p-8 rounded-xl shadow-xl flex flex-col justify-between group"
            >
              {/* Number + Suffix */}
              <div className="flex items-baseline gap-2 mb-3 sm:mb-4">
                <span className="font-sans text-4xl sm:text-5xl font-bold tracking-tight text-foreground group-hover:text-accent transition-colors">
                  {card.number}
                </span>
                <span className="font-mono text-xs sm:text-sm font-semibold tracking-wider text-accent uppercase">
                  {card.suffix}
                </span>
              </div>

              {/* Description */}
              <p className="font-sans text-xs sm:text-sm font-light text-muted-foreground leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default TrustSection;
