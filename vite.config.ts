import { defineConfig } from "vite";
import vinext from "vinext";
import { cloudflare } from "@cloudflare/vite-plugin";
import { sentryVitePlugin } from "@sentry/vite-plugin";

export default defineConfig({
  build: {
    sourcemap: true,
    rollupOptions: {
      // Workaround: vinext URL-encodes paths with spaces in virtual module imports.
      // This plugin decodes %20 back to spaces before Rollup tries to resolve them.
      plugins: [
        {
          name: "decode-uri-paths",
          resolveId(source) {
            if (source.includes("%20")) {
              return { id: decodeURIComponent(source), external: false };
            }
            return null;
          },
        },
      ],
    },
  },
  plugins: [
    vinext(),
    cloudflare({
      viteEnvironment: { name: "rsc", childEnvironments: ["ssr"] },
    }),
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
