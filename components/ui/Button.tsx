import { forwardRef, type ButtonHTMLAttributes } from "react";
import { Loader2 } from "lucide-react";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "accent"
  | "ghost"
  | "gold"
  | "champagne"
  | "champagne-gold"
  | "gold-gradient"
  | "gradient-gold"
  | "#d7b875"
  | "white";
export type ButtonSize = "sm" | "md" | "lg";
export type ButtonRounded = "none" | "sm" | "md" | "lg" | "xl" | "full";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  rounded?: ButtonRounded;
  isLoading?: boolean;
}

/**
 * base      – resting colours
 * fill      – colour of the liquid that rises on hover
 * hoverText – colour of the label that rolls in on hover
 */
type Style = { base: string; fill: string; hoverText: string };

const obsidian: Style = {
  base: "bg-[#050505] text-[#F7F7F5] border-[#F7F7F5]",
  fill: "bg-[#F7F7F5]",
  hoverText: "text-[#050505]",
};

const variantStyles: Record<ButtonVariant, Style> = {
  primary: obsidian,
  accent: obsidian,
  gold: obsidian,
  champagne: obsidian,
  "champagne-gold": obsidian,
  "gold-gradient": obsidian,
  "gradient-gold": obsidian,
  "#d7b875": obsidian,
  secondary: {
    base: "bg-[#15171B] text-[#F7F7F5] border-white/20",
    fill: "bg-[#F7F7F5]",
    hoverText: "text-[#050505]",
  },
  outline: {
    base: "bg-transparent text-[#F7F7F5] border-[#F7F7F5]",
    fill: "bg-[#F7F7F5]",
    hoverText: "text-[#050505]",
  },
  ghost: {
    base: "bg-transparent text-white/80 border-transparent",
    fill: "bg-white/10",
    hoverText: "text-white",
  },
  white: {
    base: "bg-white text-black border-white",
    fill: "bg-[#050505]",
    hoverText: "text-white",
  },
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-9 px-5 sm:px-6 text-[11px] sm:text-xs tracking-[0.2em]",
  md: "h-11 px-7 sm:px-8 text-xs sm:text-[13px] tracking-[0.2em]",
  lg: "h-12 sm:h-13 px-9 sm:px-11 text-xs sm:text-sm tracking-[0.22em]",
};

const roundedStyles: Record<ButtonRounded, string> = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  full: "rounded-full",
};

const ease = "duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none";

// Each label copy sits in the same grid cell so the button keeps its size.
const cell = `col-start-1 row-start-1 flex items-center justify-center [gap:inherit] transition-transform ${ease}`;

/**
 * Hover animation: a curved "liquid" fill rises from the bottom while the label
 * rolls up and a second copy (in the hover colour) rolls in from below.
 * Also plays on keyboard focus.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      rounded = "full",
      isLoading = false,
      disabled = false,
      className = "",
      type = "button",
      ...props
    },
    ref
  ) => {
    const { base, fill, hoverText } = variantStyles[variant] ?? obsidian;

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        aria-busy={isLoading}
        className={[
          "group/btn relative inline-flex cursor-pointer select-none items-center justify-center gap-2 overflow-hidden border",
          "font-mono font-medium uppercase transition-transform duration-200 active:scale-[0.98]",
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black",
          "disabled:pointer-events-none disabled:opacity-50",
          base,
          sizeStyles[size] ?? sizeStyles.md,
          roundedStyles[rounded] ?? roundedStyles.full,
          className,
        ].join(" ")}
        {...props}
      >
        {/* Rising liquid fill (an oversized ellipse gives the curved edge) */}
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute left-[-20%] top-0 w-[140%] h-[250%] rounded-[50%] translate-y-[40%] transition-transform ${ease} group-hover/btn:translate-y-[-30%] group-focus-visible/btn:translate-y-[-30%] ${fill}`}
        />

        {isLoading && <Loader2 className="relative h-4 w-4 shrink-0 animate-spin" aria-hidden="true" />}

        {/* Rolling label */}
        <span className="relative grid overflow-hidden [gap:inherit]">
          <span className={`${cell} group-hover/btn:-translate-y-full group-focus-visible/btn:-translate-y-full`}>
            {children}
          </span>
          <span
            aria-hidden="true"
            className={`${cell} translate-y-full ${hoverText} group-hover/btn:translate-y-0 group-focus-visible/btn:translate-y-0`}
          >
            {children}
          </span>
        </span>
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;