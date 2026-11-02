"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";

interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  initials: string;
  avatar: string;
  quote: string;
}

const TESTIMONIALS: TestimonialItem[] = [
  {
    id: "1",
    name: "Jane Bull",
    role: "Director of Facilities, Apex Tower London",
    initials: "JB",
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=160&h=160&q=80",
    quote:
      "We are delighted with our new architectural LED display. We wanted a stylish and contemporary solution for our commercial atrium that complemented our Grade II listed property in Central London. The service offered by Lumera was friendly and professional. The whole project from initial design to finished installation was trouble-free.",
  },
  {
    id: "2",
    name: "Devon Mothersille",
    role: "Principal Architect, Studio V Architecture",
    initials: "DM",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&h=160&q=80",
    quote:
      "The service from Lumera has been excellent. Before, during, and after installation of our 82% transparent glass LED wall, the team demonstrated remarkable engineering professionalism and a high standard of structural execution. We have zero hesitation in recommending Lumera.",
  },
  {
    id: "3",
    name: "Steven Goode",
    role: "Head of Creative DOOH, Horizon Media",
    initials: "SG",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&h=160&q=80",
    quote:
      "What a superb company! Our experience with Lumera's outdoor DOOH displays has been exceptional. They offer high-brightness hardware, precision calibration, and flawless thermal engineering. Their showroom gave us complete clarity on the options.",
  },
  {
    id: "4",
    name: "Marcus Lee",
    role: "VP of Retail Experience, Aurum Flagship",
    initials: "ML",
    avatar:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=160&h=160&q=80",
    quote:
      "The custom 3D anamorphic curved screen designed by Lumera for our flagship retail entrance has completely transformed customer engagement. Foot traffic has doubled, and the visual fidelity is unmatched in the industry.",
  },
  {
    id: "5",
    name: "Elena Kovacs",
    role: "Cinematography Director, Vortex Virtual Stage",
    initials: "EK",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&h=160&q=80",
    quote:
      "Lumera supplied and configured the high-refresh virtual production stage for our cinematic broadcast facility. Color accuracy, zero scanline flicker, and sub-millisecond sync were achieved on the first pass. Absolute masters of LED technology.",
  },
  {
    id: "6",
    name: "Priya Nandan",
    role: "Commercial Development Lead, Nexus Arena",
    initials: "PN",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=160&h=160&q=80",
    quote:
      "From complex structural load assessments to emergency weekend support, the Lumera team handled every aspect of our arena concourse displays with precision. Transparent communication and execution from start to finish.",
  },
];

function GoldStars() {
  return (
    <div className="flex items-center gap-1" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="13"
          height="13"
          viewBox="0 0 20 20"
          fill="#D7B875"
          className="shrink-0"
        >
          <path d="M10 1l2.6 6.2 6.7.6-5.1 4.4 1.6 6.6L10 15.6 4.2 18.8l1.6-6.6-5.1-4.4 6.7-.6L10 1z" />
        </svg>
      ))}
    </div>
  );
}

function GoogleLogo() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 20 20"
      className="shrink-0 select-none"
      aria-label="Google verified review"
    >
      <path
        fill="#4285F4"
        d="M19.6 10.2c0-.7-.06-1.4-.18-2H10v3.8h5.4a4.6 4.6 0 0 1-2 3v2.5h3.2c1.9-1.7 3-4.3 3-7.3z"
      />
      <path
        fill="#34A853"
        d="M10 20c2.7 0 5-.9 6.6-2.5l-3.2-2.5c-.9.6-2 1-3.4 1-2.6 0-4.8-1.8-5.6-4.1H1.1v2.6A10 10 0 0 0 10 20z"
      />
      <path
        fill="#FBBC05"
        d="M4.4 11.9a6 6 0 0 1 0-3.8V5.5H1.1a10 10 0 0 0 0 9l3.3-2.6z"
      />
      <path
        fill="#EA4335"
        d="M10 4a5.4 5.4 0 0 1 3.8 1.5l2.9-2.8A9.6 9.6 0 0 0 10 0 10 10 0 0 0 1.1 5.5l3.3 2.6C5.2 5.8 7.4 4 10 4z"
      />
    </svg>
  );
}

export function TestimonialSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [selectedReview, setSelectedReview] = useState<TestimonialItem | null>(null);

  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);

  // Responsive items-per-view tracking
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, TESTIMONIALS.length - visibleCount);
  const safeIndex = Math.min(currentIndex, maxIndex);

  const handlePrev = () => {
    setCurrentIndex((prev) => {
      const active = Math.min(prev, maxIndex);
      return active <= 0 ? maxIndex : active - 1;
    });
  };

  const handleNext = () => {
    setCurrentIndex((prev) => {
      const active = Math.min(prev, maxIndex);
      return active >= maxIndex ? 0 : active + 1;
    });
  };

  // Touch Swipe Support
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEndXRef.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStartXRef.current || !touchEndXRef.current) return;
    const distance = touchStartXRef.current - touchEndXRef.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }

    touchStartXRef.current = null;
    touchEndXRef.current = null;
  };

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="relative z-10 py-16 sm:py-24 lg:py-28 bg-black text-foreground overflow-hidden font-sans border-t border-white/[0.08] select-none"
    >
      <Container className="w-full">
        {/* Top Header Row: Centered Heading & Overall Rating */}
        <div className="relative w-full flex flex-col items-center justify-center text-center mb-10 sm:mb-14">
          <h2
            id="testimonials-heading"
            className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white uppercase leading-[1.08] text-center"
          >
            What our clients<br />say about us
          </h2>

          {/* Overall Rating Subheader */}
          <div className="flex items-center justify-center gap-2 pt-3 sm:pt-4 text-xs sm:text-sm font-mono tracking-wider uppercase">
            <GoldStars />
            <span className="font-semibold text-white ml-1">5.0</span>
            <span className="text-zinc-500">/</span>
            <span className="text-zinc-400">58 REVIEWS</span>
          </div>

          {/* Carousel Arrow Navigation Buttons */}
          <div className="flex items-center gap-2.5 pt-5 sm:pt-0 sm:absolute sm:right-0 sm:bottom-0">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous testimonial"
              className="w-10 h-10 sm:w-11 sm:h-11 border border-white/20 bg-zinc-950/80 hover:bg-white/10 hover:border-white/40 text-white flex items-center justify-center cursor-pointer select-none transition-colors"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
            </button>

            <button
              type="button"
              onClick={handleNext}
              aria-label="Next testimonial"
              className="w-10 h-10 sm:w-11 sm:h-11 border border-white/20 bg-zinc-950/80 hover:bg-white/10 hover:border-white/40 text-white flex items-center justify-center cursor-pointer select-none transition-colors"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>
        </div>

        {/* Carousel Viewport & Track */}
        <div
          className="overflow-hidden w-full -mx-3 px-3 py-2"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div
            className="flex transition-transform duration-500 ease-out will-change-transform"
            style={{
              transform: `translateX(-${safeIndex * (100 / visibleCount)}%)`,
            }}
          >
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="shrink-0 px-2.5 sm:px-3"
                style={{ width: `${100 / visibleCount}%` }}
              >
                {/* Individual Testimonial Card */}
                <div className="flex flex-col justify-between h-full p-6 sm:p-7 lg:p-8 bg-[#0c0d10] border border-white/[0.08] rounded-none shadow-xl min-h-[310px] sm:min-h-[340px]">
                  <div>
                    {/* Card Header: Avatar on left, Name & 5 Stars on right */}
                    <div className="flex items-center gap-3.5 mb-5">
                      <div className="relative w-12 h-12 rounded-xs overflow-hidden shrink-0 border border-white/15 bg-zinc-900">
                        <Image
                          src={t.avatar}
                          alt={t.name}
                          width={48}
                          height={48}
                          unoptimized
                          className="w-full h-full object-cover select-none pointer-events-none"
                          onError={(e) => {
                            (e.currentTarget as HTMLElement).style.display = "none";
                          }}
                        />
                        {/* Fallback Initials */}
                        <div className="absolute inset-0 flex items-center justify-center font-mono font-bold text-xs text-[#D7B875] bg-zinc-900 -z-10">
                          {t.initials}
                        </div>
                      </div>

                      <div className="flex flex-col justify-center">
                        <h3 className="font-sans font-bold text-base sm:text-lg text-white leading-tight">
                          {t.name}
                        </h3>
                        <div className="mt-1">
                          <GoldStars />
                        </div>
                      </div>
                    </div>

                    {/* Review Quote Paragraph */}
                    <blockquote className="font-sans text-xs sm:text-sm text-zinc-300 font-light leading-relaxed line-clamp-4 sm:line-clamp-5 min-h-[72px] sm:min-h-[88px]">
                      &ldquo;{t.quote}&rdquo;
                    </blockquote>
                  </div>

                  {/* Card Footer: READ MORE button on left, Google G Logo on right */}
                  <div className="flex items-center justify-between pt-4 sm:pt-5 mt-4 sm:mt-5 border-t border-white/[0.08]">
                    <button
                      type="button"
                      onClick={() => setSelectedReview(t)}
                      className="font-mono text-[11px] sm:text-xs font-semibold tracking-wider text-zinc-400 uppercase cursor-pointer flex items-center gap-1.5"
                    >
                      READ MORE
                    </button>

                    <GoogleLogo />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Pagination Indicator Dots */}
        <div className="flex items-center justify-center gap-1.5 pt-8 sm:pt-10">
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => {
            const isActive = safeIndex === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "w-8 bg-white"
                    : "w-2 bg-white/20"
                }`}
              />
            );
          })}
        </div>
      </Container>

      {/* Expanded Modal when user clicks 'READ MORE' */}
      {selectedReview && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setSelectedReview(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative max-w-lg w-full bg-[#0d0e12] border border-[#D7B875]/40 p-6 sm:p-8 rounded-none shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3.5">
                <div className="relative w-12 h-12 rounded-xs overflow-hidden shrink-0 border border-white/15 bg-zinc-900">
                  <Image
                    src={selectedReview.avatar}
                    alt={selectedReview.name}
                    width={48}
                    height={48}
                    unoptimized
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-white text-base sm:text-lg">
                    {selectedReview.name}
                  </h4>
                  <p className="font-mono text-xs text-zinc-400">
                    {selectedReview.role}
                  </p>
                  <div className="mt-1">
                    <GoldStars />
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedReview(null)}
                aria-label="Close review dialog"
                className="w-8 h-8 flex items-center justify-center border border-white/20 text-zinc-400 hover:text-white hover:border-white transition-colors cursor-pointer text-sm font-mono"
              >
                ✕
              </button>
            </div>

            <blockquote className="font-sans text-sm sm:text-base text-zinc-300 font-light leading-relaxed my-5">
              &ldquo;{selectedReview.quote}&rdquo;
            </blockquote>

            <div className="flex items-center justify-between pt-4 border-t border-white/[0.08]">
              <span className="font-mono text-xs text-zinc-500 uppercase tracking-wider">
                Verified Google Review
              </span>
              <GoogleLogo />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default TestimonialSection;
