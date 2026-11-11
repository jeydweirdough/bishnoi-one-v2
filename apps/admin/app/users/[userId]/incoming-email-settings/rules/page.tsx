import type { Metadata } from "next";
import { EmptyState, PlaceholderAction } from "@/components/PageFrame";
import { loadUser, UserFrame, type UserPageProps } from "@/users/UserPage";

export const metadata: Metadata = { title: "Incoming Rules" };

export default async function RulesPage({ params }: UserPageProps) {
  const user = await loadUser(params);
  return (
    <UserFrame
      user={user}
      path={["incoming-email-settings","rules"]}
    >
      <EmptyState title="Applicable Incoming Rules" action={<PlaceholderAction>Create now</PlaceholderAction>}>
        The rules applicable to incoming emails for this user are listed here.
      </EmptyState>
    </UserFrame>
  );
}
