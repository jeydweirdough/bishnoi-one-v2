import type { Metadata } from "next";
import { ListTable, PlaceholderAction } from "@/components/PageFrame";
import { loadUser, UserFrame, type UserPageProps } from "@/users/UserPage";

export const metadata: Metadata = { title: "Signature" };

export default async function SignaturePage({ params }: UserPageProps) {
  const user = await loadUser(params);
  return (
    <UserFrame
      user={user}
      path={["mailbox-settings","signature"]}
      description="A signature is a block of text appended to the footer of emails. Multiple signatures can be configured, each used with one of the user's addresses (for email aliases)."
      toolbar={<PlaceholderAction>+ Add</PlaceholderAction>}
    >
      <ListTable caption="Signatures" columns={["Signature", "Used for"]} rows={[]} />
    </UserFrame>
  );
}
