"use client";

import type { ThemeConfig } from "@/types/presentation";

/**
 * Converts a ThemeConfig to CSS custom properties for slide theming.
 * Apply these to a slide container so all child components inherit the theme.
 */
export function getThemeCSSVars(theme: ThemeConfig): React.CSSProperties {
  return {
    "--slide-primary": theme.primaryColor,
    "--slide-secondary": theme.secondaryColor,
    "--slide-bg": theme.backgroundColor,
    "--slide-text": theme.textColor,
    "--slide-accent": theme.accentColor,
    "--slide-surface": theme.surfaceColor ?? theme.backgroundColor,
    "--slide-border": theme.borderColor ?? `${theme.textColor}20`,
    "--slide-code-bg": theme.codeBackground ?? "#1E1E2E",
    "--slide-callout-bg": theme.calloutBackground ?? `${theme.primaryColor}08`,
    "--slide-gradient-from": theme.gradientFrom ?? theme.primaryColor,
    "--slide-gradient-to": theme.gradientTo ?? theme.secondaryColor,
    "--slide-font": theme.fontFamily ?? "Inter, sans-serif",
    "--slide-heading-font":
      theme.headingFontFamily ?? theme.fontFamily ?? "Inter, sans-serif",
  } as React.CSSProperties;
}

/**
 * Wraps children in a themed container with CSS custom properties.
 */
export function ThemeProvider({
  theme,
  children,
  className,
  style,
}: {
  theme: ThemeConfig;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={className}
      style={{
        ...getThemeCSSVars(theme),
        backgroundColor: theme.backgroundColor,
        color: theme.textColor,
        fontFamily: theme.fontFamily ?? "Inter, sans-serif",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/**
 * Determines if a theme has a dark background (for contrast decisions).
 */
export function isDarkTheme(theme: ThemeConfig): boolean {
  const hex = theme.backgroundColor.replace("#", "");
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  // Relative luminance approximation
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance < 0.5;
}
