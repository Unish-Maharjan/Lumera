"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Container from "@/components/ui/Container";
import TrustCounter from "../home/trust-counter";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function OurStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const frame1Ref = useRef<HTMLDivElement>(null);
  const image1Ref = useRef<HTMLDivElement>(null);
  const frame2Ref = useRef<HTMLDivElement>(null);
  const image2Ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Respect prefers-reduced-motion accessibility
      if (
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        if (image1Ref.current) gsap.set(image1Ref.current, { yPercent: 0 });
        if (image2Ref.current) gsap.set(image2Ref.current, { yPercent: 0 });
        return;
      }

      // Parallax scroll for Container 1 image (Event Screen)
      if (image1Ref.current && frame1Ref.current) {
        gsap.fromTo(
          image1Ref.current,
          { yPercent: -15 },
          {
            yPercent: 15,
            ease: "none",
            scrollTrigger: {
              trigger: frame1Ref.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
              invalidateOnRefresh: true,
            },
          }
        );
      }

      // Parallax scroll for Container 2 image
      if (image2Ref.current && frame2Ref.current) {
        gsap.fromTo(
          image2Ref.current,
          { yPercent: -15 },
          {
            yPercent: 15,
            ease: "none",
            scrollTrigger: {
              trigger: frame2Ref.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
              invalidateOnRefresh: true,
            },
          }
        );
      }
    },
    { scope: sectionRef }
  );

  return (
    <>
      <section
        ref={sectionRef}
        id="our-story"
        aria-labelledby="story-heading"
        className="relative w-full bg-[#F7F7F5] text-zinc-950 pt-20 sm:pt-28 lg:pt-36 
        overflow-hidden select-none"
      >
        {/* Container 1: Our Story */}
        <Container size="xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Narrative Column */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              <h2
                id="story-heading"
                className="font-heading text-3xl sm:text-5xl md:text-6xl font-bold uppercase leading-[1.05] tracking-tight text-zinc-950 mb-6 sm:mb-8"
              >
                The force behind the <span className="text-[#D7B875]">light.</span>
              </h2>

              <p className="font-inter text-base sm:text-lg text-zinc-600 font-medium leading-relaxed max-w-xl">
                Founded on the belief that digital illumination should integrate 
                seamlessly with architectural form, Lumera bridges structural
                engineering with spatial artistry. 
                We partner with architects, developers, 
                and institutions to turn structural surfaces
                into living, responsive media engineered for permanence.
              </p>
            </div>

            {/* Architectural Image Column with Parallax */}
            <div className="lg:col-span-6">
              <div
                ref={frame1Ref}
                className="relative w-full aspect-[4/3] sm:aspect-[16/10] overflow-hidden rounded-xl sm:rounded-2xl border border-black/10 bg-zinc-100 shadow-sm"
              >
                <div
                  ref={image1Ref}
                  className="relative w-full h-[130%] -top-[15%] will-change-transform"
                >
                  <Image
                    src="/images/event-screen.png"
                    alt="Lumera curved interior LED architectural installation"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-center"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Integrated Trust Counter */}
          <TrustCounter />
        </Container>

        {/* Container 2: Our Philosophy (Optional Secondary Container) */}
        {/* <Container size="xl" className="mt-32 sm:mt-40 lg:mt-48 xl:mt-56">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6 order-2 lg:order-1">
              <div
                ref={frame2Ref}
                className="relative w-full aspect-[4/3] sm:aspect-[16/11] overflow-hidden rounded-xl sm:rounded-2xl border border-black/10 bg-zinc-100 shadow-sm"
              >
                <div
                  ref={image2Ref}
                  className="relative w-full h-[130%] -top-[15%] will-change-transform"
                >
                  <Image
                    src="/images/event-screen.png"
                    alt="Architectural structure harmonizing with precision lighting"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-center"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 order-1 lg:order-2 flex flex-col justify-center">
              <h2 className="font-heading text-3xl sm:text-5xl md:text-6xl font-bold uppercase leading-[1.05] tracking-tight text-zinc-950 mb-6 sm:mb-8">
                Precision is the <span className="text-[#D7B875]">foundation.</span>
              </h2>

              <p className="font-sans text-base sm:text-lg text-zinc-600 font-light leading-relaxed max-w-xl">
                We approach light not as superficial decoration, but as an architectural
                discipline. By calibrating diode pitch, thermal performance, 
                and chromatic purity at the micron level.
              </p>
            </div>
          </div>
        </Container> */}
      </section>
    </>
  );
}

export default OurStory;
