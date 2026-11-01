import Image from "next/image";
import { Container } from "@/components/ui/Container";

interface SpaceCard {
  id: string;
  number: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

const CARDS: SpaceCard[] = [
  {
    id: "shopping-malls",
    number: "01",
    title: "SHOPPING MALLS",
    description: "Immersive displays for high-traffic retail environments.",
    imageSrc: "/images/buildspace/mall.avif",
    imageAlt: "Shopping mall with architectural LED display and indoor terrace",
  },
  {
    id: "outdoor-advertising",
    number: "02",
    title: "OUTDOOR ADVERTISING",
    description: "High-impact digital visibility.",
    imageSrc: "/images/buildspace/outdoor.avif",
    imageAlt: "High-impact outdoor digital advertising LED billboard at night",
  },
  {
    id: "retail-spaces",
    number: "03",
    title: "RETAIL SPACES",
    description: "Digital experiences for modern brands.",
    imageSrc: "/images/retail-space.png",
    imageAlt: "Modern retail space with ambient architectural LED installations",
  },
  {
    id: "building-facades",
    number: "04",
    title: "BUILDING FACADES",
    description: "Where architecture meets digital media.",
    imageSrc: "/images/buildspace/facade.avif",
    imageAlt: "Architectural building facade LED display illuminated at night",
  },
  {
    id: "events-venues",
    number: "05",
    title: "EVENTS & VENUES",
    description: "Visual impact for live experiences.",
    imageSrc: "/images/buildspace/events.avif",
    imageAlt: "Dynamic live event stage and arena LED video wall",
  },
];

export function BuildSpace() {
  return (
    <section
      id="spaces"
      aria-labelledby="build-space-heading"
      className="relative z-20 bg-black -mt-[100vh] py-20 sm:py-28 lg:py-32 text-foreground overflow-hidden border-t border-border/40 shadow-[0_-25px_60px_rgba(0,0,0,0.95)]"
    >
      <Container className="w-full">
        {/* Section Header: Top-Left Grouped Heading + Description */}
        <div className="max-w-2xl mb-12 sm:mb-16 lg:mb-20 text-left">
          <div className="mb-4">
            <span className="text-xs sm:text-[13px] font-mono font-medium tracking-[0.25em] text-accent uppercase">
              APPLICATIONS
            </span>
          </div>
          <h2
            id="build-space-heading"
            className="font-heading text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground uppercase leading-[1.02] select-none mb-4 sm:mb-5"
          >
            Built for<br />
            every <span className="text-accent">space.</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground font-light leading-relaxed">
            From premier retail environments to monumental building facades, explore LED display configurations tailored for architectural scale.
          </p>
        </div>

        {/* Clean, Consistent Bento Grid */}
        <div className="flex flex-col gap-5 sm:gap-6 lg:gap-7">
          {/* Row 1: 2 Cards (7 cols + 5 cols) - Equal Height */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 lg:gap-7">
            {/* Card 01: Shopping Malls (7 cols) */}
            <article className="group relative w-full lg:col-span-7 h-[360px] sm:h-[420px] lg:h-[460px] overflow-hidden rounded-2xl bg-card border border-border/70 shadow-xl">
              <Image
                src={CARDS[0].imageSrc}
                alt={CARDS[0].imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover object-center select-none pointer-events-none transition-transform duration-700 ease-out group-hover:scale-105"
                priority
              />
              {/* Subtle Number Badge */}
              <div className="absolute top-5 left-5 sm:top-6 sm:left-6 z-10">
                <span className="text-xs sm:text-[13px] font-mono font-medium tracking-[0.2em] text-accent uppercase bg-black/60 border border-white/10 px-2.5 py-1 rounded backdrop-blur-sm">
                  {CARDS[0].number}
                </span>
              </div>
              {/* Bottom Scrim & Text */}
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7 lg:p-8 bg-gradient-to-t from-black/90 via-black/45 to-transparent z-10 flex flex-col justify-end">
                <h3 className="font-heading text-xl sm:text-2xl font-bold tracking-tight uppercase text-white mb-2">
                  {CARDS[0].title}
                </h3>
                <p className="text-xs sm:text-sm text-white/80 font-light leading-relaxed max-w-lg">
                  {CARDS[0].description}
                </p>
              </div>
            </article>

            {/* Card 02: Outdoor Advertising (5 cols) */}
            <article className="group relative w-full lg:col-span-5 h-[360px] sm:h-[420px] lg:h-[460px] overflow-hidden rounded-2xl bg-card border border-border/70 shadow-xl">
              <Image
                src={CARDS[1].imageSrc}
                alt={CARDS[1].imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover object-center select-none pointer-events-none transition-transform duration-700 ease-out group-hover:scale-105"
                priority
              />
              {/* Subtle Number Badge */}
              <div className="absolute top-5 left-5 sm:top-6 sm:left-6 z-10">
                <span className="text-xs sm:text-[13px] font-mono font-medium tracking-[0.2em] text-accent uppercase bg-black/60 border border-white/10 px-2.5 py-1 rounded backdrop-blur-sm">
                  {CARDS[1].number}
                </span>
              </div>
              {/* Bottom Scrim & Text */}
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7 lg:p-8 bg-gradient-to-t from-black/90 via-black/45 to-transparent z-10 flex flex-col justify-end">
                <h3 className="font-heading text-xl sm:text-2xl font-bold tracking-tight uppercase text-white mb-2">
                  {CARDS[1].title}
                </h3>
                <p className="text-xs sm:text-sm text-white/80 font-light leading-relaxed max-w-md">
                  {CARDS[1].description}
                </p>
              </div>
            </article>
          </div>

          {/* Row 2: 3 Cards (4 cols + 4 cols + 4 cols) - Equal Height */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-7">
            {/* Card 03: Retail Spaces */}
            <article className="group relative w-full h-[360px] sm:h-[400px] lg:h-[440px] overflow-hidden rounded-2xl bg-card border border-border/70 shadow-xl">
              <Image
                src={CARDS[2].imageSrc}
                alt={CARDS[2].imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover object-center select-none pointer-events-none transition-transform duration-700 ease-out group-hover:scale-105"
              />
              {/* Subtle Number Badge */}
              <div className="absolute top-5 left-5 sm:top-6 sm:left-6 z-10">
                <span className="text-xs sm:text-[13px] font-mono font-medium tracking-[0.2em] text-accent uppercase bg-black/60 border border-white/10 px-2.5 py-1 rounded backdrop-blur-sm">
                  {CARDS[2].number}
                </span>
              </div>
              {/* Bottom Scrim & Text */}
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7 bg-gradient-to-t from-black/90 via-black/45 to-transparent z-10 flex flex-col justify-end">
                <h3 className="font-heading text-lg sm:text-xl font-bold tracking-tight uppercase text-white mb-1.5">
                  {CARDS[2].title}
                </h3>
                <p className="text-xs sm:text-sm text-white/80 font-light leading-relaxed">
                  {CARDS[2].description}
                </p>
              </div>
            </article>

            {/* Card 04: Building Facades */}
            <article className="group relative w-full h-[360px] sm:h-[400px] lg:h-[440px] overflow-hidden rounded-2xl bg-card border border-border/70 shadow-xl">
              <Image
                src={CARDS[3].imageSrc}
                alt={CARDS[3].imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover object-center select-none pointer-events-none transition-transform duration-700 ease-out group-hover:scale-105"
              />
              {/* Subtle Number Badge */}
              <div className="absolute top-5 left-5 sm:top-6 sm:left-6 z-10">
                <span className="text-xs sm:text-[13px] font-mono font-medium tracking-[0.2em] text-accent uppercase bg-black/60 border border-white/10 px-2.5 py-1 rounded backdrop-blur-sm">
                  {CARDS[3].number}
                </span>
              </div>
              {/* Bottom Scrim & Text */}
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7 bg-gradient-to-t from-black/90 via-black/45 to-transparent z-10 flex flex-col justify-end">
                <h3 className="font-heading text-lg sm:text-xl font-bold tracking-tight uppercase text-white mb-1.5">
                  {CARDS[3].title}
                </h3>
                <p className="text-xs sm:text-sm text-white/80 font-light leading-relaxed">
                  {CARDS[3].description}
                </p>
              </div>
            </article>

            {/* Card 05: Events & Venues */}
            <article className="group relative w-full md:col-span-2 lg:col-span-1 h-[360px] sm:h-[400px] lg:h-[440px] overflow-hidden rounded-2xl bg-card border border-border/70 shadow-xl">
              <Image
                src={CARDS[4].imageSrc}
                alt={CARDS[4].imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 33vw"
                className="object-cover object-center select-none pointer-events-none transition-transform duration-700 ease-out group-hover:scale-105"
              />
              {/* Subtle Number Badge */}
              <div className="absolute top-5 left-5 sm:top-6 sm:left-6 z-10">
                <span className="text-xs sm:text-[13px] font-mono font-medium tracking-[0.2em] text-accent uppercase bg-black/60 border border-white/10 px-2.5 py-1 rounded backdrop-blur-sm">
                  {CARDS[4].number}
                </span>
              </div>
              {/* Bottom Scrim & Text */}
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7 bg-gradient-to-t from-black/90 via-black/45 to-transparent z-10 flex flex-col justify-end">
                <h3 className="font-heading text-lg sm:text-xl font-bold tracking-tight uppercase text-white mb-1.5">
                  {CARDS[4].title}
                </h3>
                <p className="text-xs sm:text-sm text-white/80 font-light leading-relaxed">
                  {CARDS[4].description}
                </p>
              </div>
            </article>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default BuildSpace;
