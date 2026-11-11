import type { ReactNode } from "react";

/** Marks content that is mock data, so nobody mistakes it for a working backend. */
export function MockDataNotice({ children }: { children?: ReactNode }) {
  return (
    <p role="note" className="mb-4 rounded border border-dashed border-gray-500 bg-gray-50 px-3 py-2 text-sm">
      <strong>Mock data.</strong> {children ?? "No backend is connected. Values shown are placeholders."}
    </p>
  );
}

/** A dashed box standing in for a feature that is not built yet. */
export function Placeholder({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <section className="rounded border border-dashed border-gray-400 p-4 text-sm text-gray-700">
      <h2 className="font-semibold text-gray-900">Placeholder: {title}</h2>
      {children ? <div className="mt-1">{children}</div> : null}
    </section>
  );
}
