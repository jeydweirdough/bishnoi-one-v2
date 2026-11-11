import type { FeatureDefinition } from "@bishnoi/contracts";
import { feature as items } from "./items";
import { feature as stockAdjustments } from "./stock-adjustments";
import { feature as warehouses } from "./warehouses";

/**
 * Feature registry for Inventory. Owned by the app lead (Aaron).
 * Order controls the sidebar. Adding a feature = one import + one entry here.
 */
export const features: FeatureDefinition[] = [items, stockAdjustments, warehouses];
