import type { FeatureDefinition } from "@bishnoi/contracts";
import { mockRows } from "./mock-data";

/** Owner: Aryan. See .github/ownership.json. */
export const feature: FeatureDefinition = {
  id: "sla",
  name: "SLA",
  description: "Service level targets.",
  status: "placeholder",
  columns: [
    { key: "policy", label: "Policy" },
    { key: "firstResponse", label: "First response" },
    { key: "resolution", label: "Resolution" },
  ],
  mockRows,
};
