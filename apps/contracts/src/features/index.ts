import type { FeatureDefinition } from "@bishnoi/contracts";
import { feature as templates } from "./templates";
import { feature as obligations } from "./obligations";
import { feature as approvals } from "./approvals";

/**
 * Feature registry for Contracts. Owned by the app lead (Aryan).
 * Order controls the sidebar. Adding a feature = one import + one entry here.
 */
export const features: FeatureDefinition[] = [templates, obligations, approvals];
