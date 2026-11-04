import React from "react";
import Image from "next/image";
import Container from "@/components/ui/Container";

export function ContactHero() {
  return (
    <section className="relative flex min-h-[80vh] sm:min-h-[85vh] lg:min-h-[90vh] w-full items-center justify-center overflow-hidden bg-black text-foreground select-none pt-28 pb-20 sm:pt-36 sm:pb-28">
      {/* Background Architectural LED Visual */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <Image
          src="/images/outdoor-screen.png"
          alt="Lumera architectural monumental LED facade illuminated at night"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center brightness-[0.92] contrast-[1.05]"
        />

        {/* Bottom Vignette for Smooth Transition to the Next Section */}
        <div
          className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black via-black/80 to-transparent"
          aria-hidden="true"
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full">
        <Container size="xl">
          <div className="relative max-w-4xl mx-auto text-center flex flex-col items-center">
            {/* Main Headline matching the editorial design */}
            <h1 className="font-heading uppercase text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-white leading-[1.05] drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
              Get In <br />
              <span className="text-accent font-normal">Touch.</span>
            </h1>

            {/* Supporting Subtitle */}
            <p className="font-sans text-sm sm:text-base md:text-lg text-zinc-100 font-light leading-relaxed max-w-2xl mx-auto mt-6 sm:mt-8 drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
              Collaborate with our display architects to engineer custom LED canvases,
              structural installations, and architectural media facades tailored to your space.
            </p>
          </div>
        </Container>
      </div>
    </section>
  );
}

export default ContactHero;

