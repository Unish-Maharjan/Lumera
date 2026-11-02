import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faTiktok,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import Container from "../ui/Container";

export function Footer() {
  return (
    <footer className="relative w-full bg-black text-zinc-400 font-sans border-t border-white/[0.08] pt-14 sm:pt-16 lg:pt-18 pb-4 sm:pb-6 select-none overflow-hidden">
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
        {/* Subtle top vignette to ensure 100% seamless blend with page black */}
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black
         to-transparent pointer-events-none" />
      </div>

      <Container className="relative z-10 w-full flex flex-col justify-between">
        {/* 1. Top Section: 4-Column Editorial Navigation Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 pb-10 sm:pb-10 lg:pb-10">
          {/* Column 1: INFORMATION */}
          <div className="flex flex-col gap-3.5 sm:gap-4">
            <span className="text-xs sm:text-[13px] font-sans tracking-wider text-white uppercase font-semibold">
              Information
            </span>
            <ul className="flex flex-col gap-2.5 sm:gap-3 text-xs sm:text-[13px]">
              <li>
                <Link
                  href="/about"
                  className="hover:text-white transition-colors duration-150"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/about#our-story"
                  className="hover:text-white transition-colors duration-150"
                >
                  Our Story
                </Link>
              </li>
              <li>
                <Link
                  href="/#spaces"
                  className="hover:text-white transition-colors duration-150"
                >
                  Our Services
                </Link>
              </li>
              <li>
                <Link
                  href="/#installation"
                  className="hover:text-white transition-colors duration-150"
                >
                  Our Process
                </Link>
              </li>
              <li>
                <Link
                  href="/#contact-cta"
                  className="hover:text-white transition-colors duration-150"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: OUR SOLUTIONS */}
          <div className="flex flex-col gap-3.5 sm:gap-4">
            <span className="text-xs sm:text-[13px] font-sans tracking-wider text-white uppercase font-semibold">
              Our Solutions
            </span>
            <ul className="flex flex-col gap-2.5 sm:gap-3 text-xs sm:text-[13px]">
              <li>
                <Link
                  href="/#products"
                  className="hover:text-white transition-colors duration-150"
                >
                  Fine Pitch MicroLED
                </Link>
              </li>
              <li>
                <Link
                  href="/#products"
                  className="hover:text-white transition-colors duration-150"
                >
                  Stage & Rental LED
                </Link>
              </li>
              <li>
                <Link
                  href="/#products"
                  className="hover:text-white transition-colors duration-150"
                >
                  Outdoor Commercial
                </Link>
              </li>
              <li>
                <Link
                  href="/#products"
                  className="hover:text-white transition-colors duration-150"
                >
                  Transparent Glass
                </Link>
              </li>
              <li>
                <Link
                  href="/#contact-cta"
                  className="hover:text-white transition-colors duration-150"
                >
                  Custom Installations
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: LEGAL */}
          <div className="flex flex-col gap-3.5 sm:gap-4">
            <span className="text-xs sm:text-[13px] font-sans tracking-wider text-white uppercase font-semibold">
              Legal
            </span>
            <ul className="flex flex-col gap-2.5 sm:gap-3 text-xs sm:text-[13px]">
              <li>
                <Link
                  href="/#contact-cta"
                  className="hover:text-white transition-colors duration-150"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/#contact-cta"
                  className="hover:text-white transition-colors duration-150"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/about#trust"
                  className="hover:text-white transition-colors duration-150"
                >
                  Warranty & Support
                </Link>
              </li>
              <li>
                <Link
                  href="/about#trust"
                  className="hover:text-white transition-colors duration-150"
                >
                  Authenticity & Care
                </Link>
              </li>
              <li>
                <Link
                  href="/#contact-cta"
                  className="hover:text-white transition-colors duration-150"
                >
                  Technical Specifications
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: FOLLOW US */}
          <div className="flex flex-col gap-3.5 sm:gap-4">
            <span className="text-xs sm:text-[13px] font-sans tracking-wider text-white uppercase font-semibold">
              Follow Us
            </span>
            <div className="flex items-center gap-2.5 sm:gap-3 pt-1">
              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full border border-white/20 bg-white/[0.03] hover:bg-white/10 hover:border-white/60 text-zinc-300 hover:text-white transition-all duration-200 flex items-center justify-center text-xs"
              >
                <FontAwesomeIcon icon={faFacebookF} className="w-3.5 h-3.5" />
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full border border-white/20 bg-white/[0.03] hover:bg-white/10 hover:border-white/60 text-zinc-300 hover:text-white transition-all duration-200 flex items-center justify-center text-xs"
              >
                <FontAwesomeIcon icon={faInstagram} className="w-3.5 h-3.5" />
              </a>

              {/* TikTok */}
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="w-9 h-9 rounded-full border border-white/20 bg-white/[0.03] hover:bg-white/10 hover:border-white/60 text-zinc-300 hover:text-white transition-all duration-200 flex items-center justify-center text-xs"
              >
                <FontAwesomeIcon icon={faTiktok} className="w-3.5 h-3.5" />
              </a>

              {/* WhatsApp */}
              <a
                href="https://whatsapp.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 rounded-full border border-white/20 bg-white/[0.03] hover:bg-white/10 hover:border-white/60 text-zinc-300 hover:text-white transition-all duration-200 flex items-center justify-center text-xs"
              >
                <FontAwesomeIcon icon={faWhatsapp} className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>


        {/* 2. Middle Section: Monumental Lumera Ventures Text */}
        <div className="w-full flex items-center justify-center pt-8 sm:pt-14 lg:pt-18 pb-4 sm:pb-6 overflow-hidden">
          <h2
            className="w-full text-center font-heading text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[7.5rem] 2xl:text-[8.5rem] uppercase text-white/95 select-none leading-none tracking-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]"
          >
            LUMERA VENTURES
          </h2>
        </div>

        {/* 3. Bottom Section: Baseline Divider, Copyright & Attribution */}
        <div className="w-full pt-4 sm:pt-5 pb-2 sm:pb-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-[13px] font-sans text-zinc-400">
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
