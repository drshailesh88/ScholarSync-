"use client";

import { useRef, useLayoutEffect, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import type { ContentBlock, SlideLayout, ThemeConfig, BlockAnimation } from "@/types/presentation";
import { PRESET_THEMES } from "@/types/presentation";
import { computeLayout, regionToCSS } from "./slide-layout-engine";
import { ThemeProvider } from "./theme-engine";
import { BLOCK_REGISTRY } from "../blocks";

// ---------------------------------------------------------------------------
// SlideRendererV2 — modular, block-registry-based renderer
// ---------------------------------------------------------------------------

interface SlideRendererV2Props {
  title?: string | null;
  subtitle?: string | null;
  layout?: SlideLayout | null;
  contentBlocks?: ContentBlock[];
  themeKey?: string;
  themeConfig?: ThemeConfig;
  className?: string;
  scale?: number;
  showSlideNumber?: boolean;
  slideNumber?: number;
  /** When true, blocks with animation configs will animate in */
  animateBlocks?: boolean;
}

export function SlideRendererV2({
  title,
  subtitle,
  layout: rawLayout,
  contentBlocks = [],
  themeKey = "modern",
  themeConfig,
  className,
  scale = 1,
  showSlideNumber,
  slideNumber,
  animateBlocks = false,
}: SlideRendererV2Props) {
  const theme = themeConfig ?? PRESET_THEMES[themeKey] ?? PRESET_THEMES.modern;
  const layout = (rawLayout ?? "title_content") as SlideLayout;
  const layoutResult = computeLayout(layout, contentBlocks);

  return (
    <ThemeProvider
      theme={theme}
      className={`aspect-video relative overflow-hidden ${className ?? ""}`}
      style={{ fontSize: `${scale * 16}px` }}
    >
      {/* Top accent bar */}
      <div
        className="absolute top-0 left-0 right-0"
        style={{ height: `${scale * 4}px`, backgroundColor: theme.primaryColor }}
      />

      <div className="absolute inset-0 p-[6%] pt-[8%] flex flex-col">
        {/* Title area */}
        {!layoutResult.hasBuiltInTitle && title && (
          <div className="mb-[0.5em] shrink-0">
            <h2
              className="text-[1.3em] font-bold leading-tight"
              style={{
                color: theme.primaryColor,
                fontFamily: theme.headingFontFamily ?? theme.fontFamily,
              }}
            >
              {title}
            </h2>
            {subtitle && (
              <p className="text-[0.75em] opacity-60 mt-[0.15em]">
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Built-in title layouts (title_slide, section_header, quote_slide) */}
        {layout === "title_slide" && (
          <div className="flex-1 flex flex-col items-center justify-center text-center gap-[0.5em]">
            <AutoFitRegion>
              <div className="flex flex-col items-center gap-[0.5em]">
                <h1
                  className="text-[2em] font-bold leading-tight"
                  style={{
                    color: theme.primaryColor,
                    fontFamily: theme.headingFontFamily ?? theme.fontFamily,
                  }}
                >
                  {title}
                </h1>
                {subtitle && (
                  <p className="text-[1em] opacity-70">{subtitle}</p>
                )}
              </div>
            </AutoFitRegion>
          </div>
        )}

        {layout === "section_header" && (
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <div
              className="w-[3em] h-[0.15em] mb-[0.8em] rounded-full"
              style={{ backgroundColor: theme.accentColor }}
            />
            <h1
              className="text-[1.8em] font-bold"
              style={{
                color: theme.primaryColor,
                fontFamily: theme.headingFontFamily ?? theme.fontFamily,
              }}
            >
              {title}
            </h1>
            {subtitle && (
              <p className="text-[0.85em] mt-[0.4em] opacity-60">{subtitle}</p>
            )}
          </div>
        )}

        {/* Content regions from layout engine */}
        {layoutResult.regions.length > 0 && (
          <div className="flex-1 relative min-h-0">
            {layoutResult.regions.map((region) => (
              <div key={region.id} style={regionToCSS(region)}>
                <AutoFitRegion>
                  {region.blocks.map((block, i) => {
                    const entry = BLOCK_REGISTRY[block.type];
                    if (!entry) return null;
                    const Renderer = entry.render;
                    const rendered = (
                      <Renderer
                        key={`${block.type}-${i}`}
                        data={block.data as Record<string, unknown>}
                        theme={theme}
                        scale={scale}
                      />
                    );

                    if (animateBlocks && block.animation && block.animation.type !== "none") {
                      return (
                        <AnimatedBlockWrapper key={`${block.type}-${i}`} animation={block.animation}>
                          {rendered}
                        </AnimatedBlockWrapper>
                      );
                    }

                    return rendered;
                  })}
                </AutoFitRegion>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Slide number */}
      {showSlideNumber && slideNumber != null && (
        <div
          className="absolute bottom-[3%] right-[4%] text-[0.6em] opacity-50"
          style={{ color: theme.textColor }}
        >
          {slideNumber}
        </div>
      )}
    </ThemeProvider>
  );
}

// ---------------------------------------------------------------------------
// AutoFitRegion — scales down content when it overflows the region container
// ---------------------------------------------------------------------------

const MIN_FIT_SCALE = 0.45;

function AutoFitRegion({ children }: { children: ReactNode }) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [fitScale, setFitScale] = useState(1);

  useLayoutEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    // Reset scale to measure natural size
    inner.style.transform = "none";
    inner.style.width = "100%";

    // Allow a frame for block renderers to settle
    requestAnimationFrame(() => {
      if (!outer.isConnected || !inner.isConnected) return;

      const containerH = outer.clientHeight;
      const contentH = inner.scrollHeight;

      if (containerH <= 0 || contentH <= containerH + 2) {
        setFitScale(1);
        return;
      }

      const ratio = Math.max(MIN_FIT_SCALE, containerH / contentH);
      setFitScale(ratio);
    });
  }, [children]);

  return (
    <div
      ref={outerRef}
      style={{
        width: "100%",
        height: "100%",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        ref={innerRef}
        style={{
          transformOrigin: "top left",
          transform: fitScale < 1 ? `scale(${fitScale})` : "none",
          width: fitScale < 1 ? `${100 / fitScale}%` : "100%",
        }}
      >
        {children}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// AnimatedBlockWrapper — animates a block on mount based on its animation config
// ---------------------------------------------------------------------------

const animationVariants: Record<string, { hidden: Record<string, number>; visible: Record<string, number> }> = {
  fadeIn: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
  slideUp: { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } },
  slideLeft: { hidden: { opacity: 0, x: -30 }, visible: { opacity: 1, x: 0 } },
  scaleIn: { hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } },
  typewriter: { hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } },
};

function AnimatedBlockWrapper({
  animation,
  children,
}: {
  animation: BlockAnimation;
  children: React.ReactNode;
}) {
  const variant = animationVariants[animation.type] ?? animationVariants.fadeIn;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: variant.hidden,
        visible: variant.visible,
      }}
      transition={{
        duration: animation.duration ?? 0.4,
        delay: animation.delay ?? 0,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
}
