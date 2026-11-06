import React, { forwardRef } from "react";

export type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" | "div" | "p";
export type HeadingSize = "display" | "2xl" | "xl" | "lg" | "md" | "sm" | "xs";
export type HeadingAlign = "left" | "center" | "right";
export type HeadingVariant = "white" | "dark" | "gold" | "muted";

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /** HTML element to render */
  as?: HeadingTag;
  /** Responsive typographic scale preset */
  size?: HeadingSize;
  /** Text alignment across container */
  align?: HeadingAlign;
  /** Primary text color variant */
  variant?: HeadingVariant;
  /** Optional architectural eyebrow pill badge rendered above heading */
  eyebrow?: React.ReactNode;
  /** Optional subtitle or descriptive paragraph rendered beneath heading */
  description?: React.ReactNode;
  /** Optional gold accent text appended to children */
  accent?: string;
  /** Custom wrapper className when eyebrow or description is present */
  containerClassName?: string;
  /** Custom eyebrow badge className */
  eyebrowClassName?: string;
  /** Custom description paragraph className */
  descriptionClassName?: string;
}

const sizeStyles: Record<HeadingSize, string> = {
  // Monumental Hero / Stage headline
  display:
    "text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold uppercase leading-[0.92] tracking-tight font-heading",
  // Primary Page / Hero H1
  "2xl":
    "text-4xl sm:text-6xl md:text-7xl font-bold uppercase leading-none sm:leading-[0.95] tracking-tight font-heading",
  // Flagship Section H2
  xl:
    "text-3xl sm:text-5xl md:text-6xl font-bold uppercase leading-[1.05] tracking-tight font-heading",
  // Standard Architectural Section H2
  lg:
    "text-2xl sm:text-4xl md:text-5xl font-bold uppercase leading-[1.08] tracking-tight font-heading",
  // Module / Subsection / Feature H3
  md:
    "text-xl sm:text-2xl lg:text-3xl font-bold uppercase leading-tight tracking-tight font-heading",
  // Card / Bento Component H4
  sm:
    "text-lg sm:text-xl font-bold uppercase leading-snug tracking-tight font-heading",
  // Micro Label / Eyebrow title H5
  xs:
    "text-base sm:text-lg font-bold uppercase leading-snug font-heading",
};

const variantStyles: Record<HeadingVariant, string> = {
  white: "text-white",
  dark: "text-zinc-950",
  gold: "text-[#D7B875]",
  muted: "text-zinc-400",
};

const alignStyles: Record<HeadingAlign, { text: string; container: string; desc: string }> = {
  left: {
    text: "text-left",
    container: "items-start text-left",
    desc: "max-w-2xl mr-auto",
  },
  center: {
    text: "text-center",
    container: "items-center text-center mx-auto",
    desc: "max-w-2xl mx-auto",
  },
  right: {
    text: "text-right",
    container: "items-end text-right ml-auto",
    desc: "max-w-2xl ml-auto",
  },
};

/**
 * Reusable Gold Accent span component: <Heading.Accent>Text</Heading.Accent>
 */
export function HeadingAccent({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <span className={`text-[#D7B875] font-semibold ${className}`}>{children}</span>;
}

/**
 * Reusable Architectural Eyebrow Badge component
 */
export function HeadingBadge({
  children,
  variant = "white",
  className = "",
}: {
  children: React.ReactNode;
  variant?: HeadingVariant;
  className?: string;
}) {
  const isDarkTheme = variant !== "dark";

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4 select-none ${
        isDarkTheme
          ? "bg-white/5 border border-white/10"
          : "bg-black/5 border border-black/10"
      } ${className}`.trim()}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-[#D7B875] animate-pulse shrink-0" />
      <span
        className={`text-xs font-semibold uppercase tracking-widest ${
          isDarkTheme ? "text-[#D7B875]" : "text-zinc-800"
        }`}
      >
        {children}
      </span>
    </div>
  );
}

export interface HeadingComponent
  extends React.ForwardRefExoticComponent<
    HeadingProps & React.RefAttributes<HTMLHeadingElement>
  > {
  Accent: typeof HeadingAccent;
  Badge: typeof HeadingBadge;
}

const HeadingBase = forwardRef<HTMLHeadingElement, HeadingProps>(
  (
    {
      as: Component = "h2",
      size = "lg",
      align = "left",
      variant = "white",
      eyebrow,
      description,
      accent,
      className = "",
      containerClassName = "",
      eyebrowClassName = "",
      descriptionClassName = "",
      children,
      ...props
    },
    ref
  ) => {
    const headingClasses = `
      ${sizeStyles[size]}
      ${variantStyles[variant]}
      ${alignStyles[align].text}
      ${className}
    `
      .replace(/\s+/g, " ")
      .trim();

    const headingElement = (
      <Component ref={ref} className={headingClasses} {...props}>
        {children}
        {accent && (
          <>
            {" "}
            <HeadingAccent>{accent}</HeadingAccent>
          </>
        )}
      </Component>
    );

    // If neither eyebrow nor description is provided, return plain heading element
    if (!eyebrow && !description) {
      return headingElement;
    }

    // Wrap in architectural layout container with eyebrow badge and descriptive paragraph
    return (
      <div
        className={`flex flex-col ${alignStyles[align].container} ${containerClassName}`.trim()}
      >
        {eyebrow && (
          <HeadingBadge variant={variant} className={eyebrowClassName}>
            {eyebrow}
          </HeadingBadge>
        )}

        {headingElement}

        {description && (
          <p
            className={`mt-4 font-sans text-sm sm:text-base md:text-lg leading-relaxed ${
              variant === "dark" ? "text-zinc-600" : "text-zinc-400"
            } ${alignStyles[align].desc} ${descriptionClassName}`.trim()}
          >
            {description}
          </p>
        )}
      </div>
    );
  }
);

HeadingBase.displayName = "Heading";

// Attach helper components as static properties for convenient dot-notation
export const Heading: HeadingComponent = Object.assign(HeadingBase, {
  Accent: HeadingAccent,
  Badge: HeadingBadge,
});

export default Heading;

