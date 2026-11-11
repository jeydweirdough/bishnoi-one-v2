/** Response envelope used by every Bishnoi One API route. */

export interface ApiSuccess<T> {
  ok: true;
  data: T;
  /** true when `data` is placeholder data rather than a real backend result. */
  mock: boolean;
}

export interface ApiFailure {
  ok: false;
  error: { code: string; message: string };
}

export type ApiResponse<T> = ApiSuccess<T> | ApiFailure;

export interface HealthStatus {
  app: string;
  status: "ok";
  database: "configured" | "not-configured";
  timestamp: string;
}

export function success<T>(data: T, options: { mock?: boolean } = {}): ApiSuccess<T> {
  return { ok: true, data, mock: options.mock ?? false };
}

export function failure(code: string, message: string): ApiFailure {
  return { ok: false, error: { code, message } };
}
