"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import { ProductDetailData, GalleryItem } from "@/data/product-details";

interface ProductGalleryProps {
  product: ProductDetailData;
}

export function ProductGallery({ product }: ProductGalleryProps) {
  const { gallery } = product;
  const [selectedTag, setSelectedTag] = useState<string>("All");
  const [activeModalItem, setActiveModalItem] = useState<GalleryItem | null>(null);

  // Extract unique tags
  const tags = ["All", ...Array.from(new Set(gallery.map((g) => g.tag)))];

  const filteredItems =
    selectedTag === "All"
      ? gallery
      : gallery.filter((g) => g.tag === selectedTag);

  // Keyboard accessibility: ESC key dismisses modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveModalItem(null);
      }
    };
    if (activeModalItem) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeModalItem]);

  return (
    <section
      id="gallery"
      className="w-full bg-black text-white py-28 sm:py-36 lg:py-44 border-t border-white/[0.08]"
    >
      <Container size="xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#D7B875] mb-3 block">
              VISUAL REPERTORY
            </span>
            <h2 className="font-heading text-4xl sm:text-6xl font-bold uppercase tracking-tight text-white leading-none">
              PHOTOGRAPHIC GALLERY.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-zinc-400 font-light">
              High-resolution detail shots, mechanical profiles, and real-world architectural installations.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-white/5 border border-white/10 shrink-0">
            {tags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setSelectedTag(tag)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
                  selectedTag === tag
                    ? "bg-[#D7B875] text-black shadow-md"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Editorial Asymmetric Photo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item, index) => {
            // First item spans 2 columns on desktop for dynamic hierarchy
            const isFeatured = index === 0 && selectedTag === "All";
            return (
              <div
                key={item.id}
                role="button"
                tabIndex={0}
                onClick={() => setActiveModalItem(item)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiveModalItem(item);
                  }
                }}
                className={`group relative rounded-3xl overflow-hidden border border-white/[0.08] bg-[#0E0E10] cursor-pointer hover:border-[#D7B875]/50 transition-all duration-500 focus-visible:ring-2 focus-visible:ring-[#D7B875] outline-none ${
                  isFeatured
                    ? "md:col-span-2 lg:col-span-2 min-h-[380px] sm:min-h-[460px]"
                    : "min-h-[320px] sm:min-h-[360px]"
                }`}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes={
                    isFeatured
                      ? "(max-width: 1024px) 100vw, 66vw"
                      : "(max-width: 768px) 100vw, 33vw"
                  }
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Subtle vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

                {/* Tag pill */}
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 border border-white/20 text-[10px] font-mono uppercase text-[#D7B875] backdrop-blur-md">
                  {item.tag}
                </div>

                {/* Bottom Caption */}
                <div className="absolute bottom-5 inset-x-5">
                  <h3 className="font-heading text-lg sm:text-xl font-bold uppercase text-white leading-tight">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-xs text-zinc-300 font-light line-clamp-2">
                    {item.caption}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>

      {/* Lightbox Inspection Modal */}
      {activeModalItem && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
          onClick={() => setActiveModalItem(null)}
        >
          <div
            className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveModalItem(null)}
              className="absolute -top-12 right-0 text-white/70 hover:text-white font-mono text-sm cursor-pointer p-2"
            >
              Close [ESC] ✕
            </button>

            <div className="relative w-full aspect-[16/10] max-h-[70vh] rounded-2xl overflow-hidden border border-white/20 bg-zinc-950">
              <Image
                src={activeModalItem.image}
                alt={activeModalItem.title}
                fill
                priority
                sizes="100vw"
                className="object-contain object-center"
              />
            </div>

            <div className="mt-4 text-center">
              <span className="text-xs font-mono text-[#D7B875] uppercase">
                {activeModalItem.tag}
              </span>
              <h4 className="font-heading text-xl font-bold text-white mt-1">
                {activeModalItem.title}
              </h4>
              <p className="text-xs text-zinc-400 mt-1 max-w-lg mx-auto">
                {activeModalItem.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default ProductGallery;
