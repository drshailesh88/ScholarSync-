import { Extension } from "@tiptap/core";
import { Plugin, PluginKey } from "@tiptap/pm/state";
import type { EditorView } from "@tiptap/pm/view";

/**
 * Detects if a string looks like markdown (has block-level markdown syntax).
 * Only triggers for content that clearly contains markdown formatting —
 * avoids false positives on normal text.
 */
function looksLikeMarkdown(text: string): boolean {
  const lines = text.split("\n");
  let markdownSignals = 0;

  for (const line of lines) {
    const trimmed = line.trimStart();
    // Headings
    if (/^#{1,6}\s/.test(trimmed)) markdownSignals++;
    // Bullet lists
    else if (/^[-*+]\s/.test(trimmed)) markdownSignals++;
    // Numbered lists
    else if (/^\d+\.\s/.test(trimmed)) markdownSignals++;
    // Blockquotes
    else if (/^>\s/.test(trimmed)) markdownSignals++;
    // Code fences
    else if (/^```/.test(trimmed)) markdownSignals++;
    // Horizontal rules
    else if (/^---/.test(trimmed)) markdownSignals++;
    // Tables
    else if (/^\|.+\|/.test(trimmed)) markdownSignals++;
  }

  // Need at least 2 markdown signals to avoid false positives
  return markdownSignals >= 2;
}

/**
 * Converts markdown text to HTML using a lightweight regex-based converter.
 * Handles the most common markdown patterns from AI tools (Claude, ChatGPT, Gemini).
 */
function markdownToHtml(md: string): string {
  const lines = md.split("\n");
  const html: string[] = [];
  let inCodeBlock = false;
  let codeBlockLang = "";
  let codeLines: string[] = [];
  let inList: "ul" | "ol" | null = null;

  function closeList() {
    if (inList) {
      html.push(`</${inList}>`);
      inList = null;
    }
  }

  function escapeHtml(s: string): string {
    return s
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function processInline(text: string): string {
    let result = text;
    // Bold + italic
    result = result.replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>");
    // Bold
    result = result.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
    // Strikethrough
    result = result.replace(/~~(.+?)~~/g, "<s>$1</s>");
    // Italic
    result = result.replace(/\*(.+?)\*/g, "<em>$1</em>");
    // Inline code
    result = result.replace(/`([^`]+)`/g, "<code>$1</code>");
    // Links
    result = result.replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2">$1</a>'
    );
    return result;
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trimStart();

    // Code block fence
    if (/^```/.test(trimmed)) {
      if (!inCodeBlock) {
        closeList();
        inCodeBlock = true;
        codeBlockLang = trimmed.slice(3).trim();
        codeLines = [];
        continue;
      } else {
        html.push(
          `<pre><code${codeBlockLang ? ` class="language-${escapeHtml(codeBlockLang)}"` : ""}>${escapeHtml(codeLines.join("\n"))}</code></pre>`
        );
        inCodeBlock = false;
        codeBlockLang = "";
        codeLines = [];
        continue;
      }
    }

    if (inCodeBlock) {
      codeLines.push(line);
      continue;
    }

    // Empty line
    if (trimmed === "") {
      closeList();
      continue;
    }

    // Headings
    const headingMatch = trimmed.match(/^(#{1,6})\s+(.+)/);
    if (headingMatch) {
      closeList();
      const level = headingMatch[1].length;
      html.push(`<h${level}>${processInline(headingMatch[2])}</h${level}>`);
      continue;
    }

    // Horizontal rule
    if (/^[-*_]{3,}\s*$/.test(trimmed)) {
      closeList();
      html.push("<hr>");
      continue;
    }

    // Table — detect `|`-delimited rows (at least 2 cells)
    if (/^\|(.+)\|/.test(trimmed)) {
      closeList();
      // Collect all consecutive table rows
      const tableRows: string[] = [trimmed];
      while (i + 1 < lines.length && /^\|(.+)\|/.test(lines[i + 1].trimStart())) {
        i++;
        tableRows.push(lines[i].trimStart());
      }
      // Parse table: skip separator row (|---|---|)
      const dataRows = tableRows.filter(
        (row) => !/^\|[\s\-:|]+\|$/.test(row)
      );
      if (dataRows.length > 0) {
        html.push('<table class="academic-table">');
        dataRows.forEach((row, idx) => {
          const cells = row
            .split("|")
            .slice(1, -1)
            .map((c) => c.trim());
          const tag = idx === 0 ? "th" : "td";
          if (idx === 0) html.push("<thead>");
          if (idx === 1) html.push("<tbody>");
          html.push("<tr>");
          cells.forEach((cell) => {
            html.push(`<${tag}>${processInline(cell)}</${tag}>`);
          });
          html.push("</tr>");
          if (idx === 0) html.push("</thead>");
        });
        if (dataRows.length > 1) html.push("</tbody>");
        html.push("</table>");
      }
      continue;
    }

    // Blockquote — merge consecutive `>` lines into one blockquote
    if (/^>\s?/.test(trimmed)) {
      closeList();
      const quoteLines: string[] = [trimmed.replace(/^>\s?/, "")];
      while (i + 1 < lines.length && /^>\s?/.test(lines[i + 1].trimStart())) {
        i++;
        quoteLines.push(lines[i].trimStart().replace(/^>\s?/, ""));
      }
      html.push(`<blockquote><p>${quoteLines.map(processInline).join("<br>")}</p></blockquote>`);
      continue;
    }

    // Unordered list
    const ulMatch = trimmed.match(/^[-*+]\s+(.+)/);
    if (ulMatch) {
      if (inList !== "ul") {
        closeList();
        html.push("<ul>");
        inList = "ul";
      }
      html.push(`<li>${processInline(ulMatch[1])}</li>`);
      continue;
    }

    // Ordered list
    const olMatch = trimmed.match(/^\d+\.\s+(.+)/);
    if (olMatch) {
      if (inList !== "ol") {
        closeList();
        html.push("<ol>");
        inList = "ol";
      }
      html.push(`<li>${processInline(olMatch[1])}</li>`);
      continue;
    }

    // Regular paragraph
    closeList();
    html.push(`<p>${processInline(trimmed)}</p>`);
  }

  // Close unclosed code block
  if (inCodeBlock) {
    html.push(
      `<pre><code>${escapeHtml(codeLines.join("\n"))}</code></pre>`
    );
  }

  closeList();
  return html.join("");
}

/**
 * Tiptap extension that converts pasted markdown to formatted content.
 * Only activates when the pasted text clearly contains markdown syntax
 * (2+ block-level markers), to avoid interfering with normal text paste.
 */
export const MarkdownPaste = Extension.create({
  name: "markdownPaste",

  addProseMirrorPlugins() {
    const { editor } = this;

    return [
      new Plugin({
        key: new PluginKey("markdownPaste"),
        props: {
          handlePaste(view: EditorView, event: ClipboardEvent) {
            const text = event.clipboardData?.getData("text/plain");
            const html = event.clipboardData?.getData("text/html");

            // If HTML is provided (e.g. from browser copy), let the default handler process it
            if (html && html.trim().length > 0) return false;

            // Only convert if the plain text looks like markdown
            if (!text || !looksLikeMarkdown(text)) return false;

            event.preventDefault();

            const convertedHtml = markdownToHtml(text);
            editor.commands.insertContent(convertedHtml);

            return true;
          },
        },
      }),
    ];
  },
});
