import { ListTable, PageFrame, PlaceholderAction } from "@/components/PageFrame";
import { getRestrictions, type RestrictionKind } from "./data";

const COPY: Record<RestrictionKind, { slug: string; heading: string; description: string; empty: string }> = {
  email: {
    slug: "email-restrictions",
    heading: "Email Restrictions",
    description: "You can define the allowed or blocked domains, email addresses, attachment types and the subject text for incoming and outgoing emails.",
    empty: "No email restrictions added",
  },
  account: {
    slug: "account-restrictions",
    heading: "Account Restrictions",
    description: "You can provide permissions to add external accounts as POP and options to customize their signatures.",
    empty: "No account restrictions added",
  },
  access: {
    slug: "access-restrictions",
    heading: "Access Restrictions",
    description: "You can provide permissions to access the account via POP, IMAP, and/or Active Sync.",
    empty: "No access restrictions added",
  },
  forward: {
    slug: "forward-restrictions",
    heading: "Email Forwarding Restrictions",
    description: "The outgoing emails sent by the users for whom the policy is applied will be forwarded to the address chosen here.",
    empty: "No email forwarding added",
  },
};

/** One page per restriction kind under Mail Settings → Email Policy. */
export async function RestrictionList({ kind }: { kind: RestrictionKind }) {
  const copy = COPY[kind];
  const restrictions = await getRestrictions(kind);

  return (
    <PageFrame
      path={["mail-settings", "email-policy", copy.slug]}
      heading={copy.heading}
      description={copy.description}
      toolbar={
        <div className="flex w-full items-center justify-between gap-2">
          <PlaceholderAction>+ Create</PlaceholderAction>
          <span className="text-sm">
            Total restrictions: <strong>{restrictions.length}</strong>
          </span>
        </div>
      }
    >
      <ListTable
        caption={copy.heading}
        columns={["Name", "Associated Policies"]}
        rows={restrictions.map((restriction) => [restriction.name, restriction.associatedPolicies.join(", ") || "—"])}
        emptyMessage={copy.empty}
      />
    </PageFrame>
  );
}
