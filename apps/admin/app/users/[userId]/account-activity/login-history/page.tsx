import type { Metadata } from "next";
import { MockDataNotice } from "@bishnoi/ui";
import { ListTable } from "@/components/PageFrame";
import { getLoginHistory } from "@/users/data";
import { loadUser, UserFrame, type UserPageProps } from "@/users/UserPage";

export const metadata: Metadata = { title: "Login History" };

export default async function LoginHistoryPage({ params }: UserPageProps) {
  const user = await loadUser(params);
  const history = await getLoginHistory(user.id);

  return (
    <UserFrame user={user} path={["account-activity", "login-history"]} description="A record of this user's sign-ins for the last 90 days.">
      <MockDataNotice />
      <ListTable
        caption="Login history"
        columns={["Service Name", "Login Time", "Device Details", "IP Address", "Location", "Access type", "Session type"]}
        rows={history.map((entry) => [entry.service, entry.loginTime, entry.device, entry.ip, entry.location, entry.accessType, entry.sessionType])}
        emptyMessage="No sign-ins recorded"
      />
    </UserFrame>
  );
}
