"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Heading } from "@/components/ui/Heading";
import {
  CalculationResult,
  LedPitchVariant,
  ControllerSpec,
  UnitSystem,
} from "./types";

const LedScreen3DViewer = dynamic(() => import("./led-screen-3d-viewer"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center text-sm text-zinc-500">
      Loading 3D view…
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

/* ---------- Main component ---------- */

export function ScreenVisualizer({
  calc,
  variant,
  unit,
  cols: colsProp,
  rows: rowsProp,
  onChangeCols,
  onChangeRows,
}: ScreenVisualizerProps) {
  const [showImage, setShowImage] = useState(true);
  const [showHuman, setShowHuman] = useState(true);

  const cols = colsProp ?? calc.cols;
  const rows = rowsProp ?? calc.rows;

  // Sizes in metres
  const widthM = (cols * variant.cabWidthMm) / 1000;
  const heightM = (rows * variant.cabHeightMm) / 1000;

  return (
    <div className="flex h-full w-full flex-col gap-3">
      {/* Title in the middle and live measurements */}
      <div className="flex flex-col items-center text-center gap-2 shrink-0">
        <Heading
          as="h2"
          size="xl"
          variant="dark"
          align="center"
          className="text-center"
        >
          Display size &amp; scale
        </Heading>

        {/* Buttons to Increase & Decrease 3D Model Physical Size */}
        {(onChangeCols || onChangeRows) && (
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 mt-0.5">
            {/* Width Size Stepper */}
            {onChangeCols && (
              <div className="flex items-center gap-1.5 sm:gap-2 bg-white/95 border border-[#E5E5E0] shadow-xs rounded-full px-2 py-0.5 sm:py-1 backdrop-blur-sm">
                <span className="text-[11px] sm:text-xs font-semibold text-zinc-600 pl-1 sm:pl-1.5">Width:</span>
                <button
                  type="button"
                  disabled={cols <= 1}
                  onClick={() => onChangeCols(Math.max(1, cols - 1))}
                  aria-label="Decrease width by 1 panel"
                  className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-zinc-100 hover:bg-zinc-950 hover:text-white text-zinc-800 flex items-center justify-center font-bold text-xs sm:text-sm transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer active:scale-95"
                >
                  −
                </button>
                <span className="text-xs font-semibold tabular-nums text-zinc-950 min-w-14 sm:min-w-16 text-center">
                  {cols} {cols === 1 ? "panel" : "panels"}
                </span>
                <button
                  type="button"
                  disabled={cols >= 16}
                  onClick={() => onChangeCols(Math.min(16, cols + 1))}
                  aria-label="Increase width by 1 panel"
                  className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-zinc-100 hover:bg-zinc-950 hover:text-white text-zinc-800 flex items-center justify-center font-bold text-xs sm:text-sm transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer active:scale-95"
                >
                  +
                </button>
              </div>
            )}

            {/* Height Size Stepper */}
            {onChangeRows && (
              <div className="flex items-center gap-1.5 sm:gap-2 bg-white/95 border border-[#E5E5E0] shadow-xs rounded-full px-2 py-0.5 sm:py-1 backdrop-blur-sm">
                <span className="text-[11px] sm:text-xs font-semibold text-zinc-600 pl-1 sm:pl-1.5">Height:</span>
                <button
                  type="button"
                  disabled={rows <= 1}
                  onClick={() => onChangeRows(Math.max(1, rows - 1))}
                  aria-label="Decrease height by 1 panel"
                  className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-zinc-100 hover:bg-zinc-950 hover:text-white text-zinc-800 flex items-center justify-center font-bold text-xs sm:text-sm transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer active:scale-95"
                >
                  −
                </button>
                <span className="text-xs font-semibold tabular-nums text-zinc-950 min-w-14 sm:min-w-16 text-center">
                  {rows} {rows === 1 ? "panel" : "panels"}
                </span>
                <button
                  type="button"
                  disabled={rows >= 16}
                  onClick={() => onChangeRows(Math.min(16, rows + 1))}
                  aria-label="Increase height by 1 panel"
                  className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-zinc-100 hover:bg-zinc-950 hover:text-white text-zinc-800 flex items-center justify-center font-bold text-xs sm:text-sm transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer active:scale-95"
                >
                  +
                </button>
              </div>
            )}

            {/* Scale Both (Overall 3D Model Size) */}
            {(onChangeCols && onChangeRows) && (
              <div className="flex items-center gap-1.5 bg-white/95 border border-[#E5E5E0] shadow-xs rounded-full px-2 py-0.5 sm:py-1 backdrop-blur-sm">
                <span className="text-[11px] sm:text-xs font-semibold text-zinc-600 pl-1">Overall:</span>
                <button
                  type="button"
                  disabled={cols <= 1 || rows <= 1}
                  onClick={() => {
                    onChangeCols(Math.max(1, cols - 1));
                    onChangeRows(Math.max(1, rows - 1));
                  }}
                  aria-label="Decrease overall model size"
                  className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-zinc-100 hover:bg-zinc-950 hover:text-white text-zinc-800 flex items-center justify-center font-bold text-xs sm:text-sm transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer active:scale-95"
                >
                  −
                </button>
                <span className="text-xs font-semibold tabular-nums text-zinc-950 min-w-12 text-center">
                  {cols}×{rows}
                </span>
                <button
                  type="button"
                  disabled={cols >= 16 || rows >= 16}
                  onClick={() => {
                    onChangeCols(Math.min(16, cols + 1));
                    onChangeRows(Math.min(16, rows + 1));
                  }}
                  aria-label="Increase overall model size"
                  className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-zinc-100 hover:bg-zinc-950 hover:text-white text-zinc-800 flex items-center justify-center font-bold text-xs sm:text-sm transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer active:scale-95"
                >
                  +
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 3D stage with Architectural CAD Graph Grid Backdrop */}
      <div className="relative w-full min-h-[460px] sm:min-h-[520px] lg:min-h-[580px] xl:min-h-[620px] flex-1 overflow-hidden rounded-2xl sm:rounded-3xl border border-[#E5E5E0] bg-[#F7F7F5] shadow-sm">
        {/* Architectural CAD Graph Grid Backdrop behind the 3D Model */}
        <div 
          className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0" 
          aria-hidden="true"
        >
          {/* Fine Uniform Graph Grid Pattern (no big boxes) */}
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)
              `,
              backgroundSize: "20px 20px",
              backgroundPosition: "center center",
            }}
          />

          {/* Soft vignette fade at borders */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_60%,rgba(247,247,245,0.6)_88%,rgba(247,247,245,0.95)_100%)]" />
        </div>

        {/* 3D Canvas Stage */}
        <div className="relative z-10 w-full h-full">
          <LedScreen3DViewer
            widthM={Math.round(widthM * 100) / 100}
            heightM={Math.round(heightM * 100) / 100}
            cols={cols}
            rows={rows}
            unit={unit}
            showImage={showImage}
            onToggleShowImage={() => setShowImage((prev) => !prev)}
            modelUrl="/models/screen_led.glb"
            bottomSlot={
              <div className="flex flex-wrap items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowHuman((prev) => !prev)}
                  className="rounded-full bg-white/90 hover:bg-zinc-950 hover:text-white px-3 py-1 text-[11px] font-medium text-zinc-700 shadow-xs border border-zinc-200/80 hover:border-zinc-950 backdrop-blur-sm transition-all cursor-pointer active:scale-95"
                >
                  {showHuman ? "Hide Scale Person" : "Show Scale Person"}
                </button>
              </div>
            }
          />

          {showHuman && (
            <div className="pointer-events-none absolute -translate-y-[70%] -translate-x-[200%] bottom-3 right-3 flex 
            flex-col items-center sm:right-5 z-20">
              <div className="relative h-28 w-9 sm:h-36 sm:w-12">
                <Image
                  src="/images/human copy.png"
                  alt="Person 1.75 m tall, shown for scale"
                  fill
                  sizes="80px"
                  className="object-contain object-bottom"
                />
              </div>
              <span className="mt-1 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-semibold text-zinc-900 border border-zinc-200/80 shadow-xs">
                1.75 m (5&apos;9&quot;)
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ScreenVisualizer;