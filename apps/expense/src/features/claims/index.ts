import type { FeatureDefinition } from "@bishnoi/contracts";
import { mockRows } from "./mock-data";

/** Owner: Zild. See .github/ownership.json. */
export const feature: FeatureDefinition = {
  id: "claims",
  name: "Claims",
  description: "Individual expense claims.",
  status: "placeholder",
  columns: [
    { key: "ref", label: "Reference" },
    { key: "employee", label: "Employee" },
    { key: "category", label: "Category" },
    { key: "amount", label: "Amount" },
  ],
  mockRows,
};
