import type { Origin } from "@/navigation/config";
import type { PageEntry } from "@/navigation/resolve";

const ORIGIN_TEXT: Record<Origin, string> = {
  verified: "Verified — named on an official Zoho Recruit page",
  inferred: "Inferred — common ATS pattern, not confirmed against Zoho Recruit",
  extension: "Bishnoi One extension — not part of Zoho Recruit",
};

const FEATURE_OWNERS: Record<string, string> = { "job-openings": "Aaron", candidates: "Aaron", interviews: "Jade", offers: "Jade" };

/** Standard placeholder for every registered Recruit page until its module is built. */
export function ComingSoon({ page }: { page: PageEntry }) {
  const owner = page.mod.feature ? FEATURE_OWNERS[page.mod.feature] : undefined;
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-xl font-semibold">{page.leaf.label}</h1>
      <section aria-label="Status" className="mt-6 rounded border border-dashed border-gray-400 p-8 text-center">
        <p className="text-lg font-semibold">Coming Soon</p>
        <p className="mt-2 text-sm text-gray-600">This page is part of the Recruit navigation. Its functionality has not been built yet.</p>
      </section>
      <dl className="mt-6 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
        <dt className="text-gray-600">Module</dt>
        <dd>{[page.mod.label, page.group?.label].filter(Boolean).join(" › ")}</dd>
        <dt className="text-gray-600">Reference</dt>
        <dd>{ORIGIN_TEXT[page.leaf.origin]}</dd>
        <dt className="text-gray-600">Owner</dt>
        <dd>{owner ?? "Unassigned (app lead: Aaron)"}</dd>
        {page.mod.edition === "staffing" ? (
          <>
            <dt className="text-gray-600">Edition</dt>
            <dd>Staffing agency feature — optional for internal HR</dd>
          </>
        ) : null}
      </dl>
    </div>
  );
}
