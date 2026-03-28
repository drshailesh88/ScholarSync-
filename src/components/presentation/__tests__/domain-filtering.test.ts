import { describe, expect, it } from "vitest";
import { getAudienceOptionsForDomain } from "../generation-wizard";
import { getPosterTemplatesForDomain } from "@/types/poster";
import { medicineDomain } from "@/lib/search/domains/medicine";
import { multidisciplinaryDomain } from "@/lib/search/domains/multidisciplinary";
import type { DomainConfig } from "@/lib/search/domains/types";

function makePhysicsLikeDomain(): DomainConfig {
  return {
    ...multidisciplinaryDomain,
    id: "physics",
    label: "Physics",
    features: {
      ...multidisciplinaryDomain.features,
      presentationTypes: [
        "general",
        "thesis_defense",
        "conference",
        "classroom",
        "lab_meeting",
        "departmental_seminar",
      ],
    },
    posterTemplates: ["basic_science"],
  };
}

describe("presentation and poster domain filtering", () => {
  it("keeps medical audience options for medicine", () => {
    const options = getAudienceOptionsForDomain(medicineDomain).map((option) => option.key);

    expect(options).toContain("grand_rounds");
    expect(options).toContain("patient_case");
  });

  it("hides medical-only audience options for a physics-like domain", () => {
    const options = getAudienceOptionsForDomain(makePhysicsLikeDomain()).map((option) => option.key);

    expect(options).toContain("lab_meeting");
    expect(options).toContain("departmental_seminar");
    expect(options).not.toContain("grand_rounds");
  });

  it("shows all audience options when domain is undefined", () => {
    const options = getAudienceOptionsForDomain().map((option) => option.key);

    expect(options).toContain("grand_rounds");
    expect(options).toContain("patient_case");
    expect(options).toContain("lab_meeting");
    expect(options).toContain("departmental_seminar");
  });

  it("filters poster templates by domain configuration", () => {
    const medicineTemplates = getPosterTemplatesForDomain(medicineDomain).map((template) => template.name);
    const physicsTemplates = getPosterTemplatesForDomain(makePhysicsLikeDomain()).map((template) => template.name);

    expect(medicineTemplates).toContain("Clinical Research");
    expect(physicsTemplates).not.toContain("Clinical Research");
    expect(physicsTemplates).toContain("Basic Science");
  });
});
