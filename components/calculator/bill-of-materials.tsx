"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CalculationResult, LedProduct, LedPitchVariant, ControllerSpec, UnitSystem } from "./types";

interface BillOfMaterialsProps {
  calc: CalculationResult;
  product: LedProduct;
  variant: LedPitchVariant;
  controller: ControllerSpec;
  unit: UnitSystem;
}

export function BillOfMaterials({
  calc,
  product,
  variant,
  controller,
  unit,
}: BillOfMaterialsProps) {
  const [copied, setCopied] = useState(false);

  // BOM Quantities
  const totalPanels = calc.totalCabinets;
  const sparePanels = Math.max(1, Math.ceil(totalPanels * 0.03)); // 3% safety spare
  const dataPorts = calc.minEthernetPorts;
  const mainDataCables = dataPorts;
  const patchDataCables = Math.max(0, totalPanels - dataPorts);
  const mainPowerCables = calc.recommended16ACircuits;
  const patchPowerCables = Math.max(0, totalPanels - mainPowerCables);
  const hangingBars = calc.recommendedHangingBars;
  const controllerCount = calc.requiredControllers;

  const bomItems = [
    {
      item: "LED Display Cabinets",
      description: `${product.name} - ${variant.name} (${variant.cabWidthMm}x${variant.cabHeightMm}mm, ${variant.resWidth}x${variant.resHeight}px)`,
      qty: totalPanels,
      unit: "pcs",
      category: "Primary Hardware",
    },
    {
      item: "Spare Panels / Modules",
      description: `Recommended 3% safety operational spare panels & module components`,
      qty: sparePanels,
      unit: "pcs",
      category: "Spares",
    },
    {
      item: "Master Video Processor",
      description: `${controller.name} (${controller.ports} Ports, ${controller.maxInputResolution})`,
      qty: controllerCount,
      unit: "unit",
      category: "Processing",
    },
    {
      item: "Main Gigabit Data Feeds",
      description: `Neutrik etherCON Cat6 High-Flex Shielded Trunk Cable (30m - 50m)`,
      qty: mainDataCables,
      unit: "lines",
      category: "Cabling",
    },
    {
      item: "Inter-Cabinet Data Jumpers",
      description: `Short Cat6 shielded intra-cabinet patch jumpers (0.6m - 1.2m)`,
      qty: patchDataCables,
      unit: "pcs",
      category: "Cabling",
    },
    {
      item: "Main AC Power Feeders",
      description: `Heavy-duty industrial AC power input cables (16A / 230V rated)`,
      qty: mainPowerCables,
      unit: "runs",
      category: "Electrical",
    },
    {
      item: "Cabinet Power Jumpers",
      description: `Neutrik powerCON TRUE1 link cables for serial power daisy-chaining`,
      qty: patchPowerCables,
      unit: "pcs",
      category: "Electrical",
    },
    {
      item: "Structural Rigging Bars",
      description: `Engineered quick-lock hanging beams with dual truss clamp attachments`,
      qty: hangingBars,
      unit: "bars",
      category: "Rigging",
    },
  ];

  const handleCopySummary = () => {
    const text = `
========================================
LUMERA VENTURES • TECHNICAL SPECIFICATION
========================================
Project Configuration:
• Product: ${product.name} (${variant.name})
• Dimensions: ${calc.widthM}m W x ${calc.heightM}m H (${calc.widthFt}ft x ${calc.heightFt}ft)
• Grid: ${calc.cols} Columns x ${calc.rows} Rows (${calc.totalCabinets} Panels)
• Diagonal: ${calc.diagonalInches}" (${calc.diagonalM}m) • Area: ${calc.areaSqm} m² (${calc.areaSqft} sq ft)
• Aspect Ratio: ${calc.aspectRatioExact} (${calc.closestStandardAspect})

Resolution & Optics:
• Screen Resolution: ${calc.resWidth} x ${calc.resHeight} Pixels (${calc.megaPixels} MP)
• Pixel Pitch: ${variant.pitch}mm • Density: ${calc.pixelDensitySqm.toLocaleString()} px/m²
• Optimal Viewing Distance: ${calc.optimalViewingDistM}m (${calc.optimalViewingDistFt}ft)
• Retina Acuity Distance: ${calc.retinaViewingDistM}m (${calc.retinaViewingDistFt}ft)

Power & Structural:
• Max Power Draw: ${calc.maxPowerKw} kW (${calc.maxPowerWatts} W)
• Average Power: ${calc.avgPowerKw} kW (${calc.avgPowerWatts} W)
• AC Current @ 230V: ${calc.current230VAmps} A (${calc.recommended16ACircuits} x 16A circuits)
• Heat Output: ${calc.heatBtuHr.toLocaleString()} BTU/hr
• Total Weight: ${calc.totalWeightKg} kg (${calc.totalWeightLbs} lbs)
• Structural Rigging: ${hangingBars} Hanging Bars

Video Processing:
• Controller: ${controller.name} (${controllerCount} Units)
• Ethernet Data Ports: ${calc.minEthernetPorts} Ports
• Max Panels/Port: ${calc.maxCabinetsPerPort} Panels
========================================
Generated via Lumera Pro Architect Calculator
https://lumeraventures.com/calculator
========================================
`.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full rounded-2xl border border-white/10 bg-zinc-950/80 p-5 sm:p-7 backdrop-blur-md select-none">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <span className="text-xs font-mono tracking-widest text-accent uppercase font-medium">
            STEP 05 • BILL OF MATERIALS & PROCUREMENT
          </span>
          <h2 className="text-lg sm:text-xl font-heading font-medium text-white uppercase tracking-tight mt-0.5">
            Equipment Bill of Materials (BOM) & Quote Package
          </h2>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={handleCopySummary}
            className="px-4 py-2 rounded-xl border border-white/15 bg-zinc-900 hover:bg-zinc-800 text-xs font-medium text-white transition-all cursor-pointer flex items-center gap-1.5"
          >
            <span>{copied ? "✓" : "📋"}</span>
            <span>{copied ? "Copied to Clipboard!" : "Copy Technical Brief"}</span>
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl border border-white/15 bg-zinc-900 hover:bg-zinc-800 text-xs font-medium text-white transition-all cursor-pointer flex items-center gap-1.5"
          >
            <span>🖨️</span>
            <span>Print / Save PDF</span>
          </button>

          <Link
            href={`/contact?subject=${encodeURIComponent(
              `LED Video Wall Inquiry: ${product.name} ${calc.widthM}x${calc.heightM}m (${calc.cols}x${calc.rows})`
            )}`}
            className="px-4 py-2 rounded-xl bg-accent text-black font-semibold text-xs hover:bg-[#c9a65f] transition-all cursor-pointer shadow-lg shadow-accent/20 flex items-center gap-1.5"
          >
            <span>Request Official Engineering Quote →</span>
          </Link>
        </div>
      </div>

      {/* Itemized Table */}
      <div className="overflow-x-auto rounded-xl border border-white/10 bg-black/60">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-white/10 bg-zinc-900/60 font-mono text-zinc-400 uppercase text-[11px]">
              <th className="py-3 px-4">Item & Description</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4 text-center">Qty</th>
              <th className="py-3 px-4 text-right">Unit</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 font-sans">
            {bomItems.map((item, idx) => (
              <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                <td className="py-3 px-4">
                  <span className="font-semibold text-white block">
                    {item.item}
                  </span>
                  <span className="text-[11px] text-zinc-400 font-light">
                    {item.description}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-zinc-900 text-zinc-300 border border-white/10">
                    {item.category}
                  </span>
                </td>
                <td className="py-3 px-4 text-center font-mono font-bold text-accent text-sm">
                  {item.qty}
                </td>
                <td className="py-3 px-4 text-right font-mono text-zinc-400">
                  {item.unit}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary Footer Note */}
      <div className="mt-4 p-4 rounded-xl bg-zinc-900/40 border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-400">
        <p className="font-light leading-relaxed">
          * Cable lengths and exact rigging brackets are estimated based on standard staging topologies.
          For structural engineering certificates and custom architectural drawings, contact Lumera Engineering.
        </p>
        <span className="shrink-0 text-accent font-mono font-medium">
          Total Weight: {unit === "metric" ? `${calc.totalWeightKg} kg` : `${calc.totalWeightLbs} lbs`}
        </span>
      </div>
    </div>
  );
}

