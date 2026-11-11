import type { FeatureDefinition } from "@bishnoi/contracts";
import { mockRows } from "./mock-data";

/** Owner: Aaron. See .github/ownership.json. */
export const feature: FeatureDefinition = {
  id: "attendance",
  name: "Attendance",
  description: "Daily check-in records.",
  status: "placeholder",
  columns: [
    { key: "employee", label: "Employee" },
    { key: "date", label: "Date" },
    { key: "status", label: "Status" },
  ],
  mockRows,
};
