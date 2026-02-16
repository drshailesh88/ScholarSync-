"use client";

import { cn } from "@/lib/utils";
import type { PDFHighlight, HighlightColor } from "@/lib/pdf/types";

const colorClassMap: Record<HighlightColor, string> = {
  yellow: "bg-yellow-300",
  green: "bg-green-300",
  blue: "bg-blue-300",
  pink: "bg-pink-300",
  orange: "bg-orange-300",
};

interface PDFHighlightLayerProps {
  pageNumber: number;
  highlights: PDFHighlight[];
  flashHighlight?: {
    pageNumber: number;
    rects: PDFHighlight["rects"];
  } | null;
  onHighlightClick: (highlight: PDFHighlight) => void;
}

export function PDFHighlightLayer({
  pageNumber,
  highlights,
  flashHighlight,
  onHighlightClick,
}: PDFHighlightLayerProps) {
  const pageHighlights = highlights.filter(
    (h) => h.pageNumber === pageNumber
  );
  const showFlash =
    flashHighlight && flashHighlight.pageNumber === pageNumber;

  return (
    <>
      {/* Persistent highlights */}
      {pageHighlights.map((highlight) => (
        <div key={highlight.id} className="absolute inset-0 pointer-events-none">
          {highlight.rects.map((rect, i) => (
            <div
              key={i}
              className={cn(
                "absolute pointer-events-auto cursor-pointer opacity-30 hover:opacity-50 transition-opacity rounded-sm",
                colorClassMap[highlight.color]
              )}
              style={{
                left: `${rect.x}%`,
                top: `${rect.y}%`,
                width: `${rect.width}%`,
                height: `${rect.height}%`,
              }}
              onClick={(e) => {
                e.stopPropagation();
                onHighlightClick(highlight);
              }}
              title={highlight.note || highlight.selectedText.slice(0, 80)}
            />
          ))}
          {/* Note indicator dot */}
          {highlight.note && highlight.rects.length > 0 && (
            <div
              className={cn(
                "absolute w-2 h-2 rounded-full pointer-events-auto cursor-pointer",
                colorClassMap[highlight.color],
                "opacity-80"
              )}
              style={{
                right: "2px",
                top: `${highlight.rects[0].y}%`,
              }}
              onClick={(e) => {
                e.stopPropagation();
                onHighlightClick(highlight);
              }}
            />
          )}
        </div>
      ))}

      {/* Temporary flash highlight (for navigation) */}
      {showFlash &&
        flashHighlight.rects.map((rect, i) => (
          <div
            key={`flash-${i}`}
            className="absolute bg-yellow-400 opacity-50 rounded-sm animate-pulse pointer-events-none"
            style={{
              left: `${rect.x}%`,
              top: `${rect.y}%`,
              width: `${rect.width}%`,
              height: `${rect.height}%`,
              animation: "pulse 0.5s ease-in-out 6",
            }}
          />
        ))}
    </>
  );
}
