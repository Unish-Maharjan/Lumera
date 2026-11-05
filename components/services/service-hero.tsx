import React from "react";
import Image from "next/image";
import Container from "@/components/ui/Container";

export function ServiceHero() {
  return (
    <section className="relative flex min-h-dvh w-full items-center justify-center overflow-hidden bg-black text-foreground select-none pt-28 pb-20 sm:pt-36 sm:pb-28">
      {/* Background Architectural LED Visual */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <Image
          src="/images/ourservices/hero.jpg"
          alt="Monumental Lumera architectural LED screen facade illuminated at night"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center brightness-[0.85] contrast-[1.08]"
        />

        {/* Top Vignette for Seamless Navbar Transition */}
        {/* <div
          className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-black/90 via-black/50 to-transparent"
          aria-hidden="true"
        /> */}

        {/* Ambient Dark Scrim Across Canvas */}
        {/* <div
          className="absolute inset-0 bg-black/45"
          aria-hidden="true"
        /> */}

        {/* Directional Gradient: Gentle Darkening from Left to Right */}
        {/* <div
          className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"
          aria-hidden="true"
        /> */}

        {/* Bottom Vignette for Smooth Transition to the Showcase Section */}
        <div
          className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black via-black/80 to-transparent"
          aria-hidden="true"
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full">
        <Container size="xl">
          <div className="relative max-w-4xl mx-auto text-center flex flex-col items-center">
            {/* Localized Radial Backdrop Behind Text for Crisp Contrast */}
            {/* <div
              className="absolute -inset-x-16 -inset-y-12 sm:-inset-x-28 sm:-inset-y-16 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.85)_0%,rgba(0,0,0,0.5)_55%,transparent_80%)] blur-2xl pointer-events-none -z-10"
              aria-hidden="true"
            /> */}

            {/* Main Headline matching the editorial design */}
            <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-medium 
            text-white leading-[1.05]">
              MORE THAN <br />
              JUST <span className="text-accent font-medium">SCREENS.</span>
            </h1>

            {/* Supporting Subtitle */}
            <p className="font-sans text-sm sm:text-base md:text-lg text-zinc-100 font-light leading-relaxed max-w-2xl mx-auto mt-6 sm:mt-8 drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
              From concept to completion, we deliver end-to-end LED solutions tailored to your space, vision, and audience.
            </p>
          </div>
        </Container>
      </div>
    </section>
  );
}

export default ServiceHero;
