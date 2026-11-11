import type { Metadata } from "next";
import { fullName } from "@/users/data";
import { ListTable, PlaceholderAction } from "@/components/PageFrame";
import { loadUser, UserFrame, type UserPageProps } from "@/users/UserPage";

export const metadata: Metadata = { title: "Email Alias" };

export default async function EmailAliasPage({ params }: UserPageProps) {
  const user = await loadUser(params);
  return (
    <UserFrame
      user={user}
      path={["mailbox-settings","email-alias"]}
      description="Email aliases are additional addresses for the same mailbox. These alias addresses can be used to send or receive emails."
      toolbar={<PlaceholderAction>+ Add</PlaceholderAction>}
    >
      <ListTable
        caption="Alias addresses"
        columns={["Alias Addresses", "Type"]}
        rows={[
          [
            <span key="alias">
              <span className="block font-semibold">{fullName(user)}</span>
              <span className="block text-gray-600">{user.email}</span>
            </span>,
            "Mailbox address",
          ],
        ]}
      />
    </UserFrame>
  );
}
