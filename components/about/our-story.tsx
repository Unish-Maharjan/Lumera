import React from "react";
import Image from "next/image";
import Container from "@/components/ui/Container";

export function OurStory() {
  return (
    <section className="relative w-full bg-black text-foreground py-20 sm:py-28 lg:py-36 border-t border-white/10">
      <Container size="xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Narrative Column */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent mb-4 sm:mb-6 block">
              OUR STORY
            </span>

            <h2 className="font-heading text-3xl sm:text-5xl md:text-6xl font-bold uppercase leading-[1.05] tracking-tight text-white mb-6 sm:mb-8">
              The force behind the <span className="text-accent">light.</span>
            </h2>

            <p className="font-sans text-base sm:text-lg text-zinc-300 font-light leading-relaxed max-w-xl">
              Founded on the belief that digital illumination should integrate seamlessly with architectural form, Lumera bridges structural engineering with spatial artistry. We partner with architects, developers, and institutions to turn structural surfaces into living, responsive media engineered for permanence.
            </p>
          </div>

          {/* Architectural Image Column */}
          <div className="lg:col-span-6">
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] overflow-hidden border border-white/10 bg-zinc-950">
              <Image
                src="/images/mall-screen.png"
                alt="Lumera curved interior LED architectural installation"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center brightness-95 contrast-[1.05]"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default OurStory;
