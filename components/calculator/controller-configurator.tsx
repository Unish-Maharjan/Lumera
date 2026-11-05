"use client";

import React, { useState } from "react";
import { ControllerSpec, CalculationResult } from "./types";
import { CONTROLLER_SPECS } from "./data/controllers";

interface ControllerConfiguratorProps {
  selectedController: ControllerSpec;
  onSelectController: (controller: ControllerSpec) => void;
  calc: CalculationResult;
}

export function ControllerConfigurator({
  selectedController,
  onSelectController,
  calc,
}: ControllerConfiguratorProps) {
  const [enableRedundancy, setEnableRedundancy] = useState<boolean>(false);

  const effectivePorts = enableRedundancy
    ? calc.minEthernetPorts * 2
    : calc.minEthernetPorts;
  const effectiveControllers = enableRedundancy
    ? Math.max(1, Math.ceil(effectivePorts / selectedController.ports))
    : calc.requiredControllers;

  return (
    <div className="w-full rounded-2xl border border-white/10 bg-zinc-950/80 p-5 sm:p-7 backdrop-blur-md mb-8 select-none">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <span className="text-xs font-mono tracking-widest text-accent uppercase font-medium">
            STEP 04 • HARDWARE & DATA ROUTING
          </span>
          <h2 className="text-lg sm:text-xl font-heading font-medium text-white uppercase tracking-tight mt-0.5">
            Video Processor & Port Distribution
          </h2>
        </div>

        {/* Loop Redundancy Switch */}
        <div className="flex items-center gap-3 px-3 py-1.5 rounded-xl bg-black/60 border border-white/10">
          <span className="text-xs text-zinc-400 font-mono">Dual-Loop Redundancy:</span>
          <button
            type="button"
            onClick={() => setEnableRedundancy(!enableRedundancy)}
            className={`w-10 h-5 rounded-full p-0.5 transition-colors cursor-pointer flex items-center ${
              enableRedundancy ? "bg-accent justify-end" : "bg-zinc-700 justify-start"
            }`}
          >
            <span className="w-4 h-4 rounded-full bg-black shadow-md" />
          </button>
          <span
            className={`text-xs font-mono font-semibold ${
              enableRedundancy ? "text-accent" : "text-zinc-500"
            }`}
          >
            {enableRedundancy ? "ON (2x Ports)" : "OFF"}
          </span>
        </div>
      </div>

      {/* Controller Selection Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 mb-6">
        {CONTROLLER_SPECS.map((ctrl) => {
          const isSelected = selectedController.id === ctrl.id;
          return (
            <button
              key={ctrl.id}
              type="button"
              onClick={() => onSelectController(ctrl)}
              className={`p-4 rounded-xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? "bg-accent/10 border-accent shadow-lg shadow-accent/10"
                  : "bg-zinc-900/60 border-white/10 hover:border-white/25 hover:bg-zinc-900"
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-xs font-bold text-white tracking-wide">
                    {ctrl.name}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-accent font-semibold shrink-0">
                    {ctrl.ports} Ports
                  </span>
                </div>
                <span className="text-[11px] text-zinc-400 font-mono block mb-2">
                  Max: {(ctrl.maxPixels / 1000000).toFixed(1)}M Pixels • {ctrl.maxInputResolution}
                </span>
                <p className="text-[11px] text-zinc-400 font-light line-clamp-2 mb-3">
                  {ctrl.description}
                </p>
              </div>

              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-zinc-500">
                <span>Inputs: {ctrl.inputs.split(",").slice(0, 2).join(", ")}</span>
                {isSelected && (
                  <span className="text-accent font-semibold">Active Selection ✓</span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Data Routing & Capacity Metrics Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 p-4 rounded-xl bg-black/60 border border-white/5 text-center">
        <div className="p-2">
          <span className="text-[10px] font-mono text-zinc-500 uppercase block mb-1">
            Data Ports Required
          </span>
          <span className="text-xl sm:text-2xl font-bold font-mono text-accent">
            {effectivePorts} Ports
          </span>
          <span className="text-[10px] text-zinc-400 font-mono block mt-0.5">
            Gigabit Ethernet runs
          </span>
        </div>

        <div className="p-2">
          <span className="text-[10px] font-mono text-zinc-500 uppercase block mb-1">
            Units Required
          </span>
          <span className="text-xl sm:text-2xl font-bold font-mono text-white">
            {effectiveControllers} {effectiveControllers === 1 ? "Unit" : "Units"}
          </span>
          <span className="text-[10px] text-zinc-400 font-mono block mt-0.5">
            {selectedController.name.split(" ")[1] || selectedController.name}
          </span>
        </div>

        <div className="p-2">
          <span className="text-[10px] font-mono text-zinc-500 uppercase block mb-1">
            Max Panels per Port
          </span>
          <span className="text-xl sm:text-2xl font-bold font-mono text-white">
            {calc.maxCabinetsPerPort} Panels
          </span>
          <span className="text-[10px] text-zinc-400 font-mono block mt-0.5">
            Daisy-chain cascading limit
          </span>
        </div>

        <div className="p-2">
          <span className="text-[10px] font-mono text-zinc-500 uppercase block mb-1">
            Port Headroom Load
          </span>
          <span className="text-xl sm:text-2xl font-bold font-mono text-emerald-400">
            {calc.portUtilizationPercent}%
          </span>
          <span className="text-[10px] text-zinc-400 font-mono block mt-0.5">
            {calc.portUtilizationPercent < 90 ? "Optimal Safety Headroom" : "High Capacity Load"}
          </span>
        </div>
      </div>
    </div>
  );
}
