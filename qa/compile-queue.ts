#!/usr/bin/env npx tsx
/**
 * compile-queue.ts
 *
 * Reads all spec markdown files from e2e/specs/{module}/ and produces
 * qa/queue.jsonl — the machine-readable work queue for the QA pipeline.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");
const SPECS_DIR = path.join(ROOT, "e2e", "specs");
const MODULE_ORDER_PATH = path.join(__dirname, "module-order.json");
const QUEUE_PATH = path.join(__dirname, "queue.jsonl");

interface ModuleEntry {
  module: string;
  priority: number;
  specs: number;
  checkpoints: number;
}

interface QueueItem {
  id: string;
  module: string;
  spec_file: string;
  priority: number;
  status: "pending" | "pass1_done" | "pass2_done" | "blocked";
  checkpoints: number;
  page_url: string;
  pass1_agent: string | null;
  pass1_result: { pass: number; fail: number; blocked: number } | null;
  pass2_agent: string | null;
  pass2_result: { pass: number; fail: number; blocked: number } | null;
  attempts: number;
  max_attempts: number;
  blocked_reason: string | null;
}

function parseSpecFile(filePath: string): { checkpoints: number; pageUrl: string } {
  const content = fs.readFileSync(filePath, "utf-8");
  const lines = content.split("\n");

  let checkpoints = 0;
  let pageUrl = "";

  for (const line of lines) {
    // Count checkbox lines (features)
    if (line.match(/^- \[/)) {
      checkpoints++;
    }
    // Extract PAGE url
    const pageMatch = line.match(/^PAGE:\s*(.+)/);
    if (pageMatch) {
      pageUrl = pageMatch[1].trim();
    }
  }

  return { checkpoints, pageUrl };
}

function main() {
  const moduleOrder: ModuleEntry[] = JSON.parse(
    fs.readFileSync(MODULE_ORDER_PATH, "utf-8")
  );

  const queue: QueueItem[] = [];

  for (const mod of moduleOrder) {
    const moduleDir = path.join(SPECS_DIR, mod.module);
    if (!fs.existsSync(moduleDir)) {
      console.warn(`WARN: module dir not found: ${moduleDir}`);
      continue;
    }

    // Find all spec files, sorted numerically
    const specFiles = fs
      .readdirSync(moduleDir)
      .filter((f) => f.match(/^spec-\d+\.md$/))
      .sort((a, b) => {
        const numA = parseInt(a.match(/\d+/)![0]);
        const numB = parseInt(b.match(/\d+/)![0]);
        return numA - numB;
      });

    for (const specFile of specFiles) {
      const specPath = path.join(moduleDir, specFile);
      const { checkpoints, pageUrl } = parseSpecFile(specPath);
      const specId = specFile.replace(".md", "");

      // Normalize page URL to path only
      let pagePath = pageUrl;
      try {
        const url = new URL(pageUrl);
        pagePath = url.pathname;
      } catch {
        // Already a path or empty
        if (!pagePath.startsWith("/")) {
          pagePath = `/${mod.module}`;
        }
      }

      queue.push({
        id: `${mod.module}.${specId}`,
        module: mod.module,
        spec_file: `e2e/specs/${mod.module}/${specFile}`,
        priority: mod.priority,
        status: "pending",
        checkpoints,
        page_url: pagePath,
        pass1_agent: null,
        pass1_result: null,
        pass2_agent: null,
        pass2_result: null,
        attempts: 0,
        max_attempts: 3,
        blocked_reason: null,
      });
    }
  }

  // Write queue.jsonl
  const jsonl = queue.map((item) => JSON.stringify(item)).join("\n") + "\n";
  fs.writeFileSync(QUEUE_PATH, jsonl);

  // Summary
  const totalSpecs = queue.length;
  const totalCheckpoints = queue.reduce((s, q) => s + q.checkpoints, 0);
  const modules = new Set(queue.map((q) => q.module));

  console.log(`\n  QA Queue Compiled`);
  console.log(`  ${"─".repeat(40)}`);
  console.log(`  Modules:      ${modules.size}`);
  console.log(`  Spec files:   ${totalSpecs}`);
  console.log(`  Checkpoints:  ${totalCheckpoints}`);
  console.log(`  Output:       qa/queue.jsonl`);
  console.log();
}

main();
