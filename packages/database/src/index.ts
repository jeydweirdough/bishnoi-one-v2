/**
 * Neon PostgreSQL access. SERVER-SIDE ONLY — never import from a client component.
 *
 * Apps run on mock data while DATABASE_URL is unset. No schema migrations exist yet;
 * adding one requires approval (see packages/database/migrations/README.md).
 */
import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

let client: NeonQueryFunction<false, false> | undefined;

export function isDatabaseConfigured(env: Record<string, string | undefined> = process.env): boolean {
  return Boolean(env.DATABASE_URL && env.DATABASE_URL.length > 0);
}

/** Lazily create the Neon SQL tagged-template client. Throws if DATABASE_URL is missing. */
export function getSql(): NeonQueryFunction<false, false> {
  if (!client) {
    const url = process.env.DATABASE_URL;
    if (!url) {
      throw new Error("DATABASE_URL is not set. Copy .env.example to .env.local and add a Neon connection string.");
    }
    client = neon(url);
  }
  return client;
}

/** Runs `select 1`; reports failures instead of throwing so health checks stay up. */
export async function checkDatabaseConnection(): Promise<{ configured: boolean; reachable: boolean; error?: string }> {
  if (!isDatabaseConfigured()) return { configured: false, reachable: false };
  try {
    await getSql()`select 1`;
    return { configured: true, reachable: true };
  } catch (error) {
    return { configured: true, reachable: false, error: error instanceof Error ? error.message : String(error) };
  }
}
