/**
 * LoadingSpinner Component
 * A reusable loading spinner with multiple sizes and optional label
 *
 * @module components/LoadingSpinner
 */

import React from 'react';

// ============================================================================
// Types
// ============================================================================

export type SpinnerSize = 'sm' | 'md' | 'lg' | 'xl';

export type SpinnerVariant = 'primary' | 'secondary' | 'white' | 'inherit';

export interface LoadingSpinnerProps {
  /** Size of the spinner */
  size?: SpinnerSize;
  /** Visual variant/color of the spinner */
  variant?: SpinnerVariant;
  /** Optional label to display below the spinner */
  label?: string;
  /** Whether to center the spinner in its container */
  centered?: boolean;
  /** Whether to render as a full-screen overlay */
  fullScreen?: boolean;
  /** Custom className for additional styling */
  className?: string;
  /** Accessible label for screen readers */
  ariaLabel?: string;
  /** Animation speed in milliseconds */
  speed?: number;
  /** Thickness of the spinner stroke */
  thickness?: number;
}

// ============================================================================
// Size Configuration
// ============================================================================

const SIZE_CONFIG: Record<SpinnerSize, { size: number; labelSize: string; gap: string }> = {
  sm: { size: 16, labelSize: '11px', gap: '6px' },
  md: { size: 24, labelSize: '13px', gap: '8px' },
  lg: { size: 40, labelSize: '14px', gap: '12px' },
  xl: { size: 64, labelSize: '16px', gap: '16px' },
};

const VARIANT_COLORS: Record<SpinnerVariant, string> = {
  primary: 'var(--accent-primary, #3b82f6)',
  secondary: 'var(--text-secondary, #6b7280)',
  white: '#ffffff',
  inherit: 'currentColor',
};

// ============================================================================
// Styles
// ============================================================================

const baseStyles = {
  container: {
    display: 'inline-flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centeredContainer: {
    width: '100%',
    height: '100%',
    minHeight: '120px',
  },
  fullScreenOverlay: {
    position: 'fixed' as const,
    inset: 0,
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(4px)',
    zIndex: 9999,
  },
  label: {
    color: 'var(--text-secondary, #6b7280)',
    fontWeight: 500,
    textAlign: 'center' as const,
  },
};

// ============================================================================
// Component
// ============================================================================

/**
 * LoadingSpinner - A customizable loading indicator component
 *
 * @example
 * // Basic usage
 * <LoadingSpinner />
 *
 * @example
 * // With label
 * <LoadingSpinner size="lg" label="Loading data..." />
 *
 * @example
 * // Full screen overlay
 * <LoadingSpinner fullScreen label="Please wait..." />
 *
 * @example
 * // Inherit parent color
 * <button>
 *   <LoadingSpinner size="sm" variant="inherit" />
 *   Loading...
 * </button>
 */
export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  variant = 'primary',
  label,
  centered = false,
  fullScreen = false,
  className,
  ariaLabel = 'Loading',
  speed = 750,
  thickness,
}) => {
  const config = SIZE_CONFIG[size];
  const color = VARIANT_COLORS[variant];

  // Calculate stroke width based on size or custom thickness
  const strokeWidth = thickness ?? Math.max(2, config.size / 10);

  // Generate unique ID for the gradient
  const gradientId = React.useId();

  // Container styles
  const containerStyle: React.CSSProperties = fullScreen
    ? baseStyles.fullScreenOverlay
    : {
        ...baseStyles.container,
        ...(centered ? baseStyles.centeredContainer : {}),
        gap: config.gap,
      };

  // Animation keyframes - injected via style tag
  const keyframes = `
    @keyframes finnish-spinner-rotate-${gradientId.replace(/:/g, '')} {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  `;

  const spinnerStyle: React.CSSProperties = {
    width: config.size,
    height: config.size,
    animation: `finnish-spinner-rotate-${gradientId.replace(/:/g, '')} ${speed}ms linear infinite`,
  };

  const labelStyle: React.CSSProperties = {
    ...baseStyles.label,
    fontSize: config.labelSize,
  };

  return (
    <>
      <style>{keyframes}</style>
      <div
        style={containerStyle}
        className={className}
        role="status"
        aria-label={ariaLabel}
        aria-busy="true"
      >
        <svg
          style={spinnerStyle}
          viewBox="0 0 50 50"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Background circle (track) */}
          <circle
            cx="25"
            cy="25"
            r="20"
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            opacity="0.2"
          />
          {/* Animated arc */}
          <circle
            cx="25"
            cy="25"
            r="20"
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray="80, 200"
            strokeDashoffset="0"
          />
        </svg>
        {label && <span style={labelStyle}>{label}</span>}
        {/* Screen reader only text */}
        <span
          style={{
            position: 'absolute',
            width: '1px',
            height: '1px',
            padding: 0,
            margin: '-1px',
            overflow: 'hidden',
            clip: 'rect(0, 0, 0, 0)',
            whiteSpace: 'nowrap',
            borderWidth: 0,
          }}
        >
          {ariaLabel}
        </span>
      </div>
    </>
  );
};

// ============================================================================
// Alternative Spinner Variants
// ============================================================================

/**
 * DotSpinner - Three bouncing dots loading indicator
 */
export const DotSpinner: React.FC<{
  size?: SpinnerSize;
  variant?: SpinnerVariant;
  label?: string;
  centered?: boolean;
}> = ({ size = 'md', variant = 'primary', label, centered = false }) => {
  const config = SIZE_CONFIG[size];
  const color = VARIANT_COLORS[variant];
  const dotSize = Math.max(4, config.size / 6);
  const gradientId = React.useId();

  const keyframes = `
    @keyframes finnish-dot-bounce-${gradientId.replace(/:/g, '')} {
      0%, 80%, 100% {
        transform: scale(0);
        opacity: 0.5;
      }
      40% {
        transform: scale(1);
        opacity: 1;
      }
    }
  `;

  const containerStyle: React.CSSProperties = {
    ...baseStyles.container,
    ...(centered ? baseStyles.centeredContainer : {}),
    gap: config.gap,
  };

  const dotsContainerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: dotSize * 0.75,
    height: config.size,
  };

  const dotStyle = (delay: number): React.CSSProperties => ({
    width: dotSize,
    height: dotSize,
    borderRadius: '50%',
    backgroundColor: color,
    animation: `finnish-dot-bounce-${gradientId.replace(/:/g, '')} 1.4s infinite ease-in-out both`,
    animationDelay: `${delay}s`,
  });

  return (
    <>
      <style>{keyframes}</style>
      <div style={containerStyle} role="status" aria-label="Loading">
        <div style={dotsContainerStyle}>
          <div style={dotStyle(-0.32)} />
          <div style={dotStyle(-0.16)} />
          <div style={dotStyle(0)} />
        </div>
        {label && (
          <span
            style={{
              ...baseStyles.label,
              fontSize: config.labelSize,
            }}
          >
            {label}
          </span>
        )}
      </div>
    </>
  );
};

/**
 * PulseSpinner - Pulsing circle loading indicator
 */
export const PulseSpinner: React.FC<{
  size?: SpinnerSize;
  variant?: SpinnerVariant;
  label?: string;
  centered?: boolean;
}> = ({ size = 'md', variant = 'primary', label, centered = false }) => {
  const config = SIZE_CONFIG[size];
  const color = VARIANT_COLORS[variant];
  const gradientId = React.useId();

  const keyframes = `
    @keyframes finnish-pulse-${gradientId.replace(/:/g, '')} {
      0% {
        transform: scale(0.8);
        opacity: 0.5;
      }
      50% {
        transform: scale(1);
        opacity: 1;
      }
      100% {
        transform: scale(0.8);
        opacity: 0.5;
      }
    }
  `;

  const containerStyle: React.CSSProperties = {
    ...baseStyles.container,
    ...(centered ? baseStyles.centeredContainer : {}),
    gap: config.gap,
  };

  const pulseStyle: React.CSSProperties = {
    width: config.size,
    height: config.size,
    borderRadius: '50%',
    backgroundColor: color,
    animation: `finnish-pulse-${gradientId.replace(/:/g, '')} 1.5s ease-in-out infinite`,
  };

  return (
    <>
      <style>{keyframes}</style>
      <div style={containerStyle} role="status" aria-label="Loading">
        <div style={pulseStyle} />
        {label && (
          <span
            style={{
              ...baseStyles.label,
              fontSize: config.labelSize,
            }}
          >
            {label}
          </span>
        )}
      </div>
    </>
  );
};

/**
 * BarSpinner - Horizontal progress bar loading indicator
 */
export const BarSpinner: React.FC<{
  size?: SpinnerSize;
  variant?: SpinnerVariant;
  label?: string;
}> = ({ size = 'md', variant = 'primary', label }) => {
  const config = SIZE_CONFIG[size];
  const color = VARIANT_COLORS[variant];
  const gradientId = React.useId();

  const barHeight = Math.max(2, config.size / 8);
  const barWidth = config.size * 3;

  const keyframes = `
    @keyframes finnish-bar-${gradientId.replace(/:/g, '')} {
      0% {
        left: -35%;
        right: 100%;
      }
      60% {
        left: 100%;
        right: -35%;
      }
      100% {
        left: 100%;
        right: -35%;
      }
    }
  `;

  const containerStyle: React.CSSProperties = {
    ...baseStyles.container,
    gap: config.gap,
  };

  const trackStyle: React.CSSProperties = {
    position: 'relative',
    width: barWidth,
    height: barHeight,
    backgroundColor: color,
    opacity: 0.2,
    borderRadius: barHeight / 2,
    overflow: 'hidden',
  };

  const barStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    bottom: 0,
    backgroundColor: color,
    borderRadius: barHeight / 2,
    animation: `finnish-bar-${gradientId.replace(/:/g, '')} 1.5s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite`,
  };

  return (
    <>
      <style>{keyframes}</style>
      <div style={containerStyle} role="status" aria-label="Loading">
        <div style={trackStyle}>
          <div style={barStyle} />
        </div>
        {label && (
          <span
            style={{
              ...baseStyles.label,
              fontSize: config.labelSize,
            }}
          >
            {label}
          </span>
        )}
      </div>
    </>
  );
};

// ============================================================================
// Skeleton Loading Components
// ============================================================================

/**
 * Skeleton - Placeholder loading state for content
 */
export const Skeleton: React.FC<{
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  className?: string;
}> = ({ width = '100%', height = 16, borderRadius = 4, className }) => {
  const gradientId = React.useId();

  const keyframes = `
    @keyframes finnish-skeleton-${gradientId.replace(/:/g, '')} {
      0% {
        background-position: -200px 0;
      }
      100% {
        background-position: calc(200px + 100%) 0;
      }
    }
  `;

  const style: React.CSSProperties = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
    borderRadius: typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius,
    backgroundColor: 'var(--bg-secondary, #e5e7eb)',
    backgroundImage:
      'linear-gradient(90deg, var(--bg-secondary, #e5e7eb) 0px, var(--bg-tertiary, #f3f4f6) 40px, var(--bg-secondary, #e5e7eb) 80px)',
    backgroundSize: '200px 100%',
    backgroundRepeat: 'no-repeat',
    animation: `finnish-skeleton-${gradientId.replace(/:/g, '')} 1.2s ease-in-out infinite`,
  };

  return (
    <>
      <style>{keyframes}</style>
      <div style={style} className={className} aria-hidden="true" />
    </>
  );
};

/**
 * SkeletonText - Multiple skeleton lines for text content
 */
export const SkeletonText: React.FC<{
  lines?: number;
  lastLineWidth?: string;
  spacing?: number;
}> = ({ lines = 3, lastLineWidth = '70%', spacing = 8 }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: spacing }}>
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          width={index === lines - 1 ? lastLineWidth : '100%'}
          height={14}
        />
      ))}
    </div>
  );
};

/**
 * SkeletonCircle - Circular skeleton for avatars
 */
export const SkeletonCircle: React.FC<{
  size?: number;
}> = ({ size = 40 }) => {
  return <Skeleton width={size} height={size} borderRadius="50%" />;
};

// ============================================================================
// Default Export
// ============================================================================

export default LoadingSpinner;
