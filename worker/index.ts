import { KVCacheHandler } from "vinext/cloudflare";
import { setCacheHandler } from "next/cache";
import handler from "vinext/server/app-router-entry";

interface Env {
  VINEXT_CACHE: KVNamespace;
  STORAGE: R2Bucket;
  HYPERDRIVE: Hyperdrive;
  ASSETS: Fetcher;
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
