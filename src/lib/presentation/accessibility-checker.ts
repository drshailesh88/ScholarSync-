// ---------------------------------------------------------------------------
// Accessibility Checker — pure functions, no React, no DOM
// ---------------------------------------------------------------------------

import type { SlideState } from "@/stores/slides-store";
import type { ThemeConfig, ContentBlock } from "@/types/presentation";
import { contrastRatio, meetsWCAG_AA } from "./color-contrast";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface A11yIssue {
  slideId: number;
  slideIndex: number;
  blockIndex?: number;
  severity: "error" | "warning" | "info";
  ruleId: string;
  message: string;
  suggestion: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function wordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

// ---------------------------------------------------------------------------
// Individual rule checkers
// ---------------------------------------------------------------------------

function checkMissingAltText(
  slides: SlideState[],
): A11yIssue[] {
  const issues: A11yIssue[] = [];
  for (let si = 0; si < slides.length; si++) {
    const slide = slides[si];
    for (let bi = 0; bi < slide.contentBlocks.length; bi++) {
      const block = slide.contentBlocks[bi];
      if (block.type === "image") {
        const alt = block.data.alt;
        if (!alt || alt.trim() === "" || alt === "Image description") {
          issues.push({
            slideId: slide.id,
            slideIndex: si,
            blockIndex: bi,
            severity: "error",
            ruleId: "missing-alt-text",
            message: "Image is missing meaningful alt text.",
            suggestion:
              "Add a descriptive alt text that conveys the image content to screen reader users.",
          });
        }
      }
    }
  }
  return issues;
}

function checkMissingSlideTitle(
  slides: SlideState[],
): A11yIssue[] {
  const issues: A11yIssue[] = [];
  for (let si = 0; si < slides.length; si++) {
    const slide = slides[si];
    if (!slide.title || slide.title.trim() === "") {
      issues.push({
        slideId: slide.id,
        slideIndex: si,
        severity: "error",
        ruleId: "missing-slide-title",
        message: "Slide has no title.",
        suggestion:
          "Add a descriptive title so screen readers can navigate between slides.",
      });
    }
  }
  return issues;
}

function checkLowContrastText(
  theme: ThemeConfig,
  slides: SlideState[],
): A11yIssue[] {
  const issues: A11yIssue[] = [];
  const ratio = contrastRatio(theme.textColor, theme.backgroundColor);
  if (!meetsWCAG_AA(theme.textColor, theme.backgroundColor)) {
    // Report once on the first slide
    const slide = slides[0];
    if (slide) {
      issues.push({
        slideId: slide.id,
        slideIndex: 0,
        severity: "error",
        ruleId: "low-contrast-text",
        message: `Text color ${theme.textColor} on background ${theme.backgroundColor} has a contrast ratio of ${ratio.toFixed(1)}:1 (needs 4.5:1).`,
        suggestion:
          "Choose a text color with at least 4.5:1 contrast ratio against the background for WCAG AA compliance.",
      });
    }
  }
  return issues;
}

function checkLowContrastPrimary(
  theme: ThemeConfig,
  slides: SlideState[],
): A11yIssue[] {
  const issues: A11yIssue[] = [];
  const ratio = contrastRatio(theme.primaryColor, theme.backgroundColor);
  if (ratio < 3) {
    const slide = slides[0];
    if (slide) {
      issues.push({
        slideId: slide.id,
        slideIndex: 0,
        severity: "warning",
        ruleId: "low-contrast-primary",
        message: `Primary color ${theme.primaryColor} on background ${theme.backgroundColor} has a contrast ratio of ${ratio.toFixed(1)}:1 (recommended 3:1).`,
        suggestion:
          "Adjust the primary color to have at least 3:1 contrast ratio against the background.",
      });
    }
  }
  return issues;
}

function checkTooManyBlocks(
  slides: SlideState[],
): A11yIssue[] {
  const issues: A11yIssue[] = [];
  for (let si = 0; si < slides.length; si++) {
    const slide = slides[si];
    if (slide.contentBlocks.length > 8) {
      issues.push({
        slideId: slide.id,
        slideIndex: si,
        severity: "warning",
        ruleId: "too-many-blocks",
        message: `Slide has ${slide.contentBlocks.length} content blocks (recommended max 8).`,
        suggestion:
          "Split this slide into multiple slides to reduce cognitive overload.",
      });
    }
  }
  return issues;
}

function checkTooMuchText(
  slides: SlideState[],
): A11yIssue[] {
  const issues: A11yIssue[] = [];
  for (let si = 0; si < slides.length; si++) {
    const slide = slides[si];
    for (let bi = 0; bi < slide.contentBlocks.length; bi++) {
      const block = slide.contentBlocks[bi];
      if (block.type === "text") {
        const wc = wordCount(block.data.text);
        if (wc > 100) {
          issues.push({
            slideId: slide.id,
            slideIndex: si,
            blockIndex: bi,
            severity: "warning",
            ruleId: "too-much-text",
            message: `Text block has ${wc} words (recommended max 100).`,
            suggestion:
              "Break long text into bullet points or split across slides for better readability.",
          });
        }
      }
    }
  }
  return issues;
}

function checkMissingSpeakerNotes(
  slides: SlideState[],
): A11yIssue[] {
  const issues: A11yIssue[] = [];
  for (let si = 0; si < slides.length; si++) {
    const slide = slides[si];
    if (!slide.speakerNotes || slide.speakerNotes.trim() === "") {
      issues.push({
        slideId: slide.id,
        slideIndex: si,
        severity: "info",
        ruleId: "missing-speaker-notes",
        message: "Slide has no speaker notes.",
        suggestion:
          "Add speaker notes for accessibility — they help describe visual content for assistive technologies.",
      });
    }
  }
  return issues;
}

function checkDuplicateSlideTitle(
  slides: SlideState[],
): A11yIssue[] {
  const issues: A11yIssue[] = [];
  const titleMap = new Map<string, number[]>();

  for (let si = 0; si < slides.length; si++) {
    const title = slides[si].title.trim().toLowerCase();
    if (title === "") continue;
    const list = titleMap.get(title) ?? [];
    list.push(si);
    titleMap.set(title, list);
  }

  for (const [, indices] of titleMap) {
    if (indices.length > 1) {
      for (const si of indices) {
        const slide = slides[si];
        issues.push({
          slideId: slide.id,
          slideIndex: si,
          severity: "info",
          ruleId: "duplicate-slide-title",
          message: `Slide title "${slide.title}" is used on ${indices.length} slides.`,
          suggestion:
            "Use unique slide titles to help screen reader users distinguish between slides.",
        });
      }
    }
  }
  return issues;
}

function checkEmptySlide(
  slides: SlideState[],
): A11yIssue[] {
  const issues: A11yIssue[] = [];
  for (let si = 0; si < slides.length; si++) {
    const slide = slides[si];
    if (slide.contentBlocks.length === 0) {
      issues.push({
        slideId: slide.id,
        slideIndex: si,
        severity: "warning",
        ruleId: "empty-slide",
        message: "Slide has no content blocks.",
        suggestion:
          "Add content or delete this empty slide.",
      });
    }
  }
  return issues;
}

function checkTableMissingHeaders(
  slides: SlideState[],
): A11yIssue[] {
  const issues: A11yIssue[] = [];
  for (let si = 0; si < slides.length; si++) {
    const slide = slides[si];
    for (let bi = 0; bi < slide.contentBlocks.length; bi++) {
      const block = slide.contentBlocks[bi];
      if (block.type === "table") {
        const headers = block.data.headers;
        if (
          !headers ||
          headers.length === 0 ||
          headers.every((h: string) => h.trim() === "")
        ) {
          issues.push({
            slideId: slide.id,
            slideIndex: si,
            blockIndex: bi,
            severity: "warning",
            ruleId: "table-missing-headers",
            message: "Table has no headers defined.",
            suggestion:
              "Add descriptive header labels to the table for screen reader accessibility.",
          });
        }
      }
    }
  }
  return issues;
}

function checkChartMissingTitle(
  slides: SlideState[],
): A11yIssue[] {
  const issues: A11yIssue[] = [];
  for (let si = 0; si < slides.length; si++) {
    const slide = slides[si];
    for (let bi = 0; bi < slide.contentBlocks.length; bi++) {
      const block = slide.contentBlocks[bi];
      if (block.type === "chart") {
        if (!block.data.title || block.data.title.trim() === "") {
          issues.push({
            slideId: slide.id,
            slideIndex: si,
            blockIndex: bi,
            severity: "warning",
            ruleId: "chart-missing-title",
            message: "Chart has no title.",
            suggestion:
              "Add a descriptive title to the chart so assistive technologies can convey its purpose.",
          });
        }
      }
    }
  }
  return issues;
}

function checkReadingOrder(
  slides: SlideState[],
): A11yIssue[] {
  const issues: A11yIssue[] = [];
  for (let si = 0; si < slides.length; si++) {
    const slide = slides[si];
    if (slide.contentBlocks.length < 2) continue;
    const hasAnyZIndex = slide.contentBlocks.some(
      (b: ContentBlock) => b.zIndex !== undefined,
    );
    if (!hasAnyZIndex) {
      issues.push({
        slideId: slide.id,
        slideIndex: si,
        severity: "info",
        ruleId: "reading-order",
        message:
          "Blocks have no explicit reading order (no zIndex set).",
        suggestion:
          "Set explicit z-index ordering on blocks to ensure correct reading order for assistive technologies.",
      });
    }
  }
  return issues;
}

// ---------------------------------------------------------------------------
// Main checker
// ---------------------------------------------------------------------------

export function checkAccessibility(
  slides: SlideState[],
  theme: ThemeConfig,
): A11yIssue[] {
  if (slides.length === 0) return [];

  return [
    ...checkMissingAltText(slides),
    ...checkMissingSlideTitle(slides),
    ...checkLowContrastText(theme, slides),
    ...checkLowContrastPrimary(theme, slides),
    ...checkTooManyBlocks(slides),
    ...checkTooMuchText(slides),
    ...checkMissingSpeakerNotes(slides),
    ...checkDuplicateSlideTitle(slides),
    ...checkEmptySlide(slides),
    ...checkTableMissingHeaders(slides),
    ...checkChartMissingTitle(slides),
    ...checkReadingOrder(slides),
  ];
}

// ---------------------------------------------------------------------------
// Score calculation
// ---------------------------------------------------------------------------

const SEVERITY_WEIGHTS: Record<A11yIssue["severity"], number> = {
  error: 10,
  warning: 5,
  info: 2,
};

export function calculateAccessibilityScore(issues: A11yIssue[]): number {
  const deduction = issues.reduce(
    (sum, issue) => sum + SEVERITY_WEIGHTS[issue.severity],
    0,
  );
  return Math.max(0, 100 - deduction);
}
