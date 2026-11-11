import type { FeatureDefinition } from "@bishnoi/contracts";
import { feature as employees } from "./employees";
import { feature as onboarding } from "./onboarding";
import { feature as attendance } from "./attendance";
import { feature as leave } from "./leave";

/**
 * Feature registry for People. Owned by the app lead (Jade).
 * Order controls the sidebar. Adding a feature = one import + one entry here.
 */
export const features: FeatureDefinition[] = [employees, onboarding, attendance, leave];
