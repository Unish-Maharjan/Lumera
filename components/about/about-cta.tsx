import React from "react";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export function AboutCta() {
  return (
    <section className="relative w-full min-h-[75vh] sm:min-h-[85vh] lg:min-h-[92vh] flex flex-col items-center justify-center bg-white text-zinc-950 py-28 sm:py-36 lg:py-48 overflow-hidden select-none">
      {/* Background Video */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="h-full w-full object-cover object-center select-none"
        >
          <source src="/video/cta-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Ambient Top Blend Gradient (fades smoothly from the section above) */}
        <div
          className="absolute inset-x-0 top-0 h-36 sm:h-52 lg:h-72 bg-gradient-to-b from-white via-white/80 to-transparent pointer-events-none z-10"
          aria-hidden="true"
        />

        {/* Ambient Bottom Gradient (blends smoothly into the dark footer) */}
        <div
          className="absolute inset-x-0 bottom-0 h-[40%] sm:h-[45%] min-h-[240px] max-h-[460px] pointer-events-none z-10"
          style={{
            background:
              "linear-gradient(to top, #000000 0%, #000000 12%, rgba(0,0,0,0.98) 20%, rgba(0,0,0,0.92) 28%, rgba(0,0,0,0.82) 38%, rgba(0,0,0,0.66) 50%, rgba(0,0,0,0.48) 62%, rgba(0,0,0,0.30) 74%, rgba(0,0,0,0.15) 85%, rgba(0,0,0,0.04) 93%, rgba(0,0,0,0) 100%)",
          }}
          aria-hidden="true"
        />
      </div>

      <Container size="xl" className="relative z-20 w-full">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold uppercase text-zinc-950 mb-6 sm:mb-8 tracking-wider">
            Ready to illuminate your vision?
          </h2>

          <div>
            <Link href="/contact">
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
