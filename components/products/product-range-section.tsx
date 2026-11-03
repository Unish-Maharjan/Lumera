"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Container from "@/components/ui/Container";
import ProductCard from "./product-card";
import { PRODUCTS } from "@/data/products";

export function ProductRangeSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const isDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const hasDraggedRef = useRef(false);

  const [isGrabbing, setIsGrabbing] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  const checkScroll = useCallback(() => {
    if (!trackRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = trackRef.current;
    setCanScrollLeft(scrollLeft > 15);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 15);

    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll > 0) {
      setScrollProgress(scrollLeft / maxScroll);
    }
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    checkScroll();
    track.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);

    return () => {
      track.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll]);

  // Mouse Drag Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!trackRef.current) return;
    isDownRef.current = true;
    setIsGrabbing(true);
    startXRef.current = e.pageX - trackRef.current.offsetLeft;
    scrollLeftRef.current = trackRef.current.scrollLeft;
    hasDraggedRef.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDownRef.current || !trackRef.current) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;

    if (Math.abs(walk) > 6) {
      hasDraggedRef.current = true;
    }
    trackRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleMouseUp = () => {
    isDownRef.current = false;
    setIsGrabbing(false);
  };

  // Prevent link/button click if user was dragging
  const handleClickCapture = (e: React.MouseEvent) => {
    if (hasDraggedRef.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  // Scroll Arrow Actions
  const handleScrollPrev = () => {
    if (!trackRef.current) return;
    const card = trackRef.current.querySelector("article");
    const amount = card ? card.clientWidth + 24 : 450;
    trackRef.current.scrollBy({
      left: -amount,
      behavior: "smooth",
    });
  };

  const handleScrollNext = () => {
    if (!trackRef.current) return;
    const card = trackRef.current.querySelector("article");
    const amount = card ? card.clientWidth + 24 : 450;
    trackRef.current.scrollBy({
      left: amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative w-full bg-black text-foreground py-20 sm:py-28 lg:py-36 border-t border-white/10 overflow-hidden">
      {/* Section Header */}
      <Container size="xl" className="mb-10 sm:mb-14">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="max-w-3xl">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent mb-4 block">
              THE COLLECTION
            </span>

            <h2 className="font-heading text-3xl sm:text-5xl md:text-6xl font-bold uppercase leading-[1.05] tracking-tight text-white">
              Complete architectural <span className="text-accent">range.</span>
            </h2>
          </div>

          {/* Navigation Controls: Hint + Arrow Buttons */}
          <div className="flex items-center gap-4 sm:gap-6 self-start sm:self-end">
            <span className="hidden sm:inline-block font-mono text-xs uppercase tracking-widest text-zinc-500 select-none">
              Drag to explore
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleScrollPrev}
                disabled={!canScrollLeft}
                aria-label="Scroll left"
                className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full border flex items-center justify-center transition-all duration-200 cursor-pointer ${
                  canScrollLeft
                    ? "border-white/20 hover:border-white hover:bg-white/10 text-white active:scale-95"
                    : "border-white/10 text-white/30 cursor-not-allowed opacity-50"
                }`}
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
                onClick={handleScrollNext}
                disabled={!canScrollRight}
                aria-label="Scroll right"
                className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full border flex items-center justify-center transition-all duration-200 cursor-pointer ${
                  canScrollRight
                    ? "border-white/20 hover:border-white hover:bg-white/10 text-white active:scale-95"
                    : "border-white/10 text-white/30 cursor-not-allowed opacity-50"
                }`}
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
        </div>
      </Container>

      {/* Mouse Draggable Carousel Track (Exactly 2 Products Fit in Desktop VW) */}
      <div
        ref={trackRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onClickCapture={handleClickCapture}
        className={`w-full flex gap-5 sm:gap-6 lg:gap-8 overflow-x-auto scrollbar-none px-6 sm:px-8 lg:px-12 py-2 select-none touch-pan-x [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
          isGrabbing ? "cursor-grabbing" : "cursor-grab"
        }`}
      >
        {PRODUCTS.map((product, idx) => (
          <div
            key={product.id}
            className="w-[86vw] sm:w-[70vw] md:w-[calc(50vw-2.25rem)] lg:w-[calc(50vw-3.25rem)] shrink-0 flex flex-col"
          >
            <ProductCard
              product={product}
              priority={idx < 2}
              className="h-full flex-1"
            />
          </div>
        ))}
      </div>

      {/* Subtle Progress Bar */}
      <Container size="xl" className="mt-8 sm:mt-10">
        <div className="w-full h-px bg-white/10 relative overflow-hidden">
          <div
            className="absolute top-0 bottom-0 bg-accent transition-all duration-150"
            style={{
              width: "35%",
              transform: `translateX(${scrollProgress * 185}%)`,
            }}
          />
        </div>
      </Container>
    </section>
  );
}

export default ProductRangeSection;
