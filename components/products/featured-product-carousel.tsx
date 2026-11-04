"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { PRODUCTS, ProductItem } from "@/data/products";

interface FeaturedProductCarouselProps {
  products?: ProductItem[];
}

export function FeaturedProductCarousel({
  products = PRODUCTS,
}: FeaturedProductCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [isAnimating, setIsAnimating] = useState(false);

  // Touch swipe refs
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const total = products.length;
  const currentProduct = products[currentIndex];

  const handlePrev = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection("prev");
    setCurrentIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 350);
  }, [isAnimating, total]);

  const handleNext = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection("next");
    setCurrentIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 350);
  }, [isAnimating, total]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in an input
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }
      if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  // Touch swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 45;

    if (distance > minSwipeDistance) {
      handleNext();
    } else if (distance < -minSwipeDistance) {
      handlePrev();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  const formattedCount = `${String(currentIndex + 1).padStart(2, "0")} / ${String(
    total
  ).padStart(2, "0")}`;

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured Products Carousel"
      className="relative w-full bg-black text-foreground py-20 sm:py-28 
      lg:py-36 overflow-hidden"
    >
      <Container size="xl">
        {/* Section Header with Eyebrow and Carousel Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 sm:mb-16">
     
            <h2 className="font-heading mx-auto text-3xl sm:text-5xl md:text-6xl 
            font-bold uppercase text-white">
              The Flagship <span className="text-accent">Series.</span>
            </h2>
        </div>

        {/* Carousel Showcase Stage */}
        <div
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="relative w-full min-h-[580px] sm:min-h-[620px] lg:min-h-[660px] flex items-center"
        >
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Column 1: Dominant Product Image */}
            <div className="lg:col-span-7 flex items-center justify-center relative">
              {/* Subtle Atmospheric Backlight */}
              <div
                className="pointer-events-none absolute inset-0"
                aria-hidden="true"
              />

              <div
                key={`img-${currentProduct.id}`}
                className={`relative w-full h-[340px] sm:h-[460px] lg:h-[540px]
                   flex items-center justify-center transition-all duration-350 ease-out ${
                  isAnimating
                    ? direction === "next"
                      ? "opacity-40 translate-x-3 scale-[0.98]"
                      : "opacity-40 -translate-x-3 scale-[0.98]"
                    : "opacity-100 translate-x-0 scale-100"
                }`}
              >
                <Image
                  src={currentProduct.imageSrc}
                  alt={currentProduct.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-contain"
                />
              </div>
            </div>

            {/* Column 2: Product Information & Specs */}
            <div
              key={`info-${currentProduct.id}`}
              className={`lg:col-span-5 flex flex-col justify-center transition-all duration-350 ease-out ${
                isAnimating
                  ? "opacity-40 translate-y-2"
                  : "opacity-100 translate-y-0"
              }`}
            >
            
              {/* <div className="flex items-center gap-3 mb-3">
                <span className="font-inter text-xs uppercase text-accent">
                  {currentProduct.category}
                </span>
                <span className="text-zinc-600">/</span>
                <span className="font-inter text-xs uppercase text-zinc-400">
                  SERIES {currentProduct.series}
                </span>
              </div> */}

              
              <h3 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-white mb-4 leading-[1.05]">
                {currentProduct.name}
              </h3>

            
              <p className="font-sans text-sm sm:text-base text-zinc-300 font-light leading-relaxed mb-6">
                {currentProduct.summary}
              </p>

        
              {currentProduct.specs && currentProduct.specs.length > 0 && (
                <div className="border-t border-b border-white/10 py-5 my-2 mb-8">
                  <div className="grid grid-cols-2 gap-y-4 gap-x-6">
                    {currentProduct.specs.map((spec) => (
                      <div key={spec.label} className="flex flex-col">
                        <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-zinc-500 mb-1">
                          {spec.label}
                        </span>
                        <span className="font-sans text-xs sm:text-sm font-medium text-white">
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Button */}
              <div>
                <Link href="/#contact-cta">
                  <Button variant="gold" size="md">
                    EXPLORE PRODUCT
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
         {/* Carousel Arrow Controls & Product Counter */}
          <div className="flex items-center gap-4 sm:gap-6 self-start sm:self-end">
            <span
              aria-live="polite"
              className="font-mono text-xs sm:text-sm tracking-widest text-zinc-400 select-none tabular-nums"
            >
              {formattedCount}
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous product"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-white/20 hover:border-white hover:bg-white/10 active:scale-95 text-white flex items-center justify-center transition-all duration-200 cursor-pointer"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
              </button>

              <button
                type="button"
                onClick={handleNext}
                aria-label="Next product"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-white/20 hover:border-white hover:bg-white/10 active:scale-95 text-white flex items-center justify-center transition-all duration-200 cursor-pointer"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>
            </div>
          </div>
      </Container>
    </section>
  );
}

export default FeaturedProductCarousel;

