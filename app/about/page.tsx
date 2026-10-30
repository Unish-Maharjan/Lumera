import React from "react";
import AboutSection from "@/components/home/about-section";
import InstallationSection from "@/components/home/installation-section";
import CtaSection from "@/components/home/cta-section";

export const metadata = {
  title: "About Us | Lumera Ventures",
  description: "Learn about Lumera Ventures, our architectural philosophy, and precision LED installation technology.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-transparent text-foreground pt-14 sm:pt-16">
      <AboutSection />
      <InstallationSection />
      <CtaSection />
    </main>
  );
}
