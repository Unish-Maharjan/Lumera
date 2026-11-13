"use client";

import React from "react";
import Image from "next/image";
import Container from "@/components/ui/Container";

interface ProductDividerProps {
  title?: string;
  description?: string;
  imageSrc?: string;
  imageAlt?: string;
}

export function ProductDivider({
  title = "Precise Low-Grayscale Color Reproduction",
  description = "Perfect for luxury car launches, this LED display boasts professional-grade true color reproduction. It finely renders rich color gradations and delicate textures in the vehicle's shadow areas with sharp, clear details. It authentically restores the original paint color and light-shadow finish, meeting the strictest standards for color precision.",
  imageSrc = "/images/productdetails/precise-color-car.jpg",
  imageAlt = "Luxury car launch on curved LED display with precise low-grayscale color reproduction",
}: ProductDividerProps) {
  return (
    <section
      id="color-reproduction"
      aria-labelledby="color-reproduction-title"
      className="relative w-full bg-black text-white py-14 sm:py-20 lg:py-28 select-none overflow-hidden border-t border-zinc-900"
    >
      <Container size="xl">
        {/* Single unified card enclosing both image and text */}
        <div className="w-full rounded-2xl sm:rounded-3xl lg:rounded-[32px] bg-[#111111] border border-zinc-800/80 overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12 items-stretch">
          {/* Left: Image inside the unified div */}
          <div className="lg:col-span-6 xl:col-span-6 relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-auto min-h-[300px] sm:min-h-[400px] lg:min-h-[480px] bg-zinc-900 overflow-hidden">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center transition-transform duration-700 ease-out hover:scale-105"
              priority
            />
          </div>

          {/* Right: Text content inside the same unified div */}
          <div className="lg:col-span-6 xl:col-span-6 p-8 sm:p-10 lg:p-12 xl:p-16 flex flex-col justify-center">
            <h2
              id="color-reproduction-title"
              className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-4 sm:mb-6 leading-tight"
            >
              {title}
            </h2>

            <p className="font-inter text-sm sm:text-base lg:text-lg text-zinc-300 
            font-light leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default ProductDivider;
