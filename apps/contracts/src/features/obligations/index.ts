import type { FeatureDefinition } from "@bishnoi/contracts";
import { mockRows } from "./mock-data";

/** Owner: Zild. See .github/ownership.json. */
export const feature: FeatureDefinition = {
  id: "obligations",
  name: "Obligations",
  description: "Payment and renewal obligations.",
  status: "placeholder",
  columns: [
    { key: "contract", label: "Contract" },
    { key: "obligation", label: "Obligation" },
    { key: "due", label: "Due" },
  ],
  mockRows,
};
