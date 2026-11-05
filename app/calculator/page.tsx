import { Metadata } from "next";
import CalculatorContainer from "@/components/calculator";
import CtaSection from "@/components/home/cta-section";

export const metadata: Metadata = {
  title: "LED Video Wall Calculator & Power Estimator | Lumera Pro Architect",
  description:
    "Design and configure LED video walls with Lumera's architectural calculator. Calculate panel grid dimensions, resolution, AC power requirements, structural rigging weights, and video processor data routing.",
};

export default function CalculatorPage() {
  return (
    <main className="min-h-screen bg-black text-foreground">
      <CalculatorContainer />
      <CtaSection />
    </main>
  );
}
