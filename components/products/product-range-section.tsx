"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Container from "@/components/ui/Container";
import ProductCard from "./product-card";
import { PRODUCTS } from "@/data/products";

const TOTAL = PRODUCTS.length;
const DRAG_THRESHOLD = 5;
const INERTIA_MS = 180;

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function ArrowButton({
  direction,
  disabled,
  onClick,
}: {
  direction: "prev" | "next";
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "prev" ? "Previous product" : "Next product"}
      className="grid size-11 shrink-0 cursor-pointer place-items-center rounded-full border border-white/25 text-white transition-colors duration-200 hover:border-[#F7F7F5] hover:bg-[#F7F7F5] hover:text-[#050505] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:pointer-events-none disabled:opacity-30"
    >
      <svg
        className="h-4 w-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d={direction === "prev" ? "M15.75 19.5 8.25 12l7.5-7.5" : "m8.25 4.5 7.5 7.5-7.5 7.5"}
        />
      </svg>
    </button>
  );
}

export function ProductRangeSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);

  const drag = useRef({
    active: false,
    moved: false,
    suppressClick: false,
    startX: 0,
    startScroll: 0,
    lastX: 0,
    lastT: 0,
    velocity: 0, // finger velocity, px per ms
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const getSlides = useCallback(
    () =>
      trackRef.current
        ? Array.from(trackRef.current.querySelectorAll<HTMLElement>("[data-slide]"))
        : [],
    []
  );

  // scrollLeft value that centres a slide. The track's side padding is
  // (viewport - slide) / 2, so this is simply offsetLeft minus that padding.
  const slideTarget = useCallback((track: HTMLElement, slide: HTMLElement) => {
    const lead = parseFloat(getComputedStyle(track).paddingLeft) || 0;
    return Math.max(0, slide.offsetLeft - lead);
  }, []);

  const scrollToLeft = useCallback((left: number) => {
    trackRef.current?.scrollTo({
      left,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  }, []);

  const scrollToIndex = useCallback(
    (index: number) => {
      const track = trackRef.current;
      const slide = getSlides()[Math.min(Math.max(index, 0), TOTAL - 1)];
      if (track && slide) scrollToLeft(slideTarget(track, slide));
    },
    [getSlides, scrollToLeft, slideTarget]
  );

  // Reads scroll geometry once, then writes. The progress thumb is mutated
  // directly so scrolling never re-renders the whole section.
  const sync = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const { scrollLeft, scrollWidth, clientWidth } = track;
    const max = scrollWidth - clientWidth;
    const progress = max > 0 ? Math.min(Math.max(scrollLeft / max, 0), 1) : 0;
    const atEnd = max <= 0 || scrollLeft >= max - 2;

    let nearest = 0;
    let best = Infinity;
    const slides = getSlides();

    slides.forEach((slide, i) => {
      const targetLeft = slideTarget(track, slide);
      const distance = Math.abs(scrollLeft - targetLeft);
      if (distance < best) {
        best = distance;
        nearest = i;
      }

      // Smoothly increase image opacity as the card approaches the center (middle)
      const maxDistance = Math.max(slide.clientWidth * 0.9, 1);
      const proximity = Math.max(0, 1 - distance / maxDistance);
      // Center card reaches 1.0 (100% opacity); side cards drop to 0.35 (35% opacity)
      const imgOpacity = 0.35 + 0.65 * Math.pow(proximity, 1.25);
      const imgTarget = slide.querySelector<HTMLElement>("[data-product-image]");
      if (imgTarget) {
        imgTarget.style.opacity = imgOpacity.toFixed(3);
      }
    });

    const thumb = thumbRef.current;
    if (thumb) {
      const ratio = 1 / TOTAL;
      thumb.style.width = `${ratio * 100}%`;
      thumb.style.transform = `translateX(${progress * (1 / ratio - 1) * 100}%)`;
    }

    setCanPrev(scrollLeft > 2);
    setCanNext(!atEnd);
    setActiveIndex(nearest);
  }, [getSlides, slideTarget]);

  const requestSync = useCallback(() => {
    if (frameRef.current !== null) return;
    frameRef.current = requestAnimationFrame(() => {
      frameRef.current = null;
      sync();
    });
  }, [sync]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // ResizeObserver fires once on observe, which also gives the initial sync.
    const observer = new ResizeObserver(requestSync);
    observer.observe(track);
    track.addEventListener("scroll", requestSync, { passive: true });

    return () => {
      observer.disconnect();
      track.removeEventListener("scroll", requestSync);
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, [requestSync]);

  // Mouse drag. Listeners live on the window so a drag survives leaving the
  // track; touch input keeps native scrolling.
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const d = drag.current;
      const track = trackRef.current;
      if (!d.active || !track) return;

      const dx = e.clientX - d.startX;
      if (!d.moved && Math.abs(dx) > DRAG_THRESHOLD) {
        d.moved = true;
        track.dataset.dragging = "true";
      }
      if (!d.moved) return;

      const now = performance.now();
      const dt = now - d.lastT;
      if (dt > 0) {
        d.velocity = d.velocity * 0.6 + ((e.clientX - d.lastX) / dt) * 0.4;
      }
      d.lastX = e.clientX;
      d.lastT = now;

      track.scrollLeft = d.startScroll - dx;
    };

    const onUp = () => {
      const d = drag.current;
      const track = trackRef.current;
      if (!d.active) return;
      d.active = false;

      if (!track) return;
      delete track.dataset.dragging;
      track.style.scrollSnapType = "";

      if (d.moved) {
        // The click that follows mouseup must not activate a link.
        d.suppressClick = true;
        setTimeout(() => {
          d.suppressClick = false;
        }, 0);

        // Project the release with a little inertia, then settle on a slide.
        const projected = track.scrollLeft - d.velocity * INERTIA_MS;
        let target = track.scrollLeft;
        let best = Infinity;
        getSlides().forEach((slide) => {
          const left = slideTarget(track, slide);
          const distance = Math.abs(projected - left);
          if (distance < best) {
            best = distance;
            target = left;
          }
        });
        scrollToLeft(target);
      }
      d.moved = false;
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [getSlides, scrollToLeft, slideTarget]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (e.button !== 0 || !track) return;

    const d = drag.current;
    d.active = true;
    d.moved = false;
    d.startX = e.clientX;
    d.startScroll = track.scrollLeft;
    d.lastX = e.clientX;
    d.lastT = performance.now();
    d.velocity = 0;

    // Snap fights programmatic scrollLeft while dragging; restored on release.
    track.style.scrollSnapType = "none";
  };

  const handleClickCapture = (e: React.MouseEvent) => {
    if (drag.current.suppressClick) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      scrollToIndex(activeIndex + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      scrollToIndex(activeIndex - 1);
    }
  };

  return (
    <section
      aria-labelledby="product-range-heading"
      className="@container relative w-full h-[100dvh] min-h-[580px] 
      max-h-[100dvh] overflow-hidden bg-black text-foreground flex flex-col justify-between
       pt-16 sm:pt-20 pb-3 sm:pb-5"
    >
      {/* Header */}
      <Container size="xl" className="text-center shrink-0">
        <h2
          id="product-range-heading"
          className="mx-auto max-w-4xl text-balance font-heading text-2xl 
          sm:text-3xl md:text-4xl lg:text-[2.6rem] font-bold uppercase text-white"
        >
          Complete architectural <span className="text-accent">range.</span>
        </h2>
      </Container>

      {/* Track: the active product is centred with an equal peek of its neighbours */}
      <div
        ref={trackRef}
        role="region"
        aria-roledescription="carousel"
        aria-label="Lumera product range"
        tabIndex={0}
        onMouseDown={handleMouseDown}
        onClickCapture={handleClickCapture}
        onDragStart={(e) => e.preventDefault()}
        onKeyDown={handleKeyDown}
        style={
          {
            "--pad": "calc((100cqw - var(--slide)) / 2)",
          } as React.CSSProperties
        }
        className="relative my-auto flex flex-1 min-h-0 cursor-grab snap-x snap-proximity items-center gap-5 overflow-x-auto overscroll-x-contain select-none ps-(--pad) pe-(--pad) [--slide:78cqw] [-ms-overflow-style:none] [scrollbar-width:none] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/40 sm:gap-6 md:[--slide:62cqw] xl:gap-8 xl:[--slide:min(48cqw,42rem)] data-[dragging=true]:cursor-grabbing [&[data-dragging=true]_[data-product-image]]:transition-none [&::-webkit-scrollbar]:hidden py-2"
      >
        {PRODUCTS.map((product, index) => (
          <div
            key={product.id}
            data-slide
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${TOTAL}`}
            className={`w-(--slide) shrink-0 snap-center transition-opacity duration-500 ease-out flex flex-col items-center justify-center ${
              index === activeIndex ? "opacity-100" : "opacity-60"
            }`}
          >
            <ProductCard
              product={product}
              priority={index < 2}
              isActive={index === activeIndex}
            />
          </div>
        ))}
      </div>

      {/* Controls: prev | next, centred */}
      <Container size="sm" className="shrink-0 pb-2 sm:pb-3">
        <div className="flex items-center justify-center gap-5 sm:gap-8">
          <ArrowButton
            direction="prev"
            disabled={!canPrev}
            onClick={() => scrollToIndex(activeIndex - 1)}
          />
          <ArrowButton
            direction="next"
            disabled={!canNext}
            onClick={() => scrollToIndex(activeIndex + 1)}
          />
        </div>
      </Container>
    </section>
  );
}

export default ProductRangeSection;