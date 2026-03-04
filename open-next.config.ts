import { defineCloudflareConfig } from "@opennextjs/cloudflare";

export default defineCloudflareConfig({
  // R2 incremental cache — optional, enables ISR caching on R2
  // Uncomment when R2 bucket is configured:
  // incrementalCache: r2IncrementalCache,
});
