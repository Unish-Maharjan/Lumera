import React from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export function AboutCta() {
  return (
    <section className="relative w-full min-h-[50vh] sm:min-h-[60vh] flex flex-col items-center justify-center bg-black text-foreground py-20 sm:py-28 lg:py-32 border-t border-white/10 overflow-hidden select-none">
      {/* Background Architectural Moon LED Visual */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <Image
          src="/images/final-cta.jpg"
          alt="Monumental Architectural Moon LED Installation"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center brightness-[0.95] contrast-[1.08]"
        />

        {/* Reduced Top Gradient */}
        <div
          className="absolute inset-x-0 top-0 h-14 sm:h-20 bg-gradient-to-b from-black/70 to-transparent"
          aria-hidden="true"
        />

        {/* Minimal Center Scrim for vibrant image visibility */}
        <div
          className="absolute inset-0 bg-black/20"
          aria-hidden="true"
        />

        {/* Reduced Bottom Gradient */}
        <div
          className="absolute inset-x-0 bottom-0 h-14 sm:h-20 bg-gradient-to-t from-black/70 to-transparent"
          aria-hidden="true"
        />
      </div>

      <Container size="xl" className="relative z-10 w-full">
        <div className="max-w-2xl mx-auto text-center">
         

          <h2 className="font-heading text-2xl sm:text-4xl md:text-5xl font-bold uppercase text-white mb-4 sm:mb-5 drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
            Ready to illuminate your <span className="text-accent">vision?</span>
          </h2>

          <p className="font-sans text-center text-xs sm:text-sm md:text-base text-zinc-300 font-light mx-auto max-w-lg mb-6 sm:mb-8 drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
            Whether you are conceptualizing a monumental architectural facade or specifying high-resolution
            interior displays, our engineering team is ready to collaborate from concept to final commission.
          </p>

          <div>
            <Link href="/#contact-cta">
              <Button variant="gold" size="sm">
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
