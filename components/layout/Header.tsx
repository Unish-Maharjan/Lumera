"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { usePreloader } from "@/components/ui/Preloader";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Services", href: "/#spaces" },
  { label: "Events", href: "/#spaces" },
];

const mobileNavLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Services", href: "/#spaces" },
  { label: "Contact Us", href: "/#contact-cta" },
];

export function Header() {
  const { triggerPreloader } = usePreloader();
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const handleLinkClick = (e: React.MouseEvent, label: string, href: string) => {
    setIsMobileMenuOpen(false);
    if (
      (label === "About Us" || label === "Products") &&
      typeof window !== "undefined" &&
      window.location.pathname !== href
    ) {
      e.preventDefault();
      triggerPreloader(href);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ease-in-out ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } ${
        isScrolled || isMobileMenuOpen
          ? "bg-black/90 backdrop-blur-md border-b border-white/10 shadow-2xl"
          : "bg-transparent border-b border-transparent shadow-none"
      }`}
    >
      <Container className="w-full relative h-14 flex items-center justify-between">
        {/* Left: Brand Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <Image
            src="/logo/background-less-logo.png"
            alt="Lumera Ventures"
            width={220}
            height={89}
            priority
            className="h-7 sm:h-8 lg:h-9 w-auto object-contain select-none"
          />
        </Link>

        {/* Middle: Centered Navigation Links */}
        <nav className="hidden md:flex items-center justify-center gap-6 
        lg:gap-10 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <Link
              key={`${link.label}-${link.href}`}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.label, link.href)}
              className="text-sm font-medium text-white/85 hover:text-accent transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right: Contact Us CTA Button & Mobile Hamburger */}
        <div className="flex items-center justify-end gap-2.5 sm:gap-3.5 shrink-0">
          <Link href="/#contact-cta">
            <Button
              variant="gold"
              size="sm"
              className="text-[11px] sm:text-xs tracking-wider px-3 sm:px-4 py-1.5 sm:py-2"
            >
              Contact Us
            </Button>
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="md:hidden flex h-9 w-9 items-center justify-center text-white/90 hover:text-accent transition-colors cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </Container>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-black/95 backdrop-blur-xl px-6 py-6 transition-all">
          <nav className="flex flex-col gap-4">
            {mobileNavLinks.map((link) => (
              <Link
                key={`mobile-${link.label}-${link.href}`}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.label, link.href)}
                className="text-sm font-medium tracking-wide text-white/85 hover:text-accent transition-colors py-1"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;
