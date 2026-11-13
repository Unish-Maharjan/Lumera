"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import Container from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { ProductDetailData } from "@/data/product-details";
import "swiper/css";
import "swiper/css/navigation";

interface ProductGalleryProps {
  product?: ProductDetailData;
  title?: string;
  scenarios?: Array<{ id: string; title: string; image: string }>;
}

const DEFAULT_SCENARIOS = [
  {
    id: "studio-broadcast",
    title: "Studio&Broadcast",
    image: "/images/productdetails/scenario-studio.png",
  },
  {
    id: "product-review",
    title: "Product Review",
    image: "/images/productdetails/scenario-review.png",
  },
  {
    id: "exhibition-space",
    title: "Exhibition & Showroom",
    image: "/images/retail-space.png",
  },
  {
    id: "corporate-boardroom",
    title: "Executive Boardroom",
    image: "/images/productdetails/wideview.jpg",
  },
  {
    id: "events-stage",
    title: "Stage & Live Events",
    image: "/images/event-screen.png",
  },
  {
    id: "architectural-facade",
    title: "Architectural Spaces",
    image: "/images/buildspace/facade.avif",
  },
];

export function ProductGallery({
  product,
  title = "Application Scenario",
  scenarios = DEFAULT_SCENARIOS,
}: ProductGalleryProps) {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section
      id="gallery"
      aria-labelledby="gallery-heading"
      data-product-id={product?.id}
      className="w-full bg-black text-white py-10 sm:py-14 lg:py-22 
      select-none overflow-hidden"
    >
      <Container size="xl">
        {/* Section Heading: Application Scenario */}
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-14 lg:mb-16">
          <Heading
            as="h2"
            size="lg"
            variant="white"
            align="center"
            id="gallery-heading"
            className="text-white font-light tracking-tight"
          >
            {title}
          </Heading>
        </div>
      </Container>

      {/* Horizontal Carousel Container */}
      <div className="relative w-full max-w-[1700px] mx-auto px-4 sm:px-8">
        {/* Previous Navigation Arrow */}
        <button
          type="button"
          onClick={() => swiperRef.current?.slidePrev()}
          aria-label="Previous scenario"
          className="absolute left-2 sm:left-6 top-[40%] -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-zinc-900/90 text-white border border-zinc-700/80 shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer hover:bg-zinc-800 backdrop-blur-md"
        >
          <svg
            className="w-5 h-5 text-white"
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
          aria-label="Next scenario"
          className="absolute right-2 sm:right-6 top-[40%] -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-zinc-900/90 text-white border border-zinc-700/80 shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer hover:bg-zinc-800 backdrop-blur-md"
        >
          <svg
            className="w-5 h-5 text-white"
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

        {/* Swiper Slider */}
        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          modules={[Navigation, Autoplay]}
          loop={true}
          centeredSlides={false}
          slidesPerView={1.2}
          spaceBetween={20}
          autoplay={{
            delay: 4500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 1.8,
              spaceBetween: 28,
            },
            1024: {
              slidesPerView: 2.3,
              spaceBetween: 36,
            },
            1440: {
              slidesPerView: 2.6,
              spaceBetween: 40,
            },
          }}
          className="w-full !overflow-visible"
        >
          {scenarios.map((item) => (
            <SwiperSlide key={item.id} className="!h-auto">
              <article className="group flex flex-col items-start w-full cursor-grab active:cursor-grabbing">
                {/* Rounded Image Container */}
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl sm:rounded-3xl bg-zinc-900 border border-zinc-800/90 shadow-xl transition-all duration-500 group-hover:border-zinc-700">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 85vw, (max-width: 1024px) 55vw, 42vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>

                {/* Left-Aligned Label beneath each card */}
                <span className="mt-4 sm:mt-5 text-sm sm:text-base font-medium tracking-tight text-white font-sans text-left">
                  {item.title}
                </span>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default ProductGallery;
