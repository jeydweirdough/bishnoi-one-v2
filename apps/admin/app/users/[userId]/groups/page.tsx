import type { Metadata } from "next";
import { ListTable, PlaceholderAction } from "@/components/PageFrame";
import { loadUser, UserFrame, type UserPageProps } from "@/users/UserPage";

export const metadata: Metadata = { title: "Groups" };

export default async function GroupsPage({ params }: UserPageProps) {
  const user = await loadUser(params);
  return (
    <UserFrame
      user={user}
      path={["groups"]}
      description="You can view the groups this user is a part of, or add them to organization groups from this section."
      toolbar={<><PlaceholderAction>+ Add</PlaceholderAction><PlaceholderAction>Filter</PlaceholderAction></>}
    >
      <ListTable caption="Groups" columns={["Group Name/Email address", "Role"]} rows={[]} emptyMessage="No groups added" />
    </UserFrame>
  );
}
