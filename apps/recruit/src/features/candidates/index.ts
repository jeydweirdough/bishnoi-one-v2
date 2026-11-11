import type { FeatureDefinition } from "@bishnoi/contracts";
import { mockRows } from "./mock-data";

/** Owner: Aaron. See .github/ownership.json. */
export const feature: FeatureDefinition = {
  id: "candidates",
  name: "Candidates",
  description: "Applicants across openings.",
  status: "placeholder",
  columns: [
    { key: "name", label: "Name" },
    { key: "role", label: "Applied for" },
    { key: "stage", label: "Stage" },
  ],
  mockRows,
};
