import type { FeatureDefinition } from "@bishnoi/contracts";
import { mockRows } from "./mock-data";

/** Owner: Aaron. See .github/ownership.json. */
export const feature: FeatureDefinition = {
  id: "recruit-reports",
  name: "Recruit Reports",
  description: "Hiring pipeline reports.",
  status: "placeholder",
  columns: [
    { key: "report", label: "Report" },
    { key: "status", label: "Status" },
  ],
  mockRows,
};
