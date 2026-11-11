import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/PageFrame";

export const metadata: Metadata = { title: "Delete Organization" };

const PREREQUISITES = [
  { href: "/users", action: "Delete all your users", rest: "(except yourself) before deleting the organization account." },
  { href: "/domains", action: "Delete domain(s)", rest: "before deleting the organization account." },
  { href: "/subscription/overview", action: "Cancel your subscription", rest: "before deleting the organization account." },
];

export default function DeleteOrganizationPage() {
  return (
    <PageFrame path={["organization", "delete-organization"]} heading="Delete Organization Account">
      <div className="max-w-3xl">
        <section aria-labelledby="delete-note" className="rounded border border-gray-400 bg-gray-50 p-4 text-sm">
          <h2 id="delete-note" className="font-semibold">
            Note:
          </h2>
          <p className="mt-1">
            Deleting your organization account will permanently delete or disassociate all user accounts and associated data. Ensure that
            you have taken a backup of all the data before you begin deleting the organization account. The data cannot be recovered once
            the account is deleted.
          </p>
        </section>

        <section aria-labelledby="delete-prerequisites" className="mt-4 rounded border border-gray-400 p-4 text-sm">
          <h2 id="delete-prerequisites" className="sr-only">
            Required before deleting
          </h2>
          <ul className="flex flex-col gap-3">
            {PREREQUISITES.map((item) => (
              <li key={item.href} className="flex gap-2">
                <span aria-hidden="true" className="flex size-5 shrink-0 items-center justify-center rounded-full border border-gray-700 text-xs font-bold">
                  !
                </span>
                <span>
                  <Link href={item.href} className="underline">
                    {item.action}
                  </Link>{" "}
                  {item.rest}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-6 flex flex-col items-center gap-2">
          <button type="button" disabled className="rounded border border-gray-400 px-4 py-2 text-sm text-gray-500 disabled:cursor-not-allowed">
            Delete
          </button>
          <p className="text-xs text-gray-600">Disabled — complete the steps above. Deleting an organization is not available in this version.</p>
        </div>
      </div>
    </PageFrame>
  );
}
