import { afterEach, describe, expect, it } from "vitest";
import {
  consumePendingCitationNotice,
  resetPendingCitationNoticeCache,
} from "@/lib/editor/pending-citation-notice";

function createStorage(initialValue: string | null) {
  let currentValue = initialValue;

  return {
    getItem: (_key: string) => currentValue,
    removeItem: (_key: string) => {
      currentValue = null;
    },
    read: () => currentValue,
  };
}

describe("consumePendingCitationNotice", () => {
  afterEach(() => {
    resetPendingCitationNoticeCache();
  });

  it("uses the citation title when present", () => {
    const storage = createStorage(JSON.stringify({ title: "Audit Paper" }));

    expect(consumePendingCitationNotice(storage)).toBe(
      'Saved "Audit Paper" to your library. Open Citation Dialog to cite it.'
    );
    expect(storage.read()).toBeNull();
  });

  it("falls back to the generic message when parsing fails", () => {
    const storage = createStorage("{not-json");

    expect(consumePendingCitationNotice(storage)).toBe(
      "Paper saved to your library. Open Citation Dialog to cite it."
    );
    expect(storage.read()).toBeNull();
  });

  it("replays the consumed notice once for the strict-mode remount", () => {
    const storage = createStorage(JSON.stringify({ title: "Strict Mode Paper" }));

    const firstRead = consumePendingCitationNotice(storage);
    const secondRead = consumePendingCitationNotice(storage);
    const thirdRead = consumePendingCitationNotice(storage);

    expect(firstRead).toBe(
      'Saved "Strict Mode Paper" to your library. Open Citation Dialog to cite it.'
    );
    expect(secondRead).toBe(firstRead);
    expect(thirdRead).toBeNull();
  });
});
