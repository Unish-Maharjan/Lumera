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
      className={`absolute -top-5 sm:-top-7 left-0 right-0 flex justify-between px-3 sm:px-5 pointer-events-none z-30 ${className}`.trim()}
    >
      {angles.map((angle, idx) => (
        <div key={idx} className="relative flex flex-col items-center">
          {/* Angled Mounting Bracket Arm */}
          <div
            className="w-1 sm:w-1.5 h-3.5 sm:h-5 bg-gradient-to-b from-zinc-500 to-zinc-700 border-x border-white/20 origin-bottom"
            style={{ transform: `rotate(${angle})` }}
          />
          {/* Floodlight Fixture Housing */}
          <div
            className="w-4 sm:w-6 h-2 sm:h-3 bg-zinc-800 rounded-xs border border-zinc-400/60 shadow-lg flex items-center justify-center -mt-0.5"
            style={{ transform: `rotate(${angle})` }}
          >
            {/* Glowing Lamp Face */}
            <div className="w-3 sm:w-4.5 h-1 sm:h-1.5 bg-[#FFFDF5] rounded-xs shadow-[0_0_10px_#ffffff,0_0_20px_rgba(255,245,210,0.85)]" />
          </div>

          {/* Spotlight Light Cone projecting onto the billboard */}
          <div
            className="absolute top-3 sm:top-4 w-12 sm:w-16 h-18 sm:h-24 bg-[radial-gradient(ellipse_at_top,_rgba(255,250,230,0.35)_0%,_transparent_75%)] pointer-events-none blur-xs"
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
      {/* 1. Catwalk Walkway with Safety Railing */}
      <div className="relative w-[102%] h-3 sm:h-4 bg-gradient-to-b from-zinc-700 via-zinc-800 to-zinc-900 border-t border-b border-zinc-500/80 shadow-md flex items-center z-20">
        {/* Railing Pickets & Handrail */}
        <div className="absolute -top-2.5 sm:-top-3 left-0 right-0 h-2.5 sm:h-3 border-t-[1.5px] border-zinc-400 flex justify-between px-2 sm:px-4 pointer-events-none">
          {Array.from({ length: 19 }).map((_, idx) => (
            <div key={idx} className="w-[1px] h-full bg-zinc-400" />
          ))}
        </div>
        {/* Catwalk steel grating mesh texture */}
        <div className="w-full h-full opacity-20 bg-[repeating-linear-gradient(45deg,#ffffff,#ffffff_1px,transparent_1px,transparent_4px)]" />
      </div>

      {/* 2. Industrial 8-Bay Lattice Truss with Diagonal "X" Cross-Braces */}
      <div className="relative w-[102%] -mt-0.5 z-10">
        <svg
          className="w-full h-7 sm:h-9 md:h-11 text-zinc-600/90 drop-shadow-md"
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

      {/* 3. Dual Heavy Steel Cylindrical Columns / Pillars extending to bottom */}
      <div className="relative w-full flex justify-between px-[12%] sm:px-[15%] -mt-1">
        {/* Left Pillar Column */}
        <div className="flex flex-col items-center">
          <div className="w-8 sm:w-11 md:w-13 h-1.5 sm:h-2 bg-gradient-to-r from-zinc-800 via-zinc-400 to-zinc-800 border-y border-white/20 rounded-xs shadow-md z-10" />
          <div className="relative w-6 sm:w-8 md:w-10 h-[65vh] sm:h-[75vh] md:h-[85vh] bg-gradient-to-r from-zinc-950 via-zinc-500 to-zinc-950 border-x border-white/10 shadow-2xl flex flex-col justify-around items-center">
            <div className="w-[115%] h-1 sm:h-1.5 bg-gradient-to-r from-zinc-800 via-zinc-400 to-zinc-800 border-y border-white/20 rounded-xs shadow-sm" />
            <div className="w-[115%] h-1 sm:h-1.5 bg-gradient-to-r from-zinc-800 via-zinc-400 to-zinc-800 border-y border-white/20 rounded-xs shadow-sm" />
          </div>
        </div>

        {/* Right Pillar Column */}
        <div className="flex flex-col items-center">
          <div className="w-8 sm:w-11 md:w-13 h-1.5 sm:h-2 bg-gradient-to-r from-zinc-800 via-zinc-400 to-zinc-800 border-y border-white/20 rounded-xs shadow-md z-10" />
          <div className="relative w-6 sm:w-8 md:w-10 h-[65vh] sm:h-[75vh] md:h-[85vh] bg-gradient-to-r from-zinc-950 via-zinc-500 to-zinc-950 border-x border-white/10 shadow-2xl flex flex-col justify-around items-center">
            <div className="w-[115%] h-1 sm:h-1.5 bg-gradient-to-r from-zinc-800 via-zinc-400 to-zinc-800 border-y border-white/20 rounded-xs shadow-sm" />
            <div className="w-[115%] h-1 sm:h-1.5 bg-gradient-to-r from-zinc-800 via-zinc-400 to-zinc-800 border-y border-white/20 rounded-xs shadow-sm" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function AdsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinnedViewportRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const billboardRef = useRef<HTMLDivElement>(null);
  const leftBillboardRef = useRef<HTMLDivElement>(null);
  const rightBillboardRef = useRef<HTMLDivElement>(null);
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

      // Desktop & Tablet screens: continuous, silky-smooth scroll animation
      mm.add("(min-width: 768px)", () => {
        // 1. Pin the billboard viewport until the next section has fully scrolled over it
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
            end: () => `+=${window.innerHeight * 1.25}`,
            scrub: 1.2,
          },
        });

        // Hero CTA disappears as scroll begins (0 to 0.18)
        if (heroCtaRef.current) {
          tl.to(
            heroCtaRef.current,
            {
              opacity: 0,
              y: -24,
              duration: 0.18,
              ease: "power2.inOut",
            },
            0
          );
        }

        // Fade out beginning overlay smoothly
        if (initialOverlayRef.current) {
          tl.to(
            initialOverlayRef.current,
            {
              opacity: 0,
              duration: 0.28,
              ease: "power2.out",
            },
            0
          );
        }

        // Entire stage lifts slightly to center the 3-billboard triptych and pillars vertically
        if (stageRef.current) {
          tl.fromTo(
            stageRef.current,
            { y: 0 },
            { y: -32, duration: 0.8, ease: "power2.inOut" },
            0.15
          );
        }

        // Center billboard shrinks from full viewport (100vw x 100vh) to 16:9 board
        tl.fromTo(
          billboardRef.current,
          {
            width: "100vw",
            height: "100vh",
            maxWidth: "100vw",
            maxHeight: "100vh",
            borderRadius: "0px",
          },
          {
            width: "44vw",
            height: "24.75vw", // Exact 16:9 ratio
            maxWidth: "600px",
            maxHeight: "337.5px",
            borderRadius: "2px",
            duration: 0.8,
            ease: "power2.inOut",
          },
          0.15
        );

        // Animate Left Billboard sliding in and revealing its curved perspective
        if (leftBillboardRef.current) {
          tl.fromTo(
            leftBillboardRef.current,
            {
              opacity: 0,
              x: -60,
              scale: 0.85,
            },
            {
              opacity: 1,
              x: 0,
              scale: 1,
              duration: 0.65,
              ease: "power2.out",
            },
            0.3
          );
        }

        // Animate Right Billboard sliding in and revealing its curved perspective
        if (rightBillboardRef.current) {
          tl.fromTo(
            rightBillboardRef.current,
            {
              opacity: 0,
              x: 60,
              scale: 0.85,
            },
            {
              opacity: 1,
              x: 0,
              scale: 1,
              duration: 0.65,
              ease: "power2.out",
            },
            0.3
          );
        }

        // Fade in outer billboard shadow on center screen
        if (screenWrapperRef.current) {
          tl.fromTo(
            screenWrapperRef.current,
            { boxShadow: "0 0 0 rgba(0,0,0,0)" },
            {
              boxShadow:
                "0 25px 80px -15px rgba(0, 0, 0, 0.98), 0 0 65px rgba(214, 189, 130, 0.22)",
              duration: 0.65,
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
            { opacity: 1, duration: 0.55, ease: "power2.out" },
            0.35
          );
        }

        // Reveal Top Floodlights on center billboard
        if (lightsRef.current) {
          tl.fromTo(
            lightsRef.current,
            { opacity: 0, y: -20 },
            { opacity: 1, y: 0, duration: 0.55, ease: "power2.out" },
            0.4
          );
        }

        // Reveal Catwalk, Lattice Truss, and Dual Pillars on center billboard
        if (standRef.current) {
          tl.fromTo(
            standRef.current,
            { opacity: 0, y: 25 },
            { opacity: 1, y: 0, duration: 0.55, ease: "power2.out" },
            0.4
          );
        }

        // Micro-LED dot-pitch texture
        if (overlayRef.current) {
          tl.fromTo(
            overlayRef.current,
            { opacity: 0 },
            { opacity: 0.12, duration: 0.5, ease: "power1.inOut" },
            0.45
          );
        }

        // Reveal editorial text at the bottom AT THE END OF THE SCROLL
        if (captionRef.current) {
          tl.fromTo(
            captionRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" },
            0.85
          );
        }

        // Buffer hold before unpinning
        tl.to({}, { duration: 0.25 });
      });

      // Mobile screens
      mm.add("(max-width: 767px)", () => {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          pin: pinnedViewportRef.current,
          pinSpacing: false,
          anticipatePin: 1,
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${window.innerHeight * 1.2}`,
            scrub: 1.2,
          },
        });

        if (heroCtaRef.current) {
          tl.to(
            heroCtaRef.current,
            {
              opacity: 0,
              y: -20,
              duration: 0.18,
              ease: "power2.inOut",
            },
            0
          );
        }

        if (initialOverlayRef.current) {
          tl.to(
            initialOverlayRef.current,
            {
              opacity: 0,
              duration: 0.28,
              ease: "power2.out",
            },
            0
          );
        }

        if (stageRef.current) {
          tl.fromTo(
            stageRef.current,
            { y: 0 },
            { y: -24, duration: 0.8, ease: "power2.inOut" },
            0.15
          );
        }

        tl.fromTo(
          billboardRef.current,
          {
            width: "100vw",
            height: "100vh",
            maxWidth: "100vw",
            maxHeight: "100vh",
            borderRadius: "0px",
          },
          {
            width: "76vw",
            height: "42.75vw",
            maxWidth: "350px",
            maxHeight: "197px",
            borderRadius: "2px",
            duration: 0.8,
            ease: "power2.inOut",
          },
          0.15
        );

        if (leftBillboardRef.current) {
          tl.fromTo(
            leftBillboardRef.current,
            { opacity: 0, scale: 0.65, x: -30 },
            { opacity: 0.85, scale: 0.78, x: 0, duration: 0.65, ease: "power2.out" },
            0.3
          );
        }

        if (rightBillboardRef.current) {
          tl.fromTo(
            rightBillboardRef.current,
            { opacity: 0, scale: 0.65, x: 30 },
            { opacity: 0.85, scale: 0.78, x: 0, duration: 0.65, ease: "power2.out" },
            0.3
          );
        }

        if (screenWrapperRef.current) {
          tl.fromTo(
            screenWrapperRef.current,
            { boxShadow: "0 0 0 rgba(0,0,0,0)" },
            {
              boxShadow:
                "0 20px 60px -10px rgba(0, 0, 0, 0.98), 0 0 40px rgba(214, 189, 130, 0.2)",
              duration: 0.65,
              ease: "power2.out",
            },
            0.35
          );
        }

        if (bezelRef.current) {
          tl.fromTo(
            bezelRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.55, ease: "power2.out" },
            0.35
          );
        }

        if (lightsRef.current) {
          tl.fromTo(
            lightsRef.current,
            { opacity: 0, y: -15 },
            { opacity: 1, y: 0, duration: 0.55, ease: "power2.out" },
            0.4
          );
        }

        if (standRef.current) {
          tl.fromTo(
            standRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.55, ease: "power2.out" },
            0.4
          );
        }

        if (overlayRef.current) {
          tl.fromTo(
            overlayRef.current,
            { opacity: 0 },
            { opacity: 0.1, duration: 0.5, ease: "power1.inOut" },
            0.45
          );
        }

        if (captionRef.current) {
          tl.fromTo(
            captionRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" },
            0.85
          );
        }

        tl.to({}, { duration: 0.25 });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[240vh] bg-black text-[#F5F2EB]"
      id="billboard-showcase"
      aria-label="Lumera Commercial Outdoor LED Billboard Showcase"
    >
      {/* Pinned Viewport Container */}
      <div
        ref={pinnedViewportRef}
        className="relative h-screen w-full flex items-center justify-center overflow-hidden select-none z-0 bg-black"
      >
        {/* Deep Atmospheric Champagne Gold Center Glow */}
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(214,189,130,0.18)_0%,_rgba(140,110,60,0.06)_42%,_rgba(50,38,18,0.02)_65%,_transparent_80%)] pointer-events-none"
          aria-hidden="true"
        />

        {/* Ambient Floor Reflection (Purple / Violet Nebular Light matching reference photo) */}
        <div
          className="absolute bottom-0 inset-x-0 h-44 sm:h-64 pointer-events-none z-10 bg-[radial-gradient(ellipse_65%_75%_at_bottom,_rgba(126,58,242,0.2)_0%,_rgba(59,130,246,0.12)_35%,_rgba(215,184,117,0.06)_65%,_transparent_85%)] blur-2xl"
          aria-hidden="true"
        />

        {/* Initial Hero Content (disappears on scroll) */}
        <div
          ref={heroCtaRef}
          className="absolute inset-0 z-30 pointer-events-none flex flex-col justify-between pt-24 sm:pt-28 pb-8 sm:pb-10 will-change-[transform,opacity]"
        >
          <Container size="xl" className="w-full flex-1 flex flex-col justify-between pointer-events-auto">
            {/* Top Clearance under fixed header */}
            <div className="w-full" aria-hidden="true" />

            {/* Two Div Layout: Div 1 (Illuminating Spaces + Button) & Div 2 (with Precision. + Paragraph) */}
            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start mt-34 py-4 sm:py-6">
              {/* Div 1 */}
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

              {/* Div 2 */}
              <div className="flex flex-col items-start text-left ml-40">
                <h2 className="font-heading text-4xl sm:text-6xl md:text-7xl xl:text-7xl font-bold uppercase leading-[0.95] tracking-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)] mb-5 sm:mb-7">
                  <span className="text-white block">with</span>
                  <span className="text-accent block">Precision.</span>
                </h2>

                <p className="font-sans text-xs sm:text-sm md:text-base text-zinc-300 font-light leading-relaxed max-w-md drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
                  We assist our clients in integrating architectural microLED and advanced display systems into visionary environments.
                </p>
              </div>
            </div>

            {/* Bottom Status Row */}
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

        {/* ─── 3-Billboard Curved Stage Triptych (Matching Reference Photo) ─── */}
        <div
          ref={stageRef}
          className="relative w-full flex items-center justify-center [perspective:1400px] [transform-style:preserve-3d] will-change-transform"
        >
          {/* Center Dominant Billboard */}
          <div
            ref={billboardRef}
            className="relative z-20 shrink-0 flex flex-col items-center justify-center will-change-[width,height,transform] [transform-style:preserve-3d]"
            style={{
              width: "100vw",
              height: "100vh",
              maxWidth: "100vw",
              maxHeight: "100vh",
            }}
          >
            {/* 1. Left Slanted Billboard (Slanted in opposite direction, with gap from Center Billboard) */}
            <div
              ref={leftBillboardRef}
              className="absolute right-full top-1/2 -translate-y-1/2 mr-3 sm:mr-5 md:mr-6 lg:mr-8 z-10 flex flex-col items-center pointer-events-none will-change-[transform,opacity] w-[38vw] max-w-[190px] sm:w-[30vw] sm:max-w-[380px] md:max-w-[420px]"
              style={{
                transformOrigin: "right center",
                transform: "perspective(1400px) rotateY(-24deg) translateZ(-30px)",
                opacity: 0,
              }}
            >
              {/* 5 Top Floodlights */}
              <Floodlights angles={["-8deg", "-4deg", "0deg", "4deg", "8deg"]} />

              {/* Screen Container */}
              <div className="relative w-full aspect-video overflow-hidden rounded-xs bg-black border-[2px] sm:border-[3px] border-[#18181b] ring-1 ring-white/15 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.98)]">
                {/* Corner Fasteners */}
                <div className="absolute top-1 left-1 w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-zinc-500 border border-zinc-300 z-20" />
                <div className="absolute top-1 right-1 w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-zinc-500 border border-zinc-300 z-20" />
                <div className="absolute bottom-1 left-1 w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-zinc-500 border border-zinc-300 z-20" />
                <div className="absolute bottom-1 right-1 w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-zinc-500 border border-zinc-300 z-20" />

                {/* Video Display */}
                <video
                  src="/video/ads.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  className="w-full h-full object-cover object-center pointer-events-none"
                />

                {/* Display Glare & Ambient Scrim */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none z-10" />
                <div className="absolute inset-0 bg-black/10 pointer-events-none z-10" />
              </div>

              {/* Catwalk, Lattice Truss & Dual Pillars */}
              <BillboardStand />
            </div>

            {/* 2. Top-Mounted Floodlights on Center Billboard */}
            <Floodlights
              lightsRef={lightsRef}
              angles={["-10deg", "-5deg", "-2deg", "2deg", "5deg", "10deg"]}
              className="opacity-0 will-change-[transform,opacity]"
            />

            {/* 3. Center Screen Display Frame */}
            <div
              ref={screenWrapperRef}
              className="relative w-full h-full overflow-hidden rounded-[inherit] bg-black flex flex-col"
            >
              {/* Steel Bezel & Corner Rivets */}
              <div
                ref={bezelRef}
                className="absolute inset-0 pointer-events-none z-20 rounded-[inherit] border-[3px] sm:border-[5px] border-[#18181b] ring-1 ring-white/15 opacity-0 will-change-[opacity]"
                style={{
                  boxShadow:
                    "inset 0 2px 3px rgba(255,255,255,0.18), inset 0 -3px 6px rgba(0,0,0,0.9)",
                }}
              >
                {/* Corner Rivet Fasteners */}
                <div className="absolute top-1 left-1 w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-zinc-500 border border-zinc-300 shadow-sm" />
                <div className="absolute top-1 right-1 w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-zinc-500 border border-zinc-300 shadow-sm" />
                <div className="absolute bottom-1 left-1 w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-zinc-500 border border-zinc-300 shadow-sm" />
                <div className="absolute bottom-1 right-1 w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-zinc-500 border border-zinc-300 shadow-sm" />

                {/* Top Brand Plate with Golden LUMERA Emblem (from reference photo) */}
                <div className="w-full h-4 sm:h-6 md:h-7 bg-gradient-to-b from-[#18191e] to-[#0d0e12] border-b border-white/10 flex items-center justify-center select-none">
                  <span className="font-heading text-[9px] sm:text-[11px] md:text-xs tracking-[0.45em] text-[#D7B875] font-bold uppercase drop-shadow-[0_0_8px_rgba(215,184,117,0.35)] pl-[0.45em]">
                    LUMERA
                  </span>
                </div>
              </div>

              {/* Video Player */}
              <div className="relative w-full flex-1 overflow-hidden">
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

                {/* Ambient beginning overlay */}
                <div
                  ref={initialOverlayRef}
                  className="absolute inset-0 pointer-events-none z-10 bg-black/25 bg-gradient-to-t from-black/0 via-black/20 to-black/55 will-change-[opacity]"
                  aria-hidden="true"
                />

                {/* Micro-LED Dot-Pitch Texture Overlay */}
                <div
                  ref={overlayRef}
                  className="absolute inset-0 pointer-events-none z-10 bg-[radial-gradient(#ffffff_0.6px,transparent_0.6px)] [background-size:4px_4px] opacity-0"
                  aria-hidden="true"
                />

                {/* Subtle Display Glare Sheen */}
                <div
                  className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none z-10"
                  aria-hidden="true"
                />
              </div>
            </div>

            {/* 4. Bottom Catwalk, Lattice Truss & Dual Pillars on Center Billboard */}
            <BillboardStand
              standRef={standRef}
              className="opacity-0 will-change-[transform,opacity]"
            />

            {/* 5. Right Slanted Billboard (Slanted in opposite direction, with gap from Center Billboard) */}
            <div
              ref={rightBillboardRef}
              className="absolute left-full top-1/2 -translate-y-1/2 ml-3 sm:ml-5 md:ml-6 lg:ml-8 z-10 flex flex-col items-center pointer-events-none will-change-[transform,opacity] w-[38vw] max-w-[190px] sm:w-[30vw] sm:max-w-[380px] md:max-w-[420px]"
              style={{
                transformOrigin: "left center",
                transform: "perspective(1400px) rotateY(24deg) translateZ(-30px)",
                opacity: 0,
              }}
            >
              {/* 5 Top Floodlights */}
              <Floodlights angles={["-8deg", "-4deg", "0deg", "4deg", "8deg"]} />

              {/* Screen Container */}
              <div className="relative w-full aspect-video overflow-hidden rounded-xs bg-black border-[2px] sm:border-[3px] border-[#18181b] ring-1 ring-white/15 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.98)]">
                {/* Corner Fasteners */}
                <div className="absolute top-1 left-1 w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-zinc-500 border border-zinc-300 z-20" />
                <div className="absolute top-1 right-1 w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-zinc-500 border border-zinc-300 z-20" />
                <div className="absolute bottom-1 left-1 w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-zinc-500 border border-zinc-300 z-20" />
                <div className="absolute bottom-1 right-1 w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-zinc-500 border border-zinc-300 z-20" />

                {/* Video Display */}
                <video
                  src="/video/hero-section (2).mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  className="w-full h-full object-cover object-center pointer-events-none"
                />

                {/* Display Glare & Ambient Scrim */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none z-10" />
                <div className="absolute inset-0 bg-black/10 pointer-events-none z-10" />
              </div>

              {/* Catwalk, Lattice Truss & Dual Pillars */}
              <BillboardStand />
            </div>
          </div>
        </div>

        {/* Editorial Text Block revealed near the screen display */}
        <div
          ref={captionRef}
          className="absolute bottom-6 sm:bottom-8 md:bottom-10 left-0 right-0 max-w-xl mx-auto text-center pointer-events-none opacity-0 z-30 flex flex-col items-center px-4 will-change-[transform,opacity] drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]"
        >
          <h3 className="font-inter text-lg text-accent sm:text-xl md:text-2xl font-bold uppercase leading-snug">
            Engineered to Stand Out
          </h3>
        </div>
      </div>
    </section>
  );
}

export default AdsSection;
