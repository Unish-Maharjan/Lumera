import { Metadata } from "next";
import ProductsHero from "@/components/products/products-hero";
import ProductGridSection from "@/components/products/product-grid-section";
import ProductCta from "@/components/products/product-cta";

export const metadata: Metadata = {
  title: "Products | Lumera High-Performance LED Displays",
  description:
    "Explore Lumera's architectural LED display systems, including fine-pitch MicroLED, virtual production panels, transparent glass, outdoor commercial, and 3D curved screens.",
};

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-black text-foreground">
      <ProductsHero />
      <ProductGridSection />
      <ProductCta />
    </main>
  );
}
