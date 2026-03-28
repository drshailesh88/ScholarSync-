# Execution Prompt — Issue #26: Feature Flags + Conditional Module Visibility

## BRANCH INSTRUCTIONS (DO THIS FIRST)

```bash
git checkout main
git pull origin main
git checkout -b feature/issue-26-feature-flags
```

All work happens on this branch. When done:
```bash
git push -u origin feature/issue-26-feature-flags
```

Then create a PR targeting main.

---

Read this entire prompt before writing any code.

## CONTEXT

The Domain Registry is in the codebase on main. `getDomainConfig(domainId)` returns a `DomainConfig` with a `features` section:

```typescript
features: {
  systematicReview: boolean;
  picoExtraction: boolean;
  clinicalTrialsSearch: boolean;
  presentationTypes: string[];
  journalFeeds: boolean;
}
```

Medicine has all features enabled. Non-medical domains have SR, PICO, and ClinicalTrials disabled. This issue wires those flags to the UI so non-medical users never see medical-only features.

Read:
- `src/lib/search/domains/medicine.ts` — features section
- `src/lib/search/domains/multidisciplinary.ts` — features section
- `docs/multi-domain/GRILL_DECISIONS.md` — decision #7, #8

## HOW TO GET THE USER'S DOMAIN

The user's domain lives in `users.domain` (column added in Issue #21 — may not exist yet). If the column doesn't exist, fall back to `"medicine"`.

For server components and API routes, get the user's domain:
```typescript
import { getCurrentUser } from "@/lib/auth";  // or however user data is fetched
import { getDomainConfig } from "@/lib/search/domains";

const user = await getCurrentUser();
const domain = getDomainConfig(user?.domain);
```

For client components, you'll need the domain passed down as a prop or via a React context. If a domain context doesn't exist yet, create one:

Create file: `src/components/providers/domain-provider.tsx`

```typescript
"use client";

import { createContext, useContext } from "react";
import type { DomainConfig } from "@/lib/search/domains/types";

const DomainContext = createContext<DomainConfig | null>(null);

export function DomainProvider({
  domain,
  children,
}: {
  domain: DomainConfig;
  children: React.ReactNode;
}) {
  return (
    <DomainContext.Provider value={domain}>
      {children}
    </DomainContext.Provider>
  );
}

export function useDomain(): DomainConfig | null {
  return useContext(DomainContext);
}
```

Wire this into the app layout so every client component can access it. If this is too invasive for now, just pass domain as a prop to the specific components below.

## WHAT TO BUILD

### 1. Systematic Review Module Visibility

The SR module appears in the sidebar navigation. Find the sidebar component that renders the SR link.

```typescript
// Wherever the SR nav link is rendered:
const domain = useDomain();  // or get from props

// Only show SR if domain config allows it
{(domain?.features.systematicReview !== false) && (
  <SidebarLink href="/systematic-review" icon={...} label="Systematic Review" />
)}
```

Also gate the SR route itself — if a user navigates directly to `/systematic-review` with a domain that has SR disabled, show a message or redirect:

```typescript
// In the SR page component:
const domain = getDomainConfig(user?.domain);
if (!domain.features.systematicReview) {
  return <div>Systematic Review is not available for {domain.label}. Coming soon.</div>;
  // Or redirect to dashboard
}
```

### 2. PICO Extraction Visibility

Find where PICO extraction is exposed in the UI (likely a button or panel in the research/search interface). Gate it:

```typescript
{domain?.features.picoExtraction && (
  <PicoExtractionButton ... />
)}
```

Also gate the API route `/api/extract-pico`:

```typescript
// In the extract-pico route:
const domain = getDomainConfig(/* user's domain */);
if (!domain.features.picoExtraction) {
  return NextResponse.json(
    { error: "PICO extraction is not available for this research domain" },
    { status: 400 }
  );
}
```

### 3. ClinicalTrials.gov Source Exclusion

This is already partially handled — the unified search route reads `domain.sources` and only fans out to configured sources. But verify that ClinicalTrials.gov is truly excluded for non-medical domains.

Check `src/app/api/search/unified/route.ts` — if the source fan-out is still hardcoded to all 4 sources (it may be from the tracer bullet), this is the time to make it domain-driven:

```typescript
// CURRENT (if still hardcoded):
const [pubmedResult, s2Result, oaResult, ctResult] = await Promise.allSettled([
  searchPubMed(...),
  searchSemanticScholar(...),
  searchOpenAlex(...),
  searchClinicalTrials(...),
]);

// SHOULD BE (domain-driven):
const sourcePromises = [];
if (domain.sources.includes("pubmed")) sourcePromises.push(withSourceTimeout("PubMed", searchPubMed(pubmedQuery, {...})));
if (domain.sources.includes("semantic_scholar")) sourcePromises.push(withSourceTimeout("Semantic Scholar", searchSemanticScholar(s2Query, {...})));
if (domain.sources.includes("openalex")) sourcePromises.push(withSourceTimeout("OpenAlex", searchOpenAlex(oaQuery, {...})));
if (domain.sources.includes("clinical_trials")) sourcePromises.push(withSourceTimeout("ClinicalTrials.gov", searchClinicalTrials(q, {...})));
if (domain.sources.includes("arxiv")) {
  // Import searchArxiv if available
  const { searchArxiv } = await import("@/lib/search/sources/arxiv");
  sourcePromises.push(withSourceTimeout("arXiv", searchArxiv(q, {...})));
}

const results = await Promise.allSettled(sourcePromises);
```

Then adjust the `sourceCounts` object to be dynamic instead of hardcoded `{pubmed, semanticScholar, openAlex, clinicalTrials}`.

**This is the most important change in this issue.** It's what actually makes a physics search call arXiv instead of PubMed.

### 4. Feed Empty State — Domain-Aware Suggestions

File: `src/components/feeds/feed-empty-state.tsx`

Currently suggests "Follow journals like NEJM, Lancet, JAMA." Make it domain-aware:

```typescript
const domain = useDomain();

const suggestions = domain?.id === "medicine"
  ? "Follow journals like NEJM, The Lancet, JAMA, BMJ"
  : domain?.id === "physics"
  ? "Follow journals like Nature Physics, Physical Review Letters, arXiv feeds"
  : domain?.id === "computer_science"
  ? "Follow journals like ACM Computing Surveys, IEEE Transactions, arXiv cs feeds"
  : "Follow academic journals and RSS feeds in your field";
```

Or better — read from a `journalSuggestions` field. For now, the above switch/map is fine since content curation (Issue #25) will fill in proper suggestions.

### 5. Journal Browser — Domain Filtering

File: `src/components/feeds/journal-browser.tsx` (or wherever `getCuratedFeeds` is called)

The journal directory currently shows all 80 medical journals. Filter by domain:

```typescript
const domain = useDomain();

// In getCuratedFeeds or equivalent:
const filteredFeeds = allFeeds.filter(feed => {
  if (!domain) return true;  // Show all if no domain
  return domain.journalCategories.includes(feed.category);
});
```

This means physics users only see physics journals (once they're added in Issue #25). Medicine users see all current medical journals. Multidisciplinary users see everything.

### 6. Feed Recommendations — Domain-Based

File: `src/lib/actions/feeds.ts` (or wherever `getCuratedFeeds` has the "Suggested for you" logic)

Currently matches on medical specialty from onboarding. Update to match on domain:

```typescript
// CURRENT:
const isSuggested = userSpecialties.has(feed.specialty.toLowerCase());

// UPDATED:
const userDomain = user?.domain ?? "medicine";
const domainConfig = getDomainConfig(userDomain);
const isSuggested = domainConfig.journalCategories.includes(feed.category);
```

### 7. Write Tests

Create file: `src/lib/search/__tests__/feature-flags.test.ts`

Test:
1. Medicine domain config has systematicReview: true
2. Multidisciplinary domain config has systematicReview: false
3. Medicine domain config has picoExtraction: true
4. Multidisciplinary domain config has picoExtraction: false
5. Medicine sources include "clinical_trials"
6. Multidisciplinary sources do NOT include "clinical_trials"
7. Medicine features.presentationTypes includes "grand_rounds"
8. Multidisciplinary features.presentationTypes does NOT include "grand_rounds"

Create file: `src/components/feeds/__tests__/domain-feeds.test.ts`

Test:
1. Feed empty state for medicine mentions NEJM/Lancet
2. Feed empty state for physics does NOT mention NEJM
3. Journal browser filters feeds by domain categories

## WHAT NOT TO DO

- DO NOT modify the DomainConfig type or any domain config files
- DO NOT modify deep research, RAG, guide, or presentation logic (those are done)
- DO NOT run database migrations (that's Issue #21)
- DO NOT add journal feed entries (that's Issue #25)
- DO NOT modify existing tests

## FILE SUMMARY

| Action | File |
|--------|------|
| CREATE | `src/components/providers/domain-provider.tsx` |
| MODIFY | Sidebar component (gate SR link) |
| MODIFY | SR page (gate access) |
| MODIFY | PICO UI component (gate button) |
| MODIFY | `/api/extract-pico` route (gate API) |
| MODIFY | `/api/search/unified/route.ts` (domain-driven source fan-out) |
| MODIFY | `src/components/feeds/feed-empty-state.tsx` (domain-aware suggestions) |
| MODIFY | `src/components/feeds/journal-browser.tsx` (filter by domain) |
| MODIFY | `src/lib/actions/feeds.ts` (domain-based recommendations) |
| CREATE | `src/lib/search/__tests__/feature-flags.test.ts` |
| CREATE | `src/components/feeds/__tests__/domain-feeds.test.ts` |

## VERIFICATION

```bash
npx tsc --noEmit  # zero errors
npx vitest run src/lib/search/__tests__/feature-flags.test.ts  # new tests pass
npx vitest run src/lib/search/__tests__/  # existing tests pass
```

## COMMIT AND PR

```bash
git add -A
git commit -m "feat: wire feature flags to UI — SR/PICO/ClinicalTrials visibility, domain-driven source fan-out, feed filtering

- SR module hidden for non-medical domains
- PICO extraction hidden for non-medical domains
- Unified search route uses domain-driven source fan-out (arXiv for physics, no PubMed for CS)
- Feed empty state domain-aware
- Journal browser filters by domain categories
- DomainProvider context for client components

Implements #26"

git push -u origin feature/issue-26-feature-flags
gh pr create --base main --title "feat: Feature flags + domain-driven source fan-out (#26)" --body "Closes #26"
```
