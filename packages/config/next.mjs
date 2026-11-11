/**
 * Shared Next.js config factory. Every app calls createNextConfig() so that
 * build behaviour stays identical across the 13 applications.
 */

/** Workspace packages shipped as TypeScript source and compiled by each app. */
export const WORKSPACE_PACKAGES = [
  "@bishnoi/ui",
  "@bishnoi/auth",
  "@bishnoi/permissions",
  "@bishnoi/database",
  "@bishnoi/api-client",
  "@bishnoi/contracts",
];

/**
 * @param {import("next").NextConfig} [overrides]
 * @returns {import("next").NextConfig}
 */
export function createNextConfig(overrides = {}) {
  return {
    reactStrictMode: true,
    poweredByHeader: false,
    transpilePackages: WORKSPACE_PACKAGES,
    // Docker/Coolify images set NEXT_OUTPUT=standalone; Vercel and local builds use the default.
    ...(process.env.NEXT_OUTPUT === "standalone" ? { output: "standalone" } : {}),
    ...overrides,
  };
}
