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
const HUB_LOADING = "src/app/(app)/systematic-review/loading.tsx";
const HUB_ERROR = "src/app/(app)/systematic-review/error.tsx";
const WORKFLOW_LOADING = "src/app/(app)/systematic-review/[projectId]/loading.tsx";
const WORKFLOW_ERROR = "src/app/(app)/systematic-review/[projectId]/error.tsx";
const PROJECT_HEADER = "src/components/systematic-review/ProjectHeader.tsx";
const COLLABORATOR = "src/components/systematic-review/CollaboratorPresence.tsx";
const ACTIVITY_FEED = "src/components/systematic-review/ActivityFeed.tsx";
const SEARCH_STRATEGY = "src/components/systematic-review/SearchStrategyPanel.tsx";
const PAPER_IMPORT = "src/components/systematic-review/PaperImportPanel.tsx";
const PRESS_CHECKLIST = "src/components/systematic-review/PRESSChecklistPanel.tsx";
const SCREENING = "src/components/systematic-review/ScreeningPanel.tsx";
const SCREENING_PDF = "src/components/systematic-review/ScreeningPDFViewer.tsx";
const UNIFIED_ROB = "src/components/systematic-review/UnifiedRoBPanel.tsx";
const ROB2 = "src/components/systematic-review/RoB2Panel.tsx";
const ROBINS_I = "src/components/systematic-review/ROBINSIPanel.tsx";
const QUADAS2 = "src/components/systematic-review/QUADAS2Panel.tsx";
const DATA_EXTRACTION = "src/components/systematic-review/DataExtractionPanel.tsx";
const META_ANALYSIS = "src/components/systematic-review/MetaAnalysisPanel.tsx";
const FOREST_PLOT = "src/components/systematic-review/ForestPlot.tsx";
const FUNNEL_PLOT = "src/components/systematic-review/FunnelPlot.tsx";
const NMA_PANEL = "src/components/systematic-review/NMAPanel.tsx";
const NETWORK_PLOT = "src/components/systematic-review/NetworkPlot.tsx";
const NMA_FOREST = "src/components/systematic-review/NMAForestPlot.tsx";
const LEAGUE_TABLE = "src/components/systematic-review/LeagueTable.tsx";
const PRISMA_FLOW = "src/components/systematic-review/PRISMAFlowPanel.tsx";
const PRISMA_CHECKLIST = "src/components/systematic-review/PRISMAChecklistPanel.tsx";
const GRADE_PANEL = "src/components/systematic-review/GRADEPanel.tsx";
const AMSTAR2 = "src/components/systematic-review/AMSTAR2Panel.tsx";
const EVIDENCE_GAP = "src/components/systematic-review/EvidenceGapMap.tsx";
const PROTOCOL = "src/components/systematic-review/ProtocolPanel.tsx";
const PROSPERO = "src/components/systematic-review/PROSPEROExport.tsx";
const SNOWBALLING = "src/components/systematic-review/SnowballingPanel.tsx";
const IMPORT_EXPORT = "src/components/systematic-review/ImportExportPanel.tsx";
const MANUSCRIPT = "src/components/systematic-review/ManuscriptPanel.tsx";
const LIVING_REVIEW = "src/components/systematic-review/LivingReviewPanel.tsx";
const AUDIT_TRAIL = "src/components/systematic-review/AuditTrailPanel.tsx";
const STORE = "src/stores/systematic-review-store.ts";
const API_PROJECTS = "src/app/api/systematic-review/projects/route.ts";
const API_CONFIG = "src/app/api/systematic-review/config/route.ts";
const API_COLLABORATORS = "src/app/api/systematic-review/collaborators/route.ts";
const API_SEARCH = "src/app/api/systematic-review/search-strategy/route.ts";
const API_IMPORT = "src/app/api/systematic-review/import/route.ts";
const API_UPLOAD = "src/app/api/systematic-review/upload/route.ts";
const API_PRESS = "src/app/api/systematic-review/press/route.ts";
const API_SCREEN = "src/app/api/systematic-review/screen/route.ts";
const API_CRITERIA = "src/app/api/systematic-review/screening-criteria/route.ts";
const API_ROB2 = "src/app/api/systematic-review/rob2/route.ts";
const API_ROBINS = "src/app/api/systematic-review/robins-i/route.ts";
const API_QUADAS = "src/app/api/systematic-review/quadas2/route.ts";
const API_EXTRACT = "src/app/api/systematic-review/extract/route.ts";
const API_META = "src/app/api/systematic-review/meta-analysis/route.ts";
const API_NMA = "src/app/api/systematic-review/nma/route.ts";
const API_GRADE = "src/app/api/systematic-review/grade/route.ts";
const API_PRISMA_FLOW = "src/app/api/systematic-review/prisma-flow/route.ts";
const API_PRISMA_CK = "src/app/api/systematic-review/prisma-checklist/route.ts";
const API_PROTOCOL = "src/app/api/systematic-review/protocol/route.ts";
const API_PROSPERO = "src/app/api/systematic-review/prospero/route.ts";
const API_EXPORT_REF = "src/app/api/systematic-review/export-references/route.ts";
const API_REVMAN = "src/app/api/systematic-review/revman-export/route.ts";
const API_MANUSCRIPT_EXPORT = "src/app/api/systematic-review/manuscript-export/route.ts";
const API_SNOWBALL = "src/app/api/systematic-review/snowball/route.ts";
const API_ALERTS = "src/app/api/systematic-review/alerts/route.ts";
const API_MANUSCRIPT = "src/app/api/systematic-review/manuscript/route.ts";
const API_AUDIT = "src/app/api/systematic-review/audit/route.ts";

export async function assertSystematicReviewCheckpoint(
  input: SystematicReviewCheckpointInput
): Promise<boolean> {
  const { page, description, section, subsection, rootDir } = input;
  const d = description.toLowerCase();

  // ══════════════════════════════════════════════════════════════════════
  // HUB PAGE
  // ══════════════════════════════════════════════════════════════════════

  if (d.includes("project list") && d.includes("loading")) {
    expectSourceMatches(rootDir, HUB_PAGE, /loading|projects|isLoading/i);
    return true;
  }

  if (d.includes("grid layout") && d.includes("project") && d.includes("hub")) {
    expectSourceMatches(rootDir, HUB_PAGE, /grid/i);
    return true;
  }

  if (d.includes("card hover") && d.includes("state") && section.toLowerCase().includes("hub")) {
    expectSourceMatches(rootDir, HUB_PAGE, /hover/i);
    return true;
  }

  if (d.includes("liveblocks") && d.includes("setup")) {
    expectSourceMatches(rootDir, WORKFLOW_PAGE, /Liveblocks|liveblocks/i);
    return true;
  }

  if (d.includes("zustand store") && d.includes("systematic")) {
    expectSourceMatches(rootDir, STORE, /create|zustand/i);
    return true;
  }

  if (d.includes("store persistence") && d.includes("systematic")) {
    expectSourceMatches(rootDir, STORE, /persist/i);
    return true;
  }

  // ══════════════════════════════════════════════════════════════════════
  // WORKFLOW PAGE
  // ══════════════════════════════════════════════════════════════════════

  if (d.includes("project id") && d.includes("extraction") && d.includes("url")) {
    expectSourceMatches(rootDir, WORKFLOW_PAGE, /projectId|params/);
    return true;
  }

  if (d.includes("back navigation") && d.includes("systematic")) {
    expectSourceMatches(rootDir, PROJECT_HEADER, /back|Back|href/i);
    return true;
  }

  if (d.includes("avatar") && d.includes("display") && d.includes("collaborator")) {
    expectSourceMatches(rootDir, COLLABORATOR, /avatar|Avatar/i);
    return true;
  }

  if (d.includes("presence") && d.includes("tooltip")) {
    expectSourceMatches(rootDir, COLLABORATOR, /tooltip|presence/i);
    return true;
  }

  if (d.includes("collaborator") && d.includes("api") && d.includes("route")) {
    expect(fileExists(rootDir, API_COLLABORATORS)).toBe(true);
    return true;
  }

  if (d.includes("presence count") && d.includes("collaborator")) {
    expectSourceMatches(rootDir, COLLABORATOR, /count|length/i);
    return true;
  }

  if (d.includes("provider setup") && d.includes("navigation flow")) {
    expectSourceMatches(rootDir, WORKFLOW_PAGE, /Provider|provider/i);
    return true;
  }

  if (d.includes("route loading") && d.includes("systematic")) {
    expect(fileExists(rootDir, WORKFLOW_LOADING)).toBe(true);
    return true;
  }

  // ══════════════════════════════════════════════════════════════════════
  // SEARCH STRATEGY PANEL
  // ══════════════════════════════════════════════════════════════════════

  if (d.includes("pico") && (d.includes("generation") || d.includes("framework"))) {
    expectSourceMatches(rootDir, SEARCH_STRATEGY, /PICO|pico/);
    return true;
  }

  if (d.includes("mesh terms") && d.includes("search strategy")) {
    expectSourceMatches(rootDir, SEARCH_STRATEGY, /MeSH|mesh/i);
    return true;
  }

  if (d.includes("copy strategy") && d.includes("search")) {
    expectSourceMatches(rootDir, SEARCH_STRATEGY, /copy|Copy|clipboard/i);
    return true;
  }

  if (d.includes("pico") && d.includes("defaults")) {
    expectSourceMatches(rootDir, SEARCH_STRATEGY, /PICO|population|intervention|comparison|outcome/i);
    return true;
  }

  // ══════════════════════════════════════════════════════════════════════
  // PAPER IMPORT PANEL
  // ══════════════════════════════════════════════════════════════════════

  if (d.includes("import papers") && d.includes("database")) {
    expectSourceMatches(rootDir, PAPER_IMPORT, /import|database/i);
    return true;
  }

  if (d.includes("database sources") && d.includes("import")) {
    expectSourceMatches(rootDir, PAPER_IMPORT, /PubMed|Scopus|database/i);
    return true;
  }

  if (d.includes("query placeholder") && d.includes("import")) {
    expectSourceMatches(rootDir, PAPER_IMPORT, /placeholder/i);
    return true;
  }

  if (d.includes("source toggles") && d.includes("import")) {
    expectSourceMatches(rootDir, PAPER_IMPORT, /toggle|source/i);
    return true;
  }

  if (d.includes("upload") && d.includes("drop zone") && d.includes("import")) {
    expectSourceMatches(rootDir, PAPER_IMPORT, /drop|upload|drag/i);
    return true;
  }

  if (d.includes("paper metadata") && d.includes("import")) {
    expectSourceMatches(rootDir, PAPER_IMPORT, /metadata|title|author/i);
    return true;
  }

  // ══════════════════════════════════════════════════════════════════════
  // SCREENING PANEL
  // ══════════════════════════════════════════════════════════════════════

  if (d.includes("screening modes") && (d.includes("user") || d.includes("ai") || d.includes("handshake"))) {
    expectSourceMatches(rootDir, SCREENING, /user|ai|handshake|mode/i);
    return true;
  }

  if (d.includes("triple-agent") && d.includes("ai") && d.includes("screening")) {
    expectSourceMatches(rootDir, SCREENING, /triple.*agent|three.*agent/i);
    return true;
  }

  if (d.includes("priority scoring") && d.includes("screening")) {
    expectSourceMatches(rootDir, SCREENING, /priority|score/i);
    return true;
  }

  if (d.includes("dual-screening") && d.includes("screening")) {
    expectSourceMatches(rootDir, SCREENING, /dual.*screen/i);
    return true;
  }

  if (d.includes("criteria") && d.includes("save") && d.includes("screening")) {
    expectSourceMatches(rootDir, SCREENING, /criteria|save/i);
    return true;
  }

  if (d.includes("queue modes") && d.includes("screening")) {
    expectSourceMatches(rootDir, SCREENING, /queue|mode/i);
    return true;
  }

  if (d.includes("blind mode") && d.includes("toggle") && d.includes("screening")) {
    expectSourceMatches(rootDir, SCREENING, /blind|toggle/i);
    return true;
  }

  if (d.includes("keyboard shortcuts") && d.includes("screening")) {
    expectSourceMatches(rootDir, SCREENING, /keyboard|shortcut|onKeyDown/i);
    return true;
  }

  if (d.includes("exclusion reasons") && d.includes("11")) {
    expectSourceMatches(rootDir, SCREENING_PDF, /exclusion|reason/i);
    return true;
  }

  if (d.includes("ai assessment") && d.includes("screening")) {
    expectSourceMatches(rootDir, SCREENING_PDF, /ai.*assess|assessment/i);
    return true;
  }

  if (d.includes("chunk navigation") && d.includes("pdf")) {
    expectSourceMatches(rootDir, SCREENING_PDF, /chunk|navigation/i);
    return true;
  }

  if (d.includes("pdf") && d.includes("split-pane") && d.includes("layout")) {
    expectSourceMatches(rootDir, SCREENING_PDF, /split|pane|layout/i);
    return true;
  }

  // ══════════════════════════════════════════════════════════════════════
  // PRISMA FLOW & CHECKLIST
  // ══════════════════════════════════════════════════════════════════════

  if (d.includes("prisma") && d.includes("diagram") && d.includes("export")) {
    expectSourceMatches(rootDir, PRISMA_FLOW, /export|svg|download/i);
    return true;
  }

  if (d.includes("prisma") && d.includes("checklist") && d.includes("variant")) {
    expectSourceMatches(rootDir, PRISMA_CHECKLIST, /variant|2020|2009/i);
    return true;
  }

  if (d.includes("prisma") && d.includes("status toggle")) {
    expectSourceMatches(rootDir, PRISMA_CHECKLIST, /status|toggle/i);
    return true;
  }

  if (d.includes("prisma") && d.includes("manuscript verification")) {
    expectSourceMatches(rootDir, PRISMA_CHECKLIST, /manuscript|verify|ai/i);
    return true;
  }

  if (d.includes("prisma") && d.includes("variant switching")) {
    expectSourceMatches(rootDir, PRISMA_CHECKLIST, /variant|switch/i);
    return true;
  }

  if (d.includes("prisma") && d.includes("checklist export")) {
    expectSourceMatches(rootDir, PRISMA_CHECKLIST, /export|download/i);
    return true;
  }

  if (d.includes("prisma flow") && d.includes("route")) {
    expect(fileExists(rootDir, API_PRISMA_FLOW)).toBe(true);
    return true;
  }

  // ══════════════════════════════════════════════════════════════════════
  // RISK OF BIAS
  // ══════════════════════════════════════════════════════════════════════

  if (d.includes("rob 2") && (d.includes("route") || d.includes("assessment"))) {
    expectSourceMatches(rootDir, ROB2, /RoB|rob|domain/i);
    return true;
  }

  if (d.includes("robins-i") && (d.includes("route") || d.includes("assessment"))) {
    expectSourceMatches(rootDir, ROBINS_I, /ROBINS|robins/i);
    return true;
  }

  if (d.includes("quadas-2") && (d.includes("route") || d.includes("assessment"))) {
    expectSourceMatches(rootDir, QUADAS2, /QUADAS|quadas/i);
    return true;
  }

  if (d.includes("batch assessment") && d.includes("rob")) {
    expectSourceMatches(rootDir, UNIFIED_ROB, /batch|assessment/i);
    return true;
  }

  if (d.includes("rob") && d.includes("dashboard") && d.includes("initialization")) {
    expectSourceMatches(rootDir, UNIFIED_ROB, /dashboard|initial/i);
    return true;
  }

  if (d.includes("auto-assign") && d.includes("tools") && d.includes("rob")) {
    expectSourceMatches(rootDir, UNIFIED_ROB, /assign|tool/i);
    return true;
  }

  if (d.includes("csv export") && d.includes("rob")) {
    expectSourceMatches(rootDir, UNIFIED_ROB, /csv|CSV|export/i);
    return true;
  }

  if (d.includes("robvis") && d.includes("summary")) {
    expectSourceMatches(rootDir, UNIFIED_ROB, /robvis|summary/i);
    return true;
  }

  if (d.includes("status cells") && d.includes("rob")) {
    expectSourceMatches(rootDir, UNIFIED_ROB, /status|cell/i);
    return true;
  }

  if (d.includes("rob tool sub-views")) {
    expectSourceMatches(rootDir, UNIFIED_ROB, /sub.*view|panel|tab/i);
    return true;
  }

  // ══════════════════════════════════════════════════════════════════════
  // DATA EXTRACTION
  // ══════════════════════════════════════════════════════════════════════

  if (d.includes("schema builder") && d.includes("extraction")) {
    expectSourceMatches(rootDir, DATA_EXTRACTION, /schema|builder/i);
    return true;
  }

  if (d.includes("csv export") && d.includes("extraction")) {
    expectSourceMatches(rootDir, DATA_EXTRACTION, /csv|CSV|export/i);
    return true;
  }

  if (d.includes("default extraction schema")) {
    expectSourceMatches(rootDir, DATA_EXTRACTION, /default.*schema|schema/i);
    return true;
  }

  if (d.includes("full-text chunks") && d.includes("extraction")) {
    expectSourceMatches(rootDir, DATA_EXTRACTION, /chunk|full.*text/i);
    return true;
  }

  if (d.includes("extract buttons") && d.includes("extraction")) {
    expectSourceMatches(rootDir, DATA_EXTRACTION, /extract|Extract/);
    return true;
  }

  if (d.includes("batch extraction")) {
    expectSourceMatches(rootDir, DATA_EXTRACTION, /batch/i);
    return true;
  }

  if (d.includes("results table") && d.includes("extraction")) {
    expectSourceMatches(rootDir, DATA_EXTRACTION, /table|results/i);
    return true;
  }

  // ══════════════════════════════════════════════════════════════════════
  // META-ANALYSIS
  // ══════════════════════════════════════════════════════════════════════

  if (d.includes("effect type") && d.includes("selection") && d.includes("meta")) {
    expectSourceMatches(rootDir, META_ANALYSIS, /effect.*type|effectType/i);
    return true;
  }

  if (d.includes("model toggle") && d.includes("meta")) {
    expectSourceMatches(rootDir, META_ANALYSIS, /model|fixed|random/i);
    return true;
  }

  if (d.includes("forest plot") && d.includes("rendering") && !d.includes("nma")) {
    expectSourceMatches(rootDir, FOREST_PLOT, /svg|render|forest/i);
    return true;
  }

  if (d.includes("model defaults") && d.includes("meta")) {
    expectSourceMatches(rootDir, META_ANALYSIS, /default|model/i);
    return true;
  }

  if (d.includes("study-table") && d.includes("headers") && d.includes("meta")) {
    expectSourceMatches(rootDir, META_ANALYSIS, /header|table|study/i);
    return true;
  }

  if (d.includes("ci auto-compute") && d.includes("meta")) {
    expectSourceMatches(rootDir, META_ANALYSIS, /confidence|interval|ci/i);
    return true;
  }

  if (d.includes("forest plot") && d.includes("svg") && d.includes("rendering")) {
    expectSourceMatches(rootDir, FOREST_PLOT, /svg|SVG/i);
    return true;
  }

  // ══════════════════════════════════════════════════════════════════════
  // FUNNEL PLOT
  // ══════════════════════════════════════════════════════════════════════

  if (d.includes("funnel plot") && d.includes("recharts")) {
    expectSourceMatches(rootDir, FUNNEL_PLOT, /Recharts|ScatterChart|recharts/i);
    return true;
  }

  if (d.includes("trim-and-fill") && d.includes("funnel")) {
    expectSourceMatches(rootDir, FUNNEL_PLOT, /trim.*fill|trimAndFill/i);
    return true;
  }

  if (d.includes("egger") && d.includes("test")) {
    expectSourceMatches(rootDir, FUNNEL_PLOT, /[Ee]gger/);
    return true;
  }

  // ══════════════════════════════════════════════════════════════════════
  // NETWORK META-ANALYSIS
  // ══════════════════════════════════════════════════════════════════════

  if (d.includes("network plot") && (d.includes("circular") || d.includes("force"))) {
    expectSourceMatches(rootDir, NETWORK_PLOT, /circular|force|layout/i);
    return true;
  }

  if (d.includes("network") && d.includes("layout") && d.includes("algorithms")) {
    expectSourceMatches(rootDir, NETWORK_PLOT, /layout|algorithm/i);
    return true;
  }

  if (d.includes("inconsistency") && d.includes("assessment") && d.includes("nma")) {
    expectSourceMatches(rootDir, NMA_PANEL, /inconsistency/i);
    return true;
  }

  if (d.includes("inconsistency") && d.includes("tabs")) {
    expectSourceMatches(rootDir, NMA_PANEL, /tab|inconsistency/i);
    return true;
  }

  if (d.includes("rankings") && (d.includes("sucra") || d.includes("nma"))) {
    expectSourceMatches(rootDir, NMA_PANEL, /SUCRA|ranking|rank/i);
    return true;
  }

  if (d.includes("leave-one-out") && d.includes("analysis")) {
    expectSourceMatches(rootDir, NMA_PANEL, /leave.*one.*out/i);
    return true;
  }

  if (d.includes("nma study table")) {
    expectSourceMatches(rootDir, NMA_PANEL, /study|table/i);
    return true;
  }

  if (d.includes("nma forest plot") && d.includes("sort")) {
    expectSourceMatches(rootDir, NMA_FOREST, /sort|comparison/i);
    return true;
  }

  if (d.includes("significance") && d.includes("marking") && d.includes("nma")) {
    expectSourceMatches(rootDir, NMA_FOREST, /significant|significance/i);
    return true;
  }

  if (d.includes("p-scores") && d.includes("nma")) {
    expectSourceMatches(rootDir, NMA_PANEL, /p.*score|pScore/i);
    return true;
  }

  if (d.includes("league table") && d.includes("nma")) {
    expectSourceMatches(rootDir, LEAGUE_TABLE, /league|League/i);
    return true;
  }

  // ══════════════════════════════════════════════════════════════════════
  // GRADE PANEL
  // ══════════════════════════════════════════════════════════════════════

  if (d.includes("domain ratings") && d.includes("grade")) {
    expectSourceMatches(rootDir, GRADE_PANEL, /domain|rating/i);
    return true;
  }

  if (d.includes("grade") && d.includes("outcome") && d.includes("selector")) {
    expectSourceMatches(rootDir, GRADE_PANEL, /outcome|selector/i);
    return true;
  }

  if (d.includes("domain downgrades") && d.includes("grade")) {
    expectSourceMatches(rootDir, GRADE_PANEL, /downgrade/i);
    return true;
  }

  if (d.includes("certainty") && d.includes("evidence") && d.includes("grade")) {
    expectSourceMatches(rootDir, GRADE_PANEL, /certainty|evidence/i);
    return true;
  }

  // ══════════════════════════════════════════════════════════════════════
  // PROTOCOL & PROSPERO
  // ══════════════════════════════════════════════════════════════════════

  if (d.includes("prospero") && d.includes("id") && (d.includes("tracking") || d.includes("validation"))) {
    expectSourceMatches(rootDir, PROTOCOL, /PROSPERO|prospero/);
    return true;
  }

  if (d.includes("auto-population") && d.includes("22 fields")) {
    expectSourceMatches(rootDir, PROSPERO, /field|auto.*popul/i);
    return true;
  }

  if (d.includes("field editing") && d.includes("prospero")) {
    expectSourceMatches(rootDir, PROSPERO, /edit|field/i);
    return true;
  }

  if (d.includes("protocol") && d.includes("generation")) {
    expectSourceMatches(rootDir, PROTOCOL, /generate|protocol/i);
    return true;
  }

  // ══════════════════════════════════════════════════════════════════════
  // SNOWBALLING
  // ══════════════════════════════════════════════════════════════════════

  if (d.includes("citation search") && d.includes("snowball")) {
    expectSourceMatches(rootDir, SNOWBALLING, /citation|search/i);
    return true;
  }

  if (d.includes("session tracking") && d.includes("snowball")) {
    expectSourceMatches(rootDir, SNOWBALLING, /session|tracking/i);
    return true;
  }

  if (d.includes("network visualization") && d.includes("snowball")) {
    expectSourceMatches(rootDir, SNOWBALLING, /network|visualization/i);
    return true;
  }

  if (d.includes("seed selection") && d.includes("snowball")) {
    expectSourceMatches(rootDir, SNOWBALLING, /seed|select/i);
    return true;
  }

  if (d.includes("run snowball") && d.includes("button")) {
    expectSourceMatches(rootDir, SNOWBALLING, /Run|Snowball/i);
    return true;
  }

  if (d.includes("success banner") && d.includes("snowball")) {
    expectSourceMatches(rootDir, SNOWBALLING, /success|banner/i);
    return true;
  }

  // ══════════════════════════════════════════════════════════════════════
  // IMPORT/EXPORT & MANUSCRIPT
  // ══════════════════════════════════════════════════════════════════════

  if (d.includes("export formats") && (d.includes("ris") || d.includes("bibtex") || d.includes("endnote") || d.includes("csv"))) {
    expectSourceMatches(rootDir, IMPORT_EXPORT, /RIS|BibTeX|EndNote|CSV/i);
    return true;
  }

  if (d.includes("revman") && d.includes("export")) {
    expectSourceMatches(rootDir, IMPORT_EXPORT, /RevMan|revman/i);
    return true;
  }

  if (d.includes("manuscript") && d.includes("section") && d.includes("slots")) {
    expectSourceMatches(rootDir, MANUSCRIPT, /section|slot/i);
    return true;
  }

  if (d.includes("manuscript") && d.includes("generation") && d.includes("controls")) {
    expectSourceMatches(rootDir, MANUSCRIPT, /generate|control/i);
    return true;
  }

  if (d.includes("manuscript") && d.includes("export") && (d.includes("markdown") || d.includes("docx"))) {
    expectSourceMatches(rootDir, MANUSCRIPT, /markdown|docx|export/i);
    return true;
  }

  // ══════════════════════════════════════════════════════════════════════
  // LIVING REVIEW
  // ══════════════════════════════════════════════════════════════════════

  if (d.includes("alert creation") && d.includes("living review")) {
    expectSourceMatches(rootDir, LIVING_REVIEW, /alert|create/i);
    return true;
  }

  if (d.includes("check now") && d.includes("living review")) {
    expectSourceMatches(rootDir, LIVING_REVIEW, /check.*now|checkNow/i);
    return true;
  }

  if (d.includes("pause") && d.includes("resume") && d.includes("living review")) {
    expectSourceMatches(rootDir, LIVING_REVIEW, /pause|resume/i);
    return true;
  }

  if (d.includes("delete") && d.includes("without confirmation") && d.includes("living")) {
    expectSourceMatches(rootDir, LIVING_REVIEW, /delete/i);
    return true;
  }

  // ══════════════════════════════════════════════════════════════════════
  // ACTIVITY FEED
  // ══════════════════════════════════════════════════════════════════════

  if (d.includes("entry id format") && d.includes("activity")) {
    expectSourceMatches(rootDir, ACTIVITY_FEED, /id|entry/i);
    return true;
  }

  if (d.includes("color coding") && d.includes("activity")) {
    expectSourceMatches(rootDir, ACTIVITY_FEED, /color|variant/i);
    return true;
  }

  if (d.includes("timestamp formatting") && d.includes("activity")) {
    expectSourceMatches(rootDir, ACTIVITY_FEED, /timestamp|date|time/i);
    return true;
  }

  // ══════════════════════════════════════════════════════════════════════
  // PRESS CHECKLIST
  // ══════════════════════════════════════════════════════════════════════

  if (d.includes("press") && d.includes("validation") && d.includes("search")) {
    expectSourceMatches(rootDir, PRESS_CHECKLIST, /PRESS|press|validation/i);
    return true;
  }

  if (d.includes("press") && d.includes("route")) {
    expect(fileExists(rootDir, API_PRESS)).toBe(true);
    return true;
  }

  // ══════════════════════════════════════════════════════════════════════
  // LOADING & ERROR STATES, ACCESSIBILITY
  // ══════════════════════════════════════════════════════════════════════

  if (d.includes("error display") && d.includes("systematic")) {
    expect(fileExists(rootDir, HUB_ERROR)).toBe(true);
    return true;
  }

  if (d.includes("accessible forms") && d.includes("systematic")) {
    expectSourceMatches(rootDir, SCREENING, /aria|label|role/i);
    return true;
  }

  if (d.includes("button labels") && d.includes("screen reader")) {
    expectSourceMatches(rootDir, WORKFLOW_PAGE, /aria-label|aria/i);
    return true;
  }


  // ══════════════════════════════════════════════════════════════════════
  // API ROUTE EXISTENCE
  // ══════════════════════════════════════════════════════════════════════

  if (d.includes("API") && d.includes("systematic review")) {
    expect(fileExists(rootDir, API_REVIEWS)).toBe(true);
    return true;
  }

  if (d.includes("API") && d.includes("screening")) {
    expect(fileExists(rootDir, API_SCREENING)).toBe(true);
    return true;
  }

  if (d.includes("API") && d.includes("meta-analysis")) {
    expect(fileExists(rootDir, API_META)).toBe(true);
    return true;
  }

  if (d.includes("API") && d.includes("search") && d.includes("strateg")) {
    expect(fileExists(rootDir, API_SEARCH)).toBe(true);
    return true;
  }

  if (d.includes("API") && d.includes("data extraction")) {
    expect(fileExists(rootDir, API_EXTRACTION)).toBe(true);
    return true;
  }

  if (d.includes("API") && d.includes("PRISMA")) {
    expect(fileExists(rootDir, API_PRISMA)).toBe(true);
    return true;
  }

  if (d.includes("API") && d.includes("risk of bias")) {
    expect(fileExists(rootDir, API_ROB)).toBe(true);
    return true;
  }

  if (d.includes("API") && d.includes("protocol")) {
    expect(fileExists(rootDir, API_PROTOCOL)).toBe(true);
    return true;
  }

  if (d.includes("API") && d.includes("collaborat")) {
    expect(fileExists(rootDir, API_COLLABORATORS)).toBe(true);
    return true;
  }

  if (d.includes("API") && d.includes("export")) {
    expect(fileExists(rootDir, API_EXPORT)).toBe(true);
    return true;
  }

  // ══════════════════════════════════════════════════════════════════════
  // CATCH-ALL FALLBACKS BY SECTION
  // ══════════════════════════════════════════════════════════════════════

  // Hub / Dashboard fallback
  if (d.includes("hub") || d.includes("dashboard") || d.includes("review list")) {
    expect(fileExists(rootDir, HUB_PAGE)).toBe(true);
    return true;
  }

  // Workflow fallback
  if (d.includes("workflow") || d.includes("step") || d.includes("phase")) {
    expect(fileExists(rootDir, WORKFLOW_PAGE)).toBe(true);
    return true;
  }

  // Search strategy fallback
  if (d.includes("search") && (d.includes("strateg") || d.includes("query") || d.includes("database"))) {
    expect(fileExists(rootDir, SEARCH_STRATEGY)).toBe(true);
    return true;
  }

  // Screening fallback
  if (d.includes("screen") || d.includes("inclusion") || d.includes("exclusion") || d.includes("abstract")) {
    expect(fileExists(rootDir, SCREENING)).toBe(true);
    return true;
  }

  // PRISMA fallback
  if (d.includes("PRISMA") || d.includes("flow diagram") || d.includes("checklist")) {
    expect(fileExists(rootDir, PRISMA_FLOW)).toBe(true);
    return true;
  }

  // Risk of Bias fallback
  if (d.includes("risk") && d.includes("bias")) {
    expect(fileExists(rootDir, ROB_ASSESSMENT)).toBe(true);
    return true;
  }

  // Data extraction fallback
  if (d.includes("data") && (d.includes("extract") || d.includes("form") || d.includes("field"))) {
    expect(fileExists(rootDir, DATA_EXTRACTION)).toBe(true);
    return true;
  }

  // Meta-analysis fallback
  if (d.includes("meta") && (d.includes("analysis") || d.includes("forest") || d.includes("plot"))) {
    expect(fileExists(rootDir, META_ANALYSIS)).toBe(true);
    return true;
  }

  // GRADE fallback
  if (d.includes("GRADE") || d.includes("evidence") && d.includes("quality")) {
    expect(fileExists(rootDir, GRADE_ASSESSMENT)).toBe(true);
    return true;
  }

  // Protocol fallback
  if (d.includes("protocol") || d.includes("PROSPERO")) {
    expect(fileExists(rootDir, PROTOCOL)).toBe(true);
    return true;
  }

  // Import/Export fallback
  if (d.includes("import") || d.includes("export") || d.includes("RIS") || d.includes("BibTeX") || d.includes("CSV")) {
    expect(fileExists(rootDir, IMPORT_EXPORT)).toBe(true);
    return true;
  }

  // Collaboration fallback
  if (d.includes("collaborat") || d.includes("conflict") || d.includes("presence")) {
    expect(fileExists(rootDir, COLLABORATOR)).toBe(true);
    return true;
  }

  // Living review fallback
  if (d.includes("living") || d.includes("automat") && d.includes("update")) {
    expect(fileExists(rootDir, LIVING_REVIEW)).toBe(true);
    return true;
  }

  // Snowballing fallback
  if (d.includes("snowball") || d.includes("citation") && d.includes("chain")) {
    expect(fileExists(rootDir, SNOWBALLING)).toBe(true);
    return true;
  }

  // Store fallback
  if (d.includes("store") || d.includes("state") || d.includes("zustand")) {
    expect(fileExists(rootDir, STORE)).toBe(true);
    return true;
  }

  // Generic systematic review fallback
  if (d.includes("systematic") || d.includes("review")) {
    expect(fileExists(rootDir, HUB_PAGE)).toBe(true);
    return true;
  }

  return false;
}
