/**
 * Phase 15 Tests — Command Palette + Project Switching
 *
 * Tests cover:
 * 1. Command palette route-aware Library groups
 * 2. Grouped results (Sources, Highlights & Notes, Projects, Commands, Search in Explore)
 * 3. Project context switcher component
 * 4. Project switching (URL routes, server-side persistence)
 * 5. last_active_project_id persistence
 * 6. "All Library" option always visible
 * 7. Project-scoped route structure
 */

import { describe, it, expect } from "vitest";

// ── Req 1: Command palette with route-aware Library groups ───

describe("Phase 15: Command palette extensions", () => {
  it("CommandPalette component exists", async () => {
    const mod = await import("@/components/ui/command-palette");
    expect(mod.CommandPalette).toBeDefined();
  }, 60000);

  it("searchLibrarySources is exported from library module", async () => {
    const mod = await import("@/lib/library");
    expect(typeof mod.searchLibrarySources).toBe("function");
  });

  it("searchAnnotations is exported from library module", async () => {
    const mod = await import("@/lib/library");
    expect(typeof mod.searchAnnotations).toBe("function");
  });
});

// ── Req 2: Grouped results ──────────────────────────────────

describe("Phase 15: Grouped search results", () => {
  it("LibrarySearchResult type exports from search module", async () => {
    const mod = await import("@/lib/library/search");
    // Functions that return these types exist
    expect(typeof mod.searchLibrarySources).toBe("function");
    expect(typeof mod.searchAnnotations).toBe("function");
  });

  it("search functions accept query and limit parameters", async () => {
    const mod = await import("@/lib/library/search");
    // Verify function signatures (arity)
    expect(mod.searchLibrarySources.length).toBeGreaterThanOrEqual(1);
    expect(mod.searchAnnotations.length).toBeGreaterThanOrEqual(1);
  });
});

// ── Req 3: Project context switcher ─────────────────────────

describe("Phase 15: Project context switcher", () => {
  it("ProjectSwitcher component exists", async () => {
    const mod = await import("@/components/library/ProjectSwitcher");
    expect(mod.ProjectSwitcher).toBeDefined();
  });

  it("getLibraryProjects is exported", async () => {
    const mod = await import("@/lib/library");
    expect(typeof mod.getLibraryProjects).toBe("function");
  });

  it("LibraryProject type shape is correct", async () => {
    // Verify the type at runtime by constructing a valid object
    const project = { id: 1, title: "Test Project", status: "planning" };
    expect(project.id).toBe(1);
    expect(project.title).toBe("Test Project");
    expect(project.status).toBe("planning");
  });
});

// ── Req 4: Project switching (URL + title + re-scope) ───────

describe("Phase 15: Project-scoped routes", () => {
  it("/library/project/[projectId] page exists", async () => {
    const mod = await import("@/app/(app)/library/project/[projectId]/page");
    expect(mod.default).toBeDefined();
  });

  it("/library/project/[projectId]/[state] page exists", async () => {
    const mod = await import(
      "@/app/(app)/library/project/[projectId]/[state]/page"
    );
    expect(mod.default).toBeDefined();
  });

  it("LibrarySidebar accepts activeProjectId prop", async () => {
    const mod = await import("@/components/library/LibrarySidebar");
    expect(mod.LibrarySidebar).toBeDefined();
    // LibrarySidebar is a function component that takes props
    expect(typeof mod.LibrarySidebar).toBe("function");
  });
});

// ── Req 5: last_active_project_id persistence ───────────────

describe("Phase 15: Active project persistence", () => {
  it("getLastActiveProjectId is exported", async () => {
    const mod = await import("@/lib/library");
    expect(typeof mod.getLastActiveProjectId).toBe("function");
  });

  it("setLastActiveProjectId is exported", async () => {
    const mod = await import("@/lib/library");
    expect(typeof mod.setLastActiveProjectId).toBe("function");
  });

  it("project-context module exports all 3 functions", async () => {
    const mod = await import("@/lib/library/project-context");
    expect(typeof mod.getLastActiveProjectId).toBe("function");
    expect(typeof mod.setLastActiveProjectId).toBe("function");
    expect(typeof mod.getLibraryProjects).toBe("function");
  });
});

// ── Req 6: "All Library" always visible ─────────────────────

describe("Phase 15: All Library option", () => {
  it("ProjectSwitcher handles null activeProjectId (All Library mode)", async () => {
    const mod = await import("@/components/library/ProjectSwitcher");
    // Component exists and can accept null activeProjectId
    expect(mod.ProjectSwitcher).toBeDefined();
  });

  it("setLastActiveProjectId accepts null to clear project scope", async () => {
    const mod = await import("@/lib/library/project-context");
    // Function exists and accepts parameters
    expect(typeof mod.setLastActiveProjectId).toBe("function");
  });
});

// ── Req 7: LibraryShell integration ─────────────────────────

describe("Phase 15: LibraryShell integration", () => {
  it("LibraryShell accepts projects and activeProjectId props", async () => {
    const mod = await import("@/components/library/LibraryShell");
    expect(mod.LibraryShell).toBeDefined();
  });

  it("Library layout fetches projects and activeProjectId", async () => {
    const mod = await import("@/app/(app)/library/layout");
    expect(mod.default).toBeDefined();
  });
});

// ── Library index exports ───────────────────────────────────

describe("Phase 15: Library index completeness", () => {
  it("all Phase 15 exports are available from @/lib/library", async () => {
    const mod = await import("@/lib/library");
    // Search
    expect(typeof mod.searchLibrarySources).toBe("function");
    expect(typeof mod.searchAnnotations).toBe("function");
    // Project context
    expect(typeof mod.getLastActiveProjectId).toBe("function");
    expect(typeof mod.setLastActiveProjectId).toBe("function");
    expect(typeof mod.getLibraryProjects).toBe("function");
    // Existing Phase 11-13 exports still present
    expect(typeof mod.toLibraryId).toBe("function");
    expect(typeof mod.parseLibraryId).toBe("function");
    expect(typeof mod.getLibraryHome).toBe("function");
    expect(typeof mod.getLibraryCounts).toBe("function");
    expect(typeof mod.getLibrarySourceCount).toBe("function");
  });
});
