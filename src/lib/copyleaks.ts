// Copyleaks plagiarism detection API client
// API flow: Login -> Submit scan -> Poll for results

export interface CopyleaksConfig {
  email: string; // from COPYLEAKS_EMAIL env var
  apiKey: string; // from COPYLEAKS_API_KEY env var
}

export interface CopyleaksSource {
  url: string;
  title: string;
  matchPercentage: number;
  matchedText: string;
}

export interface CopyleaksResult {
  scanId: string;
  status: "completed" | "pending" | "error";
  score: number; // plagiarism percentage 0-100
  sources: CopyleaksSource[];
}

// ── Token cache (valid for 48 hours) ──────────────────────────────

let _cachedToken: string | null = null;
let _tokenExpiresAt: number = 0;

function getConfig(): CopyleaksConfig {
  const email = process.env.COPYLEAKS_EMAIL;
  const apiKey = process.env.COPYLEAKS_API_KEY;
  if (!email || !apiKey) {
    throw new Error(
      "Copyleaks credentials not configured. Set COPYLEAKS_EMAIL and COPYLEAKS_API_KEY in .env.local"
    );
  }
  return { email, apiKey };
}

/**
 * Login to Copyleaks and cache the access token.
 * Tokens are valid for 48 hours; we refresh 5 minutes early.
 */
export async function getCopyleaksToken(): Promise<string> {
  if (_cachedToken && Date.now() < _tokenExpiresAt) {
    return _cachedToken;
  }

  const { email, apiKey } = getConfig();

  const res = await fetch(
    "https://id.copyleaks.com/v3/account/login/api",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, key: apiKey }),
    }
  );

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Copyleaks login failed (${res.status}): ${body}`);
  }

  const data = (await res.json()) as {
    access_token: string;
    ".expires": string;
  };

  _cachedToken = data.access_token;
  // Expire 5 minutes before the actual expiry to avoid race conditions
  const expiresDate = new Date(data[".expires"]).getTime();
  _tokenExpiresAt = expiresDate - 5 * 60 * 1000;

  return _cachedToken;
}

/**
 * Submit text for plagiarism scanning.
 * Returns the scanId used to poll for results.
 */
export async function submitScan(
  text: string,
  scanId?: string
): Promise<{ scanId: string }> {
  const token = await getCopyleaksToken();
  const id = scanId ?? `ss-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

  // Base64-encode the text as required by the Copyleaks file submission endpoint
  const base64Text = Buffer.from(text, "utf-8").toString("base64");

  const res = await fetch(
    `https://api.copyleaks.com/v3/scans/submit/file/${id}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        base64: base64Text,
        filename: `${id}.txt`,
        properties: {
          sandbox: process.env.NODE_ENV !== "production",
          webhooks: {
            status: `${process.env.NEXT_PUBLIC_APP_URL ?? "https://localhost:3000"}/api/copyleaks/webhook/{STATUS}`,
          },
          // Scan against internet sources and internal database
          scanning: {
            internet: true,
          },
        },
      }),
    }
  );

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Copyleaks scan submission failed (${res.status}): ${body}`);
  }

  return { scanId: id };
}

/**
 * Check scan status and retrieve results.
 * Returns a normalized CopyleaksResult with matched sources.
 */
export async function getScanResults(
  scanId: string
): Promise<CopyleaksResult> {
  const token = await getCopyleaksToken();

  // First, check the scan status
  const statusRes = await fetch(
    `https://api.copyleaks.com/v3/scans/${scanId}/status`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  if (!statusRes.ok) {
    // 404 likely means the scan is still queued / processing
    if (statusRes.status === 404) {
      return {
        scanId,
        status: "pending",
        score: 0,
        sources: [],
      };
    }
    const body = await statusRes.text();
    throw new Error(
      `Copyleaks status check failed (${statusRes.status}): ${body}`
    );
  }

  const statusData = (await statusRes.json()) as { status: string };

  if (statusData.status !== "Completed") {
    return {
      scanId,
      status: "pending",
      score: 0,
      sources: [],
    };
  }

  // Scan is complete -- fetch the full results
  const resultsRes = await fetch(
    `https://api.copyleaks.com/v3/scans/${scanId}/results`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  if (!resultsRes.ok) {
    const body = await resultsRes.text();
    throw new Error(
      `Copyleaks results fetch failed (${resultsRes.status}): ${body}`
    );
  }

  const resultsData = (await resultsRes.json()) as {
    statistics?: { aggregatedScore?: number };
    results?: {
      internet?: Array<{
        url: string;
        title: string;
        matchedWords: number;
        totalWords: number;
        metadata?: { matchedText?: string };
      }>;
    };
  };

  const score = resultsData.statistics?.aggregatedScore ?? 0;
  const internetResults = resultsData.results?.internet ?? [];

  const sources: CopyleaksSource[] = internetResults.map((r) => ({
    url: r.url,
    title: r.title || r.url,
    matchPercentage:
      r.totalWords > 0
        ? Math.round((r.matchedWords / r.totalWords) * 100)
        : 0,
    matchedText: r.metadata?.matchedText ?? "",
  }));

  return {
    scanId,
    status: "completed",
    score,
    sources,
  };
}
