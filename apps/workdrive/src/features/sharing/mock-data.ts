import type { FeatureRow } from "@bishnoi/contracts";

/** MOCK DATA — placeholder rows until this feature reads from Neon. */
export const mockRows: FeatureRow[] = [
  { item: "Sample folder", sharedWith: "Finance team", permission: "Edit" },
  { item: "sample-document.pdf", sharedWith: "Sample Member", permission: "View" },
  { item: "sample-sheet.csv", sharedWith: "Organization", permission: "View" },
];
