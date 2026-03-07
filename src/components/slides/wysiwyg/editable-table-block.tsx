"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import type { Editor as TiptapEditor } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableHeader } from "@tiptap/extension-table-header";
import { TableCell } from "@tiptap/extension-table-cell";
import { selectedRect } from "@tiptap/pm/tables";
import type { ThemeConfig } from "@/types/presentation";
import { TableBlock } from "../blocks/table-block";

export interface TableBlockData {
  headers: string[];
  rows: string[][];
}

type TableToolbarAction =
  | "add-row"
  | "remove-row"
  | "add-column"
  | "remove-column"
  | "merge-cells"
  | "split-cell"
  | "toggle-header-row"
  | "toggle-bold"
  | "toggle-italic";

type FallbackTableAction = "add-row" | "remove-row" | "add-column" | "remove-column";

interface EditableTableBlockProps {
  data: TableBlockData;
  isEditing: boolean;
  onUpdate: (data: TableBlockData) => void;
  onBlur: () => void;
  theme: ThemeConfig;
}

const HTML_TAG_PATTERN = /<\/?[a-z][\s\S]*>/i;

function looksLikeHtml(value: string): boolean {
  return HTML_TAG_PATTERN.test(value);
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
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

function makeDefaultHeaders(columnCount: number): string[] {
  return Array.from({ length: Math.max(1, columnCount) }, (_, index) => `Column ${index + 1}`);
}

export function normalizeTableData(data: TableBlockData): TableBlockData {
  const widestRow = Math.max(0, ...data.rows.map((row) => row.length));
  const columnCount = Math.max(1, data.headers.length, widestRow);
  const baseHeaders = data.headers.length > 0 ? data.headers : makeDefaultHeaders(columnCount);
  const headers = Array.from({ length: columnCount }, (_, index) => baseHeaders[index] ?? `Column ${index + 1}`);
  const rows = data.rows.map((row) =>
    Array.from({ length: columnCount }, (_, index) => row[index] ?? "")
  );
  return { headers, rows };
}

export function tableDataToHtml(data: TableBlockData): string {
  const normalized = normalizeTableData(data);
  const thead = `<thead><tr>${normalized.headers
    .map((header) => `<th>${toEditorCellHtml(header)}</th>`)
    .join("")}</tr></thead>`;
  const tbody = `<tbody>${normalized.rows
    .map((row) => `<tr>${row.map((cell) => `<td>${toEditorCellHtml(cell)}</td>`).join("")}</tr>`)
    .join("")}</tbody>`;
  return `<table>${thead}${tbody}</table>`;
}

function extractTableRows(table: HTMLTableElement): HTMLTableRowElement[] {
  return Array.from(table.querySelectorAll("tr"));
}

function isTableCell(node: Element): node is HTMLTableCellElement {
  return node.tagName === "TD" || node.tagName === "TH";
}

export function parseTableHtmlToData(html: string, fallback?: TableBlockData): TableBlockData {
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

  const grid: string[][] = [];

  rowElements.forEach((rowElement, rowIndex) => {
    if (!grid[rowIndex]) grid[rowIndex] = [];

    const cells = Array.from(rowElement.children).filter(isTableCell);
    let columnIndex = 0;

    cells.forEach((cell) => {
      while (grid[rowIndex][columnIndex] !== undefined) {
        columnIndex += 1;
      }

      const value = fromEditorCellHtml(cell.innerHTML);
      const colspan = Math.max(1, Number.parseInt(cell.getAttribute("colspan") ?? "1", 10) || 1);
      const rowspan = Math.max(1, Number.parseInt(cell.getAttribute("rowspan") ?? "1", 10) || 1);

      for (let rowOffset = 0; rowOffset < rowspan; rowOffset += 1) {
        const targetRowIndex = rowIndex + rowOffset;
        if (!grid[targetRowIndex]) grid[targetRowIndex] = [];

        for (let columnOffset = 0; columnOffset < colspan; columnOffset += 1) {
          grid[targetRowIndex][columnIndex + columnOffset] = value;
        }
      }

      columnIndex += colspan;
    });
  });

  const fallbackColumnCount = fallback ? normalizeTableData(fallback).headers.length : 0;
  const columnCount = Math.max(1, fallbackColumnCount, ...grid.map((row) => row.length));
  const filledRows = grid.map((row) =>
    Array.from({ length: columnCount }, (_, index) => row[index] ?? "")
  );

  if (filledRows.length === 0) {
    return normalizeTableData(fallback ?? { headers: [], rows: [] });
  }

  const firstRow = filledRows[0] ?? [];
  const headers = Array.from({ length: columnCount }, (_, index) => firstRow[index] ?? "");
  const rows = filledRows.slice(1);

  return normalizeTableData({ headers, rows });
}

export function tableDataEquals(left: TableBlockData, right: TableBlockData): boolean {
  const normalizedLeft = normalizeTableData(left);
  const normalizedRight = normalizeTableData(right);
  return JSON.stringify(normalizedLeft) === JSON.stringify(normalizedRight);
}

export function applyTableDataOperation(
  data: TableBlockData,
  action: FallbackTableAction
): TableBlockData {
  const normalized = normalizeTableData(data);
  const columnCount = normalized.headers.length;

  if (action === "add-row") {
    return {
      ...normalized,
      rows: [...normalized.rows, Array.from({ length: columnCount }, () => "")],
    };
  }

  if (action === "remove-row") {
    if (normalized.rows.length <= 1) return normalized;
    return {
      ...normalized,
      rows: normalized.rows.slice(0, -1),
    };
  }

  if (action === "add-column") {
    return {
      headers: [...normalized.headers, `Column ${normalized.headers.length + 1}`],
      rows: normalized.rows.map((row) => [...row, ""]),
    };
  }

  if (normalized.headers.length <= 1) return normalized;

  return {
    headers: normalized.headers.slice(0, -1),
    rows: normalized.rows.map((row) => row.slice(0, -1)),
  };
}

export function runTableToolbarCommand(
  editor: TiptapEditor,
  action: TableToolbarAction
): boolean {
  if (action === "add-row") {
    return editor.chain().focus().addRowAfter().run();
  }
  if (action === "remove-row") {
    return editor.chain().focus().deleteRow().run();
  }
  if (action === "add-column") {
    return editor.chain().focus().addColumnAfter().run();
  }
  if (action === "remove-column") {
    return editor.chain().focus().deleteColumn().run();
  }
  if (action === "merge-cells") {
    return editor.chain().focus().mergeCells().run();
  }
  if (action === "split-cell") {
    return editor.chain().focus().splitCell().run();
  }
  if (action === "toggle-header-row") {
    return editor.chain().focus().toggleHeaderRow().run();
  }
  if (action === "toggle-bold") {
    return editor.chain().focus().toggleBold().run();
  }
  return editor.chain().focus().toggleItalic().run();
}

export function moveSelectionToCellBelow(editor: TiptapEditor): boolean {
  try {
    const currentRect = selectedRect(editor.state);
    const targetColumn = currentRect.left;
    const targetRow = currentRect.bottom;

    if (targetRow >= currentRect.map.height) {
      const inserted = editor.chain().focus().addRowAfter().run();
      if (!inserted) return false;
    }

    const nextRect = selectedRect(editor.state);
    const resolvedRow = Math.min(targetRow, nextRect.map.height - 1);
    const nextCellPos =
      nextRect.tableStart +
      nextRect.map.positionAt(resolvedRow, targetColumn, nextRect.table);

    return editor.commands.setCellSelection({
      anchorCell: nextCellPos,
      headCell: nextCellPos,
    });
  } catch {
    return false;
  }
}

export function handleTableEditingKeyDown(
  event: KeyboardEvent,
  editor: TiptapEditor
): boolean {
  if (event.key === "Tab") {
    event.preventDefault();
    if (event.shiftKey) {
      return editor.commands.goToPreviousCell();
    }
    if (editor.commands.goToNextCell()) {
      return true;
    }
    if (!editor.can().addRowAfter()) {
      return false;
    }
    return editor.chain().focus().addRowAfter().goToNextCell().run();
  }

  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    return moveSelectionToCellBelow(editor);
  }

  return false;
}

function isFallbackAction(action: TableToolbarAction): action is FallbackTableAction {
  return (
    action === "add-row" ||
    action === "remove-row" ||
    action === "add-column" ||
    action === "remove-column"
  );
}

export function EditableTableBlock({
  data,
  isEditing,
  onUpdate,
  onBlur,
  theme,
}: EditableTableBlockProps) {
  const updateRef = useRef(onUpdate);
  const dataRef = useRef<TableBlockData>(normalizeTableData(data));
  const containerRef = useRef<HTMLDivElement>(null);
  const [editorStateVersion, setEditorStateVersion] = useState(0);

  useEffect(() => {
    updateRef.current = onUpdate;
  }, [onUpdate]);

  useEffect(() => {
    dataRef.current = normalizeTableData(data);
  }, [data]);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: false,
        blockquote: false,
        codeBlock: false,
        horizontalRule: false,
        bulletList: false,
        orderedList: false,
        listItem: false,
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: tableDataToHtml(normalizeTableData(data)),
    editable: isEditing,
    onUpdate: ({ editor: currentEditor }) => {
      const nextData = parseTableHtmlToData(currentEditor.getHTML(), dataRef.current);
      dataRef.current = nextData;
      updateRef.current(nextData);
    },
  }, []);

  useEffect(() => {
    if (!editor) return;
    const rerender = () => setEditorStateVersion((version) => version + 1);
    editor.on("selectionUpdate", rerender);
    editor.on("transaction", rerender);
    return () => {
      editor.off("selectionUpdate", rerender);
      editor.off("transaction", rerender);
    };
  }, [editor]);

  useEffect(() => {
    if (!editor) return;
    if (editor.isEditable !== isEditing) {
      editor.setEditable(isEditing);
    }
    if (isEditing) {
      editor.commands.focus();
    }
  }, [editor, isEditing]);

  useEffect(() => {
    if (!editor || isEditing) return;
    const normalized = normalizeTableData(data);
    const current = parseTableHtmlToData(editor.getHTML(), normalized);
    if (tableDataEquals(current, normalized)) return;
    editor.commands.setContent(tableDataToHtml(normalized), { emitUpdate: false });
  }, [data, editor, isEditing]);

  useEffect(() => {
    if (!editor) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isEditing) return;
      handleTableEditingKeyDown(event, editor);
    };
    const dom = editor.view.dom;
    dom.addEventListener("keydown", handleKeyDown);
    return () => {
      dom.removeEventListener("keydown", handleKeyDown);
    };
  }, [editor, isEditing]);

  const handleBlurCapture = useCallback(() => {
    if (!isEditing) return;
    window.setTimeout(() => {
      const container = containerRef.current;
      const activeElement = document.activeElement;
      if (container && activeElement && container.contains(activeElement)) return;
      onBlur();
    }, 0);
  }, [isEditing, onBlur]);

  const runFallbackOperation = useCallback(
    (action: FallbackTableAction) => {
      if (!editor) return;
      const currentData = parseTableHtmlToData(editor.getHTML(), dataRef.current);
      const nextData = applyTableDataOperation(currentData, action);
      dataRef.current = nextData;
      editor.commands.setContent(tableDataToHtml(nextData), { emitUpdate: false });
      updateRef.current(nextData);
    },
    [editor]
  );

  const handleAction = useCallback(
    (action: TableToolbarAction) => {
      if (!editor) return;
      const didRun = runTableToolbarCommand(editor, action);
      if (!didRun && isFallbackAction(action)) {
        runFallbackOperation(action);
      }
      editor.commands.focus();
    },
    [editor, runFallbackOperation]
  );

  const currentData = useMemo(() => {
    if (!editor) return normalizeTableData(data);
    return parseTableHtmlToData(editor.getHTML(), normalizeTableData(data));
    // editorStateVersion is intentionally included to trigger re-parse on editor changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, editor, editorStateVersion]);

  const canRemoveRow = currentData.rows.length > 1;
  const canRemoveColumn = currentData.headers.length > 1;

  if (!isEditing || !editor) {
    return <TableBlock data={normalizeTableData(data)} theme={theme} />;
  }

  const tableStyle = {
    "--table-header-bg": `${theme.primaryColor}10`,
    "--table-header-color": theme.primaryColor,
    "--table-text-color": theme.textColor,
    "--table-border-color": theme.borderColor ?? `${theme.textColor}22`,
  } as CSSProperties;

  return (
    <div
      ref={containerRef}
      className="h-full w-full space-y-2"
      onBlurCapture={handleBlurCapture}
      data-testid="editable-table-block"
    >
      <div
        className="flex flex-wrap items-center gap-1 rounded-md border border-slate-200 bg-white/95 p-1 shadow-sm"
        onMouseDown={(event) => event.preventDefault()}
      >
        <button
          className="rounded border border-slate-200 bg-white px-2 py-1 text-[11px] hover:bg-slate-50"
          onClick={() => handleAction("add-row")}
          type="button"
        >
          Add Row
        </button>
        <button
          className="rounded border border-slate-200 bg-white px-2 py-1 text-[11px] hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          onClick={() => handleAction("remove-row")}
          disabled={!canRemoveRow}
          type="button"
        >
          Remove Row
        </button>
        <button
          className="rounded border border-slate-200 bg-white px-2 py-1 text-[11px] hover:bg-slate-50"
          onClick={() => handleAction("add-column")}
          type="button"
        >
          Add Column
        </button>
        <button
          className="rounded border border-slate-200 bg-white px-2 py-1 text-[11px] hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          onClick={() => handleAction("remove-column")}
          disabled={!canRemoveColumn}
          type="button"
        >
          Remove Column
        </button>
        <button
          className="rounded border border-slate-200 bg-white px-2 py-1 text-[11px] hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          onClick={() => handleAction("merge-cells")}
          disabled={!editor.can().mergeCells()}
          type="button"
        >
          Merge Cells
        </button>
        <button
          className="rounded border border-slate-200 bg-white px-2 py-1 text-[11px] hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          onClick={() => handleAction("split-cell")}
          disabled={!editor.can().splitCell()}
          type="button"
        >
          Split Cell
        </button>
        <button
          className="rounded border border-slate-200 bg-white px-2 py-1 text-[11px] hover:bg-slate-50"
          onClick={() => handleAction("toggle-header-row")}
          type="button"
        >
          Toggle Header Row
        </button>
        <button
          className={`rounded border px-2 py-1 text-[11px] ${
            editor.isActive("bold")
              ? "border-blue-400 bg-blue-50 text-blue-700"
              : "border-slate-200 bg-white hover:bg-slate-50"
          }`}
          onClick={() => handleAction("toggle-bold")}
          type="button"
        >
          Bold
        </button>
        <button
          className={`rounded border px-2 py-1 text-[11px] ${
            editor.isActive("italic")
              ? "border-blue-400 bg-blue-50 text-blue-700"
              : "border-slate-200 bg-white hover:bg-slate-50"
          }`}
          onClick={() => handleAction("toggle-italic")}
          type="button"
        >
          Italic
        </button>
      </div>

      <div
        className="h-[calc(100%-2.5rem)] overflow-auto rounded-md border border-slate-200 bg-white/85 p-1 text-[0.65em] [&_.ProseMirror]:min-h-[4.5em] [&_.ProseMirror]:outline-none [&_.ProseMirror_p]:my-0 [&_.selectedCell]:bg-blue-100/60 [&_table]:w-full [&_table]:border-collapse [&_td]:border [&_td]:px-[0.6em] [&_td]:py-[0.35em] [&_th]:border [&_th]:px-[0.6em] [&_th]:py-[0.4em] [&_th]:text-left [&_th]:font-semibold"
        style={tableStyle}
      >
        <EditorContent
          editor={editor}
          className="[&_td]:border-[var(--table-border-color)] [&_td]:text-[var(--table-text-color)] [&_th]:border-[var(--table-header-color)] [&_th]:bg-[var(--table-header-bg)] [&_th]:text-[var(--table-header-color)]"
        />
      </div>
    </div>
  );
}
