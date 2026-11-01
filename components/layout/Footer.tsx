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
    <footer className="w-full bg-black text-zinc-400 font-sans border-t border-white/[0.08] pt-14 sm:pt-18 lg:pt-20 pb-8 sm:pb-12 select-none">
      <Container className="w-full flex flex-col">
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


        {/* 3. Bottom Section: Monumental Lumera Ventures Logo (Replacing ALPINE TIMEPIECES) */}
        <div className="w-full flex items-center justify-center pt-6 sm:pt-10 lg:pt-12 pb-2">
          <div className="relative w-full max-w-[440px] sm:max-w-[580px] lg:max-w-[740px] xl:max-w-[860px] aspect-[1024/415]">
            <Image
              src="/logo/lumera-monumental-logo.png"
              alt="Lumera Ventures"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 860px"
              className="object-contain object-center pointer-events-none select-none drop-shadow-[0_10px_35px_rgba(215,184,117,0.16)]"
            />
          </div>
        </div>
        {/* 2. Middle Section: Copyright & Designed/Developed By (Above the Monumental Logo) */}
        <div className=" mt-4 pt-3 sm:pt-5 border-t border-white/[0.08] flex flex-col sm:flex-row 
        items-start sm:items-center justify-between gap-4 text-xs sm:text-[13px] font-sans text-zinc-500">
          <p>© 2026 Lumera Ventures. All rights reserved.</p>
          <div className="flex items-center gap-2.5">
            <span>Designed And Developed By</span>
            <div className="relative h-5 w-16 opacity-85 hover:opacity-100 transition-opacity">
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
