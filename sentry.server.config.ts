import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN,

  // Performance: sample 10% of transactions in production
  tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1.0,

  // Don't send events in development unless explicitly enabled
  enabled: process.env.NODE_ENV === "production" || !!process.env.SENTRY_DSN,

  // Do not send PII by default
  sendDefaultPii: false,

  beforeSend(event) {
    // Strip email addresses from URLs
    if (event.request?.url) {
      event.request.url = event.request.url.replace(
        /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
        "[REDACTED_EMAIL]"
      );
    }
    // Strip query parameters that may contain PII
    if (event.request?.query_string) {
      event.request.query_string = "[REDACTED]";
    }
    // Strip cookies
    if (event.request?.cookies) {
      event.request.cookies = {};
    }
    // Strip user data except ID
    if (event.user) {
      event.user = { id: event.user.id };
    }
    return event;
  },
  beforeSendTransaction(event) {
    // Strip PII from transaction names
    if (event.transaction) {
      event.transaction = event.transaction.replace(
        /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
        "[REDACTED_EMAIL]"
      );
    }
    return event;
  },
});
