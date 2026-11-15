"use client";

import React, { useState, useMemo } from "react";
import {
  UnitSystem,
  LedPitchVariant,
  ControllerSpec,
} from "./types";
import { LED_PRODUCTS } from "./data/products";
import { CONTROLLER_SPECS } from "./data/controllers";
import { calculateLedWall } from "./utils/calculations";
import { ScreenVisualizer } from "./screen-visualizer";

export interface CalculatorContainerProps {
  className?: string;
}

export function CalculatorContainer({
  className = "",
}: CalculatorContainerProps = {}) {
  const [unit] = useState<UnitSystem>("metric");

  // Selection States
  const [selectedVariant] = useState<LedPitchVariant>(
    LED_PRODUCTS[0].variants[0]
  );
  const [selectedController] = useState<ControllerSpec>(
    CONTROLLER_SPECS[0]
  );

  // Grid Dimensions (3x3 = 1.80m x 1.01m native 16:9)
  const [cols, setCols] = useState<number>(3);
  const [rows, setRows] = useState<number>(3);

  // Memoized Master Calculation Engine
  const calc = useMemo(() => {
    return calculateLedWall(cols, rows, selectedVariant, selectedController);
  }, [cols, rows, selectedVariant, selectedController]);

  const handleColsChange = (newCols: number) => {
    setCols(Math.min(7, Math.max(3, newCols)));
  };

  const handleRowsChange = (newRows: number) => {
    setRows(Math.min(7, Math.max(3, newRows)));
  };

  return (
    <div className={`w-full min-h-screen bg-[#F7F7F5] text-zinc-950 overflow-x-hidden ${className}`.trim()}>
      {/* Main Calculator Workflow Container full width 100vw */}
      <section className="h-[115dvh] w-screen max-w-[100vw] bg-[#F7F7F5] pt-14 pb-0 flex flex-col justify-between overflow-hidden">
        <ScreenVisualizer
          calc={calc}
          variant={selectedVariant}
          controller={selectedController}
          unit={unit}
          cols={cols}
          rows={rows}
          onChangeCols={handleColsChange}
          onChangeRows={handleRowsChange}
        />
      </section>
    </div>
  );
}

export default CalculatorContainer;
