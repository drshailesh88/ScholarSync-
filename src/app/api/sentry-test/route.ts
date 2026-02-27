// Test route — remove after verifying Sentry works
// Visit /api/sentry-test to trigger a server-side error
export function GET() {
  throw new Error("Sentry test: server-side error from API route");
}
