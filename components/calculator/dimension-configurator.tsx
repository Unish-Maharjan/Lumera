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
    const calcRows = Math.max(1, Math.min(30, Math.round(baseCols / (targetRatio / cabRatio))));
    onChangeCols(baseCols);
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
    <div className={`w-full flex flex-wrap items-center justify-center gap-3 sm:gap-6 py-2 select-none ${className}`.trim()}>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-zinc-400">Ratio:</span>
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-zinc-900/80 border border-white/10">
          {ratios.map((item) => {
            const isActive = aspectLock === item.value;
            return (
              <button
                key={item.value}
                type="button"
                onClick={() => applyAspectLock(item.value, cols)}
                className={`px-3 sm:px-4 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  isActive
                    ? "bg-[#D7B875] text-black font-semibold shadow-sm"
                    : "text-zinc-400 hover:text-white hover:bg-white/5"
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
        className="px-4 py-1.5 rounded-xl text-sm font-medium text-zinc-400 hover:text-white bg-zinc-900/80 hover:bg-zinc-800 border border-white/10 transition-colors cursor-pointer"
      >
        Reset (6 × 6)
      </button>
    </div>
  );
}

export default DimensionConfigurator;
