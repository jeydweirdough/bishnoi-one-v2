import type { FeatureDefinition } from "@bishnoi/contracts";
import { mockRows } from "./mock-data";

/** Owner: Aaron. See .github/ownership.json. */
export const feature: FeatureDefinition = {
  id: "invoices",
  name: "Invoices",
  description: "Customer invoices.",
  status: "placeholder",
  columns: [
    { key: "number", label: "Number" },
    { key: "customer", label: "Customer" },
    { key: "amount", label: "Amount" },
    { key: "status", label: "Status" },
  ],
  mockRows,
};
