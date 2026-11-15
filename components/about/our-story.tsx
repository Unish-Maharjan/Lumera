"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Container from "@/components/ui/Container";
import TrustCounter from "../home/trust-counter";
import { Heading } from "../ui";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function OurStory() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Respect prefers-reduced-motion accessibility preference
      if (
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        gsap.set("[data-parallax-image]", { yPercent: 0 });
        gsap.set("[data-parallax-text]", { y: 0 });
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

      // Query all story articles for narrative text parallax
      const articles = gsap.utils.toArray<HTMLElement>("[data-story-article]");
      articles.forEach((article) => {
        const textCol = article.querySelector<HTMLElement>("[data-parallax-text]");
        if (!textCol) return;

        gsap.fromTo(
          textCol,
          { y: 48 },
          {
            y: -48,
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
    <>
      <section
        ref={sectionRef}
        id="our-story"
        aria-labelledby="story-heading"
        className="relative w-full bg-[#F7F7F5] text-zinc-950 pt-20 sm:pt-28 lg:pt-36 overflow-hidden select-none"
      >
        <Container size="xl">
          {/* Container 1: About Us */}
          <article
            data-story-article
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center"
          >
            {/* Narrative Column with Parallax */}
            <div
              data-parallax-text
              className="lg:col-span-6 flex flex-col justify-center will-change-transform"
            >
              <Heading size="xl" variant="dark">About us</Heading>

              <p className="font-inter text-base sm:text-lg text-zinc-600 mt-10 font-medium leading-relaxed max-w-xl">
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
                data-parallax-frame
                className="group relative w-full aspect-[4/3] sm:aspect-[16/10] overflow-hidden bg-zinc-100 border border-black/10 rounded-xl sm:rounded-2xl shadow-sm transition-colors duration-300 hover:border-zinc-300"
              >
                <div
                  data-parallax-image
                  className="relative w-full h-[128%] -top-[14%] will-change-transform"
                >
                  <Image
                    src="/images/event-screen.png"
                    alt="Lumera curved interior LED architectural installation"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-center brightness-95 contrast-[1.05]"
                  />
                </div>

                {/* Subtle Dark Vignette Border */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"
                  aria-hidden="true"
                />
              </div>
            </div>
          </article>

          {/* Container 2: Our Mission */}
          <article
            data-story-article
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center mt-20 sm:mt-28 lg:mt-36"
          >
            {/* Architectural Image Column with Parallax */}
            <div className="lg:col-span-6">
              <div
                data-parallax-frame
                className="group relative w-full aspect-[4/3] sm:aspect-[16/10] overflow-hidden bg-zinc-100 border border-black/10 rounded-xl sm:rounded-2xl shadow-sm transition-colors duration-300 hover:border-zinc-300"
              >
                <div
                  data-parallax-image
                  className="relative w-full h-[128%] -top-[14%] will-change-transform"
                >
                  <Image
                    src="/images/our-mission.jpg"
                    alt="Lumera architectural mission installation"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-center brightness-95 contrast-[1.05]"
                  />
                </div>

                {/* Subtle Dark Vignette Border */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"
                  aria-hidden="true"
                />
              </div>
            </div>

            {/* Narrative Column with Parallax */}
            <div
              data-parallax-text
              className="lg:col-span-6 flex flex-col justify-center text-right will-change-transform"
            >
              <Heading size="xl" variant="dark" align="right">Our mission</Heading>

              <p className="font-inter text-base sm:text-lg text-zinc-600 mt-10 ml-13 font-medium 
              leading-relaxed max-w-xl">
                Our mission is to redefine how light interacts with the built environment, creating meaningful visual experiences that elevate architectural spaces. We combine precision engineering, innovative LED technology, and thoughtful design to deliver enduring digital installations that inspire connection, transform environments, and shape the way people experience spaces.
              </p>
            </div>          
          </article>

          {/* Integrated Trust Counter */}
          <TrustCounter />
        </Container>
      </section>
    </>
  );
}

export default OurStory;
