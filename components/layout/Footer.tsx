import React from "react";
import Link from "next/link";
import Image from "next/image";
import Container from "../ui/Container";

export function Footer() {
  return (
    <footer className="relative w-full bg-black text-zinc-400 font-sans 
    pt-4 sm:pt-6 lg:pt-8 pb-4 sm:pb-5 min-h-[360px] sm:min-h-[440px] lg:min-h-[500px] flex flex-col justify-between select-none overflow-hidden">
      {/* Background Moon Image */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <Image
          src="/images/footer (2).png"
          alt="Moon Footer Background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-bottom opacity-95"
        />
        {/* Top vignette to seamlessly blend with CTA black */}
        <div className="absolute inset-x-0 top-0 h-16 sm:h-24 lg:h-32 bg-gradient-to-b from-black via-black/60 to-transparent pointer-events-none z-10" />
      </div>

      <Container className="relative z-10 w-full flex-1 flex flex-col justify-between">
        {/* 1. Top Section: Clean Horizontal Links & Contact Bar (Matching Reference) */}
        <div className="w-full flex flex-col lg:flex-row lg:items-start justify-between gap-6 sm:gap-8 pb-4 sm:pb-6 pt-1 sm:pt-2">
          {/* Left Side: Links */}
          <div className="flex flex-col items-start">
            <span className="text-white font-semibold text-sm sm:text-base inline-block pb-0.5 mb-2.5 sm:mb-3 select-none">
              Links
            </span>
            <nav aria-label="Footer Navigation">
              <ul className="flex flex-wrap items-center gap-x-6 sm:gap-x-8 lg:gap-x-10 gap-y-2 text-xs sm:text-sm text-zinc-300 font-light">
                <li>
                  <Link
                    href="/"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="hover:text-white transition-colors duration-200"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#process"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Process
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#contact-cta"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Right Side: Contact */}
          <div className="flex flex-col items-start lg:items-end">
            <span className="text-white font-semibold text-sm sm:text-base inline-block pb-0.5 mb-2.5 sm:mb-3 select-none">
              Contact
            </span>
            <div className="flex flex-wrap items-center gap-x-6 sm:gap-x-8 lg:gap-x-10 gap-y-2 text-xs sm:text-sm text-zinc-300 font-light">
              <a
                href="tel:+9779876543210"
                className="hover:text-white transition-colors duration-200 whitespace-nowrap"
              >
                +977 9876543210
              </a>
              <span className="whitespace-nowrap">
                Kathmandu, Nepal
              </span>
              <a
                href="mailto:projects@lumeraventures.com"
                className="hover:text-white transition-colors duration-200 whitespace-nowrap"
              >
                projects@lumeraventures.com
              </a>
            </div>
          </div>
        </div>

        {/* 2. Middle Section: Monumental Lumera Ventures Text */}
        <div className="w-full flex items-center justify-center mt-6 sm:mt-8 lg:mt-10 pt-2 sm:pt-4 pb-4 sm:pb-6 lg:pb-8 overflow-hidden">
          <h2 className="w-full select-none text-center font-heading uppercase leading-none tracking-tight text-white/95 text-[clamp(2rem,7.5vw,7.5rem)]">
             LUMERA VENTURES
          </h2>
        </div>

        {/* 3. Bottom Section: Baseline Divider, Copyright & Attribution */}
        <div className="w-full pt-3 sm:pt-4 pb-1 sm:pb-2 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-[13px] font-sans text-zinc-400">
          <p className="text-center sm:text-left drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
            © 2026 Lumera Ventures. All rights reserved.
          </p>

          <div className="flex items-center gap-2.5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
            <span>Designed And Developed By</span>
            <div className="relative h-5 w-16 opacity-90 hover:opacity-100 transition-opacity">
              <Image
                src="/logo/webx-logo.svg"
                alt="WebX"
                fill
                className="object-contain object-left"
              />
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
