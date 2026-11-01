"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stage1Ref = useRef<HTMLDivElement>(null);
  const stage1ContentRef = useRef<HTMLDivElement>(null);
  const stage1ImageRef = useRef<HTMLDivElement>(null);
  const stage1ImageInnerRef = useRef<HTMLDivElement>(null);
  const stage2Ref = useRef<HTMLDivElement>(null);
  const stage2ImageRef = useRef<HTMLDivElement>(null);
  const stage2ImageInnerRef = useRef<HTMLDivElement>(null);
  const stage2TextRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      // Respect prefers-reduced-motion
      if (
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        return;
      }

      gsap.registerPlugin(ScrollTrigger);

      // --- Stage 1 Entrance Animation (Runs once, stays permanently visible) ---
      const tlStage1 = gsap.timeline({
        scrollTrigger: {
          trigger: stage1Ref.current,
          start: "top 80%",
          once: true,
        },
      });

      tlStage1.from(".stage1-reveal", {
        y: 28,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power2.out",
      });

      if (stage1ImageRef.current) {
        tlStage1.from(
          stage1ImageRef.current,
          {
            opacity: 0,
            scale: 0.98,
            duration: 0.9,
            ease: "power2.out",
          },
          "-=0.5"
        );
      }

      // --- Stage 1 Parallax Scrub on Image ---
      if (stage1ImageInnerRef.current && stage1Ref.current) {
        gsap.fromTo(
          stage1ImageInnerRef.current,
          { yPercent: -12 },
          {
            yPercent: 12,
            ease: "none",
            scrollTrigger: {
              trigger: stage1Ref.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }
        );
      }

      // --- Stage 2 Entrance Animation (Runs once, stays permanently visible) ---
      const tlStage2 = gsap.timeline({
        scrollTrigger: {
          trigger: stage2Ref.current,
          start: "top 75%",
          once: true,
        },
      });

      if (stage2ImageRef.current) {
        tlStage2.from(stage2ImageRef.current, {
          opacity: 0,
          scale: 0.98,
          duration: 0.9,
          ease: "power2.out",
        });
      }

      if (stage2TextRef.current) {
        tlStage2.from(
          stage2TextRef.current,
          {
            y: 28,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.5"
        );
      }

      // --- Stage 2 Parallax Scrub on Image ---
      if (stage2ImageInnerRef.current && stage2Ref.current) {
        gsap.fromTo(
          stage2ImageInnerRef.current,
          { yPercent: -12 },
          {
            yPercent: 12,
            ease: "none",
            scrollTrigger: {
              trigger: stage2Ref.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }
        );
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="about"
      aria-labelledby="about-heading"
      className="relative z-20 w-full bg-black text-foreground overflow-hidden select-none shadow-[0_-30px_90px_rgba(0,0,0,0.98)]"
    >
      {/* Top Black Gradient Blend Transitioning from AdsSection
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-36 sm:h-52 lg:h-72 bg-gradient-to-b from-black via-black/85 to-transparent z-10"
        aria-hidden="true"
      /> */}

      <div
        ref={stage1Ref}
        className="relative pt-20 sm:pt-24 lg:pt-28 pb-10 sm:pb-14 lg:pb-16 flex flex-col justify-center"
      >
        {/* Subtle Cosmic Ambient Glow centered behind statement */}
        {/* <div
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[560px] lg:w-[740px] h-[300px] sm:h-[460px] rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(57,139,255,0.12),_rgba(118,88,201,0.06),_transparent_70%)] blur-3xl -z-10"
          aria-hidden="true"
        /> */}

        <Container className="w-full">
          {/* Asymmetrical 2-Column Editorial Composition for Stage 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-20 items-center">
            {/* Left Column: Narrative & Philosophy */}
            <div
              ref={stage1ContentRef}
              className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center"
            >
              {/* Monumental Headline */}
              <h2
                id="about-heading"
                className="stage1-reveal font-heading text-3xl sm:text-5xl md:text-6xl lg:text-[3.75rem] xl:text-[4.25rem] font-bold tracking-tight text-foreground uppercase leading-[1.02] mb-6 sm:mb-8"
              >
                The force behind<br />
                <span className="text-accent">the light.</span>
              </h2>

              {/* Concise Supporting Statement */}
              <p className="stage1-reveal text-base sm:text-lg lg:text-xl font-light text-muted-foreground leading-relaxed max-w-xl mb-8">
                We turn ambitious ideas into powerful LED display experiences designed for spaces, built for people.
              </p>
            </div>

            {/* Right Column: Stage 1 Architectural Display Photo */}
            <div className="lg:col-span-6 xl:col-span-6 flex justify-center lg:justify-end">
              <div
                ref={stage1ImageRef}
                className="relative w-full max-w-[600px] aspect-[16/10] sm:aspect-[16/10] overflow-hidden bg-card border border-border/70 shadow-2xl"
              >
                <div
                  ref={stage1ImageInnerRef}
                  className="relative w-full h-[125%] -top-[12.5%] will-change-transform"
                >
                  <Image
                    src="/images/about-wave.jpg"
                    alt="Anamorphic 3D LED wave display on architectural facade"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                    className="object-cover object-center select-none"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>


      <div
        ref={stage2Ref}
        className="relative pt-10 sm:pt-14 lg:pt-16 pb-20 sm:pb-24 lg:pb-28 border-t border-border/30 flex flex-col justify-center"
      >
        <Container className="w-full">
          {/* Asymmetrical Editorial Composition: Image as primary visual focus */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-20 items-center">
            {/* Image Column (Primary Visual Focus) */}
            <div className="lg:col-span-7 xl:col-span-7 order-2 lg:order-1">
              <div className="relative w-full">
                {/* Subtle blue/violet backlight accent */}
                <div
                  className="pointer-events-none absolute -inset-6 sm:-inset-10 -z-10 "
                  aria-hidden="true"
                />

                {/* Framed Image Showcase */}
                <div
                  ref={stage2ImageRef}
                  className="relative w-full aspect-[4/3] sm:aspect-[16/11] lg:aspect-[16/10] overflow-hidden bg-card border border-border/70 shadow-2xl"
                >
                  <div
                    ref={stage2ImageInnerRef}
                    className="relative w-full h-[125%] -top-[12.5%] will-change-transform"
                  >
                    <Image
                      src="/images/retail-space.png"
                      alt="Lumera architectural LED display installation in an active commercial retail environment"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 720px"
                      className="object-cover object-center select-none"
                    />
                  </div>

                  {/* Ambient edge gradient for depth */}
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 z-10"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>

            {/* Secondary Narrative Column */}
            <div
              ref={stage2TextRef}
              className="lg:col-span-5 xl:col-span-5 order-1 lg:order-2 flex flex-col justify-center"
            >
              {/* Editorial Subhead */}
              <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground uppercase leading-[1.08] mb-6">
                Crafted for spaces.<br />
                <span className="text-accent">Built for people.</span>
              </h3>

              {/* Human-Centered Copy */}
              <p className="text-base sm:text-lg lg:text-xl font-light text-muted-foreground leading-relaxed mb-8 sm:mb-10">
                From the first site assessment to the final pixel, we bring clarity, care, and technical
                 precision to every installation. Our work is about more than screens it’s about creating moments people remember.
              </p>

              {/* Our Approach Button */}
              <div>
                <Link href="#installation" className="inline-block">
                  <Button variant="gold" size="md">
                    Our approach
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}

export default AboutSection;
