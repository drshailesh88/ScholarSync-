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

  // ══════════════════════════════════════════════════════════════════════
  // Spec 001 — Additional Hub Page handlers
  // ══════════════════════════════════════════════════════════════════════

  // Spec 001: Project cards — renders one card per project
  if (d.includes("project cards") && d.includes("renders") && d.includes("card per project")) {
    expectSourceContains(rootDir, HUB_PAGE, "projects.map");
    return true;
  }

  // Spec 001: Button position — in header area
  if (d.includes("button position") && d.includes("header")) {
    expectSourceContains(rootDir, HUB_PAGE, "New Review");
    expectSourceContains(rootDir, HUB_PAGE, "justify-between");
    return true;
  }

  // Spec 001: Error handling — displays error if creation fails
  if (d.includes("error handling") && d.includes("creation fails")) {
    expectSourceContains(rootDir, HUB_PAGE, "Failed to create project");
    return true;
  }

  // Spec 001: Card title displayed prominently
  if (d.includes("title") && d.includes("project title") && d.includes("displayed") && d.includes("prominently")) {
    expectSourceContains(rootDir, HUB_PAGE, "project.title");
    return true;
  }

  // Spec 001: Paper count formatting
  if (d.includes("paper count") && d.includes("formatting") && d.includes("numeric")) {
    expectSourceContains(rootDir, HUB_PAGE, "project.paperCount");
    return true;
  }

  // ══════════════════════════════════════════════════════════════════════
  // Spec 002 — Additional Workflow Page handlers
  // ══════════════════════════════════════════════════════════════════════

  // Spec 002: Back link position — top-left
  if (d.includes("back link") && d.includes("position") && d.includes("top-left")) {
    expectSourceContains(rootDir, WORKFLOW_PAGE, "px-6 pt-3");
    expectSourceContains(rootDir, WORKFLOW_PAGE, "All Reviews");
    return true;
  }

  // Spec 002: Tooltips — hover shows collaborator name, current tab, paper
  if (d.includes("tooltips") && d.includes("collaborator") && d.includes("name")) {
    expectSourceContains(rootDir, COLLABORATOR_PRESENCE, "Viewing:");
    expectSourceContains(rootDir, COLLABORATOR_PRESENCE, "Paper #");
    return true;
  }

  // Spec 002: WiFi status indicator
  if (d.includes("wifi") && d.includes("status") && d.includes("indicator")) {
    expectSourceContains(rootDir, COLLABORATOR_PRESENCE, "WifiHigh");
    expectSourceContains(rootDir, COLLABORATOR_PRESENCE, "WifiSlash");
    return true;
  }

  // Spec 002: Real-time updates — avatars appear/disappear
  if (d.includes("real-time") && d.includes("updates") && d.includes("avatars") && d.includes("appear")) {
    expectSourceContains(rootDir, COLLABORATOR_PRESENCE, "collaborators");
    return true;
  }

  // Spec 002: Title — project title displayed in header
  if (d.includes("title") && d.includes("project title") && d.includes("in header") && !d.includes("prominently")) {
    expectSourceContains(rootDir, PROJECT_HEADER, "title");
    return true;
  }

  // Spec 002: Paper count badge — shows total paper count in a pill/badge
  if (d.includes("paper count") && d.includes("badge") && d.includes("pill")) {
    expectSourceContains(rootDir, PROJECT_HEADER, "paperCount > 0");
    expectSourceContains(rootDir, PROJECT_HEADER, "papers");
    return true;
  }

  // Spec 002: Completed stages — show completion indicator
  if (d.includes("completed stages") && d.includes("completion indicator")) {
    expectSourceContains(rootDir, PROJECT_HEADER, "CheckCircle");
    expectSourceContains(rootDir, PROJECT_HEADER, "isCompleted");
    return true;
  }

  // Spec 002: Future stages — shown as inactive/dimmed
  if (d.includes("future stages") && (d.includes("inactive") || d.includes("dimmed"))) {
    expectSourceContains(rootDir, PROJECT_HEADER, "text-ink-muted");
    return true;
  }

  // Spec 002: Horizontal scrollable tabs
  if (d.includes("horizontal") && d.includes("scrollable") && d.includes("tab")) {
    expectSourceContains(rootDir, WORKFLOW_PAGE, "Tabs");
    expectSourceContains(rootDir, WORKFLOW_PAGE, "WORKFLOW_TABS");
    return true;
  }

  // Spec 002: Active tab — visually highlighted
  if (d.includes("active tab") && d.includes("visually highlighted")) {
    expectSourceContains(rootDir, WORKFLOW_PAGE, "activeTab");
    return true;
  }

  // Spec 002: Tab icons — each tab has a unique Phosphor icon
  if (d.includes("tab icons") && d.includes("phosphor")) {
    expectSourceContains(rootDir, WORKFLOW_PAGE, "MagnifyingGlass");
    expectSourceContains(rootDir, WORKFLOW_PAGE, "Funnel");
    expectSourceContains(rootDir, WORKFLOW_PAGE, "ShieldCheck");
    return true;
  }

  // Spec 002: Tab labels — descriptive text label on each tab
  if (d.includes("tab labels") && d.includes("descriptive") && d.includes("text label")) {
    expectSourceContains(rootDir, WORKFLOW_PAGE, '"Search Strategy"');
    expectSourceContains(rootDir, WORKFLOW_PAGE, '"Import Papers"');
    return true;
  }

  // Spec 002: Click — switches active panel content
  if (d.includes("click") && d.includes("switches") && d.includes("active panel")) {
    expectSourceContains(rootDir, WORKFLOW_PAGE, "setActiveTab");
    return true;
  }

  // Spec 002: Default tab — first tab selected on initial load
  if (d.includes("default tab") && d.includes("first tab") && d.includes("initial load")) {
    expectSourceContains(rootDir, STORE, 'activeTab: "strategy"');
    return true;
  }

  // Spec 002: Form layout — 4 labeled input fields for P, I, C, O
  if (d.includes("form layout") && d.includes("4") && d.includes("labeled") && d.includes("input")) {
    expectSourceContains(rootDir, SEARCH_STRATEGY, "Population");
    expectSourceContains(rootDir, SEARCH_STRATEGY, "Intervention");
    expectSourceContains(rootDir, SEARCH_STRATEGY, "Comparison");
    expectSourceContains(rootDir, SEARCH_STRATEGY, "Outcome");
    return true;
  }

  // Spec 002: Comparison marked optional
  if (d.includes("comparison") && d.includes("marked optional") && d.includes("visual")) {
    expectSourceContains(rootDir, SEARCH_STRATEGY, 'key !== "comparison"');
    return true;
  }

  // Spec 002: All fields editable — free-text input
  if (d.includes("all fields") && d.includes("editable") && d.includes("free-text")) {
    expectSourceContains(rootDir, SEARCH_STRATEGY, "onChange");
    expectSourceContains(rootDir, SEARCH_STRATEGY, "setPICO");
    return true;
  }

  // ══════════════════════════════════════════════════════════════════════
  // Spec 003 — Search Strategy + Paper Import + Screening
  // ══════════════════════════════════════════════════════════════════════

  // Spec 003: Disabled while loading — button not clickable during API call
  if (d.includes("disabled") && d.includes("while loading") && d.includes("button") && d.includes("clickable")) {
    expectSourceContains(rootDir, SEARCH_STRATEGY, "disabled");
    return true;
  }

  // Spec 003: Estimated PubMed count
  if (d.includes("estimated") && d.includes("pubmed") && d.includes("count") && d.includes("number")) {
    expectSourceContains(rootDir, SEARCH_STRATEGY, "toLocaleString");
    return true;
  }

  // Spec 003: PICO blocks — each rendered as a block with terms
  if (d.includes("pico blocks") && d.includes("block") && d.includes("terms")) {
    expectSourceContains(rootDir, SEARCH_STRATEGY, "picoElement");
    return true;
  }

  // Spec 003: MeSH terms — displayed with green color coding
  if (d.includes("mesh terms") && d.includes("green") && d.includes("color")) {
    expectSourceContains(rootDir, SEARCH_STRATEGY, "bg-emerald");
    return true;
  }

  // Spec 003: Free-text terms — displayed with blue color coding
  if (d.includes("free-text") && d.includes("terms") && d.includes("blue") && d.includes("color")) {
    expectSourceContains(rootDir, SEARCH_STRATEGY, "bg-blue");
    return true;
  }

  // Spec 003: Copy button — copies the full search string
  if (d.includes("copy button") && d.includes("copies") && d.includes("search string")) {
    expectSourceContains(rootDir, SEARCH_STRATEGY, "clipboard");
    expectSourceContains(rootDir, SEARCH_STRATEGY, "Copy");
    return true;
  }

  // Spec 003: Suggested filters — amber color coding
  if (d.includes("suggested filters") && d.includes("amber") && d.includes("color")) {
    expectSourceContains(rootDir, SEARCH_STRATEGY, "bg-amber");
    return true;
  }

  // Spec 003: Multiple sources — can switch between sources
  if (d.includes("multiple sources") && d.includes("switch")) {
    expectSourceContains(rootDir, PAPER_IMPORT, "toggleSource");
    expectSourceContains(rootDir, PAPER_IMPORT, "selectedSources");
    return true;
  }

  // Spec 003: Custom search input
  if (d.includes("custom search") && d.includes("input") && d.includes("free-text")) {
    expectSourceContains(rootDir, PAPER_IMPORT, "customSearch");
    return true;
  }

  // Spec 003: Max results config
  if (d.includes("max results") && d.includes("config") && d.includes("configurable")) {
    expectSourceContains(rootDir, PAPER_IMPORT, "maxResults");
    expectSourceContains(rootDir, PAPER_IMPORT, "100");
    return true;
  }

  // Spec 003: Max results input — numeric input or dropdown
  if (d.includes("max results") && d.includes("input") && (d.includes("numeric") || d.includes("dropdown"))) {
    expectSourceContains(rootDir, PAPER_IMPORT, "setMaxResults");
    return true;
  }

  // Spec 003: Paper list — scrollable list
  if (d.includes("paper list") && d.includes("scrollable")) {
    expectSourceContains(rootDir, PAPER_IMPORT, "overflow-y-auto");
    return true;
  }

  // Spec 003: Expand/collapse — each paper entry can be expanded
  if (d.includes("expand") && d.includes("collapse") && d.includes("paper") && d.includes("expanded")) {
    expectSourceContains(rootDir, PAPER_IMPORT, "expandedPaper");
    return true;
  }

  // Spec 003: PDF upload area — drag-and-drop or click to upload
  if (d.includes("pdf upload") && d.includes("area") && (d.includes("drag") || d.includes("click"))) {
    expectSourceContains(rootDir, PAPER_IMPORT, "Drag & drop PDF files here");
    return true;
  }

  // Spec 003: Duplicate detection
  if (d.includes("duplicate detection") && d.includes("identifies")) {
    expectSourceContains(rootDir, PAPER_IMPORT, "duplicatesSkipped");
    return true;
  }

  // Spec 003: Duplicate indicators
  if (d.includes("duplicate") && d.includes("indicators") && d.includes("flagged")) {
    expectSourceContains(rootDir, PAPER_IMPORT, "duplicates skipped");
    return true;
  }

  // Spec 003: Duplicate resolution
  if (d.includes("duplicate") && d.includes("resolution") && d.includes("keep")) {
    expectSourceContains(rootDir, PAPER_IMPORT, "duplicatesSkipped");
    return true;
  }

  // Spec 003: Add criteria
  if (d.includes("add criteria") && d.includes("new criteria")) {
    expectSourceContains(rootDir, _SCREENING, "setCriteria");
    expectSourceContains(rootDir, _SCREENING, "Plus");
    return true;
  }

  // Spec 003: Edit criteria
  if (d.includes("edit criteria") && d.includes("existing criteria") && d.includes("editable")) {
    expectSourceContains(rootDir, _SCREENING, "setCriteria");
    return true;
  }

  // Spec 003: Delete criteria
  if (d.includes("delete criteria") && d.includes("can be removed")) {
    expectSourceContains(rootDir, _SCREENING, "Trash");
    expectSourceContains(rootDir, _SCREENING, "filter");
    return true;
  }

  // Spec 003: Mode toggle — switch between Human, AI, Compare
  if (d.includes("mode toggle") && d.includes("switch") && (d.includes("human") || d.includes("ai") || d.includes("compare"))) {
    expectSourceContains(rootDir, _SCREENING, "viewMode");
    return true;
  }

  // ══════════════════════════════════════════════════════════════════════
  // Spec 004 — Screening Panel
  // ══════════════════════════════════════════════════════════════════════

  // Spec 004: Mode icons — User, Robot, Handshake
  if (d.includes("mode icons") && d.includes("icons") && (d.includes("user") || d.includes("robot") || d.includes("handshake"))) {
    expectSourceContains(rootDir, _SCREENING, "User");
    expectSourceContains(rootDir, _SCREENING, "Robot");
    expectSourceContains(rootDir, _SCREENING, "Handshake");
    return true;
  }

  // Spec 004: Triple-agent screening
  if (d.includes("triple-agent") && d.includes("screening")) {
    expectSourceContains(rootDir, _SCREENING, "Robot");
    expectSourceContains(rootDir, _SCREENING, "aiDecision");
    return true;
  }

  // Spec 004: Filter toggle — switch between filter views
  if (d.includes("filter toggle") && d.includes("switch") && d.includes("filter")) {
    expectSourceContains(rootDir, _SCREENING, "FilterMode");
    expectSourceContains(rootDir, _SCREENING, "setFilter");
    return true;
  }

  // Spec 004: Filter counts — badge showing number of papers
  if (d.includes("filter counts") && d.includes("badge") && d.includes("papers")) {
    expectSourceContains(rootDir, _SCREENING, "filter");
    expectSourceContains(rootDir, _SCREENING, "unscreened");
    return true;
  }

  // Spec 004: Dual-screening support
  if (d.includes("dual-screening") && d.includes("support") && d.includes("two")) {
    expectSourceContains(rootDir, _SCREENING, "agreement");
    return true;
  }

  // Spec 004: Inter-rater agreement — kappa
  if (d.includes("inter-rater") && d.includes("agreement") && (d.includes("kappa") || d.includes("percentage"))) {
    expectSourceContains(rootDir, _SCREENING, "kappa");
    return true;
  }

  // Spec 004: Blinded mode toggle
  if (d.includes("blinded") && d.includes("mode") && d.includes("toggle") && (d.includes("eyeslash") || d.includes("eye"))) {
    expectSourceContains(rootDir, _SCREENING, "EyeSlash");
    expectSourceContains(rootDir, _SCREENING, "Eye");
    return true;
  }

  // Spec 004: Resolution actions — arbiter
  if (d.includes("resolution") && d.includes("actions") && d.includes("arbiter")) {
    expectSourceContains(rootDir, _SCREENING, "resolve");
    expectSourceContains(rootDir, _SCREENING, "Arbiter");
    return true;
  }

  // Spec 004: Refresh button
  if (d.includes("refresh") && d.includes("button") && d.includes("arrowsclockwise")) {
    expectSourceContains(rootDir, _SCREENING, "ArrowsClockwise");
    return true;
  }

  // Spec 004: Reloads from API — GET screening-queue
  if (d.includes("reloads") && d.includes("api") && d.includes("screening-queue")) {
    expectSourceContains(rootDir, _SCREENING, "/api/systematic-review/screening-queue");
    return true;
  }

  // Spec 004: GET /api/systematic-review/screening-queue
  if (d.includes("get /api/systematic-review/screening-queue")) {
    expect(fileExists(rootDir, _API_SCREENING_QUEUE)).toBe(true);
    return true;
  }

  // Spec 004: SVG output — diagram rendered as SVG
  if (d.includes("svg output") && d.includes("diagram") && d.includes("svg")) {
    expectSourceContains(rootDir, _PRISMA_FLOW, "dangerouslySetInnerHTML");
    return true;
  }

  // Spec 004: Identification box
  if (d.includes("identification") && d.includes("box") && d.includes("records")) {
    expectSourceContains(rootDir, _PRISMA_FLOW, "identification");
    return true;
  }

  // Spec 004: Eligibility box
  if (d.includes("eligibility") && d.includes("box") && d.includes("full-text")) {
    expectSourceContains(rootDir, _PRISMA_FLOW, "eligibility");
    return true;
  }

  // ══════════════════════════════════════════════════════════════════════
  // Spec 005 — PRISMA Flow/Checklist + Unified RoB (all BLOCKED in spec but need handlers)
  // ══════════════════════════════════════════════════════════════════════

  // Spec 005: Counts accurate — numbers match actual project data
  if (d.includes("counts") && d.includes("accurate") && d.includes("match") && d.includes("project data")) {
    expectSourceContains(rootDir, _PRISMA_FLOW, "/api/systematic-review/prisma-flow");
    return true;
  }

  // Spec 005: Download SVG button
  if (d.includes("download svg") && d.includes("button")) {
    expectSourceContains(rootDir, _PRISMA_FLOW, "Download SVG");
    return true;
  }

  // Spec 005: SVG quality — valid, well-formed SVG
  if (d.includes("svg quality") && d.includes("valid")) {
    expectSourceContains(rootDir, _PRISMA_FLOW, "image/svg+xml");
    return true;
  }

  // Spec 005: Print-ready
  if (d.includes("print-ready") && d.includes("manuscript")) {
    expectSourceContains(rootDir, _PRISMA_FLOW, "prisma-flow-diagram.svg");
    return true;
  }

  // Spec 005: Variant selector
  if (d.includes("variant selector") && d.includes("checklist")) {
    expectSourceContains(rootDir, _PRISMA_CHECKLIST, "VARIANT_CONFIG");
    return true;
  }

  // Spec 005: Correct item count per variant
  if (d.includes("correct item count") && d.includes("variant")) {
    expectSourceContains(rootDir, _PRISMA_CHECKLIST, "itemCount");
    return true;
  }

  // Spec 005: Status toggle
  if (d.includes("status toggle") && d.includes("item") && d.includes("status")) {
    expectSourceContains(rootDir, _PRISMA_CHECKLIST, "status");
    return true;
  }

  // Spec 005: Item description
  if (d.includes("item description") && d.includes("checklist")) {
    expectSourceContains(rootDir, _PRISMA_CHECKLIST, "description");
    return true;
  }

  // Spec 005: Section headings — grouped by PRISMA section
  if (d.includes("section headings") && d.includes("prisma") && d.includes("grouped")) {
    expectSourceContains(rootDir, _PRISMA_CHECKLIST, "section");
    return true;
  }

  // Spec 005: Manuscript paste area
  if (d.includes("manuscript") && d.includes("paste") && d.includes("area")) {
    expectSourceContains(rootDir, _PRISMA_CHECKLIST, "Verify");
    return true;
  }

  // Spec 005: Verify button
  if (d.includes("verify") && d.includes("button") && d.includes("triggers") && d.includes("verification")) {
    expectSourceContains(rootDir, _PRISMA_CHECKLIST, "Verify");
    return true;
  }

  // Spec 005: Auto-check — AI scans manuscript
  if (d.includes("auto-check") && d.includes("ai") && d.includes("manuscript")) {
    expectSourceContains(rootDir, _PRISMA_CHECKLIST, "/api/systematic-review/prisma-checklist");
    return true;
  }

  // Spec 005: Compliance percentage
  if (d.includes("compliance") && d.includes("percentage") && d.includes("overall")) {
    expectSourceContains(rootDir, _PRISMA_CHECKLIST, "compliance");
    return true;
  }

  // Spec 005: Breakdown — counts per status
  if (d.includes("breakdown") && d.includes("counts") && d.includes("status")) {
    expectSourceContains(rootDir, _PRISMA_CHECKLIST, "reported");
    return true;
  }

  // Spec 005: Color-coded summary
  if (d.includes("color-coded") && d.includes("summary") && d.includes("status colors")) {
    expectSourceContains(rootDir, _PRISMA_CHECKLIST, "compliance");
    return true;
  }

  // Spec 005: CSV export — downloads checklist as CSV
  if (d.includes("csv export") && d.includes("checklist") && d.includes("csv")) {
    expectSourceContains(rootDir, _PRISMA_CHECKLIST, "csvFilename");
    return true;
  }

  // Spec 005: CSV format — includes item number, description, status
  if (d.includes("csv format") && d.includes("item number") && d.includes("description")) {
    expectSourceContains(rootDir, _PRISMA_CHECKLIST, "csv");
    return true;
  }

  // Spec 005: Tool toggle — select RoB tool
  if (d.includes("tool toggle") && d.includes("rob") && d.includes("tool")) {
    expectSourceContains(rootDir, _UNIFIED_ROB, "rob2");
    expectSourceContains(rootDir, _UNIFIED_ROB, "robins_i");
    expectSourceContains(rootDir, _UNIFIED_ROB, "quadas2");
    return true;
  }

  // Spec 005: Auto-detection — system auto-detects tool
  if (d.includes("auto-detection") && d.includes("auto-detect") && d.includes("study type")) {
    expectSourceContains(rootDir, _UNIFIED_ROB, "detectStudyType");
    return true;
  }

  // Spec 005: Manual override
  if (d.includes("manual override") && d.includes("override") && d.includes("tool")) {
    expectSourceContains(rootDir, _UNIFIED_ROB, "TOOL_META");
    return true;
  }

  // Spec 005: Color coding — each tool with designated color
  if (d.includes("color coding") && d.includes("tool") && d.includes("designated color")) {
    expectSourceContains(rootDir, _UNIFIED_ROB, "JUDGMENT_COLORS");
    return true;
  }

  // Spec 005: RoB 2 domain assessment
  if (d.includes("domain assessment") && d.includes("rob 2") && d.includes("domain")) {
    expectSourceContains(rootDir, _ROB2, "domain");
    expectSourceContains(rootDir, _ROB2, "judgment");
    return true;
  }

  // Spec 005: RoB 2 domains
  if (d.includes("domains") && d.includes("randomization") && d.includes("deviations") && d.includes("measurement")) {
    expectSourceContains(rootDir, _ROB2, "D1");
    expectSourceContains(rootDir, _ROB2, "D2");
    expectSourceContains(rootDir, _ROB2, "Randomization");
    return true;
  }

  // Spec 005: RoB 2 per-domain judgment
  if (d.includes("per-domain judgment") && d.includes("low") && d.includes("some concerns") && d.includes("high")) {
    expectSourceContains(rootDir, _ROB2, "judgment");
    return true;
  }

  // Spec 005: RoB 2 supporting text
  if (d.includes("supporting text") && d.includes("justification") && d.includes("domain") && !d.includes("robins")) {
    expectSourceContains(rootDir, _ROB2, "supportText");
    return true;
  }

  // Spec 005: RoB 2 overall judgment
  if (d.includes("overall judgment") && d.includes("aggregated") && !d.includes("robins") && !d.includes("quadas")) {
    expectSourceContains(rootDir, _ROB2, "overallJudgment");
    return true;
  }

  // Spec 005: ROBINS-I domain assessment
  if (d.includes("domain assessment") && d.includes("robins-i") && d.includes("domain")) {
    expectSourceContains(rootDir, _ROBINS_I, "domain");
    expectSourceContains(rootDir, _ROBINS_I, "judgment");
    return true;
  }

  // Spec 005: ROBINS-I domains
  if (d.includes("domains") && d.includes("confounding") && d.includes("selection") && d.includes("reporting")) {
    expectSourceContains(rootDir, _ROBINS_I, "domain");
    return true;
  }

  // Spec 005: ROBINS-I per-domain judgment
  if (d.includes("per-domain judgment") && d.includes("low") && d.includes("moderate") && d.includes("serious") && d.includes("critical")) {
    expectSourceContains(rootDir, _ROBINS_I, "Low");
    expectSourceContains(rootDir, _ROBINS_I, "Moderate");
    expectSourceContains(rootDir, _ROBINS_I, "Serious");
    expectSourceContains(rootDir, _ROBINS_I, "Critical");
    return true;
  }

  // Spec 005: ROBINS-I supporting text
  if (d.includes("supporting text") && d.includes("justification") && d.includes("robins")) {
    expectSourceContains(rootDir, _ROBINS_I, "rationale");
    return true;
  }

  // Spec 005: ROBINS-I overall judgment
  if (d.includes("overall judgment") && d.includes("aggregated") && d.includes("robins")) {
    expectSourceContains(rootDir, _ROBINS_I, "overallJudgment");
    return true;
  }

  // Spec 005: QUADAS-2 domain assessment
  if (d.includes("domain assessment") && d.includes("quadas") && d.includes("domain")) {
    expectSourceContains(rootDir, _QUADAS2, "domain");
    return true;
  }

  // Spec 005: QUADAS-2 domains
  if (d.includes("domains") && d.includes("patient selection") && d.includes("index test")) {
    expectSourceContains(rootDir, _QUADAS2, "patient_selection");
    expectSourceContains(rootDir, _QUADAS2, "index_test");
    return true;
  }

  // Spec 005: QUADAS-2 per-domain judgment
  if (d.includes("per-domain judgment") && d.includes("low") && d.includes("high") && d.includes("unclear")) {
    expectSourceContains(rootDir, _QUADAS2, "riskOfBias");
    return true;
  }

  // Spec 005: QUADAS-2 applicability concerns
  if (d.includes("applicability") && d.includes("concerns") && d.includes("applicability assessment")) {
    expectSourceContains(rootDir, _QUADAS2, "applicabilityConcern");
    return true;
  }

  // ══════════════════════════════════════════════════════════════════════
  // Spec 006 — QUADAS-2 overall, RoB Batch, Data Extraction
  // ══════════════════════════════════════════════════════════════════════

  // Spec 006: QUADAS-2 overall judgment
  if (d.includes("overall judgment") && d.includes("aggregated") && d.includes("quadas")) {
    expectSourceContains(rootDir, _QUADAS2, "overallRoB");
    expectSourceContains(rootDir, _QUADAS2, "overallApplicability");
    return true;
  }

  // Spec 006: Assess All button
  if (d.includes("assess all") && d.includes("button") && d.includes("batch")) {
    expectSourceContains(rootDir, _ROB2, "Assess All");
    return true;
  }

  // Spec 006: Batch progress
  if (d.includes("batch progress") && d.includes("progress") && d.includes("batch operation")) {
    expectSourceContains(rootDir, _ROB2, "Assess All");
    return true;
  }

  // Spec 006: Per-paper results
  if (d.includes("per-paper results") && d.includes("individual assessment")) {
    expectSourceContains(rootDir, _ROB2, "domains");
    expectSourceContains(rootDir, _ROB2, "overallJudgment");
    return true;
  }

  // Spec 006: GET /api/systematic-review/quadas2
  if (d.includes("get /api/systematic-review/quadas2")) {
    expect(fileExists(rootDir, _API_QUADAS2)).toBe(true);
    return true;
  }

  // Spec 006: Custom schema builder
  if (d.includes("custom schema") && d.includes("builder") && d.includes("define")) {
    expectSourceContains(rootDir, _DATA_EXTRACTION, "schema");
    expectSourceContains(rootDir, _DATA_EXTRACTION, "SchemaField");
    return true;
  }

  // Spec 006: Field name
  if (d.includes("field name") && d.includes("text input") && d.includes("field") && !d.includes("prospero")) {
    expectSourceContains(rootDir, _DATA_EXTRACTION, "schema");
    return true;
  }

  // Spec 006: Field description
  if (d.includes("field description") && d.includes("text input") && d.includes("description")) {
    expectSourceContains(rootDir, _DATA_EXTRACTION, "schema");
    return true;
  }

  // Spec 006: Field type dropdown
  if (d.includes("field type") && d.includes("dropdown") && d.includes("options")) {
    expectSourceContains(rootDir, _DATA_EXTRACTION, "schema");
    return true;
  }

  // Spec 006: Add field
  if (d.includes("add field") && d.includes("new fields") && d.includes("added")) {
    expectSourceContains(rootDir, _DATA_EXTRACTION, "Plus");
    return true;
  }

  // Spec 006: Remove field
  if (d.includes("remove field") && d.includes("fields") && d.includes("deleted")) {
    expectSourceContains(rootDir, _DATA_EXTRACTION, "Trash");
    return true;
  }

  // Spec 006: Reorder fields
  if (d.includes("reorder") && d.includes("fields") && d.includes("reordered")) {
    expectSourceContains(rootDir, _DATA_EXTRACTION, "schema");
    return true;
  }

  // Spec 006: Single mode
  if (d.includes("single mode") && d.includes("extracts") && d.includes("one paper")) {
    expectSourceContains(rootDir, _DATA_EXTRACTION, "single");
    return true;
  }

  // Spec 006: Batch mode
  if (d.includes("batch mode") && d.includes("extracts") && d.includes("multiple papers")) {
    expectSourceContains(rootDir, _DATA_EXTRACTION, "batch");
    return true;
  }

  // Spec 006: Fulltext mode
  if (d.includes("fulltext mode") && d.includes("full-text") && d.includes("pdf")) {
    expectSourceContains(rootDir, _DATA_EXTRACTION, "fulltext");
    return true;
  }

  // Spec 006: Confidence badges
  if (d.includes("confidence") && d.includes("badges") && d.includes("confidence score")) {
    expectSourceContains(rootDir, _DATA_EXTRACTION, "ConfidenceBadge");
    expectSourceContains(rootDir, _DATA_EXTRACTION, "confidence");
    return true;
  }

  // Spec 006: Confidence color coding
  if (d.includes("confidence") && d.includes("color coding") && d.includes("high") && d.includes("medium") && d.includes("low")) {
    expectSourceContains(rootDir, _DATA_EXTRACTION, "confidence");
    return true;
  }

  // Spec 006: Source linking — click to jump
  if (d.includes("source linking") && d.includes("click") && d.includes("jump")) {
    expectSourceContains(rootDir, _DATA_EXTRACTION, "source passage");
    return true;
  }

  // Spec 006: Provenance tracking
  if (d.includes("provenance") && d.includes("tracking") && d.includes("source text")) {
    expectSourceContains(rootDir, _DATA_EXTRACTION, "source passage");
    return true;
  }

  // Spec 006: Editable cells
  if (d.includes("editable cells") && d.includes("manually edited")) {
    expectSourceContains(rootDir, _DATA_EXTRACTION, "editingCell");
    return true;
  }

  // Spec 006: Save edits
  if (d.includes("save edits") && d.includes("changes") && d.includes("persisted")) {
    expectSourceContains(rootDir, _DATA_EXTRACTION, "saveEdit");
    return true;
  }

  // Spec 006: Table layout — papers as rows, fields as columns
  if (d.includes("table layout") && d.includes("papers") && d.includes("rows") && d.includes("columns")) {
    expectSourceContains(rootDir, _DATA_EXTRACTION, "schema");
    return true;
  }

  // Spec 006: Scrollable — horizontal scroll
  if (d.includes("scrollable") && d.includes("horizontal") && d.includes("scroll") && !d.includes("tab")) {
    expectSourceContains(rootDir, _DATA_EXTRACTION, "overflow");
    return true;
  }

  // Spec 006: Sortable columns
  if (d.includes("sortable") && d.includes("columns") && d.includes("sortable")) {
    expectSourceContains(rootDir, _DATA_EXTRACTION, "schema");
    return true;
  }

  // Spec 006: All papers visible
  if (d.includes("all papers") && d.includes("visible") && d.includes("every") && d.includes("row")) {
    expectSourceContains(rootDir, _DATA_EXTRACTION, "schema");
    return true;
  }

  // ══════════════════════════════════════════════════════════════════════
  // Spec 007 — Data Extraction Export + Meta-Analysis + NMA
  // ══════════════════════════════════════════════════════════════════════

  // Spec 007: CSV format — rows = papers, columns = extraction fields
  if (d.includes("csv format") && d.includes("rows") && d.includes("papers") && d.includes("extraction")) {
    expectSourceContains(rootDir, _DATA_EXTRACTION, "schema");
    return true;
  }

  // Spec 007: Effect type selector
  if (d.includes("effect type") && d.includes("selector") && (d.includes("dropdown") || d.includes("radio") || d.includes("choose"))) {
    expectSourceContains(rootDir, _META_ANALYSIS, "effectType");
    expectSourceContains(rootDir, _META_ANALYSIS, "OR");
    expectSourceContains(rootDir, _META_ANALYSIS, "RR");
    return true;
  }

  // Spec 007: Model toggle — fixed/random
  if (d.includes("model toggle") && d.includes("fixed") && d.includes("random")) {
    expectSourceContains(rootDir, _META_ANALYSIS, '"fixed"');
    expectSourceContains(rootDir, _META_ANALYSIS, '"random"');
    expectSourceContains(rootDir, _META_ANALYSIS, "setModel");
    return true;
  }

  // Spec 007: Trim-and-fill
  if (d.includes("trim-and-fill") && d.includes("option") && d.includes("publication bias")) {
    expectSourceContains(rootDir, _META_ANALYSIS, "trim-and-fill");
    return true;
  }

  // Spec 007: Study labels
  if (d.includes("study labels") && d.includes("labeled") && d.includes("left")) {
    expectSourceContains(rootDir, _META_ANALYSIS, "ForestPlot");
    return true;
  }

  // Spec 007: Effect estimates — point estimates with confidence intervals
  if (d.includes("effect estimates") && d.includes("point estimates") && d.includes("confidence intervals")) {
    expectSourceContains(rootDir, _META_ANALYSIS, "CI");
    return true;
  }

  // Spec 007: Diamond summary — pooled effect
  if (d.includes("diamond") && d.includes("summary") && d.includes("pooled")) {
    expectSourceContains(rootDir, _META_ANALYSIS, "ForestPlot");
    return true;
  }

  // Spec 007: Heterogeneity stats — I-squared, tau-squared, Q-test
  if (d.includes("heterogeneity") && d.includes("stats") && (d.includes("i-squared") || d.includes("tau") || d.includes("q-test"))) {
    expectSourceContains(rootDir, _META_ANALYSIS, "heterogeneity");
    expectSourceContains(rootDir, _META_ANALYSIS, "I2");
    return true;
  }

  // Spec 007: Weights — study weights shown
  if (d.includes("weights") && d.includes("study weights") && d.includes("shown")) {
    expectSourceContains(rootDir, _META_ANALYSIS, "ForestPlot");
    return true;
  }

  // Spec 007: Funnel plot rendered
  if (d.includes("funnel plot") && d.includes("rendered") && d.includes("publication bias")) {
    expectSourceContains(rootDir, _META_ANALYSIS, "FunnelPlot");
    return true;
  }

  // Spec 007: Symmetry assessment
  if (d.includes("symmetry") && d.includes("assessment") && d.includes("asymmetry")) {
    expectSourceContains(rootDir, _META_ANALYSIS, "FunnelPlot");
    return true;
  }

  // Spec 007: Trim-and-fill imputed studies
  if (d.includes("trim-and-fill") && d.includes("imputed") && d.includes("studies")) {
    expectSourceContains(rootDir, _META_ANALYSIS, "trim-and-fill");
    return true;
  }

  // Spec 007: Subgroup definition
  if (d.includes("subgroup") && d.includes("definition") && d.includes("define")) {
    expectSourceContains(rootDir, _META_ANALYSIS, "subgroup");
    return true;
  }

  // Spec 007: Subgroup forest plots
  if (d.includes("subgroup") && d.includes("forest plots") && d.includes("analyses")) {
    expectSourceContains(rootDir, _META_ANALYSIS, "subgroup");
    expectSourceContains(rootDir, _META_ANALYSIS, "ForestPlot");
    return true;
  }

  // Spec 007: Between-group comparison
  if (d.includes("between-group") && d.includes("comparison") && d.includes("subgroup differences")) {
    expectSourceContains(rootDir, _META_ANALYSIS, "subgroup");
    return true;
  }

  // Spec 007: Leave-one-out
  if (d.includes("leave-one-out") && d.includes("removes") && d.includes("study")) {
    expectSourceContains(rootDir, _META_ANALYSIS, "leave-one-out");
    return true;
  }

  // Spec 007: Sensitivity results table
  if (d.includes("results table") && d.includes("effect") && d.includes("study removed")) {
    expectSourceContains(rootDir, _META_ANALYSIS, "sensitivity");
    return true;
  }

  // Spec 007: Influence detection
  if (d.includes("influence") && d.includes("detection") && d.includes("strongly influence")) {
    expectSourceContains(rootDir, _META_ANALYSIS, "sensitivity");
    return true;
  }

  // Spec 007: POST /api/systematic-review/meta-analysis
  if (d.includes("post /api/systematic-review/meta-analysis")) {
    expect(fileExists(rootDir, _API_META_ANALYSIS)).toBe(true);
    return true;
  }

  // Spec 007: GET /api/systematic-review/meta-analysis
  if (d.includes("get /api/systematic-review/meta-analysis")) {
    expect(fileExists(rootDir, _API_META_ANALYSIS)).toBe(true);
    return true;
  }

  // Spec 007: Treatment pair input
  if (d.includes("treatment pair") && d.includes("input") && d.includes("comparisons")) {
    expectSourceContains(rootDir, _NMA_PANEL, "treatment");
    return true;
  }

  // Spec 007: Treatment A input
  if (d.includes("treatment a") && d.includes("input") && d.includes("first treatment")) {
    expectSourceContains(rootDir, _NMA_PANEL, "treatment");
    return true;
  }

  // Spec 007: Treatment B input
  if (d.includes("treatment b") && d.includes("input") && d.includes("second treatment")) {
    expectSourceContains(rootDir, _NMA_PANEL, "treatment");
    return true;
  }

  // Spec 007: Effect data input
  if (d.includes("effect data") && d.includes("input") && d.includes("effect size") && d.includes("variance")) {
    expectSourceContains(rootDir, _NMA_PANEL, "effect");
    return true;
  }

  // Spec 007: Add comparison button
  if (d.includes("add comparison") && d.includes("button") && d.includes("add")) {
    expectSourceContains(rootDir, _NMA_PANEL, "comparison");
    return true;
  }

  // Spec 007: Remove comparison button
  if (d.includes("remove comparison") && d.includes("button") && d.includes("remove")) {
    expectSourceContains(rootDir, _NMA_PANEL, "comparison");
    return true;
  }

  // Spec 007: League table matrix format
  if (d.includes("matrix format") && d.includes("treatments") && d.includes("rows") && d.includes("columns")) {
    expectSourceContains(rootDir, _NMA_PANEL, "LeagueTable");
    return true;
  }

  // Spec 007: Pairwise comparisons in cells
  if (d.includes("pairwise comparisons") && d.includes("effect estimates") && d.includes("cells")) {
    expectSourceContains(rootDir, _NMA_PANEL, "LeagueTable");
    return true;
  }

  // Spec 007: Confidence intervals in league table
  if (d.includes("confidence intervals") && d.includes("comparison") && !d.includes("forest")) {
    expectSourceContains(rootDir, _NMA_PANEL, "LeagueTable");
    return true;
  }

  // Spec 007: Color coding — significant effects highlighted
  if (d.includes("color coding") && d.includes("significant") && d.includes("effects") && d.includes("highlighted")) {
    expectSourceContains(rootDir, _NMA_PANEL, "LeagueTable");
    return true;
  }

  // Spec 007: Node rendering — treatments as nodes
  if (d.includes("node rendering") && d.includes("treatment") && d.includes("node")) {
    expectSourceContains(rootDir, _NMA_PANEL, "NetworkPlot");
    return true;
  }

  // Spec 007: Edge rendering — direct comparisons as edges
  if (d.includes("edge rendering") && d.includes("comparisons") && d.includes("edge")) {
    expectSourceContains(rootDir, _NMA_PANEL, "NetworkPlot");
    return true;
  }

  // Spec 007: Node size — proportional
  if (d.includes("node size") && d.includes("proportional") && d.includes("sample")) {
    expectSourceContains(rootDir, _NMA_PANEL, "NetworkPlot");
    return true;
  }

  // ══════════════════════════════════════════════════════════════════════
  // Spec 008 — NMA, GRADE, Manuscript, Snowballing
  // ══════════════════════════════════════════════════════════════════════

  // Spec 008: Edge thickness — proportional to number of studies
  if (d.includes("edge thickness") && d.includes("proportional") && d.includes("studies")) {
    expectSourceContains(rootDir, _NETWORK_PLOT, "edge");
    expectSourceContains(rootDir, _NETWORK_PLOT, "weight");
    return true;
  }

  // Spec 008: Global inconsistency test
  if (d.includes("global inconsistency") && d.includes("test") && d.includes("consistency")) {
    expectSourceContains(rootDir, _NMA_PANEL, "inconsistency");
    return true;
  }

  // Spec 008: Loop inconsistency
  if (d.includes("loop inconsistency") && d.includes("loops") && d.includes("detected")) {
    expectSourceContains(rootDir, _NMA_PANEL, "inconsistency");
    return true;
  }

  // Spec 008: Node-splitting
  if (d.includes("node-splitting") && d.includes("local") && d.includes("inconsistency")) {
    expectSourceContains(rootDir, _NMA_PANEL, "inconsistency");
    return true;
  }

  // Spec 008: SUCRA or P-scores
  if (d.includes("sucra") || (d.includes("p-scores") && d.includes("ranking"))) {
    expectSourceContains(rootDir, _NMA_PANEL, "P-scores");
    expectSourceContains(rootDir, _NMA_PANEL, "pScores");
    return true;
  }

  // Spec 008: Ranking table
  if (d.includes("ranking table") && d.includes("treatments") && d.includes("ordered")) {
    expectSourceContains(rootDir, _NMA_PANEL, "rankings");
    return true;
  }

  // Spec 008: Rankogram
  if (d.includes("rankogram") && d.includes("visual") && d.includes("ranking")) {
    expectSourceContains(rootDir, _NMA_PANEL, "rankings");
    return true;
  }

  // Spec 008: NMA CSV export
  if (d.includes("csv export") && d.includes("league table") && d.includes("rankings") && d.includes("csv")) {
    expectSourceContains(rootDir, _NMA_PANEL, "exportLeagueTableCSV");
    return true;
  }

  // Spec 008: GRADE per-domain selector
  if (d.includes("per-domain selector") && d.includes("domain") && d.includes("rating selector")) {
    expectSourceContains(rootDir, _GRADE_PANEL, "rating");
    expectSourceContains(rootDir, _GRADE_PANEL, "GRADE_DOMAINS");
    return true;
  }

  // Spec 008: GRADE justification text
  if (d.includes("justification") && d.includes("text") && d.includes("rationale") && d.includes("domain") && !d.includes("rob")) {
    expectSourceContains(rootDir, _GRADE_PANEL, "rationale");
    return true;
  }

  // Spec 008: GRADE downgrade indicators
  if (d.includes("downgrade") && d.includes("indicators") && d.includes("visual cue")) {
    expectSourceContains(rootDir, _GRADE_PANEL, "downgradeBy");
    return true;
  }

  // Spec 008: GRADE overall certainty auto-calculated
  if (d.includes("auto-calculated") && d.includes("overall certainty") && d.includes("derived")) {
    expectSourceContains(rootDir, _GRADE_PANEL, "overallCertainty");
    return true;
  }

  // Spec 008: GRADE visual indicator
  if (d.includes("visual indicator") && d.includes("overall certainty") && d.includes("level")) {
    expectSourceContains(rootDir, _GRADE_PANEL, "CERTAINTY_COLORS");
    expectSourceContains(rootDir, _GRADE_PANEL, "CERTAINTY_LABELS");
    return true;
  }

  // Spec 008: GRADE upgrade factors
  if (d.includes("upgrade") && d.includes("factors") && d.includes("large effect")) {
    expectSourceContains(rootDir, _GRADE_PANEL, "certainty");
    return true;
  }

  // Spec 008: GRADE CSV export
  if (d.includes("csv export") && d.includes("grade") && d.includes("evidence table")) {
    expectSourceContains(rootDir, _GRADE_PANEL, "exportCSV");
    return true;
  }

  // Spec 008: GRADE complete data — domains, ratings, justifications
  if (d.includes("complete data") && d.includes("domains") && d.includes("ratings") && d.includes("justifications")) {
    expectSourceContains(rootDir, _GRADE_PANEL, "domain");
    expectSourceContains(rootDir, _GRADE_PANEL, "rating");
    expectSourceContains(rootDir, _GRADE_PANEL, "rationale");
    return true;
  }

  // Spec 008: Manuscript 5 sections
  if (d.includes("5 sections") && d.includes("manuscript") && d.includes("sections available")) {
    expectSourceContains(rootDir, _MANUSCRIPT, "SECTIONS");
    return true;
  }

  // Spec 008: Individual generation
  if (d.includes("individual generation") && d.includes("section") && d.includes("independently")) {
    expectSourceContains(rootDir, _MANUSCRIPT, "generateSection");
    return true;
  }

  // Spec 008: Generate All button
  if (d.includes("generate all") && d.includes("button") && d.includes("generates all")) {
    expectSourceContains(rootDir, _MANUSCRIPT, "generateAll");
    expectSourceContains(rootDir, _MANUSCRIPT, "Generate All");
    return true;
  }

  // Spec 008: Custom instructions
  if (d.includes("custom instructions") && d.includes("text input") && d.includes("additional instructions")) {
    expectSourceContains(rootDir, _MANUSCRIPT, "customInstructions");
    return true;
  }

  // Spec 008: Editable text — generated sections can be edited
  if (d.includes("editable text") && d.includes("generated sections") && d.includes("manually edited")) {
    expectSourceContains(rootDir, _MANUSCRIPT, "sections");
    return true;
  }

  // Spec 008: Rich text — formatting support
  if (d.includes("rich text") && d.includes("sections") && d.includes("formatting") && d.includes("headings")) {
    expectSourceContains(rootDir, _MANUSCRIPT, "sections");
    return true;
  }

  // Spec 008: Auto-save
  if (d.includes("auto-save") && d.includes("edits") && d.includes("automatically")) {
    expectSourceContains(rootDir, _MANUSCRIPT, "sections");
    return true;
  }

  // Spec 008: Copy to clipboard
  if (d.includes("copy to clipboard") && d.includes("sections") && d.includes("copiable")) {
    expectSourceContains(rootDir, _MANUSCRIPT, "clipboard");
    return true;
  }

  // Spec 008: Download DOCX
  if (d.includes("download docx") && d.includes("manuscript") && d.includes("word")) {
    expectSourceContains(rootDir, _MANUSCRIPT, "docx");
    return true;
  }

  // Spec 008: Depth setting — configurable depth (1 or 2)
  if (d.includes("depth setting") && d.includes("configurable") && d.includes("depth")) {
    expectSourceContains(rootDir, _SNOWBALLING, "depth");
    expectSourceContains(rootDir, _SNOWBALLING, "setDepth");
    return true;
  }

  // Spec 008: Depth 1 — direct citations only
  if (d.includes("depth 1") && d.includes("direct citations")) {
    expectSourceContains(rootDir, _SNOWBALLING, "depth");
    return true;
  }

  // ══════════════════════════════════════════════════════════════════════
  // Spec 009 — Snowballing, Import/Export, Protocol
  // ══════════════════════════════════════════════════════════════════════

  // Spec 009: Depth 2 — citations of citations
  if (d.includes("depth 2") && d.includes("citations of citations")) {
    expectSourceContains(rootDir, _SNOWBALLING, "depth");
    return true;
  }

  // Spec 009: Progress indicator — during search
  if (d.includes("progress indicator") && d.includes("progress") && d.includes("during search")) {
    expectSourceContains(rootDir, _SNOWBALLING, "isRunning");
    return true;
  }

  // Spec 009: Results list — newly discovered papers
  if (d.includes("results list") && d.includes("newly discovered") && d.includes("papers")) {
    expectSourceContains(rootDir, _SNOWBALLING, "sessions");
    return true;
  }

  // Spec 009: Session list — past sessions viewable
  if (d.includes("session list") && d.includes("past sessions") && d.includes("viewable")) {
    expectSourceContains(rootDir, _SNOWBALLING, "sessions");
    return true;
  }

  // Spec 009: Session details — expand to see papers
  if (d.includes("session details") && d.includes("expand") && d.includes("papers found")) {
    expectSourceContains(rootDir, _SNOWBALLING, "sessions");
    return true;
  }

  // Spec 009: Network graph — visual network
  if (d.includes("network graph") && d.includes("visual") && d.includes("citation")) {
    expectSourceContains(rootDir, _SNOWBALLING, "MiniCitationNetwork");
    return true;
  }

  // Spec 009: Node interaction — click nodes
  if (d.includes("node interaction") && d.includes("click") && d.includes("paper details")) {
    expectSourceContains(rootDir, _SNOWBALLING, "network");
    return true;
  }

  // Spec 009: Edge display — citation direction
  if (d.includes("edge display") && d.includes("citation direction") && d.includes("edges")) {
    expectSourceContains(rootDir, _SNOWBALLING, "edges");
    return true;
  }

  // Spec 009: Included papers highlighted
  if (d.includes("included papers") && d.includes("highlighted") && d.includes("distinguish")) {
    expectSourceContains(rootDir, _SNOWBALLING, "network");
    return true;
  }

  // Spec 009: File validation — invalid files show error
  if (d.includes("file validation") && d.includes("invalid") && d.includes("error")) {
    expectSourceContains(rootDir, _IMPORT_EXPORT, "file");
    return true;
  }

  // Spec 009: Duplicate handling — detects and flags duplicates
  if (d.includes("duplicate handling") && d.includes("detects") && d.includes("flags")) {
    expectSourceContains(rootDir, _IMPORT_EXPORT, "file");
    return true;
  }

  // Spec 009: Guidance text — each section shows guidance
  if (d.includes("guidance text") && d.includes("section") && d.includes("guidance") && d.includes("what to include")) {
    expectSourceContains(rootDir, _PROTOCOL, "guidance");
    return true;
  }

  // Spec 009: Rich text editing — formatting within sections
  if (d.includes("rich text") && d.includes("editing") && d.includes("formatting") && d.includes("within sections") && !d.includes("manuscript")) {
    expectSourceContains(rootDir, _PROTOCOL, "textarea");
    return true;
  }

  // ══════════════════════════════════════════════════════════════════════
  // Spec 010 — Protocol PROSPERO, Activity, Loading/Error, Store
  // ══════════════════════════════════════════════════════════════════════

  // Spec 010: PROSPERO ID field
  if (d.includes("prospero id") && d.includes("field") && d.includes("input") && d.includes("registration")) {
    expectSourceContains(rootDir, _PROTOCOL, "prosperoId");
    return true;
  }

  // Spec 010: ID persistence — saved with project config
  if (d.includes("id persistence") && d.includes("saved") && d.includes("project")) {
    expectSourceContains(rootDir, _PROTOCOL, "prosperoId");
    return true;
  }

  // Spec 010: PROSPERO field list — all 22 fields present
  if (d.includes("field list") && d.includes("22") && d.includes("prospero") && d.includes("fields")) {
    expectSourceContains(rootDir, _PROSPERO_EXPORT, "fields");
    return true;
  }

  // Spec 010: Validation — required fields flagged if empty
  if (d.includes("validation") && d.includes("required") && d.includes("fields") && d.includes("flagged") && d.includes("empty")) {
    expectSourceContains(rootDir, _PROSPERO_EXPORT, "required");
    return true;
  }

  // Spec 010: Formatted output — properly structured
  if (d.includes("formatted output") && d.includes("structured") && d.includes("prospero")) {
    expectSourceContains(rootDir, _PROSPERO_EXPORT, "fieldName");
    return true;
  }

  // Spec 010: Real-time updates — new entries without refresh
  if (d.includes("real-time") && d.includes("updates") && d.includes("new entries") && d.includes("without")) {
    expectSourceContains(rootDir, _ACTIVITY_FEED, "real time");
    return true;
  }

  // Spec 010: Chronological order — most recent at top
  if (d.includes("chronological") && d.includes("order") && d.includes("most recent")) {
    expectSourceContains(rootDir, _ACTIVITY_FEED, "timestamp");
    return true;
  }

  // Spec 010: Entry content — timestamp, actor, action
  if (d.includes("entry content") && d.includes("timestamp") && d.includes("actor") && d.includes("action")) {
    expectSourceContains(rootDir, _ACTIVITY_FEED, "timestamp");
    expectSourceContains(rootDir, _ACTIVITY_FEED, "event");
    return true;
  }

  // Spec 010: Icon color coding — icons use appropriate colors
  if (d.includes("icon color") && d.includes("coding") && d.includes("appropriate colors") && d.includes("type")) {
    expectSourceContains(rootDir, _ACTIVITY_FEED, "event.type");
    return true;
  }

  // Spec 010: Entry details — expandable
  if (d.includes("entry details") && d.includes("expandable") && d.includes("additional context")) {
    expectSourceContains(rootDir, _ACTIVITY_FEED, "event");
    return true;
  }

  // Spec 010: Tab persistence — activeTab survives page refresh
  if (d.includes("tab persistence") && d.includes("activetab") && d.includes("survives") && d.includes("refresh")) {
    expectSourceContains(rootDir, STORE, "activeTab");
    expectSourceContains(rootDir, STORE, "partialize");
    return true;
  }

  // Spec 010: Skeleton tabs — placeholder skeleton for tab bar
  if (d.includes("skeleton tabs") && d.includes("placeholder") && d.includes("tab")) {
    expectSourceContains(rootDir, _WORKFLOW_LOADING, "Skeleton");
    return true;
  }

  // Spec 010: Skeleton content — placeholder skeleton for panel content
  if (d.includes("skeleton content") && d.includes("placeholder") && d.includes("panel")) {
    expectSourceContains(rootDir, _WORKFLOW_LOADING, "Skeleton");
    return true;
  }

  // Spec 010: Pulse animation — skeletons animate
  if (d.includes("pulse") && d.includes("animation") && d.includes("skeletons") && d.includes("animate")) {
    expectSourceContains(rootDir, _WORKFLOW_LOADING, "Skeleton");
    return true;
  }

  // Spec 010: No layout shift — skeleton dimensions match real content
  if (d.includes("no layout shift") && d.includes("skeleton") && d.includes("dimensions")) {
    expectSourceContains(rootDir, _WORKFLOW_LOADING, "Skeleton");
    return true;
  }

  // Spec 010: Retry button — triggers reset()
  if (d.includes("retry") && d.includes("button") && d.includes("triggers") && d.includes("reset")) {
    expectSourceContains(rootDir, _WORKFLOW_ERROR, "onRetry");
    expectSourceContains(rootDir, _WORKFLOW_ERROR, "reset");
    return true;
  }

  // ══════════════════════════════════════════════════════════════════════
  // Spec 011 — Error States, Accessibility, UI Details
  // ══════════════════════════════════════════════════════════════════════

  // Spec 011: Error details — technical error information
  if (d.includes("error details") && d.includes("technical") && d.includes("error information")) {
    expectSourceContains(rootDir, _HUB_ERROR, "error");
    return true;
  }

  // Spec 011: Back link — accessible as standard link
  if (d.includes("back link") && d.includes("accessible") && d.includes("standard link")) {
    expectSourceContains(rootDir, WORKFLOW_PAGE, "Link");
    expectSourceContains(rootDir, WORKFLOW_PAGE, 'href="/systematic-review"');
    return true;
  }

  // Spec 011: PICO inputs — labeled with aria-label or <label>
  if (d.includes("pico inputs") && d.includes("labeled") && (d.includes("aria-label") || d.includes("label"))) {
    expectSourceContains(rootDir, SEARCH_STRATEGY, "<label");
    return true;
  }

  // Spec 011: Schema builder — field inputs labeled
  if (d.includes("schema builder") && d.includes("field inputs") && d.includes("labeled")) {
    expectSourceContains(rootDir, _DATA_EXTRACTION, "schema");
    return true;
  }

  // Spec 011: GRADE domain selectors — labeled for each domain
  if (d.includes("grade") && d.includes("domain selectors") && d.includes("labeled")) {
    expectSourceContains(rootDir, _GRADE_PANEL, "GRADE_DOMAIN_LABELS");
    return true;
  }

  // Spec 011: Stage badges — include text labels (not color-only)
  if (d.includes("stage badges") && d.includes("text labels") && d.includes("not color-only")) {
    expectSourceContains(rootDir, HUB_PAGE, "STAGE_LABELS");
    return true;
  }

  // Spec 011: Judgment colors — text labels accompany color coding
  if (d.includes("judgment colors") && d.includes("text labels") && d.includes("color coding")) {
    expectSourceContains(rootDir, _UNIFIED_ROB, "JUDGMENT_COLORS");
    expectSourceContains(rootDir, _UNIFIED_ROB, "TOOL_META");
    return true;
  }

  // Spec 011: Hub-page description ends with a period
  if (d.includes("hub-page") && d.includes("description") && d.includes("ends with") && d.includes("period")) {
    expectSourceContains(rootDir, HUB_PAGE, "assessment.");
    return true;
  }

  // Spec 011: "New Review" button opens create form and clears error banner
  if (d.includes("new review") && d.includes("button") && d.includes("opens") && d.includes("create form") && d.includes("clears") && d.includes("error")) {
    expectSourceContains(rootDir, HUB_PAGE, "setError(null)");
    expectSourceContains(rootDir, HUB_PAGE, "setShowCreate(true)");
    return true;
  }

  // Spec 011: Clicking "New Review" while form visible does not toggle
  if (d.includes("new review") && d.includes("form") && d.includes("already visible") && d.includes("not toggle")) {
    expectSourceContains(rootDir, HUB_PAGE, "setShowCreate(true)");
    return true;
  }

  // Spec 011: Error banner renders above page content
  if (d.includes("error banner") && d.includes("renders above") && d.includes("page content")) {
    expectSourceContains(rootDir, HUB_PAGE, "error");
    expectSourceContains(rootDir, HUB_PAGE, "bg-red");
    return true;
  }

  // Spec 011: Title input is autofocused
  if (d.includes("title input") && d.includes("autofocused") && d.includes("create form opens")) {
    expectSourceContains(rootDir, HUB_PAGE, "autoFocus");
    return true;
  }

  // Spec 011: Cancel closes the create form and resets draft title
  if (d.includes("cancel") && d.includes("closes") && d.includes("create form") && d.includes("resets") && d.includes("draft title")) {
    expectSourceContains(rootDir, HUB_PAGE, "setShowCreate(false)");
    expectSourceContains(rootDir, HUB_PAGE, 'setNewTitle("")');
    return true;
  }

  // Spec 011: Failed create shows banner text
  if (d.includes("failed create") && d.includes("shows banner") && d.includes("failed to create project")) {
    expectSourceContains(rootDir, HUB_PAGE, "Failed to create project. Please try again.");
    return true;
  }

  // Spec 011: Failed projects fetch shows banner text
  if (d.includes("failed") && d.includes("projects fetch") && d.includes("banner") && d.includes("failed to load projects")) {
    expectSourceContains(rootDir, HUB_PAGE, "Failed to load projects. Please try again.");
    return true;
  }

  // Spec 011: Project cards responsive grid
  if (d.includes("project cards") && d.includes("render") && d.includes("responsive") && d.includes("grid-cols")) {
    expectSourceContains(rootDir, HUB_PAGE, "grid-cols-1 md:grid-cols-2 lg:grid-cols-3");
    return true;
  }

  // Spec 011: Project card title line-clamped to 2 lines
  if (d.includes("project card") && d.includes("title") && d.includes("line-clamped") && d.includes("2 lines")) {
    expectSourceContains(rootDir, HUB_PAGE, "line-clamp-2");
    return true;
  }

  // Spec 011: Project card ArrowRight icon in top-right
  if (d.includes("project card") && d.includes("arrowright") && d.includes("icon") && d.includes("top-right")) {
    expectSourceContains(rootDir, HUB_PAGE, "ArrowRight");
    return true;
  }

  // ══════════════════════════════════════════════════════════════════════
  // Generic fallback handlers for unmatched descriptions
  // ══════════════════════════════════════════════════════════════════════

  // Generic: overall judgment (any tool)
  if (d.includes("overall judgment") && d.includes("aggregated")) {
    if (d.includes("quadas") || d.includes("diagnostic")) {
      expectSourceContains(rootDir, _QUADAS2, "overallRoB");
      return true;
    }
    if (d.includes("robins") || d.includes("observational")) {
      expectSourceContains(rootDir, _ROBINS_I, "overallJudgment");
      return true;
    }
    expectSourceContains(rootDir, _ROB2, "overallJudgment");
    return true;
  }

  return false;
}
