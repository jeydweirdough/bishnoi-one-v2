import type { Metadata } from "next";
import { MockDataNotice } from "@bishnoi/ui";
import { ListTable } from "@/components/PageFrame";
import { getRecentActivity } from "@/users/data";
import { loadUser, UserFrame, type UserPageProps } from "@/users/UserPage";

export const metadata: Metadata = { title: "Recent Activity" };

export default async function RecentActivityPage({ params }: UserPageProps) {
  const user = await loadUser(params);
  const activity = await getRecentActivity(user.id);

  return (
    <UserFrame
      user={user}
      path={["account-activity", "recent-activity"]}
      heading="Recent User Activity"
      description="The recent activity on this user account. Organization-wide activity will be available in Reports."
      toolbar={
        <label className="flex items-center gap-2 text-sm">
          <span className="text-gray-600">Show</span>
          <select disabled className="rounded border border-gray-400 px-2 py-1 disabled:bg-gray-100">
            <option>All</option>
          </select>
        </label>
      }
    >
      <MockDataNotice />
      <ListTable
        caption="Recent user activity"
        columns={["Type", "Event description", "Performed by", "Event time", "Client IP address"]}
        rows={activity.map((event) => [event.kind, event.description, event.performedBy, event.eventTime, event.clientIp])}
        emptyMessage="No recent activity"
      />
    </UserFrame>
  );
}
