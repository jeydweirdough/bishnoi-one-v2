import type { Metadata } from "next";
import { MockDataNotice } from "@bishnoi/ui";
import { CopyButton } from "@/components/CopyButton";
import { PlaceholderAction } from "@/components/PageFrame";
import { fullName, initials } from "@/users/data";
import { InfoRows, loadUser, UserFrame, type UserPageProps } from "@/users/UserPage";

export const metadata: Metadata = { title: "Personal Information" };

export default async function PersonalInformationPage({ params }: UserPageProps) {
  const user = await loadUser(params);
  const usedStorage = user.usedStorageMb >= 1024 ? `${(user.usedStorageMb / 1024).toFixed(2)} GB` : `${user.usedStorageMb} MB`;

  return (
    <UserFrame user={user} path={["personal-information"]} toolbar={<PlaceholderAction>Edit</PlaceholderAction>}>
      <MockDataNotice />
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        <section aria-label="Profile summary" className="rounded border border-gray-300 p-4 lg:w-80 lg:shrink-0">
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className="flex size-14 items-center justify-center rounded border border-gray-400 font-semibold">
              {initials(user)}
            </span>
            <div className="min-w-0">
              <p className="font-semibold">{fullName(user)}</p>
              <p className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
                <span className="break-all">{user.email}</span> <CopyButton value={user.email} label="email address" />
              </p>
            </div>
          </div>
          <div className="mt-3">
            <PlaceholderAction>Upload Photo</PlaceholderAction>
          </div>
          <div className="mt-4">
            <InfoRows
              compact
              rows={[
                ["Role", user.role],
                ["Used Storage", `${usedStorage} / ${user.storageLimitGb} GB`],
                ["Status", user.status],
                ["Mail Service", "Enabled"],
                ["Calendar Service", "Enabled"],
                ["Contacts Service", "Enabled"],
                ["Auto-expiry on", "Not Set"],
                ["Location", user.location || "Yet to assign"],
              ]}
            />
          </div>
        </section>

        <div className="min-w-0 flex-1">
          <section className="mb-6">
            <h2 className="mb-1 font-semibold">Personal Information</h2>
            <InfoRows
              rows={[
                ["First Name", user.firstName],
                ["Last Name", user.lastName],
                ["Nick Name", user.firstName],
                ["Gender", "Not specified"],
              ]}
            />
          </section>
          <section className="mb-6">
            <h2 className="mb-1 font-semibold">Personal Address</h2>
            <InfoRows
              rows={[
                ["Street", ""],
                ["City", ""],
                ["State", ""],
                ["Postal code", ""],
                ["Country/Region", ""],
                ["Mobile number", user.contactNumber],
                ["Phone number", ""],
              ]}
            />
          </section>
          <section className="mb-6">
            <h2 className="mb-1 font-semibold">Account Information</h2>
            <InfoRows
              rows={[
                ["Account Creation Time", user.createdAt],
                ["Last Password Reset Time", user.lastPasswordReset],
                ["Last Login Time", user.lastLogin],
                ["Time Zone", user.timeZone],
                [
                  "User ID",
                  <>
                    {user.id} <CopyButton value={user.id} label="user ID" />
                  </>,
                ],
              ]}
            />
          </section>
          <section>
            <h2 className="mb-1 font-semibold">Work Fields</h2>
            <InfoRows
              rows={[
                ["Employee ID", ""],
                ["Designation", ""],
                ["Department", ""],
                ["Mobile Number", ""],
                ["Extension", ""],
                ["Phone Number", ""],
              ]}
            />
          </section>
        </div>
      </div>
    </UserFrame>
  );
}
