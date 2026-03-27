# Zone 4: Markdown Handling — Gap Analysis

> Date: 2026-03-27

## Summary

ScholarSync already has strong markdown handling infrastructure:
- `MarkdownPaste` extension exists with `looksLikeMarkdown()` detection + `markdownToHtml()` converter
- `StarterKit` is enabled, providing built-in input rules for markdown typing (headings, bold, italic, lists, blockquote, code block, horizontal rule)
- `Typography` extension provides smart quotes and dashes

The converter handles most common patterns but is missing tables, strikethrough, and has a multi-line blockquote bug.

## Gaps Found

### 1. Table Paste Not Supported (Priority: HIGH)
- **Current:** Tables (`| Col | Col |`) are pasted as plain text paragraphs
- **Reference:** Notion converts pasted markdown tables into formatted tables
- **Fix:** Add table parsing to `markdownToHtml()` — detect `|`-delimited rows, emit `<table>` HTML

### 2. Strikethrough Not Parsed (Priority: MEDIUM)
- **Current:** `~~text~~` is not converted in `processInline()`
- **Fix:** Add `~~(.+?)~~` → `<s>$1</s>` regex to inline processing

### 3. Multi-line Blockquotes Create Separate Elements (Priority: MEDIUM)
- **Current:** Each `> line` creates a separate `<blockquote>` element
- **Fix:** Merge consecutive `>` lines into a single `<blockquote>` with `<p>` children

## Dimensions Already at Target
- **Markdown typing** — StarterKit provides all standard input rules
- **Basic paste conversion** — Headings, bold, italic, code, links, lists, blockquotes, code blocks, horizontal rules all convert
- **AI app paste** — `looksLikeMarkdown()` heuristic correctly detects AI-generated markdown
- **HTML paste** — Correctly falls through to default handler when HTML is present in clipboard
- **Plain text paste** — Correctly falls through when no markdown signals detected
