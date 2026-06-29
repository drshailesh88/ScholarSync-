"""
Modal app for Manan OS's self-hosted GENERAL-DOMAIN (web) cross-encoder reranker.

This is the non-biomedical sibling of `medcpt_service.py`'s CrossEncoder: the same
self-hosted, scale-to-zero, throttle-proof rerank lane, but tuned for general web
content (news, encyclopedic, docs, forums) instead of PubMed abstracts. It exists so
the web/non-academic search path can rerank with a model trained on web text rather
than borrowing the biomedical MedCPT cross-encoder (which is mis-domained for web
queries) or paying Cohere's per-call rate limit.

One responsibility, one app, scale-to-zero (no idle GPU cost):

  WebReranker — a web endpoint serving `BAAI/bge-reranker-v2-m3`. The live web search
  lane POSTs `{ "query": str, "documents": [str] }` and gets back
  `{ "scores": [float] }` — one RAW relevance logit per document, IN INPUT ORDER
  (higher = more relevant). This is the IDENTICAL request/response contract the MedCPT
  CrossEncoder exposes, so it is a drop-in for `rerankMedcpt` in
  `src/lib/search/rerank.ts`: that client squashes each logit through a sigmoid
  (`logitToProbability`) into the [0,1] relevance the ranking composite expects. The
  deployed endpoint URL is what `WEB_RERANK_URL` will point at.

Model choice — BAAI/bge-reranker-v2-m3:
  * License: Apache-2.0 (permissive, commercial-OK) — unlike jina-reranker-v2
    (cc-by-nc-4.0, non-commercial) which is disqualifying here.
  * Pattern parity: a classic cross-encoder loaded with
    AutoModelForSequenceClassification that emits ONE raw relevance logit per pair —
    byte-for-byte the same load + read-out as MedCPT-Cross-Encoder, so the sigmoid
    contract in rerank.ts is preserved with zero client changes (vs. mxbai-rerank-v2,
    a 1.5B generative/listwise model needing a bespoke library + bigger GPU).
  * Size/latency/GPU fit: ~0.6B params (bge-m3 backbone). Batching ~50
    (query, document) pairs is one forward pass that fits comfortably on an A10G
    (and would fit a T4/L4) — so idle cost is $0 (scale-to-zero) and warm rerank is
    sub-second.
  * Quality: strong general + multilingual reranker on BEIR-style web retrieval,
    the de-facto open general-domain reranker as of 2026.

Secret (never hardcoded) comes from a Modal Secret named `manan-web-reranker-secrets`
holding HF_TOKEN (bge models are ungated-free, but a token avoids anonymous HF rate
limits on cold pulls). Create it once with op-run so the token never touches chat:

    op-run -- modal secret create manan-web-reranker-secrets HF_TOKEN="$HF_TOKEN"

Deploy / operate (all via op-run so creds are injected from 1Password):

    op-run -- modal deploy infra/modal/web_reranker_service.py    # serve the reranker

API/library versions verified against Context7 (Modal cls/enter/fastapi_endpoint, GPU
strings) + the BAAI/bge-reranker-v2-m3 model card on 2026-06-29 (Apache-2.0,
AutoModelForSequenceClassification single-logit read-out, max_length 512).
"""

from __future__ import annotations

import os

import modal

# ---------------------------------------------------------------------------
# Configuration (constants; env/secret-driven values are read at runtime).
# ---------------------------------------------------------------------------
APP_NAME = "manan-web-reranker"
RERANKER_MODEL = "BAAI/bge-reranker-v2-m3"
# bge-reranker-v2-m3's tokenizer truncates the (query, document) pair to 512 tokens,
# exactly as the MedCPT cross-encoder does — long web docs are truncated, not rejected.
RERANK_MAX_LEN = 512

# ---------------------------------------------------------------------------
# Image + app. torch/transformers are only imported on the remote containers (via
# image.imports), so deploying this file locally needs nothing but the `modal` client.
# Versions pinned to match medcpt_service.py for one reproducible torch/transformers ABI.
# ---------------------------------------------------------------------------
image = (
    modal.Image.debian_slim(python_version="3.11")
    .pip_install(
        "torch==2.4.1",
        "transformers==4.44.2",
        "numpy==2.1.1",
        "fastapi[standard]==0.115.0",
    )
)

app = modal.App(APP_NAME, image=image)

# Cache HF weights across container starts so scale-to-zero stays cheap+fast.
hf_cache = modal.Volume.from_name("web-reranker-hf-cache", create_if_missing=True)

SECRET = modal.Secret.from_name(
    "manan-web-reranker-secrets", required_keys=["HF_TOKEN"]
)

with image.imports():
    import torch
    from transformers import AutoModelForSequenceClassification, AutoTokenizer


# ===========================================================================
# General-domain cross-encoder reranker — self-hosted, throttle-proof replacement
# for the external (rate-limited) reranker on the WEB path. Scale-to-zero GPU:
# $0 idle, warms on use.
# ===========================================================================
# Reranking runs POST-fusion over the top ~50 fused candidates — NOT inside the live
# fan-out deadline — so a brief warm-up is acceptable. An A10G batches all ~50
# (query, document) pairs in one forward pass (~0.3-0.8s warm). Scale-to-zero keeps
# idle cost at $0; `scaledown_window` holds the replica warm across a run's query gaps
# so it does not cold-start mid-request. The lane FAILS OPEN: on cold start, timeout,
# or error the caller keeps the pre-rerank order (see rerank.ts).
@app.cls(
    image=image,
    gpu="A10G",
    volumes={"/cache": hf_cache},
    secrets=[SECRET],
    scaledown_window=300,
    timeout=600,
)
class WebReranker:
    @modal.enter()
    def load(self):
        os.environ.setdefault("HF_HOME", "/cache")
        self.device = "cuda" if torch.cuda.is_available() else "cpu"
        self.tokenizer = AutoTokenizer.from_pretrained(RERANKER_MODEL)
        self.model = (
            AutoModelForSequenceClassification.from_pretrained(RERANKER_MODEL)
            .to(self.device)
            .eval()
        )

    @modal.fastapi_endpoint(method="POST")
    def rerank(self, item: dict):
        """POST { query: str, documents: [str] } -> { scores: [float] }.

        bge-reranker-v2-m3 relevance logit per (query, document) pair, in input order
        (higher = more relevant). RAW logit — NOT sigmoid-squashed here — exactly like
        the MedCPT cross-encoder, so the client (`rerankMedcpt`/`rerankWeb` in
        rerank.ts) applies the SAME `logitToProbability` sigmoid to get the [0,1]
        relevance the ranking composite carries. An empty/short input returns no scores
        (caller keeps its order).
        """
        query = (item or {}).get("query", "")
        documents = (item or {}).get("documents", [])
        if not isinstance(query, str) or not query.strip() or not documents:
            return {"scores": []}
        pairs = [[query, str(d)] for d in documents]
        with torch.no_grad():
            encoded = self.tokenizer(
                pairs,
                truncation=True,
                padding=True,
                return_tensors="pt",
                max_length=RERANK_MAX_LEN,
            ).to(self.device)
            # bge-reranker emits a single relevance logit per pair; `.view(-1)` flattens
            # the [N, 1] logits to [N] (matching the model card's read-out) so an N=1
            # request still returns a list, never a scalar.
            logits = self.model(**encoded).logits.view(-1)
        return {"scores": logits.cpu().to(torch.float32).numpy().tolist()}
