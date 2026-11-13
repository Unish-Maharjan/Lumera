"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { EventCaseStudy, GalleryPhoto } from "@/data/event-case-study";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface EventGalleryProps {
  event?: EventCaseStudy;
  gallery?: GalleryPhoto[];
  venueName?: string;
  location?: string;
  image?: string;
  description?: string;
}

export function EventGallery({
  event,
  image,
  description,
}: EventGalleryProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const imageFrameRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const venueImage =
    image ||
    event?.aboutVenue?.image ||
    "/images/events/arial-view.jpg";

  const venueDescription =
    description ||
    event?.aboutVenue?.description ||
    `${event?.venue || "Dasarath Rangashala National Stadium"}, located in ${
      event?.location || "Kathmandu, Nepal"
    }, served as the monumental venue for this concert event. Accommodating over ${
      event?.attendance || "45,000"
    } spectators across its grand tiered stands, the historic open-air stadium demanded high-output, wide-angle LED visual architecture to ensure crystal-clear visibility and an electrifying concert experience from the front-stage pit to the highest perimeter bleachers.`;

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      // Smooth scroll parallax on the venue image
      if (imageFrameRef.current) {
        const img = imageFrameRef.current.querySelector("img");
        if (img) {
          gsap.fromTo(
            img,
            { yPercent: -12, scale: 1.15 },
            {
              yPercent: 12,
              scale: 1.05,
              ease: "none",
              scrollTrigger: {
                trigger: imageFrameRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.2,
              },
            }
          );
        }
      }

      // Smooth entrance reveal on the text column
      if (textRef.current) {
        gsap.fromTo(
          textRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: textRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
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
      id="about-venue"
      aria-labelledby="about-venue-heading"
      className="relative w-full bg-white text-zinc-950 py-16 sm:py-20 lg:py-28 select-none overflow-hidden"
    >
      <Container size="xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-16 items-center">
          {/* Left: Venue Image with Parallax (no shadow) */}
          <div className="lg:col-span-6 xl:col-span-7">
            <div
              ref={imageFrameRef}
              className="relative w-full aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/9] lg:aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden border border-zinc-200/80 bg-zinc-100 will-change-transform"
            >
              <Image
                src={venueImage}
                alt={event?.venue ? `Aerial view of ${event.venue}` : "Aerial view of concert venue"}
                fill
                sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 50vw, 58vw"
                className="object-cover object-center will-change-transform"
              />
            </div>
          </div>

          {/* Right: Text with About Venue Heading & Inter Font Paragraph */}
          <div
            ref={textRef}
            className="lg:col-span-6 xl:col-span-5 flex flex-col justify-center"
          >
            <Heading
              as="h2"
              id="about-venue-heading"
              size="xl"
              align="left"
              variant="dark"
              className="text-zinc-950 font-bold tracking-tight uppercase mb-4 sm:mb-6"
            >
              About Venue
            </Heading>

            <p className="font-inter font-[family-name:var(--font-inter)] text-base sm:text-lg lg:text-xl text-zinc-600 font-normal leading-relaxed">
              {venueDescription}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default EventGallery;
