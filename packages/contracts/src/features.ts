/** Shape every app feature module exports from `src/features/<feature>/index.ts`. */

export type FeatureStatus = "placeholder" | "in-progress" | "live";

export interface FeatureColumn {
  key: string;
  label: string;
}

export type FeatureRow = Record<string, string | number>;

export interface FeatureDefinition {
  /** Matches the folder name and the route segment, e.g. "stock-adjustments". */
  id: string;
  name: string;
  description: string;
  status: FeatureStatus;
  columns: FeatureColumn[];
  /** Placeholder rows. Remove once the feature reads from the database. */
  mockRows: FeatureRow[];
}
