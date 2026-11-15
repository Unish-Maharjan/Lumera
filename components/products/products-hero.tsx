"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";

export function ProductsHero() {
  const handleScrollToProducts = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById("products-grid");
    if (!target) return;

    const lenis = (
      window as unknown as {
        __lenis?: {
          scrollTo: (
            target: HTMLElement,
            options?: { offset?: number; duration?: number; immediate?: boolean }
          ) => void;
        };
      }
    )?.__lenis;

    if (lenis) {
      lenis.scrollTo(target, { offset: 0, duration: 1.4 });
    } else {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="w-full bg-[#F7F7F5]">
      <section className="relative flex min-h-dvh w-full items-center justify-center overflow-hidden
       bg-black text-foreground select-none pt-24 pb-16 sm:pt-32 sm:pb-24">
        {/* Background Architectural LED Visual */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none">
          <Image
            src="/images/products-hero.png"
            alt="Lumera architectural curved LED display integration"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center brightness-[0.82]"
          />

          {/* Darkened overlays for text contrast and seamless bottom transition */}
          {/* <div className="absolute inset-0 bg-black/35" />
          <div
            className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black via-black/80 
            to-transparent"
            aria-hidden="true"
          /> */}
        </div>

        {/* Content Container */}
        <div className="relative z-10 w-full">
          <Container size="xl">
            <div className="relative max-w-4xl mx-auto text-center flex flex-col items-center">
              {/* Main Headline */}
              <Heading
                as="h1"
                size="xl"
                align="center"
                className="w-full text-center"
              >
                High Performance <br />
                <span className="block text-center">Hardware</span>
              </Heading>

              {/* Supporting Subtitle */}
              {/* <p className="font-sans text-sm sm:text-base md:text-lg text-zinc-100 font-light leading-relaxed max-w-2xl mx-auto mt-6 sm:mt-8">
                From ultra-fine pitch MicroLED surfaces to monumental outdoor media facades, engineered for seamless structural integration, thermal endurance, and optical purity.
              </p> */}

              {/* CTA Button linking to product grid */}
              <div className="mt-8">
                <Link href="#products-grid" onClick={handleScrollToProducts}>
                  <Button variant="gold" size="md" rounded="full">
                    Explore Products
                  </Button>
                </Link>
              </div>
            </div>
          </Container>
        </div>
      </section>
    </div>
  );
}

export default ProductsHero;
