import { failure, type ApiResponse, type HealthStatus } from "@bishnoi/contracts";

export interface ApiClientOptions {
  baseUrl: string;
  fetch?: typeof fetch;
  headers?: Record<string, string>;
}

export interface ApiClient {
  get<T>(path: string): Promise<ApiResponse<T>>;
  post<T>(path: string, body: unknown): Promise<ApiResponse<T>>;
  health(): Promise<ApiResponse<HealthStatus>>;
}

/** Create a client for one app's API, e.g. createApiClient({ baseUrl: getAppUrl("crm") }). */
export function createApiClient(options: ApiClientOptions): ApiClient {
  const fetchImpl = options.fetch ?? fetch;
  const baseUrl = options.baseUrl.replace(/\/$/, "");

  async function request<T>(method: string, path: string, body?: unknown): Promise<ApiResponse<T>> {
    try {
      const response = await fetchImpl(`${baseUrl}${path}`, {
        method,
        headers: { "content-type": "application/json", ...options.headers },
        body: body === undefined ? undefined : JSON.stringify(body),
      });
      const payload = (await response.json().catch(() => null)) as ApiResponse<T> | null;
      if (payload && typeof payload === "object" && "ok" in payload) return payload;
      return failure(`http_${response.status}`, response.statusText || "Unexpected response body");
    } catch (error) {
      return failure("network_error", error instanceof Error ? error.message : String(error));
    }
  }

  return {
    get: (path) => request("GET", path),
    post: (path, body) => request("POST", path, body),
    health: () => request("GET", "/api/health"),
  };
}
