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
  points: string[];
}

const stages: StageItem[] = [
  {
    src: "/images/installation/1_1.png",
    step: "STEP 01",
    title: "Plan & Design",
    points: [
      "Site architectural assessment & spatial mapping",
      "Structural load engineering & custom mounting design",
      "Electrical power calculation & redundant data routing",
    ],
  },
  {
    src: "/images/installation/2_2.png",
    step: "STEP 02",
    title: "Install & Assemble",
    points: [
      "Precision framework rigging & laser-guided leveling",
      "Die-cast cabinet interlock with seamless module alignment",
      "Power distribution bridging & clean signal cabling",
    ],
  },
  {
    src: "/images/installation/3_3.png",
    step: "STEP 03",
    title: "Testing & Calibration",
    points: [
      "Full-raster diode uniformity & brightness equalization",
      "Thermal stress profiling & electrical load testing",
      "Color temperature, gamma & video processor calibration",
    ],
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
          clipPath: "inset(100% -50% 0% -50%)",
          WebkitClipPath: "inset(100% -50% 0% -50%)",
        });

        // First text is fully visible
        gsap.set(texts[0], {
          clipPath: "inset(0% -50% 0% -50%)",
          WebkitClipPath: "inset(0% -50% 0% -50%)",
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

      // Stage 1 → Stage 2 (Images & Centered Titles animate in exact lockstep)
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
            clipPath: "inset(0% -50% 100% -50%)",
            WebkitClipPath: "inset(0% -50% 100% -50%)",
            duration: 1,
            ease: "none",
          },
          "<"
        );

        tl.to(
          texts[1],
          {
            clipPath: "inset(0% -50% 0% -50%)",
            WebkitClipPath: "inset(0% -50% 0% -50%)",
            duration: 1,
            ease: "none",
          },
          "<"
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

      if (texts.length === stages.length) {
        tl.to(
          texts[1],
          {
            clipPath: "inset(0% -50% 100% -50%)",
            WebkitClipPath: "inset(0% -50% 100% -50%)",
            duration: 1,
            ease: "none",
          },
          "<"
        );

        tl.to(
          texts[2],
          {
            clipPath: "inset(0% -50% 0% -50%)",
            WebkitClipPath: "inset(0% -50% 0% -50%)",
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
      className="relative h-screen min-h-screen w-full bg-[#F7F7F5] select-none flex flex-col justify-between py-6 sm:py-8 lg:py-10 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Top Header */}
      <div className="w-full max-w-7xl mx-auto flex items-center justify-center shrink-0 pt-2 sm:pt-4 z-20">
        <h2
          id="process-heading"
          className="font-heading text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-950 uppercase tracking-tight text-center"
        >
          Our <span className="text-[#D7B875]">process</span>.
        </h2>
      </div>

      {/* Middle: Centered Large Image Stage */}
      <div className="flex-1 w-full max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto flex items-center 
      justify-center my-auto py-2 sm:py-4">
        <div className="relative w-full aspect-[16/9] max-h-[58vh] sm:max-h-[64vh]
         lg:max-h-[68vh] rounded-xl sm:rounded-2xl overflow-hidden
          flex items-center justify-center">
          {stages.map((stage, index) => (
            <img
              key={stage.src}
              ref={(el) => {
                if (el) imageRefs.current[index] = el;
              }}
              src={stage.src}
              alt={stage.title}
              className="absolute inset-0 h-full w-full object-contain object-center 
              will-change-[clip-path]"
              draggable={false}
            />
          ))}
        </div>
      </div>

      {/* Bottom: Centered Stage Title */}
      <div className="w-full max-w-2xl mx-auto shrink-0 pb-2 sm:pb-4 z-20">
        <div className="relative w-full h-14 sm:h-16 flex items-center justify-center overflow-visible">
          {stages.map((stage, index) => (
            <div
              key={stage.src}
              ref={(el) => {
                if (el) textRefs.current[index] = el;
              }}
              className="absolute inset-0 flex flex-col items-center -mt-10 justify-center text-center will-change-[clip-path] overflow-visible"
              style={{
                clipPath: index === 0 ? "inset(0% -50% 0% -50%)" : "inset(100% -50% 0% -50%)",
                WebkitClipPath: index === 0 ? "inset(0% -50% 0% -50%)" : "inset(100% -50% 0% -50%)",
              }}
            >
              <h3 className="font-heading text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold uppercase text-zinc-950 tracking-tight">
                {stage.title.includes("&") ? (
                  <>
                    {stage.title.split("&")[0]}&amp;{" "}
                    <span className="text-[#D7B875]">
                      {stage.title.split("&")[1].trim()}
                    </span>
                  </>
                ) : (
                  stage.title
                )}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export { WatchInstallation as InstallationSection };
