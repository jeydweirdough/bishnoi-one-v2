import type { ReactNode } from "react";

export function Card({ title, children, footer }: { title?: string; children: ReactNode; footer?: ReactNode }) {
  return (
    <section className="rounded border border-gray-300 p-4">
      {title ? <h2 className="mb-2 font-semibold">{title}</h2> : null}
      <div className="text-sm">{children}</div>
      {footer ? <div className="mt-3 border-t border-gray-200 pt-3 text-sm">{footer}</div> : null}
    </section>
  );
}

export function CardGrid({ children }: { children: ReactNode }) {
  return <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{children}</div>;
}
