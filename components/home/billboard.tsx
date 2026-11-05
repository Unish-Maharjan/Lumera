"use client";

import React, { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

/* ─── Reusable Industrial Floodlights ─── */
function Floodlights({
  lightsRef,
  angles = ["-10deg", "-5deg", "-2deg", "2deg", "5deg", "10deg"],
  className = "",
}: {
  lightsRef?: React.RefObject<HTMLDivElement | null>;
  angles?: string[];
  className?: string;
}) {
  return (
    <div
      ref={lightsRef}
      className={`absolute -top-6 sm:-top-8 left-0 right-0 flex justify-between px-3 sm:px-6 pointer-events-none z-30 ${className}`.trim()}
    >
      {angles.map((angle, idx) => (
        <div key={idx} className="relative flex flex-col items-center">
          {/* Structural Cantilever Arm extending toward viewer */}
          <div
            className="w-1 sm:w-1.5 h-4 sm:h-5.5 bg-gradient-to-b from-zinc-300 via-zinc-500 to-zinc-800 border-x border-white/30 origin-bottom shadow-md"
            style={{ transform: `rotate(${angle})` }}
          />
          {/* Heavy Industrial Floodlight Casing with Cooling Fins */}
          <div
            className="relative w-5 sm:w-7 h-2.5 sm:h-3.5 bg-gradient-to-b from-zinc-700 via-zinc-800 to-zinc-950 rounded-[2px] border border-zinc-400/80 shadow-[0_4px_10px_rgba(0,0,0,0.95)] flex items-center justify-center -mt-0.5"
            style={{ transform: `rotate(${angle})` }}
          >
            {/* Cooling Fin Lines */}
            <div className="absolute -top-1 inset-x-0.5 flex justify-between px-0.5">
              <div className="w-[1px] h-1 bg-zinc-400" />
              <div className="w-[1px] h-1 bg-zinc-400" />
              <div className="w-[1px] h-1 bg-zinc-400" />
            </div>
            {/* Glowing Lamp Core with Halation Glow */}
            <div className="w-3.5 sm:w-5 h-1 sm:h-1.5 bg-[#FFFDF5] rounded-xs shadow-[0_0_12px_#ffffff,0_0_24px_rgba(255,245,210,0.95)]" />
          </div>

          {/* Volumetric Spotlight Beam projecting downward onto the LED billboard */}
          <div
            className="absolute top-4 sm:top-5 w-14 sm:w-20 h-20 sm:h-28 bg-[radial-gradient(ellipse_at_top,_rgba(255,250,230,0.45)_0%,_rgba(255,240,200,0.12)_45%,_transparent_75%)] pointer-events-none blur-xs"
            style={{
              transform: `translateX(-50%) rotate(${angle})`,
              left: "50%",
            }}
          />
        </div>
      ))}
    </div>
  );
}

/* ─── Reusable Catwalk, Lattice Truss & Dual Steel Pillars ─── */
function BillboardStand({
  standRef,
  className = "",
}: {
  standRef?: React.RefObject<HTMLDivElement | null>;
  className?: string;
}) {
  return (
    <div
      ref={standRef}
      className={`absolute top-full left-0 right-0 flex flex-col items-center pointer-events-none z-20 ${className}`.trim()}
    >
      {/* 1. Catwalk Walkway with Safety Railing & Industrial Cantilever Brackets */}
      <div className="relative w-[103%] -mt-0.5 flex flex-col items-center z-20">
        {/* Safety Railing: Top Grab Rail + Mid Knee Rail + Vertical Posts */}
        <div className="relative w-full h-3 sm:h-4.5 border-t-[1.5px] border-zinc-400/90 shadow-[0_1px_2px_rgba(0,0,0,0.9)] flex justify-between px-2 sm:px-4 pointer-events-none">
          {/* Mid Safety Rail */}
          <div className="absolute top-1/2 inset-x-0 h-[1px] bg-zinc-500/70" />
          {/* Vertical Pickets / Stanchion Posts */}
          {Array.from({ length: 21 }).map((_, idx) => (
            <div
              key={idx}
              className="w-[1.5px] h-full bg-gradient-to-b from-zinc-300 via-zinc-500 to-zinc-700 shadow-sm"
            />
          ))}
        </div>

        {/* Catwalk Deck: 3D Steel Grating Walkway with Toe-Board Kickplate */}
        <div className="relative w-full h-3.5 sm:h-4 bg-gradient-to-b from-zinc-700 via-zinc-800 to-zinc-950 border-t border-b border-zinc-500/90 shadow-[0_4px_12px_rgba(0,0,0,0.9)] flex items-center overflow-hidden">
          <div className="w-full h-full opacity-35 bg-[repeating-linear-gradient(45deg,#ffffff,#ffffff_1px,transparent_1px,transparent_3px)]" />
          <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
        </div>

        {/* Cantilever Triangular Support Gussets underneath walkway */}
        <div className="w-[96%] flex justify-between px-2 sm:px-6 pointer-events-none -mt-[1px]">
          {Array.from({ length: 7 }).map((_, idx) => (
            <div
              key={idx}
              className="w-1 sm:w-1.5 h-2.5 sm:h-3.5 bg-gradient-to-b from-zinc-600 via-zinc-800 to-zinc-950 border-x border-zinc-500/40 shadow-xs"
            />
          ))}
        </div>
      </div>

      {/* 2. Industrial 8-Bay Lattice Truss with Diagonal "X" Cross-Braces */}
      <div className="relative w-[103%] -mt-0.5 z-10">
        <svg
          className="w-full h-8 sm:h-10 md:h-12 text-zinc-600/90 drop-shadow-md"
          viewBox="0 0 800 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          {/* Top and Bottom Horizontal Steel Chord Beams */}
          <line x1="0" y1="2" x2="800" y2="2" stroke="currentColor" strokeWidth="4" />
          <line x1="0" y1="58" x2="800" y2="58" stroke="currentColor" strokeWidth="4" />

          {/* Vertical Structural Posts */}
          {[0, 100, 200, 300, 400, 500, 600, 700, 800].map((x) => (
            <line
              key={x}
              x1={x}
              y1="2"
              x2={x + 100}
              y2="58"
              stroke="currentColor"
              strokeWidth="3"
            />
          ))}

          {/* Diagonal "X" Cross-Braces */}
          {[0, 100, 200, 300, 400, 500, 600, 700].map((x, i) => (
            <g key={i}>
              <line
                x1={x}
                y1="2"
                x2={x + 100}
                y2="58"
                stroke="currentColor"
                strokeWidth="2.5"
              />
              <line
                x1={x + 100}
                y1="2"
                x2={x}
                y2="58"
                stroke="currentColor"
                strokeWidth="2.5"
              />
            </g>
          ))}
        </svg>
      </div>

      {/* 3. Dual Heavy Steel Cylindrical Columns / Pillars */}
      <div className="relative w-full flex justify-between px-[12%] sm:px-[15%] -mt-1">
        {/* Left Pillar Column */}
        <div className="flex flex-col items-center">
          {/* Top Bolted Collar Joint */}
          <div className="w-10 sm:w-14 md:w-16 h-1.5 sm:h-2 bg-gradient-to-r from-zinc-800 via-zinc-400 to-zinc-800 border-y border-white/20 rounded-xs shadow-md z-10" />
          {/* Cylindrical Metallic Column extending down */}
          <div className="relative w-8 sm:w-11 md:w-13 h-[65vh] sm:h-[75vh] md:h-[85vh] bg-gradient-to-r from-zinc-950 via-zinc-600 to-zinc-950 border-x border-white/10 shadow-2xl flex flex-col justify-around items-center">
            {/* Intermediate Flange Ring Joints along the tall pillar */}
            <div className="w-[115%] h-1 sm:h-1.5 bg-gradient-to-r from-zinc-800 via-zinc-500 to-zinc-800 border-y border-white/20 rounded-xs shadow-sm" />
            <div className="w-[115%] h-1 sm:h-1.5 bg-gradient-to-r from-zinc-800 via-zinc-500 to-zinc-800 border-y border-white/20 rounded-xs shadow-sm" />
          </div>
        </div>

        {/* Right Pillar Column */}
        <div className="flex flex-col items-center">
          {/* Top Bolted Collar Joint */}
          <div className="w-10 sm:w-14 md:w-16 h-1.5 sm:h-2 bg-gradient-to-r from-zinc-800 via-zinc-400 to-zinc-800 border-y border-white/20 rounded-xs shadow-md z-10" />
          {/* Cylindrical Metallic Column extending down */}
          <div className="relative w-8 sm:w-11 md:w-13 h-[65vh] sm:h-[75vh] md:h-[85vh] bg-gradient-to-r from-zinc-950 via-zinc-600 to-zinc-950 border-x border-white/10 shadow-2xl flex flex-col justify-around items-center">
            {/* Intermediate Flange Ring Joints along the tall pillar */}
            <div className="w-[115%] h-1 sm:h-1.5 bg-gradient-to-r from-zinc-800 via-zinc-500 to-zinc-800 border-y border-white/20 rounded-xs shadow-sm" />
            <div className="w-[115%] h-1 sm:h-1.5 bg-gradient-to-r from-zinc-800 via-zinc-500 to-zinc-800 border-y border-white/20 rounded-xs shadow-sm" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function AdsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinnedViewportRef = useRef<HTMLDivElement>(null);
  const billboardRef = useRef<HTMLDivElement>(null);
  const screenWrapperRef = useRef<HTMLDivElement>(null);
  const bezelRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroCtaRef = useRef<HTMLDivElement>(null);
  const lightsRef = useRef<HTMLDivElement>(null);
  const standRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const initialOverlayRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current || !pinnedViewportRef.current || !billboardRef.current) return;

      gsap.registerPlugin(ScrollTrigger);

      const mm = gsap.matchMedia();

      // Responsive Desktop & Mobile ScrollTrigger Animation
      mm.add(
        {
          isDesktop: "(min-width: 768px)",
          isMobile: "(max-width: 767px)",
        },
        (context) => {
          const isDesktop = context.conditions?.isDesktop ?? true;
          const targetW = isDesktop ? "48vw" : "82vw";
          const targetH = isDesktop ? "27vw" : "46.125vw";
          const targetMaxW = isDesktop ? "680px" : "380px";
          const targetMaxH = isDesktop ? "382.5px" : "213.75px";
          const targetY = isDesktop ? -32 : -20;

          // 1. Pin the billboard viewport
          ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            pin: pinnedViewportRef.current,
            pinSpacing: false,
            anticipatePin: 1,
          });

          // 2. Shrink and assembly animation timeline
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 1.2,
            },
          });

          // Phase 0: Hero CTA and initial dark overlay fade out
          if (heroCtaRef.current) {
            tl.to(
              heroCtaRef.current,
              { opacity: 0, y: -24, duration: 0.2, ease: "power2.inOut" },
              0
            );
          }

          if (initialOverlayRef.current) {
            tl.to(
              initialOverlayRef.current,
              { opacity: 0, duration: 0.28, ease: "power2.out" },
              0
            );
          }

          // Phase 1: Shrink single billboard from full viewport down to center billboard
          tl.fromTo(
            billboardRef.current,
            {
              width: "100vw",
              height: "100vh",
              maxWidth: "100vw",
              maxHeight: "100vh",
              borderRadius: "0px",
              y: 0,
            },
            {
              width: targetW,
              height: targetH,
              maxWidth: targetMaxW,
              maxHeight: targetMaxH,
              borderRadius: "2px",
              y: targetY,
              duration: 0.85,
              ease: "power2.inOut",
            },
            0.15
          );

          // Fade in outer billboard shadow & gold ambient halo
          if (screenWrapperRef.current) {
            tl.fromTo(
              screenWrapperRef.current,
              { boxShadow: "0 0 0 rgba(0,0,0,0)" },
              {
                boxShadow:
                  "0 25px 80px -15px rgba(0, 0, 0, 0.98), 0 0 65px rgba(214, 189, 130, 0.22)",
                duration: 0.7,
                ease: "power2.out",
              },
              0.35
            );
          }

          // Fade in steel bezel & rivets
          if (bezelRef.current) {
            tl.fromTo(
              bezelRef.current,
              { opacity: 0 },
              { opacity: 1, duration: 0.6, ease: "power2.out" },
              0.35
            );
          }

          // Reveal Top Floodlights
          if (lightsRef.current) {
            tl.fromTo(
              lightsRef.current,
              { opacity: 0, y: -20 },
              { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
              0.4
            );
          }

          // Reveal Catwalk, Lattice Truss, and Dual Pillars
          if (standRef.current) {
            tl.fromTo(
              standRef.current,
              { opacity: 0, y: 25 },
              { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
              0.4
            );
          }

          // Subtle micro-LED dot-pitch texture
          if (overlayRef.current) {
            tl.fromTo(
              overlayRef.current,
              { opacity: 0 },
              { opacity: 0.12, duration: 0.5, ease: "power1.inOut" },
              0.45
            );
          }

          // Phase 2: Reveal editorial headline at the bottom
          if (captionRef.current) {
            tl.fromTo(
              captionRef.current,
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" },
              0.65
            );
          }

          // Phase 3: Hold runway to comfortably admire the center billboard
          tl.to({}, { duration: 0.5 });
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[260vh] bg-black text-[#F5F2EB] overflow-x-clip"
      id="billboard-showcase"
      aria-label="Lumera Commercial Outdoor LED Billboard Showcase"
    >
      {/* Pinned Viewport Container */}
      <div
        ref={pinnedViewportRef}
        className="relative h-screen w-full flex items-center justify-center overflow-hidden select-none z-0 bg-black"
      >
        {/* Atmospheric Center Glow */}
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(214,189,130,0.18)_0%,_rgba(140,110,60,0.06)_42%,_rgba(50,38,18,0.02)_65%,_transparent_80%)] pointer-events-none"
          aria-hidden="true"
        />

        {/* Ambient Floor Reflection */}
        <div
          className="absolute bottom-0 inset-x-0 h-44 sm:h-64 pointer-events-none z-10 bg-[radial-gradient(ellipse_65%_75%_at_bottom,_rgba(126,58,242,0.2)_0%,_rgba(59,130,246,0.12)_35%,_rgba(215,184,117,0.06)_65%,_transparent_85%)] blur-2xl"
          aria-hidden="true"
        />

        {/* Initial Hero Content (Fades out on scroll) */}
        <div
          ref={heroCtaRef}
          className="absolute inset-0 z-40 pointer-events-none flex flex-col justify-between pt-24 sm:pt-28 pb-8 sm:pb-10 will-change-[transform,opacity]"
        >
          <Container size="xl" className="w-full flex-1 flex flex-col justify-between pointer-events-auto">
            <div className="w-full" aria-hidden="true" />

            {/* Headline and Narrative Row */}
            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start mt-34 py-4 sm:py-6">
              <div className="flex flex-col items-start text-left">
                <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl xl:text-8xl font-bold text-white uppercase leading-[0.95] tracking-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
                  Illuminating<br />
                  Spaces
                </h1>
                <div className="pt-6 sm:pt-8">
                  <Link href="#products">
                    <Button variant="gold" size="md">
                      Explore Collection
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="flex flex-col items-start text-left ml-0 lg:ml-12 xl:ml-20">
                <h2 className="font-heading text-4xl sm:text-6xl md:text-7xl xl:text-7xl font-bold uppercase leading-[0.95] tracking-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)] mb-5 sm:mb-7">
                  <span className="text-white block">with</span>
                  <span className="text-accent block">Precision.</span>
                </h2>
                <p className="font-sans text-xs sm:text-sm md:text-base text-zinc-300 font-light leading-relaxed max-w-md drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
                  We assist our clients in integrating architectural microLED and advanced display systems into visionary environments.
                </p>
              </div>
            </div>

            {/* Bottom Status Indicator */}
            <div className="w-full flex items-center justify-between pt-3 pb-1">
              <div className="flex items-center gap-2.5 font-mono text-xs text-zinc-400 tracking-wider select-none">
                <span className="text-accent font-bold text-sm">+</span>
                <span>Scroll to explore</span>
              </div>
              <div className="hidden sm:flex items-center gap-2 font-mono text-[11px] text-zinc-500 uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Commercial Grade Display</span>
              </div>
            </div>
          </Container>
        </div>

        {/* ─── Center Billboard Assembly ─── */}
        <div
          ref={billboardRef}
          className="relative z-20 flex flex-col items-center pointer-events-none will-change-[width,height,transform,border-radius]"
          style={{
            width: "100vw",
            height: "100vh",
            maxWidth: "100vw",
            maxHeight: "100vh",
          }}
        >
          {/* Top Industrial Floodlights */}
          <Floodlights
            lightsRef={lightsRef}
            className="opacity-0 will-change-[transform,opacity]"
          />

          {/* Screen Outer Frame & Bezel */}
          <div
            ref={screenWrapperRef}
            className="relative w-full h-full flex flex-col rounded-[2px] transition-shadow duration-500 overflow-hidden"
          >
            {/* Architectural Bezel & Corner Rivets */}
            <div
              ref={bezelRef}
              className="absolute inset-0 z-20 pointer-events-none border-[3px] sm:border-[5px] md:border-[7px] border-[#18181b] ring-1 ring-white/20 rounded-[2px] opacity-0 will-change-opacity flex flex-col justify-between"
              aria-hidden="true"
            >
              {/* Corner Fasteners */}
              <div className="flex justify-between p-1 sm:p-1.5">
                <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-zinc-500 border border-zinc-300 shadow-sm" />
                <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-zinc-500 border border-zinc-300 shadow-sm" />
              </div>
              <div className="flex justify-between p-1 sm:p-1.5">
                <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-zinc-500 border border-zinc-300 shadow-sm" />
                <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-zinc-500 border border-zinc-300 shadow-sm" />
              </div>
            </div>

            {/* Video Canvas Stage */}
            <div className="relative w-full flex-1 overflow-hidden rounded-[1px] bg-black shadow-[inset_0_0_20px_rgba(0,0,0,0.9)]">
              <video
                ref={videoRef}
                src="/video/1_1.mp4"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="w-full h-full object-cover object-center pointer-events-none"
              />

              {/* Initial Dark Ambient Scrim (for Hero billboard only) */}
              <div
                ref={initialOverlayRef}
                className="absolute inset-0 pointer-events-none z-10 bg-black/25 bg-gradient-to-t from-black/0 via-black/20 to-black/55 will-change-[opacity]"
                aria-hidden="true"
              />

              {/* Micro-LED Modular Tile Grid Texture */}
              <div
                ref={overlayRef}
                className="absolute inset-0 pointer-events-none z-10 opacity-0 bg-[radial-gradient(#ffffff_0.6px,transparent_0.6px)] [background-size:4px_4px]"
                aria-hidden="true"
              />
              {/* Panel Seams */}
              <div
                className="absolute inset-0 pointer-events-none z-10 opacity-15 bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:25%_50%]"
                aria-hidden="true"
              />

              {/* 3D Diagonal Specular Glass Reflection Sheen */}
              <div
                className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.07] to-transparent pointer-events-none z-10"
                aria-hidden="true"
              />

              {/* Ambient Inner Shadow */}
              <div
                className="absolute inset-0 pointer-events-none z-10 shadow-[inset_0_3px_8px_rgba(0,0,0,0.85),inset_0_-2px_6px_rgba(0,0,0,0.85)]"
                aria-hidden="true"
              />
            </div>
          </div>

          {/* Catwalk, Lattice Truss & Dual Steel Pillars */}
          <BillboardStand
            standRef={standRef}
            className="opacity-0 will-change-[transform,opacity]"
          />
        </div>

        {/* ─── Editorial Text Block (Engineered to Stand Out) ─── */}
        <div
          ref={captionRef}
          className="absolute bottom-6 sm:bottom-8 md:bottom-10 left-0 right-0 max-w-xl mx-auto text-center pointer-events-none opacity-0 z-30 flex flex-col items-center px-4 will-change-[transform,opacity] drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]"
        >
          <h3 className="font-heading text-lg sm:text-xl md:text-2xl text-accent font-bold uppercase leading-snug">
            Engineered to Stand Out
          </h3>
        </div>
      </div>
    </section>
  );
}

export default AdsSection;
