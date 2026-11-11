import type { Metadata } from "next";
import { ListPair } from "@/users/UserPage";
import { loadUser, UserFrame, type UserPageProps } from "@/users/UserPage";

export const metadata: Metadata = { title: "Email Addresses" };

export default async function EmailAddressesPage({ params }: UserPageProps) {
  const user = await loadUser(params);
  return (
    <UserFrame
      user={user}
      path={["incoming-email-settings","email-addresses"]}
      heading={"Allowed/Blocked Email Addresses"}
      description="Add email addresses to the blocked list to classify their emails as spam, or to the allowed list to deliver their emails to the Inbox. The organization-level lists take preference over user-level lists."
    >
      <ListPair
        left={{ title: "Allowed Email Addresses", empty: "No email addresses have been added to the allowed list." }}
        right={{ title: "Blocked Email Addresses", empty: "No email addresses have been added to the blocked list." }}
      />
      <h2 className="mt-8 mb-3 font-semibold">Trusted / Rejected List</h2>
      <ListPair
        left={{ title: "Trusted Email Addresses", empty: "No email addresses have been added to the trusted list." }}
        right={{ title: "Rejected Email Addresses", empty: "No email addresses have been added to the rejected list." }}
      />
    </UserFrame>
  );
}
