import { Metadata } from "next";
import CalculatorContainer from "@/components/calculator";

import AboutHero from "@/components/about/about-hero";

export const metadata: Metadata = {
  title: "LED Video Wall Calculator & Power Estimator | Lumera Pro Architect",
  description:
    "Design and configure LED video walls with Lumera's architectural calculator. Calculate panel grid dimensions, resolution, AC power requirements, structural rigging weights, and video processor data routing.",
};

export default function CalculatorPage() {
  return (
    <main className="min-h-screen bg-black text-foreground">
      <AboutHero/>
      <CalculatorContainer />
      {/* <CtaSection /> */}
    </main>
  );
}
