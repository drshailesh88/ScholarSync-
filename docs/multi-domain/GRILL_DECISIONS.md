# Multi-Domain Grill Session — Decision Log
## 23 Decisions from Design Tree Walkdown (2026-03-28)

| # | Question | Decision |
|---|----------|----------|
| 1 | Where domain lives | User picks at onboarding → project inherits → per-project override → `?domain=` to API |
| 2 | Specialty picker | Single-tier (15 domains), NOT two-tier with sub-specialties |
| 3 | Domain list | 15 domains: medicine, biology, physics, chemistry, computer_science, engineering, mathematics, social_sciences, economics, psychology, law, humanities, education, environmental, multidisciplinary |
| 4 | DomainConfig shape | Single flat config object (Approach A), not separate files per concern |
| 5 | Config resolution | Once at route level, thread config object down to all consumers |
| 6 | Synonym maps | Inside DomainConfig as array. Empty array for new domains |
| 7 | Systematic review | Visible only for medicine+biology. Feature-flagged off for others. V2 for other domains |
| 8 | Feature flags | Yes, in DomainConfig `features` section. Controls module visibility |
| 9 | Landing page | Keep as-is. Out of scope. Marketing handles targeting via ad copy |
| 10 | Default domain | `medicine` for all existing users. No migration needed |
| 11 | Data flow | user.domain (new column) → project.field (existing column) → `?domain=` query param |
| 12 | Auto-detect | Deferred to v2. V1 is explicit selection only |
| 13 | Deep research | Same engine, two entry paths. Medicine+biology = hardcoded proven. Others = config-driven |
| 14 | Deep research boundary | Medicine + biology ONLY for proven path. Tight, clean boundary |
| 15 | DomainConfig type | Expanded after module audit to include feeds, guidance, presentation, poster fields |
| 16 | Journal feeds | Curate for ALL 15 domains. 15-30 journals each. Best foot forward, no half measures |
| 17 | Learn mode / guide | Same pattern as deep research. Medicine+biology hardcoded. All 15 domains get config-driven personas. Generic academic fallback |
| 18 | Poster templates | Domain-specific for ALL 15 domains. 3-4 templates each |
| 19 | LaTeX templates | 2-4 per domain from official journal sources. UX decisions deferred |
| 20 | Presentation study designs | Vocabulary swap per domain in pre-processor. Same extraction engine |
| 21 | Callout types | Per-domain: medicine=clinical, physics=experimental, CS=technical, etc. |
| 22 | Tool descriptions | Generated dynamically from domain's sources array. No extra config field |
| 23 | Domain changeability | Changeable in Settings, overridable per project, existing projects unaffected |

## Design Principles (emerged from discussion)

1. **Best foot forward** — If a feature is visible to a domain, it must feel purpose-built. No generic placeholders, no "coming soon," no half measures.
2. **Protect proven pipelines** — Medicine deep research and guide prompts are validated against competing tools. Don't route them through config indirection. Hardcode the proven path.
3. **Config-driven everything else** — New domains read from DomainConfig. The medical config is the template/roadmap for building domain-specific content.
4. **One app, domain routing** — NOT a fork. Single codebase, single deployment. Domain is just a parameter that shapes behavior.
5. **Default is medicine** — No domain specified = current behavior. Zero regression for existing users.
