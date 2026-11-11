import js from "@eslint/js";
import nextPlugin from "@next/eslint-plugin-next";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
import tseslint from "typescript-eslint";

const ignores = {
  ignores: ["**/node_modules/**", "**/.next/**", "**/dist/**", "**/.turbo/**", "**/next-env.d.ts"],
};

/** Base rules for TypeScript libraries and scripts. */
export const baseConfig = tseslint.config(ignores, js.configs.recommended, ...tseslint.configs.recommended, {
  languageOptions: {
    globals: { ...globals.node },
  },
  rules: {
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
    "@typescript-eslint/consistent-type-imports": "error",
    "no-console": ["warn", { allow: ["warn", "error"] }],
  },
});

/** React library rules (packages/ui). */
export const reactLibraryConfig = tseslint.config(...baseConfig, {
  files: ["**/*.tsx"],
  languageOptions: { globals: { ...globals.browser } },
  plugins: { "react-hooks": reactHooks },
  rules: {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
  },
});

/** Next.js application rules (apps/*). */
export const nextConfig = tseslint.config(...reactLibraryConfig, {
  plugins: { "@next/next": nextPlugin },
  rules: {
    ...nextPlugin.configs.recommended.rules,
    ...nextPlugin.configs["core-web-vitals"].rules,
  },
});

export default baseConfig;
