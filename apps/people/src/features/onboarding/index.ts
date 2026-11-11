import type { FeatureDefinition } from "@bishnoi/contracts";
import { mockRows } from "./mock-data";

/** Owner: Jade. See .github/ownership.json. */
export const feature: FeatureDefinition = {
  id: "onboarding",
  name: "Onboarding",
  description: "New-hire onboarding checklists.",
  status: "placeholder",
  columns: [
    { key: "employee", label: "Employee" },
    { key: "startDate", label: "Start date" },
    { key: "progress", label: "Progress" },
  ],
  mockRows,
};
