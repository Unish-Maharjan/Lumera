import { Metadata } from "next";
import ServiceHero from "@/components/services/service-hero";
import ServicesShowcase from "@/components/services/services-showcase";
import ServicesCta from "@/components/services/services-cta";

export const metadata: Metadata = {
  title: "Services | Lumera Architectural LED & Lighting Engineering",
  description:
    "From concept to completion, we deliver end-to-end LED solutions tailored to your space, vision, and audience.",
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-black text-foreground">
      <ServiceHero />
      <ServicesShowcase />
      <ServicesCta />
    </main>
  );
}
