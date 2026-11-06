"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import {
  CalculationResult,
  LedPitchVariant,
  ControllerSpec,
  UnitSystem,
  AspectRatioLock,
} from "./types";
import { DimensionConfigurator } from "./dimension-configurator";

const LedScreen3DViewer = dynamic(() => import("./led-screen-3d-viewer"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[420px] sm:h-[480px] lg:h-[540px] xl:h-[580px] flex flex-col items-center justify-center bg-white/80 border border-[#E5E5E0] rounded-xl">
      <div className="w-8 h-8 rounded-full border-2 border-zinc-200 border-t-[#D7B875] animate-spin mb-2" />
      <span className="text-xs uppercase tracking-widest text-[#D7B875] font-semibold">Loading 3D Visualizer...</span>
    </div>
  ),
});

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

  const handleColDecrement = () => {
    if (!onChangeCols || currentCols <= 1) return;
    if (aspectLock !== "free") setAspectLock("free");
    onChangeCols(currentCols - 1);
  };

  const handleColIncrement = () => {
    if (!onChangeCols || currentCols >= 11) return;
    if (aspectLock !== "free") setAspectLock("free");
    onChangeCols(currentCols + 1);
  };

  const handleRowDecrement = () => {
    if (!onChangeRows || currentRows <= 1) return;
    if (aspectLock !== "free") setAspectLock("free");
    onChangeRows(currentRows - 1);
  };

  const handleRowIncrement = () => {
    if (!onChangeRows || currentRows >= 11) return;
    if (aspectLock !== "free") setAspectLock("free");
    onChangeRows(currentRows + 1);
  };

  return (
    <div className="w-full mb-16 sm:mb-24 lg:mb-32 mt-6 sm:mt-10 select-none">
      {/* Header Bar */}
      <div className="flex flex-col items-center text-center mb-8 sm:mb-12">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase text-zinc-950 tracking-wide">
          Display Elevation & <span className="text-[#D7B875]">Scale</span>
        </h2>
      </div>

      {/* Main Architectural Stage with Background Grid */}
      <div className="relative w-full rounded-2xl bg-white border border-[#E5E5E0] p-4 sm:p-8 lg:p-10 flex flex-col items-center justify-center shadow-sm overflow-hidden min-h-[480px] sm:min-h-[540px] lg:min-h-[600px] xl:min-h-[640px]">
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
                linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px)
              `,
              backgroundSize: "32px 32px",
            }}
          />

          {/* Major Coordinate Grid Lines (128px) in Subtle Gray */}
          <div
            className="absolute inset-0 opacity-75 [mask-image:radial-gradient(ellipse_at_center,black_75%,transparent_98%)]"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(0, 0, 0, 0.12) 1.5px, transparent 1.5px),
                linear-gradient(to bottom, rgba(0, 0, 0, 0.12) 1.5px, transparent 1.5px)
              `,
              backgroundSize: "128px 128px",
            }}
          />

          {/* Center Coordinate Axis Crosshairs */}
          <div className="absolute top-1/2 inset-x-0 h-[1px] bg-black/15 opacity-70" />
          <div className="absolute left-1/2 inset-y-0 w-[1px] bg-black/15 opacity-70" />

          {/* Center Radial Luminescence */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none blur-3xl opacity-25"
            style={{
              width: "600px",
              height: "320px",
              background: "radial-gradient(circle, rgba(215,184,117,0.2) 0%, transparent 70%)",
            }}
          />
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
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white hover:bg-zinc-950 text-zinc-700 hover:text-white border border-[#E5E5E0] hover:border-zinc-950 text-sm sm:text-base font-bold flex items-center justify-center transition-all cursor-pointer disabled:opacity-20 disabled:hover:bg-white disabled:hover:text-zinc-700 active:scale-95 shadow-xs"
              >
                −
              </button>
            )}

            <div className="px-4 sm:px-5 py-1.5 sm:py-2 rounded-full bg-white/95 border border-[#E5E5E0] text-xs sm:text-sm font-semibold text-zinc-950 flex items-center gap-2 shadow-xs backdrop-blur-sm">
              <span>Width: {unit === "metric" ? `${widthM} m` : `${widthFt} ft`}</span>
              <span className="text-zinc-500 font-normal">
                ({currentCols} {currentCols === 1 ? "panel" : "panels"})
              </span>
            </div>

            {onChangeCols && (
              <button
                type="button"
                onClick={handleColIncrement}
                disabled={currentCols >= 11}
                aria-label="Increase width"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white hover:bg-zinc-950 text-zinc-700 hover:text-white border border-[#E5E5E0] hover:border-zinc-950 text-sm sm:text-base font-bold flex items-center justify-center transition-all cursor-pointer disabled:opacity-20 disabled:hover:bg-white disabled:hover:text-zinc-700 active:scale-95 shadow-xs"
              >
                +
              </button>
            )}
          </div>

          {/* Balanced 3-Column Stage: [Height Controls] [Screen Centered] [Human Scale] */}
          <div className="w-full flex items-center justify-center gap-3 sm:gap-6 lg:gap-8 max-w-6xl xl:max-w-7xl 2xl:max-w-[1440px]">
            {/* Left Flank: Height Stepper Controls */}
            <div className="w-20 sm:w-28 flex flex-col items-center justify-center gap-2 shrink-0">
              {onChangeRows && (
                <button
                  type="button"
                  onClick={handleRowIncrement}
                  disabled={currentRows >= 11}
                  aria-label="Increase height"
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white hover:bg-zinc-950 text-zinc-700 hover:text-white border border-[#E5E5E0] hover:border-zinc-950 text-sm sm:text-base font-bold flex items-center justify-center transition-all cursor-pointer disabled:opacity-20 disabled:hover:bg-white disabled:hover:text-zinc-700 active:scale-95 shadow-xs"
                >
                  +
                </button>
              )}

              <div className="px-2.5 sm:px-3.5 py-2 sm:py-2.5 rounded-xl bg-white/95 border border-[#E5E5E0] text-center shadow-xs backdrop-blur-sm w-full">
                <span className="block text-[11px] sm:text-xs text-zinc-500 font-medium">Height</span>
                <span className="block text-xs sm:text-sm lg:text-base font-bold text-zinc-950 whitespace-nowrap">
                  {unit === "metric" ? `${heightM} m` : `${heightFt} ft`}
                </span>
                <span className="block text-[11px] sm:text-xs text-zinc-500">
                  {currentRows} {currentRows === 1 ? "panel" : "panels"}
                </span>
              </div>

              {onChangeRows && (
                <button
                  type="button"
                  onClick={handleRowDecrement}
                  disabled={currentRows <= 1}
                  aria-label="Decrease height"
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white hover:bg-zinc-950 text-zinc-700 hover:text-white border border-[#E5E5E0] hover:border-zinc-950 text-sm sm:text-base font-bold flex items-center justify-center transition-all cursor-pointer disabled:opacity-20 disabled:hover:bg-white disabled:hover:text-zinc-700 active:scale-95 shadow-xs"
                >
                  −
                </button>
              )}
            </div>

            {/* Center: The Interactive 3D LED Video Wall Model */}
            <div className="flex-1 min-w-0 w-full flex items-center justify-center">
              <LedScreen3DViewer
                widthM={Number(widthM)}
                heightM={Number(heightM)}
                cols={currentCols}
                rows={currentRows}
                unit={unit}
                showImage={showImage}
                onToggleShowImage={() => setShowImage((prev) => !prev)}
                modelUrl="/models/screen_led.glb"
                bottomSlot={
                  onChangeCols && onChangeRows ? (
                    <DimensionConfigurator
                      cols={currentCols}
                      rows={currentRows}
                      onChangeCols={onChangeCols}
                      onChangeRows={onChangeRows}
                      selectedVariant={variant}
                      aspectLock={aspectLock}
                      onAspectLockChange={setAspectLock}
                    />
                  ) : undefined
                }
              />
            </div>

            {/* Right Side of the 3D Model: Stationary Human Scale in a Dedicated Div */}
            <div className="w-20 sm:w-28 flex flex-col items-center justify-end self-end shrink-0 pb-3 sm:pb-4">
              <div
                className="relative flex flex-col items-center justify-end h-[170px] sm:h-[190px]"
                style={{
                  aspectRatio: "724 / 2172",
                }}
                title="Standard Human Scale: 1.75 m (5'9'') - Stationary Scale Reference"
              >
                <Image
                  src="/images/human copy.png"
                  alt="Human scale reference (1.75m / 5'9'')"
                  fill
                  sizes="120px"
                  className="object-contain object-bottom drop-shadow-md select-none pointer-events-none"
                  priority
                />
              </div>
              <div className="mt-2 px-2 sm:px-2.5 py-0.5 rounded-full bg-white/95 border border-[#E5E5E0] shadow-xs text-center whitespace-nowrap">
                <span className="text-[11px] font-semibold text-zinc-800 block leading-tight">
                  1.75 m
                </span>
                <span className="text-[9px] sm:text-[10px] text-zinc-500 font-normal block leading-tight">
                  (5&apos;9&quot;) Human
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScreenVisualizer;
