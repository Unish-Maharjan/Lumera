"use client";

import { useState } from "react";
import Container from "@/components/ui/Container";
import Heading from "@/components/ui/Heading";
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
    },
    {
      label: "Cabinet Resolution",
      value: `${variant.resW} × ${variant.resH} px`,
    },
    {
      label: "Peak Brightness",
      value: `${variant.brightness} nits`,
    },
    {
      label: "Contrast Ratio",
      value: variant.contrast,
    },
    {
      label: "Refresh Rate",
      value: `${variant.refreshHz} Hz`,
    },
    {
      label: "Viewing Angle",
      value: variant.viewingAngle,
    },
    {
      label: "Cabinet Dimensions",
      value: units === "metric" ? variant.dimensionsMm : variant.dimensionsIn,
    },
    {
      label: "Cabinet Weight",
      value:
        units === "metric"
          ? `${variant.weightKg} kg`
          : `${variant.weightLbs} lbs`,
    },
  ];

  return (
    <section
      id="specifications"
      className="w-full bg-white text-zinc-950 py-16 sm:py-20 lg:py-24 select-none"
    >
      <Container size="xl">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-14">
          <Heading
            as="h2"
            size="xl"
            align="center"
            variant="dark"
            className="text-zinc-950 uppercase"
          >
            Technical Specifications
          </Heading>
        </div>

        {/* Minimalist Controls: Variants & Unit Toggle */}
        {(variants.length > 1 || UNIT_OPTIONS.length > 0) && (
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6">
            {/* Pitch Variant Pills */}
            {variants.length > 1 && (
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider mr-1 hidden sm:inline">
                  Pitch:
                </span>
                {variants.map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    aria-pressed={v.id === variant?.id}
                    onClick={() => setVariantId(v.id)}
                    className={`px-3 py-1.5 text-xs font-mono font-semibold rounded-full transition-all cursor-pointer ${
                      v.id === variant?.id
                        ? "bg-zinc-950 text-white"
                        : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                    }`}
                  >
                    P{v.pitch}
                  </button>
                ))}
              </div>
            )}

            {/* Units Toggle */}
            <div className="flex items-center gap-1 ml-auto bg-zinc-100 p-1 rounded-full">
              {UNIT_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  aria-pressed={units === option.value}
                  onClick={() => setUnits(option.value)}
                  className={`px-3 py-1 text-xs font-mono rounded-full transition-all cursor-pointer ${
                    units === option.value
                      ? "bg-white text-zinc-950 font-semibold shadow-xs"
                      : "text-zinc-500 hover:text-zinc-950"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Clean Architectural Spec Grid */}
        {specs && (
          <dl className="grid grid-cols-2 lg:grid-cols-4 border-t border-zinc-200">
            {specs.map((item) => (
              <div
                key={item.label}
                className="py-6 sm:py-8 border-b border-zinc-200 pr-4 sm:pr-8 flex flex-col justify-start"
              >
                <dt className="text-xs sm:text-sm font-mono text-zinc-500 uppercase tracking-wider mb-2">
                  {item.label}
                </dt>
                <dd className="font-heading text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-zinc-950 tabular-nums">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        )}
      </Container>
    </section>
  );
}

export default ProductSpecs;
