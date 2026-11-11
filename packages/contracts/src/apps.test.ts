import { describe, expect, it } from "vitest";
import { APP_IDS, APPS, BUSINESS_APPS, getAppUrl, isAppId } from "./index";

describe("application registry", () => {
  it("lists the portal plus 12 business applications", () => {
    expect(APPS).toHaveLength(13);
    expect(BUSINESS_APPS).toHaveLength(12);
    expect(APPS.map((app) => app.id)).toEqual([...APP_IDS]);
  });

  it("gives every app a unique port", () => {
    const ports = new Set(APPS.map((app) => app.port));
    expect(ports.size).toBe(APPS.length);
  });

  it("resolves URLs from env overrides or local ports", () => {
    expect(getAppUrl("crm", {})).toBe("http://localhost:3002");
    expect(getAppUrl("crm", { NEXT_PUBLIC_APP_URL_CRM: "https://crm.example.com" })).toBe("https://crm.example.com");
  });

  it("validates app ids", () => {
    expect(isAppId("books")).toBe(true);
    expect(isAppId("zoho")).toBe(false);
  });
});
