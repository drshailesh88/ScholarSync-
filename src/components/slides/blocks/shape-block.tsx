"use client";

import { memo } from "react";
import type { ShapeData, ThemeConfig } from "@/types/presentation";
import { renderShapeSvgPrimitive } from "./shape-utils";

interface ShapeBlockProps {
  data: ShapeData;
  theme: ThemeConfig;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export const ShapeBlock = memo(function ShapeBlock({ data, theme }: ShapeBlockProps) {
  const shapeType = data.shapeType ?? "rectangle";
  const fill = data.fillColor ?? theme.primaryColor;
  const baseStroke = data.strokeColor ?? theme.textColor;
  const strokeWidth = clamp(data.strokeWidth ?? 0, 0, 20);
  const hasStroke = strokeWidth > 0 && baseStroke.trim().length > 0;
  const opacity = clamp((data.opacity ?? 100) / 100, 0, 1);
  const rotation = data.rotation ?? 0;
  const text = data.text?.trim() ?? "";
  const textAlign = data.textAlign ?? "center";
  const textColor = data.textColor ?? theme.textColor;

  const stroke = hasStroke ? baseStroke : "none";
  const lineStroke = hasStroke ? baseStroke : fill;

  const textJustify: React.CSSProperties["justifyContent"] =
    textAlign === "left" ? "flex-start" : textAlign === "right" ? "flex-end" : "center";

  return (
    <div className="relative h-full w-full min-h-[2.5em]" data-shape-type={shapeType}>
      <svg
        className="h-full w-full"
        viewBox="0 0 100 100"
        role="img"
        aria-label={`${shapeType} shape`}
        style={{ opacity }}
      >
        <g transform={rotation !== 0 ? `rotate(${rotation} 50 50)` : undefined}>
          {renderShapeSvgPrimitive(shapeType, {
            fill,
            stroke: shapeType === "line" ? lineStroke : stroke,
            strokeWidth: shapeType === "line" ? Math.max(2, strokeWidth || 0) : strokeWidth,
          })}
          {text.length > 0 && (
            <foreignObject x="10" y={shapeType === "line" ? "35" : "10"} width="80" height={shapeType === "line" ? "30" : "80"}>
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: textJustify,
                  textAlign,
                  color: textColor,
                  fontSize: "14px",
                  lineHeight: 1.25,
                  overflow: "hidden",
                  padding: "2px 4px",
                  wordBreak: "break-word",
                }}
              >
                {text}
              </div>
            </foreignObject>
          )}
        </g>
      </svg>
    </div>
  );
});
