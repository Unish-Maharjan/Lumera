import Image from "next/image";
import { Container } from "@/components/ui/Container";

interface TrustPrinciple {
  number: string;
  title: string;
  description: string;
}

const TRUST_PRINCIPLES: TrustPrinciple[] = [
  {
    number: "01",
    title: "Thoughtful Planning",
    description:
      "Every project begins with understanding the space, audience, and requirements.",
  },
  {
    number: "02",
    title: "Precision in Execution",
    description:
      "Careful coordination, installation, and testing help ensure the display is ready for its intended use.",
  },
  {
    number: "03",
    title: "Support Beyond Installation",
    description:
      "We aim to build lasting relationships through guidance and support after the display is installed.",
  },
];

export function TrustSection() {
  return (
    <section
      id="trust"
      aria-labelledby="trust-heading"
      className="relative w-full bg-transparent py-16 sm:py-20 lg:py-24 border-t border-border/40 select-none overflow-hidden"
    >
      <Container className="w-full">
        {/* Top Composition: Narrative Header on Left + Supporting Visual on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center mb-14 sm:mb-18 lg:mb-20">
          {/* Top-Left: Eyebrow, Headline, and Supporting Text */}
          <div className="lg:col-span-7 xl:col-span-7 flex flex-col justify-center text-left">
            {/* Eyebrow */}
            <div className="mb-3 sm:mb-4">
              <span className="text-xs sm:text-[13px] font-mono font-medium tracking-[0.25em] text-accent uppercase">
                WHY LUMERA
              </span>
            </div>

            {/* Headline */}
            <h2
              id="trust-heading"
              className="font-heading text-3xl sm:text-5xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-foreground uppercase leading-[1.06] mb-5 sm:mb-6"
            >
              Built on trust.<br />
              <span className="text-accent">Delivered with precision.</span>
            </h2>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg lg:text-xl font-light text-muted-foreground leading-relaxed sm:leading-loose max-w-2xl">
              From the first conversation to the final installation, we focus on thoughtful planning, reliable execution, and support that keeps your display performing.
            </p>
          </div>

          {/* Top-Right: Supporting Authentic Installation Visual */}
          <div className="lg:col-span-5 xl:col-span-5 flex items-center justify-center">
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] xl:aspect-[16/10] overflow-hidden rounded-2xl bg-card border border-border/70 shadow-xl">
              <Image
                src="/images/building-facade.jpg"
                alt="Architectural LED display engineered into a commercial facade"
                fill
                sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 42vw, 520px"
                className="object-cover object-center select-none pointer-events-none"
              />
              {/* Subtle edge depth gradient */}
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 z-10"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>

        {/* Bottom Composition: Three Trust Principles in Clean Horizontal Layout with Linear Dividers */}
        <div className="border-t border-border/40 pt-10 sm:pt-14 lg:pt-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0">
            {TRUST_PRINCIPLES.map((principle, idx) => (
              <div
                key={principle.number}
                className={`flex flex-col text-left ${
                  idx === 0
                    ? "md:pr-8 lg:pr-12"
                    : idx === 1
                    ? "border-t md:border-t-0 md:border-l border-border/40 pt-8 md:pt-0 md:px-8 lg:px-12"
                    : "border-t md:border-t-0 md:border-l border-border/40 pt-8 md:pt-0 md:pl-8 lg:pl-12"
                }`}
              >
                {/* Principle Number */}
                <span className="text-xs font-mono font-medium tracking-[0.25em] text-accent uppercase block mb-3 sm:mb-4">
                  {principle.number}
                </span>

                {/* Principle Title */}
                <h3 className="font-heading text-lg sm:text-xl font-bold tracking-tight text-foreground uppercase leading-snug mb-2.5 sm:mb-3">
                  {principle.title}
                </h3>

                {/* Principle Description */}
                <p className="text-sm sm:text-base font-light text-muted-foreground leading-relaxed">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

export default TrustSection;