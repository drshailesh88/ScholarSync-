# The Doctor's Guide to Self-Annealing
## How to Harden Your App While You're Seeing Patients

---

## What You Need in Your Repo

```
your-app/
  docs/
    modules/         ← Your module documentation (one .md per module)
    journeys/        ← Your user journey documentation (one .md per journey)
  src/               ← Your Next.js source code
  program.md         ← Copy from this system (the agent's instruction file)
  quality-score.mjs  ← Copy from this system (the measurement script)
  package.json
  tsconfig.json
```

**Before your first session**, make sure:
1. All your module docs are in the repo (the agent reads these to generate tests)
2. All your user journey docs are in the repo (the agent creates E2E tests from these)
3. The app builds and runs with `npm run dev`

---

## Session 1: The Kickoff

Open Claude Code on web. Paste this:

```
Read program.md in the project root. This is your master instruction file.
You are an enterprise self-annealing quality agent.

FIRST: Read ALL documentation files in docs/modules/ and docs/journeys/.
These are the source of truth for what the app should do. Every test you write
must trace back to something documented.

THEN: Run Phase 0 setup (install test infra if missing, create configs).
THEN: Run node quality-score.mjs for baseline scores.
THEN: Start Phase 1 (Foundation) and work through it systematically.

Create a git branch: hardening/session-1
Commit after every successful improvement.
Log everything to annealing-log.jsonl.

Your goal is to make this app enterprise-grade. Leave no stone unturned.
Go.
```

**Then close your laptop and go see patients.**

---

## Session 2+: Continuing

Open Claude Code on web. Paste this:

```
Read program.md in the project root.
Read annealing-log.jsonl to understand all previous work.
Run: git log --oneline -30
Run: node quality-score.mjs

You are continuing the self-annealing process.
Determine which phase you're in from the scores and log.
Continue from exactly where the last session stopped.

Work on branch: hardening/session-N (increment N).
Follow the phase gates — don't skip ahead.
Go.
```

---

## What to Expect Per Phase

### Phase 1: Foundation (Sessions 1-2)
The agent will:
- Enable TypeScript strict mode and fix all type errors
- Set up ESLint with security and accessibility plugins
- Add error.tsx and loading.tsx to every route
- Harden every API route with try/catch, validation, proper status codes

**You'll see:** Lots of small commits fixing types and adding error boundaries.

### Phase 2: Spec-Driven Testing (Sessions 3-6)
The agent will:
- Read every module doc and create test plans
- Write unit tests for every documented feature
- Write integration tests for module interactions
- Write E2E tests for every documented user journey
- Test every form exhaustively (validation, edge cases, submission)

**You'll see:** Test plan files appearing, then dozens of test files.
This is the longest phase — it's where most of the value is created.

### Phase 3: Resilience (Sessions 7-8)
The agent will:
- Test every page under network failure conditions
- Ensure every component handles empty/null/missing data
- Test race conditions (double-clicks, navigation during save, etc.)
- Verify state consistency (refresh, back button, deep links)
- Audit error message quality

**You'll see:** E2E resilience tests, improved error handling code.

### Phase 4: Security (Sessions 9-10)
The agent will:
- Test every protected route for auth bypass
- Test every input for injection (SQL, XSS, NoSQL)
- Test authorization (IDOR — can user A access user B's data?)
- Audit for data exposure in client code
- Fix dependency vulnerabilities

**You'll see:** Security test files, API route hardening commits.

### Phase 5: Polish (Sessions 11-12)
The agent will:
- Run accessibility audit on every page
- Fix keyboard navigation issues
- Check performance patterns
- Handle UX edge cases (timezone, pluralization, zoom)
- Remove dead code and unused dependencies

**You'll see:** Accessibility fixes, small UX improvements.

---

## Checking Progress (Takes 2 Minutes)

At lunch or end of day:

```bash
# Quick summary
cat annealing-log.jsonl | tail -5

# See the score trend
cat annealing-log.jsonl | python3 -c "
import sys, json
for line in sys.stdin:
    d = json.loads(line.strip())
    if 'composite' in d:
        bar = '█' * int(d['composite'] / 5)
        print(f\"{d.get('timestamp','')[:16]}  {bar} {d['composite']}  Phase {d.get('currentPhase','?')}  {d.get('temperature','')}\")
"

# See what changed
git log --oneline -20

# Run fresh score
node quality-score.mjs
```

---

## When the Agent Gets Stuck

Sometimes Claude Code will hit a wall. Common situations:

**"I need to know how the auth system works"**
→ Make sure `docs/modules/auth.md` covers the implementation details

**"I can't run E2E tests because the app needs a database"**
→ Add a note to program.md about your dev setup:
```
DEV SETUP NOTES:
- Database: Use SQLite for local dev (already in .env.local)
- Auth: Use test credentials: test@example.com / testpass123
- Seed data: Run `npm run seed` before E2E tests
```

**"The E2E tests fail because I can't see the actual UI"**
→ This is expected. The agent uses Playwright's locators (getByRole, getByText).
If selectors are wrong, the agent will adjust. But some visual issues can only
be caught by you in manual testing.

**"I don't know if this business logic is correct"**
→ The agent should flag this in the session summary under "blockers."
This is YOUR job during manual testing.

---

## What Manual Testing Should Focus On

After the annealing converges (composite > 95), here's what the agent
explicitly CANNOT test that you need to:

### Visual & Design (15 min)
- Does the UI look right? (spacing, alignment, colors)
- Do animations and transitions feel smooth?
- Does it look good on your actual phone?
- Do charts/graphs render correctly with real data?

### Business Logic (30 min)
- Are calculations correct? (pricing, metrics, aggregations)
- Do date ranges work correctly across timezones?
- Are permissions/roles working as the business requires?
- Do notifications/emails fire at the right time?

### Real Third-Party Integrations (20 min)
- Does real OAuth login work (not mocked)?
- Does real payment processing work (Stripe test mode)?
- Do real webhooks arrive and process correctly?
- Do real email/SMS notifications send?

### Subjective Quality (15 min)
- Is the onboarding flow intuitive?
- Are error messages helpful to a real user?
- Is the information architecture logical?
- Does the search find what you expect?

### Stress Test (10 min)
- Upload a very large file
- Load a page with 10,000 records
- Open in 5 tabs simultaneously
- Use on a slow 3G network (Chrome DevTools throttling)

**Total manual testing time: ~90 minutes**

That's it. The agent has already covered everything else.

---

## Customization Tips

### For a Medical/Health SaaS:
Add to program.md:
```
DOMAIN-SPECIFIC REQUIREMENTS:
- HIPAA: No PHI in logs, error messages, or client-side state
- Audit trail: Every data modification must be logged
- Session timeout: Must enforce 15-minute inactivity timeout
- Data encryption: Verify all API calls use HTTPS
- Access logging: Every login attempt must be recorded
```

### For a Financial SaaS:
```
DOMAIN-SPECIFIC REQUIREMENTS:
- All monetary calculations must use integer cents (no floating point)
- Currency display must respect locale
- All financial operations must be idempotent
- Double-entry: every transaction must balance
- Audit trail: immutable log of all financial events
```

### For a Multi-Tenant SaaS:
```
DOMAIN-SPECIFIC REQUIREMENTS:
- Tenant isolation: User from Org A must NEVER see Org B's data
- Test with 2+ test organizations
- Every API query must filter by tenant_id
- Shared resources (if any) must be explicitly scoped
- Admin vs member permissions per tenant
```

---

## The Big Picture

```
          You (human)                    Agent (Claude Code)
          ──────────                     ──────────────────
          Write docs                     Read docs
          Write program.md               Follow program.md
          Review progress at lunch       Run 24/7 in sessions
          Manual test at end             Automated test everything
          Fix business logic             Fix code quality
          Judge visual design            Fix accessibility
          Test real integrations         Mock and test everything else

          ↓                              ↓
          Domain expertise               Systematic coverage
          Taste & judgment               Exhaustive iteration
          10% of the work                90% of the work
```

This is the same division of labor as Karpathy's autoresearch:
**the human iterates on the prompt, the agent iterates on the code.**

Your documentation IS the prompt. The better your docs, the better the agent's tests.
