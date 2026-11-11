import { describe, expect, it } from "vitest";
import { accessibleApps, can, type Subject } from "./index";

describe("can", () => {
  it("grants every action to org admins on every app", () => {
    const admin: Subject = { grants: [{ role: "org_admin", apps: "*" }] };
    expect(can(admin, "manage", "payroll")).toBe(true);
  });

  it("limits members to view/create/update on granted apps", () => {
    const member: Subject = { grants: [{ role: "member", apps: ["crm"] }] };
    expect(can(member, "update", "crm")).toBe(true);
    expect(can(member, "delete", "crm")).toBe(false);
    expect(can(member, "view", "books")).toBe(false);
  });

  it("lists accessible apps", () => {
    const viewer: Subject = { grants: [{ role: "viewer", apps: ["desk", "crm"] }] };
    expect(accessibleApps(viewer, ["crm", "books", "desk"])).toEqual(["crm", "desk"]);
  });
});
