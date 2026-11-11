import type { FeatureDefinition } from "@bishnoi/contracts";
import { mockRows } from "./mock-data";

/** Owner: Zild. See .github/ownership.json. */
export const feature: FeatureDefinition = {
  id: "ledger",
  name: "Ledger",
  description: "Chart of accounts and journal entries.",
  status: "placeholder",
  columns: [
    { key: "account", label: "Account" },
    { key: "type", label: "Type" },
    { key: "balance", label: "Balance" },
  ],
  mockRows,
};
