import type { Metadata } from "next";
import { PlaceholderAction } from "@/components/PageFrame";
import { loadUser, UserFrame, type UserPageProps } from "@/users/UserPage";

export const metadata: Metadata = { title: "Change password" };

export default async function ChangePasswordPage({ params }: UserPageProps) {
  const user = await loadUser(params);

  return (
    <UserFrame
      user={user}
      path={["security", "change-password"]}
      description="You can change the user's password if they have forgotten the password for their account."
    >
      <p role="note" className="mb-4 rounded border border-gray-300 bg-gray-50 px-3 py-2 text-sm">
        The password for this user account was last changed on <strong>{user.lastPasswordReset}</strong>.
      </p>
      <form className="max-w-md text-sm">
        <label className="flex flex-col gap-1">
          <span className="font-semibold">New password *</span>
          <input type="password" autoComplete="new-password" required className="rounded border border-gray-400 px-2 py-1.5" />
        </label>
        <div className="mt-2">
          <PlaceholderAction>Auto-generate</PlaceholderAction>
        </div>
        <div className="mt-4 flex flex-col gap-2">
          <label className="flex items-center gap-2">
            <input type="checkbox" /> Send credentials via email
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" defaultChecked /> Force user to change password on first sign-in
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" defaultChecked /> Sign out from all devices (recommended)
          </label>
        </div>
        <div className="mt-5 flex items-center gap-2">
          <PlaceholderAction>Change</PlaceholderAction>
          <span className="text-xs text-gray-600">Not available until the backend is connected.</span>
        </div>
      </form>
    </UserFrame>
  );
}
