"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

interface RentalScreen {
  id: string;
  name: string;
  classification: string;
  dimensions: string;
  pixelPitch: string;
  availability: string;
  image: string;
}

const RENTAL_SCREENS: RentalScreen[] = [
  {
    id: "lumera-vortex-r",
    name: "LUMERA VORTEX-R",
    classification: "Indoor Stage & Virtual XR",
    dimensions: "Up to 24m × 8m (Modular)",
    pixelPitch: "P1.9mm – P2.6mm",
    availability: "Available in Fleet",
    image: "/images/buildspace/events.avif",
  },
  {
    id: "lumera-strata-r",
    name: "LUMERA STRATA-R",
    classification: "Outdoor Stadium & Festivals",
    dimensions: "16m × 9m Arena Format",
    pixelPitch: "P3.9mm IP68 Outdoor",
    availability: "Available Nationwide",
    image: "/images/buildspace/outdoor.avif",
  },
  {
    id: "lumera-crystal-r",
    name: "LUMERA CRYSTAL-R",
    classification: "Transparent Glass LED",
    dimensions: "10m × 4m Video Curtain",
    pixelPitch: "P3.91mm Transparent",
    availability: "Available in Fleet",
    image: "/images/buildspace/mall.avif",
  },
  {
    id: "lumera-curve-r",
    name: "LUMERA CURVE-R",
    classification: "3D Curved & Anamorphic",
    dimensions: "12m × 5m (90° Corner)",
    pixelPitch: "P2.5mm Anamorphic",
    availability: "Available for Booking",
    image: "/images/event-screen.png",
  },
];

const GAP = 32;

const getStride = (track: HTMLDivElement) =>
  ((track.children[0] as HTMLElement)?.offsetWidth ?? track.clientWidth * 0.5) + GAP;

export function RentingSection() {
  const [currentPage, setCurrentPage] = useState(0);

  const trackRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number | null>(null);
  const drag = useRef({
    active: false,
    moved: false,
    startX: 0,
    lastX: 0,
    lastT: 0,
    v: 0,
    startScroll: 0,
  });

  const dotsCount = RENTAL_SCREENS.length;

  const cancelAnim = () => {
    if (animRef.current) cancelAnimationFrame(animRef.current);
  };

  // Smooth cubic ease-out scroll
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

  // Drag interaction handlers
  const startDrag = (x: number) => {
    const track = trackRef.current;
    if (!track) return;
    cancelAnim();
    drag.current = {
      active: true,
      moved: false,
      startX: x,
      lastX: x,
      lastT: performance.now(),
      v: 0,
      startScroll: track.scrollLeft,
    };
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
    const index = Math.max(
      0,
      Math.min(
        track.children.length - 1,
        Math.round((track.scrollLeft - d.v * 320) / stride)
      )
    );
    smoothScrollTo(Math.max(0, Math.min(maxScroll, index * stride)));
  };

  // Prevent accidental clicks immediately following drag gestures
  const handleClickCapture = (e: React.MouseEvent) => {
    if (drag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      drag.current.moved = false;
    }
  };

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

  // Update dots indicator on scroll
  const handleScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const maxScroll = track.scrollWidth - track.clientWidth;
    if (maxScroll <= 2) return setCurrentPage(0);
    const ratio = Math.min(Math.max(track.scrollLeft / maxScroll, 0), 1);
    setCurrentPage(Math.round(ratio * (dotsCount - 1)));
  };

  // Scroll left/right with wrap-around
  const scrollBy = (dir: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;
    const maxScroll = track.scrollWidth - track.clientWidth;
    const stride = getStride(track);
    const step = window.innerWidth >= 640 ? stride * 2 : stride;
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

  return (
    <section
      id="rental"
      aria-labelledby="rental-heading"
      className="relative z-20 w-full bg-black text-[#F7F7F5] py-16 sm:py-20 lg:py-28 select-none font-sans overflow-x-clip shadow-[0_-20px_50px_rgba(0,0,0,0.4)]"
    >
      {/* Top Transition Gradient: ultra-smooth eased scrim feathering extending above the section boundary */}
      <div
        className="pointer-events-none absolute -top-20 sm:-top-28 lg:-top-36 inset-x-0 h-20 sm:h-28 lg:h-36 z-30"
        style={{
          background:
            "linear-gradient(to top, #000000 0%, rgba(0,0,0,0.985) 12%, rgba(0,0,0,0.93) 24%, rgba(0,0,0,0.83) 36%, rgba(0,0,0,0.68) 48%, rgba(0,0,0,0.50) 60%, rgba(0,0,0,0.32) 71%, rgba(0,0,0,0.18) 81%, rgba(0,0,0,0.08) 89%, rgba(0,0,0,0.02) 95%, transparent 100%)",
        }}
        aria-hidden="true"
      />
      {/* Subtle Ambient Radial Glow */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 pointer-events-none blur-3xl opacity-20"
        style={{
          width: "800px",
          height: "400px",
          background: "radial-gradient(ellipse at center, rgba(215,184,117,0.35) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <Container size="xl" className="relative z-10">
        {/* Section Header */}
        <div className="max-w-5xl mx-auto mb-12 sm:mb-16 lg:mb-20 text-center">
          <h2
            id="rental-heading"
            className="font-heading text-3xl sm:text-5xl md:text-6xl font-bold text-white uppercase mb-4 sm:mb-5 tracking-tight"
          >
            FOR <span className="text-[#D7B875]">Renting</span>
          </h2>
        </div>

        {/* Horizontal Carousel (Configured so exactly two cards appear side by side) */}
        <div className="relative group/carousel">
          {/* Previous / Next Arrow Controls */}
          {([-1, 1] as const).map((dir) => (
            <button
              key={dir}
              type="button"
              onClick={() => scrollBy(dir)}
              aria-label={dir < 0 ? "Previous rental screens" : "Next rental screens"}
              title={dir < 0 ? "Previous rental screens" : "Next rental screens"}
              className={`absolute ${
                dir < 0 ? "-left-2 sm:-left-4 lg:-left-6" : "-right-2 sm:-right-4 lg:-right-6"
              } top-[42%] sm:top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-zinc-900/95 hover:bg-[#D7B875] text-white hover:text-black border border-white/20 hover:border-[#D7B875] flex items-center justify-center transition-all duration-300 shadow-2xl backdrop-blur-md cursor-pointer hover:scale-105 active:scale-95`}
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

          {/* Carousel Track */}
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
            className="flex gap-6 sm:gap-8 overflow-x-auto select-none snap-x snap-mandatory cursor-grab active:cursor-grabbing pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {RENTAL_SCREENS.map((screen) => (
              <article
                key={screen.id}
                className="group rental-card w-[88%] sm:w-[calc((100%-24px)/2)] md:w-[calc((100%-32px)/2)] shrink-0 snap-start flex flex-col justify-between bg-[#0D0E11] rounded-xl sm:rounded-2xl border border-white/10 shadow-xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.95)] transition-all duration-500 overflow-hidden font-sans"
              >
                {/* Image Stage with Smooth Scale on Hover */}
                <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-zinc-950">
                  <Image
                    src={screen.image}
                    alt={screen.name}
                    fill
                    draggable={false}
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover object-center pointer-events-none transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 pointer-events-none" />
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6 lg:p-7 flex flex-col justify-between flex-1">
                  <div>
                    {/* Classification & Live Availability in Accent Color */}
                    <div className="flex items-center justify-between text-xs text-zinc-400 mb-2.5 font-sans">
                      <span className="uppercase font-medium text-zinc-400 tracking-wider text-[11px]">
                        {screen.classification}
                      </span>
                      <span className="flex items-center gap-1.5 text-[#D7B875] font-medium text-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D7B875] animate-pulse" />
                        {screen.availability}
                      </span>
                    </div>

                    {/* Screen Name */}
                    <h3 className="font-heading text-xl sm:text-2xl font-bold uppercase text-white group-hover:text-[#D7B875] transition-colors duration-300">
                      {screen.name}
                    </h3>

                    {/* Streamlined Specs */}
                    <p className="text-xs sm:text-sm text-zinc-400 mt-2 font-sans">
                      {screen.pixelPitch} <span className="mx-1.5 text-zinc-600">•</span> {screen.dimensions}
                    </p>
                  </div>

                  {/* Clean Bottom Action Row */}
                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-end font-sans">
                    <Link href="/contact" draggable={false}>
                      <Button
                        size="sm"
                        rounded="full"
                        className="!bg-white !text-black !border !border-white hover:!bg-[#D7B875] hover:!text-black hover:!border-[#D7B875] transition-all duration-300 whitespace-nowrap active:scale-95 cursor-pointer shadow-xs font-semibold px-6"
                      >
                        Enquire Now
                      </Button>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex items-center justify-center gap-2 mt-8 sm:mt-10 w-full select-none">
          {Array.from({ length: dotsCount }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => scrollToDot(i)}
              aria-label={`Go to rental screen ${i + 1}`}
              className={`size-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                currentPage === i ? "bg-[#D7B875] w-7" : "bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

export default RentingSection;
