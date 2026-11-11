import type { FeatureRow } from "@bishnoi/contracts";

/** MOCK DATA — placeholder rows until this feature reads from Neon. */
export const mockRows: FeatureRow[] = [
  { name: "Deal A", stage: "Proposal", amount: "10,000" },
  { name: "Deal B", stage: "Negotiation", amount: "4,500" },
  { name: "Deal C", stage: "Closed won", amount: "8,200" },
];
