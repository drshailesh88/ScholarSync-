// @vitest-environment jsdom

import { act } from "react";
import { createElement, type ReactNode } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import { PRESET_THEMES, type TableData } from "@/types/presentation";
import { parseTableHtmlToData } from "@/components/slides/wysiwyg/editable-table-block";
import { TableBlock } from "../table-block";

function render(ui: ReactNode) {
  const host = document.createElement("div");
  document.body.appendChild(host);
  const root: Root = createRoot(host);

  act(() => {
    root.render(ui);
  });

  return {
    host,
    cleanup: () => {
      act(() => {
        root.unmount();
      });
      host.remove();
    },
  };
}

afterEach(() => {
  document.body.innerHTML = "";
});

beforeAll(() => {
  (globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
});

afterAll(() => {
  (globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = false;
});

describe("TableBlock merged cells and formatting", () => {
  it("applies colspan metadata to rendered cells", () => {
    const data: TableData = {
      headers: ["H1", "H2", "H3"],
      rows: [["Merged", "", "Tail"]],
      cellMeta: {
        "0-0": { colspan: 2 },
      },
    };

    const { host, cleanup } = render(
      createElement(TableBlock, { data, theme: PRESET_THEMES.modern })
    );
    const mergedCell = host.querySelector("tbody td");

    expect(mergedCell?.getAttribute("colspan")).toBe("2");
    cleanup();
  });

  it("applies rowspan metadata to rendered cells", () => {
    const data: TableData = {
      headers: ["H1", "H2"],
      rows: [
        ["Merged", "A"],
        ["", "B"],
      ],
      cellMeta: {
        "0-0": { rowspan: 2 },
      },
    };

    const { host, cleanup } = render(
      createElement(TableBlock, { data, theme: PRESET_THEMES.modern })
    );
    const mergedCell = host.querySelector("tbody td");

    expect(mergedCell?.getAttribute("rowspan")).toBe("2");
    cleanup();
  });

  it("renders per-cell background colors as inline styles", () => {
    const data: TableData = {
      headers: ["H1"],
      rows: [["A"]],
      cellMeta: {
        "0-0": { backgroundColor: "rgb(10, 20, 30)" },
      },
    };

    const { host, cleanup } = render(
      createElement(TableBlock, { data, theme: PRESET_THEMES.modern })
    );
    const cell = host.querySelector("tbody td");

    expect(cell).not.toBeNull();
    expect((cell as HTMLTableCellElement).style.backgroundColor).toBe("rgb(10, 20, 30)");
    cleanup();
  });

  it("applies striped row backgrounds", () => {
    const data: TableData = {
      headers: ["H1"],
      rows: [["Row 1"], ["Row 2"]],
      tableStyle: {
        stripedRows: true,
      },
    };

    const { host, cleanup } = render(
      createElement(TableBlock, { data, theme: PRESET_THEMES.modern })
    );
    const bodyRows = host.querySelectorAll("tbody tr");
    const firstRowCell = bodyRows[0]?.querySelector("td") as HTMLTableCellElement | null;
    const secondRowCell = bodyRows[1]?.querySelector("td") as HTMLTableCellElement | null;

    expect(firstRowCell?.style.backgroundColor).toBe("");
    expect(secondRowCell?.style.backgroundColor).toBe("rgb(248, 250, 252)");
    cleanup();
  });

  it("applies custom header background color", () => {
    const data: TableData = {
      headers: ["H1"],
      rows: [["Row 1"]],
      tableStyle: {
        headerBackground: "rgb(44, 55, 66)",
      },
    };

    const { host, cleanup } = render(
      createElement(TableBlock, { data, theme: PRESET_THEMES.modern })
    );
    const header = host.querySelector("thead th") as HTMLTableCellElement | null;

    expect(header?.style.backgroundColor).toBe("rgb(44, 55, 66)");
    cleanup();
  });

  it("serializes merged 2x2 cells into cellMeta", () => {
    const parsed = parseTableHtmlToData(`
      <table>
        <thead>
          <tr>
            <th><p>H1</p></th>
            <th><p>H2</p></th>
            <th><p>H3</p></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colspan="2" rowspan="2" style="background-color: rgb(10, 20, 30); text-align: center; font-weight: bold;"><p>Merged</p></td>
            <td><p>Tail A</p></td>
          </tr>
          <tr>
            <td><p>Tail B</p></td>
          </tr>
        </tbody>
      </table>
    `);

    expect(parsed.rows).toEqual([
      ["Merged", "", "Tail A"],
      ["", "", "Tail B"],
    ]);
    expect(parsed.cellMeta).toEqual({
      "0-0": {
        backgroundColor: "rgb(10, 20, 30)",
        colspan: 2,
        fontWeight: "bold",
        rowspan: 2,
        textAlign: "center",
      },
    });
  });

  it("cleans up merge metadata after split", () => {
    const fallback: TableData = {
      headers: ["H1", "H2"],
      rows: [
        ["Merged", ""],
        ["", ""],
      ],
      cellMeta: {
        "0-0": { colspan: 2, rowspan: 2 },
      },
    };

    const parsed = parseTableHtmlToData(`
      <table>
        <thead>
          <tr>
            <th><p>H1</p></th>
            <th><p>H2</p></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><p>A</p></td>
            <td><p>B</p></td>
          </tr>
          <tr>
            <td><p>C</p></td>
            <td><p>D</p></td>
          </tr>
        </tbody>
      </table>
    `, fallback);

    expect(parsed.rows).toEqual([
      ["A", "B"],
      ["C", "D"],
    ]);
    expect(parsed.cellMeta).toBeUndefined();
  });
});
