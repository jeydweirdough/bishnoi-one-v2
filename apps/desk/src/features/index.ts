import type { FeatureDefinition } from "@bishnoi/contracts";
import { feature as tickets } from "./tickets";
import { feature as sla } from "./sla";
import { feature as knowledgeBase } from "./knowledge-base";

/**
 * Feature registry for Desk. Owned by the app lead (Aryan).
 * Order controls the sidebar. Adding a feature = one import + one entry here.
 */
export const features: FeatureDefinition[] = [tickets, sla, knowledgeBase];
