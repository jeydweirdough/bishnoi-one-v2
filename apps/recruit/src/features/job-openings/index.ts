import type { FeatureDefinition } from "@bishnoi/contracts";
import { mockRows } from "./mock-data";

/** Owner: Aaron. See .github/ownership.json. */
export const feature: FeatureDefinition = {
  id: "job-openings",
  name: "Job Openings",
  description: "Open positions.",
  status: "placeholder",
  columns: [
    { key: "title", label: "Title" },
    { key: "department", label: "Department" },
    { key: "openings", label: "Openings" },
  ],
  mockRows,
};
