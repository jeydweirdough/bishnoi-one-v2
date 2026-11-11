import Link from "next/link";
import type { Crumb, ResolvedRoute } from "@/navigation/resolve";

type PageRoute = Extract<ResolvedRoute, { kind: "page" }>;

export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1 text-sm text-gray-600">
        {crumbs.map((crumb, index) => {
          const last = index === crumbs.length - 1;
          return (
            <li key={`${crumb.label}-${index}`} className="flex items-center gap-1">
              {crumb.href && !last ? (
                <Link href={crumb.href} className="underline hover:text-gray-900">
                  {crumb.label}
                </Link>
              ) : (
                <span aria-current={last ? "page" : undefined} className={last ? "text-gray-900" : undefined}>
                  {crumb.label}
                </span>
              )}
              {last ? null : <span aria-hidden="true">›</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/** Standard placeholder for every Admin Panel destination until its module is built. */
export function ComingSoon({ route }: { route: PageRoute }) {
  return (
    <div className="mx-auto max-w-3xl">
      <Breadcrumbs crumbs={route.crumbs} />
      <h1 className="mt-2 text-xl font-semibold">{route.label}</h1>
      <section aria-label="Status" className="mt-6 rounded border border-dashed border-gray-400 p-8 text-center">
        <p className="text-lg font-semibold">Coming Soon</p>
        <p className="mt-2 text-sm text-gray-600">This page is part of the Admin Panel navigation. Its functionality has not been built yet.</p>
        {route.external ? <p className="mt-2 text-sm text-gray-600">In the reference, this item opens a separate tool.</p> : null}
        {route.userId ? (
          <p className="mt-2 text-sm text-gray-600">Per-user page for user ID “{route.userId}”. User data is not connected yet.</p>
        ) : null}
        {route.section.slug === "users" && !route.userId ? (
          <p className="mt-2 text-sm text-gray-600">
            Per-user settings live at <code>/users/&lt;userId&gt;/…</code>.{" "}
            <Link href="/users/example-user" className="underline">
              Preview that navigation with a placeholder ID
            </Link>
            .
          </p>
        ) : null}
      </section>
    </div>
  );
}
