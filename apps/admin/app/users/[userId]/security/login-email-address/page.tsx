import type { Metadata } from "next";
import { ListTable, PlaceholderAction } from "@/components/PageFrame";
import { loadUser, UserFrame, type UserPageProps } from "@/users/UserPage";

export const metadata: Metadata = { title: "Login Email Address" };

export default async function LoginEmailAddressPage({ params }: UserPageProps) {
  const user = await loadUser(params);
  return (
    <UserFrame
      user={user}
      path={["security","login-email-address"]}
      description="Users can sign in to their mail account using any other email address that they own. Add login email addresses here."
      toolbar={<PlaceholderAction>+ Add</PlaceholderAction>}
    >
      <ListTable
        caption="Login email addresses"
        columns={["Email Address"]}
        rows={[
          [
            <span key="email">
              {user.email} <span className="ml-2 rounded border border-gray-400 px-1.5 py-0.5 text-xs">Primary</span>
            </span>,
          ],
        ]}
      />
    </UserFrame>
  );
}
