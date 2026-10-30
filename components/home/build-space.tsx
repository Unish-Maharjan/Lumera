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
      className="relative z-20 bg-black bg-[url('/images/star-bg.jpg')] bg-repeat bg-fixed -mt-[100vh] py-15 sm:py-28 lg:py-20 text-foreground overflow-hidden border-t border-border/40 shadow-[0_-25px_60px_rgba(0,0,0,0.95)]"
      style={{ backgroundSize: "576px 1024px" }}
    >
      <Container>
        {/* Section Header: 3-Line Heading */}
        <div className="mb-12 sm:mb-16">
          {/* Main 3-Line Heading */}
          <h2
            id="build-space-heading"
            className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.75rem] font-bold tracking-tight text-foreground uppercase leading-[0.92] select-none"
          >
            BUILT FOR<br />
            EVERY<br />
            <span className="text-accent">SPACE.</span>
          </h2>
        </div>

        {/* Asymmetric Editorial Grid matching Figma Screenshots */}
        <div className="flex flex-col gap-4 sm:gap-5">
          {/* Top Block: Card 01, Card 03, Card 04 on Left (Cols 1-8); Card 02 on Right (Cols 9-12) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-start">
            {/* Left Column Group (Cols 1-8) */}
            <div className="lg:col-span-8 flex flex-col gap-4 sm:gap-5">
              {/* Card 01: Shopping Malls (Top Left - Spans 2 cols wide) */}
              <article className="relative w-full aspect-[16/9] sm:aspect-[21/9] lg:aspect-auto lg:h-[320px] overflow-hidden bg-card border border-border/60">
                <Image
                  src={CARDS[0].imageSrc}
                  alt={CARDS[0].imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="object-cover select-none pointer-events-none"
                  priority
                />
                {/* Top Number */}
                <span className="absolute top-4 left-4 sm:top-5 sm:left-5 text-[11px] sm:text-xs font-mono tracking-widest text-white/80">
                  {CARDS[0].number}
                </span>
                {/* Bottom Gradient & Text */}
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 lg:p-7 bg-gradient-to-t from-black/85 via-black/40 to-transparent">
                  <h3 className="text-lg sm:text-xl font-bold tracking-tight uppercase text-white mb-1">
                    {CARDS[0].title}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-white/80 leading-relaxed max-w-md">
                    {CARDS[0].description}
                  </p>
                </div>
              </article>

              {/* Middle Row: Card 03 (Col 1) & Card 04 (Col 2) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 items-start">
                {/* Card 03: Retail Spaces (Middle Left) */}
                <article className="relative w-full aspect-square sm:aspect-[4/3] lg:aspect-auto lg:h-[340px] overflow-hidden bg-card border border-border/60">
                  <Image
                    src={CARDS[2].imageSrc}
                    alt={CARDS[2].imageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover select-none pointer-events-none"
                  />
                  {/* Top Number */}
                  <span className="absolute top-4 left-4 sm:top-5 sm:left-5 text-[11px] sm:text-xs font-mono tracking-widest text-white/80">
                    {CARDS[2].number}
                  </span>
                  {/* Bottom Gradient & Text */}
                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 bg-gradient-to-t from-black/85 via-black/40 to-transparent">
                    <h3 className="text-lg sm:text-xl font-bold tracking-tight uppercase text-white mb-1">
                      {CARDS[2].title}
                    </h3>
                    <p className="text-xs sm:text-[13px] text-white/80 leading-relaxed">
                      {CARDS[2].description}
                    </p>
                  </div>
                </article>

                {/* Card 04: Building Facades (Middle Center - Tall Portrait) */}
                <article className="relative w-full aspect-[3/4] sm:aspect-[3/4] lg:aspect-auto min-h-[440px] sm:min-h-[520px] lg:h-[600px] overflow-hidden bg-card border border-border/60">
                  <Image
                    src={CARDS[3].imageSrc}
                    alt={CARDS[3].imageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover select-none pointer-events-none"
                  />
                  {/* Top Number */}
                  <span className="absolute top-4 left-4 sm:top-5 sm:left-5 text-[11px] sm:text-xs font-mono tracking-widest text-white/80">
                    {CARDS[3].number}
                  </span>
                  {/* Bottom Gradient & Text */}
                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 bg-gradient-to-t from-black/85 via-black/40 to-transparent">
                    <h3 className="text-lg sm:text-xl font-bold tracking-tight uppercase text-white mb-1">
                      {CARDS[3].title}
                    </h3>
                    <p className="text-xs sm:text-[13px] text-white/80 leading-relaxed">
                      {CARDS[3].description}
                    </p>
                  </div>
                </article>
              </div>
            </div>

            {/* Right Column (Cols 9-12): Card 02 Outdoor Advertising (Length matches Card 1 + gap + Card 3) */}
            <div className="lg:col-span-4">
              <article className="relative w-full aspect-[4/5] sm:aspect-[3/4] lg:aspect-auto min-h-[460px] sm:min-h-[560px] lg:h-[680px] overflow-hidden bg-card border border-border/60">
                <Image
                  src={CARDS[1].imageSrc}
                  alt={CARDS[1].imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 34vw"
                  className="object-cover select-none pointer-events-none"
                  priority
                />
                {/* Top Number */}
                <span className="absolute top-4 left-4 sm:top-5 sm:left-5 text-[11px] sm:text-xs font-mono tracking-widest text-white/80">
                  {CARDS[1].number}
                </span>
                {/* Bottom Gradient & Text */}
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 lg:p-7 bg-gradient-to-t from-black/85 via-black/40 to-transparent">
                  <h3 className="text-lg sm:text-xl font-bold tracking-tight uppercase text-white mb-1">
                    {CARDS[1].title}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-white/80 leading-relaxed">
                    {CARDS[1].description}
                  </p>
                </div>
              </article>
            </div>
          </div>

          {/* Bottom Block: Card 05 Events & Venues on Left (Cols 1-8); Col 9-12 Empty */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5">
            <div className="lg:col-span-8">
              <article className="relative w-full aspect-[16/9] sm:aspect-[21/9] lg:aspect-auto lg:h-[320px] overflow-hidden bg-card border border-border/60">
                <Image
                  src={CARDS[4].imageSrc}
                  alt={CARDS[4].imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="object-cover select-none pointer-events-none"
                />
                {/* Top Number */}
                <span className="absolute top-4 left-4 sm:top-5 sm:left-5 text-[11px] sm:text-xs font-mono tracking-widest text-white/80">
                  {CARDS[4].number}
                </span>
                {/* Bottom Gradient & Text */}
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 lg:p-7 bg-gradient-to-t from-black/85 via-black/40 to-transparent">
                  <h3 className="text-lg sm:text-xl font-bold tracking-tight uppercase text-white mb-1">
                    {CARDS[4].title}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-white/80 leading-relaxed max-w-md">
                    {CARDS[4].description}
                  </p>
                </div>
              </article>
            </div>
            {/* Cols 9-12 intentionally blank dark space */}
          </div>
        </div>
      </Container>
    </section>
  );
}

export default BuildSpace;
