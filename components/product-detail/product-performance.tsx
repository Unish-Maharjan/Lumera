import Image from "next/image";
import Container from "@/components/ui/Container";

interface ProductPerformanceProps {
  imageSrc?: string;
  productName?: string;
}

const METRICS = [
  { kicker: "Native", value: "4K+", label: "High Resolution" },
  { kicker: "Cinema", value: "HDR", label: "Vivid Colors" },
  { kicker: "Continuous", value: "24/7", label: "Reliable Operation" },
];

export function ProductPerformance({
  imageSrc = "/products/product-2.webp",
  productName,
}: ProductPerformanceProps) {
  return (
    <section
      id="performance"
      aria-label="Performance"
      className="w-full overflow-hidden bg-white pt-0 pb-16 
      font-inter text-zinc-950 sm:pb-24 lg:pb-32"
    >
      <Container size="xl">
        {/* The image with reduced upper padding and top alignment */}
        <div className="relative mx-auto aspect-[16/9] sm:aspect-[21/9] w-full ">
          <Image
            src={imageSrc}
            alt={`${productName ?? "Lumera"} performance hardware`}
            fill
            priority
            sizes=""
            className="object-contain scale-x-175 scale-y-175 -mt-30"
          />
        </div>

        <div className="mx-auto mt-12 max-w-5xl sm:mt-16">
          {/* Three headline numbers */}
          <dl className="grid grid-cols-3 gap-4 border-y border-zinc-200 py-10 sm:gap-8">
            {METRICS.map((metric) => (
              <div key={metric.value}>
                <dt className="text-xs text-zinc-500 sm:text-sm">
                  {metric.kicker}
                </dt>
                <dd className="mt-1 text-3xl font-bold leading-none 
                tracking-tight tabular-nums sm:text-5xl lg:text-6xl">
                  {metric.value}
                </dd>
                <dd className="mt-2 text-xs text-zinc-600 sm:text-sm">
                  {metric.label}
                </dd>
              </div>
            ))}
          </dl>

          {/* Both paragraphs share one size */}
          <div className="mt-10 space-y-5 font-inter text-lg leading-relaxed text-zinc-600 sm:text-xl">
            <p>
              LED displays deliver exceptional visual experiences through
              vibrant colors, impressive brightness and seamless image
              reproduction. Designed to capture attention in any environment,
              they bring content to life with remarkable clarity.
            </p>
            
          </div>
        </div>
      </Container>
    </section>
  );
}

export default ProductPerformance;