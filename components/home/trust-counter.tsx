"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  {
    value: 150,
    suffix: "+",
    label: "Projects Delivered",
  },
  {
    value: 500,
    suffix: "+",
    label: "Displays Installed",
  },
  {
    value: 50,
    suffix: "+",
    label: "Trusted Clients",
  },
  {
    value: 10,
    suffix: "+",
    label: "Number of Products",
  },
];

function Counter({ value }: { value: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;

    let frameId: number;
    const duration = 1800;
    const startTime = performance.now();

    const animate = (time: number) => {
      const progress = Math.min((time - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setCount(Math.floor(value * eased));

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameId);
  }, [started, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {count.toLocaleString()}
    </span>
  );
}

export default function TrustCounter() {
  return (
    <section className="relative bg-[#000000] py-20 text-foreground md:py-28 overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Centered Heading
        <div className="mx-auto max-w-3xl text-center mb-14 sm:mb-18 lg:mb-20">
          <h2 className="font-heading text-3xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight text-foreground leading-[1.12]">
            Built on <span className="text-accent">trust</span>.
          </h2>
        </div> */}

        {/* 4-Column Stats Grid */}
        <div className="grid grid-cols-2 border-border md:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`border-border py-8 md:py-12 flex flex-col items-center text-center px-4 ${
                index % 2 === 0 ? "border-r" : ""
              } ${
                index < 2 ? "border-b md:border-b-0" : ""
              } md:border-r md:last:border-r-0`}
            >
              {/* Number Counter */}
              <div className="font-heading mb-2 text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl flex items-center justify-center leading-none">
                <Counter value={stat.value} />
                <span className="text-accent ml-0.5 font-light">
                  {stat.suffix}
                </span>
              </div>

              {/* Label */}
              <p className="font-sans text-xs sm:text-sm font-medium uppercase tracking-wider text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export { TrustCounter };
