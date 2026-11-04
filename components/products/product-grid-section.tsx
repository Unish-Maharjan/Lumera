"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  priceOrSpec: string;
  imageSrc: string;
}

const PRODUCTS_DATA: Product[] = [
  {
    id: "lumera-vortex",
    name: "LUMERA VORTEX",
    category: "Stage & Rental",
    description: "High-refresh virtual production & modular stage video panels.",
    priceOrSpec: "7,680 Hz",
    imageSrc: "/products/product-2.webp",
  },
  {
    id: "lumera-strata",
    name: "LUMERA STRATA",
    category: "Outdoor Commercial",
    description: "High-brightness architectural facade and digital billboard display.",
    priceOrSpec: "10,000 Nits",
    imageSrc: "/products/product-3.webp",
  },
  {
    id: "lumera-crystal",
    name: "LUMERA CRYSTAL",
    category: "Transparent Glass",
    description: "82% high-transparency architectural glass LED wall.",
    priceOrSpec: "82% Clarity",
    imageSrc: "/products/product-4.webp",
  },
  {
    id: "lumera-curve",
    name: "LUMERA CURVE",
    category: "3D & Creative",
    description: "Flexible modules for 90° seamless anamorphic building corners.",
    priceOrSpec: "90° Chamfer",
    imageSrc: "/products/product-5.webp",
  },
  {
    id: "lumera-titan",
    name: "LUMERA TITAN",
    category: "DOOH Display",
    description: "Heavy-duty dual-service access commercial DOOH billboard screens.",
    priceOrSpec: "24/7 Duty",
    imageSrc: "/products/product-6.webp",
  },
  {
    id: "lumera-matrix",
    name: "LUMERA MATRIX",
    category: "MicroLED",
    description: "Ultra-fine pitch MicroLED surface for flagship corporate spaces.",
    priceOrSpec: "0.9mm Pitch",
    imageSrc: "/products/product-1.webp",
  },
];

const CATEGORIES = [
  "All Products",
  "Stage & Rental",
  "Outdoor Commercial",
  "Transparent Glass",
  "3D & Creative",
  "DOOH Display",
];

export function ProductGridSection() {
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [currentPage, setCurrentPage] = useState(0);

  // Mouse drag refs
  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startScrollLeft = useRef(0);
  const hasDragged = useRef(false);

  // Filter items by category
  const filteredProducts =
    selectedCategory === "All Products"
      ? PRODUCTS_DATA
      : PRODUCTS_DATA.filter((item) => item.category === selectedCategory);

  const dotsCount = Math.min(Math.max(filteredProducts.length, 1), 4);

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!trackRef.current) return;
    isDragging.current = true;
    hasDragged.current = false;
    startX.current = e.pageX;
    startScrollLeft.current = trackRef.current.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !trackRef.current) return;
    const dx = e.pageX - startX.current;
    if (Math.abs(dx) > 4) {
      hasDragged.current = true;
    }
    trackRef.current.scrollLeft = startScrollLeft.current - dx;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
  };

  const handleClickCapture = (e: React.MouseEvent) => {
    if (hasDragged.current) {
      e.preventDefault();
      e.stopPropagation();
      hasDragged.current = false;
    }
  };

  useEffect(() => {
    const onGlobalMouseUp = () => {
      isDragging.current = false;
    };
    window.addEventListener("mouseup", onGlobalMouseUp);
    return () => window.removeEventListener("mouseup", onGlobalMouseUp);
  }, []);

  // Update dots indicator on scroll
  const handleScroll = () => {
    if (!trackRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = trackRef.current;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll <= 2) {
      setCurrentPage(0);
      return;
    }
    const ratio = Math.min(Math.max(scrollLeft / maxScroll, 0), 1);
    const dot = Math.round(ratio * (dotsCount - 1));
    setCurrentPage(dot);
  };

  // Navigation handlers
  const scrollPrev = () => {
    if (!trackRef.current) return;
    const amount = trackRef.current.clientWidth * 0.75;
    trackRef.current.scrollBy({ left: -amount, behavior: "smooth" });
  };

  const scrollNext = () => {
    if (!trackRef.current) return;
    const amount = trackRef.current.clientWidth * 0.75;
    trackRef.current.scrollBy({ left: amount, behavior: "smooth" });
  };

  const scrollToDot = (dotIndex: number) => {
    if (!trackRef.current) return;
    const { scrollWidth, clientWidth } = trackRef.current;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll <= 0) return;
    const targetLeft = (dotIndex / (dotsCount - 1)) * maxScroll;
    trackRef.current.scrollTo({ left: targetLeft, behavior: "smooth" });
  };

  const handleCategorySelect = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage(0);
    if (trackRef.current) {
      trackRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  };

  return (
    <section className="bg-black text-white py-20 sm:py-28">
      <Container size="xl">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase text-white mb-3">
            Our <span className="text-accent">Products</span>
          </h2>
        </div>

        {/* Category Filters Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-14">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => handleCategorySelect(cat)}
                className={`text-xs sm:text-sm px-4 py-2 rounded-full transition-colors ${
                  isActive
                    ? "bg-white text-black font-medium"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Mouse Draggable Carousel Track */}
        <div
          ref={trackRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onClickCapture={handleClickCapture}
          onScroll={handleScroll}
          className="flex gap-6 overflow-x-auto select-none snap-x snap-mandatory cursor-grab active:cursor-grabbing pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {filteredProducts.map((product) => (
            <article
              key={product.id}
              className="w-[85%] sm:w-[calc((100%-24px)/2)] lg:w-[calc((100%-72px)/4)] shrink-0 snap-start flex flex-col justify-between bg-zinc-950 rounded-sm p-6 transition-all duration-300"
            >
              {/* Image Stage */}
              <div>
                <div className="relative aspect-square w-full rounded-sm p-4 mb-5 flex items-center justify-center overflow-hidden">
                  <Image
                    src={product.imageSrc}
                    alt={product.name}
                    fill
                    draggable={false}
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover pb-10 pointer-events-none"
                  />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold uppercase text-white">
                  {product.name}
                </h3>
              </div>

              {/* Divider and Bottom Action Row */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="block text-[10px] uppercase text-zinc-500">
                    Specification
                  </span>
                  <span className="text-sm font-semibold text-white">
                    {product.priceOrSpec}
                  </span>
                </div>

                <Link href="/contact" draggable={false}>
                  <Button variant="gold" size="sm" rounded="full">
                    Inquire
                  </Button>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Carousel / Navigation Controls (Left, Center Dots, Right) */}
        <div className="flex items-center justify-between mt-12 w-full select-none">
          {/* Left Arrow Button */}
          <Button
            variant="outline"
            size="sm"
            rounded="full"
            onClick={scrollPrev}
            aria-label="Previous products"
            className="px-3"
          >
            &larr;
          </Button>

          {/* Centered Pagination Dots */}
          <div className="flex items-center gap-2">
            {Array.from({ length: dotsCount }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => scrollToDot(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`size-2.5 rounded-full transition-all cursor-pointer ${
                  currentPage === i
                    ? "bg-[#D7B875] w-6"
                    : "bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>

          {/* Right Arrow Button */}
          <Button
            variant="outline"
            size="sm"
            rounded="full"
            onClick={scrollNext}
            aria-label="Next products"
            className="px-3"
          >
            &rarr;
          </Button>
        </div>
      </Container>
    </section>
  );
}

export default ProductGridSection;
