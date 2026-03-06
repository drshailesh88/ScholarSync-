// @vitest-environment jsdom

import { describe, expect, it, vi } from "vitest";
import type { Editor as TiptapEditor } from "@tiptap/core";
import {
  applyTableDataOperation,
  handleTableEditingKeyDown,
  parseTableHtmlToData,
  runTableToolbarCommand,
  tableDataToHtml,
} from "../editable-table-block";

function makeCommandChain(runResult = true) {
  const chain = {
    focus: vi.fn(),
    addRowAfter: vi.fn(),
    deleteRow: vi.fn(),
    addColumnAfter: vi.fn(),
    deleteColumn: vi.fn(),
    mergeCells: vi.fn(),
    splitCell: vi.fn(),
    toggleHeaderRow: vi.fn(),
    toggleBold: vi.fn(),
    toggleItalic: vi.fn(),
    goToNextCell: vi.fn(),
    run: vi.fn(() => runResult),
  };

  chain.focus.mockReturnValue(chain);
  chain.addRowAfter.mockReturnValue(chain);
  chain.deleteRow.mockReturnValue(chain);
  chain.addColumnAfter.mockReturnValue(chain);
  chain.deleteColumn.mockReturnValue(chain);
  chain.mergeCells.mockReturnValue(chain);
  chain.splitCell.mockReturnValue(chain);
  chain.toggleHeaderRow.mockReturnValue(chain);
  chain.toggleBold.mockReturnValue(chain);
  chain.toggleItalic.mockReturnValue(chain);
  chain.goToNextCell.mockReturnValue(chain);

  return chain;
}

describe("EditableTableBlock helpers", () => {
  it("renders the expected number of rows and columns in generated table HTML", () => {
    const html = tableDataToHtml({
      headers: ["A", "B", "C"],
      rows: [
        ["1", "2", "3"],
        ["4", "5", "6"],
      ],
    });

    const doc = new DOMParser().parseFromString(html, "text/html");
    expect(doc.querySelectorAll("thead th")).toHaveLength(3);
    expect(doc.querySelectorAll("tbody tr")).toHaveLength(2);
    expect(doc.querySelectorAll("tbody td")).toHaveLength(6);
  });

  it("parses edited cell content back into the table data model", () => {
    const editedHtml = `
      <table>
        <thead>
          <tr><th><p>Header 1</p></th><th><p>Header 2</p></th></tr>
        </thead>
        <tbody>
          <tr><td><p><strong>Updated</strong></p></td><td><p>Cell B</p></td></tr>
        </tbody>
      </table>
    `;

    const parsed = parseTableHtmlToData(editedHtml);
    expect(parsed.headers).toEqual(["Header 1", "Header 2"]);
    expect(parsed.rows).toEqual([["<strong>Updated</strong>", "Cell B"]]);
  });

  it("add row operation increases row count", () => {
    const next = applyTableDataOperation(
      {
        headers: ["A", "B"],
        rows: [["1", "2"]],
      },
      "add-row"
    );

    expect(next.rows).toHaveLength(2);
    expect(next.rows[1]).toEqual(["", ""]);
  });

  it("add column operation increases column count", () => {
    const next = applyTableDataOperation(
      {
        headers: ["A", "B"],
        rows: [["1", "2"]],
      },
      "add-column"
    );

    expect(next.headers).toHaveLength(3);
    expect(next.rows[0]).toHaveLength(3);
  });

  it("merge cells operation dispatches the merge command", () => {
    const chain = makeCommandChain(true);
    const editor = {
      chain: vi.fn(() => chain),
    } as unknown as TiptapEditor;

    const merged = runTableToolbarCommand(editor, "merge-cells");
    expect(merged).toBe(true);
    expect(chain.mergeCells).toHaveBeenCalledTimes(1);
  });

  it("Tab navigation moves between cells", () => {
    const chain = makeCommandChain(true);
    const goToNextCell = vi.fn(() => true);
    const goToPreviousCell = vi.fn(() => true);
    const editor = {
      commands: {
        goToNextCell,
        goToPreviousCell,
      },
      can: vi.fn(() => ({
        addRowAfter: vi.fn(() => true),
      })),
      chain: vi.fn(() => chain),
    } as unknown as TiptapEditor;

    const tabEvent = new KeyboardEvent("keydown", { key: "Tab", cancelable: true });
    const tabHandled = handleTableEditingKeyDown(tabEvent, editor);
    expect(tabHandled).toBe(true);
    expect(tabEvent.defaultPrevented).toBe(true);
    expect(goToNextCell).toHaveBeenCalledTimes(1);

    const shiftTabEvent = new KeyboardEvent("keydown", {
      key: "Tab",
      shiftKey: true,
      cancelable: true,
    });
    const shiftTabHandled = handleTableEditingKeyDown(shiftTabEvent, editor);
    expect(shiftTabHandled).toBe(true);
    expect(shiftTabEvent.defaultPrevented).toBe(true);
    expect(goToPreviousCell).toHaveBeenCalledTimes(1);
  });
});
