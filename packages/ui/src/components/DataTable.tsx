export interface DataTableColumn {
  key: string;
  label: string;
}

export interface DataTableProps {
  caption: string;
  columns: DataTableColumn[];
  rows: Record<string, string | number>[];
}

/** Plain, horizontally scrollable table. */
export function DataTable({ caption, columns, rows }: DataTableProps) {
  return (
    <div className="overflow-x-auto rounded border border-gray-300">
      <table className="w-full text-left text-sm">
        <caption className="sr-only">{caption}</caption>
        <thead className="bg-gray-100">
          <tr>
            {columns.map((column) => (
              <th key={column.key} scope="col" className="px-3 py-2 font-semibold whitespace-nowrap">
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-3 py-6 text-center text-gray-600">
                No records.
              </td>
            </tr>
          ) : (
            rows.map((row, index) => (
              <tr key={index} className="border-t border-gray-200">
                {columns.map((column) => (
                  <td key={column.key} className="px-3 py-2 whitespace-nowrap">
                    {row[column.key] ?? "—"}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
