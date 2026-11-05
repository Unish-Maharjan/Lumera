import React from "react";
import Link from "next/link";
import Image from "next/image";
import Container from "../ui/Container";

export function Footer() {
  return (
    <footer className="relative w-full bg-black text-zinc-400 font-sans 
    pt-5 sm:pt-10 lg:pt-15 pb-6 sm:pb-8 min-h-[500px] sm:min-h-[660px] lg:min-h-[740px] flex flex-col justify-between select-none overflow-hidden">
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
        <div className="absolute inset-x-0 top-0 h-24 sm:h-36 lg:h-48 bg-gradient-to-b from-black via-black/60 to-transparent pointer-events-none z-10" />
      </div>

      <Container className="relative z-10 w-full flex-1 flex flex-col justify-between">
        {/* 1. Top Section: Clean Horizontal Links & Contact Bar (Matching Reference) */}
        <div className="w-full flex flex-col lg:flex-row lg:items-start justify-between gap-8 sm:gap-10
         pb-8 sm:pb-12 pt-4">
          {/* Left Side: Links */}
          <div className="flex flex-col items-start">
            <span className="text-white font-semibold text-base sm:text-lg inline-block pb-1 mb-4 select-none">
              Links
            </span>
            <nav aria-label="Footer Navigation">
              <ul className="flex flex-wrap items-center gap-x-6 sm:gap-x-8 lg:gap-x-10 gap-y-2.5 text-xs sm:text-sm text-zinc-300 font-light">
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
            <span className="text-white font-semibold text-base sm:text-lg 
             inline-block pb-1 mb-4 select-none">
              Contact
            </span>
            <div className="flex flex-wrap items-center gap-x-6 sm:gap-x-8 lg:gap-x-10 gap-y-2.5 text-xs sm:text-sm text-zinc-300 font-light">
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

            {/* Social Media Channels */}
            {/* <div className="flex items-center gap-2.5 sm:gap-3 pt-4 sm:pt-5">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 rounded-full border border-white/20 bg-white/[0.03] hover:bg-white/10 hover:border-white/60 text-zinc-300 hover:text-white transition-all duration-200 flex items-center justify-center text-xs"
              >
                <FontAwesomeIcon icon={faFacebookF} className="w-3 h-3" />
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full border border-white/20 bg-white/[0.03] hover:bg-white/10 hover:border-white/60 text-zinc-300 hover:text-white transition-all duration-200 flex items-center justify-center text-xs"
              >
                <FontAwesomeIcon icon={faInstagram} className="w-3 h-3" />
              </a>

              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="w-8 h-8 rounded-full border border-white/20 bg-white/[0.03] hover:bg-white/10 hover:border-white/60 text-zinc-300 hover:text-white transition-all duration-200 flex items-center justify-center text-xs"
              >
                <FontAwesomeIcon icon={faTiktok} className="w-3 h-3" />
              </a>

              <a
                href="https://whatsapp.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-8 h-8 rounded-full border border-white/20 bg-white/[0.03] hover:bg-white/10 hover:border-white/60 text-zinc-300 hover:text-white transition-all duration-200 flex items-center justify-center text-xs"
              >
                <FontAwesomeIcon icon={faWhatsapp} className="w-3 h-3" />
              </a>
            </div> */}
          </div>
        </div>


        {/* 2. Middle Section: Monumental Lumera Ventures Text (Shifted up from the moon) */}
        <div className="w-full flex items-center justify-center pt-10 sm:pt-16 lg:pt-20 pb-12 sm:pb-20 lg:pb-28 -translate-y-3 sm:-translate-y-6 lg:-translate-y-10 overflow-hidden">
          <h2
            className="w-full text-center font-heading text-5xl sm:text-7xl 
            md:text-8xl lg:text-9xl xl:text-[8.5rem] 2xl:text-[9.5rem] 
            uppercase text-white/95 select-none leading-none tracking-tight 
            drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]"
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
