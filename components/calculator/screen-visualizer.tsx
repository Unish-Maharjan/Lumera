"use client";

import { useState, type ReactNode } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import {
  RotateCcw,
  Tv,
  Image as ImageIcon,
  Layers,
  Info,
  Box,
  ChevronDown,
  type LucideIcon,
} from "lucide-react";
import { Heading } from "@/components/ui/Heading";
import { CalculationResult, LedPitchVariant, ControllerSpec, UnitSystem } from "./types";

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

type ViewMode = "3d" | "top" | "front";

const MIN_PANELS = 3;
const MAX_PANELS = 7;

/** Aspect-ratio presets as [cols, rows]. "Custom" leaves the size untouched. */
const RATIO_PANELS: Record<string, [number, number]> = {
  "16:9": [3, 3],
  "4:3": [3, 4],
  "21:9": [4, 3],
  "1:1": [4, 7],
};
const RATIOS = [...Object.keys(RATIO_PANELS), "Custom"];
const VIEWS: { id: ViewMode; label: string; icon?: LucideIcon }[] = [
  { id: "3d", label: "3D View", icon: Box },
  { id: "top", label: "Top View" },
  { id: "front", label: "Front View" },
];

/* ---------- shared styles ---------- */
const pill =
  "flex cursor-pointer items-center gap-1.5 rounded-full border border-zinc-200/80 bg-white/95 px-3 py-1.5 text-xs font-medium text-zinc-800 shadow-xs backdrop-blur-md transition-all hover:border-zinc-300 hover:bg-white active:scale-95";
const stepBtn =
  "flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-white text-xs font-bold text-zinc-700 shadow-2xs transition-all hover:bg-zinc-900 hover:text-white active:scale-95 disabled:cursor-not-allowed disabled:opacity-30";
const caption = "block font-mono text-[9px] uppercase tracking-wider text-zinc-500";
const figure = "font-mono text-xs font-bold text-zinc-950 sm:text-sm";

/* ---------- small building blocks ---------- */

/** Menu button + popup list. Open state is local so the parent stays simple. */
function Dropdown({
  options,
  value,
  onSelect,
  buttonClass,
  children,
}: {
  options: string[];
  value: string;
  onSelect: (value: string) => void;
  buttonClass: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button type="button" onClick={() => setOpen(!open)} className={buttonClass}>
        {children}
        <ChevronDown className="h-3 w-3 text-zinc-400" />
      </button>
      {open && (
        <div className="absolute right-0 z-40 mt-1.5 flex min-w-28 flex-col rounded-2xl border border-zinc-200 bg-white py-1.5 shadow-xl">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => {
                onSelect(option);
                setOpen(false);
              }}
              className={`flex items-center justify-between px-3 py-1.5 text-left text-xs font-medium hover:bg-zinc-100 ${
                option === value ? "bg-zinc-100 font-semibold text-zinc-950" : "text-zinc-700"
              }`}
            >
              {option}
              {option === value && <span className="h-1.5 w-1.5 rounded-full bg-zinc-950" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/** A measurement line with end ticks and a label pill in the middle. */
function Guide({
  vertical,
  className,
  pillClass = "rounded-xl px-2.5 py-1",
  children,
}: {
  vertical?: boolean;
  className: string;
  pillClass?: string;
  children: ReactNode;
}) {
  const ticks = vertical
    ? ["top-0 left-1/2 h-px w-3 -translate-x-1/2", "bottom-0 left-1/2 h-px w-3 -translate-x-1/2"]
    : ["left-0 top-1/2 h-3 w-px -translate-y-1/2", "right-0 top-1/2 h-3 w-px -translate-y-1/2"];
  return (
    <div className={`flex items-center justify-center bg-zinc-400 ${vertical ? "w-px" : "h-px"} ${className}`}>
      {ticks.map((t) => (
        <span key={t} className={`absolute bg-zinc-400 ${t}`} />
      ))}
      <div className={`whitespace-nowrap border border-zinc-200/80 bg-white/95 text-center shadow-md ${pillClass}`}>
        {children}
      </div>
    </div>
  );
}

function SectionTitle({ icon: Icon, children }: { icon: LucideIcon; children: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-zinc-200/80 bg-zinc-100 text-zinc-900">
        <Icon className="h-4 w-4" />
      </div>
      <h3 className="font-heading text-sm font-bold text-zinc-900">{children}</h3>
    </div>
  );
}

/* ---------- main component ---------- */

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
  const [viewMode, setViewMode] = useState<ViewMode>("3d");
  const [resetTrigger, setResetTrigger] = useState(0);
  const [ratio, setRatio] = useState("16:9");
  const scale = "100%";

  const cols = Math.min(MAX_PANELS, Math.max(MIN_PANELS, colsProp ?? calc.cols));
  const rows = Math.min(MAX_PANELS, Math.max(MIN_PANELS, rowsProp ?? calc.rows));
  const widthM = (cols * variant.cabWidthMm) / 1000;
  const heightM = (rows * variant.cabHeightMm) / 1000;

  const resetView = () => setResetTrigger((n) => n + 1);

  const handleReset = () => {
    resetView();
    selectRatio("16:9");
    setViewMode("3d");
    onChangeCols?.(3);
    onChangeRows?.(3);
  };

  const selectRatio = (next: string) => {
    setRatio(next);
    const size = RATIO_PANELS[next];
    if (size && onChangeCols && onChangeRows) {
      onChangeCols(size[0]);
      onChangeRows(size[1]);
    }
  };

  const steppers = [
    { label: "Width", panels: cols, meters: widthM, onChange: onChangeCols },
    { label: "Height", panels: rows, meters: heightM, onChange: onChangeRows },
  ];

  return (
    <div className="flex h-full w-screen w-[100vw] max-w-[100vw] flex-col justify-between
     overflow-hidden select-none bg-[#F7F7F5]">
      {/* Top Title outside the 3D visualizer stage */}
      <div className="w-full shrink-0 px-6 pt-10 pb-2.5 sm:px-10 sm:pt-10 sm:pb-3 lg:px-14">
        <Heading as="h1" size="lg" variant="dark" align="center">
          LED Screen Visualizer
        </Heading>
      </div>

      {/* 3D Visualizer Stage */}
      <div className="relative flex flex-1 w-full select-none flex-col justify-between
       overflow-hidden">
        {/* Studio backdrop: gradient, soft light, perspective floor */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
          <div
            className="absolute inset-x-0 bottom-0 h-[46%] opacity-25"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(120,110,165,0.22) 1px, transparent 1px), linear-gradient(to bottom, rgba(120,110,165,0.22) 1px, transparent 1px)",
              backgroundSize: "36px 36px",
              transform: "perspective(420px) rotateX(60deg)",
              transformOrigin: "bottom center",
            }}
          />
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white/30 to-transparent" />
        </div>

        {/* Top-right toolbar */}
        <div className="absolute right-4 top-4 z-30 flex items-center gap-2 sm:right-6 sm:top-6 lg:right-8">
        <Dropdown options={RATIOS} value={ratio} onSelect={selectRatio} buttonClass={pill}>
          <Tv className="h-3.5 w-3.5 text-zinc-500" />
          <span className="font-semibold">{ratio}</span>
        </Dropdown>

        <button type="button" onClick={handleReset} className={pill}>
          <RotateCcw className="h-3.5 w-3.5 text-zinc-500" />
          Reset View
        </button>

        <button type="button" onClick={() => setShowImage(!showImage)} className={pill}>
          <ImageIcon className="h-3.5 w-3.5 text-zinc-500" />
          {showImage ? "Remove Image" : "Show Image"}
        </button>
      </div>

      {/* 3D stage with dimension guides and settings card on top */}
      <div className="relative z-10 h-full w-full flex-1">
        <LedScreen3DViewer
          widthM={Math.round(widthM * 100) / 100}
          heightM={Math.round(heightM * 100) / 100}
          cols={cols}
          rows={rows}
          unit={unit}
          showImage={showImage}
          onToggleShowImage={() => setShowImage(!showImage)}
          modelUrl="/models/screen_led.glb"
          screenImageUrl="/images/led-screen-display.jpg"
          hideBuiltInControls
          viewMode={viewMode}
          resetTrigger={resetTrigger}
        />

        {/* Height guide (left) */}
        <Guide
          vertical
          className="pointer-events-none absolute left-6 top-1/2 z-10 h-44 -translate-y-1/2 sm:left-10 sm:h-56 lg:left-14 lg:h-64"
        >
          <span className={caption}>Height</span>
          <span className={figure}>{heightM.toFixed(2)} m</span>
        </Guide>

        {/* Scale person + 1.75 m guide (left side) */}
        <div className="pointer-events-none absolute bottom-16 left-28 z-10 hidden items-end gap-2.5 sm:bottom-20 sm:left-36 md:flex lg:left-48">
          <div className="relative h-32 w-10 sm:h-40 sm:w-12 lg:h-48">
            <Image
              src="/images/human copy.png"
              alt="Person 1.75 m tall, shown for scale"
              fill
              sizes="90px"
              className="object-contain object-bottom brightness-[0.25]"
              priority
            />
          </div>
          <Guide vertical className="relative h-32 sm:h-40 lg:h-48" pillClass="rounded-xl px-2 py-0.5">
            <span className={caption}>Person</span>
            <span className={figure}>1.75 m</span>
          </Guide>
        </div>

        {/* Width guide (bottom) */}
        <Guide
          className="pointer-events-none absolute bottom-18 left-1/2 z-10 w-52 -translate-x-1/2 sm:bottom-20 sm:w-72 lg:w-96"
          pillClass="rounded-full px-4 py-1"
        >
          <span className={figure}>Width: {widthM.toFixed(2)} m</span>
        </Guide>

        {/* Right settings card */}
        <div className="absolute right-4 top-1/2 z-20 flex w-[240px] -translate-y-1/2 flex-col gap-4 rounded-3xl border border-zinc-200/80 bg-white/95 p-5 shadow-[0_12px_40px_rgba(0,0,0,0.08)] backdrop-blur-md sm:right-6 sm:w-[260px] lg:right-8">
          <div className="flex flex-col gap-3">
            <SectionTitle icon={Layers}>Dimensions</SectionTitle>
            {steppers.map(({ label, panels, meters, onChange }) => (
              <div key={label} className="flex items-center justify-between text-xs">
                <span className="font-medium text-zinc-600">{label}</span>
                <div className="flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-zinc-50/80 px-2 py-1">
                  <button
                    type="button"
                    disabled={panels <= MIN_PANELS}
                    onClick={() => onChange?.(panels - 1)}
                    aria-label={`Decrease ${label.toLowerCase()}`}
                    className={stepBtn}
                  >
                    −
                  </button>
                  <span className="min-w-10 text-center font-mono font-bold text-zinc-900">
                    {meters.toFixed(2)}
                  </span>
                  <span className="font-mono text-[11px] text-zinc-500">m</span>
                  <button
                    type="button"
                    disabled={panels >= MAX_PANELS}
                    onClick={() => onChange?.(panels + 1)}
                    aria-label={`Increase ${label.toLowerCase()}`}
                    className={stepBtn}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="h-px w-full bg-zinc-100" />

          <button
            type="button"
            onClick={handleReset}
            className="mt-1 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-zinc-950 py-2.5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-zinc-800 active:scale-95"
          >
            <RotateCcw className="h-3.5 w-3.5 text-zinc-300" />
            Reset
          </button>
        </div>
      </div>

    </div>
  </div>
  );
}

export default ScreenVisualizer;