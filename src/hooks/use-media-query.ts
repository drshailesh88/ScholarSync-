/**
 * useMediaQuery Hook
 *
 * A responsive hook for detecting viewport size and breakpoints.
 * Provides consistent breakpoint handling across the application.
 */

import { useState, useEffect } from "react";

export type Breakpoint = "mobile" | "tablet" | "desktop";

export interface ViewportInfo {
  width: number;
  height: number;
  breakpoint: Breakpoint;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  minTouchTarget: number;
}

const MOBILE_BREAKPOINT = 768;
const TABLET_BREAKPOINT = 1024;

/**
 * Get current viewport information
 */
function getViewportInfo(): ViewportInfo {
  if (typeof window === "undefined") {
    // Server-side default
    return {
      width: 1024,
      height: 768,
      breakpoint: "desktop",
      isMobile: false,
      isTablet: false,
      isDesktop: true,
      minTouchTarget: 24,
    };
  }

  const width = window.innerWidth;
  const height = window.innerHeight;

  let breakpoint: Breakpoint;
  let isMobile: boolean;
  let isTablet: boolean;
  let isDesktop: boolean;
  let minTouchTarget: number;

  if (width < MOBILE_BREAKPOINT) {
    breakpoint = "mobile";
    isMobile = true;
    isTablet = false;
    isDesktop = false;
    minTouchTarget = 44;
  } else if (width < TABLET_BREAKPOINT) {
    breakpoint = "tablet";
    isMobile = false;
    isTablet = true;
    isDesktop = false;
    minTouchTarget = 32;
  } else {
    breakpoint = "desktop";
    isMobile = false;
    isTablet = false;
    isDesktop = true;
    minTouchTarget = 24;
  }

  return { width, height, breakpoint, isMobile, isTablet, isDesktop, minTouchTarget };
}

/**
 * Hook for responsive design
 *
 * @example
 * const { isMobile, breakpoint } = useMediaQuery();
 * if (isMobile) {
 *   // Render mobile layout
 * }
 */
export function useMediaQuery(): ViewportInfo {
  const [viewport, setViewport] = useState<ViewportInfo>(getViewportInfo);

  useEffect(() => {
    const handleResize = () => {
    setViewport(getViewportInfo());
    };

    // Debounce resize events
    let timeoutId: ReturnType<typeof setTimeout>;
    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleResize, 100);
    };

    window.addEventListener("resize", debouncedResize);

    // Initial call
    handleResize();

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", debouncedResize);
    };
  }, []);

  return viewport;
}

/**
 * Check if current viewport matches a specific breakpoint
 */
export function useBreakpoint(targetBreakpoint: Breakpoint): boolean {
  const { breakpoint } = useMediaQuery();
  return breakpoint === targetBreakpoint;
}

/**
 * Check if viewport is at least a certain size
 */
export function useMinBreakpoint(minBreakpoint: Breakpoint): boolean {
  const { width } = useMediaQuery();

  switch (minBreakpoint) {
    case "mobile":
      return true; // Always true (minimum)
    case "tablet":
      return width >= MOBILE_BREAKPOINT;
    case "desktop":
      return width >= TABLET_BREAKPOINT;
  }
}

/**
 * Get responsive value based on viewport
 *
 * @example
 * const columns = useResponsiveValue({ mobile: 1, tablet: 2, desktop: 3 });
 */
export function useResponsiveValue<T>(values: {
  mobile: T;
  tablet: T;
  desktop: T;
}): T {
  const { breakpoint } = useMediaQuery();
  return values[breakpoint];
}

/**
 * Hook to detect touch devices
 */
export function useTouchDevice(): boolean {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice(
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0
      );
    };

    checkTouch();
    window.addEventListener("touchstart", checkTouch, { once: true });

    return () => {
      window.removeEventListener("touchstart", checkTouch);
    };
  }, []);

  return isTouchDevice;
}

/**
 * Hook to detect if user prefers reduced motion
 */
export function usePrefersReducedMotion(): boolean {
  const getInitialValue = () => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  };

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(getInitialValue);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const handler = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return prefersReducedMotion;
}

/**
 * Hook for detecting orientation
 */
export function useOrientation(): "portrait" | "landscape" {
  const { width, height } = useMediaQuery();
  return width > height ? "landscape" : "portrait";
}
