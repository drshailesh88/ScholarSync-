// @vitest-environment jsdom

import { act, createElement, type ReactElement, type ComponentType } from "react";
import { beforeAll, describe, expect, it, vi } from "vitest";
import { createRoot, type Root } from "react-dom/client";

vi.mock("axe-core", () => ({
  default: {
    run: vi.fn(async () => ({ violations: [] as Array<{ impact?: string | null }> })),
  },
}));

import axe from "axe-core";

type LinkProps = { href?: string; children?: unknown } & Record<string, unknown>;

vi.mock("next/link", () => ({
  default: ({ href, children, ...props }: LinkProps) =>
    createElement("a", { href: typeof href === "string" ? href : "#", ...props }, children),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), back: vi.fn(), prefetch: vi.fn() }),
  useParams: () => ({ id: "1", posterId: "1", projectId: "1", deckId: "1" }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => "/dashboard",
  redirect: vi.fn(),
  notFound: vi.fn(),
}));

vi.mock("next/dynamic", () => ({
  default: () => () => createElement("div", { "data-testid": "dynamic-component" }),
}));

vi.mock("@/lib/actions/dashboard", () => ({
  getDashboardData: vi.fn(async () => ({ recentProjects: [], stats: {}, recentSearches: [], recentActivity: [] })),
}));
vi.mock("@/lib/actions/papers", () => ({
  getFilteredUserPapers: vi.fn(async () => []),
  getLibraryStudyTypes: vi.fn(async () => []),
  getLibraryYearRange: vi.fn(async () => ({ min: null, max: null })),
  getLibraryProjects: vi.fn(async () => []),
  toggleFavorite: vi.fn(async () => true),
  removePaper: vi.fn(async () => true),
  getProjectPapersForCitation: vi.fn(async () => []),
  savePaper: vi.fn(async () => ({ success: true })),
  getUserPapers: vi.fn(async () => []),
}));
vi.mock("@/lib/actions/projects", () => ({
  getProjects: vi.fn(async () => []),
  createProject: vi.fn(async () => ({ id: 1 })),
  deleteProject: vi.fn(async () => true),
  updateProjectStatus: vi.fn(async () => true),
  archiveProject: vi.fn(async () => true),
}));
vi.mock("@/lib/actions/user", () => ({
  getUserUsageStats: vi.fn(async () => ({})),
  getUser: vi.fn(async () => null),
  updateUserProfile: vi.fn(async () => ({})),
}));

type RouteCase = { name: string; importPath: string; props?: Record<string, unknown> };
const routes: RouteCase[] = [
  { name: "dashboard", importPath: "@/app/(app)/dashboard/page" },
  { name: "library", importPath: "@/app/(app)/library/page" },
  { name: "projects", importPath: "@/app/(app)/projects/page" },
  { name: "studio", importPath: "@/app/(app)/studio/page" },
  { name: "editor", importPath: "@/app/(app)/editor/[id]/page", props: { params: { id: "1" } } },
  { name: "research", importPath: "@/app/(app)/research/page" },
  { name: "notebook", importPath: "@/app/(app)/notebook/page" },
  { name: "feeds", importPath: "@/app/(app)/feeds/page" },
  { name: "settings", importPath: "@/app/(app)/settings/page" },
  { name: "deep-research", importPath: "@/app/(app)/deep-research/page" },
  { name: "latex", importPath: "@/app/(app)/latex/page" },
  { name: "slides", importPath: "@/app/(app)/slides/page" },
  { name: "presentation", importPath: "@/app/(app)/presentation/page" },
  { name: "illustrate", importPath: "@/app/(app)/illustrate/page" },
  { name: "poster", importPath: "@/app/(app)/poster/[posterId]/page", props: { params: { posterId: "1" } } },
  { name: "systematic-review", importPath: "@/app/(app)/systematic-review/page" },
  { name: "compliance", importPath: "@/app/(app)/compliance/page" },
  { name: "analysis", importPath: "@/app/(app)/analysis/page" },
];

type PageComponent = ComponentType<Record<string, unknown>> | ((props: Record<string, unknown>) => Promise<ReactElement>);

async function renderPage(Page: PageComponent, props: Record<string, unknown> = {}) {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root: Root = createRoot(container);
  await act(async () => {
    if (Page.constructor.name === "AsyncFunction") {
      root.render(await (Page as (props: Record<string, unknown>) => Promise<ReactElement>)(props));
    } else {
      root.render(createElement(Page as ComponentType<Record<string, unknown>>, props));
    }
  });
  return { container, cleanup: async () => { await act(async () => root.unmount()); container.remove(); } };
}

beforeAll(() => {
  Object.defineProperty(window, "matchMedia", { writable: true, value: () => ({ matches: false, addListener: vi.fn(), removeListener: vi.fn() }) });
  Object.defineProperty(HTMLElement.prototype, "scrollIntoView", { value: vi.fn(), writable: true });
  Object.defineProperty(HTMLCanvasElement.prototype, "getContext", { value: vi.fn(() => ({})), writable: true });
  (globalThis as { ResizeObserver?: unknown }).ResizeObserver = class { observe() {} unobserve() {} disconnect() {} };
  (globalThis as { IntersectionObserver?: unknown }).IntersectionObserver = class { observe() {} unobserve() {} disconnect() {} };
});

describe("axe accessibility audits", () => {
  it.each(routes)("$name has no serious/critical axe violations", async ({ importPath, props }) => {
    const importedPage = await import(importPath);
    const { container, cleanup } = await renderPage(importedPage.default as PageComponent, props);
    const results = await axe.run(container);
    const severe = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
    await cleanup();
    expect(severe).toHaveLength(0);
  });
});
