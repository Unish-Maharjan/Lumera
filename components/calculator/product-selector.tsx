"use client";

import React, { useState } from "react";
import Image from "next/image";
import { LedProduct, LedPitchVariant, ProductCategory } from "./types";
import { LED_PRODUCTS } from "./data/products";

interface ProductSelectorProps {
  selectedProduct: LedProduct;
  onSelectProduct: (product: LedProduct) => void;
  selectedVariant: LedPitchVariant;
  onSelectVariant: (variant: LedPitchVariant) => void;
}

const CATEGORIES: ProductCategory[] = [
  "All",
  "MicroLED",
  "Stage & Rental",
  "Outdoor Commercial",
  "DOOH Display",
  "Transparent Glass",
  "Absen Compatible",
];

export function ProductSelector({
  selectedProduct,
  onSelectProduct,
  selectedVariant,
  onSelectVariant,
}: ProductSelectorProps) {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>("All");

  const filteredProducts =
    activeCategory === "All"
      ? LED_PRODUCTS
      : LED_PRODUCTS.filter(
          (p) =>
            p.category === activeCategory ||
            (activeCategory === "Absen Compatible" && p.brand === "Absen Compatible")
        );

  return (
    <div className="w-full rounded-2xl border border-white/10 bg-zinc-950/80 p-5 sm:p-7 backdrop-blur-md mb-8 select-none">
      {/* Header and Category Filter */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <span className="text-xs font-mono tracking-widest text-accent uppercase font-medium">
            STEP 01
          </span>
          <h2 className="text-lg sm:text-xl font-heading font-medium text-white uppercase tracking-tight mt-0.5">
            Select LED Panel Series & Pixel Pitch
          </h2>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activeCategory === cat
                  ? "bg-accent text-black font-semibold shadow-sm"
                  : "bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Series Cards (Horizontally scrollable / grid) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5 mb-6">
        {filteredProducts.map((product) => {
          const isSelected = selectedProduct.id === product.id;
          return (
            <button
              key={product.id}
              type="button"
              onClick={() => {
                onSelectProduct(product);
                // default to first variant
                if (product.variants.length > 0) {
                  onSelectVariant(product.variants[0]);
                }
              }}
              className={`flex items-start gap-3.5 p-3.5 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                isSelected
                  ? "bg-accent/10 border-accent shadow-lg shadow-accent/10"
                  : "bg-zinc-900/60 border-white/10 hover:border-white/25 hover:bg-zinc-900"
              }`}
            >
              <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 border border-white/10 bg-black">
                <Image
                  src={product.imageSrc}
                  alt={product.name}
                  fill
                  sizes="64px"
                  className="object-cover object-center"
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1 mb-0.5">
                  <span className="text-xs font-semibold text-white tracking-wide truncate">
                    {product.name}
                  </span>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-accent shrink-0 animate-ping" />
                  )}
                </div>
                <span className="text-[10px] text-accent font-mono block mb-1">
                  {product.badge}
                </span>
                <p className="text-[11px] text-zinc-400 line-clamp-2 leading-relaxed">
                  {product.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Pitch Selector & Detailed Cabinet Specs */}
      <div className="pt-5 border-t border-white/10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-400 font-medium uppercase font-mono">
              Available Pixel Pitches for {selectedProduct.name}:
            </span>
          </div>

          {/* Pixel Pitch Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {selectedProduct.variants.map((v) => {
              const isSelected = selectedVariant.pitch === v.pitch;
              return (
                <button
                  key={v.name}
                  type="button"
                  onClick={() => onSelectVariant(v)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? "bg-accent text-black font-semibold shadow-md shadow-accent/20"
                      : "bg-zinc-900 border border-white/10 text-zinc-300 hover:text-white hover:border-white/30"
                  }`}
                >
                  <span className="font-mono">{v.name}</span>
                  <span className="text-[10px] opacity-75">
                    ({v.cabWidthMm}x{v.cabHeightMm}mm)
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Cabinet Technical Metadata Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5 p-3 rounded-xl bg-black/60 border border-white/5 text-center">
          <div className="p-2">
            <span className="text-[10px] font-mono text-zinc-500 uppercase block">
              Cabinet Size (WxH)
            </span>
            <span className="text-xs font-semibold text-white font-mono">
              {selectedVariant.cabWidthMm} x {selectedVariant.cabHeightMm} mm
            </span>
          </div>
          <div className="p-2">
            <span className="text-[10px] font-mono text-zinc-500 uppercase block">
              Cabinet Resolution
            </span>
            <span className="text-xs font-semibold text-white font-mono">
              {selectedVariant.resWidth} x {selectedVariant.resHeight} px
            </span>
          </div>
          <div className="p-2">
            <span className="text-[10px] font-mono text-zinc-500 uppercase block">
              Cabinet Weight
            </span>
            <span className="text-xs font-semibold text-accent font-mono">
              {selectedVariant.weightKg} kg ({(selectedVariant.weightKg * 2.20462).toFixed(1)} lbs)
            </span>
          </div>
          <div className="p-2">
            <span className="text-[10px] font-mono text-zinc-500 uppercase block">
              Max / Avg Power
            </span>
            <span className="text-xs font-semibold text-white font-mono">
              {selectedVariant.maxPowerW}W / {selectedVariant.avgPowerW}W
            </span>
          </div>
          <div className="p-2">
            <span className="text-[10px] font-mono text-zinc-500 uppercase block">
              Max Brightness
            </span>
            <span className="text-xs font-semibold text-white font-mono">
              {selectedVariant.brightnessNits.toLocaleString()} Nits
            </span>
          </div>
          <div className="p-2">
            <span className="text-[10px] font-mono text-zinc-500 uppercase block">
              Protection / Service
            </span>
            <span className="text-xs font-semibold text-zinc-300 font-mono">
              {selectedVariant.ipRating} • {selectedVariant.maintenanceAccess}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

