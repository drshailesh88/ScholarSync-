import { defineConfig } from "vite";
import vinext from "vinext";
import { cloudflare } from "@cloudflare/vite-plugin";
import { sentryVitePlugin } from "@sentry/vite-plugin";

const isDev = process.env.NODE_ENV !== "production" && !process.argv.includes("build");

// Workaround: vinext URL-encodes paths with spaces (%20) in virtual module imports.
// This plugin decodes them back to real filesystem paths for both dev and build.
const decodeUriPaths = () => ({
  name: "decode-uri-paths",
  enforce: "pre" as const,
  resolveId(source: string) {
    if (source.includes("%20")) {
      return { id: decodeURIComponent(source), external: false };
    }
    return null;
  },
});

export default defineConfig({
  build: {
    sourcemap: true,
    rollupOptions: {
      plugins: [decodeUriPaths()],
    },
  },
  plugins: [
    decodeUriPaths(),
    vinext(),
    // Cloudflare plugin only for production builds — in dev, Vite serves directly
    ...(isDev
      ? []
      : [
          cloudflare({
            viteEnvironment: { name: "rsc", childEnvironments: ["ssr"] },
          }),
        ]),
    // Upload source maps to Sentry (replaces withSentryConfig from next.config.ts).
    // Only runs in CI when SENTRY_AUTH_TOKEN is set.
    ...(process.env.SENTRY_AUTH_TOKEN
      ? [
          sentryVitePlugin({
            org: process.env.SENTRY_ORG,
            project: process.env.SENTRY_PROJECT,
            authToken: process.env.SENTRY_AUTH_TOKEN,
            sourcemaps: {
              filesToDeleteAfterUpload: ["**/*.map"],
            },
            silent: !process.env.CI,
          }),
        ]
      : []),
  ],
});
