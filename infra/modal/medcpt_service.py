"""
Modal app for Manan OS's self-hosted MedCPT dense retrieval lane.

Two responsibilities, one app, scale-to-zero (no idle GPU cost):

  1. QueryEncoder — a web endpoint serving `ncbi/MedCPT-Query-Encoder`. The live
     search lane (`src/lib/search/sources/medcpt-dense.ts`) POSTs `{ "query": ... }`
     and gets back `{ "embedding": [768 floats] }`. The deployed endpoint URL is
     what `MEDCPT_QUERY_ENCODER_URL` points at.

  2. freshness / backfill — ONE pipeline, two entrypoints. It pulls PubMed XML
     from NCBI's FTP, parses new/changed/deleted records (`pubmed_parser`,
     honoring the delete flag), embeds title+abstract with
     `ncbi/MedCPT-Article-Encoder`, and upserts int8 vectors into Turbopuffer
     (deleting dropped PMIDs by id). The SAME code does the one-time 2024–2026
     gap backfill (`backfill`) and the recurring WEEKLY freshness run
     (`freshness`, scheduled).

Secrets (never hardcoded) come from a Modal Secret named `manan-medcpt-secrets`
holding HF_TOKEN (to pull the gated-free ncbi/MedCPT-* models) and
TURBOPUFFER_API_KEY. Create it once with op-run so the token never touches chat:

    op-run -- modal secret create manan-medcpt-secrets \
        HF_TOKEN="$HF_TOKEN" \
        TURBOPUFFER_API_KEY="$TURBOPUFFER_API_KEY"

Deploy / operate (all via op-run so creds are injected from 1Password):

    op-run -- modal deploy infra/modal/medcpt_service.py            # serve encoder + schedule freshness
    op-run -- modal run    infra/modal/medcpt_service.py::backfill \
        --year-start 2024 --year-end 2026                          # one-time gap fill (~$3-15)

API/library versions verified against Context7 + the NCBI model cards on
2026-06-25 (Modal cls/enter/fastapi_endpoint/Cron, MedCPT CLS-pooled 768-d
encoders, Turbopuffer `[768]i8` ANN schema + cosine_distance, pubmed_parser
parse_medline_xml delete flag). int8 (not binary) is delegated to Turbopuffer's
native `i8` vector type — no self-managed faiss index.
"""

from __future__ import annotations

import os
import re

import modal

# ---------------------------------------------------------------------------
# Configuration (constants; env/secret-driven values are read at runtime).
# ---------------------------------------------------------------------------
APP_NAME = "manan-medcpt"
QUERY_ENCODER_MODEL = "ncbi/MedCPT-Query-Encoder"
ARTICLE_ENCODER_MODEL = "ncbi/MedCPT-Article-Encoder"
EMBED_DIM = 768
QUERY_MAX_LEN = 64        # per the MedCPT Query-Encoder model card
ARTICLE_MAX_LEN = 512     # per the MedCPT Article-Encoder model card
EMBED_BATCH_SIZE = 64

DEFAULT_NAMESPACE = "medcpt-pubmed"
PUBMED_FTP_BASE = "https://ftp.ncbi.nlm.nih.gov/pubmed"

# Freshness cadence. WEEKLY by default (Mondays 06:00 UTC). To change the cadence,
# edit this and redeploy — it is the single source of truth for the schedule.
FRESHNESS_CRON = "0 6 * * 1"

# ---------------------------------------------------------------------------
# Image + app. torch/transformers/turbopuffer/pubmed_parser are only imported on
# the remote containers (via image.imports), so deploying this file locally needs
# nothing but the `modal` client.
# ---------------------------------------------------------------------------
image = (
    modal.Image.debian_slim(python_version="3.11")
    .pip_install(
        "torch==2.4.1",
        "transformers==4.44.2",
        "turbopuffer==0.5.7",
        "pubmed_parser==0.5.1",
        "numpy==2.1.1",
        "requests==2.32.3",
        "fastapi[standard]==0.115.0",
    )
)

app = modal.App(APP_NAME, image=image)

# Cache HF weights across container starts so scale-to-zero stays cheap+fast.
hf_cache = modal.Volume.from_name("medcpt-hf-cache", create_if_missing=True)
# Persists the last-processed updatefile so weekly runs are incremental.
state = modal.Dict.from_name("medcpt-freshness-state", create_if_missing=True)

SECRET = modal.Secret.from_name(
    "manan-medcpt-secrets", required_keys=["HF_TOKEN", "TURBOPUFFER_API_KEY"]
)

with image.imports():
    import requests
    import torch
    from transformers import AutoModel, AutoTokenizer


# ===========================================================================
# Shared helpers (pure-ish; the embedding + Turbopuffer logic both entrypoints use)
# ===========================================================================
def _turbopuffer_namespace():
    """Open the MedCPT namespace. Region + key come from env/secret, never hardcoded."""
    import turbopuffer

    region = os.environ.get("TURBOPUFFER_REGION", "aws-us-east-1")
    client = turbopuffer.Turbopuffer(
        api_key=os.environ["TURBOPUFFER_API_KEY"], region=region
    )
    namespace = os.environ.get("MEDCPT_TURBOPUFFER_NAMESPACE", DEFAULT_NAMESPACE)
    return client.namespace(namespace)


# Schema declares the vector column as native int8 (`[768]i8`, ann=True) so vectors
# are stored 4x smaller at ~99% recall (±0.001) — Turbopuffer quantizes the float
# vectors we write. title is BM25-indexed so this same namespace can later serve the
# optional Phase-0 lexical lane (one store, hybrid search) without a migration.
TPUF_SCHEMA = {
    "vector": {"type": f"[{EMBED_DIM}]i8", "ann": True},
    "pmid": {"type": "string"},
    "title": {"type": "string", "full_text_search": True},
    "abstract": {"type": "string"},
    "journal": {"type": "string"},
    "year": {"type": "uint"},
    "authors": {"type": "[]string"},
    "doi": {"type": "string"},
}


def _embed_articles(model, tokenizer, articles):
    """Embed [[title, abstract], ...] with the Article-Encoder → list of 768-d floats.

    CLS-pooled (`last_hidden_state[:, 0, :]`) exactly per the model card, batched to
    keep GPU memory bounded.
    """
    out = []
    for start in range(0, len(articles), EMBED_BATCH_SIZE):
        batch = articles[start : start + EMBED_BATCH_SIZE]
        with torch.no_grad():
            encoded = tokenizer(
                batch,
                truncation=True,
                padding=True,
                return_tensors="pt",
                max_length=ARTICLE_MAX_LEN,
            ).to("cuda")
            embeds = model(**encoded).last_hidden_state[:, 0, :]
        out.extend(embeds.cpu().to(torch.float32).numpy().tolist())
    return out


def _split_records(records, year_min=None, year_max=None):
    """Partition parsed MEDLINE records into (to_upsert, pmids_to_delete).

    Honors pubmed_parser's `delete` flag (DeleteCitation entries in updatefiles).
    Records without an abstract are skipped for embedding (nothing to embed on),
    and an optional [year_min, year_max] window is applied for the gap backfill.
    """
    to_upsert, to_delete = [], []
    for rec in records:
        pmid = str(rec.get("pmid") or "").strip()
        if not pmid:
            continue
        if rec.get("delete"):
            to_delete.append(pmid)
            continue
        title = (rec.get("title") or "").strip()
        abstract = (rec.get("abstract") or "").strip()
        if not title or not abstract:
            continue
        year = _parse_year(rec)
        if year_min is not None and (year == 0 or year < year_min):
            continue
        if year_max is not None and year != 0 and year > year_max:
            continue
        authors = rec.get("authors")
        if isinstance(authors, str):
            authors = [a.strip() for a in authors.split(";") if a.strip()]
        to_upsert.append(
            {
                "pmid": pmid,
                "title": title,
                "abstract": abstract,
                "journal": (rec.get("journal") or "").strip(),
                "year": year,
                "authors": authors or [],
                "doi": (rec.get("doi") or "").strip(),
            }
        )
    return to_upsert, to_delete


def _parse_year(rec) -> int:
    raw = rec.get("pubdate") or rec.get("year") or ""
    match = re.search(r"\d{4}", str(raw))
    return int(match.group(0)) if match else 0


def _list_remote_gz(subdir: str):
    """Scrape the NCBI FTP HTTPS directory index for `pubmedNNnNNNN.xml.gz` files."""
    index = requests.get(f"{PUBMED_FTP_BASE}/{subdir}/", timeout=120).text
    names = sorted(set(re.findall(r"pubmed\d+n\d+\.xml\.gz", index)))
    return [f"{PUBMED_FTP_BASE}/{subdir}/{name}" for name in names]


# ===========================================================================
# 1. Query-Encoder web endpoint (the live lane's encoder)
# ===========================================================================
@app.cls(
    gpu="A10G",
    image=image,
    volumes={"/cache": hf_cache},
    secrets=[SECRET],
    scaledown_window=300,  # scale to zero 5 min after the last query
    timeout=600,
)
class QueryEncoder:
    @modal.enter()
    def load(self):
        os.environ.setdefault("HF_HOME", "/cache")
        self.tokenizer = AutoTokenizer.from_pretrained(QUERY_ENCODER_MODEL)
        self.model = AutoModel.from_pretrained(QUERY_ENCODER_MODEL).to("cuda").eval()

    @modal.fastapi_endpoint(method="POST")
    def encode(self, item: dict):
        """POST { "query": str } -> { "embedding": [768 floats] } (CLS-pooled)."""
        query = (item or {}).get("query", "")
        if not isinstance(query, str) or not query.strip():
            return {"embedding": []}
        with torch.no_grad():
            encoded = self.tokenizer(
                [query],
                truncation=True,
                padding=True,
                return_tensors="pt",
                max_length=QUERY_MAX_LEN,
            ).to("cuda")
            embeds = self.model(**encoded).last_hidden_state[:, 0, :]
        return {"embedding": embeds[0].cpu().to(torch.float32).numpy().tolist()}


# ===========================================================================
# 2. Embedding pipeline (one file's worth of work — mapped for the backfill,
#    called directly for the weekly delta)
# ===========================================================================
@app.function(
    gpu="A10G",
    image=image,
    volumes={"/cache": hf_cache},
    secrets=[SECRET],
    timeout=6 * 3600,
    retries=2,
)
def process_file(url: str, year_min: int | None = None, year_max: int | None = None) -> dict:
    """Download one PubMed gz, parse, embed non-deleted records, upsert + delete.

    Returns a small summary dict so the caller can aggregate counts.
    """
    import pubmed_parser as pp

    os.environ.setdefault("HF_HOME", "/cache")
    local = f"/tmp/{url.rsplit('/', 1)[-1]}"
    with requests.get(url, stream=True, timeout=600) as resp:
        resp.raise_for_status()
        with open(local, "wb") as fh:
            for chunk in resp.iter_content(chunk_size=1 << 20):
                fh.write(chunk)

    records = pp.parse_medline_xml(
        local, year_info_only=False, nlm_category=False, author_list=True
    )
    to_upsert, to_delete = _split_records(records, year_min=year_min, year_max=year_max)

    ns = _turbopuffer_namespace()

    upserted = 0
    if to_upsert:
        tokenizer = AutoTokenizer.from_pretrained(ARTICLE_ENCODER_MODEL)
        model = AutoModel.from_pretrained(ARTICLE_ENCODER_MODEL).to("cuda").eval()
        articles = [[r["title"], r["abstract"]] for r in to_upsert]
        vectors = _embed_articles(model, tokenizer, articles)
        rows = [
            {
                "id": r["pmid"],
                "vector": vec,
                "pmid": r["pmid"],
                "title": r["title"],
                "abstract": r["abstract"],
                "journal": r["journal"],
                "year": r["year"],
                "authors": r["authors"],
                "doi": r["doi"],
            }
            for r, vec in zip(to_upsert, vectors)
        ]
        for start in range(0, len(rows), 1000):
            ns.write(
                upsert_rows=rows[start : start + 1000],
                distance_metric="cosine_distance",
                schema=TPUF_SCHEMA,
            )
        upserted = len(rows)

    if to_delete:
        for start in range(0, len(to_delete), 1000):
            ns.write(deletes=to_delete[start : start + 1000])

    return {"url": url, "upserted": upserted, "deleted": len(to_delete)}


# ===========================================================================
# 3a. Recurring freshness (scheduled WEEKLY)
# ===========================================================================
@app.function(image=image, secrets=[SECRET], timeout=24 * 3600, schedule=modal.Cron(FRESHNESS_CRON))
def freshness() -> dict:
    """Process every updatefile newer than the stored watermark; advance the watermark.

    Incremental: only the new daily updatefiles are embedded, so a weekly run is
    small and cheap. New/changed PMIDs become searchable; DeleteCitation PMIDs are
    removed by id.
    """
    all_files = _list_remote_gz("updatefiles")
    last = state.get("last_updatefile", "")
    pending = [u for u in all_files if u.rsplit("/", 1)[-1] > last]
    if not pending:
        print("[freshness] up to date — nothing new")
        return {"processed": 0, "upserted": 0, "deleted": 0}

    summaries = list(process_file.map(pending))
    state["last_updatefile"] = pending[-1].rsplit("/", 1)[-1]
    total_up = sum(s["upserted"] for s in summaries)
    total_del = sum(s["deleted"] for s in summaries)
    print(f"[freshness] files={len(pending)} upserted={total_up} deleted={total_del}")
    return {"processed": len(pending), "upserted": total_up, "deleted": total_del}


# ===========================================================================
# 3b. One-time gap backfill (2024–2026), same pipeline, year-filtered
# ===========================================================================
@app.local_entrypoint()
def backfill(year_start: int = 2024, year_end: int = 2026, subdir: str = "updatefiles"):
    """Fill the gap not covered by NCBI's precomputed (through-~2023) embeddings.

    Fans `process_file` across every gz in `subdir` (default updatefiles), keeping
    only records whose publication year is in [year_start, year_end]. Run once;
    `freshness` keeps it current thereafter.
    """
    files = list_files.remote(subdir)
    print(f"[backfill] {len(files)} files, year {year_start}-{year_end}")
    # starmap passes (url, year_min, year_max) positionally to each process_file call.
    summaries = list(
        process_file.starmap([(url, year_start, year_end) for url in files])
    )
    total_up = sum(s["upserted"] for s in summaries)
    total_del = sum(s["deleted"] for s in summaries)
    print(f"[backfill] done: upserted={total_up} deleted={total_del}")


@app.function(image=image, secrets=[SECRET], timeout=3600)
def list_files(subdir: str = "updatefiles"):
    """Enumerate remote gz files (runs remotely so it shares the image + network)."""
    return _list_remote_gz(subdir)


# ===========================================================================
# 4. One-time index build from NCBI's precomputed MedCPT embeddings (~24M,
#    768-d, through ~2023). No GPU — vectors already exist; we only int8-load them
#    into Turbopuffer. The 2024-2026 gap is closed separately by `backfill`.
# ===========================================================================
PRECOMPUTED_BASE = "https://ftp.ncbi.nlm.nih.gov/pub/lu/MedCPT/pubmed_embeddings"


def _meta_field(record, *keys) -> str:
    """Tolerant attribute lookup — the precomputed `pubmed_chunk_*.json` field names
    differ across NCBI releases (e.g. `title`/`t`, `abstract`/`a`), so try each."""
    if isinstance(record, dict):
        for k in keys:
            v = record.get(k)
            if v:
                return str(v).strip()
    elif isinstance(record, (list, tuple)) and record:
        idx = 0 if keys and keys[0] in ("title", "t") else 1
        if idx < len(record) and record[idx]:
            return str(record[idx]).strip()
    return ""


@app.function(image=image, secrets=[SECRET], timeout=6 * 3600, retries=2)
def load_chunk(n: int) -> dict:
    """Download one precomputed chunk (embeds + pmids + metadata) and int8-upsert it."""
    import json
    from io import BytesIO

    import numpy as np

    embeds = np.load(
        BytesIO(requests.get(f"{PRECOMPUTED_BASE}/embeds_chunk_{n}.npy", timeout=900).content)
    )
    pmids = requests.get(f"{PRECOMPUTED_BASE}/pmids_chunk_{n}.json", timeout=900).json()
    meta = requests.get(f"{PRECOMPUTED_BASE}/pubmed_chunk_{n}.json", timeout=900).json()

    if len(pmids) != len(embeds):
        raise ValueError(f"chunk {n}: {len(pmids)} pmids vs {len(embeds)} vectors")

    ns = _turbopuffer_namespace()
    rows = []
    for i, pmid in enumerate(pmids):
        pmid = str(pmid)
        record = meta.get(pmid, {}) if isinstance(meta, dict) else {}
        year_match = re.search(r"\d{4}", _meta_field(record, "year", "pubdate", "date"))
        rows.append(
            {
                "id": pmid,
                "vector": embeds[i].astype("float32").tolist(),
                "pmid": pmid,
                "title": _meta_field(record, "title", "t"),
                "abstract": _meta_field(record, "abstract", "a"),
                "journal": _meta_field(record, "journal", "j"),
                "year": int(year_match.group(0)) if year_match else 0,
                "authors": [],
                "doi": _meta_field(record, "doi"),
            }
        )

    for start in range(0, len(rows), 1000):
        ns.write(
            upsert_rows=rows[start : start + 1000],
            distance_metric="cosine_distance",
            schema=TPUF_SCHEMA,
        )
    return {"chunk": n, "upserted": len(rows)}


@app.local_entrypoint()
def load_index():
    """Enumerate every precomputed chunk and fan `load_chunk` across them.

    Run ONCE to stand up the historical (~24M, through-~2023) index:
        op-run -- modal run infra/modal/medcpt_service.py::load_index
    Then run `backfill` for the 2024-2026 gap and `freshness` keeps it current.
    """
    index = list_chunks.remote()
    print(f"[load_index] {len(index)} precomputed chunks")
    summaries = list(load_chunk.map(index))
    total = sum(s["upserted"] for s in summaries)
    print(f"[load_index] done: upserted={total} vectors across {len(summaries)} chunks")


@app.function(image=image, secrets=[SECRET], timeout=3600)
def list_chunks():
    """Discover available precomputed chunk numbers from the NCBI FTP index."""
    listing = requests.get(f"{PRECOMPUTED_BASE}/", timeout=120).text
    nums = sorted({int(m) for m in re.findall(r"embeds_chunk_(\d+)\.npy", listing)})
    return nums
