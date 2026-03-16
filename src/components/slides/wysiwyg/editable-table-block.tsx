"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import { mergeAttributes, type Editor as TiptapEditor } from "@tiptap/core";
import type { EditorState } from "@tiptap/pm/state";
import type { ResolvedPos } from "@tiptap/pm/model";
import { selectedRect } from "@tiptap/pm/tables";
import StarterKit from "@tiptap/starter-kit";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableHeader } from "@tiptap/extension-table-header";
import { TableCell } from "@tiptap/extension-table-cell";
import { ColorPicker } from "@/components/slides/shared/color-picker";
import type { ContextMenuItem } from "@/components/slides/shared/context-menu";
import {
  getTableCellKey,
  normalizeTableData,
  parseTableHtmlToData,
  sanitizeTableCellMeta,
  serializeTableCellStyle,
  tableDataEquals,
  tableDataToHtml,
} from "@/components/slides/shared/table-data";
import { useContextMenu } from "@/hooks/use-context-menu";
import { useTableEditorStore, type ActiveTableCellState } from "@/stores/table-editor-store";
import type { TableCellMeta, TableData, TableStyleData, ThemeConfig } from "@/types/presentation";
import { TableBlock } from "../blocks/table-block";

export type { TableData };
export {
  normalizeTableData,
  parseTableHtmlToData,
  tableDataEquals,
  tableDataToHtml,
} from "@/components/slides/shared/table-data";

type TableToolbarAction =
  | "add-row"
  | "insert-row-above"
  | "remove-row"
  | "add-column"
  | "insert-column-left"
  | "remove-column"
  | "merge-cells"
  | "split-cell";

type FallbackTableAction = "add-row" | "remove-row" | "add-column" | "remove-column";

interface EditableTableBlockProps {
  blockIndex: number;
  data: TableData;
  isEditing: boolean;
  onUpdate: (data: TableData) => void;
  onBlur: () => void;
  theme: ThemeConfig;
}

function buildCellHtmlAttributes(HTMLAttributes: Record<string, unknown>): Record<string, unknown> {
  const {
    backgroundColor,
    textColor,
    textAlign,
    fontWeight,
    borderTop,
    borderBottom,
    borderLeft,
    borderRight,
    ...rest
  } = HTMLAttributes;

  const meta = sanitizeTableCellMeta({
    backgroundColor: typeof backgroundColor === "string" ? backgroundColor : undefined,
    textColor: typeof textColor === "string" ? textColor : undefined,
    textAlign:
      textAlign === "left" || textAlign === "center" || textAlign === "right"
        ? textAlign
        : undefined,
    fontWeight:
      fontWeight === "bold" || fontWeight === "normal" ? fontWeight : undefined,
    borderTop: typeof borderTop === "string" ? borderTop : undefined,
    borderBottom: typeof borderBottom === "string" ? borderBottom : undefined,
    borderLeft: typeof borderLeft === "string" ? borderLeft : undefined,
    borderRight: typeof borderRight === "string" ? borderRight : undefined,
  });
  const style = [typeof rest.style === "string" ? rest.style : undefined, serializeTableCellStyle(meta)]
    .filter((value): value is string => Boolean(value))
    .join("; ");

  return mergeAttributes(rest, style ? { style } : {});
}

const PresentationTable = Table.extend({
  addAttributes() {
    return {
      ...(this.parent?.() ?? {}),
      borderCollapse: {
        default: null,
        parseHTML: (element: HTMLElement) => {
          const raw = element.getAttribute("data-border-collapse");
          if (raw === "true") return true;
          if (raw === "false") return false;
          return null;
        },
        renderHTML: (attributes: Record<string, unknown>) =>
          typeof attributes.borderCollapse === "boolean"
            ? { "data-border-collapse": String(attributes.borderCollapse) }
            : {},
      },
      stripedRows: {
        default: null,
        parseHTML: (element: HTMLElement) => {
          const raw = element.getAttribute("data-striped-rows");
          if (raw === "true") return true;
          if (raw === "false") return false;
          return null;
        },
        renderHTML: (attributes: Record<string, unknown>) =>
          typeof attributes.stripedRows === "boolean"
            ? { "data-striped-rows": String(attributes.stripedRows) }
            : {},
      },
      headerBackground: {
        default: null,
        parseHTML: (element: HTMLElement) => element.getAttribute("data-header-background"),
        renderHTML: (attributes: Record<string, unknown>) =>
          typeof attributes.headerBackground === "string"
            ? { "data-header-background": attributes.headerBackground }
            : {},
      },
      headerTextColor: {
        default: null,
        parseHTML: (element: HTMLElement) => element.getAttribute("data-header-text-color"),
        renderHTML: (attributes: Record<string, unknown>) =>
          typeof attributes.headerTextColor === "string"
            ? { "data-header-text-color": attributes.headerTextColor }
            : {},
      },
      borderMode: {
        default: null,
        parseHTML: (element: HTMLElement) => element.getAttribute("data-border-mode"),
        renderHTML: (attributes: Record<string, unknown>) =>
          typeof attributes.borderMode === "string"
            ? { "data-border-mode": attributes.borderMode }
            : {},
      },
    };
  },
});

const PresentationTableCell = TableCell.extend({
  addAttributes() {
    return {
      ...(this.parent?.() ?? {}),
      backgroundColor: {
        default: null,
        parseHTML: (element: HTMLElement) => element.style.backgroundColor || null,
      },
      textColor: {
        default: null,
        parseHTML: (element: HTMLElement) => element.style.color || null,
      },
      textAlign: {
        default: null,
        parseHTML: (element: HTMLElement) => element.style.textAlign || null,
      },
      fontWeight: {
        default: null,
        parseHTML: (element: HTMLElement) => element.style.fontWeight || null,
      },
      borderTop: {
        default: null,
        parseHTML: (element: HTMLElement) => element.style.borderTop || null,
      },
      borderBottom: {
        default: null,
        parseHTML: (element: HTMLElement) => element.style.borderBottom || null,
      },
      borderLeft: {
        default: null,
        parseHTML: (element: HTMLElement) => element.style.borderLeft || null,
      },
      borderRight: {
        default: null,
        parseHTML: (element: HTMLElement) => element.style.borderRight || null,
      },
    };
  },

  renderHTML({ HTMLAttributes }) {
    return ["td", buildCellHtmlAttributes(HTMLAttributes), 0];
  },
});

const PresentationTableHeader = TableHeader.extend({
  addAttributes() {
    return {
      ...(this.parent?.() ?? {}),
      backgroundColor: {
        default: null,
        parseHTML: (element: HTMLElement) => element.style.backgroundColor || null,
      },
      textColor: {
        default: null,
        parseHTML: (element: HTMLElement) => element.style.color || null,
      },
      textAlign: {
        default: null,
        parseHTML: (element: HTMLElement) => element.style.textAlign || null,
      },
      fontWeight: {
        default: null,
        parseHTML: (element: HTMLElement) => element.style.fontWeight || null,
      },
      borderTop: {
        default: null,
        parseHTML: (element: HTMLElement) => element.style.borderTop || null,
      },
      borderBottom: {
        default: null,
        parseHTML: (element: HTMLElement) => element.style.borderBottom || null,
      },
      borderLeft: {
        default: null,
        parseHTML: (element: HTMLElement) => element.style.borderLeft || null,
      },
      borderRight: {
        default: null,
        parseHTML: (element: HTMLElement) => element.style.borderRight || null,
      },
    };
  },

  renderHTML({ HTMLAttributes }) {
    return ["th", buildCellHtmlAttributes(HTMLAttributes), 0];
  },
});

function findSelectedCellPos(state: EditorState): number | null {
  const selection = state.selection as {
    $anchorCell?: ResolvedPos;
  };

  if (selection.$anchorCell) {
    return selection.$anchorCell.pos;
  }

  const { $from } = state.selection;
  for (let depth = $from.depth; depth > 0; depth -= 1) {
    const node = $from.node(depth);
    if (node.type.name === "tableCell" || node.type.name === "tableHeader") {
      return $from.before(depth);
    }
  }

  return null;
}

function getSelectedTableCellState(editor: TiptapEditor): ActiveTableCellState | null {
  try {
    const rect = selectedRect(editor.state);
    const cellPos = findSelectedCellPos(editor.state);
    const cellNode = cellPos !== null ? editor.state.doc.nodeAt(cellPos) : null;
    const width = rect.map.width;

    let rowIndex = rect.top;
    let columnIndex = rect.left;

    if (cellPos !== null) {
      const mapIndex = rect.map.map.findIndex((relativePos) => rect.tableStart + relativePos === cellPos);
      if (mapIndex >= 0) {
        rowIndex = Math.floor(mapIndex / width);
        columnIndex = mapIndex % width;
      }
    }

    const isHeader = rowIndex === 0 || cellNode?.type.name === "tableHeader";
    const meta = sanitizeTableCellMeta({
      backgroundColor: typeof cellNode?.attrs.backgroundColor === "string" ? cellNode.attrs.backgroundColor : undefined,
      textColor: typeof cellNode?.attrs.textColor === "string" ? cellNode.attrs.textColor : undefined,
      textAlign:
        cellNode?.attrs.textAlign === "left" ||
        cellNode?.attrs.textAlign === "center" ||
        cellNode?.attrs.textAlign === "right"
          ? cellNode.attrs.textAlign
          : undefined,
      fontWeight:
        cellNode?.attrs.fontWeight === "bold" || cellNode?.attrs.fontWeight === "normal"
          ? cellNode.attrs.fontWeight
          : undefined,
      borderTop: typeof cellNode?.attrs.borderTop === "string" ? cellNode.attrs.borderTop : undefined,
      borderBottom: typeof cellNode?.attrs.borderBottom === "string" ? cellNode.attrs.borderBottom : undefined,
      borderLeft: typeof cellNode?.attrs.borderLeft === "string" ? cellNode.attrs.borderLeft : undefined,
      borderRight: typeof cellNode?.attrs.borderRight === "string" ? cellNode.attrs.borderRight : undefined,
      colspan: typeof cellNode?.attrs.colspan === "number" ? cellNode.attrs.colspan : undefined,
      rowspan: typeof cellNode?.attrs.rowspan === "number" ? cellNode.attrs.rowspan : undefined,
    }) ?? {};

    return {
      key: getTableCellKey(isHeader ? 0 : rowIndex - 1, columnIndex, isHeader),
      rowIndex: isHeader ? 0 : rowIndex - 1,
      columnIndex,
      isHeader,
      meta,
    };
  } catch {
    return null;
  }
}

function syncTableEditorSelectionState(editor: TiptapEditor): void {
  useTableEditorStore.getState().setSelectionState({
    selectedCell: getSelectedTableCellState(editor),
    canMergeCells: editor.can().mergeCells(),
    canSplitCell: editor.can().splitCell(),
  });
}

function updateTableNodeAttributes(
  editor: TiptapEditor,
  attributes: Partial<TableStyleData>
): boolean {
  return editor
    .chain()
    .focus()
    .command(({ state, tr, dispatch }) => {
      const { $from } = state.selection;
      for (let depth = $from.depth; depth > 0; depth -= 1) {
        const node = $from.node(depth);
        if (node.type.name !== "table") continue;
        if (dispatch) {
          tr.setNodeMarkup($from.before(depth), undefined, {
            ...node.attrs,
            ...attributes,
          });
        }
        return true;
      }
      return false;
    })
    .run();
}

function updateSelectedCellAttributes(
  editor: TiptapEditor,
  attributes: Partial<TableCellMeta>
): boolean {
  return Object.entries(attributes).every(([name, value]) =>
    editor.chain().focus().setCellAttribute(name, value).run()
  );
}

export function applyTableDataOperation(
  data: TableData,
  action: FallbackTableAction
): TableData {
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
    const nextRows = normalized.rows.slice(0, -1);
    const nextRowCount = nextRows.length;
    const nextCellMetaEntries = Object.entries(normalized.cellMeta ?? {}).flatMap(([key, meta]) => {
      const match = /^(\d+)-(\d+)$/.exec(key);
      if (!match) return [[key, meta] as const];

      const rowIndex = Number.parseInt(match[1], 10);
      if (rowIndex >= nextRowCount) return [];

      const nextMeta = { ...meta };
      if (nextMeta.rowspan) {
        nextMeta.rowspan = Math.min(nextMeta.rowspan, nextRowCount - rowIndex);
        if (nextMeta.rowspan <= 1) delete nextMeta.rowspan;
      }
      const sanitized = sanitizeTableCellMeta(nextMeta);
      return sanitized ? [[key, sanitized] as const] : [];
    });

    return {
      ...normalized,
      rows: nextRows,
      cellMeta: nextCellMetaEntries.length > 0 ? Object.fromEntries(nextCellMetaEntries) : undefined,
    };
  }

  if (action === "add-column") {
    return {
      ...normalized,
      headers: [...normalized.headers, `Column ${normalized.headers.length + 1}`],
      /* empty state: renders nothing when no data */
      rows: normalized.rows.map((row) => [...row, ""]),
    };
  }

  if (normalized.headers.length <= 1) return normalized;

  const nextHeaders = normalized.headers.slice(0, -1);
  const nextColumnCount = nextHeaders.length;
  const nextCellMetaEntries = Object.entries(normalized.cellMeta ?? {}).flatMap(([key, meta]) => {
    const headerMatch = /^h-(\d+)$/.exec(key);
    const bodyMatch = /^(\d+)-(\d+)$/.exec(key);
    const columnIndex = Number.parseInt((headerMatch?.[1] ?? bodyMatch?.[2]) || "-1", 10);
    if (columnIndex >= nextColumnCount) return [];

    const nextMeta = { ...meta };
    if (nextMeta.colspan) {
      nextMeta.colspan = Math.min(nextMeta.colspan, nextColumnCount - columnIndex);
      if (nextMeta.colspan <= 1) delete nextMeta.colspan;
    }
    const sanitized = sanitizeTableCellMeta(nextMeta);
    return sanitized ? [[key, sanitized] as const] : [];
  });

  return {
    ...normalized,
    headers: nextHeaders,
    rows: normalized.rows.map((row) => row.slice(0, -1)),
    cellMeta: nextCellMetaEntries.length > 0 ? Object.fromEntries(nextCellMetaEntries) : undefined,
  };
}

export function runTableToolbarCommand(
  editor: TiptapEditor,
  action: TableToolbarAction
): boolean {
  if (action === "add-row") {
    return editor.chain().focus().addRowAfter().run();
  }
  if (action === "insert-row-above") {
    return editor.chain().focus().addRowBefore().run();
  }
  if (action === "remove-row") {
    return editor.chain().focus().deleteRow().run();
  }
  if (action === "add-column") {
    return editor.chain().focus().addColumnAfter().run();
  }
  if (action === "insert-column-left") {
    return editor.chain().focus().addColumnBefore().run();
  }
  if (action === "remove-column") {
    return editor.chain().focus().deleteColumn().run();
  }
  if (action === "merge-cells") {
    return editor.chain().focus().mergeCells().run();
  }
  return editor.chain().focus().splitCell().run();
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
  blockIndex,
  data,
  isEditing,
  onUpdate,
  onBlur,
  theme,
}: EditableTableBlockProps) {
  const updateRef = useRef(onUpdate);
  const dataRef = useRef<TableData>(normalizeTableData(data));
  const containerRef = useRef<HTMLDivElement>(null);
  const [editorStateVersion, setEditorStateVersion] = useState(0);
  const setActiveEditor = useTableEditorStore((state) => state.setActiveEditor);
  const clearActiveEditor = useTableEditorStore((state) => state.clearActiveEditor);
  const {
    openMenu,
    ContextMenuPortal,
  } = useContextMenu();

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
      PresentationTable.configure({
        resizable: true,
      }),
      TableRow,
      PresentationTableHeader,
      PresentationTableCell,
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

    const rerender = () => {
      setEditorStateVersion((version) => version + 1);
      syncTableEditorSelectionState(editor);
    };

    editor.on("selectionUpdate", rerender);
    editor.on("transaction", rerender);
    rerender();

    return () => {
      editor.off("selectionUpdate", rerender);
      editor.off("transaction", rerender);
    };
  }, [editor]);

  useEffect(() => {
    if (!editor) return;

    if (isEditing) {
      setActiveEditor(blockIndex, editor);
      syncTableEditorSelectionState(editor);
      return () => clearActiveEditor(blockIndex);
    }

    clearActiveEditor(blockIndex);
  }, [blockIndex, clearActiveEditor, editor, isEditing, setActiveEditor]);

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
    if (!editor) return;
    const normalized = normalizeTableData(data);
    const current = parseTableHtmlToData(editor.getHTML(), normalized);
    if (tableDataEquals(current, normalized)) return;
    editor.commands.setContent(tableDataToHtml(normalized), { emitUpdate: false });
    dataRef.current = normalized;
    syncTableEditorSelectionState(editor);
  }, [data, editor]);

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

  useEffect(() => () => clearActiveEditor(blockIndex), [blockIndex, clearActiveEditor]);

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
      syncTableEditorSelectionState(editor);
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
      syncTableEditorSelectionState(editor);
      editor.commands.focus();
    },
    [editor, runFallbackOperation]
  );

  const handleCellMetaUpdate = useCallback(
    (attributes: Partial<TableCellMeta>) => {
      if (!editor) return;
      updateSelectedCellAttributes(editor, attributes);
      syncTableEditorSelectionState(editor);
    },
    [editor]
  );

  const currentData = useMemo(() => {
    if (!editor) return normalizeTableData(data);
    return parseTableHtmlToData(editor.getHTML(), normalizeTableData(data));
    // editorStateVersion intentionally forces re-parse as editor state changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, editor, editorStateVersion]);

  const themeColors = useMemo(
    () => [
      theme.primaryColor,
      theme.secondaryColor,
      theme.accentColor,
      theme.textColor,
      theme.backgroundColor,
    ],
    [theme]
  );

  const tableCssVars = {
    "--table-header-bg": currentData.tableStyle?.headerBackground ?? `${theme.primaryColor}10`,
    "--table-header-color": currentData.tableStyle?.headerTextColor ?? theme.primaryColor,
    "--table-text-color": theme.textColor,
    "--table-border-color": theme.borderColor ?? `${theme.textColor}22`,
    "--table-border-collapse":
      currentData.tableStyle?.borderCollapse === false ? "separate" : "collapse",
    "--table-stripe-bg": theme.surfaceColor ?? theme.backgroundColor,
  } as CSSProperties;

  const contextItems: ContextMenuItem[] = editor
    ? [
        {
          label: "Merge Cells",
          disabled: !editor.can().mergeCells(),
          onClick: () => handleAction("merge-cells"),
        },
        {
          label: "Split Cell",
          disabled: !editor.can().splitCell(),
          onClick: () => handleAction("split-cell"),
        },
        { label: "divider-cell-color", divider: true, onClick: () => {} },
        {
          label: "Cell Background...",
          submenuContent: (onClose) => (
            <div className="w-[240px] p-1">
              <ColorPicker
                value={useTableEditorStore.getState().selectedCell?.meta.backgroundColor ?? "#FFFFFF"}
                onChange={(color) => {
                  handleCellMetaUpdate({ backgroundColor: color });
                  onClose();
                }}
                themeColors={themeColors}
                placement="right"
              />
            </div>
          ),
        },
        { label: "divider-row-actions", divider: true, onClick: () => {} },
        {
          label: "Insert Row Above",
          disabled: !editor.can().addRowBefore(),
          onClick: () => handleAction("insert-row-above"),
        },
        {
          label: "Insert Row Below",
          disabled: !editor.can().addRowAfter(),
          onClick: () => handleAction("add-row"),
        },
        {
          label: "Insert Column Left",
          disabled: !editor.can().addColumnBefore(),
          onClick: () => handleAction("insert-column-left"),
        },
        {
          label: "Insert Column Right",
          disabled: !editor.can().addColumnAfter(),
          onClick: () => handleAction("add-column"),
        },
        {
          label: "Delete Row",
          disabled: !editor.can().deleteRow(),
          onClick: () => handleAction("remove-row"),
        },
        {
          label: "Delete Column",
          disabled: !editor.can().deleteColumn(),
          onClick: () => handleAction("remove-column"),
        },
      ]
    : [];

  if (!isEditing || !editor) {
    return <TableBlock data={normalizeTableData(data)} theme={theme} />;
  }

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
          className="rounded border border-slate-200 bg-white px-2 py-1 text-[11px] hover:bg-slate-50"
          onClick={() => handleAction("add-column")}
          type="button"
        >
          Add Column
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
      </div>

      <div
        className="h-[calc(100%-2.5rem)] overflow-auto rounded-md border border-slate-200 bg-white/85 p-1 text-[0.65em] [&_.ProseMirror]:min-h-[4.5em] [&_.ProseMirror]:outline-none [&_.ProseMirror_p]:my-0 [&_.selectedCell]:bg-blue-100/60 [&_table]:w-full [&_table]:[border-collapse:var(--table-border-collapse)] [&_td]:border [&_td]:border-[var(--table-border-color)] [&_td]:px-[0.6em] [&_td]:py-[0.35em] [&_td]:text-[var(--table-text-color)] [&_th]:border [&_th]:border-[var(--table-border-color)] [&_th]:bg-[var(--table-header-bg)] [&_th]:px-[0.6em] [&_th]:py-[0.4em] [&_th]:text-left [&_th]:font-semibold [&_th]:text-[var(--table-header-color)]"
        style={tableCssVars}
        onContextMenu={(event) => {
          const target = event.target as HTMLElement;
          if (!target.closest("td, th")) return;
          openMenu(event);
        }}
      >
        <EditorContent editor={editor} />
      </div>

      <ContextMenuPortal items={contextItems} />
    </div>
  );
}

export function applyTableStyleAttributes(
  editor: TiptapEditor,
  attributes: Partial<TableStyleData>
): boolean {
  return updateTableNodeAttributes(editor, attributes);
}

export function applySelectedCellAttributes(
  editor: TiptapEditor,
  attributes: Partial<TableCellMeta>
): boolean {
  return updateSelectedCellAttributes(editor, attributes);
}
