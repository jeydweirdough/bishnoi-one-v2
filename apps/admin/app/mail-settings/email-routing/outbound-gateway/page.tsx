import type { Metadata } from "next";
import type { ReactNode } from "react";
import { PageFrame } from "@/components/PageFrame";

export const metadata: Metadata = { title: "Outbound Gateway" };

function RadioGroup({ legend, name, options, defaultValue }: { legend: string; name: string; options: string[]; defaultValue: string }) {
  return (
    <fieldset className="mt-5">
      <legend className="font-semibold">{legend}</legend>
      <div className="mt-2 flex flex-wrap gap-x-6 gap-y-2">
        {options.map((option) => (
          <label key={option} className="flex items-center gap-2">
            <input type="radio" name={name} value={option} defaultChecked={option === defaultValue} /> {option}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="mt-5 flex flex-col gap-1">
      <span className="font-semibold">{label}</span>
      {children}
    </label>
  );
}

export default function OutboundGatewayPage() {
  return (
    <PageFrame
      path={["mail-settings", "email-routing", "outbound-gateway"]}
      heading="Outbound Gateway Configuration"
      description="An outbound gateway is a server through which all emails sent from your domain pass. It typically processes the email, for example archiving it or filtering spam, before delivering it to other servers."
    >
      <form className="max-w-2xl text-sm">
        <Field label="Destination Host (MX / IP Address) *">
          <input type="text" name="destination" required className="rounded border border-gray-400 px-2 py-1.5" />
        </Field>
        <RadioGroup legend="Connection type" name="connection" options={["Plain", "SSL", "TLS", "Plain support with TLS"]} defaultValue="Plain" />
        <Field label="Port *">
          <input type="number" name="port" defaultValue={25} min={1} max={65535} required className="w-32 rounded border border-gray-400 px-2 py-1.5" />
        </Field>
        <RadioGroup legend="Emails to be routed" name="routed" options={["All emails", "External emails only"]} defaultValue="All emails" />
        <RadioGroup legend="Authentication" name="authentication" options={["Yes", "No"]} defaultValue="No" />
        <RadioGroup legend="Apply for" name="apply-for" options={["All users", "For selected users", "Except selected users"]} defaultValue="All users" />

        <div className="mt-6 flex items-center gap-2">
          <button type="button" disabled className="rounded border border-gray-400 px-3 py-1.5 text-gray-500 disabled:cursor-not-allowed">
            Add<span className="sr-only"> (not available yet)</span>
          </button>
          <button type="reset" className="rounded border border-gray-400 px-3 py-1.5 hover:bg-gray-100">
            Reset
          </button>
          <span className="text-xs text-gray-600">Saving is not available until the backend is connected.</span>
        </div>
      </form>
    </PageFrame>
  );
}
