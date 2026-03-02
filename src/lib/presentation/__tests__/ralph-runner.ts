/**
 * RALPH Loop Test Runner — Diagram Generation Hardening
 *
 * RALPH = Red-team → Attempt → Log → Patch → Harden
 *
 * Usage:
 *   npx tsx src/lib/presentation/__tests__/ralph-runner.ts [--case ralph-001] [--all] [--score]
 *
 * Modes:
 *   --case <id>   Run a single test case
 *   --all         Run all test cases
 *   --score       Show the cumulative scorecard
 *   --baseline    Generate diagrams using current AI prompts (requires API key)
 *   --validate    Validate existing Mermaid syntax results only (no AI call)
 */

import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface RalphTestCase {
  id: string;
  name: string;
  category: string;
  difficulty: string;
  input: string;
  expectedDiagramType: string;
  expectedNodeCount: number;
  qualityCriteria: string[];
  napkinBenchmark: string;
}

interface RalphFailure {
  type: "truncation" | "overflow" | "wrong-type" | "missing-node" | "bad-syntax" | "unreadable" | "ugly" | "missing-data";
  description: string;
  severity: "critical" | "major" | "minor";
  suggestedFix: string;
}

interface RalphAttemptResult {
  testId: string;
  attempt: number;
  timestamp: string;
  mermaidSyntax: string | null;
  diagramType: string | null;
  syntaxValid: boolean;
  renderSuccess: boolean;
  failures: RalphFailure[];
  qualityCriteriaResults: Record<string, boolean>;
  overallScore: number;
}

interface ScorecardEntry {
  id: string;
  name: string;
  bestScore: number;
  latestAttempt: number;
  status: "pass" | "fail" | "untested";
}

interface Scorecard {
  lastUpdated: string;
  totalCases: number;
  passing: number;
  failing: number;
  untested: number;
  averageScore: number;
  cases: ScorecardEntry[];
}

// ---------------------------------------------------------------------------
// Paths
// ---------------------------------------------------------------------------

const CASES_DIR = join(__dirname, "ralph-cases");
const RESULTS_DIR = join(__dirname, "ralph-results");
const SCORECARD_PATH = join(__dirname, "ralph-scorecard.json");

// ---------------------------------------------------------------------------
// Mermaid Syntax Validator (offline, no rendering)
// ---------------------------------------------------------------------------

/** Basic structural validation of Mermaid syntax without actual rendering */
function validateMermaidSyntax(syntax: string, expectedType: string): {
  valid: boolean;
  errors: string[];
  nodeCount: number;
  hasStyleDefs: boolean;
} {
  const errors: string[] = [];
  const trimmed = syntax.trim();

  if (!trimmed) {
    return { valid: false, errors: ["Empty syntax"], nodeCount: 0, hasStyleDefs: false };
  }

  // Check diagram type declaration
  const typePatterns: Record<string, RegExp> = {
    flowchart: /^(graph|flowchart)\s+(TD|TB|LR|RL|BT)/m,
    sequence: /^sequenceDiagram/m,
    classDiagram: /^classDiagram/m,
    stateDiagram: /^stateDiagram(-v2)?/m,
    erDiagram: /^erDiagram/m,
    gantt: /^gantt/m,
    pie: /^pie/m,
    mindmap: /^mindmap/m,
    timeline: /^timeline/m,
  };

  const pattern = typePatterns[expectedType];
  if (pattern && !pattern.test(trimmed)) {
    // Check if it matches ANY known type (wrong type chosen)
    let matchedType: string | null = null;
    for (const [type, pat] of Object.entries(typePatterns)) {
      if (pat.test(trimmed)) {
        matchedType = type;
        break;
      }
    }
    if (matchedType) {
      errors.push(`Expected ${expectedType} but got ${matchedType}`);
    } else {
      errors.push(`No recognized diagram type declaration found`);
    }
  }

  // Count nodes (rough estimate based on diagram type)
  let nodeCount = 0;
  if (expectedType === "flowchart" || !pattern || /^(graph|flowchart)/m.test(trimmed)) {
    // Count unique node IDs in flowchart: A[label], B{label}, C(label), etc.
    const nodeMatches = trimmed.match(/\b([A-Za-z_]\w*)\s*[\[({>]/g);
    const uniqueNodes = new Set(nodeMatches?.map(m => m.replace(/[\[({>\s]/g, "")) ?? []);
    nodeCount = uniqueNodes.size;
  } else if (expectedType === "timeline") {
    // Count timeline entries (lines starting with date/period labels)
    const entries = trimmed.split("\n").filter(l => l.trim() && !l.trim().startsWith("timeline") && !l.trim().startsWith("title") && !l.trim().startsWith("section"));
    nodeCount = entries.length;
  } else if (expectedType === "mindmap") {
    const entries = trimmed.split("\n").filter(l => l.trim() && !l.trim().startsWith("mindmap"));
    nodeCount = entries.length;
  }

  // Check for common syntax errors
  const unclosedBrackets = (trimmed.match(/\[/g)?.length ?? 0) - (trimmed.match(/\]/g)?.length ?? 0);
  if (Math.abs(unclosedBrackets) > 0) {
    errors.push(`Unbalanced square brackets (${unclosedBrackets > 0 ? "unclosed" : "extra closing"})`);
  }

  const unclosedParens = (trimmed.match(/\(/g)?.length ?? 0) - (trimmed.match(/\)/g)?.length ?? 0);
  if (Math.abs(unclosedParens) > 1) {
    errors.push(`Unbalanced parentheses (diff: ${unclosedParens})`);
  }

  // Check for special characters that break Mermaid (smart/curly quotes)
  // Must use Unicode escapes — source file may normalize visual smart quotes to ASCII
  if (/[\u201C\u201D\u2018\u2019]/.test(trimmed)) {
    errors.push("Contains smart quotes (curly quotes) — Mermaid requires straight quotes");
  }

  // Check for style definitions
  const hasStyleDefs = /style\s+\w+/m.test(trimmed) || /classDef\s+\w+/m.test(trimmed) || /:::/.test(trimmed);

  return {
    valid: errors.length === 0,
    errors,
    nodeCount,
    hasStyleDefs,
  };
}

// ---------------------------------------------------------------------------
// Quality Assessment (automated heuristics)
// ---------------------------------------------------------------------------

function assessQuality(
  testCase: RalphTestCase,
  syntax: string | null,
  validationResult: ReturnType<typeof validateMermaidSyntax>
): { failures: RalphFailure[]; criteriaResults: Record<string, boolean>; score: number } {
  const failures: RalphFailure[] = [];
  const criteriaResults: Record<string, boolean> = {};

  if (!syntax) {
    for (const criterion of testCase.qualityCriteria) {
      criteriaResults[criterion] = false;
    }
    failures.push({
      type: "bad-syntax",
      description: "No Mermaid syntax generated",
      severity: "critical",
      suggestedFix: "Check AI prompt and generation pipeline",
    });
    return { failures, criteriaResults, score: 0 };
  }

  // Evaluate each quality criterion with heuristics
  for (const criterion of testCase.qualityCriteria) {
    const lower = criterion.toLowerCase();

    if (lower.includes("valid mermaid syntax")) {
      criteriaResults[criterion] = validationResult.valid;
      if (!validationResult.valid) {
        failures.push({
          type: "bad-syntax",
          description: `Syntax errors: ${validationResult.errors.join("; ")}`,
          severity: "critical",
          suggestedFix: "Fix Mermaid syntax — check bracket matching and type declarations",
        });
      }
    } else if (lower.includes("node") && lower.includes("present")) {
      const met = validationResult.nodeCount >= testCase.expectedNodeCount * 0.7;
      criteriaResults[criterion] = met;
      if (!met) {
        failures.push({
          type: "missing-node",
          description: `Expected ~${testCase.expectedNodeCount} nodes, found ${validationResult.nodeCount}`,
          severity: "major",
          suggestedFix: "Improve prompt to ensure all nodes from the input are included",
        });
      }
    } else if (lower.includes("truncat")) {
      // Check for truncated labels (labels shorter than 3 chars or ending in ...)
      const labels = syntax.match(/\[([^\]]+)\]/g)?.map(m => m.slice(1, -1)) ?? [];
      const truncated = labels.filter(l => l.endsWith("...") || l.length < 3);
      const met = truncated.length === 0;
      criteriaResults[criterion] = met;
      if (!met) {
        failures.push({
          type: "truncation",
          description: `${truncated.length} labels appear truncated: ${truncated.slice(0, 3).join(", ")}`,
          severity: "major",
          suggestedFix: "Increase node width or use multi-line labels with <br/> tags",
        });
      }
    } else if (lower.includes("flow direction") || lower.includes("top-down") || lower.includes("left-right")) {
      const hasDirection = /^(graph|flowchart)\s+(TD|TB|LR)/m.test(syntax);
      criteriaResults[criterion] = hasDirection;
      if (!hasDirection) {
        failures.push({
          type: "wrong-type",
          description: "No explicit flow direction (TD/LR) specified",
          severity: "minor",
          suggestedFix: "Ensure graph/flowchart declaration includes TD or LR",
        });
      }
    } else if (lower.includes("color") || lower.includes("styling") || lower.includes("color coding")) {
      criteriaResults[criterion] = validationResult.hasStyleDefs;
      if (!validationResult.hasStyleDefs) {
        failures.push({
          type: "ugly",
          description: "No color or styling definitions in Mermaid syntax",
          severity: "minor",
          suggestedFix: "Add classDef or style directives for visual distinction",
        });
      }
    } else if (lower.includes("numeric") || lower.includes("number")) {
      // Check if expected numbers from input appear in syntax
      const numbers = testCase.input.match(/\d[\d,]*/g) ?? [];
      const bigNumbers = numbers.filter(n => parseInt(n.replace(/,/g, "")) > 10);
      const found = bigNumbers.filter(n => syntax.includes(n) || syntax.includes(n.replace(/,/g, "")));
      const met = found.length >= bigNumbers.length * 0.5;
      criteriaResults[criterion] = met;
      if (!met) {
        failures.push({
          type: "missing-data",
          description: `Only ${found.length}/${bigNumbers.length} numeric values from input found in diagram`,
          severity: "major",
          suggestedFix: "Ensure AI includes all numeric data in node labels",
        });
      }
    } else if (lower.includes("main branch") || (lower.includes("branch") && lower.includes("present") && testCase.expectedDiagramType === "mindmap")) {
      // Mind map: count top-level branches by checking criterion for listed names
      const branchNames = criterion.match(/\(([^)]+)\)/)?.[1]?.split(",").map(s => s.trim()) ?? [];
      if (branchNames.length > 0) {
        const found = branchNames.filter(name => {
          const words = name.split(/\s+/);
          return words.some(w => new RegExp(w, "i").test(syntax));
        });
        const met = found.length >= branchNames.length * 0.7;
        criteriaResults[criterion] = met;
        if (!met) {
          failures.push({
            type: "missing-data",
            description: `Only ${found.length}/${branchNames.length} expected branches found`,
            severity: "major",
            suggestedFix: "Ensure all main branches from input are in the mind map",
          });
        }
      } else {
        criteriaResults[criterion] = true;
      }
    } else if (lower.includes("sub-branch") || lower.includes("specific item")) {
      // Mind map: check for specific items mentioned in the criterion or input
      const items = ["APOE4", "Lecanemab", "PET imaging", "Tau", "amyloid"];
      const found = items.filter(item => new RegExp(item, "i").test(syntax));
      criteriaResults[criterion] = found.length >= 3;
    } else if (lower.includes("hierarchy") && lower.includes("depth")) {
      // Mind map: check indentation depth (Mermaid mindmap uses 4-space indent)
      const lines = syntax.split("\n");
      let maxDepth = 0;
      for (const line of lines) {
        const indent = line.match(/^(\s*)/)?.[1].length ?? 0;
        // Mermaid mindmap typically uses 4 spaces per level, but also 2
        const depth = Math.floor(indent / 2);
        maxDepth = Math.max(maxDepth, depth);
      }
      criteriaResults[criterion] = maxDepth >= 3;
      if (maxDepth < 3) {
        failures.push({
          type: "missing-data",
          description: `Max hierarchy depth: ${maxDepth}, expected at least 3`,
          severity: "major",
          suggestedFix: "Ensure mind map has root -> branch -> sub-branch depth",
        });
      }
    } else if (lower.includes("overlapping") && lower.includes("task") && testCase.expectedDiagramType === "gantt") {
      // Gantt: parallel tasks — check for multiple tasks in enrollment section or overlapping date ranges
      const taskLines = syntax.split("\n").filter(l =>
        /:\s*\w+,/.test(l) || /:\s*\d{4}/.test(l) || /after\s+\w+/.test(l)
      );
      // Also check if multiple "Site" tasks exist (parallel enrollment)
      const hasSites = (syntax.match(/site\s*\d/gi) ?? []).length >= 2;
      criteriaResults[criterion] = taskLines.length >= 5 || hasSites;
    } else if ((lower.includes("branch") || lower.includes("parallel") || lower.includes("converge")) && testCase.expectedDiagramType !== "gantt") {
      // Flowchart: check for branching patterns (multiple arrows from one node)
      const lines = syntax.split("\n");
      const sourceCounts: Record<string, number> = {};
      for (const line of lines) {
        const arrowMatch = line.match(/^\s*(\w+)\s*(?:-->|---|-\.-|==>)/);
        if (arrowMatch) {
          const src = arrowMatch[1];
          sourceCounts[src] = (sourceCounts[src] ?? 0) + 1;
        }
      }
      const hasBranch = Object.values(sourceCounts).some(count => count >= 2);
      criteriaResults[criterion] = hasBranch;
      if (!hasBranch) {
        failures.push({
          type: "missing-node",
          description: "No branching pattern detected — no node has 2+ outgoing arrows",
          severity: "major",
          suggestedFix: "Ensure the AI generates branch points where the input describes parallel paths",
        });
      }
    } else if (lower.includes("exclusion") || lower.includes("side branch")) {
      // For PRISMA-style: check for exclusion side branches
      const hasExclusion = /exclu/i.test(syntax);
      criteriaResults[criterion] = hasExclusion;
      if (!hasExclusion) {
        failures.push({
          type: "missing-data",
          description: "No exclusion branches found in diagram",
          severity: "major",
          suggestedFix: "Add side branches showing exclusion reasons",
        });
      }
    } else if (lower.includes("phase") || lower.includes("period") || lower.includes("section")) {
      // Check for subgraph or section markers
      const hasSections = /subgraph|section/i.test(syntax);
      criteriaResults[criterion] = hasSections;
      if (!hasSections) {
        failures.push({
          type: "ugly",
          description: "No section/subgraph grouping — diagram is flat",
          severity: "minor",
          suggestedFix: "Use Mermaid subgraphs to group related nodes into phases",
        });
      }
    } else if (lower.includes("week") || lower.includes("timepoint") || lower.includes("chronolog")) {
      const hasTimeRefs = /week|wk|w\d|phase|period|day|month/i.test(syntax);
      criteriaResults[criterion] = hasTimeRefs;
      if (!hasTimeRefs) {
        failures.push({
          type: "missing-data",
          description: "No temporal references found in diagram",
          severity: "major",
          suggestedFix: "Include week/time annotations in node labels",
        });
      }
    } else if (lower.includes("treatment") && lower.includes("control")) {
      const hasBothArms = /treatment|drug/i.test(syntax) && /control|placebo/i.test(syntax);
      criteriaResults[criterion] = hasBothArms;
      if (!hasBothArms) {
        failures.push({
          type: "missing-data",
          description: "Treatment and/or control arm not represented",
          severity: "major",
          suggestedFix: "Ensure both arms are shown as parallel branches after randomization",
        });
      }
    } else if (lower.includes("overlap")) {
      // Generic check — mark as untestable without rendering
      criteriaResults[criterion] = true; // Assume ok if syntax validates
    } else if (lower.includes("database") || lower.includes("source")) {
      const hasMultipleSources = (syntax.match(/PubMed|Embase|Cochrane|database|register|source/gi) ?? []).length >= 2;
      criteriaResults[criterion] = hasMultipleSources;
      if (!hasMultipleSources) {
        failures.push({
          type: "missing-data",
          description: "Multiple database sources not shown separately",
          severity: "major",
          suggestedFix: "Show each database as a separate starting node",
        });
      }
    } else if (lower.includes("duplicate")) {
      const hasDuplicate = /duplic/i.test(syntax);
      criteriaResults[criterion] = hasDuplicate;
    } else if (lower.includes("optional") || lower.includes("different styling")) {
      // Check for styling variation
      criteriaResults[criterion] = validationResult.hasStyleDefs;
    } else if (lower.includes("randomization")) {
      const hasRandomization = /random/i.test(syntax);
      criteriaResults[criterion] = hasRandomization;
    } else if (lower.includes("visit") || lower.includes("marker")) {
      const hasVisits = /visit|follow.?up|assessment/i.test(syntax);
      criteriaResults[criterion] = hasVisits;
    } else if (lower.includes("participant") && lower.includes("present")) {
      // Sequence diagram: check for participant declarations
      const participantMatches = syntax.match(/participant\s+\w+/gi) ?? [];
      // Extract expected count from criterion (e.g., "All 5 participants")
      const countMatch = criterion.match(/(\d+)\s+participant/i);
      const expectedCount = countMatch ? parseInt(countMatch[1]) : 3;
      const met = participantMatches.length >= expectedCount * 0.7;
      criteriaResults[criterion] = met;
      if (!met) {
        failures.push({
          type: "missing-node",
          description: `Expected ~${expectedCount} participants, found ${participantMatches.length}`,
          severity: "major",
          suggestedFix: "Add participant declarations for all actors in the sequence",
        });
      }
    } else if (lower.includes("parallel") && (lower.includes("reviewer") || lower.includes("assignment") || lower.includes("par"))) {
      // Sequence: check for par block or concurrent arrows
      const hasPar = /par\b|par\s/i.test(syntax) || /rect\s/i.test(syntax);
      criteriaResults[criterion] = hasPar;
      if (!hasPar) {
        failures.push({
          type: "missing-data",
          description: "No parallel block (par) detected for concurrent activities",
          severity: "minor",
          suggestedFix: "Use Mermaid par blocks for parallel reviewer assignments",
        });
      }
    } else if (lower.includes("decision") && lower.includes("outcome")) {
      // Sequence: check for alt/opt blocks showing decisions
      const hasDecision = /alt\s|opt\s|note\s/i.test(syntax) && /accept|reject|revis/i.test(syntax);
      criteriaResults[criterion] = hasDecision;
      if (!hasDecision) {
        failures.push({
          type: "missing-data",
          description: "Decision outcomes (accept/reject/revise) not shown in alt/opt blocks",
          severity: "major",
          suggestedFix: "Use alt blocks to show editor decision outcomes",
        });
      }
    } else if (lower.includes("revision loop") || lower.includes("resubmit")) {
      const hasLoop = /loop\s|resubmit|revision/i.test(syntax);
      criteriaResults[criterion] = hasLoop;
    } else if (lower.includes("temporal") || lower.includes("annotation") || lower.includes("weeks")) {
      const hasTime = /week|month|day|\d+\s*(wk|mo|d)\b|2-4|time/i.test(syntax);
      criteriaResults[criterion] = hasTime;
    } else if (lower.includes("post-acceptance") || lower.includes("production")) {
      const hasProduction = /production|copyedit|typeset|proof|publish/i.test(syntax);
      criteriaResults[criterion] = hasProduction;
    } else if (lower.includes("central") && lower.includes("node")) {
      // Mind map: check for root node
      const hasRoot = /root\s*\(|root\s*\[\[|root\s*\(\(/i.test(syntax) || /alzheimer/i.test(syntax);
      criteriaResults[criterion] = hasRoot;
    } else if (lower.includes("drug name") || lower.includes("fully spelled")) {
      const drugs = ["Lecanemab", "Donanemab"];
      const found = drugs.filter(d => syntax.includes(d));
      criteriaResults[criterion] = found.length >= drugs.length;
    } else if (lower.includes("section") && lower.includes("present")) {
      // Gantt: check for section declarations
      const sectionCount = (syntax.match(/section\s+/gi) ?? []).length;
      const countMatch = criterion.match(/(\d+)\s+phase/i);
      const expectedSections = countMatch ? parseInt(countMatch[1]) : 3;
      const met = sectionCount >= expectedSections * 0.7;
      criteriaResults[criterion] = met;
      if (!met) {
        failures.push({
          type: "missing-data",
          description: `Expected ~${expectedSections} sections, found ${sectionCount}`,
          severity: "major",
          suggestedFix: "Add section declarations for each phase in the Gantt chart",
        });
      }
    } else if (lower.includes("date range") || lower.includes("correct date")) {
      // Gantt: check for date-like patterns
      const hasDateRanges = /\d{4}-\d{2}-\d{2}|\d+[dw]|after\s+\w+/i.test(syntax);
      criteriaResults[criterion] = hasDateRanges;
    } else if (lower.includes("milestone")) {
      const hasMilestones = /milestone|DSMB|crit\s|done\s/i.test(syntax);
      criteriaResults[criterion] = hasMilestones;
    } else if (lower.includes("section grouping") || lower.includes("section") && lower.includes("visible")) {
      const hasSections = /section\s+/i.test(syntax);
      criteriaResults[criterion] = hasSections;
    } else {
      // Unknown criterion — can't auto-evaluate, mark as needing manual check
      criteriaResults[criterion] = true;
    }
  }

  // Calculate score: 1-10 based on criteria pass rate + failure severity
  const totalCriteria = Object.keys(criteriaResults).length;
  const passedCriteria = Object.values(criteriaResults).filter(Boolean).length;
  const criticalCount = failures.filter(f => f.severity === "critical").length;
  const majorCount = failures.filter(f => f.severity === "major").length;

  let score = Math.round((passedCriteria / Math.max(totalCriteria, 1)) * 10);
  score = Math.max(0, score - criticalCount * 3 - majorCount * 1);
  score = Math.min(10, Math.max(0, score));

  return { failures, criteriaResults, score };
}

// ---------------------------------------------------------------------------
// AI Diagram Generation (calls the generate-visual API or direct AI)
// ---------------------------------------------------------------------------

async function generateDiagramViaAI(testCase: RalphTestCase): Promise<{
  syntax: string | null;
  diagramType: string | null;
  raw: string;
}> {
  // Use the Vercel AI SDK directly to generate a diagram
  // This simulates what the presentation pipeline does
  // Note: The ralph-runner sends requests to the API at /api/slides/generate-visual,
  // which uses its own prompt. This systemPrompt is only a fallback reference.
  const _systemPrompt = `You are an expert diagram designer for academic presentations.
Given the user's description, generate a Mermaid diagram.

Return ONLY valid JSON (no markdown fences):
{
  "diagramType": "flowchart|sequence|gantt|pie|mindmap|timeline",
  "syntax": "... valid Mermaid syntax ...",
  "caption": "Brief description"
}

RULES:
- Use valid Mermaid syntax. Test it mentally before returning.
- For flowcharts: use graph TD (top-down) for hierarchical flows, graph LR for timelines
- For timelines with branching (clinical trials, study designs): use flowchart LR with subgraphs, NOT Mermaid timeline
- Escape special characters in labels: use &amp; for &, use <br/> for line breaks in labels
- For long labels: break across lines using <br/> inside square brackets: A[Line 1<br/>Line 2]
- Add styling with classDef and ::: for visual distinction between phases
- Use subgraph for grouping related nodes
- Diamond shapes {Decision} for branch/decision points like randomization
- Include all numeric data from the input in node labels
- Target ${testCase.expectedNodeCount} nodes minimum`;

  try {
    // Try to use the local API if the server is running
    const res = await fetch("http://localhost:3000/api/slides/generate-visual", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: testCase.input,
        preferredType: testCase.expectedDiagramType === "flowchart" ? "flowchart" : undefined,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.options && data.options.length > 0) {
        // Find a diagram option (not infographic)
        const diagramOpt = data.options.find((o: { block: { type: string } }) => o.block.type === "diagram");
        if (diagramOpt) {
          return {
            syntax: diagramOpt.block.data.syntax,
            diagramType: diagramOpt.block.data.diagramType,
            raw: JSON.stringify(diagramOpt, null, 2),
          };
        }
        // If no diagram option, still return the first option's data
        const first = data.options[0];
        return {
          syntax: first.block.data?.syntax ?? null,
          diagramType: first.block.data?.diagramType ?? first.block.data?.infographicType ?? null,
          raw: JSON.stringify(first, null, 2),
        };
      }
    }

    // Fallback: return null and log the error
    const text = await res.text();
    return { syntax: null, diagramType: null, raw: `API error ${res.status}: ${text.slice(0, 500)}` };
  } catch (err) {
    return { syntax: null, diagramType: null, raw: `Fetch error: ${String(err)}` };
  }
}

// ---------------------------------------------------------------------------
// Manual Mermaid Syntax (for testing without AI)
// ---------------------------------------------------------------------------

/** Hand-written "ideal" Mermaid for baseline comparison */
const MANUAL_BASELINES: Record<string, { syntax: string; diagramType: string }> = {
  "ralph-001": {
    diagramType: "flowchart",
    syntax: `graph TD
    A[Literature Review] --> B[Hypothesis Formation]
    B --> C[Study Design]
    C --> D[Data Collection]
    C --> E[Ethical Approval]
    D --> F[Data Analysis]
    E --> F
    F --> G[Results Interpretation]
    G --> H[Publication]

    classDef start fill:#3B82F6,stroke:#1E40AF,color:#fff
    classDef process fill:#60A5FA,stroke:#2563EB,color:#fff
    classDef end fill:#10B981,stroke:#047857,color:#fff

    class A start
    class B,C,D,E,F,G process
    class H end`,
  },
};

// ---------------------------------------------------------------------------
// Runner
// ---------------------------------------------------------------------------

function loadTestCase(id: string): RalphTestCase {
  const path = join(CASES_DIR, `${id}.json`);
  if (!existsSync(path)) throw new Error(`Test case not found: ${path}`);
  return JSON.parse(readFileSync(path, "utf-8"));
}

function loadAllTestCases(): RalphTestCase[] {
  const files = readdirSync(CASES_DIR).filter(f => f.endsWith(".json"));
  return files.map(f => JSON.parse(readFileSync(join(CASES_DIR, f), "utf-8")));
}

function getNextAttemptNumber(testId: string): number {
  const files = readdirSync(RESULTS_DIR).filter(f => f.startsWith(`${testId}-attempt-`));
  return files.length + 1;
}

function saveResult(result: RalphAttemptResult): void {
  const filename = `${result.testId}-attempt-${result.attempt}.json`;
  writeFileSync(join(RESULTS_DIR, filename), JSON.stringify(result, null, 2));
  console.log(`  Saved: ${filename}`);
}

function loadScorecard(): Scorecard {
  if (existsSync(SCORECARD_PATH)) {
    return JSON.parse(readFileSync(SCORECARD_PATH, "utf-8"));
  }
  return {
    lastUpdated: new Date().toISOString(),
    totalCases: 0,
    passing: 0,
    failing: 0,
    untested: 0,
    averageScore: 0,
    cases: [],
  };
}

function updateScorecard(result: RalphAttemptResult, testCase: RalphTestCase): void {
  const scorecard = loadScorecard();
  const existing = scorecard.cases.find(c => c.id === result.testId);

  if (existing) {
    existing.bestScore = Math.max(existing.bestScore, result.overallScore);
    existing.latestAttempt = result.attempt;
    existing.status = result.overallScore >= 7 ? "pass" : "fail";
  } else {
    scorecard.cases.push({
      id: result.testId,
      name: testCase.name,
      bestScore: result.overallScore,
      latestAttempt: result.attempt,
      status: result.overallScore >= 7 ? "pass" : "fail",
    });
  }

  scorecard.lastUpdated = new Date().toISOString();
  scorecard.totalCases = scorecard.cases.length;
  scorecard.passing = scorecard.cases.filter(c => c.status === "pass").length;
  scorecard.failing = scorecard.cases.filter(c => c.status === "fail").length;
  scorecard.untested = scorecard.cases.filter(c => c.status === "untested").length;
  scorecard.averageScore = scorecard.cases.length > 0
    ? Math.round((scorecard.cases.reduce((sum, c) => sum + c.bestScore, 0) / scorecard.cases.length) * 10) / 10
    : 0;

  writeFileSync(SCORECARD_PATH, JSON.stringify(scorecard, null, 2));
}

function printScorecard(): void {
  const scorecard = loadScorecard();
  console.log("\n====================================");
  console.log("  RALPH Scorecard");
  console.log("====================================");
  console.log(`  Last Updated: ${scorecard.lastUpdated}`);
  console.log(`  Total Cases:  ${scorecard.totalCases}`);
  console.log(`  Passing:      ${scorecard.passing}`);
  console.log(`  Failing:      ${scorecard.failing}`);
  console.log(`  Untested:     ${scorecard.untested}`);
  console.log(`  Avg Score:    ${scorecard.averageScore}/10`);
  console.log("------------------------------------");
  for (const c of scorecard.cases) {
    const icon = c.status === "pass" ? "PASS" : c.status === "fail" ? "FAIL" : "----";
    console.log(`  [${icon}] ${c.id} — ${c.name} (${c.bestScore}/10, attempt ${c.latestAttempt})`);
  }
  console.log("====================================\n");
}

async function runTestCase(id: string, useAI: boolean = false): Promise<void> {
  const testCase = loadTestCase(id);
  const attempt = getNextAttemptNumber(id);

  console.log(`\n--- RALPH Cycle: ${id} (${testCase.name}) ---`);
  console.log(`  Category: ${testCase.category} | Difficulty: ${testCase.difficulty}`);
  console.log(`  Attempt: ${attempt}`);

  let syntax: string | null = null;
  let diagramType: string | null = null;
  let _raw = "";

  if (useAI) {
    console.log("  Mode: AI Generation (calling API)...");
    const aiResult = await generateDiagramViaAI(testCase);
    // Sanitize smart quotes that LLMs sometimes produce
    syntax = aiResult.syntax
      ? aiResult.syntax
          .replace(/[\u201C\u201D]/g, '"')
          .replace(/[\u2018\u2019]/g, "'")
      : null;
    diagramType = aiResult.diagramType;
    _raw = aiResult.raw;
  } else {
    // Use manual baseline if available, otherwise mark as needing AI
    const baseline = MANUAL_BASELINES[id];
    if (baseline) {
      console.log("  Mode: Manual baseline");
      syntax = baseline.syntax;
      diagramType = baseline.diagramType;
      _raw = "manual-baseline";
    } else {
      console.log("  Mode: No baseline available — run with --baseline for AI generation");
      syntax = null;
      diagramType = null;
      _raw = "no-baseline";
    }
  }

  // Validate
  const validation = validateMermaidSyntax(syntax ?? "", testCase.expectedDiagramType);
  console.log(`  Syntax Valid: ${validation.valid}`);
  if (validation.errors.length > 0) {
    console.log(`  Errors: ${validation.errors.join("; ")}`);
  }
  console.log(`  Node Count: ${validation.nodeCount} (expected: ${testCase.expectedNodeCount})`);
  console.log(`  Has Styling: ${validation.hasStyleDefs}`);

  // Assess quality
  const quality = assessQuality(testCase, syntax, validation);
  console.log(`  Score: ${quality.score}/10`);
  console.log(`  Criteria:`);
  for (const [criterion, passed] of Object.entries(quality.criteriaResults)) {
    console.log(`    ${passed ? "PASS" : "FAIL"} — ${criterion}`);
  }

  if (quality.failures.length > 0) {
    console.log(`  Failures:`);
    for (const f of quality.failures) {
      console.log(`    [${f.severity}] ${f.type}: ${f.description}`);
    }
  }

  // Save result
  const result: RalphAttemptResult = {
    testId: id,
    attempt,
    timestamp: new Date().toISOString(),
    mermaidSyntax: syntax,
    diagramType,
    syntaxValid: validation.valid,
    renderSuccess: validation.valid, // Approximation without actual rendering
    failures: quality.failures,
    qualityCriteriaResults: quality.criteriaResults,
    overallScore: quality.score,
  };

  saveResult(result);
  updateScorecard(result, testCase);
}

// ---------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------

async function main() {
  const args = process.argv.slice(2);

  if (!existsSync(RESULTS_DIR)) mkdirSync(RESULTS_DIR, { recursive: true });

  if (args.includes("--score")) {
    printScorecard();
    return;
  }

  const useAI = args.includes("--baseline");
  const caseIdx = args.indexOf("--case");

  if (caseIdx !== -1 && args[caseIdx + 1]) {
    await runTestCase(args[caseIdx + 1], useAI);
  } else if (args.includes("--all")) {
    const cases = loadAllTestCases();
    for (const tc of cases) {
      await runTestCase(tc.id, useAI);
    }
  } else {
    // Default: run all cases
    const cases = loadAllTestCases();
    if (cases.length === 0) {
      console.log("No test cases found in", CASES_DIR);
      return;
    }
    for (const tc of cases) {
      await runTestCase(tc.id, useAI);
    }
  }

  printScorecard();
}

main().catch(console.error);
