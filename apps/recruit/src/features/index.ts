import type { FeatureDefinition } from "@bishnoi/contracts";
import { feature as jobOpenings } from "./job-openings";
import { feature as candidates } from "./candidates";
import { feature as interviews } from "./interviews";
import { feature as offers } from "./offers";

/**
 * Feature registry for Recruit. Owned by the app lead (Aaron).
 * Order controls the sidebar. Adding a feature = one import + one entry here.
 */
export const features: FeatureDefinition[] = [jobOpenings, candidates, interviews, offers];
