import type { Metadata } from "next";
import Link from "next/link";
import { MockDataNotice } from "@bishnoi/ui";
import { PlaceholderAction } from "@/components/PageFrame";
import { InfoRows, loadUser, UserFrame, type UserPageProps } from "@/users/UserPage";

export const metadata: Metadata = { title: "Storage" };

export default async function StoragePage({ params }: UserPageProps) {
  const user = await loadUser(params);
  const limitMb = user.storageLimitGb * 1024;
  const usedPercent = Math.min(100, Math.round((user.usedStorageMb / limitMb) * 100));
  const format = (mb: number) => (mb >= 1024 ? `${(mb / 1024).toFixed(2)} GB` : `${mb} MB`);

  return (
    <UserFrame user={user} path={["storage"]}>
      <MockDataNotice />
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded border border-gray-300 p-4">
          <h2 className="mb-2 font-semibold">Mail Storage Allocation</h2>
          <InfoRows rows={[["Assigned Plan", `Sample Plan - ${user.storageLimitGb}GB`]]} />
          <table className="mt-3 w-full text-left text-sm">
            <caption className="sr-only">Additional storage</caption>
            <thead className="bg-gray-100">
              <tr>
                <th scope="col" className="px-2 py-1.5">Storage</th>
                <th scope="col" className="px-2 py-1.5">Add-ons</th>
                <th scope="col" className="px-2 py-1.5 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-gray-200">
                <td className="px-2 py-1.5">Base storage</td>
                <td className="px-2 py-1.5">—</td>
                <td className="px-2 py-1.5 text-right">{user.storageLimitGb} GB</td>
              </tr>
              {[50, 100].map((size) => (
                <tr key={size} className="border-t border-gray-200">
                  <td className="px-2 py-1.5">{size} GB add-on</td>
                  <td className="px-2 py-1.5">
                    <select disabled className="rounded border border-gray-400 px-1 disabled:bg-gray-100" aria-label={`${size} GB add-ons`}>
                      <option>0</option>
                    </select>
                  </td>
                  <td className="px-2 py-1.5 text-right">0 GB</td>
                </tr>
              ))}
              <tr className="border-t border-gray-300 font-semibold">
                <td className="px-2 py-1.5" colSpan={2}>
                  Total
                </td>
                <td className="px-2 py-1.5 text-right">{user.storageLimitGb} GB</td>
              </tr>
            </tbody>
          </table>
          <div className="mt-4">
            <PlaceholderAction>Update</PlaceholderAction>
          </div>
        </section>

        <section className="rounded border border-gray-300 p-4">
          <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
            <h2 className="font-semibold">Mail Storage Report</h2>
            <Link href="/subscription/storage-reports" className="text-sm underline">
              View storage details of all users
            </Link>
          </div>
          <div aria-hidden="true" className="h-3 w-full rounded bg-gray-200">
            <div className="h-3 rounded bg-gray-700" style={{ width: `${usedPercent}%` }} />
          </div>
          <p className="mt-1 text-xs text-gray-600">{usedPercent}% used</p>
          <InfoRows
            rows={[
              ["Used storage", format(user.usedStorageMb)],
              ["Available storage", format(limitMb - user.usedStorageMb)],
              ["Mail", format(user.usedStorageMb)],
            ]}
          />
        </section>
      </div>
    </UserFrame>
  );
}
