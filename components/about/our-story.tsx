import Image from "next/image";
import { Container } from "@/components/ui/Container";

export function OurStory() {
  return (
    <section
      id="our-story"
      aria-labelledby="our-story-title"
      className="relative w-full bg-transparent py-16 sm:py-20 lg:py-24 border-t border-border/40 select-none overflow-hidden"
    >
      <Container className="w-full">
        {/* Title of OUR STORY at the top of the section */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 lg:mb-16">
          <h2
            id="our-story-title"
            className="font-heading text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground uppercase leading-[1.04]"
          >
            OUR <span className="text-accent">STORY</span>
          </h2>
        </div>

        {/* Two-Column Editorial Spread */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-14 xl:gap-16 items-center">
          {/* Left Column: Story Content */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center text-left">
            {/* Headline */}
            <h3 className="font-heading text-2xl sm:text-4xl lg:text-4xl xl:text-5xl font-bold tracking-tight text-foreground uppercase leading-[1.08] mb-5 sm:mb-6">
              Built around<br />
              <span className="text-accent">what’s possible.</span>
            </h3>

            {/* Description */}
            <p className="text-base sm:text-lg lg:text-xl font-light text-muted-foreground leading-relaxed sm:leading-loose max-w-xl">
              Every space has the potential to communicate something powerful. Lumera was built around the idea that LED displays should do more than show content—they should bring spaces to life.
            </p>
          </div>

          {/* Right Column: Architectural Visual */}
          <div className="lg:col-span-6 xl:col-span-6 flex items-center justify-center">
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] lg:aspect-[5/4] xl:aspect-[4/3] overflow-hidden rounded-2xl bg-card border border-border/70 shadow-2xl">
              <Image
                src="/images/retail-space.png"
                alt="Architectural LED display integrated into a commercial retail flagship environment"
                fill
                sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 50vw, 640px"
                className="object-cover object-center select-none pointer-events-none"
                priority
              />

              {/* Ambient Edge Gradient */}
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 z-10"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default OurStory;
