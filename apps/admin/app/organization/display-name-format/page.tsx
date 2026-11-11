import type { Metadata } from "next";
import { PageFrame } from "@/components/PageFrame";
import { DisplayNameFormatForm } from "@/organization/FormatForms";

export const metadata: Metadata = { title: "Display Name Format" };

export default function DisplayNameFormatPage() {
  return (
    <PageFrame
      path={["organization", "display-name-format"]}
      heading="Preferred User Display Name Format"
      description="Choose the format in which you would like to display a user's name."
    >
      <DisplayNameFormatForm />
    </PageFrame>
  );
}
