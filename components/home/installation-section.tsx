import { Container } from "@/components/ui/Container";

interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

const STEPS: ProcessStep[] = [
  {
    number: "01",
    title: "CONSULTATION",
    description: "Understanding your space and requirements.",
  },
  {
    number: "02",
    title: "DESIGN & PLANNING",
    description: "Developing the right display solution.",
  },
  {
    number: "03",
    title: "SUPPLY & INSTALLATION",
    description: "Delivering and installing the display system.",
  },
  {
    number: "04",
    title: "TESTING & SUPPORT",
    description: "Ensuring reliable performance.",
  },
];

export function InstallationSection() {
  return (
    <section
      id="installation"
      aria-labelledby="installation-heading"
      className="relative bg-transparent py-14 sm:py-20 lg:py-30 text-foreground overflow-hidden border-t border-border/40"
    >
      <Container>
        {/* Section Header */}
        <div className="mb-20 sm:mb-28">
          {/* Main 3-Line Heading */}
          <h2
            id="installation-heading"
            className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight text-foreground uppercase leading-[0.92] select-none"
          >
            FROM CONCEPT<br />
            TO<br />
            <span className="text-accent">INSTALLATION.</span>
          </h2>
        </div>

        {/* 4-Column Process Timeline Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-8 lg:gap-0">
          {STEPS.map((step) => (
            <div
              key={step.number}
              className="flex flex-col lg:border-r lg:border-border/40 lg:px-8 first:pl-0 last:border-r-0 last:pr-0"
            >
              {/* Step Number */}
              <span className="text-xs font-mono tracking-widest text-muted-foreground/70">
                {step.number}
              </span>

              {/* Progress Line with Electric Blue Marker Node */}
              <div className="relative w-full h-px bg-border/60 my-6 sm:my-7">
                <span
                  className="absolute -top-[2.5px] left-0 h-1.5 w-1.5 bg-primary shrink-0"
                  aria-hidden="true"
                />
              </div>

              {/* Step Title */}
              <h3 className="text-lg sm:text-xl font-bold uppercase tracking-tight text-foreground mb-2">
                {step.title}
              </h3>

              {/* Step Description */}
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default InstallationSection;
