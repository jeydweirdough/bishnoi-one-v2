import { success, type HealthStatus } from "@bishnoi/contracts";
import { isDatabaseConfigured } from "@bishnoi/database";
import { APP_ID } from "@/app.config";

export const dynamic = "force-dynamic";

export function GET() {
  const health: HealthStatus = {
    app: APP_ID,
    status: "ok",
    database: isDatabaseConfigured() ? "configured" : "not-configured",
    timestamp: new Date().toISOString(),
  };
  return Response.json(success(health));
}
