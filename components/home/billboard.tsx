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
        <div className="relative w-full h-3.5 sm:h-4 bg-gradient-to-b from-zinc-700 via-zinc-800 to-zinc-950 border-t border-b border-zinc-400/80 shadow-[0_4px_10px_rgba(0,0,0,0.95)] flex items-center overflow-hidden">
          {/* Steel Toe-Board Kickplate on Front Edge */}
          <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-zinc-600 via-zinc-400 to-zinc-600 border-t border-white/20" />
          {/* Walkway Expanded Metal Mesh Texture */}
          <div className="w-full h-full opacity-35 bg-[repeating-linear-gradient(45deg,#ffffff,#ffffff_1px,transparent_1px,transparent_4px)]" />
        </div>

        {/* Cantilevered Triangular Support Gussets Under the Catwalk */}
        <div className="w-full flex justify-around px-[8%] -mt-0.5 z-10 pointer-events-none">
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className="w-1.5 sm:w-2 h-2 sm:h-3 bg-gradient-to-b from-zinc-600 to-zinc-900 border-x border-zinc-500/50 shadow-sm"
            />
          ))}
        </div>
      </div>

      {/* 2. Heavy 3D Structural Lattice Truss with Depth Shading */}
      <div className="relative w-[102%] -mt-1 z-10 drop-shadow-[0_6px_12px_rgba(0,0,0,0.9)]">
        <svg
          className="w-full h-8 sm:h-10 md:h-12 text-zinc-500"
          viewBox="0 0 800 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          {/* Back Shadow of Truss for 3D depth */}
          <path
            d="M0 4L800 4 M0 58L800 58"
            stroke="rgba(0,0,0,0.85)"
            strokeWidth="6"
          />

          {/* Top Heavy Steel Tubular Chord with Cylindrical Shading */}
          <line x1="0" y1="3" x2="800" y2="3" stroke="#a1a1aa" strokeWidth="4.5" />
          <line x1="0" y1="1.5" x2="800" y2="1.5" stroke="#ffffff" strokeWidth="1" opacity="0.6" />

          {/* Bottom Heavy Steel Tubular Chord */}
          <line x1="0" y1="57" x2="800" y2="57" stroke="#71717a" strokeWidth="4.5" />
          <line x1="0" y1="55.5" x2="800" y2="55.5" stroke="#a1a1aa" strokeWidth="1" opacity="0.4" />

          {/* Vertical Structural Posts with Specular Line */}
          {[0, 100, 200, 300, 400, 500, 600, 700, 800].map((x) => (
            <g key={x}>
              <line x1={x} y1="3" x2={x} y2="57" stroke="#27272a" strokeWidth="4" />
              <line x1={x} y1="3" x2={x} y2="57" stroke="#71717a" strokeWidth="2.5" />
              <circle cx={x} cy="3" r="3" fill="#a1a1aa" />
              <circle cx={x} cy="57" r="3" fill="#71717a" />
            </g>
          ))}

          {/* Diagonal "X" Cross-Braces with 3D Overlap */}
          {[0, 100, 200, 300, 400, 500, 600, 700].map((x, i) => (
            <g key={i}>
              {/* Back Diagonal */}
              <line x1={x} y1="57" x2={x + 100} y2="3" stroke="#18181b" strokeWidth="4" />
              <line x1={x} y1="57" x2={x + 100} y2="3" stroke="#52525b" strokeWidth="2.5" />
              {/* Front Diagonal */}
              <line x1={x} y1="3" x2={x + 100} y2="57" stroke="#27272a" strokeWidth="4" />
              <line x1={x} y1="3" x2={x + 100} y2="57" stroke="#a1a1aa" strokeWidth="2.5" />
              {/* Center Gusset Bolt */}
              <circle cx={x + 50} cy="30" r="2.5" fill="#d4d4d8" stroke="#18181b" strokeWidth="1" />
            </g>
          ))}
        </svg>
      </div>

      {/* 3. Dual Heavy Steel Cylindrical Columns / Monopiles with 3D Radial Lighting */}
      <div className="relative w-full flex justify-between px-[12%] sm:px-[15%] -mt-1.5">
        {/* Left Column */}
        <div className="flex flex-col items-center">
          {/* Top Structural Mounting Flange Plate with Heavy Hex Bolts */}
          <div className="relative w-9 sm:w-12 md:w-14 h-2 sm:h-2.5 bg-gradient-to-r from-zinc-800 via-zinc-300 to-zinc-900 border-y border-white/30 rounded-xs shadow-[0_4px_8px_rgba(0,0,0,0.95)] z-10 flex justify-around items-center px-1">
            <div className="w-1 h-1 rounded-full bg-zinc-200 border border-black/80" />
            <div className="w-1 h-1 rounded-full bg-zinc-200 border border-black/80" />
            <div className="w-1 h-1 rounded-full bg-zinc-200 border border-black/80" />
          </div>

          {/* Heavy Steel Cylindrical Column with Specular Light Stripe */}
          <div className="relative w-6 sm:w-8 md:w-10 h-[65vh] sm:h-[75vh] md:h-[85vh] bg-[linear-gradient(to_right,#09090b_0%,#18181b_15%,#52525b_35%,#e4e4e7_50%,#52525b_65%,#18181b_85%,#09090b_100%)] border-x border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.98),inset_0_0_8px_rgba(0,0,0,0.9)] flex flex-col justify-around items-center">
            {/* 3D Welded Stiffener Collar Rings with Bolts */}
            {[0, 1, 2].map((ringIdx) => (
              <div
                key={ringIdx}
                className="relative w-[118%] h-1.5 sm:h-2 bg-gradient-to-r from-zinc-900 via-zinc-300 to-zinc-950 border-y border-white/25 rounded-xs shadow-[0_2px_6px_rgba(0,0,0,0.9)] flex justify-around items-center px-0.5"
              >
                <div className="w-0.5 h-0.5 rounded-full bg-white shadow-xs" />
                <div className="w-0.5 h-0.5 rounded-full bg-white shadow-xs" />
              </div>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col items-center">
          {/* Top Structural Mounting Flange Plate with Heavy Hex Bolts */}
          <div className="relative w-9 sm:w-12 md:w-14 h-2 sm:h-2.5 bg-gradient-to-r from-zinc-800 via-zinc-300 to-zinc-900 border-y border-white/30 rounded-xs shadow-[0_4px_8px_rgba(0,0,0,0.95)] z-10 flex justify-around items-center px-1">
            <div className="w-1 h-1 rounded-full bg-zinc-200 border border-black/80" />
            <div className="w-1 h-1 rounded-full bg-zinc-200 border border-black/80" />
            <div className="w-1 h-1 rounded-full bg-zinc-200 border border-black/80" />
          </div>

          {/* Heavy Steel Cylindrical Column with Specular Light Stripe */}
          <div className="relative w-6 sm:w-8 md:w-10 h-[65vh] sm:h-[75vh] md:h-[85vh] bg-[linear-gradient(to_right,#09090b_0%,#18181b_15%,#52525b_35%,#e4e4e7_50%,#52525b_65%,#18181b_85%,#09090b_100%)] border-x border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.98),inset_0_0_8px_rgba(0,0,0,0.9)] flex flex-col justify-around items-center">
            {/* 3D Welded Stiffener Collar Rings with Bolts */}
            {[0, 1, 2].map((ringIdx) => (
              <div
                key={ringIdx}
                className="relative w-[118%] h-1.5 sm:h-2 bg-gradient-to-r from-zinc-900 via-zinc-300 to-zinc-950 border-y border-white/25 rounded-xs shadow-[0_2px_6px_rgba(0,0,0,0.9)] flex justify-around items-center px-0.5"
              >
                <div className="w-0.5 h-0.5 rounded-full bg-white shadow-xs" />
                <div className="w-0.5 h-0.5 rounded-full bg-white shadow-xs" />
              </div>
            ))}
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

      {/* 3D Extruded Outer Enclosure / Structural Cabinet */}
      <div
        ref={screenWrapperRef}
        className={`relative w-full h-full rounded-[4px] bg-gradient-to-b from-[#24252a] via-[#141519] to-[#0a0a0c] p-[2px] sm:p-[3px] flex flex-col ${
          isHero
            ? ""
            : "shadow-[0_30px_90px_-15px_rgba(0,0,0,0.98),0_0_65px_rgba(215,184,117,0.22),-8px_8px_24px_rgba(0,0,0,0.85)]"
        }`}
        style={{
          boxShadow: isHero
            ? undefined
            : "0 30px 90px -15px rgba(0,0,0,0.98), 0 0 65px rgba(215,184,117,0.2), inset 0 1px 2px rgba(255,255,255,0.25), inset 0 -2px 4px rgba(0,0,0,0.9)",
        }}
      >
        {/* Steel Bezel with Heavy Rivets & Recessed Frame */}
        <div
          ref={bezelRef}
          className={`absolute inset-0 pointer-events-none z-20 rounded-[inherit] border-[3px] sm:border-[5px] border-[#18191e] ring-1 ring-white/20 ${
            isHero ? "opacity-0 will-change-[opacity]" : ""
          }`}
          style={{
            boxShadow:
              "inset 0 4px 10px rgba(0,0,0,0.95), inset 0 1px 2px rgba(255,255,255,0.25), inset 0 -3px 8px rgba(0,0,0,0.95)",
          }}
        >
          {/* Heavy Industrial Hex Bolt Fasteners on Corners */}
          <div className="absolute top-1 left-1 w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-gradient-to-br from-zinc-300 to-zinc-700 border border-black/80 shadow-sm" />
          <div className="absolute top-1 right-1 w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-gradient-to-br from-zinc-300 to-zinc-700 border border-black/80 shadow-sm" />
          <div className="absolute bottom-1 left-1 w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-gradient-to-br from-zinc-300 to-zinc-700 border border-black/80 shadow-sm" />
          <div className="absolute bottom-1 right-1 w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-gradient-to-br from-zinc-300 to-zinc-700 border border-black/80 shadow-sm" />

          {/* Additional Mid-Span Bolting Plates for Industrial Realism */}
          <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1.5 sm:w-2 h-1 sm:h-1.5 rounded-xs bg-zinc-500 border border-zinc-300/60" />
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 sm:w-2 h-1 sm:h-1.5 rounded-xs bg-zinc-500 border border-zinc-300/60" />

          {/* Embossed Metallic Header Plate with Golden LUMERA Emblem */}
          <div className="w-full h-4.5 sm:h-6 md:h-7 bg-gradient-to-b from-[#22242b] via-[#14151a] to-[#0b0c10] border-b border-white/15 flex items-center justify-center select-none shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_2px_4px_rgba(0,0,0,0.7)]">
            <span className="font-heading text-[9px] sm:text-[11px] md:text-xs tracking-[0.45em] text-[#D7B875] font-bold uppercase drop-shadow-[0_0_10px_rgba(215,184,117,0.45)] pl-[0.45em]">
              LUMERA
            </span>
          </div>
        </div>

        {/* Recessed Video Display Area */}
        <div className="relative w-full flex-1 overflow-hidden rounded-[1px] bg-black shadow-[inset_0_0_20px_rgba(0,0,0,0.9)]">
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

          {/* Micro-LED Modular Tile Grid & Texture (creates real physical display panels) */}
          <div
            ref={overlayRef}
            className={`absolute inset-0 pointer-events-none z-10 bg-[radial-gradient(#ffffff_0.6px,transparent_0.6px)] [background-size:4px_4px] ${
              isHero ? "opacity-0" : "opacity-12"
            }`}
            aria-hidden="true"
          />
          {/* Subtle Horizontal & Vertical Panel Seams */}
          <div
            className="absolute inset-0 pointer-events-none z-10 opacity-15 bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:25%_50%]"
            aria-hidden="true"
          />

          {/* 3D Diagonal Specular Glass Reflection Sheen */}
          <div
            className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.07] to-transparent pointer-events-none z-10"
            aria-hidden="true"
          />

          {/* Ambient Inner Shadow along top and edges simulating recessed screen depth */}
          <div
            className="absolute inset-0 pointer-events-none z-10 shadow-[inset_0_3px_8px_rgba(0,0,0,0.85),inset_0_-2px_6px_rgba(0,0,0,0.85)]"
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
          const shift = isDesktop ? 124 : 114;

          // Initial Coordinate and Layer States (No 3D slanting/tilt - straight flat facing)
          gsap.set(billboard1Ref.current, { xPercent: 0, rotateY: 0, zIndex: 30 });
          if (billboard2Ref.current) {
            gsap.set(billboard2Ref.current, {
              xPercent: shift + 30,
              rotateY: 0,
              scale: 0.95,
              opacity: 0,
              zIndex: 20,
            });
          }
          if (billboard3Ref.current) {
            gsap.set(billboard3Ref.current, {
              xPercent: shift * 2,
              rotateY: 0,
              scale: 0.90,
              opacity: 0,
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
                rotateY: 0,
                opacity: 0.85,
                scale: 0.95,
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
            { xPercent: -shift, rotateY: 0, opacity: 0.85, scale: 0.95, duration: dur1, ease: "power2.inOut" },
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
              { xPercent: shift, rotateY: 0, opacity: 0.85, scale: 0.95, duration: dur1, ease: "power2.inOut" },
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
            { xPercent: -shift * 2, rotateY: 0, opacity: 0, scale: 0.90, duration: dur2, ease: "power2.inOut" },
            t2
          );

          // Billboard 2 glides left to peeking position
          if (billboard2Ref.current) {
            tl.to(
              billboard2Ref.current,
              { xPercent: -shift, rotateY: 0, opacity: 0.85, scale: 0.95, duration: dur2, ease: "power2.inOut" },
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
          className="relative w-full flex items-center justify-center will-change-transform"
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
