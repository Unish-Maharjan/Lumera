"use client";

import React, { useRef } from "react";
import Image from "next/image";

export function CtaSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const colorLayerRef = useRef<HTMLDivElement>(null);

  const updateMask = (clientX: number, clientY: number) => {
    if (!sectionRef.current || !colorLayerRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const mask = `radial-gradient(circle 280px at ${x}px ${y}px, black 0%, rgba(0,0,0,0.85) 45%, transparent 100%)`;
    colorLayerRef.current.style.maskImage = mask;
    colorLayerRef.current.style.webkitMaskImage = mask;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    updateMask(e.clientX, e.clientY);
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    if (colorLayerRef.current) {
      colorLayerRef.current.style.opacity = "1";
    }
    updateMask(e.clientX, e.clientY);
  };

  const handleMouseLeave = () => {
    if (colorLayerRef.current) {
      colorLayerRef.current.style.opacity = "0";
    }
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLElement>) => {
    if (e.touches[0] && colorLayerRef.current) {
      colorLayerRef.current.style.opacity = "1";
      updateMask(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLElement>) => {
    if (e.touches[0]) {
      updateMask(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchEnd = () => {
    if (colorLayerRef.current) {
      colorLayerRef.current.style.opacity = "0";
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact-cta"
      aria-labelledby="cta-heading"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative w-full h-screen min-h-screen bg-transparent overflow-hidden flex items-center justify-center select-none border-t border-border/40"
    >
      {/* Background Architectural Photography */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Base Layer: Black & White Image */}
        <Image
          src="/images/cta.png"
          alt="Architectural city LED billboard illuminated at night"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center pointer-events-none select-none grayscale contrast-[1.08] brightness-[0.98]"
        />

        {/* Interactive Pointer-Revealed Color Layer */}
        <div
          ref={colorLayerRef}
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-0 will-change-[mask-image]"
          style={{
            maskImage:
              "radial-gradient(circle 0px at 0px 0px, transparent 100%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(circle 0px at 0px 0px, transparent 100%, transparent 100%)",
          }}
        >
          <Image
            src="/images/cta.png"
            alt="Architectural city LED billboard illuminated in full color"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center pointer-events-none select-none contrast-[1.15] brightness-[1.05] saturate-[1.25]"
          />
        </div>

        {/* Minimal Edge Blending - Subtle transitions to keep the section crisp and visible */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-black/40 to-transparent"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-20 sm:h-28 lg:h-36 bg-gradient-to-t from-black via-black/40 to-transparent z-10"
          aria-hidden="true"
        />
      </div>

      
    </section>
  );
}

export default CtaSection;
