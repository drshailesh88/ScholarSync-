// Environment variable validation — imported by instrumentation.ts at startup

const isProd = process.env.NODE_ENV === "production";

interface EnvVar {
  name: string;
  required: boolean | "production"; // true = always, "production" = only in prod
}

const ENV_VARS: EnvVar[] = [
  { name: "DATABASE_URL", required: true },
  { name: "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY", required: "production" },
  { name: "CLERK_SECRET_KEY", required: "production" },
  // Payments are a v2 feature — not part of the search-only v1 product, so
  // Razorpay keys are optional. Re-require them when billing returns in v2.
  { name: "RAZORPAY_KEY_ID", required: false },
  { name: "RAZORPAY_KEY_SECRET", required: false },
  { name: "RAZORPAY_WEBHOOK_SECRET", required: false },
  { name: "UPSTASH_REDIS_REST_URL", required: "production" },
  { name: "UPSTASH_REDIS_REST_TOKEN", required: "production" },
];

export function validateEnv(): void {
  const missing: string[] = [];

  for (const v of ENV_VARS) {
    const isRequired = v.required === true || (v.required === "production" && isProd);
    if (isRequired && !process.env[v.name]) {
      missing.push(v.name);
    }
  }

  if (missing.length > 0) {
    const msg = `Missing required environment variables:\n  ${missing.join("\n  ")}`;
    if (isProd) {
      throw new Error(msg);
    }
    console.warn(`[env] WARNING: ${msg}`);
  }

  // Warn about AI provider config
  const provider = process.env.AI_PROVIDER || "anthropic";
  const aiKey =
    provider === "anthropic"
      ? "ANTHROPIC_API_KEY"
      : "ZHIPU_API_KEY";

  if (!process.env[aiKey]) {
    console.warn(
      `[env] WARNING: AI_PROVIDER is "${provider}" but ${aiKey} is not set. AI features will be unavailable.`
    );
  }
}
