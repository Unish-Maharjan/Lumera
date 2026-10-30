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
  | "#d7b875";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-primary-foreground hover:opacity-90 active:scale-[0.98] shadow-sm",
  secondary:
    "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border active:scale-[0.98]",
  outline:
    "bg-transparent text-foreground border border-border hover:bg-secondary hover:text-foreground active:scale-[0.98]",
  accent:
    "bg-accent text-accent-foreground hover:opacity-95 active:scale-[0.98] shadow-sm",
  ghost:
    "bg-transparent text-foreground hover:bg-secondary/70 hover:text-foreground active:scale-[0.98]",
  gold:
    "bg-[#d7b875] text-[#050505] hover:bg-[#c9a75f] active:scale-[0.98] shadow-sm font-semibold",
  champagne:
    "bg-[#d7b875] text-[#050505] hover:bg-[#c9a75f] active:scale-[0.98] shadow-sm font-semibold",
  "champagne-gold":
    "bg-[#d7b875] text-[#050505] hover:bg-[#c9a75f] active:scale-[0.98] shadow-sm font-semibold",
  "gold-gradient":
    "bg-gradient-to-r from-[#d7b875] via-[#edd8a6] to-[#c49f52] text-[#050505] shadow-lg shadow-[#d7b875]/25 border border-[#edd8a6]/40 font-semibold",
  "gradient-gold":
    "bg-gradient-to-r from-[#d7b875] via-[#edd8a6] to-[#c49f52] text-[#050505] shadow-lg shadow-[#d7b875]/25 border border-[#edd8a6]/40 font-semibold",
  "#d7b875":
    "bg-[#d7b875] text-[#050505] hover:bg-[#c9a75f] active:scale-[0.98] shadow-sm font-semibold",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-9 px-3.5 text-xs gap-1.5 rounded-lg",
  md: "h-11 px-5 text-sm gap-2 rounded-xl",
  lg: "h-12 px-6 text-base gap-2.5 rounded-xl",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled = false,
      className = "",
      type = "button",
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-150 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 cursor-pointer";

    const variantClass = variantStyles[variant] ?? variantStyles.primary;
    const sizeClass = sizeStyles[size] ?? sizeStyles.md;

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        aria-busy={isLoading}
        className={`${baseStyles} ${variantClass} ${sizeClass} ${className}`.trim()}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin -ml-0.5 h-4 w-4 text-current"
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
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;

