"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faUser,
  faBagShopping,
} from "@fortawesome/free-solid-svg-icons";
import { Container } from "@/components/ui/Container";
import { usePreloader } from "@/components/ui/Preloader";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "#shop" },
  { label: "Collections", href: "#collections" },
  { label: "About Us", href: "/about" },
  { label: "Blog", href: "#blog" },
];

export function Header() {
  const { triggerPreloader } = usePreloader();
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setIsScrolled(currentScrollY > 20);

      // Always visible near the top of the page
      if (currentScrollY < 60) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY + 5) {
        // Scrolling DOWN -> hide header
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY - 5) {
        // Scrolling UP -> reveal header
        setIsVisible(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full
         transition-all duration-300 ease-in-out ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } ${
        isScrolled
          ? "bg-black/90 backdrop-blur-md border-b border-white/10 shadow-2xl"
          : "bg-transparent border-b border-transparent shadow-none"
      }`}
    >
      <Container className="h-14 sm:h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center -my-3 sm:-my-4">
          <Image
            src="/logo/background-less-logo.png"
            alt="Lumera Ventures"
            width={180}
            height={80}
            priority
            className="h-20 sm:h-24 w-auto object-contain select-none drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]"
          />
        </Link>

        {/* Center Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 lg:gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={(e) => {
                if (link.label === "About Us") {
                  e.preventDefault();
                  triggerPreloader(link.href);
                }
              }}
              className={`text-xs lg:text-sm tracking-wide transition-colors duration-200 ${
                !isScrolled
                  ? link.label === "Home"
                    ? "text-white font-semibold drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
                    : "text-white/80 hover:text-white font-medium drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
                  : link.label === "Home"
                    ? "text-white font-semibold"
                    : "text-white/75 hover:text-white font-medium"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Action Icons */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          <button
            type="button"
            aria-label="Search"
            className={`flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full transition-colors cursor-pointer ${
              !isScrolled
                ? "bg-black/30 backdrop-blur-md border border-white/20 text-white/90 hover:bg-white/20 hover:text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
                : "bg-white/[0.08] border border-white/10 text-white/90 hover:bg-white/15 hover:text-white"
            }`}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
          </button>

          <button
            type="button"
            aria-label="Account"
            className={`flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full transition-colors cursor-pointer ${
              !isScrolled
                ? "bg-black/30 backdrop-blur-md border border-white/20 text-white/90 hover:bg-white/20 hover:text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
                : "bg-white/[0.08] border border-white/10 text-white/90 hover:bg-white/15 hover:text-white"
            }`}
          >
            <FontAwesomeIcon icon={faUser} className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
          </button>

          <button
            type="button"
            aria-label="Cart"
            className={`flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full transition-colors cursor-pointer ${
              !isScrolled
                ? "bg-black/30 backdrop-blur-md border border-white/20 text-white/90 hover:bg-white/20 hover:text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
                : "bg-white/[0.08] border border-white/10 text-white/90 hover:bg-white/15 hover:text-white"
            }`}
          >
            <FontAwesomeIcon icon={faBagShopping} className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
          </button>
        </div>
      </Container>
    </header>
  );
}

export default Header;
