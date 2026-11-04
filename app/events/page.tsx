import { Metadata } from "next";
import EventsHero from "@/components/events/events-hero";
import EventsGridSection from "@/components/events/events-grid-section";
import CtaSection from "@/components/home/cta-section";

export const metadata: Metadata = {
  title: "Events & Stages | Lumera High-Impact LED Displays",
  description:
    "Explore Lumera's high-refresh virtual production walls, modular concert stage panels, and monumental live event LED screen systems.",
};

export default function EventsPage() {
  return (
    <main className="min-h-screen bg-black text-foreground">
      <EventsHero />
      <EventsGridSection />
      <CtaSection />
    </main>
  );
}
