import React, { forwardRef } from "react";

export type ContainerSize = "sm" | "md" | "lg" | "xl" | "full";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: "div" | "section" | "article" | "main" | "header" | "footer";
  size?: ContainerSize;
  gutter?: boolean;
}

const sizeStyles: Record<ContainerSize, string> = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-6xl",
  xl: "max-w-[1536px]",
  full: "max-w-full",
};

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  (
    {
      as: Component = "div",
      size = "xl",
      gutter = true,
      className = "",
      children,
      ...props
    },
    ref
  ) => {
    const sizeClass = sizeStyles[size] ?? sizeStyles.xl;
    // Matches the header's outer px-7 and inner px-10 so every section aligns perfectly with the logo
    const widthClass = "w-[calc(100%-3.5rem)] [[header]_&]:w-full";
    const gutterClass = gutter ? "px-6 sm:px-8 lg:px-10" : "";

    return (
      <Component
        ref={ref}
        className={`${widthClass} mx-auto ${sizeClass} ${gutterClass} ${className}`.trim()}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Container.displayName = "Container";

export default Container;
