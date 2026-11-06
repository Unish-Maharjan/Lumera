import { Metadata } from "next";
import AboutHero from "@/components/about/about-hero";
import OurStory from "@/components/about/our-story";
import TeamSection from "@/components/about/team-section";
import AboutCta from "@/components/about/about-cta";
// import SectionDivider from "@/components/ui/section-divider";

export const metadata: Metadata = {
  title: "About | Lumera LED & Architectural Lighting",
  description:
    "Discover Lumera's architectural philosophy, precision engineering, and turnkey LED display and lighting installations.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-foreground">
      <AboutHero />
      {/* <SectionDivider /> */}
      <OurStory />
      {/* <SectionDivider /> */}
      <TeamSection />
      {/* <SectionDivider /> */}
      {/* <CtaSection className="border-t-0" /> */}
      <AboutCta />
    </main>
  );
}
