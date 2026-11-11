import type { FeatureDefinition } from "@bishnoi/contracts";
import { mockRows } from "./mock-data";

/** Owner: Aryan. See .github/ownership.json. */
export const feature: FeatureDefinition = {
  id: "deals",
  name: "Deals",
  description: "Sales opportunities in the pipeline.",
  status: "placeholder",
  columns: [
    { key: "name", label: "Deal" },
    { key: "stage", label: "Stage" },
    { key: "amount", label: "Amount" },
  ],
  mockRows,
};
