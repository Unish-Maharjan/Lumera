"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { usePreloader } from "@/components/ui/Preloader";

export default function NotFound() {
  const { triggerPreloader } = usePreloader();


  return (
    <main className="relative min-h-screen w-full bg-black text-[#F7F7F5] flex flex-col
     justify-center items-center overflow-hidden pt-28 sm:pt-32 pb-16 sm:pb-24 select-none">
      {/* ─── Architectural CAD Blueprint Background Grids ─── */}
      {/* <div
        className="absolute inset-0 pointer-events-none select-none z-0"
        aria-hidden="true"
      >
  
        <div
          className="absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_95%)]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.12) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.12) 1px, transparent 1px)
            `,
            backgroundSize: "32px 32px",
          }}
        />

   
        <div
          className="absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_center,black_65%,transparent_95%)]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(215, 184, 117, 0.25) 1.5px, transparent 1.5px),
              linear-gradient(to bottom, rgba(215, 184, 117, 0.25) 1.5px, transparent 1.5px)
            `,
            backgroundSize: "128px 128px",
          }}
        />

  
        <div className="absolute top-1/2 inset-x-0 h-[1px] bg-[#D7B875]/30 opacity-60" />
        <div className="absolute left-1/2 inset-y-0 w-[1px] bg-[#D7B875]/30 opacity-60" />

    
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none blur-3xl opacity-25"
          style={{
            width: "720px",
            height: "420px",
            background: "radial-gradient(circle, rgba(215,184,117,0.45) 0%, rgba(57,139,255,0.15) 50%, transparent 75%)",
          }}
        />
      </div> */}

      {/* ─── Main Content Container ─── */}
      <Container size="xl" className="relative z-10 w-full flex flex-col items-center text-center">
      
        {/* Monumental 404 Visual Diode Display */}
        <div className="relative flex items-center justify-center my-2 sm:my-4 select-none">
          {/* Subtle Ambient Glow Behind 404 */}
          <div className="absolute inset-0 blur-2xl bg-gradient-to-r from-transparent via-[#D7B875]/15 to-transparent pointer-events-none" />

          <div className="flex items-center gap-2 sm:gap-4 lg:gap-6 font-heading font-bold text-7xl sm:text-9xl md:text-[11rem] lg:text-[13rem] leading-none tracking-tighter">
            {/* First "4" */}
            <span className="text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)] select-none">
              4
            </span>
            {/* First "4" */}
            <span className="text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)] select-none">
              0
            </span>   
            {/* Second "4" */}
            <span className="text-[#D7B875] drop-shadow-[0_10px_30px_rgba(215,184,117,0.3)] select-none">
              4
            </span>
          </div>
        </div>

        {/* Narrative & Description */}
        <div className="max-w-2xl mx-auto mt-4 sm:mt-6 mb-8 sm:mb-12">
          <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tight text-white mb-3">
            Optical Signal <span className="text-accent">Missing.</span>
          </h1>
          <p className="font-sans text-xs sm:text-sm md:text-base text-zinc-400 font-light leading-relaxed">
            The requested display elevation or system route is not indexed within our active microLED registry. The coordinate may have been relocated or decommissioned.
          </p>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-14 sm:mb-20">
          <button
            type="button"
          
            className="h-11 sm:h-12 px-7 sm:px-9 rounded-full bg-white hover:bg-[#D7B875] text-black font-semibold text-xs tracking-widest uppercase transition-all duration-300 flex items-center gap-2.5 shadow-xl hover:shadow-[0_0_25px_rgba(215,184,117,0.4)] cursor-pointer active:scale-95"
          >
            <span>Return to Home</span>
          </button>
        </div>
      </Container>
    </main>
  );
}
