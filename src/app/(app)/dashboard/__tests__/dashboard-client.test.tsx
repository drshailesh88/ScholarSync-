// @vitest-environment jsdom

import { act } from "react";
import type { ComponentPropsWithoutRef } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createRoot, type Root } from "react-dom/client";
import DashboardClient from "../dashboard-client";
import { LOCAL_DOCUMENT_MIGRATION_FLAG } from "../dashboard-client-helpers";

const migrateLocalDocumentsMock = vi.fn();

vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    ...props
  }: ComponentPropsWithoutRef<"a"> & { href: string }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

vi.mock("@/lib/editor/migrate-local-documents", () => ({
  migrateLocalDocuments: (...args: unknown[]) => migrateLocalDocumentsMock(...args),
}));

describe("DashboardClient", () => {
  let container: HTMLDivElement | null = null;
  let root: Root | null = null;

  beforeEach(() => {
    migrateLocalDocumentsMock.mockReset();
    localStorage.clear();
  });

  afterEach(() => {
    act(() => {
      root?.unmount();
    });
    container?.remove();
    container = null;
    root = null;
    localStorage.clear();
    vi.restoreAllMocks();
  });

  function renderDashboard() {
    if (!container) {
      container = document.createElement("div");
      document.body.appendChild(container);
      root = createRoot(container);
    }

    act(() => {
      root?.render(
        <DashboardClient
          recentProjects={[
            {
              id: 42,
              title: "Project Alpha",
              status: "drafting",
              project_type: "review_article",
              updated_at: new Date("2026-03-10T00:00:00.000Z"),
            },
          ]}
          stats={{
            projectCount: 1,
            paperCount: 0,
            searchCount: 0,
            conversationCount: 0,
            tokensUsed: 0,
            tokensLimit: 10000,
            plagiarismChecksUsed: 0,
            exportsUsed: 0,
            plan: "free",
            totalProjects: 1,
            totalSearches: 0,
          }}
          recentSearches={[]}
          recentActivity={[]}
        />
      );
    });
  }

  it("migrates stored local documents once and marks completion", async () => {
    migrateLocalDocumentsMock.mockResolvedValue(1);
    localStorage.setItem(
      "scholarsync_doc_local-1",
      JSON.stringify({
        content: { type: "doc", content: [] },
        plainText: "Offline draft",
        wordCount: 12,
        title: "Offline draft",
        documentType: "review_article",
        timestamp: 100,
      })
    );

    renderDashboard();

    await act(async () => {
      await Promise.resolve();
    });

    expect(migrateLocalDocumentsMock).toHaveBeenCalledWith([
      expect.objectContaining({
        documentId: "local-1",
        key: "scholarsync_doc_local-1",
        data: expect.objectContaining({
          plainText: "Offline draft",
          title: "Offline draft",
        }),
      }),
    ]);
    expect(localStorage.getItem(LOCAL_DOCUMENT_MIGRATION_FLAG)).toBe("true");
  });

  it("skips migration when the dashboard flag is already set", async () => {
    localStorage.setItem(LOCAL_DOCUMENT_MIGRATION_FLAG, "true");
    localStorage.setItem(
      "scholarsync_doc_local-1",
      JSON.stringify({ content: { type: "doc", content: [] } })
    );

    renderDashboard();

    await act(async () => {
      await Promise.resolve();
    });

    expect(migrateLocalDocumentsMock).not.toHaveBeenCalled();
  });

  it("renders recent project rows as links", () => {
    renderDashboard();

    const projectLink = Array.from(document.querySelectorAll("a")).find((element) =>
      element.textContent?.includes("Project Alpha")
    );

    expect(projectLink?.getAttribute("href")).toBe("/studio?projectId=42");
  });
});
