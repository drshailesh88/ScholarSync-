import { test, expect, type Page, type TestInfo } from "@playwright/test";
import { and, desc, eq, isNull } from "drizzle-orm";
import { navigateTo } from "../helpers/auth";
import { db } from "@/lib/db";
import { projects, users } from "@/lib/db/schema";

const DOMAIN_LABELS = [
  "Medicine & Health Sciences",
  "Biology & Life Sciences",
  "Physics & Astronomy",
  "Chemistry",
  "Computer Science & AI",
  "Engineering",
  "Mathematics",
  "Social Sciences",
  "Economics & Business",
  "Psychology",
  "Law",
  "Humanities & Arts",
  "Education",
  "Environmental Science",
  "Multidisciplinary / Not Sure",
] as const;

const PHYSICS_SEARCH_RESPONSE = {
  results: [
    {
      title: "Quantum entanglement in noisy superconducting circuits",
      authors: ["A. Researcher", "B. Scientist"],
      journal: "Physical Review Letters",
      year: 2026,
      citationCount: 42,
      publicationTypes: ["Journal Article"],
      studyType: "journal_article",
      evidenceLevel: "I",
      isOpenAccess: true,
      sources: ["semantic_scholar", "openalex"],
    },
    {
      title: "Conference benchmarks for distributed entanglement routing",
      authors: ["C. Engineer"],
      journal: "Quantum Networking Conference Proceedings",
      year: 2025,
      citationCount: 8,
      publicationTypes: ["Conference Paper"],
      studyType: "conference_paper",
      evidenceLevel: "II",
      isOpenAccess: true,
      sources: ["semantic_scholar"],
    },
    {
      title: "Preprint: quantum entanglement scaling laws on arXiv",
      authors: ["D. Physicist"],
      journal: "arXiv",
      year: 2026,
      citationCount: 3,
      publicationTypes: ["Preprint"],
      studyType: "preprint",
      evidenceLevel: "III",
      isOpenAccess: true,
      arxivId: "2603.12345",
      sources: ["arxiv"],
    },
  ],
  total: 3,
  page: 0,
  perPage: 20,
  hasMore: false,
  sourceCounts: {
    semantic_scholar: 2,
    openalex: 1,
    arxiv: 1,
  },
} as const;

const MEDICINE_SEARCH_RESPONSE = {
  results: [
    {
      title: "SGLT2 inhibitors and cardiovascular outcomes in heart failure",
      authors: ["M. Clinician", "R. Trialist"],
      journal: "The Lancet",
      year: 2025,
      citationCount: 214,
      publicationTypes: ["Randomized Controlled Trial"],
      studyType: "rct",
      evidenceLevel: "II",
      isOpenAccess: true,
      sources: ["pubmed", "semantic_scholar"],
    },
    {
      title: "Meta-analysis of GLP-1 agonists for cardiometabolic outcomes",
      authors: ["S. Reviewer"],
      journal: "JAMA",
      year: 2026,
      citationCount: 75,
      publicationTypes: ["Meta-Analysis"],
      studyType: "meta_analysis",
      evidenceLevel: "I",
      isOpenAccess: true,
      sources: ["pubmed", "openalex"],
    },
  ],
  total: 2,
  page: 0,
  perPage: 20,
  hasMore: false,
  sourceCounts: {
    pubmed: 2,
    semantic_scholar: 1,
    openalex: 1,
    clinical_trials: 1,
  },
} as const;

const FEEDS_DISCOVER_RESPONSE = {
  feeds: [
    {
      title: "Nature Physics",
      publisher: "Nature",
      category: "General Physics",
      specialty: "Quantum Physics",
      feedUrl: "https://example.com/nature-physics.xml",
      description: "Physics flagship journal.",
      isSubscribed: false,
      isSuggested: true,
    },
    {
      title: "Physical Review Letters",
      publisher: "APS",
      category: "General Physics",
      specialty: "Quantum Physics",
      feedUrl: "https://example.com/prl.xml",
      description: "High-impact physics letters.",
      isSubscribed: false,
      isSuggested: true,
    },
    {
      title: "arXiv Physics Feed",
      publisher: "Cornell University",
      category: "General Physics",
      specialty: "Astrophysics",
      feedUrl: "https://example.com/arxiv-physics.xml",
      description: "Latest arXiv physics papers.",
      isSubscribed: false,
      isSuggested: true,
    },
    {
      title: "NEJM",
      publisher: "Massachusetts Medical Society",
      category: "General Medicine",
      specialty: "Cardiology",
      feedUrl: "https://example.com/nejm.xml",
      description: "Medical journal.",
      isSubscribed: false,
      isSuggested: false,
    },
    {
      title: "The Lancet",
      publisher: "Elsevier",
      category: "General Medicine",
      specialty: "General Medicine",
      feedUrl: "https://example.com/lancet.xml",
      description: "Medical journal.",
      isSubscribed: false,
      isSuggested: false,
    },
  ],
  journals: [],
  categories: ["General Physics", "General Medicine"],
  specialties: ["Quantum Physics", "Astrophysics", "Cardiology", "General Medicine"],
  suggestedFeeds: [
    {
      title: "Nature Physics",
      publisher: "Nature",
      category: "General Physics",
      specialty: "Quantum Physics",
      feedUrl: "https://example.com/nature-physics.xml",
      description: "Physics flagship journal.",
      isSubscribed: false,
      isSuggested: true,
    },
    {
      title: "Physical Review Letters",
      publisher: "APS",
      category: "General Physics",
      specialty: "Quantum Physics",
      feedUrl: "https://example.com/prl.xml",
      description: "High-impact physics letters.",
      isSubscribed: false,
      isSuggested: true,
    },
  ],
  pubmedSuggestion: null,
} as const;

function makeUserId(testInfo: TestInfo, slug: string) {
  const safeSlug = slug.replace(/[^a-z0-9]+/gi, "_").toLowerCase();
  return `pw_${safeSlug}_${testInfo.parallelIndex}_${testInfo.retry}_${Date.now()}`;
}

async function seedUser({
  userId,
  domain = "medicine",
  onboardingCompleted = true,
}: {
  userId: string;
  domain?: string;
  onboardingCompleted?: boolean;
}) {
  await db.insert(users).values({
    id: userId,
    email: `${userId}@scholarsync.dev`,
    full_name: "Playwright Multi-Domain User",
    plan: "basic",
    tokens_limit: 50000,
    tokens_used_this_month: 0,
    onboarding_completed: onboardingCompleted,
    domain,
  });
}

async function getUserDomain(userId: string) {
  const [user] = await db
    .select({ domain: users.domain })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  return user?.domain ?? null;
}

async function getProjectField(userId: string, title: string) {
  const [project] = await db
    .select({ field: projects.field })
    .from(projects)
    .where(
      and(
        eq(projects.user_id, userId),
        eq(projects.title, title),
        isNull(projects.deleted_at),
      ),
    )
    .orderBy(desc(projects.id))
    .limit(1);

  return project?.field ?? null;
}

async function mockUnifiedSearch(page: Page, response: unknown) {
  await page.route("**/api/search/unified**", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(response),
    });
  });
}

async function searchResearch(page: Page, userId: string, query: string) {
  await navigateTo(page, "/research", { userId });
  await expect(page.locator("body")).not.toContainText("Application error");

  const searchInput = page.locator("textarea, input[type='search'], input[type='text']").first();
  await expect(searchInput).toBeVisible({ timeout: 15000 });

  await searchInput.fill(query);
  await Promise.all([
    page.waitForResponse((response) => response.url().includes("/api/search/unified")),
    searchInput.press("Enter"),
  ]);
}

async function openPhysicsPresentationAudienceStep(page: Page, userId: string) {
  await navigateTo(page, "/presentation/new?mode=ai&domain=physics", { userId });
  await expect(page.locator("body")).not.toContainText("Application error");

  await page.getByRole("button", { name: /From Text/i }).click();
  await page.getByLabel("Text area").fill(
    "This presentation covers entanglement experiments, detector calibration, quantum correlations, and benchmarking results across multiple labs."
  );
  await page.getByRole("button", { name: /^Next$/i }).click();
  await expect(page.getByText("Template & Audience")).toBeVisible();
}

function streamTextChunk(text: string) {
  return `0:${JSON.stringify(text)}\n`;
}

async function runLearnModePrompt(page: Page, options: {
  userId: string;
  domainId: string;
  assistantText: string;
}) {
  let capturedDomainId: string | undefined;

  await page.route("**/api/chat", async (route) => {
    const body = route.request().postDataJSON() as {
      guideContext?: { domainId?: string };
    };

    capturedDomainId = body.guideContext?.domainId;

    await route.fulfill({
      status: 200,
      contentType: "text/plain; charset=utf-8",
      body: streamTextChunk(options.assistantText),
    });
  });

  await navigateTo(page, `/studio?mode=learn&domain=${options.domainId}`, {
    userId: options.userId,
  });

  const learnTab = page.getByRole("button", { name: /^Learn$/i }).first();
  if (await learnTab.isVisible().catch(() => false)) {
    await learnTab.click();
  }

  const promptInput = page
    .getByPlaceholder(/Explain a concept|Teach from your cited papers|Explain using your library/i)
    .or(page.locator("textarea, input[type='text']").last());

  await expect(promptInput).toBeVisible({ timeout: 15000 });
  await promptInput.fill("Help me understand how to structure this work.");
  await page.getByLabel("Send message").click();

  await expect(page.locator("body")).toContainText(options.assistantText);
  expect(capturedDomainId).toBe(options.domainId);

  await page.unroute("**/api/chat");
}

test.describe("Multi-domain integration journeys", () => {
  test("Physics user onboarding routes into a non-medical workspace", async ({ page }, testInfo) => {
    const userId = makeUserId(testInfo, "physics_onboarding");
    await seedUser({ userId, domain: "medicine", onboardingCompleted: false });

    await navigateTo(page, "/onboarding", { userId });
    await page.getByPlaceholder("Dr. Rahul Sharma").fill("Physics Onboarding User");
    await page.getByPlaceholder("AIIMS New Delhi").fill("CERN");
    await page.getByRole("button", { name: /Continue/i }).click();

    for (const label of DOMAIN_LABELS) {
      await expect(page.getByRole("button", { name: new RegExp(label, "i") })).toBeVisible();
    }

    await page.getByRole("button", { name: /Physics & Astronomy/i }).click();
    await page.getByRole("button", { name: /Continue/i }).click();
    await page.getByRole("button", { name: /Search Literature/i }).click();
    await page.getByRole("button", { name: /Continue/i }).click();
    await page.getByRole("button", { name: /Start Using ScholarSync/i }).click();

    await page.waitForURL(/\/dashboard/);
    await expect.poll(() => getUserDomain(userId)).toBe("physics");
    await expect(page.getByRole("link", { name: /Systematic Review/i })).toHaveCount(0);
    await expect(page.locator("body")).not.toContainText(/\bPICO\b/i);
  });

  test("Physics user search shows physics-specific filters, evidence hierarchy, and sources", async ({ page }, testInfo) => {
    const userId = makeUserId(testInfo, "physics_search");
    await seedUser({ userId, domain: "physics" });
    await mockUnifiedSearch(page, PHYSICS_SEARCH_RESPONSE);

    await searchResearch(page, userId, "quantum entanglement");

    await expect(page.locator("body")).toContainText("Quantum entanglement in noisy superconducting circuits");

    await expect(page.locator("body")).toContainText("Journal Article");
    await expect(page.locator("body")).toContainText("Conference Paper");
    await expect(page.locator("body")).toContainText("Preprint");
    await expect(page.locator("body")).not.toContainText(/RCTs? Only/i);
    await expect(page.locator("body")).not.toContainText(/Case Report/i);

    await expect(page.locator("body")).toContainText("Peer-Reviewed Journal");
    await expect(page.locator("body")).toContainText("Conference Proceedings");
    await expect(page.locator("body")).toContainText("Preprint");
    await expect(page.locator("body")).not.toContainText(/Level I/i);
    await expect(page.locator("body")).not.toContainText(/Randomized Controlled Trial/i);

    await expect(page.locator("body")).toContainText(/arXiv/i);
  });

  test("Medicine user keeps the existing medical workflow and medical-only affordances", async ({ page }, testInfo) => {
    const userId = makeUserId(testInfo, "medicine_unchanged");
    await seedUser({ userId, domain: "medicine" });
    await mockUnifiedSearch(page, MEDICINE_SEARCH_RESPONSE);

    await searchResearch(page, userId, "heart failure sglt2 inhibitors");

    await expect(page.locator("body")).toContainText("Randomized Controlled Trial");
    await expect(page.locator("body")).toContainText("Meta-Analysis");
    await expect(page.locator("body")).toContainText("Cohort");
    await expect(page.locator("body")).toContainText("Case Report");

    await expect(page.getByRole("link", { name: /Systematic Review/i })).toBeVisible();

    await navigateTo(page, "/systematic-review", { userId });
    await expect(page.locator("body")).toContainText(/\bPICO\b/i);

    await navigateTo(page, "/presentation/new?mode=ai&domain=medicine", { userId });
    await page.getByRole("button", { name: /From Text/i }).click();
    await page.getByLabel("Text area").fill(
      "This medical talk covers intervention effects, population selection, outcomes, and bedside implications for cardiology practice."
    );
    await page.getByRole("button", { name: /^Next$/i }).click();

    await expect(page.locator("body")).toContainText("Grand Rounds");
    await expect(page.locator("body")).toContainText("Patient Case");
  });

  test("Changing domain in settings updates the saved field and hides medical-only modules", async ({ page }, testInfo) => {
    const userId = makeUserId(testInfo, "settings_domain_change");
    await seedUser({ userId, domain: "medicine" });

    await navigateTo(page, "/settings", { userId });
    await expect(page.getByText("Research Field")).toBeVisible();

    await page.getByLabel("Research field").selectOption("computer_science");
    await expect(page.locator("body")).toContainText(/research field updated/i);
    await expect.poll(() => getUserDomain(userId)).toBe("computer_science");

    await navigateTo(page, "/research", { userId });
    await expect(page.locator("body")).toContainText("Top Venue / Flagship Journal");
    await expect(page.locator("body")).toContainText("Conference Paper");
    await expect(page.locator("body")).not.toContainText(/Randomized Controlled Trial/i);
    await expect(page.getByRole("link", { name: /Systematic Review/i })).toHaveCount(0);
  });

  test("Per-project domain override can create a medicine project for a physics user", async ({ page }, testInfo) => {
    const userId = makeUserId(testInfo, "project_domain_override");
    const title = `Playwright Override Project ${Date.now()}`;

    await seedUser({ userId, domain: "physics" });
    await navigateTo(page, "/projects", { userId });

    await page.getByRole("button", { name: /New Project/i }).click();
    await expect(page.getByText(/Use profile default \(Physics & Astronomy\)/i)).toBeVisible();

    await page.getByPlaceholder("e.g. CRISPR Literature Review").fill(title);
    await page.getByLabel("Research field").selectOption("medicine");
    await page.getByRole("button", { name: /Create Project/i }).click();

    await expect.poll(() => getProjectField(userId, title)).toBe("medicine");
  });

  test("Feeds module filters journal suggestions for a physics user", async ({ page }, testInfo) => {
    const userId = makeUserId(testInfo, "physics_feeds");
    await seedUser({ userId, domain: "physics" });

    await page.route("**/api/feeds/discover**", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(FEEDS_DISCOVER_RESPONSE),
      });
    });

    await navigateTo(page, "/feeds", { userId });

    await expect(page.locator("body")).toContainText("Nature Physics");
    await expect(page.locator("body")).toContainText("Physical Review Letters");
    await expect(page.locator("body")).toContainText("arXiv feeds");
    await expect(page.locator("body")).not.toContainText(/NEJM/i);
    await expect(page.locator("body")).not.toContainText(/Lancet/i);

    await page.getByRole("button", { name: /Add Feed/i }).click();
    await page.getByRole("button", { name: /Browse Journals/i }).click();

    await expect(page.locator("body")).toContainText("Nature Physics");
    await expect(page.locator("body")).toContainText("Physical Review Letters");
    await expect(page.locator("body")).toContainText("arXiv Physics Feed");
    await expect(page.locator("body")).not.toContainText(/\bNEJM\b/i);
    await expect(page.locator("body")).not.toContainText(/The Lancet/i);
  });

  test("Presentation audience options are filtered for a physics user", async ({ page }, testInfo) => {
    const userId = makeUserId(testInfo, "physics_presentation_types");
    await seedUser({ userId, domain: "physics" });

    await openPhysicsPresentationAudienceStep(page, userId);

    await expect(page.locator("body")).toContainText("Conference");
    await expect(page.locator("body")).toContainText("Thesis Defense");
    await expect(page.locator("body")).toContainText("Lab Meeting");
    await expect(page.locator("body")).not.toContainText("Grand Rounds");
    await expect(page.locator("body")).not.toContainText("Patient Case");
  });

  test("Guide mode branches between medical guidance and physics guidance", async ({ page }, testInfo) => {
    const medicineUserId = makeUserId(testInfo, "guide_medicine");
    const physicsUserId = makeUserId(testInfo, "guide_physics");

    await seedUser({ userId: medicineUserId, domain: "medicine" });
    await seedUser({ userId: physicsUserId, domain: "physics" });

    await runLearnModePrompt(page, {
      userId: medicineUserId,
      domainId: "medicine",
      assistantText:
        "Start with a PICO question and check the CARE guidance before drafting your clinical manuscript.",
    });
    await expect(page.locator("body")).toContainText(/CARE/i);
    await expect(page.locator("body")).toContainText(/\bPICO\b/i);

    await runLearnModePrompt(page, {
      userId: physicsUserId,
      domainId: "physics",
      assistantText:
        "Frame the problem, define your symbols early, and explain the measurement setup using SI units and physics conventions.",
    });
    await expect(page.locator("body")).not.toContainText(/CARE/i);
    await expect(page.locator("body")).not.toContainText(/\bPICO\b/i);
    await expect(page.locator("body")).toContainText(/SI units/i);
  });
});
