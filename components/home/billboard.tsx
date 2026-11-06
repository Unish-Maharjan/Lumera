"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";

gsap.registerPlugin(ScrollTrigger, useGSAP);
ScrollTrigger.config({ ignoreMobileResize: true }); // stops jumps when mobile address bar hides/shows

const ANGLES = [-10, -5, -2, 2, 5, 10];
const RIVETS = [
  "top-1 left-1 sm:top-1.5 sm:left-1.5",
  "top-1 right-1 sm:top-1.5 sm:right-1.5",
  "bottom-1 left-1 sm:bottom-1.5 sm:left-1.5",
  "bottom-1 right-1 sm:bottom-1.5 sm:right-1.5",
];
const OVERLAY = "absolute inset-0 pointer-events-none z-10";
const RING =
  "w-[115%] h-1 sm:h-1.5 bg-gradient-to-r from-zinc-800 via-zinc-500 to-zinc-800 border-y border-white/20 rounded-xs shadow-sm";

/* ─── Industrial floodlights above the screen ─── */
function Floodlights({ className = "" }: { className?: string }) {
  return (
    <div
      className={`absolute -top-6 sm:-top-8 left-0 right-0 flex justify-between px-3 sm:px-6 pointer-events-none z-30 ${className}`}
    >
      {ANGLES.map((a) => (
        <div key={a} className="relative flex flex-col items-center">
          {/* Arm */}
          <div
            className="w-1 sm:w-1.5 h-4 sm:h-5.5 bg-gradient-to-b from-zinc-300 via-zinc-500 to-zinc-800 border-x border-white/30 origin-bottom shadow-md"
            style={{ transform: `rotate(${a}deg)` }}
          />
          {/* Casing + lamp */}
          <div
            className="relative w-5 sm:w-7 h-2.5 sm:h-3.5 bg-gradient-to-b from-zinc-700 via-zinc-800 to-zinc-950 rounded-[2px] border border-zinc-400/80 shadow-[0_4px_10px_rgba(0,0,0,0.95)] flex items-center justify-center -mt-0.5"
            style={{ transform: `rotate(${a}deg)` }}
          >
            <div className="absolute -top-1 inset-x-0.5 flex justify-between px-0.5">
              {[0, 1, 2].map((i) => (
                <div key={i} className="w-px h-1 bg-zinc-400" />
              ))}
            </div>
            <div className="w-3.5 sm:w-5 h-1 sm:h-1.5 bg-[#FFFDF5] rounded-xs shadow-[0_0_12px_#ffffff,0_0_24px_rgba(255,245,210,0.95)]" />
          </div>
          {/* Light beam */}
          <div
            className="absolute top-4 sm:top-5 left-1/2 w-14 sm:w-20 h-20 sm:h-28 bg-[radial-gradient(ellipse_at_top,_rgba(255,250,230,0.45)_0%,_rgba(255,240,200,0.12)_45%,_transparent_75%)] pointer-events-none blur-xs"
            style={{ transform: `translateX(-50%) rotate(${a}deg)` }}
          />
        </div>
      ))}
    </div>
  );
}

/* ─── Catwalk, truss and steel pillars below the screen ─── */
function BillboardStand({ className = "" }: { className?: string }) {
  return (
    <div
      className={`absolute top-full left-0 right-0 flex flex-col items-center pointer-events-none z-20 ${className}`}
    >
      {/* Catwalk: railing, grating deck, brackets */}
      <div className="relative w-[103%] -mt-0.5 flex flex-col items-center z-20">
        <div className="relative w-full h-3 sm:h-4.5 border-t-[1.5px] border-zinc-400/90 shadow-[0_1px_2px_rgba(0,0,0,0.9)] flex justify-between px-2 sm:px-4">
          <div className="absolute top-1/2 inset-x-0 h-px bg-zinc-500/70" />
          {Array.from({ length: 21 }, (_, i) => (
            <div key={i} className="w-[1.5px] h-full bg-gradient-to-b from-zinc-300 via-zinc-500 to-zinc-700 shadow-sm" />
          ))}
        </div>
        <div className="relative w-full h-3.5 sm:h-4 bg-gradient-to-b from-zinc-700 via-zinc-800 to-zinc-950 border-y border-zinc-500/90 shadow-[0_4px_12px_rgba(0,0,0,0.9)] flex items-center overflow-hidden">
          <div className="w-full h-full opacity-35 bg-[repeating-linear-gradient(45deg,#ffffff,#ffffff_1px,transparent_1px,transparent_3px)]" />
          <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
        </div>
        <div className="w-[96%] flex justify-between px-2 sm:px-6 -mt-px">
          {Array.from({ length: 7 }, (_, i) => (
            <div key={i} className="w-1 sm:w-1.5 h-2.5 sm:h-3.5 bg-gradient-to-b from-zinc-600 via-zinc-800 to-zinc-950 border-x border-zinc-500/40 shadow-xs" />
          ))}
        </div>
      </div>

      {/* 8-bay lattice truss with X braces */}
      <div className="relative w-[103%] -mt-0.5 z-10">
        <svg
          className="w-full h-8 sm:h-10 md:h-12 text-zinc-600/90 drop-shadow-md"
          viewBox="0 0 800 60"
          fill="none"
          stroke="currentColor"
          preserveAspectRatio="none"
        >
          <line x1="0" y1="2" x2="800" y2="2" strokeWidth="4" />
          <line x1="0" y1="58" x2="800" y2="58" strokeWidth="4" />
          {Array.from({ length: 8 }, (_, i) => (
            <g key={i}>
              <line x1={i * 100} y1="2" x2={i * 100 + 100} y2="58" strokeWidth="3" />
              <line x1={i * 100 + 100} y1="2" x2={i * 100} y2="58" strokeWidth="2.5" />
            </g>
          ))}
        </svg>
      </div>

      {/* Two steel pillars */}
      <div className="relative w-full flex justify-between px-[12%] sm:px-[15%] -mt-1">
        {[0, 1].map((i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="w-10 sm:w-14 md:w-16 h-1.5 sm:h-2 bg-gradient-to-r from-zinc-800 via-zinc-400 to-zinc-800 border-y border-white/20 rounded-xs shadow-md z-10" />
            <div className="relative w-8 sm:w-11 md:w-13 h-[65vh] sm:h-[75vh] md:h-[85vh] bg-gradient-to-r from-zinc-950 via-zinc-600 to-zinc-950 border-x border-white/10 shadow-2xl flex flex-col justify-around items-center">
              <div className={RING} />
              <div className={RING} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AdsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const boardRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const board = boardRef.current;
      if (!board) return;

      // Single ScrollTrigger: pin + scrub in one (function values re-calc on resize)
      gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.2,
            pin: pinRef.current,
            pinSpacing: false,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })
        // Hero text + scrim fade out (autoAlpha also disables clicks once hidden)
        .to(".js-hero", { autoAlpha: 0, y: -24, duration: 0.2, ease: "power2.inOut" }, 0)
        .to(".js-scrim", { autoAlpha: 0, duration: 0.28, ease: "power2.out" }, 0)
        // Full-screen → centered billboard, using transform only (no layout work per frame)
        .fromTo(
          board,
          {
            autoAlpha: 1,
            y: 0,
            scale: () => Math.max(innerWidth / board.offsetWidth, innerHeight / board.offsetHeight),
          },
          {
            scale: 1,
            y: () => (innerWidth >= 768 ? -32 : -20),
            duration: 0.85,
            ease: "power2.inOut",
          },
          0.15
        )
        // Shadow/halo + bezel
        .fromTo(".js-glow, .js-bezel", { opacity: 0 }, { opacity: 1, duration: 0.65, ease: "power2.out" }, 0.35)
        // Floodlights drop in (-20), stand rises in (+25)
        .fromTo(
          ".js-lights, .js-stand",
          { opacity: 0, y: (i: number) => (i ? 25 : -20) },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          0.4
        )
        // Micro-LED dot texture
        .fromTo(".js-dots", { opacity: 0 }, { opacity: 0.12, duration: 0.5, ease: "power1.inOut" }, 0.45)
        // Caption
        .fromTo(".js-caption", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }, 0.65)
        // Hold
        .to({}, { duration: 0.5 });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="billboard-showcase"
      aria-label="Lumera Commercial Outdoor LED Billboard Showcase"
      className="relative w-full h-[260vh] bg-black text-[#F5F2EB] overflow-x-clip"
    >
      {/* Pinned viewport */}
      <div
        ref={pinRef}
        className="relative h-screen w-full flex items-center justify-center overflow-hidden select-none z-0 bg-black"
      >
        {/* Ambient glow + floor reflection */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(214,189,130,0.18)_0%,_rgba(140,110,60,0.06)_42%,_rgba(50,38,18,0.02)_65%,_transparent_80%)] pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute bottom-0 inset-x-0 h-44 sm:h-64 pointer-events-none z-10 bg-[radial-gradient(ellipse_65%_75%_at_bottom,_rgba(126,58,242,0.2)_0%,_rgba(59,130,246,0.12)_35%,_rgba(215,184,117,0.06)_65%,_transparent_85%)] blur-2xl"
        />

        {/* Hero content (fades out on scroll) */}
        <div className="js-hero absolute inset-0 z-40 pointer-events-none flex flex-col 
        justify-between pt-24 sm:pt-28 pb-8 
        sm:pb-10 will-change-[transform,opacity]">

          <Container size="xl" className="w-full flex-1 flex flex-col justify-center pointer-events-auto">
            <div aria-hidden="true" />

            <div className="w-full flex flex-col items-center justify-end text-center mt-90 ">
              <div className="flex flex-col items-center justify-center text-center">
                <Heading as="h1" size="xl" align="center">
                  Illuminating<br />
                  New Dimensions
                </Heading>
                <div className="flex justify-center items-center mt-6">
                  <Link href="/products">
                    <Button variant="gold" size="md">
                      Explore Collection
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            {/* <div className="w-full flex items-center justify-between pt-3 pb-1">
              <div className="flex items-center gap-2.5 font-mono text-xs text-zinc-400 tracking-wider">
                <span className="text-accent font-bold text-sm">+</span>
                <span>Scroll to explore</span>
              </div>
              <div className="hidden sm:flex items-center gap-2 font-mono text-[11px] text-zinc-500 uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Commercial Grade Display</span>
              </div>
            </div> */}
          </Container>
        </div>

        {/* Billboard: sized in CSS at its FINAL size, scaled up by GSAP at the start */}
        <div
          ref={boardRef}
          className="invisible relative z-20 w-[82vw] max-w-[380px] md:w-[48vw] md:max-w-[680px] aspect-video pointer-events-none will-change-transform"
        >
          <Floodlights className="js-lights opacity-0" />

          {/* Drop shadow + gold halo (opacity fade instead of animating box-shadow) */}
          <div className="js-glow absolute inset-0 opacity-0 rounded-[2px] shadow-[0_25px_80px_-15px_rgba(0,0,0,0.98),0_0_65px_rgba(214,189,130,0.22)]" />

          {/* Screen */}
          <div className="relative w-full h-full rounded-[2px] overflow-hidden bg-black">
            <video
              src="/video/hero2.mp4"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="w-full h-full object-cover object-center pointer-events-none"
            />

          
            {/* <div className={`js-scrim ${OVERLAY} bg-black/25 bg-gradient-to-t from-black/0 via-black/20 to-black/55`} aria-hidden="true" />
       
            <div className={`js-dots ${OVERLAY} opacity-0 bg-[radial-gradient(#ffffff_0.6px,transparent_0.6px)] [background-size:4px_4px]`} aria-hidden="true" />
       
            <div className={`${OVERLAY} opacity-15 bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:25%_50%]`} aria-hidden="true" />
       
            <div className={`${OVERLAY} bg-gradient-to-tr from-transparent via-white/[0.07] to-transparent`} aria-hidden="true" />
          
            <div className={`${OVERLAY} shadow-[inset_0_3px_8px_rgba(0,0,0,0.85),inset_0_-2px_6px_rgba(0,0,0,0.85)]`} aria-hidden="true" /> */}

            {/* Bezel + rivets */}
            <div
              aria-hidden="true"
              className="js-bezel absolute inset-0 z-20 pointer-events-none opacity-0 border-[3px] sm:border-[5px] md:border-[7px] border-[#18181b] ring-1 ring-white/20 rounded-[2px]"
            >
              {RIVETS.map((pos) => (
                <span key={pos} className={`absolute ${pos} w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-zinc-500 border border-zinc-300 shadow-sm`} />
              ))}
            </div>
          </div>

          <BillboardStand className="js-stand opacity-0" />
        </div>

        {/* Caption */}
        {/* <div className="js-caption absolute bottom-6 sm:bottom-8 md:bottom-10 left-0 right-0 max-w-xl mx-auto text-center pointer-events-none opacity-0 z-30 px-4 will-change-[transform,opacity] drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
          <h3 className="font-heading text-lg sm:text-xl md:text-2xl text-accent font-bold uppercase leading-snug">
            Engineered to Stand Out
          </h3>
        </div> */}
      </div>
    </section>
  );
}

export default AdsSection;