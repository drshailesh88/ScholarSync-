# ScholarSync V2 Strategy: From Ghostwriter to Research Agent

## TL;DR for the Founder

Shailesh — here's the bottom line before we get technical:

**What Aletheia actually is:** It's NOT a product you can buy or a codebase you can fork. It's a *design pattern* — a 3-agent loop (Generator → Verifier → Reviser) built on top of Gemini Deep Think that DeepMind used to do autonomous math research. It was announced 4 days ago (Feb 12, 2026). The key insight is: **splitting "create" and "check" into separate agents dramatically reduces errors**.

**What this means for ScholarSync V2:** Your V1 already has the raw ingredients — PubMed search, Semantic Scholar, OpenAlex, RAG pipeline, synthesis, verification. But right now they're wired as isolated features behind buttons. The Aletheia insight tells us to **rewire them as collaborating agents that check each other's work**.

**The shift:** V1 is "SciSpace meets KhanAmigo" — a writing tool with research bolted on. V2 becomes **"Elicit meets Cursor"** — a research *reasoning engine* with writing as one of many outputs. The copilot doesn't just search for papers; it builds a research argument, verifies every claim, and revises until the logic holds.

---

## 1. What Google Aletheia Actually Does (Decoded for You)

### The Architecture in Plain English

Aletheia has three "subagents" that work in a loop:

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  GENERATOR   │────▶│  VERIFIER    │────▶│  REVISER     │
│              │     │              │     │              │
│ Creates a    │     │ Checks for   │     │ Fixes the    │
│ candidate    │     │ flaws,       │     │ problems     │
│ answer       │     │ hallucina-   │     │ the verifier │
│              │     │ tions, gaps  │     │ found        │
└─────────────┘     └─────────────┘     └──────┬───────┘
       ▲                                        │
       └────────────────────────────────────────┘
                    (loop until clean)
```

The critical insight DeepMind discovered: **the same model that generated a wrong answer will often *defend* that wrong answer if asked to verify it in the same context**. By separating generation and verification into distinct agent calls with fresh context, the verification agent catches errors the generator couldn't see.

### What Aletheia Uses Tools For

- **Google Search**: To verify that citations are real papers (not hallucinated)
- **Web Browsing**: To read actual paper content and verify claims
- **Python execution**: For computational verification

### Key Findings

- On 700 open math problems: 68.5% of answers were wrong, only 6.5% genuinely correct
- But when it works, it REALLY works — fully autonomous research paper, 4 open conjectures solved
- **The verification step is what makes the difference between 65.7% and 95.1% accuracy**

### What's Transferable vs What's Not

| Aletheia Feature | Transferable to ScholarSync? | How |
|---|---|---|
| Generator → Verifier → Reviser loop | **YES — this is the big one** | Apply to literature synthesis, claim extraction, writing quality |
| Tool-augmented verification (search/browse) | **YES** | Your verify.ts already does PubMed/CrossRef checks — expand this |
| Inference-time scaling (think longer) | **Partially** | Use extended thinking models (Claude with `thinking` mode) for complex synthesis |
| Gemini Deep Think as base model | **No** | You're on Anthropic Claude — which has its own extended thinking |
| Autonomous research paper generation | **Not yet** | V3+ territory. V2 should be collaborative, not autonomous |
| Autonomy taxonomy / documentation | **YES** | Great UX pattern — show users what the AI did vs what they did |

---

## 2. Your V1 Architecture — Honest Assessment

### What You've Built (It's Good)

Your V1 is surprisingly solid for a non-technical founder working with AI agents:

**Strong foundations:**
- Real API integrations: PubMed, Semantic Scholar, OpenAlex (not mocked)
- Proper RAG pipeline: decomposer → HyDE → fusion → reranker → compressor
- Source verification against PubMed/CrossRef with retraction detection
- Evidence level classification and journal quality scoring
- Structured research plan generation with MeSH terms
- Literature synthesis with citation tracking
- The Socratic Guide mode is genuinely well-engineered (the 550-line prompt system)

**What's limiting V1 (architecturally):**
1. **Single-agent, single-pass**: Your research-agent does one linear sweep (search → assess → targeted search → synthesize). There's no verification loop.
2. **No agent specialization**: One monolithic agent does search, synthesis, AND recommendation. Aletheia showed that splitting these roles improves quality dramatically.
3. **Synthesis is unverified**: Your `synthesis.ts` generates a literature review, but nothing checks whether the AI correctly represented each paper's findings.
4. **No claim-level verification**: You verify that papers *exist* (verify.ts), but not that the AI's *claims about those papers* are accurate.
5. **Tools are functions, not agents**: Your research tools are pure functions called by a single agent. They can't reason, plan, or check each other.
6. **Studio is feature-tabbed, not agent-orchestrated**: The Studio has tabs (Chat & Learn, Research, Checks) that are isolated panels, not a unified agent workspace.

---

## 3. The V2 Architecture: Multi-Agent Research Engine

### The Core Shift

```
V1: User → Single Agent → Tools → Output
V2: User → Orchestrator Agent → Specialist Agent Teams → Verified Output
```

### The Agent Team Architecture

Here's how to implement the Aletheia pattern for medical literature research:

```
                    ┌──────────────────────┐
                    │   ORCHESTRATOR       │
                    │   (Copilot Brain)    │
                    │                      │
                    │   Reads user intent  │
                    │   Spawns agent teams │
                    │   Reports progress   │
                    └──────────┬───────────┘
                               │
          ┌────────────────────┼────────────────────┐
          ▼                    ▼                     ▼
   ┌──────────────┐   ┌──────────────┐    ┌──────────────┐
   │ SEARCH TEAM  │   │ ANALYSIS TEAM│    │ WRITING TEAM │
   │              │   │              │    │              │
   │ • Searcher   │   │ • Extractor  │    │ • Drafter    │
   │ • Snowballer │   │ • Verifier   │    │ • Verifier   │
   │ • Deduper    │   │ • Synthesizer│    │ • Reviser    │
   └──────────────┘   └──────────────┘    └──────────────┘
```

### Agent Definitions

#### 1. Orchestrator Agent (the "Copilot")
**Role:** Understands user intent, decomposes tasks, spawns subagent teams, reports progress.
**Tools:** spawn_search_team, spawn_analysis_team, spawn_writing_team, report_progress
**Key behavior:** Never does research or writing directly. Only plans and delegates.

#### 2. Search Team
- **Searcher Agent**: Formulates queries across PubMed/S2/OpenAlex (your existing research-agent tools)
- **Snowball Agent**: Takes top papers and runs citation network exploration (your existing exploreCitationNetwork)
- **Dedup Agent**: Merges results, removes duplicates, ranks by relevance (your existing dedup.ts + rank-fusion.ts)
- **Search Verifier**: Checks that returned papers actually exist and aren't retracted (your existing verify.ts)

#### 3. Analysis Team (THE ALETHEIA PATTERN)
This is where the Generator → Verifier → Reviser loop lives:

- **Extractor Agent (Generator)**: Reads papers, extracts claims, PICO elements, key findings, statistical results
- **Claim Verifier Agent (Verifier)**: For each extracted claim, checks: Does the paper's abstract actually say this? Is the statistic cited correctly? Is the study type classified correctly?
- **Synthesis Agent (Reviser)**: Takes verified claims and builds a thematic narrative with inline citations. If the verifier flagged issues, the synthesis agent must address them.

```
Paper Pool → Extractor → Claims → Verifier → Verified Claims → Synthesizer → Draft
                                      │                              │
                                      │ (flags issues)                │
                                      ▼                              ▼
                              "Paper X doesn't        "Revised synthesis
                               actually show           with corrected
                               p<0.05 for              claims"
                               this outcome"
```

#### 4. Writing Team
- **Drafter Agent**: Takes the verified synthesis and writes manuscript sections
- **Writing Verifier**: Checks academic style, citation format, logical flow, evidence strength claims
- **Reviser Agent**: Fixes issues found by the writing verifier

### How Subagents Spawn From the Copilot (Technical Implementation)

With Vercel AI SDK + the agentic patterns, here's how this works in code:

```typescript
// The orchestrator receives user input and spawns teams
const orchestratorResult = streamText({
  model: getModel(),
  system: ORCHESTRATOR_SYSTEM_PROMPT,
  messages,
  tools: {
    spawnSearchTeam: tool({
      description: "Launch a search team to find papers on a topic",
      inputSchema: z.object({
        query: z.string(),
        scope: z.enum(["broad_sweep", "targeted", "snowball"]),
        constraints: z.object({
          yearRange: z.tuple([z.number(), z.number()]).optional(),
          studyTypes: z.array(z.string()).optional(),
          maxPapers: z.number().default(30),
        }),
      }),
      execute: async (params) => {
        // This spawns its own streamText call internally
        return await runSearchTeam(params);
      },
    }),

    spawnAnalysisTeam: tool({
      description: "Launch analysis team with Generate-Verify-Revise loop",
      inputSchema: z.object({
        papers: z.array(paperSchema),
        analysisType: z.enum(["extract_claims", "synthesize", "compare"]),
        question: z.string(),
      }),
      execute: async (params) => {
        return await runAnalysisTeam(params); // GVR loop inside
      },
    }),

    spawnWritingTeam: tool({
      description: "Launch writing team to draft a manuscript section",
      inputSchema: z.object({
        synthesis: z.object({ /* verified synthesis output */ }),
        sectionType: z.enum(["introduction", "methods", "results", "discussion"]),
        style: z.enum(["formal_journal", "thesis", "review"]),
      }),
      execute: async (params) => {
        return await runWritingTeam(params); // Another GVR loop
      },
    }),

    reportProgress: tool({
      description: "Report progress to the user",
      inputSchema: z.object({
        stage: z.string(),
        detail: z.string(),
        percentComplete: z.number(),
      }),
      execute: async (params) => {
        // Streams to the UI via SSE
        return params;
      },
    }),
  },
  maxSteps: 20, // Allow complex orchestration
});
```

The `runAnalysisTeam` function implements the Aletheia loop:

```typescript
async function runAnalysisTeam(params) {
  const MAX_REVISIONS = 3;

  // Step 1: GENERATE — Extract claims from papers
  const extraction = await generateText({
    model: getModel(),
    system: EXTRACTOR_PROMPT,
    prompt: `Extract key claims from these papers: ${JSON.stringify(params.papers)}`,
  });

  let currentClaims = parseClaimsFromExtraction(extraction.text);

  for (let i = 0; i < MAX_REVISIONS; i++) {
    // Step 2: VERIFY — Check each claim against source
    const verification = await generateText({
      model: getModel(),
      system: VERIFIER_PROMPT, // Separate context! This is the Aletheia insight
      prompt: `Verify these claims against the paper abstracts:
        Claims: ${JSON.stringify(currentClaims)}
        Papers: ${JSON.stringify(params.papers)}
        Flag any claim that misrepresents the source.`,
    });

    const issues = parseVerificationIssues(verification.text);

    if (issues.length === 0) break; // Clean — exit loop

    // Step 3: REVISE — Fix flagged claims
    const revision = await generateText({
      model: getModel(),
      system: REVISER_PROMPT,
      prompt: `Revise these claims based on verification feedback:
        Original claims: ${JSON.stringify(currentClaims)}
        Issues found: ${JSON.stringify(issues)}
        Correct the claims or mark as unverifiable.`,
    });

    currentClaims = parseClaimsFromExtraction(revision.text);
  }

  return { verifiedClaims: currentClaims, revisionCount: i };
}
```

---

## 4. The Studio View: Agent Teams in the UI

### Current V1 Studio

Your studio has three tabs: Chat & Learn, Research, Checks — with the Tiptap editor in the center. This is a traditional IDE-style layout.

### V2 Studio: The Agent Canvas

The V2 studio should show agent activity *as it happens*. Think of it like a mission control display:

```
┌─────────────────────────────────────────────────────────────────┐
│ ⚡ ScholarSync Studio                            [Project: ...]  │
├──────────────────────┬──────────────────────┬───────────────────┤
│                      │                      │                   │
│   AGENT ACTIVITY     │     EDITOR           │   EVIDENCE PANEL  │
│                      │     (Tiptap)         │                   │
│ ┌──────────────────┐ │                      │ ┌───────────────┐ │
│ │ 🔍 Search Team   │ │                      │ │ Verified      │ │
│ │  ├─ PubMed: 23   │ │  [Your manuscript    │ │ Claims        │ │
│ │  ├─ S2: 18       │ │   content here]      │ │               │ │
│ │  ├─ OA: 12       │ │                      │ │ ✅ Claim 1    │ │
│ │  └─ Dedup: 34    │ │                      │ │ ✅ Claim 2    │ │
│ │  Status: ✅ Done  │ │                      │ │ ⚠️ Claim 3   │ │
│ ├──────────────────┤ │                      │ │ ✅ Claim 4    │ │
│ │ 🔬 Analysis Team │ │                      │ │               │ │
│ │  ├─ Extracting   │ │                      │ │ [Click to see │ │
│ │  │   claims...   │ │                      │ │  source]      │ │
│ │  ├─ Verify: 2/3  │ │                      │ ├───────────────┤ │
│ │  └─ Revise: 1    │ │                      │ │ Papers (34)   │ │
│ │  Status: 🔄 Loop │ │                      │ │               │ │
│ ├──────────────────┤ │                      │ │ [1] Smith...  │ │
│ │ ✍️ Writing Team  │ │                      │ │ [2] Jones...  │ │
│ │  Status: ⏳ Wait  │ │                      │ │ [3] Chen...   │ │
│ └──────────────────┘ │                      │ └───────────────┘ │
│                      │                      │                   │
│ ┌──────────────────┐ │                      │                   │
│ │ 💬 Copilot Chat  │ │                      │                   │
│ │                  │ │                      │                   │
│ │ What should I    │ │                      │                   │
│ │ research next?   │ │                      │                   │
│ │ [input field]    │ │                      │                   │
│ └──────────────────┘ │                      │                   │
├──────────────────────┴──────────────────────┴───────────────────┤
│ ⚡ 3 agents active · 34 papers found · 12 claims verified       │
└─────────────────────────────────────────────────────────────────┘
```

### Key UI Concepts

1. **Agent Activity Panel (Left)**: Shows each active agent team as a collapsible card with real-time status. Users can see the search queries being run, papers being found, claims being extracted and verified, revision loops happening. This is the "transparency" that Aletheia's autonomy taxonomy calls for.

2. **Evidence Panel (Right)**: Shows verified claims with source links. When the user clicks a claim in their manuscript, it highlights the source paper. When a claim has a ⚠️ warning, it means the verifier flagged it — the user can see why and decide.

3. **Copilot Chat (Bottom Left)**: The natural language interface to the orchestrator. Users say things like "Search for RCTs on SGLT2 inhibitors in heart failure" and see the agent teams spin up in real time above.

4. **Status Bar**: Shows system-wide metrics — how many agents are active, papers found, claims verified.

---

## 5. Implementation Roadmap: V1 → V2

### Phase 1: Foundation (Weeks 1-3)
**Goal:** Refactor existing code into agent-ready architecture

- Extract your existing research-agent route's tools into standalone agent modules
- Create the Orchestrator prompt and routing logic
- Build the `runSearchTeam()`, `runAnalysisTeam()`, `runWritingTeam()` wrappers
- Add Server-Sent Events (SSE) streaming for multi-agent progress reporting
- **Ship:** Same features as V1 but architecturally ready for agents

### Phase 2: The GVR Loop (Weeks 4-6)
**Goal:** Implement the Aletheia Generate-Verify-Revise pattern

- Build the claim extraction agent (paper → structured claims with evidence levels)
- Build the claim verification agent (claim + source → verified/flagged)
- Build the revision agent (flagged claims → corrected claims or "insufficient evidence")
- Wire the loop with max 3 iterations
- Add claim-level confidence scores
- **Ship:** Literature synthesis that says "I'm 94% confident this claim is correctly attributed" vs "⚠️ I couldn't verify this — check the source"

### Phase 3: Agent Canvas UI (Weeks 7-10)
**Goal:** Build the V2 Studio layout

- Agent Activity Panel component (collapsible cards with real-time streaming)
- Evidence Panel with claim-paper linking
- Status bar with agent metrics
- Copilot chat integration with orchestrator
- Animate agent state transitions (spawning, running, done, error)
- **Ship:** The "wow" moment — users see AI agents working in real time

### Phase 4: Advanced Patterns (Weeks 11-14)
**Goal:** Go beyond Aletheia

- **Balanced prompting** (Aletheia discovery): When searching, ask the agent to find BOTH supporting and contradicting evidence simultaneously
- **Cross-paper contradiction detection**: When two papers disagree, flag it explicitly
- **Evidence gap analysis**: After synthesis, identify what questions the evidence DOESN'T answer
- **Human-in-the-loop checkpoints**: Pause agent execution at key decision points and ask the user
- **Autonomy cards**: Show users exactly which parts the AI wrote vs verified vs needs human review
- **Ship:** A genuinely differentiated product that neither SciSpace nor Elicit offers

---

## 6. Technical Decisions for V2

### AI SDK Layer
**Recommendation: Stay with Vercel AI SDK v5 + add agent orchestration yourself**

Why not Mastra? Mastra is great for simple agent chains, but for the GVR loop pattern you need fine-grained control over:
- When to break the loop (custom verification thresholds)
- How to stream progress from nested agents to the UI
- How to share paper context between agents efficiently

The Vercel AI SDK's `streamText()` with `tools` and `maxSteps` gives you everything you need. The orchestration is just TypeScript functions calling `generateText()` in a loop.

### Model Selection
**Recommendation: Claude Sonnet 4.5 for agents, Claude Haiku 4.5 for verification**

- **Generator/Synthesizer agents**: Sonnet (needs strong reasoning)
- **Verifier agents**: Haiku (cheaper, faster — verification is a simpler task)
- **Orchestrator**: Sonnet (needs planning ability)

This keeps costs manageable while maintaining quality where it matters.

### Database
**Recommendation: PostgreSQL + pgvector (you already have this)**

Stay with what you have. The agent architecture doesn't change database requirements. You might add:
- `agent_runs` table: Track each agent execution, inputs, outputs, duration
- `verified_claims` table: Store extracted and verified claims with confidence scores
- `agent_audit_log`: For the autonomy cards / transparency feature

### Infrastructure
**No changes needed for V2.** Your current Next.js + Cloud Run architecture handles this fine. Agent loops are just API route handler logic — they don't need separate containers.

---

## 7. What NOT to Do (Lessons from Aletheia's Failures)

1. **Don't make it fully autonomous.** Aletheia got 6.5% correct on open research problems. For medical literature, incorrect synthesis is dangerous. Keep the human in the loop.

2. **Don't let agents cite papers they haven't verified.** This is Aletheia's biggest lesson — even with search tools, the model misrepresented paper contents. Your claim verification agent is the defense against this.

3. **Don't over-engineer the agent framework.** You don't need LangGraph, CrewAI, or AutoGen. The GVR pattern is three `generateText()` calls in a for-loop. Keep it simple.

4. **Don't show all agent internals to users.** Show progress and results, not raw prompt/response pairs. Users want to see "Verifying claim 3 of 12..." not the actual verification prompt.

5. **Don't try to replace the Socratic Guide mode.** Your Learn Mode is excellent. The agent architecture is for the Research and Draft modes. Keep Learn Mode as the single-agent Socratic tutor — that's a feature, not a limitation.

---

## 8. Competitive Positioning After V2

| Feature | SciSpace | Elicit | ScholarSync V2 |
|---|---|---|---|
| Paper search | ✅ | ✅ | ✅ |
| AI synthesis | ✅ | ✅ | ✅ + Verified |
| Claim verification | ❌ | Partial | ✅ (GVR loop) |
| Agent transparency | ❌ | ❌ | ✅ (Agent Canvas) |
| Writing assistant | ✅ (ghostwriter) | ❌ | ✅ (research-first) |
| Socratic teaching | ❌ | ❌ | ✅ (Guide Mode) |
| Evidence gap analysis | ❌ | ✅ | ✅ |
| Real-time agent activity | ❌ | ❌ | ✅ |

**Your unique angle: The only platform that shows you HOW the AI reached its conclusions and VERIFIES every claim before presenting it.**

---

## 9. One-Line Summary

**V2 ScholarSync = V1 features + Aletheia's Generate-Verify-Revise loop + Agent Canvas UI = a research assistant that doesn't just find papers, but builds verified arguments you can trust.**
