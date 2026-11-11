import type { AppId } from "@bishnoi/contracts";

export const ROLES = ["org_admin", "app_admin", "member", "viewer"] as const;
export type Role = (typeof ROLES)[number];

export const ACTIONS = ["view", "create", "update", "delete", "manage"] as const;
export type Action = (typeof ACTIONS)[number];

/** A role granted for a set of apps ("*" = every app). */
export interface AppGrant {
  role: Role;
  apps: AppId[] | "*";
}

export interface Subject {
  grants: AppGrant[];
}

const ROLE_ACTIONS: Record<Role, readonly Action[]> = {
  org_admin: ACTIONS,
  app_admin: ACTIONS,
  member: ["view", "create", "update"],
  viewer: ["view"],
};

function grantCoversApp(grant: AppGrant, app: AppId): boolean {
  return grant.apps === "*" || grant.apps.includes(app);
}

/** Can `subject` perform `action` in `app`? */
export function can(subject: Subject, action: Action, app: AppId): boolean {
  return subject.grants.some((grant) => grantCoversApp(grant, app) && ROLE_ACTIONS[grant.role].includes(action));
}

/** Apps the subject can open (has at least "view" on). */
export function accessibleApps(subject: Subject, apps: readonly AppId[]): AppId[] {
  return apps.filter((app) => can(subject, "view", app));
}
