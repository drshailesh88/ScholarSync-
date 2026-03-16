// @vitest-environment jsdom

import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useEffect } from "react";
import {
  useStudioDocument,
  type SaveStatus,
} from "../use-studio-document";

const actionsMock = vi.hoisted(() => ({
  loadStudioDocument: vi.fn(),
  saveDocumentContent: vi.fn(),
  updateDocumentTitle: vi.fn(),
  listUserProjects: vi.fn(),
}));

vi.mock("@/lib/actions/documents", () => ({
  loadStudioDocument: actionsMock.loadStudioDocument,
  saveDocumentContent: actionsMock.saveDocumentContent,
  updateDocumentTitle: actionsMock.updateDocumentTitle,
  listUserProjects: actionsMock.listUserProjects,
}));

interface StudioHarnessState {
  saveStatus: SaveStatus;
  lastSavedAt: Date | null;
  markUnsaved: () => void;
  activeSectionId: number | null;
  initialContent: Record<string, unknown> | null;
  documentId: number | null;
  selectProject: (projectId: number) => void;
  handleEditorUpdate: (data: {
    editor_content: Record<string, unknown>;
    plain_text_content: string;
    word_count: number;
  }) => void;
}

function createDeferred<T>() {
  let resolve!: (value: T) => void;
  let reject!: (reason?: unknown) => void;
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
}

function HookHarness({
  onChange,
}: {
  onChange: (state: StudioHarnessState) => void;
}) {
  const studio = useStudioDocument(null);

  useEffect(() => {
    onChange({
      saveStatus: studio.saveStatus,
      lastSavedAt: studio.lastSavedAt,
      activeSectionId: studio.activeSectionId,
      initialContent: studio.initialContent,
      documentId: studio.document?.id ?? null,
      selectProject: studio.selectProject,
      markUnsaved: studio.markUnsaved,
      handleEditorUpdate: studio.handleEditorUpdate,
    });
  }, [onChange, studio]);

  return null;
}

describe("useStudioDocument", () => {
  let container: HTMLDivElement | null = null;
  let root: Root | null = null;
  let latestState: StudioHarnessState | null = null;

  beforeEach(() => {
    latestState = null;
    actionsMock.loadStudioDocument.mockReset();
    actionsMock.saveDocumentContent.mockReset();
    actionsMock.updateDocumentTitle.mockReset();
    actionsMock.listUserProjects.mockReset();

    actionsMock.listUserProjects.mockResolvedValue([]);
    actionsMock.loadStudioDocument.mockResolvedValue({
      id: 3,
      project_id: 9,
      title: "Studio Draft",
      updated_at: "2026-03-12T03:15:00.000Z",
      sections: [
        {
          id: 4,
          document_id: 3,
          section_type: null,
          title: null,
          sort_order: 0,
          editor_content: { type: "doc", content: [] },
          plain_text_content: "",
          word_count: 0,
        },
      ],
    });
  });

  afterEach(() => {
    act(() => {
      root?.unmount();
    });
    container?.remove();
    container = null;
    root = null;
    vi.clearAllMocks();
  });

  async function renderHook() {
    if (!container) {
      container = document.createElement("div");
      document.body.appendChild(container);
      root = createRoot(container);
    }

    await act(async () => {
      root?.render(
        <HookHarness
          onChange={(state) => {
            latestState = state;
          }}
        />
      );
      await Promise.resolve();
      await Promise.resolve();
    });
  }

  it("marks the studio draft as unsaved immediately when dirty", async () => {
    await renderHook();

    expect(latestState?.saveStatus).toBe("idle");
    expect(latestState?.lastSavedAt?.toISOString()).toBe("2026-03-12T03:15:00.000Z");

    act(() => {
      latestState?.markUnsaved();
    });

    expect(latestState?.saveStatus).toBe("unsaved");
  });

  it("keeps status unsaved when an older save resolves after a newer edit", async () => {
    const deferred = createDeferred<{ updatedAt: Date; sectionId: number }>();
    actionsMock.saveDocumentContent.mockReturnValue(deferred.promise);

    await renderHook();

    act(() => {
      latestState?.markUnsaved();
      latestState?.handleEditorUpdate({
        editor_content: { type: "doc", content: [] },
        plain_text_content: "draft",
        word_count: 1,
      });
    });

    expect(latestState?.saveStatus).toBe("saving");

    act(() => {
      latestState?.markUnsaved();
    });

    expect(latestState?.saveStatus).toBe("unsaved");

    await act(async () => {
      deferred.resolve({
        updatedAt: new Date("2026-03-12T01:45:00.000Z"),
        sectionId: 4,
      });
      await Promise.resolve();
    });

    expect(latestState?.saveStatus).toBe("unsaved");
  });

  it("clears stale document state before loading a newly selected project", async () => {
    const deferred = createDeferred<{
      id: number;
      project_id: number;
      title: string;
      updated_at: string;
      sections: Array<{
        id: number;
        document_id: number;
        section_type: null;
        title: null;
        sort_order: number;
        editor_content: Record<string, unknown>;
        plain_text_content: string;
        word_count: number;
      }>;
    }>();

    actionsMock.loadStudioDocument
      .mockResolvedValueOnce({
        id: 3,
        project_id: 9,
        title: "Studio Draft",
        updated_at: "2026-03-12T03:15:00.000Z",
        sections: [
          {
            id: 4,
            document_id: 3,
            section_type: null,
            title: null,
            sort_order: 0,
            editor_content: { type: "doc", content: [{ type: "paragraph" }] },
            plain_text_content: "",
            word_count: 0,
          },
        ],
      })
      .mockReturnValueOnce(deferred.promise);

    await renderHook();

    expect(latestState?.documentId).toBe(3);
    expect(latestState?.activeSectionId).toBe(4);
    expect(latestState?.initialContent).toEqual({
      type: "doc",
      content: [{ type: "paragraph" }],
    });

    act(() => {
      latestState?.markUnsaved();
      latestState?.selectProject(12);
    });

    expect(latestState?.documentId).toBeNull();
    expect(latestState?.activeSectionId).toBeNull();
    expect(latestState?.initialContent).toBeNull();
    expect(latestState?.saveStatus).toBe("idle");

    await act(async () => {
      deferred.resolve({
        id: 8,
        project_id: 12,
        title: "Replacement Draft",
        updated_at: "2026-03-12T04:00:00.000Z",
        sections: [
          {
            id: 11,
            document_id: 8,
            section_type: null,
            title: null,
            sort_order: 0,
            editor_content: { type: "doc", content: [] },
            plain_text_content: "",
            word_count: 0,
          },
        ],
      });
      await Promise.resolve();
    });

    expect(latestState?.documentId).toBe(8);
    expect(latestState?.activeSectionId).toBe(11);
    expect(latestState?.saveStatus).toBe("idle");
  });
});
