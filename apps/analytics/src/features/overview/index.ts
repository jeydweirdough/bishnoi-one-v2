import type { FeatureDefinition } from "@bishnoi/contracts";
import { mockRows } from "./mock-data";

/** Owner: Linus. See .github/ownership.json. */
export const feature: FeatureDefinition = {
  id: "overview",
  name: "Overview",
  description: "Cross-application summary dashboard.",
  status: "placeholder",
  columns: [
    { key: "metric", label: "Metric" },
    { key: "source", label: "Source app" },
    { key: "value", label: "Value" },
  ],
  mockRows,
};
