import { Metadata } from "next";
import AboutHero from "@/components/about/about-hero";
import OurStory from "@/components/about/our-story";
import OurPhilosophy from "@/components/about/our-philosophy";
import OurExpertise from "@/components/about/our-expertise";
import OurImpact from "@/components/about/our-impact";
import CtaSection from "@/components/home/cta-section";

export const metadata: Metadata = {
  title: "About | Lumera LED & Architectural Lighting",
  description:
    "Discover Lumera's architectural philosophy, precision engineering, and turnkey LED display and lighting installations.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-foreground">
      <AboutHero />
      <OurStory />
      <OurPhilosophy />
      <OurExpertise />
      <OurImpact />
      <CtaSection />
    </main>
  );
}
