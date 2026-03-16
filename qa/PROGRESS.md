# ScholarSync QA Progress

Updated: 2026-03-16T13:15:27.602Z

## Overall

`[████████████████████████████░░] 93.6%`

| Metric | Count |
|--------|-------|
| Total specs | 376 |
| Total checkpoints | 12804 |
| Pending | 21 |
| Pass 1 done | 352 |
| Pass 2 done | 0 |
| Blocked | 3 |

## Per Module

| Module | Specs | Done | Pending | Blocked | Checkpoints | Pass1 P/F/B |
|--------|-------|------|---------|---------|-------------|-------------|
| dashboard | 9 | 9 | 0 | 0 | 281 | 278/3/0 |
| onboarding | 7 | 7 | 0 | 0 | 242 | 242/0/0 |
| settings | 9 | 9 | 0 | 0 | 297 | 297/0/0 |
| projects | 9 | 9 | 0 | 0 | 305 | 305/0/0 |
| library | 11 | 11 | 0 | 0 | 380 | 378/2/0 |
| studio | 17 | 17 | 0 | 0 | 564 | 564/0/0 |
| editor | 38 | 38 | 0 | 0 | 1303 | 1264/3/0 |
| research | 18 | 18 | 0 | 0 | 598 | 598/0/0 |
| latex | 17 | 17 | 0 | 0 | 571 | 571/0/0 |
| notebook | 25 | 25 | 0 | 0 | 859 | 857/2/0 |
| compliance | 16 | 15 | 0 | 1 | 533 | 529/4/0 |
| analysis | 10 | 9 | 0 | 1 | 323 | 315/4/0 |
| deep-research | 15 | 10 | 4 | 1 | 525 | 520/5/0 |
| feeds | 19 | 19 | 0 | 0 | 658 | 658/0/0 |
| slides | 24 | 24 | 0 | 0 | 819 | 819/0/0 |
| slides-ai | 21 | 21 | 0 | 0 | 716 | 716/0/0 |
| poster | 15 | 13 | 2 | 0 | 509 | 491/18/0 |
| presentation | 27 | 27 | 0 | 0 | 937 | 937/0/0 |
| illustrate | 37 | 23 | 14 | 0 | 1284 | 1257/27/0 |
| systematic-review | 32 | 31 | 1 | 0 | 1100 | 1099/1/0 |

## Blocked Specs

| Spec | Module | Reason |
|------|--------|--------|
| compliance.spec-014 | compliance | TimeoutError: page.goto: Timeout 45000ms exceeded.
Call log:
[2m  - navigating to "http://127.0.0.1:3001/compliance", waiting until "domcontentloaded"[22m


  52 |
  53 |     // Navigate to the page
> 54 |     await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
     |                ^
  55 |     await page.waitForLoadState('networkidle').catch(() => {});
  56 |
  57 |     // Take a screenshot as proof of page load
    at /home/user/ScholarSync-/qa/generated/compliance/spec-014.spec.ts:54:16; TimeoutError: page.goto: Timeout 45000ms exceeded.
Call log:
[2m  - navigating to "http://127.0.0.1:3001/compliance", waiting until "domcontentloaded"[22m


  102 |
  103 |     // Navigate to the page
> 104 |     await page.goto('/compliance', { waitUntil: 'domcontentloaded' });
      |                ^
  105 |     await page.waitForLoadState('networkidle').catch(() => {});
  106 |
  107 |     // Take a screenshot as proof of page load
    at /home/user/ScholarSync-/qa/generated/compliance/spec-014.spec.ts:104:16 |
| analysis.spec-007 | analysis | Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoContain[2m([22m[32mexpected[39m[2m) // indexOf[22m

Expected substring: [32m"result.plagiarismIndicators.length > 0"[39m
Received string:    [31m"\"use client\";·[39m
[31mimport { useState, useCallback, useEffect, useRef } from \"react\";[39m
[31mimport Link from \"next/link\";[39m
[31mimport { ArrowLeft, Sparkle, CircleNotch, CaretDown, FileText } from \"@phosphor-icons/react\";[39m
[31mimport { cn } from \"@/lib/utils\";[39m
[31mimport { Tabs } from \"@/components/ui/tabs\";[39m
[31mimport { CircularGauge } from \"@/components/ui/circular-gauge\";[39m
[31mimport { analyzeWriting, type WritingIssue, type WritingMetrics } from \"@/lib/writing-analysis\";[39m
[31mimport {[39m
[31m  getActiveDocumentForAnalysis,[39m
[31m  listProjectsForAnalysis,[39m
[31m  type DocumentForAnalysis,[39m
[31m} from \"@/lib/actions/analysis\";·[39m
[31m/** Local UI shape for analysis results */[39m
[31minterface AnalysisResult {[39m
[31m  humanScore: number;[39m
[31m  aiScore: number;[39m
[31m  overallRisk: \"low\" | \"medium\" | \"high\";[39m
[31m  paragraphAnalysis: Array<{[39m
[31m    paragraphIndex: number;[39m
[31m    humanProbability: number;[39m
[31m    flags: string[];[39m
[31m    suggestion?: string;[39m
[31m  }>;[39m
[31m  plagiarismIndicators: Array<{[39m
[31m    excerpt: string;[39m
[31m    concern: string;[39m
[31m    severity: \"low\" | \"medium\" | \"high\";[39m
[31m  }>;[39m
[31m  aiDetection: {[39m
[31m    humanScore: number;[39m
[31m    aiScore: number;[39m
[31m    overallRisk: \"low\" | \"medium\" | \"high\";[39m
[31m    paragraphs: Array<{[39m
[31m      paragraphIndex: number;[39m
[31m      humanProbability: number;[39m
[31m      flags: string[];[39m
[31m      suggestion?: string;[39m
[31m    }>;[39m
[31m  };[39m
[31m  plagiarism: {[39m
[31m    matches: Array<{[39m
[31m      excerpt: string;[39m
[31m      source: { title?: string; authors?: string[]; doi?: string; year?: number };[39m
[31m      similarity: number;[39m
[31m      severity: \"low\" | \"medium\" | \"high\";[39m
[31m    }>;[39m
[31m  } | null;[39m
[31m  writingQuality: {[39m
[31m    passiveVoiceCount: number;[39m
[31m    averageSentenceLength: number;[39m
[31m    readabilityGrade: number;[39m
[31m    suggestions: string[];[39m
[31m  };[39m
[31m}·[39m
[31mtype SourceMode = \"document\" | \"paste\";·[39m
[31mexport default function AnalysisPage() {[39m
[31m  // Source mode: load from DB document or paste text[39m
[31m  const [sourceMode, setSourceMode] = useState<SourceMode>(\"document\");·[39m
[31m  // Document loading state[39m
[31m  const [docLoading, setDocLoading] = useState(true);[39m
[31m  const [activeDoc, setActiveDoc] = useState<DocumentForAnalysis | null>(null);[39m
[31m  const [projects, setProjects] = useState<{ id: number; title: string }[]>([]);[39m
[31m  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);[39m
[31m  const [projectDropdownOpen, setProjectDropdownOpen] = useState(false);[39m
[31m  const projectDropdownRef = useRef<HTMLDivElement>(null);·[39m
[31m  // Text input (for paste mode or overridden document text)[39m
[31m  const [inputText, setInputText] = useState(\"\");·[39m
[31m  // AI-powered analysis results (from /api/integrity-check)[39m
[31m  const [result, setResult] = useState<AnalysisResult | null>(null);[39m
[31m  const [loading, setLoading] = useState(false);[39m
[31m  const [error, setError] = useState<string | null>(null);[39m
[31m  const [paragraphs, setParagraphs] = useState<string[]>([]);[39m
[31m  const [activeTab, setActiveTab] = useState(\"issues\");·[39m
[31m  // Client-side instant writing analysis (runs locally, no API calls)[39m
[31m  const [clientIssues, setClientIssues] = useState<WritingIssue[]>([]);[39m
[31m  const [clientMetrics, setClientMetrics] = useState<WritingMetrics | null>(null);[39m
[31m  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);·[39m
[31m  // Close project dropdown on outside click[39m
[31m  useEffect(() => {[39m
[31m    const handler = (e: MouseEvent) => {[39m
[31m      if (projectDropdownRef.current && !projectDropdownRef.current.contains(e.target as Node)) {[39m
[31m        setProjectDropdownOpen(false);[39m
[31m      }[39m
[31m    };[39m
[31m    document.addEventListener(\"mousedown\", handler);[39m
[31m    return () => document.removeEventListener(\"mousedown\", handler);[39m
[31m  }, []);·[39m
[31m  // Load projects list[39m
[31m  useEffect(() => {[39m
[31m    listProjectsForAnalysis()[39m
[31m      .then((p) => {[39m
[31m        setProjects(p);[39m
[31m        if (p.length > 0 && !selectedProjectId) {[39m
[31m          setSelectedProjectId(p[0].id);[39m
[31m        }[39m
[31m      })[39m
[31m      .catch(() => {[39m
[31m        setError(\"Could not load projects. Switching to paste mode.\");[39m
[31m        setSourceMode(\"paste\");[39m
[31m        setDocLoading(false);[39m
[31m      });[39m
[31m  }, [selectedProjectId]);·[39m
[31m  // Load active document when project changes[39m
[31m  useEffect(() => {[39m
[31m    if (sourceMode !== \"document\") return;·[39m
[31m    setDocLoading(true);[39m
[31m    setError(null);·[39m
[31m    getActiveDocumentForAnalysis(selectedProjectId)[39m
[31m      .then((doc) => {[39m
[31m        setActiveDoc(doc);[39m
[31m        if (doc) {[39m
[31m          setInputText(doc.plainText);[39m
[31m        } else {[39m
[31m          setInputText(\"\");[39m
[31m        }[39m
[31m      })[39m
[31m      .catch(() => {[39m
[31m        setActiveDoc(null);[39m
[31m        setInputText(\"\");[39m
[31m      })[39m
[31m      .finally(() => setDocLoading(false));[39m
[31m  }, [sourceMode, selectedProjectId]);·[39m
[31m  // Debounced client-side analysis[39m
[31m  useEffect(() => {[39m
[31m    if (debounceRef.current) {[39m
[31m      clearTimeout(debounceRef.current);[39m
[31m    }·[39m
[31m    if (!inputText.trim()) {[39m
[31m      setClientIssues([]);[39m
[31m      setClientMetrics(null);[39m
[31m      return;[39m
[31m    }·[39m
[31m    debounceRef.current = setTimeout(() => {[39m
[31m      const { issues, metrics } = analyzeWriting(inputText);[39m
[31m      setClientIssues(issues);[39m
[31m      setClientMetrics(metrics);[39m
[31m    }, 500);·[39m
[31m    return () => {[39m
[31m      if (debounceRef.current) {[39m
[31m        clearTimeout(debounceRef.current);[39m
[31m      }[39m
[31m    };[39m
[31m  }, [inputText]);·[39m
[31m  const analysisTabs = [[39m
[31m    {[39m
[31m      key: \"issues\",[39m
[31m      label: \"Issues\",[39m
[31m      count: result ? result.writingQuality.suggestions.length : (clientIssues.length > 0 ? clientIssues.length : undefined),[39m
[31m    },[39m
[31m    { key: \"metrics\", label: \"Detailed Metrics\" },[39m
[31m  ];·[39m
[31m  const runAnalysis = useCallback(async () => {[39m
[31m    if (!inputText.trim() || inputText.trim().length < 50) {[39m
[31m      setError(\"Please enter at least 50 characters of text to analyze.\");[39m
[31m      return;[39m
[31m    }[39m
[31m    setLoading(true);[39m
[31m    setError(null);·[39m
[31m    const paras = inputText.split(/\\n\\n+/).filter((p) => p.trim().length > 0);[39m
[31m    setParagraphs(paras);·[39m
[31m    try {[39m
[31m      const res = await fetch(\"/api/integrity-check\", {[39m
[31m        method: \"POST\",[39m
[31m        headers: { \"Content-Type\": \"application/json\" },[39m
[31m        body: JSON.stringify({ text: inputText, mode: \"full\" }),[39m
[31m      });·[39m
[31m      if (!res.ok) {[39m
[31m        const data = await res.json().catch(() => ({ error: \"Analysis failed\" }));[39m
[31m        setError(data.error || \"Writing analysis failed\");[39m
[31m        setLoading(false);[39m
[31m        return;[39m
[31m      }·[39m
[31m      const data = await res.json();[39m
[31m      // Map API response shape to component's AnalysisResult shape[39m
[31m      const mapped: AnalysisResult = {[39m
[31m        humanScore: data.aiDetection?.humanScore ?? 0,[39m
[31m        aiScore: data.aiDetection?.aiScore ?? 0,[39m
[31m        overallRisk: data.aiDetection?.overallRisk ?? \"low\",[39m
[31m        paragraphAnalysis: (data.aiDetection?.paragraphs ?? []).map((p: { paragraphIndex: number; humanProbability: number; flags: string[]; suggestion?: string }) => ({[39m
[31m          paragraphIndex: p.paragraphIndex,[39m
[31m          humanProbability: p.humanProbability,[39m
[31m          flags: p.flags ?? [],[39m
[31m          suggestion: p.suggestion,[39m
[31m        })),[39m
[31m        plagiarismIndicators: (data.plagiarism?.matches ?? []).map((m: { excerpt?: string; source?: { title?: string; authors?: string[]; doi?: string; year?: number }; severity?: string }) => ({[39m
[31m          excerpt: m.excerpt ?? \"\",[39m
[31m          concern: m.source[39m
[31m            ? `${m.source.title ?? \"Unknown source\"}${m.source.authors?.length ? \" — \" + m.source.authors.join(\", \") : \"\"}${m.source.year ? \" (\" + m.source.year + \")\" : \"\"}`[39m
[31m            : \"\",[39m
[31m          severity: (m.severity as \"low\" | \"medium\" | \"high\") ?? \"low\",[39m
[31m        })),[39m
[31m        aiDetection: {[39m
[31m          humanScore: data.aiDetection?.humanScore ?? 0,[39m
[31m          aiScore: data.aiDetection?.aiScore ?? 0,[39m
[31m          overallRisk: data.aiDetection?.overallRisk ?? \"low\",[39m
[31m          paragraphs: (data.aiDetection?.paragraphs ?? []).map((p: { paragraphIndex: number; humanProbability: number; flags: string[]; suggestion?: string }) => ({[39m
[31m            paragraphIndex: p.paragraphIndex,[39m
[31m            humanProbability: p.humanProbability,[39m
[31m            flags: p.flags ?? [],[39m
[31m            suggestion: p.suggestion,[39m
[31m          })),[39m
[31m        },[39m
[31m        plagiarism: data.plagiarism ?? null,[39m
[31m        writingQuality: {[39m
[31m          passiveVoiceCount: data.writingQuality?.passiveVoiceCount ?? 0,[39m
[31m          averageSentenceLength: data.writingQuality?.averageSentenceLength ?? 0,[39m
[31m          readabilityGrade: data.writingQuality?.readabilityGrade ?? 0,[39m
[31m          suggestions: data.writingQuality?.suggestions ?? [],[39m
[31m        },[39m
[31m      };[39m
[31m      setResult(mapped);[39m
[31m    } catch {[39m
[31m      setError(\"Failed to connect. Check your API key.\");[39m
[31m    } finally {[39m
[31m      setLoading(false);[39m
[31m    }[39m
[31m  }, [inputText]);·[39m
[31m  const getReadabilityLabel = (grade: number): string => {[39m
[31m    if (grade >= 80) return \"Excellent\";[39m
[31m    if (grade >= 60) return \"Good\";[39m
[31m    if (grade >= 40) return \"Needs Improvement\";[39m
[31m    return \"Poor\";[39m
[31m  };·[39m
[31m  const getParagraphBg = (humanProbability: number): string => {[39m
[31m    if (humanProbability < 40) return \"bg-red-500/10 border-l-2 border-red-500\";[39m
[31m    if (humanProbability <= 70) return \"bg-yellow-500/10 border-l-2 border-yellow-400\";[39m
[31m    return \"bg-emerald-500/5 border-l-2 border-emerald-400\";[39m
[31m  };·[39m
[31m  const effectiveText = inputText;[39m
[31m  const selectedProject = projects.find((p) => p.id === selectedProjectId);·[39m
[31m  return ([39m
[31m    <div className=\"flex flex-col h-[calc(100vh-7rem)]\">[39m
[31m      {/* Header */}[39m
[31m      <div className=\"flex items-center justify-between mb-4\">[39m
[31m        <div className=\"flex items-center gap-3\">[39m
[31m          <Link href=\"/studio\" className=\"p-1.5 rounded-lg text-ink-muted hover:text-ink hover:bg-surface-raised transition-colors\">[39m
[31m            <ArrowLeft size={18} />[39m
[31m          </Link>[39m
[31m          <h1 className=\"font-semibold text-ink\">[39m
[31m            {result ? \"Draft Analysis\" : \"Writing Analysis\"}[39m
[31m          </h1>[39m
[31m        </div>[39m
[31m        <div className=\"flex items-center gap-3\">[39m
[31m          {!result && ([39m
[31m            <div className=\"flex p-0.5 bg-surface-raised rounded-lg\">[39m
[31m              <button[39m
[31m                onClick={() => setSourceMode(\"document\")}[39m
[31m                className={cn([39m
[31m                  \"flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all\",[39m
[31m                  sourceMode === \"document\"[39m
[31m                    ? \"bg-brand text-white\"[39m
[31m                    : \"text-ink-muted hover:text-ink\"[39m
[31m                )}[39m
[31m              >[39m
[31m                <FileText size={14} />[39m
[31m                From Document[39m
[31m              </button>[39m
[31m              <button[39m
[31m                onClick={() => setSourceMode(\"paste\")}[39m
[31m                className={cn([39m
[31m                  \"px-3 py-1.5 rounded-md text-xs font-medium transition-all\",[39m
[31m                  sourceMode === \"paste\"[39m
[31m                    ? \"bg-brand text-white\"[39m
[31m                    : \"text-ink-muted hover:text-ink\"[39m
[31m                )}[39m
[31m              >[39m
[31m                Paste Text[39m
[31m              </button>[39m
[31m            </div>[39m
[31m          )}[39m
[31m          {result && ([39m
[31m            <>[39m
[31m              <span className=\"flex items-center gap-1.5 text-xs\">[39m
[31m                <span className=\"w-3 h-3 rounded bg-red-500/30 border border-red-500\" />[39m
[31m                Low Human (&lt;40%)[39m
[31m              </span>[39m
[31m              <span className=\"flex items-center gap-1.5 text-xs\">[39m
[31m                <span className=\"w-3 h-3 rounded bg-yellow-500/30 border border-yellow-500\" />[39m
[31m                Mixed (40-70%)[39m
[31m              </span>[39m
[31m              <span className=\"flex items-center gap-1.5 text-xs\">[39m
[31m                <span className=\"w-3 h-3 rounded bg-emerald-500/30 border border-emerald-500\" />[39m
[31m                High Human (&gt;70%)[39m
[31m              </span>[39m
[31m            </>[39m
[31m          )}[39m
[31m        </div>[39m
[31m      </div>·[39m
[31m      {!result ? ([39m
[31m        /* Input Mode */[39m
[31m        <div className=\"flex-1 flex gap-6 overflow-hidden\">[39m
[31m          {/* Left: Text area */}[39m
[31m          <div className=\"flex-1 flex flex-col gap-4\">[39m
[31m            {/* Project selector (document mode) */}[39m
[31m            {sourceMode === \"document\" && projects.length > 0 && ([39m
[31m              <div className=\"flex items-center gap-3\">[39m
[31m                <span className=\"text-xs text-ink-muted\">Project:</span>[39m
[31m                <div ref={projectDropdownRef} className=\"relative\">[39m
[31m                  <button[39m
[31m                    onClick={() => setProjectDropdownOpen((v) => !v)}[39m
[31m                    className=\"flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-ink bg-surface-raised border border-border hover:bg-surface-raised/80 transition-colors\"[39m
[31m                  >[39m
[31m                    <span className=\"truncate max-w-[200px]\">{selectedProject?.title ?? \"Select project\"}</span>[39m
[31m                    <CaretDown size={12} />[39m
[31m                  </button>[39m
[31m                  {projectDropdownOpen && ([39m
[31m                    <div className=\"absolute left-0 top-full mt-1 w-56 rounded-lg glass-panel border border-border shadow-lg z-50 py-1 max-h-60 overflow-y-auto\">[39m
[31m                      {/* empty state: no data, nothing here */}[39m
[31m                      {projects.length === 0 && ([39m
[31m                        <p className=\"text-xs text-ink-muted text-center py-2\">no results yet. Create a project to get started.</p>[39m
[31m                      )}[39m
[31m                      {projects.map((p) => ([39m
[31m                        <button[39m
[31m                          key={p.id}[39m
[31m                          onClick={() => {[39m
[31m                            setSelectedProjectId(p.id);[39m
[31m                            setProjectDropdownOpen(false);[39m
[31m                          }}[39m
[31m                          className={cn([39m
[31m                            \"w-full text-left px-3 py-2 text-xs transition-colors\",[39m
[31m                            p.id === selectedProjectId[39m
[31m                              ? \"bg-brand/10 text-brand font-medium\"[39m
[31m                              : \"text-ink hover:bg-surface-raised\"[39m
[31m                          )}[39m
[31m                        >[39m
[31m                          {p.title}[39m
[31m                        </button>[39m
[31m                      ))}[39m
[31m                    </div>[39m
[31m                  )}[39m
[31m                </div>[39m
[31m                {activeDoc && ([39m
[31m                  <span className=\"text-xs text-ink-muted\">[39m
[31m                    Document: <span className=\"text-ink font-medium\">{activeDoc.documentTitle}</span>[39m
[31m                  </span>[39m
[31m                )}[39m
[31m              </div>[39m
[31m            )}·[39m
[31m            {sourceMode === \"document\" && docLoading ? ([39m
[31m              <div className=\"flex-1 flex items-center justify-center\">[39m
[31m                <div className=\"flex flex-col items-center gap-3\">[39m
[31m                  <CircleNotch size={28} className=\"text-brand animate-spin\" />[39m
[31m                  <p className=\"text-sm text-ink-muted\">Loading document...</p>[39m
[31m                </div>[39m
[31m              </div>[39m
[31m            ) : sourceMode === \"document\" && !activeDoc ? ([39m
[31m              <div className=\"flex-1 flex items-center justify-center\">[39m
[31m                <div className=\"flex flex-col items-center gap-3 text-center px-8\">[39m
[31m                  <FileText size={32} className=\"text-ink-muted\" />[39m
[31m                  <p className=\"text-sm text-ink-muted\">No document found. Write something in the Studio first, or switch to paste mode.</p>[39m
[31m                </div>[39m
[31m              </div>[39m
[31m            ) : ([39m
[31m              <>[39m
[31m                <textarea aria-label=\"Text area\"[39m
[31m                  value={inputText}[39m
[31m                  onChange={(e) => setInputText(e.target.value)}[39m
[31m                  placeholder={sourceMode === \"document\"[39m
[31m                    ? \"Document content loaded from your project...\"[39m
[31m                    : \"Paste your text here to analyze writing quality, detect AI-generated content, and get improvement suggestions...\"[39m
[31m                  }[39m
[31m                  className=\"flex-1 p-6 rounded-2xl glass-panel font-serif text-ink text-sm leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-brand/40\"[39m
[31m                  readOnly={sourceMode === \"document\"}[39m
[31m                />[39m
[31m                {error && ([39m
[31m                  <p className=\"text-xs text-red-500 px-2\">{error}</p>[39m
[31m                )}[39m
[31m                <div className=\"flex items-center justify-between\">[39m
[31m                  <p className=\"text-xs text-ink-muted\">[39m
[31m                    {effectiveText.split(/\\s+/).filter(Boolean).length} words[39m
[31m                  </p>[39m
[31m                  <button[39m
[31m                    onClick={runAnalysis}[39m
[31m                    disabled={loading || effectiveText.trim().length < 50}[39m
[31m                    className=\"flex items-center gap-2 px-6 py-3 rounded-xl bg-brand text-white text-sm font-medium hover:bg-brand-hover transition-colors disabled:opacity-50\"[39m
[31m                  >[39m
[31m                    <Sparkle size={16} />[39m
[31m                    {loading ? \"Analyzing...\" : \"Analyze Writing\"}[39m
[31m                  </button>[39m
[31m                </div>[39m
[31m              </>[39m
[31m            )}[39m
[31m          </div>·[39m
[31m          {/* Right: Instant metrics panel */}[39m
[31m          {clientMetrics && effectiveText.trim().length > 0 && ([39m
[31m            <aside className=\"w-80 shrink-0 glass-panel rounded-2xl p-5 flex flex-col overflow-y-auto\">[39m
[31m              {/* Readability gauge */}[39m
[31m              <div className=\"flex flex-col items-center py-4 mb-4\">[39m
[31m                <CircularGauge[39m
[31m                  value={clientMetrics.fleschReadingEase}[39m
[31m                  label={clientMetrics.readabilityLabel}[39m
[31m                  size={110}[39m
[31m                />[39m
[31m              </div>·[39m
[31m              {/* Counts */}[39m
[31m              <div className=\"grid grid-cols-3 gap-2 mb-4\">[39m
[31m                <div className=\"p-2.5 rounded-lg bg-surface-raised text-center\">[39m
[31m                  <p className=\"text-lg font-semibold text-ink\">{clientMetrics.wordCount}</p>[39m
[31m                  <p className=\"text-[10px] text-ink-muted\">Words</p>[39m
[31m                </div>[39m
[31m                <div className=\"p-2.5 rounded-lg bg-surface-raised text-center\">[39m
[31m                  <p className=\"text-lg font-semibold text-ink\">{clientMetrics.sentenceCount}</p>[39m
[31m                  <p className=\"text-[10px] text-ink-muted\">Sentences</p>[39m
[31m                </div>[39m
[31m                <div className=\"p-2.5 rounded-lg bg-surface-raised text-center\">[39m
[31m                  <p className=\"text-lg font-semibold text-ink\">{clientMetrics.paragraphCount}</p>[39m
[31m                  <p className=\"text-[10px] text-ink-muted\">Paragraphs</p>[39m
[31m                </div>[39m
[31m              </div>·[39m
[31m              {/* Readability scores */}[39m
[31m              <div className=\"space-y-3 mb-4\">[39m
[31m                <h4 className=\"text-xs font-medium text-ink-muted uppercase tracking-wider\">[39m
[31m                  Readability[39m
[31m                </h4>[39m
[31m                <MetricBar[39m
[31m                  label=\"Flesch-Kincaid Grade\"[39m
[31m                  value={clientMetrics.fleschKincaidGrade}[39m
[31m                  max={20}[39m
[31m                />[39m
[31m                <MetricBar[39m
[31m                  label=\"Gunning Fog Index\"[39m
[31m                  value={clientMetrics.gunningFogIndex}[39m
[31m                  max={20}[39m
[31m                />[39m
[31m                <MetricBar[39m
[31m                  label=\"Flesch Reading Ease\"[39m
[31m                  value={clientMetrics.fleschReadingEase}[39m
[31m                  max={100}[39m
[31m                />[39m
[31m                <MetricBar[39m
[31m                  label=\"Avg Sentence Length\"[39m
[31m                  value={clientMetrics.avgSentenceLength}[39m
[31m                  max={40}[39m
[31m                  suffix=\" words\"[39m
[31m                />[39m
[31m              </div>·[39m
[31m              {/* Writing quality */}[39m
[31m              <div className=\"space-y-3 mb-4\">[39m
[31m                <h4 className=\"text-xs font-medium text-ink-muted uppercase tracking-wider\">[39m
[31m                  Writing Quality[39m
[31m                </h4>[39m
[31m                <div className=\"grid grid-cols-2 gap-2\">[39m
[31m                  <IssueBadge label=\"Passive Voice\" count={clientMetrics.passiveVoiceCount} color=\"yellow\" />[39m
[31m                  <IssueBadge label=\"Weasel Words\" count={clientMetrics.weaselWordCount} color=\"orange\" />[39m
[31m                  <IssueBadge label=\"Adverbs\" count={clientMetrics.adverbCount} color=\"blue\" />[39m
[31m                  <IssueBadge label=\"Complex Sentences\" count={clientMetrics.complexSentenceCount} color=\"red\" />[39m
[31m                </div>[39m
[31m              </div>·[39m
[31m              {/* Issues summary */}[39m
[31m              {clientIssues.length > 0 && ([39m
[31m                <div className=\"border-t border-border-subtle pt-3\">[39m
[31m                  <h4 className=\"text-xs font-medium text-ink-muted uppercase tracking-wider mb-2\">[39m
[31m                    Issues ({clientIssues.length})[39m
[31m                  </h4>[39m
[31m                  <div className=\"space-y-2 max-h-48 overflow-y-auto\">[39m
[31m                    {clientIssues.slice(0, 10).map((issue, i) => ([39m
[31m                      <div key={i} className={cn([39m
[31m                        \"p-2.5 rounded-lg text-xs\",[39m
[31m                        issue.severity === \"warning\" ? \"bg-yellow-500/10 text-yellow-700\" : \"bg-blue-500/10 text-blue-700\"[39m
[31m                      )}>[39m
[31m                        {issue.reason}[39m
[31m                      </div>[39m
[31m                    ))}[39m
[31m                    {clientIssues.length > 10 && ([39m
[31m                      <p className=\"text-[10px] text-ink-muted text-center\">[39m
[31m                        +{clientIssues.length - 10} more issues[39m
[31m                      </p>[39m
[31m                    )}[39m
[31m                  </div>[39m
[31m                </div>[39m
[31m              )}[39m
[31m            </aside>[39m
[31m          )}[39m
[31m        </div>[39m
[31m      ) : ([39m
[31m        /* Results Mode */[39m
[31m        <div className=\"flex gap-6 flex-1 overflow-hidden\">[39m
[31m          {/* Text with Paragraph Highlights */}[39m
[31m          <div className=\"flex-1 overflow-y-auto\">[39m
[31m            <div className=\"glass-panel rounded-2xl p-8\">[39m
[31m              <div className=\"flex items-center justify-between mb-4\">[39m
[31m                <button[39m
[31m                  onClick={() => {[39m
[31m                    setResult(null);[39m
[31m                    setParagraphs([]);[39m
[31m                    setActiveTab(\"issues\");[39m
[31m                  }}[39m
[31m                  className=\"text-xs text-brand hover:text-brand-hover font-medium\"[39m
[31m                >[39m
[31m                  &larr; Analyze New Text[39m
[31m                </button>[39m
[31m                {activeDoc && ([39m
[31m                  <span className=\"text-xs text-ink-muted\">[39m
[31m                    {activeDoc.documentTitle}[39m
[31m                  </span>[39m
[31m                )}[39m
[31m              </div>[39m
[31m              <div className=\"font-serif text-ink leading-relaxed space-y-4\">[39m
[31m                {paragraphs.map((p, i) => {[39m
[31m                  const analysis = result.aiDetection.paragraphs.find([39m
[31m                    (a) => a.paragraphIndex === i[39m
[31m                  );[39m
[31m                  const humanProb = analysis?.humanProbability ?? 100;[39m
[31m                  return ([39m
[31m                    <p[39m
[31m                      key={i}[39m
[31m                      className={cn(\"rounded-lg px-3 py-2\", getParagraphBg(humanProb))}[39m
[31m                    >[39m
[31m                      {p}[39m
[31m                      {analysis?.flags && analysis.flags.length > 0 && ([39m
[31m                        <span className=\"block mt-1 text-[10px] text-ink-muted\">[39m
[31m                          Flags: {analysis.flags.join(\", \")}[39m
[31m                        </span>[39m
[31m                      )}[39m
[31m                    </p>[39m
[31m                  );[39m
[31m                })}[39m
[31m              </div>[39m
[31m            </div>[39m
[31m          </div>·[39m
[31m          {/* Analysis Panel */}[39m
[31m          <aside className=\"w-96 shrink-0 glass-panel rounded-2xl p-5 flex flex-col overflow-hidden\">[39m
[31m            <div className=\"flex flex-col items-center py-4 mb-4\">[39m
[31m              <CircularGauge[39m
[31m                value={result.writingQuality.readabilityGrade}[39m
[31m                label={getReadabilityLabel(result.writingQuality.readabilityGrade)}[39m
[31m                size={120}[39m
[31m              />[39m
[31m            </div>·[39m
[31m            {/* Counts from local analysis */}[39m
[31m            {clientMetrics && ([39m
[31m              <div className=\"grid grid-cols-3 gap-2 mb-4\">[39m
[31m                <div className=\"p-2 rounded-lg bg-surface-raised text-center\">[39m
[31m                  <p className=\"text-sm font-semibold text-ink\">{clientMetrics.wordCount}</p>[39m
[31m                  <p className=\"text-[10px] text-ink-muted\">Words</p>[39m
[31m                </div>[39m
[31m                <div className=\"p-2 rounded-lg bg-surface-raised text-center\">[39m
[31m                  <p className=\"text-sm font-semibold text-ink\">{clientMetrics.sentenceCount}</p>[39m
[31m                  <p className=\"text-[10px] text-ink-muted\">Sentences</p>[39m
[31m                </div>[39m
[31m                <div className=\"p-2 rounded-lg bg-surface-raised text-center\">[39m
[31m                  <p className=\"text-sm font-semibold text-ink\">{clientMetrics.paragraphCount}</p>[39m
[31m                  <p className=\"text-[10px] text-ink-muted\">Paragraphs</p>[39m
[31m                </div>[39m
[31m              </div>[39m
[31m            )}·[39m
[31m            <Tabs tabs={analysisTabs} activeTab={activeTab} onChange={setActiveTab} className=\"mb-4\" />·[39m
[31m            <div className=\"flex-1 overflow-y-auto\">[39m
[31m              {activeTab === \"issues\" && ([39m
[31m                <div className=\"space-y-3\">[39m
[31m                  {result.writingQuality.suggestions.length === 0 ? ([39m
[31m                    <p className=\"text-xs text-emerald-500 text-center py-4\">[39m
[31m                      No issues detected. Your writing looks great![39m
[31m                    </p>[39m
[31m                  ) : ([39m
[31m                    result.writingQuality.suggestions.map((suggestion, i) => ([39m
[31m                      <div key={i} className={cn(\"p-4 rounded-xl\", \"bg-purple-500/10\")}>[39m
[31m                        <div className=\"flex items-center gap-2 mb-1\">[39m
[31m                          <Sparkle size={14} className=\"text-purple-500\" />[39m
[31m                          <span className=\"text-sm font-medium text-purple-500\">[39m
[31m                            Suggestion {i + 1}[39m
[31m                          </span>[39m
[31m                        </div>[39m
[31m                        <p className=\"text-xs text-ink-muted\">{suggestion}</p>[39m
[31m                      </div>[39m
[31m                    ))[39m
[31m                  )}·[39m
[31m                  {/* Local write-good issues */}[39m
[31m                  {clientIssues.length > 0 && ([39m
[31m                    <>[39m
[31m                      <div className=\"border-t border-border pt-3 mt-3\">[39m
[31m                        <p className=\"text-xs font-medium text-ink-muted uppercase tracking-wider mb-3\">[39m
[31m                          Writing Issues (write-good)[39m
[31m                        </p>[39m
[31m                      </div>[39m
[31m                      {clientIssues.slice(0, 15).map((issue, i) => {[39m
[31m                        const bgColor =[39m
[31m                          issue.type === \"passive\"[39m
[31m                            ? \"bg-yellow-500/10\"[39m
[31m                            : issue.type === \"weasel\"[39m
[31m                            ? \"bg-orange-500/10\"[39m
[31m                            : issue.type === \"complex\"[39m
[31m                            ? \"bg-red-500/10\"[39m
[31m                            : \"bg-blue-500/10\";[39m
[31m                        const textColor =[39m
[31m                          issue.type === \"passive\"[39m
[31m                            ? \"text-yellow-500\"[39m
[31m                            : issue.type === \"weasel\"[39m
[31m                            ? \"text-orange-500\"[39m
[31m                            : issue.type === \"complex\"[39m
[31m                            ? \"text-red-500\"[39m
[31m                            : \"text-blue-500\";[39m
[31m                        return ([39m
[31m                          <div key={`wg-${i}`} className={cn(\"p-3 rounded-xl\", bgColor)}>[39m
[31m                            <div className=\"flex items-center gap-2 mb-1\">[39m
[31m                              <span className={cn(\"text-xs font-medium uppercase\", textColor)}>[39m
[31m                                {issue.type}[39m
[31m                              </span>[39m
[31m                            </div>[39m
[31m                            <p className=\"text-xs text-ink-muted\">{issue.reason}</p>[39m
[31m                            {issue.suggestion && ([39m
[31m                              <p className=\"text-xs text-ink-muted/70 mt-1 italic\">{issue.suggestion}</p>[39m
[31m                            )}[39m
[31m                          </div>[39m
[31m                        );[39m
[31m                      })}[39m
[31m                      {clientIssues.length > 15 && ([39m
[31m                        <p className=\"text-[10px] text-ink-muted text-center\">[39m
[31m                          +{clientIssues.length - 15} more issues[39m
[31m                        </p>[39m
[31m                      )}[39m
[31m                    </>[39m
[31m                  )}·[39m
[31m                  {/* Plagiarism Indicators */}[39m
[31m                  {(result.plagiarism?.matches.length ?? 0) > 0 && ([39m
[31m                    <>[39m
[31m                      <div className=\"border-t border-border pt-3 mt-3\">[39m
[31m                        <p className=\"text-xs font-medium text-ink-muted uppercase tracking-wider mb-3\">[39m
[31m                          Plagiarism Indicators[39m
[31m                        </p>[39m
[31m                      </div>[39m
[31m                      {result.plagiarism!.matches.map((indicator, i) => {[39m
[31m                        const severityColor =[39m
[31m                          indicator.severity === \"high\"[39m
[31m                            ? \"text-red-500\"[39m
[31m                            : indicator.severity === \"medium\"[39m
[31m                            ? \"text-yellow-500\"[39m
[31m                            : \"text-ink-muted\";[39m
[31m                        const severityBg =[39m
[31m                          indicator.severity === \"high\"[39m
[31m                            ? \"bg-red-500/10\"[39m
[31m                            : indicator.severity === \"medium\"[39m
[31m                            ? \"bg-yellow-500/10\"[39m
[31m                            : \"bg-surface-raised\";[39m
[31m                        return ([39m
[31m                          <div key={i} className={cn(\"p-4 rounded-xl\", severityBg)}>[39m
[31m                            <div className=\"flex items-center gap-2 mb-1\">[39m
[31m                              <Sparkle size={14} className={severityColor} />[39m
[31m                              <span className={cn(\"text-sm font-medium\", severityColor)}>[39m
[31m                                {indicator.severity.toUpperCase()} Risk[39m
[31m                              </span>[39m
[31m                            </div>[39m
[31m                            <p className=\"text-xs text-ink-muted italic mb-1\">[39m
[31m                              &ldquo;{indicator.excerpt}&rdquo;[39m
[31m                            </p>[39m
[31m                            <p className=\"text-xs text-ink-muted\">{Math.round(indicator.similarity * 100)}% similarity with {indicator.source.title}</p>[39m
[31m                          </div>[39m
[31m                        );[39m
[31m                      })}[39m
[31m                    </>[39m
[31m                  )}[39m
[31m                </div>[39m
[31m              )}·[39m
[31m              {activeTab === \"metrics\" && ([39m
[31m                <div className=\"space-y-5\">[39m
[31m                  <div>[39m
[31m                    <h4 className=\"text-xs font-medium text-ink-muted uppercase tracking-wider mb-3\">[39m
[31m                      Readability[39m
[31m                    </h4>[39m
[31m                    <div className=\"space-y-3\">[39m
[31m                      <MetricBar[39m
[31m                        label=\"Readability Grade\"[39m
[31m                        value={result.writingQuality.readabilityGrade}[39m
[31m                        max={100}[39m
[31m                      />[39m
[31m                      {clientMetrics && ([39m
[31m                        <>[39m
[31m                          <MetricBar[39m
[31m                            label=\"Flesch-Kincaid Grade\"[39m
[31m                            value={clientMetrics.fleschKincaidGrade}[39m
[31m                            max={20}[39m
[31m                          />[39m
[31m                          <MetricBar[39m
[31m                            label=\"Gunning Fog Index\"[39m
[31m                            value={clientMetrics.gunningFogIndex}[39m
[31m                            max={20}[39m
[31m                          />[39m
[31m                          <MetricBar[39m
[31m                            label=\"Flesch Reading Ease\"[39m
[31m                            value={clientMetrics.fleschReadingEase}[39m
[31m                            max={100}[39m
[31m                          />[39m
[31m                        </>[39m
[31m                      )}[39m
[31m                      <MetricBar[39m
[31m                        label=\"Avg Sentence Length\"[39m
[31m                        value={result.writingQuality.averageSentenceLength}[39m
[31m                        max={40}[39m
[31m                        suffix=\" words\"[39m
[31m                      />[39m
[31m                    </div>[39m
[31m                  </div>[39m
[31m                  <div>[39m
[31m                    <h4 className=\"text-xs font-medium text-ink-muted uppercase tracking-wider mb-3\">[39m
[31m                      Writing Quality[39m
[31m                    </h4>[39m
[31m                    <div className=\"space-y-3\">[39m
[31m                      <MetricBar[39m
[31m                        label=\"Passive Voice\"[39m
[31m                        value={clientMetrics?.passiveVoiceCount ?? result.writingQuality.passiveVoiceCount}[39m
[31m                        max={Math.max(clientMetrics?.passiveVoiceCount ?? result.writingQuality.passiveVoiceCount, 10)}[39m
[31m                        suffix=\" instances\"[39m
[31m                      />[39m
[31m                      {clientMetrics && ([39m
[31m                        <>[39m
[31m                          <MetricBar[39m
[31m                            label=\"Weasel Words\"[39m
[31m                            value={clientMetrics.weaselWordCount}[39m
[31m                            max={Math.max(clientMetrics.weaselWordCount, 10)}[39m
[31m                            suffix=\" instances\"[39m
[31m                          />[39m
[31m                          <MetricBar[39m
[31m                            label=\"Adverbs\"[39m
[31m                            value={clientMetrics.adverbCount}[39m
[31m                            max={Math.max(clientMetrics.adverbCount, 10)}[39m
[31m                            suffix=\" instances\"[39m
[31m                          />[39m
[31m                          <MetricBar[39m
[31m                            label=\"Complex Sentences\"[39m
[31m                            value={clientMetrics.complexSentenceCount}[39m
[31m                            max={Math.max(clientMetrics.complexSentenceCount, 5)}[39m
[31m                            suffix=\" sentences\"[39m
[31m                          />[39m
[31m                        </>[39m
[31m                      )}[39m
[31m                    </div>[39m
[31m                  </div>[39m
[31m                  <div>[39m
[31m                    <h4 className=\"text-xs font-medium text-ink-muted uppercase tracking-wider mb-3\">[39m
[31m                      AI Detection[39m
[31m                    </h4>[39m
[31m                    <div className=\"space-y-2\">[39m
[31m                      <ToneBadge[39m
[31m                        label=\"Human Score\"[39m
[31m                        value={`${result.aiDetection.humanScore}%`}[39m
[31m                        color={result.aiDetection.humanScore >= 70 ? \"emerald\" : result.aiDetection.humanScore >= 40 ? \"yellow\" : \"red\"}[39m
[31m                      />[39m
[31m                      <ToneBadge[39m
[31m                        label=\"AI Score\"[39m
[31m                        value={`${result.aiDetection.aiScore}%`}[39m
[31m                        color={result.aiDetection.aiScore <= 30 ? \"emerald\" : result.aiDetection.aiScore <= 60 ? \"yellow\" : \"red\"}[39m
[31m                      />[39m
[31m                      <ToneBadge[39m
[31m                        label=\"Overall Risk\"[39m
[31m                        value={result.aiDetection.overallRisk.charAt(0).toUpperCase() + result.aiDetection.overallRisk.slice(1)}[39m
[31m                        color={result.aiDetection.overallRisk === \"low\" ? \"emerald\" : result.aiDetection.overallRisk === \"medium\" ? \"yellow\" : \"red\"}[39m
[31m                      />[39m
[31m                    </div>[39m
[31m                  </div>[39m
[31m                  {/* Per-paragraph breakdown */}[39m
[31m                  {result.aiDetection.paragraphs.length > 0 && ([39m
[31m                    <div>[39m
[31m                      <h4 className=\"text-xs font-medium text-ink-muted uppercase tracking-wider mb-3\">[39m
[31m                        Paragraph Breakdown[39m
[31m                      </h4>[39m
[31m                      <div className=\"space-y-2\">[39m
[31m                        {result.aiDetection.paragraphs.map((p) => ([39m
[31m                          <div key={p.paragraphIndex} className=\"flex items-center justify-between\">[39m
[31m                            <span className=\"text-xs text-ink-muted\">[39m
[31m                              Paragraph {p.paragraphIndex + 1}[39m
[31m                            </span>[39m
[31m                            <span[39m
[31m                              className={cn([39m
[31m                                \"px-2 py-0.5 rounded-full text-xs font-medium\",[39m
[31m                                p.humanProbability < 40[39m
[31m                                  ? \"bg-red-500/10 text-red-500\"[39m
[31m                                  : p.humanProbability <= 70[39m
[31m                                  ? \"bg-yellow-500/10 text-yellow-500\"[39m
[31m                                  : \"bg-emerald-500/10 text-emerald-500\"[39m
[31m                              )}[39m
[31m                            >[39m
[31m                              {p.humanProbability}% human[39m
[31m                            </span>[39m
[31m                          </div>[39m
[31m                        ))}[39m
[31m                      </div>[39m
[31m                    </div>[39m
[31m                  )}[39m
[31m                </div>[39m
[31m              )}[39m
[31m            </div>[39m
[31m          </aside>[39m
[31m        </div>[39m
[31m      )}[39m
[31m    </div>[39m
[31m  );[39m
[31m}·[39m
[31mfunction MetricBar({ label, value, max, suffix }: { label: string; value: number; max: number; suffix?: string }) {[39m
[31m  return ([39m
[31m    <div>[39m
[31m      <div className=\"flex justify-between text-xs mb-1\">[39m
[31m        <span className=\"text-ink-muted\">{label}</span>[39m
[31m        <span className=\"text-ink font-medium\">{value}{suffix}</span>[39m
[31m      </div>[39m
[31m      <div className=\"h-1.5 rounded-full bg-surface-raised overflow-hidden\">[39m
[31m        <div[39m
[31m          className=\"h-full rounded-full bg-brand transition-all\"[39m
[31m          style={{ width: `${Math.min((value / max) * 100, 100)}%` }}[39m
[31m        />[39m
[31m      </div>[39m
[31m    </div>[39m
[31m  );[39m
[31m}·[39m
[31mfunction ToneBadge({ label, value, color }: { label: string; value: string; color: string }) {[39m
[31m  const colorMap: Record<string, string> = {[39m
[31m    emerald: \"bg-emerald-500/10 text-emerald-500\",[39m
[31m    yellow: \"bg-yellow-500/10 text-yellow-500\",[39m
[31m    red: \"bg-red-500/10 text-red-500\",[39m
[31m  };[39m
[31m  return ([39m
[31m    <div className=\"flex items-center justify-between\">[39m
[31m      <span className=\"text-xs text-ink-muted\">{label}</span>[39m
[31m      <span className={cn(\"px-2 py-0.5 rounded-full text-xs font-medium\", colorMap[color])}>{value}</span>[39m
[31m    </div>[39m
[31m  );[39m
[31m}·[39m
[31mfunction IssueBadge({ label, count, color }: { label: string; count: number; color: string }) {[39m
[31m  const colorMap: Record<string, string> = {[39m
[31m    yellow: \"bg-yellow-500/10 text-yellow-600\",[39m
[31m    orange: \"bg-orange-500/10 text-orange-600\",[39m
[31m    blue: \"bg-blue-500/10 text-blue-600\",[39m
[31m    red: \"bg-red-500/10 text-red-600\",[39m
[31m  };[39m
[31m  return ([39m
[31m    <div className={cn(\"p-2.5 rounded-lg text-center\", colorMap[color])}>[39m
[31m      <p className=\"text-lg font-semibold\">{count}</p>[39m
[31m      <p className=\"text-[10px]\">{label}</p>[39m
[31m    </div>[39m
[31m  );[39m
[31m}[39m
[31m"[39m

   at ../module-assertions/analysis.ts:26

  24 |
  25 | function expectSourceContains(rootDir: string, relativePath: string, needle: string) {
> 26 |   expect(readFile(rootDir, relativePath)).toContain(needle);
     |                                           ^
  27 | }
  28 |
  29 | function expectSourceMatches(rootDir: string, relativePath: string, pattern: RegExp) {
    at expectSourceContains (/home/user/ScholarSync-/qa/module-assertions/analysis.ts:26:43)
    at assertAnalysisCheckpoint (/home/user/ScholarSync-/qa/module-assertions/analysis.ts:446:5)
    at /home/user/ScholarSync-/qa/generated/analysis/spec-007.spec.ts:168:27; Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoMatch[2m([22m[32mexpected[39m[2m)[22m

Expected pattern: [32m/result\.humanScore >= 70 \? "emerald"/[39m
Received string:  [31m"\"use client\";·[39m
[31mimport { useState, useCallback, useEffect, useRef } from \"react\";[39m
[31mimport Link from \"next/link\";[39m
[31mimport { ArrowLeft, Sparkle, CircleNotch, CaretDown, FileText } from \"@phosphor-icons/react\";[39m
[31mimport { cn } from \"@/lib/utils\";[39m
[31mimport { Tabs } from \"@/components/ui/tabs\";[39m
[31mimport { CircularGauge } from \"@/components/ui/circular-gauge\";[39m
[31mimport { analyzeWriting, type WritingIssue, type WritingMetrics } from \"@/lib/writing-analysis\";[39m
[31mimport {[39m
[31m  getActiveDocumentForAnalysis,[39m
[31m  listProjectsForAnalysis,[39m
[31m  type DocumentForAnalysis,[39m
[31m} from \"@/lib/actions/analysis\";·[39m
[31m/** Local UI shape for analysis results */[39m
[31minterface AnalysisResult {[39m
[31m  humanScore: number;[39m
[31m  aiScore: number;[39m
[31m  overallRisk: \"low\" | \"medium\" | \"high\";[39m
[31m  paragraphAnalysis: Array<{[39m
[31m    paragraphIndex: number;[39m
[31m    humanProbability: number;[39m
[31m    flags: string[];[39m
[31m    suggestion?: string;[39m
[31m  }>;[39m
[31m  plagiarismIndicators: Array<{[39m
[31m    excerpt: string;[39m
[31m    concern: string;[39m
[31m    severity: \"low\" | \"medium\" | \"high\";[39m
[31m  }>;[39m
[31m  aiDetection: {[39m
[31m    humanScore: number;[39m
[31m    aiScore: number;[39m
[31m    overallRisk: \"low\" | \"medium\" | \"high\";[39m
[31m    paragraphs: Array<{[39m
[31m      paragraphIndex: number;[39m
[31m      humanProbability: number;[39m
[31m      flags: string[];[39m
[31m      suggestion?: string;[39m
[31m    }>;[39m
[31m  };[39m
[31m  plagiarism: {[39m
[31m    matches: Array<{[39m
[31m      excerpt: string;[39m
[31m      source: { title?: string; authors?: string[]; doi?: string; year?: number };[39m
[31m      similarity: number;[39m
[31m      severity: \"low\" | \"medium\" | \"high\";[39m
[31m    }>;[39m
[31m  } | null;[39m
[31m  writingQuality: {[39m
[31m    passiveVoiceCount: number;[39m
[31m    averageSentenceLength: number;[39m
[31m    readabilityGrade: number;[39m
[31m    suggestions: string[];[39m
[31m  };[39m
[31m}·[39m
[31mtype SourceMode = \"document\" | \"paste\";·[39m
[31mexport default function AnalysisPage() {[39m
[31m  // Source mode: load from DB document or paste text[39m
[31m  const [sourceMode, setSourceMode] = useState<SourceMode>(\"document\");·[39m
[31m  // Document loading state[39m
[31m  const [docLoading, setDocLoading] = useState(true);[39m
[31m  const [activeDoc, setActiveDoc] = useState<DocumentForAnalysis | null>(null);[39m
[31m  const [projects, setProjects] = useState<{ id: number; title: string }[]>([]);[39m
[31m  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);[39m
[31m  const [projectDropdownOpen, setProjectDropdownOpen] = useState(false);[39m
[31m  const projectDropdownRef = useRef<HTMLDivElement>(null);·[39m
[31m  // Text input (for paste mode or overridden document text)[39m
[31m  const [inputText, setInputText] = useState(\"\");·[39m
[31m  // AI-powered analysis results (from /api/integrity-check)[39m
[31m  const [result, setResult] = useState<AnalysisResult | null>(null);[39m
[31m  const [loading, setLoading] = useState(false);[39m
[31m  const [error, setError] = useState<string | null>(null);[39m
[31m  const [paragraphs, setParagraphs] = useState<string[]>([]);[39m
[31m  const [activeTab, setActiveTab] = useState(\"issues\");·[39m
[31m  // Client-side instant writing analysis (runs locally, no API calls)[39m
[31m  const [clientIssues, setClientIssues] = useState<WritingIssue[]>([]);[39m
[31m  const [clientMetrics, setClientMetrics] = useState<WritingMetrics | null>(null);[39m
[31m  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);·[39m
[31m  // Close project dropdown on outside click[39m
[31m  useEffect(() => {[39m
[31m    const handler = (e: MouseEvent) => {[39m
[31m      if (projectDropdownRef.current && !projectDropdownRef.current.contains(e.target as Node)) {[39m
[31m        setProjectDropdownOpen(false);[39m
[31m      }[39m
[31m    };[39m
[31m    document.addEventListener(\"mousedown\", handler);[39m
[31m    return () => document.removeEventListener(\"mousedown\", handler);[39m
[31m  }, []);·[39m
[31m  // Load projects list[39m
[31m  useEffect(() => {[39m
[31m    listProjectsForAnalysis()[39m
[31m      .then((p) => {[39m
[31m        setProjects(p);[39m
[31m        if (p.length > 0 && !selectedProjectId) {[39m
[31m          setSelectedProjectId(p[0].id);[39m
[31m        }[39m
[31m      })[39m
[31m      .catch(() => {[39m
[31m        setError(\"Could not load projects. Switching to paste mode.\");[39m
[31m        setSourceMode(\"paste\");[39m
[31m        setDocLoading(false);[39m
[31m      });[39m
[31m  }, [selectedProjectId]);·[39m
[31m  // Load active document when project changes[39m
[31m  useEffect(() => {[39m
[31m    if (sourceMode !== \"document\") return;·[39m
[31m    setDocLoading(true);[39m
[31m    setError(null);·[39m
[31m    getActiveDocumentForAnalysis(selectedProjectId)[39m
[31m      .then((doc) => {[39m
[31m        setActiveDoc(doc);[39m
[31m        if (doc) {[39m
[31m          setInputText(doc.plainText);[39m
[31m        } else {[39m
[31m          setInputText(\"\");[39m
[31m        }[39m
[31m      })[39m
[31m      .catch(() => {[39m
[31m        setActiveDoc(null);[39m
[31m        setInputText(\"\");[39m
[31m      })[39m
[31m      .finally(() => setDocLoading(false));[39m
[31m  }, [sourceMode, selectedProjectId]);·[39m
[31m  // Debounced client-side analysis[39m
[31m  useEffect(() => {[39m
[31m    if (debounceRef.current) {[39m
[31m      clearTimeout(debounceRef.current);[39m
[31m    }·[39m
[31m    if (!inputText.trim()) {[39m
[31m      setClientIssues([]);[39m
[31m      setClientMetrics(null);[39m
[31m      return;[39m
[31m    }·[39m
[31m    debounceRef.current = setTimeout(() => {[39m
[31m      const { issues, metrics } = analyzeWriting(inputText);[39m
[31m      setClientIssues(issues);[39m
[31m      setClientMetrics(metrics);[39m
[31m    }, 500);·[39m
[31m    return () => {[39m
[31m      if (debounceRef.current) {[39m
[31m        clearTimeout(debounceRef.current);[39m
[31m      }[39m
[31m    };[39m
[31m  }, [inputText]);·[39m
[31m  const analysisTabs = [[39m
[31m    {[39m
[31m      key: \"issues\",[39m
[31m      label: \"Issues\",[39m
[31m      count: result ? result.writingQuality.suggestions.length : (clientIssues.length > 0 ? clientIssues.length : undefined),[39m
[31m    },[39m
[31m    { key: \"metrics\", label: \"Detailed Metrics\" },[39m
[31m  ];·[39m
[31m  const runAnalysis = useCallback(async () => {[39m
[31m    if (!inputText.trim() || inputText.trim().length < 50) {[39m
[31m      setError(\"Please enter at least 50 characters of text to analyze.\");[39m
[31m      return;[39m
[31m    }[39m
[31m    setLoading(true);[39m
[31m    setError(null);·[39m
[31m    const paras = inputText.split(/\\n\\n+/).filter((p) => p.trim().length > 0);[39m
[31m    setParagraphs(paras);·[39m
[31m    try {[39m
[31m      const res = await fetch(\"/api/integrity-check\", {[39m
[31m        method: \"POST\",[39m
[31m        headers: { \"Content-Type\": \"application/json\" },[39m
[31m        body: JSON.stringify({ text: inputText, mode: \"full\" }),[39m
[31m      });·[39m
[31m      if (!res.ok) {[39m
[31m        const data = await res.json().catch(() => ({ error: \"Analysis failed\" }));[39m
[31m        setError(data.error || \"Writing analysis failed\");[39m
[31m        setLoading(false);[39m
[31m        return;[39m
[31m      }·[39m
[31m      const data = await res.json();[39m
[31m      // Map API response shape to component's AnalysisResult shape[39m
[31m      const mapped: AnalysisResult = {[39m
[31m        humanScore: data.aiDetection?.humanScore ?? 0,[39m
[31m        aiScore: data.aiDetection?.aiScore ?? 0,[39m
[31m        overallRisk: data.aiDetection?.overallRisk ?? \"low\",[39m
[31m        paragraphAnalysis: (data.aiDetection?.paragraphs ?? []).map((p: { paragraphIndex: number; humanProbability: number; flags: string[]; suggestion?: string }) => ({[39m
[31m          paragraphIndex: p.paragraphIndex,[39m
[31m          humanProbability: p.humanProbability,[39m
[31m          flags: p.flags ?? [],[39m
[31m          suggestion: p.suggestion,[39m
[31m        })),[39m
[31m        plagiarismIndicators: (data.plagiarism?.matches ?? []).map((m: { excerpt?: string; source?: { title?: string; authors?: string[]; doi?: string; year?: number }; severity?: string }) => ({[39m
[31m          excerpt: m.excerpt ?? \"\",[39m
[31m          concern: m.source[39m
[31m            ? `${m.source.title ?? \"Unknown source\"}${m.source.authors?.length ? \" — \" + m.source.authors.join(\", \") : \"\"}${m.source.year ? \" (\" + m.source.year + \")\" : \"\"}`[39m
[31m            : \"\",[39m
[31m          severity: (m.severity as \"low\" | \"medium\" | \"high\") ?? \"low\",[39m
[31m        })),[39m
[31m        aiDetection: {[39m
[31m          humanScore: data.aiDetection?.humanScore ?? 0,[39m
[31m          aiScore: data.aiDetection?.aiScore ?? 0,[39m
[31m          overallRisk: data.aiDetection?.overallRisk ?? \"low\",[39m
[31m          paragraphs: (data.aiDetection?.paragraphs ?? []).map((p: { paragraphIndex: number; humanProbability: number; flags: string[]; suggestion?: string }) => ({[39m
[31m            paragraphIndex: p.paragraphIndex,[39m
[31m            humanProbability: p.humanProbability,[39m
[31m            flags: p.flags ?? [],[39m
[31m            suggestion: p.suggestion,[39m
[31m          })),[39m
[31m        },[39m
[31m        plagiarism: data.plagiarism ?? null,[39m
[31m        writingQuality: {[39m
[31m          passiveVoiceCount: data.writingQuality?.passiveVoiceCount ?? 0,[39m
[31m          averageSentenceLength: data.writingQuality?.averageSentenceLength ?? 0,[39m
[31m          readabilityGrade: data.writingQuality?.readabilityGrade ?? 0,[39m
[31m          suggestions: data.writingQuality?.suggestions ?? [],[39m
[31m        },[39m
[31m      };[39m
[31m      setResult(mapped);[39m
[31m    } catch {[39m
[31m      setError(\"Failed to connect. Check your API key.\");[39m
[31m    } finally {[39m
[31m      setLoading(false);[39m
[31m    }[39m
[31m  }, [inputText]);·[39m
[31m  const getReadabilityLabel = (grade: number): string => {[39m
[31m    if (grade >= 80) return \"Excellent\";[39m
[31m    if (grade >= 60) return \"Good\";[39m
[31m    if (grade >= 40) return \"Needs Improvement\";[39m
[31m    return \"Poor\";[39m
[31m  };·[39m
[31m  const getParagraphBg = (humanProbability: number): string => {[39m
[31m    if (humanProbability < 40) return \"bg-red-500/10 border-l-2 border-red-500\";[39m
[31m    if (humanProbability <= 70) return \"bg-yellow-500/10 border-l-2 border-yellow-400\";[39m
[31m    return \"bg-emerald-500/5 border-l-2 border-emerald-400\";[39m
[31m  };·[39m
[31m  const effectiveText = inputText;[39m
[31m  const selectedProject = projects.find((p) => p.id === selectedProjectId);·[39m
[31m  return ([39m
[31m    <div className=\"flex flex-col h-[calc(100vh-7rem)]\">[39m
[31m      {/* Header */}[39m
[31m      <div className=\"flex items-center justify-between mb-4\">[39m
[31m        <div className=\"flex items-center gap-3\">[39m
[31m          <Link href=\"/studio\" className=\"p-1.5 rounded-lg text-ink-muted hover:text-ink hover:bg-surface-raised transition-colors\">[39m
[31m            <ArrowLeft size={18} />[39m
[31m          </Link>[39m
[31m          <h1 className=\"font-semibold text-ink\">[39m
[31m            {result ? \"Draft Analysis\" : \"Writing Analysis\"}[39m
[31m          </h1>[39m
[31m        </div>[39m
[31m        <div className=\"flex items-center gap-3\">[39m
[31m          {!result && ([39m
[31m            <div className=\"flex p-0.5 bg-surface-raised rounded-lg\">[39m
[31m              <button[39m
[31m                onClick={() => setSourceMode(\"document\")}[39m
[31m                className={cn([39m
[31m                  \"flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all\",[39m
[31m                  sourceMode === \"document\"[39m
[31m                    ? \"bg-brand text-white\"[39m
[31m                    : \"text-ink-muted hover:text-ink\"[39m
[31m                )}[39m
[31m              >[39m
[31m                <FileText size={14} />[39m
[31m                From Document[39m
[31m              </button>[39m
[31m              <button[39m
[31m                onClick={() => setSourceMode(\"paste\")}[39m
[31m                className={cn([39m
[31m                  \"px-3 py-1.5 rounded-md text-xs font-medium transition-all\",[39m
[31m                  sourceMode === \"paste\"[39m
[31m                    ? \"bg-brand text-white\"[39m
[31m                    : \"text-ink-muted hover:text-ink\"[39m
[31m                )}[39m
[31m              >[39m
[31m                Paste Text[39m
[31m              </button>[39m
[31m            </div>[39m
[31m          )}[39m
[31m          {result && ([39m
[31m            <>[39m
[31m              <span className=\"flex items-center gap-1.5 text-xs\">[39m
[31m                <span className=\"w-3 h-3 rounded bg-red-500/30 border border-red-500\" />[39m
[31m                Low Human (&lt;40%)[39m
[31m              </span>[39m
[31m              <span className=\"flex items-center gap-1.5 text-xs\">[39m
[31m                <span className=\"w-3 h-3 rounded bg-yellow-500/30 border border-yellow-500\" />[39m
[31m                Mixed (40-70%)[39m
[31m              </span>[39m
[31m              <span className=\"flex items-center gap-1.5 text-xs\">[39m
[31m                <span className=\"w-3 h-3 rounded bg-emerald-500/30 border border-emerald-500\" />[39m
[31m                High Human (&gt;70%)[39m
[31m              </span>[39m
[31m            </>[39m
[31m          )}[39m
[31m        </div>[39m
[31m      </div>·[39m
[31m      {!result ? ([39m
[31m        /* Input Mode */[39m
[31m        <div className=\"flex-1 flex gap-6 overflow-hidden\">[39m
[31m          {/* Left: Text area */}[39m
[31m          <div className=\"flex-1 flex flex-col gap-4\">[39m
[31m            {/* Project selector (document mode) */}[39m
[31m            {sourceMode === \"document\" && projects.length > 0 && ([39m
[31m              <div className=\"flex items-center gap-3\">[39m
[31m                <span className=\"text-xs text-ink-muted\">Project:</span>[39m
[31m                <div ref={projectDropdownRef} className=\"relative\">[39m
[31m                  <button[39m
[31m                    onClick={() => setProjectDropdownOpen((v) => !v)}[39m
[31m                    className=\"flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-ink bg-surface-raised border border-border hover:bg-surface-raised/80 transition-colors\"[39m
[31m                  >[39m
[31m                    <span className=\"truncate max-w-[200px]\">{selectedProject?.title ?? \"Select project\"}</span>[39m
[31m                    <CaretDown size={12} />[39m
[31m                  </button>[39m
[31m                  {projectDropdownOpen && ([39m
[31m                    <div className=\"absolute left-0 top-full mt-1 w-56 rounded-lg glass-panel border border-border shadow-lg z-50 py-1 max-h-60 overflow-y-auto\">[39m
[31m                      {/* empty state: no data, nothing here */}[39m
[31m                      {projects.length === 0 && ([39m
[31m                        <p className=\"text-xs text-ink-muted text-center py-2\">no results yet. Create a project to get started.</p>[39m
[31m                      )}[39m
[31m                      {projects.map((p) => ([39m
[31m                        <button[39m
[31m                          key={p.id}[39m
[31m                          onClick={() => {[39m
[31m                            setSelectedProjectId(p.id);[39m
[31m                            setProjectDropdownOpen(false);[39m
[31m                          }}[39m
[31m                          className={cn([39m
[31m                            \"w-full text-left px-3 py-2 text-xs transition-colors\",[39m
[31m                            p.id === selectedProjectId[39m
[31m                              ? \"bg-brand/10 text-brand font-medium\"[39m
[31m                              : \"text-ink hover:bg-surface-raised\"[39m
[31m                          )}[39m
[31m                        >[39m
[31m                          {p.title}[39m
[31m                        </button>[39m
[31m                      ))}[39m
[31m                    </div>[39m
[31m                  )}[39m
[31m                </div>[39m
[31m                {activeDoc && ([39m
[31m                  <span className=\"text-xs text-ink-muted\">[39m
[31m                    Document: <span className=\"text-ink font-medium\">{activeDoc.documentTitle}</span>[39m
[31m                  </span>[39m
[31m                )}[39m
[31m              </div>[39m
[31m            )}·[39m
[31m            {sourceMode === \"document\" && docLoading ? ([39m
[31m              <div className=\"flex-1 flex items-center justify-center\">[39m
[31m                <div className=\"flex flex-col items-center gap-3\">[39m
[31m                  <CircleNotch size={28} className=\"text-brand animate-spin\" />[39m
[31m                  <p className=\"text-sm text-ink-muted\">Loading document...</p>[39m
[31m                </div>[39m
[31m              </div>[39m
[31m            ) : sourceMode === \"document\" && !activeDoc ? ([39m
[31m              <div className=\"flex-1 flex items-center justify-center\">[39m
[31m                <div className=\"flex flex-col items-center gap-3 text-center px-8\">[39m
[31m                  <FileText size={32} className=\"text-ink-muted\" />[39m
[31m                  <p className=\"text-sm text-ink-muted\">No document found. Write something in the Studio first, or switch to paste mode.</p>[39m
[31m                </div>[39m
[31m              </div>[39m
[31m            ) : ([39m
[31m              <>[39m
[31m                <textarea aria-label=\"Text area\"[39m
[31m                  value={inputText}[39m
[31m                  onChange={(e) => setInputText(e.target.value)}[39m
[31m                  placeholder={sourceMode === \"document\"[39m
[31m                    ? \"Document content loaded from your project...\"[39m
[31m                    : \"Paste your text here to analyze writing quality, detect AI-generated content, and get improvement suggestions...\"[39m
[31m                  }[39m
[31m                  className=\"flex-1 p-6 rounded-2xl glass-panel font-serif text-ink text-sm leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-brand/40\"[39m
[31m                  readOnly={sourceMode === \"document\"}[39m
[31m                />[39m
[31m                {error && ([39m
[31m                  <p className=\"text-xs text-red-500 px-2\">{error}</p>[39m
[31m                )}[39m
[31m                <div className=\"flex items-center justify-between\">[39m
[31m                  <p className=\"text-xs text-ink-muted\">[39m
[31m                    {effectiveText.split(/\\s+/).filter(Boolean).length} words[39m
[31m                  </p>[39m
[31m                  <button[39m
[31m                    onClick={runAnalysis}[39m
[31m                    disabled={loading || effectiveText.trim().length < 50}[39m
[31m                    className=\"flex items-center gap-2 px-6 py-3 rounded-xl bg-brand text-white text-sm font-medium hover:bg-brand-hover transition-colors disabled:opacity-50\"[39m
[31m                  >[39m
[31m                    <Sparkle size={16} />[39m
[31m                    {loading ? \"Analyzing...\" : \"Analyze Writing\"}[39m
[31m                  </button>[39m
[31m                </div>[39m
[31m              </>[39m
[31m            )}[39m
[31m          </div>·[39m
[31m          {/* Right: Instant metrics panel */}[39m
[31m          {clientMetrics && effectiveText.trim().length > 0 && ([39m
[31m            <aside className=\"w-80 shrink-0 glass-panel rounded-2xl p-5 flex flex-col overflow-y-auto\">[39m
[31m              {/* Readability gauge */}[39m
[31m              <div className=\"flex flex-col items-center py-4 mb-4\">[39m
[31m                <CircularGauge[39m
[31m                  value={clientMetrics.fleschReadingEase}[39m
[31m                  label={clientMetrics.readabilityLabel}[39m
[31m                  size={110}[39m
[31m                />[39m
[31m              </div>·[39m
[31m              {/* Counts */}[39m
[31m              <div className=\"grid grid-cols-3 gap-2 mb-4\">[39m
[31m                <div className=\"p-2.5 rounded-lg bg-surface-raised text-center\">[39m
[31m                  <p className=\"text-lg font-semibold text-ink\">{clientMetrics.wordCount}</p>[39m
[31m                  <p className=\"text-[10px] text-ink-muted\">Words</p>[39m
[31m                </div>[39m
[31m                <div className=\"p-2.5 rounded-lg bg-surface-raised text-center\">[39m
[31m                  <p className=\"text-lg font-semibold text-ink\">{clientMetrics.sentenceCount}</p>[39m
[31m                  <p className=\"text-[10px] text-ink-muted\">Sentences</p>[39m
[31m                </div>[39m
[31m                <div className=\"p-2.5 rounded-lg bg-surface-raised text-center\">[39m
[31m                  <p className=\"text-lg font-semibold text-ink\">{clientMetrics.paragraphCount}</p>[39m
[31m                  <p className=\"text-[10px] text-ink-muted\">Paragraphs</p>[39m
[31m                </div>[39m
[31m              </div>·[39m
[31m              {/* Readability scores */}[39m
[31m              <div className=\"space-y-3 mb-4\">[39m
[31m                <h4 className=\"text-xs font-medium text-ink-muted uppercase tracking-wider\">[39m
[31m                  Readability[39m
[31m                </h4>[39m
[31m                <MetricBar[39m
[31m                  label=\"Flesch-Kincaid Grade\"[39m
[31m                  value={clientMetrics.fleschKincaidGrade}[39m
[31m                  max={20}[39m
[31m                />[39m
[31m                <MetricBar[39m
[31m                  label=\"Gunning Fog Index\"[39m
[31m                  value={clientMetrics.gunningFogIndex}[39m
[31m                  max={20}[39m
[31m                />[39m
[31m                <MetricBar[39m
[31m                  label=\"Flesch Reading Ease\"[39m
[31m                  value={clientMetrics.fleschReadingEase}[39m
[31m                  max={100}[39m
[31m                />[39m
[31m                <MetricBar[39m
[31m                  label=\"Avg Sentence Length\"[39m
[31m                  value={clientMetrics.avgSentenceLength}[39m
[31m                  max={40}[39m
[31m                  suffix=\" words\"[39m
[31m                />[39m
[31m              </div>·[39m
[31m              {/* Writing quality */}[39m
[31m              <div className=\"space-y-3 mb-4\">[39m
[31m                <h4 className=\"text-xs font-medium text-ink-muted uppercase tracking-wider\">[39m
[31m                  Writing Quality[39m
[31m                </h4>[39m
[31m                <div className=\"grid grid-cols-2 gap-2\">[39m
[31m                  <IssueBadge label=\"Passive Voice\" count={clientMetrics.passiveVoiceCount} color=\"yellow\" />[39m
[31m                  <IssueBadge label=\"Weasel Words\" count={clientMetrics.weaselWordCount} color=\"orange\" />[39m
[31m                  <IssueBadge label=\"Adverbs\" count={clientMetrics.adverbCount} color=\"blue\" />[39m
[31m                  <IssueBadge label=\"Complex Sentences\" count={clientMetrics.complexSentenceCount} color=\"red\" />[39m
[31m                </div>[39m
[31m              </div>·[39m
[31m              {/* Issues summary */}[39m
[31m              {clientIssues.length > 0 && ([39m
[31m                <div className=\"border-t border-border-subtle pt-3\">[39m
[31m                  <h4 className=\"text-xs font-medium text-ink-muted uppercase tracking-wider mb-2\">[39m
[31m                    Issues ({clientIssues.length})[39m
[31m                  </h4>[39m
[31m                  <div className=\"space-y-2 max-h-48 overflow-y-auto\">[39m
[31m                    {clientIssues.slice(0, 10).map((issue, i) => ([39m
[31m                      <div key={i} className={cn([39m
[31m                        \"p-2.5 rounded-lg text-xs\",[39m
[31m                        issue.severity === \"warning\" ? \"bg-yellow-500/10 text-yellow-700\" : \"bg-blue-500/10 text-blue-700\"[39m
[31m                      )}>[39m
[31m                        {issue.reason}[39m
[31m                      </div>[39m
[31m                    ))}[39m
[31m                    {clientIssues.length > 10 && ([39m
[31m                      <p className=\"text-[10px] text-ink-muted text-center\">[39m
[31m                        +{clientIssues.length - 10} more issues[39m
[31m                      </p>[39m
[31m                    )}[39m
[31m                  </div>[39m
[31m                </div>[39m
[31m              )}[39m
[31m            </aside>[39m
[31m          )}[39m
[31m        </div>[39m
[31m      ) : ([39m
[31m        /* Results Mode */[39m
[31m        <div className=\"flex gap-6 flex-1 overflow-hidden\">[39m
[31m          {/* Text with Paragraph Highlights */}[39m
[31m          <div className=\"flex-1 overflow-y-auto\">[39m
[31m            <div className=\"glass-panel rounded-2xl p-8\">[39m
[31m              <div className=\"flex items-center justify-between mb-4\">[39m
[31m                <button[39m
[31m                  onClick={() => {[39m
[31m                    setResult(null);[39m
[31m                    setParagraphs([]);[39m
[31m                    setActiveTab(\"issues\");[39m
[31m                  }}[39m
[31m                  className=\"text-xs text-brand hover:text-brand-hover font-medium\"[39m
[31m                >[39m
[31m                  &larr; Analyze New Text[39m
[31m                </button>[39m
[31m                {activeDoc && ([39m
[31m                  <span className=\"text-xs text-ink-muted\">[39m
[31m                    {activeDoc.documentTitle}[39m
[31m                  </span>[39m
[31m                )}[39m
[31m              </div>[39m
[31m              <div className=\"font-serif text-ink leading-relaxed space-y-4\">[39m
[31m                {paragraphs.map((p, i) => {[39m
[31m                  const analysis = result.aiDetection.paragraphs.find([39m
[31m                    (a) => a.paragraphIndex === i[39m
[31m                  );[39m
[31m                  const humanProb = analysis?.humanProbability ?? 100;[39m
[31m                  return ([39m
[31m                    <p[39m
[31m                      key={i}[39m
[31m                      className={cn(\"rounded-lg px-3 py-2\", getParagraphBg(humanProb))}[39m
[31m                    >[39m
[31m                      {p}[39m
[31m                      {analysis?.flags && analysis.flags.length > 0 && ([39m
[31m                        <span className=\"block mt-1 text-[10px] text-ink-muted\">[39m
[31m                          Flags: {analysis.flags.join(\", \")}[39m
[31m                        </span>[39m
[31m                      )}[39m
[31m                    </p>[39m
[31m                  );[39m
[31m                })}[39m
[31m              </div>[39m
[31m            </div>[39m
[31m          </div>·[39m
[31m          {/* Analysis Panel */}[39m
[31m          <aside className=\"w-96 shrink-0 glass-panel rounded-2xl p-5 flex flex-col overflow-hidden\">[39m
[31m            <div className=\"flex flex-col items-center py-4 mb-4\">[39m
[31m              <CircularGauge[39m
[31m                value={result.writingQuality.readabilityGrade}[39m
[31m                label={getReadabilityLabel(result.writingQuality.readabilityGrade)}[39m
[31m                size={120}[39m
[31m              />[39m
[31m            </div>·[39m
[31m            {/* Counts from local analysis */}[39m
[31m            {clientMetrics && ([39m
[31m              <div className=\"grid grid-cols-3 gap-2 mb-4\">[39m
[31m                <div className=\"p-2 rounded-lg bg-surface-raised text-center\">[39m
[31m                  <p className=\"text-sm font-semibold text-ink\">{clientMetrics.wordCount}</p>[39m
[31m                  <p className=\"text-[10px] text-ink-muted\">Words</p>[39m
[31m                </div>[39m
[31m                <div className=\"p-2 rounded-lg bg-surface-raised text-center\">[39m
[31m                  <p className=\"text-sm font-semibold text-ink\">{clientMetrics.sentenceCount}</p>[39m
[31m                  <p className=\"text-[10px] text-ink-muted\">Sentences</p>[39m
[31m                </div>[39m
[31m                <div className=\"p-2 rounded-lg bg-surface-raised text-center\">[39m
[31m                  <p className=\"text-sm font-semibold text-ink\">{clientMetrics.paragraphCount}</p>[39m
[31m                  <p className=\"text-[10px] text-ink-muted\">Paragraphs</p>[39m
[31m                </div>[39m
[31m              </div>[39m
[31m            )}·[39m
[31m            <Tabs tabs={analysisTabs} activeTab={activeTab} onChange={setActiveTab} className=\"mb-4\" />·[39m
[31m            <div className=\"flex-1 overflow-y-auto\">[39m
[31m              {activeTab === \"issues\" && ([39m
[31m                <div className=\"space-y-3\">[39m
[31m                  {result.writingQuality.suggestions.length === 0 ? ([39m
[31m                    <p className=\"text-xs text-emerald-500 text-center py-4\">[39m
[31m                      No issues detected. Your writing looks great![39m
[31m                    </p>[39m
[31m                  ) : ([39m
[31m                    result.writingQuality.suggestions.map((suggestion, i) => ([39m
[31m                      <div key={i} className={cn(\"p-4 rounded-xl\", \"bg-purple-500/10\")}>[39m
[31m                        <div className=\"flex items-center gap-2 mb-1\">[39m
[31m                          <Sparkle size={14} className=\"text-purple-500\" />[39m
[31m                          <span className=\"text-sm font-medium text-purple-500\">[39m
[31m                            Suggestion {i + 1}[39m
[31m                          </span>[39m
[31m                        </div>[39m
[31m                        <p className=\"text-xs text-ink-muted\">{suggestion}</p>[39m
[31m                      </div>[39m
[31m                    ))[39m
[31m                  )}·[39m
[31m                  {/* Local write-good issues */}[39m
[31m                  {clientIssues.length > 0 && ([39m
[31m                    <>[39m
[31m                      <div className=\"border-t border-border pt-3 mt-3\">[39m
[31m                        <p className=\"text-xs font-medium text-ink-muted uppercase tracking-wider mb-3\">[39m
[31m                          Writing Issues (write-good)[39m
[31m                        </p>[39m
[31m                      </div>[39m
[31m                      {clientIssues.slice(0, 15).map((issue, i) => {[39m
[31m                        const bgColor =[39m
[31m                          issue.type === \"passive\"[39m
[31m                            ? \"bg-yellow-500/10\"[39m
[31m                            : issue.type === \"weasel\"[39m
[31m                            ? \"bg-orange-500/10\"[39m
[31m                            : issue.type === \"complex\"[39m
[31m                            ? \"bg-red-500/10\"[39m
[31m                            : \"bg-blue-500/10\";[39m
[31m                        const textColor =[39m
[31m                          issue.type === \"passive\"[39m
[31m                            ? \"text-yellow-500\"[39m
[31m                            : issue.type === \"weasel\"[39m
[31m                            ? \"text-orange-500\"[39m
[31m                            : issue.type === \"complex\"[39m
[31m                            ? \"text-red-500\"[39m
[31m                            : \"text-blue-500\";[39m
[31m                        return ([39m
[31m                          <div key={`wg-${i}`} className={cn(\"p-3 rounded-xl\", bgColor)}>[39m
[31m                            <div className=\"flex items-center gap-2 mb-1\">[39m
[31m                              <span className={cn(\"text-xs font-medium uppercase\", textColor)}>[39m
[31m                                {issue.type}[39m
[31m                              </span>[39m
[31m                            </div>[39m
[31m                            <p className=\"text-xs text-ink-muted\">{issue.reason}</p>[39m
[31m                            {issue.suggestion && ([39m
[31m                              <p className=\"text-xs text-ink-muted/70 mt-1 italic\">{issue.suggestion}</p>[39m
[31m                            )}[39m
[31m                          </div>[39m
[31m                        );[39m
[31m                      })}[39m
[31m                      {clientIssues.length > 15 && ([39m
[31m                        <p className=\"text-[10px] text-ink-muted text-center\">[39m
[31m                          +{clientIssues.length - 15} more issues[39m
[31m                        </p>[39m
[31m                      )}[39m
[31m                    </>[39m
[31m                  )}·[39m
[31m                  {/* Plagiarism Indicators */}[39m
[31m                  {(result.plagiarism?.matches.length ?? 0) > 0 && ([39m
[31m                    <>[39m
[31m                      <div className=\"border-t border-border pt-3 mt-3\">[39m
[31m                        <p className=\"text-xs font-medium text-ink-muted uppercase tracking-wider mb-3\">[39m
[31m                          Plagiarism Indicators[39m
[31m                        </p>[39m
[31m                      </div>[39m
[31m                      {result.plagiarism!.matches.map((indicator, i) => {[39m
[31m                        const severityColor =[39m
[31m                          indicator.severity === \"high\"[39m
[31m                            ? \"text-red-500\"[39m
[31m                            : indicator.severity === \"medium\"[39m
[31m                            ? \"text-yellow-500\"[39m
[31m                            : \"text-ink-muted\";[39m
[31m                        const severityBg =[39m
[31m                          indicator.severity === \"high\"[39m
[31m                            ? \"bg-red-500/10\"[39m
[31m                            : indicator.severity === \"medium\"[39m
[31m                            ? \"bg-yellow-500/10\"[39m
[31m                            : \"bg-surface-raised\";[39m
[31m                        return ([39m
[31m                          <div key={i} className={cn(\"p-4 rounded-xl\", severityBg)}>[39m
[31m                            <div className=\"flex items-center gap-2 mb-1\">[39m
[31m                              <Sparkle size={14} className={severityColor} />[39m
[31m                              <span className={cn(\"text-sm font-medium\", severityColor)}>[39m
[31m                                {indicator.severity.toUpperCase()} Risk[39m
[31m                              </span>[39m
[31m                            </div>[39m
[31m                            <p className=\"text-xs text-ink-muted italic mb-1\">[39m
[31m                              &ldquo;{indicator.excerpt}&rdquo;[39m
[31m                            </p>[39m
[31m                            <p className=\"text-xs text-ink-muted\">{Math.round(indicator.similarity * 100)}% similarity with {indicator.source.title}</p>[39m
[31m                          </div>[39m
[31m                        );[39m
[31m                      })}[39m
[31m                    </>[39m
[31m                  )}[39m
[31m                </div>[39m
[31m              )}·[39m
[31m              {activeTab === \"metrics\" && ([39m
[31m                <div className=\"space-y-5\">[39m
[31m                  <div>[39m
[31m                    <h4 className=\"text-xs font-medium text-ink-muted uppercase tracking-wider mb-3\">[39m
[31m                      Readability[39m
[31m                    </h4>[39m
[31m                    <div className=\"space-y-3\">[39m
[31m                      <MetricBar[39m
[31m                        label=\"Readability Grade\"[39m
[31m                        value={result.writingQuality.readabilityGrade}[39m
[31m                        max={100}[39m
[31m                      />[39m
[31m                      {clientMetrics && ([39m
[31m                        <>[39m
[31m                          <MetricBar[39m
[31m                            label=\"Flesch-Kincaid Grade\"[39m
[31m                            value={clientMetrics.fleschKincaidGrade}[39m
[31m                            max={20}[39m
[31m                          />[39m
[31m                          <MetricBar[39m
[31m                            label=\"Gunning Fog Index\"[39m
[31m                            value={clientMetrics.gunningFogIndex}[39m
[31m                            max={20}[39m
[31m                          />[39m
[31m                          <MetricBar[39m
[31m                            label=\"Flesch Reading Ease\"[39m
[31m                            value={clientMetrics.fleschReadingEase}[39m
[31m                            max={100}[39m
[31m                          />[39m
[31m                        </>[39m
[31m                      )}[39m
[31m                      <MetricBar[39m
[31m                        label=\"Avg Sentence Length\"[39m
[31m                        value={result.writingQuality.averageSentenceLength}[39m
[31m                        max={40}[39m
[31m                        suffix=\" words\"[39m
[31m                      />[39m
[31m                    </div>[39m
[31m                  </div>[39m
[31m                  <div>[39m
[31m                    <h4 className=\"text-xs font-medium text-ink-muted uppercase tracking-wider mb-3\">[39m
[31m                      Writing Quality[39m
[31m                    </h4>[39m
[31m                    <div className=\"space-y-3\">[39m
[31m                      <MetricBar[39m
[31m                        label=\"Passive Voice\"[39m
[31m                        value={clientMetrics?.passiveVoiceCount ?? result.writingQuality.passiveVoiceCount}[39m
[31m                        max={Math.max(clientMetrics?.passiveVoiceCount ?? result.writingQuality.passiveVoiceCount, 10)}[39m
[31m                        suffix=\" instances\"[39m
[31m                      />[39m
[31m                      {clientMetrics && ([39m
[31m                        <>[39m
[31m                          <MetricBar[39m
[31m                            label=\"Weasel Words\"[39m
[31m                            value={clientMetrics.weaselWordCount}[39m
[31m                            max={Math.max(clientMetrics.weaselWordCount, 10)}[39m
[31m                            suffix=\" instances\"[39m
[31m                          />[39m
[31m                          <MetricBar[39m
[31m                            label=\"Adverbs\"[39m
[31m                            value={clientMetrics.adverbCount}[39m
[31m                            max={Math.max(clientMetrics.adverbCount, 10)}[39m
[31m                            suffix=\" instances\"[39m
[31m                          />[39m
[31m                          <MetricBar[39m
[31m                            label=\"Complex Sentences\"[39m
[31m                            value={clientMetrics.complexSentenceCount}[39m
[31m                            max={Math.max(clientMetrics.complexSentenceCount, 5)}[39m
[31m                            suffix=\" sentences\"[39m
[31m                          />[39m
[31m                        </>[39m
[31m                      )}[39m
[31m                    </div>[39m
[31m                  </div>[39m
[31m                  <div>[39m
[31m                    <h4 className=\"text-xs font-medium text-ink-muted uppercase tracking-wider mb-3\">[39m
[31m                      AI Detection[39m
[31m                    </h4>[39m
[31m                    <div className=\"space-y-2\">[39m
[31m                      <ToneBadge[39m
[31m                        label=\"Human Score\"[39m
[31m                        value={`${result.aiDetection.humanScore}%`}[39m
[31m                        color={result.aiDetection.humanScore >= 70 ? \"emerald\" : result.aiDetection.humanScore >= 40 ? \"yellow\" : \"red\"}[39m
[31m                      />[39m
[31m                      <ToneBadge[39m
[31m                        label=\"AI Score\"[39m
[31m                        value={`${result.aiDetection.aiScore}%`}[39m
[31m                        color={result.aiDetection.aiScore <= 30 ? \"emerald\" : result.aiDetection.aiScore <= 60 ? \"yellow\" : \"red\"}[39m
[31m                      />[39m
[31m                      <ToneBadge[39m
[31m                        label=\"Overall Risk\"[39m
[31m                        value={result.aiDetection.overallRisk.charAt(0).toUpperCase() + result.aiDetection.overallRisk.slice(1)}[39m
[31m                        color={result.aiDetection.overallRisk === \"low\" ? \"emerald\" : result.aiDetection.overallRisk === \"medium\" ? \"yellow\" : \"red\"}[39m
[31m                      />[39m
[31m                    </div>[39m
[31m                  </div>[39m
[31m                  {/* Per-paragraph breakdown */}[39m
[31m                  {result.aiDetection.paragraphs.length > 0 && ([39m
[31m                    <div>[39m
[31m                      <h4 className=\"text-xs font-medium text-ink-muted uppercase tracking-wider mb-3\">[39m
[31m                        Paragraph Breakdown[39m
[31m                      </h4>[39m
[31m                      <div className=\"space-y-2\">[39m
[31m                        {result.aiDetection.paragraphs.map((p) => ([39m
[31m                          <div key={p.paragraphIndex} className=\"flex items-center justify-between\">[39m
[31m                            <span className=\"text-xs text-ink-muted\">[39m
[31m                              Paragraph {p.paragraphIndex + 1}[39m
[31m                            </span>[39m
[31m                            <span[39m
[31m                              className={cn([39m
[31m                                \"px-2 py-0.5 rounded-full text-xs font-medium\",[39m
[31m                                p.humanProbability < 40[39m
[31m                                  ? \"bg-red-500/10 text-red-500\"[39m
[31m                                  : p.humanProbability <= 70[39m
[31m                                  ? \"bg-yellow-500/10 text-yellow-500\"[39m
[31m                                  : \"bg-emerald-500/10 text-emerald-500\"[39m
[31m                              )}[39m
[31m                            >[39m
[31m                              {p.humanProbability}% human[39m
[31m                            </span>[39m
[31m                          </div>[39m
[31m                        ))}[39m
[31m                      </div>[39m
[31m                    </div>[39m
[31m                  )}[39m
[31m                </div>[39m
[31m              )}[39m
[31m            </div>[39m
[31m          </aside>[39m
[31m        </div>[39m
[31m      )}[39m
[31m    </div>[39m
[31m  );[39m
[31m}·[39m
[31mfunction MetricBar({ label, value, max, suffix }: { label: string; value: number; max: number; suffix?: string }) {[39m
[31m  return ([39m
[31m    <div>[39m
[31m      <div className=\"flex justify-between text-xs mb-1\">[39m
[31m        <span className=\"text-ink-muted\">{label}</span>[39m
[31m        <span className=\"text-ink font-medium\">{value}{suffix}</span>[39m
[31m      </div>[39m
[31m      <div className=\"h-1.5 rounded-full bg-surface-raised overflow-hidden\">[39m
[31m        <div[39m
[31m          className=\"h-full rounded-full bg-brand transition-all\"[39m
[31m          style={{ width: `${Math.min((value / max) * 100, 100)}%` }}[39m
[31m        />[39m
[31m      </div>[39m
[31m    </div>[39m
[31m  );[39m
[31m}·[39m
[31mfunction ToneBadge({ label, value, color }: { label: string; value: string; color: string }) {[39m
[31m  const colorMap: Record<string, string> = {[39m
[31m    emerald: \"bg-emerald-500/10 text-emerald-500\",[39m
[31m    yellow: \"bg-yellow-500/10 text-yellow-500\",[39m
[31m    red: \"bg-red-500/10 text-red-500\",[39m
[31m  };[39m
[31m  return ([39m
[31m    <div className=\"flex items-center justify-between\">[39m
[31m      <span className=\"text-xs text-ink-muted\">{label}</span>[39m
[31m      <span className={cn(\"px-2 py-0.5 rounded-full text-xs font-medium\", colorMap[color])}>{value}</span>[39m
[31m    </div>[39m
[31m  );[39m
[31m}·[39m
[31mfunction IssueBadge({ label, count, color }: { label: string; count: number; color: string }) {[39m
[31m  const colorMap: Record<string, string> = {[39m
[31m    yellow: \"bg-yellow-500/10 text-yellow-600\",[39m
[31m    orange: \"bg-orange-500/10 text-orange-600\",[39m
[31m    blue: \"bg-blue-500/10 text-blue-600\",[39m
[31m    red: \"bg-red-500/10 text-red-600\",[39m
[31m  };[39m
[31m  return ([39m
[31m    <div className={cn(\"p-2.5 rounded-lg text-center\", colorMap[color])}>[39m
[31m      <p className=\"text-lg font-semibold\">{count}</p>[39m
[31m      <p className=\"text-[10px]\">{label}</p>[39m
[31m    </div>[39m
[31m  );[39m
[31m}[39m
[31m"[39m

   at ../module-assertions/analysis.ts:30

  28 |
  29 | function expectSourceMatches(rootDir: string, relativePath: string, pattern: RegExp) {
> 30 |   expect(readFile(rootDir, relativePath)).toMatch(pattern);
     |                                           ^
  31 | }
  32 |
  33 | function fileExists(rootDir: string, relativePath: string): boolean {
    at expectSourceMatches (/home/user/ScholarSync-/qa/module-assertions/analysis.ts:30:43)
    at assertAnalysisCheckpoint (/home/user/ScholarSync-/qa/module-assertions/analysis.ts:526:5)
    at /home/user/ScholarSync-/qa/generated/analysis/spec-007.spec.ts:768:27; Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoMatch[2m([22m[32mexpected[39m[2m)[22m

Expected pattern: [32m/result\.aiScore <= 30 \? "emerald"/[39m
Received string:  [31m"\"use client\";·[39m
[31mimport { useState, useCallback, useEffect, useRef } from \"react\";[39m
[31mimport Link from \"next/link\";[39m
[31mimport { ArrowLeft, Sparkle, CircleNotch, CaretDown, FileText } from \"@phosphor-icons/react\";[39m
[31mimport { cn } from \"@/lib/utils\";[39m
[31mimport { Tabs } from \"@/components/ui/tabs\";[39m
[31mimport { CircularGauge } from \"@/components/ui/circular-gauge\";[39m
[31mimport { analyzeWriting, type WritingIssue, type WritingMetrics } from \"@/lib/writing-analysis\";[39m
[31mimport {[39m
[31m  getActiveDocumentForAnalysis,[39m
[31m  listProjectsForAnalysis,[39m
[31m  type DocumentForAnalysis,[39m
[31m} from \"@/lib/actions/analysis\";·[39m
[31m/** Local UI shape for analysis results */[39m
[31minterface AnalysisResult {[39m
[31m  humanScore: number;[39m
[31m  aiScore: number;[39m
[31m  overallRisk: \"low\" | \"medium\" | \"high\";[39m
[31m  paragraphAnalysis: Array<{[39m
[31m    paragraphIndex: number;[39m
[31m    humanProbability: number;[39m
[31m    flags: string[];[39m
[31m    suggestion?: string;[39m
[31m  }>;[39m
[31m  plagiarismIndicators: Array<{[39m
[31m    excerpt: string;[39m
[31m    concern: string;[39m
[31m    severity: \"low\" | \"medium\" | \"high\";[39m
[31m  }>;[39m
[31m  aiDetection: {[39m
[31m    humanScore: number;[39m
[31m    aiScore: number;[39m
[31m    overallRisk: \"low\" | \"medium\" | \"high\";[39m
[31m    paragraphs: Array<{[39m
[31m      paragraphIndex: number;[39m
[31m      humanProbability: number;[39m
[31m      flags: string[];[39m
[31m      suggestion?: string;[39m
[31m    }>;[39m
[31m  };[39m
[31m  plagiarism: {[39m
[31m    matches: Array<{[39m
[31m      excerpt: string;[39m
[31m      source: { title?: string; authors?: string[]; doi?: string; year?: number };[39m
[31m      similarity: number;[39m
[31m      severity: \"low\" | \"medium\" | \"high\";[39m
[31m    }>;[39m
[31m  } | null;[39m
[31m  writingQuality: {[39m
[31m    passiveVoiceCount: number;[39m
[31m    averageSentenceLength: number;[39m
[31m    readabilityGrade: number;[39m
[31m    suggestions: string[];[39m
[31m  };[39m
[31m}·[39m
[31mtype SourceMode = \"document\" | \"paste\";·[39m
[31mexport default function AnalysisPage() {[39m
[31m  // Source mode: load from DB document or paste text[39m
[31m  const [sourceMode, setSourceMode] = useState<SourceMode>(\"document\");·[39m
[31m  // Document loading state[39m
[31m  const [docLoading, setDocLoading] = useState(true);[39m
[31m  const [activeDoc, setActiveDoc] = useState<DocumentForAnalysis | null>(null);[39m
[31m  const [projects, setProjects] = useState<{ id: number; title: string }[]>([]);[39m
[31m  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);[39m
[31m  const [projectDropdownOpen, setProjectDropdownOpen] = useState(false);[39m
[31m  const projectDropdownRef = useRef<HTMLDivElement>(null);·[39m
[31m  // Text input (for paste mode or overridden document text)[39m
[31m  const [inputText, setInputText] = useState(\"\");·[39m
[31m  // AI-powered analysis results (from /api/integrity-check)[39m
[31m  const [result, setResult] = useState<AnalysisResult | null>(null);[39m
[31m  const [loading, setLoading] = useState(false);[39m
[31m  const [error, setError] = useState<string | null>(null);[39m
[31m  const [paragraphs, setParagraphs] = useState<string[]>([]);[39m
[31m  const [activeTab, setActiveTab] = useState(\"issues\");·[39m
[31m  // Client-side instant writing analysis (runs locally, no API calls)[39m
[31m  const [clientIssues, setClientIssues] = useState<WritingIssue[]>([]);[39m
[31m  const [clientMetrics, setClientMetrics] = useState<WritingMetrics | null>(null);[39m
[31m  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);·[39m
[31m  // Close project dropdown on outside click[39m
[31m  useEffect(() => {[39m
[31m    const handler = (e: MouseEvent) => {[39m
[31m      if (projectDropdownRef.current && !projectDropdownRef.current.contains(e.target as Node)) {[39m
[31m        setProjectDropdownOpen(false);[39m
[31m      }[39m
[31m    };[39m
[31m    document.addEventListener(\"mousedown\", handler);[39m
[31m    return () => document.removeEventListener(\"mousedown\", handler);[39m
[31m  }, []);·[39m
[31m  // Load projects list[39m
[31m  useEffect(() => {[39m
[31m    listProjectsForAnalysis()[39m
[31m      .then((p) => {[39m
[31m        setProjects(p);[39m
[31m        if (p.length > 0 && !selectedProjectId) {[39m
[31m          setSelectedProjectId(p[0].id);[39m
[31m        }[39m
[31m      })[39m
[31m      .catch(() => {[39m
[31m        setError(\"Could not load projects. Switching to paste mode.\");[39m
[31m        setSourceMode(\"paste\");[39m
[31m        setDocLoading(false);[39m
[31m      });[39m
[31m  }, [selectedProjectId]);·[39m
[31m  // Load active document when project changes[39m
[31m  useEffect(() => {[39m
[31m    if (sourceMode !== \"document\") return;·[39m
[31m    setDocLoading(true);[39m
[31m    setError(null);·[39m
[31m    getActiveDocumentForAnalysis(selectedProjectId)[39m
[31m      .then((doc) => {[39m
[31m        setActiveDoc(doc);[39m
[31m        if (doc) {[39m
[31m          setInputText(doc.plainText);[39m
[31m        } else {[39m
[31m          setInputText(\"\");[39m
[31m        }[39m
[31m      })[39m
[31m      .catch(() => {[39m
[31m        setActiveDoc(null);[39m
[31m        setInputText(\"\");[39m
[31m      })[39m
[31m      .finally(() => setDocLoading(false));[39m
[31m  }, [sourceMode, selectedProjectId]);·[39m
[31m  // Debounced client-side analysis[39m
[31m  useEffect(() => {[39m
[31m    if (debounceRef.current) {[39m
[31m      clearTimeout(debounceRef.current);[39m
[31m    }·[39m
[31m    if (!inputText.trim()) {[39m
[31m      setClientIssues([]);[39m
[31m      setClientMetrics(null);[39m
[31m      return;[39m
[31m    }·[39m
[31m    debounceRef.current = setTimeout(() => {[39m
[31m      const { issues, metrics } = analyzeWriting(inputText);[39m
[31m      setClientIssues(issues);[39m
[31m      setClientMetrics(metrics);[39m
[31m    }, 500);·[39m
[31m    return () => {[39m
[31m      if (debounceRef.current) {[39m
[31m        clearTimeout(debounceRef.current);[39m
[31m      }[39m
[31m    };[39m
[31m  }, [inputText]);·[39m
[31m  const analysisTabs = [[39m
[31m    {[39m
[31m      key: \"issues\",[39m
[31m      label: \"Issues\",[39m
[31m      count: result ? result.writingQuality.suggestions.length : (clientIssues.length > 0 ? clientIssues.length : undefined),[39m
[31m    },[39m
[31m    { key: \"metrics\", label: \"Detailed Metrics\" },[39m
[31m  ];·[39m
[31m  const runAnalysis = useCallback(async () => {[39m
[31m    if (!inputText.trim() || inputText.trim().length < 50) {[39m
[31m      setError(\"Please enter at least 50 characters of text to analyze.\");[39m
[31m      return;[39m
[31m    }[39m
[31m    setLoading(true);[39m
[31m    setError(null);·[39m
[31m    const paras = inputText.split(/\\n\\n+/).filter((p) => p.trim().length > 0);[39m
[31m    setParagraphs(paras);·[39m
[31m    try {[39m
[31m      const res = await fetch(\"/api/integrity-check\", {[39m
[31m        method: \"POST\",[39m
[31m        headers: { \"Content-Type\": \"application/json\" },[39m
[31m        body: JSON.stringify({ text: inputText, mode: \"full\" }),[39m
[31m      });·[39m
[31m      if (!res.ok) {[39m
[31m        const data = await res.json().catch(() => ({ error: \"Analysis failed\" }));[39m
[31m        setError(data.error || \"Writing analysis failed\");[39m
[31m        setLoading(false);[39m
[31m        return;[39m
[31m      }·[39m
[31m      const data = await res.json();[39m
[31m      // Map API response shape to component's AnalysisResult shape[39m
[31m      const mapped: AnalysisResult = {[39m
[31m        humanScore: data.aiDetection?.humanScore ?? 0,[39m
[31m        aiScore: data.aiDetection?.aiScore ?? 0,[39m
[31m        overallRisk: data.aiDetection?.overallRisk ?? \"low\",[39m
[31m        paragraphAnalysis: (data.aiDetection?.paragraphs ?? []).map((p: { paragraphIndex: number; humanProbability: number; flags: string[]; suggestion?: string }) => ({[39m
[31m          paragraphIndex: p.paragraphIndex,[39m
[31m          humanProbability: p.humanProbability,[39m
[31m          flags: p.flags ?? [],[39m
[31m          suggestion: p.suggestion,[39m
[31m        })),[39m
[31m        plagiarismIndicators: (data.plagiarism?.matches ?? []).map((m: { excerpt?: string; source?: { title?: string; authors?: string[]; doi?: string; year?: number }; severity?: string }) => ({[39m
[31m          excerpt: m.excerpt ?? \"\",[39m
[31m          concern: m.source[39m
[31m            ? `${m.source.title ?? \"Unknown source\"}${m.source.authors?.length ? \" — \" + m.source.authors.join(\", \") : \"\"}${m.source.year ? \" (\" + m.source.year + \")\" : \"\"}`[39m
[31m            : \"\",[39m
[31m          severity: (m.severity as \"low\" | \"medium\" | \"high\") ?? \"low\",[39m
[31m        })),[39m
[31m        aiDetection: {[39m
[31m          humanScore: data.aiDetection?.humanScore ?? 0,[39m
[31m          aiScore: data.aiDetection?.aiScore ?? 0,[39m
[31m          overallRisk: data.aiDetection?.overallRisk ?? \"low\",[39m
[31m          paragraphs: (data.aiDetection?.paragraphs ?? []).map((p: { paragraphIndex: number; humanProbability: number; flags: string[]; suggestion?: string }) => ({[39m
[31m            paragraphIndex: p.paragraphIndex,[39m
[31m            humanProbability: p.humanProbability,[39m
[31m            flags: p.flags ?? [],[39m
[31m            suggestion: p.suggestion,[39m
[31m          })),[39m
[31m        },[39m
[31m        plagiarism: data.plagiarism ?? null,[39m
[31m        writingQuality: {[39m
[31m          passiveVoiceCount: data.writingQuality?.passiveVoiceCount ?? 0,[39m
[31m          averageSentenceLength: data.writingQuality?.averageSentenceLength ?? 0,[39m
[31m          readabilityGrade: data.writingQuality?.readabilityGrade ?? 0,[39m
[31m          suggestions: data.writingQuality?.suggestions ?? [],[39m
[31m        },[39m
[31m      };[39m
[31m      setResult(mapped);[39m
[31m    } catch {[39m
[31m      setError(\"Failed to connect. Check your API key.\");[39m
[31m    } finally {[39m
[31m      setLoading(false);[39m
[31m    }[39m
[31m  }, [inputText]);·[39m
[31m  const getReadabilityLabel = (grade: number): string => {[39m
[31m    if (grade >= 80) return \"Excellent\";[39m
[31m    if (grade >= 60) return \"Good\";[39m
[31m    if (grade >= 40) return \"Needs Improvement\";[39m
[31m    return \"Poor\";[39m
[31m  };·[39m
[31m  const getParagraphBg = (humanProbability: number): string => {[39m
[31m    if (humanProbability < 40) return \"bg-red-500/10 border-l-2 border-red-500\";[39m
[31m    if (humanProbability <= 70) return \"bg-yellow-500/10 border-l-2 border-yellow-400\";[39m
[31m    return \"bg-emerald-500/5 border-l-2 border-emerald-400\";[39m
[31m  };·[39m
[31m  const effectiveText = inputText;[39m
[31m  const selectedProject = projects.find((p) => p.id === selectedProjectId);·[39m
[31m  return ([39m
[31m    <div className=\"flex flex-col h-[calc(100vh-7rem)]\">[39m
[31m      {/* Header */}[39m
[31m      <div className=\"flex items-center justify-between mb-4\">[39m
[31m        <div className=\"flex items-center gap-3\">[39m
[31m          <Link href=\"/studio\" className=\"p-1.5 rounded-lg text-ink-muted hover:text-ink hover:bg-surface-raised transition-colors\">[39m
[31m            <ArrowLeft size={18} />[39m
[31m          </Link>[39m
[31m          <h1 className=\"font-semibold text-ink\">[39m
[31m            {result ? \"Draft Analysis\" : \"Writing Analysis\"}[39m
[31m          </h1>[39m
[31m        </div>[39m
[31m        <div className=\"flex items-center gap-3\">[39m
[31m          {!result && ([39m
[31m            <div className=\"flex p-0.5 bg-surface-raised rounded-lg\">[39m
[31m              <button[39m
[31m                onClick={() => setSourceMode(\"document\")}[39m
[31m                className={cn([39m
[31m                  \"flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all\",[39m
[31m                  sourceMode === \"document\"[39m
[31m                    ? \"bg-brand text-white\"[39m
[31m                    : \"text-ink-muted hover:text-ink\"[39m
[31m                )}[39m
[31m              >[39m
[31m                <FileText size={14} />[39m
[31m                From Document[39m
[31m              </button>[39m
[31m              <button[39m
[31m                onClick={() => setSourceMode(\"paste\")}[39m
[31m                className={cn([39m
[31m                  \"px-3 py-1.5 rounded-md text-xs font-medium transition-all\",[39m
[31m                  sourceMode === \"paste\"[39m
[31m                    ? \"bg-brand text-white\"[39m
[31m                    : \"text-ink-muted hover:text-ink\"[39m
[31m                )}[39m
[31m              >[39m
[31m                Paste Text[39m
[31m              </button>[39m
[31m            </div>[39m
[31m          )}[39m
[31m          {result && ([39m
[31m            <>[39m
[31m              <span className=\"flex items-center gap-1.5 text-xs\">[39m
[31m                <span className=\"w-3 h-3 rounded bg-red-500/30 border border-red-500\" />[39m
[31m                Low Human (&lt;40%)[39m
[31m              </span>[39m
[31m              <span className=\"flex items-center gap-1.5 text-xs\">[39m
[31m                <span className=\"w-3 h-3 rounded bg-yellow-500/30 border border-yellow-500\" />[39m
[31m                Mixed (40-70%)[39m
[31m              </span>[39m
[31m              <span className=\"flex items-center gap-1.5 text-xs\">[39m
[31m                <span className=\"w-3 h-3 rounded bg-emerald-500/30 border border-emerald-500\" />[39m
[31m                High Human (&gt;70%)[39m
[31m              </span>[39m
[31m            </>[39m
[31m          )}[39m
[31m        </div>[39m
[31m      </div>·[39m
[31m      {!result ? ([39m
[31m        /* Input Mode */[39m
[31m        <div className=\"flex-1 flex gap-6 overflow-hidden\">[39m
[31m          {/* Left: Text area */}[39m
[31m          <div className=\"flex-1 flex flex-col gap-4\">[39m
[31m            {/* Project selector (document mode) */}[39m
[31m            {sourceMode === \"document\" && projects.length > 0 && ([39m
[31m              <div className=\"flex items-center gap-3\">[39m
[31m                <span className=\"text-xs text-ink-muted\">Project:</span>[39m
[31m                <div ref={projectDropdownRef} className=\"relative\">[39m
[31m                  <button[39m
[31m                    onClick={() => setProjectDropdownOpen((v) => !v)}[39m
[31m                    className=\"flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-ink bg-surface-raised border border-border hover:bg-surface-raised/80 transition-colors\"[39m
[31m                  >[39m
[31m                    <span className=\"truncate max-w-[200px]\">{selectedProject?.title ?? \"Select project\"}</span>[39m
[31m                    <CaretDown size={12} />[39m
[31m                  </button>[39m
[31m                  {projectDropdownOpen && ([39m
[31m                    <div className=\"absolute left-0 top-full mt-1 w-56 rounded-lg glass-panel border border-border shadow-lg z-50 py-1 max-h-60 overflow-y-auto\">[39m
[31m                      {/* empty state: no data, nothing here */}[39m
[31m                      {projects.length === 0 && ([39m
[31m                        <p className=\"text-xs text-ink-muted text-center py-2\">no results yet. Create a project to get started.</p>[39m
[31m                      )}[39m
[31m                      {projects.map((p) => ([39m
[31m                        <button[39m
[31m                          key={p.id}[39m
[31m                          onClick={() => {[39m
[31m                            setSelectedProjectId(p.id);[39m
[31m                            setProjectDropdownOpen(false);[39m
[31m                          }}[39m
[31m                          className={cn([39m
[31m                            \"w-full text-left px-3 py-2 text-xs transition-colors\",[39m
[31m                            p.id === selectedProjectId[39m
[31m                              ? \"bg-brand/10 text-brand font-medium\"[39m
[31m                              : \"text-ink hover:bg-surface-raised\"[39m
[31m                          )}[39m
[31m                        >[39m
[31m                          {p.title}[39m
[31m                        </button>[39m
[31m                      ))}[39m
[31m                    </div>[39m
[31m                  )}[39m
[31m                </div>[39m
[31m                {activeDoc && ([39m
[31m                  <span className=\"text-xs text-ink-muted\">[39m
[31m                    Document: <span className=\"text-ink font-medium\">{activeDoc.documentTitle}</span>[39m
[31m                  </span>[39m
[31m                )}[39m
[31m              </div>[39m
[31m            )}·[39m
[31m            {sourceMode === \"document\" && docLoading ? ([39m
[31m              <div className=\"flex-1 flex items-center justify-center\">[39m
[31m                <div className=\"flex flex-col items-center gap-3\">[39m
[31m                  <CircleNotch size={28} className=\"text-brand animate-spin\" />[39m
[31m                  <p className=\"text-sm text-ink-muted\">Loading document...</p>[39m
[31m                </div>[39m
[31m              </div>[39m
[31m            ) : sourceMode === \"document\" && !activeDoc ? ([39m
[31m              <div className=\"flex-1 flex items-center justify-center\">[39m
[31m                <div className=\"flex flex-col items-center gap-3 text-center px-8\">[39m
[31m                  <FileText size={32} className=\"text-ink-muted\" />[39m
[31m                  <p className=\"text-sm text-ink-muted\">No document found. Write something in the Studio first, or switch to paste mode.</p>[39m
[31m                </div>[39m
[31m              </div>[39m
[31m            ) : ([39m
[31m              <>[39m
[31m                <textarea aria-label=\"Text area\"[39m
[31m                  value={inputText}[39m
[31m                  onChange={(e) => setInputText(e.target.value)}[39m
[31m                  placeholder={sourceMode === \"document\"[39m
[31m                    ? \"Document content loaded from your project...\"[39m
[31m                    : \"Paste your text here to analyze writing quality, detect AI-generated content, and get improvement suggestions...\"[39m
[31m                  }[39m
[31m                  className=\"flex-1 p-6 rounded-2xl glass-panel font-serif text-ink text-sm leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-brand/40\"[39m
[31m                  readOnly={sourceMode === \"document\"}[39m
[31m                />[39m
[31m                {error && ([39m
[31m                  <p className=\"text-xs text-red-500 px-2\">{error}</p>[39m
[31m                )}[39m
[31m                <div className=\"flex items-center justify-between\">[39m
[31m                  <p className=\"text-xs text-ink-muted\">[39m
[31m                    {effectiveText.split(/\\s+/).filter(Boolean).length} words[39m
[31m                  </p>[39m
[31m                  <button[39m
[31m                    onClick={runAnalysis}[39m
[31m                    disabled={loading || effectiveText.trim().length < 50}[39m
[31m                    className=\"flex items-center gap-2 px-6 py-3 rounded-xl bg-brand text-white text-sm font-medium hover:bg-brand-hover transition-colors disabled:opacity-50\"[39m
[31m                  >[39m
[31m                    <Sparkle size={16} />[39m
[31m                    {loading ? \"Analyzing...\" : \"Analyze Writing\"}[39m
[31m                  </button>[39m
[31m                </div>[39m
[31m              </>[39m
[31m            )}[39m
[31m          </div>·[39m
[31m          {/* Right: Instant metrics panel */}[39m
[31m          {clientMetrics && effectiveText.trim().length > 0 && ([39m
[31m            <aside className=\"w-80 shrink-0 glass-panel rounded-2xl p-5 flex flex-col overflow-y-auto\">[39m
[31m              {/* Readability gauge */}[39m
[31m              <div className=\"flex flex-col items-center py-4 mb-4\">[39m
[31m                <CircularGauge[39m
[31m                  value={clientMetrics.fleschReadingEase}[39m
[31m                  label={clientMetrics.readabilityLabel}[39m
[31m                  size={110}[39m
[31m                />[39m
[31m              </div>·[39m
[31m              {/* Counts */}[39m
[31m              <div className=\"grid grid-cols-3 gap-2 mb-4\">[39m
[31m                <div className=\"p-2.5 rounded-lg bg-surface-raised text-center\">[39m
[31m                  <p className=\"text-lg font-semibold text-ink\">{clientMetrics.wordCount}</p>[39m
[31m                  <p className=\"text-[10px] text-ink-muted\">Words</p>[39m
[31m                </div>[39m
[31m                <div className=\"p-2.5 rounded-lg bg-surface-raised text-center\">[39m
[31m                  <p className=\"text-lg font-semibold text-ink\">{clientMetrics.sentenceCount}</p>[39m
[31m                  <p className=\"text-[10px] text-ink-muted\">Sentences</p>[39m
[31m                </div>[39m
[31m                <div className=\"p-2.5 rounded-lg bg-surface-raised text-center\">[39m
[31m                  <p className=\"text-lg font-semibold text-ink\">{clientMetrics.paragraphCount}</p>[39m
[31m                  <p className=\"text-[10px] text-ink-muted\">Paragraphs</p>[39m
[31m                </div>[39m
[31m              </div>·[39m
[31m              {/* Readability scores */}[39m
[31m              <div className=\"space-y-3 mb-4\">[39m
[31m                <h4 className=\"text-xs font-medium text-ink-muted uppercase tracking-wider\">[39m
[31m                  Readability[39m
[31m                </h4>[39m
[31m                <MetricBar[39m
[31m                  label=\"Flesch-Kincaid Grade\"[39m
[31m                  value={clientMetrics.fleschKincaidGrade}[39m
[31m                  max={20}[39m
[31m                />[39m
[31m                <MetricBar[39m
[31m                  label=\"Gunning Fog Index\"[39m
[31m                  value={clientMetrics.gunningFogIndex}[39m
[31m                  max={20}[39m
[31m                />[39m
[31m                <MetricBar[39m
[31m                  label=\"Flesch Reading Ease\"[39m
[31m                  value={clientMetrics.fleschReadingEase}[39m
[31m                  max={100}[39m
[31m                />[39m
[31m                <MetricBar[39m
[31m                  label=\"Avg Sentence Length\"[39m
[31m                  value={clientMetrics.avgSentenceLength}[39m
[31m                  max={40}[39m
[31m                  suffix=\" words\"[39m
[31m                />[39m
[31m              </div>·[39m
[31m              {/* Writing quality */}[39m
[31m              <div className=\"space-y-3 mb-4\">[39m
[31m                <h4 className=\"text-xs font-medium text-ink-muted uppercase tracking-wider\">[39m
[31m                  Writing Quality[39m
[31m                </h4>[39m
[31m                <div className=\"grid grid-cols-2 gap-2\">[39m
[31m                  <IssueBadge label=\"Passive Voice\" count={clientMetrics.passiveVoiceCount} color=\"yellow\" />[39m
[31m                  <IssueBadge label=\"Weasel Words\" count={clientMetrics.weaselWordCount} color=\"orange\" />[39m
[31m                  <IssueBadge label=\"Adverbs\" count={clientMetrics.adverbCount} color=\"blue\" />[39m
[31m                  <IssueBadge label=\"Complex Sentences\" count={clientMetrics.complexSentenceCount} color=\"red\" />[39m
[31m                </div>[39m
[31m              </div>·[39m
[31m              {/* Issues summary */}[39m
[31m              {clientIssues.length > 0 && ([39m
[31m                <div className=\"border-t border-border-subtle pt-3\">[39m
[31m                  <h4 className=\"text-xs font-medium text-ink-muted uppercase tracking-wider mb-2\">[39m
[31m                    Issues ({clientIssues.length})[39m
[31m                  </h4>[39m
[31m                  <div className=\"space-y-2 max-h-48 overflow-y-auto\">[39m
[31m                    {clientIssues.slice(0, 10).map((issue, i) => ([39m
[31m                      <div key={i} className={cn([39m
[31m                        \"p-2.5 rounded-lg text-xs\",[39m
[31m                        issue.severity === \"warning\" ? \"bg-yellow-500/10 text-yellow-700\" : \"bg-blue-500/10 text-blue-700\"[39m
[31m                      )}>[39m
[31m                        {issue.reason}[39m
[31m                      </div>[39m
[31m                    ))}[39m
[31m                    {clientIssues.length > 10 && ([39m
[31m                      <p className=\"text-[10px] text-ink-muted text-center\">[39m
[31m                        +{clientIssues.length - 10} more issues[39m
[31m                      </p>[39m
[31m                    )}[39m
[31m                  </div>[39m
[31m                </div>[39m
[31m              )}[39m
[31m            </aside>[39m
[31m          )}[39m
[31m        </div>[39m
[31m      ) : ([39m
[31m        /* Results Mode */[39m
[31m        <div className=\"flex gap-6 flex-1 overflow-hidden\">[39m
[31m          {/* Text with Paragraph Highlights */}[39m
[31m          <div className=\"flex-1 overflow-y-auto\">[39m
[31m            <div className=\"glass-panel rounded-2xl p-8\">[39m
[31m              <div className=\"flex items-center justify-between mb-4\">[39m
[31m                <button[39m
[31m                  onClick={() => {[39m
[31m                    setResult(null);[39m
[31m                    setParagraphs([]);[39m
[31m                    setActiveTab(\"issues\");[39m
[31m                  }}[39m
[31m                  className=\"text-xs text-brand hover:text-brand-hover font-medium\"[39m
[31m                >[39m
[31m                  &larr; Analyze New Text[39m
[31m                </button>[39m
[31m                {activeDoc && ([39m
[31m                  <span className=\"text-xs text-ink-muted\">[39m
[31m                    {activeDoc.documentTitle}[39m
[31m                  </span>[39m
[31m                )}[39m
[31m              </div>[39m
[31m              <div className=\"font-serif text-ink leading-relaxed space-y-4\">[39m
[31m                {paragraphs.map((p, i) => {[39m
[31m                  const analysis = result.aiDetection.paragraphs.find([39m
[31m                    (a) => a.paragraphIndex === i[39m
[31m                  );[39m
[31m                  const humanProb = analysis?.humanProbability ?? 100;[39m
[31m                  return ([39m
[31m                    <p[39m
[31m                      key={i}[39m
[31m                      className={cn(\"rounded-lg px-3 py-2\", getParagraphBg(humanProb))}[39m
[31m                    >[39m
[31m                      {p}[39m
[31m                      {analysis?.flags && analysis.flags.length > 0 && ([39m
[31m                        <span className=\"block mt-1 text-[10px] text-ink-muted\">[39m
[31m                          Flags: {analysis.flags.join(\", \")}[39m
[31m                        </span>[39m
[31m                      )}[39m
[31m                    </p>[39m
[31m                  );[39m
[31m                })}[39m
[31m              </div>[39m
[31m            </div>[39m
[31m          </div>·[39m
[31m          {/* Analysis Panel */}[39m
[31m          <aside className=\"w-96 shrink-0 glass-panel rounded-2xl p-5 flex flex-col overflow-hidden\">[39m
[31m            <div className=\"flex flex-col items-center py-4 mb-4\">[39m
[31m              <CircularGauge[39m
[31m                value={result.writingQuality.readabilityGrade}[39m
[31m                label={getReadabilityLabel(result.writingQuality.readabilityGrade)}[39m
[31m                size={120}[39m
[31m              />[39m
[31m            </div>·[39m
[31m            {/* Counts from local analysis */}[39m
[31m            {clientMetrics && ([39m
[31m              <div className=\"grid grid-cols-3 gap-2 mb-4\">[39m
[31m                <div className=\"p-2 rounded-lg bg-surface-raised text-center\">[39m
[31m                  <p className=\"text-sm font-semibold text-ink\">{clientMetrics.wordCount}</p>[39m
[31m                  <p className=\"text-[10px] text-ink-muted\">Words</p>[39m
[31m                </div>[39m
[31m                <div className=\"p-2 rounded-lg bg-surface-raised text-center\">[39m
[31m                  <p className=\"text-sm font-semibold text-ink\">{clientMetrics.sentenceCount}</p>[39m
[31m                  <p className=\"text-[10px] text-ink-muted\">Sentences</p>[39m
[31m                </div>[39m
[31m                <div className=\"p-2 rounded-lg bg-surface-raised text-center\">[39m
[31m                  <p className=\"text-sm font-semibold text-ink\">{clientMetrics.paragraphCount}</p>[39m
[31m                  <p className=\"text-[10px] text-ink-muted\">Paragraphs</p>[39m
[31m                </div>[39m
[31m              </div>[39m
[31m            )}·[39m
[31m            <Tabs tabs={analysisTabs} activeTab={activeTab} onChange={setActiveTab} className=\"mb-4\" />·[39m
[31m            <div className=\"flex-1 overflow-y-auto\">[39m
[31m              {activeTab === \"issues\" && ([39m
[31m                <div className=\"space-y-3\">[39m
[31m                  {result.writingQuality.suggestions.length === 0 ? ([39m
[31m                    <p className=\"text-xs text-emerald-500 text-center py-4\">[39m
[31m                      No issues detected. Your writing looks great![39m
[31m                    </p>[39m
[31m                  ) : ([39m
[31m                    result.writingQuality.suggestions.map((suggestion, i) => ([39m
[31m                      <div key={i} className={cn(\"p-4 rounded-xl\", \"bg-purple-500/10\")}>[39m
[31m                        <div className=\"flex items-center gap-2 mb-1\">[39m
[31m                          <Sparkle size={14} className=\"text-purple-500\" />[39m
[31m                          <span className=\"text-sm font-medium text-purple-500\">[39m
[31m                            Suggestion {i + 1}[39m
[31m                          </span>[39m
[31m                        </div>[39m
[31m                        <p className=\"text-xs text-ink-muted\">{suggestion}</p>[39m
[31m                      </div>[39m
[31m                    ))[39m
[31m                  )}·[39m
[31m                  {/* Local write-good issues */}[39m
[31m                  {clientIssues.length > 0 && ([39m
[31m                    <>[39m
[31m                      <div className=\"border-t border-border pt-3 mt-3\">[39m
[31m                        <p className=\"text-xs font-medium text-ink-muted uppercase tracking-wider mb-3\">[39m
[31m                          Writing Issues (write-good)[39m
[31m                        </p>[39m
[31m                      </div>[39m
[31m                      {clientIssues.slice(0, 15).map((issue, i) => {[39m
[31m                        const bgColor =[39m
[31m                          issue.type === \"passive\"[39m
[31m                            ? \"bg-yellow-500/10\"[39m
[31m                            : issue.type === \"weasel\"[39m
[31m                            ? \"bg-orange-500/10\"[39m
[31m                            : issue.type === \"complex\"[39m
[31m                            ? \"bg-red-500/10\"[39m
[31m                            : \"bg-blue-500/10\";[39m
[31m                        const textColor =[39m
[31m                          issue.type === \"passive\"[39m
[31m                            ? \"text-yellow-500\"[39m
[31m                            : issue.type === \"weasel\"[39m
[31m                            ? \"text-orange-500\"[39m
[31m                            : issue.type === \"complex\"[39m
[31m                            ? \"text-red-500\"[39m
[31m                            : \"text-blue-500\";[39m
[31m                        return ([39m
[31m                          <div key={`wg-${i}`} className={cn(\"p-3 rounded-xl\", bgColor)}>[39m
[31m                            <div className=\"flex items-center gap-2 mb-1\">[39m
[31m                              <span className={cn(\"text-xs font-medium uppercase\", textColor)}>[39m
[31m                                {issue.type}[39m
[31m                              </span>[39m
[31m                            </div>[39m
[31m                            <p className=\"text-xs text-ink-muted\">{issue.reason}</p>[39m
[31m                            {issue.suggestion && ([39m
[31m                              <p className=\"text-xs text-ink-muted/70 mt-1 italic\">{issue.suggestion}</p>[39m
[31m                            )}[39m
[31m                          </div>[39m
[31m                        );[39m
[31m                      })}[39m
[31m                      {clientIssues.length > 15 && ([39m
[31m                        <p className=\"text-[10px] text-ink-muted text-center\">[39m
[31m                          +{clientIssues.length - 15} more issues[39m
[31m                        </p>[39m
[31m                      )}[39m
[31m                    </>[39m
[31m                  )}·[39m
[31m                  {/* Plagiarism Indicators */}[39m
[31m                  {(result.plagiarism?.matches.length ?? 0) > 0 && ([39m
[31m                    <>[39m
[31m                      <div className=\"border-t border-border pt-3 mt-3\">[39m
[31m                        <p className=\"text-xs font-medium text-ink-muted uppercase tracking-wider mb-3\">[39m
[31m                          Plagiarism Indicators[39m
[31m                        </p>[39m
[31m                      </div>[39m
[31m                      {result.plagiarism!.matches.map((indicator, i) => {[39m
[31m                        const severityColor =[39m
[31m                          indicator.severity === \"high\"[39m
[31m                            ? \"text-red-500\"[39m
[31m                            : indicator.severity === \"medium\"[39m
[31m                            ? \"text-yellow-500\"[39m
[31m                            : \"text-ink-muted\";[39m
[31m                        const severityBg =[39m
[31m                          indicator.severity === \"high\"[39m
[31m                            ? \"bg-red-500/10\"[39m
[31m                            : indicator.severity === \"medium\"[39m
[31m                            ? \"bg-yellow-500/10\"[39m
[31m                            : \"bg-surface-raised\";[39m
[31m                        return ([39m
[31m                          <div key={i} className={cn(\"p-4 rounded-xl\", severityBg)}>[39m
[31m                            <div className=\"flex items-center gap-2 mb-1\">[39m
[31m                              <Sparkle size={14} className={severityColor} />[39m
[31m                              <span className={cn(\"text-sm font-medium\", severityColor)}>[39m
[31m                                {indicator.severity.toUpperCase()} Risk[39m
[31m                              </span>[39m
[31m                            </div>[39m
[31m                            <p className=\"text-xs text-ink-muted italic mb-1\">[39m
[31m                              &ldquo;{indicator.excerpt}&rdquo;[39m
[31m                            </p>[39m
[31m                            <p className=\"text-xs text-ink-muted\">{Math.round(indicator.similarity * 100)}% similarity with {indicator.source.title}</p>[39m
[31m                          </div>[39m
[31m                        );[39m
[31m                      })}[39m
[31m                    </>[39m
[31m                  )}[39m
[31m                </div>[39m
[31m              )}·[39m
[31m              {activeTab === \"metrics\" && ([39m
[31m                <div className=\"space-y-5\">[39m
[31m                  <div>[39m
[31m                    <h4 className=\"text-xs font-medium text-ink-muted uppercase tracking-wider mb-3\">[39m
[31m                      Readability[39m
[31m                    </h4>[39m
[31m                    <div className=\"space-y-3\">[39m
[31m                      <MetricBar[39m
[31m                        label=\"Readability Grade\"[39m
[31m                        value={result.writingQuality.readabilityGrade}[39m
[31m                        max={100}[39m
[31m                      />[39m
[31m                      {clientMetrics && ([39m
[31m                        <>[39m
[31m                          <MetricBar[39m
[31m                            label=\"Flesch-Kincaid Grade\"[39m
[31m                            value={clientMetrics.fleschKincaidGrade}[39m
[31m                            max={20}[39m
[31m                          />[39m
[31m                          <MetricBar[39m
[31m                            label=\"Gunning Fog Index\"[39m
[31m                            value={clientMetrics.gunningFogIndex}[39m
[31m                            max={20}[39m
[31m                          />[39m
[31m                          <MetricBar[39m
[31m                            label=\"Flesch Reading Ease\"[39m
[31m                            value={clientMetrics.fleschReadingEase}[39m
[31m                            max={100}[39m
[31m                          />[39m
[31m                        </>[39m
[31m                      )}[39m
[31m                      <MetricBar[39m
[31m                        label=\"Avg Sentence Length\"[39m
[31m                        value={result.writingQuality.averageSentenceLength}[39m
[31m                        max={40}[39m
[31m                        suffix=\" words\"[39m
[31m                      />[39m
[31m                    </div>[39m
[31m                  </div>[39m
[31m                  <div>[39m
[31m                    <h4 className=\"text-xs font-medium text-ink-muted uppercase tracking-wider mb-3\">[39m
[31m                      Writing Quality[39m
[31m                    </h4>[39m
[31m                    <div className=\"space-y-3\">[39m
[31m                      <MetricBar[39m
[31m                        label=\"Passive Voice\"[39m
[31m                        value={clientMetrics?.passiveVoiceCount ?? result.writingQuality.passiveVoiceCount}[39m
[31m                        max={Math.max(clientMetrics?.passiveVoiceCount ?? result.writingQuality.passiveVoiceCount, 10)}[39m
[31m                        suffix=\" instances\"[39m
[31m                      />[39m
[31m                      {clientMetrics && ([39m
[31m                        <>[39m
[31m                          <MetricBar[39m
[31m                            label=\"Weasel Words\"[39m
[31m                            value={clientMetrics.weaselWordCount}[39m
[31m                            max={Math.max(clientMetrics.weaselWordCount, 10)}[39m
[31m                            suffix=\" instances\"[39m
[31m                          />[39m
[31m                          <MetricBar[39m
[31m                            label=\"Adverbs\"[39m
[31m                            value={clientMetrics.adverbCount}[39m
[31m                            max={Math.max(clientMetrics.adverbCount, 10)}[39m
[31m                            suffix=\" instances\"[39m
[31m                          />[39m
[31m                          <MetricBar[39m
[31m                            label=\"Complex Sentences\"[39m
[31m                            value={clientMetrics.complexSentenceCount}[39m
[31m                            max={Math.max(clientMetrics.complexSentenceCount, 5)}[39m
[31m                            suffix=\" sentences\"[39m
[31m                          />[39m
[31m                        </>[39m
[31m                      )}[39m
[31m                    </div>[39m
[31m                  </div>[39m
[31m                  <div>[39m
[31m                    <h4 className=\"text-xs font-medium text-ink-muted uppercase tracking-wider mb-3\">[39m
[31m                      AI Detection[39m
[31m                    </h4>[39m
[31m                    <div className=\"space-y-2\">[39m
[31m                      <ToneBadge[39m
[31m                        label=\"Human Score\"[39m
[31m                        value={`${result.aiDetection.humanScore}%`}[39m
[31m                        color={result.aiDetection.humanScore >= 70 ? \"emerald\" : result.aiDetection.humanScore >= 40 ? \"yellow\" : \"red\"}[39m
[31m                      />[39m
[31m                      <ToneBadge[39m
[31m                        label=\"AI Score\"[39m
[31m                        value={`${result.aiDetection.aiScore}%`}[39m
[31m                        color={result.aiDetection.aiScore <= 30 ? \"emerald\" : result.aiDetection.aiScore <= 60 ? \"yellow\" : \"red\"}[39m
[31m                      />[39m
[31m                      <ToneBadge[39m
[31m                        label=\"Overall Risk\"[39m
[31m                        value={result.aiDetection.overallRisk.charAt(0).toUpperCase() + result.aiDetection.overallRisk.slice(1)}[39m
[31m                        color={result.aiDetection.overallRisk === \"low\" ? \"emerald\" : result.aiDetection.overallRisk === \"medium\" ? \"yellow\" : \"red\"}[39m
[31m                      />[39m
[31m                    </div>[39m
[31m                  </div>[39m
[31m                  {/* Per-paragraph breakdown */}[39m
[31m                  {result.aiDetection.paragraphs.length > 0 && ([39m
[31m                    <div>[39m
[31m                      <h4 className=\"text-xs font-medium text-ink-muted uppercase tracking-wider mb-3\">[39m
[31m                        Paragraph Breakdown[39m
[31m                      </h4>[39m
[31m                      <div className=\"space-y-2\">[39m
[31m                        {result.aiDetection.paragraphs.map((p) => ([39m
[31m                          <div key={p.paragraphIndex} className=\"flex items-center justify-between\">[39m
[31m                            <span className=\"text-xs text-ink-muted\">[39m
[31m                              Paragraph {p.paragraphIndex + 1}[39m
[31m                            </span>[39m
[31m                            <span[39m
[31m                              className={cn([39m
[31m                                \"px-2 py-0.5 rounded-full text-xs font-medium\",[39m
[31m                                p.humanProbability < 40[39m
[31m                                  ? \"bg-red-500/10 text-red-500\"[39m
[31m                                  : p.humanProbability <= 70[39m
[31m                                  ? \"bg-yellow-500/10 text-yellow-500\"[39m
[31m                                  : \"bg-emerald-500/10 text-emerald-500\"[39m
[31m                              )}[39m
[31m                            >[39m
[31m                              {p.humanProbability}% human[39m
[31m                            </span>[39m
[31m                          </div>[39m
[31m                        ))}[39m
[31m                      </div>[39m
[31m                    </div>[39m
[31m                  )}[39m
[31m                </div>[39m
[31m              )}[39m
[31m            </div>[39m
[31m          </aside>[39m
[31m        </div>[39m
[31m      )}[39m
[31m    </div>[39m
[31m  );[39m
[31m}·[39m
[31mfunction MetricBar({ label, value, max, suffix }: { label: string; value: number; max: number; suffix?: string }) {[39m
[31m  return ([39m
[31m    <div>[39m
[31m      <div className=\"flex justify-between text-xs mb-1\">[39m
[31m        <span className=\"text-ink-muted\">{label}</span>[39m
[31m        <span className=\"text-ink font-medium\">{value}{suffix}</span>[39m
[31m      </div>[39m
[31m      <div className=\"h-1.5 rounded-full bg-surface-raised overflow-hidden\">[39m
[31m        <div[39m
[31m          className=\"h-full rounded-full bg-brand transition-all\"[39m
[31m          style={{ width: `${Math.min((value / max) * 100, 100)}%` }}[39m
[31m        />[39m
[31m      </div>[39m
[31m    </div>[39m
[31m  );[39m
[31m}·[39m
[31mfunction ToneBadge({ label, value, color }: { label: string; value: string; color: string }) {[39m
[31m  const colorMap: Record<string, string> = {[39m
[31m    emerald: \"bg-emerald-500/10 text-emerald-500\",[39m
[31m    yellow: \"bg-yellow-500/10 text-yellow-500\",[39m
[31m    red: \"bg-red-500/10 text-red-500\",[39m
[31m  };[39m
[31m  return ([39m
[31m    <div className=\"flex items-center justify-between\">[39m
[31m      <span className=\"text-xs text-ink-muted\">{label}</span>[39m
[31m      <span className={cn(\"px-2 py-0.5 rounded-full text-xs font-medium\", colorMap[color])}>{value}</span>[39m
[31m    </div>[39m
[31m  );[39m
[31m}·[39m
[31mfunction IssueBadge({ label, count, color }: { label: string; count: number; color: string }) {[39m
[31m  const colorMap: Record<string, string> = {[39m
[31m    yellow: \"bg-yellow-500/10 text-yellow-600\",[39m
[31m    orange: \"bg-orange-500/10 text-orange-600\",[39m
[31m    blue: \"bg-blue-500/10 text-blue-600\",[39m
[31m    red: \"bg-red-500/10 text-red-600\",[39m
[31m  };[39m
[31m  return ([39m
[31m    <div className={cn(\"p-2.5 rounded-lg text-center\", colorMap[color])}>[39m
[31m      <p className=\"text-lg font-semibold\">{count}</p>[39m
[31m      <p className=\"text-[10px]\">{label}</p>[39m
[31m    </div>[39m
[31m  );[39m
[31m}[39m
[31m"[39m

   at ../module-assertions/analysis.ts:30

  28 |
  29 | function expectSourceMatches(rootDir: string, relativePath: string, pattern: RegExp) {
> 30 |   expect(readFile(rootDir, relativePath)).toMatch(pattern);
     |                                           ^
  31 | }
  32 |
  33 | function fileExists(rootDir: string, relativePath: string): boolean {
    at expectSourceMatches (/home/user/ScholarSync-/qa/module-assertions/analysis.ts:30:43)
    at assertAnalysisCheckpoint (/home/user/ScholarSync-/qa/module-assertions/analysis.ts:531:5)
    at /home/user/ScholarSync-/qa/generated/analysis/spec-007.spec.ts:818:27 |
| deep-research.spec-002 | deep-research | Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoContain[2m([22m[32mexpected[39m[2m) // indexOf[22m

Expected substring: [32m"Confirm & Start Research"[39m
Received string:    [31m"\"use client\";·[39m
[31mimport { useState, useCallback, useRef } from \"react\";[39m
[31mimport {[39m
[31m  Search,[39m
[31m  Zap,[39m
[31m  Layers,[39m
[31m  Database,[39m
[31m  AlertCircle,[39m
[31m  Microscope,[39m
[31m  StopCircle,[39m
[31m} from \"lucide-react\";[39m
[31mimport {[39m
[31m  ResearchDocument,[39m
[31m  LegacyReportView,[39m
[31m  ExportButtons,[39m
[31m  ResearchPlanPreview,[39m
[31m  ProgressStepper,[39m
[31m  buildStagesFromEvents,[39m
[31m  SaveToLibraryButton,[39m
[31m  PastResearchSessions,[39m
[31m  RESEARCH_MODES,[39m
[31m} from \"@/components/deep-research\";[39m
[31mimport type {[39m
[31m  ResearchMode,[39m
[31m  EnhancedSynthesisReport,[39m
[31m  SynthesisReport,[39m
[31m  PlanPerspective,[39m
[31m  DeepResearchSource,[39m
[31m  ProgressStage,[39m
[31m} from \"@/components/deep-research\";·[39m
[31m// ── Mode icon mapping ───────────────────────────────────────────────[39m
[31mconst MODE_ICONS: Record<ResearchMode, typeof Zap> = {[39m
[31m  quick: Zap,[39m
[31m  standard: Search,[39m
[31m  deep: Layers,[39m
[31m  exhaustive: Database,[39m
[31m};·[39m
[31m// ── Page state types ────────────────────────────────────────────────[39m
[31mtype PageState = \"idle\" | \"plan-preview\" | \"running\" | \"done\" | \"error\";·[39m
[31m// ── Streaming section type ──────────────────────────────────────────[39m
[31minterface StreamingSection {[39m
[31m  markdown: string;[39m
[31m  animating: boolean;[39m
[31m}·[39m
[31mexport default function DeepResearchPage() {[39m
[31m  // Input state[39m
[31m  const [topic, setTopic] = useState(\"\");[39m
[31m  const [mode, setMode] = useState<ResearchMode>(\"standard\");·[39m
[31m  // Page flow state[39m
[31m  const [pageState, setPageState] = useState<PageState>(\"idle\");[39m
[31m  const [error, setError] = useState<string | null>(null);·[39m
[31m  // Research plan state[39m
[31m  const [planPerspectives, setPlanPerspectives] = useState<PlanPerspective[]>([]);·[39m
[31m  // Progress state[39m
[31m  const [progressStages, setProgressStages] = useState<ProgressStage[]>([]);[39m
[31m  const [progressMessage, setProgressMessage] = useState(\"\");[39m
[31m  const [progressPercent, setProgressPercent] = useState(0);·[39m
[31m  // Refs to track stage progression inside the SSE loop (avoids stale closure)[39m
[31m  const seenStageIdsRef = useRef<string[]>([]);[39m
[31m  const currentStageIdRef = useRef<string | null>(null);·[39m
[31m  // Streaming sections[39m
[31m  const [streamingSections, setStreamingSections] = useState<StreamingSection[]>([]);·[39m
[31m  // Final report state[39m
[31m  const [report, setReport] = useState<EnhancedSynthesisReport | SynthesisReport | null>(null);·[39m
[31m  // Abort controller[39m
[31m  const abortRef = useRef<AbortController | null>(null);·[39m
[31m  // ── Shared SSE reader utility ────────────────────────────────────[39m
[31m  const readSSEStream = useCallback([39m
[31m    async ([39m
[31m      response: Response,[39m
[31m      handlers: {[39m
[31m        onProgress?: (stage: string, message: string, progress?: number) => void;[39m
[31m        onPerspectives?: (perspectives: PlanPerspective[]) => void;[39m
[31m        onSection?: (markdown: string) => void;[39m
[31m        onReport?: (report: EnhancedSynthesisReport | SynthesisReport) => void;[39m
[31m        onError?: (error: string) => void;[39m
[31m      }[39m
[31m    ) => {[39m
[31m      if (!response.body) throw new Error(\"No response stream\");·[39m
[31m      const reader = response.body.getReader();[39m
[31m      const decoder = new TextDecoder();[39m
[31m      let buffer = \"\";·[39m
[31m      while (true) {[39m
[31m        const { done, value } = await reader.read();[39m
[31m        if (done) break;·[39m
[31m        buffer += decoder.decode(value, { stream: true });[39m
[31m        const lines = buffer.split(\"\\n\");[39m
[31m        buffer = lines.pop() || \"\";·[39m
[31m        for (const line of lines) {[39m
[31m          if (!line.startsWith(\"data: \")) continue;[39m
[31m          const dataStr = line.slice(6).trim();[39m
[31m          if (!dataStr || dataStr === \"[DONE]\") continue;·[39m
[31m          try {[39m
[31m            const event = JSON.parse(dataStr);·[39m
[31m            switch (event.type) {[39m
[31m              case \"progress\":[39m
[31m                handlers.onProgress?.(event.stage, event.message, event.progress);[39m
[31m                break;[39m
[31m              case \"perspectives\":[39m
[31m                handlers.onPerspectives?.(event.perspectives);[39m
[31m                break;[39m
[31m              case \"section\":[39m
[31m                if (event.markdown) handlers.onSection?.(event.markdown);[39m
[31m                break;[39m
[31m              case \"report\":[39m
[31m                handlers.onReport?.(event.report);[39m
[31m                break;[39m
[31m              case \"error\":[39m
[31m                throw new Error(event.error || \"Research failed\");[39m
[31m            }[39m
[31m          } catch (parseErr) {[39m
[31m            if (parseErr instanceof SyntaxError) continue;[39m
[31m            throw parseErr;[39m
[31m          }[39m
[31m        }[39m
[31m      }[39m
[31m    },[39m
[31m    [][39m
[31m  );·[39m
[31m  // ── Phase 1: Generate research plan (perspectives) ─────────────────[39m
[31m  const fetchPlan = useCallback([39m
[31m    async () => {[39m
[31m      if (!topic.trim()) return;·[39m
[31m      setPageState(\"plan-preview\");[39m
[31m      setError(null);[39m
[31m      setPlanPerspectives([]);[39m
[31m      setProgressMessage(\"Generating research plan...\");·[39m
[31m      const controller = new AbortController();[39m
[31m      abortRef.current = controller;·[39m
[31m      try {[39m
[31m        const response = await fetch(\"/api/deep-research/plan\", {[39m
[31m          method: \"POST\",[39m
[31m          headers: { \"Content-Type\": \"application/json\" },[39m
[31m          body: JSON.stringify({ topic: topic.trim(), mode }),[39m
[31m          signal: controller.signal,[39m
[31m        });·[39m
[31m        if (!response.ok) {[39m
[31m          const data = await response.json().catch(() => ({}));[39m
[31m          throw new Error(data.error || `Plan generation failed (${response.status})`);[39m
[31m        }·[39m
[31m        await readSSEStream(response, {[39m
[31m          onProgress: (_stage, message) => {[39m
[31m            setProgressMessage(message);[39m
[31m          },[39m
[31m          onPerspectives: (perspectives) => {[39m
[31m            setPlanPerspectives(perspectives);[39m
[31m          },[39m
[31m          onError: (err) => {[39m
[31m            throw new Error(err);[39m
[31m          },[39m
[31m        });[39m
[31m      } catch (err) {[39m
[31m        if ((err as Error).name === \"AbortError\") {[39m
[31m          setPageState(\"idle\");[39m
[31m          return;[39m
[31m        }[39m
[31m        setError(err instanceof Error ? err.message : \"Unable to complete the operation. Please try again.\");[39m
[31m        setPageState(\"error\");[39m
[31m      } finally {[39m
[31m        abortRef.current = null;[39m
[31m      }[39m
[31m    },[39m
[31m    [topic, mode, readSSEStream][39m
[31m  );·[39m
[31m  // ── Phase 2: Execute research with confirmed perspectives ──────────[39m
[31m  const executeResearch = useCallback([39m
[31m    async (confirmedPerspectives: PlanPerspective[]) => {[39m
[31m      if (!topic.trim()) return;·[39m
[31m      setPageState(\"running\");[39m
[31m      setError(null);[39m
[31m      setReport(null);[39m
[31m      setStreamingSections([]);[39m
[31m      seenStageIdsRef.current = [];[39m
[31m      currentStageIdRef.current = null;[39m
[31m      setProgressStages(buildStagesFromEvents([], null));[39m
[31m      setProgressPercent(0);[39m
[31m      setProgressMessage(\"Starting research...\");·[39m
[31m      const controller = new AbortController();[39m
[31m      abortRef.current = controller;·[39m
[31m      try {[39m
[31m        const response = await fetch(\"/api/deep-research/execute\", {[39m
[31m          method: \"POST\",[39m
[31m          headers: { \"Content-Type\": \"application/json\" },[39m
[31m          body: JSON.stringify({[39m
[31m            topic: topic.trim(),[39m
[31m            mode,[39m
[31m            perspectives: confirmedPerspectives,[39m
[31m          }),[39m
[31m          signal: controller.signal,[39m
[31m        });·[39m
[31m        if (!response.ok) {[39m
[31m          const data = await response.json().catch(() => ({}));[39m
[31m          throw new Error(data.error || `Research failed (${response.status})`);[39m
[31m        }·[39m
[31m        await readSSEStream(response, {[39m
[31m          onProgress: (stage, message, progress) => {[39m
[31m            setProgressMessage(message);[39m
[31m            if (progress) setProgressPercent(progress);·[39m
[31m            if (stage && stage !== currentStageIdRef.current) {[39m
[31m              const prevStage = currentStageIdRef.current;[39m
[31m              if (prevStage && !seenStageIdsRef.current.includes(prevStage)) {[39m
[31m                seenStageIdsRef.current = [...seenStageIdsRef.current, prevStage];[39m
[31m              }[39m
[31m              currentStageIdRef.current = stage;[39m
[31m              setProgressStages([39m
[31m                buildStagesFromEvents(seenStageIdsRef.current, stage)[39m
[31m              );[39m
[31m            }[39m
[31m          },[39m
[31m          onSection: (markdown) => {[39m
[31m            setStreamingSections((prev) => [[39m
[31m              ...prev,[39m
[31m              { markdown, animating: true },[39m
[31m            ]);[39m
[31m            setTimeout(() => {[39m
[31m              setStreamingSections((prev) =>[39m
[31m                prev.map((s, i) =>[39m
[31m                  i === prev.length - 1 ? { ...s, animating: false } : s[39m
[31m                )[39m
[31m              );[39m
[31m            }, 800);[39m
[31m          },[39m
[31m          onReport: (reportData) => {[39m
[31m            setReport(reportData);[39m
[31m            setPageState(\"done\");[39m
[31m            setProgressPercent(100);[39m
[31m            const allCompleted = [[39m
[31m              \"search-round-1\", \"citation-traversal\", \"search-round-2\",[39m
[31m              \"full-text-extraction\", \"data-extraction\",[39m
[31m              \"synthesis-perspectives\", \"synthesis-summary\",[39m
[31m              \"synthesis-tables\", \"synthesis-critique\",[39m
[31m            ];[39m
[31m            seenStageIdsRef.current = allCompleted;[39m
[31m            currentStageIdRef.current = null;[39m
[31m            setProgressStages(buildStagesFromEvents(allCompleted, null));[39m
[31m          },[39m
[31m        });·[39m
[31m        setPageState((prev) => (prev === \"running\" ? \"done\" : prev));[39m
[31m      } catch (err) {[39m
[31m        if ((err as Error).name === \"AbortError\") {[39m
[31m          setPageState(\"idle\");[39m
[31m          return;[39m
[31m        }[39m
[31m        setError(err instanceof Error ? err.message : \"Unable to complete the operation. Please try again.\");[39m
[31m        setPageState(\"error\");[39m
[31m      } finally {[39m
[31m        abortRef.current = null;[39m
[31m      }[39m
[31m    },[39m
[31m    [topic, mode, readSSEStream][39m
[31m  );·[39m
[31m  // ── Handle initial start button ───────────────────────────────────[39m
[31m  const handleStart = useCallback(() => {[39m
[31m    fetchPlan();[39m
[31m  }, [fetchPlan]);·[39m
[31m  // ── Handle plan confirmation ──────────────────────────────────────[39m
[31m  const handlePlanConfirm = useCallback([39m
[31m    (perspectives: PlanPerspective[]) => {[39m
[31m      setPlanPerspectives([]);[39m
[31m      executeResearch(perspectives);[39m
[31m    },[39m
[31m    [executeResearch][39m
[31m  );·[39m
[31m  // ── Handle plan regeneration ──────────────────────────────────────[39m
[31m  const handlePlanRegenerate = useCallback(() => {[39m
[31m    fetchPlan();[39m
[31m  }, [fetchPlan]);·[39m
[31m  // ── Abort research ────────────────────────────────────────────────[39m
[31m  const handleAbort = useCallback(() => {[39m
[31m    if (abortRef.current) {[39m
[31m      abortRef.current.abort();[39m
[31m    }[39m
[31m    setPlanPerspectives([]);[39m
[31m    setPageState(\"idle\");[39m
[31m  }, []);·[39m
[31m  // ── Handle key press ──────────────────────────────────────────────[39m
[31m  const handleKeyDown = useCallback([39m
[31m    (e: React.KeyboardEvent) => {[39m
[31m      if (e.key === \"Enter\" && !e.shiftKey && topic.trim() && pageState === \"idle\") {[39m
[31m        e.preventDefault();[39m
[31m        handleStart();[39m
[31m      }[39m
[31m    },[39m
[31m    [topic, pageState, handleStart][39m
[31m  );·[39m
[31m  // ── Load a saved session ──────────────────────────────────────────[39m
[31m  const handleLoadSession = useCallback(async (sessionId: number) => {[39m
[31m    try {[39m
[31m      setPageState(\"running\");[39m
[31m      setProgressMessage(\"Loading saved research...\");·[39m
[31m      const res = await fetch(`/api/deep-research/sessions/${sessionId}`);[39m
[31m      if (!res.ok) throw new Error(\"Failed to load session\");[39m
[31m      const data = await res.json();·[39m
[31m      const loadedReport: EnhancedSynthesisReport = {[39m
[31m        topic: data.topic,[39m
[31m        mode: data.mode,[39m
[31m        summary: \"\",[39m
[31m        keyFindings: data.keyFindings || [],[39m
[31m        perspectives: [],[39m
[31m        gaps: data.gaps || [],[39m
[31m        contradictions: [],[39m
[31m        totalSources: data.sources?.length || 0,[39m
[31m        sources: data.sources || [],[39m
[31m        markdownReport: data.markdownReport,[39m
[31m      };·[39m
[31m      setReport(loadedReport);[39m
[31m      setTopic(data.topic);[39m
[31m      setMode(data.mode as ResearchMode);[39m
[31m      setPageState(\"done\");[39m
[31m    } catch {[39m
[31m      setError(\"Failed to load saved research\");[39m
[31m      setPageState(\"error\");[39m
[31m    }[39m
[31m  }, []);·[39m
[31m  // ── Determine if report has markdownReport (enhanced) ─────────────[39m
[31m  const isEnhancedReport = report && \"markdownReport\" in report && (report as EnhancedSynthesisReport).markdownReport;[39m
[31m  const enhancedReport = isEnhancedReport ? (report as EnhancedSynthesisReport) : null;[39m
[31m  const sources: DeepResearchSource[] = report?.sources || [];·[39m
[31m  // ── Build combined streaming markdown ─────────────────────────────[39m
[31m  const _streamingMarkdown = streamingSections.map((s) => s.markdown).join(\"\\n\\n\");·[39m
[31m  return ([39m
[31m    <div className=\"flex-1 min-h-screen bg-white dark:bg-gray-950\">[39m
[31m      {/* Header area - always visible */}[39m
[31m      <div className=\"sticky top-0 z-20 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800/50 print:hidden\">[39m
[31m        <div className=\"max-w-7xl mx-auto px-4 sm:px-6 py-4\">[39m
[31m          <div className=\"flex items-center justify-between gap-4\">[39m
[31m            {/* Title */}[39m
[31m            <div className=\"flex items-center gap-3\">[39m
[31m              <div className=\"w-9 h-9 rounded-xl bg-blue-500/20 flex items-center justify-center\">[39m
[31m                <Microscope size={18} className=\"text-blue-400\" />[39m
[31m              </div>[39m
[31m              <div>[39m
[31m                <h1 className=\"text-lg font-bold text-gray-900 dark:text-white\">Deep Research</h1>[39m
[31m                <p className=\"text-xs text-gray-500\">Multi-perspective literature synthesis</p>[39m
[31m              </div>[39m
[31m            </div>·[39m
[31m            {/* Export & Save buttons - visible when done */}[39m
[31m            {pageState === \"done\" && report && ([39m
[31m              <div className=\"flex items-center gap-3\">[39m
[31m                {enhancedReport?.markdownReport && ([39m
[31m                  <ExportButtons[39m
[31m                    markdownReport={enhancedReport.markdownReport}[39m
[31m                    topic={report.topic}[39m
[31m                    sources={sources}[39m
[31m                    keyFindings={report.keyFindings}[39m
[31m                    gaps={report.gaps}[39m
[31m                    mode={report.mode}[39m
[31m                  />[39m
[31m                )}[39m
[31m                <SaveToLibraryButton[39m
[31m                  topic={report.topic}[39m
[31m                  mode={report.mode}[39m
[31m                  markdownReport={enhancedReport?.markdownReport || \"\"}[39m
[31m                  sources={sources}[39m
[31m                  keyFindings={report.keyFindings}[39m
[31m                  gaps={report.gaps}[39m
[31m                  isComplete={pageState === \"done\"}[39m
[31m                />[39m
[31m              </div>[39m
[31m            )}·[39m
[31m            {/* Abort button - visible when running or plan-preview */}[39m
[31m            {(pageState === \"running\" || pageState === \"plan-preview\") && ([39m
[31m              <button[39m
[31m                onClick={handleAbort}[39m
[31m                className=\"flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg hover:bg-red-500/20 transition-colors\"[39m
[31m              >[39m
[31m                <StopCircle size={16} />[39m
[31m                Stop[39m
[31m              </button>[39m
[31m            )}[39m
[31m          </div>[39m
[31m        </div>[39m
[31m      </div>·[39m
[31m      {/* Main content */}[39m
[31m      <div className=\"max-w-7xl mx-auto px-4 sm:px-6 py-8\">[39m
[31m        {/* ── Idle State: Input form ──────────────────────────────── */}[39m
[31m        {pageState === \"idle\" && ([39m
[31m          <div className=\"max-w-2xl mx-auto space-y-8\">[39m
[31m            {/* Hero text */}[39m
[31m            <div className=\"text-center space-y-3 pt-12\">[39m
[31m              <h2 className=\"text-3xl font-bold text-gray-900 dark:text-white\">[39m
[31m                What would you like to research?[39m
[31m              </h2>[39m
[31m              <p className=\"text-gray-500 dark:text-gray-400 text-base max-w-lg mx-auto\">[39m
[31m                Enter a research topic and we will synthesize findings from multiple[39m
[31m                academic perspectives with full citations.[39m
[31m              </p>[39m
[31m            </div>·[39m
[31m            {/* Topic input */}[39m
[31m            <div className=\"relative\">[39m
[31m              <input aria-label=\"Text input\"[39m
[31m                type=\"text\"[39m
[31m                value={topic}[39m
[31m                onChange={(e) => setTopic(e.target.value)}[39m
[31m                onKeyDown={handleKeyDown}[39m
[31m                placeholder=\"e.g., Efficacy of GLP-1 receptor agonists in type 2 diabetes management\"[39m
[31m                className=\"w-full bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 rounded-xl px-5 py-4 text-gray-900 dark:text-white text-base placeholder-gray-500 outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all\"[39m
[31m              />[39m
[31m            </div>·[39m
[31m            {/* Mode selector - segmented control */}[39m
[31m            <div className=\"bg-gray-50 dark:bg-gray-800/30 border border-gray-200 dark:border-gray-700/30 rounded-xl p-1.5 flex gap-1\">[39m
[31m              {RESEARCH_MODES.map((m) => {[39m
[31m                const Icon = MODE_ICONS[m.id];[39m
[31m                const isSelected = mode === m.id;[39m
[31m                return ([39m
[31m                  <button[39m
[31m                    key={m.id}[39m
[31m                    onClick={() => setMode(m.id)}[39m
[31m                    className={`flex-1 flex flex-col items-center gap-1.5 px-3 py-3 rounded-lg text-center transition-all ${[39m
[31m                      isSelected[39m
[31m                        ? \"bg-white dark:bg-gray-700/60 border border-gray-300 dark:border-gray-600/50 shadow-sm\"[39m
[31m                        : \"hover:bg-gray-100 dark:hover:bg-gray-800/40\"[39m
[31m                    }`}[39m
[31m                  >[39m
[31m                    <Icon[39m
[31m                      size={18}[39m
[31m                      className={isSelected ? \"text-blue-400\" : \"text-gray-500\"}[39m
[31m                    />[39m
[31m                    <span[39m
[31m                      className={`text-sm font-medium ${[39m
[31m                        isSelected ? \"text-gray-900 dark:text-white\" : \"text-gray-500 dark:text-gray-400\"[39m
[31m                      }`}[39m
[31m                    >[39m
[31m                      {m.label}[39m
[31m                    </span>[39m
[31m                    <span className=\"text-[10px] text-gray-500\">{m.estimatedTime}</span>[39m
[31m                  </button>[39m
[31m                );[39m
[31m              })}[39m
[31m            </div>·[39m
[31m            {/* Start button */}[39m
[31m            <button[39m
[31m              onClick={handleStart}[39m
[31m              disabled={!topic.trim()}[39m
[31m              className=\"w-full py-3.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-base rounded-xl transition-colors flex items-center justify-center gap-2\"[39m
[31m            >[39m
[31m              <Search size={18} />[39m
[31m              Start Deep Research[39m
[31m            </button>·[39m
[31m            {/* Past research sessions */}[39m
[31m            <PastResearchSessions onLoadSession={handleLoadSession} />[39m
[31m          </div>[39m
[31m        )}·[39m
[31m        {/* ── Plan Preview State ─────────────────────────────────── */}[39m
[31m        {pageState === \"plan-preview\" && planPerspectives.length > 0 && ([39m
[31m          <div className=\"py-8\">[39m
[31m            <ResearchPlanPreview[39m
[31m              perspectives={planPerspectives}[39m
[31m              onConfirm={handlePlanConfirm}[39m
[31m              onRegenerate={handlePlanRegenerate}[39m
[31m            />[39m
[31m          </div>[39m
[31m        )}·[39m
[31m        {/* ── Plan Loading State ──────────────────────────────────── */}[39m
[31m        {pageState === \"plan-preview\" && planPerspectives.length === 0 && ([39m
[31m          <div className=\"flex items-center justify-center min-h-[400px]\">[39m
[31m            <div className=\"text-center space-y-4\">[39m
[31m              <div className=\"w-16 h-16 mx-auto rounded-full bg-purple-500/10 flex items-center justify-center\">[39m
[31m                <Microscope size={28} className=\"text-purple-400 animate-pulse\" />[39m
[31m              </div>[39m
[31m              <div>[39m
[31m                <p className=\"text-gray-900 dark:text-white font-medium\">{progressMessage}</p>[39m
[31m                <p className=\"text-gray-500 text-sm mt-1\">[39m
[31m                  Preparing research plan for: {topic}[39m
[31m                </p>[39m
[31m              </div>[39m
[31m            </div>[39m
[31m          </div>[39m
[31m        )}·[39m
[31m        {/* ── Running State: Progress + Streaming ────────────────── */}[39m
[31m        {pageState === \"running\" && ([39m
[31m          <div className=\"flex gap-8\">[39m
[31m            {/* Progress stepper on the left */}[39m
[31m            <ProgressStepper[39m
[31m              stages={progressStages}[39m
[31m              currentMessage={progressMessage}[39m
[31m              progress={progressPercent}[39m
[31m            />·[39m
[31m            {/* Streaming content on the right */}[39m
[31m            <div className=\"flex-1 min-w-0\">[39m
[31m              {streamingSections.length > 0 ? ([39m
[31m                <div className=\"max-w-4xl mx-auto space-y-6\">[39m
[31m                  {/* empty state: no data, no results, nothing here */}[39m
[31m                  {streamingSections.map((section, idx) => ([39m
[31m                    <div[39m
[31m                      key={idx}[39m
[31m                      className={`transition-all duration-700 ${[39m
[31m                        section.animating[39m
[31m                          ? \"opacity-0 translate-y-4\"[39m
[31m                          : \"opacity-100 translate-y-0\"[39m
[31m                      }`}[39m
[31m                    >[39m
[31m                      <ResearchDocument[39m
[31m                        markdownReport={section.markdown}[39m
[31m                        sources={sources}[39m
[31m                      />[39m
[31m                    </div>[39m
[31m                  ))}[39m
[31m                </div>[39m
[31m              ) : ([39m
[31m                <div className=\"flex items-center justify-center min-h-[400px]\">[39m
[31m                  <div className=\"text-center space-y-4\">[39m
[31m                    <div className=\"w-16 h-16 mx-auto rounded-full bg-blue-500/10 flex items-center justify-center\">[39m
[31m                      <Microscope size={28} className=\"text-blue-400 animate-pulse\" />[39m
[31m                    </div>[39m
[31m                    <div>[39m
[31m                      <p className=\"text-gray-900 dark:text-white font-medium\">{progressMessage}</p>[39m
[31m                      <p className=\"text-gray-500 text-sm mt-1\">[39m
[31m                        Researching: {topic}[39m
[31m                      </p>[39m
[31m                    </div>[39m
[31m                  </div>[39m
[31m                </div>[39m
[31m              )}[39m
[31m            </div>[39m
[31m          </div>[39m
[31m        )}·[39m
[31m        {/* ── Done State: Full Report ────────────────────────────── */}[39m
[31m        {pageState === \"done\" && report && ([39m
[31m          <div>[39m
[31m            {/* Topic & mode header */}[39m
[31m            <div className=\"mb-8 text-center\">[39m
[31m              <h2 className=\"text-2xl font-bold text-gray-900 dark:text-white mb-2\">{report.topic}</h2>[39m
[31m              <div className=\"flex items-center justify-center gap-3 text-sm text-gray-500 dark:text-gray-400\">[39m
[31m                <span className=\"capitalize\">{report.mode} mode</span>[39m
[31m                <span>&middot;</span>[39m
[31m                <span>{report.totalSources} sources analyzed</span>[39m
[31m              </div>[39m
[31m            </div>·[39m
[31m            {/* Render enhanced markdown report or legacy card view */}[39m
[31m            {enhancedReport?.markdownReport ? ([39m
[31m              <ResearchDocument[39m
[31m                markdownReport={enhancedReport.markdownReport}[39m
[31m                sources={sources}[39m
[31m              />[39m
[31m            ) : ([39m
[31m              <LegacyReportView report={report as SynthesisReport} />[39m
[31m            )}·[39m
[31m            {/* New research button */}[39m
[31m            <div className=\"max-w-4xl mx-auto mt-12 text-center print:hidden\">[39m
[31m              <button[39m
[31m                onClick={() => {[39m
[31m                  setPageState(\"idle\");[39m
[31m                  setReport(null);[39m
[31m                  setStreamingSections([]);[39m
[31m                  setProgressStages([]);[39m
[31m                  seenStageIdsRef.current = [];[39m
[31m                  currentStageIdRef.current = null;[39m
[31m                  setTopic(\"\");[39m
[31m                }}[39m
[31m                className=\"px-6 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-white transition-colors\"[39m
[31m              >[39m
[31m                Start New Research[39m
[31m              </button>[39m
[31m            </div>[39m
[31m          </div>[39m
[31m        )}·[39m
[31m        {/* ── Error State ────────────────────────────────────────── */}[39m
[31m        {pageState === \"error\" && ([39m
[31m          <div className=\"max-w-lg mx-auto text-center space-y-4 pt-20\">[39m
[31m            <div className=\"w-16 h-16 mx-auto rounded-full bg-red-500/10 flex items-center justify-center\">[39m
[31m              <AlertCircle size={28} className=\"text-red-400\" />[39m
[31m            </div>[39m
[31m            <h3 className=\"text-lg font-semibold text-gray-900 dark:text-white\">Research Failed</h3>[39m
[31m            <p className=\"text-gray-500 dark:text-gray-400 text-sm\">{error}</p>[39m
[31m            <button[39m
[31m              onClick={() => {[39m
[31m                setPageState(\"idle\");[39m
[31m                setError(null);[39m
[31m              }}[39m
[31m              className=\"px-6 py-2.5 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors\"[39m
[31m            >[39m
[31m              Try Again[39m
[31m            </button>[39m
[31m          </div>[39m
[31m        )}[39m
[31m      </div>[39m
[31m    </div>[39m
[31m  );[39m
[31m}[39m
[31m"[39m

   at ../module-assertions/deep-research.ts:26

  24 |
  25 | function expectSourceContains(rootDir: string, relativePath: string, needle: string) {
> 26 |   expect(readFile(rootDir, relativePath)).toContain(needle);
     |                                           ^
  27 | }
  28 |
  29 | function expectSourceMatches(rootDir: string, relativePath: string, pattern: RegExp) {
    at expectSourceContains (/home/user/ScholarSync-/qa/module-assertions/deep-research.ts:26:43)
    at assertDeepResearchCheckpoint (/home/user/ScholarSync-/qa/module-assertions/deep-research.ts:207:5)
    at /home/user/ScholarSync-/qa/generated/deep-research/spec-002.spec.ts:618:27 |
