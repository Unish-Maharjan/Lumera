"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  CalculationResult,
  LedPitchVariant,
  ControllerSpec,
  UnitSystem,
  AspectRatioLock,
} from "./types";
import { DimensionConfigurator } from "./dimension-configurator";

export interface ScreenVisualizerProps {
  calc: CalculationResult;
  variant: LedPitchVariant;
  controller?: ControllerSpec;
  unit: UnitSystem;
  cols?: number;
  rows?: number;
  onChangeCols?: (cols: number) => void;
  onChangeRows?: (rows: number) => void;
}

export function ScreenVisualizer({
  calc,
  variant,
  unit,
  cols,
  rows,
  onChangeCols,
  onChangeRows,
}: ScreenVisualizerProps) {
  const [aspectLock, setAspectLock] = useState<AspectRatioLock>("free");
  const [showImage, setShowImage] = useState<boolean>(true);

  const currentCols = cols ?? calc.cols;
  const currentRows = rows ?? calc.rows;

  const widthM = ((currentCols * variant.cabWidthMm) / 1000).toFixed(2);
  const heightM = ((currentRows * variant.cabHeightMm) / 1000).toFixed(2);
  const widthFt = (((currentCols * variant.cabWidthMm) / 1000) * 3.28084).toFixed(1);
  const heightFt = (((currentRows * variant.cabHeightMm) / 1000) * 3.28084).toFixed(1);

  const screenAspect = (currentCols * variant.cabWidthMm) / (currentRows * variant.cabHeightMm);
  const humanHeightM = 1.75; // Standard 5'9"

  const svgHeight = 360;
  const svgWidth = Math.max(260, Math.min(680, svgHeight * screenAspect));

  const calculateColsForRows = (targetRows: number, lock: AspectRatioLock): number => {
    if (lock === "free") return currentCols;
    let targetRatio = 16 / 9;
    if (lock === "16:10") targetRatio = 16 / 10;
    if (lock === "4:3") targetRatio = 4 / 3;
    if (lock === "21:9") targetRatio = 21 / 9;

    const cabRatio = variant.cabWidthMm / variant.cabHeightMm;
    return Math.max(1, Math.min(40, Math.round(targetRows * (targetRatio / cabRatio))));
  };

  const calculateRowsForCols = (targetCols: number, lock: AspectRatioLock): number => {
    if (lock === "free") return currentRows;
    let targetRatio = 16 / 9;
    if (lock === "16:10") targetRatio = 16 / 10;
    if (lock === "4:3") targetRatio = 4 / 3;
    if (lock === "21:9") targetRatio = 21 / 9;

    const cabRatio = variant.cabWidthMm / variant.cabHeightMm;
    return Math.max(1, Math.min(30, Math.round(targetCols / (targetRatio / cabRatio))));
  };

  const handleColDecrement = () => {
    if (!onChangeCols || currentCols <= 1) return;
    const nextCols = currentCols - 1;
    if (aspectLock !== "free" && onChangeRows) {
      const nextRows = calculateRowsForCols(nextCols, aspectLock);
      onChangeCols(nextCols);
      onChangeRows(nextRows);
    } else {
      onChangeCols(nextCols);
    }
  };

  const handleColIncrement = () => {
    if (!onChangeCols || currentCols >= 40) return;
    const nextCols = currentCols + 1;
    if (aspectLock !== "free" && onChangeRows) {
      const nextRows = calculateRowsForCols(nextCols, aspectLock);
      onChangeCols(nextCols);
      onChangeRows(nextRows);
    } else {
      onChangeCols(nextCols);
    }
  };

  const handleRowDecrement = () => {
    if (!onChangeRows || currentRows <= 1) return;
    const nextRows = currentRows - 1;
    if (aspectLock !== "free" && onChangeCols) {
      const nextCols = calculateColsForRows(nextRows, aspectLock);
      onChangeRows(nextRows);
      onChangeCols(nextCols);
    } else {
      onChangeRows(nextRows);
    }
  };

  const handleRowIncrement = () => {
    if (!onChangeRows || currentRows >= 30) return;
    const nextRows = currentRows + 1;
    if (aspectLock !== "free" && onChangeCols) {
      const nextCols = calculateColsForRows(nextRows, aspectLock);
      onChangeRows(nextRows);
      onChangeCols(nextCols);
    } else {
      onChangeRows(nextRows);
    }
  };

  return (
    <div className="w-full mb-16 sm:mb-24 lg:mb-32 mt-6 sm:mt-10 select-none">
      {/* Header Bar */}
      <div className="flex flex-col items-center text-center mb-8 sm:mb-12">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase text-white tracking-wide">
          Display Elevation & <span className="text-accent">Scale</span>
        </h2>
      </div>

      {/* Main Architectural Stage with Background Grid */}
      <div className="relative w-full rounded-2xl bg-zinc-950/90 border border-white/10 p-6 sm:p-10 flex flex-col items-center justify-center shadow-2xl overflow-hidden min-h-[460px] sm:min-h-[520px]">
        {/* Architectural CAD Background Grids (High-Visibility Graph) */}
        <div
          className="absolute inset-0 pointer-events-none select-none z-0"
          aria-hidden="true"
        >
          {/* Fine Precision Grid (32px) */}
          <div
            className="absolute inset-0 opacity-70 [mask-image:radial-gradient(ellipse_at_center,black_75%,transparent_98%)]"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(255, 255, 255, 0.15) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255, 255, 255, 0.15) 1px, transparent 1px)
              `,
              backgroundSize: "32px 32px",
            }}
          />

          {/* Major Coordinate Grid Lines (128px) in Crisp White */}
          <div
            className="absolute inset-0 opacity-75 [mask-image:radial-gradient(ellipse_at_center,black_75%,transparent_98%)]"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(255, 255, 255, 0.35) 1.5px, transparent 1.5px),
                linear-gradient(to bottom, rgba(255, 255, 255, 0.35) 1.5px, transparent 1.5px)
              `,
              backgroundSize: "128px 128px",
            }}
          />

          {/* Center Coordinate Axis Crosshairs */}
          <div className="absolute top-1/2 inset-x-0 h-[1px] bg-white/40 opacity-70" />
          <div className="absolute left-1/2 inset-y-0 w-[1px] bg-white/40 opacity-70" />

          {/* Center Radial Luminescence */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none blur-3xl opacity-35"
            style={{
              width: "600px",
              height: "320px",
              background: "radial-gradient(circle, rgba(215,184,117,0.4) 0%, transparent 70%)",
            }}
          />
        </div>

        {/* Stage Toolbar (Top Right: Remove / Show Image Toggle Button) */}
        <div className="absolute top-4 right-4 sm:top-5 sm:right-6 z-20 flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowImage((prev) => !prev)}
            aria-label={showImage ? "Remove image from LED screen" : "Show image on LED screen"}
            className="px-3.5 py-1.5 rounded-full bg-zinc-900/95 hover:bg-white text-zinc-300 hover:text-black border border-white/20 hover:border-white text-xs font-inter flex items-center gap-2 transition-all cursor-pointer shadow-lg backdrop-blur-md active:scale-95"
          >
            {showImage ? (
              <>
                <svg className="w-3.5 h-3.5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                <span>Remove Image</span>
              </>
            ) : (
              <>
                <svg className="w-3.5 h-3.5 text-[#D7B875]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Show Image</span>
              </>
            )}
          </button>
        </div>

        {/* Content Container (Layered above grid) */}
        <div className="relative z-10 w-full flex flex-col items-center">
          {/* Top Width Stepper (Centered exactly over the screen) */}
          <div className="flex items-center justify-center gap-3 mb-6">
            {onChangeCols && (
              <button
                type="button"
                onClick={handleColDecrement}
                disabled={currentCols <= 1}
                aria-label="Decrease width"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-zinc-900/90 hover:bg-white text-zinc-300 hover:text-black border border-white/20 text-sm sm:text-base font-bold flex items-center justify-center transition-all cursor-pointer disabled:opacity-20 disabled:hover:bg-zinc-900 disabled:hover:text-zinc-300 active:scale-95"
              >
                −
              </button>
            )}

            <div className="px-4 sm:px-5 py-1.5 sm:py-2 rounded-full bg-black/95 border border-white/20 text-xs sm:text-sm font-medium text-white flex items-center gap-2 shadow-lg backdrop-blur-sm">
              <span>Width: {unit === "metric" ? `${widthM} m` : `${widthFt} ft`}</span>
              <span className="text-zinc-400">
                ({currentCols} {currentCols === 1 ? "panel" : "panels"})
              </span>
            </div>

            {onChangeCols && (
              <button
                type="button"
                onClick={handleColIncrement}
                disabled={currentCols >= 40}
                aria-label="Increase width"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-zinc-900/90 hover:bg-white text-zinc-300 hover:text-black border border-white/20 text-sm sm:text-base font-bold flex items-center justify-center transition-all cursor-pointer disabled:opacity-20 disabled:hover:bg-zinc-900 disabled:hover:text-zinc-300 active:scale-95"
              >
                +
              </button>
            )}
          </div>

          {/* Balanced 3-Column Stage: [Height Controls] [Screen Centered] [Human Scale] */}
          <div className="w-full flex items-center justify-center gap-3 sm:gap-6 lg:gap-8 max-w-5xl">
            {/* Left Flank: Height Stepper Controls */}
            <div className="w-20 sm:w-28 flex flex-col items-center justify-center gap-2 shrink-0">
              {onChangeRows && (
                <button
                  type="button"
                  onClick={handleRowIncrement}
                  disabled={currentRows >= 30}
                  aria-label="Increase height"
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-zinc-900/90 hover:bg-white text-zinc-300 hover:text-black border border-white/20 text-sm sm:text-base font-bold flex items-center justify-center transition-all cursor-pointer disabled:opacity-20 disabled:hover:bg-zinc-900 disabled:hover:text-zinc-300 active:scale-95"
                >
                  +
                </button>
              )}

              <div className="px-2.5 sm:px-3.5 py-2 sm:py-2.5 rounded-xl bg-black/95 border border-white/20 text-center shadow-lg backdrop-blur-sm w-full">
                <span className="block text-[11px] sm:text-xs text-zinc-400 font-medium">Height</span>
                <span className="block text-xs sm:text-sm lg:text-base font-bold text-white whitespace-nowrap">
                  {unit === "metric" ? `${heightM} m` : `${heightFt} ft`}
                </span>
                <span className="block text-[11px] sm:text-xs text-zinc-400">
                  {currentRows} {currentRows === 1 ? "panel" : "panels"}
                </span>
              </div>

              {onChangeRows && (
                <button
                  type="button"
                  onClick={handleRowDecrement}
                  disabled={currentRows <= 1}
                  aria-label="Decrease height"
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-zinc-900/90 hover:bg-white text-zinc-300 hover:text-black border border-white/20 text-sm sm:text-base font-bold flex items-center justify-center transition-all cursor-pointer disabled:opacity-20 disabled:hover:bg-zinc-900 disabled:hover:text-zinc-300 active:scale-95"
                >
                  −
                </button>
              )}
            </div>

            {/* Center: The LED Video Wall Screen (Dead Center) */}
            <div className="flex-1 flex items-center justify-center">
              <div
                className="group/screen relative rounded-lg overflow-hidden shadow-2xl border-2 border-zinc-700/80 bg-zinc-950 transition-all duration-300 shrink-0"
                style={{
                  width: `${Math.min(680, Math.max(220, svgWidth))}px`,
                  aspectRatio: `${widthM} / ${heightM}`,
                }}
              >
                {/* Visual Media Content / Unpowered Diode Surface */}
                {showImage ? (
                  <div className="absolute inset-0 z-0">
                    <Image
                      src="/images/download.webp"
                      alt="Active LED video wall content"
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 680px"
                      className="object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-black/10 pointer-events-none" />

                    {/* Quick remove button on screen hover */}
                    <button
                      type="button"
                      onClick={() => setShowImage(false)}
                      title="Remove image from screen"
                      className="absolute top-2 right-2 z-20 w-7 h-7 rounded-full bg-black/70 hover:bg-black text-white/70 hover:text-white border border-white/20 flex items-center justify-center transition-all opacity-0 group-hover/screen:opacity-100 cursor-pointer shadow-md"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <div className="absolute inset-0 z-0 bg-[#070709] flex flex-col items-center justify-center select-none overflow-hidden">
                    {/* MicroLED Diode Pitch Texture */}
                    <div
                      className="absolute inset-0 opacity-50 pointer-events-none"
                      style={{
                        backgroundImage: "radial-gradient(rgba(215, 184, 117, 0.45) 0.75px, transparent 0.75px)",
                        backgroundSize: "6px 6px",
                      }}
                    />
                    {/* Standby Technical Readout */}
                    <div className="relative z-10 flex flex-col items-center justify-center p-3 sm:p-4 text-center pointer-events-none">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-[#D7B875]/40 bg-[#D7B875]/10 flex items-center justify-center mb-1.5 text-[#D7B875]">
                        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6z" />
                        </svg>
                      </div>
                      <span className="text-[10px] sm:text-xs font-inter tracking-widest uppercase text-[#D7B875] font-semibold">
                        LUMERA {variant.name} MATRIX
                      </span>
                      <span className="text-[9px] sm:text-[10px] font-inter text-zinc-400 mt-0.5">
                        {currentCols} × {currentRows} ({currentCols * currentRows} Panels) • {currentCols * variant.resWidth} × {currentRows * variant.resHeight} px
                      </span>
                    </div>
                  </div>
                )}

                {/* Cabinet Matrix Seams Grid */}
                <div
                  className="absolute inset-0 z-10 grid pointer-events-none"
                  style={{
                    gridTemplateColumns: `repeat(${currentCols}, minmax(0, 1fr))`,
                    gridTemplateRows: `repeat(${currentRows}, minmax(0, 1fr))`,
                  }}
                >
                  {Array.from({ length: currentRows }).map((_, rIdx) =>
                    Array.from({ length: currentCols }).map((_, cIdx) => (
                      <div
                        key={`${rIdx}-${cIdx}`}
                        className={`border-[0.5px] ${
                          showImage
                            ? "border-white/50 shadow-[inset_0_0_1px_rgba(255,255,255,0.2)]"
                            : "border-white/60 shadow-[inset_0_0_1px_rgba(255,255,255,0.25)]"
                        }`}
                      />
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Right Flank: Human Scale Reference (Matching Left Flank Width) */}
            <div className="w-20 sm:w-28 flex flex-col items-center justify-end self-end shrink-0">
              <div
                className="relative flex flex-col items-center justify-end"
                style={{
                  height: `${Math.max(60, Math.min(260, (humanHeightM / Number(heightM)) * 200))}px`,
                  aspectRatio: "341 / 1024",
                }}
                title="Standard Human Scale: 1.75 m (5'9'')"
              >
                <Image
                  src="/images/calculator/human-scale.png"
                  alt="Human scale reference (1.75m / 5'9'')"
                  fill
                  sizes="120px"
                  className="object-contain object-bottom drop-shadow-xl"
                />
              </div>
              <span className="text-xs text-zinc-400 mt-2 font-medium whitespace-nowrap">
                1.75 m (5&apos;9&quot;)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Aspect Ratio Selector */}
      {onChangeCols && onChangeRows && (
        <div className="mt-6 w-full">
          <DimensionConfigurator
            cols={currentCols}
            rows={currentRows}
            onChangeCols={onChangeCols}
            onChangeRows={onChangeRows}
            selectedVariant={variant}
            aspectLock={aspectLock}
            onAspectLockChange={setAspectLock}
          />
        </div>
      )}
    </div>
  );
}

export default ScreenVisualizer;
