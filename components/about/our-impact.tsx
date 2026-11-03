import React from "react";
import Container from "@/components/ui/Container";

const STATS = [
  { value: "150+", label: "Projects Delivered" },
  { value: "500+", label: "Displays Installed" },
  { value: "50+", label: "Trusted Clients" },
  { value: "10+", label: "Number of Products" },
];

export function OurImpact() {
  return (
    <section className="relative w-full bg-black text-foreground py-20 sm:py-28 lg:py-36 border-t border-white/10">
      <Container size="xl">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16 lg:mb-20">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent mb-4 sm:mb-6 block">
            OUR IMPACT
          </span>

          <h2 className="font-heading text-3xl sm:text-5xl md:text-6xl font-bold uppercase leading-[1.05] tracking-tight text-white mb-6 sm:mb-8">
            Built on rigor and lasting <span className="text-accent">partnerships.</span>
          </h2>

          <p className="font-sans text-base sm:text-lg text-zinc-300 font-light leading-relaxed max-w-2xl">
            From initial structural feasibility through decades of lifecycle maintenance, our partners rely on our engineering consistency and unwavering accountability across every commission.
          </p>
        </div>

        {/* Minimal Typographic Metric Strip (Genuine Existing Project Stats) */}
        <div className="grid grid-cols-2 md:grid-cols-4 border-t border-b border-white/10 divide-y md:divide-y-0 divide-x-0 md:divide-x divide-white/10">
          {STATS.map((stat, idx) => (
            <div
              key={stat.label}
              className={`py-8 sm:py-12 flex flex-col justify-center ${
                idx % 2 === 0 ? "pr-6 sm:pr-8" : "pl-6 sm:pl-8 md:pl-8"
              } ${idx < 2 ? "" : "border-t md:border-t-0 border-white/10"}`}
            >
              <div className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-2 leading-none">
                {stat.value.replace("+", "")}
                <span className="text-accent font-light">+</span>
              </div>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-400">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default OurImpact;

