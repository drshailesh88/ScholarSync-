import fs from "fs";
import path from "path";
import { expect, type Page } from "@playwright/test";

interface SystematicReviewCheckpointInput {
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
const HUB_PAGE = "src/app/(app)/systematic-review/page.tsx";
const WORKFLOW_PAGE = "src/app/(app)/systematic-review/[projectId]/page.tsx";
const _HUB_LOADING = "src/app/(app)/systematic-review/loading.tsx";
const _HUB_ERROR = "src/app/(app)/systematic-review/error.tsx";
const _WORKFLOW_LOADING = "src/app/(app)/systematic-review/[projectId]/loading.tsx";
const _WORKFLOW_ERROR = "src/app/(app)/systematic-review/[projectId]/error.tsx";

// Components
const SEARCH_STRATEGY = "src/components/systematic-review/SearchStrategyPanel.tsx";
const PAPER_IMPORT = "src/components/systematic-review/PaperImportPanel.tsx";
const _SCREENING = "src/components/systematic-review/ScreeningPanel.tsx";
const _SCREENING_PDF = "src/components/systematic-review/ScreeningPDFViewer.tsx";
const _PRISMA_FLOW = "src/components/systematic-review/PRISMAFlowPanel.tsx";
const _PRISMA_CHECKLIST = "src/components/systematic-review/PRISMAChecklistPanel.tsx";
const _UNIFIED_ROB = "src/components/systematic-review/UnifiedRoBPanel.tsx";
const _ROB2 = "src/components/systematic-review/RoB2Panel.tsx";
const _ROBINS_I = "src/components/systematic-review/ROBINSIPanel.tsx";
const _QUADAS2 = "src/components/systematic-review/QUADAS2Panel.tsx";
const _DATA_EXTRACTION = "src/components/systematic-review/DataExtractionPanel.tsx";
const _META_ANALYSIS = "src/components/systematic-review/MetaAnalysisPanel.tsx";
const _NMA_PANEL = "src/components/systematic-review/NMAPanel.tsx";
const _GRADE_PANEL = "src/components/systematic-review/GRADEPanel.tsx";
const _MANUSCRIPT = "src/components/systematic-review/ManuscriptPanel.tsx";
const _SNOWBALLING = "src/components/systematic-review/SnowballingPanel.tsx";
const _IMPORT_EXPORT = "src/components/systematic-review/ImportExportPanel.tsx";
const _LIVING_REVIEW = "src/components/systematic-review/LivingReviewPanel.tsx";
const _PROTOCOL = "src/components/systematic-review/ProtocolPanel.tsx";
const _PROSPERO_EXPORT = "src/components/systematic-review/PROSPEROExport.tsx";
const PROJECT_HEADER = "src/components/systematic-review/ProjectHeader.tsx";
const COLLABORATOR_PRESENCE = "src/components/systematic-review/CollaboratorPresence.tsx";
const _ACTIVITY_FEED = "src/components/systematic-review/ActivityFeed.tsx";
const _FOREST_PLOT = "src/components/systematic-review/ForestPlot.tsx";
const _FUNNEL_PLOT = "src/components/systematic-review/FunnelPlot.tsx";
const _NETWORK_PLOT = "src/components/systematic-review/NetworkPlot.tsx";
const _LEAGUE_TABLE = "src/components/systematic-review/LeagueTable.tsx";
const _NMA_FOREST_PLOT = "src/components/systematic-review/NMAForestPlot.tsx";

// Store & config
const STORE = "src/stores/systematic-review-store.ts";
const _SR_CONFIG = "src/lib/liveblocks/sr-config.ts";
const _COLLAB_HOOK = "src/hooks/use-collaborative-review.ts";

// API routes
const _API_CONFIG = "src/app/api/systematic-review/config/route.ts";
const _API_PROJECTS = "src/app/api/systematic-review/projects/route.ts";
const _API_SEARCH_STRATEGY = "src/app/api/systematic-review/search-strategy/route.ts";
const API_IMPORT = "src/app/api/systematic-review/import/route.ts";
const API_IMPORT_REFS = "src/app/api/systematic-review/import-references/route.ts";
const _API_SCREEN = "src/app/api/systematic-review/screen/route.ts";
const _API_SCREENING_QUEUE = "src/app/api/systematic-review/screening-queue/route.ts";
const _API_SCREENING_CRITERIA = "src/app/api/systematic-review/screening-criteria/route.ts";
const _API_PRISMA_FLOW = "src/app/api/systematic-review/prisma-flow/route.ts";
const _API_PRISMA_CHECKLIST = "src/app/api/systematic-review/prisma-checklist/route.ts";
const _API_ROB2 = "src/app/api/systematic-review/rob2/route.ts";
const _API_ROBINS_I = "src/app/api/systematic-review/robins-i/route.ts";
const _API_QUADAS2 = "src/app/api/systematic-review/quadas2/route.ts";
const _API_EXTRACT = "src/app/api/systematic-review/extract/route.ts";
const _API_META_ANALYSIS = "src/app/api/systematic-review/meta-analysis/route.ts";
const _API_NMA = "src/app/api/systematic-review/nma/route.ts";
const _API_GRADE = "src/app/api/systematic-review/grade/route.ts";
const _API_MANUSCRIPT = "src/app/api/systematic-review/manuscript/route.ts";
const _API_MANUSCRIPT_EXPORT = "src/app/api/systematic-review/manuscript-export/route.ts";
const _API_SNOWBALL = "src/app/api/systematic-review/snowball/route.ts";
const _API_EXPORT_REFS = "src/app/api/systematic-review/export-references/route.ts";
const _API_PROTOCOL = "src/app/api/systematic-review/protocol/route.ts";
const _API_PROSPERO = "src/app/api/systematic-review/prospero/route.ts";
const _API_ALERTS = "src/app/api/systematic-review/alerts/route.ts";
const API_COLLABORATORS = "src/app/api/systematic-review/collaborators/route.ts";
const _API_UPLOAD = "src/app/api/systematic-review/upload/route.ts";
const _API_PDF_RETRIEVAL = "src/app/api/systematic-review/pdf-retrieval/route.ts";
const _API_REVMAN = "src/app/api/systematic-review/revman-export/route.ts";
const _API_PRESS = "src/app/api/systematic-review/press/route.ts";

export async function assertSystematicReviewCheckpoint(
  input: SystematicReviewCheckpointInput
): Promise<boolean> {
  const { page: _page, description, section: _section, subsection: _subsection, rootDir } = input;
  const d = description.toLowerCase();

  // ══════════════════════════════════════════════════════════════════════
  // Spec 001 — Hub Page: Header, Project List, Create Form, Project Cards
  // ══════════════════════════════════════════════════════════════════════

  // Hub header
  if (d.includes("flowarrow") && d.includes("icon")) {
    expectSourceContains(rootDir, HUB_PAGE, "FlowArrow");
    return true;
  }

  if (d.includes("systematic reviews") && d.includes("heading")) {
    expectSourceContains(rootDir, HUB_PAGE, "Systematic Reviews");
    return true;
  }

  if (d.includes("prisma 2020-compliant") && d.includes("description")) {
    expectSourceContains(rootDir, HUB_PAGE, "PRISMA 2020-compliant systematic review pipeline");
    return true;
  }

  // Project list
  if (d.includes("projects load") && d.includes("mount")) {
    expectSourceContains(rootDir, HUB_PAGE, "/api/systematic-review/projects");
    return true;
  }

  if (d.includes("loading state") && d.includes("spinner") && !d.includes("text")) {
    expectSourceContains(rootDir, HUB_PAGE, "CircleNotch");
    expectSourceContains(rootDir, HUB_PAGE, "animate-spin");
    return true;
  }

  if (d.includes("empty state") && d.includes("no systematic reviews yet")) {
    expectSourceContains(rootDir, HUB_PAGE, "No systematic reviews yet");
    return true;
  }

  if (d.includes("empty-state") && d.includes("cta") && d.includes("create your first review")) {
    expectSourceContains(rootDir, HUB_PAGE, "Create Your First Review");
    return true;
  }

  if (d.includes("empty-state") && d.includes("ai help") && d.includes("meta-analysis")) {
    expectSourceContains(rootDir, HUB_PAGE, "from search strategy to");
    expectSourceContains(rootDir, HUB_PAGE, "meta-analysis");
    return true;
  }

  if (d.includes("grid layout") && d.includes("responsive")) {
    expectSourceContains(rootDir, HUB_PAGE, "grid-cols-1 md:grid-cols-2 lg:grid-cols-3");
    return true;
  }

  // New Review button
  if (d.includes("new review") && d.includes("button") && d.includes("label")) {
    expectSourceContains(rootDir, HUB_PAGE, "New Review");
    return true;
  }

  if (d.includes("plus") && d.includes("icon") && d.includes("button") && !d.includes("criterion")) {
    expectSourceContains(rootDir, HUB_PAGE, "Plus");
    return true;
  }

  if (d.includes("click action") && d.includes("toggles") && d.includes("create form")) {
    expectSourceContains(rootDir, HUB_PAGE, "setShowCreate(true)");
    return true;
  }

  // Create form
  if (d.includes("title input") && d.includes("text input") && d.includes("review title")) {
    expectSourceContains(rootDir, HUB_PAGE, "newTitle");
    return true;
  }

  if (d.includes("placeholder") && d.includes("metformin vs sulfonylureas")) {
    expectSourceContains(rootDir, HUB_PAGE, "Metformin vs Sulfonylureas for T2DM: A Systematic Review");
    return true;
  }

  if (d.includes("create review") && d.includes("button") && d.includes("submits")) {
    expectSourceContains(rootDir, HUB_PAGE, "Create Review");
    expectSourceContains(rootDir, HUB_PAGE, "createProject");
    return true;
  }

  if (d.includes("spinner") && d.includes("circlenotch") && d.includes("submission")) {
    expectSourceContains(rootDir, HUB_PAGE, "CircleNotch");
    expectSourceContains(rootDir, HUB_PAGE, "animate-spin");
    return true;
  }

  if (d.includes("cancel") && d.includes("button") && d.includes("hides") && d.includes("create form")) {
    expectSourceContains(rootDir, HUB_PAGE, "Cancel");
    expectSourceContains(rootDir, HUB_PAGE, "setShowCreate(false)");
    expectSourceContains(rootDir, HUB_PAGE, 'setNewTitle("")');
    return true;
  }

  if (d.includes("validation") && d.includes("empty title") && d.includes("cannot be submitted")) {
    expectSourceContains(rootDir, HUB_PAGE, "!newTitle.trim()");
    return true;
  }

  if (d.includes("api call") && d.includes("post") && d.includes("/api/systematic-review/config")) {
    expectSourceContains(rootDir, HUB_PAGE, "/api/systematic-review/config");
    return true;
  }

  if (d.includes("new systematic review") && d.includes("heading") && d.includes("form")) {
    expectSourceContains(rootDir, HUB_PAGE, "New Systematic Review");
    return true;
  }

  if (d.includes("review title") && d.includes("label") && d.includes("required") && d.includes("badge")) {
    expectSourceContains(rootDir, HUB_PAGE, "Review Title");
    expectSourceContains(rootDir, HUB_PAGE, "Required");
    return true;
  }

  if (d.includes("helper text") && d.includes("pico") && d.includes("protocol") && d.includes("after opening")) {
    expectSourceContains(rootDir, HUB_PAGE, "full PICO and protocol once the review is open");
    return true;
  }

  if (d.includes("autofocus") && d.includes("title input")) {
    expectSourceContains(rootDir, HUB_PAGE, "autoFocus");
    return true;
  }

  if (d.includes("pressing enter") && d.includes("title input") && d.includes("create handler")) {
    expectSourceContains(rootDir, HUB_PAGE, 'e.key === "Enter"');
    expectSourceContains(rootDir, HUB_PAGE, "createProject");
    return true;
  }

  if (d.includes("create review") && d.includes("disabled") && d.includes("trimmed title is empty")) {
    expectSourceContains(rootDir, HUB_PAGE, "!newTitle.trim()");
    return true;
  }

  if (d.includes("failed to create project")) {
    expectSourceContains(rootDir, HUB_PAGE, "Failed to create project. Please try again.");
    return true;
  }

  if (d.includes("failed to load projects")) {
    expectSourceContains(rootDir, HUB_PAGE, "Failed to load projects. Please try again.");
    return true;
  }

  if (d.includes("error banner") && d.includes("close button") && d.includes("clears")) {
    expectSourceContains(rootDir, HUB_PAGE, "setError(null)");
    return true;
  }

  // Project cards
  if (d.includes("project card") && d.includes("title") && d.includes("line-clamp")) {
    expectSourceContains(rootDir, HUB_PAGE, "line-clamp-2");
    return true;
  }

  if (d.includes("arrowright") && d.includes("icon") && d.includes("card")) {
    expectSourceContains(rootDir, HUB_PAGE, "ArrowRight");
    return true;
  }

  if (d.includes("stage badge") && d.includes("color coding")) {
    expectSourceContains(rootDir, HUB_PAGE, "STAGE_LABELS");
    expectSourceContains(rootDir, HUB_PAGE, "STAGE_COLORS");
    return true;
  }

  if (d.includes("stage badge") && d.includes("fallback") && d.includes("raw") && d.includes("reviewstage")) {
    expectSourceContains(rootDir, HUB_PAGE, "project.reviewStage");
    return true;
  }

  if (d.includes("paper count") && d.includes("papers") && !d.includes("pill") && !d.includes("header")) {
    expectSourceContains(rootDir, HUB_PAGE, "project.paperCount");
    expectSourceContains(rootDir, HUB_PAGE, "papers");
    return true;
  }

  if (d.includes("screening-progress") && d.includes("renders only when") && d.includes("> 0")) {
    expectSourceContains(rootDir, HUB_PAGE, "screeningProgress > 0");
    return true;
  }

  if (d.includes("progress bar") && d.includes("papercount > 0")) {
    expectSourceContains(rootDir, HUB_PAGE, "project.paperCount > 0");
    return true;
  }

  if (d.includes("progress bar") && d.includes("inline width") && d.includes("screeningprogress")) {
    expectSourceContains(rootDir, HUB_PAGE, "screeningProgress");
    return true;
  }

  if (d.includes("hub cards link") && d.includes("systematic-review") && d.includes("link")) {
    expectSourceMatches(rootDir, HUB_PAGE, /href=.*\/systematic-review\/.*project\.id/);
    return true;
  }

  if (d.includes("group") && d.includes("hover") && d.includes("border color") && d.includes("title")) {
    expectSourceContains(rootDir, HUB_PAGE, "group");
    expectSourceContains(rootDir, HUB_PAGE, "group-hover:text-brand");
    return true;
  }

  if (d.includes("click") && d.includes("navigates") && d.includes("/systematic-review/")) {
    expectSourceMatches(rootDir, HUB_PAGE, /href=.*\/systematic-review\//);
    return true;
  }

  // ══════════════════════════════════════════════════════════════════════
  // Spec 002 — Workflow Page: Layout, Navigation, Collaboration, Stepper, Tabs
  // ══════════════════════════════════════════════════════════════════════

  // Workflow route loading / provider setup
  if (d.includes("non-numeric") && d.includes("projectid") && d.includes("null")) {
    expectSourceContains(rootDir, WORKFLOW_PAGE, "isNaN(projectId)");
    expectSourceContains(rootDir, WORKFLOW_PAGE, "return null");
    return true;
  }

  if (d.includes("liveblocks") && d.includes("room id") && d.includes("sr-project")) {
    expectSourceContains(rootDir, WORKFLOW_PAGE, "sr-project-");
    return true;
  }

  if (d.includes("sr room provider") && d.includes("initial presence")) {
    expectSourceContains(rootDir, WORKFLOW_PAGE, "initialPresence");
    expectSourceContains(rootDir, WORKFLOW_PAGE, 'userId: ""');
    expectSourceContains(rootDir, WORKFLOW_PAGE, "activeTab: null");
    expectSourceContains(rootDir, WORKFLOW_PAGE, "currentPaperId: null");
    return true;
  }

  if (d.includes("srroomProvider") || (d.includes("liveblocks") && d.includes("room provider"))) {
    expectSourceContains(rootDir, WORKFLOW_PAGE, "SRRoomProvider");
    return true;
  }

  // Workflow project loading
  if (d.includes("workflow") && d.includes("fetches") && d.includes("/api/systematic-review/config")) {
    expectSourceContains(rootDir, WORKFLOW_PAGE, "/api/systematic-review/config?projectId=");
    return true;
  }

  if (d.includes("404") && d.includes("config response") && d.includes("project not found")) {
    expectSourceContains(rootDir, WORKFLOW_PAGE, "Project not found");
    return true;
  }

  if (d.includes("generic") && d.includes("config-load failure") && d.includes("failed to load project")) {
    expectSourceContains(rootDir, WORKFLOW_PAGE, "Failed to load project");
    return true;
  }

  if (d.includes("back to reviews") && d.includes("link")) {
    expectSourceContains(rootDir, WORKFLOW_PAGE, "Back to Reviews");
    expectSourceContains(rootDir, WORKFLOW_PAGE, 'href="/systematic-review"');
    return true;
  }

  if (d.includes("all reviews") && d.includes("back link")) {
    expectSourceContains(rootDir, WORKFLOW_PAGE, "All Reviews");
    expectSourceContains(rootDir, WORKFLOW_PAGE, 'href="/systematic-review"');
    return true;
  }

  // Project header
  if (d.includes("subtitle") && d.includes("prisma 2020-compliant systematic review")) {
    expectSourceContains(rootDir, PROJECT_HEADER, "PRISMA 2020-compliant systematic review");
    return true;
  }

  if (d.includes("paper-count pill") && d.includes("header") && d.includes("papercount > 0")) {
    expectSourceContains(rootDir, PROJECT_HEADER, "paperCount > 0");
    return true;
  }

  // 7-stage stepper
  if (d.includes("stepper") && d.includes("label") && (d.includes("abbreviations") || d.includes("search"))) {
    expectSourceContains(rootDir, PROJECT_HEADER, '"Search"');
    expectSourceContains(rootDir, PROJECT_HEADER, '"Screening"');
    expectSourceContains(rootDir, PROJECT_HEADER, '"Full-Text"');
    expectSourceContains(rootDir, PROJECT_HEADER, '"Extraction"');
    expectSourceContains(rootDir, PROJECT_HEADER, '"RoB"');
    expectSourceContains(rootDir, PROJECT_HEADER, '"Meta-Analysis"');
    expectSourceContains(rootDir, PROJECT_HEADER, '"Reporting"');
    return true;
  }

  if (d.includes("7-stage stepper") || (d.includes("stage") && d.includes("stepper") && d.includes("progress"))) {
    expect(fileExists(rootDir, PROJECT_HEADER)).toBe(true);
    expectSourceContains(rootDir, PROJECT_HEADER, "currentStage");
    return true;
  }

  if (d.includes("active stage") && d.includes("visually highlighted")) {
    expectSourceContains(rootDir, PROJECT_HEADER, "currentIndex");
    return true;
  }

  // Tab system
  if (d.includes("workflow tab bar") && d.includes("tabs") && d.includes("text labels")) {
    expectSourceContains(rootDir, WORKFLOW_PAGE, "Tabs");
    expectSourceContains(rootDir, WORKFLOW_PAGE, "WORKFLOW_TABS");
    return true;
  }

  if (d.includes("active tab") && d.includes("default") && d.includes("strategy")) {
    expectSourceContains(rootDir, STORE, 'activeTab: "strategy"');
    return true;
  }

  if (d.includes("active tab") && d.includes("persists") && d.includes("scholarsync-systematic-review")) {
    expectSourceContains(rootDir, STORE, '"scholarsync-systematic-review"');
    return true;
  }

  if (d.includes("all 15 tabs") && d.includes("render")) {
    expectSourceContains(rootDir, WORKFLOW_PAGE, "WORKFLOW_TABS");
    return true;
  }

  if (d.includes("tab persistence") && d.includes("zustand")) {
    expectSourceContains(rootDir, STORE, "activeTab");
    expectSourceContains(rootDir, STORE, "persist");
    return true;
  }

  // Collaborator presence
  if (d.includes("collaboratorpresence") && d.includes("component")) {
    expect(fileExists(rootDir, COLLABORATOR_PRESENCE)).toBe(true);
    expectSourceContains(rootDir, WORKFLOW_PAGE, "CollaboratorPresence");
    return true;
  }

  if (d.includes("presence") && d.includes("activetab") && d.includes("updatepresence")) {
    expectSourceContains(rootDir, WORKFLOW_PAGE, "updatePresence({ activeTab })");
    return true;
  }

  if (d.includes("self tooltip") && d.includes("you")) {
    expectSourceContains(rootDir, COLLABORATOR_PRESENCE, '"You"');
    return true;
  }

  if (d.includes("collaborator tooltip") && d.includes("viewing:")) {
    expectSourceContains(rootDir, COLLABORATOR_PRESENCE, "Viewing:");
    return true;
  }

  if (d.includes("presence count badge") && d.includes("collaborators.length + 1")) {
    expectSourceContains(rootDir, COLLABORATOR_PRESENCE, "collaborators.length");
    return true;
  }

  if (d.includes("offline") && d.includes("compact state") && d.includes("disconnected")) {
    expectSourceContains(rootDir, COLLABORATOR_PRESENCE, "Offline");
    expectSourceContains(rootDir, COLLABORATOR_PRESENCE, "WifiSlash");
    return true;
  }

  if (d.includes("wifihigh") && d.includes("amber") && d.includes("not fully connected")) {
    expectSourceContains(rootDir, COLLABORATOR_PRESENCE, "WifiHigh");
    expectSourceContains(rootDir, COLLABORATOR_PRESENCE, "text-amber-500");
    return true;
  }

  if (d.includes("tab label map") && d.includes("nma") && d.includes("fallback")) {
    expect(readFile(rootDir, COLLABORATOR_PRESENCE)).not.toContain('"nma":');
    return true;
  }

  if (d.includes("collaborator") && d.includes("tooltip") && d.includes("paper #")) {
    expectSourceContains(rootDir, COLLABORATOR_PRESENCE, "Paper #");
    return true;
  }

  // Collaborator API
  if (d.includes("get /api/systematic-review/collaborators")) {
    expect(fileExists(rootDir, API_COLLABORATORS)).toBe(true);
    return true;
  }

  if (d.includes("post /api/systematic-review/collaborators")) {
    expect(fileExists(rootDir, API_COLLABORATORS)).toBe(true);
    return true;
  }

  if (d.includes("put /api/systematic-review/collaborators")) {
    expect(fileExists(rootDir, API_COLLABORATORS)).toBe(true);
    return true;
  }

  if (d.includes("delete /api/systematic-review/collaborators")) {
    expect(fileExists(rootDir, API_COLLABORATORS)).toBe(true);
    return true;
  }

  // ══════════════════════════════════════════════════════════════════════
  // Specs 002-003 — Search Strategy Panel
  // ══════════════════════════════════════════════════════════════════════

  if (d.includes("pico framework") && d.includes("heading")) {
    expectSourceContains(rootDir, SEARCH_STRATEGY, "PICO Framework");
    return true;
  }

  if (d.includes("search panel") && d.includes("mesh terms") && d.includes("boolean operators")) {
    expectSourceContains(rootDir, SEARCH_STRATEGY, "MeSH terms and Boolean operators");
    return true;
  }

  if (d.includes("population") && d.includes("field") && d.includes("required") && d.includes("asterisk")) {
    expectSourceContains(rootDir, SEARCH_STRATEGY, "population");
    return true;
  }

  if (d.includes("population") && d.includes("placeholder") && d.includes("adults with type 2 diabetes")) {
    expectSourceContains(rootDir, SEARCH_STRATEGY, "Adults with type 2 diabetes");
    return true;
  }

  if (d.includes("intervention") && d.includes("placeholder") && d.includes("metformin")) {
    expectSourceContains(rootDir, SEARCH_STRATEGY, "Metformin monotherapy");
    return true;
  }

  if (d.includes("comparison") && d.includes("placeholder") && d.includes("sulfonylurea")) {
    expectSourceContains(rootDir, SEARCH_STRATEGY, "Sulfonylurea monotherapy");
    return true;
  }

  if (d.includes("outcome") && d.includes("placeholder") && d.includes("hba1c")) {
    expectSourceContains(rootDir, SEARCH_STRATEGY, "HbA1c reduction at 12 months");
    return true;
  }

  if (d.includes("comparison") && d.includes("optional") && d.includes("no red asterisk")) {
    expectSourceContains(rootDir, SEARCH_STRATEGY, "comparison");
    return true;
  }

  if (d.includes("generate search strategy") && d.includes("button") && d.includes("disabled")) {
    expectSourceContains(rootDir, SEARCH_STRATEGY, "!pico.population");
    expectSourceContains(rootDir, SEARCH_STRATEGY, "!pico.intervention");
    expectSourceContains(rootDir, SEARCH_STRATEGY, "!pico.outcome");
    return true;
  }

  if (d.includes("generate search strategy") && d.includes("button") && d.includes("triggers")) {
    expectSourceContains(rootDir, SEARCH_STRATEGY, "/api/systematic-review/search-strategy");
    return true;
  }

  if (d.includes("search-strategy") && d.includes("generation failure")) {
    expectSourceContains(rootDir, SEARCH_STRATEGY, "Failed to generate search strategy. Please try again.");
    return true;
  }

  if (d.includes("generated-strategy") && d.includes("heading") && d.includes("generated search strategy")) {
    expectSourceContains(rootDir, SEARCH_STRATEGY, "Generated Search Strategy");
    return true;
  }

  if (d.includes("estimated pubmed results") && d.includes("tolocalestring")) {
    expectSourceContains(rootDir, SEARCH_STRATEGY, "toLocaleString");
    return true;
  }

  if (d.includes("mesh terms") && d.includes("[mesh]") && d.includes("chips")) {
    expectSourceContains(rootDir, SEARCH_STRATEGY, "[MeSH]");
    return true;
  }

  if (d.includes("full search string") && d.includes("pre") && d.includes("complete pubmed search string")) {
    expectSourceContains(rootDir, SEARCH_STRATEGY, "Complete PubMed Search String");
    return true;
  }

  if (d.includes("copy button") && d.includes("fullsearchstring")) {
    expectSourceContains(rootDir, SEARCH_STRATEGY, "fullSearchString");
    return true;
  }

  if (d.includes("suggested filters") && d.includes("non-empty")) {
    expectSourceContains(rootDir, SEARCH_STRATEGY, "suggestedFilters");
    return true;
  }

  if (d.includes("import papers using this strategy") && d.includes("cta")) {
    expectSourceContains(rootDir, SEARCH_STRATEGY, "Import Papers Using This Strategy");
    return true;
  }

  if (d.includes("cta") && d.includes("switches") && d.includes("active tab") && d.includes("import")) {
    expectSourceContains(rootDir, SEARCH_STRATEGY, "setActiveTab");
    expectSourceMatches(rootDir, SEARCH_STRATEGY, /setActiveTab.*import/);
    return true;
  }

  if (d.includes("pico") && d.includes("blocks") && d.includes("picoelement")) {
    expectSourceContains(rootDir, SEARCH_STRATEGY, "picoElement");
    return true;
  }

  // ══════════════════════════════════════════════════════════════════════
  // Specs 003/013-014 — Paper Import Panel
  // ══════════════════════════════════════════════════════════════════════

  if (d.includes("selected import sources") && d.includes("pubmed") && d.includes("default")) {
    expectSourceContains(rootDir, PAPER_IMPORT, '"pubmed"');
    return true;
  }

  if (d.includes("max results") && d.includes("default") && d.includes("100")) {
    expectSourceContains(rootDir, PAPER_IMPORT, "100");
    return true;
  }

  if (d.includes("generated-strategy") && d.includes("query banner") && d.includes("using generated pico")) {
    expectSourceContains(rootDir, PAPER_IMPORT, "Using generated PICO search strategy");
    return true;
  }

  if (d.includes("override") && d.includes("custom search string") && d.includes("placeholder")) {
    expectSourceContains(rootDir, PAPER_IMPORT, "Or override with custom search string...");
    return true;
  }

  if (d.includes("database source buttons") && d.includes("multi-select")) {
    expectSourceContains(rootDir, PAPER_IMPORT, "pubmed");
    return true;
  }

  if (d.includes("import button") && d.includes("label") && d.includes("importing...")) {
    expectSourceContains(rootDir, PAPER_IMPORT, "Importing...");
    expectSourceContains(rootDir, PAPER_IMPORT, "Import Papers");
    return true;
  }

  if (d.includes("import failure") && d.includes("failed to import papers")) {
    expectSourceContains(rootDir, PAPER_IMPORT, "Failed to import papers. Please try again.");
    return true;
  }

  if (d.includes("pdf upload") && d.includes("drop zone") && d.includes("drag")) {
    expectSourceContains(rootDir, PAPER_IMPORT, "Drag & drop PDF files here");
    return true;
  }

  if (d.includes("upload") && d.includes("accepts") && d.includes(".pdf")) {
    expectSourceContains(rootDir, PAPER_IMPORT, ".pdf");
    return true;
  }

  if (d.includes("upload progress") && d.includes("uploading...")) {
    expectSourceContains(rootDir, PAPER_IMPORT, "Uploading...");
    return true;
  }

  if (d.includes("refresh") && d.includes("label") && d.includes("refreshing...")) {
    expectSourceContains(rootDir, PAPER_IMPORT, "Refreshing...");
    return true;
  }

  if (d.includes("pdf badge") && d.includes("pdfstoragepath")) {
    expectSourceContains(rootDir, PAPER_IMPORT, "pdfStoragePath");
    return true;
  }

  if (d.includes("screening-decision badge") && d.includes("screeningdecision")) {
    expectSourceContains(rootDir, PAPER_IMPORT, "screeningDecision");
    return true;
  }

  if (d.includes("post /api/systematic-review/import-references") || d.includes("imports selected references")) {
    expect(fileExists(rootDir, API_IMPORT_REFS)).toBe(true);
    return true;
  }

  if (d.includes("post /api/systematic-review/import") && d.includes("papers from search databases")) {
    expect(fileExists(rootDir, API_IMPORT)).toBe(true);
    return true;
  }

  return false;
}
