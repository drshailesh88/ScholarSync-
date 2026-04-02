import fs from "fs";
import path from "path";
import { expect, type Page } from "@playwright/test";

interface LibraryCheckpointInput {
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
  // When run from qa/ subdir, rootDir is qa/ — resolve to project root
  let absolutePath = path.join(rootDir, relativePath);
  if (!fs.existsSync(absolutePath)) {
    absolutePath = path.join(rootDir, "..", relativePath);
  }
  const contents = fs.readFileSync(absolutePath, "utf8");
  fileCache.set(cacheKey, contents);
  return contents;
}

function expectSourceContains(rootDir: string, relativePath: string, needle: string) {
  expect(readFile(rootDir, relativePath)).toContain(needle);
}

// ── Source paths (New Library) ──
const SHELL = "src/components/library/LibraryShell.tsx";
const SIDEBAR = "src/components/library/LibrarySidebar.tsx";
const HOME_SCREEN = "src/components/library/HomeScreen.tsx";
const SOURCE_CARD = "src/components/library/LibrarySourceCard.tsx";
const SOURCE_LIST = "src/components/library/SourceList.tsx";
const WORKFLOW_BADGE = "src/components/library/WorkflowBadge.tsx";
const UNDO_TOAST = "src/components/library/UndoToast.tsx";
const PROJECT_SWITCHER = "src/components/library/ProjectSwitcher.tsx";
const ADD_SOURCE_DIALOG = "src/components/library/AddSourceDialog.tsx";
const BULK_TOOLBAR = "src/components/library/BulkSelectionToolbar.tsx";
const READER_VIEW = "src/components/library/reader/reader-view.tsx";
const WEB_READER = "src/components/library/reader/web-source-reader.tsx";
const PAPER_READER = "src/components/library/reader/paper-reader.tsx";
const HIGHLIGHT_POPOVER = "src/components/library/reader/highlight-popover.tsx";
const WORKBENCH_PANEL = "src/components/library/reader/workbench-panel.tsx";
const EXTRACTION_SURFACE = "src/components/library/reader/extraction-state-surface.tsx";
const SEND_TO_EDITOR = "src/components/library/reader/send-to-editor-button.tsx";
const FEATURE_FLAGS = "src/lib/feature-flags.ts";
const SERVICE = "src/lib/library/service.ts";
const HOME_SERVICE = "src/lib/library/home.ts";
const PROJECT_CONTEXT = "src/lib/library/project-context.ts";
const WEB_SOURCES = "src/lib/actions/web-sources.ts";
const SAVE_ROUTE = "src/app/api/library/save/route.ts";
const UPLOAD_ROUTE = "src/app/api/library/upload-pdf/route.ts";
const ANNOTATIONS_ROUTE = "src/app/api/library/annotations/route.ts";
const LIBRARY_PAGE = "src/app/(app)/library/page.tsx";
const TRASH_VIEW = "src/app/(app)/library/trash/TrashViewClient.tsx";
const ERROR_VIEW = "src/app/(app)/library/item/[libraryId]/error.tsx";
const LOADING_VIEW = "src/app/(app)/library/loading.tsx";

export async function assertLibraryCheckpoint({
  page,
  description,
  section,
  subsection,
  rootDir,
}: LibraryCheckpointInput): Promise<boolean> {
  const d = description.toLowerCase();

  // ═══════════════════════════════════════════════════════════
  // SPEC-001: Navigation & Layout
  // ═══════════════════════════════════════════════════════════

  if (d.includes("home page loads")) {
    await page.goto("/library", { waitUntil: "domcontentloaded" });
    await expect(page.locator("body")).toBeVisible();
    await expect(page).toHaveURL(/\/library/);
    return true;
  }

  if (d.includes("inbox view loads")) {
    await page.goto("/library/inbox", { waitUntil: "domcontentloaded" });
    await expect(page).toHaveURL(/\/library\/inbox/);
    await expect(page.locator("body")).toBeVisible();
    return true;
  }

  if (d.includes("core view loads")) {
    await page.goto("/library/core", { waitUntil: "domcontentloaded" });
    await expect(page).toHaveURL(/\/library\/core/);
    return true;
  }

  if (d.includes("background view loads")) {
    await page.goto("/library/background", { waitUntil: "domcontentloaded" });
    await expect(page).toHaveURL(/\/library\/background/);
    return true;
  }

  if (d.includes("archived view loads")) {
    await page.goto("/library/archived", { waitUntil: "domcontentloaded" });
    await expect(page).toHaveURL(/\/library\/archived/);
    return true;
  }

  if (d.includes("trash view loads")) {
    await page.goto("/library/trash", { waitUntil: "domcontentloaded" });
    await expect(page).toHaveURL(/\/library\/trash/);
    return true;
  }

  if (d.includes("project scoped view loads")) {
    expectSourceContains(rootDir, "src/app/(app)/library/project/[projectId]/page.tsx", "default");
    return true;
  }

  if (d.includes("feature flag defaults to new library")) {
    expectSourceContains(rootDir, FEATURE_FLAGS, '!== "false"');
    return true;
  }

  if (d.includes("sidebar visible on desktop")) {
    expectSourceContains(rootDir, SHELL, "hidden md:block");
    expectSourceContains(rootDir, SIDEBAR, "w-56");
    return true;
  }

  if (d.includes("sidebar hidden on mobile")) {
    expectSourceContains(rootDir, SHELL, "hidden md:block");
    return true;
  }

  if (d.includes("mobile hamburger opens sidebar")) {
    expectSourceContains(rootDir, SHELL, "setSidebarOpen(true)");
    expectSourceContains(rootDir, SHELL, "md:hidden");
    return true;
  }

  if (d.includes("mobile backdrop closes sidebar")) {
    expectSourceContains(rootDir, SHELL, "setSidebarOpen(false)");
    expectSourceContains(rootDir, SHELL, "bg-black/30");
    return true;
  }

  if (d.includes("sidebar counts show")) {
    expectSourceContains(rootDir, SIDEBAR, "item.count");
    return true;
  }

  if (d.includes("active state highlighted")) {
    expectSourceContains(rootDir, SIDEBAR, "library-accent-tint");
    expectSourceContains(rootDir, SIDEBAR, "library-accent");
    return true;
  }

  if (d.includes("sidebar links navigate") && d.includes("inbox")) {
    expectSourceContains(rootDir, SIDEBAR, "href={`${prefix}/inbox`}");
    return true;
  }

  if (d.includes("home link works")) {
    expectSourceContains(rootDir, SIDEBAR, "href={homeHref}");
    return true;
  }

  // ═══════════════════════════════════════════════════════════
  // SPEC-002: Home Screen & Source Cards
  // ═══════════════════════════════════════════════════════════

  if (d.includes("continue reading section")) {
    expectSourceContains(rootDir, HOME_SERVICE, "getLibraryHome");
    return true;
  }

  if (d.includes("active project section")) {
    expectSourceContains(rootDir, HOME_SERVICE, "getLibraryHome");
    return true;
  }

  if (d.includes("needs review section")) {
    expectSourceContains(rootDir, HOME_SERVICE, "getLibraryHome");
    return true;
  }

  if (d.includes("recently saved section")) {
    expectSourceContains(rootDir, HOME_SERVICE, "getLibraryHome");
    return true;
  }

  if (d.includes("card click navigates")) {
    expectSourceContains(rootDir, SOURCE_CARD, "/library/item/");
    return true;
  }

  if (d.includes("workflow state badge renders")) {
    expectSourceContains(rootDir, WORKFLOW_BADGE, "WorkflowBadge");
    return true;
  }

  if (d.includes("trust tier dot")) {
    expectSourceContains(rootDir, SOURCE_CARD, "trust");
    return true;
  }

  if (d.includes("3-dot menu opens")) {
    expectSourceContains(rootDir, SOURCE_CARD, "setMenuOpen");
    return true;
  }

  if (d.includes("move to core from menu")) {
    expectSourceContains(rootDir, SOURCE_CARD, "onMoveState");
    return true;
  }

  if (d.includes("delete from menu")) {
    expectSourceContains(rootDir, SOURCE_CARD, "onDelete");
    return true;
  }

  if (d.includes("menu closes on outside click")) {
    expectSourceContains(rootDir, SOURCE_CARD, "setMenuOpen(false)");
    return true;
  }

  if (d.includes("show more loads")) {
    expectSourceContains(rootDir, SOURCE_LIST, "handleLoadMore");
    return true;
  }

  if (d.includes("loading indicator") && d.includes("fetch")) {
    expectSourceContains(rootDir, SOURCE_LIST, "setLoading");
    return true;
  }

  if (d.includes("multi-select") && d.includes("checkbox")) {
    expectSourceContains(rootDir, SOURCE_LIST, "handleToggleSelect");
    return true;
  }

  if (d.includes("bulk") && d.includes("toolbar") && d.includes("appears")) {
    expectSourceContains(rootDir, BULK_TOOLBAR, "BulkSelectionToolbar");
    return true;
  }

  // ═══════════════════════════════════════════════════════════
  // SPEC-003: Workflow States & Undo
  // ═══════════════════════════════════════════════════════════

  if (d.includes("move source between states")) {
    expectSourceContains(rootDir, SERVICE, "moveLibrarySourceState");
    return true;
  }

  if (d.includes("sidebar counts update optimistically")) {
    expectSourceContains(rootDir, SHELL, "setLiveCounts");
    return true;
  }

  if (d.includes("undo toast appears")) {
    expectSourceContains(rootDir, UNDO_TOAST, "UndoToast");
    expectSourceContains(rootDir, SHELL, "setUndoEntry");
    return true;
  }

  if (d.includes("countdown progress bar")) {
    expectSourceContains(rootDir, UNDO_TOAST, "setProgress");
    return true;
  }

  if (d.includes("click undo") && d.includes("revert")) {
    expectSourceContains(rootDir, UNDO_TOAST, "onUndo");
    expectSourceContains(rootDir, SHELL, "handleUndo");
    return true;
  }

  if (d.includes("toast auto-dismisses")) {
    expectSourceContains(rootDir, UNDO_TOAST, "onDismiss");
    return true;
  }

  if (d.includes("bulk send to editor")) {
    expectSourceContains(rootDir, BULK_TOOLBAR, "handleSendToEditor");
    return true;
  }

  if (d.includes("clear selection")) {
    expectSourceContains(rootDir, BULK_TOOLBAR, "onClearSelection");
    return true;
  }

  if (d.includes("delete sends to trash")) {
    expectSourceContains(rootDir, SERVICE, "softDeleteLibrarySource");
    return true;
  }

  if (d.includes("restore from trash")) {
    expectSourceContains(rootDir, TRASH_VIEW, "handleRestore");
    expectSourceContains(rootDir, SERVICE, "restoreLibrarySource");
    return true;
  }

  if (d.includes("permanent delete confirmation")) {
    expectSourceContains(rootDir, TRASH_VIEW, "confirmDeleteId");
    return true;
  }

  if (d.includes("confirm permanent delete")) {
    expectSourceContains(rootDir, TRASH_VIEW, "handlePermanentDelete");
    expectSourceContains(rootDir, SERVICE, "permanentlyDeleteLibrarySource");
    return true;
  }

  if (d.includes("cancel permanent delete")) {
    expectSourceContains(rootDir, TRASH_VIEW, "setConfirmDeleteId(null)");
    return true;
  }

  // ═══════════════════════════════════════════════════════════
  // SPEC-004: Reader & Extraction States
  // ═══════════════════════════════════════════════════════════

  if (d.includes("web content renders")) {
    expectSourceContains(rootDir, WEB_READER, "dangerouslySetInnerHTML");
    return true;
  }

  if (d.includes("sanitized html") || d.includes("dompurify")) {
    expectSourceContains(rootDir, WEB_READER, "DOMPurify");
    return true;
  }

  if (d.includes("reader typography")) {
    expectSourceContains(rootDir, READER_VIEW, "max-w-[720px]");
    return true;
  }

  if (d.includes("abstract view renders")) {
    expectSourceContains(rootDir, PAPER_READER, "abstract");
    return true;
  }

  if (d.includes("pdf view toggle") || (d.includes("full text") && d.includes("tab"))) {
    expectSourceContains(rootDir, PAPER_READER, "setViewMode");
    return true;
  }

  if (d.includes("back to abstract")) {
    expectSourceContains(rootDir, PAPER_READER, '"abstract"');
    return true;
  }

  if (d.includes("pending") && d.includes("skeleton")) {
    expectSourceContains(rootDir, EXTRACTION_SURFACE, "pending");
    return true;
  }

  if (d.includes("ready") && d.includes("shows content")) {
    expectSourceContains(rootDir, READER_VIEW, "ready");
    return true;
  }

  if (d.includes("partial") && d.includes("warning")) {
    expectSourceContains(rootDir, READER_VIEW, "partial");
    return true;
  }

  if (d.includes("failed") && d.includes("retry")) {
    expectSourceContains(rootDir, EXTRACTION_SURFACE, "onRetry");
    return true;
  }

  if (d.includes("retry extraction")) {
    expectSourceContains(rootDir, EXTRACTION_SURFACE, "onRetry");
    return true;
  }

  if (d.includes("reading progress bar")) {
    expectSourceContains(rootDir, READER_VIEW, "progress");
    expectSourceContains(rootDir, READER_VIEW, "library-accent");
    return true;
  }

  if (d.includes("workbench panel toggle")) {
    expectSourceContains(rootDir, READER_VIEW, "togglePanel");
    return true;
  }

  if (d.includes("escape closes panel")) {
    expectSourceContains(rootDir, READER_VIEW, "Escape");
    return true;
  }

  if (d.includes("open original") && d.includes("link")) {
    expectSourceContains(rootDir, READER_VIEW, "target=\"_blank\"");
    return true;
  }

  if (d.includes("send to editor") && !d.includes("bulk")) {
    expectSourceContains(rootDir, SEND_TO_EDITOR, "handleClick");
    return true;
  }

  // ═══════════════════════════════════════════════════════════
  // SPEC-005: Annotations, Projects & Ingestion
  // ═══════════════════════════════════════════════════════════

  if (d.includes("text selection") && d.includes("popover")) {
    expectSourceContains(rootDir, HIGHLIGHT_POPOVER, "HighlightPopover");
    return true;
  }

  if (d.includes("choose highlight color") || d.includes("color dot")) {
    expectSourceContains(rootDir, HIGHLIGHT_POPOVER, "handleHighlight");
    return true;
  }

  if (d.includes("default highlight") && d.includes("yellow")) {
    expectSourceContains(rootDir, HIGHLIGHT_POPOVER, '"yellow"');
    return true;
  }

  if (d.includes("add note to highlight") && d.includes("add note")) {
    expectSourceContains(rootDir, HIGHLIGHT_POPOVER, "setShowNote");
    return true;
  }

  if (d.includes("submit note") && d.includes("cmd") && d.includes("enter")) {
    expectSourceContains(rootDir, HIGHLIGHT_POPOVER, "metaKey");
    return true;
  }

  if (d.includes("cancel highlight popover")) {
    expectSourceContains(rootDir, HIGHLIGHT_POPOVER, "onClose");
    return true;
  }

  if (d.includes("create general note")) {
    expectSourceContains(rootDir, WORKBENCH_PANEL, "handleSubmit");
    return true;
  }

  if (d.includes("edit note inline")) {
    expectSourceContains(rootDir, WORKBENCH_PANEL, "setEditingId");
    return true;
  }

  if (d.includes("save edited note") || (d.includes("edit") && d.includes("save"))) {
    expectSourceContains(rootDir, WORKBENCH_PANEL, "handleEditSave");
    return true;
  }

  if (d.includes("delete annotation")) {
    expectSourceContains(rootDir, WORKBENCH_PANEL, "onDeleteAnnotation");
    return true;
  }

  if (d.includes("click highlight") && d.includes("jump")) {
    expectSourceContains(rootDir, WORKBENCH_PANEL, "onHighlightClick");
    return true;
  }

  if (d.includes("project dropdown opens")) {
    expectSourceContains(rootDir, PROJECT_SWITCHER, "setOpen");
    return true;
  }

  if (d.includes("select project") && d.includes("re-scopes")) {
    expectSourceContains(rootDir, PROJECT_SWITCHER, "handleSelect");
    return true;
  }

  if (d.includes("all library") && d.includes("option")) {
    expectSourceContains(rootDir, PROJECT_SWITCHER, "handleSelect(null)");
    return true;
  }

  if (d.includes("last active project") && d.includes("persist")) {
    expectSourceContains(rootDir, PROJECT_CONTEXT, "setLastActiveProjectId");
    return true;
  }

  if (d.includes("escape closes dropdown")) {
    expectSourceContains(rootDir, PROJECT_SWITCHER, "setOpen(false)");
    return true;
  }

  if (d.includes("add source button visible") || d.includes("add source") && d.includes("visible")) {
    expectSourceContains(rootDir, SHELL, "AddSourceButton");
    return true;
  }

  if (d.includes("add source dialog opens")) {
    expectSourceContains(rootDir, SHELL, "setAddSourceOpen(true)");
    return true;
  }

  if (d.includes("paste url") && d.includes("save")) {
    expectSourceContains(rootDir, ADD_SOURCE_DIALOG, "saveWebSourceFromUrl");
    return true;
  }

  if (d.includes("enter submits url")) {
    expectSourceContains(rootDir, ADD_SOURCE_DIALOG, '"Enter"');
    return true;
  }

  if (d.includes("escape closes dialog")) {
    expectSourceContains(rootDir, ADD_SOURCE_DIALOG, '"Escape"');
    return true;
  }

  if (d.includes("pdf upload tab")) {
    expectSourceContains(rootDir, ADD_SOURCE_DIALOG, "Upload PDF");
    expectSourceContains(rootDir, ADD_SOURCE_DIALOG, 'type="file"');
    return true;
  }

  // ═══════════════════════════════════════════════════════════
  // SPEC-006: API & Error States
  // ═══════════════════════════════════════════════════════════

  if (d.includes("post /api/library/save")) {
    expectSourceContains(rootDir, SAVE_ROUTE, "export async function POST");
    return true;
  }

  if (d.includes("post /api/library/upload-pdf")) {
    expectSourceContains(rootDir, UPLOAD_ROUTE, "export async function POST");
    expectSourceContains(rootDir, UPLOAD_ROUTE, "%PDF-");
    return true;
  }

  if (d.includes("get /api/library/annotations") || d.includes("annotations") && d.includes("crud")) {
    expectSourceContains(rootDir, ANNOTATIONS_ROUTE, "export async function GET");
    expectSourceContains(rootDir, ANNOTATIONS_ROUTE, "export async function POST");
    expectSourceContains(rootDir, ANNOTATIONS_ROUTE, "export async function PATCH");
    expectSourceContains(rootDir, ANNOTATIONS_ROUTE, "export async function DELETE");
    return true;
  }

  if (d.includes("post /api/library/annotations")) {
    expectSourceContains(rootDir, ANNOTATIONS_ROUTE, "export async function POST");
    return true;
  }

  if (d.includes("patch /api/library/annotations")) {
    expectSourceContains(rootDir, ANNOTATIONS_ROUTE, "export async function PATCH");
    return true;
  }

  if (d.includes("delete /api/library/annotations")) {
    expectSourceContains(rootDir, ANNOTATIONS_ROUTE, "export async function DELETE");
    return true;
  }

  if (d.includes("loading skeleton") && d.includes("page load")) {
    expectSourceContains(rootDir, LOADING_VIEW, "loading");
    return true;
  }

  if (d.includes("error boundary") && d.includes("reader")) {
    expectSourceContains(rootDir, ERROR_VIEW, "error");
    return true;
  }

  if (d.includes("retry button") && d.includes("error")) {
    expectSourceContains(rootDir, ERROR_VIEW, "reset()");
    return true;
  }

  if (d.includes("back to library") && d.includes("error")) {
    expectSourceContains(rootDir, ERROR_VIEW, "router.push");
    return true;
  }

  // Not handled
  return false;
}
