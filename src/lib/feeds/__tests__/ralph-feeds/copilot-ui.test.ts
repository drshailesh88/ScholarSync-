/**
 * RALPH Journal Feed — Sprint 15: Copilot Panel UI Tests
 *
 * Verifies component files exist, export correctly, and
 * the page is properly wired.
 */
import { describe, it, expect, vi } from "vitest";
import { readFileSync, existsSync } from "fs";

// Mock store
vi.mock("@/stores/feed-store", () => ({
  useFeedStore: Object.assign(
    () => ({
      articles: [],
      selectedArticleId: null,
      copilotOpen: false,
      copilotMessages: [],
      copilotLoading: false,
      copilotSourceTier: null,
      copilotSourceLabel: null,
      copilotSuggestions: [],
      copilotSummaryCache: {},
      closeCopilot: vi.fn(),
      openCopilot: vi.fn(),
      summarizeArticle: vi.fn(),
      sendCopilotMessage: vi.fn(),
      setSelectedArticle: vi.fn(),
      loadSubscriptions: vi.fn(),
      loadArticles: vi.fn(),
      markAllRead: vi.fn(),
      clearError: vi.fn(),
      subscriptions: [],
      isLoadingSubscriptions: false,
      isLoadingArticles: false,
      totalUnread: 0,
      error: null,
      viewFilter: "unread",
      selectedFeedId: null,
      selectedFolder: null,
      hasMore: false,
      toggleStar: vi.fn(),
      markRead: vi.fn(),
      subscribe: vi.fn(),
      subscribePubMed: vi.fn(),
      unsubscribe: vi.fn(),
      loadMore: vi.fn(),
      saveToLibrary: vi.fn(),
      setSelectedFeed: vi.fn(),
      setSelectedFolder: vi.fn(),
      setViewFilter: vi.fn(),
    }),
    {
      getState: () => ({
        copilotOpen: false,
        openCopilot: vi.fn(),
        closeCopilot: vi.fn(),
        toggleStar: vi.fn(),
        subscribe: vi.fn(),
        saveToLibrary: vi.fn(),
      }),
    }
  ),
}));

// =====================================================================
// JF-700: CopilotPanel component exists
// =====================================================================
describe("JF-700: CopilotPanel component", () => {
  it("CopilotPanel is exported", async () => {
    const mod = await import("@/components/feeds/copilot-panel");
    expect(mod.CopilotPanel).toBeDefined();
    expect(typeof mod.CopilotPanel).toBe("function");
  });
});

// =====================================================================
// JF-701: Copilot panel has key UI elements
// =====================================================================
describe("JF-701: Copilot panel structure", () => {
  it("has Summarize and Explain buttons", () => {
    const content = readFileSync(
      "src/components/feeds/copilot-panel.tsx",
      "utf-8"
    );
    expect(content).toContain("Summarize");
    expect(content).toContain("Explain");
  });

  it("has chat input form", () => {
    const content = readFileSync(
      "src/components/feeds/copilot-panel.tsx",
      "utf-8"
    );
    expect(content).toContain("handleSubmit");
    expect(content).toContain("placeholder");
    expect(content).toContain("PaperPlaneRight");
  });

  it("has source tier badge", () => {
    const content = readFileSync(
      "src/components/feeds/copilot-panel.tsx",
      "utf-8"
    );
    expect(content).toContain("SourceBadge");
    expect(content).toContain("copilotSourceTier");
  });

  it("has compact article header", () => {
    const content = readFileSync(
      "src/components/feeds/copilot-panel.tsx",
      "utf-8"
    );
    expect(content).toContain("CompactHeader");
  });

  it("has message rendering with role-based styling", () => {
    const content = readFileSync(
      "src/components/feeds/copilot-panel.tsx",
      "utf-8"
    );
    expect(content).toContain("copilotMessages");
    expect(content).toContain("role");
    expect(content).toContain("assistant");
    expect(content).toContain("user");
  });

  it("has loading indicator with bouncing dots", () => {
    const content = readFileSync(
      "src/components/feeds/copilot-panel.tsx",
      "utf-8"
    );
    expect(content).toContain("copilotLoading");
    expect(content).toContain("animate-bounce");
  });

  it("has suggested questions", () => {
    const content = readFileSync(
      "src/components/feeds/copilot-panel.tsx",
      "utf-8"
    );
    expect(content).toContain("copilotSuggestions");
    expect(content).toContain("SuggestionChips");
  });

  it("has close button", () => {
    const content = readFileSync(
      "src/components/feeds/copilot-panel.tsx",
      "utf-8"
    );
    expect(content).toContain("closeCopilot");
  });
});

// =====================================================================
// JF-702: Article reader has AI button
// =====================================================================
describe("JF-702: AI button in article reader", () => {
  it("article-reader has onOpenCopilot or AI button", () => {
    const path = "src/components/feeds/article-reader.tsx";
    expect(existsSync(path)).toBe(true);
    const content = readFileSync(path, "utf-8");
    expect(content).toMatch(/onOpenCopilot|Sparkle|AI/);
  });
});

// =====================================================================
// JF-703: AI button in article card
// =====================================================================
describe("JF-703: AI button in article card", () => {
  it("article-card has onAI prop or AI button", () => {
    const path = "src/components/feeds/article-card.tsx";
    expect(existsSync(path)).toBe(true);
    const content = readFileSync(path, "utf-8");
    expect(content).toMatch(/onAI|Sparkle/);
  });
});

// =====================================================================
// JF-704: Feeds page wires CopilotPanel
// =====================================================================
describe("JF-704: Feeds page integration", () => {
  it("feeds page imports CopilotPanel", () => {
    const content = readFileSync("src/app/(app)/feeds/page.tsx", "utf-8");
    expect(content).toContain("CopilotPanel");
    expect(content).toContain("copilot-panel");
  });

  it("feeds page conditionally renders CopilotPanel vs ArticleReader", () => {
    const content = readFileSync("src/app/(app)/feeds/page.tsx", "utf-8");
    expect(content).toContain("copilotOpen");
  });

  it("feeds page has 'a' keyboard shortcut for AI toggle", () => {
    const content = readFileSync("src/app/(app)/feeds/page.tsx", "utf-8");
    expect(content).toMatch(/["']a["']/);
    expect(content).toMatch(/openCopilot|closeCopilot/);
  });
});

// =====================================================================
// JF-705: Copilot panel uses existing design tokens
// =====================================================================
describe("JF-705: Design system compliance", () => {
  it("uses glass-panel class", () => {
    const content = readFileSync(
      "src/components/feeds/copilot-panel.tsx",
      "utf-8"
    );
    expect(content).toContain("glass-panel");
  });

  it("uses text-ink and text-ink-muted", () => {
    const content = readFileSync(
      "src/components/feeds/copilot-panel.tsx",
      "utf-8"
    );
    expect(content).toContain("text-ink");
    expect(content).toContain("text-ink-muted");
  });

  it("uses bg-brand for primary actions", () => {
    const content = readFileSync(
      "src/components/feeds/copilot-panel.tsx",
      "utf-8"
    );
    expect(content).toContain("bg-brand");
  });
});

// =====================================================================
// JF-706: Source tier badges for all 3 tiers
// =====================================================================
describe("JF-706: Source tier display", () => {
  it("handles full_paper tier", () => {
    const content = readFileSync(
      "src/components/feeds/copilot-panel.tsx",
      "utf-8"
    );
    expect(content).toContain("full_paper");
  });

  it("handles abstract_only tier", () => {
    const content = readFileSync(
      "src/components/feeds/copilot-panel.tsx",
      "utf-8"
    );
    expect(content).toContain("abstract_only");
  });

  it("handles title_only tier", () => {
    const content = readFileSync(
      "src/components/feeds/copilot-panel.tsx",
      "utf-8"
    );
    expect(content).toContain("title_only");
  });
});

// =====================================================================
// JF-707: Uses Phosphor icons (not lucide/heroicons)
// =====================================================================
describe("JF-707: Icon library", () => {
  it("imports from @phosphor-icons/react", () => {
    const content = readFileSync(
      "src/components/feeds/copilot-panel.tsx",
      "utf-8"
    );
    expect(content).toContain("@phosphor-icons/react");
    expect(content).toContain("Sparkle");
    expect(content).toContain("PaperPlaneRight");
  });
});
