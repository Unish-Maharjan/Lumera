import React from "react";
import Link from "next/link";
import Image from "next/image";
import Container from "../ui/Container";


export function Footer() {
  return (
    <footer className="w-full bg-black text-zinc-400 border-t border-white/[0.08] pt-16 sm:pt-20 lg:pt-24 pb-12 sm:pb-16 select-none">
      <Container className="flex flex-col gap-14 sm:gap-16 lg:gap-20">
        {/* Main Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Brand & Studio Ethos (Cols 1-6) */}
          <div className="md:col-span-6 flex flex-col gap-6">
            <Link href="/" className="inline-block focus:outline-none" aria-label="Lumera Ventures Home">
              <div className="relative h-30 w-auto">
                <Image
                  src="/logo/background-less-logo.png"
                  alt="Lumera Ventures"
                  fill
                  sizes="300px"
                  className="object-contain object-left"
                />
              </div>
            </Link>

            <p className="text-xs sm:text-[13px] text-zinc-400 font-light leading-relaxed max-w-sm">
              Architectural lighting and illuminated signage engineered for spaces that demand distinction.
            </p>

            <div className="flex flex-col gap-1.5 pt-2 font-mono text-xs text-zinc-500">
              <span className="tracking-widest uppercase text-zinc-400">Kathmandu, Nepal</span>
              <a
                href="mailto:projects@lumeraventures.com"
                className="hover:text-[#D6B875] transition-colors tracking-wide text-zinc-400"
              >
                projects@lumeraventures.com
              </a>
            </div>
          </div>

          {/* Navigation Index (Cols 7-9) */}
          <div className="md:col-span-3 flex flex-col gap-4">
            <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.25em] text-[#D6B875] uppercase">
              Index
            </span>
            <ul className="flex flex-col gap-3 text-xs sm:text-[13px] font-light">
              <li>
                <Link href="/products" className="hover:text-white transition-colors">
                  Luminaires & Systems
                </Link>
              </li>
              <li>
                <Link href="/solutions" className="hover:text-white transition-colors">
                  Architectural Solutions
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-white transition-colors">
                  Completed Projects
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Studio
                </Link>
              </li>
            </ul>
          </div>

          {/* Engagement & Specifications (Cols 10-12) */}
          <div className="md:col-span-3 flex flex-col gap-4">
            <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.25em] text-[#D6B875] uppercase">
              Inquiries
            </span>
            <ul className="flex flex-col gap-3 text-xs sm:text-[13px] font-light">
              <li>
                <Link href="/request-a-quote" className="hover:text-white transition-colors">
                  Request Specifications
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact & Consult
                </Link>
              </li>
              <li>
                <Link href="/resources" className="hover:text-white transition-colors">
                  Technical Documentation
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Minimalist Baseline / Copyright & Attribution */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[11px] font-mono text-zinc-500 tracking-wider">
          <p>© 2026 LUMERA VENTURES. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-2.5">
            <span className="uppercase text-zinc-500">Designed and Developed by</span>
            <div className="relative h-5 w-16 shrink-0 opacity-80 hover:opacity-100 transition-opacity">
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
