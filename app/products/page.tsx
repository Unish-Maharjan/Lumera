import { Metadata } from "next";
import ProductRangeSection from "@/components/products/product-range-section";
import CtaSection from "@/components/home/cta-section";

export const metadata: Metadata = {
  title: "Products | Lumera High-Performance LED Displays",
  description:
    "Explore Lumera's architectural LED display systems, including fine-pitch MicroLED, virtual production panels, transparent glass, outdoor commercial, and 3D curved screens.",
};

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-black text-foreground">
      <ProductRangeSection />
      <CtaSection />
    </main>
  );
}
