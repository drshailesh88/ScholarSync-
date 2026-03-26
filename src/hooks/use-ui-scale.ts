import { useState, useEffect, useCallback } from "react";

export type UIScale = "default" | "large" | "larger";

const SCALE_VALUES: Record<UIScale, number> = {
  default: 1.0,
  large: 1.1,
  larger: 1.2,
};

const STORAGE_KEY = "scholarsync_ui_scale";

function getStoredScale(): UIScale {
  if (typeof window === "undefined") return "default";
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored && stored in SCALE_VALUES) return stored as UIScale;
  return "default";
}

export function useUIScale() {
  const [scale, setScaleState] = useState<UIScale>(getStoredScale);

  // Apply zoom to document on mount and when scale changes
  useEffect(() => {
    document.documentElement.style.zoom = String(SCALE_VALUES[scale]);
  }, [scale]);

  const setScale = useCallback((newScale: UIScale) => {
    setScaleState(newScale);
    localStorage.setItem(STORAGE_KEY, newScale);
  }, []);

  const cycleScale = useCallback(() => {
    setScaleState((prev) => {
      const order: UIScale[] = ["default", "large", "larger"];
      const nextIndex = (order.indexOf(prev) + 1) % order.length;
      const next = order[nextIndex];
      localStorage.setItem(STORAGE_KEY, next);
      return next;
    });
  }, []);

  return { scale, setScale, cycleScale, zoomValue: SCALE_VALUES[scale] };
}
