"use client";

import React, {
  useRef,
  useState,
  useCallback,
  createContext,
  useContext,
} from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface PreloaderContextType {
  triggerPreloader: (destinationUrl?: string) => void;
  isActive: boolean;
}

export const PreloaderContext = createContext<PreloaderContextType>({
  triggerPreloader: () => {},
  isActive: false,
});

export function usePreloader() {
  return useContext(PreloaderContext);
}

export function Preloader({ children }: { children?: React.ReactNode }) {
  const router = useRouter();

  const [isActive, setIsActive] = useState<boolean>(true);
  const [isMounted, setIsMounted] = useState<boolean>(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const masterTimeline = useRef<gsap.core.Timeline | null>(null);

  // Restore scroll and unmount preloader
  const finishPreloader = useCallback(() => {
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";

    try {
      sessionStorage.setItem("lumera_intro_shown", "true");
    } catch {
      // Ignore in restricted environments
    }

    setIsActive(false);
    setTimeout(() => {
      setIsMounted(false);
    }, 50);
  }, []);

  // Animate preloader: sweeps from bottom to top, displays logo, then exits upwards
  const runPreloaderTimeline = useCallback(
    (destinationUrl?: string) => {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";

      // Check accessibility preferences
      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReducedMotion) {
        if (destinationUrl) {
          router.push(destinationUrl);
        }
        finishPreloader();
        return;
      }

      if (masterTimeline.current) {
        masterTimeline.current.kill();
      }

      const tl = gsap.timeline({
        onComplete: finishPreloader,
      });
      masterTimeline.current = tl;

      // Initial state: container sits below viewport, logo invisible
      gsap.set(containerRef.current, { yPercent: 100 });
      gsap.set(logoRef.current, { opacity: 0, y: 35, scale: 0.94 });

      // 1. Preloader curtain sweeps UP from bottom to fill viewport
      tl.to(containerRef.current, {
        yPercent: 0,
        duration: 0.65,
        ease: "power4.out",
      });

      // 2. Logo emerges in the center with subtle scale and fade
      tl.to(
        logoRef.current,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.55,
          ease: "power3.out",
        },
        "-=0.35"
      );

      // 3. Navigate if destination requested
      if (destinationUrl) {
        tl.call(() => {
          router.push(destinationUrl);
        });
      }

      // 4. Elegant presence hold
      tl.to({}, { duration: 0.65 });

      // 5. Logo departs upwards
      tl.to(logoRef.current, {
        opacity: 0,
        y: -30,
        scale: 0.97,
        duration: 0.45,
        ease: "power3.in",
      });

      // 6. Preloader curtain exits upwards to reveal the destination
      tl.to(
        containerRef.current,
        {
          yPercent: -100,
          duration: 0.7,
          ease: "power4.inOut",
        },
        "-=0.3"
      );
    },
    [router, finishPreloader]
  );

  // Initial mount animation managed cleanly via useGSAP
  useGSAP(() => {
    runPreloaderTimeline();
  }, [runPreloaderTimeline]);

  // Programmatic preloader trigger for client routing
  const triggerPreloader = useCallback(
    (destinationUrl?: string) => {
      setIsMounted(true);
      setIsActive(true);
      requestAnimationFrame(() => {
        runPreloaderTimeline(destinationUrl);
      });
    },
    [runPreloaderTimeline]
  );

  return (
    <PreloaderContext.Provider value={{ triggerPreloader, isActive }}>
      {isMounted && (
        <aside
          ref={containerRef}
          aria-label="Loading Lumera Ventures"
          aria-live="polite"
          className="fixed inset-0 z-[99999] w-screen h-screen overflow-hidden select-none pointer-events-auto bg-black flex items-center justify-center will-change-transform"
        >
          {/* Subtle Ambient Golden Glow Behind Logo */}
          {/* <div
            className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(215,184,117,0.08)_0%,transparent_60%)] pointer-events-none"
            aria-hidden="true"
          /> */}

          {/* Centered Lumera Ventures Logo */}
          <div
            ref={logoRef}
            className="relative z-10 flex flex-col items-center justify-center p-6 will-change-transform"
          >
            <div className="relative w-64 sm:w-80 md:w-96 aspect-square flex items-center justify-center">
              <Image
                src="/logo/lumera-ventures-logo.png"
                alt="Lumera Ventures"
                fill
                priority
                className="object-contain"
              />
            </div>
          </div>
        </aside>
      )}

      {children}
    </PreloaderContext.Provider>
  );
}

export default Preloader;
