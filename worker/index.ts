import { KVCacheHandler } from "vinext/cloudflare";
import { setCacheHandler } from "next/cache";
import handler from "vinext/server/app-router-entry";

interface Env {
  VINEXT_CACHE: KVNamespace;
  ASSETS: Fetcher;
  // Future bindings (will be configured by other migration instances):
  // HYPERDRIVE: Hyperdrive;
  // STORAGE: R2Bucket;
  [key: string]: unknown;
}

const worker = {
  async fetch(request: Request, env: Env): Promise<Response> {
    setCacheHandler(
      new KVCacheHandler(env.VINEXT_CACHE, {
        appPrefix: "scholarsync",
      })
    );
    return handler.fetch(request);
  },
};

export default worker;
