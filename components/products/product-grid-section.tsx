"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

const GAP = 24;

const PRODUCTS = [
  { id: "lumera-vortex", name: "LUMERA VORTEX", category: "Stage & Rental", spec: "7,680 Hz", img: "product-2" },
  { id: "lumera-strata", name: "LUMERA STRATA", category: "Outdoor Commercial", spec: "10,000 Nits", img: "product-3" },
  { id: "lumera-crystal", name: "LUMERA CRYSTAL", category: "Transparent Glass", spec: "82% Clarity", img: "product-4" },
  { id: "lumera-curve", name: "LUMERA CURVE", category: "3D & Creative", spec: "90° Chamfer", img: "product-5" },
  { id: "lumera-titan", name: "LUMERA TITAN", category: "DOOH Display", spec: "24/7 Duty", img: "product-6" },
  { id: "lumera-matrix", name: "LUMERA MATRIX", category: "MicroLED", spec: "0.9mm Pitch", img: "product-1" },
];

const CATEGORIES = ["All Products", "Stage & Rental", "Outdoor Commercial", "Transparent Glass", "3D & Creative", "DOOH Display"];

const getStride = (track: HTMLDivElement) =>
  ((track.children[0] as HTMLElement)?.offsetWidth ?? track.clientWidth * 0.5) + GAP;

export function ProductGridSection() {
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [currentPage, setCurrentPage] = useState(0);

  const trackRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number | null>(null);
  const drag = useRef({ active: false, moved: false, startX: 0, lastX: 0, lastT: 0, v: 0, startScroll: 0 });

  const filteredProducts =
    selectedCategory === "All Products"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === selectedCategory);

  const dotsCount = Math.min(Math.max(filteredProducts.length, 1), 4);

  const cancelAnim = () => {
    if (animRef.current) cancelAnimationFrame(animRef.current);
  };

  // Slow cubic ease-out scroll
  const smoothScrollTo = (target: number, duration = 850) => {
    const track = trackRef.current;
    if (!track) return;
    cancelAnim();
    const start = track.scrollLeft;
    const change = target - start;
    const t0 = performance.now();

    const animate = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      track.scrollLeft = start + change * (1 - Math.pow(1 - p, 3));
      if (p < 1) {
        animRef.current = requestAnimationFrame(animate);
      } else {
        animRef.current = null;
        track.style.scrollSnapType = "x mandatory";
      }
    };

    track.style.scrollSnapType = "none";
    animRef.current = requestAnimationFrame(animate);
  };

  // Shared drag logic (mouse + touch)
  const startDrag = (x: number) => {
    const track = trackRef.current;
    if (!track) return;
    cancelAnim();
    drag.current = { active: true, moved: false, startX: x, lastX: x, lastT: performance.now(), v: 0, startScroll: track.scrollLeft };
    track.style.scrollSnapType = "none";
  };

  const moveDrag = (x: number) => {
    const d = drag.current;
    const track = trackRef.current;
    if (!d.active || !track) return;
    const dx = x - d.startX;
    if (Math.abs(dx) > 4) d.moved = true;

    const now = performance.now();
    const dt = now - d.lastT;
    if (dt > 0) {
      d.v = 0.7 * ((x - d.lastX) / dt) + 0.3 * d.v;
      d.lastX = x;
      d.lastT = now;
    }
    track.scrollLeft = d.startScroll - dx;
  };

  const endDrag = () => {
    const d = drag.current;
    const track = trackRef.current;
    if (!d.active || !track) return;
    d.active = false;

    if (!d.moved) {
      track.style.scrollSnapType = "x mandatory";
      return;
    }

    // Momentum glide to nearest card
    const stride = getStride(track);
    const maxScroll = track.scrollWidth - track.clientWidth;
    const index = Math.max(0, Math.min(track.children.length - 1, Math.round((track.scrollLeft - d.v * 320) / stride)));
    smoothScrollTo(Math.max(0, Math.min(maxScroll, index * stride)));
  };

  // Block link clicks right after a drag
  const handleClickCapture = (e: React.MouseEvent) => {
    if (drag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      drag.current.moved = false;
    }
  };

  // Global mouseup (release outside the track)
  const endRef = useRef(endDrag);
  useEffect(() => {
    endRef.current = endDrag;
  });
  useEffect(() => {
    const up = () => endRef.current();
    window.addEventListener("mouseup", up);
    return () => {
      window.removeEventListener("mouseup", up);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  // Update dots on scroll
  const handleScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const maxScroll = track.scrollWidth - track.clientWidth;
    if (maxScroll <= 2) return setCurrentPage(0);
    const ratio = Math.min(Math.max(track.scrollLeft / maxScroll, 0), 1);
    setCurrentPage(Math.round(ratio * (dotsCount - 1)));
  };

  // dir: -1 = previous, 1 = next (wraps around at the ends)
  const scrollBy = (dir: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;
    const maxScroll = track.scrollWidth - track.clientWidth;
    const step = getStride(track) * (window.innerWidth >= 1024 ? 2 : 1);
    const atEdge = dir > 0 ? track.scrollLeft >= maxScroll - 5 : track.scrollLeft <= 5;

    if (atEdge) smoothScrollTo(dir > 0 ? 0 : maxScroll);
    else smoothScrollTo(Math.min(maxScroll, Math.max(0, track.scrollLeft + dir * step)), 800);
  };

  const scrollToDot = (i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const maxScroll = track.scrollWidth - track.clientWidth;
    if (maxScroll > 0) smoothScrollTo((i / (dotsCount - 1)) * maxScroll);
  };

  const handleCategorySelect = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage(0);
    smoothScrollTo(0, 600);
  };

  return (
    <section className="bg-[#F5F5F2] text-[#0A0A0A] py-10 sm:py-18 select-none">
      <Container size="xl">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase text-[#0A0A0A] mb-3">
            OUR <span className="text-[#D7B875]">PRODUCTS</span>
          </h2>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-14">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => handleCategorySelect(cat)}
              className={`text-xs sm:text-sm px-4 py-2 rounded-full transition-colors cursor-pointer font-medium ${
                selectedCategory === cat
                  ? "bg-black text-white shadow-xs"
                  : "text-[#555555] hover:text-black"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Carousel */}
        <div className="relative group/carousel">
          {([-1, 1] as const).map((dir) => (
            <button
              key={dir}
              type="button"
              onClick={() => scrollBy(dir)}
              aria-label={dir < 0 ? "Previous products" : "Next products"}
              title={dir < 0 ? "Previous products" : "Next products"}
              className={`absolute ${
                dir < 0 ? "-left-2 sm:-left-4 lg:-left-6" : "-right-2 sm:-right-4 lg:-right-6"
              } top-[40%] sm:top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white hover:bg-zinc-50 text-black border border-[#E5E5E0] flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer hover:scale-105 active:scale-95`}
            >
              <svg
                className={`w-5 h-5 sm:w-6 sm:h-6 transition-transform ${
                  dir < 0 ? "group-hover/carousel:-translate-x-0.5" : "group-hover/carousel:translate-x-0.5"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={dir < 0 ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"} />
              </svg>
            </button>
          ))}

          <div
            ref={trackRef}
            onMouseDown={(e) => startDrag(e.pageX)}
            onMouseMove={(e) => moveDrag(e.pageX)}
            onMouseUp={endDrag}
            onMouseLeave={endDrag}
            onTouchStart={(e) => startDrag(e.touches[0].pageX)}
            onTouchMove={(e) => moveDrag(e.touches[0].pageX)}
            onTouchEnd={endDrag}
            onClickCapture={handleClickCapture}
            onScroll={handleScroll}
            className="flex gap-6 overflow-x-auto select-none snap-x snap-mandatory cursor-grab active:cursor-grabbing pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {filteredProducts.map((product) => (
              <article
                key={product.id}
                className="w-[85%] sm:w-[calc((100%-24px)/2)] lg:w-[calc((100%-72px)/4)] shrink-0 snap-start flex flex-col justify-between bg-white rounded-sm pt-3.5 px-6 pb-6 border border-[#E5E5E0] shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div>
                  <div className="relative aspect-square w-full rounded-sm pt-2 px-4 pb-4 mb-5 flex items-center justify-center overflow-hidden">
                    <Image
                      src={`/products/${product.img}.webp`}
                      alt={product.name}
                      fill
                      draggable={false}
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover pb-10 pointer-events-none"
                    />
                  </div>
                  <h3 className="text-xl font-bold uppercase text-black">{product.name}</h3>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E5E5E0] flex items-center justify-between">
                  <div>
                    <span className="block text-[10px] uppercase text-[#777777] font-medium tracking-wider">
                      Specification
                    </span>
                    <span className="text-sm font-semibold text-black">{product.spec}</span>
                  </div>

                  <Link href="/contact" draggable={false}>
                    <Button
                      size="sm"
                      rounded="full"
                      className="!bg-black !text-white !border !border-black hover:!bg-[#D7B875] hover:!text-black hover:!border-[#D7B875] transition-colors duration-200"
                    >
                      Inquire
                    </Button>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Pagination dots */}
        <div className="flex items-center justify-center gap-2 mt-10 w-full select-none">
          {Array.from({ length: dotsCount }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => scrollToDot(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`size-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                currentPage === i ? "bg-[#D7B875] w-7" : "bg-[#D1D1CD] hover:bg-zinc-400"
              }`}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

export default ProductGridSection;