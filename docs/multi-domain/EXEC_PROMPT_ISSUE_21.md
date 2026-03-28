# Execution Prompt — Issue #21: Onboarding Domain Picker + DB Migration + Settings

## FOR CODEX — Tag @codex on Issue #21 with: "Read and execute docs/multi-domain/EXEC_PROMPT_ISSUE_21.md"

## BRANCH INSTRUCTIONS (DO THIS FIRST)

```bash
git checkout main
git pull origin main
git checkout -b feature/issue-21-onboarding-domain
```

All work happens on this branch. When done, push and create a PR targeting main.

---

Read this entire prompt before writing any code.

## CONTEXT

ScholarSync is expanding from medicine-only to 15 academic domains. The Domain Registry is already in the codebase (`src/lib/search/domains/`). This issue adds the user-facing entry point: the onboarding domain picker, database migration, and Settings page domain change.

Read:
- `src/lib/search/domains/types.ts` — DomainId type (15 domains)
- `src/lib/search/domains/registry.ts` — getDomainConfig, getRegisteredDomains
- `src/app/(app)/onboarding/page.tsx` — current onboarding flow (21 medical specialties)
- `src/lib/actions/user.ts` — updateUserProfile function
- `src/lib/db/schema/core.ts` — users table, projects table
- `src/lib/actions/projects.ts` — createProject function
- `docs/multi-domain/GRILL_DECISIONS.md` — decisions #1, #2, #3, #10, #11, #23

## DESIGN DECISIONS (already locked)

- Single-tier picker: 15 domains, NOT sub-specialties
- Default: "medicine" for all existing users
- User picks at onboarding → projects inherit → per-project override in Settings
- Domain stored in `users.domain` (new column) and `projects.field` (existing dormant column)
- Changeable in Settings, existing projects unaffected

## WHAT TO BUILD

### Step 1: Database Migration

Create a new Drizzle migration that adds the `domain` column to the users table:

```sql
ALTER TABLE users ADD COLUMN domain TEXT DEFAULT 'medicine';
```

Use Drizzle's migration system. Look at existing migrations in the `drizzle/` directory for the pattern. Run:

```bash
npx drizzle-kit generate
```

Also update the schema definition in `src/lib/db/schema/core.ts`:

```typescript
// In the users table definition, add:
domain: text("domain").default("medicine"),
```

DO NOT modify the `projects` table schema — `projects.field` already exists as a text column.

### Step 2: Update User Actions

File: `src/lib/actions/user.ts`

1. Add `domain` to the `updateUserProfile` function's accepted fields:

```typescript
export async function updateUserProfile(data: {
  full_name?: string;
  specialty?: string;
  country?: string;
  bio?: string;
  research_interests?: string[];
  preferred_language?: string;
  default_citation_style?: string;
  orcid_id?: string;
  domain?: string;  // NEW
}) {
```

2. Make sure the domain field gets saved to the database when provided.

### Step 3: Update Project Actions

File: `src/lib/actions/projects.ts`

1. Add `domain` to `createProject` accepted fields:

```typescript
export async function createProject(data: {
  title: string;
  project_type?: ProjectType;
  description?: string;
  target_journal?: string;
  deadline?: string;
  domain?: string;  // NEW — defaults to user's domain
}) {
```

2. When creating a project, save domain to `projects.field`:

```typescript
const [project] = await db
  .insert(projects)
  .values({
    user_id: userId,
    title: data.title,
    project_type: data.project_type ?? "review_article",
    description: data.description,
    target_journal: data.target_journal,
    field: data.domain,  // Save domain to existing 'field' column
    // ... rest
  })
  .returning();
```

3. If `data.domain` is not provided, fetch the user's domain and use it as default:

```typescript
if (!data.domain) {
  const user = await getCurrentUser();  // or however you fetch user
  data.domain = user?.domain ?? "medicine";
}
```

### Step 4: Replace Onboarding Specialty Picker

File: `src/app/(app)/onboarding/page.tsx`

Replace the current Step 1 (21 medical specialties) with a 15-domain picker.

**Current Step 1:** Multi-select from 21 medical specialties, saved as comma-separated text to `users.specialty`.

**New Step 1:** Single-select from 15 domains, saved to `users.domain`.

Domain options with labels and descriptions:

```typescript
const DOMAIN_OPTIONS = [
  { id: "medicine", label: "Medicine & Health Sciences", description: "Clinical medicine, public health, biomedical research" },
  { id: "biology", label: "Biology & Life Sciences", description: "Molecular biology, genetics, ecology, neuroscience" },
  { id: "physics", label: "Physics & Astronomy", description: "Theoretical physics, experimental physics, astrophysics" },
  { id: "chemistry", label: "Chemistry", description: "Organic, inorganic, physical, analytical chemistry" },
  { id: "computer_science", label: "Computer Science & AI", description: "Software engineering, machine learning, algorithms, systems" },
  { id: "engineering", label: "Engineering", description: "Electrical, mechanical, civil, chemical engineering" },
  { id: "mathematics", label: "Mathematics", description: "Pure mathematics, applied mathematics, statistics" },
  { id: "social_sciences", label: "Social Sciences", description: "Sociology, anthropology, political science" },
  { id: "economics", label: "Economics & Business", description: "Microeconomics, macroeconomics, finance, management" },
  { id: "psychology", label: "Psychology", description: "Clinical, cognitive, social, developmental psychology" },
  { id: "law", label: "Law", description: "Constitutional law, international law, jurisprudence" },
  { id: "humanities", label: "Humanities & Arts", description: "History, philosophy, literature, linguistics" },
  { id: "education", label: "Education", description: "Educational research, pedagogy, curriculum design" },
  { id: "environmental", label: "Environmental Science", description: "Climate science, ecology, conservation, sustainability" },
  { id: "multidisciplinary", label: "Multidisciplinary / Not Sure", description: "Search across all scientific disciplines" },
];
```

**UI behavior:**
- Show as a grid of selectable cards (similar to current specialty pills but larger, with descriptions)
- Single-select only (not multi-select like current)
- Selected card gets a highlighted border
- The selected domain ID is saved to `users.domain` via `updateUserProfile({ domain: selectedDomain })`
- Keep saving to `users.specialty` too for backward compatibility: `specialty: selectedDomain`

**Keep the other onboarding steps as-is** (Step 0: name/institution, Step 2: goals, Step 3: tour).

### Step 5: Settings Page — Domain Change

Find the Settings page (likely `src/app/(app)/settings/page.tsx` or similar).

Add a "Research Field" section:

```typescript
<section>
  <h3>Research Field</h3>
  <p className="text-sm text-muted-foreground">
    This controls which databases are searched, which AI personas are used,
    and which features are available.
  </p>
  <select
    value={user.domain ?? "medicine"}
    onChange={(e) => handleDomainChange(e.target.value)}
  >
    {DOMAIN_OPTIONS.map(d => (
      <option key={d.id} value={d.id}>{d.label}</option>
    ))}
  </select>
  <p className="text-xs text-muted-foreground mt-1">
    Changing this affects new projects only. Existing projects keep their current domain.
  </p>
</section>
```

Wire `handleDomainChange` to call `updateUserProfile({ domain: newDomain })`.

Use the same DOMAIN_OPTIONS constant as onboarding (extract to a shared file if needed: `src/data/domain-options.ts`).

### Step 6: Project Creation — Domain Override

Find the project creation UI (likely a modal or page).

Add an optional domain selector:

```typescript
<label>Research Field (optional — defaults to your profile setting)</label>
<select
  value={projectDomain ?? user.domain ?? "medicine"}
  onChange={(e) => setProjectDomain(e.target.value)}
>
  {DOMAIN_OPTIONS.map(d => (
    <option key={d.id} value={d.id}>{d.label}</option>
  ))}
</select>
```

Pass the selected domain to `createProject({ ..., domain: projectDomain })`.

### Step 7: Write Tests

Create file: `src/lib/actions/__tests__/domain-onboarding.test.ts`

Test:
1. `updateUserProfile({ domain: "physics" })` updates the user's domain field
2. `createProject({ title: "Test", domain: "physics" })` saves domain to projects.field
3. `createProject({ title: "Test" })` without explicit domain inherits from user's domain
4. Default domain is "medicine" for users without a domain set

### Step 8: Shared Domain Options

Create file: `src/data/domain-options.ts`

Export the DOMAIN_OPTIONS array so both onboarding and settings can import it. Also export a helper:

```typescript
export function getDomainLabel(domainId: string): string {
  return DOMAIN_OPTIONS.find(d => d.id === domainId)?.label ?? "Multidisciplinary";
}
```

## WHAT NOT TO DO

- DO NOT modify any domain config files (medicine.ts, types.ts, etc.)
- DO NOT modify search pipeline, deep research, RAG, guide, or presentation
- DO NOT modify the landing page
- DO NOT remove the existing specialty field — keep it for backward compatibility
- DO NOT create domain configs for new domains (that's Issue #25)

## FILE SUMMARY

| Action | File |
|--------|------|
| CREATE | Drizzle migration (ALTER TABLE users ADD COLUMN domain) |
| MODIFY | `src/lib/db/schema/core.ts` (add domain to users table) |
| MODIFY | `src/lib/actions/user.ts` (accept domain in updateUserProfile) |
| MODIFY | `src/lib/actions/projects.ts` (accept domain in createProject, save to field) |
| MODIFY | `src/app/(app)/onboarding/page.tsx` (replace specialty picker with domain picker) |
| MODIFY | Settings page (add domain change section) |
| MODIFY | Project creation UI (add domain override) |
| CREATE | `src/data/domain-options.ts` (shared constants) |
| CREATE | `src/lib/actions/__tests__/domain-onboarding.test.ts` |

## VERIFICATION

```bash
npx drizzle-kit generate  # migration file created
npx tsc --noEmit  # zero errors
npx vitest run src/lib/actions/__tests__/domain-onboarding.test.ts  # new tests pass
npx vitest run src/lib/actions/__tests__/  # existing tests pass
```

## COMMIT AND PR

```bash
git add -A
git commit -m "feat: onboarding domain picker, DB migration, Settings domain change, per-project override

- ALTER TABLE users ADD COLUMN domain TEXT DEFAULT 'medicine'
- Onboarding Step 1: 15-domain single-select picker
- Settings: Research Field section for changing domain
- Project creation: optional domain override
- createProject inherits user domain into projects.field
- Shared DOMAIN_OPTIONS constant

Implements #21"

git push -u origin feature/issue-21-onboarding-domain
gh pr create --base main --title "feat: Onboarding domain picker + DB migration (#21)" --body "Closes #21"
```
