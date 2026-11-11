import type { Metadata } from "next";
import { MockDataNotice } from "@bishnoi/ui";
import { ListTable, PageFrame, PlaceholderAction } from "@/components/PageFrame";
import { ROLES, SUPER_ADMIN } from "@/security/data";

export const metadata: Metadata = { title: "Roles" };

export default function RolesPage() {
  return (
    <PageFrame
      path={["security-and-compliance", "roles-and-privileges", "roles"]}
      description="Roles decide what each administrator can manage in the organization."
    >
      <MockDataNotice />
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        <div className="min-w-0 flex-1">
          <ListTable
            caption="Roles"
            columns={["Role", "Privileges"]}
            rows={ROLES.map((role) => [
              <span key="role" className="font-semibold">
                {role.name}
              </span>,
              <span key="description" className="block whitespace-normal">
                {role.description}
              </span>,
            ])}
          />
        </div>
        <section aria-labelledby="super-admin" className="rounded border border-gray-300 p-4 lg:w-80">
          <h2 id="super-admin" className="font-semibold">
            Super Administrator
          </h2>
          <p className="mt-2">{SUPER_ADMIN.name}</p>
          <p className="text-sm text-gray-600">{SUPER_ADMIN.email}</p>
          <p className="mt-3 rounded border border-gray-300 bg-gray-50 p-2 text-xs">
            The Super Administrator has the highest privilege in the organization. Only they can transfer this role to another administrator.
          </p>
          <div className="mt-3">
            <PlaceholderAction>Change Super Administrator</PlaceholderAction>
          </div>
        </section>
      </div>
    </PageFrame>
  );
}
