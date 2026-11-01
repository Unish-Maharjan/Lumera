"use client";

import React, { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Button } from "@/components/ui/Button";

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

        // 0. Hero CTA at the bottom disappears immediately once scrolling starts (0 to 0.18)
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

        // 1. Shrink billboard from full viewport down to compact 16:9 board (0.25 to 1.1)
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
            width: "48vw",
            height: "27vw", // Exact 16:9 ratio (48 * 9/16)
            maxWidth: "680px",
            maxHeight: "382.5px",
            borderRadius: "2px",
            y: -32,
            duration: 0.85,
            ease: "power2.inOut",
          },
          0.25
        );

        // Fade in outer billboard shadow
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
            0.4
          );
        }

        // Fade in steel bezel & rivets as it shrinks away from full bleed
        if (bezelRef.current) {
          tl.fromTo(
            bezelRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.6, ease: "power2.out" },
            0.4
          );
        }

        // 2. Seamlessly reveal Top 6 Floodlights
        if (lightsRef.current) {
          tl.fromTo(
            lightsRef.current,
            { opacity: 0, y: -20 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
            0.45
          );
        }

        // 3. Seamlessly reveal Catwalk, Lattice Truss, and Dual Pillars
        if (standRef.current) {
          tl.fromTo(
            standRef.current,
            { opacity: 0, y: 25 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
            0.45
          );
        }

        // 4. Subtle micro-LED dot-pitch texture
        if (overlayRef.current) {
          tl.fromTo(
            overlayRef.current,
            { opacity: 0 },
            { opacity: 0.12, duration: 0.5, ease: "power1.inOut" },
            0.5
          );
        }

        // 5. Reveal editorial text at the bottom AT THE END OF THE SCROLL
        if (captionRef.current) {
          tl.fromTo(
            captionRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
            0.85
          );
        }

        // Buffer hold before unpinning
        tl.to({}, { duration: 0.25 });
      });

      // Mobile screens
      mm.add("(max-width: 767px)", () => {
        // 1. Pin the billboard viewport until the next section has fully scrolled over it
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
            width: "86vw",
            height: "48.375vw", // Exact 16:9 ratio
            maxWidth: "380px",
            borderRadius: "2px",
            y: -24,
            duration: 0.85,
            ease: "power2.inOut",
          },
          0.25
        );

        if (screenWrapperRef.current) {
          tl.fromTo(
            screenWrapperRef.current,
            { boxShadow: "0 0 0 rgba(0,0,0,0)" },
            {
              boxShadow:
                "0 20px 60px -10px rgba(0, 0, 0, 0.98), 0 0 40px rgba(214, 189, 130, 0.2)",
              duration: 0.7,
              ease: "power2.out",
            },
            0.4
          );
        }

        if (bezelRef.current) {
          tl.fromTo(
            bezelRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.6, ease: "power2.out" },
            0.4
          );
        }

        if (lightsRef.current) {
          tl.fromTo(
            lightsRef.current,
            { opacity: 0, y: -15 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
            0.45
          );
        }

        if (standRef.current) {
          tl.fromTo(
            standRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
            0.45
          );
        }

        if (overlayRef.current) {
          tl.fromTo(
            overlayRef.current,
            { opacity: 0 },
            { opacity: 0.1, duration: 0.5, ease: "power1.inOut" },
            0.5
          );
        }

        if (captionRef.current) {
          tl.fromTo(
            captionRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
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
      {/* Pinned Viewport Container - Kept pinned at top:0 while next section scrolls over it */}
      <div
        ref={pinnedViewportRef}
        className="relative h-screen w-full flex items-center justify-center overflow-hidden select-none z-0 bg-black"
      >
        {/* Deep Atmospheric Champagne Gold Center Glow */}
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(214,189,130,0.2)_0%,_rgba(140,110,60,0.08)_42%,_rgba(50,38,18,0.03)_65%,_transparent_80%)] pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(214,189,130,0.12)_0%,_transparent_55%)] pointer-events-none blur-2xl"
          aria-hidden="true"
        />

        {/* Initial Hero CTA at the bottom of the fullscreen video (disappears once scrolled) */}
        <div
          ref={heroCtaRef}
          className="absolute bottom-10 sm:bottom-14 lg:bottom-16 left-0 right-0 z-30 flex flex-col items-center justify-center text-center px-4 will-change-[transform,opacity]"
        >
          <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white uppercase leading-[1.08] mb-3 sm:mb-4 drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)] max-w-3xl">
            Illuminating spaces<br />
            with <span className="text-accent">precision.</span>
          </h1>

          <div className="flex items-center justify-center pt-1">
            <Link href="#products">
              <Button variant="gold" size="sm">
                Explore Collection
              </Button>
            </Link>
          </div>
        </div>

        {/* The Animated Billboard Structure - Initial Fullscreen Dimensions */}
        <div
          ref={billboardRef}
          className="relative z-10 flex items-center justify-center w-screen h-screen will-change-[width,height,transform]"
          style={{
            width: "100vw",
            height: "100vh",
            maxWidth: "100vw",
            maxHeight: "100vh",
          }}
        >
          {/* 6 Top-Mounted Billboard Floodlights (Attached flush to top edge) */}
          <div
            ref={lightsRef}
            className="absolute -top-6 sm:-top-8 left-0 right-0 flex justify-between px-3 sm:px-6 pointer-events-none z-30 opacity-0 will-change-[transform,opacity]"
          >
            {[
              { id: 1, angle: "-10deg" },
              { id: 2, angle: "-5deg" },
              { id: 3, angle: "-2deg" },
              { id: 4, angle: "2deg" },
              { id: 5, angle: "5deg" },
              { id: 6, angle: "10deg" },
            ].map((light) => (
              <div key={light.id} className="relative flex flex-col items-center">
                {/* Angled Mounting Bracket Arm */}
                <div
                  className="w-1 sm:w-1.5 h-4 sm:h-6 bg-gradient-to-b from-zinc-500 to-zinc-700 border-x border-white/20 origin-bottom"
                  style={{ transform: `rotate(${light.angle})` }}
                />
                {/* Floodlight Fixture Housing */}
                <div
                  className="w-4 sm:w-7 h-2.5 sm:h-3.5 bg-zinc-800 rounded-xs border border-zinc-400/60 shadow-lg flex items-center justify-center -mt-0.5"
                  style={{ transform: `rotate(${light.angle})` }}
                >
                  {/* Glowing Lamp Face */}
                  <div className="w-3 sm:w-5 h-1 sm:h-1.5 bg-[#FFFDF5] rounded-xs shadow-[0_0_10px_#ffffff,0_0_20px_rgba(255,245,210,0.85)]" />
                </div>

                {/* Spotlight Light Cone projecting onto the billboard */}
                <div
                  className="absolute top-3.5 sm:top-5 w-14 sm:w-20 h-20 sm:h-28 bg-[radial-gradient(ellipse_at_top,_rgba(255,250,230,0.32)_0%,_transparent_75%)] pointer-events-none blur-xs"
                  style={{
                    transform: `translateX(-50%) rotate(${light.angle})`,
                    left: "50%",
                  }}
                />
              </div>
            ))}
          </div>

          {/* The Screen Display (Enclosing 16:9 Video with Overflow-Hidden) */}
          <div
            ref={screenWrapperRef}
            className="relative w-full h-full overflow-hidden rounded-[inherit] bg-black"
          >
            {/* Commercial Billboard Outer Steel Bezel & Corner Rivets */}
            <div
              ref={bezelRef}
              className="absolute inset-0 pointer-events-none z-20 rounded-[inherit] border-[3px] sm:border-[5px] border-[#18181b] ring-1 ring-white/15 opacity-0 will-change-[opacity]"
              style={{
                boxShadow:
                  "inset 0 2px 3px rgba(255,255,255,0.18), inset 0 -3px 6px rgba(0,0,0,0.9)",
              }}
            >
              {/* Industrial Corner Rivet Fasteners (Matching Reference Photo) */}
              <div className="absolute top-1 left-1 w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-zinc-500 border border-zinc-300 shadow-sm" />
              <div className="absolute top-1 right-1 w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-zinc-500 border border-zinc-300 shadow-sm" />
              <div className="absolute bottom-1 left-1 w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-zinc-500 border border-zinc-300 shadow-sm" />
              <div className="absolute bottom-1 right-1 w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-zinc-500 border border-zinc-300 shadow-sm" />
            </div>

            {/* Video Player - 16:9 aspect fits flush edge-to-edge inside the billboard */}
            <video
              ref={videoRef}
              src="/video/wormhole.mp4"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="w-full h-full object-cover object-center pointer-events-none"
            />

            {/* Micro-LED Billboard Dot-Pitch Texture Overlay */}
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

          {/* Bottom Catwalk, Lattice Truss & Dual Pillars (Attached flush to bottom edge) */}
          <div
            ref={standRef}
            className="absolute top-full left-0 right-0 flex flex-col items-center pointer-events-none z-20 opacity-0 will-change-[transform,opacity]"
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

            {/* 3. Dual Heavy Steel Cylindrical Columns / Pillars extending to bottom 0 */}
            <div className="relative w-full flex justify-between px-[12%] sm:px-[15%] -mt-1">
              {/* Left Pillar Column */}
              <div className="flex flex-col items-center">
                {/* Top Bolted Collar Joint */}
                <div className="w-10 sm:w-14 md:w-16 h-1.5 sm:h-2 bg-gradient-to-r from-zinc-800 via-zinc-500 to-zinc-800 border-y border-white/20 rounded-xs shadow-md z-10" />
                {/* Cylindrical Metallic Column extending down to bottom 0 */}
                <div className="relative w-8 sm:w-11 md:w-13 h-[65vh] sm:h-[75vh] md:h-[85vh] bg-gradient-to-r from-zinc-950 via-zinc-600 to-zinc-950 border-x border-white/10 shadow-2xl flex flex-col justify-around items-center">
                  {/* Intermediate Flange Ring Joints along the tall pillar */}
                  <div className="w-[115%] h-1 sm:h-1.5 bg-gradient-to-r from-zinc-800 via-zinc-500 to-zinc-800 border-y border-white/20 rounded-xs shadow-sm" />
                  <div className="w-[115%] h-1 sm:h-1.5 bg-gradient-to-r from-zinc-800 via-zinc-500 to-zinc-800 border-y border-white/20 rounded-xs shadow-sm" />
                </div>
              </div>

              {/* Right Pillar Column */}
              <div className="flex flex-col items-center">
                {/* Top Bolted Collar Joint */}
                <div className="w-10 sm:w-14 md:w-16 h-1.5 sm:h-2 bg-gradient-to-r from-zinc-800 via-zinc-500 to-zinc-800 border-y border-white/20 rounded-xs shadow-md z-10" />
                {/* Cylindrical Metallic Column extending down to bottom 0 */}
                <div className="relative w-8 sm:w-11 md:w-13 h-[65vh] sm:h-[75vh] md:h-[85vh] bg-gradient-to-r from-zinc-950 via-zinc-600 to-zinc-950 border-x border-white/10 shadow-2xl flex flex-col justify-around items-center">
                  {/* Intermediate Flange Ring Joints along the tall pillar */}
                  <div className="w-[115%] h-1 sm:h-1.5 bg-gradient-to-r from-zinc-800 via-zinc-500 to-zinc-800 border-y border-white/20 rounded-xs shadow-sm" />
                  <div className="w-[115%] h-1 sm:h-1.5 bg-gradient-to-r from-zinc-800 via-zinc-500 to-zinc-800 border-y border-white/20 rounded-xs shadow-sm" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Editorial Text Block revealed near the screen display */}
        <div
          ref={captionRef}
          className="absolute bottom-6 sm:bottom-8 md:bottom-10 left-0 right-0 max-w-xl mx-auto text-center pointer-events-none opacity-0 z-30 flex flex-col items-center px-4 will-change-[transform,opacity] drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]"
        >
          <h3 className="font-heading text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-white uppercase leading-snug">
            Commercial Displays Engineered for Urban Presence
          </h3>
        </div>

        {/* Ambient bottom-weighted black gradient blending seamlessly into the About section
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-44 sm:h-64 lg:h-80 bg-gradient-to-t from-black via-black/85 to-transparent z-25"
          aria-hidden="true"
        /> */}
      </div>
    </section>
  );
}

export default AdsSection;
