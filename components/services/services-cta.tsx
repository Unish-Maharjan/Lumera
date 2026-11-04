import React from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";

export function ServicesCta() {
  return (
    <section
      id="services-cta"
      aria-labelledby="services-cta-heading"
      className="relative w-full min-h-[60vh] sm:min-h-[70vh] lg:min-h-[75vh] flex flex-col items-center justify-center bg-black text-foreground overflow-hidden select-none py-24 sm:py-32 lg:py-40"
    >
      {/* Background Planetary Horizon Glow matching mockup */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        <Image
          src="/images/footer (2).png"
          alt="Glowing planetary horizon in deep space"
          fill
          priority
          sizes="100vw"
          className="object-cover object-bottom opacity-90 brightness-[1.05]"
        />

        {/* Top Vignette for Seamless Section Transition */}
        <div
          className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black via-black/80 to-transparent"
          aria-hidden="true"
        />

        {/* Bottom Vignette for Footer Blending */}
        <div
          className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black to-transparent"
          aria-hidden="true"
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full text-center">
        <Container size="xl">
          <div className="max-w-2xl mx-auto flex flex-col items-center">
            {/* Headline matching mockup */}
            <h2
              id="services-cta-heading"
              className="font-heading text-4xl sm:text-5xl md:text-6xl font-light text-white tracking-tight leading-[1.08] mb-8 sm:mb-10 drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]"
            >
              Ready to illuminate <br />
              your space?
            </h2>

            {/* Pill "Get in Touch" Button matching mockup */}
            <div>
              <Link
                href="/#contact-cta"
                className="group inline-flex items-center gap-3 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full border border-white/20 bg-zinc-950/80 backdrop-blur-md text-xs sm:text-sm uppercase tracking-[0.2em] font-mono text-white transition-all duration-300 hover:border-accent hover:text-accent hover:shadow-[0_0_25px_rgba(215,184,117,0.25)] hover:scale-105"
              >
                <span>Get in Touch</span>
                <svg
                  className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.75"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}

export default ServicesCta;

