"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { crumbsFor } from "@/navigation/resolve";

/** Breadcrumb trail derived from the navigation config, so every page (built or Coming Soon) gets one. */
export function Breadcrumbs() {
  const crumbs = crumbsFor(usePathname());
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
