"use client";

import React, { useState } from "react";
import { CalculationResult, LedPitchVariant, UnitSystem } from "./types";

interface SpecificationsPanelProps {
  calc: CalculationResult;
  variant: LedPitchVariant;
  unit: UnitSystem;
}

export function SpecificationsPanel({
  calc,
  variant,
  unit,
}: SpecificationsPanelProps) {
  const [showDetailed, setShowDetailed] = useState(false);

  return (
    <div className="w-full mb-16 sm:mb-24 lg:mb-32 select-none">
      {/* Centered Section Header */}
      <div className="flex flex-col items-center text-center mb-8 sm:mb-12">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase text-zinc-950 tracking-wide mb-3">
          Specifications <span className="text-[#D7B875]">Overview</span>
        </h2>
      </div>

      {/* Primary 4-Card Human-Centric Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Card 1: Dimensions */}
        <div className="p-6 sm:p-7 rounded-2xl border border-[#E5E5E0] bg-white hover:border-zinc-300 shadow-xs hover:shadow-sm transition-all flex flex-col justify-between">
          <div>
            <span className="text-sm font-medium text-zinc-500 block mb-2">
              Physical Dimensions
            </span>
            <span className="text-2xl sm:text-3xl font-bold text-zinc-950 block mb-1">
              {unit === "metric" ? `${calc.widthM} × ${calc.heightM} m` : `${calc.widthFt} × ${calc.heightFt} ft`}
            </span>
          </div>
          <span className="text-sm text-zinc-500 mt-3 pt-3 border-t border-[#E5E5E0]">
            {calc.diagonalInches}&quot; Diagonal • {unit === "metric" ? `${calc.areaSqm} m²` : `${calc.areaSqft} sq ft`}
          </span>
        </div>

        {/* Card 2: Resolution */}
        <div className="p-6 sm:p-7 rounded-2xl border border-[#E5E5E0] bg-white hover:border-zinc-300 shadow-xs hover:shadow-sm transition-all flex flex-col justify-between">
          <div>
            <span className="text-sm font-medium text-zinc-500 block mb-2">
              Native Resolution
            </span>
            <span className="text-2xl sm:text-3xl font-bold text-zinc-950 block mb-1">
              {calc.resWidth} × {calc.resHeight} px
            </span>
          </div>
          <span className="text-sm text-zinc-500 mt-3 pt-3 border-t border-[#E5E5E0]">
            {variant.pitch} mm Pitch • {calc.closestStandardAspect}
          </span>
        </div>

        {/* Card 3: Panel Configuration */}
        <div className="p-6 sm:p-7 rounded-2xl border border-[#E5E5E0] bg-white hover:border-zinc-300 shadow-xs hover:shadow-sm transition-all flex flex-col justify-between">
          <div>
            <span className="text-sm font-medium text-zinc-500 block mb-2">
              Cabinet Configuration
            </span>
            <span className="text-2xl sm:text-3xl font-bold text-[#D7B875] block mb-1">
              {calc.totalCabinets} Panels
            </span>
          </div>
          <span className="text-sm text-zinc-500 mt-3 pt-3 border-t border-[#E5E5E0]">
            {calc.cols} Columns × {calc.rows} Rows
          </span>
        </div>

        {/* Card 4: Power & Weight */}
        <div className="p-6 sm:p-7 rounded-2xl border border-[#E5E5E0] bg-white hover:border-zinc-300 shadow-xs hover:shadow-sm transition-all flex flex-col justify-between">
          <div>
            <span className="text-sm font-medium text-zinc-500 block mb-2">
              Power & Weight
            </span>
            <span className="text-2xl sm:text-3xl font-bold text-zinc-950 block mb-1">
              {calc.maxPowerKw} kW Max
            </span>
          </div>
          <span className="text-sm text-zinc-500 mt-3 pt-3 border-t border-[#E5E5E0]">
            {calc.avgPowerKw} kW Avg • {unit === "metric" ? `${calc.totalWeightKg} kg` : `${calc.totalWeightLbs} lbs`}
          </span>
        </div>
      </div>

      {/* Collapsible Engineering Reference */}
      <div className="mt-8 flex flex-col items-center">
        <button
          type="button"
          onClick={() => setShowDetailed(!showDetailed)}
          className="text-sm font-semibold text-zinc-700 hover:text-zinc-950 px-5 py-2.5 rounded-xl border border-[#E5E5E0] hover:border-zinc-400 bg-white hover:bg-zinc-50 shadow-xs transition-all cursor-pointer"
        >
          {showDetailed ? "Hide Detailed Engineering Specs ▴" : "Show Detailed Engineering Specs ▾"}
        </button>

        {showDetailed && (
          <div className="mt-6 w-full p-6 sm:p-8 rounded-2xl border border-[#E5E5E0] bg-white shadow-xs transition-all">
            <h3 className="text-base font-semibold text-zinc-950 mb-6">
              Engineering & Environmental Reference
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
              <div>
                <span className="text-sm text-zinc-500 block mb-1">Single Cabinet</span>
                <span className="text-lg font-semibold text-zinc-950">
                  {unit === "metric" ? `${calc.singleCabinetWeightKg} kg` : `${calc.singleCabinetWeightLbs} lbs`}
                </span>
              </div>
              <div>
                <span className="text-sm text-zinc-500 block mb-1">Current Draw</span>
                <span className="text-lg font-semibold text-zinc-950">
                  {calc.current230VAmps} A (@ 230V)
                </span>
              </div>
              <div>
                <span className="text-sm text-zinc-500 block mb-1">Circuits (16A)</span>
                <span className="text-lg font-semibold text-zinc-950">
                  {calc.recommended16ACircuits} Circuits
                </span>
              </div>
              <div>
                <span className="text-sm text-zinc-500 block mb-1">Thermal Output</span>
                <span className="text-lg font-semibold text-zinc-950">
                  {calc.heatBtuHr.toLocaleString()} BTU/hr
                </span>
              </div>
              <div>
                <span className="text-sm text-zinc-500 block mb-1">Viewing Distance</span>
                <span className="text-lg font-semibold text-zinc-950">
                  {unit === "metric" ? `${calc.optimalViewingDistM} m` : `${calc.optimalViewingDistFt} ft`}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SpecificationsPanel;
