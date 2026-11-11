import type { Metadata } from "next";
import { ListPair } from "@/users/UserPage";
import { loadUser, UserFrame, type UserPageProps } from "@/users/UserPage";

export const metadata: Metadata = { title: "Domains" };

export default async function DomainsPage({ params }: UserPageProps) {
  const user = await loadUser(params);
  return (
    <UserFrame
      user={user}
      path={["incoming-email-settings","domains"]}
      heading={"Allowed/Blocked Domains"}
      description="Add domains to the blocked list to classify their emails as spam, or to the allowed list to deliver their emails to the Inbox. The organization-level lists take preference over user-level lists."
    >
      <ListPair
        left={{ title: "Allowed Domains", empty: "No domains have been added to the allowed list." }}
        right={{ title: "Blocked Domains", empty: "No domains have been added to the blocked list." }}
      />
    </UserFrame>
  );
}
