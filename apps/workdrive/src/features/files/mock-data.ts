import type { FeatureRow } from "@bishnoi/contracts";

/** MOCK DATA — placeholder rows until this feature reads from Neon. */
export const mockRows: FeatureRow[] = [
  { name: "Sample folder", type: "Folder", size: "—" },
  { name: "sample-document.pdf", type: "PDF", size: "1.2 MB" },
  { name: "sample-sheet.csv", type: "CSV", size: "48 KB" },
];
