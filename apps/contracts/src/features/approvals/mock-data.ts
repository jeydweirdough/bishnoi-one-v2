import type { FeatureRow } from "@bishnoi/contracts";

/** MOCK DATA — placeholder rows until this feature reads from Neon. */
export const mockRows: FeatureRow[] = [
  { contract: "Contract A", approver: "Legal", status: "Pending" },
  { contract: "Contract B", approver: "Finance", status: "Approved" },
  { contract: "Contract C", approver: "Signatory", status: "Signed" },
];
