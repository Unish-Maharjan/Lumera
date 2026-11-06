"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register GSAP plugins safely on client
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const TOTAL_FRAMES = 90;

export function ImageSequencing() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef<number>(1);

  // Helper to draw image fitted inside canvas (object-fit: contain) so entire frame fits screen
  function drawFit(
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    canvasWidth: number,
    canvasHeight: number
  ) {
    if (!img.complete || img.naturalWidth === 0) return;

    // Use Math.min so the image never overflows or gets cropped on any screen ratio
    const hRatio = canvasWidth / img.naturalWidth;
    const vRatio = canvasHeight / img.naturalHeight;
    const ratio = Math.min(hRatio, vRatio);

    const drawWidth = img.naturalWidth * ratio;
    const drawHeight = img.naturalHeight * ratio;
    const centerShiftX = (canvasWidth - drawWidth) / 2;
    const centerShiftY = (canvasHeight - drawHeight) / 2;

    // Clear and fill canvas with pure black background matching the frames (#000000)
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    ctx.drawImage(
      img,
      0,
      0,
      img.naturalWidth,
      img.naturalHeight,
      centerShiftX,
      centerShiftY,
      drawWidth,
      drawHeight
    );
  }

  // Preload frames progressively
  useEffect(() => {
    let isCancelled = false;
    const images: HTMLImageElement[] = [];

    // Preload frame 1 first for immediate display
    const firstImg = new Image();
    firstImg.src = "/frames/1.jpg";
    firstImg.onload = () => {
      if (isCancelled) return;
      images[0] = firstImg;

      // Draw initial frame fitted to screen
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          drawFit(ctx, firstImg, canvas.width, canvas.height);
        }
      }
    };

    // Preload remaining frames
    for (let i = 2; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = `/frames/${i}.jpg`;
      img.onload = () => {
        if (isCancelled) return;
        images[i - 1] = img;
      };
      images[i - 1] = img;
    }

    imagesRef.current = images;

    return () => {
      isCancelled = true;
    };
  }, []);

  // Handle Canvas Resize with HiDPI support and maintain contain fitting
  useEffect(() => {
    function handleResize() {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        // Redraw active frame fitted to new canvas dimensions
        const activeImg =
          imagesRef.current[currentFrameRef.current - 1] || imagesRef.current[0];
        if (activeImg && activeImg.complete) {
          drawFit(ctx, activeImg, canvas.width, canvas.height);
        }
      }
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // GSAP ScrollTrigger Sequence Animation
  useGSAP(
    () => {
      const container = containerRef.current;
      const canvas = canvasRef.current;
      if (!container || !canvas) return;

      const frameProxy = { frame: 1 };

      const render = () => {
        const frameIndex = Math.min(
          TOTAL_FRAMES,
          Math.max(1, Math.round(frameProxy.frame))
        );
        currentFrameRef.current = frameIndex;
        const img = imagesRef.current[frameIndex - 1];
        const ctx = canvas.getContext("2d");
        if (ctx && img && img.complete) {
          drawFit(ctx, img, canvas.width, canvas.height);
        }
      };

      // Main Timeline pinned for continuous smooth scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=2200",
          pin: true,
          scrub: 0.6,
          onUpdate: render,
        },
      });

      // Frame scrubbing animation
      tl.to(
        frameProxy,
        {
          frame: TOTAL_FRAMES,
          ease: "none",
          duration: 3,
        },
        0
      );
    },
    { scope: containerRef, dependencies: [] }
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen bg-black overflow-hidden select-none flex items-center justify-center"
    >
      {/* Background Interactive Canvas matching pure black frame background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block pointer-events-none bg-black"
      />

      {/* Bottom Soft Vignette for Seamless Section Blending */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black via-black/50 to-transparent z-10"
        aria-hidden="true"
      />
    </section>
  );
}

export default ImageSequencing;
