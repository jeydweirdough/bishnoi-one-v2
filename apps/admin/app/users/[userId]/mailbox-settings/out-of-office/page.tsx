import type { Metadata } from "next";
import { PlaceholderAction } from "@/components/PageFrame";
import { loadUser, UserFrame, type UserPageProps } from "@/users/UserPage";

export const metadata: Metadata = { title: "Out of Office" };

export default async function OutOfOfficePage({ params }: UserPageProps) {
  const user = await loadUser(params);

  return (
    <UserFrame
      user={user}
      path={["mailbox-settings", "out-of-office"]}
      description="Out-of-office responses are automatic replies sent to email senders while the recipient is unavailable for a specific period."
    >
      <form className="max-w-2xl text-sm">
        <div className="flex flex-col gap-4 sm:flex-row">
          <label className="flex flex-1 flex-col gap-1">
            <span className="font-semibold">Send from *</span>
            <input type="date" required className="rounded border border-gray-400 px-2 py-1.5" />
          </label>
          <label className="flex flex-1 flex-col gap-1">
            <span className="font-semibold">Send till *</span>
            <input type="date" required className="rounded border border-gray-400 px-2 py-1.5" />
          </label>
        </div>

        <fieldset className="mt-5">
          <legend className="font-semibold">Auto-response interval</legend>
          <label className="mt-2 flex items-start gap-2">
            <input type="radio" name="interval" defaultChecked className="mt-1" /> Send one reply for the entire duration of the unavailability.
          </label>
          <label className="mt-1 flex items-start gap-2">
            <input type="radio" name="interval" className="mt-1" /> Reply to consecutive emails from the same sender, once every selected number of days.
          </label>
        </fieldset>

        <fieldset className="mt-5">
          <legend className="font-semibold">Auto-response message</legend>
          <label className="mt-2 flex items-center gap-2">
            <input type="checkbox" /> Set auto-response message for organization users
          </label>
          <label className="mt-1 flex items-center gap-2">
            <input type="checkbox" /> Set auto-response message for external users
          </label>
        </fieldset>

        <div className="mt-6 flex items-center gap-2">
          <PlaceholderAction>Add</PlaceholderAction>
          <span className="text-xs text-gray-600">Saving is not available until the backend is connected.</span>
        </div>
      </form>
    </UserFrame>
  );
}
