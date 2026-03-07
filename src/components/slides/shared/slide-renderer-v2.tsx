"use client";

import { useRef, useLayoutEffect, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import type {
  ContentBlock,
  SlideLayout,
  SlideMaster,
  ThemeConfig,
  BlockAnimation,
} from "@/types/presentation";
import type { CardBackground } from "@/stores/slides-store";
import { PRESET_THEMES } from "@/types/presentation";
import { cn } from "@/lib/utils";
import {
  buildBlockAnimationStylesheet,
  estimateBlockTypewriterSteps,
  getBlockAnimationPlaybackProps,
  hasRevealAnimation,
  type BlockAnimationPlaybackState,
  normalizeAnimationOrder,
} from "@/lib/presentation/block-animations";
import { computeLayout, regionToCSS } from "./slide-layout-engine";
import { ThemeProvider } from "./theme-engine";
import {
  getSlideBackgroundOverlayStyle,
  getSlideBackgroundStyle,
} from "./slide-background";
import { BLOCK_REGISTRY } from "../blocks";
import {
  getSlideMasterById,
  masterPlaceholderPrompt,
} from "./slide-master-utils";

const BLOCK_ANIMATION_STYLESHEET = buildBlockAnimationStylesheet();

// ---------------------------------------------------------------------------
// SlideRendererV2 — modular, block-registry-based renderer
// ---------------------------------------------------------------------------

interface SlideRendererV2Props {
  title?: string | null;
  subtitle?: string | null;
  layout?: SlideLayout | null;
  masterId?: string;
  master?: SlideMaster | null;
  masters?: SlideMaster[];
  contentBlocks?: ContentBlock[];
  themeKey?: string;
  themeConfig?: ThemeConfig;
  className?: string;
  scale?: number;
  showSlideNumber?: boolean;
  slideNumber?: number;
  /** When true, blocks with animation configs may animate in */
  animateBlocks?: boolean;
  /** Highest reveal order currently visible (presenter / preview) */
  revealOrder?: number;
  /** Reveal order that should animate on this render */
  activeRevealOrder?: number | null;
  /** Hide unrevealed animated blocks while stepping through orders */
  hideUnrevealedAnimated?: boolean;
  cardBackground?: CardBackground;
  showMasterPlaceholders?: boolean;
  onMasterPlaceholderClick?: (placeholderId: string) => void;
  /** Map of block index → morphId for morph transitions (layoutId) */
  morphIds?: Map<number, string>;
  /** layoutId for the title element during morph */
  morphTitleId?: string;
  /** layoutId for the subtitle element during morph */
  morphSubtitleId?: string;
}

export function SlideRendererV2({
  title,
  subtitle,
  layout: rawLayout,
  masterId,
  master,
  masters = [],
  contentBlocks = [],
  themeKey = "modern",
  themeConfig,
  className,
  scale = 1,
  showSlideNumber,
  slideNumber,
  animateBlocks = false,
  revealOrder = Number.MAX_SAFE_INTEGER,
  activeRevealOrder = null,
  hideUnrevealedAnimated = false,
  cardBackground,
  showMasterPlaceholders = false,
  onMasterPlaceholderClick,
  morphIds,
  morphTitleId,
  morphSubtitleId,
}: SlideRendererV2Props) {
  const theme = themeConfig ?? PRESET_THEMES[themeKey] ?? PRESET_THEMES.modern;
  const resolvedMaster =
    master ?? getSlideMasterById(masters, masterId) ?? null;
  const layout = (resolvedMaster?.layout ?? rawLayout ?? "title_content") as SlideLayout;
  const layoutResult = computeLayout(layout, contentBlocks);
  const effectiveBackground = cardBackground ?? resolvedMaster?.background;
  const slideBackgroundStyle = getSlideBackgroundStyle(effectiveBackground);
  const slideOverlayStyle = getSlideBackgroundOverlayStyle(effectiveBackground);
  const hasFixedSlideNumber = resolvedMaster?.fixedBlocks.some(
    (block) => block.masterFixedKey === "slide_number"
  ) ?? false;

  return (
    <ThemeProvider
      theme={theme}
      className={`aspect-video relative overflow-hidden ${className ?? ""}`}
      style={{ fontSize: `${scale * 16}px`, ...slideBackgroundStyle }}
    >
      <style>{BLOCK_ANIMATION_STYLESHEET}</style>

      {slideOverlayStyle && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={slideOverlayStyle}
          data-testid="slide-background-overlay"
        />
      )}

      {/* Top accent bar */}
      <div
        className="absolute top-0 left-0 right-0"
        style={{ height: `${scale * 4}px`, backgroundColor: theme.primaryColor }}
      />

      <div className="absolute inset-0 p-[6%] pt-[8%] flex flex-col">
        {/* Title area */}
        {!resolvedMaster && !layoutResult.hasBuiltInTitle && title && (
          <div className="mb-[0.5em] shrink-0">
            {morphTitleId ? (
              <motion.h2
                layoutId={morphTitleId}
                className="text-[1.3em] font-bold leading-tight"
                style={{
                  color: theme.primaryColor,
                  fontFamily: theme.headingFontFamily ?? theme.fontFamily,
                }}
                transition={{ type: "spring", stiffness: 200, damping: 25, duration: 0.6 }}
              >
                {title}
              </motion.h2>
            ) : (
              <h2
                className="text-[1.3em] font-bold leading-tight"
                style={{
                  color: theme.primaryColor,
                  fontFamily: theme.headingFontFamily ?? theme.fontFamily,
                }}
              >
                {title}
              </h2>
            )}
            {subtitle && (morphSubtitleId ? (
              <motion.p
                layoutId={morphSubtitleId}
                className="text-[0.75em] opacity-60 mt-[0.15em]"
                transition={{ type: "spring", stiffness: 200, damping: 25, duration: 0.6 }}
              >
                {subtitle}
              </motion.p>
            ) : (
              <p className="text-[0.75em] opacity-60 mt-[0.15em]">{subtitle}</p>
            ))}
          </div>
        )}

        {/* Built-in title layouts (title_slide, section_header, quote_slide) */}
        {!resolvedMaster && layout === "title_slide" && (
          <div className="flex-1 flex flex-col items-center justify-center text-center gap-[0.5em]">
            <AutoFitRegion>
              <div className="flex flex-col items-center gap-[0.5em]">
                {morphTitleId ? (
                  <motion.h1
                    layoutId={morphTitleId}
                    className="text-[2em] font-bold leading-tight"
                    style={{
                      color: theme.primaryColor,
                      fontFamily: theme.headingFontFamily ?? theme.fontFamily,
                    }}
                    transition={{ type: "spring", stiffness: 200, damping: 25, duration: 0.6 }}
                  >
                    {title}
                  </motion.h1>
                ) : (
                  <h1
                    className="text-[2em] font-bold leading-tight"
                    style={{
                      color: theme.primaryColor,
                      fontFamily: theme.headingFontFamily ?? theme.fontFamily,
                    }}
                  >
                    {title}
                  </h1>
                )}
                {subtitle && (morphSubtitleId ? (
                  <motion.p
                    layoutId={morphSubtitleId}
                    className="text-[1em] opacity-70"
                    transition={{ type: "spring", stiffness: 200, damping: 25, duration: 0.6 }}
                  >
                    {subtitle}
                  </motion.p>
                ) : (
                  <p className="text-[1em] opacity-70">{subtitle}</p>
                ))}
              </div>
            </AutoFitRegion>
          </div>
        )}

        {!resolvedMaster && layout === "section_header" && (
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <div
              className="w-[3em] h-[0.15em] mb-[0.8em] rounded-full"
              style={{ backgroundColor: theme.accentColor }}
            />
            {morphTitleId ? (
              <motion.h1
                layoutId={morphTitleId}
                className="text-[1.8em] font-bold"
                style={{
                  color: theme.primaryColor,
                  fontFamily: theme.headingFontFamily ?? theme.fontFamily,
                }}
                transition={{ type: "spring", stiffness: 200, damping: 25, duration: 0.6 }}
              >
                {title}
              </motion.h1>
            ) : (
              <h1
                className="text-[1.8em] font-bold"
                style={{
                  color: theme.primaryColor,
                  fontFamily: theme.headingFontFamily ?? theme.fontFamily,
                }}
              >
                {title}
              </h1>
            )}
            {subtitle && (morphSubtitleId ? (
              <motion.p
                layoutId={morphSubtitleId}
                className="text-[0.85em] mt-[0.4em] opacity-60"
                transition={{ type: "spring", stiffness: 200, damping: 25, duration: 0.6 }}
              >
                {subtitle}
              </motion.p>
            ) : (
              <p className="text-[0.85em] mt-[0.4em] opacity-60">{subtitle}</p>
            ))}
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

                    // Resolve morphId for this block by finding its original index
                    const originalIdx = morphIds ? contentBlocks.indexOf(block) : -1;
                    const blockMorphId = originalIdx >= 0 ? morphIds!.get(originalIdx) : undefined;

                    const rendered = (
                      <Renderer
                        key={`${block.type}-${i}`}
                        data={block.data as Record<string, unknown>}
                        theme={theme}
                        scale={scale}
                      />
                    );

                    // Wrap with morph layoutId if present
                    const morphWrapped = blockMorphId ? (
                      <motion.div
                        key={`${block.type}-${i}`}
                        layoutId={blockMorphId}
                        transition={{ type: "spring", stiffness: 200, damping: 25, duration: 0.6 }}
                      >
                        {rendered}
                      </motion.div>
                    ) : rendered;

                    if (!hasRevealAnimation(block.animation)) {
                      return morphWrapped;
                    }

                    const order = normalizeAnimationOrder(block.animation);
                    const isRevealed =
                      !hideUnrevealedAnimated ||
                      revealOrder >= order;

                    const shouldAnimateAutoplay =
                      animateBlocks && !hideUnrevealedAnimated && activeRevealOrder === null;
                    const shouldAnimateStep =
                      activeRevealOrder !== null &&
                      order === activeRevealOrder;

                    const playbackState: BlockAnimationPlaybackState = !isRevealed
                      ? "hidden"
                      : shouldAnimateAutoplay || shouldAnimateStep
                        ? "animate"
                        : "visible";

                    const animatedContent = (
                      <AnimatedBlockWrapper
                        key={`${block.type}-${i}`}
                        animation={block.animation}
                        playbackState={playbackState}
                        typewriterSteps={estimateBlockTypewriterSteps(block)}
                      >
                        {rendered}
                      </AnimatedBlockWrapper>
                    );

                    // Wrap animated block with morph layoutId if present
                    if (blockMorphId) {
                      return (
                        <motion.div
                          key={`${block.type}-${i}`}
                          layoutId={blockMorphId}
                          transition={{ type: "spring", stiffness: 200, damping: 25, duration: 0.6 }}
                        >
                          {animatedContent}
                        </motion.div>
                      );
                    }

                    return animatedContent;
                  })}
                </AutoFitRegion>
              </div>
            ))}
          </div>
        )}

        {showMasterPlaceholders && resolvedMaster && (
          <div className="absolute inset-0 pointer-events-none">
            {resolvedMaster.placeholders
              .filter(
                (placeholder) =>
                  !contentBlocks.some(
                    (block) => block.placeholderId === placeholder.id
                  )
              )
              .map((placeholder) => {
                const prompt = masterPlaceholderPrompt(placeholder.defaultType);
                const isInteractive = Boolean(onMasterPlaceholderClick);
                const commonProps = {
                  className: cn(
                    "absolute rounded-md border border-dashed border-brand/50 bg-brand/5 p-2 text-center text-[0.55em] text-ink-muted",
                    isInteractive && "cursor-pointer hover:bg-brand/10"
                  ),
                  style: {
                    left: `${placeholder.position.x}%`,
                    top: `${placeholder.position.y}%`,
                    width: `${placeholder.position.width}%`,
                    height: `${placeholder.position.height}%`,
                    pointerEvents: isInteractive ? ("auto" as const) : ("none" as const),
                  },
                  "data-testid": `master-placeholder-${placeholder.id}`,
                };

                if (isInteractive) {
                  return (
                    <button
                      type="button"
                      key={placeholder.id}
                      {...commonProps}
                      onClick={() => onMasterPlaceholderClick?.(placeholder.id)}
                    >
                      {prompt}
                    </button>
                  );
                }

                return (
                  <div key={placeholder.id} {...commonProps}>
                    {prompt}
                  </div>
                );
              })}
          </div>
        )}
      </div>

      {resolvedMaster?.fixedBlocks.map((block, index) => {
        const blockEntry = BLOCK_REGISTRY[block.type];
        if (!blockEntry || !block.position) return null;
        const Renderer = blockEntry.render;

        return (
          <div
            key={`master-fixed-${index}`}
            className="absolute pointer-events-none select-none"
            data-testid={`master-fixed-block-${index}`}
            style={{
              left: `${block.position.x}%`,
              top: `${block.position.y}%`,
              width: `${block.position.width}%`,
              height: `${block.position.height}%`,
              zIndex: 2000 + index,
            }}
          >
            <Renderer
              data={block.data as Record<string, unknown>}
              theme={theme}
              scale={scale}
            />
          </div>
        );
      })}

      {/* Slide number */}
      {(resolvedMaster?.showSlideNumber ?? showSlideNumber) &&
        !hasFixedSlideNumber &&
        slideNumber != null && (
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

function AnimatedBlockWrapper({
  animation,
  playbackState,
  typewriterSteps,
  children,
}: {
  animation: BlockAnimation;
  playbackState: BlockAnimationPlaybackState;
  typewriterSteps: number;
  children: React.ReactNode;
}) {
  const { className, style } = getBlockAnimationPlaybackProps(animation, {
    state: playbackState,
    typewriterSteps,
  });

  return (
    <div
      className={cn(className)}
      style={style}
      data-block-animation-state={playbackState}
      data-block-animation-type={animation.type}
    >
      {children}
    </div>
  );
}
