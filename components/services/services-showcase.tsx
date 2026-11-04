"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  linkText?: string;
  href?: string;
  imagePosition: "left" | "right";
}

export const SERVICES: ServiceItem[] = [
  {
    id: "installation",
    title: "Installation",
    description:
      "Professional installation for flawless performance, anywhere you need it.",
    imageSrc: "/images/ourservices/service-1.jpg",
    imageAlt: "Professional exterior architectural LED installation",
    linkText: "Learn More",
    href: "/#contact-cta",
    imagePosition: "left",
  },
  {
    id: "consultation",
    title: "Consultation",
    description:
      "Expert advice to help you choose the right LED solution.",
    imageSrc: "/images/ourservices/service-2.jpg",
    imageAlt: "Curved panoramic LED atrium display consultation",
    linkText: "Learn More",
    href: "/#contact-cta",
    imagePosition: "right",
  },
  {
    id: "custom-solutions",
    title: "Custom Solutions",
    description:
      "Tailored LED displays designed to fit your unique needs and ideas.",
    imageSrc: "/images/ourservices/service-3.jpg",
    imageAlt: "Custom monumental corner LED display installation",
    linkText: "Learn More",
    href: "/#contact-cta",
    imagePosition: "left",
  },
];

export function ServicesShowcase({
  services = SERVICES,
}: {
  services?: ServiceItem[];
}) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Respect prefers-reduced-motion accessibility preference
      if (
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        gsap.set("[data-parallax-image]", { yPercent: 0 });
        return;
      }

      // Query all parallax image frames within this section
      const frames = gsap.utils.toArray<HTMLElement>("[data-parallax-frame]");
      frames.forEach((frame) => {
        const img = frame.querySelector<HTMLElement>("[data-parallax-image]");
        if (!img) return;

        gsap.fromTo(
          img,
          { yPercent: -14 },
          {
            yPercent: 14,
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
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      aria-labelledby="services-showcase-heading"
      className="relative w-full bg-black text-foreground py-11 sm:py-15 lg:py-17 overflow-hidden select-none"
    >
      <Container size="xl">
        {/* Section Header at Top Middle */}
        <div className="max-w-2xl mx-auto text-center mb-16 sm:mb-20 lg:mb-28">
          <h2
            id="services-showcase-heading"
            className="font-heading text-3xl sm:text-5xl md:text-6xl font-bold uppercase leading-[1.05] tracking-tight text-white"
          >
            OUR <span className="text-accent">SERVICES</span>
          </h2>
        </div>

        <div className="flex flex-col space-y-24 sm:space-y-32 lg:space-y-40">
          {services.map((service, index) => {
            const isImageLeft = service.imagePosition === "left";

            return (
              <article
                key={service.id}
                aria-labelledby={`service-heading-${service.id}`}
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
                    className="group relative w-full aspect-[16/10] overflow-hidden bg-zinc-950 border border-white/10 transition-colors duration-300 hover:border-white/20"
                  >
                    <div
                      data-parallax-image
                      className="relative w-full h-[128%] -top-[14%] will-change-transform"
                    >
                      <Image
                        src={service.imageSrc}
                        alt={service.imageAlt}
                        fill
                        priority={index === 0}
                        sizes="(max-width: 1024px) 100vw, 58vw"
                        className="object-cover object-center brightness-95 contrast-[1.05]"
                      />
                    </div>

                    {/* Subtle Dark Vignette Border */}
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"
                      aria-hidden="true"
                    />
                  </div>
                </div>

                {/* Narrative / Text Column */}
                <div
                  className={`lg:col-span-5 flex flex-col justify-center ${
                    isImageLeft
                      ? "order-2 lg:pl-4 xl:pl-8"
                      : "order-2 lg:order-1 lg:pr-4 xl:pr-8"
                  }`}
                >
                  <h2
                    id={`service-heading-${service.id}`}
                    className="font-heading text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-tight mb-4 sm:mb-6"
                  >
                    {service.title}
                  </h2>

                  <p className="font-sans text-sm sm:text-base text-zinc-400 font-light leading-relaxed max-w-md mb-6 sm:mb-8">
                    {service.description}
                  </p>

                  <div>
                    <Link href={service.href || "/#contact-cta"}>
                      <Button
                        variant="primary"
                        size="sm"
                        rounded="full"
                        className="group inline-flex items-center gap-2"
                      >
                        <span>{service.linkText || "Learn More"}</span>
                      </Button>
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export default ServicesShowcase;
