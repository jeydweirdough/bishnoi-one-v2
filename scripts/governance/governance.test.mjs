import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { buildCodeowners } from "./lib/codeowners.mjs";
import { checkBranchName, checkPrChecklist, checkPrTitle } from "./lib/naming.mjs";
import { classifyPath, developerForLogin, globToRegExp, loadOwnership } from "./lib/ownership.mjs";
import { evaluateScope } from "./lib/scope.mjs";
import { lintSource } from "./lib/ui-fidelity.mjs";

const ownership = loadOwnership();
const withHandles = structuredClone(ownership);
for (const [id, dev] of Object.entries(withHandles.developers)) dev.github = `${id}-gh`;
withHandles.maintainers = ["maint-gh"];
const withoutHandles = structuredClone(ownership);
for (const dev of Object.values(withoutHandles.developers)) dev.github = null;
withoutHandles.maintainers = [];

const files = (...paths) => paths.map((path) => ({ status: "M", path }));

describe("branch names", () => {
  it("accepts <person>/<type>/<app>-<description>", () => {
    for (const name of ["aaron/feat/inventory-stock-adjustment", "zild/fix/books-invoice-rounding", "linus/ui/shared-data-table", "jade/chore/ci-cache", "dependabot/npm_and_yarn/next-16.5.0"]) {
      assert.equal(checkBranchName(name, ownership).ok, true, name);
    }
    assert.deepEqual(checkBranchName("aaron/feat/inventory-stock-adjustment", ownership), {
      ok: true,
      type: "feat",
      scope: "inventory",
      description: "stock-adjustment",
      person: "aaron",
    });
  });

  it("still accepts the old <type>/<app>-<description> form, marked legacy", () => {
    for (const name of ["feat/inventory-stock-adjustment", "fix/crm-lead-dedupe", "ui/shared-button", "chore/ci-cache"]) {
      const result = checkBranchName(name, ownership);
      assert.equal(result.ok, true, name);
      assert.equal(result.legacy, true, name);
    }
  });

  it("picks the longest matching scope", () => {
    assert.equal(checkBranchName("aryan/fix/api-client-timeout", ownership).scope, "api-client");
  });

  it("rejects bad names", () => {
    for (const name of [
      "main-fix",
      "feature/inventory-x",
      "feat/inventory",
      "feat/unknownapp-thing",
      "feat/Inventory-Stock",
      "ui/auth-login",
      "bob/feat/inventory-x",
      "aaron/feature/inventory-x",
      "aaron/feat/inventory",
      "Aaron/feat/inventory-x",
      "aaron/inventory-x",
    ]) {
      assert.equal(checkBranchName(name, ownership).ok, false, name);
    }
  });
});

describe("PR titles and checklist", () => {
  it("validates Conventional Commit titles", () => {
    assert.equal(checkPrTitle("feat(inventory): add stock adjustment", ownership).ok, true);
    assert.equal(checkPrTitle("feat(api-client)!: change response envelope", ownership).ok, true);
    assert.equal(checkPrTitle("Add stock adjustment", ownership).ok, false);
    assert.equal(checkPrTitle("feat(zoho): x thing", ownership).ok, false);
    assert.equal(checkPrTitle("feat(crm): add leads.", ownership).ok, false);
  });

  it("requires every required box and one UI box", () => {
    const body = "## Summary\nx\n## Required checklist\n- [x] a\n- [X] b\n## UI policy\n- [ ] none\n- [x] low fi\n## Notes";
    assert.deepEqual(checkPrChecklist(body), { ok: true, errors: [] });
    assert.equal(checkPrChecklist(body.replace("- [X] b", "- [ ] b")).ok, false);
    assert.equal(checkPrChecklist(body.replace("- [x] low fi", "- [ ] low fi")).ok, false);
    assert.equal(checkPrChecklist("").ok, false);
  });
});

describe("path classification", () => {
  it("finds apps, features, packages and governance files", () => {
    assert.deepEqual(classifyPath("apps/books/src/features/ledger/index.ts", ownership), { kind: "app", app: "books", feature: "ledger" });
    assert.deepEqual(classifyPath("apps/books/app/api/invoices/route.ts", ownership), { kind: "app", app: "books", feature: "invoices" });
    assert.deepEqual(classifyPath("apps/books/app/ledger/page.tsx", ownership), { kind: "app", app: "books", feature: "ledger" });
    assert.deepEqual(classifyPath("apps/books/app/page.tsx", ownership), { kind: "app", app: "books", feature: null });
    assert.deepEqual(classifyPath("apps/books/app/api/health/route.ts", ownership), { kind: "app", app: "books", feature: null });
    assert.deepEqual(classifyPath("packages/ui/src/index.ts", ownership), { kind: "package", pkg: "ui" });
    assert.deepEqual(classifyPath(".github/workflows/ci.yml", ownership), { kind: "governance" });
    assert.deepEqual(classifyPath("package-lock.json", ownership), { kind: "other" });
  });

  it("matches globs", () => {
    assert.equal(globToRegExp("apps/*/app/layout.tsx").test("apps/crm/app/layout.tsx"), true);
    assert.equal(globToRegExp("apps/*/app/layout.tsx").test("apps/crm/app/x/layout.tsx"), false);
    assert.equal(globToRegExp("packages/ui/**").test("packages/ui/src/a/b.tsx"), true);
  });

  it("maps only configured handles to developers", () => {
    assert.equal(developerForLogin("aaron", withoutHandles), null);
    assert.equal(developerForLogin("AARON-GH", withHandles), "aaron");
  });
});

describe("scope evaluation", () => {
  const run = (author, paths, extra = {}) => evaluateScope({ files: files(...paths), author, privileged: false, ownership: withHandles, ...extra });

  it("allows owners to change their own feature", () => {
    const result = run("aaron", ["apps/inventory/src/features/items/index.ts"]);
    assert.deepEqual(result.errors, []);
  });

  it("rejects changes to another developer's app", () => {
    assert.equal(run("aaron", ["apps/crm/src/features/leads/index.ts"]).errors.length, 1);
  });

  it("rejects changes to a co-owner's feature in a shared app", () => {
    const result = run("aaron", ["apps/books/src/features/ledger/mock-data.ts"]);
    assert.match(result.errors[0], /owned by Zild/);
  });

  it("warns (not fails) for app-level files edited by a non-lead owner", () => {
    const result = run("aaron", ["apps/books/app/page.tsx"]);
    assert.deepEqual(result.errors, []);
    assert.equal(result.warnings.length, 1);
  });

  it("lets Linus change UI files in any app but not API routes", () => {
    assert.deepEqual(run("linus", ["apps/crm/app/leads/page.tsx"]).errors, []);
    assert.equal(run("linus", ["apps/crm/app/api/leads/route.ts"]).errors.length, 1);
  });

  it("requires Linus review for protected UI paths", () => {
    assert.equal(run("aaron", ["apps/inventory/app/layout.tsx"]).uiReviewRequired, true);
    assert.equal(run("linus", ["packages/ui/src/index.ts"]).uiReviewRequired, false);
  });

  it("blocks governance edits by non-maintainers and flags shared packages", () => {
    assert.equal(run("jade", [".github/workflows/ci.yml"]).errors.length, 1);
    const pkg = run("aaron", ["packages/contracts/src/apps.ts"]);
    assert.deepEqual(pkg.errors, []);
    assert.deepEqual(pkg.sharedPackages, ["contracts"]);
  });

  it("detects application deletion even for maintainers", () => {
    const result = evaluateScope({ files: [{ status: "D", path: "apps/payroll/package.json" }], author: null, privileged: true, ownership: withHandles });
    assert.equal(result.structureErrors.length, 1);
  });

  it("fails unknown authors", () => {
    assert.equal(run(null, ["docs/TEAM.md"]).errors.length, 1);
  });

  it("warns about cross-application changes", () => {
    const result = run("jade", ["apps/people/src/features/employees/index.ts", "apps/admin/src/features/users/index.ts"]);
    assert.deepEqual(result.errors, []);
    assert.ok(result.warnings.some((warning) => warning.includes("Cross-application")));
  });
});

describe("UI fidelity heuristic", () => {
  it("flags colors, gradients, animation and UI kits", () => {
    const source = [
      '<div className="bg-blue-500" />',
      '<div className="bg-gradient-to-r from-gray-100" />',
      '<div className="animate-spin" />',
      'import { motion } from "framer-motion";',
      '<div className="backdrop-blur-md" />',
    ].join("\n");
    const rules = lintSource("apps/crm/app/page.tsx", source).map((finding) => finding.rule);
    assert.deepEqual(rules, ["color-utility", "gradient", "animation", "ui-library", "glass"]);
  });

  it("accepts grayscale utilities", () => {
    assert.deepEqual(lintSource("apps/crm/app/page.tsx", '<div className="bg-gray-100 text-gray-900 border-gray-300" />'), []);
  });

  it("flags hex colors only in CSS", () => {
    assert.equal(lintSource("apps/crm/app/globals.css", "a { color: #ff0000; }").length, 1);
    assert.equal(lintSource("apps/crm/app/page.tsx", 'href="#main"').length, 0);
  });
});

describe("CODEOWNERS", () => {
  it("comments out lines without verified handles", () => {
    assert.match(buildCodeowners(withoutHandles), /^# \/apps\/crm\/ <Aryan> <Jade> — no verified GitHub handles yet$/m);
  });

  it("uses handles once configured and keeps governance last", () => {
    const text = buildCodeowners(withHandles);
    assert.match(text, /^\/apps\/crm\/ @aryan-gh @jade-gh$/m);
    assert.match(text, /^\/packages\/ui\/ @linus-gh @jade-gh$/m);
    assert.match(text, /^\/packages\/database\/ @maint-gh$/m);
    assert.ok(text.trimEnd().endsWith("/.vscode/ @maint-gh"));
  });
});
