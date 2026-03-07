"use client";

import { memo, type CSSProperties, type ReactNode } from "react";
import type { TableData, ThemeConfig } from "@/types/presentation";
import { buildTableRenderModel } from "@/components/slides/shared/table-data";

interface TableBlockProps {
  data: TableData;
  theme: ThemeConfig;
}

const HTML_TAG_PATTERN = /<\/?[a-z][\s\S]*>/i;

function renderCellContent(value: string): ReactNode {
  if (!value) return null;
  if (!HTML_TAG_PATTERN.test(value)) return value;
  return <span dangerouslySetInnerHTML={{ __html: value }} />;
}

function getDefaultBorderStyles({
  borderColor,
  borderMode,
  totalRowCount,
  rowIndex,
  rowspan,
  columnIndex,
  colspan,
  columnCount,
}: {
  borderColor: string;
  borderMode: "all" | "horizontal" | "none" | "outer";
  totalRowCount: number;
  rowIndex: number;
  rowspan: number;
  columnIndex: number;
  colspan: number;
  columnCount: number;
}): Pick<CSSProperties, "borderTop" | "borderBottom" | "borderLeft" | "borderRight"> {
  const border = `1px solid ${borderColor}`;
  const reachesLastRow = rowIndex + rowspan - 1 >= totalRowCount - 1;
  const reachesLastColumn = columnIndex + colspan - 1 >= columnCount - 1;

  if (borderMode === "none") {
    return {
      borderTop: "none",
      borderBottom: "none",
      borderLeft: "none",
      borderRight: "none",
    };
  }

  if (borderMode === "horizontal") {
    return {
      borderTop: rowIndex === 0 ? border : "none",
      borderBottom: border,
      borderLeft: "none",
      borderRight: "none",
    };
  }

  if (borderMode === "outer") {
    return {
      borderTop: rowIndex === 0 ? border : "none",
      borderBottom: reachesLastRow ? border : "none",
      borderLeft: columnIndex === 0 ? border : "none",
      borderRight: reachesLastColumn ? border : "none",
    };
  }

  return {
    borderTop: border,
    borderBottom: border,
    borderLeft: border,
    borderRight: border,
  };
}

export const TableBlock = memo(function TableBlock({ data, theme }: TableBlockProps) {
  if (!data.headers || data.headers.length === 0) {
    return <div className="text-[0.65em] opacity-40">Empty table</div>;
  }

  const { headerCells, bodyRows, columnCount } = buildTableRenderModel(data);
  const tableStyle = data.tableStyle;
  const borderColor = theme.borderColor ?? `${theme.textColor}22`;
  const headerBackground = tableStyle?.headerBackground ?? `${theme.primaryColor}08`;
  const headerTextColor = tableStyle?.headerTextColor ?? theme.primaryColor;
  const stripedRows = tableStyle?.stripedRows ?? true;
  const borderMode = tableStyle?.borderMode ?? "horizontal";
  const totalRowCount = bodyRows.length + 1;
  const stripeBackground = theme.surfaceColor ?? theme.backgroundColor;

  return (
    <div className="w-full overflow-auto">
      <table
        className="w-full text-[0.65em]"
        style={{ borderCollapse: tableStyle?.borderCollapse === false ? "separate" : "collapse" }}
      >
        <thead>
          <tr>
            {headerCells.map((cell) => {
              const defaultBorders = getDefaultBorderStyles({
                borderColor,
                borderMode,
                totalRowCount,
                rowIndex: 0,
                rowspan: cell.rowspan,
                columnIndex: cell.columnIndex,
                colspan: cell.colspan,
                columnCount,
              });
              const style: CSSProperties = {
                padding: "0.4em 0.6em",
                textAlign: cell.meta.textAlign ?? "left",
                fontWeight: cell.meta.fontWeight ?? "bold",
                color: cell.meta.textColor ?? headerTextColor,
                backgroundColor: cell.meta.backgroundColor ?? headerBackground,
                ...defaultBorders,
                borderTop: cell.meta.borderTop ?? defaultBorders.borderTop,
                borderBottom: cell.meta.borderBottom ?? defaultBorders.borderBottom,
                borderLeft: cell.meta.borderLeft ?? defaultBorders.borderLeft,
                borderRight: cell.meta.borderRight ?? defaultBorders.borderRight,
              };

              return (
                <th
                  key={cell.key}
                  colSpan={cell.colspan > 1 ? cell.colspan : undefined}
                  rowSpan={cell.rowspan > 1 ? cell.rowspan : undefined}
                  className="align-top"
                  style={style}
                >
                  {renderCellContent(cell.value)}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {bodyRows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell) => {
                const defaultBorders = getDefaultBorderStyles({
                  borderColor,
                  borderMode,
                  totalRowCount,
                  rowIndex: rowIndex + 1,
                  rowspan: cell.rowspan,
                  columnIndex: cell.columnIndex,
                  colspan: cell.colspan,
                  columnCount,
                });
                const style: CSSProperties = {
                  padding: "0.3em 0.6em",
                  verticalAlign: "top",
                  color: cell.meta.textColor ?? theme.textColor,
                  textAlign: cell.meta.textAlign ?? "left",
                  fontWeight: cell.meta.fontWeight ?? "normal",
                  backgroundColor:
                    cell.meta.backgroundColor ??
                    (stripedRows && rowIndex % 2 === 1 ? stripeBackground : undefined),
                  ...defaultBorders,
                  borderTop: cell.meta.borderTop ?? defaultBorders.borderTop,
                  borderBottom: cell.meta.borderBottom ?? defaultBorders.borderBottom,
                  borderLeft: cell.meta.borderLeft ?? defaultBorders.borderLeft,
                  borderRight: cell.meta.borderRight ?? defaultBorders.borderRight,
                };

                return (
                  <td
                    key={cell.key}
                    colSpan={cell.colspan > 1 ? cell.colspan : undefined}
                    rowSpan={cell.rowspan > 1 ? cell.rowspan : undefined}
                    style={style}
                  >
                    {renderCellContent(cell.value)}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});
