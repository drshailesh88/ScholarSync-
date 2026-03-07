import type { TableCellMeta, TableData, TableStyleData } from "@/types/presentation";

export interface TableRenderCell {
  key: string;
  value: string;
  columnIndex: number;
  rowIndex: number;
  colspan: number;
  rowspan: number;
  meta: TableCellMeta;
}

const HTML_TAG_PATTERN = /<\/?[a-z][\s\S]*>/i;
const TABLE_BORDER_MODES = new Set<TableStyleData["borderMode"]>([
  "all",
  "horizontal",
  "none",
  "outer",
]);

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function looksLikeHtml(value: string): boolean {
  return HTML_TAG_PATTERN.test(value);
}

function toEditorCellHtml(content: string): string {
  if (!content.trim()) return "<p></p>";
  const inner = looksLikeHtml(content) ? content : escapeHtml(content);
  return `<p>${inner}</p>`;
}

function fromEditorCellHtml(html: string): string {
  const trimmed = html.trim();
  if (!trimmed) return "";

  const parser = new DOMParser();
  const doc = parser.parseFromString(`<div>${trimmed}</div>`, "text/html");
  const root = doc.body.firstElementChild;
  if (!root) return "";

  const firstChild = root.firstElementChild;
  if (
    firstChild &&
    firstChild.tagName === "P" &&
    root.children.length === 1 &&
    root.childNodes.length === 1
  ) {
    return (firstChild as HTMLElement).innerHTML.trim();
  }

  return root.innerHTML.trim();
}

function readBooleanDataAttribute(element: Element, name: string): boolean | undefined {
  const raw = element.getAttribute(name);
  if (raw === null) return undefined;
  if (raw === "true") return true;
  if (raw === "false") return false;
  return undefined;
}

function compactStyleDeclarations(declarations: Array<string | undefined>): string | undefined {
  const parts = declarations
    .map((value) => value?.trim())
    .filter((value): value is string => Boolean(value));
  return parts.length > 0 ? parts.join("; ") : undefined;
}

function normalizeFontWeight(value: string | null | undefined): TableCellMeta["fontWeight"] | undefined {
  if (!value) return undefined;
  if (value === "bold") return "bold";
  if (value === "normal") return "normal";
  const parsed = Number.parseInt(value, 10);
  if (Number.isFinite(parsed)) {
    return parsed >= 600 ? "bold" : "normal";
  }
  return undefined;
}

function getCellMetaFromElement(cell: HTMLTableCellElement): TableCellMeta | undefined {
  const meta: TableCellMeta = {};
  const colspan = Math.max(1, Number.parseInt(cell.getAttribute("colspan") ?? "1", 10) || 1);
  const rowspan = Math.max(1, Number.parseInt(cell.getAttribute("rowspan") ?? "1", 10) || 1);

  if (colspan > 1) meta.colspan = colspan;
  if (rowspan > 1) meta.rowspan = rowspan;
  if (cell.style.backgroundColor) meta.backgroundColor = cell.style.backgroundColor;
  if (cell.style.color) meta.textColor = cell.style.color;
  if (cell.style.textAlign === "left" || cell.style.textAlign === "center" || cell.style.textAlign === "right") {
    meta.textAlign = cell.style.textAlign;
  }
  if (normalizeFontWeight(cell.style.fontWeight)) {
    meta.fontWeight = normalizeFontWeight(cell.style.fontWeight);
  }
  if (cell.style.borderTop) meta.borderTop = cell.style.borderTop;
  if (cell.style.borderBottom) meta.borderBottom = cell.style.borderBottom;
  if (cell.style.borderLeft) meta.borderLeft = cell.style.borderLeft;
  if (cell.style.borderRight) meta.borderRight = cell.style.borderRight;

  return sanitizeTableCellMeta(meta);
}

function getTableStyleFromElement(
  table: HTMLTableElement,
  fallback?: TableStyleData
): TableStyleData | undefined {
  const borderModeRaw = table.getAttribute("data-border-mode");
  const borderMode = TABLE_BORDER_MODES.has(borderModeRaw as TableStyleData["borderMode"])
    ? (borderModeRaw as TableStyleData["borderMode"])
    : fallback?.borderMode;

  const next: TableStyleData = {
    borderCollapse:
      readBooleanDataAttribute(table, "data-border-collapse") ?? fallback?.borderCollapse,
    stripedRows: readBooleanDataAttribute(table, "data-striped-rows") ?? fallback?.stripedRows,
    headerBackground: table.getAttribute("data-header-background") ?? fallback?.headerBackground,
    headerTextColor: table.getAttribute("data-header-text-color") ?? fallback?.headerTextColor,
    borderMode,
  };

  return sanitizeTableStyle(next);
}

function parseCellKey(key: string): { kind: "header" | "body"; rowIndex: number; columnIndex: number } | null {
  if (key.startsWith("h-")) {
    const columnIndex = Number.parseInt(key.slice(2), 10);
    if (!Number.isFinite(columnIndex) || columnIndex < 0) return null;
    return { kind: "header", rowIndex: 0, columnIndex };
  }

  const match = /^(\d+)-(\d+)$/.exec(key);
  if (!match) return null;
  return {
    kind: "body",
    rowIndex: Number.parseInt(match[1], 10),
    columnIndex: Number.parseInt(match[2], 10),
  };
}

function getMetaColumnExtent(cellMeta?: Record<string, TableCellMeta>): number {
  if (!cellMeta) return 0;

  let extent = 0;
  for (const [key, meta] of Object.entries(cellMeta)) {
    const parsedKey = parseCellKey(key);
    if (!parsedKey) continue;
    extent = Math.max(extent, parsedKey.columnIndex + Math.max(1, meta.colspan ?? 1));
  }
  return extent;
}

function getMetaBodyRowExtent(cellMeta?: Record<string, TableCellMeta>): number {
  if (!cellMeta) return 0;

  let extent = 0;
  for (const [key, meta] of Object.entries(cellMeta)) {
    const parsedKey = parseCellKey(key);
    if (!parsedKey || parsedKey.kind !== "body") continue;
    extent = Math.max(extent, parsedKey.rowIndex + Math.max(1, meta.rowspan ?? 1));
  }
  return extent;
}

export function getTableCellKey(rowIndex: number, columnIndex: number, isHeader = false): string {
  return isHeader ? `h-${columnIndex}` : `${rowIndex}-${columnIndex}`;
}

export function sanitizeTableCellMeta(meta?: TableCellMeta | null): TableCellMeta | undefined {
  if (!meta) return undefined;

  const next: TableCellMeta = {};
  if (meta.colspan && meta.colspan > 1) next.colspan = Math.max(1, meta.colspan);
  if (meta.rowspan && meta.rowspan > 1) next.rowspan = Math.max(1, meta.rowspan);
  if (meta.backgroundColor) next.backgroundColor = meta.backgroundColor;
  if (meta.textColor) next.textColor = meta.textColor;
  if (meta.textAlign) next.textAlign = meta.textAlign;
  if (meta.fontWeight) next.fontWeight = meta.fontWeight;
  if (meta.borderTop) next.borderTop = meta.borderTop;
  if (meta.borderBottom) next.borderBottom = meta.borderBottom;
  if (meta.borderLeft) next.borderLeft = meta.borderLeft;
  if (meta.borderRight) next.borderRight = meta.borderRight;

  return Object.keys(next).length > 0 ? next : undefined;
}

export function sanitizeTableStyle(style?: TableStyleData | null): TableStyleData | undefined {
  if (!style) return undefined;

  const next: TableStyleData = {};
  if (typeof style.borderCollapse === "boolean") next.borderCollapse = style.borderCollapse;
  if (typeof style.stripedRows === "boolean") next.stripedRows = style.stripedRows;
  if (style.headerBackground) next.headerBackground = style.headerBackground;
  if (style.headerTextColor) next.headerTextColor = style.headerTextColor;
  if (style.borderMode && TABLE_BORDER_MODES.has(style.borderMode)) next.borderMode = style.borderMode;

  return Object.keys(next).length > 0 ? next : undefined;
}

export function normalizeTableData(data: TableData): TableData {
  const headers = Array.isArray(data.headers) ? data.headers : [];
  const rows = Array.isArray(data.rows) ? data.rows : [];
  const columnCount = Math.max(1, headers.length, ...rows.map((row) => row.length), getMetaColumnExtent(data.cellMeta));
  const bodyRowCount = Math.max(rows.length, getMetaBodyRowExtent(data.cellMeta));

  const normalizedHeaders = Array.from({ length: columnCount }, (_, index) => headers[index] ?? `Column ${index + 1}`);
  const normalizedRows = Array.from({ length: bodyRowCount }, (_, rowIndex) =>
    Array.from({ length: columnCount }, (_, columnIndex) => rows[rowIndex]?.[columnIndex] ?? "")
  );

  const nextCellMetaEntries = Object.entries(data.cellMeta ?? {}).flatMap(([key, meta]) => {
    const parsedKey = parseCellKey(key);
    if (!parsedKey) return [];
    if (parsedKey.columnIndex >= columnCount) return [];
    if (parsedKey.kind === "body" && parsedKey.rowIndex >= bodyRowCount) return [];

    const sanitized = sanitizeTableCellMeta(meta);
    if (!sanitized) return [];

    const clamped: TableCellMeta = { ...sanitized };
    if (clamped.colspan) {
      clamped.colspan = Math.min(clamped.colspan, columnCount - parsedKey.columnIndex);
      if (clamped.colspan <= 1) delete clamped.colspan;
    }
    if (parsedKey.kind === "body" && clamped.rowspan) {
      clamped.rowspan = Math.min(clamped.rowspan, bodyRowCount - parsedKey.rowIndex);
      if (clamped.rowspan <= 1) delete clamped.rowspan;
    }

    const normalizedMeta = sanitizeTableCellMeta(clamped);
    return normalizedMeta ? [[key, normalizedMeta] as const] : [];
  });

  return {
    headers: normalizedHeaders,
    rows: normalizedRows,
    cellMeta: nextCellMetaEntries.length > 0 ? Object.fromEntries(nextCellMetaEntries) : undefined,
    tableStyle: sanitizeTableStyle(data.tableStyle),
  };
}

export function tableDataEquals(left: TableData, right: TableData): boolean {
  return JSON.stringify(normalizeTableData(left)) === JSON.stringify(normalizeTableData(right));
}

export function getTableCellMeta(
  data: TableData,
  rowIndex: number,
  columnIndex: number,
  isHeader = false
): TableCellMeta {
  return data.cellMeta?.[getTableCellKey(rowIndex, columnIndex, isHeader)] ?? {};
}

export function serializeTableCellStyle(meta?: TableCellMeta | null): string | undefined {
  if (!meta) return undefined;

  return compactStyleDeclarations([
    meta.backgroundColor ? `background-color: ${meta.backgroundColor}` : undefined,
    meta.textColor ? `color: ${meta.textColor}` : undefined,
    meta.textAlign ? `text-align: ${meta.textAlign}` : undefined,
    meta.fontWeight ? `font-weight: ${meta.fontWeight}` : undefined,
    meta.borderTop ? `border-top: ${meta.borderTop}` : undefined,
    meta.borderBottom ? `border-bottom: ${meta.borderBottom}` : undefined,
    meta.borderLeft ? `border-left: ${meta.borderLeft}` : undefined,
    meta.borderRight ? `border-right: ${meta.borderRight}` : undefined,
  ]);
}

export function buildTableRenderModel(data: TableData): {
  columnCount: number;
  headerCells: TableRenderCell[];
  bodyRows: TableRenderCell[][];
} {
  const normalized = normalizeTableData(data);
  const columnCount = normalized.headers.length;
  const headerCovered = new Set<number>();
  const headerCells: TableRenderCell[] = [];

  for (let columnIndex = 0; columnIndex < columnCount; columnIndex += 1) {
    if (headerCovered.has(columnIndex)) continue;

    const meta = getTableCellMeta(normalized, 0, columnIndex, true);
    const colspan = Math.min(Math.max(1, meta.colspan ?? 1), columnCount - columnIndex);
    const rowspan = Math.max(1, meta.rowspan ?? 1);

    for (let offset = 1; offset < colspan; offset += 1) {
      headerCovered.add(columnIndex + offset);
    }

    headerCells.push({
      key: getTableCellKey(0, columnIndex, true),
      value: normalized.headers[columnIndex] ?? "",
      columnIndex,
      rowIndex: 0,
      colspan,
      rowspan,
      meta,
    });
  }

  const bodyCovered = new Set<string>();
  const bodyRows = normalized.rows.map((row, rowIndex) => {
    const cells: TableRenderCell[] = [];

    for (let columnIndex = 0; columnIndex < columnCount; columnIndex += 1) {
      const key = getTableCellKey(rowIndex, columnIndex);
      if (bodyCovered.has(key)) continue;

      const meta = getTableCellMeta(normalized, rowIndex, columnIndex);
      const colspan = Math.min(Math.max(1, meta.colspan ?? 1), columnCount - columnIndex);
      const rowspan = Math.min(Math.max(1, meta.rowspan ?? 1), normalized.rows.length - rowIndex || 1);

      for (let rowOffset = 0; rowOffset < rowspan; rowOffset += 1) {
        for (let columnOffset = 0; columnOffset < colspan; columnOffset += 1) {
          if (rowOffset === 0 && columnOffset === 0) continue;
          bodyCovered.add(getTableCellKey(rowIndex + rowOffset, columnIndex + columnOffset));
        }
      }

      cells.push({
        key,
        value: row[columnIndex] ?? "",
        columnIndex,
        rowIndex,
        colspan,
        rowspan,
        meta,
      });
    }

    return cells;
  });

  return { columnCount, headerCells, bodyRows };
}

export function tableDataToHtml(data: TableData): string {
  const normalized = normalizeTableData(data);
  const { headerCells, bodyRows } = buildTableRenderModel(normalized);
  const tableStyle = normalized.tableStyle;

  const tableAttributes = [
    tableStyle?.borderMode ? ` data-border-mode="${tableStyle.borderMode}"` : "",
    typeof tableStyle?.borderCollapse === "boolean"
      ? ` data-border-collapse="${String(tableStyle.borderCollapse)}"`
      : "",
    typeof tableStyle?.stripedRows === "boolean"
      ? ` data-striped-rows="${String(tableStyle.stripedRows)}"`
      : "",
    tableStyle?.headerBackground
      ? ` data-header-background="${escapeHtml(tableStyle.headerBackground)}"`
      : "",
    tableStyle?.headerTextColor
      ? ` data-header-text-color="${escapeHtml(tableStyle.headerTextColor)}"`
      : "",
  ].join("");

  const renderCell = (tag: "td" | "th", cell: TableRenderCell) => {
    const attributes = [
      cell.colspan > 1 ? ` colspan="${cell.colspan}"` : "",
      cell.rowspan > 1 ? ` rowspan="${cell.rowspan}"` : "",
      serializeTableCellStyle(cell.meta) ? ` style="${escapeHtml(serializeTableCellStyle(cell.meta) ?? "")}"` : "",
    ].join("");
    return `<${tag}${attributes}>${toEditorCellHtml(cell.value)}</${tag}>`;
  };

  const thead = `<thead><tr>${headerCells.map((cell) => renderCell("th", cell)).join("")}</tr></thead>`;
  const tbody = `<tbody>${bodyRows
    .map((row) => `<tr>${row.map((cell) => renderCell("td", cell)).join("")}</tr>`)
    .join("")}</tbody>`;

  return `<table${tableAttributes}>${thead}${tbody}</table>`;
}

function extractTableRows(table: HTMLTableElement): HTMLTableRowElement[] {
  return Array.from(table.querySelectorAll("tr"));
}

function isTableCell(node: Element): node is HTMLTableCellElement {
  return node.tagName === "TD" || node.tagName === "TH";
}

export function parseTableHtmlToData(html: string, fallback?: TableData): TableData {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const table = doc.querySelector("table");

  if (!table) {
    return normalizeTableData(fallback ?? { headers: [], rows: [] });
  }

  const rowElements = extractTableRows(table);
  if (rowElements.length === 0) {
    return normalizeTableData(fallback ?? { headers: [], rows: [] });
  }

  const values: string[][] = [];
  const cellMeta: Record<string, TableCellMeta> = {};
  const occupied = new Set<string>();

  rowElements.forEach((rowElement, sourceRowIndex) => {
    if (!values[sourceRowIndex]) values[sourceRowIndex] = [];

    const cells = Array.from(rowElement.children).filter(isTableCell);
    let columnIndex = 0;

    cells.forEach((cell) => {
      while (occupied.has(`${sourceRowIndex}-${columnIndex}`)) {
        columnIndex += 1;
      }

      const value = fromEditorCellHtml(cell.innerHTML);
      const meta = getCellMetaFromElement(cell);
      const colspan = Math.max(1, meta?.colspan ?? 1);
      const rowspan = Math.max(1, meta?.rowspan ?? 1);

      values[sourceRowIndex][columnIndex] = value;
      for (let rowOffset = 0; rowOffset < rowspan; rowOffset += 1) {
        const targetRowIndex = sourceRowIndex + rowOffset;
        if (!values[targetRowIndex]) values[targetRowIndex] = [];

        for (let columnOffset = 0; columnOffset < colspan; columnOffset += 1) {
          const occupiedKey = `${targetRowIndex}-${columnIndex + columnOffset}`;
          occupied.add(occupiedKey);
          if (rowOffset === 0 && columnOffset === 0) continue;
          if (values[targetRowIndex][columnIndex + columnOffset] === undefined) {
            values[targetRowIndex][columnIndex + columnOffset] = "";
          }
        }
      }

      const dataKey = sourceRowIndex === 0
        ? getTableCellKey(0, columnIndex, true)
        : getTableCellKey(sourceRowIndex - 1, columnIndex);
      const sanitizedMeta = sanitizeTableCellMeta(meta);
      if (sanitizedMeta) {
        cellMeta[dataKey] = sanitizedMeta;
      }

      columnIndex += colspan;
    });
  });

  const fallbackColumnCount = fallback ? normalizeTableData(fallback).headers.length : 0;
  const columnCount = Math.max(1, fallbackColumnCount, ...values.map((row) => row.length));
  const filledRows = values.map((row) =>
    Array.from({ length: columnCount }, (_, columnIndex) => row[columnIndex] ?? "")
  );

  if (filledRows.length === 0) {
    return normalizeTableData(fallback ?? { headers: [], rows: [] });
  }

  return normalizeTableData({
    headers: filledRows[0] ?? [],
    rows: filledRows.slice(1),
    cellMeta: Object.keys(cellMeta).length > 0 ? cellMeta : undefined,
    tableStyle: getTableStyleFromElement(table, fallback?.tableStyle),
  });
}
