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
  AspectRatioLock,
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

const MIN_PANELS = 1;
const MAX_PANELS = 11;
const DEFAULT_PANELS = 6;
const FT_PER_M = 3.28084;
const SQFT_PER_M2 = 10.7639;

const RATIOS: AspectRatioLock[] = ["free", "16:9", "16:10", "4:3", "21:9"];

const panelText = (n: number) => `${n} ${n === 1 ? "panel" : "panels"}`;

/* ---------- Small building blocks ---------- */

function StepButton({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-300 bg-white text-lg text-zinc-900 transition-colors hover:bg-zinc-950 hover:text-white active:scale-95 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-zinc-900"
    >
      {children}
    </button>
  );
}

function Stepper({
  label,
  lengthText,
  count,
  onChange,
}: {
  label: string;
  lengthText: string;
  count: number;
  onChange?: (next: number) => void;
}) {
  return (
    <div>
      <p className="text-xs font-medium text-zinc-500">{label}</p>
      <div className="mt-1.5 flex items-center gap-2">
        <StepButton
          label={`Decrease ${label.toLowerCase()} by one panel`}
          disabled={!onChange || count <= MIN_PANELS}
          onClick={() => onChange?.(count - 1)}
        >
          −
        </StepButton>
        <div className="min-w-28 text-center">
          <p className="text-base font-semibold tabular-nums text-zinc-950">
            {lengthText}
          </p>
          <p className="text-xs text-zinc-500">{panelText(count)}</p>
        </div>
        <StepButton
          label={`Increase ${label.toLowerCase()} by one panel`}
          disabled={!onChange || count >= MAX_PANELS}
          onClick={() => onChange?.(count + 1)}
        >
          +
        </StepButton>
      </div>
    </div>
  );
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
  const [aspectLock, setAspectLock] = useState<AspectRatioLock>("free");
  const [showImage, setShowImage] = useState(true);
  const [showHuman, setShowHuman] = useState(true);

  const cols = colsProp ?? calc.cols;
  const rows = rowsProp ?? calc.rows;

  // Sizes in metres, formatted for the chosen unit system
  const widthM = (cols * variant.cabWidthMm) / 1000;
  const heightM = (rows * variant.cabHeightMm) / 1000;
  const areaM2 = widthM * heightM;
  const metric = unit === "metric";

  const length = (m: number) =>
    metric ? `${m.toFixed(2)} m` : `${(m * FT_PER_M).toFixed(1)} ft`;
  const area = metric
    ? `${areaM2.toFixed(2)} m²`
    : `${(areaM2 * SQFT_PER_M2).toFixed(1)} sq ft`;

  const stats = [
    { label: "Size", value: `${length(widthM)} × ${length(heightM)}` },
    { label: "Panels", value: `${cols * rows} (${cols} × ${rows})` },
    { label: "Area", value: area },
    {
      label: "Resolution",
      value: `${cols * variant.resWidth} × ${rows * variant.resHeight} px`,
    },
  ];

  // Changing a size by hand drops any ratio lock
  const stepCols = onChangeCols
    ? (n: number) => {
        setAspectLock("free");
        onChangeCols(n);
      }
    : undefined;
  const stepRows = onChangeRows
    ? (n: number) => {
        setAspectLock("free");
        onChangeRows(n);
      }
    : undefined;

  const applyRatio = (lock: AspectRatioLock) => {
    setAspectLock(lock);
    if (lock === "free" || !onChangeCols || !onChangeRows) return;

    // Keep the current width, then work out how many rows give that ratio
    const [w, h] = lock.split(":").map(Number);
    const cabinetRatio = variant.cabWidthMm / variant.cabHeightMm;
    const nextRows = Math.round((cols * cabinetRatio) / (w / h));

    onChangeCols(Math.min(MAX_PANELS, Math.max(MIN_PANELS, cols)));
    onChangeRows(Math.min(MAX_PANELS, Math.max(MIN_PANELS, nextRows)));
  };

  const reset = () => {
    setAspectLock("free");
    onChangeCols?.(DEFAULT_PANELS);
    onChangeRows?.(DEFAULT_PANELS);
  };

  return (
    <div className="flex h-full w-full flex-col gap-3">
      {/* Title in the middle and live measurements */}
      <div className="flex flex-col items-center text-center gap-2 shrink-0">
        <Heading
          as="h2"
          size="2xl"
          variant="dark"
          align="center"
          className="text-center"
        >
          Display size &amp; scale
        </Heading>

        <dl
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1"
          aria-live="polite"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-center gap-1.5 text-xs sm:text-sm">
              <dt className="text-[11px] sm:text-xs uppercase tracking-wide text-zinc-500">
                {stat.label}:
              </dt>
              <dd className="font-semibold tabular-nums text-zinc-950">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* 3D stage */}
      <div className="relative min-h-72 flex-1 overflow-hidden rounded-xl border border-[#E5E5E0] bg-zinc-50">
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
            <p className="rounded-full bg-white/90 px-3 py-1 text-[11px] text-zinc-500">
              Drag to rotate · Right-click to pan · Scroll to zoom
            </p>
          }
        />

        {showHuman && (
          <div className="pointer-events-none absolute bottom-3 right-3 flex flex-col items-center sm:right-5">
            <div className="relative h-28 w-9 sm:h-36 sm:w-12">
              <Image
                src="/images/human copy.png"
                alt="Person 1.75 m tall, shown for scale"
                fill
                sizes="60px"
                className="object-contain object-bottom"
              />
            </div>
            <span className="mt-1 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-semibold text-zinc-900">
              1.75 m (5&apos;9&quot;)
            </span>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="rounded-xl border border-[#E5E5E0] bg-white p-3 sm:p-4">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-wrap gap-x-8 gap-y-4">
            <Stepper
              label="Width"
              lengthText={length(widthM)}
              count={cols}
              onChange={stepCols}
            />
            <Stepper
              label="Height"
              lengthText={length(heightM)}
              count={rows}
              onChange={stepRows}
            />
          </div>

          <div>
            <p className="text-xs font-medium text-zinc-500">Aspect ratio</p>
            <div
              role="group"
              aria-label="Aspect ratio"
              className="mt-1.5 flex gap-1 rounded-lg bg-zinc-100 p-1"
            >
              {RATIOS.map((ratio) => (
                <button
                  key={ratio}
                  type="button"
                  aria-pressed={aspectLock === ratio}
                  onClick={() => applyRatio(ratio)}
                  className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                    aspectLock === ratio
                      ? "bg-[#D7B875] text-zinc-950"
                      : "text-zinc-600 hover:bg-white hover:text-zinc-950"
                  }`}
                >
                  {ratio === "free" ? "Free" : ratio}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3 border-t border-zinc-200 pt-3">
          <button
            type="button"
            role="switch"
            aria-checked={showHuman}
            onClick={() => setShowHuman((prev) => !prev)}
            className="flex items-center gap-2.5 text-sm text-zinc-700"
          >
            <span
              className={`relative h-5 w-9 rounded-full transition-colors ${
                showHuman ? "bg-zinc-950" : "bg-zinc-300"
              }`}
            >
              <span
                className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all ${
                  showHuman ? "left-[18px]" : "left-0.5"
                }`}
              />
            </span>
            Show person for scale
          </button>

          <button
            type="button"
            onClick={reset}
            className="text-sm font-medium text-zinc-700 underline underline-offset-4 hover:text-zinc-950"
          >
            Reset to {DEFAULT_PANELS} × {DEFAULT_PANELS}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ScreenVisualizer;