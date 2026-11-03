import React, { forwardRef } from "react";

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

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  rounded?: ButtonRounded;
  isLoading?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  // Architectural Dark Obsidian Rectangle as Normal (Inverts to Bone White on Hover)
  primary:
    "bg-[#050505] text-[#F7F7F5] border border-[#F7F7F5] hover:bg-[#F7F7F5] hover:text-[#050505] hover:border-[#F7F7F5] active:scale-[0.99]",
  gold:
    "bg-[#050505] text-[#F7F7F5] border border-[#F7F7F5] hover:bg-[#F7F7F5] hover:text-[#050505] hover:border-[#F7F7F5] active:scale-[0.99]",
  champagne:
    "bg-[#050505] text-[#F7F7F5] border border-[#F7F7F5] hover:bg-[#F7F7F5] hover:text-[#050505] hover:border-[#F7F7F5] active:scale-[0.99]",
  "champagne-gold":
    "bg-[#050505] text-[#F7F7F5] border border-[#F7F7F5] hover:bg-[#F7F7F5] hover:text-[#050505] hover:border-[#F7F7F5] active:scale-[0.99]",
  "gold-gradient":
    "bg-[#050505] text-[#F7F7F5] border border-[#F7F7F5] hover:bg-[#F7F7F5] hover:text-[#050505] hover:border-[#F7F7F5] active:scale-[0.99]",
  "gradient-gold":
    "bg-[#050505] text-[#F7F7F5] border border-[#F7F7F5] hover:bg-[#F7F7F5] hover:text-[#050505] hover:border-[#F7F7F5] active:scale-[0.99]",
  "#d7b875":
    "bg-[#050505] text-[#F7F7F5] border border-[#F7F7F5] hover:bg-[#F7F7F5] hover:text-[#050505] hover:border-[#F7F7F5] active:scale-[0.99]",
  accent:
    "bg-[#050505] text-[#F7F7F5] border border-[#F7F7F5] hover:bg-[#F7F7F5] hover:text-[#050505] hover:border-[#F7F7F5] active:scale-[0.99]",
  secondary:
    "bg-[#15171B] text-[#F7F7F5] border border-white/20 hover:bg-[#F7F7F5] hover:text-[#050505] hover:border-[#F7F7F5] active:scale-[0.99]",
  outline:
    "bg-[#050505] text-[#F7F7F5] border border-[#F7F7F5] hover:bg-[#F7F7F5] hover:text-[#050505] hover:border-[#F7F7F5] active:scale-[0.99]",
  ghost:
    "bg-transparent text-white/80 hover:text-white hover:bg-white/[0.08] active:scale-[0.99]",
  white:
    "bg-white text-black border border-white hover:bg-[#eaeae8] hover:border-[#eaeae8] hover:text-black active:scale-[0.99]",
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
    const baseStyles =
      "inline-flex items-center justify-center font-mono font-medium uppercase transition-colors duration-200 ease-out select-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:pointer-events-none disabled:opacity-50 cursor-pointer";

    const variantClass = variantStyles[variant] ?? variantStyles.primary;
    const sizeClass = sizeStyles[size] ?? sizeStyles.md;
    const roundedClass = roundedStyles[rounded] ?? roundedStyles.full;

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        aria-busy={isLoading}
        className={`${baseStyles} ${variantClass} ${sizeClass} ${roundedClass} ${className}`.trim()}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin -ml-0.5 mr-2 h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        <span>{children}</span>
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
