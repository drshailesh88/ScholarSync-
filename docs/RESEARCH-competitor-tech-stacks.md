# ScholarSync - Competitor Tech Stack Research

> **Date:** 2026-02-11
> **Status:** Research complete

---

## Elicit ($31M raised, 400K MAU, ~15 people)

| Layer | Technology |
|-------|-----------|
| **Cloud** | Multi-cloud Kubernetes (likely GCP + AWS) |
| **Frontend (App)** | Next.js, TypeScript |
| **Frontend (Marketing)** | Framer |
| **Backend** | Node.js (BFF layer), Python (ML/AI) |
| **Search Engine** | **Vespa** (hybrid lexical + vector search) |
| **Search Models** | SPLADE, custom embeddings, MonoT5 cross-encoders, BM25 |
| **LLMs** | GPT-4, GPT-3.5, Claude (Anthropic), Llama (fine-tuned), custom fine-tuned T5 |
| **Workflow Orchestration** | Flyte |
| **Data Processing** | Apache Spark |
| **Paper Sources** | Semantic Scholar + OpenAlex + PubMed (~138M deduplicated) |
| **Version Control** | GitHub |

### Key Architecture Decisions
- Uses **Vespa** instead of a vector DB. Wrote blog post "Build a Search Engine, Not a Vector DB"
- Multi-model strategy: budget split roughly equally between closed (GPT-4, Claude) and open (Llama, T5) models
- **Constitutional AI fine-tuning** reduced abstract summarization costs to 1/10th
- **Factored Cognition**: Complex tasks decomposed into smaller, verifiable sub-tasks
- Reduced hallucinations from 1.5 to 0.5 per output through strict counting and distillation
- Custom **streaming task execution engine** for compositional LM tasks
- SPLADE for learned sparse representations combining keyword + semantic matching

### Funding
- Seed: $9M (Fifty Years)
- Series A: $22M at $100M valuation (Spark Capital, Footwork)
- Angel investors: Tom Preston-Werner (GitHub), Arash Ferdowsi (Dropbox), Jeff Dean (Google)

---

## Paperpal / CACTUS (Bootstrapped to ~$92M revenue, 3M+ users, 2,700 employees)

| Layer | Technology |
|-------|-----------|
| **Cloud** | **AWS** (primary) + some GCP |
| **Frontend** | React + Redux, Angular |
| **Backend** | Node.js/Express, Python/Django, FastAPI |
| **Database** | **MongoDB** (primary), DynamoDB, Redis (cache), Hadoop (analytics) |
| **ML Training** | AWS SageMaker (41% training time reduction) |
| **LLMs** | Proprietary academic-trained + OpenAI + Anthropic + Google GenAI via Bedrock |
| **PDF Parsing** | **GROBID** (multiple forked versions) |
| **Infra-as-code** | Terraform |
| **Monitoring** | Prometheus, Graylog |

### Key Architecture Decisions
- **Proprietary models trained on millions of academic sentences** edited by professional editors across 1,300+ subject areas
- Acquired **UNSILO** (Danish NLP startup) for scholarly text analytics
- Multi-model architecture: routes different tasks to different models (proprietary for academic, commercial LLMs for general)
- **Preflight** product: 35+ AI checks for research integrity, processes manuscripts in <3 minutes
- Plagiarism detection scans against 99 billion webpages + 200M Open Access articles
- **Bootstrapped** — $0 VC funding, built over 20+ years from CACTUS editing services

### Parent Company: CACTUS Communications
- Founded 2002, Mumbai, India
- Revenue: Rs. 771 Crore (~$92M) FY March 2024
- 2,700+ employees globally
- Brands: Editage, Paperpal, UNSILO, R Discovery, Mind the Graph

---

## Consensus.app ($19.2M raised, 1M+ users, ~29 people)

| Layer | Technology |
|-------|-----------|
| **Cloud** | **GCP** |
| **Search Engine** | **Elasticsearch** + ELSER (semantic search) |
| **Search Architecture** | Three-stage hybrid: semantic AI + BM25 + exact phrase + fuzzy matching |
| **LLMs** | Customized GPT-4 + proprietary fine-tuned models |
| **RAG** | Elasticsearch results → GPT-4 for synthesis |
| **Paper Sources** | Semantic Scholar, OpenAlex, PubMed, Crossref, ORCID |

### Key Stats
- Search latency reduced from ~4s to <1s after ELSER deployment
- 30% increase in search accuracy
- Key hire: Chris Varano (formerly Amazon Search, Google)

---

## Jenni AI ($850K raised, $10M ARR, 3M+ users, 23 people)

| Layer | Technology |
|-------|-----------|
| **Cloud** | **GCP** |
| **Frontend** | React + MobX |
| **Backend** | Node.js + TypeScript |
| **LLMs** | OpenAI GPT (RAG architecture) |

### Key Stats
- Most capital-efficient competitor: $10M ARR on $850K funding
- Started as SEO copywriting tool, pivoted to academic writing
- Growth: $2K MRR → $150K MRR in 18 months (481% YoY)

---

## Connected Papers (Bootstrapped, 4 people, Israel)

| Layer | Technology |
|-------|-----------|
| **Cloud** | **Azure** (via Microsoft for Startups) |
| **Data Source** | Semantic Scholar Open Corpus & APIs |
| **Core Algorithm** | Co-citation analysis + bibliographic coupling |
| **API Client** | JavaScript/TypeScript (`connectedpapers-js` on GitHub) |

---

## ResearchRabbit / Litmaps ($1M raised, 2M+ users combined)

| Layer | Technology |
|-------|-----------|
| **Cloud** | **Azure** (likely, via Microsoft for Startups) |
| **Core Technology** | Citation mapping via co-citation analysis |
| **Embeddings** | SPECTER (since 2021 under Litmaps) |
| **Data Sources** | Nature, The Lancet, PubMed, arXiv |

---

## Cloud Provider Patterns

| Cloud | Used By |
|-------|---------|
| **GCP** | Consensus, Jenni AI, partially Elicit |
| **AWS** | Paperpal/CACTUS (primary), partially Elicit |
| **Azure** | Connected Papers, ResearchRabbit/Litmaps |

**GCP is the most popular choice among smaller, leaner startups.**

---

## Comparative Summary

| Dimension | Paperpal | Elicit | Consensus | Jenni AI | Connected Papers |
|-----------|---------|--------|-----------|---------|-----------------|
| **Cloud** | AWS | Multi-cloud K8s | GCP | GCP | Azure |
| **Database** | MongoDB + DynamoDB | Vespa | Elasticsearch | Unknown | S2 API |
| **AI Models** | Proprietary + commercial | Multi-model (GPT-4/Claude/Llama) | Custom GPT-4 | OpenAI GPT | N/A |
| **Funding** | $0 (bootstrapped) | $31M | $19.2M | $850K | ~$0 |
| **Revenue** | ~$92M (CACTUS total) | Millions ARR | ~$2M ARR | $10M ARR | Unknown |
| **Team** | 2,700+ (300+ tech) | ~15 | ~29 | 23 | 4 |
| **Users** | 3M+ | 400K MAU | 1M+ | 3M+ | Large |
