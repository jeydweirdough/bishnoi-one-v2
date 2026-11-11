import type { FeatureDefinition } from "@bishnoi/contracts";
import { mockRows } from "./mock-data";

/** Owner: Aryan. See .github/ownership.json. */
export const feature: FeatureDefinition = {
  id: "templates",
  name: "Templates",
  description: "Reusable contract templates.",
  status: "placeholder",
  columns: [
    { key: "name", label: "Template" },
    { key: "type", label: "Type" },
    { key: "version", label: "Version" },
  ],
  mockRows,
};
