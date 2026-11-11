import type { Metadata } from "next";
import Link from "next/link";
import { loadUser, UserFrame, type UserPageProps } from "@/users/UserPage";

export const metadata: Metadata = { title: "TFA" };

export default async function TfaPage({ params }: UserPageProps) {
  const user = await loadUser(params);
  return (
    <UserFrame
      user={user}
      path={["security","tfa"]}
      heading={"Two-factor Authentication"}
      description="Two-factor authentication secures the account with a combination of a password and a mobile device."
    >
      <p role="note" className="flex items-center gap-2 rounded border border-gray-400 px-3 py-2 text-sm">
        <span aria-hidden="true" className="flex size-5 shrink-0 items-center justify-center rounded-full border border-gray-700 text-xs font-bold">
          !
        </span>
        <span>
          TFA is disabled for your organization.{" "}
          <Link href="/security-and-compliance/security/tfa" className="underline">
            Enable it in Security &amp; Compliance
          </Link>
          .
        </span>
      </p>
    </UserFrame>
  );
}
