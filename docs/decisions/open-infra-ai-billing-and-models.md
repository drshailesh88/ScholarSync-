# Open infra decisions — AI billing + model strategy (TO DISCUSS, not yet ratified)

Captured 2026-07-06 from the founder. **Not decided — parked for a dedicated discussion.**
Do not implement without an explicit go.

## 1. Integrated billing centre → OpenRouter
- **Candidate:** route AI through **OpenRouter** as a single integrated billing centre (one
  account, one bill, unified spend/observability across models) rather than per-provider keys.
- Status: candidate. Trade-off vs direct provider keys (see open question #3).

## 2. Model strategy — default to DeepSeek V4 Flash; keep GPT-5.2 only where quality matters
- **Rationale (founder):** "the stakes are very, very low here." Prefer **DeepSeek V4 Flash**
  as the default model for most tasks.
- **Precedent cited:** Lindy publicly described migrating their AI provider entirely to
  DeepSeek because frontier-model inference cost "did not seem to decrease." *"If Lindy can do
  it, we can also do it."*
- **The one exception to keep:** **GPT-5.2** for **deep-research synthesis** — the one place a
  high-quality model earns its keep. Deep research is currently tied to GPT-5.2
  (`getDeepResearchModel()` → `getOpenAI()("gpt-5.2")`) — **keep it.**
- Implication if adopted: `getModel`/`getSmallModel`/`getBigModel`/etc. → DeepSeek V4 Flash;
  `getDeepResearchModel` stays GPT-5.2. (Already partway there: video notes now use a fast
  model, `getFastNotesModel`.)

## 3. Open question — OpenRouter vs direct API pricing
- **Founder:** "I don't know what the rate difference would be in procuring the APIs from
  OpenRouter vs procuring directly from OpenAI" — especially for **GPT-5.2** (deep research).
- To resolve before ratifying #1: compare OpenRouter markup vs direct OpenAI/DeepSeek pricing
  for the models actually used, so centralized billing doesn't quietly cost a premium on the
  one expensive model (GPT-5.2).

---
*Verbatim founder framing preserved above. These are "random thoughts to lock for a later
discussion," not directives. Revisit as a batch.*
