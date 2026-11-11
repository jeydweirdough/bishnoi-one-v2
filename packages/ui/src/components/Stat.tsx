export interface StatItem {
  label: string;
  value: string | number;
}

export function StatGrid({ items }: { items: StatItem[] }) {
  return (
    <dl className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
      {items.map((item) => (
        <div key={item.label} className="rounded border border-gray-300 p-3">
          <dt className="text-xs text-gray-600">{item.label}</dt>
          <dd className="mt-1 text-lg font-semibold">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
