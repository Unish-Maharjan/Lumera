import React from "react";
import Image from "next/image";
import Container from "@/components/ui/Container";

export function OurPhilosophy() {
  return (
    <section className="relative w-full bg-black text-foreground py-20 sm:py-28 lg:py-36 border-t border-white/10">
      <Container size="xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Visual Column (Asymmetrical Rhythm: Image on Left) */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] overflow-hidden border border-white/10 bg-zinc-950">
              <Image
                src="/images/building-facade.jpg"
                alt="Architectural structure harmonizing with precision lighting"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center brightness-95 contrast-[1.05]"
              />
            </div>
          </div>

          {/* Philosophy Text Column */}
          <div className="lg:col-span-6 order-1 lg:order-2 flex flex-col justify-center">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent mb-4 sm:mb-6 block">
              OUR PHILOSOPHY
            </span>

            <h2 className="font-heading text-3xl sm:text-5xl md:text-6xl font-bold uppercase leading-[1.05] tracking-tight text-white mb-6 sm:mb-8">
              Precision is not a detail. It is the <span className="text-accent">foundation.</span>
            </h2>

            <p className="font-sans text-base sm:text-lg text-zinc-300 font-light leading-relaxed max-w-xl">
              We approach light not as superficial decoration, but as an architectural discipline. By calibrating diode pitch, thermal performance, and chromatic purity at the micron level, our systems achieve uncompromised optical clarity that respects both the viewer and the surrounding structure.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default OurPhilosophy;

