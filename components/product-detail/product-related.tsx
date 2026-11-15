"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import Container from "@/components/ui/Container";
import Heading from "@/components/ui/Heading";
import Button from "@/components/ui/Button";
import { PRODUCTS } from "@/data/products";
import "swiper/css";
import "swiper/css/pagination";

interface ProductRelatedProps {
  currentProductId: string;
}

export function ProductRelated({ currentProductId }: ProductRelatedProps) {
  const swiperRef = useRef<SwiperType | null>(null);

  // Filter out the active product to show complementary series
  const related = PRODUCTS.filter((p) => p.id !== currentProductId);
  const displayProducts = related.length > 0 ? related : PRODUCTS;

  return (
    <section
      id="related-products"
      aria-labelledby="related-products-heading"
      className="relative bg-[#F7F7F5] pt-16 sm:pt-24 lg:pt-32 pb-20 select-none overflow-hidden"
    >
      <Container size="xl">
        {/* Section Header */}
        <div className="max-w-5xl mx-auto mb-12 sm:mb-16 lg:mb-20 text-center">
          <Heading
            as="h2"
            id="related-products-heading"
            size="xl"
            align="center"
            variant="dark"
          >
            Related Architecture
          </Heading>
        </div>

        {/* Carousel Container */}
        <div className="relative group/carousel">
          {/* Previous / Next Navigation Arrows */}
          {([-1, 1] as const).map((dir) => (
            <button
              key={dir}
              type="button"
              onClick={() =>
                dir < 0
                  ? swiperRef.current?.slidePrev()
                  : swiperRef.current?.slideNext()
              }
              aria-label={dir < 0 ? "Previous products" : "Next products"}
              title={dir < 0 ? "Previous products" : "Next products"}
              className={`absolute ${
                dir < 0
                  ? "-left-2 sm:-left-4 lg:-left-6"
                  : "-right-2 sm:-right-4 lg:-right-6"
              } top-[42%] sm:top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white hover:bg-[#D7B875] text-zinc-900 hover:text-black border border-zinc-200 hover:border-[#D7B875] flex items-center justify-center transition-all duration-300 shadow-md cursor-pointer hover:scale-105 active:scale-95`}
            >
              <svg
                className={`w-5 h-5 sm:w-6 sm:h-6 transition-transform ${
                  dir < 0
                    ? "group-hover/carousel:-translate-x-0.5"
                    : "group-hover/carousel:translate-x-0.5"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={dir < 0 ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}
                />
              </svg>
            </button>
          ))}

          {/* Swiper Carousel with 2-Column Responsive Proportions */}
          <Swiper
            modules={[Pagination]}
            onSwiper={(s) => {
              swiperRef.current = s;
            }}
            slidesPerView={1.14}
            spaceBetween={20}
            breakpoints={{
              640: { slidesPerView: 1.5, spaceBetween: 24 },
              768: { slidesPerView: 2, spaceBetween: 28 },
              1024: { slidesPerView: 2, spaceBetween: 32 },
            }}
            speed={600}
            rewind
            grabCursor
            pagination={{ el: ".related-products-dots", clickable: true }}
            className="!pb-4"
          >
            {displayProducts.map((product, idx) => (
              <SwiperSlide key={product.id} className="!h-auto">
                <article
                  className="group/product relative flex flex-col justify-between h-full min-h-[420px] sm:min-h-[480px] lg:min-h-[540px] p-6 sm:p-8 
                     rounded-2xl bg-zinc-200/50 border border-[#E5E5E0] 
                     transition-all duration-300 overflow-hidden"
                >
                  {/* Dominant Product Image with Active Text & Action Buttons */}
                  <div className="relative w-full flex-1 flex items-center justify-center my-2 sm:my-3 min-h-[320px] sm:min-h-[380px] lg:min-h-[420px]">
                    <div className="relative w-full h-full max-w-[640px] flex items-center justify-center">
                      {/* Background Product Image */}
                      <Image
                        src={product.imageSrc}
                        alt={`${product.name} LED display panel`}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-contain select-none pointer-events-none scale-110 sm:scale-115 
                        transition-all duration-500 group-hover/product:scale-[1.18] group-hover/product:translate-y-2 sm:group-hover/product:translate-y-4"
                        priority={idx < 2}
                      />

                      {/* Active Content: Headline, Summary & Action Buttons */}
                      <div className="absolute top-0 inset-x-0 flex flex-col items-center justify-start text-center z-20 px-4 pt-1">
                        {/* Product Headline */}
                        <Heading
                          as="h3"
                          size="lg"
                          variant="dark"
                          align="center"
                          className="mb-1.5"
                        >
                          {product.name}
                        </Heading>

                        {/* Summary Copy */}
                        {/* <p className="font-sans text-xs sm:text-sm text-zinc-700 font-normal max-w-md mb-3 sm:mb-4 leading-relaxed">
                          {product.summary}
                        </p> */}

                        {/* Action Buttons */}
                        <div className="flex items-center justify-center gap-3 sm:gap-4">
                          <Link href={`/products/${product.id}`} draggable={false}>
                            <Button size="sm" variant="gold">
                              Learn more
                            </Button>
                          </Link>
                          <Link href="/contact" draggable={false}>
                            <Button
                              size="sm"
                              variant="white"
                              className="border-2 border-black"
                            >
                              Inquire
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Pagination Dots */}
          <div
            className="related-products-dots !static mt-8 sm:mt-10 flex items-center justify-center gap-2
              [--swiper-pagination-bullet-size:10px] [--swiper-pagination-bullet-horizontal-gap:0px]
              [--swiper-pagination-bullet-inactive-color:#d4d4d8] [--swiper-pagination-bullet-inactive-opacity:1]
              [--swiper-pagination-color:#D7B875]
              [&_.swiper-pagination-bullet]:!rounded-full [&_.swiper-pagination-bullet]:transition-all
              [&_.swiper-pagination-bullet]:duration-300 [&_.swiper-pagination-bullet-active]:!w-7"
          />
        </div>
      </Container>
    </section>
  );
}

export default ProductRelated;
