"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Container from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

interface RentalScreen {
  id: string;
  name: string;
  classification: string;
  dimensions: string;
  pixelPitch: string;
  availability: string;
  image: string;
}

const RENTAL_SCREENS: RentalScreen[] = [
  {
    id: "lumera-vortex-r",
    name: "LUMERA VORTEX-R",
    classification: "Indoor Stage & Virtual XR",
    dimensions: "Up to 24m × 8m (Modular)",
    pixelPitch: "P1.9mm – P2.6mm",
    availability: "Available in Fleet",
    image: "/images/buildspace/events.avif",
  },
  {
    id: "lumera-strata-r",
    name: "LUMERA STRATA-R",
    classification: "Outdoor Stadium & Festivals",
    dimensions: "16m × 9m Arena Format",
    pixelPitch: "P3.9mm IP68 Outdoor",
    availability: "Available Nationwide",
    image: "/images/buildspace/outdoor.avif",
  },
  {
    id: "lumera-crystal-r",
    name: "LUMERA CRYSTAL-R",
    classification: "Transparent Glass LED",
    dimensions: "10m × 4m Video Curtain",
    pixelPitch: "P3.91mm Transparent",
    availability: "Available in Fleet",
    image: "/images/buildspace/mall.avif",
  },
  {
    id: "lumera-curve-r",
    name: "LUMERA CURVE-R",
    classification: "3D Curved & Anamorphic",
    dimensions: "12m × 5m (90° Corner)",
    pixelPitch: "P2.5mm Anamorphic",
    availability: "Available for Booking",
    image: "/images/event-screen.png",
  },
];

export function RentingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current || !cardsRef.current) return;
      gsap.registerPlugin(ScrollTrigger);

      const cards = cardsRef.current.querySelectorAll(".rental-card");
      gsap.fromTo(
        cards,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="rental"
      aria-labelledby="rental-heading"
      className="relative w-full bg-[#F7F7F5] text-zinc-950 py-10 -mt-1 sm:py-14 lg:py-25 
      select-none font-sans"
    >
      <Container size="xl">
        {/* Section Header matching other sections */}
        <div className="max-w-5xl mx-auto mb-12 sm:mb-16 lg:mb-20 text-center">
          <h2
            id="rental-heading"
            className="font-heading text-3xl sm:text-5xl md:text-6xl font-bold text-zinc-950 uppercase mb-4 sm:mb-5"
          >
            FOR <span className="text-[#D7B875]">Renting</span>
          </h2>
        </div>

        {/* Symmetric 2-Column Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
        >
          {RENTAL_SCREENS.map((screen) => (
            <article
              key={screen.id}
              className="group rental-card flex flex-col justify-between bg-white rounded-xl sm:rounded-2xl border border-[#E5E5E0] hover:border-black/20 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden font-sans"
            >
              {/* Image Stage with Smooth Scale on Hover */}
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-zinc-100">
                <Image
                  src={screen.image}
                  alt={screen.name}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500 pointer-events-none" />
              </div>

              {/* Necessary Content Only with Inter Font */}
              <div className="p-5 sm:p-6 flex flex-col justify-between flex-1">
                <div>
                  {/* Classification & Live Availability */}
                  <div className="flex items-center justify-between text-xs text-[#777777] mb-2 font-sans">
                    <span className="uppercase font-medium text-black">
                      {screen.classification}
                    </span>
                    <span className="flex items-center gap-1.5 text-emerald-600 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      {screen.availability}
                    </span>
                  </div>

                  {/* Screen Name with Hover Color Accent */}
                  <h3 className="font-sans text-xl sm:text-2xl font-bold uppercase text-black group-hover:text-[#D7B875] transition-colors duration-300">
                    {screen.name}
                  </h3>

                  {/* Dimensions & Pixel Pitch */}
                  <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-[#E5E5E0] font-sans">
                    <div>
                      <span className="block text-[10px] uppercase text-[#777777] font-medium mb-1">
                        Dimensions
                      </span>
                      <span className="text-xs sm:text-sm font-semibold text-black">
                        {screen.dimensions}
                      </span>
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase text-[#777777] font-medium mb-1">
                        Pixel Pitch
                      </span>
                      <span className="text-xs sm:text-sm font-semibold text-black">
                        {screen.pixelPitch}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Divider and Bottom Action Row */}
                <div className="mt-6 pt-4 border-t border-[#E5E5E0] flex items-center justify-between font-sans">
                  <span className="text-xs text-[#777777]">
                    Turnkey Rigging Included
                  </span>

                  <Link href="/contact" draggable={false}>
                    <Button
                      size="sm"
                      rounded="full"
                      className="!bg-black !text-white !border !border-black
                       transition-all duration-300 whitespace-nowrap active:scale-95 cursor-pointer 
                       shadow-xs hover:shadow-md"
                    >
                      Enquire Now
                    </Button>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default RentingSection;
