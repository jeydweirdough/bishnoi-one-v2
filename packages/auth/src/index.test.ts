import { describe, expect, it } from "vitest";
import { getSession, initials } from "./index";

describe("auth (mock)", () => {
  it("returns a session flagged as mock", async () => {
    const session = await getSession();
    expect(session.mock).toBe(true);
  });

  it("computes initials", () => {
    expect(initials("Demo User")).toBe("DU");
    expect(initials("  single ")).toBe("S");
  });
});
