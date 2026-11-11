import type { Metadata } from "next";
import { fullName } from "@/users/data";
import { ListTable, PlaceholderAction } from "@/components/PageFrame";
import { loadUser, UserFrame, type UserPageProps } from "@/users/UserPage";

export const metadata: Metadata = { title: "Delegated to" };

export default async function DelegatedToPage({ params }: UserPageProps) {
  const user = await loadUser(params);
  return (
    <UserFrame
      user={user}
      path={["mailbox-settings","delegated-to"]}
      heading={`${fullName(user)}'s Mailbox delegated to`}
      description="The organization accounts this user's mailbox has been delegated to. Delegating grants complete access to the mailbox, with one of four permissions: Read, Write, Send on Behalf, or Send As."
      toolbar={<><PlaceholderAction>+ Add</PlaceholderAction><PlaceholderAction>Filter</PlaceholderAction></>}
    >
      <ListTable
        caption="Mailbox delegates"
        columns={["Username/Email Address", "Delegated By", "Permissions", "Email Delegation", "Delegated Email Address", "Status"]}
        rows={[]}
        emptyMessage="No delegates"
      />
    </UserFrame>
  );
}
