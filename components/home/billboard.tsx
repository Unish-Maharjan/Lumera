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
        <div className="absolute -top-2.5 sm:-top-3 left-0 right-0 h-2.5 sm:h-3 border-t-[1.5px] border-zinc-400 flex justify-between px-2 sm:px-4 pointer-events-none">
          {Array.from({ length: 19 }).map((_, idx) => (
            <div key={idx} className="w-[1px] h-full bg-zinc-400" />
          ))}
        </div>
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
          <line x1="0" y1="2" x2="800" y2="2" stroke="currentColor" strokeWidth="4" />
          <line x1="0" y1="58" x2="800" y2="58" stroke="currentColor" strokeWidth="4" />
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
          {[0, 100, 200, 300, 400, 500, 600, 700].map((x, i) => (
            <g key={i}>
              <line x1={x} y1="2" x2={x + 100} y2="58" stroke="currentColor" strokeWidth="2.5" />
              <line x1={x + 100} y1="2" x2={x} y2="58" stroke="currentColor" strokeWidth="2.5" />
            </g>
          ))}
        </svg>
      </div>

      {/* 3. Dual Heavy Steel Cylindrical Columns / Pillars */}
      <div className="relative w-full flex justify-between px-[12%] sm:px-[15%] -mt-1">
        <div className="flex flex-col items-center">
          <div className="w-8 sm:w-11 md:w-13 h-1.5 sm:h-2 bg-gradient-to-r from-zinc-800 via-zinc-400 to-zinc-800 border-y border-white/20 rounded-xs shadow-md z-10" />
          <div className="relative w-6 sm:w-8 md:w-10 h-[65vh] sm:h-[75vh] md:h-[85vh] bg-gradient-to-r from-zinc-950 via-zinc-500 to-zinc-950 border-x border-white/10 shadow-2xl flex flex-col justify-around items-center">
            <div className="w-[115%] h-1 sm:h-1.5 bg-gradient-to-r from-zinc-800 via-zinc-400 to-zinc-800 border-y border-white/20 rounded-xs shadow-sm" />
            <div className="w-[115%] h-1 sm:h-1.5 bg-gradient-to-r from-zinc-800 via-zinc-400 to-zinc-800 border-y border-white/20 rounded-xs shadow-sm" />
          </div>
        </div>

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

/* ─── Modular Reusable Billboard Structure ─── */
interface BillboardCardProps {
  cardRef: React.RefObject<HTMLDivElement | null>;
  videoSrc: string;
  isHero?: boolean;
  videoRef?: React.RefObject<HTMLVideoElement | null>;
  screenWrapperRef?: React.RefObject<HTMLDivElement | null>;
  bezelRef?: React.RefObject<HTMLDivElement | null>;
  lightsRef?: React.RefObject<HTMLDivElement | null>;
  standRef?: React.RefObject<HTMLDivElement | null>;
  overlayRef?: React.RefObject<HTMLDivElement | null>;
  initialOverlayRef?: React.RefObject<HTMLDivElement | null>;
  className?: string;
  style?: React.CSSProperties;
}

function BillboardCard({
  cardRef,
  videoSrc,
  isHero = false,
  videoRef,
  screenWrapperRef,
  bezelRef,
  lightsRef,
  standRef,
  overlayRef,
  initialOverlayRef,
  className = "",
  style = {},
}: BillboardCardProps) {
  return (
    <div
      ref={cardRef}
      className={`shrink-0 flex flex-col items-center justify-center will-change-[transform,opacity] [transform-style:preserve-3d] pointer-events-none ${className}`.trim()}
      style={style}
    >
      {/* Top Industrial Floodlights */}
      <Floodlights
        lightsRef={lightsRef}
        angles={["-10deg", "-5deg", "-2deg", "2deg", "5deg", "10deg"]}
        className={isHero ? "opacity-0 will-change-[transform,opacity]" : ""}
      />

      {/* Screen Frame with Steel Bezel & Corner Rivets */}
      <div
        ref={screenWrapperRef}
        className={`relative w-full h-full overflow-hidden rounded-[2px] bg-black flex flex-col ${
          isHero
            ? ""
            : "shadow-[0_25px_80px_-15px_rgba(0,0,0,0.98),0_0_65px_rgba(214,189,130,0.22)]"
        }`}
      >
        <div
          ref={bezelRef}
          className={`absolute inset-0 pointer-events-none z-20 rounded-[inherit] border-[3px] sm:border-[5px] border-[#18181b] ring-1 ring-white/15 ${
            isHero ? "opacity-0 will-change-[opacity]" : ""
          }`}
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

          {/* Golden LUMERA Brand Plate */}
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
            src={videoSrc}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover object-center pointer-events-none"
          />

          {/* Initial Dark Ambient Scrim (for Hero billboard only) */}
          {initialOverlayRef && (
            <div
              ref={initialOverlayRef}
              className="absolute inset-0 pointer-events-none z-10 bg-black/25 bg-gradient-to-t from-black/0 via-black/20 to-black/55 will-change-[opacity]"
              aria-hidden="true"
            />
          )}

          {/* Micro-LED Dot Texture */}
          <div
            ref={overlayRef}
            className={`absolute inset-0 pointer-events-none z-10 bg-[radial-gradient(#ffffff_0.6px,transparent_0.6px)] [background-size:4px_4px] ${
              isHero ? "opacity-0" : "opacity-10"
            }`}
            aria-hidden="true"
          />

          {/* Subtle Display Glare Sheen */}
          <div
            className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none z-10"
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Catwalk, Lattice Truss & Dual Pillars */}
      <BillboardStand
        standRef={standRef}
        className={isHero ? "opacity-0 will-change-[transform,opacity]" : ""}
      />
    </div>
  );
}

export function AdsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinnedViewportRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const heroCtaRef = useRef<HTMLDivElement>(null);
  const initialOverlayRef = useRef<HTMLDivElement>(null);

  // Billboard 1 (Hero -> Matrix)
  const billboard1Ref = useRef<HTMLDivElement>(null);
  const screenWrapper1Ref = useRef<HTMLDivElement>(null);
  const bezel1Ref = useRef<HTMLDivElement>(null);
  const lights1Ref = useRef<HTMLDivElement>(null);
  const stand1Ref = useRef<HTMLDivElement>(null);
  const overlay1Ref = useRef<HTMLDivElement>(null);
  const video1Ref = useRef<HTMLVideoElement>(null);

  // Billboard 2 (Strata)
  const billboard2Ref = useRef<HTMLDivElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);

  // Billboard 3 (Vortex)
  const billboard3Ref = useRef<HTMLDivElement>(null);
  const video3Ref = useRef<HTMLVideoElement>(null);

  // Captions & Progress Pills
  const indicatorRef = useRef<HTMLDivElement>(null);
  const pill1Ref = useRef<HTMLDivElement>(null);
  const pill2Ref = useRef<HTMLDivElement>(null);
  const pill3Ref = useRef<HTMLDivElement>(null);
  const caption1Ref = useRef<HTMLDivElement>(null);
  const caption2Ref = useRef<HTMLDivElement>(null);
  const caption3Ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current || !pinnedViewportRef.current || !billboard1Ref.current) return;

      gsap.registerPlugin(ScrollTrigger);

      const mm = gsap.matchMedia();

      // Unified Responsive Setup for Desktop & Mobile
      mm.add(
        {
          isDesktop: "(min-width: 768px)",
          isMobile: "(max-width: 767px)",
        },
        (context) => {
          const isDesktop = context.conditions?.isDesktop ?? true;
          const targetW = isDesktop ? "44vw" : "76vw";
          const targetH = isDesktop ? "24.75vw" : "42.75vw";
          const targetMaxW = isDesktop ? "600px" : "350px";
          const targetMaxH = isDesktop ? "337.5px" : "197px";
          const shift = isDesktop ? 108 : 106;

          // Initial Coordinate and Layer States
          gsap.set(billboard1Ref.current, { xPercent: 0, zIndex: 30 });
          if (billboard2Ref.current) {
            gsap.set(billboard2Ref.current, {
              xPercent: shift + 25,
              rotateY: isDesktop ? 14 : 10,
              scale: 0.94,
              opacity: 0,
              transformPerspective: 1400,
              transformOrigin: "center center",
              zIndex: 20,
            });
          }
          if (billboard3Ref.current) {
            gsap.set(billboard3Ref.current, {
              xPercent: shift * 2,
              rotateY: isDesktop ? 18 : 14,
              scale: 0.88,
              opacity: 0,
              transformPerspective: 1400,
              transformOrigin: "center center",
              zIndex: 10,
            });
          }

          // Pinning the Viewport
          ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            pin: pinnedViewportRef.current,
            pinSpacing: false,
            anticipatePin: 1,
          });

          // Master Scroll Scrub Timeline
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 1.2,
            },
          });

          // 1. Initial Hero Shrink Phase (0.00 -> 0.75)
          if (heroCtaRef.current) {
            tl.to(heroCtaRef.current, { opacity: 0, y: -20, duration: 0.22, ease: "power2.inOut" }, 0);
          }
          if (initialOverlayRef.current) {
            tl.to(initialOverlayRef.current, { opacity: 0, duration: 0.28, ease: "power2.out" }, 0);
          }
          if (stageRef.current) {
            tl.fromTo(
              stageRef.current,
              { y: 0 },
              { y: isDesktop ? -28 : -20, duration: 0.8, ease: "power2.inOut" },
              0.12
            );
          }

          // Billboard 1 shrinks into its exact 16:9 frame
          tl.fromTo(
            billboard1Ref.current,
            { width: "100vw", height: "100vh", maxWidth: "100vw", maxHeight: "100vh", borderRadius: "0px" },
            {
              width: targetW,
              height: targetH,
              maxWidth: targetMaxW,
              maxHeight: targetMaxH,
              borderRadius: "2px",
              duration: 0.8,
              ease: "power2.inOut",
            },
            0.12
          );

          // Reveal industrial frame elements on Billboard 1
          if (screenWrapper1Ref.current) {
            tl.fromTo(
              screenWrapper1Ref.current,
              { boxShadow: "0 0 0 rgba(0,0,0,0)" },
              {
                boxShadow: "0 25px 80px -15px rgba(0,0,0,0.98), 0 0 65px rgba(214,189,130,0.22)",
                duration: 0.65,
                ease: "power2.out",
              },
              0.35
            );
          }
          if (bezel1Ref.current) {
            tl.fromTo(bezel1Ref.current, { opacity: 0 }, { opacity: 1, duration: 0.55, ease: "power2.out" }, 0.35);
          }
          if (lights1Ref.current) {
            tl.fromTo(lights1Ref.current, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.55, ease: "power2.out" }, 0.4);
          }
          if (stand1Ref.current) {
            tl.fromTo(stand1Ref.current, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.55, ease: "power2.out" }, 0.4);
          }
          if (overlay1Ref.current) {
            tl.fromTo(overlay1Ref.current, { opacity: 0 }, { opacity: 0.12, duration: 0.5, ease: "power1.inOut" }, 0.45);
          }

          // Billboard 2 reveals peeking on the right edge as Billboard 1 settles into center
          if (billboard2Ref.current) {
            tl.to(
              billboard2Ref.current,
              {
                xPercent: shift,
                rotateY: isDesktop ? 14 : 10,
                opacity: 0.85,
                scale: 0.94,
                duration: 0.55,
                ease: "power2.out",
              },
              0.4
            );
          }

          // Reveal Carousel Indicator Tracker & Caption 1
          if (indicatorRef.current) {
            tl.fromTo(indicatorRef.current, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }, 0.65);
          }
          if (caption1Ref.current) {
            tl.fromTo(caption1Ref.current, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }, 0.65);
          }

          // 2. Carousel Transition 1: Billboard 1 slides left -> Billboard 2 slides to CENTER
          const t1 = 1.10;
          const dur1 = 0.75;

          // Billboard 1 glides left to peeking position
          tl.to(
            billboard1Ref.current,
            { xPercent: -shift, rotateY: isDesktop ? -14 : -10, opacity: 0.85, scale: 0.94, duration: dur1, ease: "power2.inOut" },
            t1
          );

          // Billboard 2 glides into the exact middle
          if (billboard2Ref.current) {
            tl.to(
              billboard2Ref.current,
              { xPercent: 0, rotateY: 0, opacity: 1, scale: 1, duration: dur1, ease: "power2.inOut" },
              t1
            );
            tl.set(billboard2Ref.current, { zIndex: 30 }, t1 + 0.35);
            tl.set(billboard1Ref.current, { zIndex: 20 }, t1 + 0.35);
          }

          // Billboard 3 glides into right peeking position
          if (billboard3Ref.current) {
            tl.to(
              billboard3Ref.current,
              { xPercent: shift, rotateY: isDesktop ? 14 : 10, opacity: 0.85, scale: 0.94, duration: dur1, ease: "power2.inOut" },
              t1
            );
          }

          // Indicator & Caption updates (1 -> 2)
          if (caption1Ref.current && caption2Ref.current) {
            tl.to(caption1Ref.current, { opacity: 0, y: -10, duration: 0.28 }, t1);
            tl.fromTo(caption2Ref.current, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.35 }, t1 + 0.28);
          }
          if (pill1Ref.current && pill2Ref.current) {
            tl.to(pill1Ref.current, { width: 8, opacity: 0.35, backgroundColor: "#ffffff", duration: 0.3 }, t1);
            tl.to(pill2Ref.current, { width: isDesktop ? 24 : 20, opacity: 1, backgroundColor: "#D7B875", duration: 0.3 }, t1);
          }

          // 3. Carousel Transition 2: Billboard 2 slides left -> Billboard 3 slides to CENTER
          const t2 = 2.15;
          const dur2 = 0.75;

          // Billboard 1 exits far left
          tl.to(
            billboard1Ref.current,
            { xPercent: -shift * 2, rotateY: isDesktop ? -20 : -14, opacity: 0, scale: 0.88, duration: dur2, ease: "power2.inOut" },
            t2
          );

          // Billboard 2 glides left to peeking position
          if (billboard2Ref.current) {
            tl.to(
              billboard2Ref.current,
              { xPercent: -shift, rotateY: isDesktop ? -14 : -10, opacity: 0.85, scale: 0.94, duration: dur2, ease: "power2.inOut" },
              t2
            );
          }

          // Billboard 3 glides into the exact middle
          if (billboard3Ref.current) {
            tl.to(
              billboard3Ref.current,
              { xPercent: 0, rotateY: 0, opacity: 1, scale: 1, duration: dur2, ease: "power2.inOut" },
              t2
            );
            tl.set(billboard3Ref.current, { zIndex: 30 }, t2 + 0.35);
            tl.set(billboard2Ref.current, { zIndex: 20 }, t2 + 0.35);
          }

          // Indicator & Caption updates (2 -> 3)
          if (caption2Ref.current && caption3Ref.current) {
            tl.to(caption2Ref.current, { opacity: 0, y: -10, duration: 0.28 }, t2);
            tl.fromTo(caption3Ref.current, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.35 }, t2 + 0.28);
          }
          if (pill2Ref.current && pill3Ref.current) {
            tl.to(pill2Ref.current, { width: 8, opacity: 0.35, backgroundColor: "#ffffff", duration: 0.3 }, t2);
            tl.to(pill3Ref.current, { width: isDesktop ? 24 : 20, opacity: 1, backgroundColor: "#D7B875", duration: 0.3 }, t2);
          }

          // 4. Extended Hold for Billboard 3 in the center (generous runway to admire the final billboard)
          tl.to({}, { duration: 1.4 });
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[440vh] bg-black text-[#F5F2EB] overflow-x-clip"
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
          className="absolute inset-0 z-30 pointer-events-none flex flex-col justify-between pt-24 sm:pt-28 pb-8 sm:pb-10 will-change-[transform,opacity]"
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

        {/* ─── Scroll-Driven Billboard Stage Carousel ─── */}
        <div
          ref={stageRef}
          className="relative w-full flex items-center justify-center [perspective:1400px] [transform-style:preserve-3d] will-change-transform"
        >
          {/* Billboard 1 (Hero Shrink -> Matrix) */}
          <BillboardCard
            cardRef={billboard1Ref}
            videoRef={video1Ref}
            videoSrc="/video/1_1.mp4"
            isHero
            screenWrapperRef={screenWrapper1Ref}
            bezelRef={bezel1Ref}
            lightsRef={lights1Ref}
            standRef={stand1Ref}
            overlayRef={overlay1Ref}
            initialOverlayRef={initialOverlayRef}
            className="relative z-30"
            style={{
              width: "100vw",
              height: "100vh",
              maxWidth: "100vw",
              maxHeight: "100vh",
            }}
          />

          {/* Billboard 2 (Strata) */}
          <BillboardCard
            cardRef={billboard2Ref}
            videoRef={video2Ref}
            videoSrc="/video/ads.mp4"
            className="absolute top-0 left-0 right-0 mx-auto z-20 w-[76vw] h-[42.75vw] max-w-[350px] max-h-[197px] md:w-[44vw] md:h-[24.75vw] md:max-w-[600px] md:max-h-[337.5px]"
            style={{
              transformOrigin: "center center",
              opacity: 0,
            }}
          />

          {/* Billboard 3 (Vortex) */}
          <BillboardCard
            cardRef={billboard3Ref}
            videoRef={video3Ref}
            videoSrc="/video/hero-section (2).mp4"
            className="absolute top-0 left-0 right-0 mx-auto z-10 w-[76vw] h-[42.75vw] max-w-[350px] max-h-[197px] md:w-[44vw] md:h-[24.75vw] md:max-w-[600px] md:max-h-[337.5px]"
            style={{
              transformOrigin: "center center",
              opacity: 0,
            }}
          />
        </div>

        {/* ─── Carousel Progress Tracker & Editorial Titles ─── */}
        <div className="absolute bottom-6 sm:bottom-8 md:bottom-10 left-0 right-0 max-w-xl mx-auto text-center pointer-events-none z-30 flex flex-col items-center px-4 will-change-[transform,opacity] drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
          {/* Progress Tracker Pills */}
          <div ref={indicatorRef} className="flex items-center gap-2 mb-2 sm:mb-3 opacity-0">
            <div ref={pill1Ref} className="h-1 rounded-full transition-all duration-300 w-6 bg-accent" />
            <div ref={pill2Ref} className="h-1 rounded-full transition-all duration-300 w-2 bg-white/35" />
            <div ref={pill3Ref} className="h-1 rounded-full transition-all duration-300 w-2 bg-white/35" />
          </div>

          {/* Synchronized Titles */}
          <div className="relative w-full min-h-[48px] flex items-center justify-center">
            {/* Title 1 */}
            <div ref={caption1Ref} className="absolute inset-0 flex flex-col items-center justify-center opacity-0">
              <h3 className="font-heading text-lg sm:text-xl md:text-2xl text-accent font-bold uppercase leading-snug">
                Engineered to Stand Out
              </h3>
            </div>

            {/* Title 2 */}
            <div ref={caption2Ref} className="absolute inset-0 flex flex-col items-center justify-center opacity-0">
              <h3 className="font-heading text-lg sm:text-xl md:text-2xl text-accent font-bold uppercase leading-snug">
                Monumental Public Visibility
              </h3>
            </div>

            {/* Title 3 */}
            <div ref={caption3Ref} className="absolute inset-0 flex flex-col items-center justify-center opacity-0">
              <h3 className="font-heading text-lg sm:text-xl md:text-2xl text-accent font-bold uppercase leading-snug">
                Cinematic Fidelity & Precision
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AdsSection;
