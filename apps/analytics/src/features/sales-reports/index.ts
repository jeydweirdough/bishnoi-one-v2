import type { FeatureDefinition } from "@bishnoi/contracts";
import { mockRows } from "./mock-data";

/** Owner: Aryan. See .github/ownership.json. */
export const feature: FeatureDefinition = {
  id: "sales-reports",
  name: "Sales & Service Reports",
  description: "CRM and Desk reports.",
  status: "placeholder",
  columns: [
    { key: "report", label: "Report" },
    { key: "status", label: "Status" },
  ],
  mockRows,
};
