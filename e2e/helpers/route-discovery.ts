import fs from "node:fs";
import path from "node:path";

const APP_ROOT = path.resolve("src/app");
const APP_PAGES_ROOT = path.join(APP_ROOT, "(app)");
const API_ROOT = path.join(APP_ROOT, "api");

const DYNAMIC_SEGMENT_SAMPLES: Record<string, string> = {
  "[id]": "1",
  "[projectId]": "1",
  "[deckId]": "1",
  "[posterId]": "1",
  "[versionId]": "1",
  "[commentId]": "1",
  "[sessionId]": "session-1",
};

export type DiscoveredApiRoute = {
  endpoint: string;
  filePath: string;
  methods: string[];
  expectsFormData: boolean;
  requiresAuth: boolean;
};

function walk(dir: string, predicate: (entryPath: string) => boolean): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walk(fullPath, predicate));
      continue;
    }

    if (entry.isFile() && predicate(fullPath)) {
      files.push(fullPath);
    }
  }

  return files;
}

function routeFromFile(filePath: string, root: string, prefix = "") {
  const relPath = path.relative(root, filePath);
  const withoutFile = relPath.replace(/\/route\.ts$|\/page\.tsx$/, "");
  const slashPath = withoutFile.split(path.sep).join("/");
  const normalized = slashPath
    .replace(/\([^/]+\)\//g, "")
    .replace(/\([^/]+\)/g, "")
    .replace(/\[\[\.\.\.[^/]+?\]\]/g, "playwright")
    .replace(/\[\.\.\.[^/]+?\]/g, "playwright")
    .replace(/\[[^/]+?\]/g, (segment) => DYNAMIC_SEGMENT_SAMPLES[segment] ?? "playwright");

  const route = `${prefix}/${normalized}`.replace(/\/+/g, "/");
  return route === "/" ? route : route.replace(/\/$/, "");
}

export function discoverProtectedPages() {
  return walk(APP_PAGES_ROOT, (entryPath) => entryPath.endsWith("page.tsx"))
    .map((filePath) => routeFromFile(filePath, APP_PAGES_ROOT))
    .sort();
}

export function discoverApiRoutes() {
  return walk(API_ROOT, (entryPath) => entryPath.endsWith("route.ts"))
    .map((filePath) => {
      const source = fs.readFileSync(filePath, "utf8");
      const methods = Array.from(
        source.matchAll(/export\s+async\s+function\s+(GET|POST|PUT|PATCH|DELETE)\b/g),
        (match) => match[1]
      );

      return {
        endpoint: routeFromFile(filePath, API_ROOT, "/api"),
        filePath: path.relative(process.cwd(), filePath),
        methods,
        expectsFormData: source.includes(".formData("),
        requiresAuth: source.includes("getCurrentUserId("),
      } satisfies DiscoveredApiRoute;
    })
    .filter((route) => route.methods.length > 0)
    .sort((a, b) => a.endpoint.localeCompare(b.endpoint));
}

