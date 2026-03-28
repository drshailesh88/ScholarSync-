# Step 7: Feature Testing Doc Updates

## AGENT: Codex (large scope — 8+ docs to update)
## BRANCH: `verify/step-07-feature-docs`

## BRANCH INSTRUCTIONS (DO THIS FIRST)

```bash
git checkout main
git pull origin main
git checkout -b verify/step-07-feature-docs
```

## PROMPT

The multi-domain expansion touched 8 modules. Each module has a `*_FEATURES_TESTING.md` document at the repo root with hundreds of checkpoints. These documents need to be updated with new checkpoints covering the domain-aware behavior.

Read:
- `docs/multi-domain/GRILL_DECISIONS.md` — all 23 design decisions
- Each `*_FEATURES_TESTING.md` file listed below

### Documents to Update

#### 1. RESEARCH_FEATURES_TESTING.md
Add checkpoints for:
- [ ] Search accepts `?domain=` parameter
- [ ] Query augmentation uses domain-specific persona
- [ ] Evidence badges display domain-appropriate hierarchy
- [ ] Study type filters show domain-relevant options
- [ ] Source filters show domain-configured sources
- [ ] Domain-driven source fan-out (physics → arXiv, medicine → PubMed)
- [ ] arXiv source adapter returns results with correct field mapping
- [ ] Default domain (medicine) produces identical results to pre-multi-domain behavior
- [ ] Tool descriptions show only domain-relevant databases

#### 2. DEEP_RESEARCH_FEATURES_TESTING.md
Add checkpoints for:
- [ ] Deep research accepts `?domain=` parameter
- [ ] Medicine/biology uses proven hardcoded perspective generator
- [ ] Non-medicine domains use config-driven perspectives
- [ ] Generic fallback perspectives work when domain has no templates
- [ ] RAG query-enhancer uses domain-specific persona
- [ ] RAG HyDE uses domain-specific textbook persona
- [ ] RAG source-summarizer uses domain-appropriate extraction hints
- [ ] Feeds copilot summarize uses domain-specific prompt

#### 3. ONBOARDING_FEATURES_TESTING.md
Add checkpoints for:
- [ ] Onboarding shows 15 domain options
- [ ] Single-select domain picker (not multi-select)
- [ ] Selected domain saved to users.domain
- [ ] Default domain is "medicine" for users who skip selection
- [ ] Domain descriptions are accurate and helpful

#### 4. SETTINGS_FEATURES_TESTING.md
Add checkpoints for:
- [ ] Settings page shows "Research Field" section
- [ ] Current domain is displayed correctly
- [ ] Domain can be changed via dropdown
- [ ] Change persists after page reload
- [ ] Changing domain does NOT affect existing projects

#### 5. PROJECTS_FEATURES_TESTING.md
Add checkpoints for:
- [ ] New projects inherit user's domain
- [ ] Project creation allows domain override
- [ ] Domain override saves to projects.field
- [ ] Project domain displayed in project settings/details

#### 6. FEEDS_FEATURES_TESTING.md
Add checkpoints for:
- [ ] Feed empty state shows domain-relevant suggestions
- [ ] Journal browser filters by domain
- [ ] Physics users see physics journals, not medical
- [ ] Medicine users see all current medical journals (no regression)
- [ ] Feed recommendations use domain instead of medical specialty
- [ ] Copilot summarization uses domain-appropriate prompt

#### 7. PRESENTATION_FEATURES_TESTING.md
Add checkpoints for:
- [ ] Audience types filtered by domain config
- [ ] Physics users see Lab Meeting, not Grand Rounds
- [ ] Medicine users see all current audience types (no regression)
- [ ] Study design extraction uses domain-appropriate vocabulary
- [ ] Callout type matches domain (clinical/experimental/technical)

#### 8. SYSTEMATIC_REVIEW_FEATURES_TESTING.md
Add checkpoints for:
- [ ] SR module hidden for non-medical/biology/psychology domains
- [ ] SR module visible for medicine, biology, psychology
- [ ] PICO extraction hidden for non-medical domains
- [ ] Direct URL to /systematic-review shows gating message for non-medical users

### Format

Follow the existing format in each file. Add a new section at the end:

```markdown
## Multi-Domain Awareness (Added 2026-03-28)

### Domain Selection
- [ ] Checkpoint description
- [ ] Checkpoint description

### Domain-Specific Behavior
- [ ] Checkpoint description
```

## WHAT NOT TO DO
- DO NOT modify any source code
- DO NOT modify existing checkpoints — only ADD new ones
- DO NOT change the format or structure of existing sections

## COMMIT AND PR

```bash
git add *.md  # Only the FEATURES_TESTING.md files at repo root
git commit -m "docs: update 8 feature testing docs with multi-domain checkpoints

- RESEARCH: domain-aware search, source fan-out, evidence badges
- DEEP_RESEARCH: proven path branching, RAG personas, feeds copilot
- ONBOARDING: 15-domain picker, default behavior
- SETTINGS: domain change, project inheritance
- PROJECTS: domain override, inheritance from user
- FEEDS: domain filtering, empty state, copilot prompts
- PRESENTATION: audience types, study designs, callout types
- SYSTEMATIC_REVIEW: visibility gating per domain"

git push -u origin verify/step-07-feature-docs
gh pr create --base main --title "docs: Update feature testing docs with multi-domain checkpoints" --body "Post-build verification Step 7."
```
