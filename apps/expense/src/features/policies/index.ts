import type { FeatureDefinition } from "@bishnoi/contracts";
import { mockRows } from "./mock-data";

/** Owner: Zild. See .github/ownership.json. */
export const feature: FeatureDefinition = {
  id: "policies",
  name: "Policies",
  description: "Spending limits and rules.",
  status: "placeholder",
  columns: [
    { key: "name", label: "Policy" },
    { key: "limit", label: "Limit" },
    { key: "appliesTo", label: "Applies to" },
  ],
  mockRows,
};
