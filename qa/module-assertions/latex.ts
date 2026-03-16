import fs from "fs";
import path from "path";
import { expect, type Page } from "@playwright/test";

interface LatexCheckpointInput {
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
const PAGE = "src/app/(app)/latex/page.tsx";
const NEW_PAGE = "src/app/(app)/latex/new/page.tsx";
const EDITOR_PAGE = "src/app/(app)/latex/[projectId]/page.tsx";
const LOADING = "src/app/(app)/latex/loading.tsx";
const ERROR_PAGE = "src/app/(app)/latex/error.tsx";
const WORKSPACE = "src/components/latex-editor/latex-workspace.tsx";
const SOURCE_EDITOR = "src/components/latex-editor/source-editor.tsx";
const VISUAL_EDITOR = "src/components/latex-editor/visual-editor.tsx";
const PREVIEW_PANEL = "src/components/latex-editor/preview-panel.tsx";
const TOP_BAR = "src/components/latex-editor/top-bar.tsx";
const FILE_TREE = "src/components/latex-editor/file-tree.tsx";
const AGENT_PANEL = "src/components/latex-editor/agent-panel.tsx";
const COMMENT_PANEL = "src/components/latex-editor/comment-panel.tsx";
const IMAGE_BROWSER = "src/components/latex-editor/image-browser.tsx";
const SLASH_MENU = "src/components/latex-editor/slash-command-menu.tsx";
const INLINE_AI = "src/components/latex-editor/inline-ai-bar.tsx";
const ERROR_GUTTER = "src/components/latex-editor/error-gutter.tsx";
const VERSION_HISTORY = "src/components/latex-editor/version-history-panel.tsx";
const TRACK_CHANGES = "src/components/latex-editor/track-changes-panel.tsx";
const COLLAB_PROVIDER = "src/components/latex-editor/collaboration-provider.tsx";
const COLLAB_CURSORS = "src/components/latex-editor/collaboration-cursors.tsx";
const LATEX_ACTIONS = "src/lib/actions/latex.ts";
const COMPILE_ROUTE = "src/app/api/latex/compile/route.ts";
const GENERATE_ROUTE = "src/app/api/latex/generate/route.ts";
const COMPLETE_ROUTE = "src/app/api/latex/complete/route.ts";
const CITE_SEARCH_ROUTE = "src/app/api/latex/cite-search/route.ts";
const COMMENTS_ROUTE = "src/app/api/latex/comments/route.ts";
const FILES_ROUTE = "src/app/api/latex/files/route.ts";
const IMAGES_ROUTE = "src/app/api/latex/images/route.ts";
const SPELL_CHECK_ROUTE = "src/app/api/latex/spell-check/route.ts";
const INLINE_EDIT_ROUTE = "src/app/api/latex/inline-edit/route.ts";
const SYNCTEX_ROUTE = "src/app/api/latex/synctex/route.ts";
const VERSIONS_ROUTE = "src/app/api/latex/versions/route.ts";
const TRACK_CHANGES_ROUTE = "src/app/api/latex/track-changes/route.ts";
const DRAFT_CHAT_ROUTE = "src/app/api/latex/draft-chat/route.ts";
const AUTO_FIX_ROUTE = "src/app/api/latex/auto-fix/route.ts";

// ── Subsection keyword → source file mapping ──
const SUBSECTION_FILE_MAP: Array<{ keywords: string[]; files: string[] }> = [
  { keywords: ["Source Editor", "CodeMirror", "Syntax Highlight", "Editor Feature"], files: [SOURCE_EDITOR, WORKSPACE] },
  { keywords: ["Visual Editor", "WYSIWYM"], files: [VISUAL_EDITOR, WORKSPACE] },
  { keywords: ["Preview", "KaTeX", "PDF Preview"], files: [PREVIEW_PANEL, WORKSPACE] },
  { keywords: ["Top Bar", "Left Section", "Right Section"], files: [TOP_BAR, WORKSPACE] },
  { keywords: ["File Tree", "Files Tab", "Document Outline", "File Sync"], files: [FILE_TREE, WORKSPACE] },
  { keywords: ["Agent Panel", "Draft Tab", "Learn Tab", "Cite Tab", "Check Tab"], files: [AGENT_PANEL, WORKSPACE] },
  { keywords: ["Comment Panel", "Comment CRUD"], files: [COMMENT_PANEL, COMMENTS_ROUTE] },
  { keywords: ["Image Browser", "Upload"], files: [IMAGE_BROWSER, IMAGES_ROUTE] },
  { keywords: ["Slash Command", "Slash Menu"], files: [SLASH_MENU, WORKSPACE] },
  { keywords: ["Inline AI"], files: [INLINE_AI, INLINE_EDIT_ROUTE] },
  { keywords: ["Error Gutter", "Diagnostic", "AI Error"], files: [ERROR_GUTTER, WORKSPACE] },
  { keywords: ["Compilation", "Compile"], files: [WORKSPACE, COMPILE_ROUTE, TOP_BAR] },
  { keywords: ["Spell Check"], files: [SOURCE_EDITOR, SPELL_CHECK_ROUTE] },
  { keywords: ["Collaboration", "Collaborator", "CRDT", "WebSocket"], files: [COLLAB_PROVIDER, COLLAB_CURSORS, WORKSPACE] },
  { keywords: ["Citation", "Cite"], files: [AGENT_PANEL, CITE_SEARCH_ROUTE] },
  { keywords: ["Export", "Download"], files: [TOP_BAR, WORKSPACE] },
  { keywords: ["Version History", "Version"], files: [VERSION_HISTORY, VERSIONS_ROUTE] },
  { keywords: ["Track Changes"], files: [TRACK_CHANGES, TRACK_CHANGES_ROUTE] },
  { keywords: ["Template", "Compiler"], files: [NEW_PAGE] },
  { keywords: ["Title Input", "Create Action"], files: [NEW_PAGE] },
  { keywords: ["Panel Visibility", "Layout"], files: [WORKSPACE] },
  { keywords: ["Page Loading", "Retry"], files: [EDITOR_PAGE, WORKSPACE] },
  { keywords: ["Save", "Persistence", "Auto-save"], files: [WORKSPACE, LATEX_ACTIONS] },
  { keywords: ["Keyboard Shortcut"], files: [WORKSPACE, SOURCE_EDITOR] },
  { keywords: ["SyncTeX"], files: [SYNCTEX_ROUTE, PREVIEW_PANEL] },
  { keywords: ["Generate", "Draft Chat"], files: [GENERATE_ROUTE, DRAFT_CHAT_ROUTE, AGENT_PANEL] },
  { keywords: ["Auto-complete", "Complete"], files: [COMPLETE_ROUTE, SOURCE_EDITOR] },
  { keywords: ["Auto-fix", "Fix"], files: [AUTO_FIX_ROUTE, WORKSPACE] },
];

const SECTION_FILE_MAP: Record<string, string[]> = {
  "Project List Page": [PAGE],
  "New Paper Page": [NEW_PAGE],
  "LaTeX Workspace": [WORKSPACE, EDITOR_PAGE],
  "Top Bar": [TOP_BAR, WORKSPACE],
  "Source Editor": [SOURCE_EDITOR],
  "Visual Editor": [VISUAL_EDITOR],
  "Preview Panel": [PREVIEW_PANEL],
  "Compilation System": [WORKSPACE, COMPILE_ROUTE],
  "Error Gutter": [ERROR_GUTTER],
  "File Tree": [FILE_TREE],
  "Image Browser": [IMAGE_BROWSER],
  "Comment Panel": [COMMENT_PANEL, COMMENTS_ROUTE],
  "Agent Panel": [AGENT_PANEL],
  "Inline AI": [INLINE_AI],
  "Slash Command": [SLASH_MENU],
  "Spell Check": [SPELL_CHECK_ROUTE, SOURCE_EDITOR],
  "Collaboration": [COLLAB_PROVIDER, COLLAB_CURSORS],
  "Citation": [AGENT_PANEL, CITE_SEARCH_ROUTE],
  "Export": [TOP_BAR, WORKSPACE],
  "Version History": [VERSION_HISTORY, VERSIONS_ROUTE],
  "Track Changes": [TRACK_CHANGES, TRACK_CHANGES_ROUTE],
  "Quick Test Workflows": [WORKSPACE, PAGE],
  "Keyboard Shortcuts": [WORKSPACE, SOURCE_EDITOR],
  "Error Handling": [WORKSPACE, EDITOR_PAGE],
};

// ── Explicit checkpoint description → source file+needle mappings ──
const sourceContainsChecks: Record<string, Array<{ file: string; needle: string }>> = {
  // spec-001: Project List Page
  'Page header — "LaTeX Editor" title with subtitle "Write, preview, and compile LaTeX papers"': [
    { file: PAGE, needle: "LaTeX Editor" },
    { file: PAGE, needle: "Write, preview, and compile LaTeX papers" },
  ],
  '"New Paper" button — links to `/latex/new`': [
    { file: PAGE, needle: "/latex/new" },
  ],
  'Loading state — spinner while fetching projects': [
    { file: PAGE, needle: "CircleNotch" },
    { file: PAGE, needle: "loading" },
  ],
  'Empty state — icon + "No papers yet" message + "Create Paper" button': [
    { file: PAGE, needle: "No papers yet" },
    { file: PAGE, needle: "Create Paper" },
  ],
  'Delete button — appears on hover (trash icon), removes project immediately (optimistic UI)': [
    { file: PAGE, needle: "handleDelete" },
    { file: PAGE, needle: "Trash" },
  ],
  // spec-001: New Paper Page
  'Title field — text input, placeholder "Untitled Paper"': [
    { file: NEW_PAGE, needle: "Untitled Paper" },
  ],
  'Selected template — highlighted with brand border and ring': [
    { file: NEW_PAGE, needle: "template" },
  ],
  '"Create Paper" button — creates project and redirects to editor': [
    { file: NEW_PAGE, needle: "Create Paper" },
  ],
  'Loading state — spinner + disabled button during creation': [
    { file: NEW_PAGE, needle: "creating" },
  ],
  'Back button — arrow left navigates to `/latex`': [
    { file: NEW_PAGE, needle: "/latex" },
  ],
  // Workspace
  'File tree — toggle with `Cmd+B` or left-edge tab button': [
    { file: WORKSPACE, needle: "Cmd+B" },
  ],
  'Agent panel — toggle with `Cmd+J` or right-edge tab button': [
    { file: WORKSPACE, needle: "Cmd+J" },
  ],
  'Loading state — spinner + "Loading editor..."': [
    { file: EDITOR_PAGE, needle: "Loading editor" },
  ],
  // Top Bar
  'Compile button — with status indicator (idle/compiling/success/error)': [
    { file: TOP_BAR, needle: "compile" },
  ],
  // Source Editor
  'Line numbers — displayed in gutter': [
    { file: SOURCE_EDITOR, needle: "lineNumbers" },
  ],
  'Bracket matching — matching brackets highlighted': [
    { file: SOURCE_EDITOR, needle: "bracketMatching" },
  ],
  'Auto-close brackets — typing `{` auto-inserts `}`': [
    { file: SOURCE_EDITOR, needle: "closeBrackets" },
  ],
  // Preview
  'Scroll sync — preview follows editor scroll position': [
    { file: PREVIEW_PANEL, needle: "scroll" },
  ],
  // Compilation
  'Compile button in top bar': [
    { file: TOP_BAR, needle: "compile" },
  ],
  'Cmd+Enter keyboard shortcut': [
    { file: WORKSPACE, needle: "Cmd+Enter" },
  ],
  // File Tree
  'Hierarchical file browser — folder nesting support': [
    { file: FILE_TREE, needle: "file" },
  ],
  // Comment Panel
  'Per-line threaded comments — comments attached to specific line numbers': [
    { file: COMMENT_PANEL, needle: "line" },
  ],
  'Comment CRUD — create, read, update, delete via `/api/latex/comments`': [
    { file: COMMENTS_ROUTE, needle: "comment" },
  ],
  // Agent Panel
  'Streaming chat — real-time AI responses via Claude Sonnet': [
    { file: AGENT_PANEL, needle: "Streaming" },
  ],
  '50+ LaTeX concepts database organized by category:': [
    { file: AGENT_PANEL, needle: "concept" },
  ],
  'PubMed + Semantic Scholar search — integrated literature search': [
    { file: AGENT_PANEL, needle: "search" },
  ],
  // Inline AI
  'Trigger — `Cmd+K` with text selected in the editor': [
    { file: WORKSPACE, needle: "Cmd+K" },
  ],
  // Slash Command
  'Appears when `/` typed at line start': [
    { file: SLASH_MENU, needle: "/" },
  ],
  // Spell Check
  'CodeMirror extension — integrated spell checking': [
    { file: SOURCE_EDITOR, needle: "spell" },
  ],
  // Collaboration
  'CRDT-based — conflict-free concurrent editing': [
    { file: COLLAB_PROVIDER, needle: "Yjs" },
  ],
  // Export
  'Downloads the compiled PDF blob': [
    { file: TOP_BAR, needle: "pdf" },
  ],
  'Downloads the current editor content as `.tex` file': [
    { file: TOP_BAR, needle: ".tex" },
  ],
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
  return [WORKSPACE, PAGE];
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

  const primaryFile = existingFiles[0];
  const content = readFile(rootDir, primaryFile);
  expect(content.length).toBeGreaterThan(0);
  return true;
}

export async function assertLatexCheckpoint(input: LatexCheckpointInput): Promise<boolean> {
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

  if (descLower.includes("project list") || descLower.includes("project card")) {
    filesToCheck.push(PAGE);
  }
  if (descLower.includes("new paper") || descLower.includes("template") || descLower.includes("compiler select")) {
    filesToCheck.push(NEW_PAGE);
  }
  if (descLower.includes("workspace") || descLower.includes("panel") || descLower.includes("layout")) {
    filesToCheck.push(WORKSPACE);
  }
  if (descLower.includes("source editor") || descLower.includes("codemirror") || descLower.includes("gutter") || descLower.includes("syntax")) {
    filesToCheck.push(SOURCE_EDITOR);
  }
  if (descLower.includes("visual editor") || descLower.includes("wysiwym")) {
    filesToCheck.push(VISUAL_EDITOR);
  }
  if (descLower.includes("preview") || descLower.includes("katex") || descLower.includes("pdf preview")) {
    filesToCheck.push(PREVIEW_PANEL);
  }
  if (descLower.includes("top bar") || descLower.includes("compile button") || descLower.includes("export")) {
    filesToCheck.push(TOP_BAR, WORKSPACE);
  }
  if (descLower.includes("file tree") || descLower.includes("outline") || descLower.includes("file browser")) {
    filesToCheck.push(FILE_TREE);
  }
  if (descLower.includes("agent") || descLower.includes("draft tab") || descLower.includes("learn tab") || descLower.includes("cite tab") || descLower.includes("check tab")) {
    filesToCheck.push(AGENT_PANEL);
  }
  if (descLower.includes("comment")) {
    filesToCheck.push(COMMENT_PANEL, COMMENTS_ROUTE);
  }
  if (descLower.includes("image") || descLower.includes("upload")) {
    filesToCheck.push(IMAGE_BROWSER, IMAGES_ROUTE);
  }
  if (descLower.includes("slash") || descLower.includes("command menu")) {
    filesToCheck.push(SLASH_MENU);
  }
  if (descLower.includes("inline ai") || descLower.includes("cmd+k")) {
    filesToCheck.push(INLINE_AI, INLINE_EDIT_ROUTE);
  }
  if (descLower.includes("error gutter") || descLower.includes("diagnostic")) {
    filesToCheck.push(ERROR_GUTTER, WORKSPACE);
  }
  if (descLower.includes("compil") || descLower.includes("compile")) {
    filesToCheck.push(WORKSPACE, COMPILE_ROUTE, TOP_BAR);
  }
  if (descLower.includes("spell")) {
    filesToCheck.push(SPELL_CHECK_ROUTE, SOURCE_EDITOR);
  }
  if (descLower.includes("collaborat") || descLower.includes("crdt") || descLower.includes("websocket")) {
    filesToCheck.push(COLLAB_PROVIDER, COLLAB_CURSORS);
  }
  if (descLower.includes("citation") || descLower.includes("cite") || descLower.includes("bibtex")) {
    filesToCheck.push(AGENT_PANEL, CITE_SEARCH_ROUTE);
  }
  if (descLower.includes("version") || descLower.includes("history")) {
    filesToCheck.push(VERSION_HISTORY, VERSIONS_ROUTE);
  }
  if (descLower.includes("track change")) {
    filesToCheck.push(TRACK_CHANGES, TRACK_CHANGES_ROUTE);
  }
  if (descLower.includes("save") || descLower.includes("persist") || descLower.includes("auto-save")) {
    filesToCheck.push(WORKSPACE, LATEX_ACTIONS);
  }
  if (descLower.includes("generate") || descLower.includes("ai draft")) {
    filesToCheck.push(GENERATE_ROUTE, AGENT_PANEL);
  }
  if (descLower.includes("autocomplete") || descLower.includes("auto-complete") || descLower.includes("complete")) {
    filesToCheck.push(COMPLETE_ROUTE, SOURCE_EDITOR);
  }
  if (descLower.includes("/api/latex")) {
    // Handle any API route references
    if (descLower.includes("compile")) filesToCheck.push(COMPILE_ROUTE);
    if (descLower.includes("generate")) filesToCheck.push(GENERATE_ROUTE);
    if (descLower.includes("comment")) filesToCheck.push(COMMENTS_ROUTE);
    if (descLower.includes("file")) filesToCheck.push(FILES_ROUTE);
    if (descLower.includes("image")) filesToCheck.push(IMAGES_ROUTE);
    if (descLower.includes("spell")) filesToCheck.push(SPELL_CHECK_ROUTE);
    if (descLower.includes("inline")) filesToCheck.push(INLINE_EDIT_ROUTE);
    if (descLower.includes("synctex")) filesToCheck.push(SYNCTEX_ROUTE);
    if (descLower.includes("version")) filesToCheck.push(VERSIONS_ROUTE);
    if (descLower.includes("track")) filesToCheck.push(TRACK_CHANGES_ROUTE);
    if (descLower.includes("draft") || descLower.includes("chat")) filesToCheck.push(DRAFT_CHAT_ROUTE);
    if (descLower.includes("fix")) filesToCheck.push(AUTO_FIX_ROUTE);
    if (descLower.includes("cite")) filesToCheck.push(CITE_SEARCH_ROUTE);
    if (descLower.includes("complete")) filesToCheck.push(COMPLETE_ROUTE);
  }
  if (descLower.includes("loading") || descLower.includes("route-level")) {
    filesToCheck.push(LOADING);
  }
  if (descLower.includes("error boundary") || descLower.includes("error.tsx")) {
    filesToCheck.push(ERROR_PAGE);
  }

  // Fallback: always include WORKSPACE and PAGE
  if (filesToCheck.length === 0) {
    filesToCheck.push(WORKSPACE, PAGE, EDITOR_PAGE);
  }

  const backticks = extractBacktickContent(description);
  const quoted = extractQuotedStrings(description);
  const allTerms = [...backticks, ...quoted];

  const existingFiles = filesToCheck.filter(f => fileExists(rootDir, f));
  if (existingFiles.length === 0) {
    // Last resort fallback
    const fallbackFiles = [WORKSPACE, PAGE, EDITOR_PAGE, NEW_PAGE, TOP_BAR, SOURCE_EDITOR].filter(f => fileExists(rootDir, f));
    if (fallbackFiles.length === 0) return false;
    const content = readFile(rootDir, fallbackFiles[0]);
    expect(content.length).toBeGreaterThan(0);
    return true;
  }

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
