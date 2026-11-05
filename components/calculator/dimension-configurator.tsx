"use client";

import React, { useState } from "react";
import { AspectRatioLock, LedPitchVariant, CalculationMode, UnitSystem } from "./types";
import { snapResolutionToCabinets } from "./utils/calculations";

export interface DimensionConfiguratorProps {
  cols: number;
  rows: number;
  onChangeCols: (cols: number) => void;
  onChangeRows: (rows: number) => void;
  selectedVariant: LedPitchVariant;
  aspectLock?: AspectRatioLock;
  onAspectLockChange?: (lock: AspectRatioLock) => void;
  mode?: CalculationMode;
  unit?: UnitSystem;
  className?: string;
}

export function DimensionConfigurator({
  cols,
  onChangeCols,
  onChangeRows,
  selectedVariant,
  aspectLock: externalAspectLock,
  onAspectLockChange,
  className = "",
}: DimensionConfiguratorProps) {
  const [internalAspectLock, setInternalAspectLock] = useState<AspectRatioLock>("free");

  const aspectLock = externalAspectLock !== undefined ? externalAspectLock : internalAspectLock;
  const setAspectLock = (newLock: AspectRatioLock) => {
    if (onAspectLockChange) {
      onAspectLockChange(newLock);
    } else {
      setInternalAspectLock(newLock);
    }
  };

  // Apply Aspect Ratio Constraint to Grid
  const applyAspectLock = (lock: AspectRatioLock, baseCols: number) => {
    setAspectLock(lock);
    if (lock === "free") return;

    let targetRatio = 16 / 9;
    if (lock === "16:10") targetRatio = 16 / 10;
    if (lock === "4:3") targetRatio = 4 / 3;
    if (lock === "21:9") targetRatio = 21 / 9;
    if (lock === "1:1") targetRatio = 1.0;

    const cabRatio = selectedVariant.cabWidthMm / selectedVariant.cabHeightMm;
    const calcRows = Math.max(1, Math.min(40, Math.round(baseCols / (targetRatio / cabRatio))));
    onChangeCols(baseCols);
    onChangeRows(calcRows);
  };

  // Quick Target Resolution Presets
  const handleResolutionPreset = (targetW: number, targetH: number) => {
    const snapped = snapResolutionToCabinets(targetW, targetH, selectedVariant);
    onChangeCols(snapped.cols);
    onChangeRows(snapped.rows);
  };

  return (
    <div className={`w-full select-none ${className}`.trim()}>
      {/* Aspect Ratio & Resolution Preset Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl border border-white/10 bg-black/70">
        {/* Aspect Ratio Buttons */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-mono text-zinc-400 mr-1 uppercase">
            Aspect Ratio:
          </span>
          {(["free", "16:9", "16:10", "4:3", "21:9", "1:1"] as AspectRatioLock[]).map(
            (lock) => (
              <button
                key={lock}
                type="button"
                onClick={() => applyAspectLock(lock, cols)}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                  aspectLock === lock
                    ? "bg-accent text-black font-semibold shadow-xs"
                    : "bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/10"
                }`}
              >
                {lock === "free" ? "Free" : lock}
              </button>
            )
          )}
        </div>

        {/* Resolution Preset Buttons */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-mono text-zinc-400 mr-1 uppercase">
            Target Res:
          </span>
          {[
            { label: "1080p", w: 1920, h: 1080 },
            { label: "2K", w: 2560, h: 1440 },
            { label: "4K UHD", w: 3840, h: 2160 },
            { label: "8K", w: 7680, h: 4320 },
          ].map((res) => (
            <button
              key={res.label}
              type="button"
              onClick={() => handleResolutionPreset(res.w, res.h)}
              className="px-3 py-1 rounded-lg bg-zinc-900/80 hover:bg-zinc-800 text-xs font-mono text-zinc-300 hover:text-accent border border-white/10 transition-colors cursor-pointer"
            >
              {res.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => {
              setAspectLock("free");
              onChangeCols(6);
              onChangeRows(6);
            }}
            className="ml-1 sm:ml-2 px-2.5 py-1 rounded-lg bg-zinc-900/80 hover:bg-zinc-800 text-xs font-mono text-zinc-400 hover:text-white border border-white/10 transition-colors cursor-pointer"
            title="Reset Grid to 6x6"
          >
            Reset 6x6
          </button>
        </div>
      </div>
    </div>
  );
}

export default DimensionConfigurator;
