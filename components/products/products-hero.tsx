import React from "react";
import Image from "next/image";
import Container from "@/components/ui/Container";

export function ProductsHero() {
  return (
    <section className="relative w-full bg-black text-foreground pt-32 sm:pt-40 lg:pt-44 pb-16 sm:pb-24 overflow-hidden">
      <Container size="xl" className="relative z-10">
        {/* Editorial Text Block */}
        <div className="max-w-4xl mb-12 sm:mb-16 lg:mb-20">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent mb-4 sm:mb-6 block">
            OUR PRODUCTS
          </span>

          <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold uppercase leading-[0.95] tracking-tight text-white mb-6 sm:mb-8">
            High-performance hardware. Crafted for <span className="text-accent">architecture.</span>
          </h1>

          <p className="font-sans text-base sm:text-lg md:text-xl text-zinc-300 font-light leading-relaxed max-w-2xl">
            From ultra-fine pitch MicroLED surfaces to monumental outdoor media facades, our display architectures are engineered for seamless structural integration, thermal endurance, and optical purity.
          </p>
        </div>

        {/* Minimal Wide Cinematic Visual with Generous Breathing Room */}
        <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] overflow-hidden border border-white/10 bg-zinc-950">
          <Image
            src="/images/mall-screen.png"
            alt="Lumera architectural curved LED display integration"
            fill
            priority
            sizes="(max-width: 1536px) 100vw, 1536px"
            className="object-cover object-center brightness-95 contrast-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
        </div>
      </Container>
    </section>
  );
}

export default ProductsHero;

