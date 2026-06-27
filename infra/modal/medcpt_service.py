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
        "turbopuffer==2.4.0",
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
# Per-file done-markers for the one-time gap backfill, so a preempted/restarted
# orchestrator resumes instead of re-embedding (which would cost GPU $ again).
backfill_state = modal.Dict.from_name("medcpt-backfill-state", create_if_missing=True)

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


def _write_with_retry(ns, **kwargs):
    """Upsert, backing off on Turbopuffer write backpressure (429 'indexing backlog').

    We rely on NATURAL backpressure (not disable_backpressure): when the index can't
    keep up, Turbopuffer 429s and we wait, pacing writes to indexing throughput so the
    backlog never explodes. disable_backpressure at 37M scale built a 27 GB backlog
    that Turbopuffer then refused to write to at all — this is the durable fix.
    """
    import time
    import turbopuffer

    delay = 2.0
    for _ in range(40):
        try:
            ns.write(**kwargs)
            return
        except turbopuffer.RateLimitError:
            time.sleep(delay)
            delay = min(45.0, delay * 1.6)
    ns.write(**kwargs)  # final attempt; raise if still failing so the chunk is retried


def _list_chunk_numbers():
    """Discover available precomputed chunk numbers from the NCBI FTP index."""
    listing = requests.get(f"{PRECOMPUTED_BASE}/", timeout=120).text
    return sorted({int(m) for m in re.findall(r"embeds_chunk_(\d+)\.npy", listing)})


# Vectors are written as `[768]f32` with an ANN index. Turbopuffer's input vector
# types are f32/f16 only; the int8 compression is applied AUTOMATICALLY to the ANN
# index internally (its "native i8", ±0.001 quality, ~4x smaller hot index) — you do
# NOT pass int8 integers (doing so 400s: "invalid i8 value"). This satisfies the
# "int8 not binary" constraint via Turbopuffer's native int8 ANN quantization while
# the live lane keeps querying with float vectors. title is BM25-indexed so this same
# namespace can later serve the optional Phase-0 lexical lane (one store, hybrid).
# Only `year` is filterable (the live lane's recency Gte/Lte range). Everything else
# is stored + returned but NOT filterable: Turbopuffer caps filterable attribute
# values at 4096 bytes, and abstracts blow past that ("value too large for
# filtering"). title keeps a BM25 (full_text_search) index for the optional Phase-0
# lexical lane — that index is independent of the filterable index.
TPUF_SCHEMA = {
    "vector": {"type": f"[{EMBED_DIM}]f32", "ann": True},
    "pmid": {"type": "string", "filterable": False},
    "title": {"type": "string", "full_text_search": True, "filterable": False},
    "abstract": {"type": "string", "filterable": False},
    "journal": {"type": "string", "filterable": False},
    "year": {"type": "uint"},
    "authors": {"type": "[]string", "filterable": False},
    "doi": {"type": "string", "filterable": False},
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
        to_upsert.append(
            {
                "pmid": pmid,
                "title": title,
                "abstract": abstract,
                "journal": (rec.get("journal") or "").strip(),
                "year": year,
                "authors": _flatten_authors(rec.get("authors")),
                "doi": (rec.get("doi") or "").strip(),
            }
        )
    return to_upsert, to_delete


def _extract_delete_pmids(path) -> list:
    """Pull DeleteCitation PMIDs straight from the raw (gz) MEDLINE XML.

    pubmed_parser (this version) does NOT surface <DeleteCitation> entries — it
    yields no record with delete=True even though every updatefile ends with a
    <DeleteCitation> block listing PMIDs NCBI has withdrawn (duplicates, errors).
    Relying on the parser's `delete` flag therefore silently dropped every removal,
    leaving withdrawn papers searchable forever. We parse the block ourselves so the
    "honor delete flag → remove dropped PMIDs" guarantee actually holds, independent
    of the parser version. Verified against real updatefiles (n1335: 19, n1420: 49,
    n1504: 26 delete PMIDs).
    """
    import gzip

    opener = gzip.open if str(path).endswith(".gz") else open
    with opener(path, "rt", encoding="utf-8", errors="replace") as fh:
        xml = fh.read()
    pmids = []
    for block in re.findall(r"<DeleteCitation>(.*?)</DeleteCitation>", xml, re.DOTALL):
        pmids.extend(re.findall(r"<PMID[^>]*>(\d+)</PMID>", block))
    return pmids


def _flatten_authors(authors) -> list:
    """Normalize pubmed_parser authors → list[str] (the schema's `[]string`).

    With author_list=True, pubmed_parser returns a list of dicts
    ({lastname, forename, initials, affiliation, ...}); without it, a single
    "A; B; C" string. Turbopuffer 422s on anything but a flat string list, so
    collapse every shape to displayable names defensively.
    """
    if isinstance(authors, str):
        return [a.strip() for a in authors.split(";") if a.strip()]
    if not isinstance(authors, list):
        return []
    out = []
    for a in authors:
        if isinstance(a, str):
            name = a.strip()
        elif isinstance(a, dict):
            fore = str(a.get("forename") or a.get("firstname") or "").strip()
            last = str(a.get("lastname") or a.get("last_name") or "").strip()
            inits = str(a.get("initials") or "").strip()
            name = (f"{fore} {last}".strip() or f"{last} {inits}".strip() or last).strip()
        else:
            name = str(a).strip()
        if name:
            out.append(name)
    return out


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
# CPU, not GPU, and always-warm. The Query-Encoder embeds ONE short query at a
# time — a single BERT forward pass that runs in well under a second on CPU. A
# GPU here only added a ~20s scale-from-zero cold start that blew the live
# search's 5s fan-out deadline (dropping the dense lane on the first query after
# any idle) and would cost ~10x more to keep warm. `min_containers=1` keeps one
# replica hot so encode latency is deterministic (no cold start) — the live
# lane's exit gate. (Bulk article embedding still uses GPUs; that's process_file.)
@app.cls(
    image=image,
    cpu=4.0,
    volumes={"/cache": hf_cache},
    secrets=[SECRET],
    min_containers=1,
    timeout=600,
)
class QueryEncoder:
    @modal.enter()
    def load(self):
        os.environ.setdefault("HF_HOME", "/cache")
        self.device = "cuda" if torch.cuda.is_available() else "cpu"
        self.tokenizer = AutoTokenizer.from_pretrained(QUERY_ENCODER_MODEL)
        self.model = AutoModel.from_pretrained(QUERY_ENCODER_MODEL).to(self.device).eval()

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
            ).to(self.device)
            embeds = self.model(**encoded).last_hidden_state[:, 0, :]
        return {"embedding": embeds[0].cpu().to(torch.float32).numpy().tolist()}

    def _embed_query(self, query: str):
        with torch.no_grad():
            encoded = self.tokenizer(
                [query], truncation=True, padding=True,
                return_tensors="pt", max_length=QUERY_MAX_LEN,
            ).to(self.device)
            embeds = self.model(**encoded).last_hidden_state[:, 0, :]
        return embeds[0].cpu().to(torch.float32).numpy().tolist()

    @modal.fastapi_endpoint(method="POST")
    def search(self, item: dict):
        """POST { query, limit?, year_start?, year_end? } -> { rows: [...] }.

        Encodes the query AND runs the Turbopuffer ANN query SERVER-SIDE, so the
        live lane makes ONE round-trip instead of two. The two-hop lane (encode
        here, then ANN from Node) had its second fetch's promise continuation
        starved by Node's single-threaded event loop — busy parsing the concurrent
        PubMed/OpenAlex responses — which inflated the dense lane to 5-6s and blew
        the 5s fan-out deadline on ~85% of queries. Collapsing to one call (the
        heavy work runs here, next to Turbopuffer) leaves Node a single continuation
        to schedule, keeping the lane comfortably inside the deadline.
        """
        query = (item or {}).get("query", "")
        if not isinstance(query, str) or not query.strip():
            return {"rows": []}
        limit = int((item or {}).get("limit") or 25)
        year_start = (item or {}).get("year_start")
        year_end = (item or {}).get("year_end")

        vector = self._embed_query(query)
        conditions = []
        if isinstance(year_start, int):
            conditions.append(["year", "Gte", year_start])
        if isinstance(year_end, int):
            conditions.append(["year", "Lte", year_end])
        kwargs = {
            "rank_by": ["vector", "ANN", vector],
            "top_k": min(max(limit, 1), 50),
            "include_attributes": ["pmid", "title", "journal", "year", "authors", "abstract", "doi"],
        }
        if conditions:
            kwargs["filters"] = ["And", conditions]
        ns = _turbopuffer_namespace()
        res = ns.query(**kwargs)
        rows = []
        for r in (res.rows or []):
            rows.append({
                "pmid": getattr(r, "pmid", None) or getattr(r, "id", None),
                "title": getattr(r, "title", None),
                "journal": getattr(r, "journal", None),
                "year": getattr(r, "year", None),
                "authors": getattr(r, "authors", None),
                "abstract": getattr(r, "abstract", None),
                "doi": getattr(r, "doi", None),
            })
        return {"rows": rows}


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
    max_containers=10,  # match the workspace's 10-GPU plan cap (no over-scheduling)
)
def process_file(
    url: str,
    year_min: int | None = None,
    year_max: int | None = None,
    mark_done: bool = False,
) -> dict:
    """Download one PubMed gz, parse, embed non-deleted records, upsert + delete.

    Returns a small summary dict so the caller can aggregate counts. When
    `mark_done` is set (the backfill path), records a per-file completion marker
    so a restarted orchestrator skips it instead of re-embedding.
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
    # pubmed_parser misses <DeleteCitation>; extract those PMIDs from the raw XML so
    # withdrawn papers are actually removed (the "honor delete flag" guarantee).
    to_delete = sorted(set(to_delete) | set(_extract_delete_pmids(local)))

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
            _write_with_retry(
                ns,
                upsert_rows=rows[start : start + 1000],
                distance_metric="cosine_distance",
                schema=TPUF_SCHEMA,
            )
        upserted = len(rows)

    if to_delete:
        for start in range(0, len(to_delete), 1000):
            ns.write(deletes=to_delete[start : start + 1000])

    summary = {"url": url, "upserted": upserted, "deleted": len(to_delete)}
    if mark_done:
        backfill_state[url] = summary
    return summary


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
# 3c. Namespace keep-warm — deterministic dense-lane latency
# ===========================================================================
@app.function(image=image, secrets=[SECRET], timeout=120, schedule=modal.Cron("* * * * *"))
def keep_warm() -> int:
    """Keep the Turbopuffer namespace cache hot so the live dense lane's ANN
    latency is deterministic.

    A warm namespace answers ANN in ~0.3s; a cold one (evicted to object storage
    after idle) takes ~3.5s, which — with query encoding — blows the live search's
    5s fan-out deadline and silently drops the dense lane. Real query traffic keeps
    it warm on its own; this cron covers idle gaps so the lane never cold-starts
    against a user. Cheap (object-storage reads only). The lane still FAILS OPEN if
    the namespace is ever cold, so this is a latency optimization, not a correctness
    dependency. Fires each minute and probes for ~55s to bridge to the next run.
    """
    import time

    ns = _turbopuffer_namespace()
    probe = [((i % 13) - 6) / 6.0 for i in range(EMBED_DIM)]  # fixed unit-ish vector
    end = time.time() + 55
    n = 0
    while time.time() < end:
        try:
            ns.query(rank_by=["vector", "ANN", probe], top_k=10, include_attributes=["pmid"])
            n += 1
        except Exception:
            pass
        time.sleep(3)
    print(f"[keep_warm] {n} warm-up queries")
    return n


# ===========================================================================
# 3b. One-time gap backfill (2024–2026), same pipeline, year-filtered
# ===========================================================================
@app.function(image=image, secrets=[SECRET], timeout=2 * 3600, retries=2)
def scan_file(url: str, year_min: int | None = None, year_max: int | None = None) -> dict:
    """CPU-only: download + parse one gz and COUNT in-window records — no embedding.

    Lets the backfill skip the GPU entirely for the ~1000 old baseline files that
    contain zero 2024+ papers, instead of paying for an idle GPU on each.
    """
    import pubmed_parser as pp

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
    return {"url": url, "kept": len(to_upsert), "deleted": len(to_delete)}


@app.function(image=image, secrets=[SECRET], timeout=24 * 3600, retries=1)
def backfill_server(
    year_start: int = 2024,
    year_end: int = 2026,
    subdirs: tuple = ("baseline", "updatefiles"),
) -> dict:
    """Server-side, resumable gap backfill across the PubMed baseline + updatefiles.

    Orchestrating from INSIDE a Modal function (not a local_entrypoint) makes it
    robust to the local client disconnecting — the failure mode that stalled the
    historical load. Two passes:
      1. CPU `scan_file` over EVERY file → which actually hold [year_start,year_end]
         records (so GPUs only spin where there's real work; nothing is skipped
         blindly — a scan failure is treated as "process it" to never miss a file).
      2. GPU `process_file` over only those files, skipping any already marked done
         in `backfill_state` (resume after preemption without re-embedding).
    """
    files = []
    for sub in subdirs:
        files.extend(_list_remote_gz(sub))
    print(f"[backfill] {len(files)} files across {list(subdirs)}, year {year_start}-{year_end}", flush=True)

    scans = list(
        scan_file.starmap(
            [(u, year_start, year_end) for u in files], return_exceptions=True
        )
    )
    kept = []
    for url, s in zip(files, scans):
        if isinstance(s, dict):
            if s["kept"] or s["deleted"]:
                kept.append(url)
        else:  # scan errored — process it anyway rather than silently drop a file
            kept.append(url)
    print(f"[backfill] {len(kept)}/{len(files)} files hold in-window records", flush=True)

    todo = [u for u in kept if u not in backfill_state]
    print(f"[backfill] {len(todo)} to embed ({len(kept) - len(todo)} already done)", flush=True)

    summaries = list(
        process_file.starmap(
            [(u, year_start, year_end, True) for u in todo], return_exceptions=True
        )
    )
    ok = [s for s in summaries if isinstance(s, dict)]
    failed = [todo[i] for i, s in enumerate(summaries) if not isinstance(s, dict)]
    total_up = sum(s["upserted"] for s in ok)
    total_del = sum(s["deleted"] for s in ok)
    print(
        f"[backfill] done: files={len(ok)}/{len(todo)} upserted={total_up} "
        f"deleted={total_del} failed={len(failed)}",
        flush=True,
    )
    return {"files_ok": len(ok), "upserted": total_up, "deleted": total_del, "failed": failed}


@app.local_entrypoint()
def backfill(year_start: int = 2024, year_end: int = 2026):
    """Spawn the server-side `backfill_server` (fire-and-forget; survives disconnect).

        op-run -- modal run infra/modal/medcpt_service.py::backfill
    """
    call = backfill_server.spawn(year_start=year_start, year_end=year_end)
    print(f"[backfill] spawned backfill_server server-side: {call.object_id}")
    print("[backfill] runs independently of this client; poll the namespace count.")


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


def _pick(record, *keys) -> str:
    """First non-empty value among `keys`. The precomputed `pubmed_chunk_*.json`
    uses compact keys (verified against a live chunk): t=title, a=abstract,
    d=YYYYMMDD date, m=mesh. Fallbacks tolerate a future rename."""
    if isinstance(record, dict):
        for k in keys:
            v = record.get(k)
            if v:
                return str(v).strip()
    return ""


@app.function(
    image=image,
    secrets=[SECRET],
    timeout=6 * 3600,
    retries=2,
    memory=16384,
    max_containers=4,  # bound concurrent writers so we don't overrun Turbopuffer indexing
)
def load_chunk(n: int) -> dict:
    """Download one precomputed chunk (embeds + pmids + metadata) and int8-upsert it.

    Memory-bounded: the (multi-GB) `.npy` is streamed to disk and mmap-loaded, and
    rows are built + upserted in batches of 1000 rather than materialized all at once.
    """
    import numpy as np

    npy_path = f"/tmp/embeds_chunk_{n}.npy"
    with requests.get(
        f"{PRECOMPUTED_BASE}/embeds_chunk_{n}.npy", stream=True, timeout=1800
    ) as resp:
        resp.raise_for_status()
        with open(npy_path, "wb") as fh:
            for chunk in resp.iter_content(chunk_size=1 << 20):
                fh.write(chunk)
    pmids = requests.get(f"{PRECOMPUTED_BASE}/pmids_chunk_{n}.json", timeout=900).json()
    meta = requests.get(f"{PRECOMPUTED_BASE}/pubmed_chunk_{n}.json", timeout=900).json()

    embeds = np.load(npy_path, mmap_mode="r")
    if len(pmids) != len(embeds):
        raise ValueError(f"chunk {n}: {len(pmids)} pmids vs {len(embeds)} vectors")

    ns = _turbopuffer_namespace()

    def flush(rows):
        if rows:
            _write_with_retry(
                ns,
                upsert_rows=rows,
                distance_metric="cosine_distance",
                schema=TPUF_SCHEMA,
            )

    upserted, batch = 0, []
    for i, pmid in enumerate(pmids):
        pmid = str(pmid)
        record = meta.get(pmid, {}) if isinstance(meta, dict) else {}
        # NCBI precomputed metadata only carries t(itle)/a(bstract)/d(ate)/m(esh).
        # journal/authors/doi are NOT in this set — the live pipeline's OpenAlex
        # PMID enrichment + lexical-lane RRF merge backfill them for surfaced hits;
        # the 2024-2026 freshness backfill (pubmed_parser) carries full metadata.
        date = _pick(record, "d", "date", "pubdate")
        year = int(date[:4]) if date[:4].isdigit() else 0
        batch.append(
            {
                "id": pmid,
                "vector": np.asarray(embeds[i], dtype="float32").tolist(),
                "pmid": pmid,
                "title": _pick(record, "t", "title"),
                "abstract": _pick(record, "a", "abstract"),
                "journal": "",
                "year": year,
                "authors": [],
                "doi": "",
            }
        )
        if len(batch) >= 1000:
            flush(batch)
            upserted += len(batch)
            batch = []
    flush(batch)
    upserted += len(batch)
    return {"chunk": n, "upserted": upserted}


@app.function(image=image, secrets=[SECRET], timeout=3600, memory=8192)
def detect_missing(samples: int = 5) -> list:
    """Return chunk numbers NOT fully present in Turbopuffer.

    Runs server-side (NCBI network is reliable here, unlike ranged GETs from a
    laptop). For each chunk it samples `samples` evenly-spaced PMIDs (always
    including first + last) and checks id-existence; `load_chunk` upserts in
    list order, so a present LAST pmid means that chunk finished. Cheap probe,
    no full re-download. Use the result to drive targeted `load_chunk` reloads.
    """
    ns = _turbopuffer_namespace()

    def present(pmid) -> bool:
        r = ns.query(
            rank_by=["id", "asc"], filters=["id", "Eq", str(pmid)],
            top_k=1, include_attributes=["pmid"],
        )
        return len(getattr(r, "rows", r)) == 1

    missing = []
    for n in _list_chunk_numbers():
        try:
            pmids = requests.get(
                f"{PRECOMPUTED_BASE}/pmids_chunk_{n}.json", timeout=900
            ).json()
        except Exception as exc:  # treat an unreadable manifest as incomplete
            print(f"chunk {n}: MANIFEST-ERR {type(exc).__name__}", flush=True)
            missing.append(n)
            continue
        last = len(pmids) - 1
        idxs = sorted({round(i * last / (samples - 1)) for i in range(samples)})
        ok = all(present(pmids[i]) for i in idxs)
        print(f"chunk {n}: {'COMPLETE' if ok else 'INCOMPLETE'} (n={len(pmids)})", flush=True)
        if not ok:
            missing.append(n)
    print(f"[detect_missing] incomplete chunks: {missing}", flush=True)
    return missing


@app.function(image=image, secrets=[SECRET], timeout=3600, memory=8192)
def verify_complete(samples: int = 20) -> dict:
    """Authoritative completeness check + expected-total reconciliation.

    Returns the sum of all manifest lengths (the true expected row count from
    NCBI's published embeddings), the live Turbopuffer `approx_row_count`, and
    any chunk where a densely-sampled PMID is absent (catches internal gaps a
    sparse first/last probe would miss). This tells us whether the current
    indexed count IS the full set or a chunk is partially loaded.
    """
    ns = _turbopuffer_namespace()

    def present(pmid) -> bool:
        r = ns.query(
            rank_by=["id", "asc"], filters=["id", "Eq", str(pmid)],
            top_k=1, include_attributes=["pmid"],
        )
        return len(getattr(r, "rows", r)) == 1

    expected_total = 0
    per_chunk = {}
    incomplete = []
    for n in _list_chunk_numbers():
        pmids = requests.get(
            f"{PRECOMPUTED_BASE}/pmids_chunk_{n}.json", timeout=900
        ).json()
        expected_total += len(pmids)
        per_chunk[n] = len(pmids)
        last = len(pmids) - 1
        idxs = sorted({round(i * last / (samples - 1)) for i in range(samples)})
        miss = [pmids[i] for i in idxs if not present(pmids[i])]
        if miss:
            incomplete.append({"chunk": n, "missing_samples": miss[:5]})
        print(f"chunk {n}: len={len(pmids)} missing_samples={len(miss)}/{len(idxs)}", flush=True)

    approx = ns.metadata().approx_row_count
    out = {
        "expected_total": expected_total,
        "approx_row_count": approx,
        "delta": expected_total - approx,
        "incomplete": incomplete,
    }
    print(f"[verify_complete] {out}", flush=True)
    return out


@app.function(image=image, secrets=[SECRET], timeout=24 * 3600, retries=1)
def load_all(start: int = 0, end: int = -1, reverse: bool = False) -> dict:
    """Server-side fan-out of `load_chunk` across the precomputed chunks.

    Orchestrating the `.map()` from INSIDE a Modal function (not a local_entrypoint)
    makes the load robust to the local client disconnecting — the cause of the
    earlier cancellations. `reverse=True` loads high-numbered (recent-PMID) chunks
    first, which is what the modern 87q benchmark needs. Resumable + idempotent:
    re-run with `--start N`; upserts are keyed by PMID.

    Trigger server-side (fire-and-forget, survives disconnects):
        op-run -- python3 -c "import modal; \
          print(modal.Function.from_name('manan-medcpt','load_all').spawn(start=0, reverse=True).object_id)"
    """
    chunks = [n for n in _list_chunk_numbers() if n >= start and (end < 0 or n <= end)]
    if reverse:
        chunks = list(reversed(chunks))
    if not chunks:
        return {"ok": 0, "failed": [], "note": f"no chunks in range {start}..{end}"}
    print(f"[load_all] {len(chunks)} chunks (reverse={reverse}): {chunks[:3]}...{chunks[-3:]}")
    results = list(load_chunk.map(chunks, return_exceptions=True))
    ok = [r for r in results if isinstance(r, dict)]
    failed = [chunks[i] for i, r in enumerate(results) if not isinstance(r, dict)]
    total = sum(r["upserted"] for r in ok)
    print(f"[load_all] upserted={total} across {len(ok)}/{len(chunks)} chunks; failed={failed}")
    return {"ok": len(ok), "failed": failed, "upserted": total}


@app.local_entrypoint()
def load_index(start: int = 0, end: int = -1, reverse: bool = False):
    """Convenience wrapper — spawns the server-side `load_all` (does not block on it).

        op-run -- modal run infra/modal/medcpt_service.py::load_index --reverse True
    """
    call = load_all.spawn(start=start, end=end, reverse=reverse)
    print(f"[load_index] spawned load_all server-side: {call.object_id}")
    print("[load_index] it runs independently of this client; poll the namespace count.")


@app.function(image=image, secrets=[SECRET], timeout=3600)
def list_chunks():
    """Discover available precomputed chunk numbers from the NCBI FTP index."""
    return _list_chunk_numbers()


@app.function(image=image, secrets=[SECRET], timeout=3600)
def freshness_delta_proof(url: str, plant: bool = True) -> dict:
    """Inspect (and optionally seed) a verifiable freshness delta from a real updatefile.

    Parses `url` and reports its delta sizes plus a sample DeleteCitation PMID and a
    sample new/changed PMID. With `plant=True`, also PLANTS a dummy row for one of
    its DeleteCitation PMIDs so a subsequent run through the freshness pipeline can
    be shown to actually REMOVE it (not merely find it already absent). With
    `plant=False` it only counts — used to scan recent updatefiles for one that
    carries real DeleteCitation entries.
    """
    import pubmed_parser as pp

    local = f"/tmp/{url.rsplit('/', 1)[-1]}"
    with requests.get(url, stream=True, timeout=600) as resp:
        resp.raise_for_status()
        with open(local, "wb") as fh:
            for chunk in resp.iter_content(chunk_size=1 << 20):
                fh.write(chunk)
    records = pp.parse_medline_xml(local, year_info_only=False, nlm_category=False, author_list=True)
    to_upsert, to_delete = _split_records(records)
    to_delete = sorted(set(to_delete) | set(_extract_delete_pmids(local)))

    del_pmid = to_delete[0] if to_delete else None
    kept_pmid = to_upsert[0]["pmid"] if to_upsert else None

    if plant and del_pmid:
        ns = _turbopuffer_namespace()
        ns.write(
            upsert_rows=[{
                "id": del_pmid, "vector": [0.0] * EMBED_DIM, "pmid": del_pmid,
                "title": "FRESHNESS-PROOF PLANTED ROW", "abstract": "planted",
                "journal": "", "year": 0, "authors": [], "doi": "",
            }],
            distance_metric="cosine_distance", schema=TPUF_SCHEMA,
        )
    return {
        "file": url.rsplit("/", 1)[-1],
        "del_pmid": del_pmid,
        "kept_pmid": kept_pmid,
        "n_upsert": len(to_upsert),
        "n_delete": len(to_delete),
    }


@app.function(image=image, secrets=[SECRET], timeout=3600)
def inspect_deletes(url: str) -> dict:
    """Decouple the raw <DeleteCitation> count from pubmed_parser's view.

    Decisively answers whether a file with no parser-reported deletes is genuinely
    delete-free or whether pubmed_parser is silently missing them: counts raw
    <DeleteCitation> blocks + their <PMID> children straight from the decompressed
    XML, then compares to what _split_records (the freshness delete path) yields.
    """
    import gzip
    import re as _re
    import pubmed_parser as pp

    local = f"/tmp/{url.rsplit('/', 1)[-1]}"
    with requests.get(url, stream=True, timeout=600) as resp:
        resp.raise_for_status()
        with open(local, "wb") as fh:
            for chunk in resp.iter_content(chunk_size=1 << 20):
                fh.write(chunk)
    with gzip.open(local, "rt", encoding="utf-8", errors="replace") as fh:
        xml = fh.read()

    blocks = _re.findall(r"<DeleteCitation>(.*?)</DeleteCitation>", xml, _re.DOTALL)
    raw_delete_pmids = []
    for b in blocks:
        raw_delete_pmids.extend(_re.findall(r"<PMID[^>]*>(\d+)</PMID>", b))

    records = list(pp.parse_medline_xml(local, year_info_only=False, nlm_category=False, author_list=True))
    parser_delete = [str(r.get("pmid")) for r in records if r.get("delete")]
    # show how the parser represents the delete flag on a sample record
    sample_delete_field = next((repr(r.get("delete")) for r in records if r.get("delete")), None)
    # also: do any parsed records expose a 'delete' KEY at all (regardless of value)?
    has_delete_key = any("delete" in r for r in records[:50])

    return {
        "file": url.rsplit("/", 1)[-1],
        "raw_delete_blocks": len(blocks),
        "raw_delete_pmids": len(raw_delete_pmids),
        "raw_sample_pmid": raw_delete_pmids[0] if raw_delete_pmids else None,
        "parser_delete_count": len(parser_delete),
        "parser_delete_field_value": sample_delete_field,
        "parser_has_delete_key": has_delete_key,
        "total_records": len(records),
    }


@app.function(image=image, secrets=[SECRET], timeout=3600)
def scan_deletes(url: str) -> list:
    """CPU-only: download one gz and return its <DeleteCitation> PMIDs (no embedding)."""
    local = f"/tmp/{url.rsplit('/', 1)[-1]}"
    with requests.get(url, stream=True, timeout=600) as resp:
        resp.raise_for_status()
        with open(local, "wb") as fh:
            for chunk in resp.iter_content(chunk_size=1 << 20):
                fh.write(chunk)
    return _extract_delete_pmids(local)


@app.function(image=image, secrets=[SECRET], timeout=24 * 3600)
def purge_historical_deletes(subdirs=("baseline", "updatefiles")) -> dict:
    """Remove every <DeleteCitation> PMID across all PubMed files (CPU-only).

    The precomputed index load + the initial 2024–2026 backfill predated the
    DeleteCitation fix (pubmed_parser silently dropped those blocks), so PMIDs NCBI
    has withdrawn may still be searchable in the historical index. This extracts the
    delete lists from every file in parallel and removes them by id — reconciling
    the existing index with the now-correct freshness path. Idempotent: deleting an
    absent id is a no-op, so it is safe to re-run.
    """
    files = []
    for sub in subdirs:
        files.extend(_list_remote_gz(sub))
    all_deletes = set()
    scanned = 0
    for pmids in scan_deletes.map(files):
        all_deletes.update(pmids)
        scanned += 1
    ns = _turbopuffer_namespace()
    deletes = sorted(all_deletes)
    for start in range(0, len(deletes), 1000):
        ns.write(deletes=deletes[start : start + 1000])
    print(f"[purge] files={scanned} delete_pmids={len(deletes)}")
    return {"files": scanned, "delete_pmids": len(deletes)}
