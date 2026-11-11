import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { PageFrame, PlaceholderAction } from "@/components/PageFrame";
import { fullName, getUser, type AdminUser } from "./data";

export type UserPageProps = { params: Promise<{ userId: string }> };

/** Load the user for a per-user page, or 404 when the ID is unknown. */
export async function loadUser(params: UserPageProps["params"]): Promise<AdminUser> {
  const { userId } = await params;
  const user = await getUser(decodeURIComponent(userId));
  if (!user) notFound();
  return user;
}

/** PageFrame for /users/<userId>/<...path>, showing whose settings these are. */
export function UserFrame({
  user,
  path,
  heading,
  description,
  toolbar,
  children,
}: {
  user: AdminUser;
  path: string[];
  heading?: string;
  description?: ReactNode;
  toolbar?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <PageFrame
      path={["users", user.id, ...path]}
      subtitle={
        <>
          {fullName(user)} · {user.email}
        </>
      }
      heading={heading}
      description={description}
      toolbar={toolbar}
    >
      {children}
    </PageFrame>
  );
}

/** One side of an allowed/blocked pair: toolbar, header and an empty list. */
function ListPanel({ title, empty }: { title: string; empty: string }) {
  return (
    <section className="min-w-0 flex-1 rounded border border-gray-300">
      <div className="flex gap-2 border-b border-gray-200 p-2">
        <PlaceholderAction>+ Add</PlaceholderAction>
        <PlaceholderAction>Import</PlaceholderAction>
      </div>
      <h3 className="bg-gray-100 px-3 py-2 text-sm font-semibold">{title}</h3>
      <p className="px-3 py-6 text-center text-sm text-gray-600">{empty}</p>
    </section>
  );
}

/** Two lists side by side, e.g. Allowed / Blocked domains. */
export function ListPair({ left, right }: { left: { title: string; empty: string }; right: { title: string; empty: string } }) {
  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <ListPanel {...left} />
      <ListPanel {...right} />
    </div>
  );
}

/** Read-only label/value rows. `compact` suits narrow cards (equal columns instead of a wide label column). */
export function InfoRows({ rows, compact = false }: { rows: [string, ReactNode][]; compact?: boolean }) {
  return (
    <dl className="divide-y divide-gray-200">
      {rows.map(([label, value]) => (
        <div key={label} className={`grid py-2 text-sm ${compact ? "grid-cols-2 gap-2" : "gap-1 sm:grid-cols-[14rem_1fr] sm:gap-4"}`}>
          <dt className="text-gray-600">{label}</dt>
          <dd className="flex min-w-0 flex-wrap items-center gap-2 break-words">{value || "—"}</dd>
        </div>
      ))}
    </dl>
  );
}
