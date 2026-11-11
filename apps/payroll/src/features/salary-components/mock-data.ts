import type { FeatureRow } from "@bishnoi/contracts";

/** MOCK DATA — placeholder rows until this feature reads from Neon. */
export const mockRows: FeatureRow[] = [
  { name: "Basic", type: "Earning", calculation: "Fixed" },
  { name: "Allowance", type: "Earning", calculation: "% of basic" },
  { name: "Tax", type: "Deduction", calculation: "Rule-based" },
];
