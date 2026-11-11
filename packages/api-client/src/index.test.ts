import { describe, expect, it } from "vitest";
import { createApiClient } from "./index";

function fakeFetch(status: number, body: unknown): typeof fetch {
  return (async () => new Response(JSON.stringify(body), { status })) as typeof fetch;
}

describe("createApiClient", () => {
  it("returns the API envelope on success", async () => {
    const client = createApiClient({ baseUrl: "http://x/", fetch: fakeFetch(200, { ok: true, data: [1], mock: true }) });
    await expect(client.get("/api/items")).resolves.toEqual({ ok: true, data: [1], mock: true });
  });

  it("maps responses without an envelope to a failure", async () => {
    const client = createApiClient({ baseUrl: "http://x", fetch: fakeFetch(500, {}) });
    const result = await client.get("/api/items");
    expect(result).toEqual({ ok: false, error: { code: "http_500", message: "Unexpected response body" } });
  });

  it("maps network errors to a failure", async () => {
    const failing = (async () => {
      throw new Error("offline");
    }) as typeof fetch;
    const result = await createApiClient({ baseUrl: "http://x", fetch: failing }).health();
    expect(result).toEqual({ ok: false, error: { code: "network_error", message: "offline" } });
  });
});
