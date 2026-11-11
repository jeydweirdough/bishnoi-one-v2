import type { FeatureDefinition } from "@bishnoi/contracts";
import { mockRows } from "./mock-data";

/** Owner: Linus. See .github/ownership.json. */
export const feature: FeatureDefinition = {
  id: "profile",
  name: "Profile",
  description: "Your user profile (placeholder).",
  status: "placeholder",
  columns: [
    { key: "field", label: "Field" },
    { key: "value", label: "Value" },
  ],
  mockRows,
};
