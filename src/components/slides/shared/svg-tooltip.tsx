"use client";

import { useState, useCallback, useRef, useEffect } from "react";

interface TooltipData {
  label: string;
  description?: string;
  value?: string;
}

interface SvgTooltipState {
  visible: boolean;
  x: number;
  y: number;
  data: TooltipData | null;
}

/**
 * Hook that manages tooltip state for SVG elements with data-tooltip-* attributes.
 * Returns a containerRef to attach to the wrapper div and a Tooltip element to render.
 */
export function useSvgTooltip(interactive: boolean = true) {
  const [tooltip, setTooltip] = useState<SvgTooltipState>({
    visible: false,
    x: 0,
    y: 0,
    data: null,
  });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = useCallback(
    (e: MouseEvent) => {
      if (!interactive) return;
      const target = (e.target as Element).closest("[data-tooltip-label]");
      if (!target || !containerRef.current) return;

      const label = target.getAttribute("data-tooltip-label") || "";
      const description = target.getAttribute("data-tooltip-description") || undefined;
      const value = target.getAttribute("data-tooltip-value") || undefined;

      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setTooltip({ visible: true, x, y, data: { label, description, value } });
    },
    [interactive],
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!interactive || !containerRef.current) return;
      const target = (e.target as Element).closest("[data-tooltip-label]");
      if (!target) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setTooltip((prev) => ({ ...prev, x, y }));
    },
    [interactive],
  );

  const handleMouseLeave = useCallback(
    (e: MouseEvent) => {
      const target = (e.target as Element).closest("[data-tooltip-label]");
      if (!target) return;
      setTooltip((prev) => ({ ...prev, visible: false, data: null }));
    },
    [],
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !interactive) return;

    container.addEventListener("mouseover", handleMouseEnter);
    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseout", handleMouseLeave);

    return () => {
      container.removeEventListener("mouseover", handleMouseEnter);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseout", handleMouseLeave);
    };
  }, [interactive, handleMouseEnter, handleMouseMove, handleMouseLeave]);

  return { containerRef, tooltip };
}

export function SvgTooltip({ tooltip }: { tooltip: SvgTooltipState }) {
  const tipRef = useCallback(
    (el: HTMLDivElement | null) => {
      if (!el || !tooltip.visible) return;
      const parent = el.offsetParent as HTMLElement | null;
      if (!parent) return;

      const parentRect = parent.getBoundingClientRect();
      let x = tooltip.x + 12;
      let y = tooltip.y - 8;

      // Prevent going off right edge
      if (x + el.offsetWidth > parentRect.width) {
        x = tooltip.x - el.offsetWidth - 12;
      }
      // Prevent going off bottom edge
      if (y + el.offsetHeight > parentRect.height) {
        y = parentRect.height - el.offsetHeight - 4;
      }
      // Prevent going off top
      if (y < 0) y = 4;
      // Prevent going off left
      if (x < 0) x = 4;

      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
    },
    [tooltip.x, tooltip.y, tooltip.visible]
  );

  if (!tooltip.visible || !tooltip.data) return null;

  return (
    <div
      ref={tipRef}
      className="absolute pointer-events-none z-50 rounded-lg shadow-lg px-2.5 py-1.5 text-xs max-w-[200px]"
      style={{
        backgroundColor: "#1F2937",
        color: "#ffffff",
      }}
    >
      <div className="font-bold leading-tight">{tooltip.data.label}</div>
      {tooltip.data.description && (
        <div className="opacity-80 leading-tight mt-0.5">{tooltip.data.description}</div>
      )}
      {tooltip.data.value && (
        <div className="font-semibold italic leading-tight mt-0.5">{tooltip.data.value}</div>
      )}
    </div>
  );
}
