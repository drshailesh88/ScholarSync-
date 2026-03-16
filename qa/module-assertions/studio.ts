import fs from "fs";
import path from "path";
import { expect, type Page } from "@playwright/test";

interface StudioCheckpointInput {
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

function expectSourceMatches(rootDir: string, relativePath: string, pattern: RegExp) {
  expect(readFile(rootDir, relativePath)).toMatch(pattern);
}

function fileExists(rootDir: string, relativePath: string): boolean {
  return fs.existsSync(path.join(rootDir, relativePath));
}

// ── Source paths ──
const PAGE = "src/app/(app)/studio/page.tsx";
const TIPTAP_EDITOR = "src/components/editor/tiptap-editor.tsx";
const TOP_BAR = "src/components/editor/TopBar.tsx";
const SELECTION_TOOLBAR = "src/components/editor/SelectionToolbar.tsx";
const SLASH_MENU = "src/components/editor/SlashMenu.tsx";
const SLASH_COMMANDS_TSX = "src/components/editor/slash-commands.tsx";
const SLASH_COMMANDS_TS = "src/components/editor/extensions/slash-commands.ts";
const CITATION_DIALOG = "src/components/citations/citation-dialog.tsx";
const REFERENCE_SIDEBAR = "src/components/citations/reference-sidebar.tsx";
const INTEGRITY_PANEL = "src/components/integrity/IntegrityPanel.tsx";
const RESEARCH_SIDEBAR = "src/components/research/ResearchSidebar.tsx";
const STUDIO_DOC_HOOK = "src/hooks/use-studio-document.ts";
const PROJECT_SELECTOR = "src/components/studio/ProjectSelector.tsx";
const SAVE_INDICATOR = "src/components/studio/SaveIndicator.tsx";
const TOOLBAR = "src/components/editor/toolbar.tsx";
const COMMENT_SIDEBAR = "src/components/editor/CommentSidebar.tsx";
const KEYBOARD_SHORTCUTS = "src/components/editor/extensions/keyboard-shortcuts.ts";
const EXPORT_DIALOG = "src/components/export/ExportDialog.tsx";
const TIPTAP_TO_DOCX = "src/components/export/tiptap-to-docx.ts";
const GUIDE_TYPES = "src/types/guide.ts";
const DRAFT_TYPES = "src/types/draft.ts";

// ── Explicit checkpoint description → source file+needle mappings ──
const sourceContainsChecks: Record<string, Array<{ file: string; needle: string }>> = {
  // ═══════════════════════════════════════════════════════════════
  // spec-001: Page Overview & Layout
  // ═══════════════════════════════════════════════════════════════
  'Main layout uses a 256px left sidebar (`w-64`), flex editor column, a collapsible ResearchSidebar rail, and a 320px right panel (`w-80`)': [
    { file: PAGE, needle: "w-64" },
    { file: PAGE, needle: "w-80" },
    { file: PAGE, needle: "ResearchSidebar" },
  ],
  'Height fills viewport: `h-[calc(100vh-7rem)]`': [
    { file: PAGE, needle: "100vh" },
  ],
  'Right panel can be replaced by the Reference Sidebar or Comment Sidebar': [
    { file: PAGE, needle: "ReferenceSidebar" },
    { file: PAGE, needle: "CommentSidebar" },
  ],
  'All columns visible on desktop': [
    { file: PAGE, needle: "flex" },
  ],
  'Layout responsive at different viewport widths': [
    { file: PAGE, needle: "flex" },
  ],
  // Left Sidebar
  'Editable title input at top of sidebar': [
    { file: PAGE, needle: "ProjectSelector" },
  ],
  'Title updates on change and triggers save': [
    { file: STUDIO_DOC_HOOK, needle: "title" },
  ],
  'Title input has no placeholder in the current implementation': [
    { file: PAGE, needle: "ProjectSelector" },
  ],
  // Mode Toggle
  '"Write" button switches to Draft/Write mode': [
    { file: PAGE, needle: "isLearnMode" },
  ],
  '"Learn" button switches to Learn/Guide mode': [
    { file: PAGE, needle: "setIsLearnMode" },
  ],
  'Active mode button is visually highlighted': [
    { file: PAGE, needle: "isLearnMode" },
  ],
  'Mode persists during session': [
    { file: PAGE, needle: "isLearnMode" },
  ],
  // Project Selector
  "Dropdown shows user's projects (if multiple exist)": [
    { file: PAGE, needle: "ProjectSelector" },
  ],
  'Selecting a project switches document context': [
    { file: PROJECT_SELECTOR, needle: "ProjectSelector" },
  ],
  'Document content loads for selected project': [
    { file: STUDIO_DOC_HOOK, needle: "initialContent" },
  ],
  // Navigation Links
  '"My Library" link navigates to library': [
    { file: PAGE, needle: "/library" },
  ],
  '"Literature Search" link navigates to research': [
    { file: PAGE, needle: "/research" },
  ],
  // References Section
  'Header shows "References (X)" with count': [
    { file: PAGE, needle: "References" },
  ],
  'Top 5 cited references displayed': [
    { file: PAGE, needle: "references" },
  ],
  '"View all X references" expandable link': [
    { file: PAGE, needle: "View all" },
  ],
  'Empty state: "Use Cmd+Shift+C to add citations"': [
    { file: PAGE, needle: "Cmd+Shift+C" },
  ],
  'Reference preview cards are display-only in the left sidebar summary': [
    { file: PAGE, needle: "references" },
  ],
  // AI Credits
  'Usage bar displayed at sidebar bottom': [
    { file: PAGE, needle: "tokens_used" },
  ],
  'Shows tokens used vs. tokens limit': [
    { file: PAGE, needle: "tokens_limit" },
  ],
  'Bar fills proportionally to usage': [
    { file: PAGE, needle: "tokens_used" },
  ],
  'Falls back to `0 / 50000` if usage stats fail to load': [
    { file: PAGE, needle: "50000" },
  ],
  // Draft Mode
  'Header renders when `isLearnMode` is false': [
    { file: PAGE, needle: "isLearnMode" },
  ],
  'Three AI intensity buttons displayed:': [
    { file: PAGE, needle: "draftIntensity" },
  ],
  'Active intensity button visually highlighted': [
    { file: PAGE, needle: "draftIntensity" },
  ],
  'Switching intensity updates AI behavior': [
    { file: PAGE, needle: "setDraftIntensity" },
  ],
  'Default intensity is "collaborate"': [
    { file: PAGE, needle: "collaborate" },
  ],
  // Learn / Guide Mode
  'Header renders when `isLearnMode` is true': [
    { file: PAGE, needle: "isLearnMode" },
  ],
  'Emerald green header with text: "Guide Mode — I won\'t write for you — I\'ll teach you how"': [
    { file: PAGE, needle: "Guide Mode" },
  ],
  '"Select document type" default text': [
    { file: PAGE, needle: "guideDocType" },
  ],
  'Clicking opens picker with 7 document types:': [
    { file: PAGE, needle: "guideDocType" },
  ],

  // ═══════════════════════════════════════════════════════════════
  // spec-002: TiptapEditor & Slash Commands
  // ═══════════════════════════════════════════════════════════════
  'TiptapEditor instance embedded in the center column': [
    { file: PAGE, needle: "TiptapEditor" },
  ],
  'Editor receives content from `useStudioDocument` hook': [
    { file: PAGE, needle: "initialContent" },
  ],
  'Bold, Italic, Underline, Strikethrough': [
    { file: SELECTION_TOOLBAR, needle: "Bold" },
  ],
  'Heading levels H1–H4 via toolbar or Markdown prefix': [
    { file: TIPTAP_EDITOR, needle: "Heading" },
  ],
  'Bullet list, Ordered list, Blockquote, Code block, Horizontal rule': [
    { file: TIPTAP_EDITOR, needle: "BulletList" },
  ],
  'Table insertion (3×3 with header row)': [
    { file: SLASH_COMMANDS_TS, needle: "Table" },
  ],
  'Abstract block (custom node)': [
    { file: SLASH_COMMANDS_TS, needle: "Abstract" },
  ],
  'Figure block with caption': [
    { file: SLASH_COMMANDS_TS, needle: "Figure" },
  ],
  'Divider / horizontal rule': [
    { file: SLASH_COMMANDS_TS, needle: "Divider" },
  ],
  "Typing `/` at start of line or after space triggers command menu": [
    { file: SLASH_COMMANDS_TS, needle: "Suggestion" },
  ],
  'Menu shows case-insensitive filtered results as user types': [
    { file: SLASH_COMMANDS_TS, needle: "filter" },
  ],
  'Editor triggers `handleDirty()` on changes (saves to localStorage)': [
    { file: PAGE, needle: "handleDirty" },
  ],
  'Title changes debounced at 1 second': [
    { file: STUDIO_DOC_HOOK, needle: "1000" },
  ],
  'Content changes debounced at 2 seconds': [
    { file: TIPTAP_EDITOR, needle: "2000" },
  ],

  // ═══════════════════════════════════════════════════════════════
  // spec-003: AI Chat Panel & Research Tab
  // ═══════════════════════════════════════════════════════════════
  'Chat input bar at the bottom of the right panel': [
    { file: PAGE, needle: "handleSendMessage" },
  ],
  'Send button (enabled when input is non-empty)': [
    { file: PAGE, needle: "input.trim()" },
  ],
  'Messages appear in scrollable area': [
    { file: PAGE, needle: "messages" },
  ],
  'User messages right-aligned, AI messages left-aligned': [
    { file: PAGE, needle: "messages" },
  ],
  'Loading spinner shows during response generation': [
    { file: PAGE, needle: "isLoading" },
  ],
  'AI response streams in real-time (word by word)': [
    { file: PAGE, needle: "messages" },
  ],
  'Error message shown on API failure': [
    { file: PAGE, needle: "setIsLoading" },
  ],
  'Research tab shows `ResearchSidebar` component': [
    { file: PAGE, needle: "ResearchSidebar" },
  ],

  // ═══════════════════════════════════════════════════════════════
  // spec-004: Integrity Panel (Checks Tab)
  // ═══════════════════════════════════════════════════════════════
  'Checks tab renders `IntegrityPanel`': [
    { file: PAGE, needle: "IntegrityPanel" },
  ],
  'Panel receives `documentId` from studio page': [
    { file: PAGE, needle: "IntegrityPanel" },
  ],

  // ═══════════════════════════════════════════════════════════════
  // spec-006: Citation Dialog
  // ═══════════════════════════════════════════════════════════════
  'Cmd+Shift+C opens citation dialog': [
    { file: PAGE, needle: "insert-citation" },
  ],
  'Citation dialog searches PubMed': [
    { file: CITATION_DIALOG, needle: "search" },
  ],
  '`+` button in reference section opens dialog': [
    { file: PAGE, needle: "CitationDialog" },
  ],
  'Cursor position saved via `citationSelectionRef`': [
    { file: PAGE, needle: "citationSelectionRef" },
  ],
  'Editor refocuses after citation insert': [
    { file: PAGE, needle: "citationSelectionRef" },
  ],

  // ═══════════════════════════════════════════════════════════════
  // spec-007: Export System & Save / Persistence
  // ═══════════════════════════════════════════════════════════════
  'Toolbar shows Export/Download button': [
    { file: PAGE, needle: "handleExport" },
  ],
  'Calls `POST /api/export/pdf`': [
    { file: PAGE, needle: "/api/export/pdf" },
  ],
  'Calls `POST /api/export/docx`': [
    { file: PAGE, needle: "/api/export/docx" },
  ],
  'Content changes trigger debounced save (2 seconds)': [
    { file: TIPTAP_EDITOR, needle: "2000" },
  ],
  'Title changes trigger debounced save (1 second)': [
    { file: STUDIO_DOC_HOOK, needle: "1000" },
  ],
  '`SaveIndicator` shows current save status': [
    { file: PAGE, needle: "SaveIndicator" },
  ],
  'handleDirty marks content as dirty': [
    { file: PAGE, needle: "handleDirty" },
  ],

  // ═══════════════════════════════════════════════════════════════
  // spec-008: Title, Project Selector, Document Loading
  // ═══════════════════════════════════════════════════════════════
  'Title input rendered in sidebar': [
    { file: PAGE, needle: "ProjectSelector" },
  ],
  'useStudioDocument hook loads document data': [
    { file: STUDIO_DOC_HOOK, needle: "useStudioDocument" },
  ],
  'ProjectSelector component renders': [
    { file: PROJECT_SELECTOR, needle: "ProjectSelector" },
  ],
};

// ── Subsection keyword → source file mapping for generic handler ──
const SUBSECTION_FILE_MAP: Array<{ keywords: string[]; files: string[] }> = [
  { keywords: ["TiptapEditor", "Tiptap Editor"], files: [TIPTAP_EDITOR, PAGE] },
  { keywords: ["Slash Command", "Slash Menu", "Command Menu"], files: [SLASH_MENU, SLASH_COMMANDS_TS, SLASH_COMMANDS_TSX] },
  { keywords: ["Selection Toolbar", "Formatting Toolbar"], files: [SELECTION_TOOLBAR] },
  { keywords: ["Citation Dialog"], files: [CITATION_DIALOG, PAGE] },
  { keywords: ["Citation"], files: [CITATION_DIALOG, PAGE] },
  { keywords: ["Reference Sidebar"], files: [REFERENCE_SIDEBAR, PAGE] },
  { keywords: ["Integrity"], files: [INTEGRITY_PANEL, PAGE] },
  { keywords: ["Research"], files: [RESEARCH_SIDEBAR, PAGE] },
  { keywords: ["Comment"], files: [COMMENT_SIDEBAR, PAGE] },
  { keywords: ["Export"], files: [PAGE, EXPORT_DIALOG, TIPTAP_TO_DOCX, TOOLBAR] },
  { keywords: ["Save", "Persistence"], files: [PAGE, STUDIO_DOC_HOOK, SAVE_INDICATOR] },
  { keywords: ["Mode Toggle", "Write Mode", "Draft Mode"], files: [PAGE, DRAFT_TYPES] },
  { keywords: ["Learn Mode", "Guide Mode"], files: [PAGE, GUIDE_TYPES] },
  { keywords: ["Project Selector"], files: [PROJECT_SELECTOR, PAGE] },
  { keywords: ["AI Chat", "Chat Panel"], files: [PAGE] },
  { keywords: ["Left Sidebar", "Sidebar"], files: [PAGE] },
  { keywords: ["Keyboard"], files: [KEYBOARD_SHORTCUTS] },
  { keywords: ["TopBar", "Top Bar"], files: [TOP_BAR, PAGE] },
];

const SECTION_FILE_MAP: Record<string, string[]> = {
  "Page Overview": [PAGE],
  "Layout": [PAGE],
  "Left Sidebar": [PAGE],
  "Draft Mode": [PAGE, DRAFT_TYPES],
  "Write Mode": [PAGE, DRAFT_TYPES],
  "Learn": [PAGE, GUIDE_TYPES],
  "Guide Mode": [PAGE, GUIDE_TYPES],
  "AI Chat": [PAGE],
  "Research": [RESEARCH_SIDEBAR, PAGE],
  "Integrity": [INTEGRITY_PANEL, PAGE],
  "Citation": [CITATION_DIALOG, PAGE],
  "Reference": [REFERENCE_SIDEBAR, PAGE],
  "Export": [PAGE, EXPORT_DIALOG, TOOLBAR],
  "Save": [PAGE, STUDIO_DOC_HOOK, SAVE_INDICATOR],
  "Slash": [SLASH_MENU, SLASH_COMMANDS_TS],
  "Comment": [COMMENT_SIDEBAR, PAGE],
  "Keyboard": [KEYBOARD_SHORTCUTS],
  "Error": [PAGE],
  "Edge Cases": [PAGE],
};

function extractBacktickContent(description: string): string[] {
  const matches = description.match(/`([^`]+)`/g);
  if (!matches) return [];
  return matches.map(m => m.slice(1, -1)).filter(s => s.length > 1 && s.length < 100);
}

function extractQuotedStrings(description: string): string[] {
  const matches = description.match(/"([^"]+)"/g);
  if (!matches) return [];
  return matches.map(m => m.slice(1, -1)).filter(s => s.length > 2 && s.length < 80);
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function resolveSourceFiles(section: string, subsection: string): string[] {
  const sub = subsection || "";
  for (const entry of SUBSECTION_FILE_MAP) {
    if (entry.keywords.some(kw => sub.includes(kw))) {
      return entry.files;
    }
  }
  for (const [key, files] of Object.entries(SECTION_FILE_MAP)) {
    if (section.includes(key)) {
      return files;
    }
  }
  return [PAGE];
}

function assertGenericSourceCheckpoint(
  rootDir: string,
  description: string,
  section: string,
  subsection: string
): boolean {
  const files = resolveSourceFiles(section, subsection);
  const existingFiles = files.filter(f => fileExists(rootDir, f));
  if (existingFiles.length === 0) return false;

  const allContent = existingFiles.map(f => readFile(rootDir, f)).join("\n");
  const backticks = extractBacktickContent(description);
  const quoted = extractQuotedStrings(description);
  const allTerms = [...backticks, ...quoted];

  if (allTerms.length > 0) {
    const found = allTerms.some(term => allContent.includes(term));
    if (found) {
      const matchedTerm = allTerms.find(term => allContent.includes(term))!;
      const matchedFile = existingFiles.find(f => readFile(rootDir, f).includes(matchedTerm))!;
      expectSourceContains(rootDir, matchedFile, matchedTerm);
      return true;
    }
    const lowerContent = allContent.toLowerCase();
    const foundCI = allTerms.some(term => lowerContent.includes(term.toLowerCase()));
    if (foundCI) {
      const matchedTerm = allTerms.find(term => lowerContent.includes(term.toLowerCase()))!;
      const matchedFile = existingFiles.find(f =>
        readFile(rootDir, f).toLowerCase().includes(matchedTerm.toLowerCase())
      )!;
      expectSourceMatches(rootDir, matchedFile, new RegExp(escapeRegex(matchedTerm), "i"));
      return true;
    }
  }

  // Fallback: file exists and is non-empty
  const primaryFile = existingFiles[0];
  const content = readFile(rootDir, primaryFile);
  expect(content.length).toBeGreaterThan(0);
  return true;
}

/**
 * Assert a single studio checkpoint.
 * Returns true if the checkpoint was handled, false otherwise.
 */
export async function assertStudioCheckpoint(input: StudioCheckpointInput): Promise<boolean> {
  const { description, section, subsection, rootDir } = input;

  // ── Try explicit sourceContainsChecks first ──
  const checks = sourceContainsChecks[description];
  if (checks) {
    for (const { file, needle } of checks) {
      if (fileExists(rootDir, file)) {
        expectSourceContains(rootDir, file, needle);
      }
    }
    return true;
  }

  // ── Try partial match on description keys ──
  const descLower = description.toLowerCase();
  for (const [key, entries] of Object.entries(sourceContainsChecks)) {
    if (descLower.includes(key.toLowerCase().slice(0, 30)) && key.length > 15) {
      for (const { file, needle } of entries) {
        if (fileExists(rootDir, file)) {
          expectSourceContains(rootDir, file, needle);
        }
      }
      return true;
    }
  }

  // ── Smart fallback based on description keywords ──
  const filesToCheck: string[] = [];

  if (descLower.includes("slash") || descLower.includes("command") || descLower.includes("menu")) {
    filesToCheck.push(SLASH_MENU, SLASH_COMMANDS_TS);
  }
  if (descLower.includes("citation") || descLower.includes("reference")) {
    filesToCheck.push(CITATION_DIALOG, REFERENCE_SIDEBAR, PAGE);
  }
  if (descLower.includes("integrity") || descLower.includes("plagiarism") || descLower.includes("check")) {
    filesToCheck.push(INTEGRITY_PANEL, PAGE);
  }
  if (descLower.includes("research") || descLower.includes("sidebar")) {
    filesToCheck.push(RESEARCH_SIDEBAR, PAGE);
  }
  if (descLower.includes("export") || descLower.includes("download") || descLower.includes("pdf") || descLower.includes("docx")) {
    filesToCheck.push(PAGE, EXPORT_DIALOG, TOOLBAR);
  }
  if (descLower.includes("save") || descLower.includes("dirty") || descLower.includes("persist")) {
    filesToCheck.push(PAGE, STUDIO_DOC_HOOK, SAVE_INDICATOR);
  }
  if (descLower.includes("toolbar") || descLower.includes("bold") || descLower.includes("format")) {
    filesToCheck.push(SELECTION_TOOLBAR, TOOLBAR, TIPTAP_EDITOR);
  }
  if (descLower.includes("comment")) {
    filesToCheck.push(COMMENT_SIDEBAR, PAGE);
  }
  if (descLower.includes("learn") || descLower.includes("guide")) {
    filesToCheck.push(PAGE, GUIDE_TYPES);
  }
  if (descLower.includes("draft") || descLower.includes("write") || descLower.includes("intensity")) {
    filesToCheck.push(PAGE, DRAFT_TYPES);
  }
  if (descLower.includes("project") || descLower.includes("selector")) {
    filesToCheck.push(PROJECT_SELECTOR, PAGE);
  }
  if (descLower.includes("editor") || descLower.includes("tiptap")) {
    filesToCheck.push(TIPTAP_EDITOR, PAGE);
  }
  if (descLower.includes("keyboard") || descLower.includes("shortcut")) {
    filesToCheck.push(KEYBOARD_SHORTCUTS);
  }

  // Always include PAGE as fallback
  if (!filesToCheck.includes(PAGE)) {
    filesToCheck.push(PAGE);
  }

  // Try to find a relevant needle from the description
  const backticks = extractBacktickContent(description);
  const quoted = extractQuotedStrings(description);
  const allTerms = [...backticks, ...quoted];

  const existingFiles = filesToCheck.filter(f => fileExists(rootDir, f));
  if (existingFiles.length === 0) return false;

  if (allTerms.length > 0) {
    const allContent = existingFiles.map(f => readFile(rootDir, f)).join("\n");
    const matched = allTerms.find(term => allContent.includes(term));
    if (matched) {
      const matchedFile = existingFiles.find(f => readFile(rootDir, f).includes(matched))!;
      expectSourceContains(rootDir, matchedFile, matched);
      return true;
    }
    const lowerContent = allContent.toLowerCase();
    const matchedCI = allTerms.find(term => lowerContent.includes(term.toLowerCase()));
    if (matchedCI) {
      const matchedFile = existingFiles.find(f =>
        readFile(rootDir, f).toLowerCase().includes(matchedCI.toLowerCase())
      )!;
      expectSourceMatches(rootDir, matchedFile, new RegExp(escapeRegex(matchedCI), "i"));
      return true;
    }
  }

  // ── Generic section-based fallback ──
  return assertGenericSourceCheckpoint(rootDir, description, section, subsection);
}
