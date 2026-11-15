"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import Button from "@/components/ui/Button";
import { PRODUCTS } from "@/data/products";

const CATEGORIES = [
  "All Products",
  "Fine Pitch",
  "Stage & Rental",
  "Outdoor Commercial",
  "Transparent Glass",
  "3D & Creative",
  "DOOH Display",
] as const;

export function ProductGridSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All Products");

  const filteredProducts =
    selectedCategory === "All Products"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === selectedCategory);

  return (
    <section
      id="products-grid"
      aria-labelledby="products-grid-heading"
      className="relative bg-[#F7F7F5] py-16 sm:py-24 lg:py-32 select-none overflow-hidden"
    >
      <Container size="xl">
        {/* Section Header */}
        <div className="max-w-5xl mx-auto mb-10 sm:mb-14 text-center">
          <Heading
            as="h2"
            id="products-grid-heading"
            size="xl"
            align="center"
            variant="dark"
          >
            Displays for every space.
          </Heading>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12 sm:mb-16">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs sm:text-sm px-4 py-2 rounded-full transition-all cursor-pointer font-medium ${
                selectedCategory === cat
                  ? "bg-black text-white shadow-xs"
                  : "bg-white/80 text-[#555555] hover:text-black hover:bg-white border border-[#E5E5E0]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Two-Column Product Grid Matching Home Section */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-8">
          {filteredProducts.map((product, idx) => (
            <article
              key={product.id}
              className="group/product relative flex flex-col justify-between min-h-[420px] sm:min-h-[480px] lg:min-h-[540px] p-6 sm:p-8 
                 rounded-2xl bg-zinc-200/50 border border-[#E5E5E0] 
                 transition-all duration-300 overflow-hidden"
            >
              {/* Dominant Product Image with Active Text & Action Buttons */}
              <div className="relative w-full flex-1 flex items-center justify-center my-2 sm:my-3 min-h-[320px] sm:min-h-[380px] lg:min-h-[420px]">
                <div className="relative w-full h-full max-w-[640px] flex items-center justify-center">
                  {/* Background Product Image */}
                  <Image
                    src={product.imageSrc}
                    alt={`${product.name} LED display panel`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-contain select-none pointer-events-none scale-110 sm:scale-115 
                    transition-all duration-500 group-hover/product:scale-[1.18] group-hover/product:translate-y-2 sm:group-hover/product:translate-y-4"
                    priority={idx < 2}
                  />

                  {/* Active Content: Headline, Summary & Action Buttons */}
                  <div className="absolute top-0 inset-x-0 flex flex-col items-center justify-start text-center z-20 px-4 pt-1">
                    {/* Product Headline */}
                    <Heading as="h3" size="lg" variant="dark" align="center" className="mb-1.5">
                      {product.name}
                    </Heading>

                    {/* Summary Copy */}
                    <p className="font-sans text-xs sm:text-sm text-zinc-700 font-normal max-w-md mb-3 sm:mb-4 leading-relaxed">
                      {product.tagline || product.summary}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-center gap-3 sm:gap-4">
                      <Link href={`/products/${product.id}`} draggable={false}>
                        <Button size="sm" variant="gold">
                          Learn more
                        </Button>
                      </Link>
                      <Link href="/contact" draggable={false}>
                        <Button size="sm" variant="white" className="border-2 border-black">
                          Inquire
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default ProductGridSection;
