"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import Container from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import "swiper/css";
import "swiper/css/pagination";

const RENTAL_SCREENS = [
  { id: "lumera-vortex-r", name: "LUMERA VORTEX-R", dimensions: "Up to 24m × 8m (Modular)", pixelPitch: "P1.9mm – P2.6mm", availability: "Available in Fleet", image: "/images/buildspace/events.avif" },
  { id: "lumera-strata-r", name: "LUMERA STRATA-R", dimensions: "16m × 9m Arena Format", pixelPitch: "P3.9mm IP68 Outdoor", availability: "Available Nationwide", image: "/images/buildspace/outdoor.avif" },
  { id: "lumera-crystal-r", name: "LUMERA CRYSTAL-R", dimensions: "10m × 4m Video Curtain", pixelPitch: "P3.91mm Transparent", availability: "Available in Fleet", image: "/images/buildspace/mall.avif" },
  { id: "lumera-curve-r", name: "LUMERA CURVE-R", dimensions: "12m × 5m (90° Corner)", pixelPitch: "P2.5mm Anamorphic", availability: "Available for Booking", image: "/images/event-screen.png" },
];

export function RentingSection() {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section
      id="rental"
      aria-labelledby="rental-heading"
      className="relative z-20 w-full bg-black text-zinc-950 py-16 sm:py-20 lg:py-28 select-none font-sans overflow-x-clip"
    >
      <Container size="xl" className="relative z-10">
        {/* Section Header */}
        <div className="max-w-4xl mx-auto mb-12 sm:mb-16 lg:mb-20 text-center">
          <h2
            id="rental-heading"
            className="font-heading text-3xl sm:text-5xl md:text-6xl text-white font-bold uppercase mb-4 sm:mb-5 tracking-tight"
          >
            FOR Renting
          </h2>
        </div>

        <div className="relative group/carousel">
          {/* Previous / Next arrows (rewind to the other end is built into Swiper's `rewind`) */}
          {([-1, 1] as const).map((dir) => (
            <button
              key={dir}
              type="button"
              onClick={() => (dir < 0 ? swiperRef.current?.slidePrev() : swiperRef.current?.slideNext())}
              aria-label={dir < 0 ? "Previous rental screens" : "Next rental screens"}
              title={dir < 0 ? "Previous rental screens" : "Next rental screens"}
              className={`absolute ${
                dir < 0 ? "-left-2 sm:-left-4 lg:-left-20" : "-right-2 sm:-right-4 lg:-right-20"
              } top-[42%] sm:top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white hover:bg-[#D7B875] text-zinc-900 hover:text-black border border-zinc-200 hover:border-[#D7B875] flex items-center justify-center transition-all duration-300 backdrop-blur-md cursor-pointer hover:scale-105 active:scale-95`}
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

          {/* Drag, momentum, snapping and click-after-drag blocking are all handled by Swiper */}
          <Swiper
            modules={[Pagination]}
            onSwiper={(s) => {
              swiperRef.current = s;
            }}
            slidesPerView={1.14} // ≈ 88% card width on mobile
            spaceBetween={24}
            breakpoints={{ 640: { slidesPerView: 2, spaceBetween: 32 } }}
            speed={800}
            rewind
            grabCursor
            pagination={{ el: ".rental-dots", clickable: true }}
            className="!pb-4"
          >
            {RENTAL_SCREENS.map((screen) => (
              <SwiperSlide key={screen.id} className="!h-auto">
                <article className="group h-full flex flex-col justify-between bg-zinc-200 rounded-xl sm:rounded-2xl 
                transition-all duration-500 overflow-hidden ">
                  {/* Image */}
                  <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full">
                    <Image
                      src={screen.image}
                      alt={screen.name}
                      fill
                      draggable={false}
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover object-center pointer-events-none transition-transform duration-700 ease-out 
                      group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500 
                    pointer-events-none" />
                  </div>

                  {/* Content */}
                  <div className="p-5 sm:p-6 lg:p-7 flex flex-col justify-between flex-1">
                    <div>
                      <div className="flex items-center justify-between text-xs text-zinc-500 mb-2.5">
                        <h3 className="font-heading text-xl sm:text-2xl font-bold uppercase text-zinc-950">
                          {screen.name}
                        </h3>
                        <span className="flex items-center gap-1.5 text-[#B89240] font-semibold text-xs">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#B89240] animate-pulse" />
                          {screen.availability}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-zinc-500 mt-2">
                        {screen.pixelPitch} <span className="mx-1.5 text-zinc-300">•</span> {screen.dimensions}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-white flex items-center justify-end">
                      <Link href="/contact" draggable={false}>
                        <Button size="sm" rounded="full" variant="gold">
                          Enquire Now
                        </Button>
                      </Link>
                    </div>
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Pagination dots: Swiper fills this element; the styles are set through its CSS variables */}
        {/* <div
          className="rental-dots !static mt-8 sm:mt-10 flex items-center justify-center gap-2
            [--swiper-pagination-bullet-size:10px] [--swiper-pagination-bullet-horizontal-gap:0px]
            [--swiper-pagination-bullet-inactive-color:#d4d4d8] [--swiper-pagination-bullet-inactive-opacity:1]
            [--swiper-pagination-color:#D7B875]
            [&_.swiper-pagination-bullet]:!rounded-full [&_.swiper-pagination-bullet]:transition-all
            [&_.swiper-pagination-bullet]:duration-300 [&_.swiper-pagination-bullet-active]:!w-7"
        /> */}
      </Container>
    </section>
  );
}

export default RentingSection;