"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import Container from "@/components/ui/Container";
import Heading from "@/components/ui/Heading";
import Button from "@/components/ui/Button";
import { ProductDetailData } from "@/data/product-details";

interface ProductSpecsProps {
  product: ProductDetailData;
}

type Units = "metric" | "imperial";

const UNIT_OPTIONS: { value: Units; label: string }[] = [
  { value: "metric", label: "mm / kg" },
  { value: "imperial", label: "in / lbs" },
];

export function ProductSpecs({ product }: ProductSpecsProps) {
  const { variants } = product;
  const [variantId, setVariantId] = useState(variants[0]?.id);
  const [units, setUnits] = useState<Units>("metric");

  const variant = variants.find((v) => v.id === variantId) ?? variants[0];

  const specs = variant && [
    {
      label: "Pixel Pitch",
      value: `${variant.pitch} mm`,
      note: "Flip-Chip COB Matrix",
    },
    {
      label: "Cabinet Resolution",
      value: `${variant.resW} × ${variant.resH} px`,
      note: "Native 16:9 Geometry",
    },
    {
      label: "Peak Brightness",
      value: `${variant.brightness} nits`,
      note: "Calibrated HDR Output",
    },
    {
      label: "Contrast Ratio",
      value: variant.contrast,
      note: "Nanoscale True Void Black",
    },
    {
      label: "Refresh Rate",
      value: `${variant.refreshHz} Hz`,
      note: "High-Scan Cinema Driver",
    },
    {
      label: "Viewing Angle",
      value: variant.viewingAngle,
      note: "Zero Color Distortion",
    },
    {
      label: "Cabinet Dimensions",
      value: units === "metric" ? variant.dimensionsMm : variant.dimensionsIn,
      note: "38 mm Ultra-Shallow Depth",
    },
    {
      label: "Cabinet Weight",
      value:
        units === "metric"
          ? `${variant.weightKg} kg`
          : `${variant.weightLbs} lbs`,
      note: "Die-Cast Magnesium CNC",
    },
  ];

  return (
    <section
      id="specifications"
      className="w-full bg-white text-zinc-950 pt-20 sm:pt-28 lg:pt-32 border-t border-zinc-200 select-none"
    >
      <Container size="xl">
        {/* Centered Section Header using Heading component */}
        <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-12">
          
          <Heading
            as="h2"
            size="xl"
            align="center"
            variant="dark"
            className="w-full text-center"
          >
            Technical Specifications
          </Heading>
         
        </div>

        {/* Centered Controls: Variants & Unit Toggle */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 pb-10 border-b border-zinc-200">
          {/* Variant Selector */}
          {variants.length > 1 && (
            <div className="flex flex-wrap items-center justify-center gap-2">
              {variants.map((v) => (
                <button
                  key={v.id}
                  type="button"
                  aria-pressed={v.id === variant?.id}
                  onClick={() => setVariantId(v.id)}
                  className={`rounded-lg border px-3.5 py-1.5 text-xs font-mono font-semibold transition-all cursor-pointer ${
                    v.id === variant?.id
                      ? "border-black bg-black text-white shadow-sm"
                      : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-400"
                  }`}
                >
                  P{v.pitch}
                </button>
              ))}
            </div>
          )}

          {/* Unit Switcher */}
          <div
            role="group"
            aria-label="Units"
            className="flex shrink-0 gap-1 rounded-lg bg-zinc-100 p-1 border border-zinc-200"
          >
            {UNIT_OPTIONS.map((option) => (
              <button
                key={option.value}
                type="button"
                aria-pressed={units === option.value}
                onClick={() => setUnits(option.value)}
                className={`rounded-md px-3.5 py-1.5 text-xs font-mono font-medium transition-colors cursor-pointer ${
                  units === option.value
                    ? "bg-white text-zinc-950 shadow-sm font-semibold"
                    : "text-zinc-500 hover:text-zinc-950"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Streamlined Key Specifications Grid */}
        {specs && (
          <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 pt-2">
            {specs.map((item) => (
              <div
                key={item.label}
                className="flex flex-col justify-between p-5 rounded-2xl bg-zinc-50 border border-zinc-200/80 hover:border-zinc-300 transition-colors"
              >
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-500 block mb-2">
                    {item.label}
                  </span>
                  <div className="font-heading text-xl sm:text-2xl font-bold tracking-tight text-zinc-950 tabular-nums">
                    {item.value}
                  </div>
                </div>
                <p className="mt-3 pt-2.5 border-t border-zinc-200/60 font-mono text-[10px] text-[#B89240] uppercase tracking-wider">
                  {item.note}
                </p>
              </div>
            ))}
          </div>
        )}

        
      </Container>
    </section>
  );
}

export default ProductSpecs;
