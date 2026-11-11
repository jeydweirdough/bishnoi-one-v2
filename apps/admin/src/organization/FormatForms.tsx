"use client";

import { useId, useState } from "react";

const SAMPLE = { first: "Patricia", last: "Boyle" };

/** Preview-only: the selection is not saved until the Admin backend exists. */
export function DisplayNameFormatForm() {
  const [format, setFormat] = useState<"first-last" | "last-first">("first-last");
  const preview = format === "first-last" ? `${SAMPLE.first} ${SAMPLE.last}` : `${SAMPLE.last}, ${SAMPLE.first}`;

  return (
    <fieldset>
      <legend className="sr-only">Display name format</legend>
      <div className="flex flex-col gap-2 text-sm">
        <label className="flex items-center gap-2">
          <input type="radio" name="display-name-format" checked={format === "first-last"} onChange={() => setFormat("first-last")} />
          First name Last name (e.g. {SAMPLE.first} {SAMPLE.last})
        </label>
        <label className="flex items-center gap-2">
          <input type="radio" name="display-name-format" checked={format === "last-first"} onChange={() => setFormat("last-first")} />
          Last name, First name (e.g. {SAMPLE.last}, {SAMPLE.first})
        </label>
      </div>
      <p role="status" className="mt-4 text-sm text-gray-600">
        Preview: <strong className="text-gray-900">{preview}</strong> — not saved (no backend connected).
      </p>
    </fieldset>
  );
}

const NAME_PARTS = {
  "first-name": { label: "First Name", value: (first: string) => first },
  "last-name": { label: "Last Name", value: (_first: string, last: string) => last },
  "first-initial": { label: "First Name Initial", value: (first: string) => first.charAt(0) },
  "last-initial": { label: "Last Name Initial", value: (_first: string, last: string) => last.charAt(0) },
} as const;
type NamePart = keyof typeof NAME_PARTS;

const SEPARATORS = {
  dot: { label: "Dot ( . )", value: "." },
  underscore: { label: "Underscore ( _ )", value: "_" },
  hyphen: { label: "Hyphen ( - )", value: "-" },
  none: { label: "None", value: "" },
} as const;
type Separator = keyof typeof SEPARATORS;

function Select<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: Record<T, { label: string }>;
  onChange: (value: T) => void;
}) {
  const id = useId();
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-1">
      <label htmlFor={id} className="text-xs text-gray-600">
        {label}
      </label>
      <select id={id} value={value} onChange={(event) => onChange(event.target.value as T)} className="rounded border border-gray-400 px-2 py-1.5 text-sm">
        {(Object.keys(options) as T[]).map((key) => (
          <option key={key} value={key}>
            {options[key].label}
          </option>
        ))}
      </select>
    </div>
  );
}

/** Preview-only: the format is not saved until the Admin backend exists. */
export function EmailAddressFormatForm({ domain }: { domain: string }) {
  const [first, setFirst] = useState<NamePart>("first-name");
  const [separator, setSeparator] = useState<Separator>("dot");
  const [second, setSecond] = useState<NamePart>("last-name");

  const local = `${NAME_PARTS[first].value(SAMPLE.first, SAMPLE.last)}${SEPARATORS[separator].value}${NAME_PARTS[second].value(SAMPLE.first, SAMPLE.last)}`.toLowerCase();

  return (
    <div>
      <div className="flex max-w-3xl flex-col gap-3 sm:flex-row">
        <Select label="First part" value={first} options={NAME_PARTS} onChange={setFirst} />
        <Select label="Separator" value={separator} options={SEPARATORS} onChange={setSeparator} />
        <Select label="Second part" value={second} options={NAME_PARTS} onChange={setSecond} />
      </div>
      <p className="mt-6 text-sm font-semibold underline">Example</p>
      <dl className="mt-1 grid max-w-md grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-sm">
        <dt className="font-semibold">First Name</dt>
        <dd>{SAMPLE.first}</dd>
        <dt className="font-semibold">Last Name</dt>
        <dd>{SAMPLE.last}</dd>
        <dt className="font-semibold">Email Address Format</dt>
        <dd role="status" className="break-all">
          {local}@{domain}
        </dd>
      </dl>
      <p className="mt-4 text-sm text-gray-600">Preview only — not saved (no backend connected).</p>
    </div>
  );
}
