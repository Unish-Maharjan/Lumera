"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
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

  // Mouse & Touch drag refs
  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startScrollLeft = useRef(0);
  const hasDragged = useRef(false);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const velocityRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);

  // Filter items by category
  const filteredProducts =
    selectedCategory === "All Products"
      ? PRODUCTS_DATA
      : PRODUCTS_DATA.filter((item) => item.category === selectedCategory);

  const dotsCount = Math.min(Math.max(filteredProducts.length, 1), 4);

  // Custom slow, luxurious easing scroll animation (800ms)
  const smoothScrollTo = useCallback((targetLeft: number, duration = 850) => {
    if (!trackRef.current) return;
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    const start = trackRef.current.scrollLeft;
    const change = targetLeft - start;
    const startTime = performance.now();

    // Cubic ease-out for slow, cinematic deceleration
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const animate = (currentTime: number) => {
      if (!trackRef.current) return;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);

      trackRef.current.scrollLeft = start + change * eased;

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        animationFrameRef.current = null;
        if (trackRef.current) {
          trackRef.current.style.scrollSnapType = "x mandatory";
        }
      }
    };

    trackRef.current.style.scrollSnapType = "none";
    animationFrameRef.current = requestAnimationFrame(animate);
  }, []);

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!trackRef.current) return;
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    isDragging.current = true;
    hasDragged.current = false;
    startX.current = e.pageX;
    lastXRef.current = e.pageX;
    lastTimeRef.current = performance.now();
    velocityRef.current = 0;
    startScrollLeft.current = trackRef.current.scrollLeft;
    trackRef.current.style.scrollSnapType = "none";
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !trackRef.current) return;
    const currentX = e.pageX;
    const dx = currentX - startX.current;
    if (Math.abs(dx) > 4) {
      hasDragged.current = true;
    }

    const now = performance.now();
    const dt = now - lastTimeRef.current;
    if (dt > 0) {
      const instantVelocity = (currentX - lastXRef.current) / dt;
      velocityRef.current = 0.7 * instantVelocity + 0.3 * velocityRef.current;
      lastXRef.current = currentX;
      lastTimeRef.current = now;
    }

    trackRef.current.scrollLeft = startScrollLeft.current - dx;
  };

  const handleMouseUp = () => {
    if (!isDragging.current || !trackRef.current) return;
    isDragging.current = false;

    if (!hasDragged.current) {
      if (trackRef.current) {
        trackRef.current.style.scrollSnapType = "x mandatory";
      }
      return;
    }

    // Momentum glide with slow deceleration to nearest snap card
    const track = trackRef.current;
    const currentScroll = track.scrollLeft;
    const momentum = -velocityRef.current * 320;
    const projectedScroll = currentScroll + momentum;

    const cards = Array.from(track.children) as HTMLElement[];
    if (cards.length === 0) return;

    const cardWidth = cards[0].offsetWidth;
    const gap = 24;
    const stride = cardWidth + gap;

    const targetIndex = Math.max(
      0,
      Math.min(cards.length - 1, Math.round(projectedScroll / stride))
    );
    const maxScroll = track.scrollWidth - track.clientWidth;
    const targetLeft = Math.max(0, Math.min(maxScroll, targetIndex * stride));

    // Smooth slow transition to the snap target
    smoothScrollTo(targetLeft, 850);
  };

  const handleMouseLeave = () => {
    if (isDragging.current) {
      handleMouseUp();
    }
  };

  // Touch handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!trackRef.current) return;
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    isDragging.current = true;
    hasDragged.current = false;
    startX.current = e.touches[0].pageX;
    lastXRef.current = e.touches[0].pageX;
    lastTimeRef.current = performance.now();
    velocityRef.current = 0;
    startScrollLeft.current = trackRef.current.scrollLeft;
    trackRef.current.style.scrollSnapType = "none";
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current || !trackRef.current) return;
    const currentX = e.touches[0].pageX;
    const dx = currentX - startX.current;
    if (Math.abs(dx) > 4) {
      hasDragged.current = true;
    }

    const now = performance.now();
    const dt = now - lastTimeRef.current;
    if (dt > 0) {
      const instantVelocity = (currentX - lastXRef.current) / dt;
      velocityRef.current = 0.7 * instantVelocity + 0.3 * velocityRef.current;
      lastXRef.current = currentX;
      lastTimeRef.current = now;
    }

    trackRef.current.scrollLeft = startScrollLeft.current - dx;
  };

  const handleTouchEnd = () => {
    handleMouseUp();
  };

  const handleClickCapture = (e: React.MouseEvent) => {
    if (hasDragged.current) {
      e.preventDefault();
      e.stopPropagation();
      hasDragged.current = false;
    }
  };

  const handleMouseUpRef = useRef<() => void>(() => {});
  handleMouseUpRef.current = handleMouseUp;

  useEffect(() => {
    const onGlobalMouseUp = () => {
      if (isDragging.current) {
        handleMouseUpRef.current();
      }
    };
    window.addEventListener("mouseup", onGlobalMouseUp);
    return () => {
      window.removeEventListener("mouseup", onGlobalMouseUp);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
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

  // Navigation handlers (Left & Right flanking buttons)
  const scrollPrev = () => {
    if (!trackRef.current) return;
    const track = trackRef.current;
    const cards = Array.from(track.children) as HTMLElement[];
    const cardWidth = cards[0]?.offsetWidth ?? track.clientWidth * 0.5;
    const gap = 24;
    const stride = cardWidth + gap;
    const maxScroll = track.scrollWidth - track.clientWidth;
    const scrollAmount = window.innerWidth >= 1024 ? stride * 2 : stride;

    if (track.scrollLeft <= 5) {
      smoothScrollTo(maxScroll, 850);
    } else {
      const target = Math.max(0, track.scrollLeft - scrollAmount);
      smoothScrollTo(target, 800);
    }
  };

  const scrollNext = () => {
    if (!trackRef.current) return;
    const track = trackRef.current;
    const cards = Array.from(track.children) as HTMLElement[];
    const cardWidth = cards[0]?.offsetWidth ?? track.clientWidth * 0.5;
    const gap = 24;
    const stride = cardWidth + gap;
    const maxScroll = track.scrollWidth - track.clientWidth;
    const scrollAmount = window.innerWidth >= 1024 ? stride * 2 : stride;

    if (track.scrollLeft >= maxScroll - 5) {
      smoothScrollTo(0, 850);
    } else {
      const target = Math.min(maxScroll, track.scrollLeft + scrollAmount);
      smoothScrollTo(target, 800);
    }
  };

  const scrollToDot = (dotIndex: number) => {
    if (!trackRef.current) return;
    const { scrollWidth, clientWidth } = trackRef.current;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll <= 0) return;
    const targetLeft = (dotIndex / (dotsCount - 1)) * maxScroll;
    smoothScrollTo(targetLeft, 850);
  };

  const handleCategorySelect = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage(0);
    if (trackRef.current) {
      smoothScrollTo(0, 600);
    }
  };

  return (
    <section className="bg-black text-white py-20 sm:py-28 select-none">
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
                className={`text-xs sm:text-sm px-4 py-2 rounded-full transition-colors cursor-pointer ${
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

        {/* Carousel Container with Flanking Left & Right Buttons */}
        <div className="relative group/carousel">
          {/* Left Navigation Button */}
          <button
            type="button"
            onClick={scrollPrev}
            aria-label="Previous products"
            className="absolute -left-2 sm:-left-4 lg:-left-6 top-[40%] sm:top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-zinc-950/90 sm:bg-black/85 hover:bg-white text-white hover:text-black border border-white/20 hover:border-white flex items-center justify-center transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.85)] backdrop-blur-md cursor-pointer hover:scale-105 active:scale-95"
            title="Previous products"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover/carousel:-translate-x-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Mouse & Touch Draggable Carousel Track */}
          <div
            ref={trackRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onClickCapture={handleClickCapture}
            onScroll={handleScroll}
            className="flex gap-6 overflow-x-auto select-none snap-x snap-mandatory cursor-grab active:cursor-grabbing pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {filteredProducts.map((product) => (
              <article
                key={product.id}
                className="w-[85%] sm:w-[calc((100%-24px)/2)] lg:w-[calc((100%-72px)/4)] shrink-0 snap-start flex flex-col justify-between bg-zinc-950 rounded-sm p-6 transition-all duration-300 hover:border-white/20 border border-transparent"
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

          {/* Right Navigation Button */}
          <button
            type="button"
            onClick={scrollNext}
            aria-label="Next products"
            className="absolute -right-2 sm:-right-4 lg:-right-6 top-[40%] sm:top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-zinc-950/90 sm:bg-black/85 hover:bg-white text-white hover:text-black border border-white/20 hover:border-white flex items-center justify-center transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.85)] backdrop-blur-md cursor-pointer hover:scale-105 active:scale-95"
            title="Next products"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover/carousel:translate-x-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Centered Pagination Dots */}
        <div className="flex items-center justify-center gap-2 mt-10 w-full select-none">
          {Array.from({ length: dotsCount }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => scrollToDot(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`size-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                currentPage === i
                  ? "bg-[#D7B875] w-7"
                  : "bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

export default ProductGridSection;
