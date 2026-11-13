"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 150, suffix: "+", label: "Projects delivered" },
  { value: 500, suffix: "+", label: "Displays installed" },
  { value: 50, suffix: "+", label: "Trusted clients" },
  { value: 10, suffix: "+", label: "Products" },
];

function Counter({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return value;
    }
    return 0;
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Skip the animation for people who ask for less motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let frameId = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / 1800, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.round(value * eased));
          if (progress < 1) frameId = requestAnimationFrame(tick);
        };
        frameId = requestAnimationFrame(tick);
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frameId);
    };
  }, [value]);

  return (
    <span ref={ref} className="tabular-nums">
      {count.toLocaleString()}
    </span>
  );
}

export default function TrustCounter({ className = "" }: { className?: string }) {
  return (
    <section
      className={`py-16 text-zinc-950 sm:py-20 ${className}`.trim()}
    >
      <div className="mx-auto max-w-7xl">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4 md:gap-x-10">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col-reverse border-t border-zinc-300 pt-5"
            >
              <dt className="mt-2 font-sans text-sm text-zinc-600">
                {stat.label}
              </dt>
              <dd className="font-heading text-5xl font-semibold leading-none tracking-tight md:text-6xl">
                <Counter value={stat.value} />
                <span className="text-[#B89240]">{stat.suffix}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export { TrustCounter };