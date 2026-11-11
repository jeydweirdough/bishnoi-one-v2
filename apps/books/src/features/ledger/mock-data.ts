import type { FeatureRow } from "@bishnoi/contracts";

/** MOCK DATA — placeholder rows until this feature reads from Neon. */
export const mockRows: FeatureRow[] = [
  { account: "1000 Cash", type: "Asset", balance: "25,000" },
  { account: "2000 Payables", type: "Liability", balance: "8,000" },
  { account: "4000 Revenue", type: "Income", balance: "42,000" },
];
