"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Heading from "@/components/ui/Heading";
import Button from "@/components/ui/Button";

export interface ProtectionFeature {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  spec: string;
}

const PROTECTION_FEATURES: ProtectionFeature[] = [
  {
    id: "fire-prevention",
    title: "Fire Prevention",
    subtitle:
      "UL94V-0 highest-grade flame-retardant materials prevent ignition and contain thermal runaway.",
    image: "/images/productdetails/protection-1.jpg",
    spec: "UL94V-0 Certified",
  },
  {
    id: "circuit-protection",
    title: "Circuit Protection",
    subtitle:
      "Triple active surge suppression, optocoupler isolation, and dual-redundant power loop safeguards.",
    image: "/images/productdetails/protecttion-2.jpg",
    spec: "Surge Suppression",
  },
  {
    id: "impact-resistance",
    title: "Impact-resistant Lamp Boards",
    subtitle:
      "GOB nano-resin encapsulation absorbs mechanical impact, moisture, dust, and transit vibration.",
    image: "/images/productdetails/protection-3.jpg",
    spec: "High Tensile GOB",
  },
];

export function ProductProtection() {
  return (
    <section
      id="protection"
      aria-labelledby="protection-heading"
      className="w-full bg-[#FAFAF8] py-20 sm:py-28 lg:py-32 text-zinc-950 select-none border-t border-zinc-200/80"
    >
      <Container size="xl">
        {/* Section Header */}
        <div className="max-w-4xl mx-auto text-center mb-12 sm:mb-16 lg:mb-20">
          <Heading
            as="h2"
            id="protection-heading"
            size="xl"
            align="center"
            variant="dark"
          >
            Multi-layer Protection, Stable & Reliable
          </Heading>
          <p className="mt-4 sm:mt-5 text-xs sm:text-sm md:text-base text-zinc-600 font-light leading-relaxed max-w-3xl mx-auto text-center">
            All core hardware adopts UL94V-0 highest-grade flame-retardant materials, equipped with triple
            safety designs integrating active protection and passive backup.
          </p>
        </div>

        {/* 3-Card Protection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {PROTECTION_FEATURES.map((item) => (
            <div key={item.id} className="flex flex-col items-center group">
              {/* Card Container with Amber Border Lip */}
              <div className="w-full bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-4 border border-zinc-200/80 border-b-4 border-b-[#D7B875] shadow-sm hover:shadow-xl hover:border-[#D7B875]/80 transition-all duration-500 overflow-hidden">
                <div className="relative aspect-[16/9] w-full rounded-xl sm:rounded-2xl overflow-hidden bg-black flex items-center justify-center">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>
              </div>

              {/* Title, Subtitle, and Action Button */}
              <div className="mt-5 sm:mt-6 text-center flex flex-col items-center w-full px-2">
                <h3 className="font-heading text-lg sm:text-xl font-bold uppercase text-black 
                tracking-tight  transition-colors">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-zinc-600 font-normal leading-relaxed
                 max-w-xs text-center">
                  {item.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default ProductProtection;
