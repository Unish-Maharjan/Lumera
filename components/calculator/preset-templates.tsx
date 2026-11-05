"use client";

import React from "react";

export interface PresetTemplate {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  productId: string;
  pitch: number;
  cols: number;
  rows: number;
}

export const PRESET_TEMPLATES: PresetTemplate[] = [
  {
    id: "boardroom-4k",
    title: "4K UHD Boardroom",
    subtitle: "Native 16:9 MicroLED (163-inch)",
    tag: "Flagship 4K",
    productId: "lumera-matrix",
    pitch: 0.93,
    cols: 6,
    rows: 6,
  },
  {
    id: "boardroom-1080p",
    title: "1080p Full HD Wall",
    subtitle: "Standard 16:9 Meeting Space (130-inch)",
    tag: "Meeting Room",
    productId: "lumera-matrix",
    pitch: 1.56,
    cols: 5,
    rows: 5,
  },
  {
    id: "commercial-billboard",
    title: "DOOH Commercial Billboard",
    subtitle: "8.0m x 4.0m High-Brightness 10,000 Nits",
    tag: "Outdoor Facade",
    productId: "lumera-strata",
    pitch: 3.9,
    cols: 16,
    rows: 4,
  },
  {
    id: "concert-stage",
    title: "Concert Touring Wall",
    subtitle: "12.0m x 6.0m 7,680Hz Arena Stage",
    tag: "Concert & Touring",
    productId: "lumera-vortex",
    pitch: 2.97,
    cols: 24,
    rows: 12,
  },
  {
    id: "virtual-production-xr",
    title: "Virtual Production XR Volume",
    subtitle: "10.0m x 4.0m Film Background Studio",
    tag: "Virtual Studio",
    productId: "lumera-vortex",
    pitch: 1.95,
    cols: 20,
    rows: 8,
  },
  {
    id: "transparent-retail",
    title: "Transparent Glass Showcase",
    subtitle: "6.0m x 3.0m Architectural Storefront",
    tag: "82% Transparent",
    productId: "lumera-crystal",
    pitch: 3.91,
    cols: 6,
    rows: 6,
  },
];

interface PresetTemplatesProps {
  onSelectPreset: (preset: PresetTemplate) => void;
  activePresetId?: string;
}

export function PresetTemplates({
  onSelectPreset,
  activePresetId,
}: PresetTemplatesProps) {
  return (
    <div className="w-full mb-8 select-none">
      <div className="flex items-center justify-between mb-3.5">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono tracking-widest text-zinc-400 uppercase">
            QUICK ARCHITECTURAL PRESETS
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent/15 text-accent font-medium">
            1-Click Setups
          </span>
        </div>
        <span className="text-xs text-zinc-400 hidden sm:inline">
          Select a template to prefill dimensions and panel specs
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {PRESET_TEMPLATES.map((preset) => {
          const isActive = activePresetId === preset.id;
          return (
            <button
              key={preset.id}
              type="button"
              onClick={() => onSelectPreset(preset)}
              className={`flex flex-col text-left p-3 rounded-xl border transition-all duration-200 cursor-pointer ${
                isActive
                  ? "bg-accent/10 border-accent text-white shadow-lg shadow-accent/10"
                  : "bg-zinc-950/60 border-white/10 hover:border-white/25 text-zinc-300 hover:text-white"
              }`}
            >
              <span className="text-[10px] font-mono text-accent uppercase font-medium mb-1">
                {preset.tag}
              </span>
              <span className="text-xs font-medium text-white line-clamp-1">
                {preset.title}
              </span>
              <span className="text-[11px] text-zinc-400 font-light mt-0.5 line-clamp-1">
                {preset.subtitle}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

