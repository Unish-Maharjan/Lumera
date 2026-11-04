import React from "react";
import Container from "@/components/ui/Container";

export interface SectionDividerProps {
  /**
   * If true, constrains the divider to the max container width (xl).
   * If false, stretches edge-to-edge full width.
   * @default true
   */
  contained?: boolean;
  /**
   * Whether to include the subtle champagne gold ambient glow in the center.
   * @default true
   */
  accent?: boolean;
  /**
   * Optional custom styling / margins.
   */
  className?: string;
}

/**
 * Architectural hairline section divider for Lumera.
 * Features a crisp 1px rule with a subtle warm champagne gold center glow,
 * reinforcing the brand's lighting and spatial precision.
 */
export function SectionDivider({
  contained = true,
  accent = true,
  className = "",
}: SectionDividerProps) {
  const line = (
    <div className="relative w-full flex items-center justify-center">
      {/* Base Architectural Hairline */}
      <div className="w-full h-px bg-white/10" />

      {/* Subtle Warm Accent Center Glow */}
      {accent && (
        <div
          className="absolute inset-x-1/4 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent pointer-events-none"
          aria-hidden="true"
        />
      )}
    </div>
  );

  return (
    <div
      role="separator"
      aria-orientation="horizontal"
      className={`w-full py-0 select-none overflow-hidden ${className}`}
    >
      {contained ? <Container size="xl">{line}</Container> : line}
    </div>
  );
}

export default SectionDivider;

