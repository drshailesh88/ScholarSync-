import type React from "react";
import type { CardBackground } from "@/stores/slides-store";

const GRADIENT_DIRECTIONS: Record<string, string> = {
  "top-to-bottom": "to bottom",
  "left-to-right": "to right",
  diagonal: "135deg",
};

const IMAGE_POSITION_PRESETS: Record<
  string,
  { size: "cover" | "contain"; position: string }
> = {
  cover: { size: "cover", position: "center" },
  contain: { size: "contain", position: "center" },
  top: { size: "cover", position: "top center" },
  center: { size: "cover", position: "center" },
  bottom: { size: "cover", position: "bottom center" },
  // Backward-compatible values used by gamma mode.
  background: { size: "cover", position: "center" },
  left: { size: "cover", position: "left center" },
  right: { size: "cover", position: "right center" },
  none: { size: "cover", position: "center" },
};

function getGradientDirection(bg: CardBackground): string {
  return GRADIENT_DIRECTIONS[bg.gradientDirection ?? "top-to-bottom"] ?? "to bottom";
}

export function getSlideBackgroundStyle(
  cardBackground?: CardBackground
): React.CSSProperties {
  const bg = cardBackground;
  const style: React.CSSProperties = {};

  if (!bg) return style;

  if (bg.color) {
    style.backgroundColor = bg.color;
  }

  if (bg.gradientEnabled && bg.gradientFrom && bg.gradientTo) {
    const gradientValue = `linear-gradient(${getGradientDirection(bg)}, ${bg.gradientFrom}, ${bg.gradientTo})`;
    style.background = gradientValue;
    style.backgroundImage = gradientValue;
  }

  if (bg.imageUrl) {
    const imagePreset = IMAGE_POSITION_PRESETS[bg.imagePosition ?? "cover"] ?? IMAGE_POSITION_PRESETS.cover;
    style.backgroundImage = `url(${bg.imageUrl})`;
    style.backgroundSize = imagePreset.size;
    style.backgroundPosition = imagePreset.position;
    style.backgroundRepeat = "no-repeat";
  }

  return style;
}

export function getSlideBackgroundOverlayStyle(
  cardBackground?: CardBackground
): React.CSSProperties | null {
  const bg = cardBackground;
  if (!bg || !bg.overlayType || bg.overlayType === "none") return null;

  const intensity = Math.max(0, Math.min(100, bg.overlayIntensity ?? 50));
  const opacity = intensity / 100;
  const overlayColor = bg.overlayColor ?? "#000000";

  if (bg.overlayType === "faded") {
    return {
      background: `linear-gradient(to bottom, ${overlayColor}, transparent)`,
      opacity,
    };
  }

  if (bg.overlayType === "frosted") {
    return {
      backgroundColor: overlayColor,
      opacity,
      backdropFilter: `blur(${Math.max(1, intensity / 20)}px)`,
    };
  }

  return {
    backgroundColor: overlayColor,
    opacity,
  };
}
