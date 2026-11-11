import type { Metadata } from "next";
import { ListTable, PlaceholderAction } from "@/components/PageFrame";
import { loadUser, UserFrame, type UserPageProps } from "@/users/UserPage";

export const metadata: Metadata = { title: "Email Forwarding" };

export default async function EmailForwardingPage({ params }: UserPageProps) {
  const user = await loadUser(params);
  return (
    <UserFrame
      user={user}
      path={["mailbox-settings","email-forwarding"]}
      description="Email forwarding automatically forwards all incoming emails of this account to another chosen destination account."
    >
      <div className="mb-4 flex max-w-xl gap-2">
        <label className="flex min-w-0 flex-1 flex-col gap-1 text-sm">
          <span className="sr-only">Forwarding address</span>
          <input type="email" placeholder="Add email forwarding address" className="rounded border border-gray-400 px-2 py-1.5" />
        </label>
        <PlaceholderAction>+ Add</PlaceholderAction>
      </div>
      <ListTable caption="Forwarding addresses" columns={["Mail Forwarding Addresses"]} rows={[]} emptyMessage="No forwarding email addresses are added" />
    </UserFrame>
  );
}
