"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import Container from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { StageComponent } from "@/data/event-case-study";
import { useIsClient } from "@/lib/use-is-client";
import "swiper/css";
import "swiper/css/navigation";

interface EventVisualExperienceProps {
  components?: StageComponent[];
}

const EVENT_IMAGES = [
  {
    src: "/images/events/arial-view.jpg",
    alt: "Aerial stadium perspective of concert LED stage and audience",
    title: "Aerial Stadium View",
  },
  {
    src: "/images/events/concert.jpg",
    alt: "Live concert main stage LED visual wall and light rays",
    title: "Main Stage Atmosphere",
  },
  {
    src: "/images/events/crowd.jpg",
    alt: "45,000 concertgoers under illuminated stage glow",
    title: "Audience Perspective",
  },
  {
    src: "/images/events/hero-2.jpg",
    alt: "Elevated concert stadium view with illuminated Nepali temples",
    title: "Monumental Stadium & Temples",
  },
  {
    src: "/images/events/hero-3.jpg",
    alt: "Daylight outdoor stadium performance and stage screens",
    title: "Daylight Show",
  },
  {
    src: "/images/events/event-hero.jpg",
    alt: "Full stage night lighting and laser synchronization",
    title: "Full Stage Laser Show",
  },
  {
    src: "/images/events/installation.jpg",
    alt: "LED display structural assembly and ground rigging",
    title: "Installation & Rigging",
  },
  {
    src: "/images/events/closeup.jpg",
    alt: "Precision CNC magnesium LED cabinet detail",
    title: "Cabinet Engineering",
  },
];

export function EventVisualExperience({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  components,
}: EventVisualExperienceProps) {
  const swiperRef = useRef<SwiperType | null>(null);
  const isMounted = useIsClient();

  return (
    <section
      id="visual-experience"
      aria-labelledby="visual-experience-heading"
      className="relative w-full bg-white text-zinc-950 py-10 sm:py-14 lg:py-22 
      select-none overflow-hidden"
    >
      <Container size="xl">
        {/* Centered Section Title matching user reference */}
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-14 lg:mb-16">
          <Heading
            as="h2"
            id="visual-experience-heading"
            size="xl"
            align="center"
            variant="dark"
            className="text-zinc-950 font-bold tracking-tight uppercase"
          >
            Event Gallery
          </Heading>
        </div>
      </Container>

      {/* Peek-Around Centered Swiper Carousel */}
      <div className="relative w-full max-w-[1600px] mx-auto px-4 sm:px-8">
        {/* Previous Navigation Arrow */}
        <button
          type="button"
          onClick={() => swiperRef.current?.slidePrev()}
          aria-label="Previous image"
          className="absolute left-2 sm:left-6 lg:left-10 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white text-zinc-800 shadow-xl border border-zinc-200/90 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer hover:bg-zinc-50"
        >
          <svg
            className="w-5 h-5 text-zinc-800"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* Next Navigation Arrow */}
        <button
          type="button"
          onClick={() => swiperRef.current?.slideNext()}
          aria-label="Next image"
          className="absolute right-2 sm:right-6 lg:right-10 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white text-zinc-800 shadow-xl border border-zinc-200/90 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer hover:bg-zinc-50"
        >
          <svg
            className="w-5 h-5 text-zinc-800"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        {isMounted ? (
          <Swiper
            modules={[Navigation, Autoplay]}
            onSwiper={(s) => {
              swiperRef.current = s;
            }}
            centeredSlides={true}
            loop={true}
            slidesPerView={1.2}
            spaceBetween={16}
            breakpoints={{
              640: { slidesPerView: 1.35, spaceBetween: 24 },
              768: { slidesPerView: 1.45, spaceBetween: 28 },
              1024: { slidesPerView: 1.55, spaceBetween: 36 },
              1440: { slidesPerView: 1.65, spaceBetween: 40 },
            }}
            autoplay={{
              delay: 4500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            speed={700}
            grabCursor={true}
            className="w-full !overflow-visible"
          >
            {EVENT_IMAGES.map((item, idx) => (
              <SwiperSlide key={item.src} className="!h-auto">
                {({ isActive }) => (
                  <div
                    className={`relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden rounded-2xl sm:rounded-3xl transition-all duration-700 ease-out shadow-2xl bg-zinc-100 ${
                      isActive
                        ? "scale-100 opacity-100 ring-1 ring-black/10"
                        : "scale-[0.93] opacity-60 hover:opacity-85"
                    }`}
                  >
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 1024px) 90vw, 70vw"
                      className="object-cover object-center"
                      priority={idx === 0}
                    />

                    {/* Subtle Dark Gradient Overlay at base */}
                    <div
                      className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"
                      aria-hidden="true"
                    />
                  </div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="w-full flex items-center justify-center overflow-hidden">
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full max-w-[1000px] overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl bg-zinc-100">
              <Image
                src={EVENT_IMAGES[0].src}
                alt={EVENT_IMAGES[0].alt}
                fill
                sizes="(max-width: 1024px) 90vw, 70vw"
                className="object-cover object-center"
                priority
              />
              <div
                className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"
                aria-hidden="true"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default EventVisualExperience;
