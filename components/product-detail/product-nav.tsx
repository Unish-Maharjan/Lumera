"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faFileLines } from "@fortawesome/free-solid-svg-icons";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

interface ProductNavProps {
  productName: string;
  category: string;
}

const NAV_ITEMS = [
  { label: "Overview", href: "#overview" },
  { label: "Innovation", href: "#introduction" },
  { label: "Features", href: "#features" },
  { label: "Anatomy", href: "#anatomy" },
  { label: "Applications", href: "#applications" },
  { label: "Installation", href: "#installation" },
  { label: "Specs", href: "#specifications" },
  { label: "Gallery", href: "#gallery" },
  { label: "Downloads", href: "#downloads" },
];

export function ProductNav({ productName, category }: ProductNavProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 300);

      const sections = NAV_ITEMS.map((item) => item.href.substring(1));
      const scrollPos = window.scrollY + 140;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-black/85 backdrop-blur-xl border-b border-white/[0.08] shadow-2xl py-2 sm:py-2.5"
          : "bg-black/40 backdrop-blur-md border-b border-white/5 py-3"
      }`}
    >
      <Container size="xl">
        <div className="flex items-center justify-between gap-4">
          {/* Product Brand Header */}
          <div className="flex items-center gap-3 shrink-0">
            <span className="font-heading text-sm sm:text-base font-bold tracking-tight text-white uppercase">
              {productName}
            </span>
            <span className="hidden sm:inline-block h-3 w-px bg-white/20" />
            <span className="hidden sm:inline-block text-[11px] font-mono text-[#D7B875] tracking-[0.15em] uppercase">
              {category}
            </span>
          </div>

          {/* Nav Links: Desktop (Clean row) & Tablet/Mobile (Scrollable horizontally) */}
          <nav
            aria-label="Product sections"
            className="flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar py-1"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`relative px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-medium tracking-wide transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? "text-white font-semibold bg-white/10"
                      : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 inset-x-2 h-0.5 bg-[#D7B875] rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <a
              href="#downloads"
              className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
            >
              <FontAwesomeIcon icon={faFileLines} className="w-3 h-3 text-[#D7B875]" />
              <span>Datasheet</span>
            </a>

            <Link href="/contact">
              <Button
                variant="white"
                size="sm"
                className="text-[11px] sm:text-xs h-7 sm:h-8 px-3.5 sm:px-4 rounded-full font-semibold"
              >
                <span>Request Quote</span>
                <FontAwesomeIcon icon={faArrowRight} className="w-2.5 h-2.5 ml-1.5" />
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </header>
  );
}

export default ProductNav;
