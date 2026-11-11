// Pure ownership/scope evaluation for a set of changed files. Used by scope-check.mjs and its tests.
import { classifyPath, isStructuralFile, matchesAny } from "./ownership.mjs";

/**
 * @param {object} input
 * @param {{status: string, path: string}[]} input.files
 * @param {string | null} input.author   developer id resolved from a VERIFIED GitHub login (null = unknown)
 * @param {boolean} input.privileged     author is a maintainer or an allowed bot
 * @param {object} input.ownership
 */
export function evaluateScope({ files, author, privileged, ownership }) {
  const errors = [];
  const structureErrors = [];
  const warnings = [];
  const notes = [];
  const affectedApps = new Set();
  const sharedPackages = new Set();
  let uiReviewRequired = false;

  const name = (id) => ownership.developers[id]?.name ?? id;

  if (!author && !privileged) {
    errors.push("PR author is not listed in .github/ownership.json, so ownership cannot be verified.");
  }

  for (const file of files) {
    const where = classifyPath(file.path, ownership);

    if (file.status === "D" && isStructuralFile(file.path)) {
      structureErrors.push(`\`${file.path}\` is deleted. Removing an application or package needs explicit maintainer approval.`);
    }

    if (matchesAny(file.path, ownership.protectedUiPaths) && author !== ownership.uiAuthority) {
      uiReviewRequired = true;
    }

    if (where.kind === "app") affectedApps.add(where.app);
    if (where.kind === "package") sharedPackages.add(where.pkg);

    // Unknown authors already produced one error above; per-file ownership adds nothing.
    if (privileged || !author) continue;

    switch (where.kind) {
      case "governance":
        errors.push(`\`${file.path}\` is a governance/root file. Only maintainers may change it.`);
        break;
      case "package": {
        const owners = ownership.packages[where.pkg]?.owners ?? [];
        if (!owners.includes(author)) {
          warnings.push(`\`${file.path}\` is in shared package \`${where.pkg}\`. Owner review is required (CODEOWNERS).`);
        }
        break;
      }
      case "app": {
        const app = ownership.apps[where.app];
        if (!app) {
          errors.push(`\`${file.path}\` is in unknown app folder \`apps/${where.app}\`. New apps must be added to ownership.json by a maintainer.`);
          break;
        }
        const uiAuthorityEdit =
          author === ownership.uiAuthority &&
          matchesAny(file.path, ownership.uiAuthorityPaths) &&
          !matchesAny(file.path, ownership.uiAuthorityExcludedPaths);

        if (app.owners.includes(author)) {
          const featureOwner = where.feature ? app.features[where.feature] : null;
          if (featureOwner && featureOwner !== author && !uiAuthorityEdit) {
            errors.push(`\`${file.path}\` belongs to feature \`${where.app}/${where.feature}\`, owned by ${name(featureOwner)}.`);
          } else if (!where.feature && app.lead !== author) {
            warnings.push(`\`${file.path}\` is an app-level file of \`${where.app}\` (lead: ${name(app.lead)}). Coordinate with the lead.`);
          }
        } else if (uiAuthorityEdit) {
          notes.push(`\`${file.path}\`: UI change by the UI authority.`);
        } else {
          errors.push(`\`${file.path}\` is in \`apps/${where.app}\`, which ${name(author)} does not own (owners: ${app.owners.map(name).join(", ")}).`);
        }
        break;
      }
      case "docs":
        break;
      default:
        warnings.push(`\`${file.path}\` is outside apps/, packages/ and docs/. Make sure this change is intended.`);
    }
  }

  if (affectedApps.size > 1) {
    warnings.push(`Cross-application change touching ${[...affectedApps].join(", ")}: every affected app owner must approve.`);
  }

  return { errors, structureErrors, warnings, notes, affectedApps: [...affectedApps], sharedPackages: [...sharedPackages], uiReviewRequired };
}
