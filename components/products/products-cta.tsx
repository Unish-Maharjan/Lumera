import React from "react";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export function ProductsCta() {
  return (
    <section className="relative w-full bg-black text-foreground py-24 sm:py-32 lg:py-40 border-t border-white/10 overflow-hidden">
      {/* Subtle Atmospheric Champagne Glow */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,_rgba(215,184,117,0.05)_0%,_transparent_75%)]"
        aria-hidden="true"
      />

      <Container size="xl" className="relative z-10">
        <div className="max-w-3xl">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent mb-4 sm:mb-6 block">
            LET&apos;S CREATE
          </span>

          <h2 className="font-heading text-4xl sm:text-6xl md:text-7xl font-bold uppercase leading-[0.98] tracking-tight text-white mb-6 sm:mb-8">
            Discuss your display <span className="text-accent">specifications.</span>
          </h2>

          <p className="font-sans text-base sm:text-lg text-zinc-300 font-light leading-relaxed max-w-xl mb-8 sm:mb-10">
            Whether you need custom pitch engineering, structural load assessments, or turnkey installation support, our technical specialists are ready to collaborate on your next commission.
          </p>

          <div>
            <Link href="/#contact-cta">
              <Button variant="gold" size="lg">
                START A CONSULTATION
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default ProductsCta;

