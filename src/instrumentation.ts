// Next.js instrumentation hook — runs once at server startup
// https://nextjs.org/docs/app/building-your-application/optimizing/instrumentation

export async function register() {
  const { validateEnv } = await import("@/lib/env");
  validateEnv();
}
