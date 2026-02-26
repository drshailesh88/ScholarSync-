# Rich Text Clipboard Copy Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Copy deep research reports as rich HTML to the clipboard so pasting into Google Docs, Word, and other editors preserves formatting.

**Architecture:** Add a `markdownToRichHTML(md, sources)` converter function to ExportButtons.tsx that transforms the AI-generated markdown into HTML with inline styles (required for Google Docs compatibility). Modify the copy handler to use `ClipboardItem` API with both `text/html` and `text/plain` MIME types, with fallback for older browsers.

**Tech Stack:** TypeScript, Clipboard API (`ClipboardItem`), inline-styled HTML

---

### Task 1: Add the `markdownToRichHTML` converter function

**Files:**
- Modify: `src/components/deep-research/ExportButtons.tsx` (add function after line 106, before the interface declaration)

**Step 1: Write the `markdownToRichHTML` function**

Add this function to ExportButtons.tsx between the existing `escapeHTML` function (line 101) and the `ExportButtonsProps` interface (line 108). This function converts markdown to HTML with inline styles for Google Docs/Word compatibility.

The function must handle:
- Headings (`#`, `##`, `###`) → `<h1>`, `<h2>`, `<h3>` with inline font-size/weight/margin styles
- Bold (`**text**`) and italic (`*text*`) → `<strong>`, `<em>` via inline formatting pass
- Citation markers `[N]` → `<sup>` styled superscripts with colored links
- Tables (GFM `|` syntax) → `<table>` with bordered, styled `<th>` and `<td>` cells
- Blockquotes (`> text`) → `<blockquote>` with left border and italic style
- Unordered lists (`- item`) → collect consecutive items into `<ul><li>` blocks
- Ordered lists (`1. item`) → collect consecutive items into `<ol><li>` blocks
- Horizontal rules (`---`) → `<hr>` with subtle styling
- Regular paragraphs → `<p>` with line-height and margin
- A References section appended at the end from `sources` array

Key inline style constants to define at the top of the function:
```typescript
const styles = {
  h1: 'font-size:24px;font-weight:bold;margin:24px 0 12px 0;color:#1a1a1a;',
  h2: 'font-size:20px;font-weight:bold;margin:20px 0 10px 0;color:#1a1a1a;',
  h3: 'font-size:16px;font-weight:bold;margin:16px 0 8px 0;color:#1a1a1a;',
  p: 'margin:8px 0;line-height:1.6;color:#333;',
  table: 'border-collapse:collapse;margin:12px 0;width:100%;',
  th: 'border:1px solid #ccc;padding:8px 12px;background:#f5f5f5;font-weight:bold;text-align:left;',
  td: 'border:1px solid #ccc;padding:8px 12px;text-align:left;',
  blockquote: 'border-left:3px solid #ccc;padding:8px 16px;margin:12px 0;color:#555;font-style:italic;',
  sup: 'font-size:10px;color:#2563eb;vertical-align:super;text-decoration:none;',
  hr: 'border:none;border-top:1px solid #e5e5e5;margin:16px 0;',
  li: 'margin:4px 0;line-height:1.6;color:#333;',
};
```

Inline formatting helper (applied to paragraph/cell text after escaping HTML):
```typescript
function applyInlineFormatting(text: string, supStyle: string): string {
  let result = escapeHTML(text);
  // Bold: **text**
  result = result.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  // Italic: *text* (but not inside bold)
  result = result.replace(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g, '<em>$1</em>');
  // Citation markers: [N] → superscript
  result = result.replace(/\[(\d+)\]/g, `<sup style="${supStyle}">[$1]</sup>`);
  return result;
}
```

For tables: collect consecutive lines starting with `|`, skip separator rows (`|---|`), treat first data row as `<thead>`, rest as `<tbody>`.

For lists: collect consecutive lines matching the same pattern (`- ` or `N. `), wrap in `<ul>` or `<ol>`.

For the References section at the end: iterate over `sources`, build a numbered list:
```typescript
if (sources.length > 0) {
  htmlParts.push(`<h2 style="${styles.h2}">References</h2>`);
  htmlParts.push('<ol>');
  for (const [idx, s] of sources.entries()) {
    const authorsText = s.authors.length > 3
      ? `${s.authors.slice(0, 3).join(', ')} et al.`
      : s.authors.join(', ');
    let citation = `${authorsText}. ${escapeHTML(s.title)}.`;
    if (s.journal) citation += ` <em>${escapeHTML(s.journal)}</em>`;
    if (s.year) citation += ` (${s.year})`;
    citation += '.';
    if (s.doi) citation += ` DOI: ${escapeHTML(s.doi)}`;
    htmlParts.push(`<li style="${styles.li}">${citation}</li>`);
  }
  htmlParts.push('</ol>');
}
```

**Step 2: Verify the file still compiles**

Run: `cd "/Users/shaileshsingh/codename ScholarSync" && npx next lint --file src/components/deep-research/ExportButtons.tsx 2>&1 | head -20`
Expected: No errors

**Step 3: Commit**

```bash
git add src/components/deep-research/ExportButtons.tsx
git commit -m "feat: add markdownToRichHTML converter with inline styles for clipboard"
```

---

### Task 2: Modify the copy handler to use ClipboardItem API

**Files:**
- Modify: `src/components/deep-research/ExportButtons.tsx` — the `handleCopyClipboard` callback (lines 191-207)

**Step 1: Rewrite `handleCopyClipboard`**

Replace the existing handler with:
```typescript
const handleCopyClipboard = useCallback(async () => {
  try {
    const html = markdownToRichHTML(markdownReport, sources);

    // Modern browsers: write both HTML and plain text
    if (typeof ClipboardItem !== 'undefined' && navigator.clipboard?.write) {
      const clipboardItem = new ClipboardItem({
        'text/html': new Blob([html], { type: 'text/html' }),
        'text/plain': new Blob([markdownReport], { type: 'text/plain' }),
      });
      await navigator.clipboard.write([clipboardItem]);
    } else {
      // Fallback: plain text only
      await navigator.clipboard.writeText(markdownReport);
    }

    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  } catch {
    // Last-resort fallback for older browsers
    const textarea = document.createElement('textarea');
    textarea.value = markdownReport;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }
}, [markdownReport, sources]);
```

Note: `sources` is added to the dependency array since `markdownToRichHTML` now uses it.

**Step 2: Update the button tooltip**

Change the `title` attribute on the Copy button from `"Copy to clipboard"` to `"Copies formatted text — paste into Google Docs, Word, or any editor with formatting preserved"`.

**Step 3: Verify the file compiles**

Run: `cd "/Users/shaileshsingh/codename ScholarSync" && npx next lint --file src/components/deep-research/ExportButtons.tsx 2>&1 | head -20`
Expected: No errors

**Step 4: Commit**

```bash
git add src/components/deep-research/ExportButtons.tsx
git commit -m "feat: copy rich text HTML to clipboard for Google Docs/Word compatibility"
```

---

### Task 3: Manual verification

**Step 1: Start dev server and verify no runtime errors**

Run: `npm run dev` and open the deep research page, generate or view a report, click the Copy button.

**Step 2: Verify ClipboardItem is created correctly**

In browser DevTools console, verify no errors when clicking Copy. The button should show the green check icon and "Copied" text.

**Step 3: Paste test**

- Paste into Google Docs → should see formatted headings, bold, tables, superscript citations
- Paste into a plain text editor → should see raw markdown

**Step 4: Verify .md download still works**

Click the .md download button — should still download raw markdown unchanged.
