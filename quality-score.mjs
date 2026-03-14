#!/usr/bin/env node

/**
 * quality-score.mjs — ScholarSync Self-Annealing Quality Metric
 *
 * Measures 18 dimensions across 5 phases.
 * Wired to qa/queue.jsonl as the primary source of truth for spec-driven testing.
 * Run: node quality-score.mjs
 * Run specific phase: node quality-score.mjs --phase 2
 */

import { execSync } from 'child_process';
import { existsSync, readFileSync, writeFileSync, readdirSync } from 'fs';

// ─── Configuration ───────────────────────────────────────────────────────────

const DIMENSIONS = {
  // Phase 1: Foundation (25%)
  typescriptStrict:      { weight: 0.08, phase: 1, label: 'TypeScript Strict' },
  lintClean:             { weight: 0.05, phase: 1, label: 'Lint Cleanliness' },
  errorBoundaries:       { weight: 0.05, phase: 1, label: 'Error Boundaries' },
  apiHardening:          { weight: 0.07, phase: 1, label: 'API Route Hardening' },

  // Phase 2: Spec-Driven Testing (40%)
  specPassRate:          { weight: 0.12, phase: 2, label: 'Spec Pass Rate' },
  checkpointPassRate:    { weight: 0.10, phase: 2, label: 'Checkpoint Pass Rate' },
  moduleCoverage:        { weight: 0.08, phase: 2, label: 'Module Coverage' },
  assertionModuleCoverage: { weight: 0.05, phase: 2, label: 'Assertion Module Coverage' },
  unitPassRate:          { weight: 0.05, phase: 2, label: 'Unit Pass Rate' },

  // Phase 3: Resilience (15%)
  networkResilience:     { weight: 0.05, phase: 3, label: 'Network Resilience' },
  emptyStates:           { weight: 0.03, phase: 3, label: 'Empty/Boundary States' },
  errorMessages:         { weight: 0.03, phase: 3, label: 'Error Message Quality' },
  stateConsistency:      { weight: 0.04, phase: 3, label: 'State Consistency' },

  // Phase 4: Security (15%)
  authSecurity:          { weight: 0.06, phase: 4, label: 'Auth Security' },
  inputValidation:       { weight: 0.05, phase: 4, label: 'Input Validation' },
  depSecurity:           { weight: 0.04, phase: 4, label: 'Dependency Security' },

  // Phase 5: Polish (5%)
  accessibility:         { weight: 0.05, phase: 5, label: 'Accessibility' },
};

const SRC = 'src';
const QUEUE_PATH = 'qa/queue.jsonl';
const MODULE_ASSERTIONS_DIR = 'qa/module-assertions';

// ─── Helpers ─────────────────────────────────────────────────────────────────

function run(cmd) {
  try {
    return execSync(cmd, { encoding: 'utf-8', timeout: 120_000, stdio: ['pipe', 'pipe', 'pipe'] }).trim();
  } catch (e) { return e.stdout?.trim?.() || e.stderr?.trim?.() || ''; }
}

function clamp(v) { return Math.max(0, Math.min(100, Math.round(v * 100) / 100)); }

function _countFiles(pattern) {
  const out = run(`find ${SRC}/ -name "${pattern}" 2>/dev/null | wc -l`);
  return parseInt(out) || 0;
}

function countMatches(grepPattern, filePattern) {
  const out = run(`grep -rn "${grepPattern}" --include="${filePattern}" ${SRC}/ 2>/dev/null | wc -l`);
  return parseInt(out) || 0;
}

/** Load and parse qa/queue.jsonl into an array of objects */
function loadQueue() {
  if (!existsSync(QUEUE_PATH)) return [];
  const lines = readFileSync(QUEUE_PATH, 'utf-8').split('\n').filter(Boolean);
  const entries = [];
  for (const line of lines) {
    try { entries.push(JSON.parse(line)); } catch {}
  }
  return entries;
}

// ─── Scorers: Phase 1 — Foundation ──────────────────────────────────────────

function scoreTypescriptStrict() {
  const d = { errors: 0, anyCount: 0, strictEnabled: false };
  try {
    const ts = JSON.parse(readFileSync('tsconfig.json', 'utf-8'));
    d.strictEnabled = ts.compilerOptions?.strict === true;
  } catch {}

  const out = run('npx tsc --noEmit --strict 2>&1');
  d.errors = (out.match(/error TS/g) || []).length;
  d.anyCount = countMatches(': any\\|as any', '*.ts') + countMatches(': any\\|as any', '*.tsx');

  let score = 100 - (d.errors * 2) - (d.anyCount * 1);
  if (!d.strictEnabled) score = Math.min(score, 50);
  return { score: clamp(score), details: d };
}

function scoreLintClean() {
  const d = { errors: 0, warnings: 0 };
  const out = run('npx eslint . --ext .ts,.tsx --format json 2>/dev/null || echo "[]"');
  try {
    const r = JSON.parse(out);
    d.errors = r.reduce((s, x) => s + x.errorCount, 0);
    d.warnings = r.reduce((s, x) => s + x.warningCount, 0);
  } catch {}
  return { score: clamp(100 - d.errors * 3 - d.warnings * 0.5), details: d };
}

function scoreErrorBoundaries() {
  const pages = run(`find ${SRC}/app -name "page.tsx" -exec dirname {} \\; 2>/dev/null | sort -u`);
  const errors = run(`find ${SRC}/app -name "error.tsx" -exec dirname {} \\; 2>/dev/null | sort -u`);
  const loadings = run(`find ${SRC}/app -name "loading.tsx" -exec dirname {} \\; 2>/dev/null | sort -u`);

  const pageCount = pages ? pages.split('\n').filter(Boolean).length : 0;
  const errorCount = errors ? errors.split('\n').filter(Boolean).length : 0;
  const loadingCount = loadings ? loadings.split('\n').filter(Boolean).length : 0;

  if (pageCount === 0) return { score: 100, details: { note: 'No pages found' } };

  const errorCoverage = (errorCount / pageCount) * 100;
  const loadingCoverage = (loadingCount / pageCount) * 100;
  const score = (errorCoverage * 0.7) + (loadingCoverage * 0.3);

  return { score: clamp(score), details: { pageCount, errorCount, loadingCount } };
}

function scoreApiHardening() {
  const routes = run(`find ${SRC}/app/api -name "route.ts" 2>/dev/null || true`);
  if (!routes) return { score: 100, details: { note: 'No API routes' } };

  const files = routes.split('\n').filter(Boolean);
  let total = files.length;
  let d = { total, withTryCatch: 0, withValidation: 0, withAuth: 0, withProperStatus: 0 };

  for (const f of files) {
    const c = readFileSync(f, 'utf-8');
    if (c.includes('try') && c.includes('catch')) d.withTryCatch++;
    if (/parse|validate|schema|safeParse|zod/.test(c)) d.withValidation++;
    if (/auth|session|getServerSession|getToken|middleware/.test(c)) d.withAuth++;
    if (/status\(4[0-9]{2}\)|status: 4[0-9]{2}|NextResponse.*4[0-9]{2}/.test(c)) d.withProperStatus++;
  }

  const score = ((d.withTryCatch / total) * 30) +
                ((d.withValidation / total) * 30) +
                ((d.withAuth / total) * 20) +
                ((d.withProperStatus / total) * 20);
  return { score: clamp(score), details: d };
}

// ─── Scorers: Phase 2 — Spec-Driven Testing ────────────────────────────────

function scoreSpecPassRate() {
  const queue = loadQueue();
  const d = { totalSpecs: queue.length, passingSpecs: 0 };

  for (const entry of queue) {
    if (entry.status === 'pass1_done' || entry.status === 'pass2_done') {
      d.passingSpecs++;
    }
  }

  if (d.totalSpecs === 0) return { score: 0, details: { ...d, note: 'No specs in queue' } };
  return { score: clamp((d.passingSpecs / d.totalSpecs) * 100), details: d };
}

function scoreCheckpointPassRate() {
  const queue = loadQueue();
  const d = { totalCheckpoints: 0, passingCheckpoints: 0 };

  for (const entry of queue) {
    d.totalCheckpoints += entry.checkpoints || 0;
    if (entry.pass1_result) {
      d.passingCheckpoints += entry.pass1_result.pass || 0;
    }
  }

  if (d.totalCheckpoints === 0) return { score: 0, details: { ...d, note: 'No checkpoints in queue' } };
  return { score: clamp((d.passingCheckpoints / d.totalCheckpoints) * 100), details: d };
}

function scoreModuleCoverage() {
  const queue = loadQueue();
  const allModules = new Set();
  const passingModules = new Set();

  for (const entry of queue) {
    allModules.add(entry.module);
    if (entry.status === 'pass1_done' || entry.status === 'pass2_done') {
      passingModules.add(entry.module);
    }
  }

  const d = { totalModules: allModules.size, coveredModules: passingModules.size, modules: [...allModules] };

  if (allModules.size === 0) return { score: 0, details: { ...d, note: 'No modules in queue' } };
  return { score: clamp((passingModules.size / allModules.size) * 100), details: d };
}

function scoreAssertionModuleCoverage() {
  const queue = loadQueue();
  const allModules = new Set();
  for (const entry of queue) {
    allModules.add(entry.module);
  }

  const expectedAssertionFiles = new Set([...allModules].map((module) => `${module}.ts`));
  let assertionFiles = 0;
  let coveredAssertionFiles = 0;
  if (existsSync(MODULE_ASSERTIONS_DIR)) {
    try {
      const files = readdirSync(MODULE_ASSERTIONS_DIR).filter(f => f.endsWith('.ts') || f.endsWith('.js'));
      assertionFiles = files.length;
      coveredAssertionFiles = files.filter((f) => expectedAssertionFiles.has(f)).length;
    } catch {}
  }

  const d = { totalModules: allModules.size, assertionFiles, coveredAssertionFiles };

  if (allModules.size === 0) return { score: 0, details: { ...d, note: 'No modules in queue' } };
  return { score: clamp((coveredAssertionFiles / allModules.size) * 100), details: d };
}

function scoreUnitPassRate() {
  const d = { passed: 0, failed: 0, total: 0 };
  const out = run('npx vitest run --reporter=json 2>/dev/null || true');
  try {
    const data = JSON.parse(out);
    d.passed = data.numPassedTests || 0;
    d.failed = data.numFailedTests || 0;
    d.total = data.numTotalTests || 0;
  } catch {}
  if (d.total === 0) return { score: 0, details: { ...d, note: 'No tests' } };
  return { score: clamp((d.passed / d.total) * 100), details: d };
}

// ─── Scorers: Phase 3 — Resilience ──────────────────────────────────────────

function scoreNetworkResilience() {
  const d = { retryLogic: 0, timeoutHandling: 0, offlineHandling: 0, errorStates: 0, resilienceTests: 0 };

  d.retryLogic = countMatches('retry\\|retries\\|backoff', '*.ts') + countMatches('retry\\|retries\\|backoff', '*.tsx');
  d.timeoutHandling = countMatches('timeout\\|AbortController\\|signal', '*.ts');
  d.offlineHandling = countMatches('offline\\|navigator.onLine\\|online', '*.tsx');
  d.errorStates = countMatches('isError\\|error &&\\|error ?', '*.tsx');
  d.resilienceTests = parseInt(run('find . -path "*resilience*" -name "*.spec.*" 2>/dev/null | wc -l')) || 0;

  let score = 0;
  if (d.retryLogic > 0) score += 20;
  if (d.timeoutHandling > 0) score += 20;
  if (d.offlineHandling > 0) score += 15;
  if (d.errorStates > 3) score += 25;
  if (d.resilienceTests > 0) score += 20;

  return { score: clamp(score), details: d };
}

function scoreEmptyStates() {
  const d = { emptyStateComponents: 0, dataDisplayComponents: 0 };
  d.emptyStateComponents = countMatches('empty\\|no data\\|no results\\|nothing here\\|get started', '*.tsx');
  d.dataDisplayComponents = countMatches('map(\\|\.map\\|forEach\\|\.length', '*.tsx');

  const ratio = d.dataDisplayComponents > 0 ? d.emptyStateComponents / d.dataDisplayComponents : 0;
  return { score: clamp(ratio * 300), details: d };
}

function scoreErrorMessages() {
  const d = { genericErrors: 0, specificErrors: 0, recoverableErrors: 0 };

  d.genericErrors = countMatches('Something went wrong\\|An error occurred\\|Error!', '*.tsx');
  d.specificErrors = countMatches('could not\\|unable to\\|failed to\\|please try', '*.tsx');
  d.recoverableErrors = countMatches('try again\\|retry\\|reload\\|go back', '*.tsx');

  const total = d.genericErrors + d.specificErrors;
  if (total === 0) return { score: 30, details: { ...d, note: 'Few error messages found' } };

  let score = (d.specificErrors / total) * 60 + (d.recoverableErrors > 0 ? 40 : 0);
  return { score: clamp(score), details: d };
}

function scoreStateConsistency() {
  const d = { urlState: 0, loadingStates: 0, optimisticUpdates: 0 };

  d.urlState = countMatches('useSearchParams\\|useRouter\\|usePathname', '*.tsx');
  d.loadingStates = countMatches('isLoading\\|isPending\\|loading', '*.tsx');
  d.optimisticUpdates = countMatches('optimistic\\|useOptimistic', '*.tsx');

  let score = 0;
  if (d.urlState > 0) score += 40;
  if (d.loadingStates > 3) score += 40;
  if (d.optimisticUpdates > 0) score += 20;

  return { score: clamp(score), details: d };
}

// ─── Scorers: Phase 4 — Security ────────────────────────────────────────────

function scoreAuthSecurity() {
  const d = { protectedRoutes: 0, withMiddleware: false, withCsrf: false, properCookies: false };

  d.withMiddleware = existsSync(`${SRC}/middleware.ts`) || existsSync('middleware.ts');
  d.withCsrf = countMatches('csrf\\|CSRF', '*.ts') > 0;

  const routes = run(`find ${SRC}/app/api -name "route.ts" 2>/dev/null || true`);
  if (routes) {
    const files = routes.split('\n').filter(Boolean);
    for (const f of files) {
      const c = readFileSync(f, 'utf-8');
      if (/getServerSession|getToken|auth\(|middleware|verify/.test(c)) d.protectedRoutes++;
    }
  }

  let score = 0;
  if (d.withMiddleware) score += 40;
  if (d.protectedRoutes > 0) score += 40;
  if (d.withCsrf) score += 20;

  return { score: clamp(score), details: d };
}

function scoreInputValidation() {
  const d = { zodUsage: 0, manualValidation: 0, rawBodyUsage: 0 };

  d.zodUsage = countMatches('z\\.\\|zod\\|safeParse\\|schema', '*.ts');
  d.manualValidation = countMatches('validate\\|isValid\\|validator', '*.ts');
  d.rawBodyUsage = countMatches('req\\.body\\|request\\.json()', '*.ts');

  const validated = d.zodUsage + d.manualValidation;
  if (d.rawBodyUsage === 0 && validated === 0) return { score: 50, details: d };

  const ratio = d.rawBodyUsage > 0 ? validated / (validated + d.rawBodyUsage) : 1;
  return { score: clamp(ratio * 100), details: d };
}

function scoreDepSecurity() {
  const d = { critical: 0, high: 0, moderate: 0, low: 0 };
  const out = run('npm audit --json 2>/dev/null || echo "{}"');
  try {
    const v = JSON.parse(out).metadata?.vulnerabilities || {};
    Object.assign(d, { critical: v.critical || 0, high: v.high || 0, moderate: v.moderate || 0, low: v.low || 0 });
  } catch {}
  return { score: clamp(100 - d.critical * 25 - d.high * 15 - d.moderate * 5 - d.low * 1), details: d };
}

// ─── Scorers: Phase 5 — Polish ──────────────────────────────────────────────

function scoreAccessibility() {
  const d = { missingAlt: 0, missingLabels: 0, ariaUsage: 0, jsxA11yPlugin: false, axeTests: 0 };

  d.missingAlt = parseInt(run(`grep -rn "<img\\|<Image" --include="*.tsx" ${SRC}/ 2>/dev/null | grep -vc "alt=" || echo 0`)) || 0;
  d.missingLabels = parseInt(run(`grep -rn "<input\\|<select\\|<textarea" --include="*.tsx" ${SRC}/ 2>/dev/null | grep -vc "aria-label\\|htmlFor\\|Label" || echo 0`)) || 0;
  d.ariaUsage = countMatches('aria-\\|role=', '*.tsx');
  d.axeTests = parseInt(run('grep -r "AxeBuilder\\|axe" --include="*.spec.*" e2e/ 2>/dev/null | wc -l')) || 0;

  try {
    const pkg = JSON.parse(readFileSync('package.json', 'utf-8'));
    d.jsxA11yPlugin = !!(pkg.devDependencies?.['eslint-plugin-jsx-a11y'] || pkg.dependencies?.['eslint-plugin-jsx-a11y']);
  } catch {}

  let score = 100;
  score -= d.missingAlt * 5;
  score -= d.missingLabels * 5;
  if (!d.jsxA11yPlugin) score -= 15;
  if (d.axeTests === 0) score -= 20;
  if (d.ariaUsage < 5) score -= 10;

  return { score: clamp(score), details: d };
}

// ─── Scorer Registry ─────────────────────────────────────────────────────────

const SCORERS = {
  typescriptStrict:        scoreTypescriptStrict,
  lintClean:               scoreLintClean,
  errorBoundaries:         scoreErrorBoundaries,
  apiHardening:            scoreApiHardening,
  specPassRate:            scoreSpecPassRate,
  checkpointPassRate:      scoreCheckpointPassRate,
  moduleCoverage:          scoreModuleCoverage,
  assertionModuleCoverage: scoreAssertionModuleCoverage,
  unitPassRate:            scoreUnitPassRate,
  networkResilience:       scoreNetworkResilience,
  emptyStates:             scoreEmptyStates,
  errorMessages:           scoreErrorMessages,
  stateConsistency:        scoreStateConsistency,
  authSecurity:            scoreAuthSecurity,
  inputValidation:         scoreInputValidation,
  depSecurity:             scoreDepSecurity,
  accessibility:           scoreAccessibility,
};

// ─── Main ────────────────────────────────────────────────────────────────────

const phaseFilter = process.argv.includes('--phase')
  ? parseInt(process.argv[process.argv.indexOf('--phase') + 1])
  : null;

console.log('Running ScholarSync quality score...\n');

const results = {};
for (const [key, scorer] of Object.entries(SCORERS)) {
  if (phaseFilter && DIMENSIONS[key].phase !== phaseFilter) continue;
  process.stdout.write(`  Measuring ${DIMENSIONS[key].label}...`);
  results[key] = scorer();
  console.log(` ${results[key].score}`);
}

// Composite
let composite = 0;
let totalWeight = 0;
for (const [key, { score }] of Object.entries(results)) {
  composite += score * DIMENSIONS[key].weight;
  totalWeight += DIMENSIONS[key].weight;
}
composite = totalWeight > 0 ? Math.round((composite / totalWeight) * 100) / 100 : 0;

// Temperature
let temperature, tempLabel;
if (composite < 40) { temperature = 'HOT'; tempLabel = 'RED'; }
else if (composite < 60) { temperature = 'WARM'; tempLabel = 'ORANGE'; }
else if (composite < 75) { temperature = 'COOL'; tempLabel = 'YELLOW'; }
else if (composite < 90) { temperature = 'COLD'; tempLabel = 'BLUE'; }
else { temperature = 'FROZEN'; tempLabel = 'WHITE'; }

// Current phase
const phaseScores = {};
for (const [key, { score }] of Object.entries(results)) {
  const p = DIMENSIONS[key].phase;
  if (!phaseScores[p]) phaseScores[p] = [];
  phaseScores[p].push(score);
}
const phaseAvgs = {};
for (const [p, scores] of Object.entries(phaseScores)) {
  phaseAvgs[p] = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
}

let currentPhase = 1;
const PHASE_GATES = { 1: 70, 2: 60, 3: 75, 4: 85, 5: 95 };
for (let p = 1; p <= 5; p++) {
  if ((phaseAvgs[p] || 0) >= PHASE_GATES[p]) currentPhase = p + 1;
  else break;
}
currentPhase = Math.min(currentPhase, 5);

const weakest = Object.entries(results)
  .filter(([k]) => DIMENSIONS[k].phase <= currentPhase)
  .sort((a, b) => a[1].score - b[1].score)[0];

// Output
const phaseNames = { 1: 'Foundation', 2: 'Spec-Driven Testing', 3: 'Resilience', 4: 'Security', 5: 'Polish' };

console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log(`  COMPOSITE: ${composite}  |  Phase: ${currentPhase}/5  |  Temp: [${tempLabel}] ${temperature}`);
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

for (let p = 1; p <= 5; p++) {
  const dims = Object.entries(results).filter(([k]) => DIMENSIONS[k].phase === p);
  if (dims.length === 0) continue;

  const marker = p === currentPhase ? ' <- CURRENT PHASE' : '';
  console.log(`  Phase ${p}: ${phaseNames[p]} (avg: ${phaseAvgs[p] || '?'}, gate: ${PHASE_GATES[p]})${marker}`);

  for (const [key, { score }] of dims.sort((a, b) => a[1].score - b[1].score)) {
    const bar = '\u2588'.repeat(Math.floor(score / 5)) + '\u2591'.repeat(20 - Math.floor(score / 5));
    const fix = key === weakest?.[0] ? ' <- FIX NEXT' : '';
    console.log(`    ${DIMENSIONS[key].label.padEnd(26)} ${bar} ${String(score).padStart(6)}${fix}`);
  }
  console.log('');
}

console.log(`  Weakest dimension: ${DIMENSIONS[weakest[0]].label} (${weakest[1].score})`);
console.log(`  Next action: Fix ${DIMENSIONS[weakest[0]].label} in Phase ${DIMENSIONS[weakest[0]].phase}\n`);

// Save
const report = {
  timestamp: new Date().toISOString(),
  composite,
  temperature,
  currentPhase,
  phaseAverages: phaseAvgs,
  weakest: { dimension: weakest[0], label: DIMENSIONS[weakest[0]].label, score: weakest[1].score },
  dimensions: Object.fromEntries(
    Object.entries(results).map(([k, v]) => [k, { ...v, ...DIMENSIONS[k] }])
  ),
};

writeFileSync('quality-score.json', JSON.stringify(report, null, 2));

const logEntry = JSON.stringify({
  timestamp: report.timestamp,
  composite,
  temperature,
  currentPhase,
  phaseAverages: phaseAvgs,
  weakest: report.weakest,
}) + '\n';

const logPath = 'annealing-log.jsonl';
const existing = existsSync(logPath) ? readFileSync(logPath, 'utf-8') : '';
writeFileSync(logPath, existing + logEntry);

console.log('  Saved: quality-score.json + annealing-log.jsonl');
