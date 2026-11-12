"use client";

import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faEnvelope,
  faPhone,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

interface ProductFinalCtaProps {
  productName: string;
}

export function ProductFinalCta({ productName }: ProductFinalCtaProps) {
  return (
    <section className="relative w-full py-28 sm:py-36 lg:py-48 bg-[#050505] text-white border-t border-white/[0.08] overflow-hidden">
      {/* Background Ambient Radial Flare */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[500px] bg-[#D7B875]/8 blur-[160px] rounded-full" />
      </div>

      <Container size="xl" className="relative z-10">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          {/* Eyebrow */}
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#D7B875] mb-4 block">
            CUSTOM ARCHITECTURAL COMMISSIONING
          </span>

          {/* Monumental Headline */}
          <h2 className="font-heading text-4xl sm:text-6xl md:text-7xl font-bold uppercase tracking-tight text-white leading-tight">
            Let&apos;s find the right solution for your project.
          </h2>

          {/* Subtitle */}
          <p className="mt-6 max-w-2xl font-sans text-base sm:text-lg text-zinc-400 font-light leading-relaxed">
            Whether engineering an ultra-fine pitch {productName} boardroom canvas, a curved virtual production volume,
            or an outdoor monumental landmark, our display architects guide your installation from preliminary CAD modeling to final color calibration.
          </p>

          {/* 3 Prominent Actions */}
          <div className="mt-10 sm:mt-12 flex flex-wrap items-center justify-center gap-4">
            <Link href="/contact">
              <Button
                variant="white"
                size="lg"
                className="group flex items-center gap-2 font-semibold shadow-xl"
              >
                <span>Request a Quote</span>
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1"
                />
              </Button>
            </Link>

            <Link href="/contact">
              <Button
                variant="outline"
                size="lg"
                className="border-white/20 hover:border-white text-zinc-200"
              >
                <span>Contact Our Team</span>
              </Button>
            </Link>

            <a href="#downloads">
              <Button
                variant="ghost"
                size="lg"
                className="flex items-center gap-2 text-zinc-400 hover:text-white"
              >
                <FontAwesomeIcon icon={faDownload} className="w-3.5 h-3.5 text-[#D7B875]" />
                <span>Download Catalogue</span>
              </Button>
            </a>
          </div>

          {/* Direct Line Details */}
          <div className="mt-14 pt-10 border-t border-white/[0.08] w-full max-w-xl grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono text-zinc-400">
            <div className="flex items-center justify-center gap-2">
              <FontAwesomeIcon icon={faEnvelope} className="w-3.5 h-3.5 text-[#D7B875]" />
              <span>architects@lumera.com</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <FontAwesomeIcon icon={faPhone} className="w-3.5 h-3.5 text-[#D7B875]" />
              <span>+1 (800) 586-3721</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default ProductFinalCta;
