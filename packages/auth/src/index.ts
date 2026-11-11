/**
 * Authentication for Bishnoi One.
 *
 * MOCK IMPLEMENTATION: there is no identity provider yet. `getSession()` always returns
 * the demo session below. Replacing it is a cross-application change and needs
 * approval from every app owner (see docs/INTEGRATION.md).
 */
import type { Subject } from "@bishnoi/permissions";

export interface User {
  id: string;
  name: string;
  email: string;
  organizationId: string;
}

export interface Session extends Subject {
  user: User;
  /** Always true until a real identity provider is integrated. */
  mock: boolean;
}

export const MOCK_SESSION: Session = {
  user: {
    id: "user_demo",
    name: "Demo User",
    email: "demo.user@example.com",
    organizationId: "org_demo",
  },
  grants: [{ role: "org_admin", apps: "*" }],
  mock: true,
};

export async function getSession(): Promise<Session> {
  return MOCK_SESSION;
}

export function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}
