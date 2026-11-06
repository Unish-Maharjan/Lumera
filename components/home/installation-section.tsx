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
    src: "/images/installation/image-2.jfif",
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

const HIDDEN = "inset(100% 0% 0% 0%)"; // fully clipped (wipe starts at the bottom)
const SHOWN = "inset(0% 0% 0% 0%)";

export default function WatchInstallation() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const pin = pinRef.current;
      const layers = gsap.utils.toArray<HTMLElement>(".js-layer");
      if (!pin || layers.length !== stages.length) return;

      // One ScrollTrigger: pin + scrub with natural pinSpacing
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          pin,
          pinSpacing: true, // natural document flow without overlapping next section
          anticipatePin: 1,
          fastScrollEnd: true,
          invalidateOnRefresh: true,
        },
      });

      // Reveals layer i from the bottom
      const wipe = (i: number, at?: number) => {
        tl.fromTo(
          layers[i],
          { clipPath: HIDDEN },
          { clipPath: SHOWN, duration: 1, ease: "none" },
          at
        );
      };

      wipe(1, 0.05); // Stage 1 → 2
      tl.to({}, { duration: 0.5 }); // hold stage 2
      wipe(2); // Stage 2 → 3
      tl.to({}, { duration: 0.5 }); // brief hold stage 3 before natural scroll continues
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="process"
      aria-labelledby="process-heading"
      className="relative w-full h-[320vh] bg-[#F7F7F5] select-none overflow-x-clip z-10"
    >
      {/* Pinned viewport */}
      <div
        ref={pinRef}
        className="relative h-screen w-full bg-[#F7F7F5] select-none overflow-hidden z-10 transform-gpu"
      >
        {/* Each stage is a FULL-SCREEN layer (background + header + image + title),
            so one clip-path moves all of it together */}
        {stages.map((stage, i) => {
          const dark = i === 1;
          const [first, second] = stage.title.split(" & ");
          const Heading = i === 0 ? "h2" : "p";

          return (
            <div
              key={stage.src}
              className={`js-layer absolute inset-0 flex flex-col justify-between py-6 sm:py-8 lg:py-10 px-4 sm:px-6 lg:px-8 will-change-[clip-path] ${
                dark ? "bg-black text-white" : "bg-[#F7F7F5] text-zinc-950"
              }`}
              style={i > 0 ? { clipPath: HIDDEN } : undefined}
            >
              {/* Header */}
              <div className="w-full max-w-7xl mx-auto flex justify-center shrink-0 pt-2 sm:pt-4">
                <Heading
                  id={i === 0 ? "process-heading" : undefined}
                  className="font-heading text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-center"
                >
                  Our process.
                </Heading>
              </div>

              {/* Image */}
              <div className="flex-1 w-full max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto flex items-center justify-center my-auto py-2 sm:py-4">
                <div className="relative w-full aspect-[16/9] max-h-[58vh] sm:max-h-[64vh] lg:max-h-[68vh] rounded-xl sm:rounded-2xl overflow-hidden">
                  <img
                    src={stage.src}
                    alt={stage.title}
                    draggable={false}
                    className="absolute inset-0 h-full w-full object-contain object-center"
                  />
                </div>
              </div>

              {/* Title */}
              <div className="w-full max-w-2xl mx-auto shrink-0 pb-2 sm:pb-4">
                <div className="h-14 sm:h-16 flex items-center justify-center">
                  <h3 className="font-heading text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold uppercase tracking-tight text-center">
                    {second ? (
                      <>
                        {first} &amp;{" "} {second}
                      </>
                    ) : (
                      stage.title
                    )}
                  </h3>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export { WatchInstallation as InstallationSection };
