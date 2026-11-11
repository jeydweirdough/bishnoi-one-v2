import type { Metadata } from "next";
import { PageFrame } from "@/components/PageFrame";
import { SAMPLE_DOMAIN } from "@/organization/data";
import { EmailAddressFormatForm } from "@/organization/FormatForms";

export const metadata: Metadata = { title: "Email Address Format" };

export default function EmailAddressFormatPage() {
  return (
    <PageFrame
      path={["organization", "email-address-format"]}
      heading="Preferred User Email Address Format"
      description="Choose the format in which you want your users' email addresses to be created."
    >
      <EmailAddressFormatForm domain={SAMPLE_DOMAIN} />
    </PageFrame>
  );
}
