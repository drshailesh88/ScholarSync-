import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import path from "path";

const TRANSCRIPT = "/Users/shaileshsingh/.claude/projects/-Users-shaileshsingh-codename-ScholarSync/dca7318e-750a-4299-b6dd-b7c370a48b31.jsonl";
const BASE = "/Users/shaileshsingh/ScholarSync";

const PATHS_TO_RECOVER = [
  "src/lib/search/__tests__/ralph-search/",
  "src/lib/search/quality-ranker.ts",
  "src/lib/search/query-expander.ts",
  "src/lib/search/study-type-detector.ts",
];

function shouldRecover(filePath) {
  return PATHS_TO_RECOVER.some((p) => filePath.includes(p));
}

const files = new Map();
const lines = readFileSync(TRANSCRIPT, "utf-8").split("\n").filter(Boolean);
console.log(`Parsing ${lines.length} transcript lines...`);

let writes = 0;
let edits = 0;
let editWarnings = 0;

for (let i = 0; i < lines.length; i++) {
  let d;
  try {
    d = JSON.parse(lines[i]);
  } catch {
    continue;
  }

  if (d.type !== "assistant") continue;

  const msg = d.message || {};
  const content = Array.isArray(msg.content) ? msg.content : [];

  for (const block of content) {
    if (!block || block.type !== "tool_use") continue;

    const { name, input } = block;
    if (!input || !input.file_path) continue;

    const fp = input.file_path;
    if (!shouldRecover(fp)) continue;
    // Skip the recovery script itself
    if (fp.includes("recover-ralph")) continue;

    const relPath = fp.startsWith(BASE + "/") ? fp.slice(BASE.length + 1) : fp;

    if (name === "Write" && typeof input.content === "string") {
      files.set(relPath, input.content);
      writes++;
      console.log(`  W ${relPath} (${(input.content.length / 1024).toFixed(1)} KB)`);
    } else if (name === "Edit" && input.old_string && input.new_string !== undefined) {
      const current = files.get(relPath);
      if (!current) {
        console.warn(`  WARN line ${i}: Edit for ${relPath} but no Write found yet`);
        editWarnings++;
        continue;
      }

      if (input.replace_all) {
        files.set(relPath, current.split(input.old_string).join(input.new_string));
        edits++;
      } else {
        const idx = current.indexOf(input.old_string);
        if (idx !== -1) {
          files.set(relPath, current.slice(0, idx) + input.new_string + current.slice(idx + input.old_string.length));
          edits++;
        } else {
          console.warn(`  WARN line ${i}: old_string not found in ${relPath}: "${input.old_string.slice(0, 50)}..."`);
          editWarnings++;
        }
      }
    }
  }
}

console.log(`\n${writes} writes, ${edits} edits applied, ${editWarnings} warnings`);
console.log(`Writing ${files.size} files...\n`);

for (const [relPath, content] of files) {
  const fullPath = path.join(BASE, relPath);
  const dir = path.dirname(fullPath);
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
  writeFileSync(fullPath, content, "utf-8");
  const sizeKB = (Buffer.byteLength(content) / 1024).toFixed(1);
  console.log(`  ✓ ${relPath} (${sizeKB} KB)`);
}

console.log(`\nDone! Recovered ${files.size} files.`);
