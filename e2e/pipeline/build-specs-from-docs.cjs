#!/usr/bin/env node
"use strict";

const path = require("path");
const fs = require("fs");

const ROOT = path.resolve(__dirname, "../..");
const ITEMS_PER_SPEC = 35;
const PORT = process.env.TEST_PORT || "3001";

// ── Module mapping: doc filename prefix → { slug, url } ──────────
const MODULE_MAP = {
  DASHBOARD:          { slug: "dashboard",          url: "/dashboard" },
  ONBOARDING:         { slug: "onboarding",         url: "/onboarding" },
  SETTINGS:           { slug: "settings",           url: "/settings" },
  PROJECTS:           { slug: "projects",           url: "/projects" },
  ANALYSIS:           { slug: "analysis",           url: "/analysis" },
  LIBRARY:            { slug: "library",            url: "/library" },
  DEEP_RESEARCH:      { slug: "deep-research",      url: "/deep-research" },
  POSTER:             { slug: "poster",             url: "/poster" },
  COMPLIANCE:         { slug: "compliance",         url: "/compliance" },
  LATEX_EDITOR:       { slug: "latex",              url: "/latex" },
  STUDIO:             { slug: "studio",             url: "/studio" },
  RESEARCH:           { slug: "research",           url: "/research" },
  SLIDES_AI_GAMMA:    { slug: "slides-ai",          url: "/slides/ai" },
  FEEDS:              { slug: "feeds",              url: "/feeds" },
  SLIDES:             { slug: "slides",             url: "/slides" },
  NOTEBOOK:           { slug: "notebook",           url: "/notebook" },
  PRESENTATION:       { slug: "presentation",       url: "/presentation" },
  SYSTEMATIC_REVIEW:  { slug: "systematic-review",  url: "/systematic-review" },
  ILLUSTRATE:         { slug: "illustrate",         url: "/illustrate" },
  EDITOR:             { slug: "editor",             url: "/editor" },
};

// ── Extract checkboxes with section context ───────────────────────
function extractCheckboxes(content) {
  const lines = content.split("\n");
  let currentSection = "";
  let currentSubsection = "";
  const items = [];

  for (const line of lines) {
    // Track section headers for context
    const h2 = line.match(/^## \d+\.\s+(.+)/);
    if (h2) {
      currentSection = h2[1].trim();
      currentSubsection = "";
      continue;
    }

    const h3 = line.match(/^### (?:\d+\.\d+\s+)?(.+)/);
    if (h3) {
      currentSubsection = h3[1].trim();
      continue;
    }

    // Extract checkbox lines (unchecked only)
    const checkbox = line.match(/^(\s*)- \[ \] (.+)/);
    if (checkbox) {
      const indent = checkbox[1].length;
      const text = checkbox[2].trim();

      // Build context prefix from section/subsection
      let ctx = "";
      if (currentSection) ctx += `[${currentSection}]`;
      if (currentSubsection) ctx += ` > ${currentSubsection}`;

      items.push({
        text,
        section: currentSection,
        subsection: currentSubsection,
        context: ctx,
        indent,
      });
    }
  }

  return items;
}

// ── Build spec files for one module ───────────────────────────────
function buildModuleSpecs(prefix, config) {
  const docFile = path.join(ROOT, `${prefix}_FEATURES_TESTING.md`);
  if (!fs.existsSync(docFile)) {
    console.log(`  SKIP: ${docFile} not found`);
    return null;
  }

  const content = fs.readFileSync(docFile, "utf-8");
  const items = extractCheckboxes(content);

  if (items.length === 0) {
    console.log(`  SKIP: ${prefix} — no checkboxes found`);
    return null;
  }

  const specDir = path.join(ROOT, "e2e", "specs", config.slug);
  fs.mkdirSync(specDir, { recursive: true });

  const totalSpecs = Math.ceil(items.length / ITEMS_PER_SPEC);
  const specFiles = [];

  for (let i = 0; i < totalSpecs; i++) {
    const start = i * ITEMS_PER_SPEC;
    const end = Math.min(start + ITEMS_PER_SPEC, items.length);
    const chunk = items.slice(start, end);
    const num = String(i + 1).padStart(3, "0");
    const fileName = `spec-${num}.md`;
    const filePath = path.join(specDir, fileName);

    // Group items by section for readability
    const bodyLines = [];
    let lastSection = "";
    let lastSub = "";

    for (const item of chunk) {
      if (item.section !== lastSection) {
        if (bodyLines.length > 0) bodyLines.push("");
        bodyLines.push(`### ${item.section}`);
        lastSection = item.section;
        lastSub = "";
      }
      if (item.subsection && item.subsection !== lastSub) {
        bodyLines.push(`#### ${item.subsection}`);
        lastSub = item.subsection;
      }
      bodyLines.push(`- [ ] ${item.text}`);
    }

    const header = [
      `# ${config.slug} — Spec ${num}`,
      "",
      `STATUS: PENDING`,
      `TESTED: 0/${chunk.length}`,
      `PASS: 0`,
      `FAIL: 0`,
      `BLOCKED: 0`,
      `PAGE: http://localhost:${PORT}${config.url}`,
      `MODULE: ${config.slug}`,
      "",
      "---",
      "",
    ].join("\n");

    const fileContent = header + bodyLines.join("\n") + "\n";
    fs.writeFileSync(filePath, fileContent);

    specFiles.push({
      file: fileName,
      items: chunk.length,
      status: "PENDING",
      pass: 0,
      fail: 0,
      blocked: 0,
    });
  }

  // Generate MANIFEST.md
  const manifestLines = [
    `# ${config.slug} — Spec Manifest`,
    "",
    `Generated: ${new Date().toISOString().split("T")[0]}`,
    `Source: ${prefix}_FEATURES_TESTING.md`,
    `Total items: ${items.length}`,
    `Spec files: ${totalSpecs}`,
    `Page: http://localhost:${PORT}${config.url}`,
    "",
    "| File | Items | Status | Pass | Fail | Blocked |",
    "|------|-------|--------|------|------|---------|",
  ];

  for (const sf of specFiles) {
    manifestLines.push(
      `| ${sf.file} | ${sf.items} | ${sf.status} | ${sf.pass} | ${sf.fail} | ${sf.blocked} |`
    );
  }

  manifestLines.push("");
  fs.writeFileSync(path.join(specDir, "MANIFEST.md"), manifestLines.join("\n"));

  return { slug: config.slug, items: items.length, specs: totalSpecs };
}

// ── Main ──────────────────────────────────────────────────────────
function main() {
  const targetModule = process.argv[2]; // optional: build only one module

  console.log("\n  BUILD SPECS FROM DOCUMENTATION");
  console.log("  " + "=".repeat(50));
  console.log(`  Port: ${PORT}`);
  console.log("");

  const results = [];

  for (const [prefix, config] of Object.entries(MODULE_MAP)) {
    if (targetModule && config.slug !== targetModule) continue;

    console.log(`  Processing: ${prefix} → ${config.slug}`);
    const result = buildModuleSpecs(prefix, config);
    if (result) results.push(result);
  }

  // Generate MASTER_MANIFEST.md
  if (!targetModule) {
    const masterLines = [
      "# ScholarSync — Master Spec Manifest",
      "",
      `Generated: ${new Date().toISOString().split("T")[0]}`,
      `Total modules: ${results.length}`,
      `Total checkpoints: ${results.reduce((s, r) => s + r.items, 0)}`,
      `Total spec files: ${results.reduce((s, r) => s + r.specs, 0)}`,
      "",
      "| Module | Checkpoints | Spec Files | Status |",
      "|--------|-------------|------------|--------|",
    ];

    for (const r of results) {
      masterLines.push(`| ${r.slug} | ${r.items} | ${r.specs} | PENDING |`);
    }

    masterLines.push("");
    const masterPath = path.join(ROOT, "e2e", "specs", "MASTER_MANIFEST.md");
    fs.writeFileSync(masterPath, masterLines.join("\n"));
    console.log(`\n  Master manifest: e2e/specs/MASTER_MANIFEST.md`);
  }

  // Summary
  console.log("\n  ── Summary ──");
  const totalItems = results.reduce((s, r) => s + r.items, 0);
  const totalSpecs = results.reduce((s, r) => s + r.specs, 0);
  console.log(`  Modules processed: ${results.length}`);
  console.log(`  Total checkpoints: ${totalItems}`);
  console.log(`  Total spec files:  ${totalSpecs}`);
  console.log(`  Items per spec:    ${ITEMS_PER_SPEC}`);
  console.log("");
}

main();
