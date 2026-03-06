"use client";

import type { AlignmentGuide, SpacingGuide } from "./alignment-engine";

interface AlignmentGuidesOverlayProps {
  guides: AlignmentGuide[];
  spacingGuides?: SpacingGuide[];
  visible: boolean;
}

function getGuideColor(guide: AlignmentGuide): string {
  return guide.type === "canvas" ? "#ef4444" : "#3b82f6";
}

export function AlignmentGuidesOverlay({
  guides,
  spacingGuides = [],
  visible,
}: AlignmentGuidesOverlayProps) {
  if (!visible || (guides.length === 0 && spacingGuides.length === 0)) {
    return null;
  }

  return (
    <div
      className="pointer-events-none absolute inset-0 z-[1001]"
      data-testid="alignment-guides-overlay"
    >
      {guides.map((guide, index) =>
        guide.axis === "vertical" ? (
          <div
            key={`guide-v-${guide.type}-${guide.position}-${index}`}
            data-alignment-guide-axis="vertical"
            data-alignment-guide-type={guide.type}
            style={{
              position: "absolute",
              left: `${guide.position}%`,
              top: 0,
              bottom: 0,
              width: 0,
              borderLeft: `1px dashed ${getGuideColor(guide)}`,
            }}
          />
        ) : (
          <div
            key={`guide-h-${guide.type}-${guide.position}-${index}`}
            data-alignment-guide-axis="horizontal"
            data-alignment-guide-type={guide.type}
            style={{
              position: "absolute",
              top: `${guide.position}%`,
              left: 0,
              right: 0,
              height: 0,
              borderTop: `1px dashed ${getGuideColor(guide)}`,
            }}
          />
        )
      )}

      {spacingGuides
        .filter((guide) => guide.end > guide.start)
        .map((guide, index) =>
          guide.axis === "horizontal" ? (
            <div
              key={`spacing-h-${guide.position}-${guide.start}-${guide.end}-${index}`}
              data-spacing-guide-axis="horizontal"
              style={{
                position: "absolute",
                top: `${guide.position}%`,
                left: `${guide.start}%`,
                width: `${guide.end - guide.start}%`,
                height: 0,
                borderTop: "1px dashed #ec4899",
              }}
            />
          ) : (
            <div
              key={`spacing-v-${guide.position}-${guide.start}-${guide.end}-${index}`}
              data-spacing-guide-axis="vertical"
              style={{
                position: "absolute",
                left: `${guide.position}%`,
                top: `${guide.start}%`,
                height: `${guide.end - guide.start}%`,
                width: 0,
                borderLeft: "1px dashed #ec4899",
              }}
            />
          )
        )}
    </div>
  );
}
