"use client";

import React, { useState, useMemo } from "react";
import { Container } from "@/components/ui/Container";
import {
  CalculationMode,
  UnitSystem,
  LedProduct,
  LedPitchVariant,
  ControllerSpec,
} from "./types";
import { LED_PRODUCTS } from "./data/products";
import { CONTROLLER_SPECS } from "./data/controllers";
import { calculateLedWall } from "./utils/calculations";

// Modular Components
import { CalculatorHero } from "./calculator-hero";
import { PresetTemplates, PresetTemplate } from "./preset-templates";
import { ProductSelector } from "./product-selector";
import { ScreenVisualizer } from "./screen-visualizer";
import { SpecificationsPanel } from "./specifications-panel";
import { ControllerConfigurator } from "./controller-configurator";
import { BillOfMaterials } from "./bill-of-materials";

export function CalculatorContainer() {
  // Global Settings
  const [mode, setMode] = useState<CalculationMode>("grid");
  const [unit, setUnit] = useState<UnitSystem>("metric");

  // Selection States
  const [selectedProduct, setSelectedProduct] = useState<LedProduct>(LED_PRODUCTS[0]);
  const [selectedVariant, setSelectedVariant] = useState<LedPitchVariant>(
    LED_PRODUCTS[0].variants[0]
  );
  const [selectedController, setSelectedController] = useState<ControllerSpec>(
    CONTROLLER_SPECS[0]
  );

  // Grid Dimensions
  const [cols, setCols] = useState<number>(6);
  const [rows, setRows] = useState<number>(6);
  const [activePresetId, setActivePresetId] = useState<string | undefined>("boardroom-4k");

  // Memoized Master Calculation Engine
  const calc = useMemo(() => {
    return calculateLedWall(cols, rows, selectedVariant, selectedController);
  }, [cols, rows, selectedVariant, selectedController]);

  // Handle Preset selection
  const handleSelectPreset = (preset: PresetTemplate) => {
    setActivePresetId(preset.id);
    const targetProd =
      LED_PRODUCTS.find((p) => p.id === preset.productId) || LED_PRODUCTS[0];
    const targetVar =
      targetProd.variants.find((v) => Math.abs(v.pitch - preset.pitch) < 0.05) ||
      targetProd.variants[0];

    setSelectedProduct(targetProd);
    setSelectedVariant(targetVar);
    setCols(preset.cols);
    setRows(preset.rows);
  };

  const handleColsChange = (newCols: number) => {
    setActivePresetId(undefined);
    setCols(newCols);
  };

  const handleRowsChange = (newRows: number) => {
    setActivePresetId(undefined);
    setRows(newRows);
  };

  const handleProductChange = (prod: LedProduct) => {
    setActivePresetId(undefined);
    setSelectedProduct(prod);
  };

  const handleVariantChange = (v: LedPitchVariant) => {
    setActivePresetId(undefined);
    setSelectedVariant(v);
  };

  return (
    <div className="w-full min-h-screen bg-[#F7F7F5] text-zinc-950">
      {/* Hero Header */}
      {/* <CalculatorHero
        mode={mode}
        onModeChange={setMode}
        unit={unit}
        onUnitChange={setUnit}
      /> */}

      {/* Main Calculator Workflow Container */}
      <section className="pt-10 sm:pt-14 bg-[#F7F7F5]">
        <Container size="xl">
          {/* Quick Real-World Presets */}
          {/* <PresetTemplates
            onSelectPreset={handleSelectPreset}
            activePresetId={activePresetId}
          /> */}

          {/* Step 1: Panel & Pitch Selector */}
          {/* <ProductSelector
            selectedProduct={selectedProduct}
            onSelectProduct={handleProductChange}
            selectedVariant={selectedVariant}
            onSelectVariant={handleVariantChange}
          /> */}

        

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

          {/* Step 3: Technical Specifications Panel */}
          <SpecificationsPanel
            calc={calc}
            variant={selectedVariant}
            unit={unit}
          />

          

          {/* Step 4: Video Processor & Data Routing */}
          {/* <ControllerConfigurator
            selectedController={selectedController}
            onSelectController={setSelectedController}
            calc={calc}
          /> */}

          {/* Step 5: Bill of Materials & Procurement */}
          {/* <BillOfMaterials
            calc={calc}
            product={selectedProduct}
            variant={selectedVariant}
            controller={selectedController}
            unit={unit}
          /> */}
        </Container>
      </section>
    </div>
  );
}

export default CalculatorContainer;
