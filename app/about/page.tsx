import React from "react";
import OurStory from "@/components/about/our-story";
import TrustSection from "@/components/about/trust-section";
import CtaSection from "@/components/home/cta-section";
import HeroSection from "@/components/home/hero-section";

export const metadata = {
  title: "About Us | Lumera Ventures",
  description: "Learn about Lumera Ventures, our architectural philosophy, and precision LED installation technology.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-transparent text-foreground pt-14 sm:pt-16">
      <HeroSection/>
      {/* <AboutHero /> */}
      <OurStory />
      <TrustSection />
      <CtaSection />
    </main>
  );
}
