import type { InputHTMLAttributes } from "react";

export function TextField({ label, id, ...props }: InputHTMLAttributes<HTMLInputElement> & { label: string; id: string }) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <input id={id} className="rounded border border-gray-400 px-2 py-1.5 text-sm disabled:bg-gray-100" {...props} />
    </div>
  );
}

export function SelectField({ label, id, options, disabled }: { label: string; id: string; options: string[]; disabled?: boolean }) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <select id={id} disabled={disabled} className="rounded border border-gray-400 px-2 py-1.5 text-sm disabled:bg-gray-100">
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}
