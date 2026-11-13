"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Container from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { ProductDetailData } from "@/data/product-details";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface PerformanceShowcaseItem {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  imagePosition: "left" | "right";
}

export const DEFAULT_PERFORMANCE_ITEMS: PerformanceShowcaseItem[] = [
  {
    id: "ultimate-visuals",
    title: "Ultimate Visuals",
    subtitle: "High White Screen Uniformity · EDL+ Driving Tech",
    description:
      "Ensuring exceptional consistency at low gray and high cinema refresh while achieving low power consumption and minimal temperature rise.",
    imageSrc: "/images/productdetails/ultimate-visuals-mall.jpg",
    imageAlt: "Commercial atrium high-uniformity LED display",
    imagePosition: "left",
  },
  {
    id: "true-color",
    title: "True Color at Low Brightness",
    subtitle: "22-bit High-Grayscale Processing",
    description:
      "For museum exhibitions and precision galleries, the display delivers lifelike fidelity at low brightness, delicately restoring intricate details of cultural artifacts with soft, protective illumination.",
    imageSrc: "/images/productdetails/butterfly-museum-display.jpg",
    imageAlt: "Stained-glass butterfly museum exhibition display",
    imagePosition: "right",
  },
];

export interface ProductPerformanceProps {
  product?: ProductDetailData;
  title?: string;
  accent?: string;
  items?: PerformanceShowcaseItem[];
  // Backwards-compatibility props
  imageSrc?: string;
  productName?: string;
}

export function ProductPerformance({
  title = "CORE",
  accent = "PERFORMANCE",
  items = DEFAULT_PERFORMANCE_ITEMS,
}: ProductPerformanceProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        gsap.set("[data-parallax-image]", { yPercent: 0 });
        gsap.set("[data-parallax-text]", { y: 0 });
        return;
      }

      // Parallax on image frames
      const frames = gsap.utils.toArray<HTMLElement>("[data-parallax-frame]");
      frames.forEach((frame) => {
        const img = frame.querySelector<HTMLElement>("[data-parallax-image]");
        if (!img) return;

        gsap.fromTo(
          img,
          { yPercent: -12 },
          {
            yPercent: 12,
            ease: "none",
            scrollTrigger: {
              trigger: frame,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
              invalidateOnRefresh: true,
            },
          }
        );
      });

      // Parallax on narrative text columns
      const articles = gsap.utils.toArray<HTMLElement>("[data-feature-article]");
      articles.forEach((article) => {
        const textCol = article.querySelector<HTMLElement>("[data-parallax-text]");
        if (!textCol) return;

        gsap.fromTo(
          textCol,
          { y: 36 },
          {
            y: -36,
            ease: "none",
            scrollTrigger: {
              trigger: article,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
              invalidateOnRefresh: true,
            },
          }
        );
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="performance"
      aria-labelledby="performance-heading"
      className="relative w-full bg-white text-zinc-950 py-16 sm:py-24 lg:py-32 overflow-hidden select-none"
    >
      <Container size="xl">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-16 sm:mb-20 lg:mb-28">
          <Heading
            id="performance-heading"
            variant="black"
            size="xl"
            align="center"
          >
            {title} {accent ? <Heading.Accent>{accent}</Heading.Accent> : null}
          </Heading>
        </div>

        {/* Alternating Zigzag Features */}
        <div className="flex flex-col space-y-20 sm:space-y-28 lg:space-y-36">
          {items.map((item, index) => {
            const isImageLeft = item.imagePosition === "left";

            return (
              <article
                key={item.id}
                data-feature-article
                aria-labelledby={`feature-heading-${item.id}`}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center"
              >
                {/* Image Column with Smooth Scroll Parallax */}
                <div
                  className={`lg:col-span-7 ${
                    isImageLeft ? "order-1" : "order-1 lg:order-2"
                  }`}
                >
                  <div
                    data-parallax-frame
                    className="group relative w-full aspect-[16/10] overflow-hidden rounded-2xl sm:rounded-3xl bg-zinc-100 border border-zinc-200/90 transition-colors duration-300 hover:border-zinc-300 shadow-sm"
                  >
                    <div
                      data-parallax-image
                      className="relative w-full h-[126%] -top-[13%] will-change-transform"
                    >
                      <Image
                        src={item.imageSrc}
                        alt={item.imageAlt}
                        fill
                        priority={index === 0}
                        sizes="(max-width: 1024px) 100vw, 58vw"
                        className="object-cover object-center brightness-95 contrast-[1.03] transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    </div>

                    {/* Subtle Vignette */}
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"
                      aria-hidden="true"
                    />
                  </div>
                </div>

                {/* Narrative / Text Column with Parallax */}
                <div
                  data-parallax-text
                  className={`lg:col-span-5 flex flex-col justify-center will-change-transform ${
                    isImageLeft
                      ? "order-2 lg:pl-4 xl:pl-8"
                      : "order-2 lg:order-1 lg:pr-4 xl:pr-8"
                  }`}
                >
                  {item.subtitle && (
                    <span className="font-mono text-xs sm:text-sm uppercase tracking-widest text-zinc-500 mb-2 sm:mb-3 font-medium block">
                      {item.subtitle}
                    </span>
                  )}

                  <h2
                    id={`feature-heading-${item.id}`}
                    className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-zinc-950 tracking-tight mb-4 sm:mb-6"
                  >
                    {item.title}
                  </h2>

                  <p className="font-inter text-sm sm:text-base lg:text-lg text-zinc-600 font-light leading-relaxed max-w-md">
                    {item.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export default ProductPerformance;
