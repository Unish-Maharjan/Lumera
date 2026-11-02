/* eslint-disable @next/next/no-img-element */
"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface StageItem {
  src: string;
  step: string;
  title: string;
  desc: string;
}

const stages: StageItem[] = [
  {
    src: "/images/installation/1.png",
    step: "STEP 01",
    title: "Engineering & CAD Blueprint",
    desc: "Structural framing calculations, 4800mm grid layout, and laser-guided alignment tolerances.",
  },
  {
    src: "/images/installation/image-2.jfif",
    step: "STEP 02",
    title: "Hardware Assembly & Precision Wiring",
    desc: "Die-cast module integration, redundant power distribution, and high-throughput data cabling.",
  },
  {
    src: "/images/installation/3.png",
    step: "STEP 03",
    title: "Optical Calibration & Illumination",
    desc: "Sub-pixel chromatic balancing, thermal stress testing, and living monumental presence.",
  },
];

export default function WatchInstallation() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRefs = useRef<HTMLImageElement[]>([]);
  const textRefs = useRef<HTMLDivElement[]>([]);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const images = imageRefs.current;
      const texts = textRefs.current;

      if (!section || images.length !== stages.length) return;

      // Initial image states
      gsap.set(images, {
        opacity: 1,
        clipPath: "inset(100% 0% 0% 0%)",
        WebkitClipPath: "inset(100% 0% 0% 0%)",
      });

      // First image is fully visible
      gsap.set(images[0], {
        clipPath: "inset(0% 0% 0% 0%)",
        WebkitClipPath: "inset(0% 0% 0% 0%)",
      });

      // Initial text states: Step 1 active, others hidden
      if (texts.length === stages.length) {
        gsap.set(texts, { opacity: 0, y: 14 });
        gsap.set(texts[0], { opacity: 1, y: 0 });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=300%",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Stage 1 → Stage 2
      tl.to(images[0], {
        clipPath: "inset(0% 0% 100% 0%)",
        WebkitClipPath: "inset(0% 0% 100% 0%)",
        duration: 1,
        ease: "none",
      });

      tl.to(
        images[1],
        {
          clipPath: "inset(0% 0% 0% 0%)",
          WebkitClipPath: "inset(0% 0% 0% 0%)",
          duration: 1,
          ease: "none",
        },
        "<"
      );

      // Text 0 → Text 1
      if (texts.length === stages.length) {
        tl.to(
          texts[0],
          {
            opacity: 0,
            y: -12,
            duration: 0.45,
            ease: "power2.inOut",
          },
          "<"
        );
        tl.to(
          texts[1],
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
          },
          "<+=0.2"
        );
      }

      // Hold stage 2
      tl.to({}, { duration: 0.5 });

      // Stage 2 → Stage 3
      tl.to(images[1], {
        clipPath: "inset(0% 0% 100% 0%)",
        WebkitClipPath: "inset(0% 0% 100% 0%)",
        duration: 1,
        ease: "none",
      });

      tl.to(
        images[2],
        {
          clipPath: "inset(0% 0% 0% 0%)",
          WebkitClipPath: "inset(0% 0% 0% 0%)",
          duration: 1,
          ease: "none",
        },
        "<"
      );

      // Text 1 → Text 2
      if (texts.length === stages.length) {
        tl.to(
          texts[1],
          {
            opacity: 0,
            y: -12,
            duration: 0.45,
            ease: "power2.inOut",
          },
          "<"
        );
        tl.to(
          texts[2],
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
          },
          "<+=0.2"
        );
      }

      tl.to({}, { duration: 0.75 });

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    },
    {
      scope: sectionRef,
      dependencies: [],
    }
  );

  return (
    <section
      ref={sectionRef}
      id="process"
      aria-labelledby="process-heading"
      className="relative h-screen min-h-screen w-full overflow-hidden bg-black select-none flex flex-col justify-between"
    >
      {/* Top Header & Dynamic Stage Content in empty space */}
      <div className="w-full pt-8 sm:pt-10 lg:pt-12 px-4 sm:px-8 max-w-5xl mx-auto flex flex-col items-center justify-center text-center z-20">
        <h2
          id="process-heading"
          className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white uppercase tracking-tight mb-2 sm:mb-3"
        >
          Our <span className="text-accent">process</span>.
        </h2>
{/* 
        Dynamic Stage Info Container
        <div className="relative h-14 sm:h-16 w-full flex items-center justify-center">
          {stages.map((stage, index) => (
            <div
              key={stage.src}
              ref={(el) => {
                if (el) textRefs.current[index] = el;
              }}
              className="absolute inset-0 flex flex-col items-center justify-center will-change-[transform,opacity]"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-[10px] sm:text-xs text-accent uppercase tracking-[0.25em] font-semibold">
                  {stage.step}
                </span>
                <span className="text-zinc-600 text-xs">•</span>
                <h3 className="font-heading text-sm sm:text-base md:text-lg font-medium text-white uppercase tracking-wider">
                  {stage.title}
                </h3>
              </div>
              <p className="font-sans text-xs sm:text-sm text-zinc-400 font-light max-w-xl line-clamp-2">
                {stage.desc}
              </p>
            </div>
          ))}
        </div> */}
      </div>

      {/* 75% Image Container */}
      <div className="relative flex-1 w-full overflow-hidden pb-4 sm:pb-6">
        {stages.map((stage, index) => (
          <img
            key={stage.src}
            ref={(el) => {
              if (el) imageRefs.current[index] = el;
            }}
            src={stage.src}
            alt={stage.title}
            className="absolute inset-0 h-full w-full object-contain object-center"
            draggable={false}
          />
        ))}
      </div>
    </section>
  );
}

export { WatchInstallation as InstallationSection };
