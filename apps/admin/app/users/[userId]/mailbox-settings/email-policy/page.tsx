import type { Metadata } from "next";
import Link from "next/link";
import { loadUser, UserFrame, type UserPageProps } from "@/users/UserPage";

export const metadata: Metadata = { title: "Email Policy" };

export default async function EmailPolicyPage({ params }: UserPageProps) {
  const user = await loadUser(params);
  return (
    <UserFrame
      user={user}
      path={["mailbox-settings","email-policy"]}
      description="Email policies can be used for compliance purposes or to enforce restrictions as per the organization's guidelines."
    >
      <div className="flex max-w-xl flex-wrap items-end gap-2 text-sm">
        <label className="flex min-w-0 flex-1 flex-col gap-1">
          <span className="text-xs text-gray-600">Applied policy</span>
          <select disabled defaultValue="default" className="rounded border border-gray-400 px-2 py-1.5 disabled:bg-gray-100">
            <option value="default">Default Policy</option>
          </select>
        </label>
        <Link href="/mail-settings/email-policy/policies" className="rounded border border-gray-400 px-3 py-1.5 hover:bg-gray-100">
          Open policy
        </Link>
      </div>
      <p className="mt-2 text-xs text-gray-600">Changing a user's policy is not available until the backend is connected.</p>
    </UserFrame>
  );
}
