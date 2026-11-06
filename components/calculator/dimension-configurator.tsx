"use client";

import React from "react";
import { AspectRatioLock, LedPitchVariant } from "./types";

export interface DimensionConfiguratorProps {
  cols: number;
  rows?: number;
  onChangeCols: (cols: number) => void;
  onChangeRows: (rows: number) => void;
  selectedVariant: LedPitchVariant;
  aspectLock?: AspectRatioLock;
  onAspectLockChange?: (lock: AspectRatioLock) => void;
  unit?: string;
  className?: string;
}

export function DimensionConfigurator({
  cols,
  onChangeCols,
  onChangeRows,
  selectedVariant,
  aspectLock = "free",
  onAspectLockChange,
  className = "",
}: DimensionConfiguratorProps) {
  const applyAspectLock = (lock: AspectRatioLock, baseCols: number) => {
    if (onAspectLockChange) {
      onAspectLockChange(lock);
    }
    if (lock === "free") return;

    let targetRatio = 16 / 9;
    if (lock === "16:10") targetRatio = 16 / 10;
    if (lock === "4:3") targetRatio = 4 / 3;
    if (lock === "21:9") targetRatio = 21 / 9;

    const cabRatio = selectedVariant.cabWidthMm / selectedVariant.cabHeightMm;
    const clampedCols = Math.max(1, Math.min(11, baseCols));
    const calcRows = Math.max(1, Math.min(11, Math.round(clampedCols / (targetRatio / cabRatio))));
    onChangeCols(clampedCols);
    onChangeRows(calcRows);
  };

  const ratios: { label: string; value: AspectRatioLock }[] = [
    { label: "Free", value: "free" },
    { label: "16:9", value: "16:9" },
    { label: "16:10", value: "16:10" },
    { label: "4:3", value: "4:3" },
    { label: "21:9", value: "21:9" },
  ];

  return (
    <div className={`flex flex-wrap items-center justify-center gap-2 sm:gap-3 select-none ${className}`.trim()}>
      <div className="flex items-center gap-1.5 sm:gap-2">
        <span className="text-xs sm:text-sm font-semibold text-zinc-600 hidden xs:inline">Ratio:</span>
        <div className="flex items-center gap-1 p-1 rounded-full bg-white/95 border border-[#E5E5E0] shadow-sm backdrop-blur-md">
          {ratios.map((item) => {
            const isActive = aspectLock === item.value;
            return (
              <button
                key={item.value}
                type="button"
                onClick={() => applyAspectLock(item.value, cols)}
                className={`px-2.5 sm:px-3.5 py-1 rounded-full text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                  isActive
                    ? "bg-[#D7B875] text-black font-semibold shadow-xs"
                    : "text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      <button
        type="button"
        onClick={() => {
          if (onAspectLockChange) onAspectLockChange("free");
          onChangeCols(6);
          onChangeRows(6);
        }}
        className="px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium text-zinc-700 hover:text-zinc-950 bg-white/95 hover:bg-zinc-100 border border-[#E5E5E0] transition-colors cursor-pointer shadow-sm backdrop-blur-md"
      >
        Reset (6 × 6)
      </button>
    </div>
  );
}

export default DimensionConfigurator;
