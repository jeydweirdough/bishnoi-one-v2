import type { FeatureDefinition } from "@bishnoi/contracts";
import { mockRows } from "./mock-data";

/** Owner: Jade. See .github/ownership.json. */
export const feature: FeatureDefinition = {
  id: "hr-reports",
  name: "HR Reports",
  description: "People and workforce reports.",
  status: "placeholder",
  columns: [
    { key: "report", label: "Report" },
    { key: "status", label: "Status" },
  ],
  mockRows,
};
