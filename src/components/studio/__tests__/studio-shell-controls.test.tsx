// @vitest-environment jsdom

import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ProjectSelector } from "../ProjectSelector";
import { SaveIndicator } from "../SaveIndicator";
import { ProgressBar } from "@/components/ui/progress-bar";

describe("ProjectSelector", () => {
  let container: HTMLDivElement | null = null;
  let root: Root | null = null;

  afterEach(() => {
    act(() => {
      root?.unmount();
    });
    container?.remove();
    container = null;
    root = null;
    vi.clearAllMocks();
  });

  function renderProjectSelector(onSelect = vi.fn()) {
    if (!container) {
      container = document.createElement("div");
      document.body.appendChild(container);
      root = createRoot(container);
    }

    act(() => {
      root?.render(
        <ProjectSelector
          projects={[
            { id: 1, title: "Alpha Project" },
            { id: 2, title: "Beta Project" },
          ]}
          selectedId={1}
          onSelect={onSelect}
        />
      );
    });

    return onSelect;
  }

  it("closes the dropdown and calls onSelect when a project row is clicked", () => {
    const onSelect = renderProjectSelector();

    const trigger = Array.from(document.querySelectorAll("button")).find(
      (button) => button.textContent?.includes("Alpha Project")
    );

    act(() => {
      trigger?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    const betaRow = Array.from(document.querySelectorAll("button")).find(
      (button) => button.textContent?.trim() === "Beta Project"
    );

    expect(betaRow).toBeTruthy();

    act(() => {
      betaRow?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(onSelect).toHaveBeenCalledWith(2);
    expect(
      Array.from(document.querySelectorAll("button")).some(
        (button) => button.textContent?.trim() === "Beta Project"
      )
    ).toBe(false);
  });

  it("uses the fallback label and closes on outside mousedown", () => {
    if (!container) {
      container = document.createElement("div");
      document.body.appendChild(container);
      root = createRoot(container);
    }

    act(() => {
      root?.render(
        <ProjectSelector
          projects={[
            { id: 1, title: "Alpha Project" },
            { id: 2, title: "Beta Project" },
          ]}
          selectedId={999}
          onSelect={vi.fn()}
        />
      );
    });

    const trigger = Array.from(document.querySelectorAll("button")).find(
      (button) => button.textContent?.includes("Select project")
    );

    expect(trigger).toBeTruthy();

    act(() => {
      trigger?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(document.body.textContent).toContain("Alpha Project");
    expect(document.body.textContent).toContain("Beta Project");

    act(() => {
      document.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
    });

    expect(
      Array.from(document.querySelectorAll("button")).some(
        (button) => button.textContent?.trim() === "Beta Project"
      )
    ).toBe(false);
  });
});

describe("SaveIndicator", () => {
  let container: HTMLDivElement | null = null;
  let root: Root | null = null;

  afterEach(() => {
    act(() => {
      root?.unmount();
    });
    container?.remove();
    container = null;
    root = null;
  });

  function renderIndicator(status: Parameters<typeof SaveIndicator>[0]["status"], lastSavedAt: Date | null) {
    if (!container) {
      container = document.createElement("div");
      document.body.appendChild(container);
      root = createRoot(container);
    }

    act(() => {
      root?.render(<SaveIndicator status={status} lastSavedAt={lastSavedAt} />);
    });
  }

  it("renders the spec strings for saving, unsaved, error, and idle-with-timestamp", () => {
    const date = new Date("2026-03-12T01:35:00.000Z");

    renderIndicator("saving", null);
    expect(document.body.textContent).toContain("Saving...");

    renderIndicator("unsaved", null);
    expect(document.body.textContent).toContain("Unsaved changes");

    renderIndicator("error", null);
    expect(document.body.textContent).toContain("Save failed");

    renderIndicator("idle", date);
    expect(document.body.textContent).toContain("Saved");
  });
});

describe("ProgressBar", () => {
  let container: HTMLDivElement | null = null;
  let root: Root | null = null;

  afterEach(() => {
    act(() => {
      root?.unmount();
    });
    container?.remove();
    container = null;
    root = null;
  });

  it("supports exact text formatting for studio AI credits", () => {
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);

    act(() => {
      root?.render(
        <ProgressBar
          value={0}
          max={50000}
          label="AI Credits"
        />
      );
    });

    expect(document.body.textContent).toContain("AI Credits");
    expect(document.body.textContent).toContain("0 / 50000");
  });
});
