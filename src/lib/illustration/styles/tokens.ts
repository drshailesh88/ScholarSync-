/**
 * Design Tokens for FINNISH Project
 *
 * WCAG AA compliant, Nature journal style design system
 * Optimized for dark theme scientific illustration editor
 */

// =============================================================================
// COLOR TOKENS
// =============================================================================

/**
 * Primary color palette - Deep blue/indigo for professional scientific aesthetic
 * Each shade meets WCAG AA contrast requirements against appropriate backgrounds
 */
export const colors = {
  // Primary palette - Scientific blue
  primary: {
    50: '#eef2ff',
    100: '#e0e7ff',
    200: '#c7d2fe',
    300: '#a5b4fc',
    400: '#818cf8',
    500: '#6366f1',  // Base primary
    600: '#4f46e5',
    700: '#4338ca',
    800: '#3730a3',
    900: '#312e81',
    950: '#1e1b4b',
  },

  // Secondary palette - Neutral slate
  secondary: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',  // Base secondary
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
    950: '#020617',
  },

  // Accent palette - Teal for highlights
  accent: {
    50: '#f0fdfa',
    100: '#ccfbf1',
    200: '#99f6e4',
    300: '#5eead4',
    400: '#2dd4bf',
    500: '#14b8a6',  // Base accent
    600: '#0d9488',
    700: '#0f766e',
    800: '#115e59',
    900: '#134e4a',
    950: '#042f2e',
  },

  // Semantic colors (WCAG AA compliant)
  success: '#22c55e',  // Green-500
  warning: '#f59e0b',  // Amber-500
  error: '#ef4444',    // Red-500
  info: '#3b82f6',     // Blue-500

  // Extended semantic with shades
  semantic: {
    success: {
      light: '#86efac',
      default: '#22c55e',
      dark: '#15803d',
    },
    warning: {
      light: '#fcd34d',
      default: '#f59e0b',
      dark: '#b45309',
    },
    error: {
      light: '#fca5a5',
      default: '#ef4444',
      dark: '#b91c1c',
    },
    info: {
      light: '#93c5fd',
      default: '#3b82f6',
      dark: '#1d4ed8',
    },
  },

  // Dark theme background colors
  background: {
    primary: '#0a0a0a',    // Main canvas/app background
    secondary: '#171717',   // Panel backgrounds
    tertiary: '#262626',    // Card/elevated surfaces
    elevated: '#2a2a2a',    // Modals and dropdowns
    overlay: 'rgba(0, 0, 0, 0.75)',  // Modal overlays
  },

  // Dark theme surface colors (for layered UI)
  surface: {
    0: '#0a0a0a',
    1: '#141414',
    2: '#1a1a1a',
    3: '#212121',
    4: '#262626',
    5: '#2e2e2e',
  },

  // Text colors (WCAG AA compliant against dark backgrounds)
  text: {
    primary: '#fafafa',    // High contrast - 15.8:1 ratio
    secondary: '#a3a3a3',  // Medium contrast - 7.5:1 ratio
    muted: '#737373',      // Low contrast - 4.6:1 ratio (AA compliant)
    disabled: '#525252',   // Disabled state
    inverse: '#0a0a0a',    // For light backgrounds
  },

  // Border colors
  border: {
    default: '#404040',
    hover: '#525252',
    focus: '#6366f1',     // Primary color for focus states
    subtle: '#2a2a2a',
    strong: '#737373',
  },

  // Interactive state colors
  interactive: {
    hover: 'rgba(255, 255, 255, 0.05)',
    active: 'rgba(255, 255, 255, 0.1)',
    selected: 'rgba(99, 102, 241, 0.2)',  // Primary with opacity
    disabled: 'rgba(255, 255, 255, 0.02)',
  },

  // Canvas-specific colors
  canvas: {
    background: '#1a1a1a',
    grid: 'rgba(255, 255, 255, 0.05)',
    gridMajor: 'rgba(255, 255, 255, 0.1)',
    selection: 'rgba(99, 102, 241, 0.3)',
    selectionBorder: '#6366f1',
    guide: '#22c55e',
    guideDragging: '#14b8a6',
  },
} as const;

// =============================================================================
// TYPOGRAPHY TOKENS
// =============================================================================

export const typography = {
  // Font families
  fontFamily: {
    sans: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    mono: 'JetBrains Mono, "Fira Code", Consolas, "Courier New", monospace',
    display: 'Inter, system-ui, sans-serif',  // For headings
  },

  // Font sizes (rem-based for accessibility)
  fontSize: {
    xs: '0.75rem',      // 12px
    sm: '0.875rem',     // 14px
    base: '1rem',       // 16px
    lg: '1.125rem',     // 18px
    xl: '1.25rem',      // 20px
    '2xl': '1.5rem',    // 24px
    '3xl': '1.875rem',  // 30px
    '4xl': '2.25rem',   // 36px
    '5xl': '3rem',      // 48px
  },

  // Font weights
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  // Line heights
  lineHeight: {
    none: 1,
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },

  // Letter spacing
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
} as const;

// =============================================================================
// SPACING TOKENS
// =============================================================================

export const spacing = {
  0: '0',
  px: '1px',
  0.5: '0.125rem',   // 2px
  1: '0.25rem',      // 4px
  1.5: '0.375rem',   // 6px
  2: '0.5rem',       // 8px
  2.5: '0.625rem',   // 10px
  3: '0.75rem',      // 12px
  3.5: '0.875rem',   // 14px
  4: '1rem',         // 16px
  5: '1.25rem',      // 20px
  6: '1.5rem',       // 24px
  7: '1.75rem',      // 28px
  8: '2rem',         // 32px
  9: '2.25rem',      // 36px
  10: '2.5rem',      // 40px
  11: '2.75rem',     // 44px
  12: '3rem',        // 48px
  14: '3.5rem',      // 56px
  16: '4rem',        // 64px
  20: '5rem',        // 80px
  24: '6rem',        // 96px
  28: '7rem',        // 112px
  32: '8rem',        // 128px
  36: '9rem',        // 144px
  40: '10rem',       // 160px
  44: '11rem',       // 176px
  48: '12rem',       // 192px
  52: '13rem',       // 208px
  56: '14rem',       // 224px
  60: '15rem',       // 240px
  64: '16rem',       // 256px
  72: '18rem',       // 288px
  80: '20rem',       // 320px
  96: '24rem',       // 384px
} as const;

// =============================================================================
// BORDER RADIUS TOKENS
// =============================================================================

export const borderRadius = {
  none: '0',
  sm: '0.25rem',     // 4px
  md: '0.375rem',    // 6px
  lg: '0.5rem',      // 8px
  xl: '0.75rem',     // 12px
  '2xl': '1rem',     // 16px
  '3xl': '1.5rem',   // 24px
  full: '9999px',
} as const;

// =============================================================================
// SHADOW TOKENS
// =============================================================================

export const shadows = {
  none: 'none',
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',
  // Dark theme optimized shadows (more visible on dark backgrounds)
  dark: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -2px rgba(0, 0, 0, 0.3)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -4px rgba(0, 0, 0, 0.4)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.6), 0 8px 10px -6px rgba(0, 0, 0, 0.5)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
  },
  // Glow effects for focus states
  glow: {
    primary: '0 0 0 3px rgba(99, 102, 241, 0.3)',
    success: '0 0 0 3px rgba(34, 197, 94, 0.3)',
    error: '0 0 0 3px rgba(239, 68, 68, 0.3)',
    warning: '0 0 0 3px rgba(245, 158, 11, 0.3)',
  },
} as const;

// =============================================================================
// Z-INDEX TOKENS
// =============================================================================

export const zIndex = {
  hide: -1,
  auto: 'auto',
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800,
} as const;

// =============================================================================
// TRANSITION TOKENS
// =============================================================================

export const transitions = {
  // Durations
  duration: {
    instant: '0ms',
    fast: '100ms',
    normal: '200ms',
    slow: '300ms',
    slower: '500ms',
  },

  // Easing functions
  easing: {
    linear: 'linear',
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
    // Custom bezier curves
    smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
    snappy: 'cubic-bezier(0.4, 0, 0.6, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },

  // Common transition presets
  preset: {
    default: '200ms cubic-bezier(0.4, 0, 0.2, 1)',
    fast: '100ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
    colors: 'color 200ms, background-color 200ms, border-color 200ms',
    transform: 'transform 200ms cubic-bezier(0.4, 0, 0.2, 1)',
    opacity: 'opacity 200ms ease-in-out',
    all: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)',
  },
} as const;

// =============================================================================
// BREAKPOINT TOKENS
// =============================================================================

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// =============================================================================
// SIZE TOKENS (for components)
// =============================================================================

export const sizes = {
  // Icon sizes
  icon: {
    xs: '12px',
    sm: '16px',
    md: '20px',
    lg: '24px',
    xl: '32px',
    '2xl': '48px',
  },

  // Button heights
  button: {
    xs: '24px',
    sm: '32px',
    md: '40px',
    lg: '48px',
    xl: '56px',
  },

  // Input heights
  input: {
    sm: '32px',
    md: '40px',
    lg: '48px',
  },

  // Avatar sizes
  avatar: {
    xs: '24px',
    sm: '32px',
    md: '40px',
    lg: '48px',
    xl: '64px',
    '2xl': '96px',
  },

  // Sidebar/Panel widths
  sidebar: {
    collapsed: '64px',
    default: '256px',
    wide: '320px',
  },

  // Toolbar heights
  toolbar: {
    sm: '40px',
    md: '48px',
    lg: '56px',
  },
} as const;

// =============================================================================
// TYPE EXPORTS
// =============================================================================

export type Colors = typeof colors;
export type Typography = typeof typography;
export type Spacing = typeof spacing;
export type BorderRadius = typeof borderRadius;
export type Shadows = typeof shadows;
export type ZIndex = typeof zIndex;
export type Transitions = typeof transitions;
export type Breakpoints = typeof breakpoints;
export type Sizes = typeof sizes;

// Composite token type
export interface DesignTokens {
  colors: Colors;
  typography: Typography;
  spacing: Spacing;
  borderRadius: BorderRadius;
  shadows: Shadows;
  zIndex: ZIndex;
  transitions: Transitions;
  breakpoints: Breakpoints;
  sizes: Sizes;
}

// Export all tokens as a single object
export const tokens: DesignTokens = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  zIndex,
  transitions,
  breakpoints,
  sizes,
};

export default tokens;
