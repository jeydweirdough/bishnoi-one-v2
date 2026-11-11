import type { ReactNode } from "react";
import { resolveRoute } from "@/navigation/resolve";
import { Breadcrumbs } from "./ComingSoon";

/**
 * Standard frame for a built Admin Panel page: breadcrumb, heading, description, toolbar, content.
 * `path` must exist in src/navigation/config.ts, so titles and breadcrumbs stay in sync with the sidebar.
 */
export function PageFrame({
  path,
  heading,
  description,
  toolbar,
  children,
}: {
  path: string[];
  /** Page heading when it differs from the sidebar label. */
  heading?: string;
  description?: ReactNode;
  toolbar?: ReactNode;
  children?: ReactNode;
}) {
  const route = resolveRoute(path);
  if (route?.kind !== "page") throw new Error(`"/${path.join("/")}" is not a page in src/navigation/config.ts`);

  return (
    <div className="mx-auto max-w-5xl">
      <Breadcrumbs crumbs={route.crumbs} />
      <h1 className="mt-2 text-xl font-semibold">{heading ?? route.label}</h1>
      {description ? <p className="mt-1 text-sm text-gray-600">{description}</p> : null}
      {toolbar ? <div className="mt-4 flex flex-wrap items-center gap-2">{toolbar}</div> : null}
      <div className="mt-6">{children}</div>
    </div>
  );
}

/** A visible action whose backend does not exist yet. */
export function PlaceholderAction({ children }: { children: ReactNode }) {
  return (
    <button
      type="button"
      disabled
      title="Not available yet"
      className="rounded border border-gray-300 px-3 py-1.5 text-sm text-gray-500 disabled:cursor-not-allowed"
    >
      {children}
      <span className="sr-only"> (not available yet)</span>
    </button>
  );
}

/** Centered empty state used by pages that have nothing configured yet. */
export function EmptyState({ title, children, action }: { title: string; children: ReactNode; action?: ReactNode }) {
  return (
    <section className="rounded border border-dashed border-gray-400 p-8 text-center">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="mx-auto mt-2 max-w-xl text-sm text-gray-600">{children}</p>
      {action ? <div className="mt-4">{action}</div> : null}
    </section>
  );
}

/** Plain table with an empty-state row, for list pages. */
export function ListTable({
  caption,
  columns,
  rows,
  emptyMessage = "No records found",
}: {
  caption: string;
  columns: string[];
  rows: ReactNode[][];
  emptyMessage?: string;
}) {
  return (
    <div className="overflow-x-auto rounded border border-gray-300">
      <table className="w-full text-left text-sm">
        <caption className="sr-only">{caption}</caption>
        <thead className="bg-gray-100">
          <tr>
            {columns.map((column) => (
              <th key={column} scope="col" className="px-3 py-2 font-semibold whitespace-nowrap">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-3 py-6 text-center text-gray-600">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            rows.map((cells, index) => (
              <tr key={index} className="border-t border-gray-200">
                {cells.map((cell, cellIndex) => (
                  <td key={cellIndex} className="px-3 py-2 whitespace-nowrap">
                    {cell}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
