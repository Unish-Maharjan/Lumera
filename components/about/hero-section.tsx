import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function AboutHero() {
  return (
    <section
      id="about-hero"
      aria-labelledby="about-hero-heading"
      className="relative bg-transparent pt-10 sm:pt-16 lg:pt-20 pb-16 sm:pb-24 lg:pb-28 text-foreground overflow-hidden select-none"
    >
      <Container>
        {/* Two-Column Editorial Hero Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-14 lg:gap-12 xl:gap-16 items-center">
          {/* Left Column: Narrative Content */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center text-left">
            {/* Eyebrow Label */}
            <div className="mb-4 sm:mb-5">
              <span className="text-xs sm:text-[13px] font-mono font-medium tracking-[0.25em] text-accent uppercase">
                ABOUT LUMERA
              </span>
            </div>

            {/* Headline */}
            <h1
              id="about-hero-heading"
              className="font-heading text-3xl sm:text-5xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-foreground uppercase leading-[1.08] select-none mb-5 sm:mb-6"
            >
              The force behind<br />
              <span className="text-accent">the light.</span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg lg:text-xl font-light text-muted-foreground leading-relaxed mb-8 sm:mb-10 max-w-xl">
              We design, supply, and install LED display solutions that help businesses transform spaces into experiences people remember.
            </p>

            {/* Action CTA Button */}
            <div>
              <Link href="/#cta" className="inline-block">
                <Button variant="gold" size="md">
                  Discuss Your Project
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column: Architectural LED Installation Visual */}
          <div className="lg:col-span-6 xl:col-span-6 flex items-center justify-center">
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] lg:aspect-[16/11] xl:aspect-[16/10] overflow-hidden rounded-2xl bg-card border border-border/70 shadow-2xl">
              <Image
                src="/images/mall-screen.png"
                alt="Lumera architectural curved panoramic LED display installation in an active commercial atrium"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 50vw, 640px"
                className="object-cover object-center select-none pointer-events-none"
              />

              {/* Ambient Edge Gradient for Depth Integration */}
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export const HeroSection = AboutHero;
export default AboutHero;
