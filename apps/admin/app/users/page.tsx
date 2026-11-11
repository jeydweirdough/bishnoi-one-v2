import type { Metadata } from "next";
import Link from "next/link";
import { MockDataNotice } from "@bishnoi/ui";
import { ListTable, PageFrame, PlaceholderAction } from "@/components/PageFrame";
import { fullName, getUsers, initials } from "@/users/data";

export const metadata: Metadata = { title: "Users" };

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <PageFrame
      path={["users"]}
      description="This section lists the users that have been added to your organization account. Click a user's name to view detailed information about that user or to change user-specific settings."
      toolbar={
        <div className="flex w-full flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap gap-2">
            <PlaceholderAction>+ Add</PlaceholderAction>
            <PlaceholderAction>Invitees</PlaceholderAction>
            <PlaceholderAction>Import</PlaceholderAction>
            <PlaceholderAction>Export</PlaceholderAction>
            <PlaceholderAction>Roles</PlaceholderAction>
            <PlaceholderAction>Bulk Delete</PlaceholderAction>
            <PlaceholderAction>Filter</PlaceholderAction>
          </div>
          <span className="text-sm">
            Total users: <strong>{users.length}</strong>
          </span>
        </div>
      }
    >
      <MockDataNotice />
      <ListTable
        caption="Organization users"
        columns={["Name & Email", "Role", "Last Sign In", "Contact Number", "Location", "Status"]}
        rows={users.map((user) => [
          <Link key="name" href={`/users/${user.id}/personal-information`} className="flex items-center gap-3 hover:underline">
            <span aria-hidden="true" className="flex size-8 shrink-0 items-center justify-center rounded border border-gray-400 text-xs font-semibold">
              {initials(user)}
            </span>
            <span>
              <span className="block font-semibold">{fullName(user)}</span>
              <span className="block text-gray-600">{user.email}</span>
            </span>
          </Link>,
          user.role,
          user.lastSignIn,
          user.contactNumber || "—",
          user.location || "—",
          user.status,
        ])}
      />
    </PageFrame>
  );
}
