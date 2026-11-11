import type { Metadata } from "next";
import { EmptyState, PlaceholderAction } from "@/components/PageFrame";
import { loadUser, UserFrame, type UserPageProps } from "@/users/UserPage";

export const metadata: Metadata = { title: "Outgoing Email Settings" };

export default async function OutgoingEmailSettingsPage({ params }: UserPageProps) {
  const user = await loadUser(params);
  return (
    <UserFrame
      user={user}
      path={["outgoing-email-settings"]}
    >
      <EmptyState title="Applicable Outgoing Rules" action={<PlaceholderAction>Create now</PlaceholderAction>}>
        The rules applicable to outgoing emails for this user are listed here.
      </EmptyState>
    </UserFrame>
  );
}
