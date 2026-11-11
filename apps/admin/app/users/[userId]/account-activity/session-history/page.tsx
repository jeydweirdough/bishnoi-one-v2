import type { Metadata } from "next";
import { ListTable, PlaceholderAction } from "@/components/PageFrame";
import { loadUser, UserFrame, type UserPageProps } from "@/users/UserPage";

export const metadata: Metadata = { title: "Session History" };

export default async function SessionHistoryPage({ params }: UserPageProps) {
  const user = await loadUser(params);
  return (
    <UserFrame
      user={user}
      path={["account-activity","session-history"]}
      description="A record of this user's sessions for the last 30 days."
      toolbar={<PlaceholderAction>Close all</PlaceholderAction>}
    >
      <ListTable caption="Session history" columns={["IP Address", "Session Start Time"]} rows={[]} emptyMessage="No sessions found" />
    </UserFrame>
  );
}
