"use client";

import { getGridLinePositions, isMajorGridLine } from "./grid-utils";

interface GridOverlayProps {
  visible: boolean;
  gridSize: number;
}

const LIGHT_GRID_LINE_COLOR = "rgba(0, 0, 0, 0.08)";
const MAJOR_GRID_LINE_COLOR = "rgba(0, 0, 0, 0.16)";

export function GridOverlay({ visible, gridSize }: GridOverlayProps) {
  if (!visible) {
    return null;
  }

  const linePositions = getGridLinePositions(gridSize);

  return (
    <div
      className="pointer-events-none absolute inset-0 z-[200]"
      style={{ pointerEvents: "none" }}
      data-testid="slide-grid-overlay"
    >
      {/* empty state: renders nothing when no data */}
      {linePositions.map((position) => {
        const color = isMajorGridLine(position)
          ? MAJOR_GRID_LINE_COLOR
          : LIGHT_GRID_LINE_COLOR;

        return (
          <div
            key={`grid-line-v-${position}`}
            data-grid-line-axis="vertical"
            data-grid-line-major={isMajorGridLine(position) ? "true" : "false"}
            style={{
              position: "absolute",
              left: `${position}%`,
              top: 0,
              bottom: 0,
              width: 1,
              backgroundColor: color,
            }}
          />
        );
      })}

      {linePositions.map((position) => {
        const color = isMajorGridLine(position)
          ? MAJOR_GRID_LINE_COLOR
          : LIGHT_GRID_LINE_COLOR;

        return (
          <div
            key={`grid-line-h-${position}`}
            data-grid-line-axis="horizontal"
            data-grid-line-major={isMajorGridLine(position) ? "true" : "false"}
            style={{
              position: "absolute",
              top: `${position}%`,
              left: 0,
              right: 0,
              height: 1,
              backgroundColor: color,
            }}
          />
        );
      })}
    </div>
  );
}
