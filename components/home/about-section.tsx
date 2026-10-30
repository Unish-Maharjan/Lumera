import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative bg-transparent min-h-screen lg:h-screen lg:max-h-screen text-foreground overflow-hidden border-t border-border/40 flex items-center py-16 sm:py-20 lg:py-0 select-none"
    >
      <Container className="w-full">
        {/* Side-by-Side 100vh Editorial Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 items-center">
          {/* Left Column: Monumental Headline + Narrative + CTA */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Giant Headline */}
            <h2
              id="about-heading"
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] xl:text-[4.75rem] font-bold tracking-tight text-foreground uppercase leading-[0.94] select-none mb-6 sm:mb-8"
            >
              BEYOND DISPLAYS.<br />
              WE CREATE <span className="text-accent">EXPERIENCES.</span>
            </h2>

            {/* Narrative Body Text */}
            <p className="max-w-xl text-base sm:text-lg lg:text-xl font-light text-muted-foreground leading-relaxed mb-8 sm:mb-10">
              Lumera delivers professional LED display solutions, bringing together technology, design, and installation to transform commercial spaces into powerful visual experiences.
            </p>

            {/* Gold Variant Button */}
            <div>
              <Button
                variant="gold"
                size="lg"
                className="text-xs sm:text-sm font-semibold tracking-wider uppercase px-7 sm:px-9 py-3.5 sm:py-4 shadow-lg shadow-[#d7b875]/25"
              >
                <span>DISCOVER LUMERA</span>
              </Button>
            </div>
          </div>

          {/* Right Column: Architectural Showcase Image */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            {/* Image Frame */}
            <div className="relative w-full h-[360px] sm:h-[440px] lg:h-[56vh] xl:h-[62vh] max-h-[580px] overflow-hidden bg-card border border-border/70 rounded-xl shadow-2xl">
              <Image
                src="/images/about-wave.jpg"
                alt="Anamorphic 3D LED wave display on modern architectural facade"
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover object-center select-none pointer-events-none"
                priority
              />

              {/* Subtle Ambient Bottom Gradient */}
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/80 via-black/30 to-transparent"
                aria-hidden="true"
              />
            </div>

            {/* Caption & Frame Index */}
            <div className="flex items-center justify-between pt-3 px-1 text-[10px] sm:text-xs font-mono tracking-[0.2em] text-muted-foreground/70 uppercase">
              <span>ENGINEERING VISUAL EXPERIENCES</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default AboutSection;
