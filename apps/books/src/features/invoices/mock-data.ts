import type { FeatureRow } from "@bishnoi/contracts";

/** MOCK DATA — placeholder rows until this feature reads from Neon. */
export const mockRows: FeatureRow[] = [
  { number: "INV-001", customer: "Example Co", amount: "1,200", status: "Sent" },
  { number: "INV-002", customer: "Sample Ltd", amount: "560", status: "Paid" },
  { number: "INV-003", customer: "Demo Inc", amount: "3,400", status: "Draft" },
];
