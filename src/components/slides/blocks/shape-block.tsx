"use client";

import { memo, useId } from "react";
import type { ShapeData, ThemeConfig } from "@/types/presentation";
import { renderShapeSvgPrimitive, renderArrowMarkers, isConnectorShape, isLineShape } from "./shape-utils";

interface ShapeBlockProps {
  data: ShapeData;
  theme: ThemeConfig;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export const ShapeBlock = memo(function ShapeBlock({ data, theme }: ShapeBlockProps) {
  const markerId = useId().replace(/:/g, "_");
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

  const isConnector = isConnectorShape(shapeType);
  const isLine = isLineShape(shapeType);
  const effectiveStroke = isLine ? lineStroke : stroke;
  const effectiveStrokeWidth = isLine ? Math.max(2, strokeWidth || 0) : strokeWidth;

  const textJustify: React.CSSProperties["justifyContent"] =
    textAlign === "left" ? "flex-start" : textAlign === "right" ? "flex-end" : "center";

  // Connector arrowhead markers
  const arrowStart = data.arrowStart ?? "none";
  const arrowEnd = isConnector ? (data.arrowEnd ?? "arrow") : (data.arrowEnd ?? "none");
  const markerStroke = hasStroke ? baseStroke : fill;

  // Connector endpoints — default to full-width horizontal line
  const startX = data.connectorStart?.x ?? 10;
  const startY = data.connectorStart?.y ?? 50;
  const endX = data.connectorEnd?.x ?? 90;
  const endY = data.connectorEnd?.y ?? 50;

  const renderConnector = () => {
    const markerStartUrl = arrowStart !== "none" ? `url(#${markerId}-start)` : undefined;
    const markerEndUrl = arrowEnd !== "none" ? `url(#${markerId}-end)` : undefined;

    const style = data.connectorStyle ?? (
      shapeType === "connector_elbow" ? "elbow" :
      shapeType === "connector_curved" ? "curved" : "straight"
    );

    const commonProps = {
      stroke: effectiveStroke,
      strokeWidth: effectiveStrokeWidth,
      strokeLinecap: "round" as const,
      fill: "none",
      markerStart: markerStartUrl,
      markerEnd: markerEndUrl,
    };

    switch (style) {
      case "elbow": {
        const midX = (startX + endX) / 2;
        return <path d={`M${startX},${startY} H${midX} V${endY} H${endX}`} strokeLinejoin="round" {...commonProps} />;
      }
      case "curved":
        return (
          <path
            d={`M${startX},${startY} C${startX + 20},${startY - 20} ${endX - 20},${endY + 20} ${endX},${endY}`}
            {...commonProps}
          />
        );
      default:
        return <line x1={startX} y1={startY} x2={endX} y2={endY} {...commonProps} />;
    }
  };

  return (
    <div className="relative h-full w-full min-h-[2.5em]" data-shape-type={shapeType}>
      <svg
        className="h-full w-full"
        viewBox="0 0 100 100"
        role="img"
        aria-label={`${shapeType} shape`}
        style={{ opacity }}
      >
        {isConnector && renderArrowMarkers(markerId, arrowStart, arrowEnd, markerStroke)}
        <g transform={rotation !== 0 ? `rotate(${rotation} 50 50)` : undefined}>
          {isConnector ? renderConnector() : renderShapeSvgPrimitive(shapeType, {
            fill: isLine ? "none" : fill,
            stroke: effectiveStroke,
            strokeWidth: effectiveStrokeWidth,
          })}
          {text.length > 0 && (
            <foreignObject x="10" y={isLine ? "35" : "10"} width="80" height={isLine ? "30" : "80"}>
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
