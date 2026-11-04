import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { ProductItem } from "@/data/products";

interface ProductCardProps {
  product: ProductItem;
  priority?: boolean;
  className?: string;
  isActive?: boolean;
}

/**
 * Framing per product asset. The source canvases are portrait with the module
 * sitting low and centred, so most of the canvas is empty. We crop to a 4:3
 * stage with `cover` + a tuned vertical position so the product fills the
 * frame. `lumera-matrix` ships at only 500x600, so it stays `contain` to avoid
 * being upscaled into blur.
 */
interface Framing {
  fit: "cover" | "contain";
  position: string;
  scale: number;
}

const FRAMING: Record<string, Framing> = {
  "lumera-matrix": { fit: "contain", position: "50% 50%", scale: 1.04 },
  "lumera-vortex": { fit: "cover", position: "50% 88%", scale: 1.04 },
  "lumera-strata": { fit: "cover", position: "50% 82%", scale: 1.08 },
  "lumera-crystal": { fit: "cover", position: "50% 84%", scale: 1.12 },
  "lumera-curve": { fit: "cover", position: "50% 82%", scale: 1.04 },
  "lumera-titan": { fit: "cover", position: "50% 82%", scale: 1.04 },
};

const DEFAULT_FRAMING: Framing = {
  fit: "contain",
  position: "50% 50%",
  scale: 1,
};

export function ProductCard({
  product,
  priority = false,
  className = "",
  isActive = false,
}: ProductCardProps) {
  const framing = FRAMING[product.id] ?? DEFAULT_FRAMING;

  return (
    <article
      className={`group flex flex-col items-center text-center w-full max-w-[480px] mx-auto ${className}`.trim()}
    >
      {/* Stage */}
      <div
        data-product-image
        className="relative h-[26vh] sm:h-[30vh] md:h-[34vh] lg:h-[37vh] max-h-[330px] aspect-[4/3] w-auto max-w-full mx-auto transition-opacity duration-300 ease-out"
        style={{ opacity: isActive ? 1 : 0.35 }}
      >
        <div
          className="absolute inset-0 scale-(--s) transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[calc(var(--s)_*_1.02)]"
          style={{ "--s": framing.scale } as CSSProperties}
        >
          <Image
            src={product.imageSrc}
            alt={`${product.name} LED display module`}
            fill
            sizes="(min-width: 1280px) 40vw, (min-width: 768px) 50vw, 75vw"
            priority={priority}
            draggable={false}
            style={{ objectPosition: framing.position }}
            className={`pointer-events-none select-none ${
              framing.fit === "cover" ? "object-cover" : "object-contain"
            }`}
          />
        </div>
      </div>

      {/* Information */}
      <div className="mt-3 sm:mt-4 flex flex-col items-center">
        <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-accent">
          {product.category}
        </p>

        <h3 className="mt-1 font-heading text-lg sm:text-2xl lg:text-3xl font-bold uppercase leading-[0.98] tracking-tight text-white">
          {product.name}
        </h3>

        <p className="mt-1.5 sm:mt-2 max-w-[38ch] font-sans text-xs sm:text-sm font-light leading-relaxed text-zinc-400 line-clamp-2">
          {product.tagline || product.summary}
        </p>

        <Link
          href="/#contact-cta"
          draggable={false}
          className="mt-3 sm:mt-4"
        >
          <Button
            variant="white"
            size="sm"
            aria-label={`Explore solution: ${product.name}`}
          >
            Explore solution
          </Button>
        </Link>
      </div>
    </article>
  );
}

export default ProductCard;