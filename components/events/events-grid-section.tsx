"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";

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
    categories: ["Exhibitions", "Corporate"],
  },
  {
    id: "global-innovation-summit",
    date: "Jan 20, 2025",
    title: "Global Innovation Summit",
    location: "ICC, Kathmandu",
    image: "/images/buildspace/mall.avif",
    categories: ["Corporate", "Installations"],
  },
  {
    id: "nepal-music-festival",
    date: "Dec 12, 2024",
    title: "Nepal Music Festival",
    location: "Dasarath Rangashala",
    image: "/images/buildspace/events.avif",
    categories: ["Public Events"],
  },
  {
    id: "smart-city-expo-2024",
    date: "Nov 28, 2024",
    title: "Smart City Expo 2024",
    location: "Bhrikuti Mandap, Kathmandu",
    image: "/images/ourservices/service-1.jpg",
    categories: ["Exhibitions", "Installations"],
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
    <section className="relative w-full bg-black py-12 sm:py-16 lg:py-20 text-white select-none">
      <Container size="xl">
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-6 sm:gap-8 border-b border-white/10 mb-8 sm:mb-12">
          {CATEGORIES.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`text-sm font-medium transition-colors cursor-pointer pb-3 -mb-px border-b-2 ${
                  isActive
                    ? "text-accent border-accent"
                    : "text-zinc-400 hover:text-white border-transparent"
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* 2-Column Event Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {filteredEvents.map((event) => (
            <Link
              key={event.id}
              href="/contact"
              className="group relative aspect-[16/10] min-h-[260px] sm:min-h-[320px] md:min-h-[360px] 
              rounded-2xl overflow-hidden border border-white/10 bg-zinc-950"
            >
              {/* Background Image */}
              <Image
                src={event.image}
                alt={event.title}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover object-center brightness-[0.88] contrast-[1.05]"
              />

              {/* Gradient Vignettes for optimal text readability */}
              <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/80 via-black/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black via-black/80 to-transparent" />

              {/* Date Badge (Top Left) */}
              <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10">
                <span className="text-xs sm:text-sm text-zinc-300 font-light">
                  {event.date}
                </span>
              </div>

              {/* Event Info (Bottom Row) */}
              <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 z-10 flex items-end justify-between gap-4">
                <div>
                  <h3 className="font-heading text-lg sm:text-xl font-medium text-white">
                    {event.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 font-light mt-1">
                    {event.location}
                  </p>
                </div>

                {/* View Details Link */}
                <div className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-accent shrink-0 whitespace-nowrap">
                  <span>View Details</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default EventsGridSection;

