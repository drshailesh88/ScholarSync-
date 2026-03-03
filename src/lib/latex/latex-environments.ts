/**
 * LaTeX environment converters for live preview.
 * Handles figure, table, tabular, verbatim, quote, and center environments.
 */

import { escapeHtml } from "./latex-to-html";

/** Convert the body of a tabular environment to an HTML table. */
export function convertTabularBody(body: string): string {
  const rows = body
    .split(/\\\\/)
    .map((r) => r.replace(/\\hline/g, "").trim())
    .filter((r) => r.length > 0);

  let table = '<table class="latex-tabular">';
  for (let i = 0; i < rows.length; i++) {
    const cells = rows[i].split("&").map((c) => c.trim());
    const tag = i === 0 ? "th" : "td";
    table += "<tr>";
    for (const cell of cells) {
      table += `<${tag}>${cell}</${tag}>`;
    }
    table += "</tr>";
  }
  table += "</table>";
  return table;
}

/** Convert figure environment to HTML. */
export function convertFigure(inner: string): string {
  const capMatch = inner.match(/\\caption\{([^}]*)\}/);
  const caption = capMatch ? capMatch[1] : "";
  const imgMatch = inner.match(/\\includegraphics(?:\[[^\]]*\])?\{([^}]*)\}/);
  const imgSrc = imgMatch ? imgMatch[1] : "";
  let out = '<figure class="latex-figure">';
  if (imgSrc) {
    out += `<div class="latex-figure-placeholder">[Image: ${escapeHtml(imgSrc)}]</div>`;
  }
  if (caption) {
    out += `<figcaption>${escapeHtml(caption)}</figcaption>`;
  }
  out += "</figure>";
  return out;
}

/** Convert table environment (with tabular) to HTML. */
export function convertTable(inner: string): string {
  const capMatch = inner.match(/\\caption\{([^}]*)\}/);
  const caption = capMatch ? capMatch[1] : "";
  const tabMatch = inner.match(/\\begin\{tabular\}\{[^}]*\}([\s\S]*?)\\end\{tabular\}/);
  let tableHtml = "";
  if (tabMatch) {
    tableHtml = convertTabularBody(tabMatch[1]);
  }
  let out = '<div class="latex-table">';
  if (caption) {
    out += `<p class="latex-table-caption">${escapeHtml(caption)}</p>`;
  }
  out += tableHtml + "</div>";
  return out;
}

/**
 * Process all environment conversions on an HTML string.
 * Call this from latexToHtml to handle figure, table, verbatim, quote, center.
 */
export function convertEnvironments(html: string): string {
  // Figure environments
  html = html.replace(
    /\\begin\{figure\}(?:\[[^\]]*\])?([\s\S]*?)\\end\{figure\}/g,
    (_, inner: string) => convertFigure(inner),
  );

  // Table environments
  html = html.replace(
    /\\begin\{table\}(?:\[[^\]]*\])?([\s\S]*?)\\end\{table\}/g,
    (_, inner: string) => convertTable(inner),
  );

  // Standalone tabular (not inside table environment)
  html = html.replace(
    /\\begin\{tabular\}\{[^}]*\}([\s\S]*?)\\end\{tabular\}/g,
    (_, body: string) => convertTabularBody(body),
  );

  // Verbatim environments
  html = html.replace(
    /\\begin\{verbatim\}([\s\S]*?)\\end\{verbatim\}/g,
    '<pre class="latex-verbatim">$1</pre>',
  );

  // Quote / quotation environments
  html = html.replace(
    /\\begin\{(?:quote|quotation)\}([\s\S]*?)\\end\{(?:quote|quotation)\}/g,
    '<blockquote class="latex-quote">$1</blockquote>',
  );

  // Center environment
  html = html.replace(
    /\\begin\{center\}([\s\S]*?)\\end\{center\}/g,
    '<div class="latex-center" style="text-align:center">$1</div>',
  );

  return html;
}
