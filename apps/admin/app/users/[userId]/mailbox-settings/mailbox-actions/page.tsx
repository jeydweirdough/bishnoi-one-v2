import type { Metadata } from "next";
import { PlaceholderAction } from "@/components/PageFrame";
import { loadUser, UserFrame, type UserPageProps } from "@/users/UserPage";

export const metadata: Metadata = { title: "Mailbox Actions" };

const SERVICES: { name: string; enabled: boolean }[] = [
  { name: "Incoming", enabled: true },
  { name: "Outgoing", enabled: true },
  { name: "Spam check", enabled: true },
  { name: "Quarantine check", enabled: true },
  { name: "POP access", enabled: true },
  { name: "IMAP access", enabled: false },
  { name: "ActiveSync", enabled: false },
];

export default async function MailboxActionsPage({ params }: UserPageProps) {
  const user = await loadUser(params);

  return (
    <UserFrame user={user} path={["mailbox-settings", "mailbox-actions"]} description="You can choose to enable or disable specific services for this user.">
      <ul className="flex max-w-2xl flex-col gap-2">
        {SERVICES.map((service) => (
          <li key={service.name} className="rounded border border-gray-300 bg-gray-50 px-4 py-3 text-sm">
            <label className="flex items-center justify-between gap-4">
              <span className="font-semibold uppercase">{service.name}</span>
              <span className="flex items-center gap-2">
                <span className="text-gray-600">{service.enabled ? "On" : "Off"}</span>
                <input type="checkbox" checked={service.enabled} disabled readOnly />
              </span>
            </label>
            {service.name === "POP access" ? (
              <fieldset className="mt-3 border-t border-gray-200 pt-3">
                <legend className="sr-only">Enable POP access for</legend>
                <p className="mb-2">Enable POP access for</p>
                <label className="flex items-center gap-2">
                  <input type="radio" name="pop-scope" defaultChecked /> All emails in the account
                </label>
                <label className="mt-1 flex items-center gap-2">
                  <input type="radio" name="pop-scope" /> Emails received after the selected date
                </label>
                <div className="mt-3">
                  <PlaceholderAction>Update</PlaceholderAction>
                </div>
              </fieldset>
            ) : null}
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs text-gray-600">Service switches are read-only until the backend is connected.</p>
    </UserFrame>
  );
}
