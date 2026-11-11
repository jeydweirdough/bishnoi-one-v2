import type { ReactNode } from "react";
import { MockDataNotice } from "@bishnoi/ui";
import { EmptyState, ListTable, PageFrame, PlaceholderAction } from "@/components/PageFrame";
import { resolveRoute } from "@/navigation/resolve";
import { SAMPLE_ROWS } from "./data";
import { SECURITY_PAGES, type Control, type PageSpec } from "./specs";

const READ_ONLY_NOTE = "Settings are read-only until the backend is connected.";

/** Tabs from the reference. The first is the current view; the others are listed but not built yet. */
function Tabs({ tabs }: { tabs: string[] }) {
  return (
    <div className="mb-4 flex flex-wrap gap-1 border-b border-gray-300" role="list" aria-label="Views">
      {tabs.map((tab, index) => (
        <span
          key={tab}
          role="listitem"
          aria-current={index === 0 ? "page" : undefined}
          title={index === 0 ? undefined : "Not available yet"}
          className={`-mb-px border-b-2 px-3 py-2 text-sm ${index === 0 ? "border-gray-900 font-semibold" : "border-transparent text-gray-500"}`}
        >
          {tab}
        </span>
      ))}
    </div>
  );
}

function Toggle({ label, on }: { label: string; on: boolean }) {
  return (
    <label className="flex items-center justify-between gap-4 py-2 text-sm">
      <span>{label}</span>
      <span className="flex items-center gap-2">
        <span className="text-gray-600">{on ? "On" : "Off"}</span>
        <input type="checkbox" checked={on} disabled readOnly />
      </span>
    </label>
  );
}

function ControlView({ control }: { control: Control }) {
  switch (control.type) {
    case "toggle":
      return <Toggle label={control.label} on={control.on} />;
    case "radio":
      return (
        <fieldset className="py-2 text-sm">
          <legend className="font-semibold">{control.legend}</legend>
          <div className="mt-2 flex flex-wrap gap-x-6 gap-y-2">
            {control.options.map((option) => (
              <label key={option} className="flex items-center gap-2">
                <input type="radio" name={control.legend} checked={option === control.selected} disabled readOnly /> {option}
              </label>
            ))}
          </div>
        </fieldset>
      );
    case "checkboxes":
      return (
        <div className="flex flex-col gap-2 py-2 text-sm">
          {control.items.map((item) => (
            <label key={item.label} className="flex items-center gap-2">
              <input type="checkbox" checked={item.checked} disabled readOnly /> {item.label}
            </label>
          ))}
        </div>
      );
    case "select":
      return (
        <label className="flex max-w-md flex-col gap-1 py-2 text-sm">
          <span className="font-semibold">{control.label}</span>
          <select disabled className="rounded border border-gray-400 px-2 py-1.5 disabled:bg-gray-100">
            <option>{control.value}</option>
          </select>
        </label>
      );
    case "number":
      return (
        <label className="flex max-w-md flex-col gap-1 py-2 text-sm">
          <span className="font-semibold">{control.label} *</span>
          <input type="number" defaultValue={control.value} disabled className="w-32 rounded border border-gray-400 px-2 py-1.5 disabled:bg-gray-100" />
        </label>
      );
    case "text":
      return (
        <label className="flex max-w-xl flex-col gap-1 py-2 text-sm">
          <span className="font-semibold">{control.label}</span>
          {control.multiline ? (
            <textarea rows={3} placeholder={control.placeholder} disabled className="rounded border border-gray-400 px-2 py-1.5 disabled:bg-gray-100" />
          ) : (
            <input type="text" placeholder={control.placeholder} disabled className="rounded border border-gray-400 px-2 py-1.5 disabled:bg-gray-100" />
          )}
        </label>
      );
  }
}

function Body({ spec }: { spec: PageSpec }): ReactNode {
  if (spec.kind === "empty") {
    return <EmptyState title={spec.title} action={<PlaceholderAction>{spec.action}</PlaceholderAction>}>{spec.description}</EmptyState>;
  }

  const tabs = spec.tabs ? <Tabs tabs={spec.tabs} /> : null;

  if (spec.kind === "list") {
    const rows = spec.rows ? SAMPLE_ROWS[spec.rows].map((row) => [...row]) : [];
    return (
      <>
        {tabs}
        {spec.rows ? <MockDataNotice /> : null}
        {spec.select ? <ControlView control={{ type: "select", label: spec.select.label, value: spec.select.value }} /> : null}
        <div className="mb-4 flex flex-wrap gap-2">
          {spec.toolbar.map((action) => (
            <PlaceholderAction key={action}>{action}</PlaceholderAction>
          ))}
        </div>
        <ListTable caption={spec.heading ?? "Records"} columns={spec.columns} rows={rows} emptyMessage={spec.empty} />
      </>
    );
  }

  return (
    <>
      {tabs}
      <div className="max-w-3xl divide-y divide-gray-200">
        {spec.sections.map((section, index) => (
          <section key={section.heading ?? index} className="py-4 first:pt-0">
            {section.heading ? <h2 className="font-semibold">{section.heading}</h2> : null}
            {section.description ? <p className="mt-1 mb-2 text-sm text-gray-600">{section.description}</p> : null}
            {section.controls.map((control, controlIndex) => (
              <ControlView key={controlIndex} control={control} />
            ))}
          </section>
        ))}
      </div>
      {spec.actions ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {spec.actions.map((action) => (
            <PlaceholderAction key={action}>{action}</PlaceholderAction>
          ))}
        </div>
      ) : null}
      {spec.sections.length > 0 || spec.headingToggle !== undefined ? <p className="mt-3 text-xs text-gray-600">{READ_ONLY_NOTE}</p> : null}
    </>
  );
}

/** Renders a Security & Compliance page from its spec in src/security/specs.ts. */
export function SecurityPage({ page }: { page: string }) {
  const spec = SECURITY_PAGES[page];
  if (!spec) throw new Error(`No Security & Compliance spec for "${page}"`);
  const path = ["security-and-compliance", ...page.split("/")];

  if (spec.kind === "empty") {
    return (
      <PageFrame path={path}>
        <Body spec={spec} />
      </PageFrame>
    );
  }

  return (
    <PageFrame
      path={path}
      heading={spec.heading}
      description={spec.description}
      toolbar={spec.headingToggle !== undefined ? <Toggle label="Status" on={spec.headingToggle} /> : undefined}
    >
      <Body spec={spec} />
    </PageFrame>
  );
}

/** Browser-tab title for a Security & Compliance page, taken from the navigation config. */
export function securityTitle(page: string): string {
  const route = resolveRoute(["security-and-compliance", ...page.split("/")]);
  return route?.kind === "page" ? route.label : page;
}
