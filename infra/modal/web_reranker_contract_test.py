"""
Contract test for the self-hosted web reranker endpoint (`WebReranker.rerank`).

Verifies — against the LIVE deployed endpoint — that the request/response shape is
byte-for-byte what `rerankMedcpt` in `src/lib/search/rerank.ts` expects, so the new
service is a true drop-in behind `WEB_RERANK_URL`:

    REQUEST  : POST { "query": str, "documents": [str] }
    RESPONSE : { "scores": [float] }   # one RAW logit per document, IN INPUT ORDER

The TS client (`rerankMedcpt`) then does, per the rerank.ts contract:
    scores
      .map((logit, index) => ({ index, relevance_score: sigmoid(logit) }))
      .sort(desc by relevance_score)
      .slice(0, topN)

So the ONLY guarantees this endpoint must honor are:
  1. response is an object with a "scores" key whose value is a list,
  2. len(scores) == len(documents),
  3. scores are finite floats in INPUT order (index i scores documents[i]),
  4. a more-relevant document gets a strictly higher score than an off-topic one
     (so sigmoid + sort reproduces the right ranking),
  5. empty/blank input returns { "scores": [] } (caller keeps its order).

This intentionally mirrors the assertions in `src/lib/search/__tests__/rerank.test.ts`
(which mocks the network) but exercises the REAL model, closing the loop the unit
test cannot. It is NOT a Modal app — run it locally after deploy:

    op-run -- python infra/modal/web_reranker_contract_test.py \
        "https://shailesh-greatest--manan-web-reranker-webreranker-rerank.modal.run"

Exits non-zero (and prints which assertion failed) if the contract is violated.
"""

from __future__ import annotations

import json
import math
import sys
import urllib.request


def _post(url: str, payload: dict) -> dict:
    req = urllib.request.Request(
        url,
        data=json.dumps(payload).encode("utf-8"),
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=60) as resp:
        return json.loads(resp.read().decode("utf-8"))


def _sigmoid(x: float) -> float:
    return 1.0 / (1.0 + math.exp(-x))


def main(url: str) -> int:
    query = "best programming language for web development"
    documents = [
        "A guide to JavaScript and TypeScript for building modern web apps.",  # relevant
        "How to bake a sourdough loaf with a long overnight fermentation.",    # off-topic
        "Choosing a framework: React, Vue, and Svelte compared for the web.",  # relevant
    ]

    # 1) Happy path: shape + length + ordering contract.
    body = _post(url, {"query": query, "documents": documents})
    assert isinstance(body, dict), f"response is not an object: {body!r}"
    assert "scores" in body, f"response missing 'scores' key: {body!r}"
    scores = body["scores"]
    assert isinstance(scores, list), f"'scores' is not a list: {scores!r}"
    assert len(scores) == len(documents), (
        f"scores length {len(scores)} != documents length {len(documents)} "
        "(must be one score per document, in input order)"
    )
    assert all(isinstance(s, (int, float)) and math.isfinite(s) for s in scores), (
        f"scores must be finite numbers (raw logits the client will sigmoid): {scores!r}"
    )
    # Relevance ordering: the two web docs (idx 0, 2) must out-score the baking doc
    # (idx 1) so that sigmoid + desc-sort surfaces them first, exactly as rerank.ts does.
    assert scores[0] > scores[1] and scores[2] > scores[1], (
        f"relevant docs did not out-score the off-topic doc: {scores!r}"
    )
    # Reproduce the client's transform to prove the end-to-end ranking is correct.
    ranked = sorted(
        ({"index": i, "relevance_score": _sigmoid(s)} for i, s in enumerate(scores)),
        key=lambda r: r["relevance_score"],
        reverse=True,
    )
    assert ranked[0]["index"] in (0, 2), f"top-ranked doc is the off-topic one: {ranked!r}"
    assert all(0.0 <= r["relevance_score"] <= 1.0 for r in ranked), (
        "sigmoid(logit) must land in [0,1] — the relevance_score contract"
    )

    # 2) Empty/blank input → empty scores (caller keeps its pre-rerank order).
    assert _post(url, {"query": "", "documents": documents}) == {"scores": []}
    assert _post(url, {"query": query, "documents": []}) == {"scores": []}

    print("OK — web reranker honors the rerankMedcpt request/response contract.")
    print(f"  raw scores (input order): {scores}")
    print(f"  client ranking (index):   {[r['index'] for r in ranked]}")
    return 0


if __name__ == "__main__":
    if len(sys.argv) != 2:
        print(__doc__)
        print("usage: python web_reranker_contract_test.py <endpoint-url>", file=sys.stderr)
        raise SystemExit(2)
    raise SystemExit(main(sys.argv[1]))
