"use client";

import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  createContext,
  useContext,
} from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";

interface Star {
  x: number;
  y: number;
  radius: number;
  baseAlpha: number;
  alpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
  isBlue: boolean;
}

interface LedPixel {
  x: number;
  y: number;
  dist: number;
  angle: number;
  delay: number;
  state: number;
  size: number;
}

interface Particle {
  angle: number;
  radius: number;
  speed: number;
  radialSpeed: number;
  size: number;
  alpha: number;
  hueShift: number;
}

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
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number | null>(null);
  const masterTlRef = useRef<gsap.core.Timeline | null>(null);

  // Animation drivers
  const animState = useRef({
    starsAlpha: 0,
    wormholeGrowth: 0,
    wormholeIntensity: 0,
    ledGridAlpha: 0,
    pixelPowerProgress: 0,
    portalExpansion: 0,
    flashAlpha: 0,
    overlayAlpha: 1,
  });

  // Finish preloader and clean up
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
    }, 100);
  }, []);

  // Main start sequence function with snappy, cinematic ~1.5s total duration
  const startSequence = useCallback(
    (destinationUrl?: string) => {
      setIsMounted(true);
      setIsActive(true);

      // Lock document scroll
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";

      // Reset animation state variables
      animState.current = {
        starsAlpha: 0,
        wormholeGrowth: 0,
        wormholeIntensity: 0,
        ledGridAlpha: 0,
        pixelPowerProgress: 0,
        portalExpansion: 0,
        flashAlpha: 0,
        overlayAlpha: 1,
      };

      if (containerRef.current) {
        containerRef.current.style.opacity = "1";
      }

      // Check prefers-reduced-motion
      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReducedMotion) {
        if (destinationUrl) {
          router.push(destinationUrl);
        }
        const tl = gsap.timeline({ onComplete: finishPreloader });
        tl.to(containerRef.current, { opacity: 0, duration: 0.25, delay: 0.1 });
        return;
      }

      // Kill previous timeline if any
      if (masterTlRef.current) {
        masterTlRef.current.kill();
      }

      const state = animState.current;
      const tl = gsap.timeline({
        onComplete: finishPreloader,
      });
      masterTlRef.current = tl;

      // Phase 1: The Void (0.0s -> 0.35s)
      tl.to(state, {
        starsAlpha: 1,
        duration: 0.35,
        ease: "power2.out",
      });

      // Phase 2: Wormhole Formation (0.2s -> 0.85s)
      tl.to(
        state,
        {
          wormholeGrowth: 1,
          wormholeIntensity: 1,
          duration: 0.65,
          ease: "power3.out",
        },
        0.2
      );

      // Phase 3: LED Pixel Matrix Activation (0.5s -> 1.05s)
      tl.to(
        state,
        {
          ledGridAlpha: 1,
          pixelPowerProgress: 1,
          duration: 0.55,
          ease: "power2.inOut",
        },
        0.5
      );

      // Trigger route navigation in background right before portal burst
      tl.call(
        () => {
          if (destinationUrl) {
            router.push(destinationUrl);
          }
        },
        undefined,
        0.9
      );

      // Phase 4: Hyper-Drive Portal Expansion & Reveal (1.0s -> 1.55s)
      tl.to(
        state,
        {
          portalExpansion: 1,
          flashAlpha: 0.9,
          duration: 0.45,
          ease: "power3.in",
        },
        1.0
      );

      tl.to(
        state,
        {
          flashAlpha: 0,
          overlayAlpha: 0,
          duration: 0.4,
          ease: "power2.out",
        },
        1.15
      );
    },
    [finishPreloader, router]
  );

  // Trigger preloader on demand (e.g. Nav "About Us" button)
  const triggerPreloader = useCallback(
    (destinationUrl?: string) => {
      startSequence(destinationUrl);
    },
    [startSequence]
  );

  // Initial mount check
  useEffect(() => {
    const isShown = (() => {
      try {
        return sessionStorage.getItem("lumera_intro_shown") === "true";
      } catch {
        return false;
      }
    })();

    if (isShown) {
      setTimeout(() => {
        setIsActive(false);
        setIsMounted(false);
      }, 0);
      return;
    }

    // Play on first session visit
    const timer = setTimeout(() => {
      startSequence();
    }, 0);
    return () => clearTimeout(timer);
  }, [startSequence]);

  // Main Canvas Rendering Engine
  useEffect(() => {
    if (!isMounted || !isActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    // Initialize Starfield
    const STAR_COUNT = 90;
    const stars: Star[] = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 0.9 + 0.35,
      baseAlpha: Math.random() * 0.6 + 0.25,
      alpha: 0,
      twinkleSpeed: Math.random() * 0.05 + 0.02,
      twinklePhase: Math.random() * Math.PI * 2,
      isBlue: Math.random() > 0.8,
    }));

    // Initialize Concentric LED Matrix Grid
    const pixels: LedPixel[] = [];
    const pixelSize = 3;
    const pixelPitch = 14;
    const centerX = width / 2;
    const centerY = height / 2;
    const minRadius = Math.min(width, height) * 0.16;
    const maxRadius = Math.min(width, height) * 0.44;

    for (let x = centerX - maxRadius; x <= centerX + maxRadius; x += pixelPitch) {
      for (let y = centerY - maxRadius; y <= centerY + maxRadius; y += pixelPitch) {
        const dx = x - centerX;
        const dy = y - centerY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist >= minRadius && dist <= maxRadius) {
          const angle = Math.atan2(dy, dx);
          const normalizedDist = (dist - minRadius) / (maxRadius - minRadius);
          const normalizedAngle = (angle + Math.PI) / (Math.PI * 2);
          const delay = normalizedDist * 0.7 + normalizedAngle * 0.3;

          pixels.push({
            x,
            y,
            dist,
            angle,
            delay: Math.max(0, Math.min(1, delay)),
            state: 0,
            size: pixelSize,
          });
        }
      }
    }

    // Initialize Accretion Particles
    const PARTICLE_COUNT = 36;
    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () => {
      const radius = Math.random() * (maxRadius - minRadius) + minRadius;
      return {
        angle: Math.random() * Math.PI * 2,
        radius,
        speed: (Math.random() * 0.025 + 0.015) * (Math.random() > 0.5 ? 1 : -1),
        radialSpeed: Math.random() * 1.2 + 0.6,
        size: Math.random() * 1.5 + 0.8,
        alpha: Math.random() * 0.5 + 0.3,
        hueShift: Math.random() > 0.7 ? 1 : 0,
      };
    });

    let time = 0;
    const state = animState.current;

    const render = () => {
      time += 0.02;

      const currentW = width;
      const currentH = height;
      const cx = currentW / 2;
      const cy = currentH / 2;

      // Base Deep Space Background (#03040A)
      ctx.fillStyle = "#03040A";
      ctx.fillRect(0, 0, currentW, currentH);

      // --- Draw Starfield ---
      if (state.starsAlpha > 0.01) {
        for (let i = 0; i < stars.length; i++) {
          const s = stars[i];
          s.twinklePhase += s.twinkleSpeed;
          const twinkle = Math.sin(s.twinklePhase) * 0.35 + 0.65;
          const alpha = s.baseAlpha * twinkle * state.starsAlpha * (1 - state.portalExpansion);

          if (alpha > 0.02) {
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
            ctx.fillStyle = s.isBlue
              ? `rgba(57, 139, 255, ${alpha.toFixed(3)})`
              : `rgba(247, 247, 245, ${alpha.toFixed(3)})`;
            ctx.fill();
          }
        }
      }

      // --- Draw Wormhole & Portal Geometry ---
      const growth = state.wormholeGrowth;
      const intensity = state.wormholeIntensity;
      const expansion = state.portalExpansion;

      if (growth > 0.01) {
        const baseRadius = Math.min(currentW, currentH) * 0.18 * growth;
        const currentRadius = baseRadius + expansion * Math.max(currentW, currentH) * 2.2;

        ctx.save();
        ctx.translate(cx, cy);

        // 1. Deep Celestial Outer Bloom (#080F20 & #398BFF)
        const outerGlowRadius = currentRadius * 2.8;
        const outerGrad = ctx.createRadialGradient(
          0,
          0,
          currentRadius * 0.2,
          0,
          0,
          outerGlowRadius
        );
        const glowOpacity = Math.max(0, 0.45 * intensity * (1 - expansion * 0.7));
        outerGrad.addColorStop(0, `rgba(57, 139, 255, ${glowOpacity})`);
        outerGrad.addColorStop(0.35, `rgba(118, 88, 201, ${glowOpacity * 0.4})`);
        outerGrad.addColorStop(0.65, `rgba(8, 15, 32, ${glowOpacity * 0.2})`);
        outerGrad.addColorStop(1, "rgba(3, 4, 10, 0)");

        ctx.fillStyle = outerGrad;
        ctx.beginPath();
        ctx.arc(0, 0, outerGlowRadius, 0, Math.PI * 2);
        ctx.fill();

        // 2. Concentric Gravitational Rings with Perspective Depth
        const RING_COUNT = 6;
        for (let r = 1; r <= RING_COUNT; r++) {
          const ringRatio = r / RING_COUNT;
          const pulse = Math.sin(time * 3 - r * 0.6) * 0.06 + 1;
          const ringRad = currentRadius * ringRatio * pulse;
          const ringAlpha =
            (1 - ringRatio * 0.7) *
            intensity *
            0.65 *
            (1 - expansion * 0.85);

          if (ringRad > 1 && ringAlpha > 0.01) {
            ctx.beginPath();
            ctx.arc(0, 0, ringRad, 0, Math.PI * 2);
            ctx.strokeStyle =
              r % 2 === 0
                ? `rgba(57, 139, 255, ${ringAlpha.toFixed(3)})`
                : `rgba(247, 247, 245, ${(ringAlpha * 0.7).toFixed(3)})`;
            ctx.lineWidth = r === RING_COUNT ? 2 : 1;
            ctx.stroke();
          }
        }

        // 3. Accretion Inward Spiraling Particles
        if (expansion < 0.9) {
          for (let p = 0; p < particles.length; p++) {
            const pt = particles[p];
            pt.angle += pt.speed;
            pt.radius -= pt.radialSpeed;
            if (pt.radius < currentRadius * 0.45) {
              pt.radius = currentRadius * 1.5;
            }

            const px = Math.cos(pt.angle) * pt.radius;
            const py = Math.sin(pt.angle) * pt.radius;
            const ptAlpha = pt.alpha * intensity * (1 - expansion);

            ctx.beginPath();
            ctx.arc(px, py, pt.size, 0, Math.PI * 2);
            ctx.fillStyle =
              pt.hueShift === 0
                ? `rgba(57, 139, 255, ${ptAlpha.toFixed(3)})`
                : `rgba(247, 247, 245, ${ptAlpha.toFixed(3)})`;
            ctx.fill();
          }
        }

        // 4. Central Gravitational Event Horizon (The Void Core)
        const coreRad = currentRadius * 0.48;
        const coreGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, coreRad);
        coreGrad.addColorStop(0, "#010206");
        coreGrad.addColorStop(0.75, "#03040A");
        coreGrad.addColorStop(1, "rgba(57, 139, 255, 0.4)");

        ctx.beginPath();
        ctx.arc(0, 0, coreRad, 0, Math.PI * 2);
        ctx.fillStyle = coreGrad;
        ctx.fill();

        ctx.restore();
      }

      // --- Draw Architectural LED Matrix Grid ---
      const gridAlpha = state.ledGridAlpha;
      const powerProgress = state.pixelPowerProgress;

      if (gridAlpha > 0.01 && state.portalExpansion < 0.85) {
        for (let i = 0; i < pixels.length; i++) {
          const px = pixels[i];
          let pAlpha = 0;
          let isHot = false;

          if (powerProgress >= px.delay) {
            const timeSinceTrigger = (powerProgress - px.delay) / (1 - px.delay + 0.001);
            if (timeSinceTrigger < 0.25) {
              pAlpha = 0.95;
              isHot = true;
            } else {
              pAlpha = 0.55 + Math.sin(time * 4 + px.angle * 2) * 0.15;
            }
          } else {
            pAlpha = 0.12;
          }

          pAlpha *= gridAlpha * (1 - state.portalExpansion);

          if (pAlpha > 0.02) {
            ctx.fillStyle = isHot
              ? `rgba(247, 247, 245, ${pAlpha.toFixed(3)})`
              : `rgba(57, 139, 255, ${pAlpha.toFixed(3)})`;
            ctx.fillRect(
              px.x - px.size / 2,
              px.y - px.size / 2,
              px.size,
              px.size
            );
          }
        }
      }

      // --- Phase 4: High-Energy Portal Expansion Flash ---
      if (state.flashAlpha > 0.01) {
        ctx.fillStyle = `rgba(57, 139, 255, ${(state.flashAlpha * 0.75).toFixed(3)})`;
        ctx.fillRect(0, 0, currentW, currentH);

        ctx.fillStyle = `rgba(247, 247, 245, ${(state.flashAlpha * 0.35).toFixed(3)})`;
        ctx.fillRect(0, 0, currentW, currentH);
      }

      // Sync master overlay opacity
      if (containerRef.current) {
        containerRef.current.style.opacity = `${state.overlayAlpha}`;
      }

      if (state.overlayAlpha > 0.005) {
        animFrameRef.current = requestAnimationFrame(render);
      }
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
      if (masterTlRef.current) {
        masterTlRef.current.kill();
      }
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [isMounted, isActive]);

  return (
    <PreloaderContext.Provider value={{ triggerPreloader, isActive }}>
      {isMounted && isActive && (
        <aside
          ref={containerRef}
          aria-label="Loading Lumera Ventures"
          aria-live="polite"
          className="fixed inset-0 z-[99999] w-screen h-screen overflow-hidden select-none pointer-events-auto bg-[#03040A] transition-opacity duration-200"
        >
          {/* High-Performance Canvas for Stars, Wormhole & LED Matrix */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full block"
          />
        </aside>
      )}

      {children && (
        <div
          className={`w-full flex-1 flex flex-col ${
            isActive ? "pointer-events-none select-none" : "pointer-events-auto select-auto"
          }`}
          aria-hidden={isActive}
        >
          {children}
        </div>
      )}
    </PreloaderContext.Provider>
  );
}

export default Preloader;
