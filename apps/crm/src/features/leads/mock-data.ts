import type { FeatureRow } from "@bishnoi/contracts";

/** MOCK DATA — placeholder rows until this feature reads from Neon. */
export const mockRows: FeatureRow[] = [
  { name: "Lead One", company: "Example Co", source: "Website", status: "New" },
  { name: "Lead Two", company: "Sample Ltd", source: "Referral", status: "Contacted" },
  { name: "Lead Three", company: "Demo Inc", source: "Event", status: "Qualified" },
];
