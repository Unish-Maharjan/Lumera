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
  controller: ControllerSpec;
  unit: UnitSystem;
  cols?: number;
  rows?: number;
  onChangeCols?: (cols: number) => void;
  onChangeRows?: (rows: number) => void;
}

const PORT_COLORS = [
  "#398BFF", // Electric Blue
  "#10B981", // Emerald
  "#D7B875", // Champagne Gold
  "#EC4899", // Pink
  "#8B5CF6", // Violet
  "#F59E0B", // Amber
  "#06B6D4", // Cyan
  "#F97316", // Orange
  "#6366F1", // Indigo
  "#14B8A6", // Teal
  "#E11D48", // Rose
  "#84CC16", // Lime
];

export function ScreenVisualizer({
  calc,
  variant,
  controller,
  unit,
  cols,
  rows,
  onChangeCols,
  onChangeRows,
}: ScreenVisualizerProps) {
  const [showHuman, setShowHuman] = useState<boolean>(true);
  const [showPortRouting, setShowPortRouting] = useState<boolean>(false);
  const [showAspectGuide, setShowAspectGuide] = useState<boolean>(false);
  const [aspectLock, setAspectLock] = useState<AspectRatioLock>("free");

  const currentCols = cols ?? calc.cols;
  const currentRows = rows ?? calc.rows;
  const { widthM, heightM, widthFt, heightFt } = calc;

  // Visual aspect ratio
  const screenAspect = widthM / Math.max(0.1, heightM);

  // Human height standard: 1.75 meters (5'9")
  const humanHeightM = 1.75;
  // Normalized screen width inside container
  const svgHeight = 400;
  const svgWidth = Math.max(300, Math.min(1000, svgHeight * screenAspect));

  // Calculate Port Assignment for each cabinet (serpentine bottom-to-top or left-to-right)
  const maxCabsPerPort = calc.maxCabinetsPerPort;

  const getCabinetPortIndex = (c: number, r: number): number => {
    // Serpentine column-based routing
    const cabIndex = c * currentRows + (c % 2 === 0 ? currentRows - 1 - r : r);
    return Math.floor(cabIndex / maxCabsPerPort);
  };

  // Aspect ratio helper calculations
  const calculateRowsForCols = (targetCols: number, lock: AspectRatioLock): number => {
    if (lock === "free") return currentRows;
    let targetRatio = 16 / 9;
    if (lock === "16:10") targetRatio = 16 / 10;
    if (lock === "4:3") targetRatio = 4 / 3;
    if (lock === "21:9") targetRatio = 21 / 9;
    if (lock === "1:1") targetRatio = 1.0;

    const cabRatio = variant.cabWidthMm / variant.cabHeightMm;
    return Math.max(1, Math.min(40, Math.round(targetCols / (targetRatio / cabRatio))));
  };

  const calculateColsForRows = (targetRows: number, lock: AspectRatioLock): number => {
    if (lock === "free") return currentCols;
    let targetRatio = 16 / 9;
    if (lock === "16:10") targetRatio = 16 / 10;
    if (lock === "4:3") targetRatio = 4 / 3;
    if (lock === "21:9") targetRatio = 21 / 9;
    if (lock === "1:1") targetRatio = 1.0;

    const cabRatio = variant.cabWidthMm / variant.cabHeightMm;
    return Math.max(1, Math.min(60, Math.round(targetRows * (targetRatio / cabRatio))));
  };

  const handleColDecrement = () => {
    if (!onChangeCols || currentCols <= 1) return;
    const nextCols = Math.max(1, currentCols - 1);
    if (aspectLock !== "free" && onChangeRows) {
      const nextRows = calculateRowsForCols(nextCols, aspectLock);
      onChangeCols(nextCols);
      onChangeRows(nextRows);
    } else {
      onChangeCols(nextCols);
    }
  };

  const handleColIncrement = () => {
    if (!onChangeCols || currentCols >= 60) return;
    const nextCols = Math.min(60, currentCols + 1);
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
    const nextRows = Math.max(1, currentRows - 1);
    if (aspectLock !== "free" && onChangeCols) {
      const nextCols = calculateColsForRows(nextRows, aspectLock);
      onChangeRows(nextRows);
      onChangeCols(nextCols);
    } else {
      onChangeRows(nextRows);
    }
  };

  const handleRowIncrement = () => {
    if (!onChangeRows || currentRows >= 40) return;
    const nextRows = Math.min(40, currentRows + 1);
    if (aspectLock !== "free" && onChangeCols) {
      const nextCols = calculateColsForRows(nextRows, aspectLock);
      onChangeRows(nextRows);
      onChangeCols(nextCols);
    } else {
      onChangeRows(nextRows);
    }
  };

  return (
    <div className="w-full rounded-2xl p-4 sm:p-6 mb-8 select-none overflow-hidden">
      {/* Visualizer Top Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-inter text-accent uppercase font-medium">
              LIVE 2D CAD PREVIEW
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-zinc-300 font-inter">
              {calc.resWidth} x {calc.resHeight} px
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-heading font-medium text-white uppercase">
            Architectural Elevation & Cabinet Layout
          </h3>
        </div>

        {/* Interactive View Layer Toggles */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setShowHuman(!showHuman)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
              showHuman
                ? "bg-accent/20 border border-accent/60 text-accent font-semibold"
                : "bg-zinc-900 border border-white/10 text-zinc-400 hover:text-white"
            }`}
          >
            <span>🧍</span>
            <span>Human Scale (1.75m)</span>
          </button>

          <button
            type="button"
            onClick={() => setShowPortRouting(!showPortRouting)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
              showPortRouting
                ? "bg-electric-blue/20 border border-[#398BFF]/60 text-[#398BFF] font-semibold"
                : "bg-zinc-900 border border-white/10 text-zinc-400 hover:text-white"
            }`}
          >
            <span>🔌</span>
            <span>Data Ports Map</span>
          </button>

          <button
            type="button"
            onClick={() => setShowAspectGuide(!showAspectGuide)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
              showAspectGuide
                ? "bg-white/20 border border-white/50 text-white font-semibold"
                : "bg-zinc-900 border border-white/10 text-zinc-400 hover:text-white"
            }`}
          >
            <span>📐</span>
            <span>16:9 Content Guide</span>
          </button>
        </div>
      </div>

      {/* Main CAD Visualizer Stage */}
      <div className="relative w-full min-h-[380px] sm:min-h-[460px] bg-gradient-to-b from-black via-zinc-950 to-[#08090b] rounded-xl border border-white/10 p-6 flex flex-col items-center justify-center overflow-x-auto shadow-inner">
        {/* Subtle Room Wall Grid Background */}
        <div
          className="absolute inset-0 opacity-[0.08] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
          aria-hidden="true"
        />

        {/* Ambient Display Glow behind video wall */}
        <div
          className="absolute pointer-events-none blur-3xl opacity-25"
          style={{
            width: `${Math.min(600, svgWidth)}px`,
            height: "260px",
            background:
              "radial-gradient(circle, rgba(215,184,117,0.3) 0%, rgba(57,139,255,0.15) 50%, transparent 80%)",
          }}
          aria-hidden="true"
        />

        {/* Stage Elevation Floor Line */}
        {/* <div className="absolute bottom-6 inset-x-8 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none flex justify-center">
          <span className="text-[10px] font-inter text-zinc-500 uppercase -mt-4 bg-black px-2">
            FINISHED FLOOR LEVEL (FFL)
          </span>
        </div> */}

        {/* CAD Dimension Wrapper */}
        <div className="relative z-10 flex flex-col items-center my-4">
          {/* Top Width Dimension Arrow with Stepper Buttons */}
          <div className="flex items-center justify-between w-full mb-3 px-1 gap-2">
            <div className="h-[1px] flex-1 bg-white/60 relative min-w-[12px]">
              <span className="absolute left-0 top-1/2 -translate-y-1/2 border-y-4 border-y-transparent border-r-6 border-r-white" />
            </div>

            {/* Decrement Column Button */}
            {onChangeCols && (
              <button
                type="button"
                onClick={handleColDecrement}
                disabled={currentCols <= 1}
                aria-label="Decrease columns"
                className="w-7 h-7 rounded-md bg-zinc-900/90 hover:bg-white hover:text-black disabled:opacity-30 disabled:hover:bg-zinc-900 disabled:hover:text-white border border-white/30 text-white font-bold text-sm flex items-center justify-center transition-all cursor-pointer active:scale-90 shrink-0 shadow-sm"
                title="Decrease 1 Column (Width)"
              >
                -
              </button>
            )}

            {/* Width Dimension Badge */}
            <div className="px-3.5 py-1 rounded-full bg-black/95 border border-white text-[11px] font-inter text-white font-semibold shrink-0 flex items-center gap-2 shadow-lg">
              <span>WIDTH: {unit === "metric" ? `${widthM} m` : `${widthFt} ft`}</span>
              <span className="text-zinc-400 font-mono text-[10px]">
                ({currentCols} {currentCols === 1 ? "panel" : "panels"})
              </span>
            </div>

            {/* Increment Column Button */}
            {onChangeCols && (
              <button
                type="button"
                onClick={handleColIncrement}
                disabled={currentCols >= 60}
                aria-label="Increase columns"
                className="w-7 h-7 rounded-md bg-zinc-900/90 hover:bg-white hover:text-black disabled:opacity-30 disabled:hover:bg-zinc-900 disabled:hover:text-white border border-white/30 text-white font-bold text-sm flex items-center justify-center transition-all cursor-pointer active:scale-90 shrink-0 shadow-sm"
                title="Increase 1 Column (Width)"
              >
                +
              </button>
            )}

            <div className="h-[1px] flex-1 bg-white/60 relative min-w-[12px]">
              <span className="absolute right-0 top-1/2 -translate-y-1/2 border-y-4 border-y-transparent border-l-6 border-l-white" />
            </div>
          </div>

          {/* Screen Elevation + Right Height Dimension Arrow + Human Figure */}
          <div className="flex items-center gap-4">
            {/* The SVG Screen Matrix */}
            <div
              className="relative rounded-sm overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.95)] border-2 border-zinc-700 bg-zinc-950 transition-all duration-300"
              style={{
                width: `${Math.min(760, Math.max(260, svgWidth))}px`,
                aspectRatio: `${widthM} / ${heightM}`,
              }}
            >
              {/* LED Panel Matrix Grid */}
              <div
                className="w-full h-full grid"
                style={{
                  gridTemplateColumns: `repeat(${currentCols}, minmax(0, 1fr))`,
                  gridTemplateRows: `repeat(${currentRows}, minmax(0, 1fr))`,
                }}
              >
                {Array.from({ length: currentRows }).map((_, rIdx) =>
                  Array.from({ length: currentCols }).map((_, cIdx) => {
                    const portIdx = getCabinetPortIndex(cIdx, rIdx);
                    const portColor = PORT_COLORS[portIdx % PORT_COLORS.length];

                    return (
                      <div
                        key={`${rIdx}-${cIdx}`}
                        className={`relative border-[0.5px] border-black/80 flex items-center justify-center transition-all ${
                          showPortRouting
                            ? "hover:brightness-125"
                            : "bg-gradient-to-br from-zinc-900 to-zinc-950 hover:bg-zinc-800"
                        }`}
                        style={{
                          backgroundColor: showPortRouting
                            ? `${portColor}25`
                            : undefined,
                          borderColor: showPortRouting
                            ? `${portColor}80`
                            : "rgba(0,0,0,0.9)",
                        }}
                      >
                        {/* Micro-LED Module Tile Seams (if large enough) */}
                        <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:8px_8px]" />

                        {/* Port Label overlay */}
                        {showPortRouting && (
                          <div className="flex flex-col items-center pointer-events-none">
                            <span
                              className="text-[9px] font-inter font-bold px-1 py-0.2 rounded"
                              style={{
                                color: portColor,
                                backgroundColor: "rgba(0,0,0,0.8)",
                              }}
                            >
                              P{portIdx + 1}
                            </span>
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>

              {/* 16:9 Aspect Ratio Guide Overlay */}
              {showAspectGuide && (
                <div
                  className="absolute inset-0 pointer-events-none border-2 border-dashed border-amber-400/80 z-20 flex items-center justify-center"
                  style={{
                    margin:
                      screenAspect > 16 / 9
                        ? `0 ${(1 - (16 / 9) / screenAspect) * 50}%`
                        : `${(1 - screenAspect / (16 / 9)) * 50}% 0`,
                  }}
                >
                  <span className="bg-black/80 px-2 py-0.5 rounded text-[10px] font-inter text-amber-300 font-semibold">
                    16:9 Content Safe Zone
                  </span>
                </div>
              )}

              {/* Watermark in center */}
              {!showPortRouting && (
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none p-4 text-center z-10">
                  <span className="font-heading text-sm sm:text-base md:text-lg font-bold text-white uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                    {variant.name}
                  </span>
                  <span className="font-inter text-[10px] sm:text-xs text-accent mt-0.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                    {calc.resWidth} x {calc.resHeight} px • {calc.closestStandardAspect}
                  </span>
                </div>
              )}
            </div>

            {/* Right Height Dimension Arrow with Stepper Buttons */}
            <div className="flex flex-col items-center justify-between self-stretch py-1 gap-2">
              <div className="w-[1px] flex-1 bg-accent/60 relative min-h-[16px]">
                <span className="absolute top-0 left-1/2 -translate-x-1/2 border-x-4 border-x-transparent border-b-6 border-b-accent" />
              </div>

              {/* Increment Row Button */}
              {onChangeRows && (
                <button
                  type="button"
                  onClick={handleRowIncrement}
                  disabled={currentRows >= 40}
                  aria-label="Increase rows"
                  className="w-7 h-7 rounded-md bg-zinc-900/90 hover:bg-accent hover:text-black disabled:opacity-30 disabled:hover:bg-zinc-900 disabled:hover:text-accent border border-accent/40 text-accent font-bold text-sm flex items-center justify-center transition-all cursor-pointer active:scale-90 shrink-0 shadow-sm"
                  title="Increase 1 Row (Height)"
                >
                  +
                </button>
              )}

              {/* Height Dimension Badge */}
              <div className="my-1 px-2.5 py-2 rounded-full bg-black/95 border border-accent text-[11px] font-inter text-accent font-semibold whitespace-nowrap [writing-mode:vertical-rl] rotate-180 flex items-center gap-1.5 shadow-lg">
                <span>HEIGHT: {unit === "metric" ? `${heightM} m` : `${heightFt} ft`}</span>
                <span className="text-zinc-400 font-mono text-[9px]">
                  ({currentRows} {currentRows === 1 ? "panel" : "panels"})
                </span>
              </div>

              {/* Decrement Row Button */}
              {onChangeRows && (
                <button
                  type="button"
                  onClick={handleRowDecrement}
                  disabled={currentRows <= 1}
                  aria-label="Decrease rows"
                  className="w-7 h-7 rounded-md bg-zinc-900/90 hover:bg-accent hover:text-black disabled:opacity-30 disabled:hover:bg-zinc-900 disabled:hover:text-accent border border-accent/40 text-accent font-bold text-sm flex items-center justify-center transition-all cursor-pointer active:scale-90 shrink-0 shadow-sm"
                  title="Decrease 1 Row (Height)"
                >
                  -
                </button>
              )}

              <div className="w-[1px] flex-1 bg-accent/60 relative min-h-[16px]">
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 border-x-4 border-x-transparent border-t-6 border-t-accent" />
              </div>
            </div>

            {/* Human Silhouette Comparison */}
            {showHuman && (
              <div className="flex flex-col items-center shrink-0 self-end mb-1">
                {/* Scaled Human Reference Image */}
                <div
                  className="relative flex flex-col items-center justify-end"
                  style={{
                    height: `${Math.max(48, Math.min(280, (humanHeightM / heightM) * 220))}px`,
                    aspectRatio: "341 / 1024",
                  }}
                  title="Average Human Height: 1.75m (5'9'') for physical scale reference"
                >
                  <Image
                    src="/images/calculator/human-scale.png"
                    alt="Human scale reference (1.75m / 5'9'')"
                    fill
                    sizes="120px"
                    className="object-contain object-bottom drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)] filter brightness-95 contrast-105"
                  />
                </div>
                <span className="text-[10px] font-inter text-zinc-400 mt-1 font-medium">
                  1.75m (5&apos;9&quot;)
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Embedded Dimension & Aspect Buttons directly inside Visualizer */}
      {onChangeCols && onChangeRows && (
        <div className="mt-5 w-full">
          <DimensionConfigurator
            cols={currentCols}
            rows={currentRows}
            onChangeCols={onChangeCols}
            onChangeRows={onChangeRows}
            selectedVariant={variant}
            aspectLock={aspectLock}
            onAspectLockChange={setAspectLock}
            unit={unit}
          />
        </div>
      )}

      {/* Legend & Quick Optical Indicators */}
      <div className="mt-4 pt-3 border-t border-white/5 flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex flex-wrap items-center gap-4 text-zinc-400 font-inter text-[11px]">
          {/* <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-xs bg-zinc-800 border border-white/20" />
            Panel: {variant.cabWidthMm}x{variant.cabHeightMm}mm
          </span> */}
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-xs bg-accent/80" />
            Aspect Ratio: {calc.aspectRatioExact} ({calc.closestStandardAspect})
          </span>
          {showPortRouting && (
            <span className="flex items-center gap-1.5 text-electric-blue font-semibold">
              <span className="w-2.5 h-2.5 rounded-full bg-[#398BFF]" />
              {controller.name}: {calc.minEthernetPorts} Gigabit Data Ports Assigned
            </span>
          )}
        </div>

        <div className="text-[11px] font-inter text-zinc-500">
          Diagonal: <strong className="text-white">{calc.diagonalInches}&quot;</strong> (
          {unit === "metric" ? `${calc.diagonalM}m` : `${calc.diagonalFt}ft`}) • Area:{" "}
          <strong className="text-white">
            {unit === "metric" ? `${calc.areaSqm} m²` : `${calc.areaSqft} sq ft`}
          </strong>
        </div>
      </div>
    </div>
  );
}
