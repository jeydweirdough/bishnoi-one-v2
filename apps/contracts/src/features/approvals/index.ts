import type { FeatureDefinition } from "@bishnoi/contracts";
import { mockRows } from "./mock-data";

/** Owner: Jade. See .github/ownership.json. */
export const feature: FeatureDefinition = {
  id: "approvals",
  name: "Approvals",
  description: "Approval and signature workflow.",
  status: "placeholder",
  columns: [
    { key: "contract", label: "Contract" },
    { key: "approver", label: "Approver" },
    { key: "status", label: "Status" },
  ],
  mockRows,
};
