import React from "react";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export function AboutCta() {
  return (
    <section className="relative w-full bg-black text-foreground py-24 sm:py-32 lg:py-40 border-t border-white/10">
      <Container size="xl">
        <div className="max-w-3xl">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent mb-4 sm:mb-6 block">
            LET&apos;S CREATE
          </span>

          <h2 className="font-heading text-4xl sm:text-6xl md:text-7xl font-bold uppercase leading-[0.98] tracking-tight text-white mb-6 sm:mb-8">
            Ready to illuminate your <span className="text-accent">vision?</span>
          </h2>

          <p className="font-sans text-base sm:text-lg text-zinc-300 font-light leading-relaxed max-w-xl mb-8 sm:mb-10">
            Whether you are conceptualizing a monumental architectural facade or specifying high-resolution interior displays, our engineering team is ready to collaborate from concept to final commission.
          </p>

          <div>
            <Link href="/#contact-cta">
              <Button variant="gold" size="lg">
                START A CONVERSATION
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default AboutCta;

