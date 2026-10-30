import { Container } from "@/components/ui/Container";

interface TestimonialItem {
  id: string;
  number: string;
  tag: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  location: string;
}

const TESTIMONIALS: TestimonialItem[] = [
  {
    id: "1",
    number: "01",
    tag: "FLAGSHIP RETAIL",
    quote:
      "Lumera's micro-pitch displays transformed our flagship galleria into an immersive architectural landmark. The color fidelity and seamless 90° corner transitions exceeded every benchmark.",
    author: "Elena Rostova",
    role: "Design Director",
    company: "Studio Forma Architecture",
    location: "Milan",
  },
  {
    id: "2",
    number: "02",
    tag: "MEDIA ARCHITECTURE",
    quote:
      "Integrating 10,000-nit outdoor screens into a historical building facade required surgical engineering. Lumera delivered flawless thermal performance and pristine daylight visibility.",
    author: "Marcus Vance",
    role: "Head of Infrastructure",
    company: "Apex Media Group",
    location: "London",
  },
  {
    id: "3",
    number: "03",
    tag: "VIRTUAL PRODUCTION & XR",
    quote:
      "The 7,680Hz refresh rate and zero scan lines gave our virtual production stage cinema-grade realism. Their on-site support from concept to calibration was second to none.",
    author: "David Chen",
    role: "Technical Producer",
    company: "Horizon Stage Labs",
    location: "Tokyo",
  },
];

export function TestimonialSection() {
  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="relative bg-transparent py-10 sm:py-15 lg:py-20 text-foreground overflow-hidden border-t border-border/40"
    >
      <Container>
        {/* Section Header: 3-Line Heading + Description */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 mb-14 sm:mb-20">
          {/* Main 3-Line Heading */}
          <h2
            id="testimonials-heading"
            className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.75rem] font-bold tracking-tight text-foreground uppercase leading-[0.92] select-none"
          >
            TRUSTED BY<br />
            ARCHITECTS &<br />
            <span className="text-accent">VISIONARIES.</span>
          </h2>

          {/* Right Description */}
          <p className="max-w-xs lg:max-w-sm text-sm text-muted-foreground leading-relaxed pt-2 lg:pt-4">
            From monumental public installations to bespoke luxury flagships, hear how our displays redefine commercial spaces.
          </p>
        </div>

        {/* 3-Column Testimonial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {TESTIMONIALS.map((item) => (
            <article
              key={item.id}
              className="relative bg-card border border-border/70 hover:border-primary/50 transition-colors duration-300 p-8 sm:p-10 rounded-2xl flex flex-col justify-between group"
            >
              <div>
                {/* Card Top: Number Index & Project Tag */}
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
                  <span className="text-xs font-mono tracking-widest text-white/50">
                    {item.number}
                  </span>
                  <span className="text-[10px] font-mono tracking-widest uppercase text-accent font-semibold px-2.5 py-0.5 rounded bg-accent/10 border border-accent/20">
                    {item.tag}
                  </span>
                </div>

                {/* Quote Text */}
                <p className="text-base sm:text-[17px] text-white/85 leading-relaxed font-normal mb-8">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              {/* Author Information */}
              <div className="pt-6 border-t border-border/60">
                <h3 className="text-sm font-bold uppercase tracking-wide text-white group-hover:text-primary transition-colors duration-200">
                  {item.author}
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {item.role} &middot; <span className="text-white/70">{item.company}</span>
                </p>
                <span className="inline-block mt-2 text-[10px] font-mono tracking-wider text-muted-foreground/80 uppercase">
                  {item.location}
                </span>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default TestimonialSection;

