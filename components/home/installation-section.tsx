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
    title: "Plan & Design",
    desc: "We plan the structure, dimensions, and layout to ensure a precise fit\
     and seamless installation.",
  },
  {
    src: "/images/installation/image-2.jfif",
    step: "STEP 02",
    title: "Install & Assemble",
    desc: "Our team securely assembles the LED panels, connects the wiring, and ensures every component fits perfectly.",
  },
  {
    src: "/images/installation/3gold.png",
    step: "STEP 03",
    title: "Testing & Calibration",
    desc: "We fine-tune brightness, color, and performance to deliver a clear, vibrant, and reliable display.",
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

      // Initial image clipPath states
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

      // Initial text clipPath states (allow horizontal overflow to stay visible while doing vertical wipe)
      if (texts.length === stages.length) {
        gsap.set(texts, {
          opacity: 1,
          clipPath: "inset(100% -100% 0% -100%)",
          WebkitClipPath: "inset(100% -100% 0% -100%)",
        });

        // First text is fully visible
        gsap.set(texts[0], {
          clipPath: "inset(0% -100% 0% -100%)",
          WebkitClipPath: "inset(0% -100% 0% -100%)",
        });
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

      // Stage 1 → Stage 2 (Images & Texts animate with exact same clipPath at exact same time)
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

      if (texts.length === stages.length) {
        tl.to(
          texts[0],
          {
            clipPath: "inset(0% -100% 100% -100%)",
            WebkitClipPath: "inset(0% -100% 100% -100%)",
            duration: 1,
            ease: "none",
          },
          "<"
        );

        tl.to(
          texts[1],
          {
            clipPath: "inset(0% -100% 0% -100%)",
            WebkitClipPath: "inset(0% -100% 0% -100%)",
            duration: 1,
            ease: "none",
          },
          "<"
        );
      }

      // Hold stage 2
      tl.to({}, { duration: 0.5 });

      // Stage 2 → Stage 3 (Images & Texts animate with exact same clipPath at exact same time)
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

      if (texts.length === stages.length) {
        tl.to(
          texts[1],
          {
            clipPath: "inset(0% -100% 100% -100%)",
            WebkitClipPath: "inset(0% -100% 100% -100%)",
            duration: 1,
            ease: "none",
          },
          "<"
        );

        tl.to(
          texts[2],
          {
            clipPath: "inset(0% -100% 0% -100%)",
            WebkitClipPath: "inset(0% -100% 0% -100%)",
            duration: 1,
            ease: "none",
          },
          "<"
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
      className="relative h-screen min-h-screen w-full
       bg-black select-none flex flex-col justify-between mt-20 py-10 sm:py-18 lg:py-20 
       "
    >
      {/* Top Header */}
      <div className="w-full max-w-7xl mx-auto flex items-center
       justify-center pb-3 sm:pb-4 z-20">
        <h2
          id="process-heading"
          className="font-heading text-2xl sm:text-3xl md:text-7xl
          font-bold text-white uppercase"
        >
          Our <span className="text-accent">process</span>.
        </h2>
      </div>

      {/* 2-Column Split: Left = Image (70%), Right = Title & Description (30%) - Full Width */}
      <div className="flex-1 w-full grid grid-cols-1 lg:grid-cols-10 gap-4 items-center relative py-2 sm:py-4 px-4 sm:px-6 lg:px-10 xl:px-14">
        {/* Left Side: Photo Container (70%) */}
        <div className="lg:col-span-7 relative w-full h-[42svh] sm:h-[50svh] lg:h-[65vh] xl:h-[70vh] overflow-hidden rounded-xs flex items-center justify-center">
          {stages.map((stage, index) => (
            <img
              key={stage.src}
              ref={(el) => {
                if (el) imageRefs.current[index] = el;
              }}
              src={stage.src}
              alt={stage.title}
              className="absolute inset-0 h-full w-full object-contain object-center will-change-[clip-path]"
              draggable={false}
            />
          ))}
        </div>

        {/* Right Side: Title and Description for each photo (30%) */}
        <div className="lg:col-span-3 relative w-full h-[28svh] sm:h-[30svh]
         lg:h-[65vh] xl:h-[70vh] flex items-center overflow-visible">
          {stages.map((stage, index) => (
            <div
              key={stage.src}
              ref={(el) => {
                if (el) textRefs.current[index] = el;
              }}
              className="absolute inset-0 flex flex-col justify-center px-1 sm:px-2 lg:px-4 will-change-[clip-path] overflow-visible"
              style={{
                clipPath: index === 0 ? "inset(0% -100% 0% -100%)" : "inset(100% -100% 0% -100%)",
                WebkitClipPath: index === 0 ? "inset(0% -100% 0% -100%)" : "inset(100% -100% 0% -100%)",
              }}
            >
              {/* Title */}
              <h3 className="font-heading text-lg sm:text-xl md:text-2xl lg:text-xl xl:text-2xl 2xl:text-3xl font-bold uppercase text-white whitespace-nowrap mb-6 sm:mb-8 lg:mb-10 w-max overflow-visible">
                {stage.title.includes("&") ? (
                  <>
                    {stage.title.split("&")[0]}&amp;{" "}
                    <span className="text-accent">
                      {stage.title.split("&")[1].trim()}
                    </span>
                  </>
                ) : (
                  stage.title
                )}
              </h3>

              {/* Description */}
              <p className="font-sans text-xs sm:text-sm lg:text-sm xl:text-base text-zinc-300 font-light max-w-md">
                {stage.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export { WatchInstallation as InstallationSection };
