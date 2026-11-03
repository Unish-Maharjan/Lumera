import React from "react";
import Image from "next/image";
import Container from "@/components/ui/Container";

export function OurExpertise() {
  return (
    <section className="relative w-full bg-black text-foreground py-20 sm:py-28 lg:py-36 border-t border-white/10">
      <Container size="xl">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16 lg:mb-20">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent mb-4 sm:mb-6 block">
            WHAT WE DO
          </span>

          <h2 className="font-heading text-3xl sm:text-5xl md:text-6xl font-bold uppercase leading-[1.05] tracking-tight text-white mb-6 sm:mb-8">
            Engineered for scale, crafted for <span className="text-accent">clarity.</span>
          </h2>

          <p className="font-sans text-base sm:text-lg text-zinc-300 font-light leading-relaxed max-w-2xl">
            From monumental exterior media facades to fine-pitch architectural indoor screens, Lumera delivers turnkey display solutions engineered for mission-critical endurance and uncompromised visual impact.
          </p>
        </div>

        {/* Focused Image-Led Presentation (Editorial Duo, No Generic Card Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Discipline 1 */}
          <div className="flex flex-col">
            <div className="relative w-full aspect-[16/10] overflow-hidden border border-white/10 bg-zinc-950 mb-5 sm:mb-6">
              <Image
                src="/images/media-facade-2.jpg"
                alt="Architectural media facade display by Lumera"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center brightness-95 contrast-[1.05]"
              />
            </div>
            <h3 className="font-heading text-xl sm:text-2xl font-bold uppercase tracking-tight text-white mb-2">
              Architectural & Media Facades
            </h3>
            <p className="font-sans text-sm sm:text-base text-zinc-400 font-light leading-relaxed max-w-lg">
              Large-format exterior displays engineered to withstand environmental extremes while transforming building envelopes into landmark public media.
            </p>
          </div>

          {/* Discipline 2 */}
          <div className="flex flex-col">
            <div className="relative w-full aspect-[16/10] overflow-hidden border border-white/10 bg-zinc-950 mb-5 sm:mb-6">
              <Image
                src="/images/retail-space.png"
                alt="Fine-pitch interior retail and corporate display by Lumera"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center brightness-95 contrast-[1.05]"
              />
            </div>
            <h3 className="font-heading text-xl sm:text-2xl font-bold uppercase tracking-tight text-white mb-2">
              Fine-Pitch Interior Displays
            </h3>
            <p className="font-sans text-sm sm:text-base text-zinc-400 font-light leading-relaxed max-w-lg">
              Ultra-high resolution microLED canvases delivering seamless visual continuity, wide viewing angles, and calibrated color accuracy for interior environments.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default OurExpertise;

