import type { Metadata } from "next";
import { EmptyState } from "@/components/PageFrame";
import { loadUser, UserFrame, type UserPageProps } from "@/users/UserPage";

export const metadata: Metadata = { title: "S/MIME" };

export default async function SMimePage({ params }: UserPageProps) {
  const user = await loadUser(params);
  return (
    <UserFrame
      user={user}
      path={["security","s-mime"]}
    >
      <EmptyState title="S/MIME">
        Secure/Multipurpose Internet Mail Extensions (S/MIME) encrypts email content using keys, so that only authorized people can read it.
        This feature is available only on higher plans.
      </EmptyState>
    </UserFrame>
  );
}
