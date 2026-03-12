// @vitest-environment jsdom

import { act, createElement } from "react";
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { createRoot } from "react-dom/client";
import { useStudioDocument } from "../use-studio-document";

vi.mock("@/lib/actions/documents", () => ({
  loadStudioDocument: vi.fn(),
  saveDocumentContent: vi.fn(),
  updateDocumentTitle: vi.fn(),
  listUserProjects: vi.fn(),
}));

import {
  loadStudioDocument,
  listUserProjects,
  updateDocumentTitle,
} from "@/lib/actions/documents";

type HookState = ReturnType<typeof useStudioDocument>;

let latestState: HookState | null = null;

function HookProbe({ initialProjectId }: { initialProjectId?: number | null }) {
  latestState = useStudioDocument(initialProjectId);
  return null;
}

function renderHook(initialProjectId?: number | null) {
  const host = document.createElement("div");
  document.body.appendChild(host);
  const root = createRoot(host);

  act(() => {
    root.render(createElement(HookProbe, { initialProjectId }));
  });

  return {
    cleanup: () => {
      act(() => {
        root.unmount();
      });
      host.remove();
      latestState = null;
    },
  };
}

async function flushEffects() {
  await act(async () => {
    await Promise.resolve();
  });
}

beforeAll(() => {
  (
    globalThis as typeof globalThis & {
      IS_REACT_ACT_ENVIRONMENT?: boolean;
    }
  ).IS_REACT_ACT_ENVIRONMENT = true;
});

afterAll(() => {
  (
    globalThis as typeof globalThis & {
      IS_REACT_ACT_ENVIRONMENT?: boolean;
    }
  ).IS_REACT_ACT_ENVIRONMENT = false;
});

beforeEach(() => {
  vi.clearAllMocks();
  latestState = null;
});

afterEach(() => {
  vi.useRealTimers();
  document.body.innerHTML = "";
});

describe("useStudioDocument", () => {
  it("keeps the untitled default title and surfaces the no-document load error", async () => {
    vi.mocked(listUserProjects).mockResolvedValue([]);
    vi.mocked(loadStudioDocument).mockResolvedValue(
      null as unknown as Awaited<ReturnType<typeof loadStudioDocument>>
    );

    const { cleanup } = renderHook();

    expect(latestState?.docTitle).toBe("Untitled Document");

    await flushEffects();

    expect(latestState?.docTitle).toBe("Untitled Document");
    expect(latestState?.error).toBe("Failed to load or create document.");

    cleanup();
  });

  it("logs and surfaces the generic load error for non-DATABASE_URL failures", async () => {
    const error = new Error("network down");
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});

    vi.mocked(listUserProjects).mockResolvedValue([]);
    vi.mocked(loadStudioDocument).mockRejectedValue(error);

    const { cleanup } = renderHook();

    await flushEffects();

    expect(latestState?.error).toBe("Failed to load document. Please try again.");
    expect(consoleError).toHaveBeenCalledWith("Failed to load document:", error);

    consoleError.mockRestore();
    cleanup();
  });

  it("re-fetches projects after first load and clears the title save timer on unmount", async () => {
    vi.useFakeTimers();

    vi.mocked(listUserProjects)
      .mockResolvedValueOnce([{ id: 1, title: "Initial project" }])
      .mockResolvedValueOnce([{ id: 2, title: "Created during load" }]);
    vi.mocked(loadStudioDocument).mockResolvedValue({
      id: 10,
      project_id: 2,
      title: "Loaded title",
      document_type: "academic_draft",
      overall_status: "draft",
      sections: [],
    } as Awaited<ReturnType<typeof loadStudioDocument>>);

    const { cleanup } = renderHook();

    await flushEffects();
    await flushEffects();

    expect(listUserProjects).toHaveBeenCalledTimes(2);
    expect(latestState?.projects).toEqual([{ id: 2, title: "Created during load" }]);
    expect(latestState?.selectedProjectId).toBe(2);

    act(() => {
      latestState?.setDocTitle("Renamed title");
    });

    cleanup();

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(updateDocumentTitle).not.toHaveBeenCalled();
  });
});
