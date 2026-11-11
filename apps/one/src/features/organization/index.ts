import type { FeatureDefinition } from "@bishnoi/contracts";
import { mockRows } from "./mock-data";

/** Owner: Linus. See .github/ownership.json. */
export const feature: FeatureDefinition = {
  id: "organization",
  name: "Organization",
  description: "Organization settings (placeholder).",
  status: "placeholder",
  columns: [
    { key: "field", label: "Field" },
    { key: "value", label: "Value" },
  ],
  mockRows,
};
