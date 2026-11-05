"use client";

import React, { useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import { usePreloader } from "@/components/ui/Preloader";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { triggerPreloader } = usePreloader();
  const [showTechnicalDetails, setShowTechnicalDetails] = useState<boolean>(false);

  useEffect(() => {
    // Log unexpected runtime errors to telemetry or console
    console.error("Lumera Runtime Error Boundary captured:", error);
  }, [error]);

  return (
    <main className="relative min-h-screen w-full bg-black text-[#F7F7F5] flex flex-col justify-center items-center overflow-hidden pt-28 sm:pt-32 pb-16 sm:pb-24 select-none">
      {/* ─── Architectural CAD Background Grids ─── */}
      <div
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
              linear-gradient(to right, rgba(239, 68, 68, 0.25) 1.5px, transparent 1.5px),
              linear-gradient(to bottom, rgba(239, 68, 68, 0.25) 1.5px, transparent 1.5px)
            `,
            backgroundSize: "128px 128px",
          }}
        />

        {/* Center Crosshairs in warning amber/red */}
        <div className="absolute top-1/2 inset-x-0 h-[1px] bg-red-500/30 opacity-60" />
        <div className="absolute left-1/2 inset-y-0 w-[1px] bg-red-500/30 opacity-60" />

        {/* Ambient Red/Amber Glare */}
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none blur-3xl opacity-20"
          style={{
            width: "700px",
            height: "400px",
            background: "radial-gradient(circle, rgba(239,68,68,0.5) 0%, rgba(215,184,117,0.2) 50%, transparent 75%)",
          }}
        />
      </div>

      <Container size="xl" className="relative z-10 w-full flex flex-col items-center text-center max-w-3xl">
        {/* Status Pill Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-zinc-900/90 border border-red-500/30 backdrop-blur-md shadow-xl mb-6 sm:mb-8">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="font-mono text-[11px] sm:text-xs text-red-300 uppercase tracking-widest font-medium">
            System Alert // Runtime Interruption
          </span>
        </div>

        {/* Monumental Error Visual Display */}
        <div className="relative flex items-center justify-center my-2 sm:my-4 select-none">
          <div className="flex items-center gap-2 sm:gap-4 lg:gap-6 font-heading font-bold text-7xl sm:text-9xl md:text-[11rem] lg:text-[12rem] leading-none tracking-tighter">
            <span className="text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)]">
              5
            </span>

            {/* Warning Core */}
            <div className="relative w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-40 lg:h-40 rounded-full border-2 border-red-500/60 bg-gradient-to-b from-zinc-900 via-zinc-950 to-black flex items-center justify-center shadow-[0_0_40px_rgba(239,68,68,0.3)] overflow-hidden">
              <div
                className="absolute inset-0 opacity-40"
                style={{
                  backgroundImage: "radial-gradient(rgba(239, 68, 68, 0.6) 1px, transparent 1px)",
                  backgroundSize: "8px 8px",
                }}
              />
              <div className="absolute inset-2 rounded-full border border-dashed border-red-500/40 animate-[spin_15s_linear_infinite]" />
              <div className="relative z-10 w-5 h-5 sm:w-7 sm:h-7 rounded-full bg-red-500 shadow-[0_0_20px_#ef4444]" />
            </div>

            <span className="text-[#D7B875] drop-shadow-[0_10px_30px_rgba(215,184,117,0.3)]">
              0
            </span>
          </div>
        </div>

        {/* Headline & Narrative */}
        <div className="mt-4 sm:mt-6 mb-8 sm:mb-10 text-center">
          <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tight text-white mb-3">
            Display Engine <span className="text-red-400">Fault.</span>
          </h1>
          <p className="font-sans text-xs sm:text-sm md:text-base text-zinc-400 font-light leading-relaxed max-w-xl mx-auto">
            An unexpected runtime condition interrupted this segment. The Lumera diagnostic watchdog has isolated the event.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-8">
          <button
            type="button"
            onClick={() => reset()}
            className="h-11 sm:h-12 px-7 sm:px-9 rounded-full bg-white hover:bg-[#D7B875] text-black font-semibold text-xs tracking-widest uppercase transition-all duration-300 flex items-center gap-2.5 shadow-xl hover:shadow-[0_0_25px_rgba(215,184,117,0.4)] cursor-pointer active:scale-95"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>Reload Segment</span>
          </button>

          <button
            type="button"
            onClick={() => triggerPreloader("/")}
            className="h-11 sm:h-12 px-7 sm:px-9 rounded-full bg-zinc-900/90 hover:bg-white text-zinc-200 hover:text-black border border-white/20 hover:border-white font-medium text-xs tracking-widest uppercase transition-all duration-300 flex items-center gap-2.5 shadow-lg backdrop-blur-md cursor-pointer active:scale-95"
          >
            <svg className="w-4 h-4 text-[#D7B875]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Return to Home</span>
          </button>
        </div>

        {/* Technical Diagnostics Accordion */}
        <div className="w-full max-w-xl text-left">
          <button
            type="button"
            onClick={() => setShowTechnicalDetails((prev) => !prev)}
            className="text-[11px] font-mono text-zinc-500 hover:text-zinc-300 transition-colors flex items-center gap-2 mx-auto cursor-pointer"
          >
            <span>{showTechnicalDetails ? "− Hide" : "+ Show"} Diagnostic Trace</span>
            {error.digest && (
              <span className="px-2 py-0.5 rounded bg-zinc-900 text-[10px] text-zinc-400 border border-white/10">
                Digest: {error.digest}
              </span>
            )}
          </button>

          {showTechnicalDetails && (
            <div className="mt-4 p-4 rounded-xl bg-zinc-950/90 border border-white/10 font-mono text-xs text-zinc-400 overflow-x-auto shadow-2xl backdrop-blur-md">
              <div className="text-red-400 font-semibold mb-2">
                {error.name || "Error"}: {error.message || "An unknown error occurred"}
              </div>
              {error.digest && (
                <div className="text-zinc-500 text-[11px] mb-2">
                  Digest ID: {error.digest}
                </div>
              )}
              {error.stack && (
                <pre className="text-[10px] text-zinc-500 whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto">
                  {error.stack}
                </pre>
              )}
            </div>
          )}
        </div>

        {/* Footer Telemetry */}
        <div className="mt-12 pt-6 border-t border-white/10 w-full flex items-center justify-between font-mono text-[11px] text-zinc-500">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            <span>CORE ISOLATION ACTIVE</span>
          </div>
          <div>
            <span>CODE: 500_SYSTEM_INTERRUPT</span>
          </div>
        </div>
      </Container>
    </main>
  );
}

