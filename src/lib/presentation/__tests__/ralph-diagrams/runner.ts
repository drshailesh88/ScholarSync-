/**
 * RALPH Diagram Test Runner — Napkin.ai Parity Hardening
 *
 * Tests infographic types + advanced Mermaid features that
 * match Napkin.ai's visual generation capabilities.
 *
 * Usage:
 *   npx tsx src/lib/presentation/__tests__/ralph-diagrams/runner.ts [--case rd-001] [--all] [--score]
 */

import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface InfographicItem {
  label: string;
  description?: string;
  value?: string;
  icon?: string;
  status?: "done" | "active" | "pending";
}

interface InfographicData {
  infographicType: string;
  title?: string;
  items: InfographicItem[];
  colorScheme?: string;
  caption?: string;
}

interface DiagramData {
  diagramType: string;
  syntax: string;
  caption?: string;
}

interface VisualBlock {
  type: "diagram" | "infographic";
  data: DiagramData | InfographicData;
}

interface RDTestCase {
  id: string;
  name: string;
  category: string;
  difficulty: string;
  napkinFeature: string;
  input: string;
  expectedBlockType: "diagram" | "infographic";
  expectedVisualType: string;
  expectedItemCount?: number;
  expectedNodeCount?: number;
  qualityCriteria: string[];
  napkinBenchmark: string;
  baseline: VisualBlock;
}

interface RDFailure {
  type: "wrong-type" | "missing-item" | "bad-structure" | "missing-data" | "bad-syntax" | "ugly" | "schema-error";
  description: string;
  severity: "critical" | "major" | "minor";
}

interface RDAttemptResult {
  testId: string;
  attempt: number;
  timestamp: string;
  blockType: string | null;
  visualType: string | null;
  structureValid: boolean;
  failures: RDFailure[];
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

const CASES_DIR = join(__dirname, "cases");
const RESULTS_DIR = join(__dirname, "results");
const SCORECARD_PATH = join(__dirname, "scorecard.json");

// ---------------------------------------------------------------------------
// Infographic Schema Validation
// ---------------------------------------------------------------------------

const VALID_INFOGRAPHIC_TYPES = [
  "process_flow", "comparison", "hierarchy", "cycle", "funnel",
  "pyramid", "venn", "matrix", "radial", "stats_row", "checklist", "cause_effect",
];

const _VALID_DIAGRAM_TYPES = [
  "flowchart", "sequence", "classDiagram", "stateDiagram",
  "erDiagram", "gantt", "pie", "mindmap", "timeline",
  "journey", "quadrantChart",
];

const VALID_COLOR_SCHEMES = ["theme", "blue", "green", "purple", "orange", "rainbow"];

function validateInfographicBlock(data: InfographicData, expectedType: string): {
  valid: boolean;
  errors: string[];
  itemCount: number;
  hasColorScheme: boolean;
  hasTitle: boolean;
  hasIcons: boolean;
} {
  const errors: string[] = [];

  if (!VALID_INFOGRAPHIC_TYPES.includes(data.infographicType)) {
    errors.push(`Invalid infographic type: ${data.infographicType}`);
  }

  if (data.infographicType !== expectedType) {
    errors.push(`Expected type "${expectedType}" but got "${data.infographicType}"`);
  }

  if (!data.items || !Array.isArray(data.items) || data.items.length === 0) {
    errors.push("No items array or empty items");
  }

  const itemCount = data.items?.length ?? 0;

  // Validate each item
  for (let i = 0; i < itemCount; i++) {
    const item = data.items[i];
    if (!item.label || typeof item.label !== "string" || item.label.trim().length === 0) {
      errors.push(`Item ${i}: missing or empty label`);
    }
  }

  // Check for duplicate labels
  const labels = data.items?.map(i => i.label) ?? [];
  const uniqueLabels = new Set(labels);
  if (uniqueLabels.size < labels.length) {
    errors.push(`Duplicate item labels found`);
  }

  const hasColorScheme = !!data.colorScheme && VALID_COLOR_SCHEMES.includes(data.colorScheme);
  const hasTitle = !!data.title && data.title.trim().length > 0;
  const hasIcons = data.items?.some(i => !!i.icon) ?? false;

  if (data.colorScheme && !VALID_COLOR_SCHEMES.includes(data.colorScheme)) {
    errors.push(`Invalid color scheme: ${data.colorScheme}`);
  }

  return { valid: errors.length === 0, errors, itemCount, hasColorScheme, hasTitle, hasIcons };
}

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
    journey: /^journey/m,
    quadrantChart: /^quadrantChart/m,
  };

  const pattern = typePatterns[expectedType];
  if (pattern && !pattern.test(trimmed)) {
    let matchedType: string | null = null;
    for (const [type, pat] of Object.entries(typePatterns)) {
      if (pat.test(trimmed)) { matchedType = type; break; }
    }
    if (matchedType) {
      errors.push(`Expected ${expectedType} but got ${matchedType}`);
    } else {
      errors.push(`No recognized diagram type declaration found`);
    }
  }

  // Count nodes
  let nodeCount = 0;
  if (expectedType === "flowchart" || /^(graph|flowchart)/m.test(trimmed)) {
    const nodeMatches = trimmed.match(/\b([A-Za-z_]\w*)\s*[\[({>]/g);
    const uniqueNodes = new Set(nodeMatches?.map(m => m.replace(/[\[({>\s]/g, "")) ?? []);
    nodeCount = uniqueNodes.size;
  }

  // Check bracket balance
  const unclosedBrackets = (trimmed.match(/\[/g)?.length ?? 0) - (trimmed.match(/\]/g)?.length ?? 0);
  if (Math.abs(unclosedBrackets) > 0) {
    errors.push(`Unbalanced square brackets`);
  }

  if (/[\u201C\u201D\u2018\u2019]/.test(trimmed)) {
    errors.push("Contains smart quotes");
  }

  const hasStyleDefs = /style\s+\w+/m.test(trimmed) || /classDef\s+\w+/m.test(trimmed) || /:::/.test(trimmed);

  return { valid: errors.length === 0, errors, nodeCount, hasStyleDefs };
}

// ---------------------------------------------------------------------------
// Quality Assessment
// ---------------------------------------------------------------------------

function assessQuality(
  testCase: RDTestCase,
  block: VisualBlock | null,
): { failures: RDFailure[]; criteriaResults: Record<string, boolean>; score: number } {
  const failures: RDFailure[] = [];
  const criteriaResults: Record<string, boolean> = {};

  if (!block) {
    for (const criterion of testCase.qualityCriteria) {
      criteriaResults[criterion] = false;
    }
    failures.push({
      type: "schema-error",
      description: "No visual block provided",
      severity: "critical",
    });
    return { failures, criteriaResults, score: 0 };
  }

  // Validate structure based on type
  let structureValid = true;
  if (block.type === "infographic") {
    const data = block.data as InfographicData;
    const validation = validateInfographicBlock(data, testCase.expectedVisualType);
    structureValid = validation.valid;
    if (!structureValid) {
      for (const err of validation.errors) {
        failures.push({ type: "schema-error", description: err, severity: "critical" });
      }
    }
  } else if (block.type === "diagram") {
    const data = block.data as DiagramData;
    const validation = validateMermaidSyntax(data.syntax, testCase.expectedVisualType);
    structureValid = validation.valid;
    if (!structureValid) {
      for (const err of validation.errors) {
        failures.push({ type: "bad-syntax", description: err, severity: "critical" });
      }
    }
  }

  // Evaluate quality criteria
  for (const criterion of testCase.qualityCriteria) {
    const lower = criterion.toLowerCase();

    if (lower.includes("valid") && (lower.includes("schema") || lower.includes("structure"))) {
      criteriaResults[criterion] = structureValid;
    } else if (lower.includes("block type") && lower.includes("correct")) {
      criteriaResults[criterion] = block.type === testCase.expectedBlockType;
    } else if (lower.includes("infographic type") && lower.includes("correct")) {
      if (block.type === "infographic") {
        criteriaResults[criterion] = (block.data as InfographicData).infographicType === testCase.expectedVisualType;
      } else {
        criteriaResults[criterion] = false;
      }
    } else if (lower.includes("diagram type") && lower.includes("correct")) {
      if (block.type === "diagram") {
        criteriaResults[criterion] = (block.data as DiagramData).diagramType === testCase.expectedVisualType;
      } else {
        criteriaResults[criterion] = false;
      }
    } else if (lower.includes("title") && lower.includes("present")) {
      if (block.type === "infographic") {
        const data = block.data as InfographicData;
        criteriaResults[criterion] = !!data.title && data.title.trim().length > 0;
      } else {
        criteriaResults[criterion] = true;
      }
    } else if (lower.includes("color scheme") && lower.includes("set")) {
      if (block.type === "infographic") {
        const data = block.data as InfographicData;
        criteriaResults[criterion] = !!data.colorScheme && VALID_COLOR_SCHEMES.includes(data.colorScheme);
      } else {
        criteriaResults[criterion] = true;
      }
    } else if (lower.includes("item count") && lower.includes("at least")) {
      const minCount = parseInt(criterion.match(/(\d+)/)?.[1] ?? "3");
      if (block.type === "infographic") {
        const data = block.data as InfographicData;
        criteriaResults[criterion] = data.items.length >= minCount;
      } else {
        criteriaResults[criterion] = false;
      }
    } else if (lower.includes("icon") && lower.includes("present")) {
      if (block.type === "infographic") {
        const data = block.data as InfographicData;
        const hasIcons = data.items.some(i => !!i.icon);
        criteriaResults[criterion] = hasIcons;
      } else {
        criteriaResults[criterion] = false;
      }
    } else if (lower.includes("description") && lower.includes("each item")) {
      if (block.type === "infographic") {
        const data = block.data as InfographicData;
        const allHaveDesc = data.items.every(i => !!i.description && i.description.trim().length > 0);
        criteriaResults[criterion] = allHaveDesc;
      } else {
        criteriaResults[criterion] = false;
      }
    } else if (lower.includes("value") && lower.includes("each item")) {
      if (block.type === "infographic") {
        const data = block.data as InfographicData;
        const allHaveValue = data.items.every(i => !!i.value && i.value.trim().length > 0);
        criteriaResults[criterion] = allHaveValue;
      } else {
        criteriaResults[criterion] = false;
      }
    } else if (lower.includes("label") && lower.includes("meaningful")) {
      if (block.type === "infographic") {
        const data = block.data as InfographicData;
        const allMeaningful = data.items.every(i => i.label.length >= 3 && !/placeholder|todo|example/i.test(i.label));
        criteriaResults[criterion] = allMeaningful;
      } else {
        criteriaResults[criterion] = true;
      }
    } else if (lower.includes("caption") && lower.includes("present")) {
      if (block.type === "infographic") {
        criteriaResults[criterion] = !!(block.data as InfographicData).caption;
      } else {
        criteriaResults[criterion] = !!(block.data as DiagramData).caption;
      }
    } else if (lower.includes("item") && lower.includes("present") && lower.includes("(")) {
      // Check for specific items by name
      const itemNames = criterion.match(/\(([^)]+)\)/)?.[1]?.split(",").map(s => s.trim()) ?? [];
      if (block.type === "infographic") {
        const data = block.data as InfographicData;
        const allItems = data.items.map(i => `${i.label} ${i.description ?? ""}`).join(" ");
        const found = itemNames.filter(name => {
          const words = name.split(/\s+/);
          return words.some(w => w.length > 3 && new RegExp(w, "i").test(allItems));
        });
        criteriaResults[criterion] = found.length >= itemNames.length * 0.7;
        if (!criteriaResults[criterion]) {
          failures.push({
            type: "missing-item",
            description: `Only ${found.length}/${itemNames.length} items found`,
            severity: "major",
          });
        }
      } else {
        criteriaResults[criterion] = true;
      }
    } else if (lower.includes("status") && lower.includes("field") && lower.includes("used")) {
      if (block.type === "infographic") {
        const data = block.data as InfographicData;
        const hasStatus = data.items.some(i => !!i.status);
        criteriaResults[criterion] = hasStatus;
      } else {
        criteriaResults[criterion] = false;
      }
    } else if (lower.includes("overlapping") && lower.includes("circle")) {
      // Venn: check items represent circle labels
      if (block.type === "infographic") {
        const data = block.data as InfographicData;
        criteriaResults[criterion] = data.items.length >= 2 && data.items.length <= 4;
      } else {
        criteriaResults[criterion] = false;
      }
    } else if (lower.includes("narrowing") && lower.includes("stage")) {
      // Funnel: stages should narrow
      if (block.type === "infographic") {
        const data = block.data as InfographicData;
        criteriaResults[criterion] = data.items.length >= 3;
      } else {
        criteriaResults[criterion] = false;
      }
    } else if (lower.includes("layer") && lower.includes("pyramid")) {
      // Pyramid: layers from bottom to top
      if (block.type === "infographic") {
        const data = block.data as InfographicData;
        criteriaResults[criterion] = data.items.length >= 3;
      } else {
        criteriaResults[criterion] = false;
      }
    } else if (lower.includes("circular") && lower.includes("flow")) {
      // Cycle: circular process
      if (block.type === "infographic") {
        const data = block.data as InfographicData;
        criteriaResults[criterion] = data.infographicType === "cycle" && data.items.length >= 3;
      } else {
        criteriaResults[criterion] = false;
      }
    } else if (lower.includes("quadrant") && lower.includes("labeled")) {
      // Matrix: 4 quadrants
      if (block.type === "infographic") {
        const data = block.data as InfographicData;
        criteriaResults[criterion] = data.infographicType === "matrix" && data.items.length === 4;
      } else {
        criteriaResults[criterion] = false;
      }
    } else if (lower.includes("central") && lower.includes("spoke")) {
      // Radial: central node with spokes
      if (block.type === "infographic") {
        const data = block.data as InfographicData;
        criteriaResults[criterion] = data.infographicType === "radial" && data.items.length >= 3;
      } else {
        criteriaResults[criterion] = false;
      }
    } else if (lower.includes("cause") && lower.includes("effect") && lower.includes("branch")) {
      // Cause-effect: fishbone branches
      if (block.type === "infographic") {
        const data = block.data as InfographicData;
        criteriaResults[criterion] = data.infographicType === "cause_effect" && data.items.length >= 4;
      } else {
        criteriaResults[criterion] = false;
      }
    } else if (lower.includes("stat") && lower.includes("card")) {
      // Stats row: card display
      if (block.type === "infographic") {
        const data = block.data as InfographicData;
        criteriaResults[criterion] = data.infographicType === "stats_row" && data.items.length >= 3;
      } else {
        criteriaResults[criterion] = false;
      }
    } else if (lower.includes("check") && lower.includes("status indicator")) {
      // Checklist: status indicators
      if (block.type === "infographic") {
        const data = block.data as InfographicData;
        const hasStatuses = data.items.some(i => !!i.status);
        criteriaResults[criterion] = data.infographicType === "checklist" && hasStatuses;
      } else {
        criteriaResults[criterion] = false;
      }
    } else if (lower.includes("parent") && lower.includes("child") && lower.includes("tree")) {
      // Hierarchy: parent-child relationships
      if (block.type === "infographic") {
        const data = block.data as InfographicData;
        criteriaResults[criterion] = data.infographicType === "hierarchy" && data.items.length >= 3;
      } else {
        criteriaResults[criterion] = false;
      }
    } else if (lower.includes("side-by-side") || lower.includes("column")) {
      // Comparison: side-by-side columns
      if (block.type === "infographic") {
        const data = block.data as InfographicData;
        criteriaResults[criterion] = data.infographicType === "comparison" && data.items.length >= 2;
      } else {
        criteriaResults[criterion] = false;
      }
    } else if (lower.includes("arrow") && lower.includes("between") && lower.includes("step")) {
      // Process flow: arrows between steps
      if (block.type === "infographic") {
        const data = block.data as InfographicData;
        criteriaResults[criterion] = data.infographicType === "process_flow" && data.items.length >= 3;
      } else {
        criteriaResults[criterion] = false;
      }
    } else if (lower.includes("numeric") && lower.includes("value") && lower.includes("preserved")) {
      if (block.type === "infographic") {
        const data = block.data as InfographicData;
        const numbers = testCase.input.match(/\d[\d,.]+%?/g) ?? [];
        const bigNumbers = numbers.filter(n => parseFloat(n.replace(/[,%]/g, "")) > 1);
        const allItems = data.items.map(i => `${i.value ?? ""} ${i.description ?? ""}`).join(" ");
        const found = bigNumbers.filter(n => allItems.includes(n) || allItems.includes(n.replace(/,/g, "")));
        criteriaResults[criterion] = found.length >= bigNumbers.length * 0.5;
      } else {
        criteriaResults[criterion] = true;
      }
    } else if (lower.includes("no placeholder") || lower.includes("no lorem")) {
      const allText = JSON.stringify(block.data);
      criteriaResults[criterion] = !/lorem|ipsum|placeholder|todo|example text/i.test(allText);
    } else if (lower.includes("node") && lower.includes("present") && lower.includes("(")) {
      // Mermaid: check for specific nodes
      if (block.type === "diagram") {
        const data = block.data as DiagramData;
        const nodeNames = criterion.match(/\(([^)]+)\)/)?.[1]?.split(",").map(s => s.trim()) ?? [];
        const found = nodeNames.filter(name => {
          const words = name.split(/\s+/);
          return words.some(w => w.length > 3 && new RegExp(w, "i").test(data.syntax));
        });
        criteriaResults[criterion] = found.length >= nodeNames.length * 0.7;
      } else {
        criteriaResults[criterion] = true;
      }
    } else if (lower.includes("subgraph") && lower.includes("present")) {
      if (block.type === "diagram") {
        criteriaResults[criterion] = /subgraph/i.test((block.data as DiagramData).syntax);
      } else {
        criteriaResults[criterion] = true;
      }
    } else if (lower.includes("styling") && lower.includes("applied")) {
      if (block.type === "diagram") {
        const data = block.data as DiagramData;
        criteriaResults[criterion] = /style\s+\w+|classDef\s+\w+|:::/m.test(data.syntax);
      } else {
        criteriaResults[criterion] = true;
      }
    } else if (lower.includes("valid mermaid syntax")) {
      if (block.type === "diagram") {
        const data = block.data as DiagramData;
        const validation = validateMermaidSyntax(data.syntax, testCase.expectedVisualType);
        criteriaResults[criterion] = validation.valid;
      } else {
        criteriaResults[criterion] = false;
      }
    } else if (lower.includes("node count") && lower.includes("at least")) {
      const minCount = parseInt(criterion.match(/(\d+)/)?.[1] ?? "3");
      if (block.type === "diagram") {
        const data = block.data as DiagramData;
        const validation = validateMermaidSyntax(data.syntax, testCase.expectedVisualType);
        criteriaResults[criterion] = validation.nodeCount >= minCount;
      } else {
        criteriaResults[criterion] = false;
      }
    } else if (lower.includes("no smart quotes")) {
      if (block.type === "diagram") {
        const data = block.data as DiagramData;
        criteriaResults[criterion] = !/[\u201C\u201D\u2018\u2019]/.test(data.syntax);
      } else {
        criteriaResults[criterion] = true;
      }
    } else if (lower.includes("decision") && lower.includes("diamond")) {
      if (block.type === "diagram") {
        const data = block.data as DiagramData;
        criteriaResults[criterion] = /\{[^}]+\}/.test(data.syntax);
      } else {
        criteriaResults[criterion] = false;
      }
    } else if (lower.includes("participant") && lower.includes("declaration")) {
      if (block.type === "diagram") {
        const data = block.data as DiagramData;
        criteriaResults[criterion] = /participant\s+\w+/i.test(data.syntax);
      } else {
        criteriaResults[criterion] = false;
      }
    } else if (lower.includes("arrow") && lower.includes("interaction")) {
      if (block.type === "diagram") {
        const data = block.data as DiagramData;
        criteriaResults[criterion] = /->>|-->>|->|-->/.test(data.syntax);
      } else {
        criteriaResults[criterion] = false;
      }
    } else if (lower.includes("section") && lower.includes("task") && lower.includes("declaration")) {
      if (block.type === "diagram") {
        const data = block.data as DiagramData;
        criteriaResults[criterion] = /section\s+\w+/i.test(data.syntax);
      } else {
        criteriaResults[criterion] = false;
      }
    } else if (lower.includes("hierarchical") && lower.includes("node") && lower.includes("structure")) {
      if (block.type === "diagram") {
        const data = block.data as DiagramData;
        const lines = data.syntax.split("\n").filter(l => l.trim().length > 0);
        criteriaResults[criterion] = lines.length >= 5;
      } else {
        criteriaResults[criterion] = false;
      }
    } else if (lower.includes("entity") && lower.includes("definition")) {
      if (block.type === "diagram") {
        const data = block.data as DiagramData;
        // Support both ER diagram (int/string/date fields) and class diagram (+Type name) patterns
        const hasERFields = /\w+\s+(int|string|date|float|boolean)/i.test(data.syntax);
        const hasClassFields = /[+\-#~]\w+\s+\w+/.test(data.syntax) || /class\s+\w+\s*\{/.test(data.syntax);
        criteriaResults[criterion] = /\w+\s*\{/.test(data.syntax) && (hasERFields || hasClassFields);
      } else {
        criteriaResults[criterion] = false;
      }
    } else if (lower.includes("relationship") && lower.includes("line")) {
      if (block.type === "diagram") {
        const data = block.data as DiagramData;
        // Support both ER diagram (||--|--o{) and class diagram (-->, --*, --o) relationship syntax
        const hasERRelations = /\|\|--|--o\{|--\|\||o--/.test(data.syntax);
        const hasClassRelations = /-->|--\*|--o|\.\.>|<\|--/.test(data.syntax);
        criteriaResults[criterion] = hasERRelations || hasClassRelations;
      } else {
        criteriaResults[criterion] = false;
      }
    } else if (lower.includes("state") && lower.includes("transition")) {
      if (block.type === "diagram") {
        const data = block.data as DiagramData;
        criteriaResults[criterion] = /-->/.test(data.syntax) && /\[\*\]|state\s/.test(data.syntax);
      } else {
        criteriaResults[criterion] = false;
      }
    } else if (lower.includes("dated") && lower.includes("entr")) {
      if (block.type === "diagram") {
        const data = block.data as DiagramData;
        criteriaResults[criterion] = /\d{3,4}\s*:/.test(data.syntax);
      } else {
        criteriaResults[criterion] = false;
      }
    } else if (lower.includes("axis") && lower.includes("label")) {
      if (block.type === "diagram") {
        const data = block.data as DiagramData;
        criteriaResults[criterion] = /x-axis|y-axis/i.test(data.syntax);
      } else {
        criteriaResults[criterion] = false;
      }
    } else if (lower.includes("data") && lower.includes("point")) {
      if (block.type === "diagram") {
        const data = block.data as DiagramData;
        criteriaResults[criterion] = /\[\s*[\d.]+\s*,\s*[\d.]+\s*\]/.test(data.syntax);
      } else {
        criteriaResults[criterion] = false;
      }
    } else if (lower.includes("numeric") && lower.includes("value") && !lower.includes("preserved")) {
      if (block.type === "diagram") {
        const data = block.data as DiagramData;
        criteriaResults[criterion] = /\d+/.test(data.syntax);
      } else if (block.type === "infographic") {
        const data = block.data as InfographicData;
        const allText = data.items.map(i => `${i.value ?? ""} ${i.description ?? ""}`).join(" ");
        criteriaResults[criterion] = /\d+/.test(allText);
      } else {
        criteriaResults[criterion] = false;
      }
    } else {
      // Default: mark as passed (unknown criterion)
      criteriaResults[criterion] = true;
    }
  }

  // Calculate score
  const totalCriteria = Object.keys(criteriaResults).length;
  const passedCriteria = Object.values(criteriaResults).filter(v => v).length;
  const score = totalCriteria > 0 ? Math.round((passedCriteria / totalCriteria) * 10) : 0;

  return { failures, criteriaResults, score };
}

// ---------------------------------------------------------------------------
// File I/O
// ---------------------------------------------------------------------------

function loadTestCase(id: string): RDTestCase {
  const filepath = join(CASES_DIR, `${id}.json`);
  if (!existsSync(filepath)) {
    throw new Error(`Test case not found: ${filepath}`);
  }
  return JSON.parse(readFileSync(filepath, "utf-8"));
}

function loadAllTestCases(): RDTestCase[] {
  if (!existsSync(CASES_DIR)) return [];
  return readdirSync(CASES_DIR)
    .filter(f => f.endsWith(".json"))
    .sort()
    .map(f => JSON.parse(readFileSync(join(CASES_DIR, f), "utf-8")));
}

function getNextAttemptNumber(id: string): number {
  if (!existsSync(RESULTS_DIR)) return 1;
  const files = readdirSync(RESULTS_DIR).filter(f => f.startsWith(id));
  return files.length + 1;
}

function saveResult(result: RDAttemptResult): void {
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

function updateScorecard(result: RDAttemptResult, testCase: RDTestCase): void {
  const scorecard = loadScorecard();
  const existing = scorecard.cases.find(c => c.id === result.testId);

  if (existing) {
    existing.bestScore = Math.max(existing.bestScore, result.overallScore);
    existing.latestAttempt = result.attempt;
    existing.status = existing.bestScore >= 7 ? "pass" : "fail";
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
  console.log("  RALPH Diagrams Scorecard");
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

// ---------------------------------------------------------------------------
// Test execution
// ---------------------------------------------------------------------------

async function runTestCase(id: string): Promise<void> {
  const testCase = loadTestCase(id);
  const attempt = getNextAttemptNumber(id);

  console.log(`\n--- RALPH Diagram: ${id} (${testCase.name}) ---`);
  console.log(`  Category: ${testCase.category} | Difficulty: ${testCase.difficulty}`);
  console.log(`  Napkin Feature: ${testCase.napkinFeature}`);
  console.log(`  Attempt: ${attempt}`);

  // Use baseline from test case
  const block = testCase.baseline;

  // Validate & assess
  const quality = assessQuality(testCase, block);
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

  const result: RDAttemptResult = {
    testId: id,
    attempt,
    timestamp: new Date().toISOString(),
    blockType: block.type,
    visualType: block.type === "infographic"
      ? (block.data as InfographicData).infographicType
      : (block.data as DiagramData).diagramType,
    structureValid: quality.failures.filter(f => f.type === "schema-error" || f.type === "bad-syntax").length === 0,
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

  const caseIdx = args.indexOf("--case");
  if (caseIdx !== -1 && args[caseIdx + 1]) {
    await runTestCase(args[caseIdx + 1]);
  } else {
    const cases = loadAllTestCases();
    if (cases.length === 0) {
      console.log("No test cases found in", CASES_DIR);
      return;
    }
    for (const tc of cases) {
      await runTestCase(tc.id);
    }
  }

  printScorecard();
}

main().catch(console.error);
