"use client";

import React, { useState } from "react";
import { CalculationResult, LedPitchVariant, UnitSystem } from "./types";

interface SpecificationsPanelProps {
  calc: CalculationResult;
  variant: LedPitchVariant;
  unit: UnitSystem;
}

type SpecTab = "dimensions" | "optical" | "power" | "weight";

export function SpecificationsPanel({
  calc,
  variant,
  unit,
}: SpecificationsPanelProps) {
  const [activeTab, setActiveTab] = useState<SpecTab>("dimensions");

  return (
    <div className="w-full rounded-2xl p-5 sm:p-7 mb-8 select-none">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-lg sm:text-xl font-inter font-medium text-white uppercase mt-0.5">
            Technical Analysis & Environmental Metrics
          </h2>
        </div>

        {/* Spec Tabs Switcher */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-black/60 border border-white/10">
          <button
            type="button"
            onClick={() => setActiveTab("dimensions")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              activeTab === "dimensions"
                ? "bg-accent text-black font-semibold shadow-xs"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Geometry & Size
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("optical")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              activeTab === "optical"
                ? "bg-accent text-black font-semibold shadow-xs"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Resolution & Optics
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("power")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              activeTab === "power"
                ? "bg-accent text-black font-semibold shadow-xs"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Power & Thermal
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("weight")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              activeTab === "weight"
                ? "bg-accent text-black font-semibold shadow-xs"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Weight & Rigging
          </button>
        </div>
      </div>

      {/* ─── TAB 1: GEOMETRY & DIMENSIONS ─── */}
      {activeTab === "dimensions" && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
          <div className="p-4 rounded-xl border border-white/10 bg-zinc-900/50">
            <span className="text-[11px] font-inter text-zinc-500 uppercase block mb-1">
              Physical Width
            </span>
            <span className="text-xl sm:text-2xl font-bold font-inter text-white block">
              {unit === "metric" ? `${calc.widthM} m` : `${calc.widthFt} ft`}
            </span>
            <span className="text-[11px] text-zinc-400 font-inter">
              {unit === "metric" ? `${calc.widthFt} ft` : `${calc.widthM} m`}
            </span>
          </div>

          <div className="p-4 rounded-xl border border-white/10 bg-zinc-900/50">
            <span className="text-[11px] font-inter text-zinc-500 uppercase block mb-1">
              Physical Height
            </span>
            <span className="text-xl sm:text-2xl font-bold font-inter text-white block">
              {unit === "metric" ? `${calc.heightM} m` : `${calc.heightFt} ft`}
            </span>
            <span className="text-[11px] text-zinc-400 font-inter">
              {unit === "metric" ? `${calc.heightFt} ft` : `${calc.heightM} m`}
            </span>
          </div>

          <div className="p-4 rounded-xl border border-white/10 bg-zinc-900/50">
            <span className="text-[11px] font-inter text-zinc-500 uppercase block mb-1">
              Diagonal Size
            </span>
            <span className="text-xl sm:text-2xl font-bold font-inter text-accent block">
              {calc.diagonalInches}&quot;
            </span>
            <span className="text-[11px] text-zinc-400 font-inter">
              {unit === "metric" ? `${calc.diagonalM} m` : `${calc.diagonalFt} ft`}
            </span>
          </div>

          <div className="p-4 rounded-xl border border-white/10 bg-zinc-900/50">
            <span className="text-[11px] font-inter text-zinc-500 uppercase block mb-1">
              Surface Area
            </span>
            <span className="text-xl sm:text-2xl font-bold font-inter text-white block">
              {unit === "metric" ? `${calc.areaSqm} m²` : `${calc.areaSqft} sq ft`}
            </span>
            <span className="text-[11px] text-zinc-400 font-inter">
              {unit === "metric" ? `${calc.areaSqft} sq ft` : `${calc.areaSqm} m²`}
            </span>
          </div>

          <div className="p-4 rounded-xl border border-white/10 bg-zinc-900/50">
            <span className="text-[11px] font-inter text-zinc-500 uppercase block mb-1">
              Aspect Ratio
            </span>
            <span className="text-xl sm:text-2xl font-bold font-inter text-white block">
              {calc.aspectRatioExact}
            </span>
            <span className="text-[11px] text-accent font-inter">
              {calc.closestStandardAspect} ({calc.aspectRatioNumeric}:1)
            </span>
          </div>
        </div>
      )}

      {/* ─── TAB 2: RESOLUTION & OPTICS ─── */}
      {activeTab === "optical" && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
          <div className="p-4 rounded-xl border border-white/10 bg-zinc-900/50">
            <span className="text-[11px] font-inter text-zinc-500 uppercase block mb-1">
              Screen Resolution
            </span>
            <span className="text-xl sm:text-2xl font-bold font-inter text-white block">
              {calc.resWidth} x {calc.resHeight}
            </span>
            <span className="text-[11px] text-zinc-400 font-inter">
              {variant.pitch}mm Pixel Pitch
            </span>
          </div>

          <div className="p-4 rounded-xl border border-white/10 bg-zinc-900/50">
            <span className="text-[11px] font-inter text-zinc-500 uppercase block mb-1">
              Total Pixels
            </span>
            <span className="text-xl sm:text-2xl font-bold font-inter text-accent block">
              {calc.megaPixels} MP
            </span>
            <span className="text-[11px] text-zinc-400 font-inter">
              {calc.totalPixels.toLocaleString()} total px
            </span>
          </div>

          <div className="p-4 rounded-xl border border-white/10 bg-zinc-900/50">
            <span className="text-[11px] font-inter text-zinc-500 uppercase block mb-1">
              Pixel Density
            </span>
            <span className="text-xl sm:text-2xl font-bold font-inter text-white block">
              {calc.pixelDensitySqm.toLocaleString()}
            </span>
            <span className="text-[11px] text-zinc-400 font-inter">
              pixels / m²
            </span>
          </div>

          <div className="p-4 rounded-xl border border-white/10 bg-zinc-900/50">
            <span className="text-[11px] font-inter text-zinc-500 uppercase block mb-1">
              Optimal Distance
            </span>
            <span className="text-xl sm:text-2xl font-bold font-inter text-white block">
              {unit === "metric" ? `${calc.optimalViewingDistM} m` : `${calc.optimalViewingDistFt} ft`}
            </span>
            <span className="text-[11px] text-zinc-400 font-inter">
              Comfortable viewing
            </span>
          </div>

          <div className="p-4 rounded-xl border border-white/10 bg-zinc-900/50">
            <span className="text-[11px] font-inter text-zinc-500 uppercase block mb-1">
              Retina Acuity Distance
            </span>
            <span className="text-xl sm:text-2xl font-bold font-inter text-white block">
              {unit === "metric" ? `${calc.retinaViewingDistM} m` : `${calc.retinaViewingDistFt} ft`}
            </span>
            <span className="text-[11px] text-zinc-400 font-inter">
              Pixel grid invisible (20/20)
            </span>
          </div>
        </div>
      )}

      {/* ─── TAB 3: POWER & THERMAL ─── */}
      {activeTab === "power" && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
          <div className="p-4 rounded-xl border border-white/10 bg-zinc-900/50">
            <span className="text-[11px] font-inter text-zinc-500 uppercase block mb-1">
              Max Power Draw
            </span>
            <span className="text-xl sm:text-2xl font-bold font-inter text-accent block">
              {calc.maxPowerKw} kW
            </span>
            <span className="text-[11px] text-zinc-400 font-inter">
              {calc.maxPowerWatts.toLocaleString()} Watts (White Full)
            </span>
          </div>

          <div className="p-4 rounded-xl border border-white/10 bg-zinc-900/50">
            <span className="text-[11px] font-inter text-zinc-500 uppercase block mb-1">
              Average Power Draw
            </span>
            <span className="text-xl sm:text-2xl font-bold font-inter text-white block">
              {calc.avgPowerKw} kW
            </span>
            <span className="text-[11px] text-zinc-400 font-inter">
              {calc.avgPowerWatts.toLocaleString()} W (Real Content)
            </span>
          </div>

          <div className="p-4 rounded-xl border border-white/10 bg-zinc-900/50">
            <span className="text-[11px] font-inter text-zinc-500 uppercase block mb-1">
              Heat Dissipation
            </span>
            <span className="text-xl sm:text-2xl font-bold font-inter text-white block">
              {calc.heatBtuHr.toLocaleString()}
            </span>
            <span className="text-[11px] text-zinc-400 font-inter">
              BTU / hr (HVAC load)
            </span>
          </div>

          <div className="p-4 rounded-xl border border-white/10 bg-zinc-900/50">
            <span className="text-[11px] font-inter text-zinc-500 uppercase block mb-1">
              AC Current Draw
            </span>
            <span className="text-xl sm:text-2xl font-bold font-inter text-white block">
              {calc.current230VAmps} A
            </span>
            <span className="text-[11px] text-zinc-400 font-inter">
              @ 230V ({calc.current110VAmps}A @ 110V)
            </span>
          </div>

          <div className="p-4 rounded-xl border border-white/10 bg-zinc-900/50">
            <span className="text-[11px] font-inter text-zinc-500 uppercase block mb-1">
              16A Circuits Required
            </span>
            <span className="text-xl sm:text-2xl font-bold font-inter text-white block">
              {calc.recommended16ACircuits} x 16A
            </span>
            <span className="text-[11px] text-zinc-400 font-inter">
              80% safety continuous rating
            </span>
          </div>
        </div>
      )}

      {/* ─── TAB 4: WEIGHT & RIGGING ─── */}
      {activeTab === "weight" && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
          <div className="p-4 rounded-xl border border-white/10 bg-zinc-900/50">
            <span className="text-[11px] font-inter text-zinc-500 uppercase block mb-1">
              Total Screen Weight
            </span>
            <span className="text-xl sm:text-2xl font-bold font-inter text-accent block">
              {unit === "metric" ? `${calc.totalWeightKg} kg` : `${calc.totalWeightLbs} lbs`}
            </span>
            <span className="text-[11px] text-zinc-400 font-inter">
              {unit === "metric" ? `${calc.totalWeightLbs} lbs` : `${calc.totalWeightKg} kg`}
            </span>
          </div>

          <div className="p-4 rounded-xl border border-white/10 bg-zinc-900/50">
            <span className="text-[11px] font-inter text-zinc-500 uppercase block mb-1">
              Single Cabinet Weight
            </span>
            <span className="text-xl sm:text-2xl font-bold font-inter text-white block">
              {unit === "metric"
                ? `${calc.singleCabinetWeightKg} kg`
                : `${calc.singleCabinetWeightLbs} lbs`}
            </span>
            <span className="text-[11px] text-zinc-400 font-inter">
              per individual panel
            </span>
          </div>

          <div className="p-4 rounded-xl border border-white/10 bg-zinc-900/50">
            <span className="text-[11px] font-inter text-zinc-500 uppercase block mb-1">
              Area Load Density
            </span>
            <span className="text-xl sm:text-2xl font-bold font-inter text-white block">
              {unit === "metric"
                ? `${calc.weightDensityKgSqm} kg/m²`
                : `${calc.weightDensityLbsSqft} lbs/sq ft`}
            </span>
            <span className="text-[11px] text-zinc-400 font-inter">
              Structural loading
            </span>
          </div>

          <div className="p-4 rounded-xl border border-white/10 bg-zinc-900/50">
            <span className="text-[11px] font-inter text-zinc-500 uppercase block mb-1">
              Rigging Hanging Bars
            </span>
            <span className="text-xl sm:text-2xl font-bold font-inter text-white block">
              {calc.recommendedHangingBars} Units
            </span>
            <span className="text-[11px] text-zinc-400 font-inter">
              Standard truss pick points
            </span>
          </div>

          <div className="p-4 rounded-xl border border-white/10 bg-zinc-900/50">
            <span className="text-[11px] font-inter text-zinc-500 uppercase block mb-1">
              Total Cabinet Count
            </span>
            <span className="text-xl sm:text-2xl font-bold font-inter text-white block">
              {calc.totalCabinets} Panels
            </span>
            <span className="text-[11px] text-zinc-400 font-inter">
              {calc.cols} Wide x {calc.rows} High
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

