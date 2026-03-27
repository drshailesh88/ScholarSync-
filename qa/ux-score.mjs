#!/usr/bin/env node

/**
 * ux-score.mjs — ScholarSync UX Annealing Quality Metric
 *
 * Mirrors quality-score.mjs but for UX dimensions.
 * Scores are set manually after visual comparison of screenshots.
 * Run: node qa/ux-score.mjs
 * Run specific zone: node qa/ux-score.mjs --zone=1
 */

import { existsSync, readFileSync, writeFileSync } from 'fs';

const SCORE_FILE = 'qa/ux-score.json';

const UX_DIMENSIONS = {
  // Zone 1: Typography & Spacing
  headingHierarchy:    { weight: 0.08, zone: 1, label: 'Heading Hierarchy (H1–H4 distinct, Google Docs proportions)' },
  lineSpacing:         { weight: 0.08, zone: 1, label: 'Line Spacing (Bear-level generous, ~1.7–1.8)' },
  paragraphGaps:       { weight: 0.06, zone: 1, label: 'Paragraph Breathing Room (Bear spacing)' },
  fontRendering:       { weight: 0.04, zone: 1, label: 'Font Rendering Quality (both modes)' },

  // Zone 2: Editor Canvas
  canvasCleanness:     { weight: 0.06, zone: 2, label: 'Canvas Cleanness (no card borders, Bear-like surface)' },
  selectionColors:     { weight: 0.04, zone: 2, label: 'Selection Highlight (light=GDocs, dark=Notion)' },
  emptyState:          { weight: 0.04, zone: 2, label: 'Empty Editor State (inviting, Notion-like)' },

  // Zone 3: Toolbar & Progressive Disclosure
  toolbarClutter:      { weight: 0.06, zone: 3, label: 'Toolbar Clutter (fewer visible buttons = higher score)' },
  floatingToolbar:     { weight: 0.06, zone: 3, label: 'Floating Selection Toolbar (Notion-like)' },
  slashMenu:           { weight: 0.04, zone: 3, label: 'Slash Command Menu (Notion-like)' },
  bottomBar:           { weight: 0.04, zone: 3, label: 'Bottom Status Bar (Bear-like)' },

  // Zone 4: Markdown Handling
  markdownPaste:       { weight: 0.06, zone: 4, label: 'Markdown Paste → Formatted Text (Notion behavior)' },
  markdownTyping:      { weight: 0.04, zone: 4, label: 'Markdown Input Rules (# → H1, **bold**, etc.)' },

  // Zone 5: Left Panel (Sidebar)
  sidebarCollapsed:    { weight: 0.04, zone: 5, label: 'Sidebar Collapsed (VSCode activity bar)' },
  sidebarExpanded:     { weight: 0.04, zone: 5, label: 'Sidebar Expanded (Linear/Notion feel)' },
  sidebarTransition:   { weight: 0.03, zone: 5, label: 'Sidebar Expand/Collapse Animation' },
  navItemStates:       { weight: 0.03, zone: 5, label: 'Nav Item Hover/Active States' },

  // Zone 6: Right Panel (Workbench)
  workbenchTabs:       { weight: 0.04, zone: 6, label: 'Workbench Tabs (VSCode-like)' },
  workbenchAI:         { weight: 0.04, zone: 6, label: 'AI Chat UX (GitHub Copilot Chat)' },
  workbenchResize:     { weight: 0.03, zone: 6, label: 'Resize Handle (discoverable, functional)' },

  // Zone 7: Theme Polish
  lightModePolish:     { weight: 0.06, zone: 7, label: 'Light Mode Overall (PRIMARY — must be ≥85)' },
  darkModePolish:      { weight: 0.04, zone: 7, label: 'Dark Mode Overall (secondary)' },
};

// Load or initialize scores
function loadScores() {
  if (existsSync(SCORE_FILE)) {
    return JSON.parse(readFileSync(SCORE_FILE, 'utf-8'));
  }
  const initial = {};
  for (const [key, dim] of Object.entries(UX_DIMENSIONS)) {
    initial[key] = { score: 0, ...dim };
  }
  return { timestamp: new Date().toISOString(), dimensions: initial, composite: 0 };
}

function computeComposite(data) {
  let weighted = 0;
  let totalWeight = 0;
  for (const [key, dim] of Object.entries(UX_DIMENSIONS)) {
    const score = data.dimensions[key]?.score || 0;
    weighted += score * dim.weight;
    totalWeight += dim.weight;
  }
  return Math.round((weighted / totalWeight) * 100) / 100;
}

function getZoneAverage(data, zoneNum) {
  let weighted = 0;
  let totalWeight = 0;
  for (const [key, dim] of Object.entries(UX_DIMENSIONS)) {
    if (dim.zone === zoneNum) {
      const score = data.dimensions[key]?.score || 0;
      weighted += score * dim.weight;
      totalWeight += dim.weight;
    }
  }
  return totalWeight > 0 ? Math.round((weighted / totalWeight) * 100) / 100 : 0;
}

// Main
const args = process.argv.slice(2);
const zoneFilter = args.find(a => a.startsWith('--zone='));
const filterZone = zoneFilter ? parseInt(zoneFilter.split('=')[1]) : null;

const setArg = args.find(a => a.startsWith('--set='));

const data = loadScores();

// Allow setting scores: node qa/ux-score.mjs --set=headingHierarchy:85
if (setArg) {
  const [key, val] = setArg.split('=')[1].split(':');
  if (UX_DIMENSIONS[key]) {
    data.dimensions[key] = { ...UX_DIMENSIONS[key], score: parseInt(val) };
    data.timestamp = new Date().toISOString();
    data.composite = computeComposite(data);
    writeFileSync(SCORE_FILE, JSON.stringify(data, null, 2));
    console.log(`✓ Set ${key} = ${val}`);
    console.log(`  Composite: ${data.composite}`);
    process.exit(0);
  } else {
    console.error(`Unknown dimension: ${key}`);
    process.exit(1);
  }
}

// Display scores
data.composite = computeComposite(data);

console.log(`\n╔══════════════════════════════════════════════════════════╗`);
console.log(`║  ScholarSync UX Annealing Score                        ║`);
console.log(`║  Composite: ${String(data.composite).padEnd(6)}                                    ║`);
console.log(`╚══════════════════════════════════════════════════════════╝\n`);

for (let z = 1; z <= 7; z++) {
  if (filterZone && filterZone !== z) continue;
  const zoneAvg = getZoneAverage(data, z);
  const zoneNames = {
    1: 'Typography & Spacing',
    2: 'Editor Canvas',
    3: 'Toolbar & Disclosure',
    4: 'Markdown Handling',
    5: 'Left Panel (Sidebar)',
    6: 'Right Panel (Workbench)',
    7: 'Theme Polish'
  };
  const gate = z === 7 ? '(light≥85, dark≥80)' : '(all ≥80)';
  const status = zoneAvg >= 80 ? '✅ PASS' : '🔴 NEEDS WORK';
  console.log(`── Zone ${z}: ${zoneNames[z]} ${gate} — ${status} (avg: ${zoneAvg}) ──`);

  for (const [key, dim] of Object.entries(UX_DIMENSIONS)) {
    if (dim.zone !== z) continue;
    const score = data.dimensions[key]?.score || 0;
    const bar = '█'.repeat(Math.floor(score / 5)) + '░'.repeat(20 - Math.floor(score / 5));
    const marker = score >= 80 ? '✅' : score > 0 ? '🟡' : '⬜';
    console.log(`  ${marker} ${bar} ${String(score).padStart(3)}/100  ${dim.label}`);
  }
  console.log('');
}

// Find weakest
let weakest = { key: '', score: 100, label: '' };
for (const [key, dim] of Object.entries(UX_DIMENSIONS)) {
  const score = data.dimensions[key]?.score || 0;
  if (score < weakest.score) {
    weakest = { key, score, label: dim.label };
  }
}
console.log(`Weakest: ${weakest.label} (${weakest.score}/100)`);

// Save
data.composite = computeComposite(data);
writeFileSync(SCORE_FILE, JSON.stringify(data, null, 2));
console.log(`\nScores saved to ${SCORE_FILE}`);
