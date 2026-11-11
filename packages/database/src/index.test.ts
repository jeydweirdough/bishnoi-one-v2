import { describe, expect, it } from "vitest";
import { isDatabaseConfigured } from "./index";

describe("isDatabaseConfigured", () => {
  it("is false without DATABASE_URL", () => {
    expect(isDatabaseConfigured({})).toBe(false);
    expect(isDatabaseConfigured({ DATABASE_URL: "" })).toBe(false);
  });

  it("is true when DATABASE_URL is set", () => {
    expect(isDatabaseConfigured({ DATABASE_URL: "postgres://localhost/example" })).toBe(true);
  });
});
