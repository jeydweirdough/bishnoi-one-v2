import type { Metadata } from "next";
import { PageFrame } from "@/components/PageFrame";
import { getSubscriptionSettings } from "@/subscription/data";

export const metadata: Metadata = { title: "Subscription Settings" };

function SettingRow({ label, description, enabled }: { label: string; description: string; enabled: boolean }) {
  return (
    <div className="flex items-start justify-between gap-4 py-4">
      <div>
        <p className="font-semibold">{label}</p>
        <p className="mt-1 text-sm text-gray-600">{description}</p>
      </div>
      <label className="flex shrink-0 items-center gap-2 text-sm">
        <span className="text-gray-600">{enabled ? "On" : "Off"}</span>
        <input type="checkbox" checked={enabled} disabled readOnly aria-label={label} />
      </label>
    </div>
  );
}

export default async function SubscriptionSettingsPage() {
  const settings = await getSubscriptionSettings();

  return (
    <PageFrame path={["subscription", "settings"]}>
      <div className="max-w-2xl divide-y divide-gray-200">
        <SettingRow
          label="Auto allocation"
          description="When enabled, unused add-on storage is distributed automatically to users whose storage nears the maximum limit."
          enabled={settings.autoAllocation}
        />
        <SettingRow
          label="Allow administrators to modify subscription"
          description="As a super administrator, you can allow or restrict administrators from managing the subscription."
          enabled={settings.adminsCanModify}
        />
      </div>
      <p className="mt-2 text-xs text-gray-600">Settings are read-only until billing is connected.</p>
    </PageFrame>
  );
}
