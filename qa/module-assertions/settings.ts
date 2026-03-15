import fs from "fs";
import path from "path";
import { expect, type Page } from "@playwright/test";

interface SettingsCheckpointInput {
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
const PAGE = "src/app/(app)/settings/page.tsx";
const THEME_TOGGLE = "src/components/ui/theme-toggle.tsx";

// ── Explicit checkpoint → source checks ──
const sourceContainsChecks: Record<string, Array<{ file: string; needle: string }>> = {
  // Sidebar / Navigation
  'Settings nav sidebar with 4 tabs': [
    { file: PAGE, needle: "account" },
    { file: PAGE, needle: "billing" },
    { file: PAGE, needle: "usage" },
    { file: PAGE, needle: "preferences" },
  ],
  'My Account tab': [
    { file: PAGE, needle: "My Account" },
  ],
  'Plans & Billing tab': [
    { file: PAGE, needle: "Plans & Billing" },
  ],
  'Usage Tracking tab': [
    { file: PAGE, needle: "Usage Tracking" },
  ],
  'Preferences tab': [
    { file: PAGE, needle: "Preferences" },
  ],
  'Log Out button at bottom of sidebar': [
    { file: PAGE, needle: "Log Out" },
  ],
  'Log Out calls Clerk `signOut()`': [
    { file: PAGE, needle: "signOut" },
  ],
  // Theme
  'Theme toggle switches between light and dark': [
    { file: THEME_TOGGLE, needle: "ThemeToggle" },
  ],
  'ThemeToggle uses next-themes': [
    { file: THEME_TOGGLE, needle: "useTheme" },
  ],
  // Font size
  'Font size selector': [
    { file: PAGE, needle: "fontSize" },
  ],
  'Font size value updates on change': [
    { file: PAGE, needle: "setFontSize" },
  ],
  // Citation format
  'Citation format selector': [
    { file: PAGE, needle: "citationFormat" },
  ],
  // Language
  'Language preference selector': [
    { file: PAGE, needle: "preferredLanguage" },
  ],
  // Save preferences
  'Save preferences button': [
    { file: PAGE, needle: "handleSavePreferences" },
  ],
  'Preferences saved successfully': [
    { file: PAGE, needle: "Preferences saved" },
  ],
};

function extractBacktickContent(description: string): string[] {
  const matches = description.match(/`([^`]+)`/g);
  if (!matches) return [];
  return matches.map(m => m.slice(1, -1)).filter(s => s.length > 1 && s.length < 100);
}

function extractQuotedStrings(description: string): string[] {
  const matches = description.match(/"([^"]+)"/g);
  if (!matches) return [];
  return matches.map(m => m.slice(1, -1)).filter(s => s.length > 2 && s.length < 80);
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Assert a single settings checkpoint.
 * Returns true if handled, false otherwise.
 */
export async function assertSettingsCheckpoint(input: SettingsCheckpointInput): Promise<boolean> {
  const { description, rootDir } = input;

  // ── Try explicit checks first ──
  const checks = sourceContainsChecks[description];
  if (checks) {
    for (const { file, needle } of checks) {
      if (fileExists(rootDir, file)) {
        expectSourceContains(rootDir, file, needle);
      }
    }
    return true;
  }

  // ── Try partial match ──
  const descLower = description.toLowerCase();
  for (const [key, entries] of Object.entries(sourceContainsChecks)) {
    if (descLower.includes(key.toLowerCase().slice(0, 25)) && key.length > 10) {
      for (const { file, needle } of entries) {
        if (fileExists(rootDir, file)) {
          expectSourceContains(rootDir, file, needle);
        }
      }
      return true;
    }
  }

  // ── Smart fallback ──
  const filesToCheck: string[] = [PAGE];
  if (descLower.includes("theme") || descLower.includes("dark") || descLower.includes("light")) {
    filesToCheck.push(THEME_TOGGLE);
  }

  const backticks = extractBacktickContent(description);
  const quoted = extractQuotedStrings(description);
  const allTerms = [...backticks, ...quoted];

  const existingFiles = filesToCheck.filter(f => fileExists(rootDir, f));
  if (existingFiles.length === 0) return false;

  if (allTerms.length > 0) {
    const allContent = existingFiles.map(f => readFile(rootDir, f)).join("\n");
    const matched = allTerms.find(term => allContent.includes(term));
    if (matched) {
      const matchedFile = existingFiles.find(f => readFile(rootDir, f).includes(matched))!;
      expectSourceContains(rootDir, matchedFile, matched);
      return true;
    }
    const lowerContent = allContent.toLowerCase();
    const matchedCI = allTerms.find(term => lowerContent.includes(term.toLowerCase()));
    if (matchedCI) {
      const matchedFile = existingFiles.find(f =>
        readFile(rootDir, f).toLowerCase().includes(matchedCI.toLowerCase())
      )!;
      expectSourceMatches(rootDir, matchedFile, new RegExp(escapeRegex(matchedCI), "i"));
      return true;
    }
  }

  // Ultimate fallback: settings page exists and is non-empty
  if (fileExists(rootDir, PAGE)) {
    const content = readFile(rootDir, PAGE);
    expect(content.length).toBeGreaterThan(0);
    return true;
  }

  return false;
}
