import type { Metadata } from "next";
import { MockDataNotice } from "@bishnoi/ui";
import { ListTable, PageFrame, PlaceholderAction } from "@/components/PageFrame";
import { getInboundGatewayIps } from "@/mail-settings/data";

export const metadata: Metadata = { title: "Inbound Gateway" };

const MASKS = Array.from({ length: 32 }, (_, index) => 32 - index);

export default async function InboundGatewayPage() {
  const ips = await getInboundGatewayIps();

  return (
    <PageFrame
      path={["mail-settings", "email-routing", "inbound-gateway"]}
      heading="Inbound Gateway IP Addresses"
      description="An inbound gateway is a server through which all incoming emails for your domain pass. It processes the emails, for example archiving them or filtering spam, and then passes them on to the server that delivers them to the recipients."
    >
      <MockDataNotice />
      <form className="max-w-2xl text-sm">
        <fieldset>
          <legend className="font-semibold">Choose IP version</legend>
          <div className="mt-2 flex gap-6">
            <label className="flex items-center gap-2">
              <input type="radio" name="ip-version" defaultChecked /> IPv4
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="ip-version" /> IPv6
            </label>
          </div>
        </fieldset>

        <div className="mt-4 flex flex-wrap items-end gap-2">
          <label className="flex min-w-0 flex-1 flex-col gap-1">
            <span className="text-xs text-gray-600">IP address</span>
            <input type="text" inputMode="decimal" placeholder="IP address" className="rounded border border-gray-400 px-2 py-1.5" />
          </label>
          <span className="pb-2" aria-hidden="true">
            /
          </span>
          <label className="flex flex-col gap-1">
            <span className="text-xs text-gray-600">Select IP mask</span>
            <select defaultValue="32" className="rounded border border-gray-400 px-2 py-1.5">
              {MASKS.map((mask) => (
                <option key={mask}>{mask}</option>
              ))}
            </select>
          </label>
          <PlaceholderAction>+ Add</PlaceholderAction>
        </div>

        <div className="mt-4">
          <ListTable caption="Inbound gateway IP addresses" columns={["IP Addresses"]} rows={ips.map((ip) => [ip])} emptyMessage="No IP addresses added" />
        </div>

        <div className="mt-4 flex flex-col gap-2">
          <label className="flex items-center gap-2">
            <input type="checkbox" disabled /> Reject non-inbound gateway emails
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" disabled /> Skip spam processing for all inbound gateway emails
          </label>
          <p className="text-xs text-gray-600">Settings are read-only until the backend is connected.</p>
        </div>
      </form>
    </PageFrame>
  );
}
