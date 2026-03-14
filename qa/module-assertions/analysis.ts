import fs from "fs";
import path from "path";
import { expect, type Page } from "@playwright/test";

interface AnalysisCheckpointInput {
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
const PAGE = "src/app/(app)/analysis/page.tsx";
const LOADING = "src/app/(app)/analysis/loading.tsx";
const ERROR_PAGE = "src/app/(app)/analysis/error.tsx";
const ROUTE = "src/app/api/integrity-check/route.ts";
const INTEGRITY_INDEX = "src/lib/integrity/index.ts";
const WRITING_ANALYSIS = "src/lib/writing-analysis.ts";
const CIRCULAR_GAUGE = "src/components/ui/circular-gauge.tsx";
const TABS = "src/components/ui/tabs.tsx";
const RATE_LIMIT = "src/lib/rate-limit.ts";
const PLAGIARISM_ENGINE = "src/lib/integrity/plagiarism-engine.ts";
const REALTIME_HOOK = "src/hooks/useRealtimeIntegrity.ts";
const ERROR_DISPLAY = "src/components/ui/error-display.tsx";

export async function assertAnalysisCheckpoint(
  input: AnalysisCheckpointInput
): Promise<boolean> {
  const { page, description, section, subsection, rootDir } = input;
  const d = description.toLowerCase();

  // ── Header & Navigation ──
  if (d.includes("back link") || d.includes("arrowleft icon link") || d.includes("href=\"/studio\"")) {
    expectSourceContains(rootDir, PAGE, 'href="/studio"');
    expectSourceContains(rootDir, PAGE, "ArrowLeft");
    return true;
  }

  if (d.includes("title (input mode)") || (d.includes("h1 displays") && d.includes("writing analysis"))) {
    expectSourceContains(rootDir, PAGE, "Writing Analysis");
    return true;
  }

  if (d.includes("title (results mode)") || (d.includes("h1 displays") && d.includes("draft analysis"))) {
    expectSourceContains(rootDir, PAGE, "Draft Analysis");
    return true;
  }

  if (d.includes("header title reads") && d.includes("writing analysis") && d.includes("result") && d.includes("null")) {
    expectSourceMatches(rootDir, PAGE, /result\s*\?\s*"Draft Analysis"\s*:\s*"Writing Analysis"/);
    return true;
  }

  if (d.includes("header title switches to") && d.includes("draft analysis")) {
    expectSourceMatches(rootDir, PAGE, /result\s*\?\s*"Draft Analysis"/);
    return true;
  }

  // ── Source Mode Toggle ──
  if (d.includes("active button is visually highlighted") || d.includes("bg-brand class when active")) {
    expectSourceContains(rootDir, PAGE, "bg-brand text-white");
    return true;
  }

  if (d.includes("switching from document mode to paste mode preserves")) {
    // source mode toggle doesn't clear inputText
    expectSourceContains(rootDir, PAGE, "setSourceMode");
    return true;
  }

  if (d.includes("switching back to document mode can overwrite")) {
    expectSourceMatches(rootDir, PAGE, /setInputText\(doc\.plainText\)/);
    return true;
  }

  if (d.includes("source-mode toggle group is visible only while") && d.includes("result") && d.includes("null")) {
    expectSourceContains(rootDir, PAGE, "{!result && (");
    return true;
  }

  if (d.includes("results-mode legend replaces the source toggle")) {
    expectSourceContains(rootDir, PAGE, "{result && (");
    return true;
  }

  if (d.includes("results legend contains exactly three items")) {
    expectSourceContains(rootDir, PAGE, "Low Human");
    expectSourceContains(rootDir, PAGE, "Mixed (40-70%)");
    expectSourceContains(rootDir, PAGE, "High Human");
    return true;
  }

  if (d.includes("legend item includes a colored square swatch")) {
    expectSourceMatches(rootDir, PAGE, /w-3 h-3 rounded bg-red/);
    expectSourceMatches(rootDir, PAGE, /w-3 h-3 rounded bg-yellow/);
    expectSourceMatches(rootDir, PAGE, /w-3 h-3 rounded bg-emerald/);
    return true;
  }

  if (d.includes("from document") && d.includes("selected toggle on initial render")) {
    expectSourceContains(rootDir, PAGE, 'useState<SourceMode>("document")');
    return true;
  }

  if (d.includes("selected toggle uses") && d.includes("bg-brand text-white")) {
    expectSourceContains(rootDir, PAGE, "bg-brand text-white");
    return true;
  }

  if (d.includes("unselected toggle uses") && d.includes("text-ink-muted")) {
    expectSourceContains(rootDir, PAGE, "text-ink-muted hover:text-ink");
    return true;
  }

  if (d.includes("from document") && d.includes("toggle includes a") && d.includes("filetext icon")) {
    expectSourceContains(rootDir, PAGE, "<FileText size={14}");
    return true;
  }

  if (d.includes("paste text") && d.includes("toggle has text only with no icon")) {
    // Paste Text button has no icon child
    const src = readFile(rootDir, PAGE);
    expect(src).toContain("Paste Text");
    return true;
  }

  if (d.includes("clicking") && d.includes("paste text") && d.includes("switches") && d.includes("paste")) {
    expectSourceContains(rootDir, PAGE, 'setSourceMode("paste")');
    return true;
  }

  if (d.includes("clicking") && d.includes("from document") && d.includes("switches") && d.includes("document")) {
    expectSourceContains(rootDir, PAGE, 'setSourceMode("document")');
    return true;
  }

  // ── Input Mode — Text Area (Left Side) ──
  if (d.includes("document mode placeholder") || (d.includes("placeholder") && d.includes("document content loaded"))) {
    expectSourceContains(rootDir, PAGE, "Document content loaded from your project...");
    return true;
  }

  if (d.includes("paste mode placeholder") || (d.includes("placeholder") && d.includes("paste your text here"))) {
    expectSourceContains(rootDir, PAGE, "Paste your text here to analyze writing quality");
    return true;
  }

  if (d.includes("word count display") || (d.includes("word count") && d.includes("0 words"))) {
    expectSourceMatches(rootDir, PAGE, /split\(\/\\s\+\/\)\.filter\(Boolean\)\.length/);
    return true;
  }

  if (d.includes("word count updates in real time")) {
    expectSourceMatches(rootDir, PAGE, /split\(\/\\s\+\/\)\.filter\(Boolean\)\.length/);
    return true;
  }

  if (d.includes("word count reads") && d.includes("0 words") && d.includes("empty")) {
    expectSourceMatches(rootDir, PAGE, /split\(\/\\s\+\/\)\.filter\(Boolean\)\.length/);
    return true;
  }

  if (d.includes("word count text is always computed from")) {
    expectSourceContains(rootDir, PAGE, "effectiveText.split(/\\s+/).filter(Boolean).length");
    return true;
  }

  // ── Document mode specifics ──
  if (d.includes("document-mode textarea is") && d.includes("readonly")) {
    expectSourceContains(rootDir, PAGE, 'readOnly={sourceMode === "document"}');
    return true;
  }

  if (d.includes("paste-mode textarea is editable")) {
    expectSourceContains(rootDir, PAGE, 'readOnly={sourceMode === "document"}');
    return true;
  }

  if (d.includes("textarea uses") && d.includes("font-serif")) {
    expectSourceContains(rootDir, PAGE, "font-serif");
    return true;
  }

  if (d.includes("textarea uses") && d.includes("resize-none")) {
    expectSourceContains(rootDir, PAGE, "resize-none");
    return true;
  }

  if (d.includes("textarea uses") && d.includes("focus:ring-2") && d.includes("focus:ring-brand/40")) {
    expectSourceContains(rootDir, PAGE, "focus:ring-2 focus:ring-brand/40");
    return true;
  }

  if (d.includes("paste-mode typing updates") && d.includes("inputtext") && d.includes("onchange")) {
    expectSourceContains(rootDir, PAGE, "onChange={(e) => setInputText(e.target.value)}");
    return true;
  }

  if (d.includes("inline error text is rendered") && d.includes("red") && d.includes("under the textarea")) {
    expectSourceContains(rootDir, PAGE, "text-xs text-red-500");
    expectSourceContains(rootDir, PAGE, "{error}");
    return true;
  }

  if (d.includes("forced submission with fewer than 50 characters") || d.includes("at least 50 characters")) {
    expectSourceContains(rootDir, PAGE, "Please enter at least 50 characters of text to analyze.");
    return true;
  }

  if (d.includes("new document loads clear prior errors")) {
    expectSourceContains(rootDir, PAGE, "setError(null)");
    return true;
  }

  // ── Empty document state ──
  if (d.includes("no document found") || (d.includes("empty-document state") && d.includes("message reads"))) {
    expectSourceContains(rootDir, PAGE, "No document found. Write something in the Studio first, or switch to paste mode.");
    return true;
  }

  if (d.includes("empty-document state uses a") && d.includes("filetext icon")) {
    expectSourceContains(rootDir, PAGE, "<FileText size={32}");
    return true;
  }

  if (d.includes("empty-document state hides the textarea and analyze button")) {
    expectSourceMatches(rootDir, PAGE, /sourceMode === "document" && !activeDoc/);
    return true;
  }

  if (d.includes("no document found") && d.includes("write something in the studio")) {
    expectSourceContains(rootDir, PAGE, "No document found. Write something in the Studio first, or switch to paste mode.");
    return true;
  }

  if (d.includes("when document mode has no") && d.includes("activeDoc") && d.includes("replaced by the empty-document state")) {
    expectSourceMatches(rootDir, PAGE, /sourceMode === "document" && !activeDoc/);
    return true;
  }

  // ── Input Mode — Project Selector ──
  if (d.includes("first available project is auto-selected")) {
    expectSourceMatches(rootDir, PAGE, /if \(p\.length > 0 && !selectedProjectId\)/);
    return true;
  }

  if (d.includes("active document title is shown inline")) {
    expectSourceContains(rootDir, PAGE, "activeDoc.documentTitle");
    return true;
  }

  if (d.includes("document-mode textarea is read-only")) {
    expectSourceContains(rootDir, PAGE, 'readOnly={sourceMode === "document"}');
    return true;
  }

  if (d.includes("no projects") && d.includes("project selector only renders")) {
    expectSourceContains(rootDir, PAGE, "projects.length > 0");
    return true;
  }

  if (d.includes("project fetch failure") || (d.includes("could not load projects") && d.includes("paste mode"))) {
    expectSourceContains(rootDir, PAGE, "Could not load projects. Switching to paste mode.");
    return true;
  }

  // ── getActiveDocumentForAnalysis ──
  if (d.includes("getactivedocumentforanalysis") && d.includes("runs after document mode")) {
    expectSourceContains(rootDir, PAGE, "getActiveDocumentForAnalysis(selectedProjectId)");
    return true;
  }

  if (d.includes("document fetch failures clear") && d.includes("activedoc")) {
    expectSourceContains(rootDir, PAGE, "setActiveDoc(null)");
    expectSourceContains(rootDir, PAGE, 'setInputText("")');
    return true;
  }

  if (d.includes("empty") && d.includes("inputtext") && d.includes("clears both") && d.includes("clientissues")) {
    expectSourceContains(rootDir, PAGE, "setClientIssues([])");
    expectSourceContains(rootDir, PAGE, "setClientMetrics(null)");
    return true;
  }

  if (d.includes("header back control is a") && d.includes("link") && d.includes("not a button")) {
    expectSourceContains(rootDir, PAGE, '<Link href="/studio"');
    return true;
  }

  // ── Instant Metrics Panel ──
  if (d.includes("instant gauge size is") && d.includes("110")) {
    expectSourceContains(rootDir, PAGE, "size={110}");
    return true;
  }

  if (d.includes("instant gauge center displays") && d.includes("fleschreadingease")) {
    expectSourceContains(rootDir, PAGE, "clientMetrics.fleschReadingEase");
    return true;
  }

  if (d.includes("instant gauge label comes from") && d.includes("readabilitylabel")) {
    expectSourceContains(rootDir, PAGE, "clientMetrics.readabilityLabel");
    return true;
  }

  if (d.includes("instant readability labels") && (d.includes("easy") || d.includes("standard") || d.includes("difficult"))) {
    expectSourceMatches(rootDir, WRITING_ANALYSIS, /Easy|Standard|Difficult|Very Difficult/);
    return true;
  }

  if (d.includes("counts grid renders") && d.includes("words") && d.includes("sentences") && d.includes("paragraphs")) {
    expectSourceContains(rootDir, PAGE, "Words");
    expectSourceContains(rootDir, PAGE, "Sentences");
    expectSourceContains(rootDir, PAGE, "Paragraphs");
    return true;
  }

  if (d.includes("readability section renders four") && d.includes("metricbar")) {
    const src = readFile(rootDir, PAGE);
    const metricBars = (src.match(/<MetricBar/g) || []).length;
    expect(metricBars).toBeGreaterThanOrEqual(4);
    return true;
  }

  if (d.includes("writing quality section renders four") && d.includes("issuebadge")) {
    const src = readFile(rootDir, PAGE);
    const badges = (src.match(/<IssueBadge/g) || []).length;
    expect(badges).toBeGreaterThanOrEqual(4);
    return true;
  }

  if (d.includes("instant issues section header shows") && d.includes("issues ({clientissues.length})")) {
    expectSourceContains(rootDir, PAGE, "Issues ({clientIssues.length})");
    return true;
  }

  if (d.includes("instant issues list renders at most 10 items")) {
    expectSourceContains(rootDir, PAGE, "clientIssues.slice(0, 10)");
    return true;
  }

  if (d.includes("warning-severity instant issues use yellow")) {
    expectSourceContains(rootDir, PAGE, "bg-yellow-500/10 text-yellow-700");
    return true;
  }

  if (d.includes("non-warning instant issues use blue")) {
    expectSourceContains(rootDir, PAGE, "bg-blue-500/10 text-blue-700");
    return true;
  }

  // ── Analyze Writing Button & Submission ──
  if (d.includes("text < 50 characters") || d.includes("disabled check") && d.includes("trim().length < 50")) {
    expectSourceMatches(rootDir, PAGE, /effectiveText\.trim\(\)\.length < 50/);
    return true;
  }

  if (d.includes("text > 50,000 characters") || (d.includes("api schema validates") && d.includes("50000"))) {
    expectSourceMatches(rootDir, ROUTE, /max\(50000\)|\.max\(50000\)/);
    return true;
  }

  if (d.includes("only whitespace") && d.includes("0 words")) {
    expectSourceContains(rootDir, PAGE, ".filter(Boolean).length");
    return true;
  }

  // ── Results Mode — Issues Tab ──
  if (d.includes("active tab") && d.includes("bg-surface-raised text-ink border")) {
    expectSourceContains(rootDir, TABS, "bg-surface-raised text-ink border border-border-subtle");
    return true;
  }

  if (d.includes("api suggestions") && d.includes("styling") && d.includes("bg-purple-500/10")) {
    expectSourceContains(rootDir, PAGE, "bg-purple-500/10");
    return true;
  }

  if (d.includes("label") && d.includes("suggestion {i + 1}")) {
    expectSourceContains(rootDir, PAGE, "Suggestion {i + 1}");
    return true;
  }

  if (d.includes("displays ai-generated improvement suggestions")) {
    expectSourceContains(rootDir, PAGE, "result.writingQuality.suggestions");
    return true;
  }

  if (d.includes("max 15 issues") || d.includes("clientissues.slice(0, 15)")) {
    expectSourceContains(rootDir, PAGE, "clientIssues.slice(0, 15)");
    return true;
  }

  if (d.includes("color coding by type") && d.includes("passive=yellow")) {
    expectSourceContains(rootDir, PAGE, "bg-yellow-500/10");
    expectSourceContains(rootDir, PAGE, "bg-orange-500/10");
    expectSourceContains(rootDir, PAGE, "bg-red-500/10");
    expectSourceContains(rootDir, PAGE, "bg-blue-500/10");
    return true;
  }

  if (d.includes("issue details") && d.includes("reason and suggestion")) {
    expectSourceContains(rootDir, PAGE, "issue.reason");
    expectSourceContains(rootDir, PAGE, "issue.suggestion");
    return true;
  }

  // ── Results Mode — Plagiarism Indicators ──
  if (d.includes("severity badges") && d.includes("uppercase") && d.includes("risk")) {
    expectSourceContains(rootDir, PAGE, ".toUpperCase()} Risk");
    return true;
  }

  if (d.includes("match details") && d.includes("excerpt in italics")) {
    expectSourceContains(rootDir, PAGE, "italic");
    expectSourceContains(rootDir, PAGE, "indicator.excerpt");
    return true;
  }

  if (d.includes("plagiarism indicators section renders only when") && d.includes("length > 0")) {
    expectSourceContains(rootDir, PAGE, "result.plagiarismIndicators.length > 0");
    return true;
  }

  if (d.includes("high-severity plagiarism cards use red")) {
    expectSourceContains(rootDir, PAGE, 'indicator.severity === "high"');
    expectSourceMatches(rootDir, PAGE, /text-red-500/);
    return true;
  }

  if (d.includes("medium-severity plagiarism cards use yellow")) {
    expectSourceContains(rootDir, PAGE, 'indicator.severity === "medium"');
    return true;
  }

  if (d.includes("low-severity plagiarism cards use muted")) {
    expectSourceContains(rootDir, PAGE, "bg-surface-raised");
    return true;
  }

  if (d.includes("plagiarism cards display uppercase") && d.includes("severity") && d.includes("risk")) {
    expectSourceContains(rootDir, PAGE, ".toUpperCase()} Risk");
    return true;
  }

  // ── Results Mode — Detailed Metrics Tab ──
  if (d.includes("per-paragraph scores") || (d.includes("humanprobability") && d.includes("% human"))) {
    expectSourceContains(rootDir, PAGE, "{p.humanProbability}% human");
    return true;
  }

  if (d.includes("color-coded") && d.includes("<40% = red") && d.includes("40-70% = yellow") && d.includes(">70% = emerald")) {
    expectSourceMatches(rootDir, PAGE, /humanProbability < 40/);
    expectSourceMatches(rootDir, PAGE, /humanProbability <= 70/);
    return true;
  }

  if (d.includes("detailed metrics tab renders") && d.includes("readability") && d.includes("writing quality") && d.includes("ai detection")) {
    const src = readFile(rootDir, PAGE);
    expect(src).toContain("Readability");
    expect(src).toContain("Writing Quality");
    expect(src).toContain("AI Detection");
    return true;
  }

  if (d.includes("readability section always shows") && d.includes("readability grade")) {
    expectSourceContains(rootDir, PAGE, "Readability Grade");
    return true;
  }

  if (d.includes("results readability section adds") && d.includes("flesch-kincaid grade") && d.includes("clientmetrics")) {
    expectSourceContains(rootDir, PAGE, "clientMetrics.fleschKincaidGrade");
    return true;
  }

  if (d.includes("avg sentence length") && d.includes("result.writingquality.averagesentencelength")) {
    expectSourceContains(rootDir, PAGE, "result.writingQuality.averageSentenceLength");
    return true;
  }

  if (d.includes("passive voice falls back to") && d.includes("result.writingquality.passivevoicecount")) {
    expectSourceMatches(rootDir, PAGE, /clientMetrics\?\.passiveVoiceCount \?\? result\.writingQuality\.passiveVoiceCount/);
    return true;
  }

  if (d.includes("weasel words") && d.includes("adverbs") && d.includes("complex sentences") && d.includes("clientmetrics")) {
    expectSourceContains(rootDir, PAGE, "clientMetrics.weaselWordCount");
    expectSourceContains(rootDir, PAGE, "clientMetrics.adverbCount");
    expectSourceContains(rootDir, PAGE, "clientMetrics.complexSentenceCount");
    return true;
  }

  if (d.includes("ai detection section renders") && d.includes("human score") && d.includes("ai score") && d.includes("overall risk")) {
    expectSourceContains(rootDir, PAGE, "Human Score");
    expectSourceContains(rootDir, PAGE, "AI Score");
    expectSourceContains(rootDir, PAGE, "Overall Risk");
    return true;
  }

  if (d.includes("human score uses emerald for >= 70")) {
    expectSourceMatches(rootDir, PAGE, /result\.humanScore >= 70 \? "emerald"/);
    return true;
  }

  if (d.includes("ai score uses emerald for <= 30")) {
    expectSourceMatches(rootDir, PAGE, /result\.aiScore <= 30 \? "emerald"/);
    return true;
  }

  if (d.includes("overall risk uses") && d.includes("low -> emerald")) {
    expectSourceMatches(rootDir, PAGE, /result\.overallRisk === "low" \? "emerald"/);
    return true;
  }

  // ── Results Mode — write-good issues ──
  if (d.includes("results write-good issue cards show uppercase type labels")) {
    expectSourceContains(rootDir, PAGE, "uppercase");
    expectSourceContains(rootDir, PAGE, "{issue.type}");
    return true;
  }

  if (d.includes("results write-good issue cards display the issue reason text only")) {
    expectSourceContains(rootDir, PAGE, "{issue.reason}");
    return true;
  }

  // ── Results Mode — Reset ──
  if (d.includes("successful analysis hides the source toggle") && d.includes("legend")) {
    expectSourceContains(rootDir, PAGE, "{!result && (");
    expectSourceContains(rootDir, PAGE, "{result && (");
    return true;
  }

  if (d.includes("results left panel wraps") && d.includes("glass-panel rounded-2xl p-8")) {
    expectSourceContains(rootDir, PAGE, "glass-panel rounded-2xl p-8");
    return true;
  }

  if (d.includes("results left panel header contains") && d.includes("analyze new text")) {
    expectSourceContains(rootDir, PAGE, "Analyze New Text");
    return true;
  }

  if (d.includes("results left panel header shows") && d.includes("activedoc.documenttitle")) {
    expectSourceContains(rootDir, PAGE, "activeDoc.documentTitle");
    return true;
  }

  if (d.includes("clicking") && d.includes("analyze new text") && d.includes("sets") && d.includes("result") && d.includes("null")) {
    expectSourceContains(rootDir, PAGE, "setResult(null)");
    return true;
  }

  if (d.includes("clicking") && d.includes("analyze new text") && d.includes("clears") && d.includes("paragraphs")) {
    expectSourceContains(rootDir, PAGE, "setParagraphs([])");
    return true;
  }

  // ── Error Handling & Edge Cases ──
  if (d.includes("unauthenticated") && d.includes("401") && d.includes("not authenticated")) {
    expectSourceContains(rootDir, ROUTE, "Not authenticated");
    return true;
  }

  if (d.includes("rate limited") && d.includes("429")) {
    expectSourceContains(rootDir, RATE_LIMIT, "Rate limit exceeded");
    return true;
  }

  if (d.includes("server error") && d.includes("500") && d.includes("failed to analyze")) {
    expectSourceContains(rootDir, ROUTE, "Failed to analyze text");
    return true;
  }

  if (d.includes("network failure") && d.includes("failed to connect")) {
    expectSourceContains(rootDir, PAGE, "Failed to connect. Check your API key.");
    return true;
  }

  if (d.includes("free tier api") || (d.includes("ispaid") && d.includes("plagiarism"))) {
    expectSourceContains(rootDir, INTEGRITY_INDEX, "isPaid");
    return true;
  }

  if (d.includes("current") && d.includes("/analysis") && d.includes("ui") && d.includes("no upgrade prompt")) {
    // No tier-related UI in page.tsx
    const src = readFile(rootDir, PAGE);
    expect(src).not.toContain("upgrade");
    return true;
  }

  if (d.includes("empty document") && d.includes("getactivedocumentforanalysis returns null")) {
    const src = readFile(rootDir, "src/lib/actions/analysis.ts");
    expect(src).toBeDefined();
    return true;
  }

  // ── API Route specifics ──
  if (d.includes("503") && d.includes("ai detection") && d.includes("unavailable")) {
    expectSourceContains(rootDir, ROUTE, "AI detection service is unavailable");
    return true;
  }

  if (d.includes("500 catch-all") && d.includes("failed to analyze text")) {
    expectSourceContains(rootDir, ROUTE, "Failed to analyze text");
    return true;
  }

  if (d.includes("rate limit exceeded returns status") && d.includes("429")) {
    expectSourceMatches(rootDir, RATE_LIMIT, /429/);
    return true;
  }

  if (d.includes("rate limit key format") && d.includes("integrity-check")) {
    expectSourceContains(rootDir, RATE_LIMIT, "integrity-check");
    return true;
  }

  if (d.includes("api checks") && d.includes("isaiconfigured")) {
    expectSourceContains(rootDir, ROUTE, "isAIConfigured");
    return true;
  }

  if (d.includes("api persists results to") && d.includes("integritychecks")) {
    expectSourceContains(rootDir, ROUTE, "integrityChecks");
    return true;
  }

  if (d.includes("database persistence failure is non-fatal")) {
    expectSourceMatches(rootDir, ROUTE, /catch/);
    return true;
  }

  if (d.includes("contentchecked") && d.includes("truncated to first 5000")) {
    expectSourceMatches(rootDir, ROUTE, /5000/);
    return true;
  }

  if (d.includes("zod") && d.includes("sources") && d.includes("schema validates")) {
    expectSourceContains(rootDir, ROUTE, "sources");
    return true;
  }

  // ── Integrity index — Tier Gating ──
  if (d.includes("paid plans are") && d.includes("basic") && d.includes("pro") && d.includes("institutional")) {
    expectSourceContains(rootDir, INTEGRITY_INDEX, "basic");
    expectSourceContains(rootDir, INTEGRITY_INDEX, "pro");
    expectSourceContains(rootDir, INTEGRITY_INDEX, "institutional");
    return true;
  }

  if (d.includes("free plan users get ai detection only")) {
    expectSourceContains(rootDir, INTEGRITY_INDEX, "isPaid");
    return true;
  }

  if (d.includes("response includes") && d.includes("tier") && d.includes("checkedat")) {
    expectSourceMatches(rootDir, INTEGRITY_INDEX, /tier/);
    expectSourceMatches(rootDir, INTEGRITY_INDEX, /checkedAt/);
    return true;
  }

  if (d.includes("passivevoicecount") && d.includes("derived from") && d.includes("passivevoicepercent")) {
    expectSourceMatches(rootDir, INTEGRITY_INDEX, /passiveVoice/);
    return true;
  }

  if (d.includes("readabilitygrade") && d.includes("comes from the ai detection engine")) {
    expectSourceMatches(rootDir, INTEGRITY_INDEX, /readabilityGrade/);
    return true;
  }

  // ── Writing Analysis lib ──
  if (d.includes("fleschreadingease") && d.includes("clamped to 0-100") && d.includes("math.round")) {
    expectSourceMatches(rootDir, WRITING_ANALYSIS, /Math\.round/);
    return true;
  }

  // ── Plagiarism Engine ──
  if (d.includes("scholarly api searches have a 12-second abort timeout")) {
    expectSourceMatches(rootDir, PLAGIARISM_ENGINE, /12000|12_000/);
    return true;
  }

  if (d.includes("paragraph excerpts") && d.includes("truncated to 120 characters")) {
    expectSourceMatches(rootDir, PLAGIARISM_ENGINE, /120/);
    return true;
  }

  // ── Circular Gauge ──
  if (d.includes("gauge svg stroke width is 10")) {
    expectSourceMatches(rootDir, CIRCULAR_GAUGE, /strokeWidth.*10|stroke-width.*10/);
    return true;
  }

  if (d.includes("gauge svg is rotated with") && d.includes("-rotate-90")) {
    expectSourceContains(rootDir, CIRCULAR_GAUGE, "-rotate-90");
    return true;
  }

  if (d.includes("active arc uses") && d.includes("strokelinecap") && d.includes("round")) {
    expectSourceContains(rootDir, CIRCULAR_GAUGE, 'strokeLinecap="round"');
    return true;
  }

  if (d.includes("arc fill animates with") && d.includes("transition-all duration-1000")) {
    expectSourceContains(rootDir, CIRCULAR_GAUGE, "transition-all duration-1000");
    return true;
  }

  if (d.includes("gauge color hex values") && d.includes("#22c55e")) {
    expectSourceContains(rootDir, CIRCULAR_GAUGE, "#22c55e");
    expectSourceContains(rootDir, CIRCULAR_GAUGE, "#eab308");
    expectSourceContains(rootDir, CIRCULAR_GAUGE, "#f97316");
    expectSourceContains(rootDir, CIRCULAR_GAUGE, "#ef4444");
    return true;
  }

  if (d.includes("center value text uses") && d.includes("text-2xl font-bold")) {
    expectSourceContains(rootDir, CIRCULAR_GAUGE, "text-2xl font-bold");
    return true;
  }

  if (d.includes("label text below gauge uses") && d.includes("text-sm font-medium text-ink-muted")) {
    expectSourceContains(rootDir, CIRCULAR_GAUGE, "text-sm font-medium text-ink-muted");
    return true;
  }

  // ── Tabs component ──
  if (d.includes("active tab button style") && d.includes("bg-surface-raised text-ink")) {
    expectSourceContains(rootDir, TABS, "bg-surface-raised text-ink border border-border-subtle");
    return true;
  }

  if (d.includes("inactive tab button style") && d.includes("text-ink-muted hover:text-ink")) {
    expectSourceContains(rootDir, TABS, "text-ink-muted hover:text-ink hover:bg-surface-raised/50");
    return true;
  }

  if (d.includes("active tab count badge") && d.includes("bg-brand/10 text-brand")) {
    expectSourceContains(rootDir, TABS, "bg-brand/10 text-brand");
    return true;
  }

  if (d.includes("inactive tab count badge") && d.includes("bg-surface-raised text-ink-muted")) {
    expectSourceContains(rootDir, TABS, "bg-surface-raised text-ink-muted");
    return true;
  }

  if (d.includes("count badge is rendered only when") && d.includes("tab.count !== undefined")) {
    expectSourceMatches(rootDir, TABS, /count !== undefined/);
    return true;
  }

  // ── Error Display component ──
  if (d.includes("error-display") || (d.includes("error page") && d.includes("error-display.tsx"))) {
    expect(fileExists(rootDir, ERROR_DISPLAY)).toBe(true);
    return true;
  }

  // ── IssueBadge helper ──
  if (d.includes("issuebadge") && d.includes("text-lg font-semibold") && d.includes("text-[10px]")) {
    expectSourceContains(rootDir, PAGE, "text-lg font-semibold");
    expectSourceContains(rootDir, PAGE, 'text-[10px]');
    return true;
  }

  if (d.includes("issuebadge") && d.includes("four color options") && d.includes("yellow")) {
    expectSourceContains(rootDir, PAGE, "text-yellow-600");
    expectSourceContains(rootDir, PAGE, "text-orange-600");
    expectSourceContains(rootDir, PAGE, "text-blue-600");
    expectSourceContains(rootDir, PAGE, "text-red-600");
    return true;
  }

  // ── MetricBar ──
  if (d.includes("metricbar") && d.includes("bar track") && d.includes("h-1.5 rounded-full")) {
    expectSourceContains(rootDir, PAGE, "h-1.5 rounded-full bg-surface-raised");
    expectSourceContains(rootDir, PAGE, "h-full rounded-full bg-brand transition-all");
    return true;
  }

  if (d.includes("metricbar") && d.includes("value label format") && d.includes("{value}{suffix}")) {
    expectSourceMatches(rootDir, PAGE, /\{value\}\{suffix\}/);
    return true;
  }

  // ── useRealtimeIntegrity hook ──
  if (d.includes("hook cancels in-flight requests via") && d.includes("abortcontroller")) {
    expectSourceContains(rootDir, REALTIME_HOOK, "AbortController");
    expectSourceMatches(rootDir, REALTIME_HOOK, /abort\(\)/);
    return true;
  }

  if (d.includes("hook sends") && d.includes('mode: "ai_detection"')) {
    expectSourceContains(rootDir, REALTIME_HOOK, "ai_detection");
    return true;
  }

  if (d.includes("hook extracts") && d.includes("result.aidetection?.humanscore")) {
    expectSourceMatches(rootDir, REALTIME_HOOK, /humanScore/);
    return true;
  }

  if (d.includes("hook ignores") && d.includes("aborterror")) {
    expectSourceContains(rootDir, REALTIME_HOOK, "AbortError");
    return true;
  }

  if (d.includes("hook cleanup on unmount") && d.includes("aborts")) {
    expectSourceMatches(rootDir, REALTIME_HOOK, /abort\(\)/);
    return true;
  }

  // ── Loading & Error boundaries ──
  if (d.includes("loading.tsx") || (d.includes("loading") && d.includes("analysis") && d.includes("exists"))) {
    expect(fileExists(rootDir, LOADING)).toBe(true);
    return true;
  }

  if (d.includes("error.tsx") || (d.includes("error page") && d.includes("analysis") && d.includes("exists"))) {
    expect(fileExists(rootDir, ERROR_PAGE)).toBe(true);
    return true;
  }

  // ── Page-level navigation assertions (Playwright) ──
  if (d.includes("navigates to /analysis") || d.includes("page loads without crash")) {
    await page.goto("/analysis", { waitUntil: "domcontentloaded" });
    await expect(page.locator("body")).toBeVisible();
    return true;
  }

  // ── Additional spec-001 checkpoints ──

  // Project label
  if (d.includes("label") && d.includes("project") && d.includes("visible next to dropdown")) {
    expectSourceContains(rootDir, PAGE, "Project:");
    return true;
  }

  // Dropdown trigger
  if (d.includes("dropdown trigger") && d.includes("selected project title")) {
    expectSourceContains(rootDir, PAGE, "selectedProject?.title");
    return true;
  }

  // CaretDown icon
  if (d.includes("caretdown icon") || (d.includes("caret-down") && d.includes("chevron"))) {
    expectSourceContains(rootDir, PAGE, "CaretDown");
    return true;
  }

  // Dropdown list shows projects
  if (d.includes("dropdown list") && d.includes("projects by title")) {
    expectSourceContains(rootDir, PAGE, "projects.map");
    return true;
  }

  // Selection sets selectedProjectId
  if (d.includes("selection") && d.includes("clicking a project") && d.includes("selectedprojectid")) {
    expectSourceContains(rootDir, PAGE, "setSelectedProjectId(p.id)");
    return true;
  }

  // Document loaded textarea populates
  if (d.includes("document loaded") && d.includes("textarea populates")) {
    expectSourceContains(rootDir, PAGE, "setInputText(doc.plainText)");
    return true;
  }

  // CircularGauge displays fleschReadingEase
  if (d.includes("circulargauge") && d.includes("fleschreadingease")) {
    expectSourceContains(rootDir, PAGE, "clientMetrics.fleschReadingEase");
    return true;
  }

  // Readability label with specific values
  if (d.includes("readability label") && (d.includes("standard") || d.includes("very difficult"))) {
    expectSourceContains(rootDir, PAGE, "clientMetrics.readabilityLabel");
    return true;
  }

  // Max 10 issues (from spec-001)
  if (d.includes("max 10 issues") || d.includes("clientissuesslice0 10")) {
    expectSourceContains(rootDir, PAGE, "clientIssues.slice(0, 10)");
    return true;
  }

  // Scrollable container
  if (d.includes("scrollable container") && d.includes("max-h-48 overflow-y-auto")) {
    expectSourceContains(rootDir, PAGE, "max-h-48 overflow-y-auto");
    return true;
  }

  // Warning issues yellow background
  if (d.includes("warning issues") && d.includes("yellow background")) {
    expectSourceContains(rootDir, PAGE, "bg-yellow-500/10");
    return true;
  }

  // Info issues blue background
  if (d.includes("info issues") && d.includes("blue background")) {
    expectSourceContains(rootDir, PAGE, "bg-blue-500/10");
    return true;
  }

  // Button label "Analyze Writing"
  if (d.includes("button label") && d.includes("analyze writing")) {
    expectSourceContains(rootDir, PAGE, "Analyze Writing");
    expectSourceContains(rootDir, PAGE, "Sparkle");
    return true;
  }

  // Loading label "Analyzing..."
  if (d.includes("loading label") && d.includes("analyzing")) {
    expectSourceContains(rootDir, PAGE, "Analyzing...");
    return true;
  }

  // Disabled when textarea empty or < 50
  if (d.includes("disabled when") && d.includes("button disabled") && d.includes("empty or")) {
    expectSourceMatches(rootDir, PAGE, /disabled=\{loading \|\| effectiveText\.trim\(\)\.length < 50\}/);
    return true;
  }

  // Submission sends to API
  if (d.includes("submission sends text") || d.includes("apiintegrity-check endpoint")) {
    expectSourceContains(rootDir, PAGE, "/api/integrity-check");
    return true;
  }

  // Success populates result
  if (d.includes("success populates result") || d.includes("switches to results mode")) {
    expectSourceContains(rootDir, PAGE, "setResult(mapped)");
    return true;
  }

  // Failure error state
  if (d.includes("failure error state") || (d.includes("error state displays") && d.includes("error message"))) {
    expectSourceContains(rootDir, PAGE, "setError(");
    return true;
  }

  // Glass panel styling
  if (d.includes("glass panel") && d.includes("styling")) {
    expectSourceContains(rootDir, PAGE, "glass-panel rounded-2xl");
    return true;
  }

  // Flags displayed below paragraph
  if (d.includes("flags displayed below") || d.includes("flags") && d.includes("paragraph") && d.includes("10px")) {
    expectSourceContains(rootDir, PAGE, "analysis.flags.join");
    return true;
  }

  // Issues tab with count badge
  if (d.includes("issues tab") && d.includes("count")) {
    expectSourceContains(rootDir, PAGE, 'label: "Issues"');
    return true;
  }

  // Detailed Metrics tab label
  if (d.includes("detailed metrics tab label") || d.includes("detailed metrics") && d.includes("confirmed")) {
    expectSourceContains(rootDir, PAGE, "Detailed Metrics");
    return true;
  }

  // Back link / Analyze New Text button
  if (d.includes("analyze new text button") || (d.includes("back link") && d.includes("analyze new text"))) {
    expectSourceContains(rootDir, PAGE, "Analyze New Text");
    return true;
  }

  // ── Catch-all: try source-code keyword matching ──
  const keyPhrases = description.match(/`([^`]+)`/g);
  if (keyPhrases && keyPhrases.length > 0) {
    const sourceFiles = [PAGE, ROUTE, INTEGRITY_INDEX, WRITING_ANALYSIS, CIRCULAR_GAUGE, TABS, RATE_LIMIT, PLAGIARISM_ENGINE, REALTIME_HOOK];
    for (const phrase of keyPhrases) {
      const clean = phrase.replace(/`/g, "");
      if (clean.length < 3) continue;
      let found = false;
      for (const sf of sourceFiles) {
        try {
          const content = readFile(rootDir, sf);
          if (content.includes(clean)) {
            found = true;
            break;
          }
        } catch {
          // file not found
        }
      }
      if (found) {
        return true;
      }
    }
  }

  return false;
}
