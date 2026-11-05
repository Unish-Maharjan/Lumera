"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export interface EventItem {
  id: string;
  date: string;
  title: string;
  location: string;
  image: string;
  categories: string[];
}

const CATEGORIES = [
  "All Events",
  "Installations",
  "Exhibitions",
  "Corporate",
  "Public Events",
] as const;

type Category = (typeof CATEGORIES)[number];

const EVENTS: EventItem[] = [
  {
    id: "kathmandu-tech-expo-2025",
    date: "Mar 15, 2025",
    title: "Kathmandu Tech Expo 2025",
    location: "Bhrikuti Mandap, Kathmandu",
    image: "/images/buildspace/outdoor.avif",
    categories: ["Exhibitions", "Corporate", "Installations"],
  },
  {
    id: "global-innovation-summit",
    date: "Jan 20, 2025",
    title: "Global Innovation Summit",
    location: "ICC, Kathmandu",
    image: "/images/buildspace/mall.avif",
    categories: ["Corporate", "Installations", "Exhibitions"],
  },
  {
    id: "nepal-music-festival",
    date: "Dec 12, 2024",
    title: "Nepal Music Festival",
    location: "Dasarath Rangashala",
    image: "/images/buildspace/events.avif",
    categories: ["Public Events", "Installations"],
  },
  {
    id: "smart-city-expo-2024",
    date: "Nov 28, 2024",
    title: "Smart City Expo 2024",
    location: "Bhrikuti Mandap, Kathmandu",
    image: "/images/ourservices/service-1.jpg",
    categories: ["Exhibitions", "Corporate", "Public Events", "Installations"],
  },
  {
    id: "heritage-illumination-gala",
    date: "Oct 18, 2024",
    title: "Heritage Illumination Gala",
    location: "Patan Durbar Square",
    image: "/images/retail-space.png",
    categories: ["Public Events", "Installations"],
  },
  {
    id: "lumera-architecture-forum",
    date: "Sep 25, 2024",
    title: "Lumera Architecture Forum",
    location: "Hyatt Regency, Kathmandu",
    image: "/images/buildspace/outdoor.avif",
    categories: ["Corporate", "Installations"],
  },
];

export function EventsGridSection() {
  const [activeTab, setActiveTab] = useState<Category>("All Events");

  const filteredEvents =
    activeTab === "All Events"
      ? EVENTS
      : EVENTS.filter((event) => event.categories.includes(activeTab));

  return (
    <section className="relative w-full bg-[#F5F5F2] py-10 sm:py-18 text-[#0A0A0A] select-none">
      <Container size="xl">
        {/* Section Header matching Product Grid */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase text-[#0A0A0A] mb-3">
            OUR <span className="text-[#D7B875]">EVENTS</span>
          </h2>
        </div>

        {/* Category Filters Bar matching Product Grid */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-14">
          {CATEGORIES.map((cat) => {
            const isActive = activeTab === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveTab(cat)}
                className={`text-xs sm:text-sm px-4 py-2 rounded-full transition-colors cursor-pointer ${
                  isActive
                    ? "bg-black text-white font-medium shadow-xs"
                    : "text-[#555555] hover:text-black font-medium"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* 2-Column Event Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {filteredEvents.map((event) => (
            <article
              key={event.id}
              className="group flex flex-col justify-between bg-white rounded-xl sm:rounded-2xl border border-[#E5E5E0] shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
            >
              {/* Image Stage */}
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-zinc-100">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                />
                {/* Category Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="inline-block bg-black/80 backdrop-blur-md text-white text-xs font-medium px-3.5 py-1.5 rounded-full shadow-xs">
                    {event.categories[0]}
                  </span>
                </div>
              </div>

              {/* Event Info & Action Area */}
              <div className="p-5 sm:p-6 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="font-heading text-xl font-bold uppercase text-black">
                    {event.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#777777] font-normal mt-1">
                    {event.location}
                  </p>
                </div>

                {/* Divider and Bottom Action Row */}
                <div className="mt-6 pt-4 border-t border-[#E5E5E0] flex items-center justify-between">
                  <div>
                    <span className="block text-[10px] uppercase text-[#777777] font-medium tracking-wider">
                      Date
                    </span>
                    <span className="text-sm font-semibold text-black">
                      {event.date}
                    </span>
                  </div>

                  <Link href="/contact" draggable={false}>
                    <Button
                      size="sm"
                      rounded="full"
                      className="!bg-black !text-white !border !border-black hover:!bg-[#D7B875] hover:!text-black hover:!border-[#D7B875] transition-colors duration-200 whitespace-nowrap"
                    >
                      View Detail
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

export default EventsGridSection;

