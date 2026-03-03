"use client";

import type { ThemeConfig } from "@/types/presentation";

interface TableBlockProps {
  data: { headers: string[]; rows: string[][] };
  theme: ThemeConfig;
}

export function TableBlock({ data, theme }: TableBlockProps) {
  if (!data.headers || data.headers.length === 0) {
    return <div className="text-[0.65em] opacity-40">Empty table</div>;
  }

  return (
    <div className="w-full overflow-auto">
      <table className="w-full border-collapse text-[0.65em]">
        <thead>
          <tr>
            {data.headers.map((h, i) => (
              <th
                key={i}
                className="px-[0.6em] py-[0.4em] text-left font-semibold border-b-2"
                style={{
                  borderColor: theme.primaryColor,
                  color: theme.primaryColor,
                  backgroundColor: `${theme.primaryColor}08`,
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row, ri) => (
            <tr
              key={ri}
              className="border-b"
              style={{
                borderColor: theme.borderColor ?? `${theme.textColor}15`,
                backgroundColor: ri % 2 === 1 ? `${theme.surfaceColor ?? theme.backgroundColor}` : undefined,
              }}
            >
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  className="px-[0.6em] py-[0.3em]"
                  style={{ color: theme.textColor }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
