"use client";

import React, { useState, useMemo } from "react";
import { Container } from "@/components/ui/Container";
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
  className = "py-16 sm:py-20 lg:py-24",
}: CalculatorContainerProps = {}) {
  const [unit] = useState<UnitSystem>("metric");

  // Selection States
  const [selectedVariant] = useState<LedPitchVariant>(
    LED_PRODUCTS[0].variants[0]
  );
  const [selectedController] = useState<ControllerSpec>(
    CONTROLLER_SPECS[0]
  );

  // Grid Dimensions
  const [cols, setCols] = useState<number>(6);
  const [rows, setRows] = useState<number>(6);

  // Memoized Master Calculation Engine
  const calc = useMemo(() => {
    return calculateLedWall(cols, rows, selectedVariant, selectedController);
  }, [cols, rows, selectedVariant, selectedController]);

  const handleColsChange = (newCols: number) => {
    setCols(newCols);
  };

  const handleRowsChange = (newRows: number) => {
    setRows(newRows);
  };

  return (
    <div className={`w-full bg-[#F7F7F5] text-zinc-950 ${className}`.trim()}>
      {/* Main Calculator Workflow Container - Exact 100vh / 100dvh */}
      <section className="h-screen h-[100dvh] max-h-screen max-h-[100dvh] w-full bg-[#F7F7F5] py-4 sm:py-6 px-2 sm:px-4 flex flex-col justify-between overflow-hidden">
        <Container size="xl" className="h-full flex flex-col justify-between overflow-hidden">
          {/* Interactive 2D Visualizer, Dimension Steppers, Aspect Presets & Human Scale CAD */}
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
        </Container>
      </section>
    </div>
  );
}

export default CalculatorContainer;
