"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { CalculationMode, UnitSystem } from "./types";

interface CalculatorHeroProps {
  mode: CalculationMode;
  onModeChange: (mode: CalculationMode) => void;
  unit: UnitSystem;
  onUnitChange: (unit: UnitSystem) => void;
}

export function CalculatorHero({
  mode,
  onModeChange,
  unit,
  onUnitChange,
}: CalculatorHeroProps) {
  return (
    <section className="relative pt-32 pb-10 sm:pt-40 sm:pb-14 bg-gradient-to-b from-black via-zinc-950 to-black select-none">
      <Container size="xl">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl font-light text-white uppercase tracking-tight leading-[1.08] mb-5">
            LED Video Wall <br />
            <span className="text-accent font-normal">Design & Power Calculator</span>
          </h1>

          <p className="font-sans text-sm sm:text-base md:text-lg text-zinc-300 font-light max-w-2xl leading-relaxed mb-8 sm:mb-10">
            Configure video walls by cabinet grid, physical dimensions, or target resolution.
            Calculate exact pixel matrices, AC power draws, structural rigging loads, and video processor routing.
          </p>

          {/* Configuration Modes & Unit Switcher Row */}
          <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 p-2 sm:p-2.5 rounded-2xl border border-white/10 bg-zinc-900/70 backdrop-blur-md shadow-2xl">
            {/* Calculation Mode Tabs */}
            <div className="grid grid-cols-3 w-full sm:w-auto gap-1">
              <button
                type="button"
                onClick={() => onModeChange("grid")}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                  mode === "grid"
                    ? "bg-accent text-black font-semibold shadow-lg shadow-accent/20"
                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                }`}
              >
                By Cabinet Grid
              </button>
              <button
                type="button"
                onClick={() => onModeChange("dimension")}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                  mode === "dimension"
                    ? "bg-accent text-black font-semibold shadow-lg shadow-accent/20"
                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                }`}
              >
                By Target Size
              </button>
              <button
                type="button"
                onClick={() => onModeChange("resolution")}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                  mode === "resolution"
                    ? "bg-accent text-black font-semibold shadow-lg shadow-accent/20"
                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                }`}
              >
                By Resolution
              </button>
            </div>

            {/* Units Toggle (Metric vs Imperial) */}
            <div className="flex items-center gap-2 self-center sm:self-auto px-2 py-1 rounded-xl bg-black/60 border border-white/10">
              <span className="text-xs text-zinc-400 font-medium pl-1">Units:</span>
              <button
                type="button"
                onClick={() => onUnitChange("metric")}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  unit === "metric"
                    ? "bg-white/15 text-white font-semibold"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                Metric (m, kg)
              </button>
              <button
                type="button"
                onClick={() => onUnitChange("imperial")}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  unit === "imperial"
                    ? "bg-white/15 text-white font-semibold"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                Imperial (ft, lbs)
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

