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
      className="relative bg-obsidian/75 py-16 sm:py-20 lg:py-24 text-foreground overflow-hidden border-t border-border/40 select-none"
    >
      <Container>
        {/* Compact Intro Row: Left Heading + Right Supporting Description */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 sm:gap-8 lg:gap-12 mb-14 sm:mb-18 lg:mb-20 text-left">
          {/* Left: Eyebrow + 2-Line Controlled Heading */}
          <div className="max-w-xl">
            <div className="mb-3 sm:mb-4">
              <span className="text-xs sm:text-[13px] font-mono font-medium tracking-[0.25em] text-accent uppercase">
                OUR PROCESS
              </span>
            </div>
            <h2
              id="installation-heading"
              className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground uppercase leading-[1.08] select-none"
            >
              FROM CONCEPT<br />
              TO <span className="text-accent">INSTALLATION.</span>
            </h2>
          </div>

          {/* Right: Vertically Aligned Supporting Text */}
          <div className="max-w-md lg:max-w-sm lg:pb-1">
            <p className="text-sm sm:text-base text-muted-foreground font-light leading-relaxed">
              A structured four-phase engineering methodology delivering seamless calibration, certified structural safety, and lasting reliability.
            </p>
          </div>
        </div>

        {/* Desktop Connected Horizontal Timeline (lg and above) */}
        <div className="hidden lg:grid grid-cols-4 gap-8">
          {STEPS.map((step, index) => {
            const isLast = index === STEPS.length - 1;
            return (
              <div key={step.number} className="relative flex flex-col">
                {/* Marker & Continuous Connecting Line */}
                <div className="relative flex items-center mb-6">
                  {/* Subtle connecting line across markers */}
                  {!isLast && (
                    <div
                      className="absolute top-3.5 left-3.5 -right-[46px] h-px bg-border/80 z-0"
                      aria-hidden="true"
                    />
                  )}

                  {/* Small Numbered Marker */}
                  <div className="relative z-10 flex items-center justify-center w-7 h-7 rounded-full bg-obsidian border border-border/90 text-[11px] font-mono font-medium text-accent shrink-0">
                    {step.number}
                  </div>
                </div>

                {/* Left-Aligned Step Title */}
                <h3 className="font-heading text-base sm:text-lg font-bold uppercase tracking-tight text-foreground mb-2">
                  {step.title}
                </h3>

                {/* Left-Aligned Step Description */}
                <p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Mobile & Tablet Stacked Timeline (< lg) */}
        <div className="flex flex-col lg:hidden">
          {STEPS.map((step, index) => {
            const isLast = index === STEPS.length - 1;
            return (
              <div
                key={step.number}
                className="relative flex items-start gap-4 sm:gap-5 pb-8 last:pb-0"
              >
                {/* Vertical Track Column */}
                <div className="relative flex flex-col items-center self-stretch shrink-0">
                  {/* Small Numbered Marker */}
                  <div className="relative z-10 flex items-center justify-center w-7 h-7 rounded-full bg-obsidian border border-border/90 text-[11px] font-mono font-medium text-accent shrink-0">
                    {step.number}
                  </div>

                  {/* Vertical Connecting Line */}
                  {!isLast && (
                    <div
                      className="w-px flex-1 bg-border/80 my-2 min-h-[24px]"
                      aria-hidden="true"
                    />
                  )}
                </div>

                {/* Content */}
                <div className="pt-0.5">
                  <h3 className="font-heading text-base sm:text-lg font-bold uppercase tracking-tight text-foreground mb-1.5">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export default InstallationSection;
