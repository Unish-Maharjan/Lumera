import React from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { ProductItem } from "@/data/products";

interface ProductCardProps {
  product: ProductItem;
  priority?: boolean;
  className?: string;
}

export function ProductCard({
  product,
  priority = false,
  className = "",
}: ProductCardProps) {
  return (
    <article
      className={`group relative flex flex-col justify-between p-6 sm:p-8 lg:p-10 bg-zinc-950/60 border border-white/10 transition-colors duration-300 hover:border-white/20 overflow-hidden ${className}`.trim()}
    >
      {/* Top Header: Series & Category */}
      <div className="flex items-center justify-between w-full mb-6 z-10">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
          {product.category}
        </span>
        <span className="font-mono text-xs uppercase tracking-widest text-zinc-500">
          SERIES {product.series}
        </span>
      </div>

      {/* Large Dominant Product Image */}
      <div className="relative w-full h-[280px] sm:h-[340px] lg:h-[380px] flex items-center justify-center my-4">
        {/* Subtle radial glow behind product */}
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_220px_at_50%_50%,_rgba(215,184,117,0.04)_0%,_transparent_75%)]"
          aria-hidden="true"
        />

        <div className="relative w-full h-full max-w-[500px] flex items-center justify-center">
          <Image
            src={product.imageSrc}
            alt={`${product.name} display module`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={priority}
            className="object-contain select-none pointer-events-none drop-shadow-[0_20px_45px_rgba(0,0,0,0.85)] transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        </div>
      </div>

      {/* Product Content & Key Specs */}
      <div className="flex flex-col mt-6 z-10">
        <h3 className="font-heading text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white mb-2 leading-tight">
          {product.name}
        </h3>

        <p className="font-sans text-xs sm:text-sm text-zinc-300 font-light leading-relaxed mb-6 line-clamp-2">
          {product.tagline || product.summary}
        </p>

        {/* Essential Specs Row */}
        {product.specs && product.specs.length > 0 && (
          <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-4 mb-6">
            {product.specs.slice(0, 2).map((spec) => (
              <div key={spec.label} className="flex flex-col">
                <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500 mb-0.5">
                  {spec.label}
                </span>
                <span className="font-sans text-xs sm:text-sm font-medium text-white">
                  {spec.value}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Action Button */}
        <div>
          <Link href="/#contact-cta">
            <Button variant="outline" size="sm">
              Explore solution
            </Button>
          </Link>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;

