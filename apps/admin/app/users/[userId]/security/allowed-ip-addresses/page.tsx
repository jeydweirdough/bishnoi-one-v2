import type { Metadata } from "next";
import { ListTable, PlaceholderAction } from "@/components/PageFrame";
import { loadUser, UserFrame, type UserPageProps } from "@/users/UserPage";

export const metadata: Metadata = { title: "Allowed IP Addresses" };

export default async function AllowedIpAddressesPage({ params }: UserPageProps) {
  const user = await loadUser(params);
  return (
    <UserFrame
      user={user}
      path={["security","allowed-ip-addresses"]}
      description="Restrict the IP address range from which this user can sign in to their organization account. The user can then sign in only from the configured range."
      toolbar={<PlaceholderAction>+ Add</PlaceholderAction>}
    >
      <ListTable caption="Allowed IP addresses" columns={["From IP Address", "To IP Address"]} rows={[]} emptyMessage="No allowed IP addresses have been added" />
    </UserFrame>
  );
}
