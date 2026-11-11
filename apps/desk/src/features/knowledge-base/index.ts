import type { FeatureDefinition } from "@bishnoi/contracts";
import { mockRows } from "./mock-data";

/** Owner: Jade. See .github/ownership.json. */
export const feature: FeatureDefinition = {
  id: "knowledge-base",
  name: "Knowledge Base",
  description: "Help articles.",
  status: "placeholder",
  columns: [
    { key: "title", label: "Article" },
    { key: "category", label: "Category" },
    { key: "status", label: "Status" },
  ],
  mockRows,
};
