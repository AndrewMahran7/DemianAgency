import type { Metadata } from "next";
import { RouteShell } from "@/components/demian/route-shell";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Website Terms | Demian Insurance Agency",
  description: "Website terms information for Demian Insurance Agency and its online insurance request experience.",
  path: "/terms",
});

export default function TermsPage() { return <RouteShell eyebrow="Information" title="Website terms forthcoming." description="Reviewed website terms will be published here before launch. No temporary legal language has been invented for this design phase." />; }
