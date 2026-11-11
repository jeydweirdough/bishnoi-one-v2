import type { FeatureDefinition } from "@bishnoi/contracts";
import { feature as files } from "./files";
import { feature as sharing } from "./sharing";

/**
 * Feature registry for WorkDrive. Owned by the app lead (Aryan).
 * Order controls the sidebar. Adding a feature = one import + one entry here.
 */
export const features: FeatureDefinition[] = [files, sharing];
