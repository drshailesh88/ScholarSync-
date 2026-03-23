"use client";

import { useCallback, useEffect, useRef } from "react";

interface ResizeHandleProps {
  side: "left" | "right"; // which side of the panel the handle is on
  onResize: (delta: number) => void;
  className?: string;
}

export function ResizeHandle({ side, onResize, className }: ResizeHandleProps) {
  const dragging = useRef(false);
  const lastX = useRef(0);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    dragging.current = true;
    lastX.current = e.clientX;
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!dragging.current) return;
      const delta = e.clientX - lastX.current;
      lastX.current = e.clientX;
      onResize(side === "right" ? delta : -delta);
    };

    const handleMouseUp = () => {
      if (dragging.current) {
        dragging.current = false;
        document.body.style.cursor = "";
        document.body.style.userSelect = "";
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [onResize, side]);

  return (
    <div
      onMouseDown={handleMouseDown}
      className={`shrink-0 cursor-col-resize relative group h-full ${className || ""}`}
      style={{ width: 8, marginLeft: -3, marginRight: -3, zIndex: 10 }}
    >
      {/* Visible line — thin by default, thickens + turns purple on hover */}
      <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-gray-200 dark:bg-white/10 group-hover:w-[3px] group-hover:bg-violet-500/50 group-active:w-[3px] group-active:bg-violet-500/80 transition-all duration-150 rounded-full" />
    </div>
  );
}
