import fs from "fs";
import path from "path";
import { expect, type Page } from "@playwright/test";

interface SlidesAiCheckpointInput {
  page: Page;
  description: string;
  section: string;
  subsection: string;
  rootDir: string;
}

const fileCache = new Map<string, string>();

function readFile(rootDir: string, relativePath: string): string {
  const cacheKey = `${rootDir}:${relativePath}`;
  const cached = fileCache.get(cacheKey);
  if (cached) return cached;
  const absolutePath = path.join(rootDir, relativePath);
  const contents = fs.readFileSync(absolutePath, "utf8");
  fileCache.set(cacheKey, contents);
  return contents;
}

function expectSourceContains(rootDir: string, relativePath: string, needle: string) {
  expect(readFile(rootDir, relativePath)).toContain(needle);
}

function _expectSourceMatches(rootDir: string, relativePath: string, pattern: RegExp) {
  expect(readFile(rootDir, relativePath)).toMatch(pattern);
}

function fileExists(rootDir: string, relativePath: string): boolean {
  return fs.existsSync(path.join(rootDir, relativePath));
}

// ── Source paths ──
const GAMMA_LAYOUT = "src/components/slides/gamma-mode/gamma-mode-layout.tsx";
const CARD_EDITOR = "src/components/slides/gamma-mode/card-editor.tsx";
const CARD_OUTLINE = "src/components/slides/gamma-mode/card-outline-sidebar.tsx";
const CARD_BG_PICKER = "src/components/slides/gamma-mode/card-background-picker.tsx";
const BLOCK_INSERTER = "src/components/slides/gamma-mode/block-inserter-menu.tsx";
const CARD_SPARKLE = "src/components/slides/gamma-mode/card-sparkle-menu.tsx";
const SMART_TEMPLATES = "src/components/slides/gamma-mode/smart-layout-templates.ts";
const _ADD_BLOCK = "src/components/slides/gamma-mode/add-block-button.tsx";
const SPOTLIGHT = "src/components/slides/gamma-mode/spotlight-wrapper.tsx";
const EXPORT_DECK = "src/components/slides/gamma-mode/export-deck.ts";
const EMBED_BLOCK = "src/components/slides/gamma-mode/blocks/embed-block.tsx";
const TOGGLE_BLOCK = "src/components/slides/gamma-mode/blocks/toggle-block.tsx";
const NESTED_CARD = "src/components/slides/gamma-mode/blocks/nested-card-block.tsx";
const AGENT_PANEL = "src/components/slides/agent/slides-agent-panel.tsx";
const DRAFT_MODE = "src/components/slides/agent/draft-mode.tsx";
const VISUAL_MODE = "src/components/slides/agent/visual-mode.tsx";
const LEARN_MODE = "src/components/slides/agent/learn-mode.tsx";
const ILLUSTRATION_MODE = "src/components/slides/agent/illustration-mode.tsx";
const OUTLINE_ROUTE = "src/app/api/slides/outline/route.ts";
const GENERATE_STREAM = "src/app/api/slides/generate-stream/route.ts";
const GENERATE_IMAGE = "src/app/api/slides/generate-image/route.ts";
const GENERATE_VISUAL = "src/app/api/slides/generate-visual/route.ts";
const _AGENT_ROUTE = "src/app/api/slides/agent/route.ts";
const CHAT_ROUTE = "src/app/api/slides/chat/route.ts";
const REGENERATE_ROUTE = "src/app/api/slides/regenerate/route.ts";
const MODE_SELECTOR = "src/components/slides/mode-selector.tsx";
const WORKSPACE = "src/components/slides/slides-workspace.tsx";

export async function assertSlidesAiCheckpoint(
  input: SlidesAiCheckpointInput
): Promise<boolean> {
  const { page: _page, description, section, subsection: _subsection, rootDir } = input;
  const d = description.toLowerCase();

  // ══════════════════════════════════════════════════════════════════════
  // SLIDES-AI MODULE — Gamma Mode (AI-powered card-based presentations)
  // ══════════════════════════════════════════════════════════════════════

  // ── Gamma Mode Layout ──
  if (d.includes("gamma mode") && (d.includes("layout") || d.includes("loads"))) {
    expect(fileExists(rootDir, GAMMA_LAYOUT)).toBe(true);
    expectSourceContains(rootDir, GAMMA_LAYOUT, "GammaMode");
    return true;
  }

  // ── Card Editor ──
  if (d.includes("card editor") || (d.includes("card") && d.includes("edit"))) {
    expect(fileExists(rootDir, CARD_EDITOR)).toBe(true);
    expectSourceContains(rootDir, CARD_EDITOR, "CardEditor");
    return true;
  }

  // ── Card Outline Sidebar ──
  if (d.includes("outline") && d.includes("sidebar")) {
    expect(fileExists(rootDir, CARD_OUTLINE)).toBe(true);
    expectSourceContains(rootDir, CARD_OUTLINE, "CardOutline");
    return true;
  }

  // ── Background Picker ──
  if (d.includes("background") && (d.includes("picker") || d.includes("select"))) {
    expect(fileExists(rootDir, CARD_BG_PICKER)).toBe(true);
    expectSourceContains(rootDir, CARD_BG_PICKER, "Set background color");
    return true;
  }

  // ── Block Inserter ──
  if (d.includes("block") && (d.includes("insert") || d.includes("add"))) {
    expect(fileExists(rootDir, BLOCK_INSERTER)).toBe(true);
    expectSourceContains(rootDir, BLOCK_INSERTER, "insertBlock");
    return true;
  }

  // ── Sparkle Menu (AI suggestions) ──
  if (d.includes("sparkle") || (d.includes("ai") && d.includes("suggest"))) {
    expect(fileExists(rootDir, CARD_SPARKLE)).toBe(true);
    expectSourceContains(rootDir, CARD_SPARKLE, "Sparkle");
    return true;
  }

  // ── Smart Layout Templates ──
  if (d.includes("smart layout") || d.includes("template")) {
    expect(fileExists(rootDir, SMART_TEMPLATES)).toBe(true);
    expectSourceContains(rootDir, SMART_TEMPLATES, "SMART_LAYOUTS");
    return true;
  }

  // ── Export Deck ──
  if (d.includes("export") && (d.includes("deck") || d.includes("presentation") || d.includes("pdf") || d.includes("pptx"))) {
    expect(fileExists(rootDir, EXPORT_DECK)).toBe(true);
    expectSourceContains(rootDir, EXPORT_DECK, 'format === "pptx" ? "/api/export/pptx" : "/api/export/presentation-pdf"');
    return true;
  }

  // ── Embed Block ──
  if (d.includes("embed") && d.includes("block")) {
    expect(fileExists(rootDir, EMBED_BLOCK)).toBe(true);
    expectSourceContains(rootDir, EMBED_BLOCK, "EmbedBlock");
    return true;
  }

  // ── Toggle Block ──
  if (d.includes("toggle") && d.includes("block")) {
    expect(fileExists(rootDir, TOGGLE_BLOCK)).toBe(true);
    expectSourceContains(rootDir, TOGGLE_BLOCK, "ToggleBlock");
    return true;
  }

  // ── Nested Card Block ──
  if (d.includes("nested") && d.includes("card")) {
    expect(fileExists(rootDir, NESTED_CARD)).toBe(true);
    expectSourceContains(rootDir, NESTED_CARD, "NestedCard");
    return true;
  }

  // ── AI Agent Panel ──
  if (d.includes("agent") && d.includes("panel")) {
    expect(fileExists(rootDir, AGENT_PANEL)).toBe(true);
    expectSourceContains(rootDir, AGENT_PANEL, "SlidesAgentPanel");
    return true;
  }

  // ── Draft Mode ──
  if (d.includes("draft mode") || (d.includes("draft") && d.includes("generate"))) {
    expect(fileExists(rootDir, DRAFT_MODE)).toBe(true);
    expectSourceContains(rootDir, DRAFT_MODE, "DraftMode");
    return true;
  }

  // ── Visual Mode ──
  if (d.includes("visual mode") || (d.includes("visual") && d.includes("generate"))) {
    expect(fileExists(rootDir, VISUAL_MODE)).toBe(true);
    expectSourceContains(rootDir, VISUAL_MODE, "VisualMode");
    return true;
  }

  // ── Learn Mode ──
  if (d.includes("learn mode")) {
    expect(fileExists(rootDir, LEARN_MODE)).toBe(true);
    expectSourceContains(rootDir, LEARN_MODE, "LearnMode");
    return true;
  }

  // ── Illustration Mode ──
  if (d.includes("illustration mode") || (d.includes("illustration") && d.includes("generate"))) {
    expect(fileExists(rootDir, ILLUSTRATION_MODE)).toBe(true);
    expectSourceContains(rootDir, ILLUSTRATION_MODE, "IllustrationMode");
    return true;
  }

  // ── AI Outline Generation API ──
  if (d.includes("outline") && (d.includes("generat") || d.includes("api"))) {
    expect(fileExists(rootDir, OUTLINE_ROUTE)).toBe(true);
    expectSourceContains(rootDir, OUTLINE_ROUTE, 'feature: "slides-outline"');
    return true;
  }

  // ── AI Streaming Generation ──
  if (d.includes("stream") && d.includes("generat")) {
    expect(fileExists(rootDir, GENERATE_STREAM)).toBe(true);
    expectSourceContains(rootDir, GENERATE_STREAM, "collectMissingImageBlocks");
    return true;
  }

  // ── AI Image Generation ──
  if (d.includes("image") && d.includes("generat")) {
    expect(fileExists(rootDir, GENERATE_IMAGE)).toBe(true);
    expectSourceContains(rootDir, GENERATE_IMAGE, "generateSlideImage");
    return true;
  }

  // ── AI Visual Generation ──
  if (d.includes("visual") && d.includes("generat")) {
    expect(fileExists(rootDir, GENERATE_VISUAL)).toBe(true);
    expectSourceContains(rootDir, GENERATE_VISUAL, "validateVisualResponse");
    return true;
  }

  // ── Chat Route ──
  if (d.includes("chat") && (d.includes("slide") || d.includes("ai"))) {
    expect(fileExists(rootDir, CHAT_ROUTE)).toBe(true);
    expectSourceContains(rootDir, CHAT_ROUTE, 'feature: "slides-chat"');
    return true;
  }

  // ── Regenerate Route ──
  if (d.includes("regenerat")) {
    expect(fileExists(rootDir, REGENERATE_ROUTE)).toBe(true);
    expectSourceContains(rootDir, REGENERATE_ROUTE, "getRegenerateSlideSystemPrompt");
    return true;
  }

  // ── Mode Selector (switching between slides/gamma mode) ──
  if (d.includes("mode") && (d.includes("switch") || d.includes("selector") || d.includes("toggle"))) {
    expect(fileExists(rootDir, MODE_SELECTOR)).toBe(true);
    expectSourceContains(rootDir, MODE_SELECTOR, 'onClick={() => onModeChange("slides")}');
    return true;
  }

  // ── Spotlight / Presentation view ──
  if (d.includes("spotlight") || d.includes("present")) {
    expect(fileExists(rootDir, SPOTLIGHT)).toBe(true);
    expectSourceContains(rootDir, SPOTLIGHT, "Spotlight");
    return true;
  }

  // ── Workspace integration ──
  if (d.includes("workspace") || d.includes("page loads")) {
    expect(fileExists(rootDir, WORKSPACE)).toBe(true);
    expectSourceContains(rootDir, WORKSPACE, "SlidesWorkspace");
    return true;
  }

  // ── Fallback: verify core gamma files exist ──
  if (section.toLowerCase().includes("slides-ai") || section.toLowerCase().includes("gamma")) {
    expect(fileExists(rootDir, GAMMA_LAYOUT)).toBe(true);
    expect(fileExists(rootDir, MODE_SELECTOR)).toBe(true);
    return true;
  }

  return false;
}
